import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, X, StickyNote } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTrigger } from '@/components/ui/dialog';

export default function PercentageDiscountsWorksheet({ trigger, open, onOpenChange }) {
  const contentRef = useRef(null);

  const handlePrint = () => {
    const printContent = document.getElementById('percentage-discounts-worksheet');
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
            <title>Biofarm Manager: Percentage Proficiency</title>
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
          <h2 className="text-xl font-bold text-[#3448C5]">Year 6: Percentage Discounts & Planning</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] hover:bg-[#2a3a9f] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div 
            id="percentage-discounts-worksheet"
            className="bg-white shadow-xl mx-auto p-6 md:p-8 max-w-[210mm] border"
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4 border-b-2 border-[#3448C5] pb-2">
              <div className="w-3/4">
                <h1 className="text-2xl font-bold text-[#3448C5] uppercase tracking-wide leading-tight">
                  Biofarm Manager:<br/>
                  <span className="text-lg text-gray-600">Financial Planning & Percentages</span>
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

             {/* Introduction */}
             <div className="mb-4 text-xs bg-gray-50 p-2 rounded border border-gray-200">
                <p><strong>Goal:</strong> Apply financial skills from <em>Biofarm Manager</em> to real life. Practice calculating property costs, contractor fees, and percentage discounts.</p>
             </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Part 1: Property Purchase */}
              <div className="border-2 border-green-200 rounded-lg p-3 bg-green-50">
                <h3 className="font-bold text-green-700 text-sm mb-2 uppercase">Part 1: Property & Fees</h3>
                <p className="text-[10px] mb-2 text-gray-600">In the game, you paid extra fees to buy land. In real life, buying a house involves hidden costs too.</p>
                
                <div className="space-y-2 text-xs">
                   <div className="bg-white p-2 rounded border border-green-100">
                      <p className="font-bold mb-1">Scenario A:</p>
                      <p className="text-[10px]">House Price: £200,000. Fee: 1%.</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span>Fee Amount: £</span>
                        <div className="border-b border-gray-300 w-16 h-3"></div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span>Total Cost: £</span>
                        <div className="border-b border-gray-300 w-16 h-3"></div>
                      </div>
                   </div>

                   <div className="bg-white p-2 rounded border border-green-100">
                      <p className="font-bold mb-1">Scenario B:</p>
                      <p className="text-[10px]">House Price: £150,000. Fee: 2%.</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span>Fee Amount: £</span>
                        <div className="border-b border-gray-300 w-16 h-3"></div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Part 2: Contractors */}
              <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50">
                <h3 className="font-bold text-blue-700 text-sm mb-2 uppercase">Part 2: Renovations & Discounts</h3>
                <p className="text-[10px] mb-2 text-gray-600">Contractors sometimes offer discounts. Calculate the final price.</p>
                
                <div className="space-y-2 text-xs">
                    <div className="bg-white p-2 rounded border border-blue-100">
                      <p className="font-bold mb-1">Quote A:</p>
                      <p className="text-[10px]">Cost: £5,000. Discount: 10%.</p>
                      <div className="flex items-center gap-1 mt-1">
                         <span>Discount: £</span><div className="border-b border-gray-300 w-12 h-3"></div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                         <span>Final Price: £</span><div className="border-b border-gray-300 w-12 h-3"></div>
                      </div>
                    </div>

                    <div className="bg-white p-2 rounded border border-blue-100">
                      <p className="font-bold mb-1">Quote B:</p>
                      <p className="text-[10px]">Cost: £8,000. Discount: 25%.</p>
                      <div className="flex items-center gap-1 mt-1">
                         <span>Discount: £</span><div className="border-b border-gray-300 w-12 h-3"></div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                         <span>Final Price: £</span><div className="border-b border-gray-300 w-12 h-3"></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Part 3: Financial Planning */}
                <div className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
                    <h3 className="font-bold text-purple-700 text-sm mb-2 uppercase">Part 3: Budget Planner</h3>
                    <p className="text-[10px] mb-2 text-gray-600">Plan a budget for a new project. Remember, borrowing money (loans) costs extra due to interest.</p>

                    <div className="bg-white p-2 rounded border border-purple-100 text-xs">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="font-normal text-[10px] text-gray-500 pb-1">Item</th>
                                    <th className="font-normal text-[10px] text-gray-500 pb-1">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="text-[10px]">
                                <tr>
                                    <td className="py-1">Project Materials</td>
                                    <td className="border-b border-gray-300">£</td>
                                </tr>
                                <tr>
                                    <td className="py-1">Labour Costs</td>
                                    <td className="border-b border-gray-300">£</td>
                                </tr>
                                <tr>
                                    <td className="py-1 font-bold">Total Needed</td>
                                    <td className="border-b border-gray-300 font-bold">£</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-2 text-[10px]">
                            <p>If you borrow the Total Needed at 10% interest, how much will you pay back in total?</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span>Total Repayment: £</span><div className="border-b border-gray-300 w-16 h-3"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Part 4: Percentage Proficiency */}
                <div className="border-2 border-orange-200 rounded-lg p-3 bg-orange-50">
                    <h3 className="font-bold text-orange-700 text-sm mb-2 uppercase">Part 4: Real Life Percentages</h3>
                    <div className="space-y-3 text-xs">
                        <div>
                            <p className="mb-1">1. A jacket costs £40. It is on sale for 50% off. What is the new price?</p>
                            <div className="flex items-center gap-1">
                                <span>Answer: £</span><div className="border-b border-gray-300 w-16 h-3"></div>
                            </div>
                        </div>
                        <div>
                            <p className="mb-1">2. You have £100 in savings. The bank gives you 5% interest per year. How much interest do you earn?</p>
                            <div className="flex items-center gap-1">
                                <span>Answer: £</span><div className="border-b border-gray-300 w-16 h-3"></div>
                            </div>
                        </div>
                         <div>
                            <p className="mb-1">3. A meal costs £20. You want to leave a 10% tip. How much is the tip?</p>
                            <div className="flex items-center gap-1">
                                <span>Answer: £</span><div className="border-b border-gray-300 w-16 h-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reflection */}
            <div className="mt-4 border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                 <h3 className="font-bold text-gray-700 text-sm mb-2 uppercase">Reflection</h3>
                 <p className="text-xs font-bold text-gray-700">What is the most important financial lesson you learned from Biofarm Manager?</p>
                 <div className="border-b border-gray-300 w-full h-6 mt-1"></div>
                 <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
                 <div className="border-b border-gray-300 w-full h-6 mt-2"></div>
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