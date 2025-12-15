/**
 * AdSlider Component
 * Base slider component for advertisements with navigation and auto-play
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement, AdSliderConfig } from '@/types/advertising';
import { DEFAULT_AD_CONFIG } from '@/types/advertising';

interface AdSliderProps {
  ads: Advertisement[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  renderSlide: (ad: Advertisement, index: number) => React.ReactNode;
  config?: Partial<AdSliderConfig>;
  className?: string;
  slideClassName?: string;
  showNavigation?: boolean;
  onImpression?: (ad: Advertisement) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const AdSlider: React.FC<AdSliderProps> = ({
  ads,
  currentIndex,
  onIndexChange,
  onNext,
  onPrev,
  renderSlide,
  config = {},
  className,
  slideClassName,
  showNavigation = true,
  onImpression,
}) => {
  const {
    autoPlay = true,
    autoPlayInterval = DEFAULT_AD_CONFIG.autoPlayInterval,
    showDots = true,
    showArrows = true,
    loop = true,
    pauseOnHover = true,
  } = config;

  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const impressionTrackedRef = useRef<Set<number>>(new Set());

  // Track impression for current slide
  useEffect(() => {
    if (
      ads.length > 0 &&
      onImpression &&
      !impressionTrackedRef.current.has(currentIndex)
    ) {
      impressionTrackedRef.current.add(currentIndex);
      onImpression(ads[currentIndex]);
    }
  }, [currentIndex, ads, onImpression]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || ads.length <= 1 || isPaused) {
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, ads.length, isPaused, currentIndex]);

  const handleNext = useCallback(() => {
    setDirection(1);
    const nextIndex = loop
      ? (currentIndex + 1) % ads.length
      : Math.min(currentIndex + 1, ads.length - 1);
    onIndexChange(nextIndex);
    onNext?.();
  }, [currentIndex, ads.length, loop, onIndexChange, onNext]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    const prevIndex = loop
      ? currentIndex === 0
        ? ads.length - 1
        : currentIndex - 1
      : Math.max(currentIndex - 1, 0);
    onIndexChange(prevIndex);
    onPrev?.();
  }, [currentIndex, ads.length, loop, onIndexChange, onPrev]);

  const handleDotClick = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      onIndexChange(index);
    },
    [currentIndex, onIndexChange]
  );

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Handle touch events for swipe
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartRef.current - touchEndRef.current;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  if (ads.length === 0) {
    return null;
  }

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={cn('w-full', slideClassName)}
          >
            {renderSlide(ads[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {showNavigation && ads.length > 1 && (
        <>
          {/* Arrow buttons */}
          {showArrows && (
            <>
              <motion.button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center backdrop-blur-sm border border-slate-600/50 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center backdrop-blur-sm border border-slate-600/50 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </motion.button>
            </>
          )}

          {/* Dot indicators */}
          {showDots && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {ads.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    index === currentIndex
                      ? 'bg-purple-400 w-4'
                      : 'bg-slate-600 hover:bg-slate-500'
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Progress indicator for auto-play */}
      {autoPlay && ads.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-700">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: 'linear',
              repeat: Infinity,
            }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
};

export default AdSlider;
