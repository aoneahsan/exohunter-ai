/**
 * Error Handler Usage Examples
 * Real-world examples of using the error handling system
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useErrorHandler, useFormErrorHandler } from '@/hooks/useErrorHandler';
import { ErrorCategory, ErrorSeverity } from '@/types/error-handler';
import { errorHandler } from '@/services/error-handler';

// ============================================================================
// Example 1: Basic Error Reporting in a Component
// ============================================================================

export function BasicErrorExample() {
  const { reportError, addBreadcrumb } = useErrorHandler({
    feature: 'exoplanet-search',
    componentName: 'SearchForm',
  });

  const handleSearch = async (query: string) => {
    try {
      addBreadcrumb('User initiated search', { query });

      const results = await searchExoplanets(query);

      addBreadcrumb('Search completed', { resultCount: results.length });

      return results;
    } catch (error) {
      await reportError(error as Error, {
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
        context: {
          searchQuery: query,
          timestamp: new Date().toISOString(),
        },
      });

      throw error; // Re-throw to handle in UI
    }
  };

  return (
    <div>
      <Button onClick={() => handleSearch('Kepler')}>Search</Button>
    </div>
  );
}

// ============================================================================
// Example 2: API Error Handling with Automatic Context Extraction
// ============================================================================

export function ApiErrorExample() {
  const { reportApiError } = useErrorHandler({
    feature: 'data-fetcher',
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/exoplanets');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      // Automatically extracts API details (endpoint, status, method, etc.)
      await reportApiError(error, {
        operation: 'fetch_exoplanets',
        retryable: true,
      });

      // Show user-friendly error
      alert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exoplanet Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Load Data'}
        </Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Example 3: Form Error Handling with React Hook Form
// ============================================================================

interface RegistrationFormData {
  email: string;
  password: string;
  displayName: string;
}

export function FormErrorExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const { reportFormErrors } = useFormErrorHandler('registration-form');
  const { reportError } = useErrorHandler({
    feature: 'user-registration',
  });

  // Report validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      reportFormErrors(errors);
    }
  }, [errors, reportFormErrors]);

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await registerUser(data);
      // Success handling
    } catch (error) {
      await reportError(error as Error, {
        category: ErrorCategory.AUTH,
        severity: ErrorSeverity.ERROR,
        context: {
          email: data.email,
          hasDisplayName: !!data.displayName,
        },
      });

      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email is required' })} />
      <input {...register('password', { required: 'Password is required' })} />
      <input {...register('displayName')} />
      <Button type="submit">Register</Button>
    </form>
  );
}

// ============================================================================
// Example 4: Wrapping Functions with Automatic Error Handling
// ============================================================================

export function WrappedFunctionExample() {
  const { withErrorHandling, addBreadcrumb } = useErrorHandler({
    feature: 'data-analysis',
  });

  // This function automatically reports errors
  const analyzeData = withErrorHandling(
    async (data: number[]) => {
      addBreadcrumb('Starting analysis', { dataPoints: data.length });

      if (data.length < 10) {
        throw new Error('Insufficient data points');
      }

      const result = await performComplexAnalysis(data);

      addBreadcrumb('Analysis complete', { result: result.summary });

      return result;
    },
    {
      category: ErrorCategory.COMPONENT,
      severity: ErrorSeverity.ERROR,
    }
  );

  const handleAnalyze = async () => {
    try {
      const result = await analyzeData([1, 2, 3, 4, 5]);
      console.log('Analysis result:', result);
    } catch (error) {
      // Error already reported, just show UI feedback
      alert('Analysis failed');
    }
  };

  return <Button onClick={handleAnalyze}>Analyze</Button>;
}

// ============================================================================
// Example 5: Network Error Handling
// ============================================================================

export function NetworkErrorExample() {
  const { reportNetworkError, addBreadcrumb } = useErrorHandler({
    feature: 'data-sync',
  });

  const syncData = async () => {
    addBreadcrumb('Sync started');

    try {
      await fetch('/api/sync', {
        method: 'POST',
        body: JSON.stringify({ data: 'example' }),
      });

      addBreadcrumb('Sync successful');
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // Network error
        await reportNetworkError('Failed to connect to server', {
          action: 'sync_data',
          offline: !navigator.onLine,
        });

        alert('No network connection. Please check your internet.');
      } else {
        // Other error
        await reportNetworkError(error as Error, {
          action: 'sync_data',
        });
      }
    }
  };

  return <Button onClick={syncData}>Sync Data</Button>;
}

// ============================================================================
// Example 6: Setting User Context on Login
// ============================================================================

export function LoginExample() {
  const { reportAuthError } = useErrorHandler({
    feature: 'authentication',
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);

      // Set user context for all future errors
      errorHandler.setUser(user.uid, {
        email: user.email,
        displayName: user.displayName,
        plan: user.subscription?.plan || 'free',
        joinedAt: user.createdAt,
      });

      // Also set context for analytics
      errorHandler.setContext('user_plan', user.subscription?.plan || 'free');
      errorHandler.setContext('user_verified', user.emailVerified);

    } catch (error) {
      await reportAuthError(error as Error, {
        email,
        method: 'email_password',
      });

      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    // Clear user context
    errorHandler.clearUser();
  };

  return (
    <div>
      <Button onClick={() => handleLogin('user@example.com', 'password123')}>
        Login
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

// ============================================================================
// Example 7: Complex Flow with Breadcrumbs
// ============================================================================

export function ComplexFlowExample() {
  const { reportError, addBreadcrumb } = useErrorHandler({
    feature: 'data-import',
  });

  const importData = async (file: File) => {
    try {
      addBreadcrumb('Import started', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // Step 1: Read file
      const content = await readFile(file);
      addBreadcrumb('File read', { contentLength: content.length });

      // Step 2: Parse CSV
      const rows = parseCSV(content);
      addBreadcrumb('CSV parsed', { rowCount: rows.length });

      // Step 3: Validate data
      const validationErrors = validateRows(rows);
      if (validationErrors.length > 0) {
        addBreadcrumb('Validation failed', {
          errorCount: validationErrors.length,
        });
        throw new Error(`Validation failed: ${validationErrors.length} errors`);
      }
      addBreadcrumb('Validation passed');

      // Step 4: Upload to server
      await uploadData(rows);
      addBreadcrumb('Upload complete', { rowsUploaded: rows.length });

      return { success: true, rows: rows.length };
    } catch (error) {
      // All breadcrumbs are included with the error
      await reportError(error as Error, {
        category: ErrorCategory.COMPONENT,
        severity: ErrorSeverity.ERROR,
        context: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });

      throw error;
    }
  };

  return <div>Import Example</div>;
}

// ============================================================================
// Example 8: Handled Exception (Warning Level)
// ============================================================================

export function HandledExceptionExample() {
  const { reportHandledException } = useErrorHandler({
    feature: 'data-processor',
  });

  const processData = async (data: any[]) => {
    const results = [];

    for (const item of data) {
      try {
        const processed = await processItem(item);
        results.push(processed);
      } catch (error) {
        // Report as handled exception (warning level)
        // This won't trigger alerts but will be tracked
        await reportHandledException(error as Error, {
          category: ErrorCategory.COMPONENT,
          severity: ErrorSeverity.WARNING,
          context: {
            itemId: item.id,
            itemType: item.type,
          },
        });

        // Continue processing other items
        continue;
      }
    }

    return results;
  };

  return <div>Process Data</div>;
}

// ============================================================================
// Mock Functions (for demonstration)
// ============================================================================

async function searchExoplanets(query: string): Promise<any[]> {
  return [];
}

async function registerUser(data: RegistrationFormData): Promise<void> {
  // Mock implementation
}

async function performComplexAnalysis(data: number[]): Promise<any> {
  return { summary: 'Analysis complete' };
}

async function loginUser(email: string, password: string): Promise<any> {
  return { uid: '123', email, displayName: 'Test User' };
}

async function readFile(file: File): Promise<string> {
  return 'file content';
}

function parseCSV(content: string): any[] {
  return [];
}

function validateRows(rows: any[]): string[] {
  return [];
}

async function uploadData(rows: any[]): Promise<void> {
  // Mock implementation
}

async function processItem(item: any): Promise<any> {
  return item;
}
