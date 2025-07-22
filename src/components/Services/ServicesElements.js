// src/components/Services/ServicesElements.js
import styled from "styled-components";
import Bg1 from "../../images/ufanisi.jpg";
import Bg2 from "../../images/service2-bg.jpg";
import Bg3 from "../../images/service3-bg.jpg";
import Bg4 from "../../images/service1-bg.jpg";

/* make images available to Services/index.js */
import EidBg from '../../images/addesign/eid.jpg';

export const serviceBackgrounds = [
  Bg1, 
  Bg2, 
  Bg3, 
  EidBg, // Ad Design background
  'https://i.ytimg.com/vi/BVneKsVK1aY/maxresdefault.jpg' // Motion Graphics - Synnefa Rebrand Logo Animation thumbnail
];

/* ── outer containers ──────────────────────────────── */
export const ServicesContainer = styled.div`
  padding: 4rem 0;
  background: ${({ theme }) => theme.theme === 'dark' ? '#000000' : '#f8f9fa'};
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
  /* Turn grid into a smooth horizontal carousel on small screens */
  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth; /* smooth kinetic scrolling */
    -webkit-overflow-scrolling: touch; /* momentum on iOS */
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

/* helper: don’t forward “bg” to the real DOM */
const cardConfig = { shouldForwardProp: (prop) => prop !== "bg" };

/* ── card with bg prop ─────────────────────────────── */
export const ServicesCard = styled.div.withConfig(cardConfig)`
  border-radius: 24px;
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
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
`;
export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: left;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.theme === 'light' ? '#333333' : '#cccccc'};
`;

/* ── learn more button ───────────────────────────────── */
export const LearnMoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
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
    outline-offset: 2px;
  }
  
  /* Ensure keyboard focus is visible */
  &:focus-visible {
    outline: 3px solid #ffffff;
    outline-offset: 3px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;
