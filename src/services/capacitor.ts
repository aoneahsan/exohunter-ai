/**
 * Capacitor Service
 *
 * Centralized service for all Capacitor plugin functionality.
 * Provides type-safe wrapper functions for native features.
 *
 * @author Ahsan Mahmood <aoneahsan@gmail.com>
 * @see https://capacitorjs.com/docs/plugins
 */

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import type { AppInfo } from '@capacitor/app';
import { Device } from '@capacitor/device';
import type { DeviceInfo } from '@capacitor/device';
import { Network } from '@capacitor/network';
import type { ConnectionStatus } from '@capacitor/network';
import { Share } from '@capacitor/share';
import type { ShareOptions, ShareResult } from '@capacitor/share';
import { Toast } from '@capacitor/toast';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { Dialog } from '@capacitor/dialog';
import { SplashScreen } from '@capacitor/splash-screen';
import { AppLauncher } from '@capacitor/app-launcher';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import type { OrientationLockType } from '@capacitor/screen-orientation';
import { AppUpdate } from '@capawesome/capacitor-app-update';
import { AppReview } from '@capawesome/capacitor-app-review';
import { Badge } from '@capawesome/capacitor-badge';

/**
 * Check if running on a native platform (iOS or Android)
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Get the current platform
 */
export const getPlatform = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};

/**
 * Check if a specific plugin is available
 */
export const isPluginAvailable = (pluginName: string): boolean => {
  return Capacitor.isPluginAvailable(pluginName);
};

// ============================================================================
// Device Information
// ============================================================================

/**
 * Get detailed device information
 */
export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  try {
    return await Device.getInfo();
  } catch (error) {
    console.error('[Capacitor] Failed to get device info:', error);
    throw error;
  }
};

/**
 * Get device battery information
 */
export const getBatteryInfo = async () => {
  try {
    return await Device.getBatteryInfo();
  } catch (error) {
    console.error('[Capacitor] Failed to get battery info:', error);
    throw error;
  }
};

/**
 * Get device language code
 */
export const getLanguageCode = async (): Promise<string> => {
  try {
    const result = await Device.getLanguageCode();
    return result.value;
  } catch (error) {
    console.error('[Capacitor] Failed to get language code:', error);
    return 'en';
  }
};

// ============================================================================
// App Information
// ============================================================================

/**
 * Get app information (version, build number, etc.)
 */
export const getAppInfo = async (): Promise<AppInfo> => {
  try {
    return await App.getInfo();
  } catch (error) {
    console.error('[Capacitor] Failed to get app info:', error);
    throw error;
  }
};

/**
 * Get formatted app version string
 * @returns Format: "v1.0.0 (build 1)"
 */
export const getAppVersionString = async (): Promise<string> => {
  try {
    const info = await getAppInfo();
    return `v${info.version} (build ${info.build})`;
  } catch (error) {
    console.error('[Capacitor] Failed to get app version:', error);
    return 'v1.0.0 (build 1)'; // Fallback for web
  }
};

/**
 * Get app state (active, background, inactive)
 */
export const getAppState = async () => {
  try {
    return await App.getState();
  } catch (error) {
    console.error('[Capacitor] Failed to get app state:', error);
    throw error;
  }
};

/**
 * Add listener for app state changes
 */
export const addAppStateChangeListener = (
  callback: (state: { isActive: boolean }) => void
) => {
  return App.addListener('appStateChange', callback);
};

/**
 * Minimize the app (Android only)
 */
export const minimizeApp = async (): Promise<void> => {
  try {
    if (getPlatform() === 'android') {
      await App.minimizeApp();
    }
  } catch (error) {
    console.error('[Capacitor] Failed to minimize app:', error);
  }
};

/**
 * Exit the app (Android only)
 */
export const exitApp = async (): Promise<void> => {
  try {
    if (getPlatform() === 'android') {
      await App.exitApp();
    }
  } catch (error) {
    console.error('[Capacitor] Failed to exit app:', error);
  }
};

// ============================================================================
// Network Status
// ============================================================================

/**
 * Get current network connection status
 */
export const getNetworkStatus = async (): Promise<ConnectionStatus> => {
  try {
    return await Network.getStatus();
  } catch (error) {
    console.error('[Capacitor] Failed to get network status:', error);
    throw error;
  }
};

/**
 * Add listener for network status changes
 */
export const addNetworkListener = (
  callback: (status: ConnectionStatus) => void
) => {
  return Network.addListener('networkStatusChange', callback);
};

