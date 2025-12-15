# Error Handling System

Comprehensive error tracking and handling for the ExoHunter AI application.

**Author:** Ahsan Mahmood
**Email:** aoneahsan@gmail.com
**Website:** aoneahsan.com
**Last Updated:** 2025-12-15

---

## Overview

The ExoHunter AI error handling system provides comprehensive error tracking across multiple platforms with automatic error reporting, user-friendly fallback UIs, and seamless integration with existing analytics infrastructure.

### Key Features

- **Multi-Platform Error Tracking**: Integrates with Sentry, Firebase Crashlytics, Microsoft Clarity, and Amplitude
- **Graceful Degradation**: Works even if API keys are missing - no errors for unconfigured platforms
- **React Error Boundaries**: Catches component errors with beautiful space-themed fallback UI
- **Global Error Handlers**: Catches unhandled JavaScript errors and promise rejections
- **Rich Context**: Automatically includes device info, app version, user info, and custom context
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Production-Ready**: Optimized for production with automatic sampling and filtering

---

## Architecture

### Components

1. **Error Handler Service** (`src/services/error-handler.ts`)
   - Singleton service for reporting errors
   - Integrates with all error tracking platforms
   - Automatically enriches errors with context
   - Gracefully handles missing API keys

2. **Error Boundary Component** (`src/components/ErrorBoundary.tsx`)
   - React error boundary for catching component errors
   - Beautiful space-themed fallback UI
   - Provides retry and navigation options
   - Shows technical details in development mode

3. **useErrorHandler Hook** (`src/hooks/useErrorHandler.ts`)
   - React hook for easy error reporting
   - Specialized methods for different error types
   - Automatic context injection
   - Form error handling helpers

4. **Type Definitions** (`src/types/error-handler.ts`)
   - Comprehensive TypeScript types
   - Error severity levels
   - Error categories
   - Metadata interfaces

---

## Platform Integration

### Sentry (Optional)

**Setup:**
1. Create account at [sentry.io](https://sentry.io/)
2. Create new project (React)
3. Copy DSN from project settings
4. Add to `.env`:
   ```bash
   VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

**Features:**
- Full error stack traces
- Session replay
- Performance monitoring
- Release tracking
- Breadcrumb trail

**Configuration:**
- Automatically enabled if `VITE_SENTRY_DSN` is set
- Production: 20% trace sampling
- Development: 100% trace sampling
- Session replay on errors only

### Firebase Crashlytics (Optional - Native Only)

**Setup:**
1. Enable Crashlytics in Firebase Console
2. Add to `.env`:
   ```bash
   VITE_FIREBASE_CRASHLYTICS_ENABLED=true
   ```

**Features:**
- Native crash reporting (iOS/Android)
- Custom logs and keys
- User identification
- Automatic crash clustering

**Note:** Only works on native platforms (iOS/Android). Automatically disabled on web.

### Microsoft Clarity (Already Configured)

**Features:**
- Session recordings
- Heatmaps
- Error tracking via custom events
- User behavior insights

**Integration:**
- Uses existing Clarity setup from analytics service
- Automatically tracks errors as custom events
- Sets error context as custom tags

### Amplitude (Already Configured)

**Features:**
- Error event tracking
- User analytics
- Error funnel analysis
- Custom properties

**Integration:**
- Uses existing Amplitude setup from analytics service
- Tracks errors as `error_occurred` events
- Includes full error context in event properties

---

## Usage Examples

### Basic Error Reporting

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';

function MyComponent() {
  const { reportError } = useErrorHandler({
    feature: 'exoplanet-analyzer',
    componentName: 'AnalyzerForm'
  });

  const handleAction = async () => {
    try {
      // Your code here
      await someRiskyOperation();
    } catch (error) {
      await reportError(error as Error, {
        category: ErrorCategory.API,
        severity: ErrorSeverity.ERROR,
      });
      // Show user-friendly error message
    }
  };
}
```

### API Error Handling

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';

function DataFetcher() {
  const { reportApiError } = useErrorHandler();

  const fetchData = async () => {
    try {
      const response = await api.getExoplanets();
      return response.data;
    } catch (error) {
      // Automatically extracts status code, endpoint, method, etc.
      await reportApiError(error, { dataType: 'exoplanets' });
      throw error; // Re-throw to handle in UI
    }
  };
}
```

### Form Error Handling

```typescript
import { useForm } from 'react-hook-form';
import { useFormErrorHandler } from '@/hooks/useErrorHandler';

function RegistrationForm() {
  const { handleSubmit, formState: { errors } } = useForm();
  const { reportFormErrors } = useFormErrorHandler('registration-form');

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      reportFormErrors(errors);
    }
  }, [errors, reportFormErrors]);
}
```

### Wrapping Functions with Error Handling

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';

function MyComponent() {
  const { withErrorHandling } = useErrorHandler({
    feature: 'data-analysis'
  });

  // Automatically reports errors and re-throws
  const analyzeData = withErrorHandling(async (data) => {
    const result = await api.analyze(data);
    return result;
  }, {
    category: ErrorCategory.API,
  });

  const handleClick = async () => {
    try {
      const result = await analyzeData(myData);
      // Handle success
    } catch (error) {
      // Error already reported, just show UI feedback
      toast.error('Analysis failed');
    }
  };
}
```

