# ExoHunter AI - Project Configuration

## 📏 GLOBAL RULES SYNC STATUS
| Metric | Value | Last Confirmed |
|--------|-------|----------------|
| Global Rule Sections Expected | 32 | 2025-12-13 |
| Global Chars Expected | ~14k | 2025-12-13 |
| Claude Code Limit | 40.0k | 2025-12-13 |
| This File Last Updated | 2025-12-13 | - |

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

**Run dev server:** `yarn dev` → http://localhost:5994

---

## Project Overview
ExoHunter AI - Exoplanet discovery and analysis platform using AI/ML

## Tech Stack
- React 19 + TypeScript
- Vite 7
- Capacitor 8 (iOS/Android)
- Firebase (Auth, Firestore, Storage)
- TanStack React Query
- Zustand (State Management)
- Radix UI + Tailwind CSS
- Three.js + React Three Fiber (3D visualizations)
- Recharts (Data visualization)

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── hooks/          # Custom React hooks
├── services/       # API and Firebase services
├── store/          # Zustand state stores
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── config/         # App configuration
├── lib/            # Third-party library configs
└── assets/         # Static assets
```

## Path Aliases
- `@/` → src/
- `@components/` → src/components/
- `@pages/` → src/pages/
- `@hooks/` → src/hooks/
- `@services/` → src/services/
- `@store/` → src/store/
- `@utils/` → src/utils/
- `@types/` → src/types/
- `@config/` → src/config/
- `@lib/` → src/lib/
- `@assets/` → src/assets/

## Available Scripts
- `yarn dev` - Start dev server (port 5994)
- `yarn build` - Production build
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build
- `yarn type-check` - TypeScript type checking
- `yarn format` - Format code with Prettier

---

## 🎯 Project-Specific Rules

### 🎨 UI/UX Requirements
- **Card-Based UI**: Use Radix UI card components with icon + title + description for checkboxes/radios/selects (<8 options). For 8+ options, use text with icon on left.
- **NO Native HTML**: Only use Radix UI components. Never use native `<div>`, `<button>`, `<input>` with custom CSS.
- **Radix UI Theme**: Provide theme/color/font settings to users. Store in localStorage (guests) and sync to account (logged-in).
  - Status: Pending implementation
- **Scroll-to-Top**: Auto-scroll to top on route change (except hash fragments #section).
- **Error Pages**: Beautiful 404, 500, 403, 401 pages matching app UI.
- **Sitemap Page**: Create `/sitemap` with card-based UI (icon, title, description, tags), fuzzy search, categorized.

### 📊 Analytics & Tracking
- **Triple Analytics**: Track EVERY user action in Firebase Analytics, Microsoft Clarity, and Amplitude using centralized service.

### 📁 Documentation & Maintenance
- **Documentation**: ALL docs in `/docs` folder with nested subfolders. Only README.md, LICENSE, CONTRIBUTING.md at root.
- **Project Knowledge**: Maintain detailed docs in `/docs/project-knowledge/`, update every 2 weeks.
- **NO Useless Docs**: Never create summary/status/record/completion files unless explicitly requested.
- **Info Pages**: Keep privacy, terms, contact, about, data-deletion, account-deletion pages updated with current features.
- **README Updates**: Refresh every 2 weeks.
  - Last Updated: 2025-12-13
- **Docs Updates**: Comprehensive feature documentation.
  - Last Updated: 2025-12-13

### 🔒 Repository Configuration
- **Git Type**: PRIVATE repository
- **.gitignore**: Include `android/`, `ios/` source but exclude `android/build/`, `ios/build/`, `*.apk`, `*.ipa`. Always use `*.ignore.*` pattern.
- **NO Scripts**: Never create `.sh` files or scripts folder unless explicitly requested.

### 🔥 Firebase Management
- **Index Deployment**: Deploy indexes separately: `firebase deploy --only firestore:indexes`. Never delete indexes during deploy.
- **Collection Prefix**: Use `exohunter_` prefix for all collections.

### ⚙️ Configuration & Environment
- **ENV Variables**: Update `.env.example` when adding new vars. Show error on app load if required env is missing.
- **App Version**: Display version text and code in footer using `@capacitor/app`.

### 📱 Capacitor & Mobile
- **Capacitor Plugins**: When adding android/ios folders, confirm all official and Capawesome plugins are properly implemented. Configure for both platforms in src, document iOS work for later.
- **Platform Support**: iOS, Android, Web (PWA)

---

## 📋 Development Tracking
| Task | Status | Notes |
|------|--------|-------|
| Radix UI Theme Settings | Pending | To be implemented |
| Sitemap Page | Pending | To be implemented |
| Error Pages (404/500/403/401) | Pending | To be verified |
| Analytics Integration | Pending | Firebase/Clarity/Amplitude |
| Info Pages Update | Pending | Privacy/Terms/About/Contact |
| App Version in Footer | Pending | Using @capacitor/app |
