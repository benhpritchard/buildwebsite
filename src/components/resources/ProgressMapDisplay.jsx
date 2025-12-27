import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { progressionData } from './progressionData';

export default function ProgressMapDisplay() {
  const [expandedYear, setExpandedYear] = useState(null);

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          <h2 className="text-3xl font-bold text-gray-900">Progression Map</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A detailed guide to financial literacy learning outcomes from Year 2 to Year 9.
          Click on a year group to explore big ideas and key abilities.
        </p>
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
  );
}