### Adding Breadcrumbs

```typescript
import { useErrorHandler } from '@/hooks/useErrorHandler';

function DataProcessor() {
  const { addBreadcrumb } = useErrorHandler();

  const processData = async (data) => {
    addBreadcrumb('Started data processing', { rows: data.length });

    const cleaned = cleanData(data);
    addBreadcrumb('Data cleaned', { validRows: cleaned.length });

    const analyzed = analyzeData(cleaned);
    addBreadcrumb('Analysis complete', { results: analyzed.length });

    return analyzed;
  };
}
```

### Setting User Context

```typescript
import { errorHandler } from '@/services/error-handler';

// In your auth service or login handler
function onUserLogin(user) {
  errorHandler.setUser(user.uid, {
    email: user.email,
    displayName: user.displayName,
    plan: user.subscription?.plan,
  });
}

// On logout
function onUserLogout() {
  errorHandler.clearUser();
}
```

### Custom Error Boundary

```tsx
import { ErrorBoundary, withErrorBoundary } from '@/components/ErrorBoundary';

// Wrap entire app
function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}

// Wrap specific component
const SafeAnalyzer = withErrorBoundary(AnalyzerComponent);

// Use in JSX
<SafeAnalyzer data={data} />
```

### Direct Service Usage

```typescript
import { errorHandler, ErrorCategory, ErrorSeverity } from '@/services/error-handler';

// Report error directly
errorHandler.reportError(new Error('Something went wrong'), {
  category: ErrorCategory.API,
  severity: ErrorSeverity.ERROR,
  feature: 'data-sync',
  context: {
    syncType: 'full',
    itemsProcessed: 150,
  },
});

// Report handled exception (warning level)
errorHandler.reportHandledException('Invalid data format', {
  category: ErrorCategory.VALIDATION,
  context: { format: 'CSV', expectedColumns: 10, actualColumns: 8 },
});

// Add breadcrumb
errorHandler.addBreadcrumb('User clicked export button', {
  format: 'JSON',
  itemCount: 42,
});

// Set context
errorHandler.setContext('feature_flag_experiment', 'variant_b');
```

---

## Error Metadata

### Categories

- `NETWORK` - Network/connectivity errors
- `API` - API request/response errors
- `AUTH` - Authentication/authorization errors
- `VALIDATION` - Form/data validation errors
- `COMPONENT` - React component errors
- `STORAGE` - Local/cloud storage errors
- `UNKNOWN` - Uncategorized errors

### Severity Levels

- `INFO` - Informational, non-blocking issues
- `WARNING` - Handled exceptions, minor issues
- `ERROR` - Errors that affect functionality
- `FATAL` - Critical errors that crash the app

### Automatic Context

The error handler automatically includes:

- **Timestamp** - When the error occurred
- **Environment** - development/production
- **Page** - Current route/URL
- **Device Info** (if available):
  - Platform (web/ios/android)
  - Model
  - OS version
  - Manufacturer
- **App Info**:
  - Version
  - Build number
  - Name
- **User Info** (if authenticated):
  - User ID
  - Email
  - Display name

---

## Error Boundary UI

The error boundary displays a beautiful space-themed error page with:

- Animated stars background
- Floating planet elements
- Error message display
- "Try Again" button (resets error boundary)
- "Return Home" button (navigates to home page)
- Technical details (development mode only)

### Customization

You can provide a custom fallback component:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { ErrorBoundaryFallbackProps } from '@/types/error-handler';

function CustomErrorUI({ error, resetError }: ErrorBoundaryFallbackProps) {
  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.message}</p>
      <button onClick={resetError}>Try Again</button>
    </div>
  );
}

<ErrorBoundary fallback={CustomErrorUI}>
  <App />
</ErrorBoundary>
```

---

## Best Practices

### 1. Always Use Try-Catch in Async Functions

```typescript
// ✅ Good
async function fetchData() {
  try {
    const data = await api.getData();
    return data;
  } catch (error) {
    await reportApiError(error);
    throw error; // Re-throw to let caller handle
  }
}

