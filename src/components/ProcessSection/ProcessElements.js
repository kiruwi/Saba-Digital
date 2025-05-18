// src/components/ProcessSection/ProcessElements.js
import styled from 'styled-components';

export const ProcessContainer = styled.div`
  margin: 4rem 0;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #fff;
  text-align: left;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #2db670;
  }
`;

export const ProcessStep = styled.div`
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  border-radius: 0px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  
  &:before {
    content: "${props => props.number || ''}";
    position: absolute;
    top: -20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: #2db670;
    color: #000;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #2db670;
  }
`;

export const StepContent = styled.div`
  margin-top: 1rem;
  color: #b8b8b8;
  line-height: 1.6;
  font-size: 1rem;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0px;
  
  img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const ImageCaption = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.9rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

export const BeforeAfterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BeforeAfterPanel = styled.div`
  position: relative;
  
  &:before {
    content: "${props => props.label || ''}";
    position: absolute;
    top: 10px;
    left: 10px;
    background: ${props => props.labelBg || '#2db670'};
    color: #000;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 0px;
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: auto;
    border: 1px solid #333;
  }
`;

export const NextActions = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(to right, #141414, #1e1e1e);
  border-left: 4px solid #2db670;
  
  h4 {
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    color: #b8b8b8;
    line-height: 1.8;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;
