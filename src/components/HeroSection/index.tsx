import styled, { keyframes, css } from 'styled-components';
import React, { useState, useEffect, useRef, useCallback, FC } from 'react';
import meImage from '../../images/me.png';
import LightRays from '../LightRays';
import { ServicesCardHover as ServiceCard, TextOverlay, ServicesH2, ServicesP, serviceBackgrounds, Slide } from '../Services/ServicesElements';

import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

// Service items for the portfolio popup grid (first row visible, more rows lazy-load)
export const SERVICE_ITEMS = [
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

  {
    title: 'Ad Design',
    desc: 'High-impact advert creatives for campaigns.',
    path: '/work/ad-design',
  },
  {
    title: 'Motion Graphics',
    desc: 'Engaging animations and motion design for storytelling.',
    path: '/work/motion',
  }

];





/* ── layout grid ───────────────────────────────────── */
export const HeroContainer = styled.section`
  display: grid;
  /* Increased portrait column width by 10% (480px → 528px) to enlarge profile image */
  grid-template-columns: 1fr 528px;
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
  /* Added to enable 3D depth for line-flip animation */
  perspective: 600px;
  perspective-origin: 50% 50%;
`;

const LightRaysWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 1;
  mix-blend-mode: screen;
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



export const AccentGreen = styled.span`
  color: #3db54e;
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
  transition: none;
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

  const titleRef = useRef<HTMLHeadingElement>(null);
  const dragHintRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [, setScrollIndicatorVisible] = useState(true); // scroll indicator removed

  // desktop drag-to-scroll hint for card grid
  const [draggingCards, setDraggingCards] = useState(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const [dragHintPos, setDragHintPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // hero heading line-flip animation
  useEffect(() => {
    if (lowEndDevice) return;
    if (!titleRef.current) return;

    const titleEl = titleRef.current;

    let split: any;
    let animation: gsap.core.Tween | null = null;

    const setup = () => {
      if (!titleRef.current) return;
      split && split.revert();
      animation && animation.revert();
      split = SplitText.create(titleRef.current, { type: 'lines' });
    };

    const play = () => {
      animation && animation.revert();
      animation = gsap.from(split.lines, {
        rotationX: -100,
        transformOrigin: '50% 50% -160px',
        opacity: 0,
        duration: 0.8,
        ease: 'power3',
        stagger: 0.25,
      });
    };

    setup();
    play();

    const handleClick = () => play();
    titleEl?.addEventListener('click', handleClick);
    window.addEventListener('resize', setup);

    return () => {
      titleEl?.removeEventListener('click', handleClick);
      window.removeEventListener('resize', setup);
      split && split.revert();
      animation && animation.revert();
    };
  }, [lowEndDevice]);
      


  // glow pulse on drag hint while dragging
  useEffect(() => {
    if (lowEndDevice) return;
    if (draggingCards && dragHintRef.current) {
      const tween = gsap.to(dragHintRef.current, {
        boxShadow: '0 0 16px rgba(255,255,255,0.5)',
        duration: 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      return () => {
        tween.kill();
      };
    }
  }, [draggingCards, lowEndDevice]);

  // hide scroll arrow when popup expanded
  useEffect(() => {
    if (expanded) setScrollIndicatorVisible(false);
  }, [expanded]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardGridRef = useRef<HTMLDivElement | null>(null);

  // How many cards are currently visible (lazy-load one row ~3 cards at a time)
  const [visibleCount, setVisibleCount] = useState(3);

  // Reset or expand visible cards whenever popup opens
  useEffect(() => {
    if (!expanded) return;
    if (window.innerWidth > 1000) {
      setVisibleCount(SERVICE_ITEMS.length); // show all on desktop for horizontal scroll
    } else {
      setVisibleCount(SERVICE_ITEMS.length); // show all on mobile
    }
  }, [expanded]);

  // Reveal next row when user scrolls to near-bottom of the grid
  useEffect(() => {
    if (!expanded) return;
    const grid = cardGridRef.current;
    if (!grid) return;
    const onScroll = () => {
      if (grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 50) {
        setVisibleCount((prev) => Math.min(prev + 3, SERVICE_ITEMS.length));
      }
    };
    grid.addEventListener('scroll', onScroll);
    return () => grid.removeEventListener('scroll', onScroll);
  }, [expanded]);
  const portfolioBtnRef = useRef<HTMLButtonElement | null>(null);
  const hasScrolled = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);


  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const didDrag = useRef(false);

  const navigate = useNavigate();

  // navigate to page when card clicked inside portfolio popup
  const handleServiceClick = (e: React.MouseEvent<HTMLDivElement>, path: string) => {
    // If the user has just dragged, ignore the click
    if (didDrag.current) {
      didDrag.current = false; // reset for next interaction
      return;
    }
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

  // Attach click-and-drag horizontal scroll for desktop card grid
  useEffect(() => {
    if (!expanded || window.innerWidth <= 1000) return;
    const grid = cardGridRef.current;
    if (!grid) return;

    const handleMouseEnter = () => setShowDragHint(true);
    const handleMouseLeave = () => {
      grid.classList.remove('dragging');
      setShowDragHint(false);
      setDraggingCards(false);
    };
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      // If the pointer moved, mark as drag so subsequent click is suppressed
      if (!didDrag.current && Math.abs(e.pageX - (dragStartX.current + grid.offsetLeft)) > 5) {
        didDrag.current = true;
      }
      setDragHintPos({ x: e.clientX, y: e.clientY });
      if (!draggingCards) return;
      const x = e.pageX - grid.offsetLeft;
      const walk = dragStartX.current - x;
      grid.scrollLeft = dragStartScroll.current + walk;
    };
    const handleMouseDown = (e: MouseEvent) => {
      didDrag.current = false; // reset at drag start
      setDraggingCards(true);
      grid.classList.add('dragging');
      // temporarily disable snap so drag feels smooth
      grid.style.scrollSnapType = 'none';
      grid.style.scrollBehavior = 'auto';
      e.preventDefault();
      dragStartX.current = e.pageX - grid.offsetLeft;
      dragStartScroll.current = grid.scrollLeft;
    };
    const handleMouseUp = () => {
      setDraggingCards(false);
      grid.classList.remove('dragging');
      // restore snap
      grid.style.scrollSnapType = 'x mandatory';
    };

    grid.addEventListener('mouseenter', handleMouseEnter);
    grid.addEventListener('mouseleave', handleMouseLeave);
    grid.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    // swallow click immediately after a drag so no card / wrapper click fires
    const handleClickCapture = (e: MouseEvent) => {
      if (didDrag.current) {
        e.stopPropagation();
        e.preventDefault();
        didDrag.current = false;
      }
    };
    grid.addEventListener('click', handleClickCapture, true);

    return () => {
      grid.removeEventListener('mouseenter', handleMouseEnter);
      grid.removeEventListener('mouseleave', handleMouseLeave);
      grid.removeEventListener('mousemove', handleMouseMove);
      grid.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      grid.removeEventListener('click', handleClickCapture, true);
    };
  }, [expanded, draggingCards]);

  const handlePortfolioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
     // if just dragged, swallow the click that follows
     if (didDrag.current) {
       didDrag.current = false; // reset for next legitimate click
       e.stopPropagation();
       return;
     }
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
  // Function to scroll to a specific slide
  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      if (!railRef.current) return;
      if (slideIndex < 0 || slideIndex > totalSlides) return;

      setIsScrolling(true);
      const slideHeight = window.innerHeight;
      railRef.current.scrollTo({
        top: slideHeight * slideIndex,
        behavior: 'smooth',
      });

      // Reset scrolling flag after animation duration (~600ms)
      setTimeout(() => setIsScrolling(false), 700);
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
      <LightRaysWrapper>
        <LightRays 
          raysColor="#f0f4ff" 
          raysSpeed={0.2} 
          lightSpread={0.65} 
          rayLength={0.7} 
          pulsating={true} 
          fadeDistance={1.0} 
          saturation={0.3} 
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.05}
        />
      </LightRaysWrapper>
      

      {/* left column */}
      <HeroText>
        <TitleBackground>
          <HeroTitleTop ref={titleRef} id="hero-title" className="hero-text">Currently a Digital Designer.<br/><AccentGreen>Living in Nairobi, creating products that empower clients.</AccentGreen></HeroTitleTop>
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

            {expanded && (
              <CardGrid visible ref={cardGridRef}>
                {SERVICE_ITEMS.slice(0, visibleCount).map(({ title, desc, path }, i) => (
                  <ServiceCard
                    key={title}
                    bg={serviceBackgrounds[i]}
                    style={{ flex: '0 0 320px', width: '320px', aspectRatio: '1 / 1', height: 'auto', minHeight: '0' }}
                    onClick={(e) => handleServiceClick(e as React.MouseEvent<HTMLDivElement>, path)}
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

      {/* Scroll indicator removed */}

      {showDragHint && (
        <DragHint
           ref={dragHintRef}
           dragging={draggingCards}
          style={{ top: dragHintPos.y, left: dragHintPos.x }}
        >
          {draggingCards ? 'Drag to scroll' : 'Click and drag'}
        </DragHint>
      )}
    </HeroContainer>
  );
};

/* ── card grid inside expanded CTA ───────────────── */
export const CardGrid = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: nowrap;
  gap: 32px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  /* extra breathing space on both ends so first/last cards are not flush */
  /* inner padding provides vertical space and half of the edge gap */
  padding: 48px 48px;

  /* breathing room via margins on first and last cards */
  & > *:first-child {
    margin-left: 48px;
  }
  & > *:last-child {
    margin-right: 48px;
  }

  /* provide consistent snap-start offset */
  scroll-padding: 0 48px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* smooth on iOS */

  /* hide scrollbar visually */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  &::-webkit-scrollbar {
    display: none;
  }

  /* mobile reverts to vertical list */
  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 80px 16px 48px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: none;
    /* ensure cards span full width and prevent horizontal overflow */
    & > * {
      width: 100% !important;
      flex: 0 0 auto !important;
    }
    /* scroll padding not needed in vertical layout */
    scroll-padding: 0;
    /* remove extra margins in single-column mobile layout */
    & > *:first-child {
      margin-left: 0;
    }
    & > *:last-child {
      margin-right: 0;
    }
  }
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};


  border-radius: 24px;
  overflow: hidden;

  /* translucent backdrop behind cards */
  background: ${({ theme }) => theme.theme === 'light' ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.30)'};
  backdrop-filter: blur(6px) saturate(140%);
  -webkit-backdrop-filter: blur(6px) saturate(140%);
  


`;

export const DragHint = styled.div<{ dragging: boolean }>`
  position: fixed;
  pointer-events: none;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.75rem;
  border-radius: 8px;
  opacity: ${({ dragging }) => (dragging ? 0.95 : 0.8)};
  transform: translate(-50%, -50%) scale(${({ dragging }) => (dragging ? 1.1 : 1)});
  transition: opacity 0.15s ease, transform 0.15s ease;
  white-space: nowrap;
  z-index: 99999;
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
