/**
 * useAdvertising Hook
 * React hook for managing advertisements display and tracking
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { advertisingService, getCurrentPlatform } from '@/services/advertising';
import { useAdvertisingStore } from '@/store/useAdvertisingStore';
import { useAuth } from '@/contexts/AuthContext';
import { analytics } from '@/services/analytics';
import type {
  Advertisement,
  AdvertisementWithState,
  DisplayLocation,
  AdAnalyticsEventProperties,
} from '@/types/advertising';
import { DEFAULT_AD_CONFIG } from '@/types/advertising';

/**
 * Hook options
 */
interface UseAdvertisingOptions {
  /**
   * Display location to fetch ads for
   */
  location?: DisplayLocation;

  /**
   * Auto-fetch ads on mount
   * @default true
   */
  autoFetch?: boolean;

  /**
   * Enable auto-play for sliders
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Auto-play interval in milliseconds
   * @default 5000
   */
  autoPlayInterval?: number;
}

/**
 * Hook return type
 */
interface UseAdvertisingReturn {
  // Ads data
  ads: AdvertisementWithState[];
  isLoading: boolean;
  error: string | null;

  // Slider state
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;

  // Actions
  fetchAds: () => Promise<void>;
  dismissAd: (ad: Advertisement) => Promise<void>;
  markPromoSeen: (adId: string) => Promise<void>;

  // Analytics
  trackImpression: (ad: Advertisement) => void;
  trackClick: (ad: Advertisement) => void;
  trackCTAClick: (ad: Advertisement) => void;
  trackSliderScroll: (direction: 'next' | 'prev', ad: Advertisement) => void;
}

/**
 * Get analytics event properties for an ad
 */
function getAdEventProperties(
  ad: Advertisement,
  displayLocation: DisplayLocation,
  pagePath: string
): AdAnalyticsEventProperties {
  return {
    ad_id: ad.id,
    ad_type: ad.type,
    ad_title: ad.title,
    display_location: displayLocation,
    ui_variant: ad.uiVariant,
    platform: getCurrentPlatform(),
    page_path: pagePath,
    cta_url: ad.ctaUrl,
  };
}

/**
 * Main advertising hook
 *
 * @example
 * ```tsx
 * function PageWithAds() {
 *   const { ads, currentIndex, nextSlide, prevSlide, trackImpression } = useAdvertising({
 *     location: 'page_slider',
 *   });
 *
 *   return (
 *     <AdSlider
 *       ads={ads}
 *       currentIndex={currentIndex}
 *       onNext={nextSlide}
 *       onPrev={prevSlide}
 *       onImpression={trackImpression}
 *     />
 *   );
 * }
 * ```
 */
