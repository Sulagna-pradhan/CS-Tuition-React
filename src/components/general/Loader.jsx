import React, { useEffect, useState } from "react";

const CosmicLoader = () => {
  const [rotation, setRotation] = useState(0);
  const [stars, setStars] = useState([]);
  const [loadingDots, setLoadingDots] = useState(1);
  
  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 20; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: Math.random() > 0.7 ? 'w-1 h-1' : 'w-0.5 h-0.5',
          delay: `${Math.random() * 2}s`,
          duration: `${1 + Math.random() * 2}s`
        });
      }
      setStars(newStars);
    };
    
    generateStars();
    
    // Rotate galaxy
    const rotateInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    // Update loading dots
    const dotsInterval = setInterval(() => {
      setLoadingDots(prev => prev < 3 ? prev + 1 : 1);
    }, 500);
    
    return () => {
      clearInterval(rotateInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden">
      {/* Background stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.size} rounded-full bg-white animate-pulse`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
      
      {/* Cosmic galaxy loader */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer nebula glow */}
        <div className="absolute w-full h-full rounded-full bg-purple-900 opacity-20 animate-pulse"></div>
        
        {/* Galaxy spiral */}
        <div 
          className="absolute w-full h-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Spiral arms */}
          <div className="absolute w-full h-full">
            <div className="absolute top-0 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent transform -translate-x-1/2 rotate-0"></div>
            <div className="absolute top-0 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform -translate-x-1/2 rotate-45"></div>
            <div className="absolute top-0 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent transform -translate-x-1/2 rotate-90"></div>
            <div className="absolute top-0 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-1/2 rotate-135"></div>
          </div>
          
          {/* Orbital rings */}
          <div className="absolute inset-4 rounded-full border border-indigo-300 opacity-30"></div>
          <div className="absolute inset-8 rounded-full border border-purple-300 opacity-30"></div>
          <div className="absolute inset-12 rounded-full border border-pink-300 opacity-30"></div>
          
          {/* Planets */}
          <div className="absolute top-4 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400"></div>
          <div className="absolute top-1/2 right-4 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-400"></div>
          <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400"></div>
        </div>
        
        {/* Central star */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 animate-pulse"></div>
          <div className="absolute inset-1 rounded-full bg-white"></div>
          {/* Light rays */}
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-yellow-100 via-transparent to-yellow-100"></div>
          <div className="absolute w-0.5 h-full bg-gradient-to-b from-yellow-100 via-transparent to-yellow-100"></div>
        </div>
      </div>
      
      {/* Clear loading indicators */}
      <div className="absolute bottom-16 flex flex-col items-center">
        {/* Main loading text */}
        <div className="bg-black bg-opacity-50 px-6 py-3 rounded-lg mb-2">
          <p className="text-xl font-bold text-white">
            LOADING
            <span className="inline-block w-8 text-center">
              {'.'.repeat(loadingDots)}
            </span>
          </p>
        </div>
        
        {/* Secondary text */}
        <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        
        {/* Progress indicators */}
        <div className="mt-4 flex space-x-2">
          <div className={`w-2 h-2 rounded-full ${loadingDots >= 1 ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${loadingDots >= 2 ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
          <div className={`w-2 h-2 rounded-full ${loadingDots >= 3 ? 'bg-pink-400' : 'bg-gray-600'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CosmicLoader;