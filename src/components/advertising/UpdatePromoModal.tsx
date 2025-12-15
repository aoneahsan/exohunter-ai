/**
 * UpdatePromoModal Component
 * Modal that shows after app updates with featured product slider
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, PartyPopper } from 'lucide-react';
import { useUpdatePromoModal } from '@/hooks/useAdvertising';
import { analytics } from '@/services/analytics';
import { cn } from '@/lib/utils';
import { AdSliderFeatured } from './AdSliderFeatured';
import { Button } from '@/components/ui/button';
import type { Advertisement } from '@/types/advertising';

// Version key for localStorage
const VERSION_KEY = 'exoh_last_seen_version';
const CURRENT_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

interface UpdatePromoModalProps {
  className?: string;
  forceShow?: boolean; // For testing
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30,
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
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.2,
    },
  },
};

export const UpdatePromoModal: React.FC<UpdatePromoModalProps> = ({
  className,
  forceShow = false,
}) => {
  const {
    modalAds,
    isOpen,
    open,
    close,
    fetchModalAds,
    markModalPromosSeen,
  } = useUpdatePromoModal();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCheckedVersion, setHasCheckedVersion] = useState(false);

  // Check version on mount
  useEffect(() => {
    if (hasCheckedVersion) return;

    const checkVersion = async () => {
      const storedVersion = localStorage.getItem(VERSION_KEY);

      // Force show for testing
      if (forceShow) {
        await fetchModalAds();
        open();
        setHasCheckedVersion(true);
        return;
      }

      // Check if new version
      if (storedVersion !== CURRENT_VERSION) {
        // Fetch ads for modal
        await fetchModalAds();

        // Small delay to ensure ads are loaded
        setTimeout(() => {
          if (modalAds.length > 0) {
            open();
            analytics.track('ad_modal_opened', {
              modal_type: 'update_promo',
              version: CURRENT_VERSION,
              previous_version: storedVersion || 'none',
            });
          }
        }, 500);
      }

      setHasCheckedVersion(true);
    };

    checkVersion();
  }, [forceShow, fetchModalAds, modalAds.length, open, hasCheckedVersion]);

  // Handle close
  const handleClose = useCallback(async () => {
    // Mark all promos as seen
    await markModalPromosSeen(CURRENT_VERSION);

    // Update stored version
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);

    // Track close
    analytics.track('ad_modal_closed', {
      modal_type: 'update_promo',
      slides_viewed: currentIndex + 1,
      total_slides: modalAds.length,
    });

    close();
  }, [markModalPromosSeen, close, currentIndex, modalAds.length]);

  // Handle CTA click
  const handleCTAClick = useCallback(
    (ad: Advertisement) => {
      analytics.track('ad_cta_clicked', {
        ad_id: ad.id,
        ad_title: ad.title,
        modal_type: 'update_promo',
        slide_index: currentIndex,
      });
    },
    [currentIndex]
  );

  // Handle impression
  const handleImpression = useCallback(
    (ad: Advertisement) => {
      analytics.track('ad_impression', {
        ad_id: ad.id,
        ad_title: ad.title,
        display_location: 'modal_slider',
      });
    },
    []
  );

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

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

  // Don't render if no ads
  if (modalAds.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            'fixed inset-0 z-[100] flex items-center justify-center p-4',
            className
          )}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-gray-400 hover:text-white flex items-center justify-center transition-all border border-slate-600/50 backdrop-blur-sm z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close"
            >
              <X size={18} />
            </motion.button>

            {/* Header */}
            <div className="mb-4 text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <PartyPopper className="text-yellow-400" size={18} />
                <span className="text-white font-medium">What's New!</span>
                <Sparkles className="text-purple-400" size={16} />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover Our Apps & Tools
              </motion.h2>
              <motion.p
                className="text-gray-400 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Check out these amazing products from our team
              </motion.p>
            </div>

            {/* Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AdSliderFeatured
                ads={modalAds}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
                onCTAClick={handleCTAClick}
                onImpression={handleImpression}
                showBulletPoints={true}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              className="mt-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleClose}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Maybe Later
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePromoModal;
