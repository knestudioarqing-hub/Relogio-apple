import React from 'react';
import { BackgroundTheme } from '../types';

interface BackgroundProps {
  theme: BackgroundTheme;
}

export const Background: React.FC<BackgroundProps> = ({ theme }) => {
  const getBackgroundClass = () => {
    switch (theme) {
      case BackgroundTheme.BigSur:
        return 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 animate-gradient-x';
      case BackgroundTheme.Monterey:
        return 'bg-gradient-to-br from-purple-700 via-purple-500 to-pink-500 animate-gradient-x';
      case BackgroundTheme.Ventura:
        return 'bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 animate-gradient-x';
      case BackgroundTheme.Sonoma:
        return 'bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 animate-gradient-x';
      case BackgroundTheme.Midnight:
        return 'bg-gray-900';
      case BackgroundTheme.Aurora:
        return 'bg-gradient-to-t from-green-300 via-blue-500 to-purple-600 animate-gradient-x';
      default:
        return 'bg-black';
    }
  };

  return (
    <div
      className={`fixed inset-0 w-full h-full -z-10 transition-colors duration-1000 ${getBackgroundClass()}`}
    />
  );
};