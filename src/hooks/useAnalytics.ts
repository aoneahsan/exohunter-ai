/**
 * useAnalytics Hook
 * React hook for easy analytics tracking with automatic page view tracking
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/services/analytics';
import type {
  AnalyticsEventProperties,
  AnalyticsUserProperties,
  AnalyticsIdentifyTraits,
} from '@/types/analytics';

/**
 * Hook options
 */
interface UseAnalyticsOptions {
  /**
   * Automatically track page views on route changes
   * @default true
   */
  trackPageViews?: boolean;

  /**
   * Additional properties to include with every page view
   */
  pageViewProperties?: AnalyticsEventProperties;

  /**
   * Debounce delay for page view tracking (in ms)
   * @default 100
   */
  pageViewDebounce?: number;
}

/**
 * Analytics hook return type
 */
interface UseAnalyticsReturn {
  /**
   * Track an event
   * @param event - Event name
   * @param properties - Event properties
   */
  track: (event: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Track a page view
   * @param pageName - Page name/path
   * @param properties - Additional properties
   */
  trackPageView: (pageName?: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Identify a user
   * @param userId - User ID
   * @param traits - User traits/properties
   */
  identify: (userId: string, traits?: AnalyticsIdentifyTraits) => void;

  /**
   * Set user properties
   * @param properties - User properties
   */
  setUserProperties: (properties: AnalyticsUserProperties) => void;

  /**
   * Reset user identification
   */
  reset: () => void;

  /**
   * Track a button click
   * @param buttonName - Button name/label
   * @param properties - Additional properties
   */
  trackButtonClick: (buttonName: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Track a form submission
   * @param formName - Form name
   * @param properties - Additional properties
   */
  trackFormSubmit: (formName: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Track an error
   * @param errorMessage - Error message
   * @param errorContext - Error context/properties
   */
  trackError: (errorMessage: string, errorContext?: AnalyticsEventProperties) => void;

  /**
   * Track a modal/dialog open
   * @param modalName - Modal name
   * @param properties - Additional properties
   */
  trackModalOpen: (modalName: string, properties?: AnalyticsEventProperties) => void;

  /**
   * Track a modal/dialog close
   * @param modalName - Modal name
   * @param properties - Additional properties
   */
  trackModalClose: (modalName: string, properties?: AnalyticsEventProperties) => void;
}

/**
 * Get page name from pathname
 */
function getPageNameFromPath(pathname: string): string {
  // Remove leading slash and convert to title case
  const name = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' - ');

  return name || 'Home';
}

/**
 * Analytics Hook
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { track, trackButtonClick } = useAnalytics();
 *
 *   const handleClick = () => {
 *     trackButtonClick('submit-analysis', { dataPoints: 100 });
 *   };
 *
 *   return <button onClick={handleClick}>Submit</button>;
 * }
 * ```
 *
 * @example With auto page tracking disabled
 * ```tsx
 * function MyComponent() {
 *   const { trackPageView } = useAnalytics({ trackPageViews: false });
 *
 *   useEffect(() => {
 *     trackPageView('Custom Page Name', { section: 'analytics' });
 *   }, []);
 * }
 * ```
 */
export function useAnalytics(options: UseAnalyticsOptions = {}): UseAnalyticsReturn {
  const {
    trackPageViews = true,
    pageViewProperties,
    pageViewDebounce = 100,
  } = options;

  const location = useLocation();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathnameRef = useRef<string>('');

  // Track page views on route change
  useEffect(() => {
    if (!trackPageViews) return;

    // Skip if pathname hasn't changed (hash or query changes only)
    if (previousPathnameRef.current === location.pathname) return;

    previousPathnameRef.current = location.pathname;

    // Debounce page view tracking to avoid duplicate events during rapid navigation
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const pageName = getPageNameFromPath(location.pathname);
      analytics.page(pageName, {
        ...pageViewProperties,
        search: location.search,
        hash: location.hash,
      });
    }, pageViewDebounce);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [location, trackPageViews, pageViewProperties, pageViewDebounce]);

  // Memoized tracking functions
  const track = useCallback((event: string, properties?: AnalyticsEventProperties) => {
    analytics.track(event, properties);
  }, []);

  const trackPageView = useCallback(
    (pageName?: string, properties?: AnalyticsEventProperties) => {
      const name = pageName || getPageNameFromPath(location.pathname);
      analytics.page(name, properties);
    },
    [location.pathname]
  );

  const identify = useCallback((userId: string, traits?: AnalyticsIdentifyTraits) => {
    analytics.identify(userId, traits);
  }, []);

  const setUserProperties = useCallback((properties: AnalyticsUserProperties) => {
    analytics.setUserProperties(properties);
  }, []);

  const reset = useCallback(() => {
    analytics.reset();
  }, []);

  const trackButtonClick = useCallback(
    (buttonName: string, properties?: AnalyticsEventProperties) => {
      analytics.track('button_clicked', {
        button_name: buttonName,
        page: location.pathname,
        ...properties,
      });
    },
    [location.pathname]
  );

  const trackFormSubmit = useCallback(
    (formName: string, properties?: AnalyticsEventProperties) => {
      analytics.track('form_submitted', {
        form_name: formName,
        page: location.pathname,
        ...properties,
      });
    },
    [location.pathname]
  );

  const trackError = useCallback(
    (errorMessage: string, errorContext?: AnalyticsEventProperties) => {
      analytics.track('error_occurred', {
        error_message: errorMessage,
        page: location.pathname,
        ...errorContext,
      });
    },
    [location.pathname]
  );

  const trackModalOpen = useCallback(
    (modalName: string, properties?: AnalyticsEventProperties) => {
      analytics.track('modal_opened', {
        modal_name: modalName,
        page: location.pathname,
        ...properties,
      });
    },
    [location.pathname]
  );

  const trackModalClose = useCallback(
    (modalName: string, properties?: AnalyticsEventProperties) => {
      analytics.track('modal_closed', {
        modal_name: modalName,
        page: location.pathname,
        ...properties,
      });
    },
    [location.pathname]
  );

  return {
    track,
    trackPageView,
    identify,
    setUserProperties,
    reset,
    trackButtonClick,
    trackFormSubmit,
    trackError,
    trackModalOpen,
    trackModalClose,
  };
}

/**
 * Hook for tracking component mount/unmount
 * Useful for tracking component lifecycle events
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useComponentTracking('MyComponent', { section: 'analyzer' });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useComponentTracking(
  componentName: string,
  properties?: AnalyticsEventProperties
): void {
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Track component mount
    analytics.track('component_mounted', {
      component_name: componentName,
      ...properties,
    });

    // Track component unmount and time spent
    return () => {
      const timeSpent = Date.now() - mountTimeRef.current;
      analytics.track('component_unmounted', {
        component_name: componentName,
        time_spent_ms: timeSpent,
        ...properties,
      });
    };
  }, [componentName, properties]);
}

/**
 * Hook for tracking feature usage
 * Useful for tracking when a feature is used
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const trackFeature = useFeatureTracking();
 *
 *   const handleAnalyze = () => {
 *     trackFeature('exoplanet-analyzer', { dataPoints: 100 });
 *   };
 * }
 * ```
 */
export function useFeatureTracking(): (
  featureName: string,
  properties?: AnalyticsEventProperties
) => void {
  const location = useLocation();

  return useCallback(
    (featureName: string, properties?: AnalyticsEventProperties) => {
      analytics.track('feature_used', {
        feature_name: featureName,
        page: location.pathname,
        ...properties,
      });
    },
    [location.pathname]
  );
}
