import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Star, ArrowRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { progressionData } from './progressionData';

export default function ProgressMapDisplay() {
  const [expandedYear, setExpandedYear] = useState(null);

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          @page { size: landscape; margin: 10mm; }
          body * { visibility: hidden; }
          #progression-map-printable, #progression-map-printable * { visibility: visible; }
          #progression-map-printable {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 9999;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Interactive Display (Hidden on Print) */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 no-print">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <h2 className="text-3xl font-bold text-gray-900">Progression Map</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            A detailed guide to financial literacy learning outcomes from Year 2 to Year 9.
            Click on a year group to explore big ideas and key abilities.
          </p>
          <Button onClick={handlePrint} className="bg-[#3448C5] hover:bg-[#2a3a9e] gap-2">
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </Button>
        </div>

        <div className="space-y-4">
          {progressionData.map((item) => (
            <div 
              key={item.year}
              className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                expandedYear === item.year 
                  ? 'border-[#3448C5] shadow-md bg-blue-50/30' 
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <button
                onClick={() => toggleYear(item.year)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                    expandedYear === item.year 
                      ? 'bg-[#3448C5] text-white' 
                      : 'bg-blue-100 text-[#3448C5]'
                  }`}>
                    {item.year.replace('Year ', 'Y')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.year}</h3>
                    <p className="text-sm text-gray-500 font-medium">{item.title}</p>
                  </div>
                </div>
                {expandedYear === item.year ? (
                  <ChevronDown className="w-6 h-6 text-[#3448C5]" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedYear === item.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 pt-0 border-t border-blue-100">
                      <div className="grid md:grid-cols-2 gap-8 mt-5">
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="text-[#3448C5] font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#3448C5]"></span>
                            Big Ideas
                          </h4>
                          <ul className="space-y-3">
                            {item.bigIdeas.map((idea, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                <span>{idea}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <h4 className="text-[#35D0BA] font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#35D0BA]"></span>
                            Key Abilities
                          </h4>
                          <ul className="space-y-3">
                            {item.keyAbilities.map((ability, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                <ArrowRight className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                                <span>{ability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Printable View (Visible only on Print) */}
      <div id="progression-map-printable" className="hidden p-8 bg-white">
        <h1 className="text-4xl font-bold text-[#3448C5] text-center mb-8 border-b-2 border-[#3448C5] pb-4">
          FinnQuest Financial Literacy Progression Map
        </h1>
        <div className="grid grid-cols-2 gap-6 text-sm">
          {progressionData.map((item) => (
            <div key={item.year} className="border border-gray-300 rounded-lg p-4 break-inside-avoid mb-4">
              <div className="flex items-center gap-3 mb-3 border-b border-gray-200 pb-2">
                <div className="bg-[#3448C5] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-xs">
                  {item.year.replace('Year ', 'Y')}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.year}</h3>
                  <p className="text-xs text-gray-500">{item.title}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-[#3448C5] text-xs mb-1">Big Ideas</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {item.bigIdeas.map((idea, idx) => (
                      <li key={idx} className="text-gray-700 text-xs">{idea}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#35D0BA] text-xs mb-1">Key Abilities</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {item.keyAbilities.map((ability, idx) => (
                      <li key={idx} className="text-gray-700 text-xs">{ability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} FinnQuest - Building Financial Futures
        </div>
      </div>
    </>
  );
}