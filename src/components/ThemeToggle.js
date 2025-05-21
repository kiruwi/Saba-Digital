// src/components/ThemeToggle.js
import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};
    opacity: 0.9;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}50;
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;
