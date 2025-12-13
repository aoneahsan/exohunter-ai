import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aoneahsan.exohunterai',
  appName: 'ExoHunter AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0B0E1F',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#667eea',
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    App: {
      deepLinkScheme: 'exohunterai',
    },
    Browser: {
      toolbarColor: '#667eea',
    },
    Toast: {
      duration: 'short',
      position: 'bottom',
    },
    Badge: {
      persist: true,
      autoClear: false,
    },
  },
};

export default config;