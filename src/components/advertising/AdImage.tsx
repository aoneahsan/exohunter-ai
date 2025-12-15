/**
 * AdImage Component
 * Image component with loading state and fallback for advertisements
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ImageOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const AdImage: React.FC<AdImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  containerClassName,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [fallbackSrc, currentSrc, onError]);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-800/50 rounded-lg',
        containerClassName
      )}
    >
      {/* Loading state */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/50 text-gray-400">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <motion.img
          src={currentSrc}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default AdImage;
