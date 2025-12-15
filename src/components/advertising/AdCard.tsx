/**
 * AdCard Component
 * Card-style advertisement display with various layouts
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement, AdUIVariant } from '@/types/advertising';
import { AD_TYPE_LABELS } from '@/types/advertising';
import { AdImage } from './AdImage';
import { AdCTA } from './AdCTA';
import { AdDismissButton } from './AdDismissButton';

interface AdCardProps {
  ad: Advertisement;
  variant?: AdUIVariant;
  className?: string;
  onCTAClick?: () => void;
  onDismiss?: () => void;
  onImpression?: () => void;
  showDismiss?: boolean;
  showTypeLabel?: boolean;
}

export const AdCard: React.FC<AdCardProps> = ({
  ad,
  variant = 'standard',
  className,
  onCTAClick,
  onDismiss,
  onImpression,
  showDismiss = true,
  showTypeLabel = true,
}) => {
  const impressionTrackedRef = useRef(false);

  // Track impression on mount
  useEffect(() => {
    if (!impressionTrackedRef.current && onImpression) {
      impressionTrackedRef.current = true;
      onImpression();
    }
  }, [onImpression]);

  const handleCardClick = useCallback(() => {
    onCTAClick?.();
    if (ad.ctaUrl) {
      window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
    }
  }, [ad.ctaUrl, onCTAClick]);

  // Render different variants
  if (variant === 'compact') {
    return (
      <motion.div
        className={cn(
          'relative flex items-center gap-3 p-3 bg-gradient-to-r from-slate-800/80 to-slate-800/40 rounded-xl border border-purple-500/20 hover:border-purple-500/40 cursor-pointer transition-all backdrop-blur-sm',
          className
        )}
        onClick={handleCardClick}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Image */}
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt={ad.title}
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white truncate">{ad.title}</h4>
          <p className="text-xs text-gray-400 truncate">{ad.description}</p>
        </div>

        {/* CTA */}
        <AdCTA ad={ad} variant="compact" size="sm" onClick={onCTAClick} showIcon={false} />

        {/* Dismiss */}
        {showDismiss && ad.isDismissible && onDismiss && (
          <AdDismissButton onDismiss={onDismiss} variant="subtle" size="sm" />
        )}
      </motion.div>
    );
  }

  if (variant === 'banner') {
    return (
      <motion.div
        className={cn(
          'relative flex items-center gap-4 p-4 bg-gradient-to-r from-purple-900/40 via-slate-800/80 to-pink-900/40 rounded-xl border border-purple-500/30 cursor-pointer transition-all',
          className
        )}
        onClick={handleCardClick}
        whileHover={{ y: -2 }}
      >
        {/* Promoted label */}
        {showTypeLabel && (
          <div className="absolute top-2 left-2 flex items-center gap-1 text-xs text-purple-400">
            <Sparkles size={10} />
            <span>Promoted</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 pt-4">
          <h4 className="text-base font-semibold text-white">{ad.title}</h4>
          <p className="text-sm text-gray-300 mt-1 line-clamp-1">{ad.description}</p>
        </div>

        {/* CTA */}
        <AdCTA ad={ad} variant="default" size="sm" onClick={onCTAClick} />

        {/* Dismiss */}
        {showDismiss && ad.isDismissible && onDismiss && (
          <AdDismissButton
            onDismiss={onDismiss}
            variant="subtle"
            size="sm"
            className="absolute top-2 right-2"
          />
        )}
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-purple-900/30 to-slate-800 border border-purple-500/30',
          className
        )}
        whileHover={{ scale: 1.01 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

        {/* Image */}
        <div className="relative h-40 w-full">
          <AdImage
            src={ad.imageUrl || ad.localImagePath || ''}
            alt={ad.title}
            fallbackSrc={ad.localImagePath}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative p-5">
          {/* Type label */}
          {showTypeLabel && (
            <div className="flex items-center gap-1.5 text-xs text-purple-400 mb-2">
              <Sparkles size={12} />
              <span>{AD_TYPE_LABELS[ad.type]}</span>
            </div>
          )}

          <h3 className="text-xl font-bold text-white mb-2">{ad.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{ad.description}</p>

          {/* Bullet points */}
          {ad.bulletPoints && ad.bulletPoints.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {ad.bulletPoints.slice(0, 3).map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <AdCTA ad={ad} variant="default" size="md" onClick={onCTAClick} className="w-full" />
        </div>

        {/* Dismiss */}
        {showDismiss && ad.isDismissible && onDismiss && (
          <AdDismissButton
            onDismiss={onDismiss}
            variant="default"
            size="md"
            className="absolute top-3 right-3"
          />
        )}
      </motion.div>
    );
  }

  // Default/Standard variant
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl bg-slate-800/60 border border-purple-500/20 hover:border-purple-500/40 transition-all backdrop-blur-sm cursor-pointer',
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -3 }}
    >
      {/* Promoted label */}
      {showTypeLabel && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/80 backdrop-blur-sm text-xs text-purple-400 border border-purple-500/30">
          <Sparkles size={10} />
          <span>Promoted</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-32 w-full">
        <AdImage
          src={ad.imageUrl || ad.localImagePath || ''}
          alt={ad.title}
          fallbackSrc={ad.localImagePath}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="text-base font-semibold text-white mb-1">{ad.title}</h4>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{ad.description}</p>
        <AdCTA ad={ad} variant="outline" size="sm" onClick={onCTAClick} />
      </div>

      {/* Dismiss */}
      {showDismiss && ad.isDismissible && onDismiss && (
        <AdDismissButton
          onDismiss={onDismiss}
          variant="subtle"
          size="sm"
          className="absolute top-3 right-3"
        />
      )}
    </motion.div>
  );
};

export default AdCard;
