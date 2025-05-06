import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteConfig {
  path: string;
  component: () => Promise<{
    default: ComponentType<any>;
  }>;
  exact?: boolean;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}

export interface FormProps {
  fields: Array<{
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    validationMessage?: string;
  }>;
  onSubmit: (data: { [key: string]: string }) => void;
  submitLabel: string;
  isLoading?: boolean;
}

export interface ErrorProps {
  error: Error | null;
  resetError: () => void;
}
