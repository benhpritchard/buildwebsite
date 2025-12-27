import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function GraduateFinanceWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('graduatefinance-content');
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
          <title>Real Life Finance: Why Earning Money Isn't Enough</title>
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
                font-size: 7.5pt;
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
                margin-bottom: 0.2cm;
              }
              
              .title {
                font-size: 12pt;
                font-weight: bold;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.2cm;
                margin-bottom: 0.25cm;
              }
              
              .info-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.1cm 0.15cm;
                border-radius: 0.1cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 6.5pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 3.8cm;
                margin-left: 0.15cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.1cm 0.15cm;
                border-radius: 0.1cm;
                margin-bottom: 0.12cm;
              }
              
              .graduate-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                margin-bottom: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .graduate-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .graduate-detail {
                font-size: 6.5pt;
                line-height: 1.4;
              }
              
              .income-box {
                border: 2px solid #3448C5;
                background: #dcfce7;
                padding: 0.2cm;
                margin-bottom: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .income-title {
                font-weight: bold;
                font-size: 7.5pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .income-detail {
                font-size: 6.5pt;
                line-height: 1.4;
              }
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.25cm;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.1cm;
                font-size: 6.5pt;
                text-align: center;
              }
              
              .data-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 7pt;
              }
              
              .data-table td:first-child {
                text-align: left;
              }
              
              .thoughts-box {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.2cm;
                border-radius: 0.15cm;
              }
              
              .thoughts-title {
                font-weight: bold;
                font-size: 7.5pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .thoughts-quote {
                font-size: 6.5pt;
                font-style: italic;
                line-height: 1.4;
                color: #333;
              }
              
              .section {
                margin-bottom: 0.25cm;
              }
              
              .calc-prompt {
                font-size: 6.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .calc-space {
                border: 1px solid #ccc;
                background: #fafafa;
                padding: 0.1cm;
                min-height: 0.6cm;
                margin-bottom: 0.08cm;
                border-radius: 0.08cm;
              }
              
              .question {
                font-size: 6.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .answer-line {
                border-bottom: 1px solid #999;
                height: 0.32cm;
                margin-bottom: 0.08cm;
              }
              
              .instruction-box {
                border: 2px solid #3448C5;
                background: #fef3c7;
                padding: 0.15cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
                text-align: center;
              }
              
              .instruction-text {
                font-weight: bold;
                font-size: 7pt;
                color: #3448C5;
              }
              
              .budget-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .budget-table td, .budget-table th {
                border: 1px solid #999;
                padding: 0.08cm;
                font-size: 6.5pt;
              }
              
              .budget-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 7pt;
                text-align: center;
              }
              
              .budget-table td:first-child {
                text-align: left;
              }
              
              .result-box {
                border: 2px solid #3448C5;
                background: #dcfce7;
                padding: 0.15cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .result-prompt {
                font-size: 6.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .result-space {
                border: 1px solid #999;
                background: white;
                padding: 0.08cm;
                min-height: 0.5cm;
                border-radius: 0.08cm;
              }
              
              .advice-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                border-radius: 0.15cm;
                min-height: 2.5cm;
              }
              
              .advice-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
                text-align: center;
              }
              
              .advice-prompts {
                font-size: 6pt;
                font-style: italic;
                color: #666;
                margin-bottom: 0.1cm;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.12cm;
                border-radius: 0.1cm;
              }
              
              .sentence-starter {
                font-size: 6.5pt;
                line-height: 1.5;
                margin-bottom: 0.08cm;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                display: inline-block;
                min-width: 3cm;
                margin: 0 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.1cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Real Life Finance: Why Earning Money Isn't Enough</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="graduatefinance-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-xl font-bold text-[#3448C5]">
                Real Life Finance: Why Earning Money Isn't Enough
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
            </div>

            <div className="graduate-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-4">
              <div className="graduate-title text-sm font-bold text-[#3448C5] mb-2">
                Meet the Graduate
              </div>
              <div className="graduate-detail text-xs space-y-1">
                <p><strong>Name:</strong> Alex</p>
                <p><strong>Age:</strong> 22</p>
                <p><strong>Education:</strong> University graduate</p>
                <p><strong>Job:</strong> Marketing assistant</p>
                <p className="mt-2 italic">Alex has been working full-time for one year and feels financially stressed despite earning a regular salary.</p>
              </div>
            </div>

            <div className="income-box border-2 border-[#3448C5] bg-green-50 p-3 rounded-lg mb-4">
              <div className="income-title text-sm font-bold text-[#3448C5] mb-2">
                Alex's Income
              </div>
              <div className="income-detail text-xs space-y-1">
                <p><strong>Gross monthly salary:</strong> AED 11,500</p>
                <p><strong>Income tax (10%):</strong> AED 1,150</p>
                <p><strong>Other deductions (5%):</strong> AED 575</p>
                <p className="pt-1 font-bold text-sm"><strong>Net monthly income:</strong> AED 9,775</p>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Alex's Monthly Expenses
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs text-left">Expense</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Monthly cost (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Rent</td>
                    <td className="border border-gray-400 p-2 text-xs">4,200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Utilities</td>
                    <td className="border border-gray-400 p-2 text-xs">650</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Transport</td>
                    <td className="border border-gray-400 p-2 text-xs">900</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Food</td>
                    <td className="border border-gray-400 p-2 text-xs">1,400</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Phone & internet</td>
                    <td className="border border-gray-400 p-2 text-xs">450</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Subscriptions</td>
                    <td className="border border-gray-400 p-2 text-xs">320</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Student loan repayment</td>
                    <td className="border border-gray-400 p-2 text-xs">800</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Social & leisure</td>
                    <td className="border border-gray-400 p-2 text-xs">900</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="thoughts-box border-2 border-[#3448C5] bg-orange-50 p-3 rounded-lg">
              <div className="thoughts-title text-sm font-bold text-[#3448C5] mb-2">
                Alex's Thoughts
              </div>
              <div className="thoughts-quote text-xs space-y-2">
                <p>"I thought earning this salary would feel comfortable."</p>
                <p>"Rent takes most of my money."</p>
                <p>"I don't save much, if anything."</p>
                <p>"Prices keep increasing."</p>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-10"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Where Is the Money Going?
              </div>
              <div className="space-y-1">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total monthly expenses:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Money left at the end of the month:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Percentage of income spent on rent:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Identifying the Pressure Points
              </div>
              <div className="space-y-1">
                <div>
                  <p className="question text-xs font-bold mb-1">Which three expenses have the biggest impact on Alex's budget?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Which expenses could be reduced? Which are fixed?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Budget Adjustment
              </div>
              <div className="instruction-box border-2 border-[#3448C5] bg-yellow-50 p-2 rounded text-center mb-2">
                <p className="instruction-text text-xs font-bold text-[#3448C5]">Alex wants to save AED 1,200 per month</p>
              </div>
              <table className="budget-table w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs text-left">Category</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Current cost</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">New cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Rent</td>
                    <td className="border border-gray-400 p-2" style={{ height: '24px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Food</td>
                    <td className="border border-gray-400 p-2" style={{ height: '24px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Subscriptions</td>
                    <td className="border border-gray-400 p-2" style={{ height: '24px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Social & leisure</td>
                    <td className="border border-gray-400 p-2" style={{ height: '24px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tbody>
              </table>
              <div className="result-box border-2 border-[#3448C5] bg-green-50 p-2 rounded space-y-1">
                <div>
                  <p className="result-prompt text-xs font-bold">New total monthly spending:</p>
                  <div className="result-space border border-gray-400 bg-white p-1 rounded"></div>
                </div>
                <div>
                  <p className="result-prompt text-xs font-bold">Monthly savings achieved:</p>
                  <div className="result-space border border-gray-400 bg-white p-1 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Long-Term Impact
              </div>
              <div className="space-y-1">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">How much would Alex save in 1 year at AED 1,200 per month?</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">How much in 5 years (ignore interest)?</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Lifestyle Choices
              </div>
              <div className="space-y-1">
                <div>
                  <p className="question text-xs font-bold mb-1">What trade-offs does Alex face between lifestyle and saving?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Is a higher salary always the solution? Why or why not?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: Advice
              </div>
              <div className="advice-prompts text-xs italic text-gray-600 mb-2">
                Include: One budgeting change • One mindset change • One long-term financial habit
              </div>
              <div className="advice-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg">
                <div className="advice-title text-base font-bold text-[#3448C5] mb-2 text-center">
                  My Advice to Alex
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-1">
                <div className="sentence-starter text-xs leading-relaxed">
                  Earning money does not guarantee
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[180px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  The biggest financial pressure for young adults is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[150px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  One decision I would think more carefully about is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[160px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-10"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}