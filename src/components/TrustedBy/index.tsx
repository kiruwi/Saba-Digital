import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Container, Heading, LogoCard, LogoImg, LogoTrack, Marquee, Section, Subtext } from './TrustedByElements';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

type LogoAsset = {
  key: string;
  src: string;
  alt: string;
};

type LogoContext = {
  keys: () => string[];
  (id: string): string | { default: string };
};

const importLogos = (): LogoAsset[] => {
  try {
    const context = require.context('../../assets/logos', false, /\.(png|jpe?g|svg)$/) as LogoContext;
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
        return {
          key: filename,
          src,
          alt: `${friendlyName} logo`
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

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.trusted-logo-card');
        
        // Ensure cards are visible initially
        if (cards.length) {
          // First set them visible
          gsap.set(cards, { visibility: 'visible', opacity: 1, y: 0 });
          
          // Then animate them in
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

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [logos, isReady]);
  const hasLogos = logos.length > 0;

  return (
    <Section aria-label="Trusted By">
      <Container>
        <Heading>Logos don't tell the whole story,</Heading>
        {hasLogos ? (
          <Subtext> but here are a few that <span>dared to work different</span>.</Subtext>
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
                  <LogoImg 
                    src={logo.src} 
                    alt={logo.alt} 
                    loading="eager"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
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
