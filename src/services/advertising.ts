/**
 * Advertising Service
 * Firestore CRUD operations for the advertising panel system
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  increment,
  writeBatch,
  limit,
} from 'firebase/firestore';
import { db, PROJECT_PREFIX } from '@/config/firebase';
import type {
  Advertisement,
  AdvertisementCreate,
  AdvertisementUpdate,
  AdDismissal,
  SeenPromo,
  AdFilterOptions,
  AdServiceResponse,
  DisplayLocation,
  AdTargetPlatform,
  AdvertisementWithState,
  PREDEFINED_PRODUCTS,
} from '@/types/advertising';
import { DEFAULT_AD_CONFIG } from '@/types/advertising';

// Collection names
const COLLECTIONS = {
  advertisements: `${PROJECT_PREFIX}advertisements`,
  users: `${PROJECT_PREFIX}users`,
} as const;

// Subcollection names under user
const USER_SUBCOLLECTIONS = {
  adDismissals: 'ad_dismissals',
  seenPromos: 'seen_promos',
} as const;

/**
 * Debug mode
 */
const DEBUG = import.meta.env.DEV;

/**
 * Log debug messages
 */
function logDebug(message: string, data?: unknown): void {
  if (DEBUG) {
    console.log(`[Advertising] ${message}`, data || '');
  }
}

/**
 * Get current platform
 */
export function getCurrentPlatform(): AdTargetPlatform {
  // Check if running in Capacitor
  if (typeof window !== 'undefined') {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) return 'android';
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios';
  }
  return 'web';
}

/**
 * Advertising Service Class
 */
class AdvertisingService {
  /**
   * Get all advertisements with optional filters
   */
  async getAdvertisements(filters?: AdFilterOptions): Promise<AdServiceResponse<Advertisement[]>> {
    try {
      const adsRef = collection(db, COLLECTIONS.advertisements);
      let q = query(adsRef, orderBy('priority', 'desc'));

      // Apply filters
      if (filters?.isActive !== undefined) {
        q = query(q, where('isActive', '==', filters.isActive));
      }
      if (filters?.type) {
        q = query(q, where('type', '==', filters.type));
      }
      if (filters?.displayLocation) {
        q = query(q, where('displayLocations', 'array-contains', filters.displayLocation));
      }
      if (filters?.targetPlatform) {
        q = query(q, where('targetPlatforms', 'array-contains', filters.targetPlatform));
      }

      const snapshot = await getDocs(q);
      const ads: Advertisement[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Advertisement[];

      logDebug('Fetched advertisements', { count: ads.length, filters });

      return { success: true, data: ads };
    } catch (error) {
      console.error('[Advertising] Failed to get advertisements:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch advertisements',
      };
    }
  }

  /**
   * Get advertisements for a specific display location
   */
  async getAdsForLocation(
    location: DisplayLocation,
    platform?: AdTargetPlatform
  ): Promise<AdServiceResponse<Advertisement[]>> {
    try {
      const currentPlatform = platform || getCurrentPlatform();
      const adsRef = collection(db, COLLECTIONS.advertisements);

      const q = query(
        adsRef,
        where('isActive', '==', true),
        where('displayLocations', 'array-contains', location),
        where('targetPlatforms', 'array-contains', currentPlatform),
        orderBy('priority', 'desc')
      );

      const snapshot = await getDocs(q);
      const now = Timestamp.now();

      const ads: Advertisement[] = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((ad) => {
          const adData = ad as Advertisement;
          // Check date range
          if (adData.startDate && adData.startDate > now) return false;
          if (adData.endDate && adData.endDate < now) return false;
          return true;
        }) as Advertisement[];

      logDebug('Fetched ads for location', { location, platform: currentPlatform, count: ads.length });

      return { success: true, data: ads };
    } catch (error) {
      console.error('[Advertising] Failed to get ads for location:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch advertisements',
      };
    }
  }

  /**
   * Get a single advertisement by ID
   */
  async getAdvertisement(id: string): Promise<AdServiceResponse<Advertisement>> {
    try {
      const docRef = doc(db, COLLECTIONS.advertisements, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return { success: false, error: 'Advertisement not found' };
      }

      const ad = { id: docSnap.id, ...docSnap.data() } as Advertisement;
      logDebug('Fetched advertisement', { id });

      return { success: true, data: ad };
    } catch (error) {
      console.error('[Advertising] Failed to get advertisement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch advertisement',
      };
    }
  }

  /**
   * Create a new advertisement (admin only)
   */
  async createAdvertisement(data: AdvertisementCreate): Promise<AdServiceResponse<Advertisement>> {
    try {
      const now = Timestamp.now();
      const adData = {
        ...data,
        analytics: {
          impressions: 0,
          clicks: 0,
          dismissals: 0,
        },
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.advertisements), adData);
      const ad = { id: docRef.id, ...adData } as Advertisement;

      logDebug('Created advertisement', { id: docRef.id, title: data.title });

      return { success: true, data: ad };
    } catch (error) {
      console.error('[Advertising] Failed to create advertisement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create advertisement',
      };
    }
  }

