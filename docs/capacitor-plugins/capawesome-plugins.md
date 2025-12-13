# Capawesome Community Plugins - ExoHunter AI

**Last Updated:** 2025-12-13
**Organization:** Capawesome Team
**Purpose:** Documentation of planned Capawesome community plugins for enhanced mobile features

---

## 📋 Overview

This document lists all Capawesome community plugins planned for implementation in the ExoHunter AI mobile applications. Capawesome provides high-quality, well-maintained Capacitor plugins that extend native functionality beyond official plugins.

**Organization:** [@capawesome-team](https://github.com/capawesome-team)
**Current Status:** Planning phase - plugins will be installed as needed during mobile development

---

## 📦 Planned Capawesome Plugins

### 1. @capawesome/capacitor-android-edge-to-edge
**Purpose:** Android edge-to-edge display support
**Package:** `@capawesome/capacitor-android-edge-to-edge`

**Features:**
- Enable edge-to-edge display on Android
- Draw behind system bars (status bar & navigation bar)
- Set system bar colors
- Control system bar visibility
- Better immersive experience

**Use Cases in ExoHunter AI:**
- Immersive space-themed UI
- Full-screen 3D visualizations
- Edge-to-edge hero images on landing page
- Modern Android 10+ experience
- Better screen real estate utilization

**Installation:**
```bash
yarn add @capawesome/capacitor-android-edge-to-edge
npx cap sync
```

**Example Usage:**
```typescript
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge';

// Enable edge-to-edge on Android
await EdgeToEdge.enable();

// Set system bar colors to match app theme
await EdgeToEdge.setNavigationBarColor({
  color: '#0B0E1F', // Deep space background
});

await EdgeToEdge.setStatusBarColor({
  color: '#0B0E1F',
  darkContent: false // Light icons for dark background
});

// Make system bars transparent for immersive view
await EdgeToEdge.setTransparentNavigationBar();
await EdgeToEdge.setTransparentStatusBar();

// Full screen for 3D visualization
useEffect(() => {
  EdgeToEdge.enable();
  EdgeToEdge.setTransparentStatusBar();

  return () => {
    EdgeToEdge.disable();
  };
}, []);
```

**Configuration (capacitor.config.ts):**
```typescript
{
  plugins: {
    EdgeToEdge: {
      enabled: true
    }
  }
}
```

---

### 2. @capawesome/capacitor-app-review
**Purpose:** Request in-app reviews from users
**Package:** `@capawesome/capacitor-app-review`

**Features:**
- Prompt users to rate the app
- Native review dialogs (Google Play / App Store)
- Non-intrusive review requests
- Follows platform guidelines
- No external browser redirect

**Use Cases in ExoHunter AI:**
- Request review after 5+ successful detections
- Prompt after unlocking major achievement
- Ask after 7 days of active use
- Request after user shares a discovery
- Increase app store ratings

**Installation:**
```bash
yarn add @capawesome/capacitor-app-review
npx cap sync
```

**Example Usage:**
```typescript
import { AppReview } from '@capawesome/capacitor-app-review';

// Check if review is available
const { available } = await AppReview.isAvailable();

if (available) {
  // Request review at appropriate time
  await AppReview.requestReview();
}

// Implementation: After 5 detections
const detectionsCount = userStats.detectionsCount;

if (detectionsCount === 5 && !hasRequestedReview) {
  // User has made 5 detections - good time to ask
  await AppReview.requestReview();
  await saveReviewRequestTimestamp();
}

// Implementation: After major achievement
const onAchievementUnlocked = async (achievement: Achievement) => {
  if (achievement.rarity === 'epic' || achievement.rarity === 'legendary') {
    // User just unlocked major achievement
    setTimeout(async () => {
      await AppReview.requestReview();
    }, 2000); // Small delay for better UX
  }
};

// Don't spam - check if already requested recently
const lastRequestedAt = await getLastReviewRequestTime();
const daysSinceLastRequest = getDaysDifference(lastRequestedAt, new Date());

if (daysSinceLastRequest > 90) {
  // Only ask again after 90 days
  await AppReview.requestReview();
}
```

**Best Practices:**
- Don't request too frequently (once per 90 days max)
- Request after positive user experiences
- Never interrupt critical workflows
- Follow platform guidelines (especially iOS)

---

### 3. @capawesome/capacitor-app-shortcuts
**Purpose:** Create app shortcuts (Android) and Quick Actions (iOS)
**Package:** `@capawesome/capacitor-app-shortcuts`

**Features:**
- Add static and dynamic shortcuts
- Long-press app icon to see shortcuts
- Quick access to common features
- Custom icons for shortcuts
- Handle shortcut launches

**Use Cases in ExoHunter AI:**
- Quick action: "Start New Analysis"
- Quick action: "View My Discoveries"
- Quick action: "Explore NASA Data"
- Quick action: "View Leaderboard"
- Improve user engagement

**Installation:**
```bash
yarn add @capawesome/capacitor-app-shortcuts
npx cap sync
```

**Example Usage:**
```typescript
import { AppShortcuts } from '@capawesome/capacitor-app-shortcuts';

// Add dynamic shortcuts
await AppShortcuts.setDynamicShortcuts({
  shortcuts: [
    {
      id: 'new_analysis',
      shortLabel: 'New Analysis',
      longLabel: 'Start New Exoplanet Analysis',
      icon: 'ic_analysis', // Android drawable resource
      data: { route: '/analyzer' }
    },
    {
      id: 'discoveries',
      shortLabel: 'My Discoveries',
      longLabel: 'View My Discoveries',
      icon: 'ic_discovery',
      data: { route: '/profile' }
    },
    {
      id: 'explore',
      shortLabel: 'Explore',
      longLabel: 'Explore NASA Data',
      icon: 'ic_explore',
      data: { route: '/explorer' }
    },
    {
      id: 'leaderboard',
      shortLabel: 'Leaderboard',
      longLabel: 'View Top Hunters',
      icon: 'ic_leaderboard',
      data: { route: '/discoveries' }
    }
  ]
});

// Handle shortcut launch
AppShortcuts.addListener('shortcutActionPerformed', (event) => {
  console.log('Shortcut pressed:', event.shortcut.id);

  const route = event.shortcut.data.route;
  // Navigate to route
  router.push(route);

  // Track analytics
  analytics.track('shortcut_used', {
    shortcutId: event.shortcut.id
  });
});

// Remove shortcut
await AppShortcuts.removeShortcut({ id: 'old_shortcut' });

// Get all shortcuts
const { shortcuts } = await AppShortcuts.getAllShortcuts();
console.log('Available shortcuts:', shortcuts);
```

**Android Configuration (android/app/src/main/res/xml/shortcuts.xml):**
```xml
<?xml version="1.0" encoding="utf-8"?>
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
  <shortcut
    android:shortcutId="new_analysis"
    android:enabled="true"
    android:icon="@drawable/ic_analysis"
    android:shortcutShortLabel="@string/new_analysis_short"
    android:shortcutLongLabel="@string/new_analysis_long">
    <intent
      android:action="android.intent.action.VIEW"
      android:targetPackage="com.aoneahsan.exohunterai"
      android:targetClass="com.aoneahsan.exohunterai.MainActivity"
      android:data="exohunter://analyzer" />
  </shortcut>
</shortcuts>
```

---

### 4. @capawesome/capacitor-app-update
**Purpose:** Check for app updates and prompt installation
**Package:** `@capawesome/capacitor-app-update`

**Features:**
- Check if app update is available
- Get update information
- Prompt user to update
- Flexible vs immediate updates (Android)
- Open App Store/Play Store

**Use Cases in ExoHunter AI:**
- Notify users of new features
- Ensure users have latest bug fixes
- Force critical security updates
- Show "What's New" on update
- Better user retention

**Installation:**
```bash
yarn add @capawesome/capacitor-app-update
npx cap sync
```

**Example Usage:**
```typescript
import { AppUpdate, AppUpdateAvailability } from '@capawesome/capacitor-app-update';

// Check for updates on app start
useEffect(() => {
  checkForUpdates();
}, []);

const checkForUpdates = async () => {
  try {
    const result = await AppUpdate.getAppUpdateInfo();

    if (result.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
      // Update is available
      const currentVersion = result.currentVersion;
      const availableVersion = result.availableVersion;

      console.log(`Update available: ${currentVersion} → ${availableVersion}`);

      // Check if update is critical
      if (isCriticalUpdate(availableVersion)) {
        // Force immediate update
        await AppUpdate.performImmediateUpdate();
      } else {
        // Show flexible update dialog
        const shouldUpdate = await Dialog.confirm({
          title: 'Update Available',
          message: `Version ${availableVersion} is now available. Would you like to update?`,
          okButtonTitle: 'Update',
          cancelButtonTitle: 'Later'
        });

        if (shouldUpdate.value) {
          await AppUpdate.startFlexibleUpdate();
        }
      }
    } else if (result.updateAvailability === AppUpdateAvailability.UPDATE_NOT_AVAILABLE) {
      console.log('App is up to date');
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};

// Open app store manually
const openAppStore = async () => {
  await AppUpdate.openAppStore();
};

// Complete flexible update installation
AppUpdate.addListener('onFlexibleUpdateStateChange', async (state) => {
  if (state.installStatus === 'DOWNLOADED') {
    // Update downloaded, prompt to install
    const install = await Dialog.confirm({
      title: 'Update Ready',
      message: 'Update has been downloaded. Install now?',
      okButtonTitle: 'Install',
      cancelButtonTitle: 'Later'
    });

    if (install.value) {
      await AppUpdate.completeFlexibleUpdate();
    }
  }
});
```

**Best Practices:**
- Check for updates on app start (not too frequently)
- Don't force updates unless critical
- Show "What's New" after update
- Allow users to postpone non-critical updates

---

### 5. @capawesome/capacitor-badge
**Purpose:** Set app icon badge number
**Package:** `@capawesome/capacitor-badge`

**Features:**
- Set badge count on app icon
- Clear badge
- Get current badge count
- iOS and Android support (Android 8.0+)

**Use Cases in ExoHunter AI:**
- Show unread notifications count
- Display pending discoveries to review
- Show new achievements unlocked
- Indicate offline analyses ready
- Better user engagement

**Installation:**
```bash
yarn add @capawesome/capacitor-badge
npx cap sync
```

**Example Usage:**
```typescript
import { Badge } from '@capawesome/capacitor-badge';

// Set badge count
await Badge.set({ count: 5 }); // Show "5" on app icon

// Clear badge
await Badge.clear();

// Get current badge count
const { count } = await Badge.get();
console.log('Current badge count:', count);

// Increment badge
const { count: currentCount } = await Badge.get();
await Badge.set({ count: currentCount + 1 });

// Decrement badge
const { count: currentCount } = await Badge.get();
await Badge.set({ count: Math.max(0, currentCount - 1) });

// Use case: Unread notifications
const updateBadgeForNotifications = async () => {
  const unreadNotifications = await getUnreadNotificationsCount();
  await Badge.set({ count: unreadNotifications });
};

// Use case: New achievements
const onAchievementUnlocked = async () => {
  const unseenAchievements = await getUnseenAchievementsCount();
  await Badge.set({ count: unseenAchievements });
};

// Clear badge when user opens app
useEffect(() => {
  Badge.clear();
}, []);

// Clear badge when user views notifications
const onNotificationsViewed = async () => {
  await markAllNotificationsAsRead();
  await Badge.clear();
};
```

**Permissions:**
iOS automatically handles badge permissions. For Android, ensure notification permissions are granted.

---

### 6. @capawesome/capacitor-firebase-app-check
**Purpose:** Protect backend resources with Firebase App Check
**Package:** `@capawesome/capacitor-firebase-app-check`

**Features:**
- Verify app authenticity
- Protect Cloud Functions
- Protect Firestore/Storage
- DeviceCheck (iOS) and Play Integrity (Android)
- Debug tokens for testing

**Use Cases in ExoHunter AI:**
- Prevent API abuse
- Protect NASA API quota
- Secure Firebase resources
- Block unauthorized access
- Prevent bot attacks

**Installation:**
```bash
yarn add @capawesome/capacitor-firebase-app-check
npx cap sync
```

**Example Usage:**
```typescript
import { FirebaseAppCheck } from '@capawesome/capacitor-firebase-app-check';

// Initialize App Check
await FirebaseAppCheck.initialize({
  siteKey: 'your-recaptcha-site-key', // For web
  isTokenAutoRefreshEnabled: true
});

// Get App Check token
const { token } = await FirebaseAppCheck.getToken({
  forceRefresh: false
});

console.log('App Check token:', token);

// Use with Firebase functions
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const analyzeData = httpsCallable(functions, 'analyzeData');

// Token automatically included in request
const result = await analyzeData({ lightCurveData });

// Debug mode for testing
await FirebaseAppCheck.setTokenAutoRefreshEnabled({ enabled: true });

// Get debug token for development
const { token: debugToken } = await FirebaseAppCheck.getToken({
  forceRefresh: true
});
console.log('Debug token:', debugToken);
// Add this to Firebase Console for testing
```

**Firebase Configuration:**
Enable App Check in Firebase Console and configure providers:
- **iOS:** DeviceCheck
- **Android:** Play Integrity API
- **Web:** reCAPTCHA v3

**Security Rules (Firestore):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /detections/{document} {
      allow read, write: if request.auth != null && request.app != null;
    }
  }
}
```

---

### 7. @capawesome/capacitor-firebase-performance
**Purpose:** Monitor app performance with Firebase Performance
**Package:** `@capawesome/capacitor-firebase-performance`

**Features:**
- Track app startup time
- Monitor network requests
- Custom performance traces
- Screen rendering metrics
- Identify performance bottlenecks

**Use Cases in ExoHunter AI:**
- Monitor analysis processing time
- Track API call performance
- Measure 3D rendering performance
- Identify slow screens
- Optimize user experience

**Installation:**
```bash
yarn add @capawesome/capacitor-firebase-performance
npx cap sync
```

**Example Usage:**
```typescript
import { FirebasePerformance } from '@capawesome/capacitor-firebase-performance';

