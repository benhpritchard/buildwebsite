import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, BookOpen, Users, Globe, Briefcase } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';

export default function About() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Immersive, Game-Based Learning',
      description: 'Every concept is taught through interactive simulations where students make decisions, solve challenges, and learn by doing — not memorising.'
    },
    {
      icon: BookOpen,
      title: 'Curriculum-Aligned, Ready-to-Teach',
      description: 'Each game includes complete lesson packs with PowerPoints, worksheets, assessments, and guidance — aligned to national and international curricula.'
    },
    {
      icon: Users,
      title: 'Designed by Teachers',
      description: 'Built by educators, for educators. Every activity is classroom-tested, inspection-ready, and designed to save time while maximising engagement.'
    },
    {
      icon: Globe,
      title: 'Learning Beyond One Setting',
      description: 'FinnQuest works seamlessly in schools, tutoring sessions, and at home — supporting individual, small-group, and whole-class learning.'
    },
    {
      icon: Briefcase,
      title: 'Real-World Relevance',
      description: 'Students connect financial concepts to everyday decisions, entrepreneurship, and future careers — building confidence they\'ll use for life.'
    }
  ];

  const audiences = [
    {
      title: "Schools",
      description: "Whole-school programmes, competitions, and innovation projects that embed financial literacy across the curriculum — without adding teacher workload."
    },
    {
      title: "Teachers",
      description: "Ready-to-run lessons, missions, and assessments that turn financial concepts into high-engagement classroom experiences."
    },
    {
      title: "Tutors",
      description: "Small-group simulations and discussion-led activities designed to build financial thinking, confidence, and decision-making skills."
    },
    {
      title: "Parents & Students",
      description: "Interactive missions that help children understand money, choices, and consequences — at home or beyond the classroom."
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
              <span className="block">FROM THE CLASSROOM</span>
              <span className="block mt-2">TO THE BOARDROOM</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Making financial literacy the most engaging lesson of the week.
            </p>
          </div>

          {/* Our Story Section - Professional "Hook" */}
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#3448C5] text-center">Our Story</h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              <p className="text-2xl font-bold text-[#3448C5] mb-6">
                FinnQuest was born in the classroom.
              </p>
              <p>
                After years of teaching across the UK and UAE, it became clear that while students could succeed academically, many were leaving school without the confidence to manage money, make financial decisions, or understand how businesses really work.
              </p>
              <p>
                The turning point came during a cross-curricular project inspired by the novel <em>Wonder</em>. Over six lessons, students collaborated to design and pitch a company creating specialist helmets for children like the book’s protagonist, Auggie. They debated costs, pricing, ethics, and design — and something changed.
              </p>
              <p>
                Students who were often disengaged became deeply invested. They took ownership, argued passionately, solved real problems, and applied skills far beyond a single subject.
              </p>
              <p>
                That project highlighted what was missing from traditional financial education: relevance, purpose, and experience.
              </p>
              <p className="font-semibold text-[#3448C5]">
                FinnQuest was created to bridge that gap — combining curriculum requirements with the kind of meaningful, hands-on learning that prepares students for life, not just exams.
              </p>
            </div>
          </div>



          {/* What FinnQuest Is (White Box Section) */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-24 text-center border border-gray-100">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6" style={{ color: '#3448C5' }}>
              What FinnQuest Is
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              FinnQuest is a complete financial literacy ecosystem that combines immersive games, ready-to-teach resources, and real-world application.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              Through interactive simulations and decision-driven gameplay, students don’t just learn about money — they use it, manage it, and experience the consequences of their choices in a safe, structured environment.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              Built by educators and designed for real classrooms, FinnQuest turns financial education into something students genuinely look forward to.
            </p>
          </div>

          {/* Who We're For Section - New Layout */}
          <div className="mb-24">
             <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                {/* Image Side */}
                <div className="lg:w-1/2 relative">
                   <div className="absolute -top-6 -left-4 z-20 bg-[#FFB68B] text-[#1a1a1a] font-bold text-xl md:text-2xl px-8 py-4 rounded-xl shadow-lg transform -rotate-2">
                      FinnQuest is for EVERYONE
                   </div>
                   <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/4a78913d0_Gemini_Generated_Image_4h6d9g4h6d9g4h6d.png" 
                      alt="Diverse group of students learning" 
                      className="w-full h-auto rounded-3xl shadow-2xl"
                   />
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 space-y-8 pl-0 lg:pl-8">
                   {audiences.map((audience, idx) => (
                      <div key={idx} className="border-l-4 border-[#35D0BA] pl-6 py-1">
                         <h3 className="text-2xl font-bold mb-2 text-[#3448C5]">{audience.title}</h3>
                         <p className="text-gray-700 text-lg leading-relaxed">{audience.description}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Features - What Makes FinnQuest Different (Pyramid Layout) */}
          <div className="mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: '#3448C5' }}>
              What Makes FinnQuest Different
            </h2>
            <div className="flex flex-col gap-8">
              {/* Top Row: 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.slice(0, 3).map((feature, index) => (
                  <Card key={index} className="rounded-3xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-8 text-center h-full">
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
              
              {/* Bottom Row: 2 items centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-2/3">
                  {features.slice(3, 5).map((feature, index) => (
                    <Card key={index + 3} className="rounded-3xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow bg-white">
                      <CardContent className="p-8 text-center h-full">
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
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}