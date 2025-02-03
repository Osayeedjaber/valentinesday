import React from 'react';
import { Heart } from 'lucide-react';

// Interface defining the props for LoadingScreen component
interface LoadingScreenProps {
  text: string; // Text to display during loading
}

// LoadingScreen functional component
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ text }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 flex items-center justify-center flex-col">
      {/* Animated heart icon */}
      <div className="animate-pulse">
        <Heart className="w-16 h-16 text-pink-500" />
      </div>
      {/* Loading text displayed below the heart */}
      <p className="text-pink-500 mt-4 text-lg">{text}</p>
    </div>
  );
};

