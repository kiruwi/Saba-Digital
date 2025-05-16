import React, { Suspense, ComponentType } from 'react';

interface LazyWrapperProps {
  component: React.LazyExoticComponent<ComponentType<any>>;
  [key: string]: any;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ component: Component, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyWrapper;
