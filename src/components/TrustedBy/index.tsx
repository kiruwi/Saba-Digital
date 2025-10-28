import { Container, Heading, LogoCard, LogoImg, LogoTrack, Marquee, Section, Subtext } from './TrustedByElements';
import { buildOptimizedImageUrl, buildSrcSet } from '../../utils/imageOptimizer';
import { loadGsap } from '../../utils/gsapLoader';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

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
};

type LogoContext = {
  keys: () => string[];
  (id: string): string | { default: string };
};

const LOGO_TARGET_WIDTH = 180;
const LOGO_TARGET_HEIGHT = 60;
const LOGO_WIDTHS = [120, 160, 180];
const LOGO_SIZES = '(max-width: 768px) 45vw, 160px';

const importLogos = (): LogoAsset[] => {
  try {
    const context = require.context('../../assets/logos', false, /\.(png|jpe?g|svg|webp|avif)$/) as LogoContext;
    return context
      .keys()
      .map((key) => {
        const asset = context(key);
        const src = typeof asset === 'string' ? asset : asset?.default ?? '';
        if (!src) return null;
        const filename = key.replace('./', '');
        const friendlyName = filename
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]+/g, ' ')
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
          height: LOGO_TARGET_HEIGHT
        };
      })
      .filter((logo): logo is LogoAsset => Boolean(logo))
      .sort((a, b) => a.alt.localeCompare(b.alt));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[TrustedBy] Unable to load logos from src/assets/logos', error);
    return [];
  }
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
            Add your client logos to <code>src/assets/logos</code> to showcase them here.
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
