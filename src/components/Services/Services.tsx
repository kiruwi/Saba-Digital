// src/components/Services/Services.tsx
import React, { useRef } from "react";
import {
  ServicesContainer,
  ServicesWrapper,
  ServicesCardHover as Card,
  ServiceVideoIcon,
  ServiceVisualLayer,
  TextOverlay,
  ServicesH2,
  ServicesP,
  Slide,
  serviceVisuals,
  LearnMoreButton
} from "./ServicesElements";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

// ---- Config ----
const DRAG_THRESHOLD = 6;       // px movement before it's a drag
const SCROLL_THRESHOLD = 5;     // px of window scroll considered as navigation-cancelling
const SUPPRESS_MS = 250;        // ms to ignore ghost clicks after drag/scroll

// ---- Data ----
interface ServiceItem {
  title: string;
  desc: string;
  path: string;
}

const items: ServiceItem[] = [
  { title: "Product Design", desc: "Creating user-friendly and visually appealing interfaces.", path: "/work/ux-ui" },
  { title: "Website Development", desc: "Mocking up and developing websites for our clients.", path: "/work/web-dev" },
  { title: "Branding", desc: "Creating visually stunning and engaging brand identities.", path: "/work/graphics" },
  { title: "Ad Design", desc: "Crafting compelling and effective advertising materials.", path: "/work/ad-design" },
  { title: "Motion Graphics", desc: "Creating dynamic and engaging animated visual content.", path: "/work/motion" }
];

/* =========================
   Full-width Services section
   ========================= */
const Services: React.FC = () => {
  const navigate = useNavigate();

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const suppressClickUntilRef = useRef(0);

  const getPoint = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    const me = e as React.MouseEvent;
    return { x: me.clientX, y: me.clientY };
  };

  const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getPoint(e);
    startXRef.current = x;
    startYRef.current = y;
    startScrollYRef.current = window.pageYOffset || document.documentElement.scrollTop;
    isDraggingRef.current = false;
  };


  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getPoint(e);
    const dx = Math.abs(x - startXRef.current);
    const dy = Math.abs(y - startYRef.current);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
      isDraggingRef.current = true;
    }
  };

  const handleUp = () => {
    const scrollDelta = Math.abs(
      (window.pageYOffset || document.documentElement.scrollTop) - startScrollYRef.current
    );
    if (isDraggingRef.current || scrollDelta > SCROLL_THRESHOLD) {
      // Suppress the following click (incl. mobile ghost click)
      suppressClickUntilRef.current = Date.now() + SUPPRESS_MS;
    }
    isDraggingRef.current = false;
  };

  const canRoute = () => {
    const scrollDelta = Math.abs(
      (window.pageYOffset || document.documentElement.scrollTop) - startScrollYRef.current
    );
    return (
      !isDraggingRef.current &&
      scrollDelta <= SCROLL_THRESHOLD &&
      Date.now() >= suppressClickUntilRef.current
    );
  };

  const handleCardClick = (path: string) => {
    if (canRoute()) navigate(path);
  };

  const handleTouchEnd = (path: string) => {
    if (canRoute()) navigate(path);
  };

  // Extra belt-and-braces: stop click if we’re within suppression window
  const onClickCaptureGuard = (e: React.MouseEvent) => {
    if (!canRoute()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Hide entire section on mobile (hero overlay shows cards)
  if (typeof window !== "undefined" && window.innerWidth <= 1000) {
    return null;
  }

  return (
    <ServicesContainer id="services">
      <ServicesWrapper>
        {items.map(({ title, desc, path }, i) => (
          <div key={title} style={{ width: "100%" }}>
            <Card
              bg={serviceVisuals[i]?.kind === "image" ? serviceVisuals[i].src : undefined}
              role="button"
              tabIndex={0}
              draggable={false}
              onClickCapture={onClickCaptureGuard}
              onClick={() => handleCardClick(path)}
              onMouseDown={handleDown}
              onMouseMove={handleMove}
              onMouseUp={handleUp}
              onTouchStart={handleDown}
              onTouchMove={handleMove}
              onTouchEnd={() => {
                handleUp();
                handleTouchEnd(path);
              }}
              onDragStart={(e: React.DragEvent) => e.preventDefault()}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(path);
                }
              }}
            >
              {serviceVisuals[i]?.kind === "icon" && (
                <ServiceVisualLayer $iconOnly aria-hidden="true">
                  <ServiceVideoIcon />
                </ServiceVisualLayer>
              )}
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton
                  aria-label={`Learn more about ${title}`}
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCardClick(path);
                  }}
                >
                  Learn More <FiArrowUpRight aria-hidden="true" />
                </LearnMoreButton>
              </TextOverlay>
            </Card>
          </div>
        ))}
      </ServicesWrapper>
    </ServicesContainer>
  );
};

