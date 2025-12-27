import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ImageWithLoader from '@/components/ui/ImageWithLoader';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import GameThumbnail from '../components/games/GameThumbnail';
import PizzaTycoonFreePlay from '../components/games/PizzaTycoonFreePlay';
import IceCreamFreePlay from '../components/games/IceCreamFreePlay';
import LemonadeStandFreePlay from '../components/games/LemonadeStandFreePlay';
import MoneyballFreePlay from '../components/games/MoneyballFreePlay';
import { yearTopics, learningObjectives } from '../components/games/gameData';
import { lessonPlans } from '../components/resources/lessonPlans';
import { FileText, Download, Printer, StickyNote } from 'lucide-react';
import NeedsWantsWorksheet from '../components/resources/worksheets/NeedsWantsWorksheet';
import ValuePriceWorksheet from '../components/resources/worksheets/ValuePriceWorksheet';
import RevenueCostWorksheet from '../components/resources/worksheets/RevenueCostWorksheet';
import PercentageDiscountsWorksheet from '../components/resources/worksheets/PercentageDiscountsWorksheet';
import SweetDecisionsWorksheet from '../components/resources/worksheets/SweetDecisionsWorksheet';
import TownDashWorksheet from '../components/resources/worksheets/TownDashWorksheet';
import JuniorEnterpriseWorksheet from '../components/resources/worksheets/JuniorEnterpriseWorksheet';
import InvestingWorksheet from '../components/resources/worksheets/InvestingWorksheet';
import PdfLessonViewer from '../components/resources/PdfLessonViewer';
import { MonitorPlay } from 'lucide-react';

