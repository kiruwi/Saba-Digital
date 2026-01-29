export type ImageFormat = 'avif' | 'webp';

export type ImageOptimizationOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
  fit?: 'cover' | 'contain' | 'inside';
  metadata?: 'keep' | 'strip';
};

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;

// Disable CDN optimization by default; allow opt-in via env flag
const shouldOptimize = (): boolean => {
  if (process.env.REACT_APP_ENABLE_IMAGE_OPTIMIZATION === 'true') {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return false;
    }
    // Avoid Netlify image proxy during local prerendering (react-snap uses localhost)
    const host = window.location?.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return false;
    }
    return true;
  }
  return false;
};

const buildCdnUrl = (basePath: string, options: ImageOptimizationOptions): string => {
  const params = new URLSearchParams();
  params.set('url', basePath);

  if (options.width) params.set('w', String(options.width));
  if (options.height) params.set('h', String(options.height));
  if (options.quality) params.set('q', String(options.quality));
  if (options.fit) params.set('fit', options.fit);
  if (options.format) params.set('fm', options.format);
  if (options.metadata) params.set('metadata', options.metadata);

  return `/.netlify/images?${params.toString()}`;
};

const normalisePath = (src: string): string | null => {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return null;
  }

  if (ABSOLUTE_URL_REGEX.test(src)) {
    try {
      const url = new URL(src);
      return `${url.origin}${url.pathname}${url.search}`;
    } catch (error) {
      /* eslint-disable-next-line no-console */
      console.warn('[imageOptimizer] Failed to parse image URL', error);
      return null;
    }
  }

  if (!src.startsWith('/')) {
    return null;
  }

  return src;
};

export const buildOptimizedImageUrl = (
  src: string,
  options: ImageOptimizationOptions = {}
): string => {
  if (!src) return src;

  const basePath = normalisePath(src);
  if (!basePath) return src;

  if (!shouldOptimize()) return basePath;

  return buildCdnUrl(basePath, options);
};

export const buildSrcSet = (
  src: string,
  widths: number[],
  options: ImageOptimizationOptions = {}
): string => {
  const uniqueWidths = Array.from(new Set(widths)).filter((width) => width > 0);

  if (uniqueWidths.length === 0) {
    return '';
  }

  return uniqueWidths
    .map((width) => {
      const optimized = buildOptimizedImageUrl(src, { ...options, width });
      return `${optimized} ${width}w`;
    })
    .join(', ');
};
