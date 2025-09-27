import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: clamp(3rem, 6vw, 5rem) 1.5rem;
  background: #ffffff;
  color: #000000;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(1.5rem, 4vw, 0.5rem);
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: clamp(1.75rem, 3.6vw, 1.65rem);
  line-height: 1.1;
  color: black;
`;

export const Subtext = styled.p`
  margin: 0 auto;
  max-width: 640px;
  font-size: clamp(1.2rem, 1vw, 0.5rem);
  color: black;
  opacity: 0.78;

  code {
    font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    padding: 0.1rem 0.4rem;
    font-size: 0.95em;
    color: inherit;
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
`;

export const LogoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  min-height: 52px;
  flex-shrink: 0;
  visibility: visible !important;
  opacity: 1 !important;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const LogoImg = styled.img`
  width: auto;
  height: clamp(36px, 5vw, 52px);
  min-width: 80px;
  max-width: 180px;
  display: block;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.8;
  transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease;

  ${LogoCard}:hover & {
    transform: scale(1.05);
    filter: grayscale(0);
    opacity: 1;
  }
`;
