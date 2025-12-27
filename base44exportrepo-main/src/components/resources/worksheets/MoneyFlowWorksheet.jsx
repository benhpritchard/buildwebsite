import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function MoneyFlowWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('money-flow-content');
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Money Flow: Income, Expenses and Profit</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4 portrait;
                margin: 0.6cm;
              }
              
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                font-size: 9pt;
                line-height: 1.3;
              }
              
              .page {
                page-break-after: always;
                height: 27.7cm;
                padding: 0.4cm;
                border: 3px solid #3448C5;
                background: white;
              }
              
              .page:last-child {
                page-break-after: auto;
              }
              
              .header {
                text-align: center;
                margin-bottom: 0.3cm;
              }
              
              .title {
                font-size: 17pt;
                font-weight: bold;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.3cm;
                margin-bottom: 0.35cm;
              }
              
              .info-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.15cm 0.25cm;
                border-radius: 0.1cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 8pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 5cm;
                margin-left: 0.2cm;
              }
              
              .business-notes {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.3cm;
                margin-bottom: 0.35cm;
                border-radius: 0.15cm;
              }
              
              .notes-title {
                font-weight: bold;
                font-size: 10pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .notes-content {
                font-size: 8.5pt;
                line-height: 1.4;
              }
              
              .notes-content p {
                margin: 0.1cm 0;
              }
              
              .section {
                margin-bottom: 0.35cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 10pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.15cm 0.25cm;
                border-radius: 0.1cm;
                margin-bottom: 0.15cm;
              }
              
              .instruction {
                font-size: 8.5pt;
                font-style: italic;
                color: #555;
                margin-bottom: 0.15cm;
              }
              
              .two-column-table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .two-column-table td {
                border: 1px solid #999;
                padding: 0.2cm;
                vertical-align: top;
                font-size: 8pt;
                width: 50%;
              }
              
              .two-column-table th {
                border: 1px solid #999;
                background: #f8f9fa;
                padding: 0.15cm;
                font-weight: bold;
                font-size: 9pt;
                text-align: center;
              }
              
              .business-table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .business-table td {
                border: 1px solid #999;
                padding: 0.15cm;
                font-size: 8pt;
              }
              
              .business-table th {
                border: 1px solid #999;
                background: #f8f9fa;
                padding: 0.15cm;
                font-weight: bold;
                font-size: 8.5pt;
                text-align: center;
              }
              
              .business-table td:first-child {
                width: 35%;
              }
              
              .business-table td:nth-child(2) {
                width: 25%;
              }
              
              .totals-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.25cm;
                margin-bottom: 0.25cm;
              }
              
              .total-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .total-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 9pt;
                margin-bottom: 0.1cm;
              }
              
              .total-input {
                border: 1px solid #999;
                background: white;
                height: 0.7cm;
                border-radius: 0.1cm;
              }
              
              .options-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.25cm;
              }
              
              .option-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .option-title {
                font-weight: bold;
                color: #3448C5;
                font-size: 9pt;
                margin-bottom: 0.15cm;
                text-align: center;
              }
              
              .option-content {
                font-size: 8pt;
                line-height: 1.4;
              }
              
              .calc-line {
                border-bottom: 1px solid #999;
                height: 0.5cm;
                margin: 0.1cm 0;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                height: 0.5cm;
                margin: 0.15cm 0;
              }
              
              .sentence-starter {
                font-size: 8.5pt;
                line-height: 1.6;
                margin-bottom: 0.15cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.4cm;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Money Flow: Income, Expenses and Profit</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="money-flow-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-4">
              <h1 className="title text-3xl font-bold text-[#3448C5]">
                Money Flow: Income, Expenses and Profit
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-4 mb-5">
              <div className="info-box border-2 border-[#3448C5] p-3 rounded">
                <span className="info-label text-sm font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[200px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-3 rounded">
                <span className="info-label text-sm font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[200px] ml-2"></span>
              </div>
            </div>

            <div className="business-notes border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-5">
              <div className="notes-title text-lg font-bold text-[#3448C5] mb-3">
                Business Notes: School Fair Stall
              </div>
              <div className="notes-content text-sm space-y-1">
                <p className="mb-2">A school fair runs for one day. One stall sells snacks and drinks.</p>
                <p>• 60 snacks sold at AED 5 each</p>
                <p>• 40 drinks sold at AED 4 each</p>
                <p>• Extra afternoon sales: AED 50</p>
                <p>• Ingredients bought for snacks: AED 120</p>
                <p>• Drinks bought from supplier: AED 70</p>
                <p>• Stall hire fee: AED 40</p>
                <p>• Advertising posters: AED 15</p>
                <p>• Electricity used: AED 15</p>
                <p>• Staff help paid: AED 30</p>
              </div>
            </div>

            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 1: Identify Money In and Money Out
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Decide which items are money coming in and which are money going out.
              </p>
              <table className="two-column-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Money In</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Money Out</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <tr key={row}>
                      <td className="border border-gray-400 p-3" style={{ height: '40px' }}></td>
                      <td className="border border-gray-400 p-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 2: Business Record
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Record the money flow for the stall.
              </p>
              <table className="business-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Description</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Calculation</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Money In (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Money Out (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                    <tr key={row}>
                      <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                      <td className="border border-gray-400 p-2"></td>
                      <td className="border border-gray-400 p-2"></td>
                      <td className="border border-gray-400 p-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-14"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 3: Totals
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Add the totals.
              </p>
              <div className="totals-grid grid grid-cols-2 gap-4 mb-4">
                <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded">
                  <div className="total-label text-base font-bold text-[#3448C5] mb-2">Total Money In:</div>
                  <div className="total-input border border-gray-400 bg-white h-12 rounded"></div>
                </div>
                <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded">
                  <div className="total-label text-base font-bold text-[#3448C5] mb-2">Total Money Out:</div>
                  <div className="total-input border border-gray-400 bg-white h-12 rounded"></div>
                </div>
              </div>
              <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded">
                <div className="total-label text-base font-bold text-[#3448C5] mb-2">Profit or Loss:</div>
                <div className="total-input border border-gray-400 bg-white h-12 rounded"></div>
              </div>
            </div>

            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 4: Change One Decision
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                The stall owner changes the snack price. Complete both options.
              </p>
              <div className="options-grid grid grid-cols-2 gap-4">
                <div className="option-box border-2 border-[#3448C5] p-3 rounded">
                  <div className="option-title text-base font-bold text-[#3448C5] mb-2 text-center">Option A</div>
                  <div className="option-content text-sm space-y-2">
                    <p>Snack price becomes AED 6</p>
                    <p>Snacks sold: 50</p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-semibold">Snack income:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">New total money in:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">New profit or loss:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="option-box border-2 border-[#3448C5] p-3 rounded">
                  <div className="option-title text-base font-bold text-[#3448C5] mb-2 text-center">Option B</div>
                  <div className="option-content text-sm space-y-2">
                    <p>Snack price becomes AED 4</p>
                    <p>Snacks sold: 75</p>
                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-semibold">Snack income:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">New total money in:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">New profit or loss:</p>
                        <div className="calc-line border-b border-gray-400 h-8 mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 5: Compare and Explain
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm mb-1">Which option makes more profit?</p>
                  <div className="reflection-line border-b border-gray-400 h-8"></div>
                </div>
                <div>
                  <p className="text-sm mb-1">Why this option works better:</p>
                  <div className="reflection-line border-b border-gray-400 h-8"></div>
                  <div className="reflection-line border-b border-gray-400 h-8 mt-2"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 6: Reflection
              </div>
              <div className="space-y-2">
                <div className="sentence-starter text-sm">
                  Money coming in is called <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="sentence-starter text-sm">
                  Money going out is called <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="sentence-starter text-sm">
                  A business makes a profit when
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[250px] mx-1"></span>
                </div>
                <div className="reflection-line border-b border-gray-600 h-8 mt-2"></div>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-14"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}