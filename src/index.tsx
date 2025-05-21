import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element - add non-null assertion since we know this element exists
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
