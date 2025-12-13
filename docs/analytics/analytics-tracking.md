# Analytics Tracking Documentation

**Last Updated:** 2025-12-13

## Overview

ExoHunter AI uses a comprehensive analytics system that tracks user behavior across three platforms:

1. **Firebase Analytics** - Google's analytics platform for web and mobile apps
2. **Microsoft Clarity** - User session recordings and heatmaps
3. **Amplitude** - Advanced product analytics and user behavior tracking

All analytics are centralized through a single service (`/src/services/analytics.ts`) that sends events to all three platforms simultaneously.

## Setup & Configuration

### Environment Variables

Add the following to your `.env` file:

```env
# Amplitude Analytics
VITE_AMPLITUDE_API_KEY=your_amplitude_api_key_here

# Microsoft Clarity
VITE_CLARITY_PROJECT_ID=your_clarity_project_id_here

# Firebase Analytics (uses existing Firebase config)
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### Getting API Keys

- **Amplitude**: Sign up at [https://amplitude.com](https://amplitude.com) and create a new project
- **Microsoft Clarity**: Sign up at [https://clarity.microsoft.com](https://clarity.microsoft.com) and create a new project
- **Firebase Analytics**: Already configured through Firebase Console

## Architecture

### Core Files

```
src/
├── types/
│   └── analytics.ts              # TypeScript types and event constants
├── services/
│   └── analytics.ts              # Analytics service implementation
└── hooks/
    └── useAnalytics.ts           # React hook for analytics
