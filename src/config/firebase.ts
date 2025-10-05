import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics and Performance only in production
let analytics;
let performance;

if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
  performance = getPerformance(app);
}

// Connect to emulators in development
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  const authUrl = import.meta.env.VITE_FIREBASE_EMULATOR_AUTH_URL || 'http://localhost:9099';
  const firestoreHost = import.meta.env.VITE_FIREBASE_EMULATOR_FIRESTORE_HOST || 'localhost';
  const firestorePort = parseInt(import.meta.env.VITE_FIREBASE_EMULATOR_FIRESTORE_PORT || '8080');
  const storageHost = import.meta.env.VITE_FIREBASE_EMULATOR_STORAGE_HOST || 'localhost';
  const storagePort = parseInt(import.meta.env.VITE_FIREBASE_EMULATOR_STORAGE_PORT || '9199');

  connectAuthEmulator(auth, authUrl, { disableWarnings: true });
  connectFirestoreEmulator(db, firestoreHost, firestorePort);
  connectStorageEmulator(storage, storageHost, storagePort);
  
  console.log('🔧 Connected to Firebase Emulators');
}

// Project prefix for collections and storage paths
export const PROJECT_PREFIX = 'exoh_';

export { analytics, performance };
export default app;