export default function ExploreGames() {
  const [selectedContext, setSelectedContext] = useState(null); // 'school' or 'home'
  const [selectedKeyStage, setSelectedKeyStage] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGamePack, setSelectedGamePack] = useState(null);
  const [lockedDialogOpen, setLockedDialogOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [selectedTopicTerm, setSelectedTopicTerm] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [unlockedYears, setUnlockedYears] = useState([]);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
  const [showPizzaTycoonFreePlay, setShowPizzaTycoonFreePlay] = useState(false);
  const [showIceCreamFreePlay, setShowIceCreamFreePlay] = useState(false);
  const [showLemonadeStandFreePlay, setShowLemonadeStandFreePlay] = useState(false);
  const [showMoneyballFreePlay, setShowMoneyballFreePlay] = useState(false);
  const [selectedPdfLesson, setSelectedPdfLesson] = useState(null);

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

  // Fetch class data for student to check unlocked lessons
  const { data: classData } = useQuery({
    queryKey: ['student-class', student?.class_id],
    queryFn: async () => {
      if (!student?.class_id) return null;
      const classes = await base44.entities.Class.filter({ id: student.class_id });
      return classes[0];
    },
    enabled: !!student?.class_id,
  });

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

  // Helper function to check if a game is locked
  const isGameLocked = (gameYear, term, lessonNum) => {
    // SPECIAL: Always unlock Term 1.1, Lesson 1 for all year groups (even for non-logged-in users)
    if (term === '1.1' && lessonNum === 1) return false;

    if (teacher) return false; // Teachers see everything unlocked
    if (!student || !classData) return true; // Default lock if no data

    // Parse years to numbers for comparison
    const yearGroupStr = student.year_group || classData.year_group;
    const studentYearNum = parseInt(yearGroupStr.replace('Year ', ''));
    const gameYearNum = parseInt(gameYear.replace('Year ', ''));

    if (gameYearNum < studentYearNum) return false; // Always unlock previous years
    if (gameYearNum > studentYearNum) return true; // Always lock future years
    
    // For current year, check specific unlocked lessons
    
    if (term && lessonNum) {
        const lessonKey = `${term}-${lessonNum}`;
        return !(classData.unlocked_lessons || []).includes(lessonKey);
    }
    
    // Fallback for games that don't map cleanly to a single lesson (e.g. Game Packs)
    return false; 
  };

  // Game data - filtered by context and locked status
  const getGamesByYear = () => {
    // Moneyball FC: At Home only
    const moneyball = {
      id: 'moneyball-fc',
      title: 'Moneyball FC',
      description: 'You are in charge of all the decisions for a football club, from building a team to setting the financial information. Can you earn the most money at the end of a season? All 6 lessons run under one platform.',
      locked: isGameLocked('Year 6', null, null),
      link: 'https://moneyball.base44.app/home',
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
          locked: isGameLocked('Year 2', null, null),
          link: 'https://icecreamprofits.base44.app/',
          emoji: '💰',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          id: 'read-the-market',
          title: 'Read the Market',
          description: 'Read what is selling and what is not. Use this to help a new ice cream truck maximise sales.',
          locked: isGameLocked('Year 2', null, null),
          emoji: '📊',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
          id: 'ice-cream-master',
          title: 'Ice Cream Master',
          description: 'Can you decide how to look after staff and make morally correct decisions to dominate the ice cream world?',
          locked: isGameLocked('Year 2', null, null),
          emoji: '👑',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
      ]
    };

    const pizzaTycoon = {
      id: 'pizza-tycoon',
      title: 'Pizza Tycoon',
      description: 'Embrace tasty challenges as you run multiple pizzerias throughout your journey. Every lesson is about making wise decisions to make the most dough (I know) as possible. Can you create a new trending pizza flavour that customers keep coming back for?',
      locked: false,
      emoji: '🍕',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%)',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/pizzeria.png?raw=true',
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
          locked: isGameLocked('Year 5', null, null),
          link: 'https://pizzaprofit.base44.app/',
          emoji: '💰',
          gradient: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)'
        },
        {
          id: 'topping-trends',
          title: 'Topping Trends',
          description: 'What is hot and what is not? Read social media posts, graphs, charts and receipts to predict how much of each topping you should order.',
          locked: isGameLocked('Year 5', null, null),
          link: 'https://toppingtrends.base44.app/',
          emoji: '📈',
          gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
          id: 'michelin-manager',
          title: 'Michelin Manager',
          description: 'You have just got your first Michelin star! Does this mean you have the respect of your staff and customers though? Make tricky decisions to keep your reputation high.',
          locked: isGameLocked('Year 5', null, null),
          link: 'https://michelinmanager.base44.app/',
          emoji: '⭐',
          gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
        },
        {
          id: 'pizza-pitch-perfect',
          title: 'Pizza Pitch Perfect',
          description: 'Apply all you have learnt and design your own pizzeria away from a game. Who can get the best rating?',
          locked: isGameLocked('Year 5', null, null),
          link: 'https://pitchperfect.base44.app/home',
          emoji: '🎯',
          gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
        },
        {
          id: 'delivery-dash',
          title: 'Delivery Dash',
          description: 'A fun way to end the topic. Take on your friends in a race to deliver the most pizzas!',
          locked: isGameLocked('Year 5', null, null),
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

  const buildTrackingGameUrl = (baseLink, yearGroup, term, lessonNumber) => {
    if (!student || !student.id || !student.class_id) return baseLink;
    
    try {
      const url = new URL(baseLink);
      url.searchParams.append('student_id', student.id);
      url.searchParams.append('class_id', student.class_id);
      url.searchParams.append('year_group', yearGroup);
      if (term) url.searchParams.append('term', term);
      if (lessonNumber) url.searchParams.append('lesson_number', lessonNumber);
      return url.toString();
    } catch (e) {
      console.error('Invalid URL:', baseLink);
      return baseLink;
    }
  };

  const handleGameClick = (game) => {
    if (game.isGamePack) {
      setSelectedGamePack(game);
    } else if (game.locked) {
      setLockedDialogOpen(true);
    } else {
      window.open(buildTrackingGameUrl(game.link, selectedYear, null, null), '_blank');
    }
  };

  const handleFreePlayGameClick = (game) => {
    // Special handling for Free Play games
    if (game.id === 'pizza-tycoon' && selectedContext === 'home') {
      setShowPizzaTycoonFreePlay(true);
    } else if (game.id === 'ice-cream-truck' && selectedContext === 'home') {
      setShowIceCreamFreePlay(true);
    } else if (game.id === 'lemonade-stand' && selectedContext === 'home') {
      setShowLemonadeStandFreePlay(true);
    } else if (game.id === 'moneyball-fc' && selectedContext === 'home') {
      setShowMoneyballFreePlay(true);
    } else if (game.isGamePack) {
      setSelectedGamePack(game);
    } else if (game.locked) {
      setLockedDialogOpen(true);
    } else {
      window.open(buildTrackingGameUrl(game.link, selectedYear, null, null), '_blank');
    }
  };

  const handleOpenLessonPlan = (year, topic, lessonNum) => {
    const plan = lessonPlans[year]?.[topic]?.[lessonNum];
    if (plan) {
      setSelectedLessonPlan({ ...plan, lessonNum, year, topic });
    } else {
      // Create a placeholder if detailed plan doesn't exist but requested
      setSelectedLessonPlan({
        title: `Lesson ${lessonNum} Plan`,
        subject: "Maths / PSHE / Enterprise",
        objectives: ["Learning objective coming soon..."],
        successCriteria: { must: "Coming soon", should: "Coming soon", could: "Coming soon" },
        outline: [],
        teacherNotes: ["Detailed plan coming soon."],
        differentiation: {},
        keyQuestions: [],
        lessonNum, year, topic, isPlaceholder: true
      });
    }
  };

  const handlePrintLessonPlan = () => {
    const printContent = document.getElementById('lesson-plan-content');
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Lesson Plan - ${selectedLessonPlan?.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
            h1 { color: #3448C5; font-size: 24px; border-bottom: 2px solid #3448C5; padding-bottom: 10px; margin-bottom: 20px; }
            h2 { color: #3448C5; font-size: 18px; margin-top: 20px; margin-bottom: 10px; background-color: #f0f4ff; padding: 5px 10px; border-radius: 4px; }
            h3 { font-size: 16px; margin-top: 15px; margin-bottom: 5px; color: #444; }
            p, li { font-size: 14px; margin-bottom: 8px; }
            ul { padding-left: 20px; }
            .header-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #fafafa; padding: 15px; border-radius: 8px; border: 1px solid #eee; }
            .section { margin-bottom: 20px; }
            strong { color: #222; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const currentKeyStage = keyStages.find(ks => ks.id === selectedKeyStage);

  // Free Play Games Logic
  const getFreePlayGames = (ksId) => {
    const moneyball = {
      id: 'moneyball-fc',
      title: 'Moneyball FC',
      description: 'Can you take a football team to the top of the financial ladder? Run every aspect of a club before entering the first ever Moneyball FC league - where money means more than points!',
      locked: false,
      link: 'https://moneyball.base44.app/home',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/moneyballfc.png?raw=true',
      ageRange: 'Age range 8 - 14'
    };

    const iceCreamTruck = {
      id: 'ice-cream-truck',
      title: 'Ice Cream Truck',
      description: 'With the sun shining it makes sense to open your own Ice Cream Truck! Can you pick the perfect flavours to sell to make the most money possible? Look out for our fun upgrades to make as much money as possible!',
      locked: false,
      link: 'https://icecreamtruck.base44.app',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_riorusriorusrior.png?raw=true',
      ageRange: 'Age range 5 - 7'
    };

    const lemonadeStand = {
      id: 'lemonade-stand',
      title: 'Lemonade Stand',
      description: 'It\'s time for a classic - owning your own lemonade stand. You have 14 days to make as much money as possible. Buy ingredients, add your extras and advertise well to make more customers. Can you make a fortune in just 2 weeks?',
      locked: false,
      link: 'https://lemonadestand.base44.app',
      thumbnail: 'https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_puuj96puuj96puuj.png?raw=true',
      ageRange: 'Age range 5 - 7'
    };

    const pizza = getGamesByYear()['Year 5'][0]; // Pizza Tycoon

    if (ksId === 'ks1') return [iceCreamTruck, lemonadeStand];
    if (ksId === 'ks2') return [pizza, moneyball];
    if (ksId === 'ks3') return [moneyball];
    return [];
  };

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
                  How are you playing?
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Select your environment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-transparent hover:border-[#35D0BA] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedContext('school')}
                >
                  <div className="h-64 flex items-center justify-center bg-blue-50 overflow-hidden relative">
                    <ImageWithLoader
                      src="https://github.com/benhpritchard/buildwebsite/blob/main/in%20school.png?raw=true"
                      alt="In School"
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-8 text-center bg-white">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: '#3448C5' }}>In School</h3>
                    <p className="text-gray-600 mt-2">Classroom based games on your current topic - complete with PowerPoint and worksheet.</p>
                  </CardContent>
                </Card>

                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-transparent hover:border-[#35D0BA] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedContext('home')}
                >
                  <div className="h-64 flex items-center justify-center bg-purple-50 overflow-hidden relative">
                     <ImageWithLoader
                      src="https://github.com/benhpritchard/buildwebsite/blob/main/freeplay.png?raw=true"
                      alt="Free Play"
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-8 text-center bg-white">
                    <h3 className="text-3xl font-bold mb-2" style={{ color: '#3448C5' }}>Free Play</h3>
                    <p className="text-gray-600 mt-2">A wide variety of games to play at your own pace in school or at home.</p>
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
                {selectedContext === 'home' ? (
                  <div className="mt-6 bg-blue-50 p-4 rounded-xl max-w-2xl mx-auto border border-blue-100">
                    <p className="text-lg text-[#3448C5] font-medium">
                      By the start of the 2026 calendar year, we aim to have a huge variety of freeplay games added. For now, enjoy a few of our favourites! Watch this space....
                    </p>
                  </div>
                ) : (
                  <p className="text-xl sm:text-2xl text-gray-700">
                    Select the appropriate level
                  </p>
                )}
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
          ) : selectedContext === 'home' ? (
             <>
               {showPizzaTycoonFreePlay ? (
                 <PizzaTycoonFreePlay onBack={() => setShowPizzaTycoonFreePlay(false)} />
               ) : showIceCreamFreePlay ? (
                 <IceCreamFreePlay onBack={() => setShowIceCreamFreePlay(false)} />
               ) : showLemonadeStandFreePlay ? (
                 <LemonadeStandFreePlay onBack={() => setShowLemonadeStandFreePlay(false)} />
               ) : showMoneyballFreePlay ? (
                 <MoneyballFreePlay onBack={() => setShowMoneyballFreePlay(false)} />
               ) : (
                 <>
                   {/* Free Play Games Display */}
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
                      {currentKeyStage?.title} Free Play
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-700">
                      Choose a game to play at your own pace
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {getFreePlayGames(selectedKeyStage).map((game) => (
                        <Card 
                          key={game.id}
                          className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                          onClick={() => handleFreePlayGameClick(game)}
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            {game.thumbnail ? (
                              <ImageWithLoader src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" containerClassName="w-full h-full" />
                            ) : (
                              <div 
                                className={`w-full h-full flex items-center justify-center text-6xl ${!game.gradient ? `bg-gradient-to-br ${currentKeyStage.gradient}` : ''}`}
                                style={game.gradient ? { background: game.gradient } : {}}
                              >
                                {game.emoji}
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6 bg-white flex flex-col gap-2">
                            <h3 className="text-2xl font-bold" style={{ color: '#3448C5' }}>{game.title}</h3>
                            <p className="text-gray-700 text-sm leading-relaxed min-h-[60px]">{game.description}</p>
                            {game.ageRange && (
                               <p className="text-sm font-semibold text-gray-500 mt-2">{game.ageRange}</p>
                            )}
                            {!game.ageRange && (
                               <p className="text-sm font-semibold text-gray-500 mt-2">Recommended for {currentKeyStage.title}</p>
                            )}
                          </CardContent>
                        </Card>
                     ))}
                  </div>
                 </>
               )}
             </>
          ) : !selectedYear ? (
            <>
              {/* Year Selection (School Only) */}
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
                        View Topics
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : !selectedTopic ? (
             <>
               {/* Topic Selection (School Only) */}
               <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedYear(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Year Selection
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedYear} Topics
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Choose the topic you are learning
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {yearTopics[selectedYear]?.map((topic, idx) => (
                    <Card 
                      key={idx}
                      className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer group"
                      onClick={() => { setSelectedTopic(topic.title); setSelectedTopicTerm(`1.${idx + 1}`); }}
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
                      </CardContent>
                    </Card>
                 ))}
                 {!yearTopics[selectedYear] && (
                    <p className="col-span-3 text-center text-gray-500">Topics coming soon for {selectedYear}</p>
                 )}
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
              {/* Lessons for Selected Topic (School Only) */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTopic(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Topics
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedTopic}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700">
                  Choose a lesson
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const currentLO = learningObjectives[selectedYear]?.[selectedTopic]?.[num];
                  const isLessonLocked = isGameLocked(selectedYear, selectedTopicTerm, num);

                  // --- Year 2: Needs & Wants ---
                  if (selectedYear === 'Year 2' && selectedTopic === 'Needs & Wants') {
                    const roboThumbnail = "https://github.com/benhpritchard/buildwebsite/blob/main/robo.png?raw=true";
                    
                    if (num === 1) {
                      return (
                        <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://roboneedswants.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={roboThumbnail}
                                alt="Ro-Bo Needs & Wants" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">Meet Ro-Bo and help him understand a humans needs and wants.</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">🖊️ Whiteboard and pen</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Needs and Wants', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/11fabfa5f_Wantsandneeds.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <NeedsWantsWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 2 Needs & Wants Placeholders (with thumbnail)
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={roboThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 3: Value & Price ---
                  if (selectedYear === 'Year 3' && selectedTopic === 'Value & Price') {
                    const finntopiaThumbnail = "https://github.com/benhpritchard/buildwebsite/blob/main/finntopia.png?raw=true";
                    
                    if (num === 1) {
                      return (
                        <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://finnoriaprice.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={finntopiaThumbnail}
                                alt="Finnoria Price & Value" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                <p className="text-[#3448C5] font-bold">L.O. To understand the difference between price and value</p>
                                <p className="text-gray-700 text-sm">Welcome to the world of Finnoria, a planet from a galaxy far away. The residents of Finnoria want to learn all about price and value from planet Earth - and it is up to you to teach them!</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Price and Value', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a140aa0c2_PriceandValue.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <ValuePriceWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 3 Value & Price Placeholders
                       return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={finntopiaThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 4: Income & Expenses ---
                  if (selectedYear === 'Year 4' && selectedTopic === 'Income & Expenses') {
                    const sugarThumbnail = "https://github.com/benhpritchard/superherocity/blob/main/H1.png?raw=true";
                    
                    if (num === 1) {
                      return (
                         <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://sugarcity.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={sugarThumbnail}
                                alt="Sugar City" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">Welcome to Sugar City! In Mission 1: Captain Caramel's Challenge, you must help Captain Caramel manage his sweet shop by identifying income and expenses. The city needs you!</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Income and Expense', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/b4125e602_incomeandexpense.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <SweetDecisionsWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 4 Income & Expenses Placeholders (with thumbnail)
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={sugarThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 6: Percentage Discounts ---
                  if (selectedYear === 'Year 6' && selectedTopic === 'Percentage Discounts') {
                    const ecoFarmThumbnail = "https://github.com/benhpritchard/buildwebsite/blob/main/year%206.png?raw=true";
                    
                    if (num === 1) {
                      return (
                         <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://ecofarm.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={ecoFarmThumbnail}
                                alt="Eco Farm" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">Welcome to the world of sustainability. It's time to set up your own Eco-Farm. In this lesson, you will see how percentages are used in real-life context and make life changing decisions. Good luck!</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" 
                                disabled={isLessonLocked}
                              >
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Percentages in Real Life', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a1ec6284f_Percentages.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <PercentageDiscountsWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 6 Percentage Discounts Placeholders
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={ecoFarmThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 5: Revenue, Cost & Profit ---
                  if (selectedYear === 'Year 5' && selectedTopic === 'Revenue, Cost & Profit') {
                    const skylineThumbnail = "https://github.com/benhpritchard/year5themepark/blob/main/picture%20h1.png?raw=true";
                    
                    if (num === 1) {
                      return (
                         <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://skylinepark.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={skylineThumbnail}
                                alt="Skyline Park Tycoon" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">Welcome to Skyline Park - a place that was once our main attraction. Unfortunately it has been poorly managed and is in need of your help. Can you teach them about revenue and cost and help bring Skyline Park back to life?</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" 
                                disabled={isLessonLocked}
                              >
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Revenue and Cost', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/51f47baac_RevenueandCost.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <RevenueCostWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 5 Revenue, Cost & Profit Placeholders (with thumbnail)
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={skylineThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1" variant="secondary" disabled>Start Lesson</Button>
                              <Button 
                                variant="outline"
                                className="px-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 8: Credit & Borrowing ---
                  if (selectedYear === 'Year 8' && selectedTopic === 'Credit & Borrowing') {
                    const startupThumbnail = "https://github.com/benhpritchard/year8startup/blob/main/Picture%20H1%20startup.png?raw=true";
                    
                    if (num === 1) {
                      return (
                         <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://startuptycoon.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={startupThumbnail}
                                alt="Start Up Tycoon" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">Welcome to the FinnQuest Junior Enterprise Lab — the home of young innovators across Finntopia. In this topic we will look at what credit and borrowing looks like in real life and in business. Today though - its all about having a dream!</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                  </div>
                                  </div>
                                  <div className="flex gap-2 mt-4">
                                  <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                                  {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                                  </Button>
                                  <Button 
                                  variant="outline"
                                  className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                  onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Credit and Borrowing', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/50f3c5565_Creditandborrowing.pdf' });
                                  }}
                                  >
                                  <MonitorPlay className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                  variant="outline"
                                  className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                  onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                  }}
                                  >
                                  <FileText className="w-4 h-4" />
                                  </Button>
                                  <div onClick={(e) => e.stopPropagation()}>
                                   <JuniorEnterpriseWorksheet 
                                     trigger={
                                      <Button 
                                        variant="outline"
                                        className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                      >
                                        <StickyNote className="w-4 h-4" />
                                      </Button>
                                     }
                                     />
                                     </div>
                                     </div>
                                  ) : selectedYear === 'Year 9' && selectedTopic?.title === 'Investing, Wealth & Financial Growth' && num === 1 ? (
                                  <div className="flex gap-2 mt-4">
                                  <Button 
                                  className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" 
                                  disabled={isLessonLocked}
                                  onClick={(e) => {
                                  if (!isLessonLocked) {
                                  e.stopPropagation();
                                  window.open('https://investinfutures.base44.app', '_blank');
                                  }
                                  }}
                                  >
                                  {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                                  </Button>
                                  <Button 
                                  variant="outline"
                                  className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                  onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Investing Basics', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/886e91aee_Lesson17_compressed1.pdf' });
                                  }}
                                  >
                                  <MonitorPlay className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                  variant="outline"
                                  className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                  onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                  }}
                                  >
                                  <FileText className="w-4 h-4" />
                                  </Button>
                                  <div onClick={(e) => e.stopPropagation()}>
                                   <InvestingWorksheet 
                                     trigger={
                                      <Button 
                                        variant="outline"
                                        className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                      >
                                        <StickyNote className="w-4 h-4" />
                                      </Button>
                                     }
                                     />
                                     </div>
                                     </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 8 Credit & Borrowing Placeholders (with thumbnail)
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={startupThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 9: Investing, Wealth & Financial Growth ---
                  if (selectedYear === 'Year 9' && selectedTopic === 'Investing, Wealth & Financial Growth') {
                    const gameData = learningObjectives[selectedYear]?.[selectedTopic];

                    if (num === 1 && gameData?.gameUrl) {
                      return (
                        <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl(gameData.gameUrl, selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={gameData.gameThumbnail}
                                alt="Investing Game" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                {currentLO && <p className="text-[#3448C5] font-bold">L.O. {currentLO}</p>}
                                <p className="text-gray-700 text-sm">{gameData.gameDescription}</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                             <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                               {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                             </Button>
                             <Button 
                               variant="outline"
                               className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                               onClick={(e) => {
                                 e.stopPropagation();
                                 handleOpenLessonPlan(selectedYear, selectedTopic, num);
                               }}
                             >
                               <FileText className="w-4 h-4" />
                             </Button>
                             <div onClick={(e) => e.stopPropagation()}>
                               <InvestingWorksheet 
                                 trigger={
                                   <Button 
                                     variant="outline"
                                     className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                   >
                                     <StickyNote className="w-4 h-4" />
                                   </Button>
                                 }
                               />
                             </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Placeholder for other Year 9 lessons
                      const currentTopicObj = yearTopics[selectedYear]?.find(t => t.title === selectedTopic);

                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             {currentTopicObj?.image ? (
                               <ImageWithLoader 
                                  src={currentTopicObj.image}
                                  alt={`Lesson ${num}`}
                                  className="w-full h-full object-cover grayscale opacity-70"
                                  containerClassName="w-full h-full"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center">
                                   <span className="text-4xl text-gray-400">📝</span>
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Year 7: Budgeting and Managing Money ---
                  if (selectedYear === 'Year 7' && selectedTopic === 'Budgeting and Managing Money') {
                    const coffeeThumbnail = "https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_4cqbfh4cqbfh4cqb.png?raw=true";
                    
                    if (num === 1) {
                      return (
                         <Card 
                          key={num}
                          className={`rounded-3xl shadow-md border-2 overflow-hidden transition-all duration-300 ${isLessonLocked ? 'opacity-70 border-gray-200' : 'border-gray-100 hover:shadow-xl cursor-pointer group'}`}
                          onClick={() => {
                            if (isLessonLocked) {
                              setLockedDialogOpen(true);
                            } else {
                              window.open(buildTrackingGameUrl('https://coffeetakeover.base44.app/', selectedYear, selectedTopicTerm, num), '_blank');
                            }
                          }}
                        >
                          <div className="h-48 overflow-hidden relative">
                             <ImageWithLoader 
                                src={coffeeThumbnail}
                                alt="Coffee Shop Takeover" 
                                className={`w-full h-full object-cover transition-transform duration-500 ${isLessonLocked ? 'grayscale' : 'group-hover:scale-110'}`}
                                containerClassName="w-full h-full"
                             />
                             {isLessonLocked && (
                               <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                                 <Lock className="w-12 h-12 text-gray-400" />
                               </div>
                             )}
                          </div>
                          <CardContent className="p-6 bg-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Lesson {num}</h3>
                            <div className="space-y-3">
                                <p className="text-[#3448C5] font-bold">L.O. To identify common expenses of teenagers</p>
                                <p className="text-gray-700 text-sm">Uncle Ahmed is ready to hand you the keys to his coffee shop as long as you prove you have your head screwed on! Before we get inside the shop, we need to understand what our main audience spends money on - teenagers!</p>
                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-gray-600 text-sm font-medium mb-1">What do you need:</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">💻 Device</p>
                                  <p className="text-gray-600 text-sm flex items-center gap-2">✏️ Pencil case</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1 bg-[#3448C5] hover:bg-[#2a3a9f]" disabled={isLessonLocked}>
                                {isLessonLocked ? 'Lesson Locked' : 'Play Game'}
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPdfLesson({ title: 'Lesson 1 - Teenager Expenses', url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/746d2176b_TeenageExpenses.pdf' });
                                }}
                              >
                                <MonitorPlay className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline"
                                className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenLessonPlan(selectedYear, selectedTopic, num);
                                }}
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                              <div onClick={(e) => e.stopPropagation()}>
                                <TownDashWorksheet 
                                  trigger={
                                    <Button 
                                      variant="outline"
                                      className="px-3 border-[#3448C5] text-[#3448C5] hover:bg-blue-50"
                                    >
                                      <StickyNote className="w-4 h-4" />
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    } else {
                      // Year 7 Bank Accounts Placeholders (with thumbnail)
                      return (
                        <Card 
                          key={num}
                          className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                        >
                          <div className="h-48 overflow-hidden relative bg-gray-200">
                             <ImageWithLoader 
                                src={coffeeThumbnail}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                            {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                            <p className="text-gray-500 text-sm">Content coming soon...</p>
                            <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                          </CardContent>
                        </Card>
                      );
                    }
                  }

                  // --- Default Placeholder ---
                  const currentTopicObj = yearTopics[selectedYear]?.find(t => t.title === selectedTopic);

                  return (
                    <Card 
                      key={num}
                      className="rounded-3xl shadow-md border-2 border-gray-100 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <div className="h-48 overflow-hidden relative bg-gray-200">
                         {currentTopicObj?.image ? (
                             <ImageWithLoader 
                                src={currentTopicObj.image}
                                alt={`Lesson ${num}`}
                                className="w-full h-full object-cover grayscale opacity-70"
                                containerClassName="w-full h-full"
                             />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center">
                                 <span className="text-4xl text-gray-400">📝</span>
                             </div>
                         )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {num}</h3>
                        {currentLO && <p className="text-[#3448C5] font-bold mb-2">L.O. {currentLO}</p>}
                        <p className="text-gray-500 text-sm">Content coming soon...</p>
                        <Button className="w-full mt-4" variant="secondary" disabled>Start Lesson</Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lesson Plan Dialog */}
      <Dialog open={!!selectedLessonPlan} onOpenChange={(open) => !open && setSelectedLessonPlan(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between pr-8">
            <DialogTitle className="text-2xl font-bold text-[#3448C5]">Lesson Plan</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={handlePrintLessonPlan} variant="outline" size="sm" className="gap-2">
                <Printer className="w-4 h-4" /> Print / PDF
              </Button>
            </div>
          </DialogHeader>
          
          {selectedLessonPlan && (
            <div id="lesson-plan-content" className="py-4 space-y-6">
              <div className="border-b-2 border-[#3448C5] pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedLessonPlan.title}</h1>
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-500 block">Year Group</span>
                    <span className="font-semibold text-gray-900">{selectedLessonPlan.year}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500 block">Subject</span>
                    <span className="font-semibold text-gray-900">{selectedLessonPlan.subject}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Learning Objective</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedLessonPlan.objectives.map((obj, i) => (
                      <li key={i} className="text-gray-800">{obj}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Success Criteria</h2>
                  <div className="grid gap-3 pl-2">
                    {selectedLessonPlan.successCriteria.must && (
                      <div className="flex gap-2">
                        <span className="font-bold text-blue-600 min-w-[60px]">Must:</span>
                        <span className="text-gray-800">{selectedLessonPlan.successCriteria.must}</span>
                      </div>
                    )}
                    {selectedLessonPlan.successCriteria.should && (
                      <div className="flex gap-2">
                        <span className="font-bold text-blue-600 min-w-[60px]">Should:</span>
                        <span className="text-gray-800">{selectedLessonPlan.successCriteria.should}</span>
                      </div>
                    )}
                    {selectedLessonPlan.successCriteria.could && (
                      <div className="flex gap-2">
                        <span className="font-bold text-blue-600 min-w-[60px]">Could:</span>
                        <span className="text-gray-800">{selectedLessonPlan.successCriteria.could}</span>
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Lesson Outline</h2>
                  <div className="space-y-4">
                    {selectedLessonPlan.outline.map((part, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">{part.title}</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {part.content.map((line, j) => (
                            <li key={j} className="text-gray-700">{line}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {selectedLessonPlan.teacherNotes && selectedLessonPlan.teacherNotes.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Teacher Notes</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedLessonPlan.teacherNotes.map((note, i) => (
                        <li key={i} className="text-gray-800">{note}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedLessonPlan.differentiation && (selectedLessonPlan.differentiation.support || selectedLessonPlan.differentiation.challenge) && (
                  <section>
                    <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Differentiation</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedLessonPlan.differentiation.support && (
                        <div className="bg-green-50 p-3 rounded border border-green-100">
                          <strong className="text-green-700 block mb-1">Support</strong>
                          <p className="text-gray-800 text-sm">{selectedLessonPlan.differentiation.support}</p>
                        </div>
                      )}
                      {selectedLessonPlan.differentiation.challenge && (
                        <div className="bg-purple-50 p-3 rounded border border-purple-100">
                          <strong className="text-purple-700 block mb-1">Challenge</strong>
                          <p className="text-gray-800 text-sm">{selectedLessonPlan.differentiation.challenge}</p>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {selectedLessonPlan.keyQuestions && selectedLessonPlan.keyQuestions.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-3">Key Questions</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedLessonPlan.keyQuestions.map((q, i) => (
                        <li key={i} className="text-gray-800 font-medium italic">{q}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* PDF Lesson Viewer Dialog */}
      <Dialog open={!!selectedPdfLesson} onOpenChange={(open) => !open && setSelectedPdfLesson(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-slate-900 border-slate-800">
          {selectedPdfLesson && (
            <PdfLessonViewer 
              url={selectedPdfLesson.url} 
              title={selectedPdfLesson.title}
              onClose={() => setSelectedPdfLesson(null)}
            />
          )}
        </DialogContent>
      </Dialog>

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