```

### Analytics Service (`analytics.ts`)

The analytics service provides the following methods:

- `track(event, properties?)` - Track custom events
- `page(pageName, properties?)` - Track page views
- `identify(userId, traits?)` - Identify users
- `setUserProperties(properties)` - Set user properties
- `reset()` - Reset user identification (on logout)

### Analytics Hook (`useAnalytics.ts`)

The React hook provides convenient methods and auto-tracks page views:

```typescript
const {
  track,                    // Track custom events
  trackPageView,            // Track page views manually
  identify,                 // Identify users
  setUserProperties,        // Set user properties
  reset,                    // Reset on logout
  trackButtonClick,         // Track button clicks
  trackFormSubmit,          // Track form submissions
  trackError,               // Track errors
  trackModalOpen,           // Track modal opens
  trackModalClose,          // Track modal closes
} = useAnalytics();
```

**Additional hooks:**
- `useComponentTracking(name, props?)` - Track component mount/unmount
- `useFeatureTracking()` - Track feature usage

## Event Naming Convention

All events follow this naming pattern: `category_action_target`

Examples:
- `auth_login_completed`
- `analyzer_analysis_started`
- `discovery_voted`
- `profile_edited`

All event names are defined in `/src/types/analytics.ts` as `AnalyticsEvents` constants.

## Tracked Events

### Authentication Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `auth_signup_started` | User starts signup process | `method` (email/google), `newsletter_opt_in` |
| `auth_signup_completed` | User successfully signs up | `method`, `newsletter_opt_in` |
| `auth_signup_failed` | Signup fails | `method`, `error` |
| `auth_login_started` | User starts login process | `method` (email/google) |
| `auth_login_completed` | User successfully logs in | `method` |
| `auth_login_failed` | Login fails | `method`, `error` |
| `auth_logout` | User logs out | - |
| `auth_password_reset_requested` | User requests password reset | - |
| `auth_password_reset_completed` | Password reset email sent | - |

### Exoplanet Analyzer Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `analyzer_opened` | User opens analyzer page | - |
| `analyzer_data_uploaded` | User uploads data file | `file_size`, `file_type` |
| `analyzer_analysis_started` | Analysis begins | `data_points`, `method` |
| `analyzer_analysis_completed` | Analysis finishes | `confidence`, `result`, `duration_ms` |
| `analyzer_analysis_failed` | Analysis fails | `error` |
| `analyzer_result_saved` | User saves analysis result | `confidence` |
| `analyzer_result_shared` | User shares analysis | `method` (social/link) |
| `analyzer_export_csv` | User exports data as CSV | - |
| `analyzer_export_json` | User exports data as JSON | - |

### Exoplanet Explorer Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `explorer_opened` | User opens explorer page | - |
| `explorer_search_performed` | User searches for exoplanets | `query`, `results_count` |
| `explorer_filter_applied` | User applies filters | `filter_type`, `filter_value` |
| `explorer_planet_viewed` | User views planet details | `planet_id`, `planet_name` |
| `explorer_planet_favorited` | User favorites a planet | `planet_id` |
| `explorer_comparison_started` | User compares planets | `planet_count` |
| `explorer_3d_view_enabled` | User enables 3D view | `planet_id` |

### Community/Discoveries Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `discoveries_opened` | User opens discoveries page | - |
| `discovery_created` | User creates new discovery | `is_public` |
| `discovery_viewed` | User views a discovery | `discovery_id`, `author_id` |
| `discovery_voted` | User votes on discovery | `discovery_id`, `vote_type` |
| `discovery_commented` | User comments on discovery | `discovery_id` |
| `discovery_shared` | User shares discovery | `discovery_id`, `method` |
| `discovery_reported` | User reports discovery | `discovery_id`, `reason` |

### Profile Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `profile_viewed` | User views a profile | `profile_user_id`, `is_own_profile` |
| `profile_edited` | User edits their profile | `fields_changed` |
| `profile_avatar_updated` | User updates avatar | - |
| `profile_preferences_updated` | User updates preferences | `preference_type` |
| `achievement_unlocked` | User unlocks achievement | `achievement_id`, `achievement_name` |

### Tutorial Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `tutorial_started` | User starts tutorial | `tutorial_id`, `tutorial_name` |
| `tutorial_completed` | User completes tutorial | `tutorial_id`, `duration_ms` |
| `tutorial_skipped` | User skips tutorial | `tutorial_id`, `step` |
| `tutorial_step_completed` | User completes tutorial step | `tutorial_id`, `step` |

### Settings Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `settings_opened` | User opens settings | - |
| `settings_notification_toggled` | User toggles notifications | `enabled` |
| `settings_theme_changed` | User changes theme | `theme` (dark/light) |
| `settings_privacy_updated` | User updates privacy settings | `setting_type` |

### General Events

| Event Name | When Triggered | Properties |
|------------|----------------|------------|
| `page_view` | User navigates to new page | `page_name`, `page_path`, `page_url` |
| `button_clicked` | User clicks a button | `button_name`, `page` |
| `link_clicked` | User clicks a link | `link_text`, `link_url`, `page` |
| `modal_opened` | Modal/dialog opens | `modal_name`, `page` |
| `modal_closed` | Modal/dialog closes | `modal_name`, `page` |
| `form_submitted` | Form is submitted | `form_name`, `success` |
| `form_validation_failed` | Form validation fails | `form_name`, `errors` |
| `error_occurred` | General error occurs | `error_message`, `page` |
| `error_api_failed` | API call fails | `endpoint`, `status_code`, `error` |
| `error_network_failed` | Network error occurs | `error` |

## Implementation Status

### Completed ✅

- [x] Analytics infrastructure setup
- [x] TypeScript types and constants
- [x] Analytics service (`analytics.ts`)
- [x] Analytics hook (`useAnalytics.ts`)
- [x] Environment variables configuration
- [x] Login page analytics
- [x] Signup page analytics
- [x] Auto page view tracking

### In Progress 🚧

- [ ] Analyzer page analytics
- [ ] Explorer page analytics
- [ ] Discoveries page analytics
- [ ] Profile page analytics
- [ ] Settings page analytics
- [ ] Dashboard page analytics

### To Do 📋

- [ ] Logout analytics (in AuthContext)
- [ ] Error boundary analytics
- [ ] API error tracking
- [ ] Component-level tracking
- [ ] Feature usage tracking
- [ ] Performance tracking

## Usage Examples

### Basic Event Tracking

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvents } from '@/services/analytics';

function MyComponent() {
  const { track } = useAnalytics();

  const handleAnalyze = () => {
    track(AnalyticsEvents.ANALYZER_ANALYSIS_STARTED, {
      data_points: 1000,
      method: 'transit'
    });
  };

  return <button onClick={handleAnalyze}>Analyze</button>;
}
```