// Start custom trace
await FirebasePerformance.startTrace({ traceName: 'exoplanet_analysis' });

// Perform analysis
await analyzeExoplanetData(lightCurveData);

// Stop trace
await FirebasePerformance.stopTrace({ traceName: 'exoplanet_analysis' });

// Record metric
await FirebasePerformance.incrementMetric({
  traceName: 'exoplanet_analysis',
  metricName: 'data_points',
  incrementBy: lightCurveData.length
});

// Set attribute
await FirebasePerformance.setAttribute({
  traceName: 'exoplanet_analysis',
  attribute: 'detection_method',
  value: 'transit'
});

// Use case: Measure page load time
useEffect(() => {
  const measurePageLoad = async () => {
    await FirebasePerformance.startTrace({ traceName: 'dashboard_load' });

    // Load data
    await loadDashboardData();

    await FirebasePerformance.stopTrace({ traceName: 'dashboard_load' });
  };

  measurePageLoad();
}, []);

// Use case: Monitor API calls
const analyzeWithPerformanceTracking = async (data: number[]) => {
  const traceName = 'api_analyze_data';

  try {
    await FirebasePerformance.startTrace({ traceName });

    const result = await apiClient.post('/analyze', { data });

    await FirebasePerformance.incrementMetric({
      traceName,
      metricName: 'success_count',
      incrementBy: 1
    });

    return result;
  } catch (error) {
    await FirebasePerformance.incrementMetric({
      traceName,
      metricName: 'error_count',
      incrementBy: 1
    });
    throw error;
  } finally {
    await FirebasePerformance.stopTrace({ traceName });
  }
};

