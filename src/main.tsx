import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import { FullPageLoader } from '@/components/FullPageLoader'

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered:', registration))
      .catch(error => console.log('SW registration failed:', error));
  });
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Minimum loading time to show tips
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(minLoadTime);
  }, []);

  const handleLoadComplete = () => {
    setShowApp(true);
  };

  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <FullPageLoader isLoading={isLoading} onComplete={handleLoadComplete} />
          {showApp && <App />}
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />)
