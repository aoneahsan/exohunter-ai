import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ScrollToTop } from '@/components/ScrollToTop';
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
import Sitemap from '@/pages/Sitemap';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Contact from '@/pages/Contact';
import DataDeletion from '@/pages/DataDeletion';
import AccountDeletion from '@/pages/AccountDeletion';
import CookiePolicy from '@/pages/CookiePolicy';

// Error Pages
import NotFound from '@/pages/NotFound';
import ServerError from '@/pages/ServerError';
import Forbidden from '@/pages/Forbidden';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  useEffect(() => {
    // Initialize OneSignal when app loads
    initializeOneSignal();
  }, []);

  return (
    <Router>
      <ScrollToTop />
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
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="contact" element={<Contact />} />
            <Route path="data-deletion" element={<DataDeletion />} />
            <Route path="account-deletion" element={<AccountDeletion />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />

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

            {/* Error Pages */}
            <Route path="404" element={<NotFound />} />
            <Route path="500" element={<ServerError />} />
            <Route path="403" element={<Forbidden />} />
            <Route path="401" element={<Unauthorized />} />

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;