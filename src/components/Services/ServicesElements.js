// src/components/Services/ServicesElements.js
import styled from "styled-components";
import Bg1 from "../../images/service1-bg.jpg";
import Bg2 from "../../images/service2-bg.jpg";
import Bg3 from "../../images/service3-bg.jpg";

/* — container — */
export const ServicesContainer = styled.div`
  padding: 4rem 0;                  /* let height adjust */
  background: #01244a;
  display: flex;
  justify-content: center;
`;

/* — grid wrapper — */
export const ServicesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* tablet: two columns */
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* mobile: single column */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* — card with zoom‑out background on hover — */
export const ServicesCard = styled.div`
  position: relative;
  overflow: hidden;
  width: 90%;                       /* size down */
  aspect-ratio: 1 / 1;              /* keep square */
  margin: auto;                     /* centre in grid cell */
  display: flex;
  justify-content: center;
  align-items: center;

  /* background layer */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-position: center;
    background-size: cover;
    transform: scale(1.1);
    transition: transform 0.5s ease;
    z-index: 0;
  }

  &:hover::before {
    transform: scale(1);
  }

  /* specific images */
  &:nth-child(1)::before { background-image: url(${Bg1}); }
  &:nth-child(2)::before { background-image: url(${Bg2}); }
  &:nth-child(3)::before { background-image: url(${Bg3}); }
`;

/* — overlay — */
export const TextOverlay = styled.div`
  position: absolute;
  top: 15%;
  right: 15%;
  bottom: 15%;
  left: 15%;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;    /* keep vertical centering */
  align-items: flex-start;    /* align text to the left */
  padding: 2rem;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 1;
`;



/* — hover reveal — */
export const ServicesCardHover = styled(ServicesCard)`
  &:hover ${TextOverlay} {
    transform: translateY(0);
    opacity: 1;
  }
`;

/* — text styles — */
export const ServicesH2 = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: left;           /* was center */
`;

