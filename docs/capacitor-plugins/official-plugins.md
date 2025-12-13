# Capacitor Official Plugins - ExoHunter AI

**Last Updated:** 2025-12-13
**Capacitor Version:** 8.0.0
**Purpose:** Documentation of planned Capacitor official plugins for mobile app development

---

## 📋 Overview

This document lists all official Capacitor plugins planned for implementation in the ExoHunter AI mobile applications (Android and iOS). These plugins provide native mobile functionality through a unified JavaScript API.

**Current Status:** Planning phase - plugins will be installed as mobile features are implemented.

---

## 📦 Planned Official Plugins

### 1. @capacitor/app
**Purpose:** App-level functionality and lifecycle management
**Version:** 8.0.0

**Features:**
- Monitor app state changes (active, inactive, background)
- Receive URL open events for deep linking
- Get app metadata (name, version, build number)
- Handle app launcher events

**Use Cases in ExoHunter AI:**
- Deep linking to specific discoveries or analyses
- Share URLs that open the app
- Track app lifecycle for analytics
- Handle background/foreground state for data syncing

**Installation:**
```bash
yarn add @capacitor/app
npx cap sync
```

**Example Usage:**
```typescript
import { App } from '@capacitor/app';

// Listen for app state changes
App.addListener('appStateChange', (state) => {
  console.log('App state changed. Is active:', state.isActive);
  if (state.isActive) {
    // Sync data when app becomes active
  }
});

// Handle deep links
App.addListener('appUrlOpen', (event) => {
  // Navigate to discovery: exohunter://discovery/123
  const slug = event.url.split('discovery/').pop();
  // Navigate to discovery page
});

// Get app info
const info = await App.getInfo();
console.log('App version:', info.version);
```

---

### 2. @capacitor/app-launcher
**Purpose:** Launch external apps or check if they're installed
**Version:** 8.0.0

**Features:**
- Check if external apps are installed
- Open external apps with specific URLs/schemes
- Launch system apps (settings, maps, etc.)

**Use Cases in ExoHunter AI:**
- Open NASA-related apps for related content
- Launch astronomy apps for complementary star data
- Open social media apps for sharing discoveries
- Link to telescope control apps

**Installation:**
```bash
yarn add @capacitor/app-launcher
npx cap sync
```

**Example Usage:**
```typescript
import { AppLauncher } from '@capacitor/app-launcher';

// Check if NASA app is installed
const canOpen = await AppLauncher.canOpenUrl({
  url: 'nasa://app'
});

if (canOpen.value) {
  // Open NASA app
  await AppLauncher.openUrl({ url: 'nasa://app' });
} else {
  // Redirect to app store
}

// Share to Twitter
await AppLauncher.openUrl({
  url: 'twitter://post?message=Found+a+new+exoplanet!'
});
```

---

### 3. @capacitor/browser
**Purpose:** Open URLs in in-app browser or external browser
**Version:** 8.0.0

**Features:**
- Open URLs in in-app browser
- Customizable browser toolbar
- Listen for browser events (load, close)
- Prefill URLs

**Use Cases in ExoHunter AI:**
- Open NASA Exoplanet Archive links
- View educational content from external sources
- Open research papers and publications
- View user-shared discovery links

**Installation:**
```bash
yarn add @capacitor/browser
npx cap sync
```

**Example Usage:**
```typescript
import { Browser } from '@capacitor/browser';

// Open NASA Exoplanet Archive
await Browser.open({
  url: 'https://exoplanetarchive.ipac.caltech.edu/',
  toolbarColor: '#0B0E1F',
  presentationStyle: 'popover'
});

// Listen for browser events
Browser.addListener('browserFinished', () => {
  console.log('Browser was closed');
});

// Close browser programmatically
await Browser.close();
```

---

### 4. @capacitor/camera
**Purpose:** Access device camera and photo library
**Version:** 8.0.0

**Features:**
- Take photos with camera
- Select photos from gallery
- Set image quality and format
- Get base64 or file URI
- Edit photos before saving

