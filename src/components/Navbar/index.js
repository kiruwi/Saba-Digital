import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
import signature from "../../images/signature.svg";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ toggle, isOpen }) => {
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
          <NavLogo to="/" onClick={toggleHome}>
            <img src={signature} alt="Signature" style={{ height: '25px', marginRight: '10px' }} />
            Ian Cheruiyot
          </NavLogo>
          <MobileIcon onClick={toggle} isOpen={isOpen}>
            <IoIosArrowDown />
          </MobileIcon>
          <NavMenu>
            {/* No items in the middle nav menu now */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/resume" target="_blank" rel="noopener noreferrer">Resume</NavBtnLink>
            <NavBtnLink to="/contactus">Contact Me</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
