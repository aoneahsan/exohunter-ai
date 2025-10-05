import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { initializeOneSignal } from '@/services/oneSignal';

// Pages
import Landing from '@/pages/Landing';
import Explorer from '@/pages/Explorer';
import Dashboard from '@/pages/Dashboard';
import Discoveries from '@/pages/Discoveries';
import Learn from '@/pages/Learn';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import Analyzer from '@/pages/Analyzer';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Presentation from '@/pages/Presentation';

function App() {
  useEffect(() => {
    // Initialize OneSignal when app loads
    initializeOneSignal();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Landing />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="discoveries" element={<Discoveries />} />
            <Route path="learn" element={<Learn />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="presentation" element={<Presentation />} />
            
            {/* Protected Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="analyzer"
              element={
                <ProtectedRoute>
                  <Analyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;