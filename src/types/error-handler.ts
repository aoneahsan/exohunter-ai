/**
 * Error Handler Types
 * TypeScript definitions for error tracking and handling
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

/**
 * Error severity levels
 */
export const ErrorSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  FATAL: 'fatal',
} as const;

export type ErrorSeverity = typeof ErrorSeverity[keyof typeof ErrorSeverity];

/**
 * Error categories
 */
export const ErrorCategory = {
  NETWORK: 'network',
  API: 'api',
  AUTH: 'authentication',
  VALIDATION: 'validation',
  COMPONENT: 'component',
  STORAGE: 'storage',
  UNKNOWN: 'unknown',
} as const;

export type ErrorCategory = typeof ErrorCategory[keyof typeof ErrorCategory];

/**
 * Error context interface
 */
export interface ErrorContext {
  [key: string]: string | number | boolean | null | undefined | object;
}

/**
 * Error metadata
 */
export interface ErrorMetadata {
  /**
   * Error category
   */
  category?: ErrorCategory;

  /**
   * Error severity level
   */
  severity?: ErrorSeverity;

  /**
   * User ID (if authenticated)
   */
  userId?: string;

  /**
   * Current page/route
   */
  page?: string;

  /**
   * Feature/module where error occurred
   */
  feature?: string;

  /**
   * Component name (for React errors)
   */
  componentName?: string;

  /**
   * Component stack trace
   */
  componentStack?: string;

  /**
   * API endpoint (for API errors)
   */
  apiEndpoint?: string;

  /**
   * HTTP status code (for API errors)
   */
  statusCode?: number;

  /**
   * Request method (for API errors)
   */
  method?: string;

  /**
   * Device information
   */
  deviceInfo?: {
    platform?: string;
    model?: string;
    osVersion?: string;
    manufacturer?: string;
    isVirtual?: boolean;
    webViewVersion?: string;
  };

  /**
   * App information
   */
  appInfo?: {
    version?: string;
    build?: string;
    name?: string;
  };

  /**
   * Network information
   */
  networkInfo?: {
    connected?: boolean;
    connectionType?: string;
  };

  /**
   * Additional context
   */
  context?: ErrorContext;

  /**
   * Timestamp
   */
  timestamp?: string;

  /**
   * Environment
   */
  environment?: string;
}

/**
 * Error tracking platform types
 */
export type ErrorTrackingPlatform = 'sentry' | 'firebase_crashlytics' | 'clarity' | 'amplitude';

/**
 * Error Handler Service Interface
 */
export interface IErrorHandlerService {
  /**
   * Report an error to all configured platforms
   * @param error - Error object or message
   * @param metadata - Error metadata
   */
  reportError(error: Error | string, metadata?: ErrorMetadata): void;

  /**
   * Report a handled exception
   * @param error - Error object or message
   * @param metadata - Error metadata
   */
  reportHandledException(error: Error | string, metadata?: ErrorMetadata): void;

  /**
   * Set user context for error tracking
   * @param userId - User ID
   * @param userInfo - Additional user information
   */
  setUser(userId: string | null, userInfo?: Record<string, unknown>): void;

  /**
   * Set custom context/tags
   * @param key - Context key
   * @param value - Context value
   */
  setContext(key: string, value: unknown): void;

  /**
   * Add breadcrumb for debugging
   * @param message - Breadcrumb message
   * @param data - Additional data
   */
  addBreadcrumb(message: string, data?: Record<string, unknown>): void;

  /**
   * Clear user context (on logout)
   */
  clearUser(): void;
}

/**
 * React Error Boundary State
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

/**
 * Error Boundary Props
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

/**
 * Error Boundary Fallback Props
 */
export interface ErrorBoundaryFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo | null;
  resetError: () => void;
}
