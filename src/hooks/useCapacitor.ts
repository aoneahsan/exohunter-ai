/**
 * useCapacitor Hook
 *
 * React hook for accessing Capacitor plugins functionality.
 * Provides easy access to all native features with React state management.
 *
 * @author Ahsan Mahmood <aoneahsan@gmail.com>
 */

import { useState, useEffect, useCallback } from 'react';
import {
  capacitorService,
  isNativePlatform,
  getPlatform,
  getDeviceInfo,
  getAppInfo,
  getNetworkStatus,
  showToast,
  vibrate,
  copyToClipboard,
  shareContent,
  showAlert,
  showConfirm,
  openInBrowser,
} from '@services/capacitor';
import type { DeviceInfo } from '@capacitor/device';
import type { AppInfo } from '@capacitor/app';
import type { ConnectionStatus } from '@capacitor/network';
import type { ImpactStyle } from '@capacitor/haptics';

/**
 * Main Capacitor hook
 */
export const useCapacitor = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [networkStatus, setNetworkStatus] = useState<ConnectionStatus | null>(
    null
  );
  const [isOnlineState, setIsOnlineState] = useState(true);
  const [appVersion, setAppVersion] = useState<string>('');

  const platform = getPlatform();
  const isNative = isNativePlatform();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Get device info
        const device = await getDeviceInfo();
        setDeviceInfo(device);

        // Get app info
        const app = await getAppInfo();
        setAppInfo(app);
        setAppVersion(`v${app.version} (build ${app.build})`);

        // Get network status
        const network = await getNetworkStatus();
        setNetworkStatus(network);
        setIsOnlineState(network.connected);
      } catch (error) {
        console.error('[useCapacitor] Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  // Network status listener
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    capacitorService.addNetworkListener((status) => {
      setNetworkStatus(status);
      setIsOnlineState(status.connected);
    }).then((listener) => {
      cleanup = () => listener.remove();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return {
    // State
    deviceInfo,
    appInfo,
    networkStatus,
    isOnline: isOnlineState,
    appVersion,
    platform,
    isNative,

    // Service methods (expose as 'service' to avoid conflicts)
    service: capacitorService,
  };
};

/**
 * Hook for toast notifications
 */
export const useToast = () => {
  const toast = useCallback(
    async (
      text: string,
      options?: { duration?: 'short' | 'long'; position?: 'top' | 'center' | 'bottom' }
    ) => {
      await showToast({ text, ...options });
    },
    []
  );

  const success = useCallback(async (text: string) => {
    await showToast({ text, duration: 'short', position: 'bottom' });
  }, []);

  const error = useCallback(async (text: string) => {
    await showToast({ text, duration: 'long', position: 'bottom' });
  }, []);

  const info = useCallback(async (text: string) => {
    await showToast({ text, duration: 'short', position: 'top' });
  }, []);

  return { toast, success, error, info };
};

/**
 * Hook for haptic feedback
 */
export const useHaptics = () => {
  const impact = useCallback(async (style: ImpactStyle = 'MEDIUM' as ImpactStyle) => {
    await vibrate(style);
  }, []);

  const light = useCallback(async () => {
    await vibrate('LIGHT' as ImpactStyle);
  }, []);

  const medium = useCallback(async () => {
    await vibrate('MEDIUM' as ImpactStyle);
  }, []);

  const heavy = useCallback(async () => {
    await vibrate('HEAVY' as ImpactStyle);
  }, []);

  const success = useCallback(async () => {
    await capacitorService.notificationHaptic('SUCCESS' as any);
  }, []);

  const warning = useCallback(async () => {
    await capacitorService.notificationHaptic('WARNING' as any);
  }, []);

  const errorHaptic = useCallback(async () => {
    await capacitorService.notificationHaptic('ERROR' as any);
  }, []);

  const selection = useCallback(async () => {
    await capacitorService.selectionHaptic();
  }, []);

  return {
    impact,
    light,
    medium,
    heavy,
    success,
    warning,
    error: errorHaptic,
    selection,
  };
};

/**
 * Hook for network status
 */
export const useNetwork = () => {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Get initial status
    getNetworkStatus().then((s) => {
      setStatus(s);
      setIsOnline(s.connected);
    });

    // Listen for changes
    capacitorService.addNetworkListener((s) => {
      setStatus(s);
      setIsOnline(s.connected);
    }).then((listener) => {
      cleanup = () => listener.remove();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return {
    status,
    isOnline,
    isOffline: !isOnline,
    connectionType: status?.connectionType,
  };
};

/**
 * Hook for app state
 */
export const useAppState = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    capacitorService.addAppStateChangeListener((state) => {
      setIsActive(state.isActive);
    }).then((listener) => {
      cleanup = () => listener.remove();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return {
    isActive,
    isBackground: !isActive,
  };
};

/**
 * Hook for clipboard operations
 */
export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>('');

  const copy = useCallback(async (text: string) => {
    try {
      await copyToClipboard(text);
      setCopiedText(text);
      await showToast({ text: 'Copied to clipboard', duration: 'short' });
      return true;
    } catch (error) {
      console.error('[useClipboard] Failed to copy:', error);
      await showToast({ text: 'Failed to copy', duration: 'short' });
      return false;
    }
  }, []);

  const read = useCallback(async () => {
    try {
      const text = await capacitorService.readFromClipboard();
      setCopiedText(text);
      return text;
    } catch (error) {
      console.error('[useClipboard] Failed to read:', error);
      return '';
    }
  }, []);

  return {
    copy,
    read,
    copiedText,
  };
};

/**
 * Hook for share functionality
 */
export const useShare = () => {
  const share = useCallback(
    async (options: { title?: string; text?: string; url?: string }) => {
      try {
        const result = await shareContent(options);
        return result;
      } catch (error) {
        console.error('[useShare] Failed to share:', error);
        await showToast({ text: 'Failed to share', duration: 'short' });
        return null;
      }
    },
    []
  );

  const canShare = useCallback(async () => {
    return await capacitorService.canShare();
  }, []);

  return {
    share,
    canShare,
  };
};

/**
 * Hook for dialogs
 */
export const useDialog = () => {
  const alert = useCallback(
    async (title: string, message: string, buttonTitle?: string) => {
      await showAlert({ title, message, buttonTitle });
    },
    []
  );

  const confirm = useCallback(
    async (
      title: string,
      message: string,
      okButtonTitle?: string,
      cancelButtonTitle?: string
    ) => {
      return await showConfirm({
        title,
        message,
        okButtonTitle,
        cancelButtonTitle,
      });
    },
    []
  );

  const prompt = useCallback(
    async (
      title: string,
      message: string,
      options?: {
        okButtonTitle?: string;
        cancelButtonTitle?: string;
        inputPlaceholder?: string;
        inputText?: string;
      }
    ) => {
      return await capacitorService.showPrompt({ title, message, ...options });
    },
    []
  );

  return {
    alert,
    confirm,
    prompt,
  };
};

/**
 * Hook for browser operations
 */
export const useBrowser = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    capacitorService.addBrowserFinishedListener(() => {
      setIsOpen(false);
    }).then((listener) => {
      cleanup = () => listener.remove();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  const open = useCallback(async (url: string, options?: any) => {
    try {
      await openInBrowser({ url, ...options });
      setIsOpen(true);
    } catch (error) {
      console.error('[useBrowser] Failed to open:', error);
    }
  }, []);

  const close = useCallback(async () => {
    try {
      await capacitorService.closeBrowser();
      setIsOpen(false);
    } catch (error) {
      console.error('[useBrowser] Failed to close:', error);
    }
  }, []);

  return {
    open,
    close,
    isOpen,
  };
};

/**
 * Hook for app version
 */
export const useAppVersion = () => {
  const [version, setVersion] = useState<string>('v1.0.0 (build 1)');
  const [info, setInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    const loadVersion = async () => {
      try {
        const appInfo = await getAppInfo();
        setInfo(appInfo);
        setVersion(`v${appInfo.version} (build ${appInfo.build})`);
      } catch (error) {
        console.error('[useAppVersion] Failed to load version:', error);
      }
    };

    loadVersion();
  }, []);

  return {
    version,
    info,
    versionNumber: info?.version || '1.0.0',
    buildNumber: info?.build || '1',
  };
};

/**
 * Hook for orientation
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<string>('portrait-primary');

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Get initial orientation
    capacitorService.getOrientation().then(setOrientation);

    // Listen for changes
    capacitorService.addOrientationChangeListener(
      setOrientation
    ).then((listener) => {
      cleanup = () => listener.remove();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  const lock = useCallback(async (type: any) => {
    await capacitorService.lockOrientation(type);
  }, []);

  const unlock = useCallback(async () => {
    await capacitorService.unlockOrientation();
  }, []);

  return {
    orientation,
    lock,
    unlock,
    isPortrait: orientation.includes('portrait'),
    isLandscape: orientation.includes('landscape'),
  };
};

/**
 * Hook for app updates
 */
export const useAppUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<any>(null);

  const checkForUpdate = useCallback(async () => {
    try {
      const info = await capacitorService.checkForUpdate();
      setUpdateInfo(info);
      setUpdateAvailable(!!info);
      return info;
    } catch (error) {
      console.error('[useAppUpdate] Failed to check for update:', error);
      return null;
    }
  }, []);

  const openStore = useCallback(async () => {
    await capacitorService.openAppStore();
  }, []);

  const performUpdate = useCallback(async () => {
    await capacitorService.performImmediateUpdate();
  }, []);

  return {
    updateAvailable,
    updateInfo,
    checkForUpdate,
    openStore,
    performUpdate,
  };
};

/**
 * Hook for badge management
 */
export const useBadge = () => {
  const [count, setCount] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if badge is supported
    capacitorService.isBadgeSupported().then(setIsSupported);

    // Get initial count
    capacitorService.getBadgeCount().then(setCount);
  }, []);

  const set = useCallback(async (newCount: number) => {
    await capacitorService.setBadgeCount(newCount);
    setCount(newCount);
  }, []);

  const clear = useCallback(async () => {
    await capacitorService.clearBadge();
    setCount(0);
  }, []);

  const increment = useCallback(async () => {
    await capacitorService.incrementBadge();
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(async () => {
    await capacitorService.decrementBadge();
    setCount((prev) => Math.max(0, prev - 1));
  }, []);

  return {
    count,
    isSupported,
    set,
    clear,
    increment,
    decrement,
  };
};

export default useCapacitor;
