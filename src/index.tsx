import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Clarity from '@microsoft/clarity';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Initialize Microsoft Clarity analytics (set REACT_APP_CLARITY_PROJECT_ID in your .env file)
if (process.env.REACT_APP_CLARITY_PROJECT_ID) {
  Clarity.init(process.env.REACT_APP_CLARITY_PROJECT_ID);
} else {
  // eslint-disable-next-line no-console
  console.warn('Clarity: REACT_APP_CLARITY_PROJECT_ID not set');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
