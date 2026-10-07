import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Panel = styled.nav`
  position: fixed; inset: 80px 0 0; z-index: 9999;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem 1.5rem; overflow-y: auto;
  a { display: block; font-size: 2rem; padding: 1rem; text-decoration: none; }
  a:hover, a.active { color: ${({ theme }) => theme.colors.primary}; }
  @media (min-width: 769px) { display: none; }
`;
interface SidebarProps { isOpen: boolean; toggle: () => void; }
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggle();
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', closeOnEscape); };
  }, [isOpen, toggle]);
  if (!isOpen) return null;
  return <Panel id="mobile-navigation" aria-label="Mobile navigation">
    <NavLink to="/work" onClick={toggle}>Work</NavLink>
    <NavLink to="/about" onClick={toggle}>About</NavLink>
    <NavLink to="/contact" onClick={toggle}>Contact</NavLink>
    <a href="https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={toggle}>Résumé ↗</a>
  </Panel>;
};
export default Sidebar;
