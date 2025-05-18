// src/work/UXUIElements.js
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
  animation: uxuiCardAppear 0.8s forwards;
  
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
  color: #fff;
`;

export const UXUIProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #b8b8b8;
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
  background: #1e1e1e;
  border-radius: 0px;
  font-size: 0.75rem;
  color: #2db670;
`;

// Styling for the UX/UI project detail page
export const UXUIDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #0c0c0c;
  border-radius: 0px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const UXUIDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const UXUIDetailTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;

export const UXUIDetailDescription = styled.p`
  font-size: 1.1rem;
  color: #b8b8b8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const UXUIDetailImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
`;

export const UXUIBackButton = styled.button`
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

export const UXUIMobileImageFirst = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  
  @media screen and (min-width: 768px) {
    width: 45%;
    margin-bottom: 0;
  }
`;

export const UXUIMobileTextSecond = styled.div`
  width: 100%;
  
  @media screen and (min-width: 768px) {
    width: 55%;
  }
`;

export const UXUIMobileOnlyImage = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const UXUIHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2db670;
`;

// UX/UI specific components
export const DesignProcessContainer = styled.div`
  margin: 2rem 0;
`;

export const ProcessStepGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProcessStep = styled.div`
  padding: 1.5rem;
  background: #1e1e1e;
  border-radius: 0px;
  position: relative;
  
  &:before {
    content: "${props => props.number}";
    position: absolute;
    top: -15px;
    left: 15px;
    width: 30px;
    height: 30px;
    background: #2db670;
    color: #0c0c0c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

export const StepTitle = styled.h4`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

export const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #b8b8b8;
  line-height: 1.6;
`;

export const PrototypeContainer = styled.div`
  margin: 2rem 0;
  background: #1e1e1e;
  border-radius: 0px;
  padding: 1.5rem;
`;

export const PrototypeEmbed = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const UserPersonaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PersonaCard = styled.div`
  background: #1e1e1e;
  border-radius: 0px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const PersonaAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid #2db670;
`;

export const PersonaName = styled.h4`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

export const PersonaDetails = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
    color: #b8b8b8;
    font-size: 0.9rem;
    
    strong {
      color: #2db670;
      margin-right: 0.5rem;
    }
  }
`;
