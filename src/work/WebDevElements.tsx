// src/work/WebDevElements.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Grid layout for the WebDev projects page
export const WebDevGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Styling for individual WebDev project cards
export const WebDevCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  opacity: 0.9;
  transform: translateY(10px);
  
  /* Initial animation starts right away */
  animation: webDevCardAppear 0.8s forwards;
  
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
  @keyframes webDevCardAppear {
    from { opacity: 0.7; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const WebDevImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const WebDevProjectImage = styled.img.attrs({
  loading: 'lazy',
  decoding: 'async',
  width: 600,
  height: 400
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: saturate(1); /* Ensure normal saturation */
  image-rendering: auto;
  
  /* Initial animation */
  animation: webDevImageScale 1.2s forwards;
  
  /* Hover effect */
  ${WebDevCardContainer}:hover & {
    transform: scale(1.05);
  }
  
  @keyframes webDevImageScale {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
`;

export const WebDevContentWrapper = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Animate content appearance with slight delay for a staggered effect */
  animation: webDevContentFadeIn 0.8s forwards;
  animation-delay: 0.3s;  /* Slight delay after card appears */
  opacity: 0;
  
  @keyframes webDevContentFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const WebDevProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const WebDevProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const WebDevProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const WebDevTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Styling for the WebDev project detail page
export const WebDevDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
`;

export const WebDevDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const WebDevDetailTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const WebDevDetailDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const WebDevDetailImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 2rem;
  image-rendering: auto;
  filter: none;
`;

export const WebDevBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const WebDevSideBySideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

export const WebDevMobileImageFirst = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

export const WebDevTextContent = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const WebDevDetailSubtitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const WebDevDetailParagraph = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

// Special components for the WebDev gallery
export const WebDevGalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

export const WebDevGalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0px;
  cursor: pointer;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const WebDevGalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const WebDevFullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const WebDevFullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

export const WebDevCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

// Additional components for WebDev projects
export const WebDevTechStack = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0px;
  box-shadow: 0 3px 10px ${({ theme }) => theme.colors.shadow};
`;

export const WebDevTechTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const WebDevTechList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const WebDevTechItem = styled.li`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 5px ${({ theme }) => theme.colors.shadow};
`;

export const WebDevLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 0px;
  font-weight: 500;
  margin-right: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const WebDevHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;
