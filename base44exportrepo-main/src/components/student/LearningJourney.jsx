import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, CheckCircle2, Circle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function LearningJourney({ allTerms, currentTerm }) {
  // allTerms is [{ term: "1.1", title: "Topic Name", completed: boolean }]

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-[#3448C5]">
          <Map className="w-5 h-5" /> My Learning Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
          <div className="flex w-max space-x-4 p-4 items-center">
            {allTerms.map((item, index) => {
              const isCurrent = item.term === currentTerm;
              const isCompleted = item.completed;
              
              return (
                <div key={item.term} className="flex flex-col items-center group min-w-[120px]">
                  <div className="relative flex items-center justify-center mb-3">
                     {/* Connecting Line (except for first item) */}
                    {index > 0 && (
                      <div className={`absolute right-[50%] w-[140px] h-1 -z-10 top-1/2 -translate-y-1/2 ${isCompleted ? 'bg-[#35D0BA]' : 'bg-gray-200'}`} />
                    )}
                    
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-4 
                        transition-all duration-300 z-10
                        ${isCompleted 
                          ? 'bg-[#35D0BA] border-[#35D0BA] text-white shadow-lg shadow-[#35D0BA]/20' 
                          : isCurrent
                            ? 'bg-white border-[#3448C5] text-[#3448C5] shadow-lg scale-110'
                            : 'bg-white border-gray-200 text-gray-300'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <span className="text-sm font-bold">{item.term}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className={`text-sm font-bold ${isCurrent ? 'text-[#3448C5]' : 'text-gray-700'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">Term {item.term}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}