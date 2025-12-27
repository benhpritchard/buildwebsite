import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Target, Printer } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';
import { createPageUrl } from '@/utils';
import { learningObjectives, yearTopics } from '../components/games/gameData';

export default function AssessmentPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const classId = queryParams.get('classId');
  const [selectedTerm, setSelectedTerm] = useState('1.1');
  
  // Parse terms from yearTopics based on index (1.1, 1.2, 2.1, etc.)
  const terms = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2'];

  // Fetch class details
  const { data: classDetails } = useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      const classes = await base44.entities.Class.filter({ id: classId });
      return classes[0];
    },
    enabled: !!classId,
  });

  // Fetch students
  const { data: students = [] } = useQuery({
    queryKey: ['students', classId],
    queryFn: () => base44.entities.Student.filter({ class_id: classId }),
    enabled: !!classId,
  });

  // Fetch assessments
  const { data: assessments = [] } = useQuery({
    queryKey: ['assessments', classId, selectedTerm],
    queryFn: () => base44.entities.Assessment.filter({ class_id: classId, term: selectedTerm }),
    enabled: !!classId && !!selectedTerm,
  });

  const getScoreColor = (score) => {
    if (score === undefined || score === null) return 'bg-gray-100';
    if (score >= 75) return 'bg-blue-500 text-white';
    if (score >= 41) return 'bg-green-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getTopicTitle = (termIndex) => {
    if (!classDetails?.year_group) return '';
    const topics = yearTopics[classDetails.year_group];
    return topics && topics[termIndex] ? topics[termIndex].title : '';
  };

  const currentTopicTitle = getTopicTitle(terms.indexOf(selectedTerm));
  const currentObjectives = classDetails?.year_group && learningObjectives[classDetails.year_group]?.[currentTopicTitle];

  const handlePrint = () => {
    window.print();
  };

  if (!classDetails) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: landscape;
            margin: 0.5cm;
          }
          
          /* Optimize table layout for print */
          table {
            width: 100%;
            table-layout: fixed;
            font-size: 9px !important;
          }
          
          th, td {
            padding: 4px !important;
            min-width: auto !important;
          }
          
          th:first-child, td:first-child {
            width: 15% !important;
          }
          
          th:not(:first-child):not(:last-child), 
          td:not(:first-child):not(:last-child) {
            width: 12% !important;
          }
          
          th:last-child, td:last-child {
            width: 10% !important;
          }
          
          .text-xs {
            font-size: 7px !important;
          }
          
          h1 {
            font-size: 18px !important;
            margin-bottom: 4px !important;
          }
          
          h2 {
            font-size: 14px !important;
          }
          
          .rounded-full {
            width: 28px !important;
            height: 28px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gray-50">
        <div className="no-print">
          <Header />
        </div>
      
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print-content">
        <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button 
                    variant="outline" 
                    onClick={() => window.location.href = createPageUrl('AdminDashboard')}
                    className="gap-2 no-print"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Assessment Data - Term {selectedTerm}</h1>
                    <p className="text-gray-600">{classDetails.name} • {classDetails.year_group}</p>
                </div>
            </div>
            <Button 
                onClick={handlePrint}
                className="bg-[#35D0BA] hover:bg-[#2ab89f] gap-2 no-print"
            >
                <Printer className="w-4 h-4" /> Print Assessment Data
            </Button>
        </div>

        {/* Term Selection */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-print">
            {terms.map((term, index) => (
                <button
                    key={term}
                    onClick={() => setSelectedTerm(term)}
                    className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
                        selectedTerm === term 
                        ? 'bg-[#3448C5] text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    Term {term}
                </button>
            ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Header with Topic Info */}
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-2xl font-bold text-[#3448C5] flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    {currentTopicTitle || 'Select a Term'}
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="sticky left-0 bg-white z-10 p-4 text-left border-b-2 border-r border-gray-200 font-bold text-gray-700 min-w-[200px] shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]">
                                Student Name
                            </th>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <th key={num} className="p-4 text-left border-b-2 border-gray-200 min-w-[200px] align-top">
                                    <div className="mb-2 font-bold text-[#3448C5]">Lesson {num}</div>
                                    <div className="text-xs font-normal text-gray-600 italic">
                                        {currentObjectives?.[num] || 'No objective set'}
                                    </div>
                                </th>
                            ))}
                            <th className="p-4 text-center border-b-2 border-gray-200 min-w-[120px] align-top">
                                <div className="mb-2 font-bold text-[#3448C5]">Topic Average</div>
                                <div className="text-xs font-normal text-gray-600 italic">
                                    Average of 6 lessons
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            const studentScores = [];
                            for (let i = 1; i <= 6; i++) {
                                const assessment = assessments.find(a => 
                                    a.student_id === student.id && 
                                    a.lesson_number === i
                                );
                                if (assessment?.score !== undefined && assessment?.score !== null) {
                                    studentScores.push(assessment.score);
                                }
                            }
                            const average = studentScores.length > 0 
                                ? Math.round(studentScores.reduce((a, b) => a + b, 0) / studentScores.length)
                                : null;

                            return (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="sticky left-0 bg-white z-10 p-4 border-b border-r border-gray-200 font-medium text-gray-900 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]">
                                        {student.name}
                                    </td>
                                    {[1, 2, 3, 4, 5, 6].map(lessonNum => {
                                        const assessment = assessments.find(a => 
                                            a.student_id === student.id && 
                                            a.lesson_number === lessonNum
                                        );
                                        const score = assessment?.score;
                                        
                                        return (
                                            <td key={lessonNum} className="p-4 border-b border-gray-200 text-center">
                                                <div className={`
                                                    inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shadow-sm
                                                    ${getScoreColor(score)}
                                                `}>
                                                    {score !== undefined ? score : '-'}
                                                </div>
                                            </td>
                                        );
                                    })}
                                    <td className="p-4 border-b border-gray-200 text-center">
                                        <div className={`
                                            inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shadow-sm
                                            ${getScoreColor(average)}
                                        `}>
                                            {average !== null ? average : '-'}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Key Legend */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col items-center gap-3">
                <span className="text-sm text-gray-500 italic">FinnQuests rough guide</span>
                <div className="flex flex-wrap gap-6 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-gray-700">Emerging (0-40)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-700">Expected (41-74)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium text-gray-700">Exceeding (75+)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="no-print">
        <Footer />
      </div>
    </div>
    </>
  );
}