// src/work/UXUIElements.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Grid layout for the UX/UI projects page
export const UXUIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Styling for individual UX/UI project cards
export const UXUICardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.cardBackground};
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
  animation: uxuiCardAppear 0.8s forwards;
  
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
  @keyframes uxuiCardAppear {
    from { opacity: 0.7; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const UXUIImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const UXUIProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: saturate(1); /* Ensure normal saturation */
  image-rendering: auto;
  
  /* Initial animation */
  animation: uxuiImageScale 1.2s forwards;
  
  /* Hover effect */
  ${UXUICardContainer}:hover & {
    transform: scale(1.05);
  }
  
  @keyframes uxuiImageScale {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
`;

export const UXUIContentWrapper = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Animate content appearance with slight delay for a staggered effect */
  animation: uxuiContentFadeIn 0.8s forwards;
  animation-delay: 0.3s;  /* Slight delay after card appears */
  opacity: 0;
  
  @keyframes uxuiContentFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const UXUIProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const UXUIProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const UXUIProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const UXUITag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Styling for the UX/UI project detail page
export const UXUIDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 0px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
`;

export const UXUIDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const UXUIDetailTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const UXUIDetailDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const UXUIDetailImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 2rem;
  image-rendering: auto;
  filter: none;
`;

export const UXUIBackButton = styled.button`
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

export const UXUISideBySideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;

// Image appears first on mobile, left side on desktop
export const UXUIMobileImageFirst = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;

  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;


// Image wrapper that is ONLY visible on mobile (hidden on ≥768px)
export const UXUIMobileOnlyImage = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

// Text wrapper that appears second on mobile / side-by-side on desktop
export const UXUIMobileTextSecond = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const UXUITextContent = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const UXUIDetailSubtitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;

export const UXUIDetailParagraph = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

// Special components for the UX/UI gallery
export const UXUIGalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

export const UXUIGalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0px;
  cursor: pointer;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const UXUIGalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

export const UXUIFullscreenOverlay = styled.div`
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

export const UXUIFullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

export const UXUICloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

// Additional components for UX/UI projects
export const UXUIProcessSection = styled.div`
  margin: 3rem 0;
`;

export const UXUIProcessStep = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const UXUIProcessTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.primary};
    margin-right: 10px;
  }
`;

export const UXUIProcessDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const UXUIProcessImage = styled.img`
  width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 0px;
  box-shadow: 0 3px 10px ${({ theme }) => theme.colors.shadow};
`;

export const UXUIHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.headingText};
`;
