// src/work/WebDevElements.js
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
  animation: webDevCardAppear 0.8s forwards;
  
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

export const WebDevProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
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
  color: ${({ theme }) => theme.colors.text};
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
  background: ${({ theme }) => theme.theme === 'dark' ? theme.colors.cardBackground : '#f5f5f5'};
  border-radius: 0px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Styling for the WebDev project detail page
export const WebDevDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.text};
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
  object-fit: cover;
  margin-bottom: 2rem;
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

export const WebDevMobileTextSecond = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const WebDevMobileOnlyImage = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const WebDevHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

// Web Development specific components
export const TechStackContainer = styled.div`
  margin: 2rem 0;
`;

export const TechStackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.theme === 'dark' ? theme.colors.cardBackground : '#f5f5f5'};
  padding: 1rem;
  border-radius: 0px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.theme === 'dark' ? '#252525' : '#e9e9e9'};
  }
`;

export const TechIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TechName = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const CodeSnippetContainer = styled.div`
  margin: 2rem 0;
  background: ${({ theme }) => theme.theme === 'dark' ? theme.colors.cardBackground : '#f5f5f5'};
  border-radius: 0px;
  overflow: hidden;
`;

export const CodeSnippetHeader = styled.div`
  background: ${({ theme }) => theme.theme === 'dark' ? '#252525' : '#e9e9e9'};
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.theme === 'dark' ? '#333' : '#ddd'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CodeSnippetTitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: monospace;
`;

export const CodeSnippetContent = styled.pre`
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.5;
`;
