import styled, { keyframes, css } from 'styled-components';
import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import meImage from '../../images/me.png';
import { ServicesCardHover as ServiceCard, TextOverlay, ServicesH2, ServicesP, serviceBackgrounds } from '../Services/ServicesElements';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

import { Slide } from '../Services/ServicesElements';
import { FiArrowUpRight } from 'react-icons/fi';


/* ── layout grid ───────────────────────────────────── */
export const HeroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 480px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => (theme.theme === 'light' ? '#000' : '#fff')};
  overflow: hidden;

  @media (max-width: 1000px) {
    overflow: auto; /* allow normal scrolling on mobile */
  }
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 1000px) {
    display: block;
  }
`;

export const HeroBg = styled.div``;

/* ── copy column ───────────────────────────────────── */
export const HeroText = styled.div`
  position: sticky;
  top: 0;
  max-width: 700px;
  padding: 8rem 3rem 3rem;

  @media (max-width: 1000px) {
    padding: 4rem 1.5rem 2rem;
  }
`;

export const TitleBackground = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.3em;
`;

const baseTitle = `
  font-family: 'SpotifyMix', sans-serif;
  font-weight: 500;
  line-height: 1.05;
  margin: 0;
`;

export const HeroTitleTop = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: ${({ theme }) => (theme.theme === 'light' ? '#000' : '#fff')};
`;

export const HeroTitleBottom = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: ${({ theme }) => theme.colors.primary};
`;

/* ── CTA wrapper ───────────────────────────────────── */
export const BtnWrap = styled.div`
  margin-top: 3rem;
  display: flex;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

/* ── Portfolio CTA button ─────────────────────────── */
export const PortfolioButton = styled.button<{ expanded: boolean; lowEnd?: boolean }>`
  position: ${({ expanded }) => (expanded ? 'fixed' : 'relative')};
  top: ${({ expanded }) => (expanded ? '50%' : 'auto')};
  left: ${({ expanded }) => (expanded ? '50%' : 'auto')};
  transform: ${({ expanded }) => (expanded ? 'translate(-50%, -50%)' : 'none')};

  width: ${({ expanded }) => (expanded ? '90vw' : 'auto')};
  max-width: ${({ expanded }) => (expanded ? 'none' : '75rem')};
  min-height: ${({ expanded }) => (expanded ? '500px' : 'auto')};
  max-height: ${({ expanded }) => (expanded ? '90vh' : 'none')};
  overflow-y: ${({ expanded }) => (expanded ? 'auto' : 'visible')};
  overscroll-behavior: contain;

  /* Full-screen overlay on small devices */
  @media (max-width: 1000px) {
    ${({ expanded }) => expanded && css`
      top: 0;
      left: 0;
      transform: none;
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      min-height: 100vh;
      border-radius: 24px;
      align-items: flex-start;
      justify-content: flex-start;
    `}
  }
  padding: ${({ expanded }) => (expanded ? 0 : '18px 64px 18px 32px')};



  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${({ expanded }) => (expanded ? '32px' : '28px')};
  background: ${({ expanded, theme }) => (expanded ? 'transparent' : theme.colors.primary)};
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  color: #fff;
  font-size: ${({ expanded }) => (expanded ? 0 : '1rem')};
  cursor: pointer;
  z-index: ${({ expanded }) => (expanded ? 9999 : 'auto')};

  will-change: transform, width, height;
  transition: ${({ lowEnd }) =>
    lowEnd
      ? 'none'
      : `width 0.25s ease,
    height 0.25s ease,
    padding 0.25s ease,
    top 0.25s ease,
    left 0.25s ease,
    transform 0.25s ease,
    border-radius 0.25s ease`};
`;

/* button label */
export const CtaLabel = styled.span<{ expanded: boolean }>`
  opacity: ${({ expanded }) => (expanded ? 0 : 1)};
  transition: opacity 0.45s ease;
  pointer-events: none;
