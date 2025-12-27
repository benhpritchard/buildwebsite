import React from 'react';

export default function VideoGameSection() {
  return (
    <div className="py-12 bg-[#FAF7F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Video Placeholder & Description (Takes up more space) */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div style={{
              maxWidth: '960px',
              margin: '0 auto',
              width: '100%',
              border: '2px solid rgba(0,0,0,0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
              background: '#000'
            }}>
              <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
                <iframe
                  src="https://player.vimeo.com/video/1146817537?badge=0&autopause=0"
                  frameBorder="0"
                  allow="fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                  title="FinnQuest"
                />
              </div>
            </div>
            <div className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Discover how FinnQuest transforms financial education through interactive gameplay and real-world scenarios.
              </p>
            </div>
          </div>

          {/* Right Side: Free Game Link (Compact Sidebar Style) */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <span className="bg-[#35D0BA] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Free to Play
                </span>
              </div>
              
              <a 
                href="https://skylinepark.base44.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] mb-5 w-3/4 mx-auto md:w-full"
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/e82366149_thumbnailfree.png" 
                  alt="Skyline Park Tycoon" 
                  className="w-full h-auto object-cover"
                />
              </a>

              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-lg font-bold text-[#3448C5] leading-tight">
                  Try one of our immersive, entrepreneur games!
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">Welcome to Skyline!</span> Help rebuild the theme park ride by ride and learn all about revenue and expenses.
                </p>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[#35D0BA] font-bold text-xs flex items-center justify-center md:justify-start gap-1">
                    ✓ Year 5 Curriculum covered
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}