export function useAdvertising(options: UseAdvertisingOptions = {}): UseAdvertisingReturn {
  const {
    location = 'page_slider',
    autoFetch = true,
    autoPlay = true,
    autoPlayInterval = DEFAULT_AD_CONFIG.autoPlayInterval,
  } = options;

  const browserLocation = useLocation();
  const { currentUser } = useAuth();
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const impressionTrackedRef = useRef<Set<string>>(new Set());

  // Store state
  const {
    pageSliderAds,
    modalSliderAds,
    oneTimeModalAds,
    isLoadingPageSlider,
    isLoadingModalSlider,
    error,
    currentSliderIndex,
    setCurrentSliderIndex,
    nextSlide: storeNextSlide,
    prevSlide: storePrevSlide,
    setPageSliderAds,
    setModalSliderAds,
    setOneTimeModalAds,
    setLoadingPageSlider,
    setLoadingModalSlider,
    setError,
    addDismissedAd,
    addSeenPromo,
    setLastFetchedAt,
    shouldRefetch,
  } = useAdvertisingStore();

  // Get ads based on location
  const getAdsForLocation = useCallback(() => {
    switch (location) {
      case 'page_slider':
        return pageSliderAds;
      case 'modal_slider':
        return modalSliderAds;
      case 'one_time_modal':
        return oneTimeModalAds;
      default:
        return pageSliderAds;
    }
  }, [location, pageSliderAds, modalSliderAds, oneTimeModalAds]);

  const ads = getAdsForLocation();

  // Get loading state based on location
  const isLoading = location === 'page_slider' ? isLoadingPageSlider : isLoadingModalSlider;

  // Fetch ads
  const fetchAds = useCallback(async () => {
    // Check cache
    if (!shouldRefetch() && ads.length > 0) {
      return;
    }

    const setLoading = location === 'page_slider' ? setLoadingPageSlider : setLoadingModalSlider;
    setLoading(true);
    setError(null);

    try {
      const result = await advertisingService.getAdsWithUserState(
        currentUser?.uid || null,
        location
      );

      if (result.success && result.data) {
        // Filter to only show ads that should be shown
        const showableAds = result.data.filter((ad) => ad.shouldShow);

        switch (location) {
          case 'page_slider':
            setPageSliderAds(showableAds);
            break;
          case 'modal_slider':
            setModalSliderAds(showableAds);
            break;
          case 'one_time_modal':
            setOneTimeModalAds(showableAds);
            break;
        }

        setLastFetchedAt(Date.now());
      } else {
        setError(result.error || 'Failed to fetch advertisements');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch advertisements');
    } finally {
      setLoading(false);
    }
  }, [
    currentUser?.uid,
    location,
    shouldRefetch,
    ads.length,
    setLoadingPageSlider,
    setLoadingModalSlider,
    setError,
    setPageSliderAds,
    setModalSliderAds,
    setOneTimeModalAds,
    setLastFetchedAt,
  ]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchAds();
    }
  }, [autoFetch, fetchAds]);

  // Auto-play slider
  useEffect(() => {
    if (!autoPlay || ads.length <= 1) {
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      storeNextSlide(ads.length - 1);
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, ads.length, storeNextSlide]);

  // Slider navigation
  const nextSlide = useCallback(() => {
    if (ads.length > 0) {
      storeNextSlide(ads.length - 1);
      // Track slider scroll
      const currentAd = ads[currentSliderIndex];
      if (currentAd) {
        analytics.track('ad_slider_scroll', {
          ...getAdEventProperties(currentAd, location, browserLocation.pathname),
          direction: 'next',
        });
      }
    }
  }, [ads, currentSliderIndex, storeNextSlide, location, browserLocation.pathname]);

  const prevSlide = useCallback(() => {
    if (ads.length > 0) {
      storePrevSlide(ads.length - 1);
      // Track slider scroll
      const currentAd = ads[currentSliderIndex];
      if (currentAd) {
        analytics.track('ad_slider_scroll', {
          ...getAdEventProperties(currentAd, location, browserLocation.pathname),
          direction: 'prev',
        });
      }
    }
  }, [ads, currentSliderIndex, storePrevSlide, location, browserLocation.pathname]);

  // Dismiss ad
  const dismissAd = useCallback(
    async (ad: Advertisement) => {
      if (!currentUser?.uid || !ad.isDismissible) return;

      try {
        await advertisingService.dismissAd(currentUser.uid, ad.id, ad.dismissCooldownDays);
        addDismissedAd(ad.id);

        // Track dismissal
        analytics.track('ad_dismiss', getAdEventProperties(ad, location, browserLocation.pathname));
      } catch (err) {
        console.error('[Advertising] Failed to dismiss ad:', err);
      }
    },
    [currentUser?.uid, addDismissedAd, location, browserLocation.pathname]
  );

  // Mark promo as seen
  const markPromoSeen = useCallback(
    async (adId: string) => {
      if (!currentUser?.uid) return;

      try {
        await advertisingService.markPromoSeen(currentUser.uid, adId);
        addSeenPromo(adId);
      } catch (err) {
        console.error('[Advertising] Failed to mark promo seen:', err);
      }
    },
    [currentUser?.uid, addSeenPromo]
  );

  // Analytics tracking
  const trackImpression = useCallback(
    (ad: Advertisement) => {
      // Avoid duplicate impressions
      if (impressionTrackedRef.current.has(ad.id)) return;
      impressionTrackedRef.current.add(ad.id);

      analytics.track('ad_impression', getAdEventProperties(ad, location, browserLocation.pathname));
      advertisingService.incrementAnalytics(ad.id, 'impressions');
    },
    [location, browserLocation.pathname]
  );

  const trackClick = useCallback(
    (ad: Advertisement) => {
      analytics.track('ad_click', getAdEventProperties(ad, location, browserLocation.pathname));
      advertisingService.incrementAnalytics(ad.id, 'clicks');
    },
    [location, browserLocation.pathname]
  );

  const trackCTAClick = useCallback(
    (ad: Advertisement) => {
      analytics.track('ad_cta_clicked', {
        ...getAdEventProperties(ad, location, browserLocation.pathname),
        cta_text: ad.ctaText,
      });
      advertisingService.incrementAnalytics(ad.id, 'clicks');
    },
    [location, browserLocation.pathname]
  );

  const trackSliderScroll = useCallback(
    (direction: 'next' | 'prev', ad: Advertisement) => {
      analytics.track('ad_slider_scroll', {
        ...getAdEventProperties(ad, location, browserLocation.pathname),
        direction,
      });
    },
    [location, browserLocation.pathname]
  );

  return {
    ads,
    isLoading,
    error,
    currentIndex: currentSliderIndex,
    setCurrentIndex: setCurrentSliderIndex,
    nextSlide,
    prevSlide,
    fetchAds,
    dismissAd,
    markPromoSeen,
    trackImpression,
    trackClick,
    trackCTAClick,
    trackSliderScroll,
  };
}

