import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import TermProgress from '../components/student/TermProgress';
import Achievements from '../components/student/Achievements';
import LearningJourney from '../components/student/LearningJourney';
import CorkBoard from '../components/student/CorkBoard';
import PizzaProgress from '../components/student/PizzaProgress';
import AvatarSelector from '../components/student/AvatarSelector';
import { yearTopics, learningObjectives } from '../components/games/gameData';
import { Loader2 } from 'lucide-react';

export default function StudentProgressDashboard() {
  const [selectedTerm, setSelectedTerm] = useState("1.1");
  const [currentAvatar, setCurrentAvatar] = useState('https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2f5mt22f5mt22f5m-Photoroom.png?raw=true'); // Default
  
  // Get ID from local storage for initial fetch
  const [studentId, setStudentId] = useState(() => {
    const stored = localStorage.getItem('finnquest_student');
    return stored ? JSON.parse(stored).id : null;
  });

  useEffect(() => {
    if (!studentId) {
      window.location.href = createPageUrl('StudentLogin');
    }
  }, [studentId]);

  // Fetch fresh student data
  const { data: student, isLoading: isStudentLoading } = useQuery({
    queryKey: ['student-data', studentId],
    queryFn: async () => {
      if (!studentId) return null;
      // Fetch latest student data to get updated points
      const latest = await base44.entities.Student.get(studentId);
      // Update localStorage to keep it fresh
      if (latest) {
         localStorage.setItem('finnquest_student', JSON.stringify(latest));
         // Load avatar if exists
         if (latest.avatar?.value) {
           setCurrentAvatar(latest.avatar.value);
         }
      }
      return latest;
    },
    enabled: !!studentId,
    refetchInterval: 5000, // Optional: Poll every 5s to ensure points update if user switches tabs
  });

  const handleStudentUpdate = (updatedFields) => {
    // We can just rely on the next fetch, or optimistically update
    // For now, let's just invalidate or let the refetch handle it
    // But to be responsive, we can update the cache if we had the queryClient
  };

  // Fetch assessments
  const { data: assessments = [], isLoading: isAssessmentsLoading } = useQuery({
    queryKey: ['student-assessments', studentId],
    queryFn: () => base44.entities.Assessment.filter({ student_id: studentId }),
    enabled: !!studentId,
  });

  // Fetch class for year group confirmation
  const { data: studentClass } = useQuery({
    queryKey: ['student-class', student?.class_id],
    queryFn: async () => {
       const classes = await base44.entities.Class.filter({ id: student?.class_id });
       return classes[0];
    },
    enabled: !!student?.class_id,
  });

  if (!student || isStudentLoading || isAssessmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <Loader2 className="w-8 h-8 text-[#3448C5] animate-spin" />
      </div>
    );
  }

  const yearGroup = student.year_group || studentClass?.year_group;
  const currentTopics = yearTopics[yearGroup] || [];
  
  // Determine Key Stage Style
  const isKS1 = ['Year 1', 'Year 2'].includes(yearGroup);
  const isKS2 = ['Year 3', 'Year 4', 'Year 5', 'Year 6'].includes(yearGroup);
  // Default to KS3 (modern/professional) if not KS1/KS2
  
  // Theme Configuration
  const theme = {
    bg: isKS1 ? 'bg-yellow-50' : isKS2 ? 'bg-green-50' : 'bg-[#FAF7F0]',
    primary: isKS1 ? '#FF4136' : isKS2 ? '#2ECC40' : '#3448C5',
    secondary: isKS1 ? '#FFDC00' : isKS2 ? '#FFDC00' : '#35D0BA',
    font: isKS1 ? 'font-comic rounded-3xl' : isKS2 ? 'font-sans rounded-2xl' : 'font-sans',
    cardBg: isKS1 ? 'bg-white border-4 border-blue-400' : isKS2 ? 'bg-white/90 border-2 border-green-200' : 'bg-white/80 backdrop-blur-sm',
    headerGradient: isKS1 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : isKS2 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-[#3448C5] to-[#4e60d6]',
    welcomeSize: isKS1 ? 'text-5xl' : 'text-4xl',
  };
  
  // Create list of all terms
  const allTerms = currentTopics.map((topic, index) => {
    const termId = `1.${index + 1}`;
    const termAssessments = assessments.filter(a => a.term === termId);
    const completed = termAssessments.length >= 6; 
    
    return {
      term: termId,
      title: topic.title,
      completed,
      data: termAssessments
    };
  });

  if (allTerms.length > 0 && !allTerms.find(t => t.term === selectedTerm)) {
     if (selectedTerm === "1.1") {} else {
        setSelectedTerm(allTerms[0].term);
     }
  }

  const currentTermData = allTerms.find(t => t.term === selectedTerm) || allTerms[0];
  const objectives = learningObjectives[yearGroup]?.[currentTermData?.title] || {};

  // Mock achievements based on logic
  const totalScore = assessments.reduce((sum, a) => sum + a.score, 0);
  const lessonsCompleted = assessments.length;
  
  const corkBadges = [
    { icon: '⭐', title: 'First Steps', description: 'Complete your first lesson', unlocked: lessonsCompleted >= 1 },
    { icon: '🌟', title: 'Rising Star', description: 'Complete 5 lessons', unlocked: lessonsCompleted >= 5 },
    { icon: '🚀', title: 'High Flyer', description: 'Score over 80% on a lesson', unlocked: assessments.some(a => a.score >= 80) },
    { icon: '🏆', title: 'Term Champ', description: 'Finish a whole term', unlocked: lessonsCompleted >= 6 },
    { icon: '💯', title: 'Perfectionist', description: 'Get 100% on a lesson', unlocked: assessments.some(a => a.score === 100) },
    { icon: '🔥', title: 'On Fire', description: 'Get 3 perfect scores', unlocked: assessments.filter(a => a.score === 100).length >= 3 },
    { icon: '📚', title: 'Bookworm', description: 'Complete 10 lessons', unlocked: lessonsCompleted >= 10 },
    { icon: '🎓', title: 'Graduate', description: 'Finish 2 full terms', unlocked: lessonsCompleted >= 12 },
    { icon: '💎', title: 'Collector', description: 'Earn 500 total points', unlocked: totalScore >= 500 },
    { icon: '👑', title: 'Finance King', description: 'Earn 1000 total points', unlocked: totalScore >= 1000 },
  ];

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      <Header />
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section with Welcome and Avatar */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <h1 className={`${theme.welcomeSize} font-bold`} style={{ color: theme.primary }}>
              Welcome back, {student.name}!
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              {isKS1 ? "Let's learn about money!" : "Here's your financial literacy progress so far."}
            </p>
          </div>
          
          {/* Avatar Section (Top Right) */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <AvatarSelector 
              currentAvatar={currentAvatar} 
              onSelectAvatar={(emoji) => setCurrentAvatar(emoji)} 
              studentId={student.id}
              yearGroup={yearGroup}
              totalPoints={student.total_points || 0}
              unlockedAvatars={student.unlocked_avatars || []}
              onStudentUpdate={handleStudentUpdate}
            />

            {/* Total Points Box */}
            <div className="bg-white/90 backdrop-blur-sm border-2 border-[#35D0BA] rounded-xl px-6 py-2 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Points</span>
                <span className="text-2xl font-black text-[#3448C5]">{student.total_points || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KS1 Special Layout: Corkboard FIRST */}
        {isKS1 && (
          <div className="mb-12">
            <CorkBoard badges={corkBadges} />
          </div>
        )}

        {/* 1. Learning Journey (KS2/KS3 only) */}
        {!isKS1 && (
          <div className="mb-10">
            <LearningJourney allTerms={allTerms} currentTerm={selectedTerm} theme={theme} />
          </div>
        )}

        {/* 2. Term Selection & Progress */}
        <div className="mb-10">
          <div className="flex justify-center md:justify-start mb-6">
            <Tabs value={selectedTerm} onValueChange={setSelectedTerm} className="w-full">
              <TabsList className={`${isKS1 ? 'bg-blue-100 p-2 gap-2' : 'bg-white/50 p-1'} backdrop-blur-sm rounded-full border border-gray-200 h-auto flex-wrap justify-center`}>
                {allTerms.map((t) => (
                  <TabsTrigger 
                    key={t.term} 
                    value={t.term}
                    className={`rounded-full px-6 py-2 transition-all ${
                      isKS1 ? 'text-lg font-bold data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:scale-110' : 
                      isKS2 ? 'data-[state=active]:bg-green-500 data-[state=active]:text-white' :
                      'data-[state=active]:bg-[#3448C5] data-[state=active]:text-white'
                    }`}
                  >
                    Term {t.term}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {isKS1 ? (
             <div className="bg-white rounded-3xl p-8 border-4 border-blue-200 shadow-xl">
               <PizzaProgress 
                 term={selectedTerm}
                 lessonsCompleted={currentTermData?.data?.length || 0}
                 totalLessons={6}
               />
               <div className="mt-8 text-center bg-blue-50 p-4 rounded-xl">
                 <p className="text-xl font-comic text-blue-600">
                    Keep eating pizza to become a Money Master!
                 </p>
               </div>
             </div>
          ) : (
             <TermProgress 
                term={selectedTerm} 
                data={currentTermData?.data || []}
                topicTitle={currentTermData?.title || "Unknown Topic"}
                learningObjectives={objectives}
                theme={theme}
                isKS1={isKS1}
                isKS2={isKS2}
              />
          )}
        </div>

        {/* 3. Achievements (Bottom for KS2/KS3) */}
        {!isKS1 && (
          <div className="mb-10">
            {isKS2 ? (
              <CorkBoard badges={corkBadges} />
            ) : (
              <Achievements 
                totalScore={totalScore} 
                lessonsCompleted={lessonsCompleted} 
                theme={theme}
                assessments={assessments}
              />
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}