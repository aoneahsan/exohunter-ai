# ExoHunter AI - Implementation Guide & Features Specification

## 🎯 Project Requirements for Claude Code

### Core NPM Packages to Install

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "firebase": "^10.7.0",
    "zustand": "^4.4.7",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.2",
    "zod": "^3.22.4",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0",
    "lucide-react": "^0.294.0",
    "recharts": "^2.10.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "framer-motion": "^10.16.0",
    "react-onesignal": "^3.0.1",
    "@capacitor/core": "^5.6.0",
    "@capacitor/android": "^5.6.0",
    "@capacitor/ios": "^5.6.0",
    "date-fns": "^2.30.0",
    "axios": "^1.6.0",
    "react-hot-toast": "^2.4.1",
    "react-intersection-observer": "^9.5.3",
    "react-use": "^17.4.0",
    "papaparse": "^5.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "@types/papaparse": "^5.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

## 📄 Page-by-Page Implementation Details

### 1. Landing Page (`src/pages/Landing.tsx`)

**Components Needed:**
- `HeroSection` - Animated starfield background with title
- `FeatureCards` - Grid of 6 main features
- `StatsCounter` - Animated counters for detections, users, accuracy
- `RecentDiscoveries` - Carousel of latest findings
- `CallToAction` - Sign up/login prompt
- `ParticlesBackground` - Three.js animated space particles

**Key Features:**
- Auto-playing video background (optional)
- Smooth scroll animations with Framer Motion
- Intersection Observer for reveal animations
- Mobile-responsive hero section
- Fast loading with lazy images

**Data Requirements:**
- Fetch latest 5 discoveries from Firestore
- Real-time stats from Firebase Analytics
- Cache stats for 5 minutes

### 2. Explorer Page (`src/pages/Explorer.tsx`)

**Components Needed:**
- `LightCurveChart` - Recharts line graph
- `DataUploader` - Drag & drop CSV/FITS files
- `AnalysisPanel` - Shows processing status
- `ResultCard` - Detection results with confidence
- `SampleDataSelector` - Pre-loaded examples
- `TutorialOverlay` - First-time user guide

**Key Features:**
- Demo mode with 10 free analyses
- Sample datasets (Kepler-452b, TRAPPIST-1, etc.)
- Real-time chart updates during analysis
- Simulated ML processing (2-3 second delay)
- Export results as JSON/CSV
- Share results modal

**Simulated AI Logic:**
```typescript
// Simulate detection algorithm
const analyzeData = (lightCurve: number[]) => {
  // Add random processing time
  const processingTime = 2000 + Math.random() * 1000;
  
  // Simulate confidence based on data variance
  const variance = calculateVariance(lightCurve);
  const confidence = Math.min(95, 60 + variance * 10 + Math.random() * 20);
  
  // Detect dips in light curve
  const transitEvents = findTransitEvents(lightCurve);
  
  return {
    confidence,
    transitCount: transitEvents.length,
    period: calculatePeriod(transitEvents),
    depth: calculateDepth(lightCurve),
    planetRadius: estimatePlanetRadius(depth)
  };
};
```

### 3. Dashboard (`src/pages/Dashboard.tsx`)

**Components Needed:**
- `WelcomeHeader` - Personalized greeting with time
- `QuickStats` - 4 stat cards (detections, accuracy, rank, points)
- `ActivityFeed` - Recent actions timeline
- `ProgressChart` - Weekly/monthly detection graph
- `LeaderboardWidget` - Top 5 users mini-view
- `QuickActions` - Action buttons grid
- `NotificationBell` - Dropdown with recent alerts

**State Management (Zustand):**
```typescript
interface DashboardStore {
  userStats: UserStats;
  activityFeed: Activity[];
  notifications: Notification[];
  fetchDashboardData: () => Promise<void>;
  markNotificationRead: (id: string) => void;
}
```

### 4. Analyzer Page (`src/pages/Analyzer.tsx`)

**Components Needed:**
- `DataSourceSelector` - Upload/API/Sample toggle
- `NASADataFetcher` - Connect to NASA API
- `ProcessingPipeline` - Visual processing stages
- `AdvancedSettings` - Algorithm parameters
- `ResultsViewer` - Detailed analysis output
- `ComparisonTool` - Compare multiple analyses
- `SaveDialog` - Save to profile options

