import styled, { keyframes, css } from "styled-components";
import Lenis from "lenis";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FC,
  useMemo,
} from "react";
import meImage from "../../images/me.webp";
import LightRays from "../LightRays/LightRays";
import {
  ServiceVideoIcon,
  ServiceVisualLayer,
  ServicesCardHover as ServiceCard,
  TextOverlay,
  ServicesH2,
  ServicesP,
  serviceVisuals,
  Slide,
} from "../Services/ServicesElements";

import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import {
  buildOptimizedImageUrl,
  buildSrcSet,
} from "../../utils/imageOptimizer";

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

// Serve higher-res source sets to reduce aliasing on retina/large screens
const HERO_IMAGE_WIDTHS = [480, 720, 960, 1280, 1600];
const HERO_SIZES = "(max-width: 1000px) 85vw, 528px";
const HERO_IMAGE_DIMENSION = 1600;
const PORTFOLIO_CARD_WIDTHS = [320, 480, 640, 800];
const PORTFOLIO_CARD_SIZES = "(max-width: 1000px) calc(100vw - 32px), 320px";
const PORTFOLIO_CARD_IMAGE_DIMENSION = 800;
type PortfolioCardImageAsset = {
  fallbackSrc: string;
  pngSrcSet: string;
  webpSrcSet: string;
  avifSrcSet: string;
  sizes: string;
  width: number;
  height: number;
  preloadSrc: string;
};
type PortfolioCardVisualAsset = PortfolioCardImageAsset | null;

const titleReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeroTitleTop = styled.h1`
  ${baseTitle};
  font-size: clamp(4rem, 6vw, 6rem);
  color: ${({ theme }) => theme?.colors?.primary || "#2db670"};
  width: 100%;
  animation: ${titleReveal} 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;

  /* Ensure inline spans inside the title always use the theme green */
  & span {
    color: ${({ theme }) => theme?.colors?.primary || "#2db670"};
  }

  /* Keep font-size consistent; adjust tracking on the second line to reach target width */
  & > span:last-of-type {
    display: inline-block;
    letter-spacing: 0.02em; /* fine-tune to align the end of "Designer." with the visual guide */
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
  object-position: center top;
  flex-shrink: 0;
  border-radius: 50%;
`;