/**
 * Check if device is online
 */
export const isOnline = async (): Promise<boolean> => {
  try {
    const status = await getNetworkStatus();
    return status.connected;
  } catch (error) {
    console.error('[Capacitor] Failed to check online status:', error);
    return true; // Assume online on error
  }
};

// ============================================================================
// Share
// ============================================================================

/**
 * Share content using native share dialog
 */
export const shareContent = async (
  options: ShareOptions
): Promise<ShareResult> => {
  try {
    return await Share.share(options);
  } catch (error) {
    console.error('[Capacitor] Failed to share:', error);
    throw error;
  }
};

/**
 * Check if sharing is supported
 */
export const canShare = async (): Promise<boolean> => {
  try {
    const result = await Share.canShare();
    return result.value;
  } catch (error) {
    console.error('[Capacitor] Failed to check share capability:', error);
    return false;
  }
};

// ============================================================================
// Toast Notifications
// ============================================================================

export interface ToastOptions {
  text: string;
  duration?: 'short' | 'long';
  position?: 'top' | 'center' | 'bottom';
}

/**
 * Show a native toast notification
 */
export const showToast = async ({
  text,
  duration = 'short',
  position = 'bottom',
}: ToastOptions): Promise<void> => {
  try {
    await Toast.show({
      text,
      duration,
      position,
    });
  } catch (error) {
    console.error('[Capacitor] Failed to show toast:', error);
  }
};

// ============================================================================
// Haptic Feedback
// ============================================================================

/**
 * Trigger haptic vibration
 */
export const vibrate = async (
  style: ImpactStyle = ImpactStyle.Medium
): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Haptics.impact({ style });
  } catch (error) {
    console.error('[Capacitor] Failed to trigger haptic:', error);
  }
};

/**
 * Trigger notification haptic
 */
export const notificationHaptic = async (
  type: NotificationType = NotificationType.Success
): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Haptics.notification({ type });
  } catch (error) {
    console.error('[Capacitor] Failed to trigger notification haptic:', error);
  }
};

/**
 * Trigger selection changed haptic
 */
export const selectionHaptic = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Haptics.selectionChanged();
  } catch (error) {
    console.error('[Capacitor] Failed to trigger selection haptic:', error);
  }
};

// ============================================================================
// Browser
// ============================================================================

export interface BrowserOptions {
  url: string;
  windowName?: string;
  toolbarColor?: string;
  presentationStyle?: 'fullscreen' | 'popover';
}

/**
 * Open URL in in-app browser
 */
export const openInBrowser = async ({
  url,
  windowName,
  toolbarColor,
  presentationStyle,
}: BrowserOptions): Promise<void> => {
  try {
    await Browser.open({
      url,
      windowName,
      toolbarColor,
      presentationStyle,
    });
  } catch (error) {
    console.error('[Capacitor] Failed to open browser:', error);
  }
};

/**
 * Close the in-app browser
 */
export const closeBrowser = async (): Promise<void> => {
  try {
    await Browser.close();
  } catch (error) {
    console.error('[Capacitor] Failed to close browser:', error);
  }
};

/**
 * Add listener for browser finished event
 */
export const addBrowserFinishedListener = (callback: () => void) => {
  return Browser.addListener('browserFinished', callback);
};

// ============================================================================
// Clipboard
// ============================================================================

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await Clipboard.write({ string: text });
  } catch (error) {
    console.error('[Capacitor] Failed to copy to clipboard:', error);
    throw error;
  }
};

/**
 * Read text from clipboard
 */
export const readFromClipboard = async (): Promise<string> => {
  try {
    const result = await Clipboard.read();
    return result.value;
  } catch (error) {
    console.error('[Capacitor] Failed to read from clipboard:', error);
    return '';
  }
};

// ============================================================================
// Dialogs
// ============================================================================

export interface AlertOptions {
  title: string;
  message: string;
  buttonTitle?: string;
}

export interface ConfirmOptions {
  title: string;
  message: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
}

export interface PromptOptions {
  title: string;
  message: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  inputPlaceholder?: string;
  inputText?: string;
}

/**
 * Show native alert dialog
 */
export const showAlert = async ({
  title,
  message,
  buttonTitle = 'OK',
}: AlertOptions): Promise<void> => {
  try {
    await Dialog.alert({ title, message, buttonTitle });
  } catch (error) {
    console.error('[Capacitor] Failed to show alert:', error);
  }
};

/**
 * Show native confirm dialog
 */
