import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Home, UserPlus, Shield, Key, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = '401 - Authentication Required | ExoHunter AI';
  }, []);

  // Get the intended destination from state, if available
  const from = location.state?.from?.pathname || '/dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating shield */}
      <motion.div
        className="absolute top-20 right-10 text-primary/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Shield className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>

      {/* Floating key */}
      <motion.div
        className="absolute bottom-20 left-10 text-accent/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Key className="w-20 h-20 sm:w-28 sm:h-28" />
      </motion.div>

      <div className="max-w-2xl w-full relative z-10">
        <Card className="bg-card/80 backdrop-blur-lg border-primary/20">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              {/* Animated 401 */}
              <div className="relative">
                <motion.div
                  className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                >
                  401
                </motion.div>

                {/* Animated key icon */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-right-8 text-primary"
                  animate={{
                    rotate: [0, -45, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Key className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>

                {/* Animated sparkles */}
                <motion.div
                  className="absolute top-8 left-4 sm:left-8 text-accent"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
                </motion.div>
              </div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-3"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                  Authentication Required
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                  You need to sign in to access this area. Join our community of exoplanet
                  explorers to unlock advanced features.
                </p>
              </motion.div>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-3 text-left">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Protected Content
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This page requires authentication. Sign in or create an account to continue
                      your journey through the cosmos.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90"
                >
                  <Link to="/login" state={{ from: { pathname: from } }}>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary/30 hover:border-primary/50"
                >
                  <Link to="/signup" state={{ from: { pathname: from } }}>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </Link>
                </Button>
              </motion.div>

              {/* Features preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8 space-y-4"
              >
                <p className="text-sm font-medium text-foreground">
                  What you'll unlock:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">AI Analyzer</p>
                      <p className="text-xs text-muted-foreground">
                        Advanced exoplanet analysis tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Personal Dashboard</p>
                      <p className="text-xs text-muted-foreground">
                        Track your discoveries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Custom Alerts</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified of new discoveries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Save Favorites</p>
                      <p className="text-xs text-muted-foreground">
                        Bookmark interesting planets
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Alternative actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-8 border-t border-border/50 space-y-3"
              >
                <p className="text-sm text-muted-foreground">
                  Not ready to sign in?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    <Link to="/">
                      <Home className="w-4 h-4 mr-2" />
                      Return Home
                    </Link>
                  </Button>
                  <span className="hidden sm:inline text-muted-foreground">•</span>
                  <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Go Back
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;