**Use Cases in ExoHunter AI:**
- Upload telescope photos for analysis
- Capture user avatar photos
- Upload light curve screenshots
- Share visual discoveries
- Community photo sharing

**Installation:**
```bash
yarn add @capacitor/camera
npx cap sync
```

**Example Usage:**
```typescript
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// Take a photo
const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.DataUrl,
  source: CameraSource.Camera
});

// imageUrl can be set to the src of an image
const imageUrl = image.dataUrl;

// Upload avatar
const avatar = await Camera.getPhoto({
  quality: 80,
  allowEditing: true,
  resultType: CameraResultType.DataUrl,
  source: CameraSource.Prompt // Ask user: camera or gallery
});
// Upload to Firebase Storage
```

---

### 5. @capacitor/clipboard
**Purpose:** Copy and paste text from system clipboard
**Version:** 8.0.0

**Features:**
- Write text to clipboard
- Read text from clipboard
- Listen for clipboard changes

**Use Cases in ExoHunter AI:**
- Copy discovery IDs for sharing
- Copy star catalog IDs
- Copy detection statistics
- Copy API keys (for advanced users)
- Paste coordinate data

**Installation:**
```bash
yarn add @capacitor/clipboard
npx cap sync
```

**Example Usage:**
```typescript
import { Clipboard } from '@capacitor/clipboard';

// Copy discovery link
await Clipboard.write({
  string: 'https://exohunter-ai.web.app/discovery/123'
});

// Read from clipboard
const { value } = await Clipboard.read();
console.log('Clipboard content:', value);

// Copy star coordinates
await Clipboard.write({
  string: `RA: 19h 23m 40s, Dec: +44° 27' 14"`
});
```

---

### 6. @capacitor/device
**Purpose:** Get device information
**Version:** 8.0.0

**Features:**
- Get device UUID
- Get device model and manufacturer
- Get OS version
- Get platform (iOS/Android)
- Get battery info
- Get language/locale

**Use Cases in ExoHunter AI:**
- Analytics and crash reporting
- Device-specific optimizations
- Feature compatibility checks
- Personalized experiences
- Battery-aware processing

**Installation:**
```bash
yarn add @capacitor/device
npx cap sync
```

**Example Usage:**
```typescript
import { Device } from '@capacitor/device';

// Get device info
const info = await Device.getInfo();
console.log('Device:', info.model, info.platform, info.osVersion);

// Get device ID for analytics
const id = await Device.getId();
console.log('Device UUID:', id.identifier);

// Get battery level
const battery = await Device.getBatteryInfo();
if (battery.batteryLevel < 0.2) {
  // Warn user before heavy processing
  alert('Low battery. Analysis may drain battery.');
}

// Get language
const language = await Device.getLanguageCode();
console.log('User language:', language.value); // 'en-US'
```

---

### 7. @capacitor/dialog
**Purpose:** Native dialog boxes
**Version:** 8.0.0

**Features:**
- Show alert dialogs
- Show confirm dialogs
- Show prompt dialogs (text input)
- Custom button labels

**Use Cases in ExoHunter AI:**
- Confirmation before deleting detections
- Success/error messages
- User input prompts
- Warning dialogs
- Exit confirmations

**Installation:**
```bash
yarn add @capacitor/dialog
npx cap sync
```

**Example Usage:**
```typescript
import { Dialog } from '@capacitor/dialog';

// Show alert
await Dialog.alert({
  title: 'Detection Complete',
  message: 'Exoplanet detected with 87% confidence!'
});

// Show confirm
const { value } = await Dialog.confirm({
  title: 'Delete Detection',
  message: 'Are you sure you want to delete this detection?',
  okButtonTitle: 'Delete',
  cancelButtonTitle: 'Cancel'
});

if (value) {
  // User confirmed, delete detection
}

// Show prompt
const { value: starId, cancelled } = await Dialog.prompt({
  title: 'Enter Star ID',
  message: 'Enter the catalog ID of the star to analyze:',
  inputPlaceholder: 'e.g., KIC 8462852'
});

