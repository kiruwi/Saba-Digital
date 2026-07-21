import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  placeholderColor?: string;
  threshold?: number;
  rootMargin?: string;
}

const ImageContainer = styled.div<{ width?: string; height?: string; isLoaded: boolean }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.cardBackground === '#1e1e1e' ? '#1a1a1a' : '#f5f5f5'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease, transform 0.5s ease;
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
    transform: ${({ isLoaded }) => (isLoaded ? 'scale(1)' : 'scale(1.05)')};
  }
`;

const Placeholder = styled.div<{ color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ color, theme }) => color || (theme.colors.cardBackground === '#1e1e1e' ? '#1a1a1a' : '#f5f5f5')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  opacity: 0.7;
`;

/**
 * LazyImage component that loads images only when they're about to enter the viewport
 * Uses the Intersection Observer API for better performance
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholderColor,
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if image is already visible
    if (isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When image is visible in the viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Disconnect the observer once image is visible
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing the image
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [isVisible, threshold, rootMargin]);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageContainer
      ref={imgRef}
      width={width}
      height={height}
      className={className}
      isLoaded={isLoaded}
    >
      {!isLoaded && <Placeholder color={placeholderColor}>Loading...</Placeholder>}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          loading="lazy"
          decoding="async"
        />
      )}
    </ImageContainer>
  );
};

export default LazyImage;
