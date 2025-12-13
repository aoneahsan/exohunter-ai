# App Icons Guide

## Required Icon Sizes

### Google Play Store

#### App Icon (Required)
- **Size:** 512 x 512 pixels
- **Format:** PNG (32-bit, with alpha channel)
- **File name:** `icon-512.png`
- **Purpose:** Main app icon displayed in Google Play Store
- **Design guidelines:**
  - No transparency (alpha channel allowed but background should be opaque)
  - Full bleed (no padding)
  - Safe zone: Keep important elements within center 66% (340 x 340px)
  - No rounded corners (Play Store applies mask automatically)
  - High contrast with dark and light backgrounds
  - Simple, recognizable at small sizes

#### High-Resolution Icon
- **Size:** 1024 x 1024 pixels
- **Format:** PNG (32-bit)
- **File name:** `icon-1024.png`
- **Purpose:** Future-proofing and promotional materials
- **Design guidelines:** Same as 512x512

#### Adaptive Icon (Required for Android 8.0+)
Google Play requires adaptive icons with separate foreground and background layers.

**Foreground Layer:**
- **Size:** 512 x 512 pixels
- **Format:** PNG with transparency
- **File name:** `adaptive-foreground.png`
- **Safe zone:** Keep important elements within center 264 x 264px circle
- **Design guidelines:**
  - Can have transparency
  - Should work on any background color
  - Keep critical content in circular safe zone

**Background Layer:**
- **Size:** 512 x 512 pixels
- **Format:** PNG (can be solid color or pattern)
- **File name:** `adaptive-background.png`
- **Design guidelines:**
  - Can be solid color or gradient
  - No transparency needed
  - Should complement foreground

**Alternative:** You can provide a solid color background:
- Edit Android resources: `android/app/src/main/res/values/colors.xml`
- Add: `<color name="iconBackground">#0B0E1F</color>` (use your brand color)

### Apple App Store

#### App Store Icon (Required)
- **Size:** 1024 x 1024 pixels
- **Format:** PNG or JPG (no alpha channel)
- **File name:** `ios-icon-1024.png`
- **Color space:** RGB (no transparency)
- **Purpose:** Displayed in App Store
- **Design guidelines:**
  - No rounded corners (iOS applies corners automatically)
  - No transparency
  - Full bleed design
  - High resolution
  - Consistent with iOS design principles

#### App Icon Sizes for iOS Bundle
Xcode will generate all required sizes from the 1024x1024 icon, but you can provide these manually:
- 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5 (various scales)
- Store in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

### PWA/Web App Icon
- **Size:** 512 x 512 pixels
- **Format:** PNG with transparency
- **File name:** `web-icon-512.png`
- **Purpose:** Progressive Web App installation, bookmarks
- **Location:** `public/icons/icon-512x512.png`

## Icon Design Guidelines

