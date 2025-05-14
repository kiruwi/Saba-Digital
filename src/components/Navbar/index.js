import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle, isOpen }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();
  
  // Check if current path is in the work section
  const isWorkRoute = location.pathname.includes("/work/");

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
      <Nav scrollNav={scrollNav || isWorkRoute}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            Ian Cheruiyot
          </NavLogo>
          <MobileIcon onClick={toggle} isOpen={isOpen}>
            <IoIosArrowDown />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks 
              to="services"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}>Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks 
              to="portfolio"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >Portfolio</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="./ContactUs">Contact Me</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
