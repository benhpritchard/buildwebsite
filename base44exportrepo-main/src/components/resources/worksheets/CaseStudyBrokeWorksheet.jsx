import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function CaseStudyBrokeWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('casestudybroke-content');
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
          <title>Case Study: Why Am I Still Broke?</title>
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
                font-size: 8.5pt;
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
                font-size: 14pt;
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
                font-size: 7pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 4.5cm;
                margin-left: 0.15cm;
              }
              
              .meet-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.25cm;
                margin-bottom: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .meet-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
              }
              
              .meet-content {
                font-size: 7.5pt;
                line-height: 1.4;
              }
              
              .meet-content p {
                margin: 0.08cm 0;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.1cm 0.15cm;
                border-radius: 0.1cm;
                margin-bottom: 0.12cm;
              }
              
              .payslip-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                margin-bottom: 0.25cm;
                border-radius: 0.1cm;
              }
              
              .payslip-row {
                display: grid;
                grid-template-columns: 2fr 1fr;
                padding: 0.06cm 0;
                font-size: 7.5pt;
              }
              
              .payslip-label {
                font-weight: bold;
              }
              
              .payslip-divider {
                border-top: 1px solid #999;
                margin: 0.08cm 0;
              }
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.1cm;
                font-size: 7pt;
                text-align: center;
              }
              
              .data-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 7.5pt;
              }
              
              .data-table td:first-child,
              .data-table td:nth-child(2) {
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
                font-size: 8pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .thoughts-content {
                font-size: 7.5pt;
                line-height: 1.4;
                font-style: italic;
              }
              
              .thoughts-content p {
                margin: 0.08cm 0;
              }
              
              .section {
                margin-bottom: 0.25cm;
              }
              
              .question {
                font-size: 7.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .answer-line {
                border-bottom: 1px solid #999;
                height: 0.4cm;
                margin-bottom: 0.1cm;
              }
              
              .prompt {
                font-size: 7.5pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .writing-lines {
                display: flex;
                flex-direction: column;
                gap: 0.1cm;
              }
              
              .writing-line {
                border-bottom: 1px solid #999;
                height: 0.4cm;
              }
              
              .two-column-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .two-column-table td {
                border: 1px solid #999;
                padding: 0.15cm;
                vertical-align: top;
                width: 50%;
              }
              
              .two-column-table th {
                border: 1px solid #999;
                padding: 0.1cm;
                background: #f8f9fa;
                font-weight: bold;
                font-size: 7.5pt;
              }
              
              .instruction {
                font-size: 7.5pt;
                font-style: italic;
                color: #666;
                margin-bottom: 0.1cm;
              }
              
              .budget-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.15cm;
              }
              
              .budget-table td, .budget-table th {
                border: 1px solid #999;
                padding: 0.1cm;
                font-size: 7pt;
              }
              
              .budget-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 7.5pt;
                text-align: left;
              }
              
              .budget-table td:first-child {
                text-align: left;
              }
              
              .total-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.12cm;
                margin-bottom: 0.1cm;
                border-radius: 0.1cm;
                font-weight: bold;
                font-size: 7.5pt;
              }
              
              .info-box-small {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.15cm;
                margin-bottom: 0.12cm;
                border-radius: 0.1cm;
                font-size: 7.5pt;
                line-height: 1.4;
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
                font-size: 9pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
                text-align: center;
              }
              
              .advice-prompts {
                font-size: 7pt;
                font-style: italic;
                color: #666;
                margin-bottom: 0.1cm;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.15cm;
                border-radius: 0.1cm;
              }
              
              .sentence-starter {
                font-size: 7.5pt;
                line-height: 1.5;
                margin-bottom: 0.12cm;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                display: inline-block;
                min-width: 4cm;
                margin: 0 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.2cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Case Study: Why Am I Still Broke?</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="casestudybroke-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-2xl font-bold text-[#3448C5]">
                Case Study: Why Am I Still Broke?
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[160px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[160px] ml-2"></span>
              </div>
            </div>

            <div className="meet-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-4">
              <div className="meet-title text-base font-bold text-[#3448C5] mb-2">
                Meet the Teen
              </div>
              <div className="meet-content text-sm space-y-1">
                <p><strong>Name:</strong> Sam</p>
                <p><strong>Age:</strong> 13</p>
                <p><strong>Job:</strong> Weekend retail assistant</p>
                <p><strong>Time working:</strong> 6 months</p>
                <p className="mt-2 italic">Sam works every weekend and feels frustrated because they never seem to have any money left by the end of the month.</p>
              </div>
            </div>

            <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
              Sam's Payslip (Monthly Average)
            </div>

            <div className="payslip-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg mb-4">
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Hours worked:</span>
                <span>24 hours</span>
              </div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Hourly pay:</span>
                <span>AED 28</span>
              </div>
              <div className="payslip-divider border-t border-gray-400 my-2"></div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Gross pay:</span>
                <span className="font-bold">AED 672</span>
              </div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Deductions (tax / NI):</span>
                <span>AED 72</span>
              </div>
              <div className="payslip-divider border-t border-gray-400 my-2"></div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Net pay:</span>
                <span className="font-bold text-green-700">AED 600</span>
              </div>
            </div>

            <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
              Sam's Bank Statement (Typical Month)
            </div>

            <table className="data-table w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Date</th>
                  <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Description</th>
                  <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Money In</th>
                  <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Money Out</th>
                  <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">1st</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Opening balance</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">150</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">2nd</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Wages</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-green-700">600</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">750</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">3rd</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">New trainers</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">280</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">470</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">5th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Phone bill</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">120</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">350</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">7th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Snacks & drinks</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">90</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">260</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">10th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Online games</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">110</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">150</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">14th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Bus travel</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">60</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">90</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">18th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Streaming subscription</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">45</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">45</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">22nd</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Snacks & drinks</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">40</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">5</td>
                </tr>
              </tbody>
            </table>

            <div className="thoughts-box border-2 border-[#3448C5] bg-orange-50 p-3 rounded-lg">
              <div className="thoughts-title text-sm font-bold text-[#3448C5] mb-2">
                Sam's Thoughts
              </div>
              <div className="thoughts-content text-xs italic space-y-1">
                <p>"I feel like I earn good money, but it disappears quickly."</p>
                <p>"Prices keep going up."</p>
                <p>"I don't really plan what I spend."</p>
                <p>"I save when I remember."</p>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-11"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[160px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[160px] ml-2"></span>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Understanding the Problem
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">How much money does Sam earn each month (net)?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">How much money is left at the end of the month?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Spotting the Issues
              </div>
              <div className="space-y-2">
                <div>
                  <p className="prompt text-xs font-bold mb-1">List three spending habits that cause problems.</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-5"></div>
                    <div className="writing-line border-b border-gray-400 h-5"></div>
                    <div className="writing-line border-b border-gray-400 h-5"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-xs font-bold mb-1">Which spending seems unnecessary or too expensive?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-5"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Needs vs Wants
              </div>
              <table className="two-column-table w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Needs</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Wants</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '80px' }}></td>
                    <td className="border border-gray-400 p-3" style={{ height: '80px' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Build a Better Budget
              </div>
              <p className="instruction text-xs italic text-gray-600 mb-2">Create a monthly budget that helps Sam save money.</p>
              <table className="budget-table w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs text-left">Category</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Planned Spending (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Transport</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Phone</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Food & drinks</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Entertainment</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Savings</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                </tbody>
              </table>
              <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded mb-1 text-xs font-bold">
                Total planned spending: __________ AED
              </div>
              <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded text-xs font-bold">
                Expected savings at month end: __________ AED
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Inflation & Value
              </div>
              <div className="info-box-small border-2 border-[#3448C5] bg-orange-50 p-2 rounded mb-2 text-xs">
                Last year, snacks cost around AED 8 per week. This year they cost AED 15 per week.
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">What is happening to prices?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">How does this affect Sam's money?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: Advice & Review
              </div>
              <div className="advice-prompts text-xs italic text-gray-600 mb-2">
                Include: One spending change • One saving habit • One budgeting tip
              </div>
              <div className="advice-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg">
                <div className="advice-title text-base font-bold text-[#3448C5] mb-2 text-center">
                  My Advice to Sam
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-2">
                <div className="sentence-starter text-xs leading-relaxed">
                  Earning money does not mean
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[240px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-5"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Budgeting helps because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-5"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  One habit I should think about now is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[240px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-5"></div>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-11"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}