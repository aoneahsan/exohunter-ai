/**
 * useErrorHandler Hook
 * React hook for easy error reporting and handling
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorHandler, ErrorCategory, ErrorSeverity } from '@/services/error-handler';
import type { ErrorMetadata, ErrorContext } from '@/types/error-handler';

/**
 * Hook options
 */
interface UseErrorHandlerOptions {
  /**
   * Feature/module name for context
   */
  feature?: string;

  /**
   * Component name for context
   */
  componentName?: string;

  /**
   * Additional context to include with all errors
   */
  context?: ErrorContext;

  /**
   * Callback when error is reported
   */
  onError?: (error: Error | string, metadata?: ErrorMetadata) => void;
}

/**
 * Hook return type
 */
interface UseErrorHandlerReturn {
  /**
   * Report a general error
   * @param error - Error object or message
   * @param metadata - Additional metadata
   */
  reportError: (error: Error | string, metadata?: Partial<ErrorMetadata>) => Promise<void>;

  /**
   * Report a handled exception (non-fatal)
   * @param error - Error object or message
   * @param metadata - Additional metadata
   */
  reportHandledException: (error: Error | string, metadata?: Partial<ErrorMetadata>) => Promise<void>;

  /**
   * Report an API error
   * @param error - Axios error or generic error
   * @param context - Additional context
   */
  reportApiError: (error: unknown, context?: ErrorContext) => Promise<void>;

  /**
   * Report a network error
   * @param error - Error object or message
   * @param context - Additional context
   */
  reportNetworkError: (error: Error | string, context?: ErrorContext) => Promise<void>;

  /**
   * Report an authentication error
   * @param error - Error object or message
   * @param context - Additional context
   */
  reportAuthError: (error: Error | string, context?: ErrorContext) => Promise<void>;

  /**
   * Report a validation error
   * @param error - Error object or message
   * @param formName - Form name
   * @param fields - Fields with errors
   */
  reportValidationError: (
    error: Error | string,
    formName?: string,
    fields?: Record<string, string>
  ) => Promise<void>;

  /**
   * Wrap an async function with error handling
   * @param fn - Async function to wrap
   * @param metadata - Metadata for errors
   */
  withErrorHandling: <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    metadata?: Partial<ErrorMetadata>
  ) => T;

  /**
   * Add a breadcrumb for debugging
   * @param message - Breadcrumb message
   * @param data - Additional data
   */
  addBreadcrumb: (message: string, data?: Record<string, unknown>) => void;
}

/**
 * Extract error details from Axios error
 */
function extractAxiosErrorDetails(error: AxiosError): {
  message: string;
  metadata: Partial<ErrorMetadata>;
} {
  const metadata: Partial<ErrorMetadata> = {
    category: ErrorCategory.API,
    apiEndpoint: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    statusCode: error.response?.status,
    context: {
      responseData: error.response?.data as string | number | boolean | null | undefined,
      requestData: error.config?.data as string | number | boolean | null | undefined,
    },
  };

  let message = error.message;

  if (error.response) {
    // Server responded with error status
    message = `API Error: ${error.response.status} - ${error.message}`;
    metadata.severity = error.response.status >= 500 ? ErrorSeverity.ERROR : ErrorSeverity.WARNING;
  } else if (error.request) {
    // Request made but no response
    message = 'Network Error: No response from server';
    metadata.category = ErrorCategory.NETWORK;
    metadata.severity = ErrorSeverity.ERROR;
  } else {
    // Error in request setup
    message = `Request Error: ${error.message}`;
    metadata.severity = ErrorSeverity.WARNING;
  }

  return { message, metadata };
}

/**
 * Error Handler Hook
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { reportError, reportApiError, withErrorHandling } = useErrorHandler({
 *     feature: 'exoplanet-analyzer',
 *     componentName: 'AnalyzerForm'
 *   });
 *
 *   const handleSubmit = withErrorHandling(async (data) => {
 *     try {
 *       await api.analyze(data);
 *     } catch (error) {
 *       await reportApiError(error);
 *       throw error; // Re-throw to handle in UI
 *     }
 *   });
 * }
 * ```
 *
 * @example With API error handling
 * ```tsx
 * const { reportApiError } = useErrorHandler();
 *
 * const fetchData = async () => {
 *   try {
 *     const response = await api.getData();
 *     return response.data;
 *   } catch (error) {
 *     await reportApiError(error, { dataType: 'exoplanets' });
 *     throw error;
 *   }
 * };
 * ```
 */
