import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSun, FaMoon } from "react-icons/fa";
import { FiArrowUpRight } from 'react-icons/fi'; // Using icons from react-icons/fa
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";
import styled from "styled-components";
import "./Navbar.css";
import { useTheme } from "../../contexts/ThemeContext"; // Import useTheme hook

import {
  NavbarContainer,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";



// Styled component for arrow badge when portfolio expanded (mobile only)
const NavArrowBadge = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
     transform: translateY(-50%);
    right: 84px; /* moved 2px right from previous */
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f7d338;
    border: none;
    z-index: 15;
    cursor: pointer;
  }
`;

// Styled component for mobile theme toggle
const MobileThemeToggle = styled.div`
  position: absolute;
  top: 28px;
  right: 50px; /* Position to the left of the dropdown icon */
  display: flex;
  align-items: center;
  z-index: 15;
  
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
    z-index: 14; /* Ensure dropdown icon is below theme toggle */
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// No longer needed as we'll use the ThemeContext's toggleTheme function

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
}

const Navbar: React.FC<NavbarProps> = ({ toggle, isOpen }) => {
  const [portfolioExpanded,setPortfolioExpanded]=useState(false);
  useEffect(()=>{
    const handler=(e:any)=> setPortfolioExpanded(!!e.detail);
    window.addEventListener('portfolioExpanded', handler);
    return ()=> window.removeEventListener('portfolioExpanded', handler);
  },[]);

  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();

  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from context

  // Determine if current route is the homepage (Hero section)
  const isHomeRoute = location.pathname === "/";
  
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

  const collapsePortfolio = () => {
    window.dispatchEvent(new Event('collapsePortfolio'));
  };

  const toggleHome = () => {
    collapsePortfolio();
    scroll.scrollToTop();
  };

  // Apply theme class to document element when component mounts or theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <nav className={`navbar ${isHomeRoute ? 'home' : ''} ${scrollNav || isWorkRoute || isContactRoute ? 'scrolled' : ''}`}>
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
          {portfolioExpanded && (
            <NavArrowBadge
               as={Link}
               to="/"
               aria-label="Go to homepage"
               onClick={collapsePortfolio}
            >
              <FiArrowUpRight style={{transform:'rotate(-180deg)', color:'#000'}} />
            </NavArrowBadge>
          )}
          <MobileThemeToggle>
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleTheme();
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
              {theme === 'dark' 
                ? <FaSun style={{color: '#F9D71C'}} /> 
                : <FaMoon style={{color: '#032648'}} />}
            </button>
          </MobileThemeToggle>
          <MobileDropdownIcon className="mobile-dropdown-icon" $isOpen={isOpen} onClick={toggle}>
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
                  toggleTheme();
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
                {theme === 'dark' 
                  ? <FaSun style={{color: '#F9D71C'}} /> 
                  : <FaMoon style={{color: '#032648'}} />}
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
