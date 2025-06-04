// src/types/index.ts
export * from '../data/projects';

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    accent: string;
    card: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    main: string;
    heading: string;
  };
  transitions: {
    default: string;
    fast: string;
    slow: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

export interface NavigationProps extends BaseComponentProps {
  toggle: () => void;
  isOpen: boolean;
}

export interface SidebarProps extends BaseComponentProps {
  isOpen: boolean;
  toggle: () => void;
}

export interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
}

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'fadeInDown' 
  | 'fadeInLeft' 
  | 'fadeInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'bounceIn'
  | 'pulse';

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    creator?: string;
  };
}

// Performance Types
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, string | number | boolean>;
}

// Gallery Types
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

// Description Section interface for project descriptions
export interface DescriptionSection {
  heading: string;
  content: string;
}

// Service Types
export interface ProjectType {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  fullDescription2?: string;
  fullDescription3?: DescriptionSection[];
  image: string;
  additionalImages?: string[];
  gallery?: Array<{
    src: string;
    alt: string;
  }>;
  tags: string[];
  category: 'uxui' | 'webdev' | 'graphics';
  features?: string[];
  tools?: string[];
  year?: string | number;
  stack?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
  features?: string[];
  cta?: {
    text: string;
    link: string;
  };
}

// Error Types
export interface AppError {
  message: string;
  code?: string | number;
  stack?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Responsive Breakpoints
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen';

export interface MediaQueryBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  widescreen: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// React Component Types
export type FC<P = {}> = React.FunctionComponent<P>;
export type PropsWithChildren<P = {}> = P & { children?: React.ReactNode };

// Event Handler Types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
export type FormHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