// Enable/disable performance monitoring
await FirebasePerformance.setPerformanceCollectionEnabled({ enabled: true });

// Check if enabled
const { enabled } = await FirebasePerformance.isPerformanceCollectionEnabled();
```

**Common Traces to Monitor:**
```typescript
const traces = {
  appStart: 'app_startup',
  userLogin: 'user_login',
  dataAnalysis: 'exoplanet_analysis',
  imageUpload: 'image_upload',
  chartRender: '3d_visualization_render',
  apiCall: 'api_call',
  databaseQuery: 'firestore_query'
};
```

---

## 📦 Installation Plan

### Priority 1: Essential (Install First)
Critical plugins for production app:
```bash
yarn add @capawesome/capacitor-firebase-app-check
yarn add @capawesome/capacitor-firebase-performance
npx cap sync
```

### Priority 2: User Experience (Install Early)
Improve UX and engagement:
```bash
yarn add @capawesome/capacitor-badge
yarn add @capawesome/capacitor-app-update
npx cap sync
```

### Priority 3: Android Optimization (Android-specific)
Better Android experience:
```bash
yarn add @capawesome/capacitor-android-edge-to-edge
yarn add @capawesome/capacitor-app-shortcuts
npx cap sync
```

### Priority 4: Engagement (Install When Stable)
Boost ratings and retention:
```bash
yarn add @capawesome/capacitor-app-review
npx cap sync
```

---

## 🔧 Configuration

### Capacitor Config (capacitor.config.ts)
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aoneahsan.exohunterai',
  appName: 'ExoHunter AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Edge to Edge
    EdgeToEdge: {
      enabled: true
    },

    // Firebase App Check
    FirebaseAppCheck: {
      debug: false // Set to true for development
    },

    // Firebase Performance
    FirebasePerformance: {
      enabled: true,
      dataCollectionEnabled: true
    }
  }
};

export default config;
```

