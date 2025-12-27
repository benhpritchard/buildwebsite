import React from 'react';
import { Sparkles, Users, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Hero() {
  return (
    <section 
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3448C5 0%, #35D0BA 100%)'
      }}
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-xl">
              <div className="bg-white rounded-full p-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/8a8ccc245_Gemini_Generated_Image_3z9ysf3z9ysf3z9y.png"
                  alt="FinnQuest Logo"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            From Classroom to Boardroom
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto font-medium">
            Making financial literacy the most engaging lesson of the week.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to={createPageUrl('ExploreGames')}>
              <Button 
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
              >
                Explore Games
              </Button>
            </Link>
            <Link to={createPageUrl('ViewResources')}>
              <Button 
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
              >
                View Resources
              </Button>
            </Link>
            <Button 
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
            >
              About FinnQuest
            </Button>
          </div>

          {/* Illustration Area */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Feature Cards */}
              <div className="flex flex-col items-center gap-4 bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#3448C5' }}
                >
                  <Users className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <span 
                  className="font-bold text-lg"
                  style={{ color: '#3448C5' }}
                >
                  Students
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#3448C5' }}
                >
                  <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <span 
                  className="font-bold text-lg"
                  style={{ color: '#3448C5' }}
                >
                  Growth
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#3448C5' }}
                >
                  <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <span 
                  className="font-bold text-lg"
                  style={{ color: '#3448C5' }}
                >
                  Engagement
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#3448C5' }}
                >
                  <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <span 
                  className="font-bold text-lg"
                  style={{ color: '#3448C5' }}
                >
                  Learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}