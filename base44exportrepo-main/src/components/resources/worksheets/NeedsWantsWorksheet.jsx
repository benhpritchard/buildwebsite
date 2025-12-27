import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Printer, FileText } from 'lucide-react';

export default function NeedsWantsWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('needs-wants-worksheet');
    const printWindow = window.open('', '', 'width=800,height=1100');
    
    // Get all stylesheets from the current document
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
      <html>
        <head>
          <title>Needs vs Wants Worksheet</title>
          <style>
            ${styles}
            @media print {
              @page { margin: 0.4cm; size: A4 portrait; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; padding: 0; }
              .no-print { display: none !important; }
              .print-scale { transform: scale(1.0); transform-origin: top center; }
            }
            /* Custom Print Styles */
            .worksheet-container {
              font-family: 'Inter', sans-serif;
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              position: relative;
              box-sizing: border-box;
            }
          </style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body onload="window.print(); window.close()">
          <div class="worksheet-container p-6 print-scale">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 p-2 border-b">
          <h2 className="text-xl font-bold text-[#3448C5]">Year 2: Needs vs Wants</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div id="needs-wants-worksheet" className="bg-white p-6 md:p-8 max-w-[210mm] mx-auto border shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b-2 border-[#3448C5] pb-2">
            <div>
              <h1 className="text-2xl font-bold text-[#3448C5] mb-0">Needs vs Wants</h1>
              <p className="text-gray-600 font-medium text-sm">Ro-Bo Learns • Financial Literacy</p>
            </div>
            <div className="text-right">
               <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png" 
                alt="FinnQuest" 
                className="h-12 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Student Details */}
          <div className="flex gap-6 mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex-1 flex items-end gap-2">
              <label className="text-[#3448C5] font-bold text-sm uppercase tracking-wider mb-1">Name:</label>
              <div className="border-b-2 border-[#3448C5] border-dashed flex-1 h-6"></div>
            </div>
            <div className="w-40 flex items-end gap-2">
              <label className="text-[#3448C5] font-bold text-sm uppercase tracking-wider mb-1">Year:</label>
              <div className="border-b-2 border-[#3448C5] border-dashed flex-1 h-6"></div>
            </div>
          </div>

          {/* Definitions - More Compact */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200 text-center flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">💧</div>
              <h3 className="text-lg font-bold text-[#3448C5] mb-1 uppercase leading-none">Needs</h3>
              <p className="text-xs text-gray-700 leading-tight font-medium">Things we must have to stay alive, healthy, and safe.</p>
              <p className="text-[10px] text-gray-500 mt-1 italic">(e.g. Water, Food, Shelter)</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-3 border-2 border-pink-200 text-center flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">🎮</div>
              <h3 className="text-lg font-bold text-pink-600 mb-1 uppercase leading-none">Wants</h3>
              <p className="text-xs text-gray-700 leading-tight font-medium">Things we would like to have for fun or comfort.</p>
              <p className="text-[10px] text-gray-500 mt-1 italic">(e.g. Toys, Sweets, Games)</p>
            </div>
          </div>

          {/* Activity 1: Sort - Compact */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#3448C5] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center font-bold">1</span>
              <h3 className="text-lg font-bold text-gray-800">Sort the Items</h3>
              <span className="text-gray-500 text-xs italic ml-2">(Draw a line from the item to the correct box)</span>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center max-w-xl mx-auto">
              {/* Needs Box */}
              <div className="border-4 border-[#3448C5] rounded-lg p-3 h-32 flex items-center justify-center bg-blue-50">
                <span className="text-xl font-bold text-[#3448C5] uppercase tracking-widest">NEEDS</span>
              </div>

              {/* Items List - Compact */}
              <div className="space-y-2">
                {['Water Bottle', 'Video Game', 'Warm Coat', 'Candy Bar', 'Medicine', 'Toy Robot'].map((item, i) => (
                  <div key={i} className="bg-gray-100 py-1 px-2 rounded text-center text-xs font-bold text-gray-700 border border-gray-200 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>

              {/* Wants Box */}
              <div className="border-4 border-pink-500 rounded-lg p-3 h-32 flex items-center justify-center bg-pink-50">
                <span className="text-xl font-bold text-pink-500 uppercase tracking-widest">WANTS</span>
              </div>
            </div>
          </div>

          {/* Activity 2: My Examples - Compact */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#3448C5] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center font-bold">2</span>
              <h3 className="text-lg font-bold text-gray-800">My Examples</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pl-8">
              <div>
                <h4 className="font-bold text-[#3448C5] mb-2 flex items-center gap-2 text-sm">
                  <span>3 Things I</span>
                  <span className="bg-[#3448C5] text-white px-1.5 py-0.5 rounded text-xs">NEED</span>
                </h4>
                <div className="space-y-2">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="flex items-end gap-2">
                      <span className="font-bold text-gray-400 w-3 text-xs">{num}.</span>
                      <div className="border-b-2 border-gray-300 flex-1 h-5"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-pink-600 mb-2 flex items-center gap-2 text-sm">
                  <span>3 Things I</span>
                  <span className="bg-pink-500 text-white px-1.5 py-0.5 rounded text-xs">WANT</span>
                </h4>
                <div className="space-y-3">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="flex items-end gap-2">
                      <span className="font-bold text-gray-400 w-3 text-xs">{num}.</span>
                      <div className="border-b-2 border-gray-300 flex-1 h-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center opacity-50 border-t pt-2">
             <div className="text-[10px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}