import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lock, Unlock, CheckCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import ImageWithLoader from '@/components/ui/ImageWithLoader';
import { yearTopics } from '../components/games/gameData';

export default function ClassUnlocks() {
  const urlParams = new URLSearchParams(window.location.search);
  const classId = urlParams.get('classId');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const queryClient = useQueryClient();

  const { data: classData, isLoading } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      if (!classId) return null;
      const classes = await base44.entities.Class.filter({ id: classId });
      return classes[0];
    },
    enabled: !!classId,
  });

  const updateClassMutation = useMutation({
    mutationFn: (data) => base44.entities.Class.update(classId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['class', classId]);
    },
  });

  const handleToggleLesson = (termId, lessonNum) => {
    if (!classData) return;
    
    const lessonKey = `${termId}-${lessonNum}`;
    const currentUnlocked = classData.unlocked_lessons || [];
    let newUnlocked;

    if (currentUnlocked.includes(lessonKey)) {
      newUnlocked = currentUnlocked.filter(k => k !== lessonKey);
    } else {
      newUnlocked = [...currentUnlocked, lessonKey];
    }

    updateClassMutation.mutate({ unlocked_lessons: newUnlocked });
  };

  const handleUnlockAllInTerm = (termId) => {
      if (!classData) return;
      const currentUnlocked = new Set(classData.unlocked_lessons || []);
      
      // Add all 6 lessons for this term
      for (let i = 1; i <= 6; i++) {
          currentUnlocked.add(`${termId}-${i}`);
      }
      
      updateClassMutation.mutate({ unlocked_lessons: Array.from(currentUnlocked) });
  };

  const handleLockAllInTerm = (termId) => {
      if (!classData) return;
      const currentUnlocked = (classData.unlocked_lessons || []).filter(
          key => !key.startsWith(`${termId}-`)
      );
      
      updateClassMutation.mutate({ unlocked_lessons: currentUnlocked });
  };


  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">Loading...</div>;
  }

  if (!classData) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">Class not found</div>;
  }

  const yearGroup = classData.year_group;
  const topics = yearTopics[yearGroup] || [];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <Header />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link to={createPageUrl('AdminDashboard')}>
            <Button variant="outline" className="gap-2 rounded-full">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#3448C5]">{classData.name} - Unlock Lessons</h1>
            <p className="text-gray-600">{yearGroup}</p>
          </div>
        </div>

        {!selectedTopicIndex && selectedTopicIndex !== 0 ? (
          // Topic Selection View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, idx) => (
              <Card 
                key={idx}
                className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedTopicIndex(idx)}
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithLoader
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                    <h3 className="text-xl font-bold text-white text-center shadow-black drop-shadow-md">{topic.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4 text-center bg-white">
                  <p className="font-bold text-[#3448C5]">Term 1.{idx + 1}</p>
                  <p className="text-sm text-gray-500 mt-1">Click to manage lessons</p>
                </CardContent>
              </Card>
            ))}
            {topics.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">No topics available for {yearGroup}</p>
            )}
          </div>
        ) : (
          // Lesson Selection View
          <div>
            <div className="mb-6 flex justify-between items-center">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTopicIndex(null)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Topics
              </Button>
              <div className="flex gap-2">
                 <Button size="sm" variant="outline" onClick={() => handleLockAllInTerm(`1.${selectedTopicIndex + 1}`)}>Lock All</Button>
                 <Button size="sm" onClick={() => handleUnlockAllInTerm(`1.${selectedTopicIndex + 1}`)} className="bg-[#35D0BA] hover:bg-[#2bb8a4] text-white">Unlock All</Button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#3448C5] mb-6 text-center">
                {topics[selectedTopicIndex].title} (Term 1.{selectedTopicIndex + 1})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((lessonNum) => {
                const termId = `1.${selectedTopicIndex + 1}`;
                const lessonKey = `${termId}-${lessonNum}`;
                const isUnlocked = (classData.unlocked_lessons || []).includes(lessonKey);

                return (
                  <Card 
                    key={lessonNum}
                    className={`rounded-3xl shadow-md border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                      isUnlocked ? 'border-[#35D0BA] ring-2 ring-[#35D0BA]/20' : 'border-gray-200 opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleToggleLesson(termId, lessonNum)}
                  >
                    <div className={`h-32 flex items-center justify-center transition-colors ${isUnlocked ? 'bg-[#35D0BA]/10' : 'bg-gray-100'}`}>
                      {isUnlocked ? (
                        <Unlock className="w-12 h-12 text-[#35D0BA]" />
                      ) : (
                        <Lock className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <CardContent className="p-6 text-center bg-white relative">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {lessonNum}</h3>
                      <p className={`text-sm font-bold ${isUnlocked ? 'text-[#35D0BA]' : 'text-gray-500'}`}>
                        {isUnlocked ? 'Unlocked' : 'Locked'}
                      </p>
                      {isUnlocked && (
                          <div className="absolute top-4 right-4">
                              <CheckCircle className="w-5 h-5 text-[#35D0BA]" />
                          </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}