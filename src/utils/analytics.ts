// src/utils/analytics.ts
/**
 * Helper functions for Google Analytics tracking
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { afterPageLoad } from './afterPageLoad';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
    'ga-disable-G-YQ8LPFFP43'?: boolean;
  }
}

interface EventParams {
  [key: string]: string | number | boolean;
}

const MEASUREMENT_ID = 'G-YQ8LPFFP43';
let consentGranted = false;
let initialized = false;
let cancelLoad: (() => void) | undefined;

const consentSettings = (granted: boolean) => ({
  ad_storage: granted ? 'granted' : 'denied',
  ad_user_data: granted ? 'granted' : 'denied',
  ad_personalization: granted ? 'granted' : 'denied',
  analytics_storage: granted ? 'granted' : 'denied',
});

export const updateGoogleConsent = (granted: boolean): void => {
  consentGranted = granted;
  window['ga-disable-G-YQ8LPFFP43'] = !granted;
  cancelLoad?.();
  cancelLoad = undefined;
  if (granted && !initialized) {
    cancelLoad = afterPageLoad(() => {
      if (!consentGranted || initialized) return;
      initialized = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer?.push(arguments); };
      window.gtag('consent', 'default', consentSettings(false));
      window.gtag('consent', 'update', consentSettings(true));
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
      trackPageView(window.location.pathname + window.location.search);
    });
    return;
  }
  window.gtag?.('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });
};

// Track page views in Google Analytics for SPAs
export const trackPageView = (path: string): void => {
  if (consentGranted && window.gtag) {
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
  if (consentGranted && window.gtag) {
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
