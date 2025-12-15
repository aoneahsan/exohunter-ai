/**
 * AdDismissButton Component
 * Dismiss/close button for advertisements
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdDismissButtonProps {
  onDismiss: () => void;
  variant?: 'default' | 'subtle' | 'prominent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

export const AdDismissButton: React.FC<AdDismissButtonProps> = ({
  onDismiss,
  variant = 'default',
  size = 'md',
  className,
  ariaLabel = 'Dismiss advertisement',
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss();
    },
    [onDismiss]
  );

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  const variantClasses = {
    default:
      'bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white border border-slate-600/50',
    subtle:
      'bg-transparent hover:bg-slate-800/50 text-gray-500 hover:text-gray-300',
    prominent:
      'bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 border border-red-500/30',
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      <X size={iconSizes[size]} />
    </motion.button>
  );
};

/**
 * Close button specifically for modals
 */
interface ModalCloseButtonProps {
  onClose: () => void;
  className?: string;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClose,
  className,
}) => {
  return (
    <motion.button
      onClick={onClose}
      className={cn(
        'absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200 border border-slate-600/50 backdrop-blur-sm z-10',
        className
      )}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Close"
    >
      <X size={16} />
    </motion.button>
  );
};

export default AdDismissButton;
