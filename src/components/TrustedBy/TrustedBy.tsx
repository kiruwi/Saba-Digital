import { Container, Heading, LogoCard, LogoImg, LogoTrack, Marquee, Section, Subtext } from './TrustedByElements';
import { buildOptimizedImageUrl, buildSrcSet } from '../../utils/imageOptimizer';
import { loadGsap } from '../../utils/gsapLoader';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type LogoAsset = {
  key: string;
  alt: string;
  fallbackSrc: string;
  pngSrcSet: string;
  webpSrcSet: string;
  avifSrcSet: string;
  sizes: string;
  width: number;
  height: number;
  scale?: number;
};

const LOGO_TARGET_WIDTH = 180;
const LOGO_TARGET_HEIGHT = 60;
const LOGO_WIDTHS = [120, 160, 180];
const LOGO_SIZES = '(max-width: 768px) 45vw, 160px';
const MOBILE_MARQUEE_BREAKPOINT = 1000;
const PUBLIC_LOGO_DIRECTORY = '/images/company-logos';
const PUBLIC_LOGO_FILENAMES = [
  'Eve On Safari.webp',
  'Fencooh Steel Works.png',
  'Global Pathways Advisory.png',
  'Joint Learning Network.png',
  'logoPATAMU@2x.webp',
  'Salama Boda.png',
  'Silvershine Sacco.png',
  'Solar Freeze.png',
  'Solis Kenya.png',
  'Synnefa.svg'
];
const LOGO_NAME_OVERRIDES: Record<string, string> = {
  'logoPATAMU@2x.webp': 'Patamu'
};
const LOGO_SCALE_OVERRIDES: Record<string, number> = {
  'Eve On Safari.webp': 1.24
};

const buildPublicLogoPath = (filename: string): string => {
  return `${PUBLIC_LOGO_DIRECTORY}/${encodeURIComponent(filename)}`;
};

const importLogos = (): LogoAsset[] => {
  return PUBLIC_LOGO_FILENAMES
    .map((filename) => {
      const src = buildPublicLogoPath(filename);
      const friendlyName = LOGO_NAME_OVERRIDES[filename] ?? filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
      const pngSrcSet = buildSrcSet(src, LOGO_WIDTHS, {
        quality: 70,
        fit: 'contain'
      });
      const webpSrcSet = buildSrcSet(src, LOGO_WIDTHS, {
        quality: 70,
        fit: 'contain',
        format: 'webp'
      });
      const avifSrcSet = buildSrcSet(src, LOGO_WIDTHS, {
        quality: 65,
        fit: 'contain',
        format: 'avif'
      });

      return {
        key: filename,
        alt: `${friendlyName} logo`,
        fallbackSrc: buildOptimizedImageUrl(src, {
          width: LOGO_TARGET_WIDTH,
          quality: 75,
          fit: 'contain'
        }),
        pngSrcSet,
        webpSrcSet,
        avifSrcSet,
        sizes: LOGO_SIZES,
        width: LOGO_TARGET_WIDTH,
        height: LOGO_TARGET_HEIGHT,
        scale: LOGO_SCALE_OVERRIDES[filename]
      };
    })
    .sort((a, b) => a.alt.localeCompare(b.alt));
};

const TrustedBy: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const logos = useMemo(() => importLogos(), []);
  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) return [];
    return logos.length > 1 ? [...logos, ...logos] : logos;
  }, [logos]);

  // Ensure component is mounted and ready
  useEffect(() => {
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!isReady) return;

    const marqueeEl = marqueeRef.current;
    const trackEl = trackRef.current;
    if (!marqueeEl || !trackEl || logos.length === 0) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobileViewport =
      typeof window !== 'undefined' &&
      window.matchMedia(`(max-width: ${MOBILE_MARQUEE_BREAKPOINT}px)`).matches;

    // On mobile/tablet, rely on CSS marquee fallback for more reliable playback.
    if (isMobileViewport) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const run = () => {
      loadGsap()
        .then(({ gsap }) => {
          if (cancelled) return;

          const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.trusted-logo-card');

            if (cards.length) {
              gsap.set(cards, { visibility: 'visible', opacity: 1, y: 0 });

              gsap.fromTo(
                cards,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: 'power3.out',
                  stagger: { each: 0.08, from: 'edges' }
                }
              );
            }

            if (logos.length > 1) {
              trackEl.classList.add('logo-track--js');
              const duration = Math.max(16, logos.length * 2.4);
              gsap.to(trackEl, {
                xPercent: -50,
                duration,
                ease: 'none',
                repeat: -1
              });
            }
          }, marqueeEl);

          cleanup = () => ctx.revert();
        })
        .catch((error) => {
          /* eslint-disable-next-line no-console */
          console.warn('[TrustedBy] Failed to load GSAP', error);
        });
    };

    let idleHandle: number | undefined;
    const supportsIdle = typeof window !== 'undefined' && 'requestIdleCallback' in window;

    if (supportsIdle) {
      idleHandle = (window as typeof window & { requestIdleCallback: (cb: IdleRequestCallback) => number }).requestIdleCallback(run);
    } else {
      idleHandle = window.setTimeout(run, 100);
    }

    return () => {
      cancelled = true;
      if (supportsIdle && idleHandle !== undefined && 'cancelIdleCallback' in window) {
        (window as typeof window & { cancelIdleCallback: (handle: number) => void }).cancelIdleCallback(idleHandle);
      } else if (idleHandle !== undefined) {
        window.clearTimeout(idleHandle);
      }
      trackEl.classList.remove('logo-track--js');
      cleanup?.();
    };
  }, [logos, isReady]);
  const hasLogos = logos.length > 0;

  return (
    <Section aria-label="Trusted By">
      <Container>
        <Heading>Logos don't tell the whole story,</Heading>
        {hasLogos ? (
          <Subtext>but here are a few that <span>dared to work different.</span></Subtext>
        ) : (
          <Subtext>
            Add your client logos to <code>public/images/company-logos</code> to showcase them here.
          </Subtext>
        )}
        {hasLogos && (
          <Marquee ref={marqueeRef}>
            <LogoTrack ref={trackRef}>
              {marqueeLogos.map((logo, index) => (
                <LogoCard
                  key={`${logo.key}-${index}`}
                  className="trusted-logo-card"
                  aria-label={logo.alt}
                >
                  <picture>
                    {logo.avifSrcSet && (
                      <source
                        type="image/avif"
                        srcSet={logo.avifSrcSet}
                        sizes={logo.sizes}
                      />
                    )}
                    {logo.webpSrcSet && (
                      <source
                        type="image/webp"
                        srcSet={logo.webpSrcSet}
                        sizes={logo.sizes}
                      />
                    )}
                    <LogoImg
                      $scale={logo.scale}
                      src={logo.fallbackSrc}
                      alt={logo.alt}
                      srcSet={logo.pngSrcSet}
                      sizes={logo.sizes}
                      width={logo.width}
                      height={logo.height}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                  </picture>
                </LogoCard>
              ))}
            </LogoTrack>
          </Marquee>
        )}
      </Container>
    </Section>
  );
};

export default TrustedBy;