export const showConfirm = async ({
  title,
  message,
  okButtonTitle = 'OK',
  cancelButtonTitle = 'Cancel',
}: ConfirmOptions): Promise<boolean> => {
  try {
    const result = await Dialog.confirm({
      title,
      message,
      okButtonTitle,
      cancelButtonTitle,
    });
    return result.value;
  } catch (error) {
    console.error('[Capacitor] Failed to show confirm:', error);
    return false;
  }
};

/**
 * Show native prompt dialog
 */
export const showPrompt = async ({
  title,
  message,
  okButtonTitle = 'OK',
  cancelButtonTitle = 'Cancel',
  inputPlaceholder,
  inputText,
}: PromptOptions): Promise<{ value: string; cancelled: boolean }> => {
  try {
    const result = await Dialog.prompt({
      title,
      message,
      okButtonTitle,
      cancelButtonTitle,
      inputPlaceholder,
      inputText,
    });
    return result;
  } catch (error) {
    console.error('[Capacitor] Failed to show prompt:', error);
    return { value: '', cancelled: true };
  }
};

// ============================================================================
// Splash Screen
// ============================================================================

/**
 * Show splash screen
 */
export const showSplashScreen = async (): Promise<void> => {
  try {
    await SplashScreen.show({
      autoHide: false,
    });
  } catch (error) {
    console.error('[Capacitor] Failed to show splash screen:', error);
  }
};

/**
 * Hide splash screen
 */
export const hideSplashScreen = async (): Promise<void> => {
  try {
    await SplashScreen.hide();
  } catch (error) {
    console.error('[Capacitor] Failed to hide splash screen:', error);
  }
};

// ============================================================================
// App Launcher
// ============================================================================

/**
 * Check if an app can be opened
 */
export const canOpenUrl = async (url: string): Promise<boolean> => {
  try {
    const result = await AppLauncher.canOpenUrl({ url });
    return result.value;
  } catch (error) {
    console.error('[Capacitor] Failed to check if URL can be opened:', error);
    return false;
  }
};

/**
 * Open another app using URL scheme
 */
export const openUrl = async (url: string): Promise<void> => {
  try {
    await AppLauncher.openUrl({ url });
  } catch (error) {
    console.error('[Capacitor] Failed to open URL:', error);
    throw error;
  }
};

// ============================================================================
// Screen Orientation
// ============================================================================

/**
 * Get current screen orientation
 */
export const getOrientation = async (): Promise<string> => {
  try {
    const result = await ScreenOrientation.orientation();
    return result.type;
  } catch (error) {
    console.error('[Capacitor] Failed to get orientation:', error);
    throw error;
  }
};

/**
 * Lock screen orientation
 */
export const lockOrientation = async (
  orientation: OrientationLockType
): Promise<void> => {
  try {
    await ScreenOrientation.lock({ orientation });
  } catch (error) {
    console.error('[Capacitor] Failed to lock orientation:', error);
  }
};

/**
 * Unlock screen orientation
 */
export const unlockOrientation = async (): Promise<void> => {
  try {
    await ScreenOrientation.unlock();
  } catch (error) {
    console.error('[Capacitor] Failed to unlock orientation:', error);
  }
};

/**
 * Add listener for orientation changes
 */
export const addOrientationChangeListener = (
  callback: (orientation: string) => void
) => {
  return ScreenOrientation.addListener('screenOrientationChange', (event) => {
    callback(event.type);
  });
};

// ============================================================================
// App Update (Capawesome)
// ============================================================================

/**
 * Check for available app updates
 */
export const checkForUpdate = async () => {
  try {
    if (!isNativePlatform()) return null;
    return await AppUpdate.getAppUpdateInfo();
  } catch (error) {
    console.error('[Capacitor] Failed to check for update:', error);
    return null;
  }
};

/**
 * Open app store for update
 */
export const openAppStore = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await AppUpdate.openAppStore();
  } catch (error) {
    console.error('[Capacitor] Failed to open app store:', error);
  }
};

/**
 * Perform immediate update (Android only)
 */
export const performImmediateUpdate = async (): Promise<void> => {
  try {
    if (getPlatform() !== 'android') return;
    await AppUpdate.performImmediateUpdate();
  } catch (error) {
    console.error('[Capacitor] Failed to perform immediate update:', error);
  }
};

// ============================================================================
// App Review (Capawesome)
// ============================================================================

/**
 * Request in-app review
 */
export const requestReview = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await AppReview.requestReview();
  } catch (error) {
    console.error('[Capacitor] Failed to request review:', error);
  }
};

