import React from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

// Import images from addesign folder
import Artboard1 from '../images/addesign/artboard-1.webp';
import Asset5 from '../images/addesign/asset5-2x-100.webp';
import Asset6 from '../images/addesign/asset6-2x-100.webp';
import BrightSquad from '../images/addesign/bright-squad-cleaners.webp';
import EidAlAdha from '../images/addesign/eid.webp';
import Soc from '../images/addesign/sOC4x-100.webp';
import Ad1 from '../images/addesign/1st2x-100.webp';
import Ad2 from '../images/addesign/2nd2x-100.webp';

const Main = styled.main`
  padding: 7rem 0 4rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  color: ${({ theme }) => theme.theme === 'light' ? '#000000' : '#ffffff'};
  width: 100%;
  margin-bottom: 2rem;
`;

const MasonryGrid = styled.div`
  column-count: 4;
  column-gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    column-count: 2;
  }
`;

const AdImageWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  break-inside: avoid;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.03);
  }
`;

const AdDesign: React.FC = () => {
  // Subscribe to theme context without destructuring
  // This ensures the component re-renders when theme changes
  useTheme(); 
  
  // Array of all imported ad design images
  const adImages = [
    { src: Artboard1, alt: 'Artboard Design' },
    { src: Asset5, alt: 'Asset 5 Design' },
    { src: Asset6, alt: 'Asset 6 Design' },
    { src: BrightSquad, alt: 'Bright Squad Cleaners' },
    { src: EidAlAdha, alt: 'Eid Al Adha Celebration' },
    { src: Soc, alt: 'SOC Design' },
    { src: Ad1, alt: 'Ad Design 1' },
    { src: Ad2, alt: 'Ad Design 2' }
  ];

  return (
    <>
      <SEO
        title="Ad Design Projects"
        description="Ad creative and campaign design portfolio from Saba Digital."
        canonical="https://iancheruiyot.work/work/ad-design"
      />
      <Main>
        <div style={{ padding: '0 1.5rem' }}>
          <PageTitle>Ad Design</PageTitle>
          <MasonryGrid>
            {adImages.map((image, idx) => (
              <AdImageWrapper key={idx}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </AdImageWrapper>
            ))}
          </MasonryGrid>
        </div>
      </Main>
    </>
  );
};

export default AdDesign;
