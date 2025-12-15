/**
 * Advertising Types
 * TypeScript definitions for the advertising panel system
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import type { Timestamp } from 'firebase/firestore';

/**
 * Advertisement content types
 */
export type AdvertisementType =
  | 'browser_extension'
  | 'mobile_app'
  | 'web_app'
  | 'youtube_video'
  | 'social_media'
  | 'event_offer';

/**
 * Display locations for advertisements
 */
export type DisplayLocation =
  | 'page_slider' // 10% visible above fold on each page (permanent)
  | 'modal_slider' // Post-update modal with large slider
  | 'one_time_modal' // One-time promo modal (dismissible)
  | 'push_notification'; // Browser/device push notification

/**
 * UI variant styles for advertisements
 */
export type AdUIVariant = 'compact' | 'standard' | 'featured' | 'banner' | 'card';

/**
 * Target platforms for advertisements
 */
export type AdTargetPlatform = 'web' | 'android' | 'ios';

/**
 * Advertisement analytics data
 */
export interface AdAnalyticsData {
  impressions: number;
  clicks: number;
  dismissals: number;
}

/**
 * Main Advertisement interface
 * Stored in Firestore collection: exoh_advertisements
 */
export interface Advertisement {
  id: string;
  type: AdvertisementType;
  title: string;
  description: string;
  bulletPoints?: string[]; // For large sliders/featured displays
  imageUrl: string; // SVG stored in FilesHub or local assets
  localImagePath?: string; // Fallback local asset path
  ctaText: string;
  ctaUrl: string;
  displayLocations: DisplayLocation[];
  uiVariant: AdUIVariant;
  priority: number; // Higher = shown first (1-100)
  isDismissible: boolean;
  dismissCooldownDays: number; // How long before showing again after dismiss (default: 20)
  isActive: boolean;
  startDate?: Timestamp | null;
  endDate?: Timestamp | null;
  targetPlatforms: AdTargetPlatform[];
  analytics: AdAnalyticsData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Advertisement without ID (for creating new ads)
 */
export type AdvertisementCreate = Omit<Advertisement, 'id' | 'createdAt' | 'updatedAt' | 'analytics'>;

/**
 * Advertisement update payload
 */
export type AdvertisementUpdate = Partial<Omit<Advertisement, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * User ad dismissal tracking
 * Stored as subcollection under user: exoh_users/{userId}/ad_dismissals
 */
export interface AdDismissal {
  id: string;
  adId: string;
  dismissedAt: Timestamp;
  showAgainAfter: Timestamp;
}

/**
 * User seen promos tracking (for one-time modals)
 * Stored as subcollection under user: exoh_users/{userId}/seen_promos
 */
export interface SeenPromo {
  id: string;
  adId: string;
  seenAt: Timestamp;
  version?: string; // App version when seen (for update promos)
}

/**
 * Advertisement filter options for querying
 */
export interface AdFilterOptions {
  type?: AdvertisementType;
  displayLocation?: DisplayLocation;
  isActive?: boolean;
  targetPlatform?: AdTargetPlatform;
}

/**
 * Advertisement service response
 */
export interface AdServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Advertisement with display state (for UI)
 */
export interface AdvertisementWithState extends Advertisement {
  shouldShow: boolean;
  isDismissed: boolean;
  dismissedUntil?: Date;
}

/**
 * Slider configuration for ad sliders
 */
export interface AdSliderConfig {
  autoPlay?: boolean;
  autoPlayInterval?: number; // milliseconds
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Page ad slider props
 */
export interface PageAdSliderProps {
  displayLocation: DisplayLocation;
  className?: string;
  visiblePercentage?: number; // Default: 10 (10% visible above fold)
}

/**
 * Ad modal props
 */
export interface AdModalProps {
  ad: Advertisement;
  isOpen: boolean;
  onClose: () => void;
  onDismiss?: () => void;
}

/**
 * Ad card props
 */
export interface AdCardProps {
  ad: Advertisement;
  variant?: AdUIVariant;
  className?: string;
  onCTAClick?: () => void;
  onDismiss?: () => void;
}

/**
 * Ad banner props
 */
export interface AdBannerProps {
  ad: Advertisement;
  position?: 'top' | 'bottom';
  className?: string;
  onCTAClick?: () => void;
  onDismiss?: () => void;
}

/**
 * Analytics event properties for advertisements
 */
export interface AdAnalyticsEventProperties {
  ad_id: string;
  ad_type: AdvertisementType;
  ad_title: string;
  display_location: DisplayLocation;
  ui_variant: AdUIVariant;
  platform: AdTargetPlatform;
  page_path: string;
  cta_url?: string;
  // Index signature for analytics compatibility
  [key: string]: string | undefined;
}

/**
 * Predefined product data for initial seed
 */
export interface PredefinedProduct {
  id: string;
  type: AdvertisementType;
  title: string;
  description: string;
  bulletPoints: string[];
  ctaText: string;
  ctaUrl: string;
  localImagePath: string;
}

/**
 * Predefined products for advertising
 */
export const PREDEFINED_PRODUCTS: PredefinedProduct[] = [
  {
    id: 'video-controls-plus',
    type: 'browser_extension',
    title: 'Video Controls Plus',
    description: 'Advanced video playback speed controls for any website. Control speed from 0.1x to 16x!',
    bulletPoints: [
      'Universal speed control (0.1x - 16x)',
      'Works on Udemy, YouTube, Netflix & more',
      'Keyboard shortcuts for quick control',
      'Remember speed per website',
    ],
    ctaText: 'Install Free',
    ctaUrl: 'https://chromewebstore.google.com/detail/udemy-video-playback-spee/ihafdbecgnhendhckoknblmcminoikdb',
    localImagePath: '/src/assets/advertising/video-controls-plus.svg',
  },
  {
    id: 'ztools-extension',
    type: 'browser_extension',
    title: 'ZTools Extension',
    description: '300+ utility tools in your browser. Convert, generate, and transform data instantly.',
    bulletPoints: [
      '300+ utility tools in one place',
      'JSON, Base64, Hash converters',
      'Color pickers and generators',
      'Text manipulation tools',
    ],
    ctaText: 'Add to Browser',
    ctaUrl: 'https://chromewebstore.google.com/detail/ztools-300+-utility-tools/olkionpeobbpgmlfigafppbkniomelle',
    localImagePath: '/src/assets/advertising/ztools-extension.svg',
  },
  {
    id: 'pregnancypal-app',
    type: 'mobile_app',
    title: 'PregnancyPal AI',
    description: 'AI-powered pregnancy health tracker. Track your journey with personalized insights.',
    bulletPoints: [
      'AI-powered health insights',
      'Weekly pregnancy updates',
      'Contraction timer',
      'Kick counter & baby movements',
    ],
    ctaText: 'Download App',
    ctaUrl: 'https://play.google.com/store/apps/details?id=com.aoneahsan.pregnancypal',
    localImagePath: '/src/assets/advertising/pregnancypal-app.svg',
  },
  {
    id: 'ztools-web',
    type: 'web_app',
    title: 'ZTools Web',
    description: 'Access 300+ utility tools online. No installation required.',
    bulletPoints: [
      'Access from any device',
      'No installation needed',
      'Always up-to-date tools',
      'Fast and secure',
    ],
    ctaText: 'Open ZTools',
    ctaUrl: 'https://ztools.zaions.com/',
    localImagePath: '/src/assets/advertising/ztools-web.svg',
  },
  {
    id: 'pregnancypal-web',
    type: 'web_app',
    title: 'PregnancyPal Web',
    description: 'Track your pregnancy journey online. Sync across all devices.',
    bulletPoints: [
      'Access from any browser',
      'Sync with mobile app',
      'Detailed health tracking',
      'Community support',
    ],
    ctaText: 'Open App',
    ctaUrl: 'https://pregnancy-pal-ai.web.app/',
    localImagePath: '/src/assets/advertising/pregnancypal-web.svg',
  },
  {
    id: 'labflow',
    type: 'web_app',
    title: 'LabFlow',
    description: 'HIPAA-compliant Laboratory Information Management System for clinical labs.',
    bulletPoints: [
      'HIPAA compliant',
      'Patient & sample tracking',
      'HL7/FHIR integration',
      'Real-time analytics',
    ],
    ctaText: 'Learn More',
    ctaUrl: 'https://labsystem-a1.web.app/',
    localImagePath: '/src/assets/advertising/labflow.svg',
  },
];

/**
 * Default advertisement configuration
 */
export const DEFAULT_AD_CONFIG = {
  dismissCooldownDays: 20,
  autoPlayInterval: 5000, // 5 seconds
  visiblePercentage: 10, // 10% visible above fold
  priority: 50, // Default priority (1-100)
};

/**
 * Advertisement type labels for display
 */
export const AD_TYPE_LABELS: Record<AdvertisementType, string> = {
  browser_extension: 'Browser Extension',
  mobile_app: 'Mobile App',
  web_app: 'Web App',
  youtube_video: 'YouTube Video',
  social_media: 'Social Media',
  event_offer: 'Event/Offer',
};

/**
 * Display location labels for display
 */
export const DISPLAY_LOCATION_LABELS: Record<DisplayLocation, string> = {
  page_slider: 'Page Slider (10% visible)',
  modal_slider: 'Update Modal Slider',
  one_time_modal: 'One-Time Promo Modal',
  push_notification: 'Push Notification',
};

/**
 * UI variant labels for display
 */
export const UI_VARIANT_LABELS: Record<AdUIVariant, string> = {
  compact: 'Compact',
  standard: 'Standard',
  featured: 'Featured',
  banner: 'Banner',
  card: 'Card',
};
