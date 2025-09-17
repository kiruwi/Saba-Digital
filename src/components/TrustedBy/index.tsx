import React, { useLayoutEffect, useMemo, useRef } from 'react';
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

  const logos = useMemo(() => importLogos(), []);
  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) return [];
    return logos.length > 1 ? [...logos, ...logos] : logos;
  }, [logos]);

  useLayoutEffect(() => {
    const marqueeEl = marqueeRef.current;
    const trackEl = trackRef.current;
    if (!marqueeEl || !trackEl || logos.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.trusted-logo-card');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
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
  }, [logos]);

  const hasLogos = logos.length > 0;

  return (
    <Section aria-label="Trusted By">
      <Container>
        <Heading>Logos don’t tell the whole story,</Heading>
        {hasLogos ? (
          <Subtext> but here are a few that dared to work different.</Subtext>
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
                  <LogoImg src={logo.src} alt={logo.alt} loading="lazy" />
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