export function useErrorHandler(options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn {
  const { feature, componentName, context: baseContext, onError } = options;
  const location = useLocation();
  const mountTimeRef = useRef<number>(Date.now());

  // Add breadcrumb when component mounts
  useEffect(() => {
    if (componentName) {
      errorHandler.addBreadcrumb(`Component mounted: ${componentName}`, {
        feature,
        page: location.pathname,
      });
    }

    return () => {
      if (componentName) {
        const timeSpent = Date.now() - mountTimeRef.current;
        errorHandler.addBreadcrumb(`Component unmounted: ${componentName}`, {
          feature,
          page: location.pathname,
          timeSpentMs: timeSpent,
        });
      }
    };
  }, [componentName, feature, location.pathname]);

  /**
   * Build complete metadata from base and additional metadata
   */
  const buildMetadata = useCallback(
    (additionalMetadata?: Partial<ErrorMetadata>): ErrorMetadata => {
      return {
        ...additionalMetadata,
        feature: additionalMetadata?.feature || feature,
        componentName: additionalMetadata?.componentName || componentName,
        page: additionalMetadata?.page || location.pathname,
        context: {
          ...baseContext,
          ...additionalMetadata?.context,
        },
      };
    },
    [feature, componentName, location.pathname, baseContext]
  );

  /**
   * Report a general error
   */
  const reportError = useCallback(
    async (error: Error | string, metadata?: Partial<ErrorMetadata>): Promise<void> => {
      const completeMetadata = buildMetadata({
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.ERROR,
        ...metadata,
      });

      await errorHandler.reportError(error, completeMetadata);

      if (onError) {
        const errorObj = typeof error === 'string' ? new Error(error) : error;
        onError(errorObj, completeMetadata);
      }
    },
    [buildMetadata, onError]
  );

  /**
   * Report a handled exception
   */
  const reportHandledException = useCallback(
    async (error: Error | string, metadata?: Partial<ErrorMetadata>): Promise<void> => {
      const completeMetadata = buildMetadata({
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.WARNING,
        ...metadata,
      });

      await errorHandler.reportHandledException(error, completeMetadata);

      if (onError) {
        const errorObj = typeof error === 'string' ? new Error(error) : error;
        onError(errorObj, completeMetadata);
      }
    },
    [buildMetadata, onError]
  );

  /**
   * Report an API error
   */
  const reportApiError = useCallback(
    async (error: unknown, context?: ErrorContext): Promise<void> => {
      let message: string;
      let metadata: Partial<ErrorMetadata> = {
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
        context,
      };

      if (error instanceof AxiosError) {
        const details = extractAxiosErrorDetails(error);
        message = details.message;
        metadata = { ...metadata, ...details.metadata };
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      await reportError(message, metadata);
    },
    [reportError]
  );

  /**
   * Report a network error
   */
  const reportNetworkError = useCallback(
    async (error: Error | string, context?: ErrorContext): Promise<void> => {
      await reportError(error, {
        category: ErrorCategory.NETWORK,
        severity: ErrorSeverity.ERROR,
        context,
      });
    },
    [reportError]
  );

  /**
   * Report an authentication error
   */
  const reportAuthError = useCallback(
    async (error: Error | string, context?: ErrorContext): Promise<void> => {
      await reportError(error, {
        category: ErrorCategory.AUTH,
        severity: ErrorSeverity.WARNING,
        context,
      });
    },
    [reportError]
  );

  /**
   * Report a validation error
   */
  const reportValidationError = useCallback(
    async (
      error: Error | string,
      formName?: string,
      fields?: Record<string, string>
    ): Promise<void> => {
      await reportHandledException(error, {
        category: ErrorCategory.VALIDATION,
        severity: ErrorSeverity.INFO,
        context: {
          formName,
          fields,
        },
      });
    },
    [reportHandledException]
  );

  /**
   * Wrap an async function with error handling
   */
  const withErrorHandling = useCallback(
    <T extends (...args: any[]) => Promise<any>>(
      fn: T,
      metadata?: Partial<ErrorMetadata>
    ): T => {
      return (async (...args: any[]) => {
        try {
          return await fn(...args);
        } catch (error) {
          if (error instanceof Error) {
            await reportError(error, metadata);
          } else {
            await reportError(String(error), metadata);
          }
          throw error; // Re-throw to allow caller to handle
        }
      }) as T;
    },
    [reportError]
  );

  /**
   * Add a breadcrumb
   */
  const addBreadcrumb = useCallback(
    (message: string, data?: Record<string, unknown>): void => {
      errorHandler.addBreadcrumb(message, {
        feature,
        componentName,
        page: location.pathname,
        ...data,
      });
    },
    [feature, componentName, location.pathname]
  );

  return {
    reportError,
    reportHandledException,
    reportApiError,
    reportNetworkError,
    reportAuthError,
    reportValidationError,
    withErrorHandling,
    addBreadcrumb,
  };
}

/**
 * Hook for handling form errors
 * Specialized hook for React Hook Form integration
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const { handleSubmit, formState: { errors } } = useForm();
 *   const { reportFormErrors } = useFormErrorHandler('registration-form');
 *
 *   useEffect(() => {
 *     if (Object.keys(errors).length > 0) {
 *       reportFormErrors(errors);
 *     }
 *   }, [errors]);
 * }
 * ```
 */
export function useFormErrorHandler(formName: string) {
  const { reportValidationError } = useErrorHandler({
    feature: `form-${formName}`,
  });

  const reportFormErrors = useCallback(
    async (errors: Record<string, any>): Promise<void> => {
      const errorFields = Object.entries(errors).reduce((acc, [field, error]) => {
        acc[field] = error?.message || 'Validation error';
        return acc;
      }, {} as Record<string, string>);

      await reportValidationError(
        `Form validation failed: ${Object.keys(errors).length} errors`,
        formName,
        errorFields
      );
    },
    [formName, reportValidationError]
  );

  return { reportFormErrors };
}

/**
 * Hook for global error event listeners
 * Use this in App.tsx to catch unhandled errors
 *
 * @example
 * ```tsx
 * function App() {
 *   useGlobalErrorHandler();
 *   return <YourApp />;
 * }
 * ```
 */
export function useGlobalErrorHandler(): void {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      errorHandler.reportError(event.error || event.message, {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.ERROR,
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      errorHandler.reportError(event.reason || 'Unhandled Promise Rejection', {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.ERROR,
        context: {
          promise: true,
        },
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
}
