import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Telescope, 
  User, 
  LogOut, 
  Settings,
  ChartBar,
  BookOpen,
  Compass,
  Globe,
  Sparkles,
  Github,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const navLinks = [
    { path: '/', label: 'Home', icon: Globe },
    { path: '/explorer', label: 'Explorer', icon: Telescope },
    { path: '/discoveries', label: 'Discoveries', icon: Sparkles },
    { path: '/learn', label: 'Learn', icon: BookOpen },
  ];

  const authenticatedLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: ChartBar },
    { path: '/analyzer', label: 'Analyzer', icon: Compass },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      closeMobileMenu();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-space-700 bg-space-900/95 backdrop-blur supports-[backdrop-filter]:bg-space-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-white"
            onClick={closeMobileMenu}
          >
            <Telescope className="h-8 w-8 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
              ExoHunter AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple-400',
                  location.pathname === link.path
                    ? 'text-purple-400'
                    : 'text-gray-300'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            
            {currentUser && authenticatedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple-400',
                  location.pathname === link.path
                    ? 'text-purple-400'
                    : 'text-gray-300'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <ThemeToggle />
            <div className="h-6 w-px bg-gray-700" />
            <a
              href="https://github.com/aoneahsan/exohunter-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-purple-400"
              title="View Source Code on GitHub"
            >
              <Github className="h-5 w-5" />
              <span className="hidden lg:inline">GitHub</span>
            </a>
            <div className="h-6 w-px bg-gray-700" />
            {currentUser ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="gradient-primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium',
                  location.pathname === link.path
                    ? 'bg-space-800 text-purple-400'
                    : 'text-gray-300 hover:bg-space-800 hover:text-white'
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            
            {currentUser && (
              <>
                <div className="my-2 border-t border-space-700" />
                {authenticatedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium',
                      location.pathname === link.path
                        ? 'bg-space-800 text-purple-400'
                        : 'text-gray-300 hover:bg-space-800 hover:text-white'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-space-700" />
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-space-800 hover:text-white"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-space-800 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-space-800 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}
            
            {!currentUser && (
              <>
                <div className="my-2 border-t border-space-700" />
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-space-800 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block rounded-md bg-purple-600 px-3 py-2 text-base font-medium text-white hover:bg-purple-700"
                >
                  Get Started
                </Link>
              </>
            )}
            
            <div className="my-2 border-t border-space-700" />
            <a
              href="https://github.com/aoneahsan/exohunter-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-space-800 hover:text-white"
            >
              <Github className="h-5 w-5" />
              View Source Code
              <ExternalLink className="h-4 w-4 ml-auto" />
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};