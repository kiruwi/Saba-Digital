// src/components/OsimLaiBrandGallery/index.tsx
import React from 'react';
import { GraphicsDetailSubtitle } from '../../work/GraphicsElements';
import styled from 'styled-components';
import ZoomableGallery from '../ZoomableGallery';

// Interface for image data
interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

// Simple styled components defined here to avoid any conflicts
const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
`;

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const OsimLaiBrandGallery: React.FC = () => {
  const imageData: ImageData[] = [
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/logo-page2x-100.jpg',
      alt: 'Osim Lai Logo Presentation',
      caption: 'Osim Lai Logo Presentation'
    },
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/logo-design2x-100.jpg',
      alt: 'Osim Lai Logo Design Process',
      caption: 'Osim Lai Logo Design Process'
    },
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/color-and-mockup.2x-100.jpg',
      alt: 'Osim Lai Color Palette and Mockups',
      caption: 'Osim Lai Color Palette and Mockups'
    },
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/Font-type2x-100.jpg',
      alt: 'Osim Lai Typography System',
      caption: 'Osim Lai Typography System'
    },
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/assets2x-100.jpg',
      alt: 'Osim Lai Brand Assets',
      caption: 'Osim Lai Brand Assets'
    },
    {
      src: '/assets/projects/3d-graphics/osim-lai-images/mockup2x-100.jpg',
      alt: 'Osim Lai Brand Mockups',
      caption: 'Osim Lai Brand Mockups'
    }
  ];

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GraphicsDetailSubtitle>Osim Lai Brand Portfolio</GraphicsDetailSubtitle>
        <p>A complete brand identity for a hospitality brand located on Lake Naivasha</p>
      </GalleryHeader>
      
      <ZoomableGallery 
        images={imageData}
        showInstructions={true}
      />
    </GalleryContainer>
  );
};

export default OsimLaiBrandGallery;
