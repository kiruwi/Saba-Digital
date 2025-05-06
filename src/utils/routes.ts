import React from 'react';
import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

export enum RoutePaths {
  Home = '/',
  Contact = '/contactus',
  Error = '*',
}

export type RouteConfig = {
  path: RoutePaths;
  component: React.ComponentType<any>;
  exact?: boolean;
};

export const routes: RouteObject[] = [
  {
    path: RoutePaths.Home,
    element: React.lazy(() => import('../pages/Home').then((mod) => mod.default)),
    exact: true,
  },
  {
    path: RoutePaths.Contact,
    element: React.lazy(() => import('../pages/contactus').then((mod) => mod.default)),
    exact: true,
  },
  {
    path: RoutePaths.Error,
    element: React.lazy(() => import('../pages/Error').then((mod) => mod.default)),
  },
];
