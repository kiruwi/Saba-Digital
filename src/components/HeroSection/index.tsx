import styled, { keyframes, css } from "styled-components";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FC,
  useMemo,
} from "react";
import meImage from "../../images/me.webp";
import LightRays from "../LightRays";
import {
  ServicesCardHover as ServiceCard,
  TextOverlay,
  ServicesH2,
  ServicesP,
  serviceBackgrounds,
  Slide,
} from "../Services/ServicesElements";

import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import {
  buildOptimizedImageUrl,
  buildSrcSet,
} from "../../utils/imageOptimizer";
import { loadGsap } from "../../utils/gsapLoader";

// Service items for the portfolio popup grid (first row visible, more rows lazy-load)
export const SERVICE_ITEMS = [
  {
    title: "Product Design",
    desc: "Creating user-friendly and visually appealing interfaces.",
    path: "/work/ux-ui",
  },
  {
    title: "Website Development",
    desc: "Mocking up and developing websites for clients.",
    path: "/work/web-dev",
  },
  {
    title: "Branding",
    desc: "Creating visually stunning and engaging brand identities.",
    path: "/work/graphics",
  },

  {
    title: "Ad Design",
    desc: "High-impact advert creatives for campaigns.",
    path: "/work/ad-design",
  },
  {
    title: "Motion Graphics",
    desc: "Engaging animations and motion design for storytelling.",
    path: "/work/motion",
  },
];

/* ── layout grid ───────────────────────────────────── */
export const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => (theme.theme === "light" ? "#000" : "#fff")};
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 1000px) {
    overflow: auto; /* allow normal scrolling on mobile */
  }
`;

/* Centered inner grid to match other sections' max-width behavior */
export const HeroContent = styled.div`
  position: relative;
  display: grid;
  /* Increased portrait column width by 10% (480px → 528px) to enlarge profile image */
  grid-template-columns: 1fr 528px;
  gap: 0;
  width: 100%;
  max-width: 1250px; /* align with TrustedBy Container */
  margin: 0 auto; /* center horizontally */
  min-height: 100vh;

  @media (max-width: 1000px) {
    display: block;
    min-height: auto;
  }
`;

export const HeroBg = styled.div``;

/* ── copy column ───────────────────────────────────── */
export const HeroText = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  max-width: none;
  padding: 11rem 3rem 3rem;

  @media (max-width: 1000px) {
    padding: 4rem 1.5rem 2rem;
    text-align: center;
  }
`;

export const TitleBackground = styled.div`
  display: flex;
  width: 100%;
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
  font-family: 'Nohemi', sans-serif;
  font-weight: 500;
  line-height: 0.9;
  margin: 0;
`;

const HERO_IMAGE_WIDTHS = [480, 720, 960, 1280];
const HERO_SIZES = "(max-width: 1000px) 85vw, 528px";
const HERO_IMAGE_DIMENSION = 1200;

type LoadedGsap = Awaited<ReturnType<typeof loadGsap>>;
type GsapTween = InstanceType<LoadedGsap["gsap"]["core"]["Tween"]>;

export const HeroTitleTop = styled.h1`
  ${baseTitle};
  font-size: clamp(4rem, 6vw, 6rem);
  color: ${({ theme }) => theme?.colors?.primary || "#2db670"};
  width: 100%;

  /* Ensure inline spans inside the title always use the theme green */
  & span {
    color: ${({ theme }) => theme?.colors?.primary || "#2db670"};
  }

  /* Keep font-size consistent; adjust tracking on the second line to reach target width */
  & > span:last-of-type {
    display: inline-block;
    letter-spacing: 0.02em; /* fine-tune to align the end of "Designer." with the visual guide */
  }
`;

export const AccentGreen = styled.span`
  color: ${({ theme }) => theme?.colors?.primary || "#2db670"};
  font-family: "Nohemi", sans-serif; /* Ensure hero phrase uses Nohemi instead of Satoshi */
`;

/* Text span that forces Nohemi font while inheriting color */
export const NohemiSpan = styled.span`
  font-family: "Nohemi", sans-serif;
  color: inherit; /* ensure global span color doesn't override HeroTitleTop color */
`;

