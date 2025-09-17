import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 50vh;
  background: radial-gradient(circle at top right,rgb(6, 56, 106) 0%, #032648 55%, #032648 100%);
  color: #f8fafc;
  padding: 80px 0;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  min-height: 420px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    min-height: 0;
  }
`;

export const TextColumn = styled.div`
  flex: 0 1 420px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #e2e8f0;

  .eyebrow {
    font-size: 0.8rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(226, 232, 240, 0.55);
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: clamp(2rem, 3.8vw, 3rem);
    line-height: 1.15;
    color: #f8fafc;
    font-weight: 600;
  }

  .lead {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(226, 232, 240, 0.75);
  }

  @media (max-width: 900px) {
    flex: none;
    align-items: center;
    text-align: center;
  }
`;

export const CardsColumn = styled.div`
  position: relative;
  flex: 1;
  max-width: 520px;
  min-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  transform-style: preserve-3d;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    min-height: 420px;
  }
`;
