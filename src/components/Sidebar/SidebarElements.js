import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.sidebarBackground || (theme.theme === 'light' ? '#f9f9f9' : theme.colors.background)};
  display: grid;
  align-items: center;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};   /* slide top → down */
`;

export const CloseIcon = styled(FaTimes)`
  color: ${({ theme }) => theme.colors.sidebarText || (theme.theme === 'light' ? '#000000' : '#ffffff')};
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: ${({ theme }) => theme.colors.sidebarText || (theme.theme === 'light' ? '#000000' : '#ffffff')};
`;

export const SidebarMenu = styled.ul`
  display: grid;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

export const SidebarLink = styled(LinkS)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.sidebarText || (theme.theme === 'light' ? '#000000' : '#ffffff')};
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#2db670'};
  }
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SidebarRoute = styled(LinkR)`
  border-radius: 0px;
  background: ${({ theme }) => theme.colors.primary || '#2db670'};
  white-space: nowrap;
  padding: 12px 30px;
  color: ${({ theme }) => theme.colors.buttonText || '#050c23'};
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
  min-width: 150px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.buttonHoverBg || '#ffffff'};
    color: ${({ theme }) => theme.colors.buttonHoverText || '#050c23'};
  }
`;
