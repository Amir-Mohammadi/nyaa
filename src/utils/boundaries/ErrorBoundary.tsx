import React from 'react';
import Logger from '../Logger';

const logger = new Logger('ERROR_BOUNDARY');

class ErrorBoundary extends React.Component {
  componentDidCatch(error: any, errorInfo: any) {
    logger.error(error, errorInfo);
    return;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
// @ts-ignore
export default (Component) => {
  return class extends React.Component {
    render() {
      return (
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      );
    }
  };
};
