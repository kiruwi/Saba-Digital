import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi"; // Using Feather icons hamburger menu
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";
import ThemeToggle from "../ThemeToggle/index";
import styled from "styled-components";
import "./Navbar.css";
import { useTheme } from "../../contexts/ThemeContext";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

// Styled component for mobile theme toggle
const MobileThemeToggle = styled.div`
  position: absolute;
  right: 60px;
  top: 0;
  height: 80px;
  display: flex;
  align-items: center;
  
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

// Define props interface for the styled component
interface MobileDropdownIconProps {
  $isOpen: boolean;
}

// Styled component for mobile dropdown icon
const MobileDropdownIcon = styled.div<MobileDropdownIconProps>`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border-radius: 50%;
    color: ${({ theme }) => theme.theme === 'light' ? '#0c0c0c' : '#ffffff'};
    transition: all 0.3s ease;
    
    &:hover {
      color: #2db670;
    }
  }
`;

// Styled component for desktop theme toggle
const DesktopThemeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

interface NavbarProps {
  toggle: () => void;
  isOpen: boolean;
  // These props are optional since we're using ThemeContext internally
  currentTheme?: any;
  toggleTheme?: any;
}

const Navbar: React.FC<NavbarProps> = ({ toggle, isOpen, currentTheme: propTheme, toggleTheme: propToggleTheme }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();
  
  // Get theme from context or props
  const { theme: contextTheme, toggleTheme: contextToggleTheme } = useTheme();
  
  // Use props if provided, otherwise use context
  const currentTheme = propTheme || contextTheme;
  const toggleTheme = propToggleTheme || contextToggleTheme;
  
  // Check if current path is in the work section or contact page
  const isWorkRoute = location.pathname.includes("/work/");
  const isContactRoute = location.pathname.includes("/ContactUs");

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    }
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <nav className={`navbar ${scrollNav || isWorkRoute || isContactRoute ? 'scrolled' : ''}`}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            <img src={signature} alt="Signature" style={{ height: '25px', marginRight: '10px' }} />
            Ian Cheruiyot
          </NavLogo>
          {/* Theme toggle for mobile - positioned to the left of dropdown */}
          <MobileThemeToggle>
            <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} />
          </MobileThemeToggle>
          <MobileDropdownIcon $isOpen={isOpen} onClick={toggle}>
            <FiMenu />
          </MobileDropdownIcon>
          <NavMenu>
            {/* No items in the middle nav menu now */}
          </NavMenu>
          <NavBtn>
            {/* Theme toggle for desktop - positioned next to Resume button */}
            <DesktopThemeToggle>
              <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} />
            </DesktopThemeToggle>
            <NavBtnLink to="/resume" target="_blank" rel="noopener noreferrer">Resume</NavBtnLink>
            <NavBtnLink to="/contactus">Contact Me</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </nav>
    </>
  );
};

export default Navbar;
