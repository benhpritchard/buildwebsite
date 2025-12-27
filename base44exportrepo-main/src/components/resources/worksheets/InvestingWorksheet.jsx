import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function InvestingWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('investing-worksheet-content');
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
            <title>Investing Worksheet</title>
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

  const content = (
    <>
      <DialogHeader className="flex flex-row items-center justify-between pr-8">
        <DialogTitle className="text-2xl font-bold text-[#3448C5]">Investing Worksheet</DialogTitle>
        <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
          <Printer className="w-4 h-4" /> Print
        </Button>
      </DialogHeader>

      <div id="investing-worksheet-content" className="py-4 px-2 text-xs">
        {/* Header */}
        <div className="flex justify-between items-start mb-2 border-b-2 border-[#3448C5] pb-2">
          <div className="w-3/4">
            <h1 className="text-lg font-bold text-[#3448C5] uppercase tracking-wide leading-tight">
              Stock Market Investing - Trading Day<br/>
              <span className="text-xs text-gray-600">Worksheet</span>
            </h1>
          </div>
          <div className="w-1/4 text-right">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png" 
              alt="FinnQuest" 
              className="h-8 w-auto opacity-80 inline-block"
            />
          </div>
        </div>

        {/* Student Info */}
        <div className="flex gap-3 mb-2 text-xs">
          <div className="flex-1 flex items-end gap-2">
            <span className="font-bold text-[#3448C5]">Name:</span>
            <div className="border-b border-gray-300 flex-1 h-3"></div>
          </div>
          <div className="w-1/4 flex items-end gap-2">
            <span className="font-bold text-[#3448C5]">Year:</span>
            <div className="border-b border-gray-300 flex-1 h-3"></div>
          </div>
          <div className="w-1/4 flex items-end gap-2">
            <span className="font-bold text-[#3448C5]">Date:</span>
            <div className="border-b border-gray-300 flex-1 h-3"></div>
          </div>
        </div>

        {/* Section 1: Vocabulary */}
        <div className="border-2 border-blue-200 rounded p-2 bg-blue-50 mb-2">
          <h3 className="font-bold text-[#3448C5] text-xs mb-1 uppercase">📚 Section 1: Stock Market Vocabulary Challenge</h3>
          <div className="grid grid-cols-2 gap-2 text-[9px] mb-2">
            <div>
              <h4 className="font-bold mb-1">Terms:</h4>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">1. Stock</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">2. Portfolio</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">3. Ticker</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">4. Balance</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">5. Risk</div>
              <div className="p-1 border border-gray-300 rounded bg-white">6. Sector</div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Definitions (Draw lines to match):</h4>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">A collection of all your investments</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">A unique code for a stock (e.g., FTS)</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">Money you have to spend</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">A share of ownership in a company</div>
              <div className="p-1 border border-gray-300 rounded bg-white mb-0.5">The chance of losing money</div>
              <div className="p-1 border border-gray-300 rounded bg-white">An area of the economy (e.g., Tech)</div>
            </div>
          </div>
          <div className="text-[9px]">
            <label className="font-bold block mb-0.5">What does investing mean to you in your own words?</label>
            <div className="border border-gray-300 rounded p-1 bg-white h-8"></div>
          </div>
        </div>

        {/* Section 2: News Analysis */}
        <div className="border-2 border-yellow-200 rounded p-2 bg-yellow-50 mb-2">
          <h3 className="font-bold text-yellow-700 text-xs mb-1 uppercase">📰 Section 2: Market News Analysis & Prediction</h3>
          <div className="bg-white border-2 border-yellow-300 p-1.5 rounded mb-1">
            <h4 className="font-bold text-yellow-800 text-[9px] mb-0.5">Breaking News:</h4>
            <p className="text-[9px]">"Tech Giant 'FinnTech Solutions' Announces Record Profits, While 'SkyFinn Airways' Faces Fuel Price Hikes."</p>
          </div>
          <div className="mb-1">
            <label className="font-bold text-[9px] block mb-0.5">Which stock(s) might increase in value? Why?</label>
            <div className="border-b border-gray-300 h-3"></div>
          </div>
          <div>
            <label className="font-bold text-[9px] block mb-0.5">Which stock(s) might decrease in value? Why?</label>
            <div className="border-b border-gray-300 h-3"></div>
          </div>
        </div>

        {/* Section 3: Trading Decisions */}
        <div className="border-2 border-green-200 rounded p-2 bg-green-50 mb-2">
          <h3 className="font-bold text-green-700 text-xs mb-1 uppercase">💼 Section 3: My Trading Day Decisions (Do this after the simulation and use the information given to you.)</h3>
          <table className="w-full border-collapse text-[8px]">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-300 p-0.5 text-left" style={{width: '10%'}}>Decision</th>
                <th className="border border-green-300 p-0.5 text-left" style={{width: '18%'}}>Stock</th>
                <th className="border border-green-300 p-0.5 text-left" style={{width: '18%'}}>Action</th>
                <th className="border border-green-300 p-0.5 text-left" style={{width: '36%'}}>Reason</th>
                <th className="border border-green-300 p-0.5 text-left" style={{width: '18%'}}>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-green-300 p-0.5">1</td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
              </tr>
              <tr>
                <td className="border border-green-300 p-0.5">2</td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
              </tr>
              <tr>
                <td className="border border-green-300 p-0.5">3</td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
                <td className="border border-green-300 p-0"><div className="border-b border-gray-300 h-3"></div></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Reflection */}
        <div className="border-2 border-purple-200 rounded p-2 bg-purple-50 mb-2">
          <h3 className="font-bold text-purple-700 text-xs mb-1 uppercase">💭 Section 4: Reflection on My Performance</h3>
          <div className="space-y-1 text-[9px]">
            <div>
              <label className="font-bold block mb-0.5">What was the most challenging part of your trading day?</label>
              <div className="border border-gray-300 rounded p-1 bg-white h-8"></div>
            </div>
            <div>
              <label className="font-bold block mb-0.5">If you had another chance, what would you do differently?</label>
              <div className="border border-gray-300 rounded p-1 bg-white h-8"></div>
            </div>
            <div>
              <label className="font-bold block mb-0.5">What is one new thing you learned about investing today?</label>
              <div className="border border-gray-300 rounded p-1 bg-white h-8"></div>
            </div>
          </div>
        </div>

        {/* Section 5: Score */}
        <div className="border-2 border-red-200 rounded p-2 bg-red-50">
          <h3 className="font-bold text-red-700 text-xs mb-1 uppercase">🏆 Section 5: My FinnQuest Trading Score</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border-2 border-red-300 p-2 rounded text-center">
              <label className="block font-bold text-red-700 text-[9px] mb-0.5">Final Portfolio Value</label>
              <div className="border-b-2 border-red-500 mx-auto w-3/4 h-4"></div>
            </div>
            <div className="bg-white border-2 border-red-300 p-2 rounded text-center">
              <label className="block font-bold text-red-700 text-[9px] mb-0.5">FinnQuest Score</label>
              <div className="border-b-2 border-red-500 mx-auto w-3/4 h-4"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 flex justify-between items-end border-t border-gray-200 pt-1">
          <div className="text-[9px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
        </div>
      </div>
    </>
  );

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {content}
      </DialogContent>
    </Dialog>
  );
}