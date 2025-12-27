import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Printer, StickyNote } from 'lucide-react';

export default function ValuePriceWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('value-price-worksheet');
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
          <title>Value vs Price Worksheet</title>
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
            .section-title {
                color: #3448C5;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 0.8rem;
                border-bottom: 2px solid #3448C5;
                margin-bottom: 0.5rem;
                padding-bottom: 2px;
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
          <h2 className="text-xl font-bold text-[#3448C5]">Year 3: Value vs Price</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div id="value-price-worksheet" className="bg-white p-6 md:p-8 max-w-[210mm] mx-auto border shadow-sm text-xs">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b-2 border-[#3448C5] pb-2">
            <div>
              <h1 className="text-2xl font-bold text-[#3448C5] mb-0">Value vs Price</h1>
              <p className="text-gray-600 font-medium text-xs">Finnoria • Financial Literacy</p>
            </div>
            <div className="text-right">
               <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png" 
                alt="FinnQuest" 
                className="h-10 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Student Details */}
          <div className="flex gap-6 mb-4 bg-blue-50 p-2 rounded border border-blue-100">
            <div className="flex-1 flex items-end gap-2">
              <label className="text-[#3448C5] font-bold text-xs uppercase tracking-wider mb-1">Name:</label>
              <div className="border-b-2 border-[#3448C5] border-dashed flex-1 h-4"></div>
            </div>
            <div className="w-32 flex items-end gap-2">
              <label className="text-[#3448C5] font-bold text-xs uppercase tracking-wider mb-1">Year:</label>
              <div className="border-b-2 border-[#3448C5] border-dashed flex-1 h-4"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Section 1: Definitions */}
            <div>
                <h3 className="section-title">1. What are Price and Value?</h3>
                <div className="space-y-2 bg-gray-50 p-2 rounded border border-gray-100">
                    <div className="flex gap-1 items-baseline">
                        <span className="font-bold">Price</span> is how much something costs in <span className="inline-block border-b border-black w-16 text-center text-gray-400 italic">______</span>.
                    </div>
                    <div className="flex gap-1 items-baseline">
                        <span className="font-bold">Value</span> is how important or <span className="inline-block border-b border-black w-16 text-center text-gray-400 italic">______</span> something is to us.
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold">True or False:</span>
                        <span>Something with high value always has a high price.</span>
                        <div className="border border-gray-400 w-8 h-4"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold">True or False:</span>
                        <span>Money helps us understand the price of things.</span>
                        <div className="border border-gray-400 w-8 h-4"></div>
                    </div>
                </div>
            </div>

            {/* Section 2: Sorting */}
            <div>
                <h3 className="section-title">2. Sort Objects</h3>
                <div className="text-[10px] text-gray-500 mb-1 italic">
                    House, Pencil, Car, Apple, Diamond, Socks, Laptop, Pizza Slice
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-red-200 bg-red-50 rounded p-1 h-32">
                        <div className="text-center font-bold text-red-600 mb-1 uppercase text-[10px]">Expensive</div>
                        <div className="space-y-1">
                             <div className="border-b border-red-200 h-3"></div>
                             <div className="border-b border-red-200 h-3"></div>
                             <div className="border-b border-red-200 h-3"></div>
                             <div className="border-b border-red-200 h-3"></div>
                        </div>
                    </div>
                    <div className="border-2 border-green-200 bg-green-50 rounded p-1 h-32">
                        <div className="text-center font-bold text-green-600 mb-1 uppercase text-[10px]">Cheap</div>
                        <div className="space-y-1">
                             <div className="border-b border-green-200 h-3"></div>
                             <div className="border-b border-green-200 h-3"></div>
                             <div className="border-b border-green-200 h-3"></div>
                             <div className="border-b border-green-200 h-3"></div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
             {/* Section 3: Matching */}
            <div>
                <h3 className="section-title">3. Price Matching</h3>
                <div className="flex justify-between px-2 text-[10px] italic text-gray-500 mb-1">
                    <span>Draw lines to connect</span>
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-100 flex justify-between items-center text-[11px]">
                    <div className="space-y-2 font-medium">
                        <div>Chocolate Bar</div>
                        <div>Bike</div>
                        <div>iPad</div>
                        <div>T-Shirt</div>
                        <div>Apple</div>
                    </div>
                    <div className="space-y-2 text-center w-8">
                        <div>•</div><div>•</div><div>•</div><div>•</div><div>•</div>
                    </div>
                    <div className="space-y-2 font-bold text-right text-[#3448C5]">
                        <div>£250.00</div>
                        <div>£1.50</div>
                        <div>£20.00</div>
                        <div>£100.00</div>
                        <div>£0.60</div>
                    </div>
                </div>
            </div>

             {/* Section 4: Homework */}
             <div>
                <h3 className="section-title">4. Homework Corner</h3>
                <div className="space-y-1 text-[10px]">
                    <div className="flex gap-2">
                        <span className="font-bold">1.</span>
                        <div className="flex-1">
                            Objects with high value are always expensive.
                            <div className="flex gap-2 mt-0.5">
                                <span className="border rounded px-1">True</span>
                                <span className="border rounded px-1">False</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold">2.</span>
                        <div className="flex-1">
                            A diamond is <span className="border-b border-black w-8 inline-block"></span> valuable than a pencil.
                            <div className="flex gap-1 mt-0.5 text-[9px] text-gray-600">
                                (less / more / equally)
                            </div>
                        </div>
                    </div>
                     <div className="flex gap-2">
                        <span className="font-bold">3.</span>
                        <div className="flex-1">
                            Something cheap has a <span className="border-b border-black w-8 inline-block"></span> price.
                            <div className="flex gap-1 mt-0.5 text-[9px] text-gray-600">
                                (high / low / medium)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 5: Reflection */}
          <div className="mt-4">
            <h3 className="section-title">5. Reflect and Create</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded p-2">
                    <p className="font-bold mb-1 text-[10px]">Name one thing that has high value to you but a low price. Why?</p>
                    <div className="border-b border-gray-200 h-6 mt-2"></div>
                    <div className="border-b border-gray-200 h-6 mt-3"></div>
                    <div className="border-b border-gray-200 h-6 mt-3"></div>
                </div>
                 <div className="border border-gray-200 rounded p-2">
                    <p className="font-bold mb-1 text-[10px]">Explain the difference between price and value:</p>
                    <div className="border-b border-gray-200 h-6 mt-2"></div>
                    <div className="border-b border-gray-200 h-6 mt-3"></div>
                    <div className="border-b border-gray-200 h-6 mt-3"></div>
                </div>
            </div>
             <div className="mt-4 border border-gray-200 rounded p-2 bg-gray-50">
                <p className="font-bold mb-1 text-[10px]">Creative Challenge: Design a new currency coin for Finnoria!</p>
                <div className="h-32 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300"></div>
                </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center opacity-50 border-t pt-1">
             <div className="text-[9px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}