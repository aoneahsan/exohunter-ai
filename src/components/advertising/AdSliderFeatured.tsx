/**
 * AdSliderFeatured Component
 * Large featured slider for post-update modals
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement } from '@/types/advertising';
import { AD_TYPE_LABELS } from '@/types/advertising';
import { AdSlider } from './AdSlider';
import { AdImage } from './AdImage';
import { AdCTA } from './AdCTA';

interface AdSliderFeaturedProps {
  ads: Advertisement[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onCTAClick?: (ad: Advertisement) => void;
  onImpression?: (ad: Advertisement) => void;
  className?: string;
  showBulletPoints?: boolean;
}

export const AdSliderFeatured: React.FC<AdSliderFeaturedProps> = ({
  ads,
  currentIndex,
  onIndexChange,
  onNext,
  onPrev,
  onCTAClick,
  onImpression,
  className,
  showBulletPoints = true,
}) => {
  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      onCTAClick?.(ad);
    },
    [onCTAClick]
  );

  const renderSlide = useCallback(
    (ad: Advertisement, index: number) => (
      <div className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt=""
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover opacity-30"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 min-h-[350px] sm:min-h-[300px]">
          {/* Image */}
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-purple-500/30 shadow-lg shadow-purple-500/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <AdImage
              src={ad.imageUrl || ad.localImagePath || ''}
              alt={ad.title}
              fallbackSrc={ad.localImagePath}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full bg-slate-700"
            />
          </motion.div>

          {/* Text content */}
          <div className="flex-1 text-center sm:text-left">
            {/* Type badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Sparkles size={14} />
              <span>{AD_TYPE_LABELS[ad.type]}</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {ad.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-gray-300 mb-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {ad.description}
            </motion.p>

            {/* Bullet points */}
            {showBulletPoints && ad.bulletPoints && ad.bulletPoints.length > 0 && (
              <motion.ul
                className="space-y-2 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {ad.bulletPoints.slice(0, 4).map((point, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + idx * 0.05 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-purple-400" />
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AdCTA
                ad={ad}
                variant="default"
                size="lg"
                onClick={() => handleCTAClick(ad)}
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
    ),
    [handleCTAClick, showBulletPoints]
  );

  if (ads.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden bg-slate-900 border border-purple-500/30',
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
          autoPlay: false, // User controls navigation in modal
          showDots: true,
          showArrows: ads.length > 1,
          loop: true,
          pauseOnHover: true,
        }}
      />

      {/* Slide counter */}
      {ads.length > 1 && (
        <div className="flex justify-center pb-4">
          <span className="text-sm text-gray-400">
            {currentIndex + 1} / {ads.length}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Mini featured variant for smaller spaces
 */
interface AdSliderFeaturedMiniProps extends Omit<AdSliderFeaturedProps, 'showBulletPoints'> {}

export const AdSliderFeaturedMini: React.FC<AdSliderFeaturedMiniProps> = ({
  ads,
  currentIndex,
  onIndexChange,
  onNext,
  onPrev,
  onCTAClick,
  onImpression,
  className,
}) => {
  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      onCTAClick?.(ad);
    },
    [onCTAClick]
  );

  const renderSlide = useCallback(
    (ad: Advertisement) => (
      <div className="relative flex items-center gap-5 p-5 min-h-[180px]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-pink-900/30" />

        {/* Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-purple-500/30">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt={ad.title}
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full bg-slate-700"
          />
        </div>

        {/* Content */}
        <div className="relative flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-purple-400 mb-1">
            <Sparkles size={12} />
            <span>{AD_TYPE_LABELS[ad.type]}</span>
          </div>
          <h4 className="text-lg font-bold text-white mb-1 truncate">{ad.title}</h4>
          <p className="text-sm text-gray-400 line-clamp-2 mb-3">{ad.description}</p>
          <AdCTA
            ad={ad}
            variant="outline"
            size="sm"
            onClick={() => handleCTAClick(ad)}
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
        'rounded-xl overflow-hidden bg-slate-800/60 border border-purple-500/20 backdrop-blur-sm',
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
          showDots: true,
          showArrows: false,
          loop: true,
          pauseOnHover: true,
        }}
      />
    </div>
  );
};

export default AdSliderFeatured;
