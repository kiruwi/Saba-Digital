import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearch, FaSearchMinus } from 'react-icons/fa';

interface LightboxGalleryProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  captions?: string[];
}

const LightboxOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  opacity: ${props => props.$isOpen ? 1 : 0};
  touch-action: none; /* Prevent default touch actions on mobile */
`;

const LightboxContent = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const LightboxImage = styled.div<{ $zoomed: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${props => props.$zoomed ? 'auto' : 'hidden'};
  cursor: ${props => props.$zoomed ? 'move' : 'zoom-in'};
  
  img {
    max-width: ${props => props.$zoomed ? '150%' : '100%'};
    max-height: ${props => props.$zoomed ? '150%' : '100%'};
    object-fit: contain;
    transition: max-width 0.3s ease, max-height 0.3s ease;
    user-select: none;
  }
`;

const LightboxControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`;

const NavigationButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.3s ease;
  z-index: 1001;
  
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.3s ease;
  z-index: 1002;
  
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const ZoomButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.3s ease;
  z-index: 1002;
  
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const Caption = styled.div`
  color: white;
  padding: 15px;
  text-align: center;
  max-width: 80%;
  margin-top: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Indicator = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  margin: 0 5px;
  transition: background 0.3s ease;
  cursor: pointer;
`;

const LightboxGallery: React.FC<LightboxGalleryProps> = ({ 
  images, 
  isOpen, 
  currentIndex, 
  onClose,
  captions = []
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scrolling when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeIndex, images.length]);
  
  const navigateNext = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  
  const navigatePrev = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!isZoomed) { // Only allow swipe navigation when not zoomed
      const difference = touchStartX - touchEndX;
      const threshold = 50; // Minimum swipe distance
      
      if (difference > threshold) {
        // Swipe left, go to next
        navigateNext();
      } else if (difference < -threshold) {
        // Swipe right, go to previous
        navigatePrev();
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <LightboxOverlay 
      $isOpen={isOpen}
      onClick={onClose}
    >
      <LightboxContent onClick={(e) => e.stopPropagation()}>
        <LightboxImage 
          $zoomed={isZoomed}
          onClick={toggleZoom}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={images[activeIndex]} 
            alt={`Gallery image ${activeIndex + 1}`} 
          />
        </LightboxImage>
        
        <LightboxControls>
          <NavigationButton onClick={navigatePrev}>
            <FaChevronLeft size={20} />
          </NavigationButton>
          <NavigationButton onClick={navigateNext}>
            <FaChevronRight size={20} />
          </NavigationButton>
        </LightboxControls>
        
        <CloseButton onClick={onClose}>
          <FaTimes size={20} />
        </CloseButton>
        
        <ZoomButton onClick={toggleZoom}>
          {isZoomed ? <FaSearchMinus size={20} /> : <FaSearch size={20} />}
        </ZoomButton>
      </LightboxContent>
      
      {captions[activeIndex] && (
        <Caption>{captions[activeIndex]}</Caption>
      )}
      
      <Indicators>
        {images.map((_, index) => (
          <Indicator 
            key={index} 
            $active={index === activeIndex} 
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
              setIsZoomed(false);
            }}
          />
        ))}
      </Indicators>
    </LightboxOverlay>
  );
};

export default LightboxGallery;
