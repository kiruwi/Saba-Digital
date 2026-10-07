const previewIds = new Set([
  'ufanisi-resort', 'makvo-llc', 'mutai-enterprises', 'eve-on-safari',
  'gsc-hauling', 'osim-lai-branding', 'synnefa-rebrand', 'ad-design',
]);

/** Cropped previews are separate assets; detail pages keep their original images. */
export const getProjectPreview = (id: string, original: string) => {
  const previewId = id === 'motion' ? 'synnefa-rebrand' : id;
  if (!previewIds.has(previewId)) return { src: original, srcSet: undefined };
  const base = `/images/optimized/projects/${previewId}`;
  const maximumWidth = previewId === 'ad-design' ? 420 : previewId === 'synnefa-rebrand' ? 1000 : 1920;
  const widths = [...new Set([...[320, 640, 960, 1280, 1920].filter(width => width <= maximumWidth), maximumWidth])];
  return {
    src: `${base}-${Math.min(960, maximumWidth)}.webp`,
    srcSet: widths.map(width => `${base}-${width}.webp ${width}w`).join(', '),
  };
};
