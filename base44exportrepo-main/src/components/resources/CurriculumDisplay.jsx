import React from 'react';
import { BookOpen, Target, CheckCircle2, Lightbulb, ListChecks, Printer, Download, Link as LinkIcon, Accessibility, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CurriculumDisplay({ data, year, locked }) {
  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-xl">Curriculum data coming soon for {year}.</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Helper for locked sections
  const LockedSection = ({ title, icon: Icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 text-gray-400">
        {Icon && <Icon className="w-6 h-6" />}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center">
          <div className="text-3xl">🔒</div>
        </div>
      </div>
    </div>
  );

  // If locked, we still want to show the structure but with locks
  if (locked) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header Section - Always visible */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl p-8 text-white shadow-lg mb-8">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
            {year}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            {data.title} <span className="text-2xl opacity-80">🔒</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 h-96">
          <LockedSection title="Overview & Knowledge" icon={BookOpen} />
          <LockedSection title="Skills & Concepts" icon={Target} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 h-96">
          <LockedSection title="Objectives & Success Criteria" icon={CheckCircle2} />
          <LockedSection title="Progression & Links" icon={TrendingUp} />
        </div>
        
        <div className="h-64">
           <LockedSection title="Half-Term Overview" icon={ListChecks} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body * {
            visibility: hidden;
          }
          #curriculum-printable-area, #curriculum-printable-area * {
            visibility: visible;
          }
          #curriculum-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide the print button specifically when printing */
          .no-print {
            display: none !important;
          }
          /* Force background colors to show */
          .bg-gradient-to-r {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-white {
            background-color: white !important;
          }
        }
      `}</style>

      <div className="flex justify-end mb-4 no-print">
        <Button 
          onClick={handlePrint}
          className="bg-[#3448C5] hover:bg-[#2a3a9e] text-white gap-2 shadow-md"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </Button>
      </div>

      <div id="curriculum-printable-area">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#3448C5] to-[#5E6FD6] rounded-2xl p-8 text-white shadow-lg print:shadow-none mb-8">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm print:bg-white print:text-[#3448C5] print:border print:border-[#3448C5]">
            {year}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
        </div>

      {/* Overview Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Purpose & Core Knowledge */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-[#3448C5]">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold">Overview & Knowledge</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Purpose</h3>
              <ul className="space-y-2">
                {data.overview.purpose.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Core Knowledge</h3>
              <ul className="space-y-2">
                {data.overview.coreKnowledge.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Skills & Concepts */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-[#35D0BA]">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-bold">Skills & Concepts</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Core Skills</h3>
              <ul className="space-y-2">
                {data.overview.coreSkills.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Core Concepts</h3>
              <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                {data.overview.coreConcepts}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives & Success Criteria */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6 text-orange-500">
          <CheckCircle2 className="w-7 h-7" />
          <h2 className="text-2xl font-bold text-gray-900">Objectives & Success Criteria</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Learning Objectives</h3>
            <ul className="space-y-3">
              {data.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Success Criteria</h3>
            <ul className="space-y-3">
              {data.successCriteria.map((sc, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  {sc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-orange-50 p-4 rounded-xl border border-orange-100">
          <div className="flex items-center gap-2 mb-2 font-bold text-orange-800">
            <Lightbulb className="w-4 h-4" />
            Key Vocabulary
          </div>
          <p className="text-orange-700 text-sm leading-relaxed">
            {data.vocabulary}
          </p>
        </div>
      </div>

      {/* Adaptations & Links Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Adaptations */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <Accessibility className="w-6 h-6" />
            <h2 className="text-xl font-bold">Adaptations</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">SEND</h3>
              <ul className="space-y-2">
                {data.adaptations?.send?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">ELL</h3>
              <ul className="space-y-2">
                {data.adaptations?.ell?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Progression & Links */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <TrendingUp className="w-6 h-6" />
            <h2 className="text-xl font-bold">Progression & Links</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Progression Summary</h3>
              <ul className="space-y-2">
                {data.progressionSummary?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Cross-Curricular Links</h3>
              <div className="flex flex-wrap gap-2">
                {data.crossCurricularLinks?.map((link, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded border border-blue-100">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Half Term Overview Table */}
      {data.halfTermOverview && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <ListChecks className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">Half-Term Overview</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b w-24">Term</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b w-40">Unit Title</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Core Knowledge</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Skills Developed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.halfTermOverview.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 text-sm font-bold text-[#3448C5]">HT{i + 1}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900">{row.unit}</td>
                    <td className="p-4 text-sm text-gray-600">{row.knowledge}</td>
                    <td className="p-4 text-sm text-gray-600">{row.skills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}