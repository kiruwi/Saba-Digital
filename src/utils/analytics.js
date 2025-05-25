// src/utils/analytics.js
/**
 * Helper functions for Google Analytics tracking
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

// React Router hook for tracking page views with hash-based routing
export const useGAPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    // For HashRouter, we need to use location.pathname to get the part after the hash
    // This converts "/#/work/graphics" to "/work/graphics" for analytics
    const pagePath = location.pathname + location.search;
    
    // Set page title based on current route for better analytics reporting
    let pageTitle = document.title;
    if (location.pathname !== '/') {
      // Extract meaningful name from path
      const pathSegments = location.pathname.split('/');
      const pageName = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
      if (pageName) {
        // Format the page name (e.g., "graphics" becomes "Graphics")
        const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
        pageTitle = `${formattedName} | Ian K. Cheruiyot`;
        // Optionally update document title to match
        document.title = pageTitle;
      }
    }
    
    // Track page view with improved path and title
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
      page_location: window.location.origin + pagePath,
    });
  }, [location]);
};
