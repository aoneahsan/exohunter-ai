# 🚀 ExoHunter AI - Automated Exoplanet Detection System

## 📋 Project Overview

ExoHunter AI is an advanced web application that uses artificial intelligence to automatically detect exoplanets from telescope data. Built for the NASA Space Apps Challenge 2025, this system democratizes space exploration by making exoplanet detection accessible to citizen scientists worldwide.

**Live Demo:** https://exohunter-ai.web.app/  
**Challenge:** A World Away: Hunting for Exoplanets with AI  
**Team:** Zaions Team  
**Event:** NASA Space Apps Challenge 2025 - Lahore, Pakistan

## 👨‍💻 Developer Information

**Ahsan Mahmood**  
- 📧 Email: aoneahsan@gmail.com
- 📱 Phone: +92 304 661 9706
- 🔗 LinkedIn: https://linkedin.com/in/aoneahsan
- 💻 GitHub: https://github.com/aoneahsan
- 📦 NPM: https://npmjs.com/~aoneahsan
- 🌐 Website: https://aoneahsan.com/

## 🎯 Core Features

### 1. **AI-Powered Detection Engine**
- Real-time analysis of light curve data
- Pattern recognition using simulated CNN+LSTM architecture
- Confidence scoring for each detection (0-100%)
- Batch processing capabilities for multiple stars
- Visual representation of transit events

### 2. **Interactive Data Visualization**
- Real-time light curve plotting
- Transit event highlighting
- Flux variation graphs
- Period analysis charts
- 3D orbital visualization (WebGL)
- Comparative analysis tools

### 3. **User Dashboard**
- Personal detection history
- Saved searches and favorites
- Achievement badges system
- Contribution statistics
- Export functionality (CSV, JSON)
- Collaborative team workspaces

### 4. **Educational Resources**
- Interactive exoplanet tutorial
- Glossary of astronomical terms
- Video explanations
- Method comparisons (Transit, Radial Velocity, etc.)
- Quiz and certification system

### 5. **Community Features**
- Public discovery feed
- User profiles and rankings
- Discussion forums
- Expert verification system
- Share discoveries on social media

## 📱 Application Pages & Routes

### Public Pages (No Authentication Required)
1. **Landing Page** (`/`)
   - Hero section with animated space background
   - Feature showcase
   - Live detection counter
   - Call-to-action for sign-up
   - Recent discoveries carousel

2. **Explorer** (`/explorer`)
   - Public demo of detection system
   - Sample dataset exploration
   - Limited to 10 analyses per session
   - Upgrade prompt for registered users

3. **Discoveries** (`/discoveries`)
   - Global feed of confirmed detections
   - Filter by date, confidence, star type
   - Detailed view for each discovery
   - Share functionality

4. **Learn** (`/learn`)
   - Educational content hub
   - Interactive tutorials
   - Video library
   - Infographics and animations
   - FAQ section

5. **About** (`/about`)
   - Project information
   - Team members
   - NASA Space Apps context
   - Technology stack
   - Contact information

### Protected Pages (Authentication Required)

6. **Dashboard** (`/dashboard`)
   - Personal statistics
   - Recent activity
   - Quick actions panel
   - Notifications feed
   - Progress tracking

7. **Analyzer** (`/analyzer`)
   - Full AI detection interface
   - File upload (CSV, FITS)
   - NASA API integration
   - Real-time processing
   - Result interpretation tools
   - Save and export options

8. **Profile** (`/profile`)
   - User information management
   - Avatar upload
   - Bio and interests
   - Privacy settings
   - Notification preferences
   - Connected accounts

9. **My Discoveries** (`/my-discoveries`)
   - Personal detection history
   - Detailed analysis reports
   - Export functionality
   - Share management
   - Collaboration invites

10. **Settings** (`/settings`)
    - Account management
    - Security options
    - API keys (for advanced users)
    - Data preferences
    - Delete account option

## 🏗 Technical Architecture

### Frontend Stack
- **Framework:** React 18.x with TypeScript
- **UI Components:** shadcn/ui (Radix UI + Tailwind CSS)
- **State Management:** Zustand 4.x
- **Forms:** React Hook Form 7.x with Zod validation
- **Routing:** React Router v6
- **Charts:** Recharts / Chart.js
- **3D Graphics:** Three.js (for orbital visualizations)
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend Services (Firebase)
- **Hosting:** Firebase Hosting
- **Database:** Cloud Firestore
- **Authentication:** Firebase Auth (Email/Password + Google OAuth)
- **Storage:** Firebase Storage (for user uploads)
- **Analytics:** Firebase Analytics + Google Analytics 4
- **Functions:** Cloud Functions (for heavy processing)
- **Performance:** Firebase Performance Monitoring

### Third-Party Integrations
- **Push Notifications:** OneSignal
- **NASA APIs:**
  - NASA Exoplanet Archive API
  - Kepler/TESS Data API
  - NASA Image API (for visuals)
- **Mobile Framework:** Capacitor 5.x
- **App ID:** com.aoneahsan.exohunterai

### Data Models

