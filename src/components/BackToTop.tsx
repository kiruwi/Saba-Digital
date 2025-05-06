import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from '../themes/theme';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = styled.button<{ theme: Theme; visible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 100;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .icon {
    font-size: 20px;
  }
`;

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <BackToTopButton visible={isVisible} onClick={scrollToTop}>
      <FaArrowUp className="icon" />
    </BackToTopButton>
  );
};
