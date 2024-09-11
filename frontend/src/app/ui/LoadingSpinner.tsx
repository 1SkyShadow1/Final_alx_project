import React from 'react';

interface LoadingSpinnerProps {
  size?: number; // Diameter of the spinner in pixels
  color?: string; 
  thickness?: number; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40, // Default size 
  color = '#0EA5E9', // Tailwind's default blue
  thickness = 4 
}) => {
  return (
    <div className="flex items-center justify-center h-full"> 
      <svg
        className="animate-spin" // Apply Tailwind's spin animation
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size} 
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={thickness} // Control the thickness of the spinner
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" stroke={color} />
      </svg>
    </div>
  );
};

export default LoadingSpinner;