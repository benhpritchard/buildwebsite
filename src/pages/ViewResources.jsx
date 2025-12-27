import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, FileText, Presentation, ClipboardList, BookOpen, Target } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import GameThumbnail from '../components/games/GameThumbnail';
import CurriculumDisplay from '../components/resources/CurriculumDisplay';
import ProgressMapDisplay from '../components/resources/ProgressMapDisplay';
import { curriculumData } from '../components/resources/curriculumData';

export default function ViewResources() {
  const [selectedSection, setSelectedSection] = useState(null); // 'lesson-packs', 'unplugged', 'curriculum'
  const [selectedSubOption, setSelectedSubOption] = useState(null); // 'details' or 'progress-map'
  const [selectedKeyStage, setSelectedKeyStage] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [unlockedYears, setUnlockedYears] = useState([]);

  // Check if student or teacher is logged in
  useEffect(() => {
    const storedStudent = localStorage.getItem('finnquest_student') || localStorage.getItem('finquest_student');
    const storedTeacher = localStorage.getItem('finnquest_teacher') || localStorage.getItem('finquest_teacher');
    
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    } else if (storedTeacher) {
      setTeacher(JSON.parse(storedTeacher));
    }
  }, []);

  // Fetch teacher data to check unlocked years
  const { data: teacherData } = useQuery({
    queryKey: ['teacher-resources', student?.teacher_id || teacher?.id],
    queryFn: async () => {
      const idToCheck = student?.teacher_id || teacher?.id;
      if (!idToCheck) return null;
      const teachers = await base44.entities.Teacher.filter({ id: idToCheck });
      return teachers[0];
    },
    enabled: !!(student?.teacher_id || teacher?.id),
  });

  // Update unlocked years when teacher data loads
  useEffect(() => {
    if (teacherData?.unlocked_years) {
      setUnlockedYears(teacherData.unlocked_years);
    }
  }, [teacherData]);

  // Helper function to check if a year is unlocked for the logged-in student
  const isYearUnlocked = (year) => {
    return unlockedYears.includes(year);
  };

  const mainOptions = [
    {
      id: 'lesson-packs',
      title: 'Lesson Packs',
      description: 'Complete digital lesson plans',
      icon: '📚',
      color: '#3448C5'
    },
    {
      id: 'unplugged',
      title: 'Unplugged Lessons',
      description: 'Screen-free activities',
      icon: '🔌',
      color: '#35D0BA'
    },
    {
      id: 'curriculum',
      title: 'Curriculum',
      description: 'Curriculum maps & progression',
      icon: '🗺️',
      color: '#8B5CF6'
    }
  ];

  const classroomResources = [
    {
      id: 'displays',
      title: 'Displays',
      description: 'Colorful classroom wall displays',
      emoji: '🖼️',
      color: '#FFB68B'
    },
    {
      id: 'vocabulary',
      title: 'Key Vocabulary',
      description: 'Financial literacy word banks',
      emoji: '📖',
      color: '#3448C5'
    },
    {
      id: 'leaderboards',
      title: 'Leaderboards',
      description: 'Track student progress and achievements',
      emoji: '🏆',
      color: '#35D0BA'
    },
    {
      id: 'teaching-aids',
      title: 'Teaching Aids',
      description: 'Additional support materials',
      emoji: '🎯',
      color: '#FFB68B'
    }
  ];

  const keyStages = [
    {
      id: 'ks1',
      title: 'KS1',
      subtitle: 'Key Stage 1',
      description: 'Ages 5-7',
      gradient: 'from-blue-400 to-cyan-400',
      years: ['Year 1', 'Year 2']
    },
    {
      id: 'ks2',
      title: 'KS2',
      subtitle: 'Key Stage 2',
      description: 'Ages 7-11',
      gradient: 'from-indigo-400 to-blue-400',
      years: ['Year 3', 'Year 4', 'Year 5', 'Year 6']
    },
    {
      id: 'ks3',
      title: 'KS3',
      subtitle: 'Key Stage 3',
      description: 'Ages 11-14',
      gradient: 'from-purple-400 to-indigo-400',
      years: ['Year 7', 'Year 8', 'Year 9']
    }
  ];

  const getGamesByYear = () => ({
    'Year 1': [],
    'Year 2': [
      {
        id: 'ice-cream-adventure',
        title: 'Ice Cream Adventure',
        description: 'Learn all about finances and running your own company whilst developing tasty ice cream delights!',
        emoji: '🍦',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
        locked: !isYearUnlocked('Year 2'),
        subGames: [
          {
            id: 'ice-cream-truck',
            title: 'Ice Cream Truck',
            emoji: '🚚',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            locked: !isYearUnlocked('Year 2')
          },
          {
            id: 'perfect-profits',
            title: 'Perfect Profits',
            emoji: '💰',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            locked: !isYearUnlocked('Year 2')
          },
          {
            id: 'read-the-market',
            title: 'Read the Market',
            emoji: '📊',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            locked: !isYearUnlocked('Year 2')
          },
          {
            id: 'ice-cream-master',
            title: 'Ice Cream Master',
            emoji: '👑',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            locked: !isYearUnlocked('Year 2')
          }
        ]
      }
    ],
    'Year 3': [],
    'Year 4': [],
    'Year 5': [
      {
        id: 'pizza-tycoon',
        title: 'Pizza Tycoon',
        description: 'Build your pizza empire from the ground up! Learn business skills while creating delicious pizzas.',
        emoji: '🍕',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%)',
        locked: !isYearUnlocked('Year 5'),
        subGames: [
          {
            id: 'dough-dash',
            title: 'Pizza Tycoon: Dough Dash',
            emoji: '🏪',
            gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            locked: !isYearUnlocked('Year 5')
          },
          {
            id: 'pizza-profits-pro',
            title: 'Pizza Profits Pro',
            emoji: '💰',
            gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)',
            locked: !isYearUnlocked('Year 5')
          },
          {
            id: 'topping-trends',
            title: 'Topping Trends',
            emoji: '📈',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            locked: !isYearUnlocked('Year 5')
          },
          {
            id: 'michelin-manager',
            title: 'Michelin Manager',
            emoji: '⭐',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            locked: !isYearUnlocked('Year 5')
          },
          {
            id: 'pizza-pitch-perfect',
            title: 'Pizza Pitch Perfect',
            emoji: '🎯',
            gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            locked: !isYearUnlocked('Year 5')
          },
          {
            id: 'delivery-dash',
            title: 'Delivery Dash',
            emoji: '🚗',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            locked: !isYearUnlocked('Year 5')
          }
        ]
      }
    ],
    'Year 6': [
      {
        id: 'moneyball-fc',
        title: 'Moneyball FC',
        description: 'You are in charge of all the decisions for a football club. All 6 lessons run under one platform.',
        emoji: '⚽',
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3448C5 100%)',
        locked: !isYearUnlocked('Year 6')
      }
    ],
    'Year 7': [],
    'Year 8': [],
    'Year 9': []
  });

  // Make sure keyStages include 7,8,9 if not already
  const ks3 = keyStages.find(ks => ks.id === 'ks3');
  if (ks3 && !ks3.years.includes('Year 7')) {
     // It seems keyStages was defined in the component, let's check if I need to update it there too.
     // Actually I see it in the read file content: years: ['Year 7', 'Year 8', 'Year 9']
     // So no change needed for keyStages definition.
  }

  const gamesByYear = getGamesByYear();

  const currentKeyStage = keyStages.find(ks => ks.id === selectedKeyStage);

  const handleGameClick = (game) => {
    if (game.subGames) {
      // It's a game pack - show sub-games
      setSelectedGame(game);
    } else {
      // Single game - show resource options
      setSelectedGame(game);
    }
  };

  const resetNavigation = () => {
    setSelectedSection(null);
    setSelectedSubOption(null);
    setSelectedKeyStage(null);
    setSelectedYear(null);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!selectedSection ? (
            <>
              {/* Main Options */}
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Resources
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Choose a resource type
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {mainOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedSection(option.id)}
                  >
                    <div 
                      className="h-48 flex items-center justify-center"
                      style={{ backgroundColor: option.color }}
                    >
                      <span className="text-8xl">{option.emoji || option.icon}</span>
                    </div>
                    <CardContent className="p-8 text-center bg-white">
                      <h3 
                        className="text-2xl font-bold mb-3"
                        style={{ color: '#3448C5' }}
                      >
                        {option.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {option.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Classroom Resources Section */}
              <div className="mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#3448C5' }}>
                    Classroom Resources
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700">
                    Displays, Vocabulary, Leaderboards, and Teaching Aids
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {classroomResources.map((resource) => (
                    <Card 
                      key={resource.id}
                      className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                    >
                      <div 
                        className="h-40 flex items-center justify-center"
                        style={{ backgroundColor: resource.color }}
                      >
                        <span className="text-7xl">{resource.emoji}</span>
                      </div>
                      <CardContent className="p-6 text-center bg-white">
                        <h3 
                          className="text-xl font-bold mb-2"
                          style={{ color: '#3448C5' }}
                        >
                          {resource.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {resource.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : selectedSection === 'curriculum' && !selectedSubOption ? (
            <>
              {/* Curriculum Sub-options */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSection(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Curriculum
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Choose a view
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSubOption('details')}
                >
                  <div className="h-40 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <div className="text-center text-white">
                      <BookOpen className="w-16 h-16 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold">Curriculum Details</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">View detailed curriculum by year group</p>
                  </CardContent>
                </Card>

                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSubOption('progress-map')}
                >
                  <div className="h-40 flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600">
                    <div className="text-center text-white">
                      <Target className="w-16 h-16 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold">Progress Map</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">View progression across all years</p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : selectedSection === 'curriculum' && selectedSubOption === 'progress-map' ? (
            <>
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSubOption(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Options
                </Button>
              </div>
              <ProgressMapDisplay />
            </>
          ) : !selectedKeyStage ? (
            <>
              {/* Key Stage Selection */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => selectedSection === 'curriculum' ? setSelectedSubOption(null) : setSelectedSection(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedSection === 'lesson-packs' ? 'Lesson Packs' : selectedSection === 'unplugged' ? 'Unplugged Lessons' : 'Curriculum Details'}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Select a Key Stage
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {keyStages.map((ks) => (
                  <Card 
                    key={ks.id}
                    className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedKeyStage(ks.id)}
                  >
                    <div className={`h-48 flex items-center justify-center bg-gradient-to-br ${ks.gradient}`}>
                      <div className="text-center">
                        <h3 className="text-6xl font-bold text-white mb-2">{ks.title}</h3>
                        <p className="text-xl text-white/90">{ks.subtitle}</p>
                      </div>
                    </div>
                    <CardContent className="p-8 text-center bg-white">
                      <p className="text-2xl font-semibold" style={{ color: '#3448C5' }}>
                        {ks.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : !selectedYear ? (
            <>
              {/* Year Selection */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedKeyStage(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Key Stages
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {currentKeyStage?.title} - Choose Year Group
                </h1>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentKeyStage?.years.map((year) => (
                  <Card 
                    key={year}
                    className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedYear(year)}
                  >
                    <div className={`h-32 flex items-center justify-center bg-gradient-to-br ${currentKeyStage.gradient}`}>
                      <h3 className="text-3xl font-bold text-white">{year}</h3>
                    </div>
                    <CardContent className="p-4 text-center bg-white">
                      <p className="text-gray-600">
                        {selectedSection === 'lesson-packs' 
                          ? `${gamesByYear[year]?.length || 0} games available`
                          : selectedSection === 'unplugged'
                            ? 'View Activities'
                            : 'View Curriculum'
                        }
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : selectedSection === 'curriculum' ? (
            <>
              {/* Curriculum Display */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedYear(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Year Groups
                </Button>
              </div>
              <CurriculumDisplay 
                data={curriculumData[selectedYear]} 
                year={selectedYear} 
                locked={selectedYear !== 'Year 2' && !isYearUnlocked(selectedYear)}
              />
            </>
          ) : (
            <>
              {/* Games/Resources for Selected Year */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedYear(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Year Groups
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedYear} {selectedSection === 'lesson-packs' ? 'Lesson Packs' : 'Unplugged Lessons'}
                </h1>
              </div>

              {gamesByYear[selectedYear]?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gamesByYear[selectedYear].map((game) => (
                    <Card 
                      key={game.id}
                      className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
                    >
                      <GameThumbnail game={game} onClick={() => handleGameClick(game)} />
                      <CardContent className="p-6 bg-white">
                        <h3 
                          className="text-2xl font-bold mb-3"
                          style={{ color: '#3448C5' }}
                        >
                          {game.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {game.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-500">No resources available for {selectedYear} yet. Check back soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Game Resources Dialog */}
      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center" style={{ color: '#3448C5' }}>
              {selectedGame?.title} - Resources
            </DialogTitle>
          </DialogHeader>
          
          {selectedGame?.subGames ? (
            <div className="py-4">
              <p className="text-center text-gray-600 mb-6">Select a lesson:</p>
              <div className="grid grid-cols-2 gap-4">
                {selectedGame.subGames.map((subGame) => (
                  <Card 
                    key={subGame.id}
                    className={`rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all ${subGame.locked ? 'opacity-60' : ''}`}
                    onClick={() => {
                      if (!subGame.locked) {
                        setSelectedGame(subGame);
                      }
                    }}
                  >
                    <div 
                      className={`h-24 flex items-center justify-center ${subGame.locked ? 'grayscale' : ''}`}
                      style={{ background: subGame.gradient }}
                    >
                      <span className="text-4xl">{subGame.emoji}</span>
                    </div>
                    <CardContent className="p-3 text-center">
                      <p className="font-semibold text-sm">{subGame.title}</p>
                      {subGame.locked && <p className="text-xs text-gray-500">Contact FinnQuest</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#3448C5]">
                  <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: '#3448C5' }} />
                  <p className="font-semibold">Lesson Plans</p>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </Card>
                <Card className="rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#35D0BA]">
                  <Presentation className="w-12 h-12 mx-auto mb-3" style={{ color: '#35D0BA' }} />
                  <p className="font-semibold">PowerPoints</p>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </Card>
                <Card className="rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#FFB68B]">
                  <ClipboardList className="w-12 h-12 mx-auto mb-3" style={{ color: '#FFB68B' }} />
                  <p className="font-semibold">Worksheets</p>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}