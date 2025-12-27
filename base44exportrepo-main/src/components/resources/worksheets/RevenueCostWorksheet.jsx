import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, X, StickyNote } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTrigger } from '@/components/ui/dialog';

export default function RevenueCostWorksheet({ trigger, open, onOpenChange }) {
  const contentRef = useRef(null);

  const handlePrint = () => {
    const printContent = document.getElementById('revenue-cost-worksheet');
    const printWindow = window.open('', '', 'width=900,height=1100');

    if (printWindow) {
      const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
          try {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('');
          } catch (e) {
            return '';
          }
        })
        .join('\n');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Theme Park Business Plan: Revenue & Cost</title>
            <style>
              ${styles}
              @media print {
                @page { size: A4 portrait; margin: 0.4cm; }
                body { 
                  margin: 0;
                  padding: 0;
                  background: white;
                  -webkit-print-color-adjust: exact !important; 
                  print-color-adjust: exact !important; 
                }
                .print-container {
                  width: 210mm;
                  min-height: 297mm;
                  margin: 0 auto;
                  transform: scale(1.0);
                  transform-origin: top center;
                }
                .no-print { display: none !important; }
              }
              .worksheet-container {
                font-family: 'Inter', sans-serif;
                width: 210mm;
                margin: 0 auto;
                background: white;
                box-sizing: border-box;
              }
            </style>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body onload="window.print(); window.close()">
            <div class="worksheet-container p-6 print-container">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 p-2 border-b">
          <h2 className="text-xl font-bold text-[#3448C5]">Year 5: Revenue & Cost Challenge</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] hover:bg-[#2a3a9f] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div 
            id="revenue-cost-worksheet"
            className="bg-white shadow-xl mx-auto p-6 md:p-8 max-w-[210mm] border"
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4 border-b-2 border-[#3448C5] pb-2">
              <div className="w-3/4">
                <h1 className="text-2xl font-bold text-[#3448C5] uppercase tracking-wide leading-tight">
                  My Theme Park Business Plan:<br/>
                  <span className="text-lg text-gray-600">Revenue & Cost Challenge</span>
                </h1>
              </div>
              <div className="w-1/4 text-right">
                 <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png" 
                  alt="FinnQuest" 
                  className="h-12 w-auto opacity-80 inline-block"
                />
              </div>
            </div>

            {/* Student Info */}
            <div className="flex gap-4 mb-4 text-sm">
              <div className="flex-1 flex items-end gap-2">
                <span className="font-bold text-[#3448C5]">Name:</span>
                <div className="border-b border-gray-300 flex-1 h-4"></div>
              </div>
              <div className="w-1/3 flex items-end gap-2">
                <span className="font-bold text-[#3448C5]">Date:</span>
                <div className="border-b border-gray-300 flex-1 h-4"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Part 1: Basics */}
              <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
                <h3 className="font-bold text-[#3448C5] text-sm mb-2 uppercase">Part 1: The Basics - Revenue vs Cost</h3>
                
                {/* Definitions */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                   <div className="bg-white p-2 rounded border border-blue-100">
                      <strong className="block text-center mb-1 text-green-600">REVENUE</strong>
                      <p className="text-gray-500 italic text-[10px] text-center">Money coming IN to the business.</p>
                   </div>
                   <div className="bg-white p-2 rounded border border-blue-100">
                      <strong className="block text-center mb-1 text-red-500">COST</strong>
                      <p className="text-gray-500 italic text-[10px] text-center">Money going OUT of the business.</p>
                   </div>
                   <div className="bg-white p-2 rounded border border-blue-100">
                      <strong className="block text-center mb-1 text-purple-600">PROFIT</strong>
                      <p className="text-gray-500 italic text-[10px] text-center">Revenue minus Cost.</p>
                   </div>
                </div>

                {/* Brainstorming */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-1">List 3 examples of REVENUE:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">1.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">2.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">3.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-1">List 3 examples of COSTS:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">1.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">2.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                      <div className="flex items-center gap-1"><span className="text-[10px] text-gray-400">3.</span><div className="border-b border-gray-300 w-full h-3"></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Categorizing */}
              <div className="border-2 border-green-200 rounded-lg p-3 bg-green-50">
                <h3 className="font-bold text-green-700 text-sm mb-2 uppercase">Part 2: Sorter Challenge</h3>
                <p className="text-[10px] mb-2 text-gray-600">Place these items in the correct column: <strong>Ticket Sales, Staff Wages, Popcorn Stand, Electricity Bill, Repairs, Souvenir Shop</strong></p>
                
                <div className="grid grid-cols-2 gap-0 border border-green-300 rounded overflow-hidden mb-2">
                  <div className="bg-green-100 p-1 text-center font-bold text-xs border-r border-green-300 text-green-800">REVENUE (Money In)</div>
                  <div className="bg-red-100 p-1 text-center font-bold text-xs text-red-800">COST (Money Out)</div>
                  
                  <div className="bg-white h-24 border-r border-green-300 p-1"></div>
                  <div className="bg-white h-24 p-1"></div>
                </div>
                
                <div className="text-xs">
                   <span className="font-bold text-gray-700">Pick one item and explain WHY:</span>
                   <div className="border-b border-gray-300 w-full h-4 mt-1"></div>
                </div>
              </div>

              {/* Part 3: Designing */}
              <div className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                <h3 className="font-bold text-purple-700 text-sm mb-2 uppercase">Part 3: Designing for Profit</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-xs text-gray-800 mb-1">My Dream Ride Idea:</h4>
                    <div className="border border-gray-300 bg-white h-24 rounded p-1"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-800 mb-1">Financial Plan:</h4>
                    <div className="space-y-1 text-[10px]">
                       <div className="flex justify-between"><span>Revenue Feature:</span> <span className="border-b border-gray-300 w-24"></span></div>
                       <div className="flex justify-between"><span>Another Revenue Feature:</span> <span className="border-b border-gray-300 w-24"></span></div>
                       <div className="flex justify-between"><span>Main Cost:</span> <span className="border-b border-gray-300 w-24"></span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 4: Reflection */}
              <div className="border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
                <h3 className="font-bold text-orange-700 text-sm mb-2 uppercase">Part 4: Reflection</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold text-gray-700">How did your choices in the game affect your profit?</p>
                    <div className="border-b border-gray-300 w-full h-6 mt-1"></div>
                    <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
                    <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">One thing I would do differently next time to make more money:</p>
                    <div className="border-b border-gray-300 w-full h-6 mt-1"></div>
                    <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
                    <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-end border-t border-gray-200 pt-2">
               <div className="text-[10px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}