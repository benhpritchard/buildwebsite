import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function LifeMathsWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('lifemaths-content');
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
          <title>Life Maths: The Full Personal Finance Cycle</title>
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
                font-size: 13pt;
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
              
              .part-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 7.5pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.08cm 0.12cm;
                border-radius: 0.1cm;
                margin-bottom: 0.1cm;
              }
              
              .career-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.15cm;
                margin-bottom: 0.2cm;
              }
              
              .career-box {
                border: 2px solid #3448C5;
                padding: 0.15cm;
                border-radius: 0.1cm;
                background: #f0f9ff;
              }
              
              .career-title {
                font-weight: bold;
                font-size: 7pt;
                color: #3448C5;
                margin-bottom: 0.08cm;
              }
              
              .career-detail {
                font-size: 6.5pt;
                line-height: 1.4;
                margin-bottom: 0.05cm;
              }
              
              .section {
                margin-bottom: 0.2cm;
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
              
              .tax-box {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.15cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .tax-title {
                font-weight: bold;
                font-size: 7pt;
                color: #3448C5;
                margin-bottom: 0.08cm;
              }
              
              .tax-detail {
                font-size: 6.5pt;
                line-height: 1.4;
              }
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.08cm;
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
              
              .costs-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.15cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .costs-title {
                font-weight: bold;
                font-size: 7pt;
                color: #3448C5;
                margin-bottom: 0.08cm;
              }
              
              .costs-detail {
                font-size: 6.5pt;
                line-height: 1.4;
              }
              
              .investment-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.15cm;
                margin-bottom: 0.2cm;
              }
              
              .investment-box {
                border: 2px solid #3448C5;
                padding: 0.15cm;
                border-radius: 0.1cm;
              }
              
              .investment-box.option1 {
                background: #dcfce7;
              }
              
              .investment-box.option2 {
                background: #dbeafe;
              }
              
              .investment-box.option3 {
                background: #fef3c7;
              }
              
              .investment-title {
                font-weight: bold;
                font-size: 6.5pt;
                color: #3448C5;
                margin-bottom: 0.08cm;
              }
              
              .investment-detail {
                font-size: 6pt;
                line-height: 1.4;
              }
              
              .question {
                font-size: 6.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .answer-line {
                border-bottom: 1px solid #999;
                height: 0.3cm;
                margin-bottom: 0.08cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Life Maths: The Full Personal Finance Cycle</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="lifemaths-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-xl font-bold text-[#3448C5]">
                Life Maths: The Full Personal Finance Cycle
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-3">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
            </div>

            <div className="part-title text-sm font-bold text-[#3448C5] mb-2">
              Part 1: Choose a Career Path
            </div>

            <div className="career-grid grid grid-cols-3 gap-2 mb-3">
              <div className="career-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded">
                <div className="career-title text-xs font-bold text-[#3448C5] mb-1">Career A — Apprentice Technician</div>
                <div className="career-detail text-xs space-y-1">
                  <div><strong>Starting salary:</strong> AED 6,000/mo</div>
                  <div><strong>Annual increase:</strong> 3%</div>
                  <div><strong>Education cost:</strong> AED 0</div>
                </div>
              </div>
              <div className="career-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded">
                <div className="career-title text-xs font-bold text-[#3448C5] mb-1">Career B — University Graduate</div>
                <div className="career-detail text-xs space-y-1">
                  <div><strong>Starting salary:</strong> AED 8,500/mo</div>
                  <div><strong>Annual increase:</strong> 4%</div>
                  <div><strong>Education cost:</strong> AED 80,000</div>
                </div>
              </div>
              <div className="career-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded">
                <div className="career-title text-xs font-bold text-[#3448C5] mb-1">Career C — Small Business Owner</div>
                <div className="career-detail text-xs space-y-1">
                  <div><strong>Avg income:</strong> AED 10,000/mo</div>
                  <div><strong>Variation:</strong> ±20%</div>
                  <div><strong>Startup cost:</strong> AED 50,000</div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Income Calculations
              </div>
              <div className="space-y-1">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Annual income for each career:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total income after 5 years (ignore inflation for now):</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Which career earns the most after 5 years?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="part-title text-sm font-bold text-[#3448C5] mb-2">
              Part 2: Tax & Net Pay
            </div>

            <div className="tax-box border-2 border-[#3448C5] bg-orange-50 p-2 rounded mb-3">
              <div className="tax-title text-xs font-bold text-[#3448C5] mb-1">Tax Rules</div>
              <div className="tax-detail text-xs space-y-1">
                <div>• Income tax: 10% of gross income</div>
                <div>• Social contributions: 5% of gross income</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Net Income
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Career</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Gross monthly income</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Tax</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Other deductions</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Net monthly income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Career A</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Career B</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Career C</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-10"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="info-section grid grid-cols-2 gap-3 mb-3">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[130px] ml-2"></span>
              </div>
            </div>

            <div className="part-title text-sm font-bold text-[#3448C5] mb-2">
              Part 3: Monthly Budget
            </div>

            <div className="costs-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded mb-3">
              <div className="costs-title text-xs font-bold text-[#3448C5] mb-1">Fixed Living Costs</div>
              <div className="costs-detail text-xs space-y-1">
                <div>• Rent: AED 2,800</div>
                <div>• Utilities: AED 600</div>
                <div>• Transport: AED 750</div>
                <div>• Food: AED 1,200</div>
                <div>• Phone & internet: AED 350</div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Budget Balance
              </div>
              <div className="space-y-1">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total monthly expenses:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Money left over after expenses:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Which career allows the highest savings?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="part-title text-sm font-bold text-[#3448C5] mb-2">
              Part 4: Investment Choices
            </div>

            <div className="investment-grid grid grid-cols-3 gap-2 mb-3">
              <div className="investment-box option1 border-2 border-[#3448C5] bg-green-50 p-2 rounded">
                <div className="investment-title text-xs font-bold text-[#3448C5] mb-1">Option 1 — Savings Account</div>
                <div className="investment-detail text-xs">Interest: 3% per year</div>
              </div>
              <div className="investment-box option2 border-2 border-[#3448C5] bg-blue-50 p-2 rounded">
                <div className="investment-title text-xs font-bold text-[#3448C5] mb-1">Option 2 — Index Fund</div>
                <div className="investment-detail text-xs">Average return: 6% per year</div>
              </div>
              <div className="investment-box option3 border-2 border-[#3448C5] bg-yellow-50 p-2 rounded">
                <div className="investment-title text-xs font-bold text-[#3448C5] mb-1">Option 3 — High-Risk Investment</div>
                <div className="investment-detail text-xs space-y-1">
                  <div>Average return: 10% per year</div>
                  <div>Risk of loss</div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Investment Calculations
              </div>
              <div className="space-y-1">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Invest AED 10,000 for 5 years at each rate:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Calculate final value for each option:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Which option gives the highest return?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Part 5: Long-Term Thinking
              </div>
              <div className="space-y-1">
                <div>
                  <p className="question text-xs font-bold mb-1">Which career path offers the best balance of income and risk?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">How do education or startup costs affect early finances?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Why is investing important over time?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-1">
                <div className="sentence-starter text-xs leading-relaxed">
                  The most important financial decision in this worksheet was
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[150px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Higher income does not always mean
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Long-term financial success depends on
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[180px] mx-1"></span>
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