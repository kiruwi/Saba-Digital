// src/components/AccessibilityProvider.tsx
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  reduceMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  keyboardNavigation: boolean;
  screenReaderAnnouncements: string[];
  announceToScreenReader: (message: string) => void;
  setReduceMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  clearAnnouncements: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [keyboardNavigation, setKeyboardNavigation] = useState(true); // Enable keyboard navigation by default
  const [screenReaderAnnouncements, setScreenReaderAnnouncements] = useState<string[]>([]);

  // Check for user preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // High contrast mode is disabled by default
    setHighContrast(false);

    // Always enable keyboard navigation
    setKeyboardNavigation(true);
    
    // Keep detecting keyboard navigation for analytics
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Already enabled, but keep track for analytics
        setKeyboardNavigation(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const announceToScreenReader = useCallback((message: string) => {
    setScreenReaderAnnouncements(prev => [...prev, message]);
    
    // Auto-clear announcement after 5 seconds
    setTimeout(() => {
      setScreenReaderAnnouncements(prev => prev.filter(msg => msg !== message));
    }, 5000);
  }, []);

  const clearAnnouncements = useCallback(() => {
    setScreenReaderAnnouncements([]);
  }, []);

  const value: AccessibilityContextType = {
    reduceMotion,
    highContrast,
    fontSize,
    keyboardNavigation,
    screenReaderAnnouncements,
    announceToScreenReader,
    setReduceMotion,
    setHighContrast,
    setFontSize,
    clearAnnouncements,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      {/* Screen reader live region for announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        {screenReaderAnnouncements.map((announcement, index) => (
          <span key={index}>{announcement}</span>
        ))}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
