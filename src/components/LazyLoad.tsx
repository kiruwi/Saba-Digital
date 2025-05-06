import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from './Skeleton';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  className?: string;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback = <Skeleton width="100%" height="20px" />,
  threshold = 0,
  className,
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? children : fallback}
    </div>
  );
};
