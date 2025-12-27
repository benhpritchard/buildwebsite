import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import GameThumbnail from '../components/games/GameThumbnail';

export default function ExploreGames() {
  const [selectedContext, setSelectedContext] = useState(null); // 'school' or 'home'
  const [selectedKeyStage, setSelectedKeyStage] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedGamePack, setSelectedGamePack] = useState(null);
  const [lockedDialogOpen, setLockedDialogOpen] = useState(false);
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
    queryKey: ['teacher-unlocked', student?.teacher_id || teacher?.id],
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

  // Screenshot thumbnails from the actual games
  const iceCreamThumbnail = 'https://pizza-tycoon-dough-dash-copy-45729f8e.base44.app/';
  const footballThumbnail = 'https://football-dynasty-manager-3e6847cf.base44.app/';

  // Helper function to check if a year is unlocked for the logged-in student
  const isYearUnlocked = (year) => {
    return unlockedYears.includes(year);
  };

  // Game data - filtered by context and locked status
  const getGamesByYear = () => {
    // Moneyball FC: At Home only
    const moneyball = {
      id: 'moneyball-fc',
      title: 'Moneyball FC',
      description: 'You are in charge of all the decisions for a football club, from building a team to setting the financial information. Can you earn the most money at the end of a season? All 6 lessons run under one platform.',
      locked: !isYearUnlocked('Year 6'), // Always locked based on year unlock status
      link: 'https://moneyballfc.base44.app/home',
      emoji: '⚽',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #3448C5 100%)'
    };

    // Ice Cream (Year 2) and Pizza (Year 5) are available in both contexts
    const iceCreamAdventure = {
      id: 'ice-cream-adventure',
      title: 'Ice Cream Adventure',
      description: 'Learn all about finances and running your own company whilst developing tasty ice cream delights!',
      locked: false,
      emoji: '🍦',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
      isGamePack: true,
      subGames: [
        {
          id: 'ice-cream-truck',
          title: 'Ice Cream Truck',
          description: 'Today you begin your ice cream truck adventure. Stick to your budget when setting up your business and earn as much money as possible to dominate the ice cream industry.',
          locked: false,
          link: 'https://icecreamtruck.base44.app/',
          emoji: '🚚',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          freeDemo: true
        },
        {
          id: 'perfect-profits',
          title: 'Perfect Profits',
          description: 'Create 3 ice cream flavours, discover the most popular and set prices to maximise profit throughout this lesson.',
          locked: !isYearUnlocked('Year 2'),
          link: 'https://icecreamprofits.base44.app/',
          emoji: '💰',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          id: 'read-the-market',
          title: 'Read the Market',
          description: 'Read what is selling and what is not. Use this to help a new ice cream truck maximise sales.',
          locked: !isYearUnlocked('Year 2'),
          emoji: '📊',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          id: 'ice-cream-master',
          title: 'Ice Cream Master',
          description: 'Can you decide how to look after staff and make morally correct decisions to dominate the ice cream world?',
          locked: !isYearUnlocked('Year 2'),
          emoji: '👑',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
      ]
    };

    const pizzaTycoon = {
      id: 'pizza-tycoon',
      title: 'Pizza Tycoon',
      description: 'Build your pizza empire from the ground up! Learn business skills while creating delicious pizzas.',
      locked: false,
      emoji: '🍕',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%)',
      isGamePack: true,
      subGames: [
        {
          id: 'dough-dash',
          title: 'Pizza Tycoon: Dough Dash',
          description: 'Can you make smart decisions whilst sticking to your budget to open your first pizzeria? Balance needs and wants for the most profitable place.',
          locked: false,
          link: 'https://doughdash.base44.app/',
          emoji: '🏪',
          gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          freeDemo: true
        },
        {
          id: 'pizza-profits-pro',
          title: 'Pizza Profits Pro',
          description: 'Design 3 unique, tasty pizzas with the aim of finding out your signature dish. Set the prices, check the profits, then maximise how much you make with different strategies.',
          locked: !isYearUnlocked('Year 5'),
          link: 'https://pizzaprofit.base44.app/',
          emoji: '💰',
          gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)'
        },
        {
          id: 'topping-trends',
          title: 'Topping Trends',
          description: 'What is hot and what is not? Read social media posts, graphs, charts and receipts to predict how much of each topping you should order.',
          locked: !isYearUnlocked('Year 5'),
          link: 'https://toppingtrends.base44.app/',
          emoji: '📈',
          gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
          id: 'michelin-manager',
          title: 'Michelin Manager',
          description: 'You have just got your first Michelin star! Does this mean you have the respect of your staff and customers though? Make tricky decisions to keep your reputation high.',
          locked: !isYearUnlocked('Year 5'),
          link: 'https://michelinmanager.base44.app/',
          emoji: '⭐',
          gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
        },
        {
          id: 'pizza-pitch-perfect',
          title: 'Pizza Pitch Perfect',
          description: 'Apply all you have learnt and design your own pizzeria away from a game. Who can get the best rating?',
          locked: !isYearUnlocked('Year 5'),
          link: 'https://pitchperfect.base44.app/home',
          emoji: '🎯',
          gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
        },
        {
          id: 'delivery-dash',
          title: 'Delivery Dash',
          description: 'A fun way to end the topic. Take on your friends in a race to deliver the most pizzas!',
          locked: !isYearUnlocked('Year 5'),
          link: 'https://deliverydash.base44.app/',
          emoji: '🚗',
          gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        }
      ]
    };

    return {
      'Year 1': [],
      'Year 2': [iceCreamAdventure],
      'Year 3': [],
      'Year 4': [],
      'Year 5': [pizzaTycoon],
      'Year 6': selectedContext === 'home' ? [moneyball] : [], // Moneyball only at home
      'Year 7': [],
      'Year 8': [],
      'Year 9': []
    };
  };

  const gamesByYear = getGamesByYear();

  const handleGameClick = (game) => {
    if (game.isGamePack) {
      setSelectedGamePack(game);
    } else if (game.locked) {
      setLockedDialogOpen(true);
    } else {
      window.open(game.link, '_blank');
    }
  };

  const currentKeyStage = keyStages.find(ks => ks.id === selectedKeyStage);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedContext ? (
            <>
              {/* Context Selection: School vs Home */}
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Where are you playing?
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Select your environment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedContext('school')}
                >
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-400">
                    <span className="text-8xl">🏫</span>
                  </div>
                  <CardContent className="p-8 text-center bg-white">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: '#3448C5' }}>In School</h3>
                    <p className="text-gray-600 mt-2">Classroom activities & lessons</p>
                  </CardContent>
                </Card>

                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedContext('home')}
                >
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
                    <span className="text-8xl">🏠</span>
                  </div>
                  <CardContent className="p-8 text-center bg-white">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: '#3448C5' }}>At Home</h3>
                    <p className="text-gray-600 mt-2">Homework & extra practice</p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : !selectedKeyStage ? (
            <>
              {/* Key Stage Selection */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedContext(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Selection
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Choose Your Key Stage
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Select the appropriate level
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                <p className="text-xl sm:text-2xl text-gray-700">
                  Select the year group
                </p>
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
                        {gamesByYear[year]?.length || 0} games available
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : selectedGamePack ? (
            <>
              {/* Sub-games for Selected Game Pack */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedGamePack(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to {selectedYear} Games
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedGamePack.title}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  {selectedGamePack.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {selectedGamePack.subGames.map((game) => (
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
            </>
          ) : (
            <>
              {/* Games for Selected Year */}
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
                  {selectedYear} Games
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Choose a game to play
                </p>
              </div>

              {gamesByYear[selectedYear]?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
                  <p className="text-xl text-gray-500">No games available for {selectedYear} yet. Check back soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Locked Game Dialog */}
      <Dialog open={lockedDialogOpen} onOpenChange={setLockedDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl" style={{ color: '#3448C5' }}>
              Game Locked
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-lg text-gray-700">
              Contact FinnQuest to learn how to unlock this game.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}