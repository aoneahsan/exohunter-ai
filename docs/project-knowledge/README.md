# ExoHunter AI - Comprehensive Project Knowledge

**Last Updated:** 2025-12-13
**Version:** 1.0.0
**Status:** Production - Deployed

This document provides complete project knowledge for AI agents, developers, and team members working on ExoHunter AI.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Application Structure](#application-structure)
4. [Pages & Routes](#pages--routes)
5. [Features](#features)
6. [User Types & Permissions](#user-types--permissions)
7. [API Endpoints & Services](#api-endpoints--services)
8. [Data Models](#data-models)
9. [State Management](#state-management)
10. [Module Descriptions](#module-descriptions)
11. [Development Guidelines](#development-guidelines)
12. [Deployment Information](#deployment-information)

---

## 📋 Project Overview

**ExoHunter AI** is an advanced web application that uses artificial intelligence to automatically detect exoplanets from telescope data. Built for the NASA Space Apps Challenge 2025, this system democratizes space exploration by making exoplanet detection accessible to citizen scientists worldwide.

### Key Information
- **Live URL:** https://exohunter-ai.web.app/
- **Challenge:** A World Away: Hunting for Exoplanets with AI
- **Team:** Zaions Team
- **Lead Developer:** Ahsan Mahmood (aoneahsan@gmail.com)
- **Event:** NASA Space Apps Challenge 2025 - Lahore, Pakistan
- **App ID (Mobile):** com.aoneahsan.exohunterai
- **Dev Server Port:** 5994

### Project Mission
Democratize exoplanet discovery by providing an accessible, AI-powered platform that enables citizen scientists to contribute to astronomical research through interactive data analysis and visualization.

---

## 🔧 Tech Stack

### Frontend Framework
- **React 19.2.1** - UI library with latest features
- **TypeScript 5.9.3** - Type safety and better developer experience
- **Vite 7.2.7** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - @radix-ui/react-alert-dialog 1.1.15
  - @radix-ui/react-avatar 1.1.11
  - @radix-ui/react-dialog 1.1.15
  - @radix-ui/react-dropdown-menu 2.1.16
  - @radix-ui/react-label 2.1.8
  - @radix-ui/react-select 2.2.6
  - @radix-ui/react-tabs 1.1.13
  - @radix-ui/react-toast 1.2.15
- **class-variance-authority 0.7.1** - Component variants
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 3.4.0** - Merge Tailwind classes
- **Lucide React 0.560.0** - Icon library
- **Framer Motion 12.23.26** - Animation library

### State Management & Data Fetching
- **Zustand 5.0.9** - Lightweight state management
- **TanStack React Query 5.90.12** - Server state management
- **React Hook Form 7.68.0** - Form state management
- **@hookform/resolvers 5.2.2** - Form validation
- **Zod 4.1.13** - Schema validation

### Backend & Services
- **Firebase 12.6.0** - Complete backend solution
  - Firebase Auth - User authentication
  - Cloud Firestore - NoSQL database
  - Firebase Storage - File storage
  - Firebase Hosting - Web hosting
  - Firebase Analytics - Usage tracking
- **OneSignal** (react-onesignal 3.4.0) - Push notifications

### Data Visualization
- **Recharts 3.5.1** - Chart library
- **Three.js 0.182.0** - 3D graphics
- **@react-three/fiber 9.4.2** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Three.js helpers

### Utilities & Tools
- **Axios 1.13.2** - HTTP client
- **date-fns 4.1.0** - Date manipulation
- **papaparse 5.5.3** - CSV parsing
- **react-hot-toast 2.6.0** - Toast notifications
- **react-intersection-observer 10.0.0** - Viewport detection
- **react-use 17.6.0** - React hooks collection
- **react-router-dom 7.10.1** - Routing

### Analytics
- **@amplitude/analytics-browser 2.32.1** - Product analytics
- **clarity-js 0.8.44** - User behavior analytics
- **Firebase Analytics** - Google Analytics 4

### Mobile Framework
- **Capacitor 8.0.0** - Cross-platform mobile framework
  - @capacitor/core 8.0.0
  - @capacitor/android 8.0.0
  - @capacitor/ios 8.0.0
  - @capacitor/preferences 8.0.0

### Development Tools
- **ESLint 9.39.1** - Code linting
- **Prettier 3.7.4** - Code formatting
- **TypeScript ESLint 8.49.0** - TypeScript linting
- **@dotenvx/dotenvx 1.51.1** - Environment variable management

---

## 🏗 Application Structure

```
/home/ahsan/Documents/01-code/02-apps/exohunter-ai/
├── docs/                           # Documentation (NEW - organized)
│   ├── setup/                      # Setup and installation guides
│   ├── api/                        # API documentation
│   ├── features/                   # Feature documentation
│   ├── deployment/                 # Deployment guides
│   ├── architecture/               # Architecture documentation
│   ├── project-knowledge/          # Comprehensive project info (THIS FILE)
│   ├── capacitor-plugins/          # Capacitor plugin documentation
│   ├── SECURITY.md                 # Security policies
│   └── PROJECT_STATUS.md           # Current project status
│
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # Base UI components (shadcn/ui)
│   │   ├── layout/                 # Layout components (Header, Footer)
│   │   ├── features/               # Feature-specific components
│   │   └── form-fields/            # Custom form field components
│   │
│   ├── pages/                      # Page components (routes)
│   │   ├── Landing.tsx             # Home page
│   │   ├── Explorer.tsx            # Public exoplanet explorer
│   │   ├── Dashboard.tsx           # User dashboard (protected)
│   │   ├── Discoveries.tsx         # Public discoveries feed
│   │   ├── Learn.tsx               # Educational content
│   │   ├── Profile.tsx             # User profile (protected)
│   │   ├── Settings.tsx            # User settings (protected)
│   │   ├── About.tsx               # About the project
│   │   ├── Analyzer.tsx            # AI analyzer (protected)
│   │   ├── Login.tsx               # Login page
│   │   ├── Signup.tsx              # Registration page
│   │   ├── Presentation.tsx        # Project presentation
│   │   └── Sitemap.tsx             # Site navigation map
│   │
│   ├── hooks/                      # Custom React hooks
│   │
│   ├── services/                   # External services
│   │   └── oneSignal.ts            # OneSignal push notifications
│   │
│   ├── store/                      # Zustand state stores
│   │
│   ├── utils/                      # Utility functions
│   │
│   ├── types/                      # TypeScript type definitions
│   │
│   ├── config/                     # App configuration
│   │
│   ├── lib/                        # Third-party library configs
│   │
│   ├── contexts/                   # React contexts
│   │   └── AuthContext.tsx         # Authentication context
│   │
│   ├── styles/                     # Global styles
│   │
│   ├── assets/                     # Static assets
│   │   ├── fonts/                  # Custom fonts
│   │   └── images/                 # Images
│   │
│   ├── App.tsx                     # Main app component with routing
│   └── main.tsx                    # Application entry point
│
├── public/                         # Public static files
│
├── .env                            # Environment variables (gitignored)
├── .env.example                    # Environment variables template
├── capacitor.config.ts             # Capacitor configuration
├── components.json                 # shadcn/ui configuration
├── eslint.config.js                # ESLint configuration
├── firebase.json                   # Firebase configuration
├── firestore.indexes.json          # Firestore indexes
├── firestore.rules                 # Firestore security rules
├── storage.rules                   # Firebase Storage rules
├── index.html                      # HTML entry point
├── package.json                    # NPM dependencies
├── postcss.config.js               # PostCSS configuration
├── prettier.config.js              # Prettier configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── README.md                       # Project README
├── LICENSE                         # Proprietary license
├── NOTICE                          # Attribution notices
├── DISCLAIMER                      # Legal disclaimers
└── CLAUDE.md                       # Claude Code project instructions
```

### Path Aliases (tsconfig.json)
```typescript
{
  "@/": "src/",
  "@components/": "src/components/",
  "@pages/": "src/pages/",
  "@hooks/": "src/hooks/",
  "@services/": "src/services/",
  "@store/": "src/store/",
  "@utils/": "src/utils/",
  "@types/": "src/types/",
  "@config/": "src/config/",
  "@lib/": "src/lib/",
  "@assets/": "src/assets/"
}
```

---

## 🗺 Pages & Routes

### Public Routes (No Authentication Required)

| Route | Component | Description | Key Features |
|-------|-----------|-------------|--------------|
| `/` | Landing.tsx | Home/landing page | Hero section, feature showcase, stats counter, recent discoveries carousel, CTA |
| `/explorer` | Explorer.tsx | Public demo of detection system | Sample datasets, limited to 10 analyses per session, AI detection simulation |
| `/discoveries` | Discoveries.tsx | Global feed of confirmed detections | Filter by date/confidence/star type, detailed views, share functionality |
| `/learn` | Learn.tsx | Educational content hub | Interactive tutorials, video library, glossary, FAQ, infographics |
| `/about` | About.tsx | Project information | Team info, NASA context, tech stack, contact details |
| `/login` | Login.tsx | User login | Email/password, Google OAuth, forgot password |
| `/signup` | Signup.tsx | User registration | Email/password, Google OAuth, email verification |
| `/presentation` | Presentation.tsx | Project presentation | Slide deck for NASA Space Apps Challenge |
| `/sitemap` | Sitemap.tsx | Searchable site navigation | All pages listed with search, categorized |

### Protected Routes (Authentication Required)

| Route | Component | Description | Key Features |
|-------|-----------|-------------|--------------|
| `/dashboard` | Dashboard.tsx | User dashboard | Personal stats, activity feed, quick actions, notifications, progress tracking |
| `/analyzer` | Analyzer.tsx | Full AI detection interface | File upload (CSV/FITS), NASA API integration, real-time processing, save/export |
| `/profile` | Profile.tsx | User profile management | Avatar upload, bio editor, achievement badges, detection history |
| `/settings` | Settings.tsx | User settings | Account management, privacy settings, notification preferences, API keys |

### Route Protection
- Protected routes use `<ProtectedRoute>` wrapper component
- Unauthenticated users redirected to `/login`
- Auth state managed by `AuthContext`
- Persistent auth state across sessions

---

## ✨ Features

### 1. AI-Powered Detection Engine
- **Real-time Analysis:** Process light curve data in real-time
- **Pattern Recognition:** Simulated CNN+LSTM architecture
- **Confidence Scoring:** 0-100% confidence for each detection
- **Batch Processing:** Analyze multiple stars simultaneously
- **Visual Representation:** Highlight transit events on graphs
- **Detection Methods:** Transit method & radial velocity simulation

### 2. Interactive Data Visualization
- **Light Curve Plotting:** Real-time flux vs. time graphs using Recharts
- **Transit Event Highlighting:** Mark detected transit events
- **3D Orbital Visualization:** WebGL-powered orbital animations with Three.js
- **Flux Variation Graphs:** Detailed brightness variation analysis
- **Period Analysis Charts:** Orbital period visualization
- **Comparative Analysis Tools:** Compare multiple detections side-by-side

### 3. User Dashboard
- **Personal Statistics:** Detections count, accuracy score, rank, contribution points
- **Detection History:** Complete record of all user analyses
- **Saved Searches:** Bookmark interesting datasets
- **Achievement System:** Unlock badges for milestones
- **Export Functionality:** Download data as CSV/JSON
- **Activity Feed:** Timeline of recent actions
- **Notifications:** Real-time alerts for discoveries and achievements

### 4. Educational Resources
- **Interactive Tutorials:** Step-by-step guides on exoplanet detection
- **Glossary:** Searchable astronomical terms database
- **Video Library:** Educational videos about exoplanets
- **Method Comparisons:** Learn different detection methods
- **Quiz System:** Test knowledge with interactive quizzes
- **Certification:** Earn certificates for completing courses

### 5. Community Features
- **Public Discovery Feed:** Global feed of all confirmed detections
- **User Rankings:** Leaderboard system
- **Social Sharing:** Share discoveries on social media
- **Voting System:** Community validation of discoveries
- **User Profiles:** Public profiles showing contributions
- **Discussion Forums:** Community interaction (planned)

### 6. Authentication & User Management
- **Email/Password Authentication:** Traditional sign-up/login
- **Google OAuth:** Quick sign-in with Google
- **Email Verification:** Verify email addresses
- **Password Reset:** Forgot password functionality
- **Profile Management:** Update name, avatar, bio
- **Account Deletion:** GDPR-compliant data deletion

### 7. Progressive Web App (PWA)
- **Offline Support:** Service worker for offline functionality
- **Install Prompt:** Add to home screen on mobile
- **Push Notifications:** Web push via OneSignal
- **App Manifest:** Native app-like experience
- **Responsive Design:** Works on all screen sizes

### 8. Analytics & Tracking
- **Firebase Analytics:** User engagement tracking
- **Amplitude:** Product analytics and user behavior
- **Microsoft Clarity:** Session recordings and heatmaps
- **Custom Events:** Track specific user actions
  - `detection_started`
  - `detection_completed`
  - `result_shared`
  - `tutorial_completed`
  - `achievement_unlocked`

---

## 👥 User Types & Permissions

### 1. Anonymous Users (Not Logged In)
**Access:**
- View landing page
- Explore public discoveries feed
- Access educational content (Learn page)
- Use Explorer with limitations (10 free analyses)
- View About page
- Read documentation

**Restrictions:**
- Cannot save detections
- Cannot access full Analyzer
- Cannot earn achievements
- Cannot access Dashboard/Profile/Settings
- No unlimited analyses

### 2. Registered Users (Authenticated)
**Access:**
- All anonymous user features
- Full AI Analyzer with unlimited analyses
- Personal Dashboard
- Profile management
- Save detections to history
- Earn achievements and badges
- Export detection data
- Custom settings and preferences
- Push notifications

**Restrictions:**
- Standard rate limits on API calls
- Cannot access admin features (if any)

### 3. Future User Types (Planned)
- **Expert Validators:** Can verify community discoveries
- **Team Members:** Collaborative analysis features
- **Administrators:** Platform management

### Permission Checks
Permissions are checked at:
1. **Route Level:** `<ProtectedRoute>` component
2. **Component Level:** Conditional rendering based on auth state
3. **API Level:** Firebase Security Rules
4. **Database Level:** Firestore security rules

---

## 🔌 API Endpoints & Services

### Firebase Services

#### Authentication (Firebase Auth)
```typescript
// Sign up with email/password
createUserWithEmailAndPassword(auth, email, password)

// Sign in with email/password
signInWithEmailAndPassword(auth, email, password)

// Sign in with Google
signInWithPopup(auth, googleProvider)

// Sign out
signOut(auth)

// Password reset
sendPasswordResetEmail(auth, email)

// Email verification
sendEmailVerification(currentUser)
```

#### Firestore Database
```typescript
// Collections
collections = {
  users: 'users',              // User profiles
  detections: 'detections',    // Detection records
  discoveries: 'discoveries',  // Public discoveries
  achievements: 'achievements', // Achievement definitions
  tutorials: 'tutorials',      // Educational content
  leaderboard: 'leaderboard'   // Cached rankings
}

// Common operations
const userDoc = doc(db, 'users', userId)
const detectionsQuery = query(
  collection(db, 'detections'),
  where('userId', '==', userId),
  orderBy('timestamp', 'desc')
)
```

#### Firebase Storage
```typescript
// Upload user avatar
const avatarRef = ref(storage, `avatars/${userId}`)
await uploadBytes(avatarRef, file)
const avatarURL = await getDownloadURL(avatarRef)

// Upload detection data files
const dataRef = ref(storage, `detections/${userId}/${filename}`)
```

### Third-Party Services

#### OneSignal (Push Notifications)
```typescript
// Initialize
OneSignal.init({ appId: ONESIGNAL_APP_ID })

// Subscribe to notifications
OneSignal.Slidedown.promptPush()

// Send notification (via API)
POST https://onesignal.com/api/v1/notifications
```

#### NASA APIs (Planned Integration)
```typescript
// NASA Exoplanet Archive TAP Service
GET https://exoplanetarchive.ipac.caltech.edu/TAP/sync

// Kepler/TESS Data
GET https://archive.stsci.edu/kepler/
GET https://archive.stsci.edu/tess/
```

### Internal Services

#### Analytics Service
```typescript
// Track custom events across all platforms
analytics.track(eventName: string, data?: object)
// Sends to: Firebase Analytics, Amplitude, Clarity
```

#### Detection Service (Simulated AI)
```typescript
// Analyze light curve data
analyzeData(lightCurve: number[]): Promise<DetectionResult>

// Calculate confidence score
calculateConfidence(data: number[]): number

// Detect transit events
findTransitEvents(lightCurve: number[]): TransitEvent[]
```

---

## 📊 Data Models

### User Profile
```typescript
interface UserProfile {
  uid: string;                    // Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string;              // Avatar URL from Storage
  bio?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  stats: {
    detectionsCount: number;      // Total detections made
    accuracyScore: number;        // 0-100 accuracy rating
    contributionPoints: number;   // Gamification points
    rank: string;                 // User rank/level
  };
  preferences: {
    notifications: boolean;       // Push notification preference
    newsletter: boolean;          // Email newsletter preference
    publicProfile: boolean;       // Profile visibility
    theme?: 'dark' | 'light';     // Always dark for space theme
  };
  achievements: Achievement[];    // Unlocked achievements
}
```

### Detection Record
```typescript
interface Detection {
  id: string;                     // Auto-generated Firestore ID
  userId: string;                 // Creator's UID
  timestamp: Timestamp;           // When analysis was run
  starData: {
    catalogId: string;            // Star catalog identifier
    constellation?: string;       // Constellation name
    magnitude: number;            // Apparent magnitude
    distance: number;             // Distance in light-years
    rightAscension?: string;      // RA coordinate
    declination?: string;         // Dec coordinate
  };
  analysis: {
    confidence: number;           // 0-100 confidence score
    method: 'transit' | 'radial_velocity';
    periodDays: number;           // Orbital period in days
    depth: number;                // Transit depth percentage
    duration: number;             // Transit duration in hours
    planetRadius?: number;        // Estimated radius (Earth radii)
    semiMajorAxis?: number;       // Orbital distance (AU)
  };
  lightCurveData: number[];       // Time-series flux data
  transitEvents: {
    time: number;                 // Time of transit
    depth: number;                // Depth of transit
  }[];
  status: 'pending' | 'confirmed' | 'rejected';
  votes: number;                  // Community votes
  isPublic: boolean;              // Visibility setting
  tags?: string[];                // User-defined tags
  notes?: string;                 // User notes
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  category: 'detection' | 'accuracy' | 'contribution' | 'learning';
  requirement: {
    type: string;                 // 'detections_count', 'accuracy', etc.
    value: number;                // Threshold to unlock
  };
  points: number;                 // Contribution points awarded
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Timestamp;         // When user unlocked it
}
```

### Tutorial
```typescript
interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;                // Markdown content
  duration: string;               // Estimated completion time
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];               // Related topics
  videoUrl?: string;              // YouTube/external video
  interactive: boolean;           // Has interactive component
  order: number;                  // Display order
  quiz?: {
    questions: Question[];
    passingScore: number;
  };
}
```

### Notification
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'detection' | 'achievement' | 'community' | 'system';
  title: string;
  message: string;
  data?: any;                     // Additional data payload
  read: boolean;
  createdAt: Timestamp;
  actionUrl?: string;             // Link to related content
}
```

---

## 🏪 State Management

### Zustand Stores

#### Auth Store
```typescript
interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}
```

#### Analysis Store
```typescript
interface AnalysisStore {
  currentAnalysis: Analysis | null;
  history: Detection[];
  isProcessing: boolean;
  progress: number;                     // 0-100
  error: string | null;
  startAnalysis: (data: number[]) => Promise<void>;
  cancelAnalysis: () => void;
  saveResult: (detection: Detection) => Promise<void>;
  loadHistory: () => Promise<void>;
  deleteDetection: (id: string) => Promise<void>;
}
```

#### UI Store
```typescript
interface UIStore {
  theme: 'dark';                        // Always dark
  sidebarOpen: boolean;
  notifications: Notification[];
  toasts: Toast[];
  toggleSidebar: () => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}
```

### React Context

#### AuthContext
```typescript
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  // ... other auth methods
}
```

---

## 📦 Module Descriptions

### Components

#### UI Components (`src/components/ui/`)
Base shadcn/ui components:
- **Button:** Interactive button with variants
- **Card:** Container for content sections
- **Dialog:** Modal dialogs
- **Dropdown Menu:** Contextual menus
- **Form:** Form wrapper with validation
- **Input:** Text input fields
- **Label:** Form labels
- **Select:** Dropdown selects
- **Tabs:** Tabbed interfaces
- **Toast:** Notification toasts
- **Avatar:** User avatars
- **Badge:** Status badges
- **Progress:** Progress bars
- **Skeleton:** Loading placeholders
- **Alert:** Alert messages

#### Layout Components (`src/components/layout/`)
- **Layout:** Main layout wrapper with header/footer
- **Header:** Navigation bar with auth state
- **Footer:** Site footer with links
- **Sidebar:** Dashboard sidebar navigation

#### Feature Components (`src/components/features/`)
Feature-specific reusable components:
- **LightCurveChart:** Recharts line graph for flux data
- **OrbitVisualization:** Three.js 3D orbital view
- **DetectionCard:** Display detection results
- **AchievementBadge:** Achievement display
- **StatsCard:** Statistics display card
- **TutorialCard:** Tutorial preview card

#### Form Fields (`src/components/form-fields/`)
Custom form field wrappers for consistent interface

### Pages

Each page is a route component with specific functionality:

- **Landing:** Marketing homepage with CTA
- **Explorer:** Public demo with sample data
- **Dashboard:** User stats and activity
- **Discoveries:** Community feed
- **Learn:** Educational hub
- **Profile:** User profile management
- **Settings:** User preferences
- **About:** Project information
- **Analyzer:** AI detection interface
- **Login/Signup:** Authentication
- **Presentation:** Slide deck
- **Sitemap:** Site navigation

### Services

#### oneSignal.ts
```typescript
// Initialize OneSignal for push notifications
export const initializeOneSignal: () => Promise<void>
export const subscribeUser: () => Promise<void>
export const sendNotification: (message: string) => Promise<void>
```

### Hooks

Custom React hooks for reusable logic:
- **useAuth:** Authentication state and methods
- **useDetections:** Fetch and manage detections
- **useAnalysis:** Handle analysis workflow
- **useAchievements:** Track and unlock achievements
- **useNotifications:** Manage notifications

### Utilities

Helper functions in `src/utils/`:
- **analytics:** Unified analytics tracking
- **validators:** Input validation functions
- **formatters:** Data formatting utilities
- **constants:** App-wide constants

---

## 💻 Development Guidelines

### Code Style
- **TypeScript:** Strict mode enabled
- **Components:** Functional components only
- **Hooks:** Custom hooks for reusable logic
- **Imports:** Always use absolute imports with `@/` alias
- **Max Lines:** Keep files under 500 lines
- **Naming:** PascalCase for components, camelCase for functions

### Component Pattern
```typescript
// Preferred component structure
interface ComponentProps {
  // Props with types
}

export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks at top
  const [state, setState] = useState()

  // Effects
  useEffect(() => {}, [])

  // Handlers
  const handleClick = () => {}

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### State Management Guidelines
- **Local state:** `useState` for component-specific state
- **Global state:** Zustand for app-wide state
- **Server state:** TanStack React Query for API data
- **Form state:** React Hook Form with Zod validation
- **Auth state:** AuthContext

### Error Handling
- Always use try-catch for async operations
- Display user-friendly error messages with toast
- Log errors to console in development
- Track errors with analytics in production

### Performance Best Practices
- Lazy load route components
- Memoize expensive calculations with `useMemo`
- Debounce user inputs
- Use React.memo for pure components
- Optimize images (WebP, lazy loading)
- Code splitting with dynamic imports

### Testing Strategy
- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for user flows
- E2E tests for critical paths
- Manual testing on all breakpoints

### Responsive Design
- **Mobile-first:** Design for mobile, then scale up
- **Breakpoints:** sm:640px, md:768px, lg:1024px, xl:1280px, 2xl:1536px
- **Touch targets:** Minimum 44x44px
- **Text size:** Minimum 14px (16px body)
- **No horizontal scroll:** Use overflow-x-hidden

---

## 🚀 Deployment Information

### Development
```bash
# Install dependencies
yarn install

# Start dev server (port 5994)
yarn dev

# Type checking
yarn type-check

# Linting
yarn lint

# Format code
yarn format
```

### Production Build
```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

### Firebase Deployment
```bash
# Deploy everything
firebase deploy

# Deploy hosting only
firebase deploy --only hosting

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes
```

### Mobile Build (Capacitor)
```bash
# Add platforms (first time only)
npx cap add android
npx cap add ios

# Build web assets
yarn build

# Sync to native projects
npx cap sync

# Open in native IDE
npx cap open android  # Android Studio
npx cap open ios      # Xcode
```

### Environment Variables
Required variables in `.env`:
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_ONESIGNAL_APP_ID=
VITE_NASA_API_KEY=
```

### Hosting Information
- **Platform:** Firebase Hosting
- **URL:** https://exohunter-ai.web.app/
- **CDN:** Firebase CDN (global)
- **SSL:** Auto-provisioned
- **Deployment:** Automatic via `firebase deploy`

### Monitoring & Analytics
- **Firebase Analytics:** User engagement
- **Amplitude:** Product analytics
- **Microsoft Clarity:** Session recordings
- **Firebase Performance:** App performance monitoring

---

## 📚 Additional Resources

### Documentation
- `/docs/setup/` - Setup guides
- `/docs/api/` - API documentation
- `/docs/features/` - Feature specifications
- `/docs/deployment/` - Deployment guides
- `/docs/architecture/` - Architecture docs
- `/docs/capacitor-plugins/` - Plugin documentation

### External Links
- **Firebase Console:** https://console.firebase.google.com/
- **OneSignal Dashboard:** https://onesignal.com/
- **NASA Exoplanet Archive:** https://exoplanetarchive.ipac.caltech.edu/
- **GitHub Repo:** https://github.com/aoneahsan/exohunter-ai
- **Live Demo:** https://exohunter-ai.web.app/

---

## 📞 Contact & Support

**Lead Developer:** Ahsan Mahmood
**Email:** aoneahsan@gmail.com
**Phone/WhatsApp:** +923046619706
**LinkedIn:** https://linkedin.com/in/aoneahsan
**GitHub:** https://github.com/aoneahsan
**Portfolio:** https://aoneahsan.com/

---

**Last Updated:** 2025-12-13
**Document Version:** 1.0.0
**Project Status:** Production - Live at https://exohunter-ai.web.app/
