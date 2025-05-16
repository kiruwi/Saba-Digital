import React from "react";
import { Link } from "react-router-dom";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
} from "./SidebarElements";

const Sidebar=({isOpen, toggle}) => {
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
          {/* Buttons moved to menu as text links */}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
