import React from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

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
  width: 100%;
  column-count: 4;
  column-gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    column-count: 3;
  }
  
  @media (max-width: 480px) {
    column-count: 2;
  }

  .youtube-container {
    width: 100%;
    margin-bottom: 1rem;
    break-inside: avoid;
  }
`;

const VideoTitle = styled.h3`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

// Define types for our YouTube video data
interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const MotionGraphics: React.FC = () => {
  // Get theme context for styling
  useTheme(); // subscribes to theme context without unused variable
  
  // Static video data - YouTube Shorts from user's channel
  const videos: Video[] = [
    {
      id: 'bS0iYERPlok',  // De La Vibes Poster Animation
      title: 'De La Vibes Poster Animation',
      thumbnail: 'https://i.ytimg.com/vi/bS0iYERPlok/hqdefault.jpg'
    },
    {
      id: 'peAWkS10D_w',  // REVEL Night Club Australia
      title: 'REVEL Night Club Australia',
      thumbnail: 'https://i.ytimg.com/vi/peAWkS10D_w/hqdefault.jpg'
    },
    {
      id: 'pTKN6i-oPwQ',  // Carrace Liquor Store logo Animation
      title: 'Carrace Liquor Store logo Animation',
      thumbnail: 'https://i.ytimg.com/vi/pTKN6i-oPwQ/hqdefault.jpg'
    },
    {
      id: 'BVneKsVK1aY',  // Synnefa Rebrand Logo Animation
      title: 'Synnefa Rebrand Logo Animation',
      thumbnail: 'https://i.ytimg.com/vi/BVneKsVK1aY/hqdefault.jpg'
    },
  ];

  return (
    <>
      <SEO
        title="Motion Graphics Projects"
        description="Motion graphics and animation projects from Saba Digital."
        canonical="https://iankcheruiyot.work/work/motion"
      />
      <Main>
        <div style={{ padding: '0 1.5rem' }}>
          <PageTitle>Motion Graphics</PageTitle>
          <MasonryGrid>
            {videos.map((video: Video) => (
              <div className="youtube-container" key={video.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', aspectRatio: '9/16', borderRadius: '8px' }}
                />
                <VideoTitle>{video.title}</VideoTitle>
              </div>
            ))}
          </MasonryGrid>
        </div>
      </Main>
    </>
  );
};

export default MotionGraphics;
