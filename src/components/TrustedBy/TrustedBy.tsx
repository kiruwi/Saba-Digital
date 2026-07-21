import { Container, Heading, LogoCard, LogoImg, LogoTrack, Marquee, Section, Subtext } from './TrustedByElements';
import { loadGsap } from '../../utils/gsapLoader';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type LogoAsset = {
  key: string;
  alt: string;
  fallbackSrc: string;
  webpSrcSet: string;
  sizes: string;
  width: number;
  height: number;
  scale?: number;
};

const LOGO_TARGET_WIDTH = 180;
const LOGO_TARGET_HEIGHT = 60;
const LOGO_SIZES = '(max-width: 768px) 45vw, 160px';
const OPTIMIZED_LOGO_DIRECTORY = '/images/optimized/logos';
type LogoDefinition = {
  slug: string;
  name: string;
  source?: string;
};
const LOGOS: readonly LogoDefinition[] = [
  { slug: 'eve-on-safari', name: 'Eve On Safari' },
  { slug: 'fencooh-steel-works', name: 'Fencooh Steel Works' },
  { slug: 'global-pathways-advisory', name: 'Global Pathways Advisory' },
  { slug: 'joint-learning-network', name: 'Joint Learning Network' },
  { slug: 'patamu', name: 'Patamu' },
  { slug: 'salama-boda', name: 'Salama Boda' },
  { slug: 'silvershine-sacco', name: 'Silvershine Sacco' },
  { slug: 'solar-freeze', name: 'Solar Freeze' },
  { slug: 'solis-kenya', name: 'Solis Kenya' },
  {
    slug: 'synnefa',
    name: 'Synnefa',
    source: '/images/company-logos/Synnefa.svg'
  },
];
const LOGO_SCALE_OVERRIDES: Record<string, number> = {
  'eve-on-safari': 1.24
};

const importLogos = (): LogoAsset[] => {
  return LOGOS
    .map(({ slug, name, source }) => {
      return {
        key: slug,
        alt: `${name} logo`,
        fallbackSrc:
          source ?? `${OPTIMIZED_LOGO_DIRECTORY}/${slug}-180.webp`,
        webpSrcSet: source
          ? ''
          : [
              `${OPTIMIZED_LOGO_DIRECTORY}/${slug}-180.webp 180w`,
              `${OPTIMIZED_LOGO_DIRECTORY}/${slug}-360.webp 360w`
            ].join(', '),
        sizes: LOGO_SIZES,
        width: LOGO_TARGET_WIDTH,
        height: LOGO_TARGET_HEIGHT,
        scale: LOGO_SCALE_OVERRIDES[slug]
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
          }, marqueeEl);

          cleanup = () => ctx.revert();
        })
        .catch((error) => {
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
