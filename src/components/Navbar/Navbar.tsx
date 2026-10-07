import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import signature from '../../images/signature.svg';
const AISearch = lazy(() => import('../AISearch/AISearch'));

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: sticky; top: 0; z-index: 10000;
  background: ${({ theme, $scrolled }) => $scrolled ? theme.colors.background : 'transparent'};
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none'};
  transition: background-color .2s ease, box-shadow .2s ease;
`;
const Inner = styled.div`
  max-width: 1250px; height: 80px; margin: auto; padding: 0 1.5rem;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
`;
const Logo = styled(Link)`
  flex-shrink: 0;
  img { display: block; height: 40px; width: auto; }
`;
const Links = styled.div`
  display: flex; align-items: center; gap: 1.5rem;
  a { text-decoration: none; padding: .75rem 0; color: ${({ theme }) => theme.colors.text}; }
  a:hover, a.active { text-decoration: underline; text-decoration-color: ${({ theme }) => theme.colors.primary}; text-underline-offset: 6px; }
  @media (max-width: 768px) { display: none; }
`;
const Controls = styled.div`display: flex; align-items: center; gap: .5rem;`;
const IconButton = styled.button`
  display: grid; place-items: center; width: 44px; height: 44px;
  border: 0; border-radius: 4px;
  background: transparent; color: ${({ theme }) => theme.colors.text}; cursor: pointer;
  svg { color: inherit; font-size: 1.2rem; }
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }
`;
const MenuButton = styled(IconButton)`
  @media (min-width: 769px) { display: none; }
`;
interface NavbarProps { toggle: () => void; isOpen: boolean; }
const Navbar: React.FC<NavbarProps> = ({ toggle, isOpen }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea') || target?.isContentEditable) return;
      if (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <>
    <Nav aria-label="Main navigation" $scrolled={scrolled}>
      <Inner>
        <Logo to="/" aria-label="Saba Digital home"><img src={signature} alt="Saba Digital" /></Logo>
        <Links>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a href="https://drive.google.com/file/d/1-LmqGJNPkNZ0naITKqTo5PrQsX7iNpYP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Résumé ↗</a>
        </Links>
        <Controls>
          <IconButton onClick={() => setSearchOpen(true)} aria-label="Search projects"><FiSearch /></IconButton>
          <MenuButton onClick={toggle} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation">{isOpen ? <FiX /> : <FiMenu />}</MenuButton>
        </Controls>
      </Inner>
    </Nav>
    {searchOpen && <Suspense fallback={<div role="status" style={{ position: 'fixed', top: 80, right: 24, zIndex: 10001, background: '#fff', padding: '1rem' }}>Loading search…</div>}>
      <AISearch isOpen onClose={() => setSearchOpen(false)} />
    </Suspense>}
  </>;
};
export default Navbar;
