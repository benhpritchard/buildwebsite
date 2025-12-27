import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, BookOpen, Users, Globe, Briefcase, School, GraduationCap, Home } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';

export default function About() {
  const audiences = [
    {
      icon: School,
      title: 'Schools / Curriculum Leaders',
      points: [
        'Whole-school implementation & CPD',
        '6-week innovation projects',
        'Competitions and enrichment events',
        'Inspection-ready impact data',
        'Professional development resources'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Teachers & Tutors',
      points: [
        'Curriculum-aligned, ready-to-teach games',
        'Printable PDFs, PowerPoints, worksheets',
        'Class packs, assessments, and competitions',
        'Tutor frameworks and differentiation support'
      ]
    },
    {
      icon: Home,
      title: 'Parents & Students',
      points: [
        'Home-learning game access',
        'Printable learning packs & video guides',
        'Real-world money skills through play',
        'Independent or family challenges'
      ]
    },
    {
      icon: Users,
      title: 'Tutors / Learning Centres',
      points: [
        'Structured group learning packs',
        'Game frameworks for small-group tutoring',
        'Competition templates and local leaderboards',
        'Tools to extend innovation and financial skills'
      ]
    }
  ];

  const features = [
    {
      icon: Gamepad2,
      title: 'Game-Based Learning',
      description: 'Every concept is taught through interactive gameplay, where students make decisions, solve challenges, and learn by doing.'
    },
    {
      icon: BookOpen,
      title: 'Curriculum-Aligned Resources',
      description: 'Each game comes with ready-to-teach lesson packs — PowerPoints, worksheets, assessments, and teacher guidance — fully aligned to national and international curricula.'
    },
    {
      icon: Users,
      title: 'Teacher-Led Design',
      description: 'Built by educators, for educators. Every activity is classroom-tested, inspection-friendly, and created to save planning time while increasing engagement.'
    },
    {
      icon: Globe,
      title: 'Cross-Context Learning',
      description: 'Designed for schools, tutors, and home learners, making financial literacy accessible anywhere — from group lessons to individual study.'
    },
    {
      icon: Briefcase,
      title: 'Real-World Application',
      description: 'Students connect money, business, and entrepreneurship to everyday decision-making, building confidence and critical-thinking skills they\'ll use for life.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F0' }}>
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3448C5' }}>
              From Classroom to Boardroom
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Making financial literacy the most engaging lesson of the week.
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We design curriculum-aligned, game-based experiences that bring money, business, and decision-making to life — helping teachers deliver meaningful, high-impact lessons that prepare students for the financial realities of tomorrow.
            </p>
          </div>

          {/* Vision Quote */}
          <div className="bg-gradient-to-r from-[#3448C5] to-[#35D0BA] rounded-3xl p-8 md:p-12 mb-16 text-center">
            <p className="text-xl md:text-2xl text-white italic font-medium">
              "Our vision is to help create a world where every student leaves school financially confident and ready for the real world."
            </p>
            <p className="text-white/80 mt-4 font-semibold">
              Practical. Engaging. Built for classrooms.
            </p>
          </div>

          {/* Who We're For */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" style={{ color: '#3448C5' }}>
              Who are we for?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our ecosystem reaches classrooms, homes, and tutoring centres — equipping educators and learners with the tools to make money education meaningful and engaging.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {audiences.map((audience, index) => (
                <Card key={index} className="rounded-3xl shadow-lg border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: '#3448C5' }}
                      >
                        <audience.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: '#3448C5' }}>
                        {audience.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {audience.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <span className="text-[#35D0BA] mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-20 text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              FinnQuest is the complete financial-literacy ecosystem for schools, teachers, tutors, and families — combining game-based learning, curriculum alignment, and real-world relevance to make money education practical, engaging, and future-focused.
            </p>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: '#3448C5' }}>
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="rounded-3xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: '#35D0BA' }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#3448C5' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* About the Founder */}
          <div className="bg-gradient-to-r from-[#3448C5] to-[#35D0BA] rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
              Meet the Founder
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Photo and Quick Facts */}
                <div className="flex-shrink-0 text-center">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/62925f300_ben-pritchard.jpg"
                    alt="Ben Pritchard"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg mx-auto"
                  />
                  {/* Quick Facts */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-500 mb-3">QUICK FACTS</p>
                    <div className="flex flex-col gap-2">
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">📍 Yorkshire Dales</span>
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">⚽ Liverpool FC</span>
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">🏃 Sports Enthusiast</span>
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">📚 Avid Reader</span>
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">🐱 Cat Lover</span>
                    </div>
                  </div>
                </div>
                
                {/* Bio */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#3448C5' }}>
                    Ben Pritchard
                  </h3>
                  <p className="text-[#35D0BA] font-semibold mb-4">Founder & Creator</p>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Ben Pritchard is a dedicated primary school educator with 15 years of classroom experience spanning the UK and the UAE. After beginning his teaching career in North Yorkshire, Ben relocated to Dubai in 2013, where he has since worked across three international schools — first as a classroom teacher covering Year 1 through Year 6, and most recently as a STEM specialist.
                    </p>
                    <p>
                      Ben is a highly-rated STEM educator whose classroom practice has been recognized as Outstanding across three consecutive KHDA and BSO inspections. He is committed to driving educational progress and plays a key role in supporting school's digital innovation initiatives that contribute to the UAE's National Agenda.
                    </p>
                    <p>
                      His passion for financial literacy and entrepreneurship grew from his STEM teaching, where he witnessed first-hand the transformative impact of lessons that were relevant, engaging, and purposeful. A pivotal moment came during a cross-curricular project linked to the novel <em>Wonder</em>, in which students spent six lessons collaborating to design and pitch a company creating helmets for individuals like the book's protagonist, Auggie. Watching students develop real-world skills through meaningful, hands-on learning convinced Ben that the current curriculum was in need of change.
                    </p>
                    <p>
                      Over the past 18 months, Ben has taught himself to design and develop educational games, refining his vision of what children truly need to learn before they leave school. This journey led to the creation of FinnQuest — a project he couldn't be more passionate about.
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}