### Visual Style
- **Theme:** Space/astronomy with modern tech aesthetic
- **Colors:**
  - Primary: Deep space blue/purple (#0B0E1F background)
  - Accent: Gradient purple-blue (#667eea to #764ba2)
  - Highlights: White/light blue for stars/planets
- **Elements to consider:**
  - Planet with orbital rings
  - Telescope silhouette
  - AI/tech elements (circuit patterns, neural network)
  - Stars or constellation
  - Exoplanet detection visualization (light curve graph)
- **Style:** Modern, clean, professional, recognizable

### Technical Requirements
- **Resolution:** Always design at highest required size (1024x1024) then downscale
- **Clarity:** Icon should be recognizable at 48x48 pixels
- **Contrast:** Test on both light and dark backgrounds
- **Simplicity:** Avoid fine details that disappear at small sizes
- **Consistency:** Match app's visual branding and splash screen

### Best Practices
- Use vector graphics (SVG) for source files, export to PNG
- Avoid text in icons (use symbols instead)
- Test icon at multiple sizes (1024, 512, 192, 48 pixels)
- Ensure icon looks good with/without rounded corners
- Check contrast ratios for accessibility
- Preview on actual devices (phone home screen, tablet, etc.)

## Current Icon Status

**Status:** Icons need to be created

**Action Required:**
1. Design master icon at 1024x1024 pixels
2. Export all required sizes listed above
3. Place files in this directory with specified file names
4. Test icons on Android (Play Store preview, device home screen)
5. Test icons on iOS (App Store preview, device home screen)
6. Update `public/` folder with web app icons

## Suggested Design Concept

**Concept 1: Planet with AI Elements**
- Central exoplanet with atmospheric glow
- Orbital ring suggesting planetary system
- Subtle circuit/neural network pattern overlay
- Stars in background
- Color gradient: purple to blue

**Concept 2: Telescope/Detection Theme**
- Stylized telescope or transit detection visualization
- Light curve graph silhouette
- Planet crossing a star (transit method)
- Modern geometric shapes
- Tech-inspired gradient

**Concept 3: Discovery Focus**
- Magnifying glass revealing a planet
- Star field background
- AI element (dot pattern, connections)
- Bold, simple shapes
- High contrast for visibility

## Tools for Icon Creation

### Professional (Recommended)
- **Adobe Illustrator** - Vector graphics, professional grade
- **Figma** - Web-based, collaborative, great for UI design
- **Sketch** - macOS app, excellent for app icon design
- **Affinity Designer** - One-time purchase alternative to Illustrator

### Free/Budget Options
- **Inkscape** - Free vector graphics editor
- **GIMP** - Free raster graphics editor
- **Canva** - Web-based with templates (free tier available)
- **Vectr** - Free vector graphics

### Online Generators
- **Figma Icon Templates** - Free icon template files
- **App Icon Generator** - Generate all sizes from one design
- **Realfavicongenerator.net** - Generate favicons and web icons

## Testing Icons

### Android Testing
1. Place 512x512 icon in Play Console and preview
2. Generate APK with icon and install on test device
3. Check home screen appearance
4. Test adaptive icon on Android 8.0+ devices
5. Verify all size variants render correctly

### iOS Testing
1. Upload 1024x1024 to App Store Connect and preview
2. Build app with icon in Xcode
3. Install on test device (physical device recommended)
4. Check home screen, spotlight search, settings
5. Verify different device sizes (iPhone, iPad)

### Web Testing
1. Place icon in `public/icons/` folder
2. Update `public/manifest.json` with icon paths
3. Test PWA installation on Android/iOS
4. Check bookmark icon appearance
5. Test favicon in browser tabs

## Quality Checklist

Before finalizing icons, verify:
- [ ] All required sizes created and exported
- [ ] PNG files optimized (use tools like TinyPNG)
- [ ] No transparency in iOS 1024x1024 icon
- [ ] Adaptive icon foreground works on various backgrounds
- [ ] Icon recognizable at 48x48 pixels
- [ ] Tested on light and dark backgrounds
- [ ] Files named correctly according to this guide
- [ ] Color profile: sRGB for consistency
- [ ] No text included (symbols only)
- [ ] Consistent with app branding and splash screen
- [ ] Icons previewed in actual store listings
- [ ] Tested on multiple devices

## File Naming Convention

Use these exact file names in this directory:

```
icons/
├── README.md (this file)
├── icon-512.png (Google Play required)
├── icon-1024.png (High resolution, iOS required)
├── adaptive-foreground.png (Android adaptive icon layer)
├── adaptive-background.png (Android adaptive icon layer)
├── ios-icon-1024.png (iOS App Store required)
├── web-icon-512.png (PWA/web app)
└── source/
    ├── icon-master.ai (Adobe Illustrator source)
    ├── icon-master.svg (Vector source)
    └── icon-master.fig (Figma source)
```

## Resources

- [Google Play Icon Guidelines](https://developer.android.com/distribute/google-play/resources/icon-design-specifications)
- [Apple App Icon Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Material Design Icons](https://material.io/design/iconography)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [PWA Icon Requirements](https://web.dev/add-manifest/)

## Contact

For questions about icon requirements:
- Developer: Ahsan Mahmood
- Email: aoneahsan@gmail.com
- Phone: +923046619706

Last Updated: December 2024
