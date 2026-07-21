/**
 * Utility for preloading and optimizing images.
 */

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(src => preloadImage(src)));
};

export const preloadSectionImages = async (section: string): Promise<void> => {
  const imagesBySection: Record<string, string[]> = {
    home: ["/images/optimized/portrait/ian-720.webp"],
    graphics: ["/assets/projects/3d-graphics/synnefa-images/banner.jpg"],
    webdev: ["/assets/projects/web-dev/app1.jpg"],
    uxui: ["/assets/projects/ux-ui/u-r.jpg"],
  };

  const sources = imagesBySection[section];
  if (!sources) return;

  try {
    await preloadImages(sources);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Failed to preload images for ${section}:`, error);
    }
  }
};

export const getResponsiveImageUrl = (
  baseUrl: string,
  extension = "jpg"
): string => {
  const width = window.innerWidth;
  const size =
    width <= 640 ? "sm" : width <= 1024 ? "md" : width <= 1440 ? "lg" : "xl";

  return `${baseUrl}-${size}.${extension}`;
};
