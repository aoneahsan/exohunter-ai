/**
 * AdModal Component
 * Full modal advertisement for one-time promos
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Advertisement } from '@/types/advertising';
import { AD_TYPE_LABELS } from '@/types/advertising';
import { AdImage } from './AdImage';
import { AdCTA } from './AdCTA';
import { ModalCloseButton } from './AdDismissButton';

interface AdModalProps {
  ad: Advertisement | null;
  isOpen: boolean;
  onClose: () => void;
  onCTAClick?: () => void;
  onImpression?: () => void;
  variant?: 'default' | 'featured' | 'minimal';
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

export const AdModal: React.FC<AdModalProps> = ({
  ad,
  isOpen,
  onClose,
  onCTAClick,
  onImpression,
  variant = 'default',
}) => {
  const impressionTrackedRef = useRef(false);

  // Track impression when modal opens
  useEffect(() => {
    if (isOpen && ad && !impressionTrackedRef.current && onImpression) {
      impressionTrackedRef.current = true;
      onImpression();
    }
  }, [isOpen, ad, onImpression]);

  // Reset impression tracking when ad changes
  useEffect(() => {
    impressionTrackedRef.current = false;
  }, [ad?.id]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!ad) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className={cn(
              'relative w-full max-w-md bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden',
              variant === 'featured' && 'max-w-lg'
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <ModalCloseButton onClose={onClose} />

            {/* Image section */}
            <div className="relative h-48 w-full overflow-hidden">
              <AdImage
                src={ad.imageUrl || ad.localImagePath || ''}
                alt={ad.title}
                fallbackSrc={ad.localImagePath}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />

              {/* Type badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm text-sm text-purple-400 border border-purple-500/30">
                <Sparkles size={14} />
                <span>{AD_TYPE_LABELS[ad.type]}</span>
              </div>
            </div>

            {/* Content section */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{ad.title}</h2>
              <p className="text-gray-300 mb-4">{ad.description}</p>

              {/* Bullet points */}
              {ad.bulletPoints && ad.bulletPoints.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {ad.bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-purple-400" />
                      </span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <AdCTA
                ad={ad}
                variant="default"
                size="lg"
                onClick={onCTAClick}
                className="w-full justify-center"
              />

              {/* Skip text */}
              <p className="text-center text-gray-500 text-xs mt-4">
                Press Escape or click outside to close
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdModal;
