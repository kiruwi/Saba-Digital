// src/components/ProjectCard/ProjectCardElements.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #0c0c0c;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  color: #fff;
  height: 100%;
  opacity: 0.9;
  transform: translateY(10px);
  
  /* Initial animation starts right away */
  animation: cardAppear 0.8s forwards;
  
  /* Add more pronounced hover effect */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  /* Class added by JS for additional animation if needed */
  &.animated-in {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  /* Define the animation */
  @keyframes cardAppear {
    from { opacity: 0.7; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  /* Initial animation */
  animation: imageScale 1.2s forwards;
  
  /* Hover effect */
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
  
  @keyframes imageScale {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
`;

export const ContentWrapper = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Animate content appearance with slight delay for a staggered effect */
  animation: contentFadeIn 0.8s forwards;
  animation-delay: 0.3s;  /* Slight delay after card appears */
  opacity: 0;
  
  @keyframes contentFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

export const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: #1e1e1e;
  border-radius: 0px;
  font-size: 0.75rem;
  color: #2db670;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProjectDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #0c0c0c;
  border-radius: 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const ProjectDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const DetailTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

export const DetailDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #1e1e1e;
  color: #2db670;
  border-radius: 0px;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #2a2a2a;
  }
`;

export const SideBySideContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Container specifically for mobile order control
export const MobileImageFirst = styled.div`
  order: 1;
  
  @media screen and (max-width: 768px) {
    order: 0;
  }
`;

export const MobileTextSecond = styled.div`
  order: 2;
  
  @media screen and (max-width: 768px) {
    order: 1;
  }
`;

// Container for images that only show on mobile
export const MobileOnlyImage = styled.div`
  display: none;
  margin-bottom: 1rem;
  
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

// Container for images that only show on desktop
export const DesktopOnlyImage = styled.div`
  display: block;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
