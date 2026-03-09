import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

import {
  SearchTriggerButton,
  SearchTriggerText,
  SearchTriggerShortcut
} from './AISearchTriggerElements';

interface AISearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export const AISearchTrigger: React.FC<AISearchTriggerProps> = ({ onClick, className }) => {
  const { theme } = useTheme();

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const shortcutText = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <SearchTriggerButton 
      theme={theme}

      onClick={onClick}
      className={className}
      aria-label={`Search projects with AI (${shortcutText})`}
    >
      <SearchTriggerText theme={theme}>
        Search projects...
      </SearchTriggerText>
      <SearchTriggerShortcut theme={theme}>
        {shortcutText}
      </SearchTriggerShortcut>
    </SearchTriggerButton>
  );
};

export default AISearchTrigger;
