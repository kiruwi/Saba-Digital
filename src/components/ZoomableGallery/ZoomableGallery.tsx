import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  GalleryContainer,
  FullScreenOverlay,
  ZoomableContainer,
  FullScreenImage,
  GalleryGrid,
  GalleryItem,
  GalleryItemImage,
  CloseButton,
  NavigationArrow,
  NavigationDot,
  NavigationControls,
  ImageCounter,
  GalleryHeading
} from './ZoomableGalleryElements';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'text';
}

interface ZoomableGalleryProps {
  images: ImageItem[];
  title?: string;
  /** optional helper banner you can toggle later */
  showInstructions?: boolean;
}

const ZoomableGallery: React.FC<ZoomableGalleryProps> = ({
  images,
  title,
  showInstructions: _showInstructions = true // currently unused but kept for future UI
}) => {
  /* ------------------------------------------------------------------
   * State & helpers
   * ------------------------------------------------------------------ */
  const imageSlides = images.filter(img => img.type !== 'text');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  /* ----------------------------- open / close ----------------------------- */
  const openFullScreen = (index: number) => {
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setCurrentIndex(index);
    setIsFullScreen(true);

    // Store overflow and add lightbox class
    document.body.dataset.overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
  };

  const closeFullScreen = useCallback(() => {
    setIsFullScreen(false);

    // Restore scroll and remove lightbox class
    document.body.style.overflow = document.body.dataset.overflow || '';
    document.body.classList.remove('lightbox-open');
    delete document.body.dataset.overflow;
    previouslyFocusedRef.current?.focus();
  }, []);

  /* --------------------------- navigation helpers ------------------------- */
  const goToNextImage = useCallback(() => {
    setCurrentIndex(prev => (prev === imageSlides.length - 1 ? 0 : prev + 1));
  }, [imageSlides.length]);

  const goToPrevImage = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? imageSlides.length - 1 : prev - 1));
  }, [imageSlides.length]);

  /* -------------------------- keyboard listeners -------------------------- */
  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullScreen();
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPrevImage();
      if (e.key === 'Tab') {
        const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        const elements = focusable ? Array.from(focusable) : [];
        if (elements.length > 0) {
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, closeFullScreen, goToNextImage, goToPrevImage]);

  /* ----------------------------- swipe logic ------------------------------ */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNextImage();
    if (distance < -50) goToPrevImage();
  };

  /* ------------------------------------------------------------------
   * Render
   * ------------------------------------------------------------------ */
  return (
    <GalleryContainer>
      {title && <GalleryHeading>{title}</GalleryHeading>}

      <GalleryGrid>
        {imageSlides.map((img, idx) => (
          <GalleryItem
            key={idx}
            type="button"
            onClick={() => openFullScreen(idx)}
            aria-label={`Open ${img.alt || `image ${idx + 1}`} in full screen`}
          >
            <GalleryItemImage
              src={img.src}
              alt={img.alt || `Image ${idx + 1}`}
              loading="lazy"
              decoding="async"
            />
          </GalleryItem>
        ))}
      </GalleryGrid>

      {isFullScreen && createPortal(
        <FullScreenOverlay
          ref={overlayRef}
          onClick={closeFullScreen}
          aria-label={title ? `${title} image viewer` : "Image viewer"}
        >
          <ZoomableContainer
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <FullScreenImage
              src={imageSlides[currentIndex].src}
              alt={imageSlides[currentIndex].alt || `Image ${currentIndex + 1}`}
              onClick={e => e.stopPropagation()}
            />
          </ZoomableContainer>

          <ImageCounter>
            {currentIndex + 1}/{imageSlides.length}
          </ImageCounter>

          <NavigationArrow
            className="prev"
            aria-label="Previous image"
            onClick={e => {
              e.stopPropagation();
              goToPrevImage();
            }}
          >
            <FaChevronLeft />
          </NavigationArrow>

          <NavigationArrow
            className="next"
            aria-label="Next image"
            onClick={e => {
              e.stopPropagation();
              goToNextImage();
            }}
          >
            <FaChevronRight />
          </NavigationArrow>

          <NavigationControls>
            {imageSlides.map((_, idx) => (
              <NavigationDot
                key={idx}
                $active={idx === currentIndex}
                aria-label={`Show image ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : undefined}
                onClick={e => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </NavigationControls>

          <CloseButton
            autoFocus
            aria-label="Close image viewer"
            onClick={e => { e.stopPropagation(); closeFullScreen(); }}
          >
            <FaTimes />
          </CloseButton>
        </FullScreenOverlay>,
        document.getElementById('lightbox-root')!
      )}
    </GalleryContainer>
  );
};

export default ZoomableGallery;
