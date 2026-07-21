import React, { useState } from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import Footer from '../components/Footer/Footer';
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

const VideoPlaceholder = styled.button`
  position: relative;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 9 / 16;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const PlayBadge = styled.span`
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  font-size: 1.7rem;
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
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(() => new Set());

  const loadVideo = (id: string) => {
    setLoadedVideos(current => new Set(current).add(id));
  };
  
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
                {loadedVideos.has(video.id) ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&autoplay=1`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', aspectRatio: '9/16', border: 0, borderRadius: '8px' }}
                  />
                ) : (
                  <VideoPlaceholder
                    type="button"
                    onClick={() => loadVideo(video.id)}
                    aria-label={`Play ${video.title}`}
                  >
                    <img src={video.thumbnail} alt="" loading="lazy" decoding="async" />
                    <PlayBadge aria-hidden="true">▶</PlayBadge>
                  </VideoPlaceholder>
                )}
                <VideoTitle>{video.title}</VideoTitle>
              </div>
            ))}
          </MasonryGrid>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default MotionGraphics;
