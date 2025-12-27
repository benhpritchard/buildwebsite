import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, FileText, Presentation, ClipboardList, Folder, Download } from 'lucide-react';
import ImageWithLoader from '@/components/ui/ImageWithLoader';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import CurriculumDisplay from '../components/resources/CurriculumDisplay';
import ProgressMapDisplay from '../components/resources/ProgressMapDisplay';
import { curriculumData } from '../components/resources/curriculumData';
import { lessonPlans } from '../components/resources/lessonPlans';
import { yearTopics, learningObjectives } from '../components/games/gameData';
import { Printer, MonitorPlay } from 'lucide-react';
import PdfLessonViewer from '../components/resources/PdfLessonViewer';
import SweetDecisionsWorksheet from '../components/resources/worksheets/SweetDecisionsWorksheet';
import NeedsWantsWorksheet from '../components/resources/worksheets/NeedsWantsWorksheet';
import ValuePriceWorksheet from '../components/resources/worksheets/ValuePriceWorksheet';
import RevenueCostWorksheet from '../components/resources/worksheets/RevenueCostWorksheet';
import PercentageDiscountsWorksheet from '../components/resources/worksheets/PercentageDiscountsWorksheet';
import TownDashWorksheet from '../components/resources/worksheets/TownDashWorksheet';
import JuniorEnterpriseWorksheet from '../components/resources/worksheets/JuniorEnterpriseWorksheet';
import ChocolateBaseWorksheet from '../components/resources/worksheets/ChocolateBaseWorksheet';
import BuildCompanyWorksheet from '../components/resources/worksheets/BuildCompanyWorksheet';
import FoodScientistsWorksheet from '../components/resources/worksheets/FoodScientistsWorksheet';
import BuildBoxWorksheet from '../components/resources/worksheets/BuildBoxWorksheet';
import NeedsWantsHomeWorksheet from '../components/resources/worksheets/NeedsWantsHomeWorksheet';
import HowWeSpendMoneyWorksheet from '../components/resources/worksheets/HowWeSpendMoneyWorksheet';
import NeedsWantsChoicesWorksheet from '../components/resources/worksheets/NeedsWantsChoicesWorksheet';
import ValuePriceStandaloneWorksheet from '../components/resources/worksheets/ValuePriceStandaloneWorksheet';
import MoneyFlowWorksheet from '../components/resources/worksheets/MoneyFlowWorksheet';
import PricingDemandWorksheet from '../components/resources/worksheets/PricingDemandWorksheet';
import HeadphonesWorksheet from '../components/resources/worksheets/HeadphonesWorksheet';
import SchoolBagWorksheet from '../components/resources/worksheets/SchoolBagWorksheet';
import SaveBusinessWorksheet from '../components/resources/worksheets/SaveBusinessWorksheet';
import RealLifeMoneyWorksheet from '../components/resources/worksheets/RealLifeMoneyWorksheet';
import CaseStudyBrokeWorksheet from '../components/resources/worksheets/CaseStudyBrokeWorksheet';
import RealCostWorksheet from '../components/resources/worksheets/RealCostWorksheet';
import SwotAnalysisWorksheet from '../components/resources/worksheets/SwotAnalysisWorksheet';
import LifeMathsWorksheet from '../components/resources/worksheets/LifeMathsWorksheet';
import GraduateFinanceWorksheet from '../components/resources/worksheets/GraduateFinanceWorksheet';
import InvestingWorksheet from '../components/resources/worksheets/InvestingWorksheet';

// PDF Lesson URLs
const PDF_LESSONS = {
  'Lesson 1 Branding': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/b3e6783f8_Year5-Whatmakesasuccessfulbrand_pptx.pdf',
  'Lesson 2 Construction': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/105a267ef_Makingthemodelpptx.pdf',
  'Lesson 3 Advertising and Pitch': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/f6afae5ac_Pitchandmarkettingpptx.pdf'
};

// Chocolate Challenge PDF Lessons
const CHOCOLATE_LESSONS = {
  'Lesson 1 Budget Bar': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/c8420d4df_BudgetChocolateBarpptx.pdf',
  'Lesson 2 Build a Company': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/070b55533_Buildacompanypptx.pdf',
  'Lesson 4 Build a Box': 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/4a22634a7_DesignaChocolateBarpptx.pdf'
};

