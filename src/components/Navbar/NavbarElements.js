import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: ${({ scrollNav, theme }) => {
    if (scrollNav) {
      return theme?.theme === 'light' ? '#ffffff' : '#000000';
    } else {
      return 'transparent';
    }
  }};
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: background 0.3s ease-in-out;
  box-shadow: ${({ scrollNav, theme }) => 
    scrollNav && theme?.theme === 'light' ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1500px;
`;

export const NavLogo = styled(LinkR)`
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1 rem;
  font-weight: regular;
  color: ${({ scrollNav, theme }) => {
    // If scrolled OR in dark mode, always use white
    if (scrollNav) {
      return theme?.theme === 'light' ? '#000000' : '#ffffff';
    } else {
      // Not scrolled - match the hero text colors
      return theme?.theme === 'light' ? '#000000' : '#ffffff';
    }
  }};
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00ab57;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({ isOpen, theme }) => {
      if (isOpen) {
        return '#00ab57';
      } else {
        return theme?.theme === 'light' ? '#000000' : '#ffffff';
      }
    }};
    transition: color 0.3s ease;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  justify-content: center;
  flex: 1;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color: ${({ scrollNav, theme }) => {
    // If scrolled OR in dark mode, always use white
    if (scrollNav) {
      return theme?.theme === 'light' ? '#000000' : '#ffffff';
    } else {
      // Not scrolled - match the hero text colors
      return theme?.theme === 'light' ? '#000000' : '#ffffff';
    }
  }};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: color 0.3s ease;

  &.active {
    border-bottom: 3px solid #2db670;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px; /* Add spacing between the buttons */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 0px;
  white-space: nowrap;
  padding: 8px 22px;
  color: ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
  background: transparent;
  font-size: 1 rem;
  font-weight: regular;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
    color: ${({ theme }) => theme?.theme === 'light' ? '#ffffff' : '#000000'};
  }
`;

// External link version of NavBtnLink (for links outside the app)
export const ExternalNavBtnLink = styled.a`
  border-radius: 0px;
  white-space: nowrap;
  padding: 8px 22px;
  color: ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
  background: transparent;
  font-size: 1 rem;
  font-weight: regular;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }) => theme?.theme === 'light' ? '#000000' : '#ffffff'};
    color: ${({ theme }) => theme?.theme === 'light' ? '#ffffff' : '#000000'};
  }
`;
