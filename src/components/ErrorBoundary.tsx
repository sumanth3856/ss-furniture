"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAFAFA]">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Something went wrong
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              We apologize for the inconvenience. An unexpected error occurred.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 text-[#1A1A1A] font-medium border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
