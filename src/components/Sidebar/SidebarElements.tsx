import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

// SidebarContainer is now imported from SidebarContainer.tsx

export const CloseIcon = styled(FaTimes)`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
`;

// Define props for the Icon component
interface IconProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

// Create a React component wrapper for Icon
export const Icon: React.FC<IconProps> = ({ onClick, children }) => {
  return (
    <StyledIcon onClick={onClick}>
      {children}
    </StyledIcon>
  );
};

// Styled component for Icon
const StyledIcon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

// Define the theme interface for type safety
interface ThemeType {
  colors: {
    text: string;
    primary: string;
    background: string;
  };
}

// Create a base styles function to share between different link types
const sidebarLinkStyles = `
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    transition: 0.2s ease-in-out;
  }
`;

// Styled component for ScrollLink
export const SidebarLink = styled(LinkS)`${sidebarLinkStyles}`;

// Styled component for anchor tags
export const SidebarExternalLink = styled.a`${sidebarLinkStyles}`;

// Styled component for Router Link (previously SidebarRoute)
export const SidebarRouterLink = styled(LinkR)`${sidebarLinkStyles}`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

// Define button styled component for CTA buttons
export const SidebarButton = styled(LinkR)`
  border-radius: 50px;
  background: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  white-space: nowrap;
  padding: 16px 64px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
  }
`;

// For backward compatibility
export const SidebarRoute = SidebarButton;
