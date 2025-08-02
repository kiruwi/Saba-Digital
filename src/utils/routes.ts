import { RouteObject } from 'react-router-dom';

// Define route paths enum for consistency
export enum RoutePaths {
  Home = '/',
  Contact = '/contact',
  Error = '/404',
  // Work routes
  Work = '/work',
  GraphicsWork = '/work/graphics',
  GraphicsDetail = '/work/graphics/:id',
  UXUIWork = '/work/ux-ui',
  UXUIDetail = '/work/ux-ui/:id',
  WebDevWork = '/work/web-dev',
  WebDevDetail = '/work/web-dev/:id'
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
  Work: RoutePaths.Work,
  GraphicsWork: RoutePaths.GraphicsWork,
  GraphicsDetail: RoutePaths.GraphicsDetail,
  UXUIWork: RoutePaths.UXUIWork,
  UXUIDetail: RoutePaths.UXUIDetail,
  WebDevWork: RoutePaths.WebDevWork,
  WebDevDetail: RoutePaths.WebDevDetail,
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
    path: RoutePaths.Work,
  },
  {
    path: RoutePaths.GraphicsWork,
  },
  {
    path: RoutePaths.GraphicsDetail,
  },
  {
    path: RoutePaths.UXUIWork,
  },
  {
    path: RoutePaths.UXUIDetail,
  },
  {
    path: RoutePaths.WebDevWork,
  },
  {
    path: RoutePaths.WebDevDetail,
  },
  {
    path: RoutePaths.Error,
  },
];

