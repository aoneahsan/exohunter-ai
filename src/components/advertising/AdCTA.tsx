/**
 * AdCTA Component
 * Call-to-action button for advertisements with analytics tracking
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Advertisement, AdvertisementType } from '@/types/advertising';

interface AdCTAProps {
  ad: Advertisement;
  variant?: 'default' | 'outline' | 'ghost' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  showIcon?: boolean;
}

/**
 * Get appropriate icon based on advertisement type
 */
function getIconForType(type: AdvertisementType): React.ElementType {
  switch (type) {
    case 'browser_extension':
    case 'mobile_app':
      return Download;
    case 'youtube_video':
      return Play;
    case 'web_app':
    case 'social_media':
    case 'event_offer':
    default:
      return ExternalLink;
  }
}

export const AdCTA: React.FC<AdCTAProps> = ({
  ad,
  variant = 'default',
  size = 'md',
  className,
  onClick,
  showIcon = true,
}) => {
  const Icon = getIconForType(ad.type);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.();

      // Open URL in new tab
      if (ad.ctaUrl) {
        window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
      }
    },
    [ad.ctaUrl, onClick]
  );

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const variantClasses = {
    default:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0',
    outline:
      'bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300',
    ghost: 'bg-transparent text-purple-400 hover:bg-purple-500/10 hover:text-purple-300',
    compact:
      'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleClick}
        className={cn(
          'font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        <span>{ad.ctaText}</span>
        {showIcon && <Icon size={iconSizes[size]} />}
      </Button>
    </motion.div>
  );
};

/**
 * Compact text link CTA
 */
interface AdCTALinkProps {
  ad: Advertisement;
  className?: string;
  onClick?: () => void;
}

export const AdCTALink: React.FC<AdCTALinkProps> = ({ ad, className, onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.();
      if (ad.ctaUrl) {
        window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
      }
    },
    [ad.ctaUrl, onClick]
  );

  return (
    <motion.a
      href={ad.ctaUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors',
        className
      )}
      whileHover={{ x: 3 }}
    >
      {ad.ctaText}
      <ChevronRight size={14} />
    </motion.a>
  );
};

export default AdCTA;
