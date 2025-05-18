// src/components/OsimLaiBrandGallery/index.js
import React, { useState } from 'react';
import { 
  GalleryContainer, 
  GalleryHeader, 
  GalleryGrid, 
  ImageContainer, 
  DetailImage,
  FullscreenImage,
  FullscreenOverlay,
  CloseButton,
  NavigationButton
} from './OsimLaiBrandGalleryElements';
import { GraphicsHeading } from '../../work/GraphicsElements';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const OsimLaiBrandGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const imageData = [
    {
      src: './assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.jpg',
      alt: 'Osim Lai Logo Presentation',
      caption: 'Logo Design Presentation'
    },
    {
      src: './assets/projects/3d-graphics/osim-lai-images/logo-design2x-100.jpg',
      alt: 'Osim Lai Logo Design Process',
      caption: 'Logo Design Process & Concepts'
    },
    {
      src: './assets/projects/3d-graphics/osim-lai-images/color-and-mockup.2x-100.jpg',
      alt: 'Osim Lai Color Palette and Mockups',
      caption: 'Color Palette & Brand Applications'
    },
    {
      src: './assets/projects/3d-graphics/osim-lai-images/Font-type2x-100.jpg',
      alt: 'Osim Lai Typography System',
      caption: 'Typography System'
    },
    {
      src: './assets/projects/3d-graphics/osim-lai-images/assets2x-100.jpg',
      alt: 'Osim Lai Brand Assets',
      caption: 'Brand Assets'
    },
    {
      src: './assets/projects/3d-graphics/osim-lai-images/mockup2x-100.jpg',
      alt: 'Osim Lai Brand Mockups',
      caption: 'Brand Applications & Mockups'
    }
  ];

  const openFullscreen = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when fullscreen is open
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const navigateImage = (direction) => {
    const newIndex = (selectedImage + direction + imageData.length) % imageData.length;
    setSelectedImage(newIndex);
  };

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GraphicsHeading>Osim Lai Brand Portfolio</GraphicsHeading>
        <p>A complete brand identity for a hospitality brand located on Lake Naivasha</p>
      </GalleryHeader>
      
      <GalleryGrid>
        {imageData.map((image, index) => (
          <ImageContainer key={index} onClick={() => openFullscreen(index)}>
            <DetailImage src={image.src} alt={image.alt} />
          </ImageContainer>
        ))}
      </GalleryGrid>

      {selectedImage !== null && (
        <FullscreenOverlay onClick={closeFullscreen}>
          <FullscreenImage 
            src={imageData[selectedImage].src} 
            alt={imageData[selectedImage].alt} 
            onClick={(e) => e.stopPropagation()} 
          />
          <CloseButton onClick={closeFullscreen}>
            <FaTimes />
          </CloseButton>
          <NavigationButton left onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}>
            <FaChevronLeft />
          </NavigationButton>
          <NavigationButton right onClick={(e) => { e.stopPropagation(); navigateImage(1); }}>
            <FaChevronRight />
          </NavigationButton>
        </FullscreenOverlay>
      )}
    </GalleryContainer>
  );
};

export default OsimLaiBrandGallery;
