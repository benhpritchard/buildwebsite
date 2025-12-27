import React from 'react';

export default function PizzaProgress({ term, lessonsCompleted, totalLessons = 6 }) {
  // We'll create an SVG pizza with 6 slices
  const radius = 100;
  const center = 110; // slight padding
  
  // Calculate slice paths
  const slices = Array.from({ length: totalLessons }).map((_, index) => {
    const startAngle = (index * 360) / totalLessons;
    const endAngle = ((index + 1) * 360) / totalLessons;
    
    // Convert polar to cartesian
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    // SVG Path command for a slice
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  });

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold text-[#FF4136] mb-4 font-comic">
        Pizza Progress: Term {term}
      </h3>
      
      <div className="relative w-64 h-64">
        <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-xl">
          {slices.map((d, index) => {
            const isCompleted = index < lessonsCompleted;
            return (
              <path
                key={index}
                d={d}
                fill={isCompleted ? '#FFDC00' : 'white'} // Yellow for cheese/completed, white/transparent for empty
                stroke="#FF4136" // Red crust/outline
                strokeWidth="4"
                className="transition-all duration-500"
              />
            );
          })}
          
          {/* Pepperoni dots for completed slices */}
          {slices.map((_, index) => {
            if (index >= lessonsCompleted) return null;
            // Calculate center of slice for pepperoni
            const angle = ((index * 360) / totalLessons) + (360 / totalLessons / 2);
            const rad = (angle - 90) * (Math.PI / 180);
            const r = radius * 0.6;
            const px = center + r * Math.cos(rad);
            const py = center + r * Math.sin(rad);
            
            return (
              <circle 
                key={`pep-${index}`}
                cx={px}
                cy={py}
                r="8"
                fill="#FF4136"
                className="animate-bounce"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xl font-bold text-gray-700 font-comic">
          {lessonsCompleted} of {totalLessons} Slices Eaten!
        </p>
        <p className="text-gray-500 font-comic">Complete lessons to get more pizza!</p>
      </div>
    </div>
  );
}