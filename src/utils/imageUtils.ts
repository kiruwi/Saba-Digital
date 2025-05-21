/**
 * Utility functions for image optimization and loading
 */

/**
 * Generates a responsive image source set for better performance
 * @param baseUrl - Base URL of the image
 * @param sizes - Array of image sizes to generate
 * @param extension - Image file extension (default: 'jpg')
 * @returns Source set string for use in img srcset attribute
 */
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [320, 640, 960, 1280, 1920],
  extension: string = 'jpg'
): string => {
  // Handle case where baseUrl already includes extension
  const urlWithoutExtension = baseUrl.endsWith(`.${extension}`)
    ? baseUrl.substring(0, baseUrl.lastIndexOf('.'))
    : baseUrl;

  return sizes
    .map(size => `${urlWithoutExtension}-${size}.${extension} ${size}w`)
    .join(', ');
};

/**
 * Determines appropriate image size based on viewport width
 * @param viewportWidth - Current viewport width
 * @returns Appropriate image size for the viewport
 */
export const getResponsiveImageSize = (viewportWidth: number): number => {
  if (viewportWidth < 640) return 320;
  if (viewportWidth < 960) return 640;
  if (viewportWidth < 1280) return 960;
  if (viewportWidth < 1920) return 1280;
  return 1920;
};

/**
 * Creates a placeholder image URL for lazy loading
 * @param width - Width of placeholder image
 * @param height - Height of placeholder image
 * @param bgColor - Background color (default: 252525)
 * @param textColor - Text color (default: 2db670)
 * @returns Placeholder image URL
 */
export const createPlaceholderImage = (
  width: number = 600,
  height: number = 400,
  bgColor: string = '252525',
  textColor: string = '2db670'
): string => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=Loading...`;
};

/**
 * Checks if an image exists at the specified URL
 * @param url - Image URL to check
 * @returns Promise that resolves to true if image exists, false otherwise
 */
export const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking image existence:', error);
    return false;
  }
};

/**
 * Preloads an image to ensure it's in the browser cache
 * @param src - Image source URL
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
 * Gets the dominant color from an image for creating matching placeholders
 * Note: This is a simplified version that works client-side
 * @param imageUrl - URL of the image
 * @returns Promise that resolves to the dominant color as a hex string
 */
export const getDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    // Default color if we can't process the image
    const defaultColor = '#1a1a1a';
    
    try {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(defaultColor);
            return;
          }
          
          // Use a small canvas for faster processing
          canvas.width = 1;
          canvas.height = 1;
          
          // Draw image and get average color
          ctx.drawImage(img, 0, 0, 1, 1);
          const imageData = ctx.getImageData(0, 0, 1, 1).data;
          const r = imageData[0];
          const g = imageData[1];
          const b = imageData[2];
          
          // Convert to hex
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          resolve(hex);
        } catch (err) {
          console.error('Error processing image for dominant color:', err);
          resolve(defaultColor);
        }
      };
      
      img.onerror = () => {
        resolve(defaultColor);
      };
      
      img.src = imageUrl;
    } catch (err) {
      console.error('Error loading image for dominant color:', err);
      resolve(defaultColor);
    }
  });
};
