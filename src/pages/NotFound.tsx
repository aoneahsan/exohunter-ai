import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Rocket, Star, Moon, Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - Lost in Space | ExoHunter AI';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
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

      {/* Floating planets */}
      <motion.div
        className="absolute top-20 left-10 text-purple-500 opacity-20"
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
        <Moon className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-accent opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Orbit className="w-20 h-20 sm:w-28 sm:h-28" />
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
              {/* Animated 404 with space theme */}
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
                  404
                </motion.div>

                {/* Floating rocket */}
                <motion.div
                  className="absolute -top-4 -right-4 sm:-right-8 text-primary"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>

                {/* Floating stars */}
                <motion.div
                  className="absolute top-8 left-4 sm:left-8 text-accent"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
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
                  Lost in Space
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                  The page you're looking for seems to have drifted off into the cosmic void.
                  It might have been pulled into a black hole!
                </p>
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
                    Return Home
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-primary/30 hover:border-primary/50"
                >
                  <Link to="/explorer">
                    <Search className="w-5 h-5" />
                    Explore Exoplanets
                  </Link>
                </Button>
              </motion.div>

              {/* Helpful links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-8 space-y-3"
              >
                <p className="text-sm text-muted-foreground">
                  Popular destinations:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                  <Link
                    to="/explorer"
                    className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Explorer
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    to="/discoveries"
                    className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Discoveries
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    to="/learn"
                    className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    Learn
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    to="/about"
                    className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
                  >
                    About
                  </Link>
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

export default NotFound;