**Advanced Features:**
- Batch processing up to 10 stars
- Real NASA API integration
- WebWorker for heavy calculations
- Progress bar with stages
- Cancel analysis capability
- Auto-save drafts to localStorage

### 5. Learn Page (`src/pages/Learn.tsx`)

**Components Needed:**
- `TutorialGrid` - Interactive lesson cards
- `VideoPlayer` - Embedded YouTube tutorials
- `InteractiveDemo` - Mini detection simulator
- `GlossarySearch` - Searchable terms database
- `QuizComponent` - Knowledge test system
- `CertificateGenerator` - Completion certificates

**Content Structure:**
```typescript
interface Tutorial {
  id: string;
  title: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  interactive: boolean;
  videoUrl?: string;
  markdownContent: string;
}
```

### 6. Profile Page (`src/pages/Profile.tsx`)

**Components Needed:**
- `ProfileHeader` - Avatar, name, bio editor
- `StatsOverview` - Detailed statistics
- `AchievementGrid` - Unlocked badges
- `DetectionHistory` - Paginated list
- `PrivacySettings` - Toggle switches
- `SocialLinks` - Connected accounts
- `ExportData` - Download user data

**Features:**
- Avatar upload to Firebase Storage
- Rich text bio editor
- Achievement progress bars
- CSV export of all detections
- Account deletion confirmation

## 🔧 Technical Implementation Details

### Firebase Configuration (`src/config/firebase.ts`)

```typescript
// Initialize Firebase services
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "exohunter-ai.firebaseapp.com",
  projectId: "exohunter-ai",
  storageBucket: "exohunter-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Services to initialize:
// - Auth (with persistence)
// - Firestore (with offline cache)
// - Storage
// - Analytics
// - Performance
```

### Firestore Collections Structure

```typescript
// Collections and their schemas
collections = {
  users: {
    // Document ID: Firebase Auth UID
    email: string;
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
    // ... (see User model in README)
  },
  
  detections: {
    // Document ID: Auto-generated
    userId: string;
    timestamp: Timestamp;
    starData: object;
    analysis: object;
    // ... (see Detection model in README)
  },
  
  tutorials: {
    // Static educational content
    title: string;
    content: string;
    order: number;
  },
  
  leaderboard: {
    // Cached leaderboard data
    userId: string;
    score: number;
    rank: number;
    updatedAt: Timestamp;
  }
};
```

### Authentication Flow (`src/hooks/useAuth.ts`)

```typescript
// Custom hook for authentication
const useAuth = () => {
  // Handle sign in with email/password
  // Handle Google OAuth
  // Email verification
  // Password reset
  // Sign out
  // Auth state persistence
  // Return user object and methods
};
```

### OneSignal Integration (`src/services/notifications.ts`)

```typescript
// Initialize OneSignal
// Request permission
// Subscribe to notifications
// Handle notification clicks
// Update user tags
// Send local notifications for:
  // - Analysis complete
  // - New achievement
  // - Community highlights
```

### Routing Structure (`src/App.tsx`)

```typescript
// Route configuration
const routes = [
  { path: '/', element: <Landing />, public: true },
  { path: '/explorer', element: <Explorer />, public: true },
  { path: '/discoveries', element: <Discoveries />, public: true },
  { path: '/learn', element: <Learn />, public: true },
  { path: '/about', element: <About />, public: true },
  { path: '/dashboard', element: <Dashboard />, protected: true },
  { path: '/analyzer', element: <Analyzer />, protected: true },
  { path: '/profile', element: <Profile />, protected: true },
  { path: '/my-discoveries', element: <MyDiscoveries />, protected: true },
  { path: '/settings', element: <Settings />, protected: true },
];

// Protected route wrapper
// Redirect to login if not authenticated
// Show loading spinner during auth check
```

### State Management Structure (`src/store/`)

```typescript
// Zustand stores
stores = {
  authStore: {
    user: User | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
  },
  
  analysisStore: {
    currentAnalysis: Analysis | null;
    history: Analysis[];
    isProcessing: boolean;
    startAnalysis: () => Promise<void>;
    saveResult: () => Promise<void>;
  },
  
  uiStore: {
    theme: 'dark'; // Always dark for space theme
    sidebarOpen: boolean;
    notifications: Notification[];
    toggleSidebar: () => void;
  }
};
```

