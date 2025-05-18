import React, { useState, useEffect } from 'react';
import { 
  GalleryContainer, 
  GalleryHeading, 
  CarouselContainer,
  CarouselSlide,
  CarouselControls,
  CarouselDot,
  CarouselArrow,
  ImageContainer,
  Image, 
  ImageCaption,
  FullScreenContainer,
  FullScreenImage,
  FullScreenCaption,
  CloseButton,
  DescriptionSection
} from './SynnefaGalleryElements';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SynnefaGallery = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCaption, setSelectedCaption] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  
  const gallery = [
    {
      id: 1,
      image: '/assets/projects/3d-graphics/synnefa-images/mind-map.jpg',
      caption: 'Brief & Brand Concept Mind Map'
    },
    {
      id: 2,
      image: '/assets/projects/3d-graphics/synnefa-images/mood-board.jpg',
      caption: 'Mood Board and Visual Direction'
    },
    {
      id: 3,
      image: '/assets/projects/3d-graphics/synnefa-images/design-process.jpg',
      caption: 'Design Process and Development'
    },
    {
      id: 4,
      image: '/assets/projects/3d-graphics/synnefa-images/logo-variations.jpg',
      caption: 'Logo Variations and Style Exploration'
    },
    {
      id: 5,
      image: '/assets/projects/3d-graphics/synnefa-images/synnefa-logo.jpg',
      caption: 'Final Synnefa Logo Design'
    }
  ];
  
  // No auto-advance timer - user will navigate manually

  const openFullscreen = (image, caption) => {
    setSelectedImage(image);
    setSelectedCaption(caption);
    setFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };
  
  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };
  
  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <GalleryContainer>
      <GalleryHeading>Project Brief</GalleryHeading>
      <DescriptionSection>
        <p>
          Synnefa approached me to create a brand identity that would effectively communicate their mission of
          making complex farming technology accessible to farmers across Africa. The brief required creating a
          visual identity system that would connect with their target audience of smallholder farmers while
          also conveying technological innovation and reliability.
        </p>
        <p>
          Key requirements included developing a logo that balanced agricultural elements with technology,
          creating a color palette that reflected growth and innovation, and designing a visual system
          that would work across multiple touchpoints from digital interfaces to physical products.
        </p>
      </DescriptionSection>
      
      <GalleryHeading style={{ marginTop: '2rem' }}>Branding & Design Process</GalleryHeading>
      
      {/* Nudge message above carousel */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        background: '#f5f5f5',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        fontSize: '0.95rem',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <span>👉 Use the arrows to navigate through my design journey from concept to final logo</span>
      </div>
      
      <CarouselContainer>
        {gallery.map((item, index) => (
          <CarouselSlide key={item.id} active={index === activeSlide} onClick={() => openFullscreen(item.image, item.caption)}>
            <Image 
              src={item.image} 
              alt={item.caption} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} 
            />

          </CarouselSlide>
        ))}
        
        <CarouselArrow 
          className="prev" 
          onClick={goToPrevSlide}
          style={{
            opacity: activeSlide === 0 ? '0.4' : '0.7',  // Dim the left arrow on first slide
            cursor: activeSlide === 0 ? 'default' : 'pointer'
          }}
        >
          <FaChevronLeft />
        </CarouselArrow>
        
        <CarouselArrow 
          className="next" 
          onClick={goToNextSlide}
          style={{
            opacity: activeSlide === gallery.length - 1 ? '0.4' : '0.9',  // Dim the right arrow on last slide
            cursor: activeSlide === gallery.length - 1 ? 'default' : 'pointer',
            animation: activeSlide === 0 ? 'pulse 2s infinite' : 'none'  // Pulse animation on first slide
          }}
        >
          <FaChevronRight />
        </CarouselArrow>
        
        <CarouselControls>
          {gallery.map((_, index) => (
            <CarouselDot 
              key={index} 
              active={index === activeSlide} 
              onClick={() => goToSlide(index)} 
            />
          ))}
        </CarouselControls>
      </CarouselContainer>
      

      
      {fullscreen && (
        <FullScreenContainer>
          <CloseButton onClick={closeFullscreen}>
            <FaTimes />
          </CloseButton>
          <FullScreenImage src={selectedImage} alt={selectedCaption} />
          <FullScreenCaption>{selectedCaption}</FullScreenCaption>
        </FullScreenContainer>
      )}
    </GalleryContainer>
  );
};

export default SynnefaGallery;
