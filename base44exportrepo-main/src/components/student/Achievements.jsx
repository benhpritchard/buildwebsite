import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Medal, Target } from 'lucide-react';

export default function Achievements({ totalScore, lessonsCompleted, assessments = [] }) {
  const achievements = [
    { 
      id: 'first_steps', 
      title: 'First Steps', 
      desc: 'Complete your first lesson', 
      icon: <Target className="w-5 h-5" />,
      unlocked: lessonsCompleted >= 1 
    },
    { 
      id: 'on_fire', 
      title: 'On Fire', 
      desc: 'Complete 5 lessons', 
      icon: <Star className="w-5 h-5" />,
      unlocked: lessonsCompleted >= 5 
    },
    { 
      id: 'scholar', 
      title: 'Scholar', 
      desc: 'Achieve 100% in a lesson', 
      icon: <Medal className="w-5 h-5" />,
      unlocked: assessments.some(a => a.score >= 100) 
    },
    { 
      id: 'master', 
      title: 'Financial Master', 
      desc: 'Complete a full term', 
      icon: <Trophy className="w-5 h-5" />,
      unlocked: lessonsCompleted >= 6 
    }
  ];

  return (
    <Card className="h-full border-none shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3448C5]">
          <Trophy className="w-5 h-5" /> Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map(ach => (
            <div 
              key={ach.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                ach.unlocked 
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-900' 
                  : 'bg-gray-50 border-gray-100 text-gray-400 grayscale'
              }`}
            >
              <div className={`p-2 rounded-full ${ach.unlocked ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                {ach.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm">{ach.title}</h4>
                <p className="text-xs opacity-80">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}