// ❌ Bad - Unhandled error
async function fetchData() {
  const data = await api.getData(); // What if this fails?
  return data;
}
```

### 2. Include Meaningful Context

```typescript
// ✅ Good - Rich context
await reportError(error, {
  category: ErrorCategory.API,
  severity: ErrorSeverity.ERROR,
  feature: 'exoplanet-search',
  context: {
    searchQuery: query,
    filterCount: filters.length,
    pageNumber: page,
  },
});

// ❌ Bad - No context
await reportError(error);
```

### 3. Use Appropriate Severity Levels

```typescript
// ✅ Good - Correct severity
// Form validation error (user can fix)
await reportError(error, { severity: ErrorSeverity.WARNING });

// Critical API error (blocks functionality)
await reportError(error, { severity: ErrorSeverity.ERROR });

// ❌ Bad - Everything is ERROR
await reportError(validationError, { severity: ErrorSeverity.ERROR });
```

### 4. Add Breadcrumbs for Complex Flows

```typescript
// ✅ Good - Breadcrumb trail
addBreadcrumb('Started data import', { fileSize: size });
addBreadcrumb('File parsed', { rows: data.length });
addBreadcrumb('Validation started');
addBreadcrumb('Validation failed', { errors: validationErrors });
// Error has full context of what happened

// ❌ Bad - No breadcrumbs
// Error occurs but you don't know what led to it
```

### 5. Set User Context on Login/Logout

```typescript
// ✅ Good
onLogin(user => {
  errorHandler.setUser(user.uid, { email: user.email });
});

onLogout(() => {
  errorHandler.clearUser();
});

// ❌ Bad - Errors attributed to wrong user
```

### 6. Don't Report Expected Errors

```typescript
// ✅ Good - Don't report expected validation errors
if (!isValid(data)) {
  return { error: 'Invalid data' }; // Just return error
}

// ❌ Bad - Reporting expected business logic
if (!isValid(data)) {
  await reportError('Invalid data'); // This is not an error!
  return { error: 'Invalid data' };
}
```

---

## Testing

### Testing Error Reporting

```typescript
import { errorHandler } from '@/services/error-handler';

// Test error reporting
test('reports error with correct context', async () => {
  const error = new Error('Test error');
  const metadata = {
    category: ErrorCategory.API,
    severity: ErrorSeverity.ERROR,
    feature: 'test-feature',
  };

  await errorHandler.reportError(error, metadata);

  // Verify error was reported to platforms
  // (You'll need to mock the platform SDKs)
});
```

### Testing Error Boundary

```typescript
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

test('shows error UI when child throws', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText(/Houston, We Have a Problem/i)).toBeInTheDocument();
});
```

---

## Environment Variables

```bash
# Sentry (Optional)
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Firebase Crashlytics (Optional - Native only)
VITE_FIREBASE_CRASHLYTICS_ENABLED=true
```

**Note:** If these variables are not set, the corresponding platforms will be gracefully disabled without showing any errors.

---

## Troubleshooting

### Errors Not Appearing in Sentry

1. Check `VITE_SENTRY_DSN` is set correctly
2. Check browser console for Sentry initialization logs (dev mode)
3. Verify DSN is correct in Sentry dashboard
4. Check Sentry project settings allow your domain

### Crashlytics Not Working

1. Ensure `VITE_FIREBASE_CRASHLYTICS_ENABLED=true`
2. Only works on native platforms (iOS/Android)
3. Check Firebase console for Crashlytics setup
4. Verify Firebase is properly configured

### Errors Not Being Caught

1. Ensure ErrorBoundary wraps your app
2. Use `useGlobalErrorHandler()` in App.tsx
3. Check that errors are actually being thrown
4. Verify error boundary is not itself erroring

### Too Many Errors Reported

1. Adjust Sentry sampling rate in `error-handler.ts`
2. Filter non-critical errors before reporting
3. Use appropriate severity levels
4. Don't report expected/handled errors

---

## Performance Considerations

### Sampling

- **Sentry Production**: 20% trace sampling (configurable)
- **Sentry Development**: 100% sampling
- **Session Replay**: Only on errors (10% session sampling)

### Async Initialization

The error handler initializes asynchronously to avoid blocking app startup. Errors reported before initialization are queued and reported once initialized.

### Platform-Specific Loading

Firebase Crashlytics is only loaded on native platforms, reducing bundle size for web users.

---

## Related Documentation

- [Analytics System](./analytics.md)
- [Capacitor Services](../architecture/capacitor-services.md)
- [Error Boundary Component](../components/error-boundary.md)
- [React Hooks](../architecture/hooks.md)

---

## Support

For questions or issues:
- **Email:** aoneahsan@gmail.com
- **GitHub:** github.com/aoneahsan
- **Website:** aoneahsan.com
