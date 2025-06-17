import React from 'react';
import {
  GalleryContainer,
  GalleryHeading,
  DescriptionSection,
  TwoCol
} from './SynnefaGalleryElements';
import ZoomableGallery from '../ZoomableGallery';

const SynnefaGallery = () => {
  const gallery = [
    {
      src: '/assets/projects/3d-graphics/synnefa-images/mind-map.jpg',
      alt: 'Brief & Brand Concept Mind Map',
      caption: 'Brief & Brand Concept Mind Map'
    },
    {
      src: '/assets/projects/3d-graphics/synnefa-images/mood-board.jpg',
      alt: 'Mood Board and Visual Direction',
      caption: 'Mood Board and Visual Direction'
    },
    {
      src: '/assets/projects/3d-graphics/synnefa-images/design-process.jpg',
      alt: 'Design Process and Development',
      caption: 'Design Process and Development'
    },
    {
      src: '/assets/projects/3d-graphics/synnefa-images/logo-variations.jpg',
      alt: 'Logo Variations and Style Exploration',
      caption: 'Logo Variations and Style Exploration'
    },
    {
      src: '/assets/projects/3d-graphics/synnefa-images/synnefa-logo.jpg',
      alt: 'Final Synnefa Logo Design',
      caption: 'Final Synnefa Logo Design'
    }
  ];

  return (
    <GalleryContainer>
      <GalleryHeading>Project Brief</GalleryHeading>

      <DescriptionSection>
        <p>
          Synnefa asked for a brand identity that makes complex farming tech feel clear and helpful
          to smallholder farmers across Africa.
        </p>
        <p>
          The work covered logo design, colour palette, and a system that works from screens to
          physical products.
        </p>
      </DescriptionSection>

      <TwoCol>
        <div>
          <h3>3D Product Visualization for FarmShield™</h3>
          <p>
            I modelled the FarmShield™ device in Blender, applied Synnefa’s new colours, and rendered
            a clean hero shot used in brochures, decks, and the website.
          </p>
        </div>

        <img
          src="/assets/projects/3d-graphics/synnefa-images/service3-bg.jpg"
          alt="3D Product Visualization of FarmShield™"
          style={{
            width: '100%',
            height: 'auto',
            minHeight: '200px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'block'
          }}
          onLoad={() => console.log('Image loaded successfully')}
          onError={(e) => console.error('Image failed to load:', e.target.src)}
        />
      </TwoCol>

      <GalleryHeading style={{ marginTop: '2rem' }}>
        Synnefa Rebrand &amp; 3D
      </GalleryHeading>

      <ZoomableGallery
        images={gallery}
        showInstructions={true}
        title="Design Journey from Concept to Final Logo"
      />
    </GalleryContainer>
  );
};

export default SynnefaGallery;
