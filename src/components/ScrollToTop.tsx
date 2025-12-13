import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls to top of page when navigating to a new route
 * Skips scrolling when navigating to hash fragments (section anchors)
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash (section anchor)
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}
