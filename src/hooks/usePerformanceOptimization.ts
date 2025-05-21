import { useEffect, useState, useRef } from 'react';
import { preloadResources, deferNonCriticalResources, createIntersectionObserver } from '../utils/performanceUtils';

/**
 * Custom hook for performance optimization
 * @param criticalResources Array of critical resources to preload
 * @param nonCriticalResources Array of non-critical resources to defer
 * @param resourceType Type of resources
 */
export const usePerformanceOptimization = (
  criticalResources: string[] = [],
  nonCriticalResources: string[] = [],
  resourceType: 'image' | 'style' | 'script' | 'font' = 'image'
) => {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Preload critical resources immediately
    if (criticalResources.length > 0) {
      preloadResources(criticalResources, resourceType);
    }
    
    // Defer loading of non-critical resources
    if (nonCriticalResources.length > 0) {
      deferNonCriticalResources(() => {
        preloadResources(nonCriticalResources, resourceType);
        setResourcesLoaded(true);
      });
    } else {
      setResourcesLoaded(true);
    }
    
    return () => {
      // Clean up observer if it exists
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [criticalResources, nonCriticalResources, resourceType]);
  
  /**
   * Setup lazy loading for elements
   * @param elements Elements to lazy load
   * @param callback Function to call when element is in viewport
   */
  const setupLazyLoading = (
    elements: Element[],
    callback: (entry: IntersectionObserverEntry) => void
  ) => {
    if (elements.length > 0) {
      observerRef.current = createIntersectionObserver(elements, callback);
    }
  };
  
  return { resourcesLoaded, setupLazyLoading };
};

export default usePerformanceOptimization;
