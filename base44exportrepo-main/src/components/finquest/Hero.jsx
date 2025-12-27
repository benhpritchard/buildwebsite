import React from 'react';
import { DollarSign, PoundSterling } from 'lucide-react';

export default function Hero() {
  return (
    <div className="flex flex-col">
      {/* Top Section - Split Blue Background */}
      <section 
        className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden min-h-[80vh] flex items-center"
        style={{
          background: 'linear-gradient(105deg, #1e3a5f 50%, #3448C5 50%)'
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-12 items-center">
            
            {/* Left Character - Fiona & Alien (Spans 3 cols) */}
            <div className="col-span-12 md:col-span-3 order-2 md:order-1 flex justify-center relative transform hover:scale-105 transition-transform duration-500">
              <div className="relative w-[40rem] md:w-[48rem] lg:w-[56rem] max-w-none ml-0 md:-mr-32 z-10">
                {/* Floating Currency - Left */}
                <div className="absolute -top-4 right-[20%] animate-float-slow z-20 drop-shadow-lg">
                  <DollarSign className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 font-bold" strokeWidth={3} />
                </div>
                <div className="absolute bottom-1/2 right-0 animate-float-medium animation-delay-1000 z-20 drop-shadow-lg">
                  <PoundSterling className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 font-bold" strokeWidth={3} />
                </div>
                {/* Custom Dirham Symbol - Bottom Left of Section */}
                <div className="absolute bottom-0 left-0 md:left-10 animate-float-fast z-20 drop-shadow-lg">
                  <div className="relative font-bold text-yellow-400 text-5xl md:text-7xl font-sans">
                    D
                    <div className="absolute top-[42%] left-[-15%] w-[130%] h-[4px] bg-yellow-400 rounded-full"></div>
                    <div className="absolute top-[58%] left-[-15%] w-[130%] h-[4px] bg-yellow-400 rounded-full"></div>
                  </div>
                </div>

                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/3bc2dda40_Fionaandalien.png"
                  alt="Fiona and Alien"
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                />
              </div>
            </div>

            {/* Center Content - Logo & Tagline (Spans 6 cols) */}
            <div className="col-span-12 md:col-span-6 order-1 md:order-2 flex flex-col items-center text-center z-30 w-full px-4 py-8 relative">
              
              {/* Middle Logo */}
              <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://github.com/benhpritchard/buildwebsite/blob/main/Gemini_Generated_Image_2aume62aume62aum%20(2)%20(2).png?raw=true"
                  alt="FinnQuest Logo"
                  className="w-80 h-auto md:w-[36rem] lg:w-[50rem] drop-shadow-2xl"
                  style={{ imageRendering: '-webkit-optimize-contrast', imageRendering: 'crisp-edges' }}
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
              
              {/* Bottom Text / Tagline */}
              <div className="space-y-4 w-full">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide uppercase leading-tight drop-shadow-lg w-full">
                  <span className="block">FROM THE CLASSROOM</span>
                  <span className="block">TO THE BOARDROOM</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100 font-bold mx-auto leading-tight drop-shadow-md w-full max-w-3xl">
                  Making financial literacy the most engaging lesson of the week.
                </p>
              </div>
            </div>

            {/* Right Character - Mayor & Robo (Spans 3 cols) */}
            <div className="col-span-12 md:col-span-3 order-3 flex justify-center relative transform hover:scale-105 transition-transform duration-500">
              <div className="relative w-[40rem] md:w-[48rem] lg:w-[56rem] max-w-none ml-0 md:-ml-32 z-10">
                {/* Floating Currency - Right */}
                <div className="absolute -top-4 left-[20%] animate-float-medium z-20 drop-shadow-lg">
                  <PoundSterling className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 font-bold" strokeWidth={3} />
                </div>
                <div className="absolute bottom-1/3 left-0 animate-float-slow animation-delay-500 z-20 drop-shadow-lg">
                  <DollarSign className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 font-bold" strokeWidth={3} />
                </div>
                 {/* Custom Dirham Symbol - Bottom Right */}
                 <div className="absolute bottom-0 right-0 md:right-10 animate-float-fast z-20 drop-shadow-lg">
                  <div className="relative font-bold text-yellow-400 text-5xl md:text-7xl font-sans">
                    D
                    <div className="absolute top-[42%] left-[-15%] w-[130%] h-[4px] bg-yellow-400 rounded-full"></div>
                    <div className="absolute top-[58%] left-[-15%] w-[130%] h-[4px] bg-yellow-400 rounded-full"></div>
                  </div>
                </div>

                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/d5d062e42_mayorandrobo.png"
                  alt="Mayor and Robo"
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        @keyframes wave-reverse {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
        .animate-wave { animation: wave 4s ease-in-out infinite; }
        .animate-wave-reverse { animation: wave-reverse 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}