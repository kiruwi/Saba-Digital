import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { prefetchRelatedRoutes } from '../utils/routeUtils';
import { preloadSectionImages } from '../utils/preloadImages';

/**
 * Custom hook for route-based optimization
 * Handles prefetching related routes and preloading section images
 */
const useRouteOptimization = (): void => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the current route path
    const currentPath = location.pathname;
    
    // Determine the current section based on the route
    let section: string | undefined;
    
    if (currentPath === '/' || currentPath === '') {
      section = 'home';
    } else if (currentPath.includes('/work/graphics') || currentPath.includes('/graphics')) {
      section = 'graphics';
    } else if (currentPath.includes('/work/uxui') || currentPath.includes('/uxui')) {
      section = 'uxui';
    } else if (currentPath.includes('/work/webdev') || currentPath.includes('/webdev')) {
      section = 'webdev';
    } else if (currentPath.includes('/work')) {
      section = 'work';
    } else if (currentPath.includes('/contactus')) {
      section = 'contact';
    }
    
    // Preload images for the current section
    if (section) {
      preloadSectionImages(section).catch(console.error);
    }
    
    // Prefetch related routes
    prefetchRelatedRoutes(currentPath);
    
    // Track page view (could integrate with analytics here)
    console.log(`Page view: ${currentPath}`);
    
  }, [location.pathname]);
};

export default useRouteOptimization;
