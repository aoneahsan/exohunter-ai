# 🚀 ExoHunter AI - Automated Exoplanet Detection System

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.1.0-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-purple.svg)](https://vitejs.dev/)

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

## ✨ Key Features

- **AI-Powered Detection Engine** - Real-time analysis of light curve data with pattern recognition
- **Interactive Data Visualization** - Real-time charts, 3D orbital views, and comparative analysis
- **User Dashboard** - Personal detection history, achievements, and contribution statistics
- **Educational Resources** - Interactive tutorials, glossary, and certification system
- **Community Features** - Public discovery feed, user rankings, and social sharing
- **Cross-Platform** - Progressive Web App with native mobile support via Capacitor

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher (we use 24.2.0 - check .nvmrc)
- Yarn package manager
- Firebase CLI installed globally
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aoneahsan/exohunter-ai.git
cd exohunter-ai
```

2. **Install dependencies**
```bash
yarn install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
```

4. **Initialize Firebase**
```bash
firebase init
# Select: Hosting, Firestore, Authentication, Storage
# Use existing project or create new one
```

5. **Run development server**
```bash
yarn dev
# App will be available at http://localhost:5173
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
VITE_NASA_API_KEY=your_nasa_api_key
```

## 🏗️ Project Structure

```
exohunter-ai/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── layout/       # Layout components
│   │   ├── features/     # Feature-specific components
│   │   └── form-fields/  # Custom form components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and external services
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── config/           # Configuration files
│   ├── lib/              # Library integrations
│   ├── styles/           # Global styles
│   └── assets/           # Static assets
├── public/               # Public assets
├── .env.example          # Environment variables template
├── .nvmrc                # Node version specification
├── capacitor.config.ts   # Capacitor configuration
├── components.json       # shadcn/ui configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project dependencies
```

## 📱 Mobile Development

### Building Mobile Apps

1. **Add Capacitor platforms**
```bash
npx cap add android
npx cap add ios
```

2. **Sync web assets**
```bash
yarn build
npx cap sync
```

3. **Open in native IDEs**
```bash
npx cap open android  # Opens Android Studio
npx cap open ios      # Opens Xcode
```

### Capacitor Configuration

The app is configured with:
- App ID: `com.aoneahsan.exohunterai`
- App Name: `ExoHunter AI`
- Splash screen with space theme
- Push notifications support
- Offline storage with Preferences API

## 🔧 Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn preview          # Preview production build
yarn type-check       # Run TypeScript type checking
yarn lint             # Run ESLint
yarn format           # Format code with Prettier

# Firebase
firebase deploy       # Deploy to Firebase Hosting
firebase emulators:start # Start local Firebase emulators

# Capacitor
npx cap sync          # Sync web assets to native projects
npx cap open android  # Open Android project
npx cap open ios      # Open iOS project
```

## 🎨 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Build tool
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **shadcn/ui** - Component library
- **Zustand 5.0.2** - State management
- **React Router 7.1.0** - Routing
- **React Hook Form 7.54.2** - Form management
- **Framer Motion 11.15.0** - Animations
- **Three.js 0.172.0** - 3D graphics
- **Recharts 2.15.0** - Charts

### Backend
- **Firebase 11.1.0** - Backend services
- **Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Firebase Storage** - File storage
- **Cloud Functions** - Serverless functions

### Mobile
- **Capacitor 6.2.0** - Native bridge
- **OneSignal** - Push notifications

## 🔒 Security

- Environment variables for sensitive data
- Firebase Security Rules for data access
- Input validation with Zod
- HTTPS enforced
- Content Security Policy headers
- Rate limiting on API calls

## 🧪 Testing

```bash
# Run unit tests
yarn test

# Run e2e tests
yarn test:e2e

# Run with coverage
yarn test:coverage
```

## 📈 Performance

- Lazy loading for routes and images
- Code splitting with dynamic imports
- Service Worker for offline support
- CDN for static assets
- Optimized bundle size < 200KB
- Lighthouse score > 90

## 🚀 Deployment

### Firebase Hosting

1. **Build the project**
```bash
yarn build
```

2. **Deploy to Firebase**
```bash
firebase deploy
```

### GitHub Actions (CI/CD)

The project includes GitHub Actions workflows for:
- Automated testing on PR
- Build verification
- Deployment to staging/production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for providing open data and APIs
- NASA Space Apps Challenge organizers
- Lahore event organizers
- Firebase for backend infrastructure
- Open source community

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/aoneahsan/exohunter-ai/issues)
- **Email:** aoneahsan@gmail.com
- **Documentation:** [Project Wiki](https://github.com/aoneahsan/exohunter-ai/wiki)

---

**Built with ❤️ for NASA Space Apps Challenge 2025 by Team Zaions**