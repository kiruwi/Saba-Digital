import React from 'react';
import styled from 'styled-components';

// Define theme type for styled components
interface ThemeType {
  colors: {
    text: string;
    primary: string;
    background: string;
  };
}

// Define props for the SidebarContainer component
export interface SidebarContainerProps {
  isOpen: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

// Create a styled component for the container
const StyledContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
  display: grid;
  align-items: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};   /* slide top → down */
`;

// Create a React component wrapper
const SidebarContainer: React.FC<SidebarContainerProps> = ({ isOpen, onClick, children }) => {
  return (
    <StyledContainer $isOpen={isOpen} onClick={onClick}>
      {children}
    </StyledContainer>
  );
};

export default SidebarContainer;
