import styled, { keyframes } from "styled-components";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import { ServicesWrapper } from "../Services/ServicesElements";

/* ── layout grid ────────────────────────────────────── */
export const HeroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 480px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 1000px) {
    display: block;
  }
`;

export const HeroBg = styled.div`
  display: none; /* placeholder only */
`;

/* ── copy column (sticky) ───────────────────────────── */
export const HeroText = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
  max-width: 700px;
  padding: 8rem 3rem 3rem;

  @media (max-width: 1000px) {
    padding: 4rem 1.5rem 2rem;
  }
`;

export const TitleBackground = styled.div`
  background: transparent;
  padding: 0.7em 1.2em;
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
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
  transition: color 0.3s ease;
`;

export const HeroTitleBottom = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.3s ease;
`;

export const HeroP = styled.p`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.theme === 'light' ? '#333333' : '#cccccc'};
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  line-height: 1.5;
  max-width: 600px;
  transition: color 0.3s ease;
  
  @media (max-width: 1000px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const BtnWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  
  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

export const ArrowFwd = styled(FaArrowRight)`margin-left:8px;font-size:18px;`;
export const ArrowRt  = styled(FaChevronRight)`margin-left:8px;font-size:18px;`;

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

  /* show one slide at a time */
  & ${ServicesWrapper} {
    display: flex;
    flex-direction: column;
    gap: 0;
    grid-template-columns: none;
  }
`;

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

  @media (min-width: 1000px) { display: none; }
`;

/* ── scroll indicator ────────────────────────────────── */
export const ScrollIndicatorWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${props => props.visible ? '1' : '0'};
`;

export const ScrollText = styled.div`
  color: ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  transition: color 0.3s ease;
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-10px) rotate(45deg);
  }
  60% {
    transform: translateY(-5px) rotate(45deg);
  }
`;

export const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
  border-bottom: 2px solid ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
  transform: rotate(45deg);
  margin-top: 10px;
  animation: ${bounce} 2s infinite;
  transition: border-color 0.3s ease;
`;

// Slide indicators container
export const SlideIndicatorsContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 10;
  
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

// Individual slide indicator dot
export const SlideIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#2db670' : 'rgba(255, 255, 255, 0.5)')};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#2db670' : 'rgba(255, 255, 255, 0.8)')};
  }
`;
