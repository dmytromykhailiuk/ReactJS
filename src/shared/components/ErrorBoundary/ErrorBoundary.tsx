import React, { ErrorInfo } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    return this.state.hasError ? <h1>Something went wrong.</h1> : this.props.children;
  }
}
