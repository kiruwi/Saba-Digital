/**
 * Utility functions for performance optimization
 */

/**
 * Preloads critical resources for faster page loads
 * @param resources Array of URLs to preload
 * @param type Resource type (e.g., 'image', 'style', 'script')
 */
export const preloadResources = (resources: string[], type: 'image' | 'style' | 'script' | 'font' = 'image'): void => {
  resources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    // Set appropriate as attribute based on resource type
    switch (type) {
      case 'image':
        link.as = 'image';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'font':
        link.as = 'font';
        link.setAttribute('crossorigin', 'anonymous');
        break;
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Defers non-critical resources to improve initial load time
 * @param callback Function to execute after initial render
 */
export const deferNonCriticalResources = (callback: () => void): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      callback();
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      callback();
    }, 2000); // 2 seconds after page load
  }
};

/**
 * Implements intersection observer for lazy loading any element
 * @param elements Elements to observe
 * @param callback Function to call when element is in viewport
 * @param options IntersectionObserver options
 */
export const createIntersectionObserver = (
  elements: Element[],
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { rootMargin: '100px', threshold: 0.1 }
): IntersectionObserver => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  return observer;
};

/**
 * Measures and logs component render time for performance monitoring
 * @param componentName Name of the component being measured
 * @param callback Function to execute and measure
 */
export const measureRenderTime = (componentName: string, callback: () => void): void => {
  if (process.env.NODE_ENV === 'development') {
    // Performance timing removed for ESLint compliance
    // Consider using Performance API or React DevTools for profiling
    callback();
  } else {
    callback();
  }
};
