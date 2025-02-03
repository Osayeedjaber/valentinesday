import React from 'react';
import { Heart } from 'lucide-react';

export const FloatingHearts = () => {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-pink-300 opacity-20 animate-float-${(i % 6) + 1}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}
    </>
  );
};
