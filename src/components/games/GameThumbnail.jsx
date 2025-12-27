import React from 'react';
import { Lock } from 'lucide-react';

export default function GameThumbnail({ game, onClick }) {
  return (
    <div 
      className="relative h-64 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 ${game.locked ? 'grayscale' : ''}`}
        style={{ background: game.gradient || game.bgColor }}
      >
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-32 h-32 rounded-full opacity-20 animate-pulse"
            style={{ 
              background: 'rgba(255,255,255,0.3)', 
              top: '10%', 
              left: '10%',
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute w-24 h-24 rounded-full opacity-20 animate-pulse"
            style={{ 
              background: 'rgba(255,255,255,0.3)', 
              bottom: '15%', 
              right: '15%',
              animationDelay: '0.5s'
            }}
          />
          <div 
            className="absolute w-16 h-16 rounded-full opacity-20 animate-pulse"
            style={{ 
              background: 'rgba(255,255,255,0.3)', 
              top: '50%', 
              right: '30%',
              animationDelay: '1s'
            }}
          />
        </div>
        
        {/* Pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Main emoji/icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className={`text-8xl transform transition-transform duration-300 group-hover:scale-110 ${game.locked ? 'grayscale' : ''}`}
          style={{ filter: game.locked ? 'grayscale(100%)' : 'none' }}
        >
          {game.emoji}
        </span>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {/* Lock overlay */}
      {game.locked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-4 shadow-lg">
            <Lock className="w-10 h-10 text-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
}