/* Subtitle under the main hero title using paragraph font */
export const HeroSubtitle = styled.h2`
  font-family: "Satoshi", "Nohemi", sans-serif; /* match paragraph font */
  font-weight: 400;
  line-height: 1.1;
  margin: 0;
  color: ${({ theme }) => (theme.theme === "light" ? "#000" : "#fff")};
  width: 100%;
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
export const PortfolioButton = styled.button<{
  $expanded: boolean;
  $lowEnd?: boolean;
}>`
  position: ${({ $expanded }) => ($expanded ? "fixed" : "relative")};
  top: ${({ $expanded }) => ($expanded ? "50%" : "auto")};
  left: ${({ $expanded }) => ($expanded ? "50%" : "auto")};
  transform: ${({ $expanded }) =>
    $expanded ? "translate(-50%, -50%)" : "none"};

  width: ${({ $expanded }) => ($expanded ? "90vw" : "auto")};
  max-width: ${({ $expanded }) => ($expanded ? "none" : "75rem")};
  min-height: ${({ $expanded }) => ($expanded ? "500px" : "auto")};
  max-height: ${({ $expanded }) => ($expanded ? "90vh" : "none")};
  overflow-y: ${({ $expanded }) => ($expanded ? "auto" : "visible")};
  overscroll-behavior: contain;

  /* Full-screen overlay on small devices */
  @media (max-width: 1000px) {
    ${({ $expanded }) =>
      $expanded &&
      css`
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
  padding: ${({ $expanded }) => ($expanded ? 0 : "18px 64px 18px 32px")};

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${({ $expanded }) => ($expanded ? "32px" : "28px")};
  background: ${({ $expanded, theme }) =>
    $expanded ? "transparent" : theme.colors.primary};
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  color: #fff;
  font-size: ${({ $expanded }) => ($expanded ? 0 : "1rem")};
  font-weight: 500; /* revert CTA label to normal weight */
  cursor: pointer;
  z-index: ${({ $expanded }) => ($expanded ? 9999 : "auto")};

  will-change: transform, width, height;
  transition: none;
`;

/* button label */
export const CtaLabel = styled.span<{ $expanded: boolean }>`
  opacity: ${({ $expanded }) => ($expanded ? 0 : 1)};
  transition: opacity 0.45s ease;
  pointer-events: none;
`;

/* yellow circle */
export const ArrowBadge = styled.span<{ $expanded: boolean }>`
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
  transition: top 0.45s ease, right 0.45s ease, bottom 0.45s ease,
    left 0.45s ease;

  ${({ $expanded }) =>
    $expanded &&
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
export const ArrowUpIcon = styled(FiArrowUpRight)<{ $expanded: boolean }>`
  font-size: 24px;
  color: #000;
  transition: transform 0.45s ease;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(-180deg)" : "rotate(0deg)"};
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

export const PortraitPicture = styled.picture`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
`;

export const DesktopPortrait = styled(PortraitPicture)`
  flex: 1 1 auto;
`;

export const MobilePortrait = styled(PortraitPicture)`
  width: 100%;

  @media (min-width: 1000px) {
    display: none;
  }
`;

/* images */
export const DesktopImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 50%;
`;

export const MobileImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;

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
  top: -8px;
  right: -8px;
  transform: none;
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
      ? theme.theme === "light"
        ? theme.colors.primary
        : "#fff"
      : theme.theme === "light"
      ? "rgba(0,0,0,0.3)"
      : "rgba(255,255,255,0.5)"};
  transition: background 0.3s ease;
`;

/* ---------- HERO SECTION COMPONENT ---------- */
const totalSlides = 1; // Only profile slide
const hasSlideNavigation = totalSlides > 1;

const HeroSection: FC = () => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEndDevice =
    prefersReducedMotion ||
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const dragHintRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [, setScrollIndicatorVisible] = useState(true); // scroll indicator removed

  // desktop drag-to-scroll hint for card grid
  const draggingCards = useRef(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const [dragHintPos, setDragHintPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const heroImageSources = useMemo(() => {
    const fallbackSrc = buildOptimizedImageUrl(meImage, {
      width: HERO_IMAGE_DIMENSION,
      quality: 85,
      fit: "cover",
    });

    const pngSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 85,
      fit: "cover",
    });

    const webpSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 80,
      fit: "cover",
      format: "webp",
    });

    const avifSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 70,
      fit: "cover",
      format: "avif",
    });

    const preload = buildOptimizedImageUrl(meImage, {
      width: HERO_IMAGE_DIMENSION,
      quality: 75,
      fit: "cover",
      format: "avif",
    });

    return {
      fallbackSrc,
      pngSrcSet,
      webpSrcSet,
      avifSrcSet,
      preload,
      sizes: HERO_SIZES,
      width: HERO_IMAGE_DIMENSION,
      height: HERO_IMAGE_DIMENSION,
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!heroImageSources.preload) return;
    const existing = document.head.querySelector<HTMLLinkElement>(
      'link[data-hero-preload="portrait"]'
    );
    if (existing) {
      if (existing.href !== heroImageSources.preload) {
        existing.href = heroImageSources.preload;
      }
      return;
    }

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = heroImageSources.preload;
    link.fetchPriority = "high";
    link.setAttribute("data-hero-preload", "portrait");
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [heroImageSources.preload]);

  // Keep the drag hint following the cursor whenever it's visible
  useEffect(() => {
    if (!showDragHint) return;
    const onPointerMove = (e: PointerEvent) => {
      setDragHintPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [showDragHint]);

  // hero heading line-flip animation
  useEffect(() => {
    if (lowEndDevice) return;
    const titleEl = titleRef.current;
    if (!titleEl) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    loadGsap({ withSplitText: true })
      .then(({ gsap, SplitText }) => {
        if (cancelled || !SplitText) return;

        let split: any = null;
        let animation: GsapTween | null = null;

        const setup = () => {
          if (!titleRef.current) return;
          split && split.revert();
          animation && animation.revert();
          split = SplitText.create(titleRef.current, { type: "lines" });
        };

        const play = () => {
          if (!split) return;
          animation && animation.revert();
          animation = gsap.from(split.lines, {
            rotationX: -100,
            transformOrigin: "50% 50% -20px",
            opacity: 0,
            duration: 0.8,
            ease: "power3",
            stagger: 0.25,
          });
        };

        const start = () => {
          if (cancelled) return;
          setup();
          play();
          titleEl.addEventListener("click", play);
          window.addEventListener("resize", setup);
        };

        const fontsReady = (document as any)?.fonts?.ready;
        if (fontsReady && typeof fontsReady.then === "function") {
          fontsReady.then(start).catch(start);
        } else {
          start();
        }

        cleanup = () => {
          titleEl.removeEventListener("click", play);
          window.removeEventListener("resize", setup);
          split && split.revert();
          animation && animation.revert();
        };
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.warn("[HeroSection] Failed to load GSAP SplitText", error);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [lowEndDevice]);

  // glow pulse on drag hint while dragging
  useEffect(() => {
    if (lowEndDevice) return;
    if (!draggingCards.current || !dragHintRef.current) return;

    let tween: GsapTween | undefined;
    let cancelled = false;

    loadGsap()
      .then(({ gsap }) => {
        if (cancelled || !dragHintRef.current) return;

        tween = gsap.to(dragHintRef.current, {
          boxShadow: "0 0 16px rgba(255,255,255,0.5)",
          duration: 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.warn("[HeroSection] Failed to load GSAP for drag hint", error);
      });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [lowEndDevice, showDragHint]);

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
    grid.addEventListener("scroll", onScroll);
    return () => grid.removeEventListener("scroll", onScroll);
  }, [expanded]);
  const portfolioBtnRef = useRef<HTMLButtonElement | null>(null);
  const hasScrolled = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isScrolling = useRef(false);
  const didDrag = useRef(false);

  const navigate = useNavigate();

  // navigate to page when card clicked inside portfolio popup
  const handleServiceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    path: string
  ) => {
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
    const event = new CustomEvent("portfolioExpanded", { detail: expanded });
    window.dispatchEvent(event);

    if (expanded) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("portfolio-expanded");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("portfolio-expanded");
    }

    // Listen for collapse requests from Navbar arrow
    const collapseHandler = () => setExpanded(false);
    window.addEventListener("collapsePortfolio", collapseHandler);

    // cleanup on unmount to be extra-safe
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("collapsePortfolio", collapseHandler);
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

  // Attach momentum-based drag-to-scroll for desktop card grid
  useEffect(() => {
    if (!expanded || window.innerWidth <= 1000) return;
    const container = cardGridRef.current;
    if (!container) return;

    interface CarouselState {
      isDragging: boolean;
      startX: number;
      scrollLeft: number;
      velocity: number;
      lastX: number;
      lastTime: number;
      dragDistance: number;
      animationId?: number;
    }

    const state: CarouselState = {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      velocity: 0,
      lastX: 0,
      lastTime: 0,
      dragDistance: 0,
    };

    const snapToNearest = () => {
      const cards = Array.from(container.children) as HTMLElement[];
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let nearest = cards[0];
      let minDist = Infinity;
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          nearest = card;
        }
      });
      container.style.scrollSnapType = "x mandatory";
      container.scrollTo({
        left:
          nearest.offsetLeft -
          (container.offsetWidth - nearest.offsetWidth) / 2,
        behavior: "smooth",
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.startX = e.pageX - container.offsetLeft;
      state.scrollLeft = container.scrollLeft;
      state.lastX = e.pageX;
      state.lastTime = Date.now();
      state.dragDistance = 0;
      container.style.scrollSnapType = "none";
      container.style.cursor = "grabbing";
      container.classList.add("dragging");
      if (state.animationId) cancelAnimationFrame(state.animationId);
      didDrag.current = false;
      draggingCards.current = true;
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!state.isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (state.startX - x) * 1.2;
      state.dragDistance = Math.abs(walk);
      container.scrollLeft = state.scrollLeft + walk;

      // Calculate velocity for momentum
      const now = Date.now();
      const dt = now - state.lastTime;
      if (dt > 0) state.velocity = (e.pageX - state.lastX) / dt;
      state.lastX = e.pageX;
      state.lastTime = now;

      // Mark as dragged if moved more than 5px
      if (state.dragDistance > 5) didDrag.current = true;

      setDragHintPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!state.isDragging) return;
      state.isDragging = false;
      container.style.cursor = "grab";
      container.classList.remove("dragging");
      draggingCards.current = false;

      // Prevent click if dragged
      if (state.dragDistance > 5) {
        e.preventDefault();
        // Apply momentum
        const momentum = state.velocity * 300;
        const targetScroll = container.scrollLeft - momentum;

        const animate = () => {
          const diff = targetScroll - container.scrollLeft;
          if (Math.abs(diff) > 1) {
            container.scrollLeft += diff * 0.1;
            state.animationId = requestAnimationFrame(animate);
          } else {
            snapToNearest();
            setTimeout(() => {
              didDrag.current = false;
            }, 100);
          }
        };
        state.animationId = requestAnimationFrame(animate);
      } else {
        container.style.scrollSnapType = "x mandatory";
        setTimeout(() => {
          didDrag.current = false;
        }, 100);
      }
    };

    const handleMouseEnter = () => setShowDragHint(true);
    const handleMouseLeave = () => {
      setShowDragHint(false);
      state.isDragging = false;
      draggingCards.current = false;
    };

    const handleClickCapture = (e: MouseEvent) => {
      if (didDrag.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("click", handleClickCapture, true);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("click", handleClickCapture, true);
      if (state.animationId) cancelAnimationFrame(state.animationId);
    };
  }, [expanded]);

  const handlePortfolioClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If a drag just happened, normally swallow the next click to avoid accidental opens
    // But when expanded, allow this click to close immediately
    if (didDrag.current) {
      didDrag.current = false; // reset for next interaction
      if (!expanded) {
        e.stopPropagation();
        return;
      }
      // if expanded, proceed to collapse
    }
    if (expanded) {
      // collapse and smooth scroll to services section
      setExpanded(false);
      if (window.innerWidth > 1000) {
        const target = document.getElementById("services");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setExpanded(true);
      // Show the drag hint immediately at the cursor when expanding on desktop
      if (window.innerWidth > 1000) {
        setShowDragHint(true);
        setDragHintPos({ x: e.clientX, y: e.clientY });
      }
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
      if (!railRef.current) return;
      if (slideIndex < 0 || slideIndex > totalSlides) return;

      isScrolling.current = true;
      const slideHeight = window.innerHeight;
      railRef.current.scrollTo({
        top: slideHeight * slideIndex,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation duration (~600ms)
      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (currentSlide === totalSlides - 1) {
          scrollToSlide(totalSlides); // Go to footer
        } else {
          scrollToSlide(currentSlide + 1);
        }
      }
      // Arrow Up or Page Up
      else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSlide(Math.max(0, currentSlide - 1));
      }
      // Home key
      else if (e.key === "Home") {
        e.preventDefault();
        scrollToSlide(0);
      }
      // End key
      else if (e.key === "End") {
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
      railElement.addEventListener("scroll", handleScroll);
      document.addEventListener("wheel", wheelHandler, { passive: false });
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (railElement) {
        railElement.removeEventListener("scroll", handleScroll);
        document.removeEventListener("wheel", wheelHandler);
        document.removeEventListener("keydown", handleKeyDown);
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

      <HeroContent>
        {/* left column */}
        <HeroText>
          <TitleBackground>
            <HeroTitleTop ref={titleRef} id="hero-title" className="hero-text">
              <NohemiSpan>Built Different</NohemiSpan>
              <br />
              <NohemiSpan>Designed Better</NohemiSpan>
            </HeroTitleTop>
            <HeroSubtitle>
              I'm Ian, and I design products that empower clients.
            </HeroSubtitle>
          </TitleBackground>

          <BtnWrap>
            <PortfolioButton
              $expanded={expanded}
              $lowEnd={lowEndDevice}
              onClick={handlePortfolioClick}
              aria-label="View Portfolio"
              aria-expanded={expanded}
              ref={portfolioBtnRef}
            >
              <CtaLabel $expanded={expanded}>View Portfolio</CtaLabel>
              <ArrowBadge $expanded={expanded}>
                <ArrowUpIcon $expanded={expanded} />
              </ArrowBadge>

              {expanded && (
                <CardGrid visible ref={cardGridRef}>
                  {SERVICE_ITEMS.slice(0, visibleCount).map(
                    ({ title, desc, path }, i) => (
                      <ServiceCard
                        key={title}
                        bg={serviceBackgrounds[i]}
                        style={{
                          flex:
                            window.innerWidth <= 1000
                              ? "0 0 auto"
                              : "0 0 320px",
                          width: window.innerWidth <= 1000 ? "100%" : "320px",
                          aspectRatio: "1 / 1",
                          height: "auto",
                          minHeight: "0",
                        }}
                        onClick={(e) =>
                          handleServiceClick(
                            e as React.MouseEvent<HTMLDivElement>,
                            path
                          )
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleServiceClick(
                              e as unknown as React.MouseEvent<HTMLDivElement>,
                              path
                            );
                          }
                        }}
                      >
                        <TextOverlay>
                          <ServicesH2>{title}</ServicesH2>
                          <ServicesP>{desc}</ServicesP>
                        </TextOverlay>
                      </ServiceCard>
                    )
                  )}
                </CardGrid>
              )}
            </PortfolioButton>
          </BtnWrap>
        </HeroText>

        {/* mobile photo */}
        <MobilePortrait>
          {heroImageSources.avifSrcSet && (
            <source
              type="image/avif"
              srcSet={heroImageSources.avifSrcSet}
              sizes={heroImageSources.sizes}
            />
          )}
          {heroImageSources.webpSrcSet && (
            <source
              type="image/webp"
              srcSet={heroImageSources.webpSrcSet}
              sizes={heroImageSources.sizes}
            />
          )}
          <MobileImg
            src={heroImageSources.fallbackSrc}
            alt="Ian Cheruiyot"
            srcSet={heroImageSources.pngSrcSet}
            sizes={heroImageSources.sizes}
            width={heroImageSources.width}
            height={heroImageSources.height}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </MobilePortrait>

        <HeroRight>
          <Rail ref={railRef}>
            {/* Desktop portrait image as the first slide */}
            <Slide>
              <DesktopPortrait>
                {heroImageSources.avifSrcSet && (
                  <source
                    type="image/avif"
                    srcSet={heroImageSources.avifSrcSet}
                    sizes={heroImageSources.sizes}
                  />
                )}
                {heroImageSources.webpSrcSet && (
                  <source
                    type="image/webp"
                    srcSet={heroImageSources.webpSrcSet}
                    sizes={heroImageSources.sizes}
                  />
                )}
                <DesktopImg
                  src={heroImageSources.fallbackSrc}
                  alt="Ian Cheruiyot"
                  srcSet={heroImageSources.pngSrcSet}
                  sizes={heroImageSources.sizes}
                  width={heroImageSources.width}
                  height={heroImageSources.height}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </DesktopPortrait>
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
      </HeroContent>

      {/* Scroll indicator removed */}

      {showDragHint && (
        <DragHint
          ref={dragHintRef}
          dragging={draggingCards.current}
          style={{ top: dragHintPos.y, left: dragHintPos.x }}
        >
          {draggingCards.current ? "Drag to scroll" : "Click and drag"}
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
    justify-items: center;
    /* ensure cards span full width and prevent horizontal overflow */
    & > * {
      width: 100% !important;
      flex: 0 0 auto !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    /* scroll padding not needed in vertical layout */
    scroll-padding: 0;
  }
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  border-radius: 24px;
  overflow: hidden;

  /* translucent backdrop behind cards */
  background: ${({ theme }) =>
    theme.theme === "light" ? "rgba(255,255,255,0.30)" : "rgba(0,0,0,0.30)"};
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
  transform: translate(-50%, -50%)
    scale(${({ dragging }) => (dragging ? 1.1 : 1)});
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
