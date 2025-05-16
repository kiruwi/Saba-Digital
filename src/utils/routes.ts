import React from 'react';
import { RouteObject } from 'react-router-dom';

// Define route paths enum for consistency
export enum RoutePaths {
  Home = '/',
  Contact = '/contactus',
  Error = '*',
}

/**
 * For type safety, this file doesn't define routes with elements anymore
 * since React.LazyExoticComponent isn't compatible with ReactNode
 * The routes are defined directly in App.tsx with proper Suspense wrapping
 */
export const ROUTE_PATHS = {
  Home: RoutePaths.Home,
  Contact: RoutePaths.Contact,
  Error: RoutePaths.Error,
};

// Empty routes - routing is handled in App.tsx 
export const routes: RouteObject[] = [
  {
    path: RoutePaths.Home,
  },
  {
    path: RoutePaths.Contact,
  },
  {
    path: RoutePaths.Error,
  },
];

