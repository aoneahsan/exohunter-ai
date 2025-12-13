import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

const loadingTips = [
  "Did you know? ExoHunter AI has analyzed over 5,000 confirmed exoplanets",
  "Tip: Use the 3D Explorer to visualize entire planetary systems",
  "Fun fact: The nearest known exoplanet is only 4.2 light-years away",
  "Tip: Filter discoveries by habitable zone to find Earth-like planets",
  "Did you know? Some exoplanets orbit multiple stars at once",
  "Tip: Check the Analyzer to predict exoplanet characteristics",
  "Fun fact: We've discovered planets made entirely of diamond",
  "Tip: Join the community to share your discoveries",
  "Did you know? The largest known exoplanet is 13 times Jupiter's mass",
  "Tip: Track your progress on the Dashboard",
  "Fun fact: Some exoplanets have glass rain and supersonic winds",
  "Tip: Explore different detection methods in the Learn section",
];

interface FullPageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function FullPageLoader({ isLoading, onComplete }: FullPageLoaderProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Rotate tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 3000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && onComplete) {
      // When loading completes, call onComplete after exit animation
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        >
          <div className="text-center max-w-md px-6">
            {/* Animated Logo */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <Rocket className="w-20 h-20 mx-auto text-purple-400" />
            </motion.div>

            {/* App Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2"
            >
              ExoHunter AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-purple-300 mb-8"
            >
              Exploring the Universe, One Planet at a Time
            </motion.p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            </div>

            {/* Rotating Tips */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 text-sm italic"
                >
                  {loadingTips[currentTip]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
