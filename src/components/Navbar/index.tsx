import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSun, FaMoon } from "react-icons/fa"; // Using icons from react-icons/fa
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";
import styled from "styled-components";
import "./Navbar.css";

import {
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

// Styled component for mobile theme toggle
const MobileThemeToggle = styled.div`
  position: absolute;
  right: 55px;
  top: 28px; /* Fixed position to match logo */
  display: flex;
  align-items: center;
  z-index: 15;
  /* Add animation to draw attention */
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* Add a subtle highlight to make it more noticeable */
  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(0,207,149,0.15) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
    border-radius: 50%;
    pointer-events: none;
  }
  
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
    top: 28px; /* Fixed position to match logo */
    right: 15px;
    font-size: 1.8rem;
    cursor: pointer;
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 50%;
    /* Use headingText in light mode for better contrast, and normal text color in dark mode */
    color: ${({ theme }) => theme.theme === 'light' ? theme.colors.headingText : theme.colors.text};
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// Direct page reload theme toggle - simplest but most effective solution
const directThemeToggle = () => {
  // Get current theme directly from DOM or localStorage
  const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
  // Calculate new theme
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  console.log('🔄 Theme toggle clicked! Changing from', currentTheme, 'to', newTheme);
  
  // 1. Update localStorage
  localStorage.setItem('theme', newTheme);
  
  // 2. Update DOM directly 
  document.documentElement.setAttribute('data-theme', newTheme);
  document.documentElement.className = newTheme;
  document.body.className = newTheme;
  
  // 3. Set a flag to indicate we're coming from a theme toggle
  sessionStorage.setItem('themeJustToggled', 'true');
  
  // 4. Dispatch a custom event to notify components about the theme change
  // This helps ensure any components using the theme will re-render
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  
  // No more page reload - we rely on React's state management and the DOM updates above
};

// Styled component for desktop theme toggle
const DesktopThemeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  position: relative;
  z-index: 15;
  /* Add a subtle highlight to make it more noticeable */
  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(0,207,149,0.15) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
    border-radius: 50%;
    pointer-events: none;
  }
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

interface NavbarProps {
  toggle: () => void;
  isOpen: boolean;
  // Make theme props optional to support both direct theme toggle and context-based approaches
  currentTheme?: any;
  toggleTheme?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggle, isOpen }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();
  
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
            <img src={signature} alt="Signature" style={{ 
              height: '25px', 
              marginRight: '10px',
              verticalAlign: 'middle' 
            }} />
            <span style={{ verticalAlign: 'middle', color: 'inherit' }}>Ian Cheruiyot</span>
          </NavLogo>
          {/* Direct theme toggle for mobile - positioned to the left of dropdown */}
          <MobileThemeToggle>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                directThemeToggle();
              }}
              aria-label="Toggle theme"
              title="Toggle between light and dark theme"
              style={{
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid #00CF95',
                padding: 0,
                color: 'inherit',
                transition: 'all 0.3s ease',
                background: 'transparent',
                boxShadow: '0 0 10px rgba(0,207,149,0.3)',
                outline: 'none',
              }}
            >
              {localStorage.getItem('theme') === 'dark' 
                ? <FaSun style={{color: '#F9D71C'}} /> 
                : <FaMoon style={{color: '#5D4E7A'}} />}
            </button>
          </MobileThemeToggle>
          <MobileDropdownIcon $isOpen={isOpen} onClick={toggle}>
            <FaChevronDown />
          </MobileDropdownIcon>
          <NavMenu>
            {/* No items in the middle nav menu now */}
          </NavMenu>
          <NavBtn>
            {/* New direct theme toggle for desktop - positioned next to Resume button */}
            <DesktopThemeToggle>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  directThemeToggle();
                }}
                aria-label="Toggle theme"
                title="Toggle between light and dark theme"
                style={{
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #00CF95',
                  padding: 0,
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                  boxShadow: '0 0 10px rgba(0,207,149,0.3)',
                  outline: 'none',
                }}
              >
                {localStorage.getItem('theme') === 'dark' 
                  ? <FaSun style={{color: '#F9D71C'}} /> 
                  : <FaMoon style={{color: '#5D4E7A'}} />}
              </button>
            </DesktopThemeToggle>
            <NavBtnLink 
              to="https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Résumé
            </NavBtnLink>
            <NavBtnLink to="/contactus">
              Contact Me
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </nav>
    </>
  );
};

export default Navbar;
