import React, { lazy, Suspense, ComponentType } from 'react';
import { preloadSectionImages } from './preloadImages';

/**
 * Creates a lazy-loaded component with custom loading fallback and preloading
 * @param factory - Import function for the component
 * @param section - Section name for preloading related images
 * @returns Lazy-loaded component wrapped in Suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  section?: string
): React.FC {
  const LazyComponent = lazy(factory);
  
  return (props: any) => {
    // Preload section images if a section was specified
    if (section) {
      preloadSectionImages(section).catch(err => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Failed to preload section images:', err);
        }
      });
    }
    
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Prefetches a component's code bundle
 * @param factory - Import function for the component
 */
export const prefetchComponent = (factory: () => Promise<any>): void => {
  // Start loading the component in the background
  factory().catch(error => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('Failed to prefetch component:', error);
    }
  });
};

/**
 * Prefetches components for routes that are likely to be visited next
 * @param currentRoute - Current route path
 */
export const prefetchRelatedRoutes = (currentRoute: string): void => {
  // Define related routes that should be prefetched based on current route
  const relatedRoutes: Record<string, Array<() => Promise<any>>> = {
    '/': [
      () => import(/* webpackChunkName: "work" */ '../pages/Work'),
      () => import(/* webpackChunkName: "contact" */ '../pages/contactus')
    ],
    '/work': [
      () => import(/* webpackChunkName: "graphics-work" */ '../work/Graphics'),
      () => import(/* webpackChunkName: "uxui-work" */ '../work/UXUI'),
      () => import(/* webpackChunkName: "webdev-work" */ '../work/WebDev')
    ],
    '/work/graphics': [
      () => import(/* webpackChunkName: "graphics-detail" */ '../work/GraphicsDetail')
    ],
    '/work/uxui': [
      () => import(/* webpackChunkName: "uxui-detail" */ '../work/UXUIDetail')
    ],
    '/work/webdev': [
      () => import(/* webpackChunkName: "webdev-detail" */ '../work/WebDevDetail')
    ]
  };
  
  // Find the matching route pattern
  const routePattern = Object.keys(relatedRoutes).find(pattern => 
    currentRoute === pattern || currentRoute.startsWith(pattern)
  );
  
  // Prefetch related routes if found
  if (routePattern && relatedRoutes[routePattern]) {
    relatedRoutes[routePattern].forEach(prefetchComponent);
  }
};

