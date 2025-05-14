// src/components/Services/ServicesElements.js
import styled from "styled-components";
import Bg1 from "../../images/service1-bg.jpg";
import Bg2 from "../../images/service2-bg.jpg";
import Bg3 from "../../images/service3-bg.jpg";

/* make images available to Services/index.js */
export const serviceBackgrounds = [Bg1, Bg2, Bg3];

/* ── outer containers ──────────────────────────────── */
export const ServicesContainer = styled.div`
  padding: 4rem 0;
  background: #000000;
  display: flex;
  justify-content: center;
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
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

/* helper: don’t forward “bg” to the real DOM */
const cardConfig = { shouldForwardProp: (prop) => prop !== "bg" };

/* ── card with bg prop ─────────────────────────────── */
export const ServicesCard = styled.div.withConfig(cardConfig)`
  position: relative;
  overflow: hidden;
  width: 90%;
  aspect-ratio: 1 / 1;
  margin: auto;
  scroll-snap-align: start;
  min-height: 300px;
  height: 90%;
  max-height: 90vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${({ bg }) => `url(${bg})`};
    background-position: center;
    background-size: cover;
    transform: scale(1.1);
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover::before {
    transform: scale(1);
  }
`;

/* ── overlay ───────────────────────────────────────── */
export const TextOverlay = styled.div`
  position: absolute;
  top: 20%;
  right: 20%;
  bottom: 20%;
  left: 20%;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 1;
`;

/* ── hover wrapper (still receives bg) ─────────────── */
export const ServicesCardHover = styled(ServicesCard).withConfig(cardConfig)`
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
`;
export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: left;
`;
