import styled, { keyframes, css } from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';
import { ServicesWrapper } from '../Services/ServicesElements';

/* ── layout grid ─────────────────────────────────── */
export const HeroContainer = styled.section`
  max-width: 90vw;
  margin: 0 auto;
  column-gap: 2rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 500px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => (theme.theme === 'light' ? '#000' : '#fff')};
  overflow: hidden;
`;

export const HeroBg = styled.div``;

/* ── copy column ─────────────────────────────────── */
export const HeroText = styled.div`
  position: sticky;
  top: 0;
  max-width: 700px;
  padding: 8rem 1.5rem 3rem;

  @media (max-width: 1000px) {
    padding: 4rem 1.5rem 2rem;
  }
`;

export const TitleBackground = styled.div`
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
  color: ${({ theme }) => (theme.theme === 'light' ? '#000' : '#fff')};
`;

export const HeroTitleBottom = styled.h1`
  ${baseTitle};
  font-size: clamp(2.5rem, 4vw, 5rem);
  color: ${({ theme }) => theme.colors.primary};
`;

/* ── CTA wrapper ─────────────────────────────────── */
export const BtnWrap = styled.div`
  margin-top: 3rem;
  display: flex;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

/* ── Portfolio CTA ───────────────────────────────── */
export const PortfolioButton = styled.button<{ expanded: boolean; lowEnd: boolean }>`
  position: ${({ expanded }) => (expanded ? 'fixed' : 'relative')};
  top: ${({ expanded }) => (expanded ? '50%' : 'auto')};
  left: ${({ expanded }) => (expanded ? '50%' : 'auto')};
  transform: ${({ expanded }) => (expanded ? 'translate(-50%, -50%)' : 'none')};

  width: ${({ expanded }) => (expanded ? '90vw' : 'auto')};
  max-width: ${({ expanded }) => (expanded ? '90vw' : '75rem')};
  min-height: ${({ expanded }) => (expanded ? '500px' : 'auto')};
  padding: ${({ expanded }) => (expanded ? '48px' : '18px 64px 18px 32px')};

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${({ expanded }) => (expanded ? '12px' : '28px')};
  background: ${({ expanded, theme }) =>
    expanded ? 'rgba(38, 197, 95, 0.25)' : theme.colors.primary};
  backdrop-filter: ${({ expanded, lowEnd }) => (expanded && !lowEnd ? 'blur(8px) saturate(180%)' : 'none')};
  -webkit-backdrop-filter: ${({ expanded, lowEnd }) => (expanded && !lowEnd ? 'blur(8px) saturate(180%)' : 'none')};
  color: #fff;
  font-size: ${({ expanded }) => (expanded ? 0 : '1rem')};
  cursor: pointer;
  z-index: ${({ expanded }) => (expanded ? 999 : 'auto')};

  will-change: transform, width, height;
  transition: ${({ lowEnd }) =>
    lowEnd
      ? 'none'
      : `width 0.45s ease,
    height 0.45s ease,
    padding 0.45s ease,
    top 0.45s ease,
    left 0.45s ease,
    transform 0.45s ease,
    border-radius 0.45s ease`};
`;

/* label */
export const CtaLabel = styled.span<{ expanded: boolean }>`
  opacity: ${({ expanded }) => (expanded ? 0 : 1)};
  transition: opacity 0.45s ease;
  pointer-events: none;
`;

/* yellow badge */
export const ArrowBadge = styled.span<{ expanded: boolean }>`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f7d338;
  display: flex;
  align-items: center;
  justify-content: center;

  /* collapsed: hangs off top-right */
  top: -14px;
  right: -14px;

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
        position: absolute;
        top: auto;
        right: auto;
        bottom: 16px;
        left: 16px;
      }

      /* ---------- mobile (≤768px): fixed top-right of viewport ---------- */
      @media (max-width: 768px) {
        position: fixed;
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

/* ── rail column ─────────────────────────────────── */
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

  & ${ServicesWrapper} {
    display: flex;
    flex-direction: column;
  }
`;

export const DesktopImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const MobileImg = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  @media (min-width: 1000px) {
    display: none;
  }
`;

/* ── scroll hint ─────────────────────────────────── */
const bounce = keyframes`
  0%,20%,50%,80%,100% { transform: translateY(0) rotate(45deg); }
  40% { transform: translateY(-10px) rotate(45deg); }
  60% { transform: translateY(-5px) rotate(45deg); }
`;

export const ScrollIndicatorWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

export const ScrollText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  letter-spacing: 1px;
`;

export const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${({ theme }) => theme.colors.text};
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  transform: rotate(45deg);
  animation: ${bounce} 2s infinite;
`;

/* ── slide dots ─────────────────────────────────── */
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

export const SlideIndicator = styled.div<{ $active: boolean }>`
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
`;
