import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function SaveBusinessWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('savebusiness-content');
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
          <title>Save the Business: Case Study Analysis</title>
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
                margin-bottom: 0.25cm;
              }
              
              .title {
                font-size: 14pt;
                font-weight: bold;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.25cm;
                margin-bottom: 0.3cm;
              }
              
              .info-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.12cm 0.2cm;
                border-radius: 0.1cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 7.5pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 5cm;
                margin-left: 0.2cm;
              }
              
              .overview-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.25cm;
                margin-bottom: 0.3cm;
                border-radius: 0.15cm;
              }
              
              .overview-title {
                font-weight: bold;
                font-size: 9.5pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .overview-content {
                font-size: 8pt;
                line-height: 1.4;
              }
              
              .overview-content p {
                margin: 0.08cm 0;
              }
              
              .section {
                margin-bottom: 0.3cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.12cm 0.2cm;
                border-radius: 0.1cm;
                margin-bottom: 0.12cm;
              }
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.3cm;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.12cm;
                font-size: 7.5pt;
                text-align: center;
              }
              
              .data-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 8pt;
              }
              
              .negative {
                color: #dc2626;
              }
              
              .positive {
                color: #16a34a;
              }
              
              .notes-box {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .notes-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
              }
              
              .notes-content {
                font-size: 7.5pt;
                line-height: 1.4;
              }
              
              .notes-content p {
                margin: 0.08cm 0;
              }
              
              .prompt {
                font-size: 8pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.08cm;
              }
              
              .writing-lines {
                display: flex;
                flex-direction: column;
                gap: 0.12cm;
              }
              
              .writing-line {
                border-bottom: 1px solid #999;
                height: 0.45cm;
              }
              
              .numbered-spaces {
                display: flex;
                flex-direction: column;
                gap: 0.15cm;
              }
              
              .numbered-item {
                display: grid;
                grid-template-columns: 0.5cm 1fr;
                gap: 0.15cm;
                align-items: start;
              }
              
              .number {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
              }
              
              .review-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.25cm;
                border-radius: 0.15cm;
                min-height: 3cm;
              }
              
              .review-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
                text-align: center;
              }
              
              .review-prompts {
                font-size: 7.5pt;
                font-style: italic;
                color: #666;
                margin-bottom: 0.15cm;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .sentence-starter {
                font-size: 8pt;
                line-height: 1.6;
                margin-bottom: 0.15cm;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                display: inline-block;
                min-width: 5cm;
                margin: 0 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.3cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Save the Business: Case Study Analysis</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="savebusiness-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-4">
              <h1 className="title text-2xl font-bold text-[#3448C5]">
                Save the Business: Case Study Analysis
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
            </div>

            <div className="overview-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-4">
              <div className="overview-title text-base font-bold text-[#3448C5] mb-2">
                Company Overview
              </div>
              <div className="overview-content text-sm space-y-1">
                <p><strong>Company name:</strong> QuickBite Snacks</p>
                <p><strong>Business type:</strong> Small snack shop near a school</p>
                <p className="mt-2">QuickBite Snacks sells snacks and drinks to pupils before and after school. The business has been open for one year, but profits have been falling.</p>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Monthly Performance (Last 6 Months)
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Month</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Income (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Expenses (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Profit / Loss (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2">January</td>
                    <td className="border border-gray-400 p-2">3,200</td>
                    <td className="border border-gray-400 p-2">2,600</td>
                    <td className="border border-gray-400 p-2 positive font-bold">+600</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">February</td>
                    <td className="border border-gray-400 p-2">3,000</td>
                    <td className="border border-gray-400 p-2">2,650</td>
                    <td className="border border-gray-400 p-2 positive font-bold">+350</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">March</td>
                    <td className="border border-gray-400 p-2">2,800</td>
                    <td className="border border-gray-400 p-2">2,700</td>
                    <td className="border border-gray-400 p-2 positive font-bold">+100</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">April</td>
                    <td className="border border-gray-400 p-2">2,600</td>
                    <td className="border border-gray-400 p-2">2,750</td>
                    <td className="border border-gray-400 p-2 negative font-bold">–150</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">May</td>
                    <td className="border border-gray-400 p-2">2,400</td>
                    <td className="border border-gray-400 p-2">2,800</td>
                    <td className="border border-gray-400 p-2 negative font-bold">–400</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2">June</td>
                    <td className="border border-gray-400 p-2">2,200</td>
                    <td className="border border-gray-400 p-2">2,850</td>
                    <td className="border border-gray-400 p-2 negative font-bold">–650</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Expense Breakdown (Average per Month)
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Expense Type</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Cost (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-left">Rent</td>
                    <td className="border border-gray-400 p-2">1,200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-left">Staff wages</td>
                    <td className="border border-gray-400 p-2">800</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-left">Stock (snacks & drinks)</td>
                    <td className="border border-gray-400 p-2">600</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-left">Electricity</td>
                    <td className="border border-gray-400 p-2">150</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-left">Advertising</td>
                    <td className="border border-gray-400 p-2">100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="notes-box border-2 border-[#3448C5] bg-orange-50 p-3 rounded-lg">
              <div className="notes-title text-sm font-bold text-[#3448C5] mb-2">
                Owner's Notes
              </div>
              <div className="notes-content text-xs space-y-1">
                <p>• Prices were increased in March</p>
                <p>• Fewer customers have been visiting after school</p>
                <p>• A new snack shop opened nearby in April</p>
                <p>• Some customers say the shop is "too expensive"</p>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-12"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Spotting the Problems
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">What has happened to the profit over the last six months?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">Which month did the business start losing money?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Analysing Income and Expenses
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">Is the problem mainly income, expenses, or both? Explain.</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">Which expense seems the highest? Is it reasonable?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Competition and Customers
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">How might the new competitor have affected QuickBite Snacks?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">How do customer opinions affect business success?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Saving the Business
              </div>
              <p className="text-xs italic text-gray-600 mb-2">You are a business consultant. Suggest three changes to help the business recover.</p>
              <div className="numbered-spaces space-y-2">
                <div className="numbered-item grid grid-cols-[0.5cm_1fr] gap-2">
                  <span className="number text-sm font-bold text-[#3448C5]">1.</span>
                  <div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6 mt-2"></div>
                  </div>
                </div>
                <div className="numbered-item grid grid-cols-[0.5cm_1fr] gap-2">
                  <span className="number text-sm font-bold text-[#3448C5]">2.</span>
                  <div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6 mt-2"></div>
                  </div>
                </div>
                <div className="numbered-item grid grid-cols-[0.5cm_1fr] gap-2">
                  <span className="number text-sm font-bold text-[#3448C5]">3.</span>
                  <div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6 mt-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Business Review
              </div>
              <div className="review-prompts text-xs italic text-gray-600 mb-2">
                What went wrong? • What should change? • Do you think the business can succeed again?
              </div>
              <div className="review-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg" style={{ minHeight: '100px' }}>
                <div className="review-title text-base font-bold text-[#3448C5] mb-2 text-center">
                  My Review of QuickBite Snacks
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-3 rounded-lg space-y-2">
                <div className="sentence-starter text-sm leading-relaxed">
                  A business can fail when
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
                <div className="sentence-starter text-sm leading-relaxed">
                  Customer behaviour is important because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[250px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
                <div className="sentence-starter text-sm leading-relaxed">
                  The most important lesson from this case study is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[230px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-12"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}