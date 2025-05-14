import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward, MdKeyboardArrowDown } from "react-icons/md";
import { ServicesWrapper } from "../Services/ServicesElements";

/* ── layout grid ────────────────────────────────────── */
export const HeroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 480px;
  min-height: 100vh;
  background: #000;
  overflow: hidden;

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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 0.7em 1.2em;
  display: inline-flex;
  flex-direction: column;
  gap: 0.3em;
`;

const baseTitle = `
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  line-height: 1.05;
  margin: 0;
`;

export const HeroTitleTop = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: #fff;
`;

export const HeroTitleBottom = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: #00ab57;
`;

export const BtnWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
`;

export const ArrowFwd = styled(MdArrowForward)`margin-left:8px;font-size:20px;`;
export const ArrowRt  = styled(MdKeyboardArrowRight)`margin-left:8px;font-size:20px;`;

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
  color: white;
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
`;

export const ScrollArrow = styled(MdKeyboardArrowDown)`
  color: white;
  font-size: 30px;
  opacity: 0.8;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;
