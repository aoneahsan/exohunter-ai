# Radix UI Theme System Implementation

## Overview
A comprehensive theme system using Radix UI components with cloud sync for authenticated users and localStorage persistence for guests.

## Features Implemented

### 1. Theme Store (`/src/store/useThemeStore.ts`)
- **Zustand-based state management** with persistence
- **Theme modes**: Light, Dark, System
- **Accent colors**: Blue, Purple, Green, Orange, Pink, Red, Cyan, Amber
- **Font sizes**: Small (14px), Medium (16px), Large (18px)
- **Local storage** for all users
- **Cloud sync** ready for authenticated users

### 2. Theme Provider (`/src/components/ThemeProvider.tsx`)
- Applies theme settings to document root
- Handles system theme detection (prefers-color-scheme)
- Syncs with Firebase for authenticated users
- Loads theme preferences on authentication
- Saves theme changes to Firestore automatically (debounced)
- Applies CSS variables for accent colors and font sizes

### 3. Theme Settings Component (`/src/components/ThemeSettings.tsx`)
- **Card-based UI** for all settings (follows CLAUDE.md guidelines)
- **Theme Mode Selection**: Radio cards with icons (Sun, Moon, Monitor)
- **Accent Color Selection**: Visual color cards with check marks
- **Font Size Selection**: Radio cards with size examples
- **Live Preview**: Shows how theme looks with selected settings
- Uses Radix UI RadioGroup for accessibility
- Smooth transitions and hover states

### 4. Theme Toggle (`/src/components/ThemeToggle.tsx`)
- Quick toggle button in Navbar
- **Click**: Toggle between light/dark
- **Dropdown menu**: Full theme options (Light, Dark, System)
- Uses Radix UI DropdownMenu
- Shows current theme with icons

### 5. Full Page Loader (`/src/components/FullPageLoader.tsx`)
- **Rotating tips** about ExoHunter AI (12 tips total)
- **Animated rocket icon** with smooth animations
- **Progress bar** with gradient
- **Smooth fade out** when app is ready
- Shows during initial app load

### 6. Global CSS Updates (`/src/index.css`)
- **CSS variables** for theme colors
- **Light theme** overrides
- **Dark theme** (default)
- **Accent color variables**: --color-accent-primary, --color-accent-hover, --color-accent-light
- **Font size variables**: --font-size-base, --font-scale
- **Smooth transitions** for theme changes

### 7. Main Entry Point (`/src/main.tsx`)
- Wraps app with ThemeProvider
- Shows FullPageLoader on initial load
- Minimum 2-second load time to show tips
- Smooth app reveal after loading

### 8. Integration with Settings Page
- **Replaced** old Theme & Display section
- **Added** ThemeSettings component
- **Removed** unused imports (Moon, Palette)

### 9. Navigation Integration
- **Theme toggle** in Navbar (desktop)
- Positioned before GitHub link
- Visual separator for better organization

## File Structure

```
src/
├── components/
│   ├── ThemeProvider.tsx          # Main theme provider
│   ├── ThemeSettings.tsx          # Settings UI component
│   ├── ThemeToggle.tsx            # Navbar toggle button
│   └── FullPageLoader.tsx         # Initial loading screen
├── store/
│   └── useThemeStore.ts           # Zustand state management
├── pages/
│   └── Settings.tsx               # Updated to include ThemeSettings
├── components/layout/
│   └── Navbar.tsx                 # Updated with ThemeToggle
├── index.css                      # Updated with theme CSS variables
└── main.tsx                       # Updated with ThemeProvider & loader
```

## Firebase Structure

Theme preferences are stored in Firestore:
```
users/{uid}/preferences/theme
{
  theme: 'light' | 'dark' | 'system',
  accentColor: 'blue' | 'purple' | 'green' | ...,
  fontSize: 'small' | 'medium' | 'large',
  updatedAt: ISO timestamp
}
```

## Dependencies Added

- `@radix-ui/react-radio-group` - For accessible radio button cards

## How It Works

### Theme Application Flow
1. **App loads** → Shows FullPageLoader
2. **ThemeProvider initializes** → Reads from localStorage
3. **If authenticated** → Loads from Firebase and syncs
4. **Theme applied** → CSS variables set on document root
5. **User changes theme** → Saves to localStorage + Firebase (if authenticated)

### Theme Modes
- **Light**: White background, dark text
- **Dark**: Space-themed dark background (default)
- **System**: Follows OS preference (prefers-color-scheme)

### Accent Colors
Each accent color has three shades:
- **Primary**: Main color for buttons, links
- **Hover**: Darker shade for hover states
- **Light**: Lighter shade for backgrounds

### Font Sizes
- **Small**: 14px base (0.875x scale)
- **Medium**: 16px base (1x scale) - default
- **Large**: 18px base (1.125x scale)

## Usage Examples

### Access Theme Store
```typescript
import { useThemeStore } from '@/store/useThemeStore';

function MyComponent() {
  const { theme, accentColor, fontSize, setTheme, setAccentColor, setFontSize } = useThemeStore();

  // Change theme
  setTheme('dark');

  // Change accent color
  setAccentColor('purple');

  // Change font size
  setFontSize('large');
}
```

### Use CSS Variables
```css
.my-button {
  background-color: var(--color-accent-primary);
  font-size: var(--font-size-base);
}

.my-button:hover {
  background-color: var(--color-accent-hover);
}
```

### Access in Components
```typescript
// The theme is automatically applied to document root
// No additional setup needed in components
```

## Testing

To test the theme system:

1. **Start dev server**: `yarn dev`
2. **Open app**: http://localhost:5994
3. **Wait for loader**: Should show rotating tips for 2+ seconds
4. **Navigate to Settings**: Click Settings in navbar
5. **Test theme modes**: Switch between Light, Dark, System
6. **Test accent colors**: Select different accent colors
7. **Test font sizes**: Change font size and see preview
8. **Test navbar toggle**: Click theme icon in navbar
9. **Test persistence**: Reload page, settings should persist
10. **Test cloud sync** (if authenticated): Settings should sync across devices

## Notes

- Theme settings are **saved automatically** (no save button needed for theme)
- **Debounced** cloud sync (1 second delay) to avoid excessive writes
- **System theme** updates automatically when OS preference changes
- **Smooth transitions** for theme changes (300ms)
- **Accessible** - Uses Radix UI components with proper ARIA attributes
- **Responsive** - Works on all screen sizes

## Future Enhancements

Possible improvements:
- Custom accent colors (color picker)
- Additional theme presets
- Animation speed controls
- Contrast mode for accessibility
- Export/import theme settings
- Theme preview in onboarding

## Developer Contact

- **Name**: Ahsan Mahmood
- **Email**: aoneahsan@gmail.com
- **Phone/WhatsApp**: +923046619706
- **GitHub**: github.com/aoneahsan
- **Portfolio**: aoneahsan.com
