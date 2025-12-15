/**
 * AdBanner Component
 * Slim banner advertisement for header/footer areas
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement } from '@/types/advertising';
import { AD_TYPE_LABELS } from '@/types/advertising';
import { AdCTA, AdCTALink } from './AdCTA';

interface AdBannerProps {
  ad: Advertisement;
  position?: 'top' | 'bottom' | 'inline';
  variant?: 'default' | 'gradient' | 'minimal' | 'prominent';
  className?: string;
  onCTAClick?: () => void;
  onDismiss?: () => void;
  onImpression?: () => void;
  showDismiss?: boolean;
  isVisible?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  ad,
  position = 'inline',
  variant = 'default',
  className,
  onCTAClick,
  onDismiss,
  onImpression,
  showDismiss = true,
  isVisible = true,
}) => {
  const impressionTrackedRef = useRef(false);

  // Track impression on mount
  useEffect(() => {
    if (!impressionTrackedRef.current && onImpression && isVisible) {
      impressionTrackedRef.current = true;
      onImpression();
    }
  }, [onImpression, isVisible]);

  const handleBannerClick = useCallback(() => {
    onCTAClick?.();
    if (ad.ctaUrl) {
      window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
    }
  }, [ad.ctaUrl, onCTAClick]);

  const positionClasses = {
    top: 'fixed top-0 left-0 right-0 z-50',
    bottom: 'fixed bottom-0 left-0 right-0 z-50',
    inline: 'relative',
  };

  const variantClasses = {
    default: 'bg-slate-800/90 border-purple-500/30',
    gradient:
      'bg-gradient-to-r from-purple-900/60 via-slate-800/90 to-pink-900/60 border-purple-500/40',
    minimal: 'bg-slate-900/80 border-slate-700',
    prominent:
      'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/50',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex items-center justify-between gap-4 px-4 py-3 border backdrop-blur-sm',
            positionClasses[position],
            variantClasses[variant],
            className
          )}
        >
          {/* Left side - Icon + Content */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={handleBannerClick}
          >
            {/* Promoted badge */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex-shrink-0">
              <Sparkles size={10} />
              <span>Promoted</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white text-sm truncate">
                  {ad.title}
                </span>
                <span className="hidden md:inline text-gray-400 text-sm">—</span>
                <span className="hidden md:inline text-gray-400 text-sm truncate">
                  {ad.description}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - CTA + Dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* CTA */}
            <div className="hidden sm:block">
              <AdCTA ad={ad} variant="compact" size="sm" onClick={onCTAClick} />
            </div>
            <div className="sm:hidden">
              <AdCTALink ad={ad} onClick={onCTAClick} />
            </div>

            {/* Dismiss */}
            {showDismiss && ad.isDismissible && onDismiss && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                className="w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-600 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Dismiss"
              >
                <X size={12} />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Sticky banner that appears at bottom of screen
 */
interface StickyAdBannerProps extends Omit<AdBannerProps, 'position'> {
  offset?: number;
}

export const StickyAdBanner: React.FC<StickyAdBannerProps> = ({
  offset = 0,
  ...props
}) => {
  return (
    <AdBanner
      {...props}
      position="bottom"
      className={cn(props.className)}
      variant="gradient"
    />
  );
};

export default AdBanner;
