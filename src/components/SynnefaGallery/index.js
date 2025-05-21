import React from 'react';
import { 
  GalleryContainer, 
  GalleryHeading, 
  DescriptionSection
} from './SynnefaGalleryElements';
import ZoomableGallery from '../ZoomableGallery';

const SynnefaGallery = () => {
  const gallery = [
    {
      src: './assets/projects/3d-graphics/synnefa-images/mind-map.jpg',
      alt: 'Brief & Brand Concept Mind Map',
      caption: 'Brief & Brand Concept Mind Map'
    },
    {
      src: './assets/projects/3d-graphics/synnefa-images/mood-board.jpg',
      alt: 'Mood Board and Visual Direction',
      caption: 'Mood Board and Visual Direction'
    },
    {
      src: './assets/projects/3d-graphics/synnefa-images/design-process.jpg',
      alt: 'Design Process and Development',
      caption: 'Design Process and Development'
    },
    {
      src: './assets/projects/3d-graphics/synnefa-images/logo-variations.jpg',
      alt: 'Logo Variations and Style Exploration',
      caption: 'Logo Variations and Style Exploration'
    },
    {
      src: './assets/projects/3d-graphics/synnefa-images/synnefa-logo.jpg',
      alt: 'Final Synnefa Logo Design',
      caption: 'Final Synnefa Logo Design'
    }
  ];

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
      
      {/* Using the new ZoomableGallery component */}
      <ZoomableGallery 
        images={gallery}
        showInstructions={true}
        title="Design Journey from Concept to Final Logo"
      />
    </GalleryContainer>
  );
};

export default SynnefaGallery;
