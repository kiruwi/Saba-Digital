// src/components/ProcessSection/ProcessElements.tsx
import styled from 'styled-components';
import { Theme } from '../../themes/theme';

interface ProcessStepProps {
  number?: string;
}

interface BeforeAfterPanelProps {
  label?: string;
  labelBg?: string;
}

interface ImageGridProps {
  columns?: number;
}

export const ProcessContainer = styled.div`
  margin: 4rem 0;
  width: 100%;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProcessStep = styled.div<ProcessStepProps>`
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.theme === 'dark' ? '#1a1a1a' : '#f8f8f8'};
  border-radius: 0px;
  padding: 2rem;
  box-shadow: 0 5px 15px ${({ theme }) => theme.colors.shadow};
  position: relative;
  
  &:before {
    content: "${props => props.number || ''}";
    position: absolute;
    top: -20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.theme === 'dark' ? '#000' : '#fff'};
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
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StepContent = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  font-size: 1rem;
`;

export const ImageGrid = styled.div<ImageGridProps>`
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
  color: ${({ theme }) => theme.colors.text};
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

export const BeforeAfterPanel = styled.div<BeforeAfterPanelProps>`
  position: relative;
  
  &:before {
    content: "${props => props.label || ''}";
    position: absolute;
    top: 10px;
    left: 10px;
    background: ${props => props.labelBg || props.theme.colors.primary};
    color: ${({ theme }) => theme.theme === 'dark' ? '#000' : '#fff'};
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 0px;
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: auto;
    border: 1px solid ${({ theme }) => theme.theme === 'dark' ? '#333' : '#ddd'};
  }
`;

export const NextActions = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: ${({ theme }) => theme.theme === 'dark' 
    ? `linear-gradient(to right, #141414, ${theme.colors.cardBackground})` 
    : 'linear-gradient(to right, #f0f0f0, #e8e8e8)'};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  
  h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.8;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;
