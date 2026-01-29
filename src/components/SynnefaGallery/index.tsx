import React from 'react';
import {
  GalleryContainer,
  GalleryHeading,
  DescriptionSection,
  TwoCol
} from './SynnefaGalleryElements';
import ZoomableGallery from '../ZoomableGallery';

// Interface for gallery image data
interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const SynnefaGallery: React.FC = () => {
  const img = (file: string) => `${process.env.PUBLIC_URL || ''}/assets/projects/3d-graphics/synnefa-images/${file}`;
  const gallery: GalleryImage[] = [
    {
      src: img('mind-map.jpg'),
      alt: 'Brief & Brand Concept Mind Map',
      caption: 'Brief & Brand Concept Mind Map'
    },
    {
      src: img('mood-board.jpg'),
      alt: 'Mood Board and Visual Direction',
      caption: 'Mood Board and Visual Direction'
    },
    {
      src: img('design-process.jpg'),
      alt: 'Design Process and Development',
      caption: 'Design Process and Development'
    },
    {
      src: img('logo-variations.jpg'),
      alt: 'Logo Variations and Style Exploration',
      caption: 'Logo Variations and Style Exploration'
    },
    {
      src: img('synnefa-logo.jpg'),
      alt: 'Final Synnefa Logo Design',
      caption: 'Final Synnefa Logo Design'
    }
  ];

  const handleImageLoad = (): void => {
    // Image loaded successfully
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Image failed to load:', target.src);
    }
  };

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
            I modelled the FarmShield™ device in Adobe Illustrator, applied Synnefa's new colours, and rendered
            a clean hero shot used in brochures, decks, and the website.
          </p>
        </div>

        <img
          src={img('service3-bg.jpg')}
          alt="3D Product Visualization of FarmShield™"
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: 'auto',
            minHeight: '200px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'block'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
