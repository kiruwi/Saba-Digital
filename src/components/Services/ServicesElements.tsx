// src/components/Services/ServicesElements.tsx
import styled from "styled-components";
import { FiPlayCircle } from "react-icons/fi";
import Bg1 from "../../images/ufanisi.webp";
import Bg2 from "../../images/service2-bg.webp";
import Bg3 from "../../images/service3-bg.webp";
import AdDesignImage from "../../images/addesign/eid.webp";

export type ServiceVisual =
  | { kind: "image"; src: string }
  | { kind: "icon"; icon: "video" };

/* shared visuals for service cards across hero and services sections */
export const serviceVisuals: ServiceVisual[] = [
  { kind: "image", src: Bg1 },
  { kind: "image", src: Bg2 },
  { kind: "image", src: Bg3 },
  { kind: "image", src: AdDesignImage },
  { kind: "icon", icon: "video" },
];

/* ── outer containers ──────────────────────────────── */
export const ServicesContainer = styled.div`
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;

  /* hide below hero on mobile; hero overlay already shows cards */
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const ServicesInline = styled(ServicesContainer)`
  padding: 0;
  background: transparent;
`;

/* ── grid wrapper (phones / other pages) ───────────── */
export const ServicesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  /* Turn grid into horizontal carousel on small screens */
  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 1rem;

    /* hide default scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE */
    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }
  }
`;

/* ── full‑height slide for the hero rail ───────────── */
export const Slide = styled.div`
  flex: 0 0 100%;
  height: 100vh;
  min-height: 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

/* helper: don't forward "bg" to the real DOM */
const cardConfig = { shouldForwardProp: (prop: string) => prop !== "bg" };

/* Types for props */
interface CardProps {
  bg?: string;
}

/* ── card with bg prop ─────────────────────────────── */
export const ServicesCard = styled.div.withConfig(cardConfig)<CardProps>`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  width: 90%;
  aspect-ratio: 1 / 1;
  margin: auto;
  scroll-snap-align: start;
  min-height: 300px;
  height: 90%;
  max-height: 90vh;
  cursor: pointer;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: min(100%, 320px);
    min-height: 260px;
    height: auto;
    max-height: none;
    margin: 0 auto;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
     background-image: ${({ bg }) => (bg ? `url(${bg})` : 'none')};
    background-position: center;
    background-size: cover;
    transform: scale(1.1);
    transition: transform 0.5s ease;
    z-index: 0;
  }

  @media (max-width: 768px) {
    &::before {
      transform: scale(1.02);
      background-position: center center;
    }
  }

  &:hover::before {
    transform: scale(1);
  }

  /* Keyboard focus visibility */
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  /* Dragging feedback and click suppression on children */
  &.is-dragging {
    cursor: grabbing;
  }
  &.is-dragging * {
    pointer-events: none !important;
  }
`;

export const ServiceVisualLayer = styled.div<{ $iconOnly?: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  z-index: 0;
  pointer-events: none;
  background: ${({ $iconOnly, theme }) =>
    $iconOnly
      ? theme.theme === "light"
        ? "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(232, 245, 237, 0.92))"
        : "linear-gradient(135deg, rgba(8, 18, 12, 0.9), rgba(20, 44, 31, 0.92))"
      : "transparent"};
`;

export const ServiceVideoIcon = styled(FiPlayCircle)`
  font-size: clamp(5rem, 10vw, 7rem);
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.95;
`;

/* ── overlay ───────────────────────────────────────── */
export const TextOverlay = styled.div`
  position: absolute;
  top: 15%;
  right: 15%;
  bottom: 15%;
  left: 15%;
  background: ${({ theme }) => theme.theme === 'light' ? '#ffffff' : theme.colors.background};
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  border-radius: 24px;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 1;

  @media (max-width: 768px) {
    top: 12%;
    right: 12%;
    bottom: 12%;
    left: 12%;
    padding: 1.25rem;
  }
`;

/* ── hover wrapper (still receives bg) ─────────────── */
export const ServicesCardHover = styled(ServicesCard).withConfig(cardConfig)<CardProps>`
  &:hover ${TextOverlay} {
    transform: translateY(0);
    opacity: 1;
  }
`;

/* ── text styles ───────────────────────────────────── */
export const ServicesH2 = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  text-align: left;
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.theme === 'light' ? '#333333' : '#cccccc'};
`;

/* ── learn more button ───────────────────────────────── */
export const LearnMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  
  /* Ensure keyboard focus is visible */
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;
