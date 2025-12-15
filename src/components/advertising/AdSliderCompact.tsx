/**
 * AdSliderCompact Component
 * Compact slider for page-level advertising (10% visible above fold)
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement } from '@/types/advertising';
import { AD_TYPE_LABELS } from '@/types/advertising';
import { AdSlider } from './AdSlider';
import { AdImage } from './AdImage';
import { AdCTA, AdCTALink } from './AdCTA';

interface AdSliderCompactProps {
  ads: Advertisement[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onCTAClick?: (ad: Advertisement) => void;
  onImpression?: (ad: Advertisement) => void;
  className?: string;
  visiblePercentage?: number;
}

export const AdSliderCompact: React.FC<AdSliderCompactProps> = ({
  ads,
  currentIndex,
  onIndexChange,
  onNext,
  onPrev,
  onCTAClick,
  onImpression,
  className,
  visiblePercentage = 10,
}) => {
  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      onCTAClick?.(ad);
    },
    [onCTAClick]
  );

  const renderSlide = useCallback(
    (ad: Advertisement) => (
      <div className="flex items-center gap-4 p-4 h-full">
        {/* Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-purple-500/20">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt={ad.title}
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full bg-slate-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Type badge */}
          <div className="flex items-center gap-1 text-xs text-purple-400 mb-1">
            <Sparkles size={10} />
            <span>{AD_TYPE_LABELS[ad.type]}</span>
          </div>

          <h4 className="text-base sm:text-lg font-semibold text-white truncate">
            {ad.title}
          </h4>
          <p className="text-sm text-gray-400 line-clamp-1 hidden sm:block">
            {ad.description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <div className="hidden sm:block">
            <AdCTA
              ad={ad}
              variant="default"
              size="sm"
              onClick={() => handleCTAClick(ad)}
            />
          </div>
          <div className="sm:hidden">
            <AdCTALink ad={ad} onClick={() => handleCTAClick(ad)} />
          </div>
        </div>
      </div>
    ),
    [handleCTAClick]
  );

  if (ads.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative overflow-visible',
        className
      )}
      style={{
        // Position so only visiblePercentage% is showing
        marginTop: `-${100 - visiblePercentage}%`,
      }}
    >
      {/* Teaser indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 flex flex-col items-center text-gray-400 z-10">
        <span className="text-xs mb-1">Scroll for more</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>

      {/* Slider container */}
      <div className="relative rounded-t-2xl bg-gradient-to-b from-purple-900/40 via-slate-800/90 to-slate-800 border border-purple-500/20 border-b-0 backdrop-blur-sm shadow-[0_-10px_40px_rgba(139,92,246,0.15)]">
        <AdSlider
          ads={ads}
          currentIndex={currentIndex}
          onIndexChange={onIndexChange}
          onNext={onNext}
          onPrev={onPrev}
          renderSlide={renderSlide}
          onImpression={onImpression}
          config={{
            autoPlay: true,
            autoPlayInterval: 6000,
            showDots: true,
            showArrows: ads.length > 1,
            loop: true,
            pauseOnHover: true,
          }}
          className="min-h-[100px] sm:min-h-[120px]"
        />
      </div>
    </div>
  );
};

/**
 * Variant that shows inline (not positioned with margin)
 */
interface InlineAdSliderProps extends Omit<AdSliderCompactProps, 'visiblePercentage'> {
  showBorder?: boolean;
}

export const InlineAdSlider: React.FC<InlineAdSliderProps> = ({
  ads,
  currentIndex,
  onIndexChange,
  onNext,
  onPrev,
  onCTAClick,
  onImpression,
  className,
  showBorder = true,
}) => {
  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      onCTAClick?.(ad);
    },
    [onCTAClick]
  );

  const renderSlide = useCallback(
    (ad: Advertisement) => (
      <div className="flex items-center gap-4 p-4 h-full">
        {/* Image */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-purple-500/20">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt={ad.title}
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full bg-slate-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-xs text-purple-400 mb-0.5">
            <Sparkles size={10} />
            <span>Promoted</span>
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-white truncate">
            {ad.title}
          </h4>
          <p className="text-xs text-gray-400 truncate">{ad.description}</p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <AdCTA
            ad={ad}
            variant="compact"
            size="sm"
            onClick={() => handleCTAClick(ad)}
            showIcon={false}
          />
        </div>
      </div>
    ),
    [handleCTAClick]
  );

  if (ads.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'rounded-xl bg-gradient-to-r from-purple-900/30 via-slate-800/80 to-pink-900/30 backdrop-blur-sm',
        showBorder && 'border border-purple-500/20',
        className
      )}
    >
      <AdSlider
        ads={ads}
        currentIndex={currentIndex}
        onIndexChange={onIndexChange}
        onNext={onNext}
        onPrev={onPrev}
        renderSlide={renderSlide}
        onImpression={onImpression}
        config={{
          autoPlay: true,
          autoPlayInterval: 5000,
          showDots: ads.length > 1,
          showArrows: false,
          loop: true,
          pauseOnHover: true,
        }}
        className="min-h-[80px]"
      />
    </div>
  );
};

export default AdSliderCompact;
