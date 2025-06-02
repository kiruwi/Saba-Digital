import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Add global event listener for theme changes
window.addEventListener('storage', (event) => {
  // Force refresh of all styled components when theme changes
  if (event.key === 'theme' || !event.key) {
    console.log(' Theme change detected in storage event, refreshing components');
    // Force React to re-render the entire application
    const root = document.getElementById('root');
    if (root) {
      // This will cause a slight flicker but will ensure all components use the new theme
      root.style.opacity = '0.99';
      setTimeout(() => {
        root.style.opacity = '1';
      }, 10);
    }
  }
});

// Get the root element - add non-null assertion since we know this element exists
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