/**
 * Hook for update promo modal
 * Checks app version and shows modal if new version
 */
export function useUpdatePromoModal() {
  const { currentUser } = useAuth();
  const {
    modalSliderAds,
    isUpdatePromoModalOpen,
    openUpdatePromoModal,
    closeUpdatePromoModal,
    setModalSliderAds,
    setLoadingModalSlider,
    setError,
    addSeenPromo,
    hasSeen,
  } = useAdvertisingStore();

  // Fetch modal slider ads
  const fetchModalAds = useCallback(async () => {
    setLoadingModalSlider(true);
    try {
      const result = await advertisingService.getAdsWithUserState(
        currentUser?.uid || null,
        'modal_slider'
      );

      if (result.success && result.data) {
        setModalSliderAds(result.data.filter((ad) => ad.shouldShow));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch modal ads');
    } finally {
      setLoadingModalSlider(false);
    }
  }, [currentUser?.uid, setModalSliderAds, setLoadingModalSlider, setError]);

  // Check version and show modal
  const checkAndShowModal = useCallback(
    async (currentVersion: string, storedVersion: string | null) => {
      if (currentVersion !== storedVersion) {
        // New version - fetch ads and show modal
        await fetchModalAds();
        if (modalSliderAds.length > 0) {
          openUpdatePromoModal();
        }
      }
    },
    [fetchModalAds, modalSliderAds.length, openUpdatePromoModal]
  );

  // Mark all modal promos as seen
  const markModalPromosSeen = useCallback(
    async (version: string) => {
      if (!currentUser?.uid) return;

      for (const ad of modalSliderAds) {
        await advertisingService.markPromoSeen(currentUser.uid, ad.id, version);
        addSeenPromo(ad.id);
      }
    },
    [currentUser?.uid, modalSliderAds, addSeenPromo]
  );

  return {
    modalAds: modalSliderAds,
    isOpen: isUpdatePromoModalOpen,
    open: openUpdatePromoModal,
    close: closeUpdatePromoModal,
    checkAndShowModal,
    markModalPromosSeen,
    fetchModalAds,
  };
}

/**
 * Hook for one-time promo modal
 */
export function useOneTimePromoModal() {
  const { currentUser } = useAuth();
  const {
    oneTimeModalAds,
    isOneTimeModalOpen,
    currentOneTimeModalAd,
    openOneTimeModal,
    closeOneTimeModal,
    setOneTimeModalAds,
    setError,
    addSeenPromo,
    hasSeen,
  } = useAdvertisingStore();

  // Fetch one-time modal ads
  const fetchOneTimeAds = useCallback(async () => {
    try {
      const result = await advertisingService.getAdsWithUserState(
        currentUser?.uid || null,
        'one_time_modal'
      );

      if (result.success && result.data) {
        // Filter to only unseen ads
        const unseenAds = result.data.filter((ad) => ad.shouldShow && !hasSeen(ad.id));
        setOneTimeModalAds(unseenAds);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch one-time modal ads');
    }
  }, [currentUser?.uid, setOneTimeModalAds, setError, hasSeen]);

  // Show next unseen promo
  const showNextPromo = useCallback(() => {
    if (oneTimeModalAds.length > 0) {
      openOneTimeModal(oneTimeModalAds[0]);
    }
  }, [oneTimeModalAds, openOneTimeModal]);

  // Mark current promo as seen and close
  const dismissAndClose = useCallback(async () => {
    if (!currentOneTimeModalAd || !currentUser?.uid) {
      closeOneTimeModal();
      return;
    }

    await advertisingService.markPromoSeen(currentUser.uid, currentOneTimeModalAd.id);
    addSeenPromo(currentOneTimeModalAd.id);
    closeOneTimeModal();
  }, [currentUser?.uid, currentOneTimeModalAd, addSeenPromo, closeOneTimeModal]);

  return {
    oneTimeAds: oneTimeModalAds,
    isOpen: isOneTimeModalOpen,
    currentAd: currentOneTimeModalAd,
    fetchOneTimeAds,
    showNextPromo,
    dismissAndClose,
    close: closeOneTimeModal,
  };
}

export default useAdvertising;
