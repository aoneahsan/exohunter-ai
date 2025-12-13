/**
 * Analytics Service
 * Centralized analytics tracking for Firebase Analytics, Microsoft Clarity, and Amplitude
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import type { Analytics } from 'firebase/analytics';
import { logEvent, setUserId, setUserProperties as setFirebaseUserProperties } from 'firebase/analytics';
import * as amplitude from '@amplitude/analytics-browser';
import type {
  AnalyticsEventProperties,
  AnalyticsUserProperties,
  AnalyticsIdentifyTraits,
  IAnalyticsService,
  AnalyticsPlatform,
} from '@/types/analytics';
import * as FirebaseConfig from '@/config/firebase';

// Declare Clarity global
declare global {
  interface Window {
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

// Get Firebase Analytics with proper typing
function getFirebaseAnalytics(): Analytics | undefined {
  return FirebaseConfig.analytics as Analytics | undefined;
}

/**
 * Analytics configuration
 */
const ANALYTICS_CONFIG = {
  amplitude: {
    apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
    enabled: !!import.meta.env.VITE_AMPLITUDE_API_KEY,
  },
  clarity: {
    projectId: import.meta.env.VITE_CLARITY_PROJECT_ID,
    enabled: !!import.meta.env.VITE_CLARITY_PROJECT_ID,
  },
  firebase: {
    enabled: !!getFirebaseAnalytics() && import.meta.env.PROD,
  },
  debug: import.meta.env.DEV,
};

/**
 * Platforms initialization status
 */
const platformsInitialized: Record<AnalyticsPlatform, boolean> = {
  firebase: false,
  amplitude: false,
  clarity: false,
};

/**
 * Initialize analytics platforms
 */
