import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CTA() {
  return (
    <section 
      className="py-20 md:py-28"
      style={{ backgroundColor: '#3448C5' }}
      id="contact"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Join the FinnQuest Movement
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-12 font-medium">
          Start engaging your students with game-based financial literacy today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to={createPageUrl('ExploreGames')}>
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to={createPageUrl('Contact')}>
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              style={{ backgroundColor: '#FFB68B', color: '#1a1a1a' }}
            >
              Book a Demo
              <Calendar className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex justify-center gap-8 opacity-50">
          <span className="text-5xl">🎯</span>
          <span className="text-5xl">🚀</span>
          <span className="text-5xl">💡</span>
        </div>
      </div>
    </section>
  );
}