/* =================================
   Individual service slides (rail)
   ================================= */
export const ServicesRail: React.FC = () => {
  const navigate = useNavigate();

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startScrollYRef = useRef(0);
  const suppressClickUntilRef = useRef(0);
  const movedRef = useRef(false);

  // Pointer-based handlers for drag detection and click suppression
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    movedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startScrollYRef.current = window.pageYOffset || document.documentElement.scrollTop;
    (e.currentTarget as any).setPointerCapture?.(e.pointerId);
    (e.currentTarget as HTMLElement).classList.add("is-dragging");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - startXRef.current);
    const dy = Math.abs(e.clientY - startYRef.current);
    if (!movedRef.current && (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD)) {
      movedRef.current = true;
      isDraggingRef.current = true;
    }
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    const scrollDelta = Math.abs(
      (window.pageYOffset || document.documentElement.scrollTop) - startScrollYRef.current
    );
    if (movedRef.current || isDraggingRef.current || scrollDelta > SCROLL_THRESHOLD) {
      suppressClickUntilRef.current = Date.now() + SUPPRESS_MS;
    }
    isDraggingRef.current = false;
    movedRef.current = false;
    (e.currentTarget as any).releasePointerCapture?.(e.pointerId);
    (e.currentTarget as HTMLElement).classList.remove("is-dragging");
  };

  const canNavigateRail = () => {
    const scrollDelta = Math.abs(
      (window.pageYOffset || document.documentElement.scrollTop) - startScrollYRef.current
    );
    return (
      !isDraggingRef.current &&
      !movedRef.current &&
      scrollDelta <= SCROLL_THRESHOLD &&
      Date.now() >= suppressClickUntilRef.current
    );
  };

  const handleRailClick = (path: string) => {
    if (canNavigateRail()) navigate(path);
  };

  

  const onClickCaptureGuard = (e: React.MouseEvent) => {
    if (!canNavigateRail()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <>
      {items.map(({ title, desc, path }, i) => (
        <Slide key={title}>
          <div style={{ width: "100%", height: "100%" }}>
            <Card
              bg={serviceVisuals[i]?.kind === "image" ? serviceVisuals[i].src : undefined}
              role="button"
              tabIndex={0}
              draggable={false}
              onClickCapture={onClickCaptureGuard}
              onClick={() => handleRailClick(path)}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onDragStart={(e: React.DragEvent) => e.preventDefault()}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleRailClick(path);
                }
              }}
            >
              {serviceVisuals[i]?.kind === "icon" && (
                <ServiceVisualLayer $iconOnly aria-hidden="true">
                  <ServiceVideoIcon />
                </ServiceVisualLayer>
              )}
              <TextOverlay>
                <ServicesH2>{title}</ServicesH2>
                <ServicesP>{desc}</ServicesP>
                <LearnMoreButton
                  aria-label={`Learn more about ${title}`}
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRailClick(path);
                  }}
                >
                  Learn More <FiArrowUpRight aria-hidden="true" />
                </LearnMoreButton>
              </TextOverlay>
            </Card>
          </div>
        </Slide>
      ))}
    </>
  );
};

export default Services;
