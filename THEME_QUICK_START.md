# Theme System Quick Start Guide

## What Was Implemented

A complete Radix UI-based theme system with:
- Light/Dark/System theme modes
- 8 accent colors (Blue, Purple, Green, Orange, Pink, Red, Cyan, Amber)
- 3 font sizes (Small, Medium, Large)
- Cloud sync for authenticated users
- LocalStorage persistence for all users
- Full-page loader with rotating tips
- Theme toggle in navbar

## Quick Test

### 1. Start the App
```bash
yarn dev
```

### 2. Initial Load
- You'll see a full-page loader with:
  - Animated rocket icon
  - "ExoHunter AI" branding
  - Progress bar
  - Rotating tips about the app (changes every 3 seconds)
  - Minimum 2-second display time

### 3. Test Theme Toggle (Navbar)
- Look for the sun/moon icon in the top navigation bar (before GitHub link)
- **Click** to toggle between light/dark mode
- **Right-click or long-press** to open dropdown menu with all options:
  - Light (Sun icon)
  - Dark (Moon icon)
  - System (Monitor icon)

### 4. Test Full Theme Settings (Settings Page)
- Navigate to Settings page (user icon → Settings)
- Scroll to "Theme Mode" section
- You'll see three card-based options sections:

#### A. Theme Mode Cards
- Light: Bright and clear interface
- Dark: Perfect for stargazing (default)
- System: Match your device settings
- Each card has icon, title, and description
- Selected card has purple border and checkmark

#### B. Accent Color Cards
- 8 color options in a grid
- Each shows a colored circle with the color name
- Selected color shows a checkmark inside the circle
- Colors scale up slightly on hover

#### C. Font Size Cards
- Small (14px): Compact text size
- Medium (16px): Standard reading size (default)
- Large (18px): Easier to read
- Each shows the size value
- Icon size changes to match the selection

#### D. Preview Card
- Shows live preview of your theme
- Includes sample heading, paragraph, and button
- Button uses your selected accent color
- Text uses your selected font size

## File Locations

### New Files Created
```
/src/store/useThemeStore.ts           - Zustand theme state management
/src/components/ThemeProvider.tsx      - Theme application & cloud sync
/src/components/ThemeSettings.tsx      - Settings page UI component
/src/components/ThemeToggle.tsx        - Navbar toggle button
/src/components/FullPageLoader.tsx     - Initial loading screen
```

### Modified Files
```
/src/main.tsx                          - Added ThemeProvider & loader
/src/pages/Settings.tsx                - Added ThemeSettings component
/src/components/layout/Navbar.tsx      - Added ThemeToggle button
/src/index.css                         - Added theme CSS variables
```

## Firebase Integration

### Firestore Structure
When a user is authenticated, theme preferences are saved to:
```
users/{uid}/preferences/theme
```

### Auto-Sync Features
- Loads from cloud when user logs in
- Saves automatically when settings change (1-second debounce)
- Merges cloud settings with local settings
- Falls back to localStorage if not authenticated

## CSS Variables Available

Use these in your components:

### Theme Colors
```css
--color-background        /* Page background */
--color-foreground        /* Text color */
--color-card             /* Card background */
--color-border           /* Border colors */
--color-muted            /* Muted backgrounds */
```

### Accent Colors (Dynamic)
```css
--color-accent-primary   /* Main accent color */
--color-accent-hover     /* Hover state */
--color-accent-light     /* Light variant */
```

### Font Sizes (Dynamic)
```css
--font-size-base         /* Base font size (14px, 16px, or 18px) */
--font-scale             /* Scale multiplier (0.875, 1, or 1.125) */
```

## Example Usage in Components

### Using the Theme Store
```typescript
import { useThemeStore } from '@/store/useThemeStore';

function MyComponent() {
  const { theme, accentColor, fontSize } = useThemeStore();

  return (
    <div>
      Current theme: {theme}
      Accent color: {accentColor}
      Font size: {fontSize}
    </div>
  );
}
```

### Using CSS Variables
```typescript
function MyButton() {
  return (
    <button
      style={{
        backgroundColor: 'var(--color-accent-primary)',
        fontSize: 'var(--font-size-base)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
      }}
    >
      Click me
    </button>
  );
}
```

### Using Tailwind (if needed)
```typescript
// The theme classes are automatically applied to <html> element
// So Tailwind's dark: variants work automatically
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content adapts to theme
</div>
```

## Testing Checklist

- [ ] Full-page loader shows on initial load
- [ ] Loader shows rotating tips (changes every 3 seconds)
- [ ] App appears after loader completes
- [ ] Theme toggle in navbar works
- [ ] Navbar toggle shows correct icon (sun/moon)
- [ ] Dropdown menu in navbar works
- [ ] Settings page has Theme Mode section
- [ ] Can select Light theme (background becomes white)
- [ ] Can select Dark theme (background becomes dark)
- [ ] Can select System theme (follows OS preference)
- [ ] Can select different accent colors
- [ ] Accent color changes button colors in preview
- [ ] Can select different font sizes
- [ ] Font size changes text size in preview
- [ ] Settings persist after page reload
- [ ] Settings sync when logged in (test on multiple devices)

## Loading Tips

The loader shows these rotating tips:
1. "Did you know? ExoHunter AI has analyzed over 5,000 confirmed exoplanets"
2. "Tip: Use the 3D Explorer to visualize entire planetary systems"
3. "Fun fact: The nearest known exoplanet is only 4.2 light-years away"
4. "Tip: Filter discoveries by habitable zone to find Earth-like planets"
5. "Did you know? Some exoplanets orbit multiple stars at once"
6. "Tip: Check the Analyzer to predict exoplanet characteristics"
7. "Fun fact: We've discovered planets made entirely of diamond"
8. "Tip: Join the community to share your discoveries"
9. "Did you know? The largest known exoplanet is 13 times Jupiter's mass"
10. "Tip: Track your progress on the Dashboard"
11. "Fun fact: Some exoplanets have glass rain and supersonic winds"
12. "Tip: Explore different detection methods in the Learn section"

## Troubleshooting

### Theme not applying
- Check browser console for errors
- Verify localStorage has 'exohunter-theme-storage' key
- Check if CSS variables are set on document root

### Settings not persisting
- Check browser console for Firestore errors
- Verify user is authenticated
- Check localStorage quota

### Loader not showing
- Clear browser cache
- Check if isLoading state is working in main.tsx

### Colors not changing
- Verify accent color CSS variables are set
- Check if ThemeProvider is wrapping the app
- Inspect document root for style attributes

## Performance Notes

- Theme changes are debounced (1 second) before saving to Firestore
- System theme detection uses matchMedia API (lightweight)
- CSS variables update is instant (no re-render needed)
- Loader shows minimum 2 seconds to ensure tips are readable
- All components use Radix UI (accessible and performant)

## Accessibility Features

- All theme controls use Radix UI (ARIA compliant)
- Keyboard navigation works throughout
- Screen reader friendly labels
- Focus indicators visible
- Color contrast meets WCAG AA standards
- System theme respects user preferences

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support
- IE11: Not supported (modern CSS variables required)

## Next Steps

1. Test the theme system thoroughly
2. Customize accent colors if needed (edit useThemeStore.ts)
3. Add more font size options if desired
4. Create custom theme presets
5. Add theme-specific animations or effects

## Support

For questions or issues:
- Check THEME_IMPLEMENTATION.md for detailed docs
- Contact: aoneahsan@gmail.com
- GitHub: github.com/aoneahsan
