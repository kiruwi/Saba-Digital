const previewIds = new Set([
  'ufanisi-resort', 'makvo-llc', 'mutai-enterprises', 'eve-on-safari',
  'gsc-hauling', 'osim-lai-branding', 'synnefa-rebrand', 'ad-design',
]);

/** Cropped previews are separate assets; detail pages keep their original images. */
export const getProjectPreview = (id: string, original: string) => {
  const previewId = id === 'motion' ? 'synnefa-rebrand' : id;
  if (!previewIds.has(previewId)) return { src: original, srcSet: undefined };
  const base = `/images/optimized/projects/${previewId}`;
  return {
    src: `${base}-640.webp`,
    srcSet: [320, 640, 960].map(width => `${base}-${width}.webp ${width}w`).join(', '),
  };
};
