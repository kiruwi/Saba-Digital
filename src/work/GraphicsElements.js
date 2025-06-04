// src/work/GraphicsElements.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Grid layout for the Graphics projects page
export const GraphicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Styling for individual Graphics project cards
export const GraphicsCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  opacity: 0.9;
  transform: translateY(10px);
  
  /* Initial animation starts right away */
  animation: graphicsCardAppear 0.8s forwards;
  
  /* Add more pronounced hover effect */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
  
  /* Class added by JS for additional animation if needed */
  &.animated-in {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
  }
  
  /* Define the animation */
  @keyframes graphicsCardAppear {
    from { opacity: 0.7; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const GraphicsImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const GraphicsProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: saturate(1); /* Ensure normal saturation */
  image-rendering: auto;
  
  /* Initial animation */
  animation: graphicsImageScale 1.2s forwards;
  
  /* Hover effect */
  ${GraphicsCardContainer}:hover & {
    transform: scale(1.05);
  }
  
  @keyframes graphicsImageScale {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
`;

export const GraphicsContentWrapper = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Animate content appearance with slight delay for a staggered effect */
  animation: graphicsContentFadeIn 0.8s forwards;
  animation-delay: 0.3s;  /* Slight delay after card appears */
  opacity: 0;
  
  @keyframes graphicsContentFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const GraphicsProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const GraphicsProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const GraphicsProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const GraphicsTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.theme === 'dark' ? '#1e1e1e' : '#e9ecef'};
  border-radius: 0px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Styling for the Graphics project detail page
export const GraphicsDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #0c0c0c;
  border-radius: 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const GraphicsDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const GraphicsDetailTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const GraphicsDetailDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const GraphicsDetailImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 2rem;
  image-rendering: auto;
  filter: none;
`;

export const GraphicsBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: none;
  border: none;
  color: #2db670;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const GraphicsSideBySideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

export const GraphicsMobileImageFirst = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

export const GraphicsMobileTextSecond = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const GraphicsMobileOnlyImage = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const GraphicsHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2db670;
`;

// Special components for the Graphics gallery
export const GraphicsGalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

export const GraphicsGalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    
    img {
      transform: scale(1.05);
    }
  }
`;

export const GraphicsGalleryImage = styled.img`
  width: 100%;
  height: auto;
  min-height: 220px;
  object-fit: contain;
  transition: transform 0.5s ease;
  image-rendering: auto;
  filter: none;
`;

export const GraphicsGalleryCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  color: white;
`;
