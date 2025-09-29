// src/utils/analytics.ts
/**
 * Helper functions for Google Analytics tracking
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | Record<string, any>,
      config?: Record<string, any>
    ) => void;
  }
}

interface EventParams {
  [key: string]: string | number | boolean;
}

// Track page views in Google Analytics for SPAs
export const trackPageView = (path: string): void => {
  if (window.gtag) {
    // Skip on localhost to keep GA clean (optional)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;
    
    // Send a virtual page_view to GA4 with all required parameters
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_path: path,
      page_location: window.location.origin + path,
      send_to: 'G-YQ8LPFFP43' // Explicitly specify the measurement ID
    });
  }
};

// Track custom events in Google Analytics
export const trackEvent = (eventName: string, eventParams: EventParams = {}): void => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track user interactions with enhanced event data
export const trackUserInteraction = (
  action: string, 
  category: string = 'engagement',
  label?: string,
  value?: number
): void => {
  const eventParams: EventParams = {
    event_category: category,
  };
  
  if (label !== undefined) {
    eventParams.event_label = label;
  }
  
  if (value !== undefined) {
    eventParams.value = value;
  }
  
  trackEvent(action, eventParams);
};

// Track accessibility actions
export const trackAccessibilityEvent = (action: string, details?: string): void => {
  const eventParams: EventParams = {
    event_category: 'accessibility',
    action,
  };
  
  if (details !== undefined) {
    eventParams.details = details;
  }
  
  trackEvent('accessibility_action', eventParams);
};

// React Router hook for tracking page views with hash-based routing
export const useGAPageViews = (): void => {
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
    
    // Track the page view
    trackPageView(pagePath);
    
    // Track route changes for performance monitoring
    trackEvent('route_change', {
      event_category: 'navigation',
      page_path: pagePath,
      page_title: pageTitle,
    });
  }, [location]);
};
