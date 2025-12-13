# ExoHunter AI

**AI-Powered Exoplanet Discovery Platform**

[![React](https://img.shields.io/badge/React-19.2.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange.svg)](https://firebase.google.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.0.0-blue.svg)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](./LICENSE)

## Overview

ExoHunter AI is an advanced platform that leverages artificial intelligence and machine learning to detect and analyze exoplanets from telescope data. The platform combines cutting-edge AI algorithms with interactive 3D visualizations and educational resources to make exoplanet discovery accessible to researchers, students, and space enthusiasts worldwide. Users can analyze light curve data, explore discovered exoplanets in immersive 3D environments, and contribute to the growing database of planetary discoveries.

**Live Demo:** [exohunter-ai.web.app](https://exohunter-ai.web.app/)

## Features

- **AI-Powered Analysis** - Real-time detection and analysis of exoplanets using machine learning algorithms trained on NASA telescope data
- **3D Planetary Visualization** - Interactive Three.js-powered 3D models of planetary systems with orbital mechanics and realistic rendering
- **Discovery Database** - Comprehensive searchable database of exoplanet discoveries with filtering, sorting, and detailed analytics
- **Learning Center** - Educational resources, tutorials, and interactive guides about exoplanet detection methods and astronomy
- **Cross-Platform Support** - Progressive Web App with native iOS and Android support via Capacitor for seamless mobile experience

## Tech Stack

- **React 19** + **TypeScript** - Modern UI library with type safety
- **Vite 7** - Fast build tool and development server
- **Firebase** (Auth, Firestore, Storage) - Backend services and authentication
- **Capacitor 8** - Native iOS and Android support
- **Three.js** + **React Three Fiber** - 3D graphics and visualizations
- **Radix UI** + **Tailwind CSS** - Component library and styling
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state and data fetching
- **Recharts** - Data visualization and charting

## Getting Started

### Prerequisites

- **Node.js 22+** (check `.nvmrc` for exact version)
- **Yarn** package manager
- **Git**

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

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

4. **Run development server**
   ```bash
   yarn dev
   # App available at http://localhost:5994
   ```

## Available Scripts

```bash
yarn dev              # Start development server (port 5994)
yarn build            # Build for production
yarn lint             # Run ESLint
yarn preview          # Preview production build
yarn type-check       # Run TypeScript type checking
yarn format           # Format code with Prettier
```

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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# OneSignal Configuration
VITE_ONESIGNAL_APP_ID=your_onesignal_app_id

# NASA API Configuration
VITE_NASA_API_KEY=your_nasa_api_key

# Firebase Emulators (optional - for local development)
VITE_USE_FIREBASE_EMULATOR=false

# App Configuration
VITE_APP_NAME=ExoHunter AI
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

See `.env.example` for a complete list of available configuration options.

## Deployment

### Firebase Hosting

1. Build the project:
   ```bash
   yarn build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

The app will be deployed to your Firebase Hosting URL.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Developer Contact

**Ahsan Mahmood**

- Email: aoneahsan@gmail.com
- GitHub: [@aoneahsan](https://github.com/aoneahsan)
- LinkedIn: [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan)
- Portfolio: [aoneahsan.com](https://aoneahsan.com)

---

Built for NASA Space Apps Challenge 2025