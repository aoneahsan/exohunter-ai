# Quick Start Guide - App Store Publishing

This guide provides a streamlined checklist to get ExoHunter AI published on Google Play Store and Apple App Store.

## Before You Start

Verify these URLs are live and accessible:
- [x] https://exohunter-ai.web.app/ (Web URL)
- [x] https://exohunter-ai.web.app/privacy (Privacy Policy)
- [x] https://exohunter-ai.web.app/terms (Terms of Service)
- [x] https://exohunter-ai.web.app/data-deletion (Data Deletion)

## Step 1: Review Metadata (5 minutes)

1. Open `metadata.md`
2. Read through app descriptions
3. Verify all information is accurate
4. Note the keywords for store listing
5. Confirm developer contact information

**Status:** ✅ Complete (review only)

## Step 2: Create App Icons (1-2 hours)

### Required Sizes:
- **512 x 512 pixels** (Google Play)
- **1024 x 1024 pixels** (iOS App Store)
- **Adaptive icon layers** (Android 8.0+)

### Design Concept:
- Space/astronomy theme
- Exoplanet or planetary system
- AI/tech elements (subtle)
- Colors: Deep blue (#0B0E1F), purple-blue gradient (#667eea to #764ba2)
- Professional, modern, recognizable at small sizes

### Tools to Use:
- **Easiest:** Canva (free templates)
- **Professional:** Figma, Adobe Illustrator, Photoshop
- **Alternative:** Hire on Fiverr ($10-30)

### Checklist:
- [ ] Create master icon at 1024x1024
- [ ] Export 512x512 for Google Play: `icons/icon-512.png`
- [ ] Export 1024x1024 for iOS: `icons/ios-icon-1024.png`
- [ ] Create adaptive foreground layer: `icons/adaptive-foreground.png`
- [ ] Create adaptive background layer: `icons/adaptive-background.png`
- [ ] Test icon at small sizes (48x48)
- [ ] Preview on light and dark backgrounds

**Reference:** `icons/README.md` for detailed guidelines

## Step 3: Capture Screenshots (2-3 hours)

### Priority Screens to Capture:
1. **AI Analysis** - Light curve upload or detection results
2. **Exoplanet Browser** - Database view with filters
3. **3D Visualization** - Interactive planetary system
4. **Planet Details** - Information card with charts
5. **Dashboard** - User statistics and achievements
6. **Learning Center** - Educational resources/tutorials

### Required Quantities:
- **Android:** Minimum 2, recommend 6-8 (1080 x 1920 pixels)
- **iOS:** Minimum 3 each for multiple device sizes
  - iPhone 6.9": 1320 x 2868 pixels
  - iPhone 6.7": 1290 x 2796 pixels
  - iPhone 6.5": 1242 x 2688 pixels

### Capture Methods:
- **Android:** Run on emulator (Pixel 5 or similar), use screenshot tool
- **iOS:** Run on simulator (iPhone models listed above), Command+S
- **Web:** Use browser DevTools device mode, set exact dimensions

### Enhancement (Optional):
- Add text overlays describing features
- Use consistent styling across all screenshots
- Ensure no test data or personal information visible

### Checklist:
- [ ] Run app on device/emulator
- [ ] Navigate to feature-rich screens (not empty states)
- [ ] Capture screenshots at required dimensions
- [ ] Save Android screenshots: `screenshots/phone/android/`
- [ ] Save iOS screenshots: `screenshots/phone/ios/[device-size]/`
- [ ] Optionally edit with text overlays
- [ ] Verify all files are correct dimensions
- [ ] Organize in proper directory structure

**Reference:** `screenshots/README.md` for detailed guidelines

## Step 4: Design Feature Graphic (1-2 hours)

### Specifications:
- **Dimensions:** 1024 x 500 pixels (exact)
- **Format:** PNG or JPG (<1MB)
- **Content:** App name, compelling headline, space imagery

### Design Ideas:
- **Option 1:** Centered exoplanet with "Discover Exoplanets with AI" headline
- **Option 2:** Left side branding, right side app features/visuals
- **Option 3:** Horizontal showcase of multiple planets/features

### Elements to Include:
- ExoHunter AI logo/name
- Space background (stars, nebulae, planets)
- Main value proposition text
- Professional, modern design

### Tools to Use:
- **Easiest:** Canva (search "Google Play Feature Graphic")
- **Professional:** Figma, Photoshop
- **Assets:** NASA images (free), Unsplash (free space photos)

### Checklist:
- [ ] Create design at 1024 x 500 pixels
- [ ] Include app branding (name/logo)
- [ ] Add compelling headline (factual, no superlatives)
- [ ] Use space/astronomy themed imagery
- [ ] Test text readability at thumbnail size
- [ ] Export as PNG or JPG
- [ ] Verify file size <1MB
- [ ] Save to: `feature-graphics/feature-graphic.png`

**Reference:** `feature-graphics/README.md` for detailed guidelines

## Step 5: Google Play Store Submission (1-2 hours)

### Pre-Submission:
- [ ] Create Google Play Console account ($25 one-time fee)
- [ ] Build signed release APK/AAB
- [ ] Test APK installation on real device

### Create App Listing:
1. **App details:**
   - Name: ExoHunter AI - Exoplanet Discovery
   - Category: Education
   - Email: aoneahsan@gmail.com

2. **Store listing:**
   - Short description: From `metadata.md` (80 chars)
   - Full description: From `metadata.md` (4000 chars)
   - Upload app icon (512x512)
   - Upload feature graphic (1024x500)
   - Upload screenshots (minimum 2)

3. **Data safety:**
   - Use answers from `data-safety.md`
   - Declare email collection and analytics
   - Confirm encryption in transit
   - Confirm data deletion available

4. **Content rating:**
   - Complete IARC questionnaire
   - Expected rating: Everyone

5. **Pricing & distribution:**
   - Free app
   - Available in all countries

6. **Release:**
   - Upload signed APK/AAB
   - Add release notes from `metadata.md`
   - Submit for review

### Checklist:
- [ ] All metadata entered
- [ ] All assets uploaded
- [ ] Data safety completed
- [ ] Content rating obtained
- [ ] Release APK/AAB uploaded
- [ ] Pre-launch report reviewed
- [ ] Submitted for review
- [ ] Monitor submission status

**Reference:** `store-listing-checklist.md` for complete checklist

## Step 6: Apple App Store Submission (1-2 hours)

### Pre-Submission:
- [ ] Enroll in Apple Developer Program ($99/year)
- [ ] Build release version in Xcode
- [ ] Upload build to App Store Connect

### Create App Listing:
1. **App information:**
   - Name: ExoHunter AI - Exoplanet Discovery
   - Subtitle: AI-Powered Space Discovery (30 chars)
   - Category: Education, Science

2. **Pricing:**
   - Free
   - Available in all countries

3. **Version information:**
   - Description: From `metadata.md`
   - Keywords: From `metadata.md` (100 chars)
   - Support URL: https://exohunter-ai.web.app/about
   - Upload screenshots for required device sizes
   - Upload app icon (1024x1024)

4. **App privacy:**
   - Privacy policy URL: https://exohunter-ai.web.app/privacy
   - Complete privacy questionnaire
   - Declare data collection practices

5. **Build:**
   - Select uploaded build
   - Complete app review information
   - Submit for review

### Checklist:
- [ ] All metadata entered
- [ ] All screenshots uploaded (3+ per device size)
- [ ] App icon uploaded (1024x1024)
- [ ] Privacy information completed
- [ ] Build selected
- [ ] App review info provided
- [ ] Submitted for review
- [ ] Monitor submission status

**Reference:** `store-listing-checklist.md` for complete checklist

## Timeline Estimate

| Task | Time Estimate | Priority |
|------|---------------|----------|
| Review metadata | 5-10 minutes | High |
| Create icons | 1-2 hours | High |
| Capture screenshots | 2-3 hours | High |
| Design feature graphic | 1-2 hours | High |
| Google Play submission | 1-2 hours | High |
| Apple App Store submission | 1-2 hours | High |
| **Total** | **6-11 hours** | - |

**Review times:**
- Google Play: 2-7 days
- Apple App Store: 1-3 days

## Common Issues and Solutions

### Issue: Icon looks pixelated
**Solution:** Create at highest resolution (1024x1024) and downscale

### Issue: Screenshots wrong dimensions
**Solution:** Use exact dimensions listed, capture from emulator/simulator at correct resolution

### Issue: Feature graphic file too large
**Solution:** Compress with TinyPNG or export as JPG at high quality

### Issue: Privacy policy not accessible
**Solution:** Verify URL works in incognito/private browsing mode

### Issue: App rejected for misleading content
**Solution:** Remove superlatives, ensure all described features exist in app

### Issue: Data safety mismatch
**Solution:** Review `data-safety.md` and ensure it matches actual app behavior

## Resources at a Glance

### Documents in This Folder:
- **README.md** - Overview and introduction
- **metadata.md** - Complete store metadata and descriptions
- **data-safety.md** - Google Play data safety answers
- **store-listing-checklist.md** - Detailed submission checklist
- **icons/README.md** - Icon requirements and design guide
- **screenshots/README.md** - Screenshot requirements and guide
- **feature-graphics/README.md** - Feature graphic requirements

### External Resources:
- **Design:** Canva, Figma, Adobe Creative Cloud
- **Icons:** Flaticon, Noun Project, FontAwesome
- **Images:** Unsplash, NASA Image Library, Pexels
- **Tools:** TinyPNG, App Screenshot Generator, Fastlane

### Support:
- **Developer:** Ahsan Mahmood (aoneahsan@gmail.com)
- **Google Play Help:** https://support.google.com/googleplay/android-developer/
- **App Store Help:** https://help.apple.com/app-store-connect/

## Success Checklist

Before submitting to stores, verify:
- [ ] All URLs work (privacy, terms, data deletion)
- [ ] App builds without errors or warnings
- [ ] All features tested and working
- [ ] No crashes or critical bugs
- [ ] Icons created in all required sizes
- [ ] Screenshots captured for all device sizes
- [ ] Feature graphic created (Google Play)
- [ ] Metadata reviewed and accurate
- [ ] Data safety information complete
- [ ] Content rating appropriate
- [ ] Release builds signed and tested
- [ ] No superlatives or false claims in descriptions
- [ ] Privacy policy matches actual data collection

## Next Steps After Submission

1. **Monitor status** - Check Play Console/App Store Connect daily
2. **Respond quickly** - Reply to any reviewer questions within 24 hours
3. **Fix issues** - Address any rejection reasons immediately
4. **Prepare launch** - Plan announcement, social media posts
5. **Monitor reviews** - Respond to user feedback within 48 hours
6. **Track metrics** - Monitor downloads, ratings, crash reports
7. **Plan updates** - Gather feedback for first update

## Notes

- Keep copies of all assets (icons, screenshots, graphics) for future updates
- Document any changes to privacy policy or data collection practices
- Update store listings when adding new features
- Respond professionally to negative reviews
- Consider A/B testing different screenshots after launch
- Update metadata with keywords that perform well

## Need Help?

**Technical issues with assets:**
- Read the detailed README in each subfolder (icons/, screenshots/, feature-graphics/)
- Check examples from similar apps on store
- Consider hiring a designer for professional assets

**Store submission issues:**
- Review `store-listing-checklist.md` for step-by-step guide
- Consult official store documentation (links in Resources)
- Contact store support if stuck

**App-specific questions:**
- Email: aoneahsan@gmail.com
- Phone: +923046619706

---

**Status:** Ready to create assets and submit
**Last Updated:** December 2024
**Version:** 1.0.0

**Good luck with your app store launch!**