function initializeAnalytics(): void {
  // Initialize Firebase Analytics
  const fbAnalytics = getFirebaseAnalytics();
  if (ANALYTICS_CONFIG.firebase.enabled && fbAnalytics) {
    platformsInitialized.firebase = true;
    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Firebase Analytics initialized');
    }
  }

  // Initialize Amplitude
  if (ANALYTICS_CONFIG.amplitude.enabled && typeof window !== 'undefined') {
    try {
      amplitude.init(ANALYTICS_CONFIG.amplitude.apiKey, {
        defaultTracking: {
          sessions: true,
          pageViews: false, // We'll handle page views manually
          formInteractions: true,
          fileDownloads: true,
        },
        trackingOptions: {
          ipAddress: false, // Privacy-friendly
        },
      });
      platformsInitialized.amplitude = true;
      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] Amplitude initialized');
      }
    } catch (error) {
      console.error('[Analytics] Failed to initialize Amplitude:', error);
    }
  }

  // Initialize Microsoft Clarity
  if (ANALYTICS_CONFIG.clarity.enabled && typeof window !== 'undefined') {
    try {
      // Clarity loads via script tag, we just track initialization
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.clarity.projectId}");
      `;
      document.head.appendChild(script);
      platformsInitialized.clarity = true;
      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] Microsoft Clarity initialized');
      }
    } catch (error) {
      console.error('[Analytics] Failed to initialize Clarity:', error);
    }
  }

  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Platforms initialized:', platformsInitialized);
  }
}

/**
 * Sanitize event properties
 * Removes undefined values and ensures proper types
 */
function sanitizeProperties(
  properties?: AnalyticsEventProperties | AnalyticsUserProperties
): Record<string, string | number | boolean | null> | undefined {
  if (!properties) return undefined;

  const sanitized: Record<string, string | number | boolean | null> = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (value !== undefined) {
      sanitized[key] = value === null ? null : value;
    }
  });

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

/**
 * Track event to Firebase Analytics
 */
function trackFirebase(event: string, properties?: AnalyticsEventProperties): void {
  const fbAnalytics = getFirebaseAnalytics();
  if (!platformsInitialized.firebase || !fbAnalytics) return;

  try {
    const sanitized = sanitizeProperties(properties);
    logEvent(fbAnalytics, event, sanitized);

    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Firebase tracked:', event, sanitized);
    }
  } catch (error) {
    console.error('[Analytics] Firebase tracking error:', error);
  }
}

/**
 * Track event to Amplitude
 */
function trackAmplitude(event: string, properties?: AnalyticsEventProperties): void {
  if (!platformsInitialized.amplitude) return;

  try {
    const sanitized = sanitizeProperties(properties);
    amplitude.track(event, sanitized);

    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Amplitude tracked:', event, sanitized);
    }
  } catch (error) {
    console.error('[Analytics] Amplitude tracking error:', error);
  }
}

/**
 * Track event to Microsoft Clarity
 */
function trackClarity(event: string, properties?: AnalyticsEventProperties): void {
  if (!platformsInitialized.clarity || typeof window === 'undefined') return;

  try {
    // Clarity uses custom events via global function
    if (window.clarity) {
      const sanitized = sanitizeProperties(properties);
      window.clarity('event', event);

      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] Clarity tracked:', event, sanitized);
      }
    }
  } catch (error) {
    console.error('[Analytics] Clarity tracking error:', error);
  }
}

/**
 * Analytics Service Implementation
 */
class AnalyticsService implements IAnalyticsService {
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize analytics platforms
   */
  private initialize(): void {
    if (this.initialized) return;

    try {
      initializeAnalytics();
      this.initialized = true;
    } catch (error) {
      console.error('[Analytics] Initialization error:', error);
    }
  }

  /**
   * Track an event across all platforms
   * @param event - Event name
   * @param properties - Event properties
   */
  track(event: string, properties?: AnalyticsEventProperties): void {
    if (!this.initialized) {
      if (ANALYTICS_CONFIG.debug) {
        console.warn('[Analytics] Not initialized, skipping track:', event);
      }
      return;
    }

    // Add timestamp to all events
    const enrichedProperties: AnalyticsEventProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE,
    };

    // Track to all platforms
    trackFirebase(event, enrichedProperties);
    trackAmplitude(event, enrichedProperties);
    trackClarity(event, enrichedProperties);

    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Event tracked:', event, enrichedProperties);
    }
  }

  /**
   * Track a page view
   * @param pageName - Page name/path
   * @param properties - Additional properties
   */
  page(pageName: string, properties?: AnalyticsEventProperties): void {
    const pageProperties: AnalyticsEventProperties = {
      page_name: pageName,
      page_path: window.location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      ...properties,
    };

    this.track('page_view', pageProperties);
  }

  /**
   * Identify a user across all platforms
   * @param userId - User ID
   * @param traits - User traits/properties
   */
  identify(userId: string, traits?: AnalyticsIdentifyTraits): void {
    if (!this.initialized) return;

    try {
      // Firebase Analytics
      const fbAnalytics = getFirebaseAnalytics();
      if (platformsInitialized.firebase && fbAnalytics) {
        setUserId(fbAnalytics, userId);
        if (traits) {
          const sanitized = sanitizeProperties(traits);
          if (sanitized) {
            setFirebaseUserProperties(fbAnalytics, sanitized);
          }
        }
      }

      // Amplitude
      if (platformsInitialized.amplitude) {
        const identifyEvent = new amplitude.Identify();

        if (traits) {
          Object.entries(traits).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              identifyEvent.set(key, value);
            }
          });
        }

        amplitude.setUserId(userId);
        amplitude.identify(identifyEvent);
      }

      // Clarity - identify via custom user ID
      if (platformsInitialized.clarity && window.clarity) {
        window.clarity('identify', userId);
      }

      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] User identified:', userId, traits);
      }
    } catch (error) {
      console.error('[Analytics] Identify error:', error);
    }
  }

  /**
   * Set user properties
   * @param properties - User properties
   */
  setUserProperties(properties: AnalyticsUserProperties): void {
    if (!this.initialized) return;

    try {
      const sanitized = sanitizeProperties(properties);
      if (!sanitized) return;

      // Firebase Analytics
      const fbAnalytics = getFirebaseAnalytics();
      if (platformsInitialized.firebase && fbAnalytics) {
        setFirebaseUserProperties(fbAnalytics, sanitized);
      }

      // Amplitude
      if (platformsInitialized.amplitude) {
        const identifyEvent = new amplitude.Identify();
        Object.entries(sanitized).forEach(([key, value]) => {
          if (value !== null) {
            identifyEvent.set(key, value);
          }
        });
        amplitude.identify(identifyEvent);
      }

      // Clarity - set as custom tags
      if (platformsInitialized.clarity && window.clarity) {
        Object.entries(sanitized).forEach(([key, value]) => {
          window.clarity?.('set', key, String(value));
        });
      }

      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] User properties set:', sanitized);
      }
    } catch (error) {
      console.error('[Analytics] Set user properties error:', error);
    }
  }

  /**
   * Reset user identification (call on logout)
   */
  reset(): void {
    if (!this.initialized) return;

    try {
      // Firebase Analytics - set user ID to null
      const fbAnalytics = getFirebaseAnalytics();
      if (platformsInitialized.firebase && fbAnalytics) {
        setUserId(fbAnalytics, null);
      }

      // Amplitude - reset
      if (platformsInitialized.amplitude) {
        amplitude.reset();
      }

      // Clarity - doesn't have a reset method, but we can clear custom tags
      // Note: Clarity session continues but user context is cleared

      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] User identification reset');
      }
    } catch (error) {
      console.error('[Analytics] Reset error:', error);
    }
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Export for direct usage if needed
export { AnalyticsEvents } from '@/types/analytics';
export type { AnalyticsEventName, AnalyticsEventProperties } from '@/types/analytics';
