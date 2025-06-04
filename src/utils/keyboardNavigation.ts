/**
 * Keyboard navigation utility functions
 * Helps improve accessibility by providing better keyboard focus management
 */

/**
 * Adds focus trap to a container element
 * This ensures keyboard users can't tab out of a modal or dialog
 * @param containerRef - Reference to the container element
 */
export const setupFocusTrap = (containerRef: React.RefObject<HTMLElement>): (() => void) => {
  if (!containerRef.current) return () => {};
  
  // Find all focusable elements
  const focusableElements = containerRef.current.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element
  firstElement.focus();
  
  // Handle tab key to create a focus loop
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Makes an element focusable by keyboard
 * @param element - The element to make focusable
 */
export const makeFocusable = (element: HTMLElement): void => {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
  
  // Add keyboard event listener for Enter and Space
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      element.click();
    }
  });
};

/**
 * Enhances a component with keyboard navigation
 * @param selector - CSS selector for elements to enhance
 */
export const enhanceKeyboardNavigation = (): void => {
  // Find all clickable elements that might not be keyboard accessible
  const elements = document.querySelectorAll('[role="button"]:not([tabindex]), div[onClick]:not([tabindex])');
  
  elements.forEach((element) => {
    makeFocusable(element as HTMLElement);
  });
};
