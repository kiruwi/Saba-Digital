import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

interface NavProps {
  $scrollNav: boolean;
}

interface MobileIconProps {
  $isOpen: boolean;
}

export const Nav = styled.nav<NavProps>`
  background: ${({ $scrollNav, theme }) => ($scrollNav ? theme.colors.background : "transparent")};
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

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 10;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
  position: relative;
  
  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: 0 15px;
    text-align: center;
  }
`;

export const NavLogo = styled(LinkR)`
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1rem;
  font-weight: regular;
  color: ${({ theme }) => theme.colors.headingText};
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem;
  position: relative;
  z-index: 15;
  
  @media screen and (max-width: 768px) {
    position: absolute;
    left: 15px;
    top: 28px; /* Fixed position to match exact logo height */
    height: 24px;
    padding: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileIcon = styled.div<MobileIconProps>`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  z-index: 11;

  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 15;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 0px;
  background: transparent;
  white-space: nowrap;
  padding: 10px 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
`;
