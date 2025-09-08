import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LazyImage from '../LazyImage';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface OptimizedImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: string;
  aspectRatio?: string;
  className?: string;
}

const GalleryContainer = styled.div<{ columns: number; gap: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ gap }) => gap};
  width: 100%;
  margin: 2rem 0;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageCaption = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.cardBackground === '#1e1e1e' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${({ theme }) => theme.colors.text};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageItem}:hover & {
    transform: translateY(0);
  }
`;

/**
 * OptimizedImageGallery component displays a grid of optimized, lazy-loaded images
 * Improves performance by only loading images when they're about to enter the viewport
 */
const OptimizedImageGallery: React.FC<OptimizedImageGalleryProps> = ({
  images,
  columns = 3,
  gap = '1.5rem',
  aspectRatio: _aspectRatio = '4/3',
  className,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Adjust columns based on screen size
  const responsiveColumns = windowWidth <= 480 ? 1 : windowWidth <= 768 ? 2 : columns;

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <GalleryContainer columns={responsiveColumns} gap={gap} className={className}>
      {images.map((image, index) => (
        <ImageItem key={index}>
          <LazyImage
            src={image.src}
            alt={image.alt}
            placeholderColor={undefined}
            threshold={0.1}
            rootMargin="200px"
          />
          {image.caption && <ImageCaption>{image.caption}</ImageCaption>}
        </ImageItem>
      ))}
    </GalleryContainer>
  );
};

export default OptimizedImageGallery;
