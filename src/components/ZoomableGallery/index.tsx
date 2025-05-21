import React, { useState, useEffect, useCallback } from 'react';
import { 
  GalleryContainer,
  ImagesGrid,
  ImageItem,
  FullScreenOverlay,
  ZoomableContainer,
  FullScreenImage,
  ImageCaption,
  NavigationControls,
  NavigationDot,
  NavigationArrow,
  CloseButton,
  GalleryInstructions
} from './ZoomableGalleryElements';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyImage from '../LazyImage';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ZoomableGalleryProps {
  images: ImageItem[];
  title?: string;
  showInstructions?: boolean;
}

const ZoomableGallery: React.FC<ZoomableGalleryProps> = ({ 
  images, 
  title,
  showInstructions = true
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isFullScreen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeFullScreen();
          break;
        case 'ArrowLeft':
          goToPrevImage();
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, currentIndex]);
  
  // Lock body scroll when in fullscreen mode
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullScreen]);
  
  const openFullScreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };
  
  const closeFullScreen = () => {
    setIsFullScreen(false);
  };
  
  const goToNextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);
  
  const goToPrevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);
  
  // Touch event handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNextImage();
    }
    
    if (isRightSwipe) {
      goToPrevImage();
    }
  };
  
  return (
    <GalleryContainer>
      {title && <h2>{title}</h2>}
      
      <ImagesGrid>
        {images.map((image, index) => (
          <ImageItem key={index} onClick={() => openFullScreen(index)}>
            <LazyImage 
              src={image.src} 
              alt={image.alt || `Image ${index + 1}`} 
              threshold={0.1}
              rootMargin="200px"
            />
          </ImageItem>
        ))}
      </ImagesGrid>
      
      {isFullScreen && (
        <FullScreenOverlay>
          <CloseButton onClick={closeFullScreen}>
            <FaTimes />
          </CloseButton>
          
          <ZoomableContainer 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <FullScreenImage 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt || `Image ${currentIndex + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </ZoomableContainer>
          
          {images[currentIndex].caption && (
            <ImageCaption>{images[currentIndex].caption}</ImageCaption>
          )}
          
          <NavigationArrow className="prev" onClick={goToPrevImage}>
            <FaChevronLeft />
          </NavigationArrow>
          
          <NavigationArrow className="next" onClick={goToNextImage}>
            <FaChevronRight />
          </NavigationArrow>
          
          <NavigationControls>
            {images.map((_, index) => (
              <NavigationDot 
                key={index} 
                $active={index === currentIndex} 
                onClick={() => setCurrentIndex(index)} 
              />
            ))}
          </NavigationControls>
        </FullScreenOverlay>
      )}
    </GalleryContainer>
  );
};

export default ZoomableGallery;