### Firebase Configuration
Enable these services in Firebase Console:
1. **App Check:** Configure providers (DeviceCheck, Play Integrity, reCAPTCHA)
2. **Performance Monitoring:** Enable in Firebase Console
3. Update Security Rules to require App Check

---

## 📊 Feature Matrix

| Plugin | Android | iOS | Priority | Use Case |
|--------|---------|-----|----------|----------|
| android-edge-to-edge | ✅ | ❌ | Medium | Immersive UI |
| app-review | ✅ | ✅ | High | App ratings |
| app-shortcuts | ✅ | ✅ | Medium | Quick actions |
| app-update | ✅ | ✅ | High | Keep users updated |
| badge | ✅ | ✅ | High | Notifications |
| firebase-app-check | ✅ | ✅ | Critical | Security |
| firebase-performance | ✅ | ✅ | High | Monitoring |

---

## 🔒 Security Considerations

### App Check Best Practices
- Always enable in production
- Use debug tokens only in development
- Monitor App Check metrics in Firebase Console
- Regularly rotate debug tokens
- Implement proper error handling for failed checks

### Performance Monitoring Privacy
- Anonymize user data in traces
- Don't log sensitive information in attributes
- Comply with GDPR/privacy regulations
- Allow users to opt-out if required

---

## 📚 Resources

- **Capawesome GitHub:** https://github.com/capawesome-team/capacitor-plugins
- **Documentation:** https://capawesome.io/plugins/
- **Community:** https://github.com/capawesome-team/capacitor-plugins/discussions
- **NPM:** https://www.npmjs.com/org/capawesome

---

## 🚀 Implementation Timeline

### Phase 1 (Week 1): Security & Core
- [x] firebase-app-check
- [x] firebase-performance
- [ ] Configure Firebase Console
- [ ] Test in development
- [ ] Deploy to production

### Phase 2 (Week 2): User Experience
- [ ] badge (notification counts)
- [ ] app-update (update prompts)
- [ ] Test update flow
- [ ] Monitor performance metrics

### Phase 3 (Week 3): Engagement
- [ ] app-review (rating prompts)
- [ ] app-shortcuts (quick actions)
- [ ] Test on both platforms
- [ ] Monitor review conversions

### Phase 4 (Week 4): Polish
- [ ] android-edge-to-edge (Android only)
- [ ] Optimize UI for edge-to-edge
- [ ] Final testing
- [ ] Release to production

---

**Last Updated:** 2025-12-13
**Status:** Planning - To be implemented during mobile app development
**Next Steps:** Install Priority 1 plugins when starting Firebase integration
