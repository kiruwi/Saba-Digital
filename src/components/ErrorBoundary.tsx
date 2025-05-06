import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../themes/theme';

const ErrorBoundaryContainer = styled.div<{ theme: Theme }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.heading};
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.error};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: 20px;
  }

  button {
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transitions.default};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryContainer>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </ErrorBoundaryContainer>
      );
    }

    return this.props.children;
  }
}
