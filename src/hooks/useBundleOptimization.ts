// src/hooks/useBundleOptimization.ts
import { useEffect, useCallback } from 'react';
import { trackUserInteraction } from '../utils/analytics';

interface BundleOptimizationOptions {
  preloadRoutes?: string[];
  preloadImages?: string[];
  deferNonCritical?: boolean;
  enableIntersectionObserver?: boolean;
}

export const useBundleOptimization = (options: BundleOptimizationOptions = {}) => {
  const {
    preloadRoutes = [],
    preloadImages = [],
    deferNonCritical = true,
    enableIntersectionObserver = true
  } = options;

  // Preload route chunks
  const preloadRoute = useCallback((route: string) => {
    if (typeof window !== 'undefined') {
      // Create a link element for preloading the route chunk
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
      
      trackUserInteraction('route_preload', 'performance', route);
    }
  }, []);

  // Preload critical images
  const preloadImage = useCallback((src: string, priority: 'high' | 'low' = 'low') => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);
    }
  }, []);

  // Defer non-critical resources
  const deferResource = useCallback((callback: () => void, delay: number = 100) => {
    if (deferNonCritical) {
      const timeoutId = setTimeout(callback, delay);
      return () => clearTimeout(timeoutId);
    } else {
      callback();
      return () => {};
    }
  }, [deferNonCritical]);

  // Intersection Observer for lazy loading
  const createIntersectionObserver = useCallback((
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    if (!enableIntersectionObserver || typeof window === 'undefined') {
      return null;
    }

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }, [enableIntersectionObserver]);

  // Setup resource hints
  useEffect(() => {
    // Preload routes
    preloadRoutes.forEach(route => {
      preloadRoute(route);
    });

    // Preload images
    preloadImages.forEach(image => {
      preloadImage(image);
    });

    // Add DNS prefetch for external resources
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

  }, [preloadRoutes, preloadImages, preloadRoute, preloadImage]);

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            trackUserInteraction('lcp_measured', 'performance', 'timing', Math.round(entry.startTime));
          }
          if (entry.entryType === 'first-input') {
            // Type assertion for first-input entries which have processingStart
            const fidEntry = entry as PerformanceEntry & { processingStart: number };
            if ('processingStart' in fidEntry) {
              trackUserInteraction('fid_measured', 'performance', 'timing', Math.round(fidEntry.processingStart - entry.startTime));
            }
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Performance observer not supported:', error);
        }
      }

      return () => observer.disconnect();
    }
  }, []);

  return {
    preloadRoute,
    preloadImage,
    deferResource,
    createIntersectionObserver
  };
};
