import { Component } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error-boundary.styles';

interface ErrorBoundaryProps {}

interface ErrorBoundaryStates {
  hasErrored: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  state: ErrorBoundaryStates = {
    hasErrored: false,
  };

  static getDerivedStateFromError(error: any) {
    // TODO: process the error
    return { hasErrored: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
          <ErrorImageText>Sorry, this page is broken.</ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// Because of this Error Boundary, we don't have to show users the ugly error page, if something went wrong.
// We could also have set different error boundary components to show to different components, if required.
