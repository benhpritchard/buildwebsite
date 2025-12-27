import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const AVATAR_LEVELS = [
  // Level 1 (Unlocked)
  [
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2f5mt22f5mt22f5m-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_3ihpwg3ihpwg3ihp-removebg-preview.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_4ntt774ntt774ntt-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_4q9d104q9d104q9d-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_8ydlq28ydlq28ydl-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_at04f3at04f3at04-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_d6pz34d6pz34d6pz-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_m3hgsnm3hgsnm3hg-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_q7mzi7q7mzi7q7mz-removebg-preview.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_vl3789vl3789vl37-Photoroom.png?raw=true'
  ],
  // Level 2
  [
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2b0wx72b0wx72b0w-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_6w8w276w8w276w8w-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_hc258qhc258qhc25-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_jaajqxjaajqxjaaj-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_jj1bcwjj1bcwjj1b-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_kh48i1kh48i1kh48-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_rqp4xzrqp4xzrqp4-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_syxzg1syxzg1syxz-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_u8iyg5u8iyg5u8iy-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_z8z6bcz8z6bcz8z6-Photoroom.png?raw=true'
  ],
  // Level 3
  [
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_3tncvg3tncvg3tnc-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_5ihqki5ihqki5ihq-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_ccpff9ccpff9ccpf-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_g07s51g07s51g07s-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_f81qnsf81qnsf81q-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_ho6caaho6caaho6c-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_j7tp5ij7tp5ij7tp-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_s421mts421mts421-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_v2tofmv2tofmv2to-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_z1jj9lz1jj9lz1jj-Photoroom.png?raw=true'
  ],
  // Level 4
  [
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2q3zyt2q3zyt2q3z-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_3iwd0k3iwd0k3iwd-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_b40vgdb40vgdb40v-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_cg11i0cg11i0cg11-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_lbozmflbozmflboz-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_p0f6stp0f6stp0f6-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_qqngjiqqngjiqqng-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_t9eh4at9eh4at9eh-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_x4ir8rx4ir8rx4ir-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_ycms8aycms8aycms-Photoroom.png?raw=true'
  ],
  // Level 5
  [
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_1c7k3a1c7k3a1c7k-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_1ps2gh1ps2gh1ps2-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2fj2y12fj2y12fj2-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_dwsz4ndwsz4ndwsz-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_fszk14fszk14fszk-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_fx1lqifx1lqifx1l-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_l4ycoil4ycoil4yc-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_lrng7ylrng7ylrng-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_ptenfgptenfgpten-Photoroom.png?raw=true',
    'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_y7bgt6y7bgt6y7bg.png?raw=true'
  ]
];

