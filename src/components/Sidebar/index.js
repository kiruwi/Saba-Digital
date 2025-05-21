import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import styled from "styled-components";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
} from "./SidebarElements";

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

const Sidebar=({isOpen, toggle, currentTheme, toggleTheme}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='services' onClick={toggle}>Portfolio</SidebarLink>
          <SidebarLink as={Link} to='/resume' onClick={toggle} style={{ textDecoration: 'none' }}>Resume</SidebarLink>
          <SidebarLink as={Link} to='/ContactUs' onClick={toggle} style={{ textDecoration: 'none' }}>Contact Me</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarThemeToggle>
            <ThemeToggle theme={currentTheme} toggleTheme={toggleTheme} />
          </SidebarThemeToggle>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
