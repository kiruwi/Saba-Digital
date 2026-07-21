import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;



export const SearchOverlay = styled.div<{ theme?: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(0, 0, 0, 0.8)' 
    : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 5vh 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const SearchContainer = styled.div<{ theme?: any }>`
  width: 100%;
  max-width: 800px;
  background: ${props => props.theme?.colors?.background || '#fff'};
  border-radius: 32px;
  box-shadow: none;
  border: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out 0.1s both;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

export const SearchBar = styled.div<{ theme?: any }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => props.theme?.colors?.background || '#fff'};
`;

export const SearchIcon = styled.div<{ theme?: any }>`
  font-size: 20px;
  margin-right: 12px;
  opacity: 0.7;
  color: ${props => props.theme?.colors?.text || '#333'};
`;

export const SearchInput = styled.input<{ theme?: any }>`
  flex: 1;
  border: none;
  outline: none !important;

  &:focus,
  &:focus-visible {
    outline: none !important;
  }
  padding: 20px 0;
  font-size: 18px;
  background: transparent;
  color: ${props => props.theme?.colors?.text || '#333'};
  
  &::placeholder {
    color: ${props => props.theme?.colors?.text || '#333'};
    opacity: 0.5;
  }
`;

export const ClearButton = styled.button<{ theme?: any }>`
  background: none;
  border: none;
  padding: 8px;
  margin-left: 8px;
  border-radius: 6px;
  color: ${props => props.theme?.colors?.text || '#333'};
  opacity: 0.6;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const SuggestionsContainer = styled.div<{ theme?: any }>`
  border-bottom: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  max-height: 200px;
  overflow-y: auto;
`;

export const SuggestionItem = styled.button.attrs({ type: 'button' })<{ theme?: any }>`
  width: 100%;
  border: 0;
  text-align: left;
  padding: 12px 20px;
  color: ${props => props.theme?.colors?.text || '#333'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  font-size: 14px;
  opacity: 0.8;
  
  &:hover {
    background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)'};
    opacity: 1;
  }
`;

export const FilterBar = styled.div<{ theme?: any }>`
  padding: 16px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.02)' 
    : 'rgba(0, 0, 0, 0.02)'};
`;

export const FilterChip = styled.button.attrs({ type: 'button' })<{ theme?: any }>`
  border: 0;
  background: ${props => props.theme?.colors?.primary || '#2db670'};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 182, 112, 0.3);
  }
`;

export const ResultsContainer = styled.div<{ theme?: any }>`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const SearchStats = styled.div<{ theme?: any }>`
  padding: 16px 20px;
  color: ${props => props.theme?.colors?.text || '#333'};
  opacity: 0.7;
  font-size: 14px;
  border-bottom: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)'};
`;

export const ResultCard = styled.div<{ theme?: any }>`
  display: flex;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.02)'};
    transform: translateX(4px);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DialogCloseButton = styled.button.attrs({ type: 'button' })<{ theme?: any }>`
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  border: 0;
  border-radius: 50%;
  color: ${props => props.theme?.colors?.text || '#333'};
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)'};
`;

export const ResultImage = styled.img<{ theme?: any }>`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
  flex-shrink: 0;
  border: 1px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'};
`;

export const ResultContent = styled.div<{ theme?: any }>`
  flex: 1;
  min-width: 0;
`;

export const ResultTitle = styled.h3<{ theme?: any }>`
  margin: 0 0 8px 0;
  color: ${props => props.theme?.colors?.text || '#333'};
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  line-height: 1.3;
`;

export const ResultDescription = styled.p<{ theme?: any }>`
  margin: 0 0 12px 0;
  color: ${props => props.theme?.colors?.text || '#333'};
  opacity: 0.8;
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ResultTags = styled.div<{ theme?: any }>`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

export const Tag = styled.span<{ theme?: any }>`
  background: ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.08)'};
  color: ${props => props.theme?.colors?.text || '#333'};
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  opacity: 0.8;
`;

export const NoResults = styled.div<{ theme?: any }>`
  padding: 60px 20px;
  text-align: center;
  color: ${props => props.theme?.colors?.text || '#333'};
  
  h3 {
    margin: 0 0 8px 0;
    color: ${props => props.theme?.colors?.text || '#333'};
  }
  
  p {
    margin: 0 0 8px 0;
    opacity: 0.8;
  }
  
  ul {
    display: inline-block;
    margin: 0;
    padding-left: 20px;
    opacity: 0.8;
  }
  
  li {
    margin-bottom: 4px;
  }
`;

export const LoadingSpinner = styled.div<{ theme?: any }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => (props.theme?.theme === 'dark' || props.theme?.isDark)
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'rgba(0, 0, 0, 0.3)'};
  border-top: 2px solid ${props => props.theme?.colors?.primary || '#2db670'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Mobile responsive styles
export const SearchContainerMobile = styled(SearchContainer)`
  @media screen and (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    height: 100vh;
    max-height: none;
  }
`;

export const SearchBarMobile = styled(SearchBar)`
  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const SearchInputMobile = styled(SearchInput)`
  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 16px 0;
  }
`;

export const ResultCardMobile = styled(ResultCard)`
  @media screen and (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const ResultImageMobile = styled(ResultImage)`
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 12px;
  }
`;
