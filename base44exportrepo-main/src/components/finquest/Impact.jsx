import React from 'react';
import { LineChart, PiggyBank, TrendingUp, Calculator, CreditCard, BookOpen, ShieldCheck } from 'lucide-react';

export default function Impact() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3448C5]">
              What is the impact of FinnQuest?
            </h2>
            <div className="w-20 h-1.5 bg-[#35D0BA] rounded-full mx-auto md:mx-0"></div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              FinnQuest delivers high quality, student led financial literacy content. All content has been gamified to ensure high level engagement. Each lesson, comes with EVERYTHING that children and teachers need to meet curriculum outcomes.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              With the new Financial curriculum being implemented in the near future, users of FinnQuest have zero stress and full enjoyment when delivering lessons.
            </p>
          </div>

          {/* Right: Bubbles Visual */}
          <div className="md:w-1/2 relative min-h-[500px] w-full flex items-center justify-center">
            
            {/* Center Bubble */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 bg-gradient-to-br from-[#3448C5] to-[#5E6FD6] rounded-full flex flex-col items-center justify-center shadow-xl animate-pulse-slow border-4 border-white">
               <ShieldCheck className="w-16 h-16 text-white mb-2" />
               <span className="text-white font-bold text-center text-sm px-4 leading-tight">Learning through meaningful decisions</span>
            </div>

            {/* Orbiting Bubbles */}
            <div className="absolute top-0 right-10 md:right-20 w-32 h-32 bg-white border-4 border-[#35D0BA] rounded-full flex flex-col items-center justify-center shadow-lg animate-float-slow">
              <PiggyBank className="w-10 h-10 text-[#35D0BA] mb-1" />
              <span className="text-[#3448C5] font-bold text-xs text-center px-1">Decision Making</span>
            </div>

            <div className="absolute bottom-10 left-10 md:left-20 w-36 h-36 bg-white border-4 border-[#FFB68B] rounded-full flex flex-col items-center justify-center shadow-lg animate-float-medium">
              <TrendingUp className="w-12 h-12 text-[#FFB68B] mb-1" />
              <span className="text-[#3448C5] font-bold text-xs text-center px-1">Critical Thinking</span>
            </div>

            <div className="absolute top-10 left-0 md:left-10 w-28 h-28 bg-white border-4 border-[#3448C5] rounded-full flex flex-col items-center justify-center shadow-lg animate-float-fast">
              <Calculator className="w-8 h-8 text-[#3448C5] mb-1" />
              <span className="text-[#3448C5] font-bold text-xs text-center px-1">Leadership</span>
            </div>

            <div className="absolute bottom-0 right-0 md:right-10 w-40 h-40 bg-white border-4 border-[#35D0BA] rounded-full flex flex-col items-center justify-center shadow-lg opacity-90 animate-float-slow">
              <BookOpen className="w-12 h-12 text-[#35D0BA] mb-1" />
              <span className="text-[#3448C5] font-bold text-xs text-center px-2">Financial Knowledge</span>
            </div>

            <div className="absolute top-1/2 left-0 -translate-x-4 w-32 h-32 bg-orange-50 border-2 border-orange-200 rounded-full flex flex-col items-center justify-center shadow animate-float-medium">
              <CreditCard className="w-8 h-8 text-orange-500 mb-1" />
              <span className="text-orange-800 font-bold text-[10px] text-center px-1">Entrepreneurship Skills</span>
            </div>

            <div className="absolute top-1/3 right-0 translate-x-4 w-28 h-28 bg-blue-50 border-2 border-blue-200 rounded-full flex flex-col items-center justify-center shadow animate-float-fast">
              <LineChart className="w-8 h-8 text-blue-600 mb-1" />
              <span className="text-blue-800 font-bold text-[10px] text-center px-1">Innovation</span>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  );
}