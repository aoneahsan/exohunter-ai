/**
 * PageAdSlider Component
 * Page-level advertising slider that appears 10% visible above the fold
 * This component is permanent (not dismissible) and appears on every page
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useAdvertising } from '@/hooks/useAdvertising';
import { InlineAdSlider } from './AdSliderCompact';
import type { Advertisement, DisplayLocation } from '@/types/advertising';

interface PageAdSliderProps {
  className?: string;
  location?: DisplayLocation;
}

/**
 * Main PageAdSlider component
 * Shows as a slider that's slightly visible, encouraging scroll
 */
export const PageAdSlider: React.FC<PageAdSliderProps> = ({
  className,
  location = 'page_slider',
}) => {
  const {
    ads,
    isLoading,
    currentIndex,
    setCurrentIndex,
    nextSlide,
    prevSlide,
    trackImpression,
    trackCTAClick,
  } = useAdvertising({
    location,
    autoFetch: true,
    autoPlay: true,
    autoPlayInterval: 6000,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Auto-expand when user scrolls to it
  useEffect(() => {
    if (inView && !isExpanded) {
      setIsExpanded(true);
    }
  }, [inView, isExpanded]);

  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      trackCTAClick(ad);
    },
    [trackCTAClick]
  );

  const handleToggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Don't render if no ads or loading
  if (isLoading || ads.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      {/* Expand/Collapse toggle */}
      <motion.button
        onClick={handleToggleExpand}
        className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white text-xs transition-colors backdrop-blur-sm border border-b-0 border-purple-500/20 z-10"
        whileHover={{ y: -2 }}
      >
        <Sparkles size={12} className="text-purple-400" />
        <span>{isExpanded ? 'Hide' : 'Show'} Promotions</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp size={14} />
        </motion.div>
      </motion.button>

      {/* Slider container */}
      <motion.div
        initial={{ height: 40, opacity: 0.7 }}
        animate={{
          height: isExpanded ? 'auto' : 40,
          opacity: isExpanded ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div
          className={cn(
            'relative rounded-xl bg-gradient-to-r from-purple-900/20 via-slate-800/60 to-pink-900/20 border border-purple-500/20 backdrop-blur-sm',
            !isExpanded && 'cursor-pointer'
          )}
          onClick={!isExpanded ? handleToggleExpand : undefined}
        >
          {/* Teaser when collapsed */}
          {!isExpanded && (
            <div className="flex items-center justify-center gap-2 h-10 text-sm text-gray-400">
              <Sparkles size={14} className="text-purple-400" />
              <span>Discover our apps and tools</span>
              <ChevronUp size={14} />
            </div>
          )}

          {/* Full slider when expanded */}
          {isExpanded && (
            <InlineAdSlider
              ads={ads}
              currentIndex={currentIndex}
              onIndexChange={setCurrentIndex}
              onNext={nextSlide}
              onPrev={prevSlide}
              onCTAClick={handleCTAClick}
              onImpression={trackImpression}
              showBorder={false}
            />
          )}
        </div>
      </motion.div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </div>
  );
};

/**
 * Compact variant that's always visible inline
 */
interface CompactPageAdProps {
  className?: string;
}

export const CompactPageAd: React.FC<CompactPageAdProps> = ({ className }) => {
  const {
    ads,
    isLoading,
    currentIndex,
    setCurrentIndex,
    nextSlide,
    prevSlide,
    trackImpression,
    trackCTAClick,
  } = useAdvertising({
    location: 'page_slider',
    autoFetch: true,
    autoPlay: true,
    autoPlayInterval: 5000,
  });

  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      trackCTAClick(ad);
    },
    [trackCTAClick]
  );

  if (isLoading || ads.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      <InlineAdSlider
        ads={ads}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
        onNext={nextSlide}
        onPrev={prevSlide}
        onCTAClick={handleCTAClick}
        onImpression={trackImpression}
      />
    </div>
  );
};

export default PageAdSlider;
