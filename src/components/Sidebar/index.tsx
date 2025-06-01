import React from "react";
import ThemeToggle from "../ThemeToggle";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext";
import SidebarContainer from "./SidebarContainer";
import {
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
} from "./SidebarElements";

// Define theme type for styled components
interface ThemeType {
  colors: {
    text: string;
    primary: string;
    background: string;
  };
}

// Styled component for the theme toggle container in sidebar
const SidebarThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
  button {
    padding: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

// Define the resume link styles as a component
const ResumeLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    transition: 0.2s ease-in-out;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='services' onClick={toggle}>Portfolio</SidebarLink>
          <ResumeLink 
            href='https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing' 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={toggle} 
          >
            Résumé
          </ResumeLink>
          <SidebarRoute 
            to='/ContactUs' 
            onClick={toggle} 
          >
            Contact Me
          </SidebarRoute>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarThemeToggle>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </SidebarThemeToggle>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
