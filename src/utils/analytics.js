// src/utils/analytics.js
/**
 * Helper functions for Google Analytics tracking
 */

// Track page views in Google Analytics
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', 'G-YQ8LPFFP43', {
      page_path: path,
    });
  }
};

// Track custom events in Google Analytics
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};
