import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSun, FaMoon } from "react-icons/fa";
import { FiSearch } from 'react-icons/fi';
import { FiArrowUpRight } from 'react-icons/fi'; // Using icons from react-icons/fa
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";
import styled from "styled-components";
import "./Navbar.css";
import { useTheme } from "../../contexts/ThemeContext"; // Import useTheme hook
import AISearchTrigger from "../AISearchTrigger";
import AISearch from "../AISearch";

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

// Styled component for mobile search trigger
const MobileSearchTrigger = styled.div`
  position: absolute;
  top: 24px;
  right: 95px;
  z-index: 15;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

// Circular button inside mobile search trigger
const MobileSearchButton = styled.button<{ theme?: any }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0,207,149,0.3);
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`;



const ThemeToggleCircle = styled.button<{ $size: number; $iconSize: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: ${({ $iconSize }) => $iconSize};
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${({ theme }) => `${theme.colors.primary}4D`};
  outline: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px ${({ theme }) => `${theme.colors.primary}66`};
  }
`;// Define props interface for the styled component
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
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Global shortcut: Ctrl/Cmd + K opens search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrlK = (e.key.toLowerCase() === 'k') && (e.ctrlKey || e.metaKey);
      if (!isCmdOrCtrlK) return;

      // Don't trigger when typing in inputs/textareas or editable elements
      const target = e.target as HTMLElement | null;
      const tag = (target?.tagName || '').toLowerCase();
      const isEditable = !!(target && (target as any).isContentEditable);
      if (tag === 'input' || tag === 'textarea' || isEditable) return;

      e.preventDefault();
      setSearchOpen(true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  
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
  const isContactRoute = location.pathname.includes("/contact");

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
              height: '40px', 
              marginRight: '0',
              verticalAlign: 'middle' 
            }} />
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
            <ThemeToggleCircle
              $size={24}
              $iconSize="1.2rem"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleTheme();
              }}
              aria-label="Toggle theme"
              title="Toggle between light and dark theme"
            >
              {theme === 'dark' 
                ? <FaSun style={{color: '#F9D71C'}} /> 
                : <FaMoon style={{color: '#000000'}} />}
            </ThemeToggleCircle>
          </MobileThemeToggle>
          {/* Mobile search trigger */}
          <MobileSearchTrigger
            style={{ right: portfolioExpanded ? '127px' : '95px' }}
          >
            <MobileSearchButton onClick={() => setSearchOpen(true)} aria-label="Search projects" title="Search">
              <FiSearch />
            </MobileSearchButton>
          </MobileSearchTrigger>
          <MobileDropdownIcon className="mobile-dropdown-icon" $isOpen={isOpen} onClick={toggle}>
            <FaChevronDown />
          </MobileDropdownIcon>
          <NavMenu>
            {/* No items in the middle nav menu now */}
          </NavMenu>
          <NavBtn>
            {/* AI Search Trigger */}
            <div style={{ marginRight: '15px' }}>
              <AISearchTrigger onClick={() => setSearchOpen(true)} />
            </div>
            
            {/* New direct theme toggle for desktop - positioned next to Resume button */}
            <DesktopThemeToggle>
              <ThemeToggleCircle
                $size={40}
                $iconSize="1.8rem"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleTheme();
                }}
                aria-label="Toggle theme"
                title="Toggle between light and dark theme"
              >
                {theme === 'dark' 
                  ? <FaSun style={{color: '#F9D71C'}} /> 
                  : <FaMoon style={{color: '#000000'}} />}
              </ThemeToggleCircle>
            </DesktopThemeToggle>
            <NavBtnLink 
              to="https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Résumé 
            </NavBtnLink>
            <NavBtnLink to="/work">
              Work
            </NavBtnLink>
            <NavBtnLink to="/contact">
              Contact Me
            </NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </nav>
      
      {/* AI Search Modal */}
      <AISearch 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;
