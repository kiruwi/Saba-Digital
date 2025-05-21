/**
 * Utility for preloading and optimizing images
 * Improves performance by loading critical images ahead of time
 */

/**
 * Preloads a single image by creating an Image object and setting its src
 * @param src - URL of the image to preload
 * @returns Promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preloads multiple images in parallel
 * @param sources - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = async (sources: string[]): Promise<void[]> => {
  const promises = sources.map(src => preloadImage(src));
  return Promise.all(promises);
};

/**
 * Preloads critical images for the application
 * Call this function early in the application lifecycle
 */
export const preloadCriticalImages = async (): Promise<void> => {
  try {
    // Add critical images that should be loaded immediately
    const criticalImages = [
      // Logo and hero images
      '/images/logo.png',
      '/images/hero-bg.jpg',
      
      // Navigation icons or UI elements
      '/images/icons/menu.svg',
      '/images/icons/close.svg',
      
      // Add more critical images as needed
    ];
    
    await preloadImages(criticalImages);
    console.log('Critical images preloaded successfully');
  } catch (error) {
    console.warn('Failed to preload some critical images:', error);
  }
};

/**
 * Preloads images for a specific section when it's about to be viewed
 * @param section - Section name to preload images for
 */
export const preloadSectionImages = async (section: string): Promise<void> => {
  try {
    let sectionImages: string[] = [];
    
    // Define images for each section
    switch (section) {
      case 'home':
        sectionImages = [
          '/images/home/hero.jpg',
          '/images/home/about.jpg',
        ];
        break;
        
      case 'graphics':
        sectionImages = [
          '/images/graphics/preview1.jpg',
          '/images/graphics/preview2.jpg',
        ];
        break;
        
      case 'webdev':
        sectionImages = [
          '/images/webdev/preview1.jpg',
          '/images/webdev/preview2.jpg',
        ];
        break;
        
      case 'uxui':
        sectionImages = [
          '/images/uxui/preview1.jpg',
          '/images/uxui/preview2.jpg',
        ];
        break;
        
      default:
        return;
    }
    
    await preloadImages(sectionImages);
    console.log(`Images for ${section} section preloaded successfully`);
  } catch (error) {
    console.warn(`Failed to preload images for ${section} section:`, error);
  }
};

/**
 * Gets appropriate image size based on screen width for responsive images
 * @param baseUrl - Base URL of the image without size suffix
 * @param extension - Image file extension
 * @returns URL with appropriate size suffix
 */
export const getResponsiveImageUrl = (baseUrl: string, extension: string = 'jpg'): string => {
  const width = window.innerWidth;
  let size: string;
  
  if (width <= 640) {
    size = 'sm';
  } else if (width <= 1024) {
    size = 'md';
  } else if (width <= 1440) {
    size = 'lg';
  } else {
    size = 'xl';
  }
  
  return `${baseUrl}-${size}.${extension}`;
};
