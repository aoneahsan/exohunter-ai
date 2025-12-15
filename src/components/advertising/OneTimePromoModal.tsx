/**
 * OneTimePromoModal Component
 * Modal for one-time promotional advertisements
 * Shows ads that user hasn't seen before, with dismissal cooldown
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import React, { useEffect, useCallback } from 'react';
import { useOneTimePromoModal } from '@/hooks/useAdvertising';
import { analytics } from '@/services/analytics';
import { AdModal } from './AdModal';

interface OneTimePromoModalProps {
  /**
   * Delay before showing the modal (in milliseconds)
   * This prevents the modal from showing immediately on page load
   */
  showDelay?: number;

  /**
   * Whether to auto-show the first unseen promo
   */
  autoShow?: boolean;
}

export const OneTimePromoModal: React.FC<OneTimePromoModalProps> = ({
  showDelay = 5000, // 5 seconds default delay
  autoShow = true,
}) => {
  const {
    oneTimeAds,
    isOpen,
    currentAd,
    fetchOneTimeAds,
    showNextPromo,
    dismissAndClose,
    close,
  } = useOneTimePromoModal();

  // Fetch one-time ads on mount
  useEffect(() => {
    fetchOneTimeAds();
  }, [fetchOneTimeAds]);

  // Auto-show first unseen promo after delay
  useEffect(() => {
    if (!autoShow || oneTimeAds.length === 0 || isOpen) return;

    const timer = setTimeout(() => {
      showNextPromo();

      if (oneTimeAds[0]) {
        analytics.track('ad_modal_opened', {
          modal_type: 'one_time_promo',
          ad_id: oneTimeAds[0].id,
          ad_title: oneTimeAds[0].title,
        });
      }
    }, showDelay);

    return () => clearTimeout(timer);
  }, [autoShow, oneTimeAds, showDelay, showNextPromo, isOpen]);

  // Handle close (dismiss and don't show again for cooldown period)
  const handleClose = useCallback(() => {
    if (currentAd) {
      analytics.track('ad_modal_closed', {
        modal_type: 'one_time_promo',
        ad_id: currentAd.id,
        ad_title: currentAd.title,
        action: 'dismiss',
      });
    }
    dismissAndClose();
  }, [currentAd, dismissAndClose]);

  // Handle CTA click
  const handleCTAClick = useCallback(() => {
    if (currentAd) {
      analytics.track('ad_cta_clicked', {
        ad_id: currentAd.id,
        ad_title: currentAd.title,
        modal_type: 'one_time_promo',
        cta_text: currentAd.ctaText,
        cta_url: currentAd.ctaUrl,
      });
    }
  }, [currentAd]);

  // Handle impression
  const handleImpression = useCallback(() => {
    if (currentAd) {
      analytics.track('ad_impression', {
        ad_id: currentAd.id,
        ad_title: currentAd.title,
        display_location: 'one_time_modal',
      });
    }
  }, [currentAd]);

  return (
    <AdModal
      ad={currentAd}
      isOpen={isOpen}
      onClose={handleClose}
      onCTAClick={handleCTAClick}
      onImpression={handleImpression}
    />
  );
};

/**
 * Hook to manually trigger one-time promo modal
 */
export function useShowOneTimePromo() {
  const { oneTimeAds, showNextPromo, fetchOneTimeAds } = useOneTimePromoModal();

  const show = useCallback(async () => {
    await fetchOneTimeAds();
    if (oneTimeAds.length > 0) {
      showNextPromo();
    }
  }, [fetchOneTimeAds, oneTimeAds.length, showNextPromo]);

  return { show, hasPromos: oneTimeAds.length > 0 };
}

export default OneTimePromoModal;
