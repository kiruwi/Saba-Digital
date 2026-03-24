import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  background: #ffffff;
  color: #000000;
  position: relative;
  overflow: hidden;
  
  /* Subtle gradient background */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(45, 182, 112, 0.03) 0%,
      transparent 70%
    );
    animation: pulse 15s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(0.05rem, 0.3vw, 0.12rem);
  position: relative;
  z-index: 1;
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.accent || theme.colors.primary};
  letter-spacing: -0.02em;
  position: relative;
  
  /* Modern gradient effect on hover */
  background-size: 200% 100%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-position 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background-position: -100% 0%;
  }
`;

export const Subtext = styled.p`
  margin: 0.01rem 0 3rem 0;
  max-width: 1000px;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.4;
  color: #000000ff;
  position: relative;
  
  /* Subtle animation on load */
  animation: fadeInUp 0.8s ease-out 0.2s both;
  
  /* Highlight the important part */
  span {
    color: ${({ theme }) => theme.colors.accent || theme.colors.primary};
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    line-height: 1.4;
    font-weight: 700;
  }

  code {
    font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    background: linear-gradient(135deg, rgba(45, 182, 112, 0.1), rgba(45, 182, 112, 0.05));
    border: 1px solid rgba(45, 182, 112, 0.2);
    border-radius: 6px;
    padding: 0.15rem 0.5rem;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.accent || theme.colors.primary};
    font-weight: 500;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Marquee = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 12%, rgba(0, 0, 0, 0.85) 88%, rgba(0, 0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 12%, rgba(0, 0, 0, 0.85) 88%, rgba(0, 0, 0, 0) 100%);
`;

export const LogoTrack = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(2.25rem, 4vw, 4rem);
  width: max-content;
  will-change: transform;

  /* Mobile fallback animation to keep marquee moving even if JS is throttled */
  @keyframes marquee-slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    &:not(.logo-track--js) {
      animation: marquee-slide 22s linear infinite;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

export const LogoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(1rem, 2vw, 1.75rem);
  width: auto;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  min-height: 52px;
  flex-shrink: 0;
  visibility: visible !important;
  opacity: 1 !important;
  transition: transform 0.3s ease;

  picture {
    display: flex;
    width: auto;
    height: auto;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

export const LogoImg = styled.img.attrs({
  loading: 'lazy',
  decoding: 'async'
})<{ $scale?: number }>`
  --logo-scale: ${({ $scale = 1 }) => $scale};
  display: block;
  width: auto;
  height: clamp(36px, 5vw, 52px);
  max-width: clamp(110px, 16vw, 180px);
  object-fit: contain;
  transform: scale(var(--logo-scale));
  filter: grayscale(1);
  opacity: 0.8;
  transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease;

  ${LogoCard}:hover & {
    transform: scale(calc(var(--logo-scale) * 1.05));
    filter: grayscale(0);
    opacity: 1;
  }
`;
