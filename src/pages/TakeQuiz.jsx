import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Calendar, CheckCircle, Lock } from 'lucide-react';
import Header from '../components/finquest/Header';
import Footer from '../components/finquest/Footer';

export default function TakeQuiz() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#3448C5] mb-4">Weekly Quizzes</h1>
            <p className="text-xl text-gray-600">Test your financial knowledge and earn bonus points!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Active Quiz */}
            <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-[#35D0BA] transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Active</span>
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Brain className="w-6 h-6 text-[#3448C5]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Financial Basics</h3>
                <p className="text-gray-600 text-sm mb-6">Test your understanding of needs vs wants and basic budgeting concepts.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: Friday
                  </div>
                  <span className="text-[#3448C5] font-bold text-sm">100 pts</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Completed Quiz */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Completed</span>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-700">Introduction to Saving</h3>
                <p className="text-gray-500 text-sm mb-6">You scored 8/10 on this quiz.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-400 text-xs font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    Past
                  </div>
                  <span className="text-gray-500 font-bold text-sm">80 pts earned</span>
                </div>
              </CardContent>
            </Card>

            {/* Locked Quiz */}
            <Card className="bg-gray-50 border-gray-200 opacity-75">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Locked</span>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-700">Smart Shopping</h3>
                <p className="text-gray-500 text-sm mb-6">Complete previous modules to unlock this quiz.</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-gray-400 text-xs font-medium">
                    <Calendar className="w-4 h-4 mr-1" />
                    Coming Soon
                  </div>
                  <span className="text-gray-400 font-bold text-sm">??? pts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}