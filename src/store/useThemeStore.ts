import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'red' | 'cyan' | 'amber';
export type FontSize = 'small' | 'medium' | 'large';

export interface ThemeSettings {
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
}

interface ThemeState extends ThemeSettings {
  resolvedTheme: 'light' | 'dark';
  isInitialized: boolean;
  setTheme: (theme: ThemeMode) => void;
  setAccentColor: (color: AccentColor) => void;
  setFontSize: (size: FontSize) => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
  setIsInitialized: (initialized: boolean) => void;
  syncFromCloud: (settings: Partial<ThemeSettings>) => void;
  getSettings: () => ThemeSettings;
}

const defaultSettings: ThemeSettings = {
  theme: 'dark',
  accentColor: 'purple',
  fontSize: 'medium',
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,
      resolvedTheme: 'dark',
      isInitialized: false,

      setTheme: (theme) => {
        set({ theme });
      },

      setAccentColor: (accentColor) => {
        set({ accentColor });
      },

      setFontSize: (fontSize) => {
        set({ fontSize });
      },

      setResolvedTheme: (resolvedTheme) => {
        set({ resolvedTheme });
      },

      setIsInitialized: (isInitialized) => {
        set({ isInitialized });
      },

      syncFromCloud: (settings) => {
        set((state) => ({
          ...state,
          ...settings,
        }));
      },

      getSettings: () => {
        const state = get();
        return {
          theme: state.theme,
          accentColor: state.accentColor,
          fontSize: state.fontSize,
        };
      },
    }),
    {
      name: 'exohunter-theme-storage',
      partialize: (state) => ({
        theme: state.theme,
        accentColor: state.accentColor,
        fontSize: state.fontSize,
      }),
    }
  )
);

export const accentColorMap: Record<AccentColor, { primary: string; hover: string; light: string }> = {
  blue: { primary: '#3b82f6', hover: '#2563eb', light: '#60a5fa' },
  purple: { primary: '#a855f7', hover: '#9333ea', light: '#c084fc' },
  green: { primary: '#22c55e', hover: '#16a34a', light: '#4ade80' },
  orange: { primary: '#f97316', hover: '#ea580c', light: '#fb923c' },
  pink: { primary: '#ec4899', hover: '#db2777', light: '#f472b6' },
  red: { primary: '#ef4444', hover: '#dc2626', light: '#f87171' },
  cyan: { primary: '#06b6d4', hover: '#0891b2', light: '#22d3ee' },
  amber: { primary: '#f59e0b', hover: '#d97706', light: '#fbbf24' },
};

export const fontSizeMap: Record<FontSize, { base: string; scale: number }> = {
  small: { base: '14px', scale: 0.875 },
  medium: { base: '16px', scale: 1 },
  large: { base: '18px', scale: 1.125 },
};
