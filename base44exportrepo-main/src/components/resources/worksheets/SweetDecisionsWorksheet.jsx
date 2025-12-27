import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import ImageWithLoader from '@/components/ui/ImageWithLoader';

export default function SweetDecisionsWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('sweet-decisions-worksheet');
    const printWindow = window.open('', '', 'width=900,height=1100');

    if (printWindow) {
      // Get all stylesheets
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
            <title>Sweet Decisions: My Income & Expenses</title>
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
              }
              .worksheet-container {
                font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
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
          <h2 className="text-xl font-bold text-[#3448C5]">Year 4: Income & Expenses</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] hover:bg-[#2a3a9f] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div 
            id="sweet-decisions-worksheet"
            className="bg-white shadow-xl mx-auto p-6 md:p-8 max-w-[210mm] border"
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-2/3">
                <h1 className="text-2xl font-bold text-fuchsia-500 mb-2 tracking-wide uppercase leading-tight">
                  Sweet Decisions:<br/>My Income & Expenses
                </h1>
              </div>
              <div className="w-1/3 space-y-2 text-sm">
                <div className="flex gap-2 items-end">
                  <span className="font-bold">Name:</span> 
                  <span className="border-b-2 border-black flex-1 h-6"></span>
                </div>
                <div className="flex gap-2 items-end">
                  <span className="font-bold">Date:</span> 
                  <span className="border-b-2 border-black flex-1 h-6"></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Part 1 */}
              <div className="section-box border-4 border-[#3448C5] rounded-2xl p-3 bg-white shadow-[4px_4px_0px_#bfdbfe]">
                <h3 className="text-lg font-bold text-[#3448C5] mb-2 flex items-center gap-2">
                  <span className="bg-[#3448C5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Part 1: What is it?
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-sky-50 border-2 dashed border-[#3448C5] p-3 rounded-xl">
                    <div className="text-sky-600 font-bold text-sm mb-1">Income means:</div>
                    <div className="border-b-2 border-sky-200 h-8 w-full"></div>
                    <div className="border-b-2 border-sky-200 h-8 w-full mt-2"></div>
                  </div>
                  
                  <div className="bg-sky-50 border-2 dashed border-[#3448C5] p-3 rounded-xl">
                    <div className="text-sky-600 font-bold text-sm mb-1">Expense means:</div>
                    <div className="border-b-2 border-sky-200 h-8 w-full"></div>
                    <div className="border-b-2 border-sky-200 h-8 w-full mt-2"></div>
                  </div>
                </div>
              </div>

              {/* Part 2 */}
              <div className="section-box border-4 border-[#35D0BA] rounded-2xl p-3 bg-white shadow-[4px_4px_0px_#99f6e4]">
                <h3 className="text-lg font-bold text-[#0d9488] mb-2 flex items-center gap-2">
                  <span className="bg-[#35D0BA] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Part 2: Sweet Sort!
                </h3>
                <p className="mb-2 italic text-gray-600 text-xs">Circle <strong>INCOME</strong> or <strong>EXPENSE</strong>:</p>
                
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Pocket money from parents.",
                    "Buy a new pencil.",
                    "Sell old toys.",
                    "Pay for cinema ticket.",
                    "Find 5 AED on street.",
                    "Buy lunch at canteen.",
                    "Friend pays you back.",
                    "Pay for a haircut."
                  ].map((item, i) => (
                    <li key={i} className="flex flex-col justify-between py-1 border-b border-dashed border-gray-300">
                      <span className="flex gap-2 text-xs">
                        <span className="font-bold text-[#0d9488]">{i + 1}.</span> {item}
                      </span>
                      <div className="font-mono text-[10px] font-bold text-gray-400 whitespace-nowrap self-end mt-1">
                        INCOME / EXPENSE
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Part 3 */}
              <div className="section-box border-4 border-[#f472b6] rounded-2xl p-3 bg-white shadow-[4px_4px_0px_#fbcfe8]">
                <h3 className="text-lg font-bold text-[#db2777] mb-2 flex items-center gap-2">
                  <span className="bg-[#f472b6] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  Part 3: My Sweet Shop!
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-2">
                   <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-700 text-xs">Shop Name:</span>
                      <div className="border-b-2 border-gray-400 w-full h-6"></div>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-700 text-xs">Sweets to sell:</span>
                      <div className="border-b-2 border-gray-400 w-full h-6"></div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="font-bold text-[#db2777] text-xs mb-1">3 Income examples:</h4>
                    <ol className="list-decimal pl-5 space-y-2 marker:text-[#db2777] marker:font-bold text-sm">
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#db2777] text-xs mb-1">3 Expense examples:</h4>
                    <ol className="list-decimal pl-5 space-y-2 marker:text-[#db2777] marker:font-bold text-sm">
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                      <li><div className="border-b-2 border-gray-300 h-7"></div></li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Part 4 */}
              <div className="section-box border-4 border-[#8b5cf6] rounded-2xl p-3 bg-white shadow-[4px_4px_0px_#ddd6fe] relative overflow-hidden">
                <h3 className="text-lg font-bold text-[#7c3aed] mb-2 flex items-center gap-2">
                  <span className="bg-[#8b5cf6] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                  Part 4: Sweet Thinking!
                </h3>
                
                <p className="font-medium text-gray-700 text-sm mb-2">Why must Captain Caramel understand income and expenses?</p>
                
                <div className="space-y-6 bg-[linear-gradient(transparent_29px,#ddd6fe_30px)] bg-[length:100%_30px] leading-[30px] pt-[2px]">
                  <div className="h-[30px] w-full"></div>
                  <div className="h-[30px] w-full"></div>
                  <div className="h-[30px] w-full"></div>
                </div>
              </div>
            </div>

            {/* Footer / Logo */}
            <div className="mt-3 flex justify-between items-end border-t-2 border-gray-100 pt-2">
               <div className="text-[10px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
               <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
                alt="FinnQuest" 
                className="w-12 h-auto opacity-80"
              />
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}