if (!cancelled) {
  // Analyze star with ID: starId
}
```

---

### 8. @capacitor/geolocation
**Purpose:** Get device location
**Version:** 8.0.0

**Features:**
- Get current position
- Watch position changes
- Set accuracy level
- Timeout and maximum age settings

**Use Cases in ExoHunter AI:**
- Show nearby observatories or events
- Localized astronomy data (visible planets, etc.)
- Weather data for stargazing
- Time zone detection
- Location-based notifications

**Installation:**
```bash
yarn add @capacitor/geolocation
npx cap sync
```

**Example Usage:**
```typescript
import { Geolocation } from '@capacitor/geolocation';

// Get current location
const position = await Geolocation.getCurrentPosition();
console.log('Current position:', position.coords.latitude, position.coords.longitude);

// Show observatories near user
const nearbyObservatories = await fetchNearbyObservatories(
  position.coords.latitude,
  position.coords.longitude
);

// Check permissions
const permissions = await Geolocation.checkPermissions();
if (permissions.location === 'denied') {
  // Request permissions
  await Geolocation.requestPermissions();
}

// Watch position (for real-time location tracking)
const watchId = await Geolocation.watchPosition({}, (position) => {
  console.log('Position changed:', position);
});

// Clear watch
Geolocation.clearWatch({ id: watchId });
```

---

### 9. @capacitor/haptics
**Purpose:** Provide haptic feedback
**Version:** 8.0.0

**Features:**
- Trigger vibrations
- Different haptic patterns (light, medium, heavy)
- Success, warning, error feedback
- Custom vibration patterns

**Use Cases in ExoHunter AI:**
- Detection complete vibration
- Error feedback
- Button press feedback
- Achievement unlocked
- Swipe confirmations

**Installation:**
```bash
yarn add @capacitor/haptics
npx cap sync
```

**Example Usage:**
```typescript
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

// Detection complete - success vibration
await Haptics.notification({ type: NotificationType.Success });

// Button press feedback
await Haptics.impact({ style: ImpactStyle.Light });

// Heavy impact for important actions
await Haptics.impact({ style: ImpactStyle.Heavy });

// Error feedback
await Haptics.notification({ type: NotificationType.Error });

// Warning feedback
await Haptics.notification({ type: NotificationType.Warning });

// Custom vibration pattern
await Haptics.vibrate({ duration: 200 });
```

---

### 10. @capacitor/network
**Purpose:** Monitor network connectivity
**Version:** 8.0.0

**Features:**
- Get current network status
- Listen for network changes
- Detect connection type (WiFi, cellular, none)
- Check if connected to internet

**Use Cases in ExoHunter AI:**
- Show offline mode indicator
- Queue analyses when offline
- Warn before large downloads
- Optimize data usage on cellular
- Sync when WiFi available

**Installation:**
```bash
yarn add @capacitor/network
npx cap sync
```

**Example Usage:**
```typescript
import { Network } from '@capacitor/network';

// Get current network status
const status = await Network.getStatus();
console.log('Network status:', status.connected, status.connectionType);

if (status.connected) {
  // Sync data
  await syncDetections();
} else {
  // Queue for later
  queueDetectionForSync();
}

// Listen for network changes
Network.addListener('networkStatusChange', (status) => {
  console.log('Network status changed', status);

  if (status.connected && status.connectionType === 'wifi') {
    // WiFi available - sync heavy data
    syncLargeFiles();
  }

  if (!status.connected) {
    // Offline mode
    showOfflineIndicator();
  }
});

// Warn on cellular for large downloads
if (status.connectionType === 'cellular') {
  const confirm = await Dialog.confirm({
    title: 'Cellular Data',
    message: 'Large file download. Continue on cellular?'
  });
}
```

---

### 11. @capacitor/preferences
**Purpose:** Persistent key-value storage (replaces localStorage)
**Version:** 8.0.0 (Already Installed)

**Features:**
- Set key-value pairs
- Get values by key
- Remove items
- Clear all data
- Native storage (not web localStorage)

**Use Cases in ExoHunter AI:**
- Store user preferences
- Cache API responses
- Save auth tokens
- Store offline data
- Remember user settings

**Installation:**
```bash
yarn add @capacitor/preferences
npx cap sync
```

**Example Usage:**
```typescript
import { Preferences } from '@capacitor/preferences';

