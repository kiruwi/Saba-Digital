import styled from 'styled-components';
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md';

/* ── layout ─────────────────────────────────────────── */
export const HeroContainer = styled.section`
  background: #000;
  height: 100vh;           /* desktop/tablet */
  min-height: 700px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;

  /* phones */
  @media (max-width: 768px) {
    height: auto;                                    /* let content size itself */
    min-height: calc(100vh - var(--nav-h));          /* still fill the screen */
    padding-top: calc(var(--nav-h) + 16px);          /* clear the fixed bar */
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
`;

/* ── content ────────────────────────────────────────── */
export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
`;

export const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 48px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;      /* stack */
    align-items: center;         /* centre in the column */
  }
`;

export const HeroText = styled.div`
  flex: 1 1 560px;
  max-width: 600px;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

/* ── shared title styles ────────────────────────────── */
const baseTitle = `
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  line-height: 1.05;
  margin: 0;
`;

/* ── blurred wrapper for both titles ────────────────── */
export const TitleBackground = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 0.7em 1.2em;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  gap: 0.3em;
`;

/* ── typography ─────────────────────────────────────── */
export const HeroTitleTop = styled.h1`
  ${baseTitle}
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: #ffffff;
`;

export const HeroTitleBottom = styled.h1`
  ${baseTitle}
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: #00ab57;
`;

/* ── button + icons ─────────────────────────────────── */
export const HeroBtnWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(20px)'};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

/* ── image ──────────────────────────────────────────── */
export const HeroImage = styled.img`
  width: clamp(240px, 50vw, 420px);
  height: clamp(240px, 50vw, 420px);
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin: 2rem auto 0;
  }
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`;