export default function AvatarSelector({ currentAvatar, onSelectAvatar, studentId, yearGroup, totalPoints, unlockedAvatars = [], onStudentUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeViewOpen, setIsLargeViewOpen] = useState(false);
  const [unlockModal, setUnlockModal] = useState({ isOpen: false, avatar: null, cost: 0 });

  // Customize avatars based on Year Group
  const getAvatarLevels = () => {
    if (yearGroup === 'Year 4') {
      const customLevels = JSON.parse(JSON.stringify(AVATAR_LEVELS));
      // Replace the first emoji (dog) with the custom image for Year 4
      customLevels[0][0] = 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2f5mt22f5mt22f5m-Photoroom.png?raw=true';
      return customLevels;
    }
    return AVATAR_LEVELS;
  };

  const activeLevels = getAvatarLevels();

  const handleSelect = async (avatarValue) => {
    onSelectAvatar(avatarValue);
    setIsOpen(false);
    // Persist to database if studentId is provided
    if (studentId) {
       try {
         await base44.entities.Student.update(studentId, { 
            avatar: { type: 'emoji', value: avatarValue } 
         });
         // If onStudentUpdate is provided, let parent handle storage update, otherwise fallback
         if (!onStudentUpdate) {
            const stored = JSON.parse(localStorage.getItem('finnquest_student') || '{}');
            stored.avatar = { type: 'emoji', value: avatarValue };
            localStorage.setItem('finnquest_student', JSON.stringify(stored));
         } else {
            onStudentUpdate({ avatar: { type: 'emoji', value: avatarValue } });
         }
       } catch (e) {
         console.error("Failed to save avatar", e);
       }
    }
  };

  const handleAvatarClick = (item, isLocked, cost) => {
    if (isLocked) {
      setUnlockModal({ isOpen: true, avatar: item, cost });
    } else {
      handleSelect(item);
    }
  };

  const handleUnlock = async () => {
    if (!unlockModal.avatar || !studentId) return;
    
    const newPoints = totalPoints - unlockModal.cost;
    const newUnlocked = [...unlockedAvatars, unlockModal.avatar];

    try {
      await base44.entities.Student.update(studentId, {
        total_points: newPoints,
        unlocked_avatars: newUnlocked
      });
      
      if (onStudentUpdate) {
        onStudentUpdate({
          total_points: newPoints,
          unlocked_avatars: newUnlocked
        });
      }
      
      setUnlockModal({ isOpen: false, avatar: null, cost: 0 });
    } catch (error) {
      console.error("Failed to unlock avatar:", error);
    }
  };

  const renderAvatar = (value, className = "") => {
    const avatarSrc = value && value.startsWith('http') ? value : 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2f5mt22f5mt22f5m-Photoroom.png?raw=true';
    
    if (avatarSrc.startsWith('http')) {
      return (
        <img 
          src={avatarSrc} 
          alt="Avatar" 
          className={`object-cover rounded-full ${className}`}
        />
      );
    }
    return <span className={className}>{value || '🐶'}</span>;
  };

  return (
    <div className="flex items-center gap-8">
      {/* "Available Avatars" Button Box */}
      <div className="flex flex-col items-center gap-2 mt-8">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button 
              className="bg-white border-2 border-blue-200 rounded-xl px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
            >
              Available Avatars
            </button>
          </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto bg-[#FAF7F0]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-[#3448C5]">Choose Your Character</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col-reverse gap-6 py-6">
            {activeLevels.map((level, levelIndex) => {
              const levelNum = levelIndex + 1;

              // Define costs per level
              const levelCosts = { 1: 100, 2: 200, 3: 250, 4: 300, 5: 500 };
              const cost = levelCosts[levelNum];

              return (
                <div key={levelNum} className="relative p-4 rounded-xl bg-white/50 border border-gray-200">
                  <div className="absolute -top-3 left-4 bg-[#3448C5] text-white text-xs font-bold px-2 py-1 rounded-full">
                    Level {levelNum}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4 justify-items-center">
                    {level.map((item, i) => {
                      // Determine locked status
                      // Level 1: First 5 (0-4) are free/unlocked. Rest are locked UNLESS purchased.
                      const isFree = levelNum === 1 && i < 5;
                      const isPurchased = unlockedAvatars.includes(item);
                      const isLocked = !isFree && !isPurchased;

                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleAvatarClick(item, isLocked, cost)}
                            className={`
                              w-32 h-32 flex items-center justify-center text-3xl rounded-xl transition-all relative
                              ${!isLocked 
                                ? 'hover:bg-blue-100 hover:scale-105 cursor-pointer bg-white shadow-sm' 
                                : 'cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100'}
                              ${currentAvatar === item ? 'ring-4 ring-[#35D0BA]' : ''}
                            `}
                          >
                            <div className={isLocked ? "opacity-90" : ""}>
                              {renderAvatar(item, "w-28 h-28")}
                            </div>

                            {isLocked && (
                              <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md z-10">
                                <Lock className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                              </div>
                            )}
                          </button>
                          {isLocked && (
                            <div className="text-sm font-bold text-gray-600 bg-white/80 px-2 py-0.5 rounded-full border border-gray-200">
                              {cost} pts
                            </div>
                          )}
                          {(isFree || isPurchased) && (
                            <div className="text-sm font-bold text-[#35D0BA] bg-white/80 px-2 py-0.5 rounded-full border border-[#35D0BA]/30">
                              {isFree ? 'Free' : 'Unlocked'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      <p className="text-xs text-center text-gray-500 max-w-[150px]">
        Complete lessons to earn more points. Use your points to unlock different avatars.
      </p>
      </div>

      {/* Unlock Confirmation Modal */}
      <Dialog open={unlockModal.isOpen} onOpenChange={(open) => !open && setUnlockModal({...unlockModal, isOpen: false})}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-6 border-4 border-[#3448C5]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-[#3448C5]">Unlock Avatar?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="w-48 h-48 rounded-full border-4 border-[#35D0BA] overflow-hidden bg-gray-50">
               {renderAvatar(unlockModal.avatar, "w-full h-full object-cover")}
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-600 font-medium">This avatar costs:</p>
              <div className="text-3xl font-black text-[#3448C5] flex items-center justify-center gap-2">
                {unlockModal.cost} <span className="text-xl text-gray-400 font-bold">pts</span>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-xl p-4 flex justify-between items-center">
              <span className="text-gray-500 font-bold">Your Balance:</span>
              <span className={`text-xl font-bold ${totalPoints >= unlockModal.cost ? 'text-green-600' : 'text-red-500'}`}>
                {totalPoints} pts
              </span>
            </div>

            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                onClick={() => setUnlockModal({...unlockModal, isOpen: false})}
                className="flex-1 border-2 border-gray-200 font-bold text-gray-500 hover:bg-gray-50 h-12"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUnlock}
                disabled={totalPoints < unlockModal.cost}
                className={`flex-1 h-12 font-bold text-lg ${
                  totalPoints >= unlockModal.cost 
                  ? 'bg-[#35D0BA] hover:bg-[#2bb8a4] text-white shadow-lg transform hover:-translate-y-1 transition-all' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {totalPoints >= unlockModal.cost ? 'Unlock Now' : 'Not Enough Points'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Current Avatar Display (No background, no box) */}
      <div className="relative group" onClick={() => setIsLargeViewOpen(true)}>
        <div className="w-40 h-40 md:w-60 md:h-60 flex items-center justify-center filter drop-shadow-md transition-transform hover:scale-105 cursor-pointer">
           {renderAvatar(currentAvatar, "w-full h-full text-9xl md:text-[9rem]")}
        </div>
      </div>

      <Dialog open={isLargeViewOpen} onOpenChange={setIsLargeViewOpen}>
        <DialogContent className="max-w-none w-auto h-auto bg-transparent border-none shadow-none p-0 flex justify-center items-center">
            <div className="w-[80vh] h-[80vh] flex items-center justify-center rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-8 border-white/50 shadow-2xl animate-in zoom-in-50 duration-300">
               {renderAvatar(currentAvatar, "w-full h-full object-cover")}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}