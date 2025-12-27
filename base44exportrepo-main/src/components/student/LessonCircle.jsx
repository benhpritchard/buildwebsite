import React from 'react';
import { motion } from 'framer-motion';

export default function LessonCircle({ score, lessonNumber, topic, hideText = false, isKS1 = false }) {
  const radius = isKS1 ? 35 : 28;
  const stroke = isKS1 ? 8 : 5;
  const size = isKS1 ? 80 : 64;
  const center = size / 2;
  
  const normalizedScore = Math.min(Math.max(score || 0, 0), 100);
  const circumference = normalizedScore * 2 * Math.PI * radius / 100;
  
  let color = '#ef4444'; // red
  if (normalizedScore >= 50) color = '#f97316'; // orange
  if (normalizedScore >= 80) color = '#22c55e'; // green

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth={stroke}
            fill="transparent"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDasharray: 0 }}
            animate={{ strokeDasharray: `${circumference} 1000` }}
            transition={{ duration: 1, ease: "easeOut" }}
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${isKS1 ? 'text-xl' : 'text-sm'} font-bold text-gray-700`}>{normalizedScore}%</span>
        </div>
      </div>
      {!hideText && (
        <div className="text-center">
          <p className="text-xs font-bold text-gray-600">Lesson {lessonNumber}</p>
          {topic && <p className="text-[10px] text-gray-500 max-w-[80px] truncate">{topic}</p>}
        </div>
      )}
    </div>
  );
}