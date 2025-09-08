// src/components/AccessibilityTester.tsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useAccessibility } from './AccessibilityProvider';
import { trackAccessibilityEvent } from '../utils/analytics';

interface ColorContrastResult {
  ratio: number;
  level: 'AA' | 'AAA' | 'fail';
  passes: boolean;
}

interface AccessibilityReport {
  colorContrast: ColorContrastResult[];
  focusableElements: number;
  headingStructure: string[];
  altTexts: { present: number; missing: number };
  ariaLabels: { present: number; missing: number };
  keyboardNavigation: boolean;
}

const TestContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: ${({ isVisible }) => isVisible ? 'translateX(0)' : 'translateX(120%)'};
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    max-width: 280px;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
`;

const ReportSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ReportItem = styled.div<{ status: 'pass' | 'fail' | 'warning' }>`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
  font-size: 0.8rem;
  
  &::before {
    content: ${({ status }) => 
      status === 'pass' ? '"✓"' : 
      status === 'fail' ? '"✗"' : 
      '"⚠"'};
    color: ${({ status }) => 
      status === 'pass' ? '#4CAF50' : 
      status === 'fail' ? '#F44336' : 
      '#FF9800'};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    opacity: 0.7;
  }
`;

export const AccessibilityTester: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const { highContrast, keyboardNavigation } = useAccessibility();

  // Calculate color contrast ratio
  const calculateContrast = (color1: string, color2: string): number => {
    // Simplified contrast calculation - in real app, use proper color contrast library
    const getLuminance = (color: string): number => {
      // This is a simplified version - use a proper color library in production
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const runAccessibilityTest = useCallback((): AccessibilityReport => {
    // Test color contrast
    const colorPairs = [
      { bg: '#ffffff', fg: '#343a40', name: 'Main text' },
      { bg: '#121212', fg: '#f8f9fa', name: 'Dark mode text' },
      { bg: '#007e41', fg: '#ffffff', name: 'Primary button' },
    ];

    const colorContrast = colorPairs.map(pair => {
      const ratio = calculateContrast(pair.bg, pair.fg);
      let level: 'AA' | 'AAA' | 'fail' = 'fail';
      
      // WCAG 2.1 contrast requirements
      if (ratio >= 7) {
        level = 'AAA';
      } else if (ratio >= 4.5) {
        level = 'AA';
      }
      
      return {
        ratio,
        level,
        passes: level !== 'fail'
      };
    });
    
    // Check if focus styles are defined
    // Check if any stylesheets are present (kept for potential future checks)
    // const hasFocusStyles = document.styleSheets.length > 0;

    // Test focusable elements
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    ).length;

    // Test heading structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .map(el => el.tagName.toLowerCase());

    // Test alt texts
    const images = document.querySelectorAll('img');
    const altTexts = {
      present: Array.from(images).filter(img => img.alt && img.alt.trim() !== '').length,
      missing: Array.from(images).filter(img => !img.alt || img.alt.trim() === '').length
    };

    // Test ARIA labels
    const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
    const interactiveWithoutAria = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby]), [role="button"]:not([aria-label]):not([aria-labelledby])');
    
    const ariaLabels = {
      present: elementsWithAria.length,
      missing: interactiveWithoutAria.length
    };

    return {
      colorContrast,
      focusableElements,
      headingStructure: headings,
      altTexts,
      ariaLabels,
      keyboardNavigation
    };
  }, [keyboardNavigation]);

  const handleToggle = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    
    if (newVisibility) {
      const newReport = runAccessibilityTest();
      setReport(newReport);
      trackAccessibilityEvent('accessibility_test_run', 'manual');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Run automatic accessibility test on mount
    const timer = setTimeout(() => {
      const newReport = runAccessibilityTest();
      setReport(newReport);
      trackAccessibilityEvent('accessibility_test_run', 'automatic');
    }, 2000);

    return () => clearTimeout(timer);
  }, [runAccessibilityTest]);

  if (!report) return null;

  return (
    <>
      <ToggleButton
        onClick={handleToggle}
        aria-label={isVisible ? 'Close accessibility report' : 'Open accessibility report'}
        title="Accessibility Tester"
      >
        A11y
      </ToggleButton>
      
      <TestContainer isVisible={isVisible} role="dialog" aria-label="Accessibility Report">
        <CloseButton onClick={handleClose} aria-label="Close report">
          ×
        </CloseButton>
        
        <SectionTitle>Accessibility Report</SectionTitle>
        
        <ReportSection>
          <SectionTitle>Color Contrast</SectionTitle>
          {report.colorContrast.map((result, index) => (
            <ReportItem 
              key={index}
              status={result.passes ? 'pass' : 'fail'}
            >
              Ratio: {result.ratio.toFixed(2)} ({result.level})
            </ReportItem>
          ))}
        </ReportSection>

        <ReportSection>
          <SectionTitle>Focus Management</SectionTitle>
          <ReportItem status={report.focusableElements > 0 ? 'pass' : 'warning'}>
            {report.focusableElements} focusable elements
          </ReportItem>
          <ReportItem status={keyboardNavigation ? 'pass' : 'warning'}>
            Keyboard navigation: {keyboardNavigation ? 'enabled' : 'disabled'}
          </ReportItem>
        </ReportSection>

        <ReportSection>
          <SectionTitle>Content Structure</SectionTitle>
          <ReportItem status={report.headingStructure.length > 0 ? 'pass' : 'warning'}>
            {report.headingStructure.length} headings found
          </ReportItem>
          <ReportItem status={report.altTexts.missing === 0 ? 'pass' : 'fail'}>
            Images: {report.altTexts.present} with alt, {report.altTexts.missing} missing
          </ReportItem>
        </ReportSection>

        <ReportSection>
          <SectionTitle>ARIA Labels</SectionTitle>
          <ReportItem status={report.ariaLabels.missing === 0 ? 'pass' : 'warning'}>
            {report.ariaLabels.present} labeled, {report.ariaLabels.missing} missing
          </ReportItem>
          <ReportItem status={highContrast ? 'pass' : 'warning'}>
            High contrast: {highContrast ? 'enabled' : 'disabled'}
          </ReportItem>
        </ReportSection>
      </TestContainer>
    </>
  );
};
