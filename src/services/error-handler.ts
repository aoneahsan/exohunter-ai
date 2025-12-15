/**
 * Error Handler Service
 * Centralized error tracking for Sentry, Firebase Crashlytics, Microsoft Clarity, and Amplitude
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import * as Sentry from '@sentry/react';
import { analytics } from '@/services/analytics';
import type {
  ErrorMetadata,
  ErrorSeverity,
  IErrorHandlerService,
  ErrorTrackingPlatform,
} from '@/types/error-handler';
import { getDeviceInfo, getAppInfo, isNativePlatform } from '@/services/capacitor';

// Declare Clarity global
declare global {
  interface Window {
    clarity?: (action: string, ...args: unknown[]) => void;
  }
}

/**
 * Error tracking configuration
 */
const ERROR_CONFIG = {
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN,
    enabled: !!import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  },
  crashlytics: {
    enabled: import.meta.env.VITE_FIREBASE_CRASHLYTICS_ENABLED === 'true' && isNativePlatform(),
  },
  clarity: {
    enabled: !!import.meta.env.VITE_CLARITY_PROJECT_ID,
  },
  amplitude: {
    enabled: !!import.meta.env.VITE_AMPLITUDE_API_KEY,
  },
  debug: import.meta.env.DEV,
};

/**
 * Platforms initialization status
 */
const platformsInitialized: Record<ErrorTrackingPlatform, boolean> = {
  sentry: false,
  firebase_crashlytics: false,
  clarity: false,
  amplitude: false,
};

// Note: Firebase Crashlytics is only available on native platforms
// For web, we rely on Sentry, Clarity, and Amplitude

/**
 * Initialize error tracking platforms
 */
async function initializeErrorTracking(): Promise<void> {
  // Initialize Sentry
  if (ERROR_CONFIG.sentry.enabled) {
    try {
      Sentry.init({
        dsn: ERROR_CONFIG.sentry.dsn,
        environment: ERROR_CONFIG.sentry.environment,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        tracesSampleRate: ERROR_CONFIG.sentry.tracesSampleRate,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        beforeSend(event) {
          // Filter out non-error events in production
          if (import.meta.env.PROD && event.level !== 'error' && event.level !== 'fatal') {
            return null;
          }
          return event;
        },
      });

      platformsInitialized.sentry = true;

      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] Sentry initialized');
      }
    } catch (error) {
      console.error('[ErrorHandler] Failed to initialize Sentry:', error);
    }
  }

  // Initialize Firebase Crashlytics (native platforms only)
  if (ERROR_CONFIG.crashlytics.enabled) {
    try {
      // Note: Firebase Crashlytics is only available in the native Firebase SDK
      // For web, we rely on Sentry, Clarity, and Amplitude
      // This is a placeholder for future native implementation
      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] Firebase Crashlytics skipped (web platform)');
      }
    } catch (error) {
      if (ERROR_CONFIG.debug) {
        console.warn('[ErrorHandler] Firebase Crashlytics not available:', error);
      }
    }
  }

  // Clarity is already initialized via analytics service
  if (ERROR_CONFIG.clarity.enabled) {
    platformsInitialized.clarity = true;
  }

  // Amplitude is already initialized via analytics service
  if (ERROR_CONFIG.amplitude.enabled) {
    platformsInitialized.amplitude = true;
  }

  if (ERROR_CONFIG.debug) {
    console.log('[ErrorHandler] Platforms initialized:', platformsInitialized);
  }
}

/**
 * Get enriched error metadata with device and app info
 */
