import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTrigger } from '@/components/ui/dialog';

export default function JuniorEnterpriseWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('junior-enterprise-worksheet');
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
            <title>FinnQuest Junior Enterprise Lab - Worksheet</title>
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
          <h2 className="text-xl font-bold text-[#3448C5]">Year 8: Junior Enterprise Lab</h2>
          <Button onClick={handlePrint} className="bg-[#3448C5] hover:bg-[#2a3a9f] gap-2">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div 
            id="junior-enterprise-worksheet"
            className="bg-white shadow-xl mx-auto p-6 md:p-8 max-w-[210mm] border text-xs"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3 border-b-2 border-[#3448C5] pb-2">
              <div className="w-3/4">
                <h1 className="text-xl font-bold text-[#3448C5] uppercase tracking-wide leading-tight">
                  FinnQuest Junior Enterprise Lab<br/>
                  <span className="text-sm text-gray-600">Worksheet</span>
                </h1>
              </div>
              <div className="w-1/4 text-right">
                 <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png" 
                  alt="FinnQuest" 
                  className="h-10 w-auto opacity-80 inline-block"
                />
              </div>
            </div>

            {/* Student Info */}
            <div className="flex gap-4 mb-3 text-xs">
              <div className="flex-1 flex items-end gap-2">
                <span className="font-bold text-[#3448C5]">Name:</span>
                <div className="border-b border-gray-300 flex-1 h-3"></div>
              </div>
              <div className="w-1/4 flex items-end gap-2">
                <span className="font-bold text-[#3448C5]">Year:</span>
                <div className="border-b border-gray-300 flex-1 h-3"></div>
              </div>
            </div>

            {/* Section 1 */}
            <div className="border-2 border-blue-200 rounded-lg p-2 bg-blue-50 mb-2">
              <h3 className="font-bold text-[#3448C5] text-xs mb-1 uppercase">Section 1: My Business Dream & Identity</h3>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[9px]">1. Business Idea:</span>
                  <div className="border-b border-gray-300 flex-1 h-3"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[9px]">2. Name:</span>
                    <div className="border-b border-gray-300 flex-1 h-3"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[9px]">Rating:</span>
                    <div className="border-b border-gray-300 w-8 h-3"></div>
                    <span className="text-[9px]">/10</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-bold text-[9px]">3. Slogan:</span>
                  <div className="border-b border-gray-300 flex-1 h-3"></div>
                  <span className="font-bold text-[9px] ml-2">Rating:</span>
                  <div className="border-b border-gray-300 w-8 h-3"></div>
                  <span className="text-[9px]">/10</span>
                </div>

                <div className="flex items-start gap-1">
                  <span className="font-bold text-[9px] mt-1">4. Logo Description:</span>
                  <div className="flex-1">
                    <div className="border-b border-gray-300 h-3 mb-1"></div>
                    <div className="border-b border-gray-300 h-3"></div>
                  </div>
                  <span className="font-bold text-[9px] ml-2 mt-1">Rating:</span>
                  <div className="border-b border-gray-300 w-8 h-3 mt-1"></div>
                  <span className="text-[9px] mt-1">/10</span>
                </div>

                <div>
                  <p className="font-bold text-[9px] mb-1">5. Reflection: How did you decide on your business name and slogan?</p>
                  <div className="border border-gray-300 rounded p-1 bg-white h-10"></div>
                </div>
              </div>
            </div>

            {/* Section 2 & 3 in Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {/* Section 2 */}
              <div className="border-2 border-green-200 rounded-lg p-2 bg-green-50">
                <h3 className="font-bold text-green-700 text-xs mb-1 uppercase">Section 2: Dream HQ & Cost Reality</h3>
                
                <div className="space-y-1 text-[9px]">
                  <p className="font-bold">Three important items in HQ:</p>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <span>1.</span>
                      <div className="border-b border-gray-300 flex-1 h-2"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>2.</span>
                      <div className="border-b border-gray-300 flex-1 h-2"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>3.</span>
                      <div className="border-b border-gray-300 flex-1 h-2"></div>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center">
                      <span>Upfront Cost:</span>
                      <div className="flex items-center gap-1">
                        <div className="border-b border-gray-300 w-16 h-2"></div>
                        <span>AED</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Loan:</span>
                      <div className="flex items-center gap-1">
                        <div className="border-b border-gray-300 w-16 h-2"></div>
                        <span>AED</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Rent:</span>
                      <div className="flex items-center gap-1">
                        <div className="border-b border-gray-300 w-16 h-2"></div>
                        <span>AED</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold mb-0.5">Were you surprised by costs?</p>
                    <div className="border border-gray-300 rounded p-1 bg-white h-8"></div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="border-2 border-purple-200 rounded-lg p-2 bg-purple-50">
                <h3 className="font-bold text-purple-700 text-xs mb-1 uppercase">Section 3: Credit, Interest & Debt</h3>
                
                <div className="space-y-1 text-[9px]">
                  <div>
                    <p>Credit means using money or items <span className="border-b border-gray-300 inline-block w-12"></span></p>
                    <p>and paying for them <span className="border-b border-gray-300 inline-block w-12"></span>.</p>
                  </div>

                  <div>
                    <p>The extra money you pay back when you borrow is called:</p>
                    <div className="border-b border-gray-300 w-full h-2 mt-0.5"></div>
                  </div>

                  <div>
                    <p className="font-bold mb-0.5">Difference between "good debt" and "bad debt":</p>
                    <div className="border border-gray-300 rounded p-1 bg-white h-12"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="border-2 border-orange-200 rounded-lg p-2 bg-orange-50 mb-2">
              <h3 className="font-bold text-orange-700 text-xs mb-1 uppercase">Section 4: Wise Choices Challenge</h3>
              
              <div className="space-y-1 text-[9px]">
                <div className="bg-white rounded p-1 border border-orange-100">
                  <p className="font-bold">1. Borrowing money to buy equipment that will help your business earn more.</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="border rounded px-1">Wise</span>
                    <span className="border rounded px-1">Unwise</span>
                    <span className="ml-2">Reasoning:</span>
                    <div className="border-b border-gray-300 flex-1 h-2"></div>
                  </div>
                </div>

                <div className="bg-white rounded p-1 border border-orange-100">
                  <p className="font-bold">2. Using a credit card for expensive office decor when you haven't made sales yet.</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="border rounded px-1">Wise</span>
                    <span className="border rounded px-1">Unwise</span>
                    <span className="ml-2">Reasoning:</span>
                    <div className="border-b border-gray-300 flex-1 h-2"></div>
                  </div>
                </div>

                <div className="bg-white rounded p-1 border border-orange-100">
                  <p className="font-bold">3. Researching different lenders to find the lowest interest rate before taking a loan.</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="border rounded px-1">Wise</span>
                    <span className="border rounded px-1">Unwise</span>
                    <span className="ml-2">Reasoning:</span>
                    <div className="border-b border-gray-300 flex-1 h-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 & 6 in Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Section 5 */}
              <div className="border-2 border-pink-200 rounded-lg p-2 bg-pink-50">
                <h3 className="font-bold text-pink-700 text-xs mb-1 uppercase">Section 5: Calculate the Cost</h3>
                
                <div className="space-y-1 text-[9px]">
                  <div>
                    <p className="font-bold">1. Borrow 500 AED with 10% interest. Total payback?</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span>Answer:</span>
                      <div className="border-b border-gray-300 w-16 h-2"></div>
                      <span>AED</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold">2. Item costs 200 AED. You pay back 230 AED. Interest?</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span>Answer:</span>
                      <div className="border-b border-gray-300 w-16 h-2"></div>
                      <span>AED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
                <h3 className="font-bold text-gray-700 text-xs mb-1 uppercase">Section 6: My FinnQuest Learnings</h3>
                
                <div className="space-y-1 text-[9px]">
                  <div>
                    <p className="font-bold mb-0.5">Most important lesson learned:</p>
                    <div className="border border-gray-300 rounded p-1 bg-white h-10"></div>
                  </div>

                  <div>
                    <p className="font-bold mb-0.5">How will this help you?</p>
                    <div className="border border-gray-300 rounded p-1 bg-white h-10"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-2 flex justify-between items-end border-t border-gray-200 pt-1">
               <div className="text-[9px] text-gray-400">© FinnQuest 2025 • www.finnquest.co.uk</div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}