import React from 'react';

// Simple re-export of React.lazy to avoid JSX parsing issues
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(importFn);
};
