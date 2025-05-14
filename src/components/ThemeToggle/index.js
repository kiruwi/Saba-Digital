import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  z-index: 100;
  position: fixed;
  bottom: 20px;
  right: 20px;

  svg {
    height: 1rem;
    width: 1rem;
    transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      color: #F9D71C;
      transform: ${({ isLight }) => isLight ? 'translateY(0)' : 'translateY(100px)'};
    }
    
    // moon icon
    &:nth-child(2) {
      color: #F6F1D5;
      transform: ${({ isLight }) => isLight ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;

export function ThemeToggle({ theme, toggleTheme }) {
  const isLight = theme === 'light';
  
  return (
    <ToggleContainer onClick={toggleTheme} isLight={isLight}>
      <FaSun />
      <FaMoon />
    </ToggleContainer>
  );
}
