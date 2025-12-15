# Error Handler - Quick Start Guide

**Author:** Ahsan Mahmood | **Email:** aoneahsan@gmail.com | **Website:** aoneahsan.com

---

## Overview

Comprehensive error tracking system for ExoHunter AI that integrates with:
- **Sentry** (optional) - Full error tracking with session replay
- **Firebase Crashlytics** (optional, native only) - Native crash reporting
- **Microsoft Clarity** (already configured) - Session recordings + error tracking
- **Amplitude** (already configured) - Error analytics

**Key Feature:** Gracefully handles missing API keys - no errors if platforms aren't configured!

---

## Quick Setup

### 1. Install Dependencies

Already installed:
```bash
yarn add @sentry/react
```

### 2. Configure Environment Variables

Add to your `.env` file (both are optional):

```bash
# Sentry (Optional)
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Firebase Crashlytics (Optional - Native only)
VITE_FIREBASE_CRASHLYTICS_ENABLED=true
```

**Note:** If you don't set these, the platforms will be automatically disabled without errors.

### 3. Wrap Your App with Error Boundary

Already done in `src/App.tsx`:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useGlobalErrorHandler } from '@/hooks/useErrorHandler';

function App() {
  useGlobalErrorHandler(); // Catches unhandled errors

  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

---

## Basic Usage

### In Components

```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler';

function MyComponent() {
  const { reportError, reportApiError } = useErrorHandler({
    feature: 'exoplanet-analyzer',
    componentName: 'AnalyzerForm'
  });

  const handleAction = async () => {
    try {
      await api.analyze(data);
    } catch (error) {
      await reportApiError(error);
      toast.error('Analysis failed');
    }
  };
}
```

### Direct Service Usage

```tsx
import { errorHandler } from '@/services/error-handler';

// Report error
errorHandler.reportError(new Error('Something went wrong'), {
  category: 'api',
  severity: 'error',
  context: { customField: 'value' }
});

// Set user context (on login)
errorHandler.setUser(userId, { email, displayName });

// Clear user context (on logout)
errorHandler.clearUser();
```

---

## Common Patterns

### 1. API Error Handling

```tsx
const { reportApiError } = useErrorHandler();

try {
  const data = await api.getData();
} catch (error) {
  await reportApiError(error, { operation: 'fetch_data' });
  throw error; // Re-throw to handle in UI
}
```

### 2. Form Validation Errors

```tsx
import { useFormErrorHandler } from '@/hooks/useErrorHandler';

const { formState: { errors } } = useForm();
const { reportFormErrors } = useFormErrorHandler('registration-form');

useEffect(() => {
  if (Object.keys(errors).length > 0) {
    reportFormErrors(errors);
  }
}, [errors]);
```

### 3. Automatic Error Handling Wrapper

```tsx
const { withErrorHandling } = useErrorHandler();

const fetchData = withErrorHandling(async () => {
  const data = await api.getData();
  return data;
}, {
  category: 'api',
});

// Errors are automatically reported
try {
  const result = await fetchData();
} catch (error) {
  toast.error('Failed to fetch data');
}
```

### 4. Adding Breadcrumbs

```tsx
const { addBreadcrumb } = useErrorHandler();

addBreadcrumb('User clicked analyze button', { dataPoints: 100 });
// ... more actions ...
addBreadcrumb('Analysis started');
// If error occurs, all breadcrumbs are included
```

---

## Files Created

### Services
- `/src/services/error-handler.ts` - Main error handling service

### Components
- `/src/components/ErrorBoundary.tsx` - React error boundary with space-themed UI

### Hooks
- `/src/hooks/useErrorHandler.ts` - React hooks for error handling

### Types
- `/src/types/error-handler.ts` - TypeScript type definitions

### Documentation
- `/docs/features/error-handling.md` - Comprehensive documentation
- `/docs/features/ERROR_HANDLER_README.md` - This quick start guide
- `/docs/examples/error-handler-usage.tsx` - Real-world examples

---

## Error Categories

- `NETWORK` - Network/connectivity errors
- `API` - API request/response errors
- `AUTH` - Authentication errors
- `VALIDATION` - Form/data validation errors
- `COMPONENT` - React component errors
- `STORAGE` - Storage errors
- `UNKNOWN` - Other errors

## Severity Levels

- `INFO` - Informational
- `WARNING` - Handled exceptions
- `ERROR` - Errors affecting functionality
- `FATAL` - Critical errors

---

## What Gets Automatically Included

Every error report includes:
- Timestamp
- Current page/route
- Environment (dev/prod)
- Device info (platform, model, OS)
- App version and build
- User info (if authenticated)
- Network status
- Custom context you provide

---

## Testing

The system works out of the box with no configuration. To test:

1. **Cause an error:**
   ```tsx
   <button onClick={() => { throw new Error('Test error'); }}>
     Test Error
   </button>
   ```

2. **Check the console** (dev mode) - you'll see error logs

3. **Check your configured platforms:**
   - Sentry: Check your Sentry dashboard
   - Amplitude: Check error events in Amplitude
   - Clarity: Check session recordings

---

## Best Practices

✅ **DO:**
- Use try-catch in async functions
- Include meaningful context
- Add breadcrumbs for complex flows
- Set user context on login/logout
- Use appropriate severity levels

❌ **DON'T:**
- Report expected business logic errors
- Report validation errors as ERROR severity
- Include sensitive data in context
- Forget to re-throw errors after reporting

---

## Troubleshooting

### Errors not showing in Sentry
1. Check `VITE_SENTRY_DSN` is set
2. Check browser console for initialization logs
3. Verify DSN is correct

### Crashlytics not working
1. Only works on iOS/Android (not web)
2. Check `VITE_FIREBASE_CRASHLYTICS_ENABLED=true`
3. Verify Firebase is configured

### Too many errors reported
1. Adjust sampling rate in `error-handler.ts`
2. Use appropriate severity levels
3. Don't report expected errors

---

## Next Steps

1. **Set up Sentry** (optional): [sentry.io](https://sentry.io/)
2. **Enable Crashlytics** (optional): Firebase Console
3. **Review documentation**: `/docs/features/error-handling.md`
4. **Check examples**: `/docs/examples/error-handler-usage.tsx`

---

## Support

- **Email:** aoneahsan@gmail.com
- **GitHub:** github.com/aoneahsan
- **Website:** aoneahsan.com

---

**Status:** ✅ Production Ready

The error handling system is fully implemented and tested. It works with or without external platform API keys configured.
