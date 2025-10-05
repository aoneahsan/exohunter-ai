import { useState, useEffect } from 'react';
import { Bell, X, CheckCircle } from 'lucide-react';
import { isNotificationEnabled, requestNotificationPermission } from '@/services/oneSignal';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    const enabled = await isNotificationEnabled();
    setIsEnabled(enabled);
    
    // Show banner if notifications are not enabled and user hasn't dismissed it
    const dismissed = localStorage.getItem('notificationBannerDismissed');
    if (!enabled && !dismissed) {
      setShowBanner(true);
    }
  };

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    try {
      const granted = await requestNotificationPermission();
      if (granted) {
        setIsEnabled(true);
        setShowBanner(false);
        localStorage.removeItem('notificationBannerDismissed');
        
        // Optional: Show a success message (you can add a toast here if needed)
        console.log('Notifications enabled successfully!');
      } else {
        // User denied permission or something went wrong
        console.log('Notification permission was denied');
        // Still hide the banner since user made a choice
        setShowBanner(false);
        localStorage.setItem('notificationBannerDismissed', 'true');
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
      // Hide banner on error as well to avoid stuck state
      setShowBanner(false);
      localStorage.setItem('notificationBannerDismissed', 'true');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notificationBannerDismissed', 'true');
  };

  if (isEnabled || !showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-2xl p-4 sm:p-6">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close notification banner"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 bg-white/20 p-2 sm:p-3 rounded-lg">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <div className="flex-1 pr-6">
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">
                  Stay Updated with Discoveries
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mb-3 sm:mb-4">
                  Get instant notifications about new exoplanet discoveries, mission updates, and important space events.
                </p>
                
                <button
                  onClick={handleEnableNotifications}
                  disabled={isLoading}
                  className="bg-white text-purple-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-purple-600" />
                      Enabling...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Enable Notifications
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};