// src/utils/analytics.js
/**
 * Helper functions for Google Analytics tracking
 */

// Track page views in Google Analytics for SPAs
export const trackPageView = (path) => {
  if (window.gtag) {
    // Skip on localhost to keep GA clean (optional)
    if (window.location.hostname === 'localhost') return;
    
    // Send a virtual page_view to GA4 with all required parameters
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: path,
      page_location: window.location.origin + path,
    });
  }
};

// Track custom events in Google Analytics
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// React Router hook for tracking page views
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useGAPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);
};
