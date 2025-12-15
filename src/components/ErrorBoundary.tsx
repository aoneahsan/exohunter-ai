/**
 * Error Boundary Component
 * Catches React component errors and displays a fallback UI
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw, Bug, Moon, Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { errorHandler, ErrorCategory, ErrorSeverity } from '@/services/error-handler';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorBoundaryFallbackProps,
} from '@/types/error-handler';

/**
 * Default fallback UI for error boundary
 */
class DefaultErrorFallback extends Component<ErrorBoundaryFallbackProps> {
  render() {
    const { error, resetError } = this.props;

    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950/20 via-space-900 to-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 text-red-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Moon className="w-24 h-24 sm:w-32 sm:h-32" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-red-500/20"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Orbit className="w-20 h-20 sm:w-28 sm:h-28" />
        </motion.div>

        <div className="max-w-2xl w-full relative z-10">
          <Card className="bg-card/80 backdrop-blur-lg border-red-500/20">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-3xl sm:text-4xl font-bold">
                  Houston, We Have a Problem
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Something went wrong in the cosmic void
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-red-950/20 border border-red-500/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <Bug className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-400 mb-1">Error Details</p>
                    <p className="text-sm text-muted-foreground break-words">
                      {error.message || 'An unexpected error occurred'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-3"
              >
                <p className="text-muted-foreground text-sm">
                  Don't worry! Our mission control team has been notified and is working on a fix.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={resetError}
                    className="gap-2"
                    variant="default"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    className="gap-2"
                    variant="outline"
                  >
                    <Home className="w-4 h-4" />
                    Return Home
                  </Button>
                </div>
              </motion.div>

              {import.meta.env.DEV && error.stack && (
                <motion.details
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs"
                >
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground mb-2">
                    Technical Details (Development Only)
                  </summary>
                  <pre className="bg-background/50 border border-border rounded p-3 overflow-x-auto text-xs">
                    {error.stack}
                  </pre>
                </motion.details>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

/**
 * Error Boundary Component
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 *
 * @example With custom fallback
 * ```tsx
 * <ErrorBoundary fallback={CustomErrorUI}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Report error to error handler service
    errorHandler.reportError(error, {
      category: ErrorCategory.COMPONENT,
      severity: ErrorSeverity.ERROR,
      componentName: this.getComponentName(errorInfo),
      componentStack: errorInfo.componentStack || undefined,
      page: window.location.pathname,
      context: {
        errorBoundary: true,
        userAgent: navigator.userAgent,
      },
    });

    // Call custom onError handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  /**
   * Extract component name from error info
   */
  private getComponentName(errorInfo: ErrorInfo): string {
    const stack = errorInfo.componentStack;
    if (!stack) return 'Unknown';

    // Try to extract the first component name from the stack
    const match = stack.match(/^\s*at\s+(\w+)/);
    return match ? match[1] : 'Unknown';
  }

  /**
   * Reset error state
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Call custom onReset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap a component with error boundary
 *
 * @example
 * ```tsx
 * const SafeComponent = withErrorBoundary(MyComponent);
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