// Save user preference
await Preferences.set({
  key: 'theme',
  value: 'dark'
});

// Get preference
const { value } = await Preferences.get({ key: 'theme' });
console.log('Theme:', value); // 'dark'

// Save complex object (JSON)
await Preferences.set({
  key: 'userSettings',
  value: JSON.stringify({
    notifications: true,
    autoSync: false,
    quality: 'high'
  })
});

// Get and parse object
const { value: settingsJson } = await Preferences.get({ key: 'userSettings' });
const settings = JSON.parse(settingsJson);

// Remove item
await Preferences.remove({ key: 'theme' });

// Clear all
await Preferences.clear();

// Get all keys
const { keys } = await Preferences.keys();
console.log('All keys:', keys);
```

---

### 12. @capacitor/share
**Purpose:** Native share dialog
**Version:** 8.0.0

**Features:**
- Share text content
- Share URLs
- Share files
- Share to specific apps
- Native share sheet

**Use Cases in ExoHunter AI:**
- Share discoveries on social media
- Share detection results
- Share educational content
- Share user achievements
- Invite friends to app

**Installation:**
```bash
yarn add @capacitor/share
npx cap sync
```

**Example Usage:**
```typescript
import { Share } from '@capacitor/share';

// Share discovery
await Share.share({
  title: 'New Exoplanet Discovery!',
  text: 'I just discovered a new exoplanet with ExoHunter AI!',
  url: 'https://exohunter-ai.web.app/discovery/123',
  dialogTitle: 'Share your discovery'
});

// Share achievement
await Share.share({
  title: 'Achievement Unlocked',
  text: 'I just unlocked the "Expert Hunter" achievement on ExoHunter AI! 🎉',
  url: 'https://exohunter-ai.web.app/'
});

// Share file (e.g., CSV export)
await Share.share({
  title: 'My Detection Data',
  text: 'My exoplanet detections from ExoHunter AI',
  url: 'file:///path/to/detections.csv',
  dialogTitle: 'Share your data'
});

// Check if sharing is supported
const canShare = await Share.canShare();
if (canShare.value) {
  // Show share button
}
```

---

### 13. @capacitor/splash-screen
**Purpose:** Control native splash screen
**Version:** 8.0.0

**Features:**
- Show/hide splash screen
- Configure duration
- Custom splash screens per platform
- Fade animations

**Use Cases in ExoHunter AI:**
- Show space-themed splash screen
- Hide after app initialization
- Display during heavy loading
- Branding experience

**Installation:**
```bash
yarn add @capacitor/splash-screen
npx cap sync
```

**Configuration (capacitor.config.ts):**
```typescript
SplashScreen: {
  launchShowDuration: 3000,
  backgroundColor: "#0B0E1F",
  androidSplashResourceName: "splash",
  iosSplashResourceName: "Splash",
  showSpinner: true,
  spinnerColor: "#667eea"
}
```

**Example Usage:**
```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// Show splash screen
await SplashScreen.show({
  autoHide: false,
  fadeInDuration: 200
});

// Hide after initialization
setTimeout(async () => {
  await SplashScreen.hide({
    fadeOutDuration: 200
  });
}, 2000);

// In App initialization
useEffect(() => {
  const initApp = async () => {
    // Load user data
    await loadUserData();

    // Initialize services
    await initializeServices();

    // Hide splash screen
    await SplashScreen.hide();
  };

  initApp();
}, []);
```

---

### 14. @capacitor/toast
**Purpose:** Show native toast messages
**Version:** 8.0.0

**Features:**
- Show short toast messages
- Configure duration
- Position (top, center, bottom)
- Native Android/iOS toasts

**Use Cases in ExoHunter AI:**
- Success messages
- Error notifications
- Quick feedback
- Non-intrusive alerts
- Status updates

**Installation:**
```bash
yarn add @capacitor/toast
npx cap sync
```

**Example Usage:**
```typescript
import { Toast } from '@capacitor/toast';

