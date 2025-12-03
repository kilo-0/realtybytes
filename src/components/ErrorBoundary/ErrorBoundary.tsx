import { Component } from 'react';
import type { ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>We encountered an unexpected error. Please try one of the following:</p>
            <div className="error-actions">
              <button onClick={() => window.location.reload()} className="error-button primary">
                Reload Page
              </button>
              <button onClick={() => window.location.href = '/'} className="error-button secondary">
                Go to Home
              </button>
            </div>
            {this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{this.state.error.message}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