// ============================================================================
// Badge (Capawesome)
// ============================================================================

/**
 * Get current badge count
 */
export const getBadgeCount = async (): Promise<number> => {
  try {
    if (!isNativePlatform()) return 0;
    const result = await Badge.get();
    return result.count;
  } catch (error) {
    console.error('[Capacitor] Failed to get badge count:', error);
    return 0;
  }
};

/**
 * Set badge count
 */
export const setBadgeCount = async (count: number): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Badge.set({ count });
  } catch (error) {
    console.error('[Capacitor] Failed to set badge count:', error);
  }
};

/**
 * Clear badge count
 */
export const clearBadge = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Badge.clear();
  } catch (error) {
    console.error('[Capacitor] Failed to clear badge:', error);
  }
};

/**
 * Increment badge count
 */
export const incrementBadge = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Badge.increase();
  } catch (error) {
    console.error('[Capacitor] Failed to increment badge:', error);
  }
};

/**
 * Decrement badge count
 */
export const decrementBadge = async (): Promise<void> => {
  try {
    if (!isNativePlatform()) return;
    await Badge.decrease();
  } catch (error) {
    console.error('[Capacitor] Failed to decrement badge:', error);
  }
};

/**
 * Check if badge is supported
 */
export const isBadgeSupported = async (): Promise<boolean> => {
  try {
    if (!isNativePlatform()) return false;
    const result = await Badge.isSupported();
    return result.isSupported;
  } catch (error) {
    console.error('[Capacitor] Failed to check badge support:', error);
    return false;
  }
};

/**
 * Check permissions for badge (iOS only)
 */
export const checkBadgePermissions = async () => {
  try {
    if (getPlatform() !== 'ios') return null;
    return await Badge.checkPermissions();
  } catch (error) {
    console.error('[Capacitor] Failed to check badge permissions:', error);
    return null;
  }
};

/**
 * Request permissions for badge (iOS only)
 */
export const requestBadgePermissions = async () => {
  try {
    if (getPlatform() !== 'ios') return null;
    return await Badge.requestPermissions();
  } catch (error) {
    console.error('[Capacitor] Failed to request badge permissions:', error);
    return null;
  }
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Initialize Capacitor plugins
 * Call this on app startup
 */
export const initializeCapacitor = async (): Promise<void> => {
  try {
    console.log('[Capacitor] Initializing plugins...');
    console.log('[Capacitor] Platform:', getPlatform());
    console.log('[Capacitor] Is Native:', isNativePlatform());

    if (isNativePlatform()) {
      // Hide splash screen after initialization
      await hideSplashScreen();

      // Log device info
      const deviceInfo = await getDeviceInfo();
      console.log('[Capacitor] Device:', deviceInfo);

      // Log app info
      const appInfo = await getAppInfo();
      console.log('[Capacitor] App:', appInfo);
    }
  } catch (error) {
    console.error('[Capacitor] Failed to initialize:', error);
  }
};

/**
 * Export all Capacitor functionality
 */
export const capacitorService = {
  // Platform
  isNativePlatform,
  getPlatform,
  isPluginAvailable,

  // Device
  getDeviceInfo,
  getBatteryInfo,
  getLanguageCode,

  // App
  getAppInfo,
  getAppVersionString,
  getAppState,
  addAppStateChangeListener,
  minimizeApp,
  exitApp,

  // Network
  getNetworkStatus,
  addNetworkListener,
  isOnline,

  // Share
  shareContent,
  canShare,

  // Toast
  showToast,

  // Haptics
  vibrate,
  notificationHaptic,
  selectionHaptic,

  // Browser
  openInBrowser,
  closeBrowser,
  addBrowserFinishedListener,

  // Clipboard
  copyToClipboard,
  readFromClipboard,

  // Dialog
  showAlert,
  showConfirm,
  showPrompt,

  // Splash Screen
  showSplashScreen,
  hideSplashScreen,

  // App Launcher
  canOpenUrl,
  openUrl,

  // Screen Orientation
  getOrientation,
  lockOrientation,
  unlockOrientation,
  addOrientationChangeListener,

  // App Update
  checkForUpdate,
  openAppStore,
  performImmediateUpdate,

  // App Review
  requestReview,

  // Badge
  getBadgeCount,
  setBadgeCount,
  clearBadge,
  incrementBadge,
  decrementBadge,
  isBadgeSupported,
  checkBadgePermissions,
  requestBadgePermissions,

  // Initialization
  initializeCapacitor,
};

export default capacitorService;
