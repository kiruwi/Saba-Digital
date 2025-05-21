import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RoutePaths } from '../utils/routes';
import ThemeToggle from './ThemeToggle/index';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding-top: 4rem;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 99;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const ThemeToggleContainer = styled.div`
  margin-left: 2rem;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <NavContainer>
      <Logo to={RoutePaths.Home}>Saba Digital</Logo>
      
      <MenuButton onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MenuButton>
      
      <NavLinks isOpen={isOpen}>
        <NavLink to={RoutePaths.Home} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to={RoutePaths.Work} onClick={() => setIsOpen(false)}>Work</NavLink>
        <NavLink to={RoutePaths.Contact} onClick={() => setIsOpen(false)}>Contact</NavLink>
        <ThemeToggleContainer>
          <ThemeToggle />
        </ThemeToggleContainer>
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
