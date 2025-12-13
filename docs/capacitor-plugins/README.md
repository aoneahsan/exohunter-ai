# Capacitor Plugins - Quick Start Guide

## Overview

ExoHunter AI now includes comprehensive Capacitor plugin integration for native mobile functionality. All plugins are ready to use and will work seamlessly when you add the Android and iOS platforms.

## What's Been Implemented

### 🎯 Core Files

1. **Service Layer** (`/src/services/capacitor.ts`)
   - 60+ utility functions for all Capacitor features
   - Type-safe wrappers with comprehensive error handling
   - Platform detection and feature availability checks

2. **React Hooks** (`/src/hooks/useCapacitor.ts`)
   - 13 specialized hooks for different features
   - Automatic state management and listeners
   - Easy-to-use React integration

3. **Configuration** (`/capacitor.config.ts`)
   - Pre-configured plugin settings
   - Deep linking support
   - Custom branding colors

### 📦 Installed Plugins

**Official Capacitor Plugins (13):**
- App (lifecycle, info, state)
- App Launcher (open other apps)
- Browser (in-app browser)
- Clipboard (copy/paste)
- Device (device info)
- Dialog (native dialogs)
- Haptics (vibration feedback)
- Network (connectivity status)
- Preferences (storage - already installed)
- Screen Orientation (lock/unlock)
- Share (native sharing)
- Splash Screen (launch screen)
- Toast (notifications)

**Capawesome Plugins (3):**
- App Update (update management)
- App Review (in-app reviews)
- Badge (app icon badges)

### 🎨 UI Integration

**Footer Component Updated:**
- Shows app version on native platforms
- Format: "v1.0.0 (build 1)"
- Automatically hidden on web

## Quick Usage Examples

### Display App Version

```typescript
import { useAppVersion } from '@hooks/useCapacitor';

function MyComponent() {
  const { version } = useAppVersion();
  return <p>{version}</p>; // "v1.0.0 (build 1)"
}
```

### Show Toast Notification

```typescript
import { useToast } from '@hooks/useCapacitor';

function MyComponent() {
  const { success, error } = useToast();

  const handleSave = async () => {
    try {
      // Your save logic
      await success('Saved successfully!');
    } catch (err) {
      await error('Failed to save');
    }
  };
}
```

### Check Network Status

```typescript
import { useNetwork } from '@hooks/useCapacitor';

function MyComponent() {
  const { isOnline, connectionType } = useNetwork();

  return (
    <div>
      {isOnline ? (
        <p>Connected via {connectionType}</p>
      ) : (
        <p>Offline mode</p>
      )}
    </div>
  );
}
```

### Haptic Feedback

```typescript
import { useHaptics } from '@hooks/useCapacitor';

function MyComponent() {
  const { light, success } = useHaptics();

  const handleClick = async () => {
    await light(); // Light vibration
    // Do something
    await success(); // Success vibration
  };
}
```

### Share Content

```typescript
import { useShare } from '@hooks/useCapacitor';

function ShareButton() {
  const { share } = useShare();

  const handleShare = async () => {
    await share({
      title: 'ExoHunter AI',
      text: 'Check out this amazing exoplanet!',
      url: window.location.href,
    });
  };

  return <button onClick={handleShare}>Share</button>;
}
```

### Copy to Clipboard

```typescript
import { useClipboard } from '@hooks/useCapacitor';

function CopyButton({ text }: { text: string }) {
  const { copy } = useClipboard();

  return (
    <button onClick={() => copy(text)}>
      Copy
    </button>
  );
}
```

### Show Dialog

```typescript
import { useDialog } from '@hooks/useCapacitor';

function DeleteButton() {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    const confirmed = await confirm(
      'Delete Item',
      'Are you sure you want to delete this item?'
    );

    if (confirmed) {
      // Delete logic
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Monitor App State

```typescript
import { useAppState } from '@hooks/useCapacitor';

function MyComponent() {
  const { isActive } = useAppState();

  useEffect(() => {
    if (isActive) {
      // App came to foreground - refresh data
      refreshData();
    }
  }, [isActive]);
}
```

### Open URL in Browser

```typescript
import { useBrowser } from '@hooks/useCapacitor';

function ExternalLink({ url }: { url: string }) {
  const { open } = useBrowser();

  return (
    <button onClick={() => open(url)}>
      Open Link
    </button>
  );
}
```

### Screen Orientation

```typescript
import { useOrientation } from '@hooks/useCapacitor';

function MyComponent() {
  const { isPortrait, isLandscape, lock, unlock } = useOrientation();

  const lockToPortrait = async () => {
    await lock('portrait');
  };

  const allowRotation = async () => {
    await unlock();
  };
}
```

## Available Hooks

| Hook | Purpose | Key Features |
|------|---------|--------------|
| `useCapacitor()` | Main hook | Platform info, device info, all services |
| `useToast()` | Notifications | success, error, info methods |
| `useHaptics()` | Vibration | light, medium, heavy, success, error |
| `useNetwork()` | Network status | isOnline, connectionType, monitoring |
| `useAppState()` | App lifecycle | isActive, isBackground |
| `useClipboard()` | Copy/paste | copy, read, copiedText |
| `useShare()` | Native sharing | share, canShare |
| `useDialog()` | Native dialogs | alert, confirm, prompt |
| `useBrowser()` | In-app browser | open, close, isOpen |
| `useAppVersion()` | Version info | version, versionNumber, buildNumber |
| `useOrientation()` | Screen rotation | orientation, lock, unlock |
| `useAppUpdate()` | Updates | check, install, openStore |
| `useBadge()` | App badges | set, clear, increment, decrement |

## Platform Support

### Current Platform: Web
- All code is implemented and ready
- Web-compatible features work immediately
- Native-only features gracefully skip on web

### Android Platform: Ready to Add
When you run `npx cap add android`:
1. All plugins will work automatically
2. No code changes needed
3. Just configure permissions in AndroidManifest.xml

### iOS Platform: Ready to Add
When you run `npx cap add ios`:
1. All plugins will work automatically
2. No code changes needed
3. Just configure permissions in Info.plist

## Next Steps

### Adding Android

```bash
# Add Android platform
npx cap add android

# Sync code to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

### Adding iOS

```bash
# Add iOS platform
npx cap add ios

# Sync code to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

## Documentation

For detailed implementation status and comprehensive documentation, see:
- [Implementation Status](/docs/capacitor-plugins/implementation-status.md)

## Support

**Developer:** Ahsan Mahmood
**Email:** aoneahsan@gmail.com
**GitHub:** https://github.com/aoneahsan/exohunter-ai

---

**Status:** ✅ Fully Implemented
**Last Updated:** 2025-12-13
