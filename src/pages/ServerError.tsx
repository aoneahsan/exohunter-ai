import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Mail, AlertTriangle, Zap, Satellite } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ServerError: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '500 - Server Error | ExoHunter AI';
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-destructive/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Glitching satellite */}
      <motion.div
        className="absolute top-20 right-10 text-destructive/20"
        animate={{
          rotate: [0, 10, -10, 5, -5, 0],
          x: [0, 5, -5, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <Satellite className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>

      <div className="max-w-2xl w-full relative z-10">
        <Card className="bg-card/80 backdrop-blur-lg border-destructive/20">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              {/* Animated 500 with glitch effect */}
              <div className="relative">
                <motion.div
                  className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-destructive via-orange-500 to-destructive bg-clip-text text-transparent"
                  animate={{
                    opacity: [1, 0.8, 1, 0.9, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  500
                </motion.div>

                {/* Alert triangle */}
                <motion.div
                  className="absolute -top-4 -left-4 sm:-left-8 text-destructive"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                >
                  <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>

                {/* Glitching zap */}
                <motion.div
                  className="absolute top-8 right-4 sm:right-8 text-orange-500"
                  animate={{
                    opacity: [1, 0, 1, 0, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
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
                  Houston, We Have a Problem
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                  Our servers encountered a technical malfunction. Mission control is working to
                  restore the connection. Please try again in a moment.
                </p>
              </motion.div>

              {/* Error details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-destructive/10 border border-destructive/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-3 text-left">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Internal Server Error
                    </p>
                    <p className="text-xs text-muted-foreground">
                      The server is experiencing technical difficulties. If this persists, please
                      contact support.
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
                  onClick={handleRetry}
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retry
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary/30 hover:border-primary/50"
                >
                  <Link to="/">
                    <Home className="w-5 h-5" />
                    Go Home
                  </Link>
                </Button>
              </motion.div>

              {/* Support contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8 space-y-3"
              >
                <p className="text-sm text-muted-foreground">
                  Need immediate assistance?
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="text-primary hover:text-primary/80 gap-2"
                  >
                    <a href="mailto:aoneahsan@gmail.com">
                      <Mail className="w-4 h-4" />
                      Contact Support
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Technical details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-6 border-t border-border/50"
              >
                <details className="text-left">
                  <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Technical Details
                  </summary>
                  <div className="mt-3 p-3 bg-muted/30 rounded-md">
                    <code className="text-xs font-mono text-muted-foreground">
                      Error Code: 500 Internal Server Error
                      <br />
                      Timestamp: {new Date().toISOString()}
                      <br />
                      Request ID: {Math.random().toString(36).substring(2, 15)}
                    </code>
                  </div>
                </details>
              </motion.div>

              {/* Go back option */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="pt-4"
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

export default ServerError;