async function getEnrichedMetadata(metadata?: ErrorMetadata): Promise<ErrorMetadata> {
  const enriched: ErrorMetadata = {
    ...metadata,
    timestamp: new Date().toISOString(),
    environment: import.meta.env.MODE,
    page: metadata?.page || window.location.pathname,
  };

  // Add device info
  try {
    if (isNativePlatform()) {
      const deviceInfo = await getDeviceInfo();
      enriched.deviceInfo = {
        platform: deviceInfo.platform,
        model: deviceInfo.model,
        osVersion: deviceInfo.osVersion,
        manufacturer: deviceInfo.manufacturer,
        isVirtual: deviceInfo.isVirtual,
        webViewVersion: deviceInfo.webViewVersion,
      };
    } else {
      enriched.deviceInfo = {
        platform: 'web',
        model: navigator.userAgent,
      };
    }
  } catch (error) {
    if (ERROR_CONFIG.debug) {
      console.warn('[ErrorHandler] Failed to get device info:', error);
    }
  }

  // Add app info
  try {
    if (isNativePlatform()) {
      const appInfo = await getAppInfo();
      enriched.appInfo = {
        version: appInfo.version,
        build: appInfo.build,
        name: appInfo.name,
      };
    } else {
      enriched.appInfo = {
        version: import.meta.env.VITE_APP_VERSION,
        name: import.meta.env.VITE_APP_NAME,
      };
    }
  } catch (error) {
    if (ERROR_CONFIG.debug) {
      console.warn('[ErrorHandler] Failed to get app info:', error);
    }
  }

  return enriched;
}

/**
 * Report error to Sentry
 */
function reportToSentry(error: Error | string, metadata?: ErrorMetadata): void {
  if (!platformsInitialized.sentry) return;

  try {
    const errorObj = typeof error === 'string' ? new Error(error) : error;

    // Set context
    if (metadata) {
      if (metadata.category) {
        Sentry.setTag('error_category', metadata.category);
      }
      if (metadata.severity) {
        Sentry.setTag('severity', metadata.severity);
      }
      if (metadata.feature) {
        Sentry.setTag('feature', metadata.feature);
      }
      if (metadata.page) {
        Sentry.setTag('page', metadata.page);
      }
      if (metadata.apiEndpoint) {
        Sentry.setContext('api', {
          endpoint: metadata.apiEndpoint,
          method: metadata.method,
          statusCode: metadata.statusCode,
        });
      }
      if (metadata.deviceInfo) {
        Sentry.setContext('device', metadata.deviceInfo);
      }
      if (metadata.appInfo) {
        Sentry.setContext('app', metadata.appInfo);
      }
      if (metadata.context) {
        Sentry.setContext('additional', metadata.context);
      }
    }

    // Capture exception
    Sentry.captureException(errorObj, {
      level: metadata?.severity as Sentry.SeverityLevel || 'error',
    });

    if (ERROR_CONFIG.debug) {
      console.log('[ErrorHandler] Sentry reported:', errorObj, metadata);
    }
  } catch (err) {
    console.error('[ErrorHandler] Sentry reporting error:', err);
  }
}

/**
 * Report error to Firebase Crashlytics
 * Note: Currently disabled for web - use Sentry, Clarity, Amplitude instead
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function reportToCrashlytics(_error: Error | string, _metadata?: ErrorMetadata): void {
  // Firebase Crashlytics is not supported on web
  // For native platforms, this would be implemented using the native Firebase SDK
  return;
}

/**
 * Report error to Microsoft Clarity
 */
function reportToClarity(error: Error | string, metadata?: ErrorMetadata): void {
  if (!platformsInitialized.clarity || typeof window === 'undefined') return;

  try {
    const errorMessage = typeof error === 'string' ? error : error.message;

    if (window.clarity) {
      // Set custom tags for error
      window.clarity('set', 'error_occurred', 'true');
      if (metadata?.category) {
        window.clarity('set', 'error_category', metadata.category);
      }
      if (metadata?.severity) {
        window.clarity('set', 'error_severity', metadata.severity);
      }
      if (metadata?.page) {
        window.clarity('set', 'error_page', metadata.page);
      }

      // Track error event
      window.clarity('event', 'error_occurred');

      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] Clarity reported:', errorMessage, metadata);
      }
    }
  } catch (err) {
    console.error('[ErrorHandler] Clarity reporting error:', err);
  }
}

/**
 * Report error to Amplitude
 */
function reportToAmplitude(error: Error | string, metadata?: ErrorMetadata): void {
  if (!platformsInitialized.amplitude) return;

  try {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorStack = typeof error === 'string' ? undefined : error.stack;

    // Track error event via analytics service
    analytics.track('error_occurred', {
      error_message: errorMessage,
      error_stack: errorStack,
      error_category: metadata?.category,
      error_severity: metadata?.severity,
      error_feature: metadata?.feature,
      error_page: metadata?.page,
      error_component: metadata?.componentName,
      api_endpoint: metadata?.apiEndpoint,
      status_code: metadata?.statusCode,
      method: metadata?.method,
      ...metadata?.context,
    });

    if (ERROR_CONFIG.debug) {
      console.log('[ErrorHandler] Amplitude reported:', errorMessage, metadata);
    }
  } catch (err) {
    console.error('[ErrorHandler] Amplitude reporting error:', err);
  }
}

