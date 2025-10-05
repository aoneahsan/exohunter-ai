import OneSignal from 'react-onesignal';

let isInitialized = false;

export const initializeOneSignal = async () => {
  try {
    const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    
    if (!appId) {
      console.warn('OneSignal App ID is not configured');
      return;
    }

    if (isInitialized) {
      console.log('OneSignal already initialized');
      return await OneSignal.Notifications.permission;
    }

    // Initialize OneSignal
    await OneSignal.init({
      appId: appId,
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerPath: '/OneSignalSDKWorker.js',
      welcomeNotification: {
        title: 'ExoHunter AI',
        message: 'Thanks for subscribing to notifications!',
        url: window.location.href,
      },
    });

    isInitialized = true;

    // Set up external user ID if user is logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      await OneSignal.User.addAlias('external_id', userId);
    }

    // Get notification permission status
    const permission = await OneSignal.Notifications.permission;
    console.log('Notification permission status:', permission);

    return permission;
  } catch (error) {
    console.error('Failed to initialize OneSignal:', error);
    return null;
  }
};

export const requestNotificationPermission = async () => {
  try {
    // First check if OneSignal is initialized
    const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    if (!appId) {
      console.warn('OneSignal App ID is not configured');
      return false;
    }

    // Request permission using the native browser API first
    const browserPermission = await Notification.requestPermission();
    
    if (browserPermission === 'granted') {
      // If browser permission is granted, register with OneSignal
      await OneSignal.Notifications.requestPermission();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    // Fallback to OneSignal's built-in prompt
    try {
      await OneSignal.Notifications.requestPermission();
      const permission = await OneSignal.Notifications.permission;
      return permission === true;
    } catch (fallbackError) {
      console.error('Fallback permission request also failed:', fallbackError);
      return false;
    }
  }
};

export const isNotificationEnabled = async () => {
  try {
    const permission = await OneSignal.Notifications.permission;
    return permission === true;
  } catch (error) {
    console.error('Failed to get notification permission:', error);
    return false;
  }
};

export const setExternalUserId = async (userId: string) => {
  try {
    await OneSignal.User.addAlias('external_id', userId);
    return true;
  } catch (error) {
    console.error('Failed to set external user ID:', error);
    return false;
  }
};

export const removeExternalUserId = async () => {
  try {
    await OneSignal.User.removeAlias('external_id');
    return true;
  } catch (error) {
    console.error('Failed to remove external user ID:', error);
    return false;
  }
};

export const sendTag = async (key: string, value: string) => {
  try {
    await OneSignal.User.addTag(key, value);
    return true;
  } catch (error) {
    console.error('Failed to send tag:', error);
    return false;
  }
};

export const sendTags = async (tags: Record<string, string>) => {
  try {
    await OneSignal.User.addTags(tags);
    return true;
  } catch (error) {
    console.error('Failed to send tags:', error);
    return false;
  }
};

export const deleteTag = async (key: string) => {
  try {
    await OneSignal.User.removeTag(key);
    return true;
  } catch (error) {
    console.error('Failed to delete tag:', error);
    return false;
  }
};

export const deleteTags = async (keys: string[]) => {
  try {
    await OneSignal.User.removeTags(keys);
    return true;
  } catch (error) {
    console.error('Failed to delete tags:', error);
    return false;
  }
};