// Detection saved
await Toast.show({
  text: 'Detection saved successfully!',
  duration: 'short',
  position: 'bottom'
});

// Error message
await Toast.show({
  text: 'Failed to upload file. Please try again.',
  duration: 'long',
  position: 'center'
});

// Quick status
await Toast.show({
  text: 'Syncing data...',
  duration: 'short',
  position: 'bottom'
});

// Achievement
await Toast.show({
  text: '🎉 Achievement unlocked: Expert Hunter!',
  duration: 'long',
  position: 'top'
});
```

---

### 15. @capacitor/screen-orientation
**Purpose:** Control screen orientation
**Version:** 8.0.0

**Features:**
- Lock orientation (portrait/landscape)
- Unlock orientation
- Get current orientation
- Listen for orientation changes

**Use Cases in ExoHunter AI:**
- Lock portrait for most screens
- Force landscape for 3D visualizations
- Optimize charts for landscape
- Better viewing experience

**Installation:**
```bash
yarn add @capacitor/screen-orientation
npx cap sync
```

**Example Usage:**
```typescript
import { ScreenOrientation } from '@capacitor/screen-orientation';

// Lock to portrait
await ScreenOrientation.lock({ orientation: 'portrait' });

// Lock to landscape for 3D view
await ScreenOrientation.lock({ orientation: 'landscape' });

// Unlock orientation
await ScreenOrientation.unlock();

// Get current orientation
const orientation = await ScreenOrientation.orientation();
console.log('Current orientation:', orientation.type);

// Listen for changes
ScreenOrientation.addListener('screenOrientationChange', (orientation) => {
  console.log('Orientation changed:', orientation.type);

  if (orientation.type.includes('landscape')) {
    // Optimize layout for landscape
  } else {
    // Optimize layout for portrait
  }
});

// Use case: 3D visualization page
useEffect(() => {
  // Lock landscape when viewing 3D
  ScreenOrientation.lock({ orientation: 'landscape' });

  return () => {
    // Unlock when leaving page
    ScreenOrientation.unlock();
  };
}, []);
```

---

## 📦 Installation Plan

### Phase 1: Core Functionality (Immediate)
Install these plugins first for basic mobile app functionality:
```bash
yarn add @capacitor/app @capacitor/device @capacitor/network @capacitor/splash-screen
npx cap sync
```

### Phase 2: User Experience (Week 1)
Add user-facing features:
```bash
yarn add @capacitor/haptics @capacitor/dialog @capacitor/toast @capacitor/share
npx cap sync
```

### Phase 3: Advanced Features (Week 2)
Add advanced functionality:
```bash
yarn add @capacitor/camera @capacitor/clipboard @capacitor/browser @capacitor/screen-orientation
npx cap sync
```

### Phase 4: Optional Features (As Needed)
Install when specific features require them:
```bash
yarn add @capacitor/app-launcher @capacitor/geolocation
npx cap sync
```

---

## 🔧 Configuration

### Android Permissions (android/app/src/main/AndroidManifest.xml)
```xml
<!-- Camera -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />

<!-- Geolocation -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Network -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Storage (for Camera) -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS Permissions (ios/App/App/Info.plist)
```xml
<!-- Camera -->
<key>NSCameraUsageDescription</key>
<string>ExoHunter AI needs camera access to upload telescope photos</string>

<!-- Photo Library -->
<key>NSPhotoLibraryUsageDescription</key>
<string>ExoHunter AI needs photo library access to select images</string>

<!-- Location -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>ExoHunter AI uses your location to show nearby observatories</string>
```

---

## 📚 Resources

- **Official Docs:** https://capacitorjs.com/docs/apis
- **GitHub:** https://github.com/ionic-team/capacitor-plugins
- **Community Forum:** https://forum.ionicframework.com/c/capacitor/

---

**Last Updated:** 2025-12-13
**Status:** Planning - To be implemented during mobile app development
**Next Steps:** Install Phase 1 plugins when starting native mobile builds
