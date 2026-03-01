/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, type ReactNode } from 'react';
import Game from './components/Game';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-gray-900 flex items-center justify-center text-white">
          <div className="text-center p-8 max-w-lg">
            <h1 className="text-2xl font-bold text-red-400 mb-4">GeminiCraft - Feil</h1>
            <p className="text-gray-300 mb-4">En feil oppstod ved oppstart av spillet:</p>
            <pre className="text-sm text-red-300 bg-black/50 p-4 rounded text-left overflow-auto">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white"
            >
              Last inn på nytt
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  );
}