`;

/* yellow circle */
export const ArrowBadge = styled.span<{ expanded: boolean }>`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f7d338;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  /* collapsed ── hangs off top-right corner */
  top: -14px;
  right: -14px;

  /* animate actual offsets (no transform jump) */
  transition:
    top 0.45s ease,
    right 0.45s ease,
    bottom 0.45s ease,
    left 0.45s ease;

  ${({ expanded }) =>
    expanded &&
    css`
      /* ---------- desktop (≥769px): bottom-left inside expanded button ---------- */
      @media (min-width: 769px) {
        top: auto;
        right: auto;
        bottom: 16px;
        left: 16px;
        position: absolute;
      }

      /* ---------- mobile (≤768px): fixed top-right of viewport ---------- */
      @media (max-width: 768px) {
        display: none;
        top: 16px;
        right: 16px;
        bottom: auto;
        left: auto;
        z-index: 10002; /* above overlay and navbar */
      }
    `}
`;

/* arrow icon */
export const ArrowUpIcon = styled(FiArrowUpRight)<{ expanded: boolean }>`
  font-size: 24px;
  color: #000;
  transition: transform 0.45s ease;
  transform: ${({ expanded }) => (expanded ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;

/* ── rail column ───────────────────────────────────── */
export const HeroRight = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Rail = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  scroll-snap-type: y mandatory;


`;

/* images */
export const DesktopImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  flex-shrink: 0;
`;

export const MobileImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  @media (min-width: 1000px) {
    display: none;
  }
`;

/* ── scroll hint ───────────────────────────────────── */
interface ScrollIndicatorProps {
  visible: boolean;
}

export const ScrollIndicatorWrapper = styled.div<ScrollIndicatorProps>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

export const ScrollText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  letter-spacing: 1px;
`;

const bounce = keyframes`
  0%,20%,50%,80%,100% { transform: translateY(0) rotate(45deg); }
  40% { transform: translateY(-10px) rotate(45deg); }
  60% { transform: translateY(-5px) rotate(45deg); }
`;

export const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  transform: rotate(45deg);
  animation: ${bounce} 2s infinite;
`;

/* ── slide dots ───────────────────────────────────── */
export const SlideIndicatorsContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

interface SlideDotProps {
  $active: boolean;
}

export const SlideIndicator = styled.div<SlideDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active
      ? theme.theme === 'light'
        ? theme.colors.primary
        : '#fff'
      : theme.theme === 'light'
      ? 'rgba(0,0,0,0.3)'
      : 'rgba(255,255,255,0.5)'};
  transition: background 0.3s ease;
`;


/* ---------- HERO SECTION COMPONENT ---------- */
const totalSlides = 1; // Only profile slide
const hasSlideNavigation = totalSlides > 1;

const HeroSection: FC = () => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEndDevice = prefersReducedMotion || ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

  const [expanded, setExpanded] = useState(false);
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  // hide scroll arrow when popup expanded
  useEffect(() => {
    if (expanded) setScrollIndicatorVisible(false);
  }, [expanded]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardGridRef = useRef<HTMLDivElement | null>(null);
  const portfolioBtnRef = useRef<HTMLButtonElement | null>(null);
  const hasScrolled = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const navigate = useNavigate();

  // navigate to page when card clicked inside portfolio popup
  const handleServiceClick = (e: React.MouseEvent<HTMLDivElement>, path: string) => {
    e.stopPropagation();
    setExpanded(false);
    navigate(path);
    // ensure new page starts at top
    setTimeout(() => window.scrollTo({ top: 0 }), 0);
  };

  
  // Lock background scroll when popup is expanded (all viewports)
  useEffect(() => {


    const event = new CustomEvent('portfolioExpanded', { detail: expanded });
    window.dispatchEvent(event);

    if (expanded) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('portfolio-expanded');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('portfolio-expanded');
    }

    // Listen for collapse requests from Navbar arrow
    const collapseHandler = () => setExpanded(false);
    window.addEventListener('collapsePortfolio', collapseHandler);

    // cleanup on unmount to be extra-safe
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('collapsePortfolio', collapseHandler);
    };
  }, [expanded]);

  // After expansion render, reset internal scroll so first card is visible on mobile
  useEffect(() => {
    if (expanded && window.innerWidth <= 1000) {
      requestAnimationFrame(() => {
        portfolioBtnRef.current?.scrollTo({ top: 0 });
        cardGridRef.current?.scrollTo({ top: 0, left: 0 });
      });
    }
  }, [expanded]);

  const handlePortfolioClick = () => {
    if (expanded) {
      // collapse and smooth scroll to services section
      setExpanded(false);
      if (window.innerWidth > 1000) {
        const target = document.getElementById('services');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setExpanded(true);
      // ensure panel starts at top
      setTimeout(() => {
        if (window.innerWidth <= 1000) {
          portfolioBtnRef.current?.scrollTo({ top: 0 });
          cardGridRef.current?.scrollTo({ top: 0, left: 0 });
        }
      }, 0);
    }
  };

  // Function to scroll to a specific slide
  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      if (railRef.current && slideIndex >= 0 && slideIndex < totalSlides) {
        setIsScrolling(true);
        const slideHeight = window.innerHeight;

        railRef.current.scrollTo({
          top: slideHeight * slideIndex,
          behavior: 'smooth',
        });

        setCurrentSlide(slideIndex);
        hasScrolled.current = true;
        setScrollIndicatorVisible(slideIndex === 0);

        // Reset scrolling state after animation completes
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (slideIndex >= totalSlides) {
        // Scroll to footer when we've gone through all slides
        scroll.scrollToBottom();
      }
    },
    []
  );

  useEffect(() => {
    if (!hasSlideNavigation) {
      // No custom listeners needed when there is only one slide.
      return;
    }
    // Handle wheel events to control scrolling
    const handleWheel = (e: WheelEvent) => {
      // Skip if already scrolling or on mobile
      if (isScrolling || window.innerWidth <= 1000) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSlide = currentSlide + direction;

      // Prevent default scrolling behavior
      e.preventDefault();

      // If scrolling down from the last slide, go to footer
      if (direction > 0 && currentSlide === totalSlides - 1) {
        scrollToSlide(totalSlides); // This will trigger the footer scroll
      } // Otherwise navigate between slides
      else if (nextSlide >= 0 && nextSlide < totalSlides) {
        scrollToSlide(nextSlide);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if already scrolling or on mobile
      if (isScrolling || window.innerWidth <= 1000) return;

      // Arrow Down or Page Down
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlide === totalSlides - 1) {
          scrollToSlide(totalSlides); // Go to footer
        } else {
          scrollToSlide(currentSlide + 1);
        }
      }
      // Arrow Up or Page Up
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSlide(Math.max(0, currentSlide - 1));
      }
      // Home key
      else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0);
      }
      // End key
      else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(totalSlides); // Go to footer
      }
    };

    const handleScroll = () => {
      if (railRef.current) {
        // Check if we're at the top of the rail
        const atTop = railRef.current.scrollTop < 50;

        // If we haven't scrolled yet or we're back at the top
        if (!hasScrolled.current || atTop) {
          setScrollIndicatorVisible(true);
        } else {
          setScrollIndicatorVisible(false);
        }

        // Mark that we've scrolled
        if (railRef.current.scrollTop > 50 && !hasScrolled.current) {
          hasScrolled.current = true;
        }

        // Update current slide based on scroll position
        if (!isScrolling) {
          const slideHeight = window.innerHeight;
          const currentPos = railRef.current.scrollTop;
          const newSlide = Math.round(currentPos / slideHeight);

          if (newSlide !== currentSlide) {
            setCurrentSlide(newSlide);
          }
        }
      }
    };

    // Add wheel event listener to the document for controlled scrolling
    const wheelHandler = (e: WheelEvent) => {
      if (railRef.current && document.activeElement === document.body) {
        handleWheel(e);
      }
    };

    const railElement = railRef.current;
    if (railElement) {
      railElement.addEventListener('scroll', handleScroll);
      document.addEventListener('wheel', wheelHandler, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (railElement) {
        railElement.removeEventListener('scroll', handleScroll);
        document.removeEventListener('wheel', wheelHandler);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentSlide, isScrolling, scrollToSlide]);

  return (
    <HeroContainer id="home">
      

      {/* left column */}
      <HeroText>
        <TitleBackground>
          <HeroTitleTop>Currently a Digital Designer.</HeroTitleTop>
          <HeroTitleBottom>
            Living in Nairobi, creating products that empower clients.
          </HeroTitleBottom>
        </TitleBackground>

        <BtnWrap>
          <PortfolioButton
            expanded={expanded}
            lowEnd={lowEndDevice}
            onClick={handlePortfolioClick}
            aria-label="View Portfolio"
            aria-expanded={expanded}
            ref={portfolioBtnRef}
          >
            <CtaLabel expanded={expanded}>View Portfolio</CtaLabel>
            <ArrowBadge expanded={expanded}>
              <ArrowUpIcon expanded={expanded} />
            </ArrowBadge>

            {/* Grid of service cards becomes visible when expanded */}
            {expanded && (
              <CardGrid visible ref={cardGridRef}>
                {[
                    {
                      title: 'Product Design',
                      desc: 'Creating user-friendly and visually appealing interfaces.',
                      path: '/work/ux-ui',
                    },
                    {
                      title: 'Website Development',
                      desc: 'Mocking up and developing websites for clients.',
                      path: '/work/web-dev',
                    },
                    {
                      title: 'Branding',
                      desc: 'Creating visually stunning and engaging brand identities.',
                      path: '/work/graphics',
                    },
                  ].map(({ title, desc, path }, i) => (
                  <ServiceCard 
                    key={title}
                    bg={serviceBackgrounds[i]}
                    style={{ width: '100%', aspectRatio: '1 / 1', height: 'auto', minHeight: '0' }}
                    onClick={(e) => handleServiceClick(e, path)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleServiceClick(e as unknown as React.MouseEvent<HTMLDivElement>, path);
                      }
                    }}
                  >
                      <TextOverlay>
                        <ServicesH2>{title}</ServicesH2>
                        <ServicesP>{desc}</ServicesP>
                      </TextOverlay>
                    </ServiceCard>
                ))}
              </CardGrid>
            )}
          </PortfolioButton>
        </BtnWrap>
      </HeroText>

      {/* mobile photo */}
      <MobileImg src={meImage} alt="Ian Cheruiyot" />

      <HeroRight>
        <Rail ref={railRef}>
          {/* Desktop portrait image as the first slide */}
          <Slide>
            <DesktopImg src={meImage} alt="Ian Cheruiyot" />
          </Slide>

          
        </Rail>
      </HeroRight>

      {/* Slide indicators (desktop only) */}
      {hasSlideNavigation && (
        <SlideIndicatorsContainer>
        {[...Array(totalSlides)].map((_, index) => (
          <SlideIndicator
            key={index}
            $active={currentSlide === index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        <SlideIndicator
          $active={false}
          onClick={() => scrollToSlide(totalSlides)}
          aria-label="Go to footer"
        />
      </SlideIndicatorsContainer>
      )}

      {/* Mobile scroll indicator */}
      <ScrollIndicatorWrapper visible={scrollIndicatorVisible}>
        <ScrollText>Scroll</ScrollText>
        <ScrollArrow />
      </ScrollIndicatorWrapper>
    </HeroContainer>
  );
};

/* ── card grid inside expanded CTA ───────────────── */
export const CardGrid = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-auto-rows: auto;
  gap: 32px;
  width: 100%;
  align-content: flex-start; /* start at top */
  overflow-y: auto;
  padding: 48px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr; /* single column */
    gap: 24px;
    /* extra top padding (navbar 80px + 24px gap) */
    padding: 104px 16px 48px;
  }
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease 0.05s; /* fade in after button grows */
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};

  border-radius: 24px;
  overflow: hidden;

  /* translucent backdrop behind cards */
  background: ${({ theme }) => theme.theme === 'light' ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.30)'};
  backdrop-filter: blur(6px) saturate(140%);
  -webkit-backdrop-filter: blur(6px) saturate(140%);
  


`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 32px;
  color: #fff;
  font-weight: 600;
  text-align: center;
`;


export default HeroSection;
