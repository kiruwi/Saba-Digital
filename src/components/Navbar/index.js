import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";
import ThemeToggle from "../ThemeToggle";
import styled from "styled-components";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtn,
  NavBtnLink,
  ExternalNavBtnLink,
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

// Styled component for desktop theme toggle
const DesktopThemeToggle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Navbar = ({ toggle, isOpen, currentTheme, toggleTheme }) => {
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
      <Nav scrollNav={scrollNav || isWorkRoute || isContactRoute}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome} scrollNav={scrollNav || isWorkRoute || isContactRoute}>
            <img src={signature} alt="Signature" style={{ height: '25px', marginRight: '10px' }} />
            Ian Cheruiyot
          </NavLogo>
          {/* Theme toggle for mobile - positioned to the left of dropdown */}
          <MobileThemeToggle>
            <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} />
          </MobileThemeToggle>
          <MobileIcon onClick={toggle} isOpen={isOpen} theme={currentTheme}>
            <span style={{ display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
              <FaChevronDown />
            </span>
          </MobileIcon>
          <NavMenu scrollNav={scrollNav || isWorkRoute || isContactRoute}>
            {/* No items in the middle nav menu now */}
          </NavMenu>
          <NavBtn>
            {/* Theme toggle for desktop - positioned next to Resume button */}
            <DesktopThemeToggle>
              <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} />
            </DesktopThemeToggle>
            <ExternalNavBtnLink href="https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Résumé</ExternalNavBtnLink>
            <NavBtnLink to="/contactus">Contact Me</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