  /**
   * Update an advertisement (admin only)
   */
  async updateAdvertisement(id: string, data: AdvertisementUpdate): Promise<AdServiceResponse<void>> {
    try {
      const docRef = doc(db, COLLECTIONS.advertisements, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });

      logDebug('Updated advertisement', { id });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to update advertisement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update advertisement',
      };
    }
  }

  /**
   * Delete an advertisement (admin only)
   */
  async deleteAdvertisement(id: string): Promise<AdServiceResponse<void>> {
    try {
      const docRef = doc(db, COLLECTIONS.advertisements, id);
      await deleteDoc(docRef);

      logDebug('Deleted advertisement', { id });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to delete advertisement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete advertisement',
      };
    }
  }

  /**
   * Increment ad analytics (impression, click, or dismissal)
   */
  async incrementAnalytics(
    adId: string,
    metric: 'impressions' | 'clicks' | 'dismissals'
  ): Promise<AdServiceResponse<void>> {
    try {
      const docRef = doc(db, COLLECTIONS.advertisements, adId);
      await updateDoc(docRef, {
        [`analytics.${metric}`]: increment(1),
      });

      logDebug('Incremented analytics', { adId, metric });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to increment analytics:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update analytics',
      };
    }
  }

  /**
   * Get user's dismissed ads
   */
  async getUserDismissals(userId: string): Promise<AdServiceResponse<AdDismissal[]>> {
    try {
      const dismissalsRef = collection(
        db,
        COLLECTIONS.users,
        userId,
        USER_SUBCOLLECTIONS.adDismissals
      );
      const snapshot = await getDocs(dismissalsRef);

      const dismissals: AdDismissal[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AdDismissal[];

      logDebug('Fetched user dismissals', { userId, count: dismissals.length });

      return { success: true, data: dismissals };
    } catch (error) {
      console.error('[Advertising] Failed to get user dismissals:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch dismissals',
      };
    }
  }

  /**
   * Record ad dismissal for a user
   */
  async dismissAd(userId: string, adId: string, cooldownDays?: number): Promise<AdServiceResponse<void>> {
    try {
      const now = Timestamp.now();
      const cooldown = cooldownDays || DEFAULT_AD_CONFIG.dismissCooldownDays;
      const showAgainAfter = Timestamp.fromDate(
        new Date(Date.now() + cooldown * 24 * 60 * 60 * 1000)
      );

      const dismissalData: Omit<AdDismissal, 'id'> = {
        adId,
        dismissedAt: now,
        showAgainAfter,
      };

      const dismissalsRef = collection(
        db,
        COLLECTIONS.users,
        userId,
        USER_SUBCOLLECTIONS.adDismissals
      );

      // Check if already dismissed
      const q = query(dismissalsRef, where('adId', '==', adId), limit(1));
      const existing = await getDocs(q);

      if (existing.empty) {
        await addDoc(dismissalsRef, dismissalData);
      } else {
        // Update existing dismissal
        await updateDoc(existing.docs[0].ref, dismissalData);
      }

      // Also increment dismissal analytics
      await this.incrementAnalytics(adId, 'dismissals');

      logDebug('Dismissed ad', { userId, adId, showAgainAfter: showAgainAfter.toDate() });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to dismiss ad:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to dismiss advertisement',
      };
    }
  }

  /**
   * Check if ad is dismissed for user
   */
  async isAdDismissed(userId: string, adId: string): Promise<boolean> {
    try {
      const dismissalsRef = collection(
        db,
        COLLECTIONS.users,
        userId,
        USER_SUBCOLLECTIONS.adDismissals
      );
      const q = query(dismissalsRef, where('adId', '==', adId), limit(1));
      const snapshot = await getDocs(q);

      if (snapshot.empty) return false;

      const dismissal = snapshot.docs[0].data() as AdDismissal;
      const now = Timestamp.now();

      // Check if cooldown period has passed
      return dismissal.showAgainAfter > now;
    } catch (error) {
      console.error('[Advertising] Failed to check dismissal:', error);
      return false;
    }
  }

  /**
   * Get user's seen promos
   */
  async getUserSeenPromos(userId: string): Promise<AdServiceResponse<SeenPromo[]>> {
    try {
      const seenRef = collection(db, COLLECTIONS.users, userId, USER_SUBCOLLECTIONS.seenPromos);
      const snapshot = await getDocs(seenRef);

      const seenPromos: SeenPromo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SeenPromo[];

      logDebug('Fetched seen promos', { userId, count: seenPromos.length });

      return { success: true, data: seenPromos };
    } catch (error) {
      console.error('[Advertising] Failed to get seen promos:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch seen promos',
      };
    }
  }

  /**
   * Mark promo as seen
   */
  async markPromoSeen(userId: string, adId: string, version?: string): Promise<AdServiceResponse<void>> {
    try {
      const seenData: Omit<SeenPromo, 'id'> = {
        adId,
        seenAt: Timestamp.now(),
        version,
      };

      const seenRef = collection(db, COLLECTIONS.users, userId, USER_SUBCOLLECTIONS.seenPromos);

      // Check if already seen
      const q = query(seenRef, where('adId', '==', adId), limit(1));
      const existing = await getDocs(q);

      if (existing.empty) {
        await addDoc(seenRef, seenData);
      }

      logDebug('Marked promo as seen', { userId, adId, version });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to mark promo seen:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to mark promo as seen',
      };
    }
  }

  /**
   * Check if user has seen promo
   */
  async hasSeenPromo(userId: string, adId: string, version?: string): Promise<boolean> {
    try {
      const seenRef = collection(db, COLLECTIONS.users, userId, USER_SUBCOLLECTIONS.seenPromos);
      let q = query(seenRef, where('adId', '==', adId), limit(1));

      const snapshot = await getDocs(q);

      if (snapshot.empty) return false;

      // If version specified, check if seen for this version
      if (version) {
        const seenPromo = snapshot.docs[0].data() as SeenPromo;
        return seenPromo.version === version;
      }

      return true;
    } catch (error) {
      console.error('[Advertising] Failed to check seen promo:', error);
      return false;
    }
  }

  /**
   * Get ads with user state (dismissals, seen promos)
   */
  async getAdsWithUserState(
    userId: string | null,
    location: DisplayLocation
  ): Promise<AdServiceResponse<AdvertisementWithState[]>> {
    try {
      // Get ads for location
      const adsResult = await this.getAdsForLocation(location);
      if (!adsResult.success || !adsResult.data) {
        return { success: false, error: adsResult.error };
      }

      // If no user, return all ads as showable
      if (!userId) {
        const adsWithState: AdvertisementWithState[] = adsResult.data.map((ad) => ({
          ...ad,
          shouldShow: true,
          isDismissed: false,
        }));
        return { success: true, data: adsWithState };
      }

      // Get user dismissals
      const dismissalsResult = await this.getUserDismissals(userId);
      const dismissals = dismissalsResult.data || [];
      const now = Timestamp.now();

      // Build map of dismissed ads
      const dismissedMap = new Map<string, { until: Timestamp }>();
      dismissals.forEach((d) => {
        if (d.showAgainAfter > now) {
          dismissedMap.set(d.adId, { until: d.showAgainAfter });
        }
      });

      // Map ads with state
      const adsWithState: AdvertisementWithState[] = adsResult.data.map((ad) => {
        const dismissal = dismissedMap.get(ad.id);
        const isDismissed = !!dismissal;
        const shouldShow = !isDismissed || !ad.isDismissible;

        return {
          ...ad,
          shouldShow,
          isDismissed,
          dismissedUntil: dismissal?.until.toDate(),
        };
      });

      return { success: true, data: adsWithState };
    } catch (error) {
      console.error('[Advertising] Failed to get ads with user state:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch advertisements',
      };
    }
  }

  /**
   * Seed initial advertisements from predefined products
   */
  async seedAdvertisements(products: typeof PREDEFINED_PRODUCTS): Promise<AdServiceResponse<void>> {
    try {
      const batch = writeBatch(db);
      const now = Timestamp.now();

      for (const product of products) {
        const adRef = doc(collection(db, COLLECTIONS.advertisements));
        const adData: Omit<Advertisement, 'id'> = {
          type: product.type,
          title: product.title,
          description: product.description,
          bulletPoints: product.bulletPoints,
          imageUrl: '', // Will be updated with FilesHub URL
          localImagePath: product.localImagePath,
          ctaText: product.ctaText,
          ctaUrl: product.ctaUrl,
          displayLocations: ['page_slider', 'modal_slider'],
          uiVariant: 'standard',
          priority: DEFAULT_AD_CONFIG.priority,
          isDismissible: false, // Page sliders are not dismissible
          dismissCooldownDays: DEFAULT_AD_CONFIG.dismissCooldownDays,
          isActive: true,
          startDate: null,
          endDate: null,
          targetPlatforms: ['web', 'android', 'ios'],
          analytics: {
            impressions: 0,
            clicks: 0,
            dismissals: 0,
          },
          createdAt: now,
          updatedAt: now,
        };

        batch.set(adRef, adData);
      }

      await batch.commit();
      logDebug('Seeded advertisements', { count: products.length });

      return { success: true };
    } catch (error) {
      console.error('[Advertising] Failed to seed advertisements:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to seed advertisements',
      };
    }
  }
}

// Export singleton instance
export const advertisingService = new AdvertisingService();

// Export types
export type { AdvertisingService };
export default advertisingService;
