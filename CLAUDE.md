# ExoHunter AI - Project Configuration

## 📏 GLOBAL RULES SYNC STATUS
| Metric | Value | Last Confirmed |
|--------|-------|----------------|
| Global Rule Sections Expected | 32 | 2025-12-11 |
| Global Chars Expected | ~14k | 2025-12-11 |
| Claude Code Limit | 40.0k | 2025-12-11 |
| This File Last Updated | 2025-12-11 | - |

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