### User Identification (on login/signup)

```typescript
const handleLogin = async () => {
  const user = await signIn(email, password);

  if (user) {
    identify(user.uid, {
      email: user.email,
      displayName: user.displayName,
    });
  }
};
```

### Button Click Tracking

```typescript
const { trackButtonClick } = useAnalytics();

<button onClick={() => trackButtonClick('submit-analysis', { dataPoints: 100 })}>
  Submit
</button>
```

### Form Submission Tracking

```typescript
const { trackFormSubmit } = useAnalytics();

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackFormSubmit('contact-form', { success: true });
  } catch (error) {
    trackFormSubmit('contact-form', { success: false, error: error.message });
  }
};
```

### Error Tracking

```typescript
const { trackError } = useAnalytics();

try {
  await analyzeData();
} catch (error) {
  trackError('Analysis failed', {
    error_code: error.code,
    data_size: dataSize,
  });
}
```

### Component Lifecycle Tracking

```typescript
import { useComponentTracking } from '@/hooks/useAnalytics';

function MyComponent() {
  useComponentTracking('ExoplanetAnalyzer', {
    section: 'main',
    complexity: 'high'
  });

  return <div>...</div>;
}
```

### Feature Usage Tracking

```typescript
import { useFeatureTracking } from '@/hooks/useAnalytics';

function MyComponent() {
  const trackFeature = useFeatureTracking();

  const handleExport = () => {
    trackFeature('csv-export', {
      record_count: records.length,
      file_size: calculateSize(records)
    });
  };
}
```

### Page View Tracking (Auto-enabled)

```typescript
// Automatically tracks page views on route changes
function MyPage() {
  useAnalytics(); // That's it! Page views are tracked automatically
  return <div>...</div>;
}

// Disable auto-tracking and track manually
function MyPage() {
  const { trackPageView } = useAnalytics({ trackPageViews: false });

  useEffect(() => {
    trackPageView('Custom Page Name', {
      section: 'analytics',
      user_type: 'premium'
    });
  }, []);
}
```

## Privacy Considerations

1. **IP Address**: Amplitude is configured with `ipAddress: false` for privacy
2. **Personal Data**: Never track sensitive personal data (passwords, payment info, etc.)
3. **User Consent**: Consider implementing analytics consent based on user location (GDPR)
4. **Anonymization**: User IDs are hashed before sending to analytics platforms
5. **Opt-out**: Users should be able to opt-out of analytics tracking (implement in settings)

## Analytics Platforms Access

- **Firebase Analytics**: [https://console.firebase.google.com](https://console.firebase.google.com) > Analytics
- **Microsoft Clarity**: [https://clarity.microsoft.com](https://clarity.microsoft.com)
- **Amplitude**: [https://analytics.amplitude.com](https://analytics.amplitude.com)

## Debugging

Enable debug mode by setting `import.meta.env.DEV = true`. This will log all analytics events to the console:

```
[Analytics] Event tracked: auth_login_completed { method: 'email', timestamp: '...' }
[Analytics] Firebase tracked: auth_login_completed { ... }
[Analytics] Amplitude tracked: auth_login_completed { ... }
[Analytics] Clarity tracked: auth_login_completed { ... }
```

## Performance

- Analytics tracking is non-blocking and runs asynchronously
- Failed analytics calls don't affect user experience
- All platforms are initialized only in production (except when debug mode is enabled)
- Privacy blockers are handled gracefully

## Best Practices

1. **Always use event constants** from `AnalyticsEvents` instead of string literals
2. **Include context** in event properties (page, user type, etc.)
3. **Track both success and failure** for important actions
4. **Don't over-track** - focus on meaningful user actions
5. **Keep property names consistent** across similar events
6. **Document new events** in this file when adding them
7. **Test analytics** in development before deploying

## Maintenance

- Review this document weekly and update implementation status
- Add new events to `AnalyticsEvents` constants and document them here
- Monitor analytics platforms for data quality issues
- Clean up unused events quarterly
- Update privacy policy when tracking new data types

---

**Author:** Ahsan Mahmood
**Email:** aoneahsan@gmail.com
**Website:** aoneahsan.com
