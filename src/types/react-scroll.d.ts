declare module 'react-scroll' {
  import * as React from 'react';

  export interface ScrollProps {
    to: string;
    containerId?: string;
    activeClass?: string;
    spy?: boolean;
    smooth?: boolean | string;
    offset?: number;
    delay?: number;
    isDynamic?: boolean;
    onSetActive?: (to: string) => void;
    onSetInactive?: (to: string) => void;
    ignoreCancelEvents?: boolean;
    duration?: number;
  }

  export interface ScrollLinkProps extends ScrollProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  }

  export interface AnimateScrollProps {
    scrollToTop: () => void;
    scrollToBottom: () => void;
    scrollTo: (offset: number, options?: ScrollProps) => void;
    scrollMore: (offset: number, options?: ScrollProps) => void;
  }

  export const Link: React.ComponentType<ScrollLinkProps>;
  export const Element: React.ComponentType<{ name: string; className?: string }>;
  export const Events: {
    scrollEvent: {
      register: (eventName: string, callback: (event: Event) => void) => void;
      remove: (eventName: string) => void;
    };
  };
  export const scroller: {
    scrollTo: (target: string, options?: ScrollProps) => void;
  };
  export const animateScroll: AnimateScrollProps;
}
