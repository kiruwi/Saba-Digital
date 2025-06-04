// src/components/AccessibleImageGallery.tsx
import React, { useState, useCallback, useEffect, memo } from 'react';
import { useAccessibility } from './AccessibilityProvider';

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface AccessibleImageGalleryProps {
  images: GalleryItem[];
  title?: string;
  className?: string;
}

const AccessibleImageGallery: React.FC<AccessibleImageGalleryProps> = memo(({ 
  images, 
  title = "Project Gallery",
  className = ""
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { announceToScreenReader, keyboardNavigation, reduceMotion } = useAccessibility();

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
    announceToScreenReader(`Opened ${title} image ${index + 1} of ${images.length}: ${images[index].alt}`);
  }, [images, title, announceToScreenReader]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    announceToScreenReader(`Closed ${title} gallery`);
  }, [title, announceToScreenReader]);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (selectedIndex + 1) % images.length
      : (selectedIndex - 1 + images.length) % images.length;
    
    setSelectedIndex(newIndex);
    announceToScreenReader(`Viewing image ${newIndex + 1} of ${images.length}: ${images[newIndex].alt}`);
  }, [selectedIndex, images, announceToScreenReader]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateImage('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateImage('next');
          break;
        case 'Home':
          e.preventDefault();
          setSelectedIndex(0);
          announceToScreenReader(`Viewing first image: ${images[0].alt}`);
          break;
        case 'End':
          e.preventDefault();
          setSelectedIndex(images.length - 1);
          announceToScreenReader(`Viewing last image: ${images[images.length - 1].alt}`);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, navigateImage, closeModal, images, announceToScreenReader]);

  // Focus management for modal
  useEffect(() => {
    if (isModalOpen) {
      const modal = document.getElementById('image-modal');
      modal?.focus();
    }
  }, [isModalOpen]);

  const thumbnailStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '20px 0',
  };

  const thumbnailStyle = {
    cursor: 'pointer',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: reduceMotion ? 'none' : 'transform 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    border: '2px solid transparent',
  };

  const modalOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const modalContentStyle = {
    position: 'relative' as const,
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    padding: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    transition: reduceMotion ? 'none' : 'background-color 0.2s ease',
    outline: 'none',
    margin: '0 10px',
  };

  return (
    <div className={className}>
      <h3 id="gallery-title">{title}</h3>
      <div 
        style={thumbnailStyles}
        role="grid"
        aria-labelledby="gallery-title"
        aria-describedby="gallery-instructions"
      >
        <div 
          id="gallery-instructions" 
          className="sr-only"
        >
          Use arrow keys to navigate images when modal is open. Press Enter or Space to open image in full view. Press Escape to close modal.
        </div>
        
        {images.map((image, index) => (
          <div
            key={index}
            role="gridcell"
            tabIndex={0}
            style={thumbnailStyle}
            onClick={() => openModal(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
              }
            }}
            onFocus={() => keyboardNavigation && announceToScreenReader(`Image ${index + 1} of ${images.length}: ${image.alt}`)}
            aria-label={`Open ${image.alt} in full view`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {image.caption && (
              <div style={{ padding: '8px', fontSize: '0.9em', color: '#666' }}>
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={modalOverlayStyle}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          id="image-modal"
          tabIndex={-1}
        >
          <div 
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
              <h4 id="modal-title" style={{ color: 'white', margin: 0 }}>
                Image {selectedIndex + 1} of {images.length}
              </h4>
              <button
                onClick={closeModal}
                style={{ ...buttonStyle, background: 'rgba(255, 255, 255, 0.3)' }}
                aria-label="Close gallery"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => navigateImage('prev')}
                style={buttonStyle}
                aria-label="Previous image"
                disabled={images.length <= 1}
              >
                ←
              </button>

              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                style={{
                  maxWidth: '80vw',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />

              <button
                onClick={() => navigateImage('next')}
                style={buttonStyle}
                aria-label="Next image"
                disabled={images.length <= 1}
              >
                →
              </button>
            </div>

            <div style={{ color: 'white', textAlign: 'center', marginTop: '10px', maxWidth: '600px' }}>
              <p>{images[selectedIndex].alt}</p>
              {images[selectedIndex].caption && (
                <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
                  {images[selectedIndex].caption}
                </p>
              )}
            </div>

            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8em', marginTop: '10px' }}>
              Use ← → arrow keys to navigate • Press Escape to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

AccessibleImageGallery.displayName = 'AccessibleImageGallery';

export default AccessibleImageGallery;
