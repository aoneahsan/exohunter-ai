# ExoHunter AI - Project Configuration

## 📏 GLOBAL RULES SYNC STATUS
| Metric | Value | Last Confirmed |
|--------|-------|----------------|
| Global Rule Sections Expected | 33 | 2025-12-15 |
| Global Chars Expected | ~16k | 2025-12-15 |
| Claude Code Limit | 40.0k | 2025-12-15 |
| This File Last Updated | 2025-12-15 | - |

⚠️ Weekly: Confirm global rules count matches expected (±2 tolerance)
⚠️ If mismatch: Sync ~/.claude/CLAUDE.md from canonical source

---

## 🔌 Dev Server Port Configuration
| Setting | Value |
|---------|-------|
| **Port** | 5994 |
| **Framework** | React + Vite + Capacitor + Firebase |
| **Config File** | vite.config.ts |
| **Global Registry** | ~/.dev-ports.json |

**Run dev server:** `pnpm dev` → http://localhost:5994

---

## Project Overview
ExoHunter AI - Exoplanet discovery and analysis platform using AI/ML

## Tech Stack
- React 19 + TypeScript + Vite 7
- Capacitor 8 (iOS/Android/PWA)
- Firebase (Auth, Firestore, Analytics) + FilesHub (file storage)
- TanStack React Query + Zustand
- Radix UI + Tailwind CSS
- Three.js + React Three Fiber
- Recharts + Framer Motion

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages (23 pages)
├── hooks/          # Custom React hooks
├── services/       # API and Firebase services
├── store/          # Zustand state stores
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── config/         # App configuration
├── lib/            # Third-party library configs
└── assets/         # Static assets
docs/               # All documentation (organized by topic)
app-publish-assets/ # Store publishing assets
```

## Path Aliases
`@/` → src/, `@components/` → src/components/, `@pages/` → src/pages/, etc.

## Available Scripts
- `pnpm dev` - Start dev server (port 5994)
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build
- `pnpm type-check` - TypeScript type checking
- `pnpm format` - Format code with Prettier

---

## 🎯 Project-Specific Rules

### 🎨 UI/UX Requirements
- **Card-Based UI**: Use Radix UI card components with icon + title + description for checkboxes/radios/selects (<8 options). For 8+ options, use text with icon on left.
- **NO Native HTML**: Only use Radix UI components. Never use native `<div>`, `<button>`, `<input>` with custom CSS.
  - ⚠️ **Audit Status (2025-12-15)**: Project has extensive native HTML usage (layout divs, spans, lists). Gradual migration recommended for new code.
- **Radix UI Theme**: ✅ Implemented - Theme settings in Settings page with dark/light/system modes, 8 accent colors, 3 font sizes. Cloud sync for authenticated users, localStorage for guests.
- **Scroll-to-Top**: ✅ Implemented - Auto-scroll to top on route change (except hash fragments).
- **Error Pages**: ✅ Implemented - Beautiful 404, 500, 403, 401 pages with space theme.
- **Sitemap Page**: ✅ Implemented - Card-based UI with fuzzy search, categories, keywords/tags at `/sitemap`.
- **Full Page Loader**: ✅ Implemented - Animated loader with tips, quotes, and progress bar.

### 📊 Analytics & Tracking
- **Triple Analytics**: ✅ Implemented - Track EVERY user action in Firebase Analytics, Microsoft Clarity, and Amplitude.
- **Analytics Service**: `src/services/analytics.ts` with 406 lines of production-ready code.
- **useAnalytics Hook**: `src/hooks/useAnalytics.ts` with 358 lines including specialized hooks.
- **50+ Predefined Events**: `src/types/analytics.ts` with comprehensive event taxonomy.

### 📁 Documentation & Maintenance
- **Documentation**: ALL docs in `/docs` folder with nested subfolders. Only README.md, LICENSE, CONTRIBUTING.md at root.
- **Project Knowledge**: Maintain detailed docs in `/docs/project-knowledge/`, update every 2 weeks.
- **NO Useless Docs**: Never create summary/status/record/completion files unless explicitly requested.
- **Info Pages**: ✅ Complete - Privacy, Terms, Contact, About, Data-Deletion, Account-Deletion, Cookie-Policy.
- **README Updates**: Refresh every 2 weeks.
  - Last Updated: 2025-12-13
- **Docs Updates**: Comprehensive feature documentation.
  - Last Updated: 2025-12-13

### 🔒 Repository Configuration
- **Git Type**: PRIVATE repository
- **.gitignore**: ✅ Configured - Include `android/`, `ios/` source but exclude build artifacts. Uses `*.ignore.*` pattern.
- **NO Scripts**: Never create `.sh` files or scripts folder unless explicitly requested.

### 🔥 Firebase Management
- **Index Deployment**: Deploy indexes separately: `firebase deploy --only firestore:indexes`. Never delete indexes during deploy.
- **Collection Prefix**: Use `exohunter_` prefix for all collections.

### ⚙️ Configuration & Environment
- **ENV Variables**: ✅ Configured - Update `.env.example` when adding new vars. Show error on app load if required env is missing.
- **App Version**: ✅ Implemented - Display version text and code in footer using `@capacitor/app` (native platforms).

### 📱 Capacitor & Mobile
- **Capacitor Plugins**: 19 plugins installed with comprehensive service layer in `src/services/capacitor.ts` (876 lines) and hooks in `src/hooks/useCapacitor.ts` (554 lines).
- **Platform Support**: iOS, Android, Web (PWA)
- **Storage**: Use `@capacitor/preferences` (NEVER localStorage/sessionStorage) for native platforms.
- **Native Folders**: When adding android/ios folders, confirm all Capacitor plugins are properly configured.

### 🚨 Error Handling
- **Error Service**: `src/services/error-handler.ts` integrates Sentry (optional), Firebase Analytics, Clarity, Amplitude.
- **Error Boundary**: `src/components/ErrorBoundary.tsx` catches React errors with space-themed UI.
- **useErrorHandler Hook**: `src/hooks/useErrorHandler.ts` for component-level error handling.
- **Graceful Degradation**: Only track errors for platforms with API keys configured - no errors for missing keys.

### 📂 FilesHub Integration
- **File Storage**: Use FilesHub API exclusively - NEVER Firebase Storage.
- **Service**: `src/services/files-hub.ts` with upload, download, delete, list functions.
- **Hook**: `src/hooks/useFilesHub.ts` with loading states and progress tracking.
- **Rules**: Track files in Firestore, delete old before replacing, delete all on account deletion.

### ↩️ Go-Back Buttons
- **Rule**: Every page (except / and /dashboard) must have a go-back button in header.
- **Absolute Routes**: Use absolute paths (e.g., /dashboard) not navigate(-1) to avoid history issues.
- **Consistency**: Use ArrowLeft icon from lucide-react with consistent positioning.

---

## ✅ Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Radix UI Theme Settings | ✅ Complete | Dark/light/system, 8 colors, 3 font sizes |
| Sitemap Page | ✅ Complete | Fuzzy search, categories, keywords |
| Error Pages (404/500/403/401) | ✅ Complete | Beautiful space-themed design |
| Analytics Integration | ✅ Complete | Firebase/Clarity/Amplitude |
| Error Handling Service | ✅ Complete | Sentry/Firebase/Clarity/Amplitude |
| Info Pages | ✅ Complete | Privacy/Terms/Contact/About/Deletion |
| App Version in Footer | ✅ Complete | Native platforms via Capacitor |
| Scroll-to-Top | ✅ Complete | Instant scroll, skip hash fragments |
| Full Page Loader | ✅ Complete | Tips, quotes, progress bar |
| .gitignore | ✅ Complete | Private repo configuration |
| .env.example | ✅ Complete | Documented with descriptions |
| Capacitor Service Layer | ✅ Complete | 19 plugins with hooks |
| App-Publish-Assets | ✅ Complete | Metadata, icons, screenshots |
| FilesHub Integration | ✅ Complete | Service + hook for file uploads |
| Go-Back Buttons | ✅ Complete | All pages have absolute back routes |
| Error Boundary | ✅ Complete | Space-themed error UI |

---

## 📝 Maintenance Schedule

| Task | Frequency | Last Done | Next Due |
|------|-----------|-----------|----------|
| README.md Update | Every 2 weeks | 2025-12-15 | 2025-12-29 |
| Project Knowledge Docs | Every 2 weeks | 2025-12-15 | 2025-12-29 |
| Portfolio Content File Update | Weekly (Sundays) | 2025-12-23 | 2025-12-30 |
| Global CLAUDE.md Sync | Weekly | 2025-12-15 | 2025-12-22 |
| Analytics Tracking Verify | Monthly | 2025-12-15 | 2026-01-15 |
| Big Request Run | Min 1 day gap | 2025-12-15 | 2025-12-16 |

### 📄 Portfolio Content File Maintenance
- **File:** `exohunter-ai-portfolio-content-UPDATED-YYYY-MM-DD.md`
- **Purpose:** Comprehensive project documentation for portfolio, resume, CV, social media posts
- **Update Triggers:**
  - Weekly on Sundays (mandatory)
  - When new features are added
  - When major milestones are reached
  - When metrics change significantly
  - When new achievements are earned
  - When competition results are announced

**Weekly Update Checklist:**
- [ ] Update version number
- [ ] Update "Last Updated" date in file
- [ ] Add entry to Update History table (max 10 records)
- [ ] Update metrics (users, detections, downloads, etc.)
- [ ] Add new features to feature list if any
- [ ] Update tech stack if dependencies changed
- [ ] Review and update hashtags if trending topics changed
- [ ] Update live URL if domain changed
- [ ] Update contact info if changed
- [ ] Rename file with new date: `exohunter-ai-portfolio-content-UPDATED-YYYY-MM-DD.md`
- [ ] Delete old version after renaming

---

## 🔄 Big Request Tracking
**Last full project audit:** 2025-12-15
- Useless docs removed
- Error handling implemented
- FilesHub integrated
- Go-back buttons added
- CLAUDE.md updated

**Minimum wait before re-running:** 1 day (for most updates), 1 week (for full re-run)
