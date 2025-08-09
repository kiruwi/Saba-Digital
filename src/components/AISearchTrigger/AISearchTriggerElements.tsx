import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SearchTriggerButton = styled.button<{ theme?: any }>`
  display: flex;
  align-items: center;
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)'};
  border: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.15)' 
    : 'rgba(0, 0, 0, 0.15)'};
  border-radius: 25px;
  padding: 10px 14px;
  color: ${props => props.theme?.colors?.text || '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-family: inherit;
  min-width: 240px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.08)'};
    border-color: ${props => props.theme?.colors?.primary || '#2db670'};
    transform: translateY(-1px);
    box-shadow: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? '0 4px 20px rgba(45, 182, 112, 0.3)' 
      : '0 4px 20px rgba(45, 182, 112, 0.2)'};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(45, 182, 112, 0.1),
        transparent
      );
      background-size: 200% 100%;
      animation: ${shimmer} 2s infinite;
    }
  }

  &:active {
    transform: translateY(0);
    animation: ${pulse} 0.3s ease;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme?.colors?.primary || '#2db670'}33;
  }

  @media screen and (max-width: 768px) {
    min-width: auto;
    padding: 8px 12px;
  }
`;

export const SearchTriggerIcon = styled.div<{ theme?: any }>`
  font-size: 16px;
  margin-right: 10px;
  opacity: 0.8;
  transition: all 0.3s ease;

  ${SearchTriggerButton}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;

export const SearchTriggerText = styled.span<{ theme?: any }>`
  flex: 1;
  text-align: left;
  opacity: 0.8;
  font-weight: 400;
  transition: opacity 0.3s ease;

  ${SearchTriggerButton}:hover & {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SearchTriggerShortcut = styled.span<{ theme?: any }>`
  /* Muted pill instead of primary green */
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)'};
  color: ${props => props.theme?.colors?.text || '#333'};
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  opacity: 0.9;
  margin-left: 10px;
  border: 1px solid ${props => props.theme?.colors?.border || 'rgba(0,0,0,0.15)'};
  font-family: monospace;
  transition: all 0.3s ease;

  ${SearchTriggerButton}:hover & {
    opacity: 1;
    background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(0, 0, 0, 0.10)'};
    color: ${props => props.theme?.colors?.text || '#333'};
    border-color: ${props => props.theme?.colors?.border || 'rgba(0,0,0,0.25)'};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Compact version for mobile or small spaces
export const SearchTriggerButtonCompact = styled(SearchTriggerButton)`
  min-width: auto;
  padding: 8px;
  
  ${SearchTriggerText} {
    display: none;
  }
  
  ${SearchTriggerShortcut} {
    display: none;
  }
`;

// Floating action button version
export const SearchTriggerFAB = styled(SearchTriggerButton)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  min-width: auto;
  padding: 0;
  box-shadow: ${props => props.theme.isDark 
    ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
    : '0 4px 20px rgba(0, 0, 0, 0.15)'};

  ${SearchTriggerText}, ${SearchTriggerShortcut} {
    display: none;
  }

  ${SearchTriggerIcon} {
    margin: 0;
    font-size: 20px;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;
