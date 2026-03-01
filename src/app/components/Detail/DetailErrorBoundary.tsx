'use client';

import { ReactNode, Component, ErrorInfo } from 'react';

interface DetailErrorBoundaryProps {
  children: ReactNode;
}

interface DetailErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class DetailErrorBoundary extends Component<DetailErrorBoundaryProps, DetailErrorBoundaryState> {
  constructor(props: DetailErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): DetailErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DetailErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="border-red-200 bg-red-50 rounded-lg border-2 p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="text-red-800 mb-2 text-2xl font-bold">오류가 발생했습니다</h2>
            <p className="text-red-700 mb-6">
              {this.state.error?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 inline-block rounded-lg px-6 py-3 font-semibold text-white transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DetailErrorBoundary;