#### User Profile
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  joinedAt: Timestamp;
  stats: {
    detectionsCount: number;
    accuracyScore: number;
    contributionPoints: number;
    rank: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    publicProfile: boolean;
  };
  achievements: Achievement[];
}
```

#### Detection Record
```typescript
interface Detection {
  id: string;
  userId: string;
  timestamp: Timestamp;
  starData: {
    catalogId: string;
    constellation: string;
    magnitude: number;
    distance: number;
  };
  analysis: {
    confidence: number;
    method: 'transit' | 'radial_velocity';
    periodDays: number;
    depth: number;
    duration: number;
  };
  status: 'pending' | 'confirmed' | 'rejected';
  votes: number;
  isPublic: boolean;
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Firebase CLI installed globally
- Git

### Development Setup
```bash
# Clone repository
git clone https://github.com/aoneahsan/exohunter-ai.git
cd exohunter-ai

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase config

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=exohunter-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=exohunter-ai
VITE_FIREBASE_STORAGE_BUCKET=exohunter-ai.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_ONESIGNAL_APP_ID=your_onesignal_app_id

VITE_NASA_API_KEY=your_nasa_api_key
```

## 📱 Mobile App Development

### Capacitor Configuration
```json
{
  "appId": "com.aoneahsan.exohunterai",
  "appName": "ExoHunter AI",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "android": {
    "allowMixedContent": false
  },
  "ios": {
    "contentInset": "automatic"
  }
}
```

### Building Mobile Apps
```bash
# Add platforms
npx cap add android
npx cap add ios

# Sync web assets
npx cap sync

# Open in native IDEs
npx cap open android
npx cap open ios
```

## 🎨 Design System

### Color Palette
- **Primary:** #667eea (Purple)
- **Secondary:** #764ba2 (Deep Purple)
- **Accent:** #4ade80 (Green for success)
- **Background:** #0B0E1F (Deep Space)
- **Surface:** #1a1f3a (Dark Blue)
- **Text Primary:** #ffffff
- **Text Secondary:** #9bb5ff

### Typography
- **Headings:** Inter / SF Pro Display
- **Body:** Inter / SF Pro Text
- **Monospace:** JetBrains Mono (for data)

### Components Structure
- All components use shadcn/ui as base
- Custom theme configuration in `tailwind.config.js`
- Dark mode by default (space theme)
- Responsive breakpoints: mobile (640px), tablet (768px), desktop (1024px)

## 🔐 Security & Privacy

### Authentication Flow
1. User signs up with email/password or Google
2. Email verification sent
3. Profile creation wizard
4. Dashboard access granted

### Data Protection
- All API keys stored in environment variables
- Firebase Security Rules for data access
- Rate limiting on API endpoints
- Input sanitization and validation
- HTTPS enforced

### Privacy Features
- User data deletion option
- Export personal data
- Granular privacy controls
- GDPR compliant

## 📊 Analytics Implementation

### Key Metrics Tracked
- User engagement (session duration, pages viewed)
- Detection accuracy rates
- Feature usage statistics
- Conversion funnel (visitor → user → active detector)
- API usage and performance

### Custom Events
- `detection_started`
- `detection_completed`
- `result_shared`
- `tutorial_completed`
- `achievement_unlocked`

## 🔔 Push Notifications (OneSignal)

### Notification Types
1. **Detection Complete** - When analysis finishes
2. **New Discovery** - Community highlights
3. **Achievement Unlocked** - Gamification rewards
4. **System Updates** - New features, maintenance
5. **Weekly Report** - Personal statistics

### Implementation
- Web push for desktop
- Native push for mobile apps
- In-app notification center
- Preference management

## 🧪 Testing Strategy

### Test Coverage
- Unit tests for utility functions
- Integration tests for API calls
- Component testing with React Testing Library
- E2E tests with Cypress/Playwright
- Performance testing with Lighthouse

### Quality Assurance
- ESLint configuration
- Prettier code formatting
- Pre-commit hooks with Husky
- GitHub Actions CI/CD
- Code review process

## 📈 Performance Optimization

### Web Performance
- Lazy loading for routes
- Image optimization with WebP
- Code splitting
- Service Worker for offline capability
- CDN for static assets

### Firebase Optimization
- Compound queries optimization
- Offline persistence enabled
- Batch writes for bulk operations
- Cloud Functions for heavy processing
- Firestore indexes configured

## 🚦 Deployment Pipeline

### Staging Environment
- URL: https://staging.exohunter-ai.web.app/
- Auto-deploy from `develop` branch
- Feature flags for testing

### Production Environment
- URL: https://exohunter-ai.web.app/
- Manual deploy from `main` branch
- Rollback capability
- A/B testing support

## 📝 API Documentation

### Internal Endpoints (Cloud Functions)
- `POST /api/analyze` - Submit light curve data
- `GET /api/detections` - Retrieve detection history
- `GET /api/leaderboard` - Community rankings
- `POST /api/export` - Export user data
- `GET /api/stats` - Global statistics

### External APIs Used
- NASA Exoplanet Archive TAP Service
- Kepler/TESS Data Archives
- NASA Image and Video Library
- OneSignal REST API

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Implement changes
4. Write/update tests
5. Submit pull request
6. Code review process
7. Merge to develop
8. Deploy to staging
9. Production release

### Code Standards
- TypeScript strict mode
- Functional components only
- Custom hooks for logic reuse
- Atomic design principles
- Accessibility (WCAG 2.1 AA)

## 📄 License

This project is developed for the NASA Space Apps Challenge 2025 and is open source under the MIT License.

## 🙏 Acknowledgments

- NASA for providing open data and APIs
- NASA Space Apps Challenge organizers
- Lahore event organizers (Hassaan & Mehar)
- Firebase for backend infrastructure
- Open source community

## 📞 Support & Contact

- **Technical Issues:** Open GitHub issue
- **General Inquiries:** aoneahsan@gmail.com
- **Live Chat:** Available in-app for registered users
- **Documentation:** https://exohunter-ai.web.app/docs

---

**Built with ❤️ for NASA Space Apps Challenge 2025 by Team Zaions**