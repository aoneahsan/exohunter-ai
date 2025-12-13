import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShieldAlert, Lock, Key, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '403 - Access Denied | ExoHunter AI';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
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
        className="absolute top-20 left-10 text-orange-500/20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ShieldAlert className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>

      {/* Floating lock */}
      <motion.div
        className="absolute bottom-20 right-10 text-orange-500/20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Lock className="w-20 h-20 sm:w-28 sm:h-28" />
      </motion.div>

      <div className="max-w-2xl w-full relative z-10">
        <Card className="bg-card/80 backdrop-blur-lg border-orange-500/20">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              {/* Animated 403 */}
              <div className="relative">
                <motion.div
                  className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent"
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
                  403
                </motion.div>

                {/* Animated shield icon */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-right-8 text-orange-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ShieldAlert className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>

                {/* Animated lock icon */}
                <motion.div
                  className="absolute top-8 left-4 sm:left-8 text-red-500"
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
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
                  Access Denied
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                  You don't have permission to access this area. This section of our galaxy is
                  restricted.
                </p>
              </motion.div>

              {/* Info box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-3 text-left">
                  <ShieldAlert className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Restricted Access
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This resource requires special permissions. If you believe you should have
                      access, please contact support.
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
                  <Link to="/">
                    <Home className="w-5 h-5" />
                    Go Home
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary/30 hover:border-primary/50"
                >
                  <Link to="/login">
                    <Key className="w-5 h-5" />
                    Sign In
                  </Link>
                </Button>
              </motion.div>

              {/* Helpful suggestions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8 space-y-4"
              >
                <p className="text-sm font-medium text-foreground">
                  What you can do:
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Sign in with an account that has the required permissions
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Contact support at{' '}
                      <a
                        href="mailto:aoneahsan@gmail.com"
                        className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                      >
                        aoneahsan@gmail.com
                      </a>{' '}
                      to request access
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Return to the home page and explore public content
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Go back option */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-6"
              >
                <button
                  onClick={() => navigate(-1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  Or go back to the previous page
                </button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Forbidden;
