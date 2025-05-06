import React from 'react';
import { Suspense } from 'react';
import { LazyLoad } from '../components/LazyLoad';
import { Skeleton } from '../components/Skeleton';

export const lazyLoadComponent = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  const LazyComponent = React.lazy(importFn);

  return (props: any) => (
    <Suspense fallback={<LazyLoad fallback={<Skeleton />} />}> 
      <LazyComponent {...props} />
    </Suspense>
  );
};
