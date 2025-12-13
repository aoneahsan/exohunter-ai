import { useEffect, type ReactNode } from 'react';
import { useThemeStore, accentColorMap, fontSizeMap } from '@/store/useThemeStore';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const {
    theme,
    accentColor,
    fontSize,
    resolvedTheme,
    setResolvedTheme,
    setIsInitialized,
    syncFromCloud,
    getSettings,
  } = useThemeStore();
  const { currentUser } = useAuth();

  // Handle system theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme, setResolvedTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    // Apply accent color CSS variables
    const colors = accentColorMap[accentColor];
    root.style.setProperty('--color-accent-primary', colors.primary);
    root.style.setProperty('--color-accent-hover', colors.hover);
    root.style.setProperty('--color-accent-light', colors.light);

    // Apply font size
    const fontConfig = fontSizeMap[fontSize];
    root.style.setProperty('--font-size-base', fontConfig.base);
    root.style.setProperty('--font-scale', fontConfig.scale.toString());
  }, [resolvedTheme, accentColor, fontSize]);

  // Load theme from Firebase for authenticated users
  useEffect(() => {
    const loadThemeFromCloud = async () => {
      if (!currentUser) {
        setIsInitialized(true);
        return;
      }

      try {
        const preferencesRef = doc(db, 'users', currentUser.uid, 'preferences', 'theme');
        const preferencesDoc = await getDoc(preferencesRef);

        if (preferencesDoc.exists()) {
          const cloudSettings = preferencesDoc.data();
          syncFromCloud({
            theme: cloudSettings.theme,
            accentColor: cloudSettings.accentColor,
            fontSize: cloudSettings.fontSize,
          });
        }
      } catch (error) {
        console.error('Failed to load theme from cloud:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadThemeFromCloud();
  }, [currentUser, syncFromCloud, setIsInitialized]);

  // Save theme to Firebase when settings change
  useEffect(() => {
    const saveThemeToCloud = async () => {
      if (!currentUser) return;

      try {
        const preferencesRef = doc(db, 'users', currentUser.uid, 'preferences', 'theme');
        const settings = getSettings();
        await setDoc(preferencesRef, {
          ...settings,
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Failed to save theme to cloud:', error);
      }
    };

    // Debounce the save operation
    const timeoutId = setTimeout(saveThemeToCloud, 1000);
    return () => clearTimeout(timeoutId);
  }, [theme, accentColor, fontSize, currentUser, getSettings]);

  return <>{children}</>;
}
