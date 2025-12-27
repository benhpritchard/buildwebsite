import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Corkboard texture style
const corkStyle = {
  backgroundColor: '#d8ae7e',
  backgroundImage: `url("https://www.transparenttextures.com/patterns/cork-board.png")`,
  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
  border: '12px solid #5c4033', // wooden frame
  borderRadius: '8px'
};

const pinColors = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7'];

export default function CorkBoard({ badges }) {
  return (
    <div className="p-8 relative" style={corkStyle}>
      <h3 className="text-center font-handwriting text-2xl text-amber-900 mb-8 bg-white/80 inline-block px-4 py-1 rounded shadow-sm rotate-[-1deg] mx-auto block w-fit">
        My Achievements
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">
        {badges.map((badge, index) => {
          const isUnlocked = badge.unlocked;
          const rotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 deg
          const pinColor = pinColors[index % pinColors.length];
          
          return (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className={`
                    relative bg-white p-3 rounded shadow-lg transform transition-transform hover:scale-110 cursor-pointer
                    w-28 h-32 flex flex-col items-center justify-between
                    ${!isUnlocked ? 'opacity-60 grayscale' : ''}
                  `}
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Push Pin */}
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md z-10"
                    style={{ backgroundColor: pinColor }}
                  />
                  
                  {/* Badge Content */}
                  <div className="mt-2 text-3xl">{badge.icon}</div>
                  <p className="text-xs text-center font-bold text-gray-700 leading-tight">
                    {badge.title}
                  </p>
                  
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
                      <span className="text-xs font-bold bg-white/80 px-1 rounded">Locked</span>
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="bg-[#FAF7F0] border-4 border-[#3448C5]">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl text-[#3448C5] flex flex-col items-center gap-2">
                     <span className="text-6xl">{badge.icon}</span>
                     {badge.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="text-center p-4">
                  <p className="text-lg text-gray-700 font-medium mb-4">{badge.description}</p>
                  <div className={`inline-block px-4 py-2 rounded-full font-bold ${isUnlocked ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {isUnlocked ? "Unlocked!" : "Keep playing to unlock!"}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}