import React from 'react';
import { Film } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  subtitle?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Buscando películas perfectas para ti...',
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
      <Film className="w-16 h-16 text-purple-400 animate-pulse" />
      <div className="flex gap-2">
        <div
          className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
      <p className="text-white text-xl font-semibold max-w-md">{message}</p>
      {subtitle && <p className="text-gray-300 text-sm max-w-md">{subtitle}</p>}
    </div>
  );
};
