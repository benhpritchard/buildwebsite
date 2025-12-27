import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LessonCircle from './LessonCircle';
import { TrendingUp, BookOpen } from 'lucide-react';

export default function TermProgress({ term, data, topicTitle, learningObjectives, theme = {}, isKS1, isKS2 }) {
  // Calculate average
  const scores = data.map(d => d.score);
  const average = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) 
    : 0;

  const cardStyle = theme.cardBg || "bg-white/80 backdrop-blur-sm border-none shadow-lg";
  const headerStyle = theme.headerGradient || "bg-gradient-to-r from-[#3448C5] to-[#4e60d6]";
  const primaryColor = theme.primary || "#3448C5";

  return (
    <Card className={`overflow-hidden w-full ${cardStyle}`}>
      <CardHeader className={`${headerStyle} text-white p-6`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`font-bold ${isKS1 ? 'text-3xl' : 'text-2xl'}`}>{topicTitle}</h3>
            <p className="text-white/80">{isKS1 ? 'Your Topic' : `Term ${term}`}</p>
          </div>
          <div className="text-right bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
            <div className={`${isKS1 ? 'text-5xl' : 'text-4xl'} font-bold`}>{average}%</div>
            <p className="text-xs text-white/80 uppercase tracking-wider font-semibold">
              {isKS1 ? 'My Score' : 'Term Average'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className={`grid grid-cols-1 ${isKS1 ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          {[1, 2, 3, 4, 5, 6].map(lessonNum => {
            const lessonData = data.find(d => d.lesson_number === lessonNum);
            const objective = learningObjectives?.[lessonNum] || "Learning objective coming soon...";
            
            return (
              <div 
                key={lessonNum} 
                className={`
                  bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow flex items-center gap-4
                  ${isKS1 ? 'border-4 border-blue-200' : 'border-gray-100'}
                `}
              >
                <div className="flex-shrink-0">
                   <LessonCircle 
                    lessonNumber={lessonNum} 
                    score={lessonData?.score || 0}
                    hideText={true}
                    isKS1={isKS1}
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-2 mb-1">
                     <span 
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: isKS1 ? '#E0F7FA' : '#EFF6FF', color: primaryColor }}
                     >
                       Lesson {lessonNum}
                     </span>
                     {lessonData?.score === 100 && (
                       <span className="text-yellow-500 text-xs font-bold">★ {isKS1 ? 'Super!' : 'Perfect'}</span>
                     )}
                  </div>
                  <p 
                    className={`
                      text-gray-700 font-medium leading-snug
                      ${isKS1 ? 'text-lg line-clamp-2' : 'text-sm line-clamp-3'}
                    `} 
                    title={objective}
                  >
                    {objective}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Next Steps / Feedback */}
        {!isKS1 && (
          <div 
            className="mt-8 p-6 rounded-2xl border flex items-start gap-4"
            style={{ backgroundColor: isKS2 ? '#F0FFF4' : '#EFF6FF', borderColor: isKS2 ? '#C6F6D5' : '#DBEAFE' }}
          >
            <div className="bg-white p-2 rounded-full shadow-sm">
              <TrendingUp className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2" style={{ color: primaryColor }}>
                {isKS2 ? 'Your Next Steps' : 'Feedback & Next Steps'}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {average === 100 ? (isKS2 ? "Wow! You got everything right! You are a money expert!" : "Outstanding work! You've mastered this topic perfectly.") : 
                average >= 80 ? (isKS2 ? "Awesome job! You are doing really well. Can you get 100% on all games?" : "Great job! You're showing strong understanding.") :
                average >= 50 ? (isKS2 ? "Good start! Try playing the games again to get a higher score." : "Good progress. Review the lessons where you scored below 50%.") :
                (isKS2 ? "Keep trying! Play the games again and have fun learning!" : "Keep going! Don't worry about the scores yet.")}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}