export default function ViewResources() {
  const [selectedSection, setSelectedSection] = useState(null); // 'lesson-packs', 'unplugged', 'curriculum'
  const [selectedSubOption, setSelectedSubOption] = useState(null); // 'details' or 'progress-map'
  const [selectedKeyStage, setSelectedKeyStage] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null); // For Lesson Packs -> Topics
  const [selectedUnpluggedOption, setSelectedUnpluggedOption] = useState(null); // 'stand-alone' or 'half-term'
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [unlockedYears, setUnlockedYears] = useState([]);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
  const [selectedPdfLesson, setSelectedPdfLesson] = useState(null);
  const [selectedTermlyTopic, setSelectedTermlyTopic] = useState(null);
  const [selectedLessonFolder, setSelectedLessonFolder] = useState(null);
  const [showYear4Worksheet, setShowYear4Worksheet] = useState(false);
  const [showYear3Worksheet, setShowYear3Worksheet] = useState(false);
  const [showYear2Worksheet, setShowYear2Worksheet] = useState(false);
  const [showYear5Worksheet, setShowYear5Worksheet] = useState(false);
  const [showYear6Worksheet, setShowYear6Worksheet] = useState(false);
  const [showYear7Worksheet, setShowYear7Worksheet] = useState(false);
  const [showYear8Worksheet, setShowYear8Worksheet] = useState(false);
  const [comingSoonDialog, setComingSoonDialog] = useState({ open: false, title: '', message: '' });
  const [selectedChocolateLesson, setSelectedChocolateLesson] = useState(null);
  const [showChocolateWorksheet, setShowChocolateWorksheet] = useState(false);
  const [showBuildCompanyWorksheet, setShowBuildCompanyWorksheet] = useState(false);
  const [showFoodScientistsWorksheet, setShowFoodScientistsWorksheet] = useState(false);
  const [showBuildBoxWorksheet, setShowBuildBoxWorksheet] = useState(false);
  const [showNeedsWantsHomeWorksheet, setShowNeedsWantsHomeWorksheet] = useState(false);
  const [showHowWeSpendMoneyWorksheet, setShowHowWeSpendMoneyWorksheet] = useState(false);
  const [showNeedsWantsChoicesWorksheet, setShowNeedsWantsChoicesWorksheet] = useState(false);
  const [showValuePriceStandaloneWorksheet, setShowValuePriceStandaloneWorksheet] = useState(false);
  const [showMoneyFlowWorksheet, setShowMoneyFlowWorksheet] = useState(false);
  const [showPricingDemandWorksheet, setShowPricingDemandWorksheet] = useState(false);
  const [showHeadphonesWorksheet, setShowHeadphonesWorksheet] = useState(false);
  const [showSchoolBagWorksheet, setShowSchoolBagWorksheet] = useState(false);
  const [showSaveBusinessWorksheet, setShowSaveBusinessWorksheet] = useState(false);
  const [showRealLifeMoneyWorksheet, setShowRealLifeMoneyWorksheet] = useState(false);
  const [showCaseStudyBrokeWorksheet, setShowCaseStudyBrokeWorksheet] = useState(false);
  const [showRealCostWorksheet, setShowRealCostWorksheet] = useState(false);
  const [showSwotAnalysisWorksheet, setShowSwotAnalysisWorksheet] = useState(false);
  const [showLifeMathsWorksheet, setShowLifeMathsWorksheet] = useState(false);
  const [showGraduateFinanceWorksheet, setShowGraduateFinanceWorksheet] = useState(false);
  const [showInvestingWorksheet, setShowInvestingWorksheet] = useState(false);

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
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/lessonpacks.png?raw=true',
      color: '#3448C5'
    },
    {
      id: 'unplugged',
      title: 'Unplugged Lessons',
      description: 'Screen-free activities',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/unpluggedlessons.png?raw=true',
      color: '#35D0BA'
    },
    {
      id: 'curriculum',
      title: 'Curriculum',
      description: 'Curriculum maps & progression',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/curriculum.png?raw=true',
      color: '#8B5CF6'
    }
  ];

  const classroomResources = [
    {
      id: 'displays',
      title: 'Displays',
      description: 'Colorful classroom wall displays',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/displays.png?raw=true',
      color: '#FFB68B'
    },
    {
      id: 'vocabulary',
      title: 'Key Vocabulary',
      description: 'Financial literacy word banks',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/keyvocabulary.png?raw=true',
      color: '#3448C5'
    },
    {
      id: 'leaderboards',
      title: 'Leaderboards',
      description: 'Track student progress and achievements',
      image: 'https://github.com/benhpritchard/buildwebsite/blob/main/leaderboard.png?raw=true',
      color: '#35D0BA'
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

  // Topics Data (Imported from gameData)

  const currentKeyStage = keyStages.find(ks => ks.id === selectedKeyStage);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleOpenLessonPlan = (year, topic, lessonNum) => {
    const plan = lessonPlans[year]?.[topic]?.[lessonNum];
    
    if (plan) {
      setSelectedLessonPlan({ 
        ...plan, 
        lessonNum, 
        year, 
        topic
      });
    } else {
      setSelectedLessonPlan({
        title: `Lesson ${lessonNum} Plan`,
        subject: "Maths / PSHE / Enterprise",
        objectives: ["Learning objective coming soon..."],
        successCriteria: { must: "Coming soon", should: "Coming soon", could: "Coming soon" },
        outline: [],
        teacherNotes: ["Detailed plan coming soon."],
        differentiation: {},
        keyQuestions: [],
        lessonNum, 
        year, 
        topic, 
        isPlaceholder: true
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

  const resetNavigation = () => {
    setSelectedSection(null);
    setSelectedSubOption(null);
    setSelectedKeyStage(null);
    setSelectedYear(null);
    setSelectedTopic(null);
    setSelectedUnpluggedOption(null);
    setSelectedLessonPlan(null);
    setSelectedPdfLesson(null);
    setSelectedTermlyTopic(null);
    setSelectedLessonFolder(null);
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
                <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    In this section, you'll find everything you need to bring your lessons to life. FinnQuest is not just about our incredible games — we also provide high-quality lesson packs, curriculum-aligned content and classroom-ready resources to support every topic.
                  </p>
                  <p>
                    Our unplugged lessons offer an excellent way to deliver key concepts without relying solely on technology. Each year group includes full topic packs, complete with easy-to-follow PowerPoints and comprehensive teacher guides, ready to use straight away.
                  </p>
                  <p>
                    Everything is designed to save time, support outstanding teaching, and maximise student engagement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {mainOptions.map((option) => (
                  <Card 
                    key={option.id}
                    className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#3448C5] overflow-hidden cursor-pointer group bg-white"
                    onClick={() => setSelectedSection(option.id)}
                  >
                    <div className="p-6 pb-0">
                      <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                        <ImageWithLoader
                          src={option.image}
                          alt={option.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          containerClassName="w-full h-full"
                        />
                      </div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 
                        className="text-2xl font-bold mb-3 group-hover:text-[#3448C5] transition-colors"
                        style={{ color: '#3448C5' }}
                      >
                        {option.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed font-medium">
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
                    Displays, Vocabulary, and Leaderboards
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {classroomResources.map((resource) => (
                    <Card 
                    key={resource.id}
                    className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#35D0BA] overflow-hidden cursor-pointer group bg-white"
                    onClick={() => {
                      if (resource.id === 'displays' || resource.id === 'vocabulary') {
                        setComingSoonDialog({
                          open: true,
                          title: 'Coming Soon!',
                          message: 'These resources will be ready for the start of the 2026 calendar year.'
                        });
                      } else {
                        setSelectedSection(resource.id);
                      }
                    }}
                    >
                      <div className="p-5 pb-0">
                        <div className="h-48 rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                           <ImageWithLoader
                            src={resource.image}
                            alt={resource.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            containerClassName="w-full h-full"
                           />
                        </div>
                      </div>
                      <CardContent className="p-6 text-center">
                        <h3 
                          className="text-xl font-bold mb-2 group-hover:text-[#35D0BA] transition-colors"
                          style={{ color: '#3448C5' }}
                        >
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
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
                {/* ... existing Curriculum sub-options ... */}
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSubOption('details')}
                >
                  <div className="h-40 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                     {/* ... */}
                     <div className="text-center text-white">
                        <FileText className="w-16 h-16 mx-auto mb-2" />
                        <h3 className="text-2xl font-bold">Curriculum Details</h3>
                     </div>
                  </div>
                   {/* ... */}
                </Card>
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSubOption('progress-map')}
                >
                  <div className="h-40 flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600">
                     <div className="text-center text-white">
                        <Presentation className="w-16 h-16 mx-auto mb-2" />
                        <h3 className="text-2xl font-bold">Progress Map</h3>
                     </div>
                  </div>
                   {/* ... */}
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
          ) : selectedSection === 'leaderboards' ? (
            <>
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

              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Leaderboards
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Many of our games create an opportunity to create a competitive atmosphere in the classroom. For this, we have added live leaderboards onto many of our games. Here, we will show you how they appear on our games and how they work.
                </p>
              </div>

              <div className="max-w-6xl mx-auto space-y-16">
                
                {/* Section 1 */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <ImageWithLoader 
                        src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-17%206.47.39%20PM.png?raw=true" 
                        alt="Leaderboard Example 1" 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <ImageWithLoader 
                        src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-17%206.47.49%20PM.png?raw=true" 
                        alt="Leaderboard Example 2" 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 text-center font-medium">
                    For all games the leaderboard option is on their homepage, usually in the bottom right corner as you can see here.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Some games give you the option to create a "league table". Here, you will be able to generate a league table and display it on the board, with a code to join.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The children then click on join league and enter their name and the code you have shared.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <ImageWithLoader 
                        src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-17%206.55.05%20PM.png?raw=true" 
                        alt="League Table Example 1" 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <ImageWithLoader 
                        src="https://github.com/benhpritchard/buildwebsite/blob/main/Screenshot%202025-12-17%206.55.15%20PM.png?raw=true" 
                        alt="League Table Example 2" 
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="text-center space-y-4 max-w-4xl mx-auto">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Sometimes, usually for Year 2 and 3, you get to create a simple league pin for them to use. In this case, do not enter your name, just enter a code for your league!
                    </p>
                    <div className="bg-blue-50 p-6 rounded-2xl mt-8">
                      <p className="text-xl text-[#3448C5] font-semibold leading-relaxed">
                        These leaderboards either update the score dynamically throughout, or provide the scores once they have finished the game. It is all about promoting healthy competition, ensuring focus and engagement, whilst getting them ready for the competitive nature of life in business!
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </>
          ) : selectedSection === 'unplugged' && !selectedUnpluggedOption ? (
            <>
              {/* Unplugged Option Selection - First Screen */}
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
                  🔌 Unplugged Lessons 🔌
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Unplugged lessons put learning first, not screens. They provide structured, interactive activities that encourage thinking, reasoning, and discussion, making them ideal for whole-class teaching, small groups, or low-tech environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer bg-white"
                  onClick={() => setSelectedUnpluggedOption('stand-alone')}
                >
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-500">
                    <FileText className="w-16 h-16 text-white" />
                  </div>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#3448C5' }}>Stand Alone Lessons</h3>
                    <p className="text-gray-600">Individual lessons perfect for one-off sessions or covering specific concepts.</p>
                  </CardContent>
                </Card>

                <Card 
                  className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer bg-white"
                  onClick={() => setSelectedUnpluggedOption('half-term')}
                >
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                    <ClipboardList className="w-16 h-16 text-white" />
                  </div>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#3448C5' }}>Termly Topics</h3>
                    <p className="text-gray-600">A complete series of lessons designed to be taught over a term.</p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : selectedSection !== 'unplugged' && !selectedKeyStage ? (
            <>
              {/* Key Stage Selection - For Curriculum and Lesson Packs Only */}
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
                  {selectedSection === 'lesson-packs' ? 'Lesson Packs' : 'Curriculum Details'}
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
          ) : selectedSection === 'unplugged' && !selectedYear ? (
            <>
              {/* Year Selection for Unplugged - All Years on One Page */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedUnpluggedOption(null)}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Options
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  Choose Year Group
                </h1>
                <p className="text-xl text-gray-700">
                  {selectedUnpluggedOption === 'stand-alone' ? 'Stand Alone Lessons' : 'Termly Topics'}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'].map((year) => {
                  const gradient = year.includes('1') || year.includes('2') ? 'from-blue-400 to-cyan-400' :
                                   year.includes('3') || year.includes('4') || year.includes('5') || year.includes('6') ? 'from-indigo-400 to-blue-400' :
                                   'from-purple-400 to-indigo-400';
                  return (
                    <Card 
                      key={year}
                      className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedYear(year)}
                    >
                      <div className={`h-24 flex items-center justify-center bg-gradient-to-br ${gradient}`}>
                        <h3 className="text-2xl font-bold text-white">{year}</h3>
                      </div>
                      <CardContent className="p-3 text-center bg-white">
                        <p className="text-sm text-gray-600">View Activities</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : !selectedYear ? (
            <>
              {/* Year Selection for Curriculum and Lesson Packs */}
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
                          ? 'View Topics'
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
              {selectedYear === 'Year 1' ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
                      alt="FinnQuest Logo"
                      className="w-16 h-auto"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-[#3448C5] mb-4">Coming Soon</h2>
                  <p className="text-xl text-gray-600">
                    Year 1 Curriculum will be released at the start of the 2026 calendar year.
                  </p>
                </div>
              ) : (
                <CurriculumDisplay 
                  data={curriculumData[selectedYear]} 
                  year={selectedYear} 
                  locked={selectedYear !== 'Year 2' && !isYearUnlocked(selectedYear)}
                />
              )}
            </>
          ) : selectedSection === 'lesson-packs' && !selectedTopic ? (
             <>
               {/* Topic Selection for Lesson Packs */}
               <div className="mb-8">
                 <Button
                   variant="outline"
                   onClick={() => {
                     setSelectedYear(null);
                     setSelectedKeyStage(null);
                   }}
                   className="flex items-center gap-2 rounded-full"
                 >
                   <ArrowLeft className="w-4 h-4" />
                   Back to Year Groups
                 </Button>
               </div>
 
               <div className="text-center mb-16">
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                   {selectedYear} Topics
                 </h1>
                 <p className="text-xl sm:text-2xl text-gray-700">
                   Choose a topic to view lesson packs
                 </p>
               </div>
 
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearTopics[selectedYear]?.map((topic, idx) => (
                     <Card 
                       key={idx}
                       className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer group"
                       onClick={() => handleTopicClick(topic)}
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
                          <p className="font-bold text-[#3448C5]">View Resources</p>
                       </CardContent>
                     </Card>
                  ))}
                  {!yearTopics[selectedYear] && (
                     selectedYear === 'Year 1' ? (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
                          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <img 
                              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
                              alt="FinnQuest Logo"
                              className="w-16 h-auto"
                            />
                          </div>
                          <h2 className="text-3xl font-bold text-[#3448C5] mb-4">Coming Soon</h2>
                          <p className="text-xl text-gray-600">
                            Year 1 Lesson Packs will be released at the start of the 2026 calendar year.
                          </p>
                        </div>
                     ) : (
                        <p className="col-span-3 text-center text-gray-500">Topics coming soon for {selectedYear}</p>
                     )
                  )}
               </div>
             </>
          ) : (
            <>
              {/* Final Resources View (Topics or Unplugged) */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedChocolateLesson) {
                      setSelectedChocolateLesson(null);
                    } else if (selectedTermlyTopic) {
                      setSelectedTermlyTopic(null);
                    } else if (selectedLessonFolder) {
                      setSelectedLessonFolder(null);
                    } else if (selectedSection === 'lesson-packs') {
                      setSelectedTopic(null);
                    } else if (selectedSection === 'unplugged') {
                      setSelectedYear(null);
                    } else {
                      setSelectedYear(null);
                    }
                  }}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {selectedChocolateLesson ? 'Back to Chocolate Challenge' : selectedTermlyTopic ? 'Back to Topics' : selectedLessonFolder ? `Back to ${selectedTopic?.title}` : selectedSection === 'lesson-packs' ? 'Back to Topics' : selectedSection === 'unplugged' ? 'Back to Options' : 'Back to Year Groups'}
                </Button>
              </div>

              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
                  {selectedSection === 'lesson-packs' 
                    ? (selectedLessonFolder ? `${selectedTopic?.title} - Lesson ${selectedLessonFolder}` : selectedTopic?.title)
                    : selectedChocolateLesson
                      ? `Lesson ${selectedChocolateLesson.num} - ${selectedChocolateLesson.title}`
                      : selectedTermlyTopic 
                        ? selectedTermlyTopic 
                        : `${selectedYear} ${selectedUnpluggedOption === 'stand-alone' ? 'Stand Alone' : 'Termly'} Lessons`}
                </h1>
              </div>

              {selectedSection === 'lesson-packs' ? (
                !selectedLessonFolder ? (
                  // Show 6 Lesson Folders
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Card 
                        key={num}
                        className="rounded-3xl shadow-lg p-8 text-center cursor-pointer hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#3448C5] group bg-white"
                        onClick={() => setSelectedLessonFolder(num)}
                      >
                        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                          <Folder className="w-10 h-10 text-[#3448C5]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Lesson {num}</h3>
                        <p className="text-gray-500 mt-2">View Resources</p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Show Resources for Selected Lesson (Plan, PPT, Worksheet)
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Lesson Plan Card */}
                    <Card 
                      className="rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent hover:border-[#3448C5] group bg-white"
                    >
                      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <FileText className="w-10 h-10 text-[#3448C5]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson Plan</h3>
                      {lessonPlans[selectedYear]?.[selectedTopic.title]?.[selectedLessonFolder] ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#3448C5] hover:bg-[#2a3a9f] w-full"
                            onClick={() => handleOpenLessonPlan(selectedYear, selectedTopic.title, selectedLessonFolder)}
                          >
                            Launch Plan
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              handleOpenLessonPlan(selectedYear, selectedTopic.title, selectedLessonFolder);
                              setTimeout(() => handlePrintLessonPlan(), 500);
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : (
                        <p className="text-gray-400 mt-2">Coming soon</p>
                      )}
                    </Card>

                    {/* PowerPoint Card */}
                    <Card 
                      className="rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent hover:border-[#35D0BA] group bg-white"
                    >
                      <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Presentation className="w-10 h-10 text-[#35D0BA]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">PowerPoint</h3>
                      {selectedYear === 'Year 2' && selectedLessonFolder === 1 && selectedTopic?.title === 'Needs & Wants' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Needs and Wants', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/11fabfa5f_Wantsandneeds.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/11fabfa5f_Wantsandneeds.pdf';
                              link.download = 'Lesson_1_Needs_and_Wants.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 3' && selectedLessonFolder === 1 && selectedTopic?.title === 'Value & Price' ? (
                       <div className="space-y-2 mt-4">
                         <Button 
                           size="sm" 
                           className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                           onClick={() => setSelectedPdfLesson({ 
                             title: 'Lesson 1 - Price and Value', 
                             url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a140aa0c2_PriceandValue.pdf' 
                           })}
                         >
                           Launch Lesson
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline"
                           className="w-full gap-2"
                           onClick={() => {
                             const link = document.createElement('a');
                             link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a140aa0c2_PriceandValue.pdf';
                             link.download = 'Lesson_1_Price_and_Value.pdf';
                             link.click();
                           }}
                         >
                           <Download className="w-4 h-4" /> Download File
                         </Button>
                       </div>
                      ) : selectedYear === 'Year 4' && selectedLessonFolder === 1 && selectedTopic?.title === 'Income & Expenses' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Income and Expense', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/b4125e602_incomeandexpense.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/b4125e602_incomeandexpense.pdf';
                              link.download = 'Lesson_1_Income_and_Expense.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 5' && selectedLessonFolder === 1 && selectedTopic?.title === 'Revenue, Cost & Profit' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Revenue and Cost', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/51f47baac_RevenueandCost.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/51f47baac_RevenueandCost.pdf';
                              link.download = 'Lesson_1_Revenue_and_Cost.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 6' && selectedLessonFolder === 1 && selectedTopic?.title === 'Percentage Discounts' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Percentages in Real Life', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a1ec6284f_Percentages.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/a1ec6284f_Percentages.pdf';
                              link.download = 'Lesson_1_Percentages.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 7' && selectedLessonFolder === 1 && selectedTopic?.title === 'Budgeting and Managing Money' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Teenager Expenses', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/746d2176b_TeenageExpenses.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/746d2176b_TeenageExpenses.pdf';
                              link.download = 'Lesson_1_Teenager_Expenses.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 8' && selectedLessonFolder === 1 && selectedTopic?.title === 'Credit & Borrowing' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Credit and Borrowing', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/50f3c5565_Creditandborrowing.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/50f3c5565_Creditandborrowing.pdf';
                              link.download = 'Lesson_1_Credit_and_Borrowing.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : selectedYear === 'Year 9' && selectedLessonFolder === 1 && selectedTopic?.title === 'Investing, Wealth & Financial Growth' ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#35D0BA] hover:bg-[#2bb8a4] w-full"
                            onClick={() => setSelectedPdfLesson({ 
                              title: 'Lesson 1 - Investing Basics', 
                              url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/886e91aee_Lesson17_compressed1.pdf' 
                            })}
                          >
                            Launch Lesson
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6942dbd5f6f67abcd33dc008/886e91aee_Lesson17_compressed1.pdf';
                              link.download = 'Lesson_1_Investing_Basics.pdf';
                              link.click();
                            }}
                          >
                            <Download className="w-4 h-4" /> Download File
                          </Button>
                        </div>
                      ) : (
                        <p className="text-gray-400 mt-2">Coming soon</p>
                      )}
                    </Card>

                    {/* Worksheet Card */}
                    <Card 
                      className="rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent hover:border-[#FFB68B] group bg-white"
                    >
                      <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <ClipboardList className="w-10 h-10 text-[#FFB68B]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Worksheet</h3>
                      {(selectedYear === 'Year 4' && selectedLessonFolder === 1 && selectedTopic?.title === 'Income & Expenses') || 
                      (selectedYear === 'Year 2' && selectedLessonFolder === 1 && selectedTopic?.title === 'Needs & Wants') ||
                      (selectedYear === 'Year 3' && selectedLessonFolder === 1 && selectedTopic?.title === 'Value & Price') ||
                      (selectedYear === 'Year 5' && selectedLessonFolder === 1 && selectedTopic?.title === 'Revenue, Cost & Profit') ||
                      (selectedYear === 'Year 6' && selectedLessonFolder === 1 && selectedTopic?.title === 'Percentage Discounts') ||
                      (selectedYear === 'Year 7' && selectedLessonFolder === 1 && selectedTopic?.title === 'Budgeting and Managing Money') ||
                      (selectedYear === 'Year 8' && selectedLessonFolder === 1 && selectedTopic?.title === 'Credit & Borrowing') ||
                      (selectedYear === 'Year 9' && selectedLessonFolder === 1 && selectedTopic?.title === 'Investing, Wealth & Financial Growth') ? (
                        <div className="space-y-2 mt-4">
                          <Button 
                            size="sm" 
                            className="bg-[#FFB68B] hover:bg-[#ff9d6e] w-full"
                            onClick={() => {
                              if (selectedYear === 'Year 4' && selectedLessonFolder === 1 && selectedTopic?.title === 'Income & Expenses') {
                                setShowYear4Worksheet(true);
                              } else if (selectedYear === 'Year 2' && selectedLessonFolder === 1 && selectedTopic?.title === 'Needs & Wants') {
                                setShowYear2Worksheet(true);
                              } else if (selectedYear === 'Year 3' && selectedLessonFolder === 1 && selectedTopic?.title === 'Value & Price') {
                                setShowYear3Worksheet(true);
                              } else if (selectedYear === 'Year 5' && selectedLessonFolder === 1 && selectedTopic?.title === 'Revenue, Cost & Profit') {
                                setShowYear5Worksheet(true);
                              } else if (selectedYear === 'Year 6' && selectedLessonFolder === 1 && selectedTopic?.title === 'Percentage Discounts') {
                                setShowYear6Worksheet(true);
                              } else if (selectedYear === 'Year 7' && selectedLessonFolder === 1 && selectedTopic?.title === 'Budgeting and Managing Money') {
                                setShowYear7Worksheet(true);
                                } else if (selectedYear === 'Year 8' && selectedLessonFolder === 1 && selectedTopic?.title === 'Credit & Borrowing') {
                                setShowYear8Worksheet(true);
                                } else if (selectedYear === 'Year 9' && selectedLessonFolder === 1 && selectedTopic?.title === 'Investing, Wealth & Financial Growth') {
                                setShowInvestingWorksheet(true);
                                }
                            }}
                          >
                            Launch Worksheet
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full gap-2"
                            onClick={() => {
                              const worksheetElement = document.getElementById('worksheet-content');
                              if (worksheetElement) {
                                const printWindow = window.open('', '', 'width=800,height=600');
                                printWindow.document.write('<html><head><title>Worksheet</title></head><body>');
                                printWindow.document.write(worksheetElement.innerHTML);
                                printWindow.document.write('</body></html>');
                                printWindow.document.close();
                                printWindow.print();
                              } else {
                                // Open first, then trigger print after a delay
                                if (selectedYear === 'Year 4' && selectedLessonFolder === 1 && selectedTopic?.title === 'Income & Expenses') {
                                  setShowYear4Worksheet(true);
                                } else if (selectedYear === 'Year 2' && selectedLessonFolder === 1 && selectedTopic?.title === 'Needs & Wants') {
                                  setShowYear2Worksheet(true);
                                } else if (selectedYear === 'Year 3' && selectedLessonFolder === 1 && selectedTopic?.title === 'Value & Price') {
                                  setShowYear3Worksheet(true);
                                } else if (selectedYear === 'Year 5' && selectedLessonFolder === 1 && selectedTopic?.title === 'Revenue, Cost & Profit') {
                                  setShowYear5Worksheet(true);
                                } else if (selectedYear === 'Year 6' && selectedLessonFolder === 1 && selectedTopic?.title === 'Percentage Discounts') {
                                  setShowYear6Worksheet(true);
                                } else if (selectedYear === 'Year 7' && selectedLessonFolder === 1 && selectedTopic?.title === 'Budgeting and Managing Money') {
                                  setShowYear7Worksheet(true);
                                  } else if (selectedYear === 'Year 8' && selectedLessonFolder === 1 && selectedTopic?.title === 'Credit & Borrowing') {
                                  setShowYear8Worksheet(true);
                                  } else if (selectedYear === 'Year 9' && selectedLessonFolder === 1 && selectedTopic?.title === 'Investing, Wealth & Financial Growth') {
                                  setShowInvestingWorksheet(true);
                                  }
                                  }
                                  }}
                                  >
                                  <Download className="w-4 h-4" /> Download File
                                  </Button>
                        </div>
                      ) : (
                         <p className="text-gray-400 mt-2">Coming soon</p>
                      )}
                    </Card>
                  </div>
                )
              ) : selectedUnpluggedOption === 'half-term' ? (
                // Termly topics view
                selectedYear === 'Year 3' ? (
                   !selectedTermlyTopic ? (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card 
                          className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer group"
                          onClick={() => setSelectedTermlyTopic('Chocolate Challenge')}
                        >
                          <div className="h-48 overflow-hidden relative">
                            <ImageWithLoader
                              src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_qoqzhqoqzhqoqzhq.png?raw=true"
                              alt="Chocolate Challenge"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              containerClassName="w-full h-full"
                            />
                          </div>
                          <CardContent className="p-6 text-center">
                            <p className="font-bold text-lg mb-2 text-gray-800">Chocolate Challenge</p>
                            <p className="text-sm text-gray-500">4 Lessons</p>
                          </CardContent>
                        </Card>
                     </div>
                   ) : selectedTermlyTopic === 'Chocolate Challenge' ? (
                       !selectedChocolateLesson ? (
                         <div className="max-w-4xl mx-auto">
                           <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
                             <p className="text-lg text-gray-700 leading-relaxed">
                               Welcome to the world of chocolate! Perfect STEM lessons to run alongside your chocolate topic often covered in Year 3.
                             </p>
                             <p className="text-lg text-gray-700 leading-relaxed mt-4">
                               Design a chocolate bar on a budget, set up your own company, become food scientists to taste your combinations and create a chocolate box to store your tasty treat inside.
                             </p>
                             <p className="text-lg font-semibold text-[#3448C5] mt-4">
                               Can be done over 4 lessons or as a hook day!
                             </p>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             {[
                               { num: 1, title: 'Budget Bar', available: true },
                               { num: 2, title: 'Build a Company', available: true },
                               { num: 3, title: 'Food Scientists', available: true },
                               { num: 4, title: 'Build a Box', available: true }
                             ].map((lesson) => (
                               <Card 
                                 key={lesson.num}
                                 className={`rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent group bg-white ${
                                   lesson.available ? 'cursor-pointer hover:shadow-2xl hover:border-[#3448C5]' : 'opacity-75'
                                 }`}
                                 onClick={() => {
                                   if (lesson.available) {
                                     setSelectedChocolateLesson(lesson);
                                   }
                                 }}
                               >
                                 <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                   <Folder className="w-10 h-10 text-[#FFB68B]" />
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson {lesson.num}</h3>
                                 <p className="text-gray-600">{lesson.title}</p>
                                 {lesson.available ? (
                                   <p className="text-gray-500 text-sm mt-4">View Resources</p>
                                 ) : (
                                   <p className="text-gray-400 text-sm mt-4">Coming soon</p>
                                 )}
                               </Card>
                             ))}
                           </div>
                         </div>
                       ) : (
                         <div className="max-w-4xl mx-auto">
                           <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
                             <p className="text-lg text-gray-700 leading-relaxed">
                               {selectedChocolateLesson.num === 1 
                                 ? "Think about different flavour combinations for your new chocolate bar - but make sure your costs are not too high!"
                                 : selectedChocolateLesson.num === 2
                                   ? "Work in groups or on your own to create everything your company needs to launch its new flavour!"
                                   : selectedChocolateLesson.num === 3
                                     ? "For this lesson, we want you to combine different ingredients together using small measuring apparatus. Try mixing white chocolate with salt and strawberry sauce - was that the winning combination? For this we do not need a PowerPoint as it is all about getting hands on!"
                                     : "Now you know your chocolate bar flavour, it is time to create the box we display it in. Remember - include information about your company but make it eye catching!"}
                             </p>
                           </div>
                           
                           <div className={`grid grid-cols-1 ${selectedChocolateLesson.num === 3 ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-6`}>
                             {/* PowerPoint Card - Only show for lessons 1 and 2 */}
                             {selectedChocolateLesson.num !== 3 && (
                             <Card className="rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent hover:border-[#3448C5] group bg-white">
                               <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                 <MonitorPlay className="w-10 h-10 text-[#FFB68B]" />
                               </div>
                               <h3 className="text-xl font-bold text-gray-800 mb-2">PowerPoint</h3>
                               <div className="space-y-2 mt-4">
                                 <Button 
                                   size="sm" 
                                   className="bg-[#FFB68B] hover:bg-[#ff9d6e] w-full"
                                   onClick={() => setSelectedPdfLesson({ 
                                     title: `Lesson ${selectedChocolateLesson.num} ${selectedChocolateLesson.title}`, 
                                     url: CHOCOLATE_LESSONS[`Lesson ${selectedChocolateLesson.num} ${selectedChocolateLesson.title}`] 
                                   })}
                                 >
                                   Launch Lesson
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   className="w-full gap-2"
                                   onClick={() => {
                                     const link = document.createElement('a');
                                     link.href = CHOCOLATE_LESSONS[`Lesson ${selectedChocolateLesson.num} ${selectedChocolateLesson.title}`];
                                     link.download = `Lesson_${selectedChocolateLesson.num}_${selectedChocolateLesson.title}.pdf`;
                                     link.click();
                                   }}
                                 >
                                   <Download className="w-4 h-4" /> Download File
                                   </Button>
                                   </div>
                                   </Card>
                                   )}

                                   {/* Worksheet Card */}
                             <Card className="rounded-3xl shadow-lg p-8 text-center transition-all border-2 border-transparent hover:border-[#FFB68B] group bg-white">
                               <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                 <ClipboardList className="w-10 h-10 text-[#FFB68B]" />
                               </div>
                               <h3 className="text-xl font-bold text-gray-800 mb-2">
                                 {selectedChocolateLesson.num === 3 ? 'Scoring Chart' : selectedChocolateLesson.num === 4 ? 'Box Net' : 'Worksheet'}
                               </h3>
                               <div className="space-y-2 mt-4">
                                 <Button 
                                   size="sm" 
                                   className="bg-[#FFB68B] hover:bg-[#ff9d6e] w-full"
                                   onClick={() => {
                                     if (selectedChocolateLesson.num === 1) {
                                       setShowChocolateWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 2) {
                                       setShowBuildCompanyWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 3) {
                                       setShowFoodScientistsWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 4) {
                                       setShowBuildBoxWorksheet(true);
                                     }
                                   }}
                                 >
                                   {selectedChocolateLesson.num === 3 ? 'Open Scoring Chart' : selectedChocolateLesson.num === 4 ? 'Open Box Net' : 'Open Worksheet'}
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   className="w-full gap-2"
                                   onClick={() => {
                                     if (selectedChocolateLesson.num === 1) {
                                       setShowChocolateWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 2) {
                                       setShowBuildCompanyWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 3) {
                                       setShowFoodScientistsWorksheet(true);
                                     } else if (selectedChocolateLesson.num === 4) {
                                       setShowBuildBoxWorksheet(true);
                                     }
                                   }}
                                 >
                                   <Download className="w-4 h-4" /> Download File
                                 </Button>
                               </div>
                             </Card>
                           </div>
                         </div>
                       )
                   ) : null
                ) : selectedYear === 'Year 5' ? (
                   !selectedTermlyTopic ? (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card 
                          className="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden cursor-pointer group"
                          onClick={() => setSelectedTermlyTopic('Wonder Topic')}
                        >
                          <div className="h-48 overflow-hidden relative">
                            <ImageWithLoader
                              src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_e1tdhye1tdhye1td.png?raw=true"
                              alt="Wonder Topic"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              containerClassName="w-full h-full"
                            />
                          </div>
                          <CardContent className="p-6 text-center">
                            <p className="font-bold text-lg mb-2 text-gray-800">Wonder Topic</p>
                            <p className="text-sm text-gray-500">3 Lessons</p>
                          </CardContent>
                        </Card>
                     </div>
                   ) : selectedTermlyTopic === 'Wonder Topic' ? (
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {Object.entries(PDF_LESSONS).map(([title, url]) => (
                            <Card 
                              key={title}
                              className="rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all border-2 hover:border-[#3448C5] group"
                              onClick={() => setSelectedPdfLesson({ title, url })}
                            >
                              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <MonitorPlay className="w-8 h-8 text-[#3448C5]" />
                              </div>
                              <p className="font-bold text-lg mb-2 text-gray-800">{title}</p>
                              <Button size="sm" className="bg-[#3448C5] hover:bg-[#2a3a9f] w-full mt-2">
                                Launch Lesson
                              </Button>
                            </Card>
                          ))}
                       </div>
                   ) : null
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Termly topics for {selectedYear} coming soon.</p>
                  </div>
                )
              ) : (
                 selectedYear === 'Year 3' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2airhg2airhg2air.png?raw=true"
                               alt="Needs, Wants and Making Choices Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowNeedsWantsChoicesWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowNeedsWantsChoicesWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Needs, Wants and Making Choices</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children revisit the difference between needs and wants and begin to explore what happens when money is limited. Pupils are encouraged to think carefully about their choices and understand that not everything can be bought at once.
                             </p>
                             <p>
                               The lesson helps children develop early decision-making skills by comparing options, explaining choices, and reflecting on what matters most. This worksheet is ideal for encouraging discussion and simple reasoning about money in everyday situations.
                             </p>
                           </div>
                         </div>
                       </div>
                       </div>

                       {/* Activity Card 2 */}
                       <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_n49yedn49yedn49y.png?raw=true"
                               alt="Value and Price Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowValuePriceStandaloneWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowValuePriceStandaloneWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Value and Price</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children explore the difference between price and value. Pupils learn that the most expensive item is not always the best choice and that value depends on how useful or important something is to them.
                             </p>
                             <p>
                               Children compare everyday items, think about what makes something good value for money, and explain their choices using simple reasoning. This lesson helps build early money skills and encourages thoughtful decision-making when spending.
                             </p>
                           </div>
                         </div>
                       </div>
                       </div>
                       </div>
                       ) : selectedYear === 'Year 2' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_5wubp95wubp95wub.png?raw=true"
                               alt="Needs and Wants at Home Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowNeedsWantsHomeWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowNeedsWantsHomeWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Needs and Wants at Home</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children explore the difference between needs and wants using familiar, real-life examples from home and everyday life. Pupils think carefully about what they truly need to live safely and comfortably, and which items are things they would like but could live without.
                             </p>
                             <p>
                               This lesson helps children begin to understand decision-making and prioritising — key foundations of good money habits later in life. The worksheet encourages discussion, reasoning, and simple written explanations, making it ideal for classroom use or home learning.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_yhmkigyhmkigyhmk.png?raw=true"
                               alt="How Do We Spend Our Money? Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowHowWeSpendMoneyWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowHowWeSpendMoneyWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">How Do We Spend Our Money?</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children explore different ways money can be spent and begin to think about making sensible spending choices. Pupils are encouraged to recognise that money can be used for many purposes and that some choices are more important than others.
                             </p>
                             <p>
                               The worksheet focuses on recognising sensible spending, reflecting on choices, and explaining simple reasons for decisions. This lesson supports early financial awareness and builds confidence in talking about money in a safe, age-appropriate way.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 4' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_9qxrwq9qxrwq9qxr.png?raw=true"
                               alt="Money Flow Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowMoneyFlowWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowMoneyFlowWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Money Flow: Income, Expenses and Profit</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children explore how money flows through a simple business. Pupils learn to identify income and expenses and calculate profit by comparing what a business earns with what it spends.
                             </p>
                             <p>
                               Using a simple business example, children record costs, track income, and work out whether the business makes a profit or a loss. This lesson introduces core business concepts in an age-appropriate way and builds confidence with real-world money calculations.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_x1utwpx1utwpx1ut.png?raw=true"
                               alt="Pricing and Demand Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowPricingDemandWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowPricingDemandWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Pricing and Demand: Finding a Fair Price</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, children explore how changing prices affects how many customers choose to buy a product. Pupils work with real sales data, predict demand, and compare different pricing strategies to decide which option is best for a business.
                             </p>
                             <p>
                               Children use calculations, comparisons, and written explanations to justify their decisions, helping them understand that pricing is a balance between profit and customer demand.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 5' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_h5asn1h5asn1h5as.png?raw=true"
                               alt="Headphones Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowHeadphonesWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowHeadphonesWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Fix the Problem: Better Headphones for School</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               Many pupils use headphones at school for learning, videos, and reading activities — but current headphones often break, tangle, feel uncomfortable, or don't block out noise properly.
                             </p>
                             <p>
                               In this activity, children design a product and business to solve this problem. They create a new type of school-friendly headphone, build a brand, and explain why customers would choose their product over others.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_h9700wh9700wh970.png?raw=true"
                               alt="Save Business Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowSaveBusinessWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowSaveBusinessWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Save the Business: Analysing a Failing Company</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse a real business case study using financial data from the past six months. Children examine income, expenses, and performance trends to identify why the business is struggling.
                             </p>
                             <p>
                               Pupils then act as business consultants, reviewing what has gone wrong and suggesting realistic improvements to help the company recover.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 6' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_hc0ylkhc0ylkhc0y.png?raw=true"
                               alt="School Bag Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowSchoolBagWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowSchoolBagWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Fix the Problem: Redesigning the School Bag</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               Many pupils carry heavy school bags that are uncomfortable, badly organised, or easily damaged. As students move towards secondary school, they need bags that are practical, durable, and well designed.
                             </p>
                             <p>
                               In this activity, children design a new school bag and create a business to sell it. Pupils think strategically about features, customer needs, branding, and competition, explaining why their product would succeed.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_h9700wh9700wh970.png?raw=true"
                               alt="Save Business Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowSaveBusinessWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowSaveBusinessWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Save the Business: Analysing a Failing Company</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse a real business case study using financial data from the past six months. Children examine income, expenses, and performance trends to identify why the business is struggling.
                             </p>
                             <p>
                               Pupils then act as business consultants, reviewing what has gone wrong and suggesting realistic improvements to help the company recover.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 7' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_3d3ygg3d3ygg3d3y.png?raw=true"
                               alt="Real Life Money Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowRealLifeMoneyWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowRealLifeMoneyWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Real Life Money: Your First Pay and Budget</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse real-life financial documents including a payslip and bank statement. Students learn the difference between gross and net income, track spending, and create a realistic budget.
                             </p>
                             <p>
                               The lesson introduces interest, inflation, and consumer choices, helping students develop practical money skills they will use throughout their teenage years and beyond.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_fur16vfur16vfur1.png?raw=true"
                               alt="Case Study Broke Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowCaseStudyBrokeWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowCaseStudyBrokeWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Managing Money: Learning From a Real Case Study</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse the finances of a teenager who has been working for six months but still struggles to manage their money. Using payslips, bank statements, and spending data, pupils identify problems, build a better budget, and suggest changes to improve financial wellbeing.
                             </p>
                             <p>
                               This lesson helps students understand how everyday choices affect money over time.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 8' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_d9psxgd9psxgd9ps.png?raw=true"
                               alt="Real Cost Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowRealCostWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowRealCostWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">The Real Cost: Subscriptions, Credit and Long-Term Spending</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils use mathematics to uncover the true cost of subscriptions, contracts, and credit. Students compare monthly plans, calculate long-term costs, and analyse interest charges to decide which options offer better value.
                             </p>
                             <p>
                               This lesson focuses on numerical reasoning and decision-making, helping pupils understand how small monthly costs and interest rates can add up over time.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_1vgo141vgo141vgo.png?raw=true"
                               alt="SWOT Analysis Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowSwotAnalysisWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowSwotAnalysisWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Business Case Study: Is This Company a Good Idea?</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse a real-world business case study involving subscriptions, contracts, and credit. Students examine financial performance, customer behaviour, and long-term commitments before completing a SWOT analysis and making strategic recommendations.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : selectedYear === 'Year 9' ? (
                   <div className="max-w-4xl mx-auto space-y-8">
                     {/* Activity Card 1 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_tawtsmtawtsmtawt.png?raw=true"
                               alt="Life Maths Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowLifeMathsWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowLifeMathsWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Life Maths: Managing Your Money Over Time</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, students manage a realistic personal finance simulation. Pupils compare career pathways, calculate tax and net income, build a monthly budget, and decide how to save and invest their money.
                             </p>
                             <p>
                               The lesson focuses on mathematical reasoning and long-term thinking, helping students understand how career and financial decisions affect lifestyle, security, and future opportunities.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Activity Card 2 */}
                     <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         {/* Left Side - Worksheet Preview & Buttons */}
                         <div className="flex flex-col items-center space-y-3">
                           <div className="w-full border-2 border-[#3448C5] rounded-lg overflow-hidden shadow-md bg-white p-2">
                             <ImageWithLoader
                               src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_hcrn3fhcrn3fhcrn.png?raw=true"
                               alt="Graduate Finance Worksheet"
                               className="w-full h-auto object-contain"
                               containerClassName="w-full"
                             />
                           </div>
                           <Button 
                             className="w-full bg-[#3448C5] hover:bg-[#2a3a9f] text-sm"
                             onClick={() => setShowGraduateFinanceWorksheet(true)}
                           >
                             Open Worksheet
                           </Button>
                           <Button 
                             variant="outline"
                             className="w-full gap-2 text-sm"
                             onClick={() => setShowGraduateFinanceWorksheet(true)}
                           >
                             <Download className="w-4 h-4" /> Download
                           </Button>
                         </div>

                         {/* Right Side - Description */}
                         <div className="md:col-span-3">
                           <h3 className="text-2xl font-bold text-[#3448C5] mb-4">Real Life Money: Graduates and Financial Reality</h3>
                           <div className="space-y-4 text-gray-700 leading-relaxed">
                             <p>
                               In this activity, pupils analyse the finances of a recent graduate navigating work, rent, student debt, and everyday living costs. Students examine income, spending, and choices to understand why earning money does not always lead to financial security.
                             </p>
                             <p>
                               The lesson focuses on realistic budgeting, lifestyle trade-offs, and long-term consequences of financial decisions.
                             </p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ) : (
                   <div className="text-center py-20">
                      <p className="text-xl text-gray-500">
                        Stand alone lessons coming soon!
                      </p>
                   </div>
                 )
              )}
            </>
          )}
        </div>
      </div>
      <Footer />

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

      {/* Year 4 Lesson 1 Worksheet */}
      <SweetDecisionsWorksheet 
        open={showYear4Worksheet} 
        onOpenChange={setShowYear4Worksheet} 
      />

      {/* Year 2 Lesson 1 Worksheet */}
      <NeedsWantsWorksheet 
        open={showYear2Worksheet} 
        onOpenChange={setShowYear2Worksheet} 
      />

      {/* Year 3 Lesson 1 Worksheet */}
      <ValuePriceWorksheet
        open={showYear3Worksheet}
        onOpenChange={setShowYear3Worksheet}
      />

      {/* Year 5 Lesson 1 Worksheet */}
      <RevenueCostWorksheet
        open={showYear5Worksheet}
        onOpenChange={setShowYear5Worksheet}
      />

      {/* Year 6 Lesson 1 Worksheet */}
      <PercentageDiscountsWorksheet
        open={showYear6Worksheet}
        onOpenChange={setShowYear6Worksheet}
      />

      {/* Year 7 Lesson 1 Worksheet */}
      <TownDashWorksheet
        open={showYear7Worksheet}
        onOpenChange={setShowYear7Worksheet}
      />

      {/* Year 8 Lesson 1 Worksheet */}
      <JuniorEnterpriseWorksheet
        open={showYear8Worksheet}
        onOpenChange={setShowYear8Worksheet}
      />

      {/* Chocolate Base Worksheet */}
      <ChocolateBaseWorksheet
        open={showChocolateWorksheet}
        onOpenChange={setShowChocolateWorksheet}
      />

      {/* Build Company Worksheet */}
      <BuildCompanyWorksheet
        open={showBuildCompanyWorksheet}
        onOpenChange={setShowBuildCompanyWorksheet}
      />

      {/* Food Scientists Worksheet */}
      <FoodScientistsWorksheet
        open={showFoodScientistsWorksheet}
        onOpenChange={setShowFoodScientistsWorksheet}
      />

      {/* Build Box Worksheet */}
      <BuildBoxWorksheet
        open={showBuildBoxWorksheet}
        onOpenChange={setShowBuildBoxWorksheet}
      />

      {/* Needs Wants Home Worksheet */}
      <NeedsWantsHomeWorksheet
        open={showNeedsWantsHomeWorksheet}
        onOpenChange={setShowNeedsWantsHomeWorksheet}
      />

      {/* How We Spend Money Worksheet */}
      <HowWeSpendMoneyWorksheet
        open={showHowWeSpendMoneyWorksheet}
        onOpenChange={setShowHowWeSpendMoneyWorksheet}
      />

      {/* Needs Wants Choices Worksheet */}
      <NeedsWantsChoicesWorksheet
        open={showNeedsWantsChoicesWorksheet}
        onOpenChange={setShowNeedsWantsChoicesWorksheet}
      />

      {/* Value Price Standalone Worksheet */}
      <ValuePriceStandaloneWorksheet
        open={showValuePriceStandaloneWorksheet}
        onOpenChange={setShowValuePriceStandaloneWorksheet}
      />

      {/* Money Flow Worksheet */}
      <MoneyFlowWorksheet
        open={showMoneyFlowWorksheet}
        onOpenChange={setShowMoneyFlowWorksheet}
      />

      {/* Pricing Demand Worksheet */}
      <PricingDemandWorksheet
        open={showPricingDemandWorksheet}
        onOpenChange={setShowPricingDemandWorksheet}
      />

      {/* Headphones Worksheet */}
      <HeadphonesWorksheet
        open={showHeadphonesWorksheet}
        onOpenChange={setShowHeadphonesWorksheet}
      />

      {/* School Bag Worksheet */}
      <SchoolBagWorksheet
        open={showSchoolBagWorksheet}
        onOpenChange={setShowSchoolBagWorksheet}
      />

      {/* Save Business Worksheet */}
      <SaveBusinessWorksheet
        open={showSaveBusinessWorksheet}
        onOpenChange={setShowSaveBusinessWorksheet}
      />

      {/* Real Life Money Worksheet */}
      <RealLifeMoneyWorksheet
        open={showRealLifeMoneyWorksheet}
        onOpenChange={setShowRealLifeMoneyWorksheet}
      />

      {/* Case Study Broke Worksheet */}
      <CaseStudyBrokeWorksheet
        open={showCaseStudyBrokeWorksheet}
        onOpenChange={setShowCaseStudyBrokeWorksheet}
      />

      {/* Real Cost Worksheet */}
      <RealCostWorksheet
        open={showRealCostWorksheet}
        onOpenChange={setShowRealCostWorksheet}
      />

      {/* SWOT Analysis Worksheet */}
      <SwotAnalysisWorksheet
        open={showSwotAnalysisWorksheet}
        onOpenChange={setShowSwotAnalysisWorksheet}
      />

      {/* Life Maths Worksheet */}
      <LifeMathsWorksheet
        open={showLifeMathsWorksheet}
        onOpenChange={setShowLifeMathsWorksheet}
      />

      {/* Graduate Finance Worksheet */}
      <GraduateFinanceWorksheet
        open={showGraduateFinanceWorksheet}
        onOpenChange={setShowGraduateFinanceWorksheet}
      />

      {/* Investing Worksheet */}
      <InvestingWorksheet
        open={showInvestingWorksheet}
        onOpenChange={setShowInvestingWorksheet}
      />

      {/* Coming Soon Dialog */}
      <Dialog open={comingSoonDialog.open} onOpenChange={(open) => setComingSoonDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="max-w-md text-center p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-[#3448C5] mb-4">{comingSoonDialog.title}</DialogTitle>
          </DialogHeader>
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="w-12 h-auto"
            />
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {comingSoonDialog.message}
          </p>
        </DialogContent>
      </Dialog>

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
      <Footer />
    </div>
  );
}