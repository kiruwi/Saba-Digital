import styled from 'styled-components';

export const GalleryContainer = styled.div`
  width: 100%;
  margin: 2rem 0 3rem;
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  margin-top: 20px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 10px;
  }
`;

export const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  aspect-ratio: 3/2;
  background-color: rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const GalleryItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageItem = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;
  aspect-ratio: 16/9;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const GalleryHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FullScreenOverlay = styled.div.attrs({
  className: 'lightbox-overlay'
})`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999999; /* Extremely high to ensure it's above everything */
`;

export const ZoomableContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 1;
  padding: 0 30px;
  box-sizing: border-box;
`;

export const FullScreenImage = styled.img.attrs({
  className: 'lightbox-img'
})`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.3s ease;
  z-index: 10000;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
`;

export const ImageCaption = styled.p`
  color: white;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

export const ImageCounter = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10001;
`;

export const NavigationControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  z-index: 10001;
`;

export const NavigationDot = styled.button<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#2db670' : 'rgba(255, 255, 255, 0.5)')};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background: ${({ $active }) => ($active ? '#2db670' : 'rgba(255, 255, 255, 0.8)')};
    transform: scale(1.2);
  }
`;

export const NavigationArrow = styled.button`
  background: rgba(45, 182, 112, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10001;
  transition: background 0.3s ease, opacity 0.3s ease;
  
  &:hover {
    background: rgba(45, 182, 112, 0.9);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
  
  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(45, 182, 112, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10001;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(45, 182, 112, 0.9);
  }
`;

export const GalleryInstructions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
`;
