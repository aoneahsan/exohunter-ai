# Analytics Documentation

This directory contains documentation for the ExoHunter AI analytics system.

## Files

- **[analytics-tracking.md](./analytics-tracking.md)** - Complete analytics implementation guide
  - Event catalog
  - Implementation status
  - Usage examples
  - Best practices
  - Privacy considerations

## Quick Start

### 1. Setup Environment Variables

Add to your `.env` file:

```env
VITE_AMPLITUDE_API_KEY=your_amplitude_api_key
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

### 2. Use Analytics in Your Component

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvents } from '@/services/analytics';

function MyComponent() {
  const { track, trackButtonClick } = useAnalytics();

  // Track custom events
  track(AnalyticsEvents.ANALYZER_ANALYSIS_STARTED, {
    data_points: 1000,
    method: 'transit'
  });

  // Track button clicks
  <button onClick={() => trackButtonClick('export-data')}>
    Export
  </button>
}
```

### 3. Auto Page View Tracking

Page views are automatically tracked when using the `useAnalytics()` hook:

```typescript
function MyPage() {
  useAnalytics(); // That's it! Page views are tracked automatically
  return <div>...</div>;
}
```

## Analytics Platforms

We use three analytics platforms:

1. **Firebase Analytics** - Built-in with Firebase, no additional setup needed
2. **Microsoft Clarity** - User session recordings and heatmaps
3. **Amplitude** - Advanced product analytics

All events are sent to all three platforms automatically.

## Learn More

- See [analytics-tracking.md](./analytics-tracking.md) for complete documentation
- Check `/src/types/analytics.ts` for all available event constants
- Review `/src/hooks/useAnalytics.ts` for all available methods

## Support

For questions or issues with analytics:
- **Email:** aoneahsan@gmail.com
- **LinkedIn:** linkedin.com/in/aoneahsan
- **GitHub:** github.com/aoneahsan