/**
 * Error Handler Service Implementation
 */
class ErrorHandlerService implements IErrorHandlerService {
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializationPromise = this.initialize();
    }
  }

  /**
   * Initialize error tracking platforms
   */
  private async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await initializeErrorTracking();
      this.initialized = true;
    } catch (error) {
      console.error('[ErrorHandler] Initialization error:', error);
    }
  }

  /**
   * Ensure service is initialized before use
   */
  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  /**
   * Report an error to all configured platforms
   * @param error - Error object or message
   * @param metadata - Error metadata
   */
  async reportError(error: Error | string, metadata?: ErrorMetadata): Promise<void> {
    await this.ensureInitialized();

    if (!this.initialized && !ERROR_CONFIG.debug) {
      return;
    }

    const enrichedMetadata = await getEnrichedMetadata(metadata);

    // Report to all platforms
    reportToSentry(error, enrichedMetadata);
    reportToCrashlytics(error, enrichedMetadata);
    reportToClarity(error, enrichedMetadata);
    reportToAmplitude(error, enrichedMetadata);

    // Always log to console in development
    if (ERROR_CONFIG.debug) {
      console.error('[ErrorHandler] Error reported:', error, enrichedMetadata);
    }
  }

  /**
   * Report a handled exception
   * @param error - Error object or message
   * @param metadata - Error metadata
   */
  async reportHandledException(error: Error | string, metadata?: ErrorMetadata): Promise<void> {
    await this.reportError(error, {
      ...metadata,
      severity: metadata?.severity || 'warning' as ErrorSeverity,
    });
  }

  /**
   * Set user context for error tracking
   * @param userId - User ID
   * @param userInfo - Additional user information
   */
  setUser(userId: string | null, userInfo?: Record<string, unknown>): void {
    if (!this.initialized) return;

    try {
      // Sentry
      if (platformsInitialized.sentry) {
        if (userId) {
          Sentry.setUser({
            id: userId,
            ...userInfo,
          });
        } else {
          Sentry.setUser(null);
        }
      }

      // Clarity - handled via analytics service

      // Amplitude - handled via analytics service

      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] User set:', userId, userInfo);
      }
    } catch (error) {
      console.error('[ErrorHandler] Set user error:', error);
    }
  }

  /**
   * Set custom context/tags
   * @param key - Context key
   * @param value - Context value
   */
  setContext(key: string, value: unknown): void {
    if (!this.initialized) return;

    try {
      // Sentry
      if (platformsInitialized.sentry) {
        Sentry.setTag(key, String(value));
      }

      // Clarity
      if (platformsInitialized.clarity && window.clarity) {
        window.clarity('set', key, String(value));
      }

      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] Context set:', key, value);
      }
    } catch (error) {
      console.error('[ErrorHandler] Set context error:', error);
    }
  }

  /**
   * Add breadcrumb for debugging
   * @param message - Breadcrumb message
   * @param data - Additional data
   */
  addBreadcrumb(message: string, data?: Record<string, unknown>): void {
    if (!this.initialized) return;

    try {
      // Sentry
      if (platformsInitialized.sentry) {
        Sentry.addBreadcrumb({
          message,
          data,
          timestamp: Date.now() / 1000,
        });
      }

      if (ERROR_CONFIG.debug) {
        console.log('[ErrorHandler] Breadcrumb added:', message, data);
      }
    } catch (error) {
      console.error('[ErrorHandler] Add breadcrumb error:', error);
    }
  }

  /**
   * Clear user context (on logout)
   */
  clearUser(): void {
    this.setUser(null);
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandlerService();

// Export types and enums
export { ErrorSeverity, ErrorCategory } from '@/types/error-handler';
export type { ErrorMetadata, ErrorContext } from '@/types/error-handler';