### Component Library Setup (shadcn/ui)

```bash
# Commands to run for shadcn setup
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add alert
```

### Capacitor Mobile Setup

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.aoneahsan.exohunterai',
  appName: 'ExoHunter AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0B0E1F",
      showSpinner: true,
      spinnerColor: "#667eea"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};
```

## 🎨 UI/UX Guidelines

### Layout Structure
- **Navigation:** Top navbar + mobile bottom nav
- **Max Width:** 1440px centered container
- **Spacing:** 8px grid system
- **Cards:** Rounded corners (8px), subtle shadows
- **Animations:** 200-300ms transitions

### Component Patterns
- **Loading States:** Skeleton screens everywhere
- **Empty States:** Illustrated messages
- **Error Handling:** Toast notifications + inline errors
- **Form Validation:** Real-time with debouncing
- **Modals:** Centered with backdrop blur

### Responsive Breakpoints
```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Wide desktop */
```

## 🚀 Performance Requirements

### Web Vitals Targets
- **LCP:** < 2.5s (Largest Contentful Paint)
- **FID:** < 100ms (First Input Delay)
- **CLS:** < 0.1 (Cumulative Layout Shift)
- **TTI:** < 3.5s (Time to Interactive)

### Optimization Techniques
1. Code splitting by route
2. Lazy load images with loading="lazy"
3. Preconnect to external domains
4. Service worker for offline mode
5. Compress images with WebP
6. Minify and gzip all assets
7. Use Firebase CDN for static files

## 🔒 Security Checklist

- [ ] Environment variables properly configured
- [ ] Firebase Security Rules implemented
- [ ] Input validation on all forms
- [ ] XSS protection (sanitize user content)
- [ ] Rate limiting on API calls
- [ ] HTTPS enforced everywhere
- [ ] Content Security Policy headers
- [ ] Secure cookie settings
- [ ] SQL injection prevention (Firestore is NoSQL)
- [ ] Authentication tokens properly handled

## 📱 PWA Configuration

```json
// manifest.json
{
  "name": "ExoHunter AI",
  "short_name": "ExoHunter",
  "description": "AI-Powered Exoplanet Detection",
  "theme_color": "#0B0E1F",
  "background_color": "#0B0E1F",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🧪 Testing Requirements

### Test Files Structure
```
src/
  __tests__/
    components/
    pages/
    hooks/
    utils/
  e2e/
    auth.spec.ts
    analysis.spec.ts
```

### Critical User Flows to Test
1. Sign up → Email verify → Dashboard
2. Upload data → Analyze → Save result
3. View discoveries → Filter → Share
4. Complete tutorial → Take quiz → Get certificate
5. Edit profile → Change settings → Sign out

## 🎯 MVP Features for Hackathon

### Must Have (Day 1)
- [ ] Landing page with demo
- [ ] Basic authentication (Google + Email)
- [ ] Explorer with sample data
- [ ] Simple analysis simulation
- [ ] Results display
- [ ] Basic dashboard

### Should Have (Day 2)
- [ ] User profiles
- [ ] Save detections
- [ ] Public discoveries feed
- [ ] Educational content
- [ ] Mobile responsive
- [ ] Share functionality

### Nice to Have (If Time Permits)
- [ ] 3D visualizations
- [ ] Achievement system
- [ ] Push notifications
- [ ] Advanced filtering
- [ ] Export features
- [ ] Team collaboration

## 🔄 Development Workflow with Claude Code

1. **Setup Phase**
   - Initialize React project with Vite
   - Install all npm packages
   - Configure Firebase project
   - Setup shadcn/ui components
   - Create folder structure

2. **Development Order**
   - Auth system first
   - Landing page
   - Explorer (core feature)
   - Dashboard
   - Other pages
   - Mobile optimization
   - Testing & polish

3. **Claude Code Commands**
   ```
   "Create Landing page with hero section and features"
   "Setup Firebase auth with Google and email"
   "Create light curve chart component with Recharts"
   "Implement Zustand store for user state"
   "Add shadcn dialog for sign up flow"
   ```

---

**Remember:** Focus on core functionality first. The AI detection can be simulated for the hackathon - what matters is the user experience, interface design, and demonstrating the concept effectively!