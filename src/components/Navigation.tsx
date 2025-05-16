import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RoutePaths } from '../utils/routes';

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
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <Logo to={RoutePaths.Home}>Saba Digital</Logo>
      <NavLinks>
        <NavLink to={RoutePaths.Home}>Home</NavLink>
        <NavLink to={RoutePaths.Work}>Work</NavLink>
        <NavLink to={RoutePaths.Contact}>Contact</NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
