import styled from 'styled-components';

// Interface for CarouselSlide props
interface CarouselSlideProps {
  active?: boolean;
}

// Interface for CarouselDot props
interface CarouselDotProps {
  active?: boolean;
}

export const GalleryContainer = styled.div`
  width: 100%;
  margin: 2rem 0 3rem;
`;

export const GalleryHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

/* --- new two-column helpers --- */
export const TwoCol = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ColImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 200px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: block;
`;

/* --- existing carousel + gallery styles stay the same --- */
export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 4px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};

  @media screen and (max-width: 768px) {
    height: 350px;
  }
`;

export const CarouselSlide = styled.div<CarouselSlideProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? '1' : '0')};
  transition: opacity 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
`;

export const CarouselControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const CarouselDot = styled.button<CarouselDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active
      ? theme.colors.primary
      : theme.theme === 'light'
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(100, 100, 100, 0.5)'};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active
        ? theme.colors.primary
        : theme.theme === 'light'
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(150, 150, 150, 0.8)'};
  }
`;

export const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: ${({ theme }) =>
    theme.theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(50, 50, 50, 0.7)'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 1.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease, background 0.3s ease;

  &:hover {
    opacity: 1;
    background: ${({ theme }) =>
      theme.theme === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(80, 80, 80, 0.9)'};
  }

  &.prev {
    left: 10px;
  }
  &.next {
    right: 10px;
  }

  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.03);
  }
`;

export const ImageCaption = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  padding: 1rem;
  margin: 0;
  font-size: 0.9rem;
  transition: opacity 0.3s ease;
`;

export const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  flex-direction: column;
`;

export const FullScreenImage = styled.img`
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
`;

export const FullScreenCaption = styled.p`
  color: white;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  max-width: 800px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    color: #2db670;
  }
`;

export const DescriptionSection = styled.div`
  margin-top: 2rem;
  line-height: 1.6;

  p {
    margin-bottom: 1rem;
  }
`;