export const MobileImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const PortfolioCardPicture = styled.picture`
  position: absolute;
  inset: 0;
  display: block;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const PortfolioCardImg = styled.img.attrs({
  decoding: "async",
})`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.03);
  transition: transform 0.55s ease;

  ${ServiceCard}:hover & {
    transform: scale(1);
  }

  @media (max-width: 1000px) {
    transform: scale(1);
    object-position: center center;
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

  const [expanded, setExpanded] = useState(false);
  const [, setScrollIndicatorVisible] = useState(true); // scroll indicator removed

  const heroImageSources = useMemo(() => {
    const fallbackSrc = buildOptimizedImageUrl(meImage, {
      width: HERO_IMAGE_DIMENSION,
      quality: 90,
      fit: "inside",
    });

    const pngSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 90,
      fit: "inside",
    });

    const webpSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 85,
      fit: "inside",
      format: "webp",
    });

    const avifSrcSet = buildSrcSet(meImage, HERO_IMAGE_WIDTHS, {
      quality: 80,
      fit: "inside",
      format: "avif",
    });

    const preload = buildOptimizedImageUrl(meImage, {
      width: HERO_IMAGE_DIMENSION,
      quality: 80,
      fit: "inside",
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

  const portfolioCardImages = useMemo<PortfolioCardVisualAsset[]>(
    () =>
      serviceVisuals.map((visual) => {
        if (visual.kind !== "image") return null;

        return {
          fallbackSrc: buildOptimizedImageUrl(visual.src, {
            width: PORTFOLIO_CARD_IMAGE_DIMENSION,
            quality: 78,
            fit: "cover",
          }),
          pngSrcSet: buildSrcSet(visual.src, PORTFOLIO_CARD_WIDTHS, {
            quality: 78,
            fit: "cover",
          }),
          webpSrcSet: buildSrcSet(visual.src, PORTFOLIO_CARD_WIDTHS, {
            quality: 76,
            fit: "cover",
            format: "webp",
          }),
          avifSrcSet: buildSrcSet(visual.src, PORTFOLIO_CARD_WIDTHS, {
            quality: 72,
            fit: "cover",
            format: "avif",
          }),
          sizes: PORTFOLIO_CARD_SIZES,
          width: PORTFOLIO_CARD_IMAGE_DIMENSION,
          height: PORTFOLIO_CARD_IMAGE_DIMENSION,
          preloadSrc: buildOptimizedImageUrl(visual.src, {
            width: 640,
            quality: 72,
            fit: "cover",
          }),
        };
      }),
    []
  );

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadImages = () => {
      portfolioCardImages.forEach((imageAsset) => {
        if (!imageAsset?.preloadSrc) return;
        const image = new Image();
        image.decoding = "async";
        image.src = imageAsset.preloadSrc;
      });
    };

    let idleHandle: number | undefined;
    const supportsIdleCallback = "requestIdleCallback" in window;

    if (supportsIdleCallback) {
      idleHandle = (
        window as typeof window & {
          requestIdleCallback: (callback: IdleRequestCallback) => number;
        }
      ).requestIdleCallback(() => preloadImages());
    } else {
      idleHandle = window.setTimeout(preloadImages, 300);
    }

    return () => {
      if (
        supportsIdleCallback &&
        idleHandle !== undefined &&
        "cancelIdleCallback" in window
      ) {
        (
          window as typeof window & {
            cancelIdleCallback: (handle: number) => void;
          }
        ).cancelIdleCallback(idleHandle);
      } else if (idleHandle !== undefined) {
        window.clearTimeout(idleHandle);
      }
    };
  }, [portfolioCardImages]);

  // hide scroll arrow when popup expanded
  useEffect(() => {
    if (expanded) setScrollIndicatorVisible(false);
  }, [expanded]);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardGridRef = useRef<HTMLDivElement | null>(null);
  const cardTrackRef = useRef<HTMLDivElement | null>(null);

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

  const navigate = useNavigate();

  // navigate to page when card clicked inside portfolio popup
  const handleServiceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    path: string
  ) => {
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

  useEffect(() => {
    if (
      !expanded ||
      typeof window === "undefined" ||
      window.innerWidth <= 1000 ||
      prefersReducedMotion
    ) {
      return;
    }

    const wrapper = cardGridRef.current;
    const content = cardTrackRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      eventsTarget: wrapper,
      orientation: "horizontal",
      gestureOrientation: "both",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      lerp: 0.12,
      overscroll: false,
      autoRaf: true,
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 360 : -360;
      lenis.scrollTo(wrapper.scrollLeft + delta);
    };

    wrapper.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => wrapper.focus());

    return () => {
      wrapper.removeEventListener("keydown", handleKeyDown);
      lenis.destroy();
    };
  }, [expanded, prefersReducedMotion]);

  const handlePortfolioClick = () => {
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
          raysColor="#000000"
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
            <HeroTitleTop id="hero-title" className="hero-text">
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
                <CardGrid
                  visible
                  ref={cardGridRef}
                  tabIndex={0}
                  aria-label="Portfolio categories"
                >
                  <CardTrack ref={cardTrackRef}>
                    {SERVICE_ITEMS.slice(0, visibleCount).map(
                      ({ title, desc, path }, i) => {
                        const visual = serviceVisuals[i];
                        const imageAsset = portfolioCardImages[i];

                        return (
                          <ServiceCard
                            key={title}
                            style={{
                              flex:
                                window.innerWidth <= 1000
                                  ? "0 0 auto"
                                  : "0 0 280px",
                              width: window.innerWidth <= 1000 ? "100%" : "280px",
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
                            {visual?.kind === "icon" ? (
                              <ServiceVisualLayer $iconOnly aria-hidden="true">
                                <ServiceVideoIcon />
                              </ServiceVisualLayer>
                            ) : imageAsset ? (
                              <PortfolioCardPicture aria-hidden="true">
                                {imageAsset.avifSrcSet && (
                                  <source
                                    type="image/avif"
                                    srcSet={imageAsset.avifSrcSet}
                                    sizes={imageAsset.sizes}
                                  />
                                )}
                                {imageAsset.webpSrcSet && (
                                  <source
                                    type="image/webp"
                                    srcSet={imageAsset.webpSrcSet}
                                    sizes={imageAsset.sizes}
                                  />
                                )}
                                <PortfolioCardImg
                                  src={imageAsset.fallbackSrc}
                                  alt=""
                                  srcSet={imageAsset.pngSrcSet}
                                  sizes={imageAsset.sizes}
                                  width={imageAsset.width}
                                  height={imageAsset.height}
                                  loading={i < 3 ? "eager" : "lazy"}
                                  fetchPriority={i < 2 ? "high" : "auto"}
                                  onError={(event) => {
                                    const target = event.currentTarget;
                                    if (visual?.kind === "image" && target.src !== visual.src) {
                                      target.src = visual.src;
                                      target.srcset = "";
                                    }
                                  }}
                                />
                              </PortfolioCardPicture>
                            ) : null}
                            <TextOverlay>
                              <ServicesH2>{title}</ServicesH2>
                              <ServicesP>{desc}</ServicesP>
                            </TextOverlay>
                          </ServiceCard>
                        );
                      }
                    )}
                  </CardTrack>
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
            onError={(e) => {
              if (e.currentTarget.src !== meImage) {
                e.currentTarget.src = meImage; // fall back to bundled asset if CDN fails
                e.currentTarget.srcset = "";
              }
            }}
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
                  onError={(e) => {
                    if (e.currentTarget.src !== meImage) {
                      e.currentTarget.src = meImage; // fall back to bundled asset if CDN fails
                      e.currentTarget.srcset = "";
                    }
                  }}
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

    </HeroContainer>
  );
};

/* ── card grid inside expanded CTA ───────────────── */
export const CardGrid = styled.div<{ visible: boolean }>`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch; /* smooth on iOS */

  /* hide scrollbar visually */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  &::-webkit-scrollbar {
    display: none;
  }

  /* mobile reverts to vertical list */
  @media (max-width: 1000px) {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: none;
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

export const CardTrack = styled.div`
  display: flex;
  gap: 32px;
  width: max-content;
  min-width: 100%;
  padding: 48px;

  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 24px;
    width: 100%;
    padding: 80px 20px 48px;

    & > * {
      width: min(100%, 280px) !important;
      flex: 0 0 auto !important;
      margin: 0 auto !important;
    }
  }
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
