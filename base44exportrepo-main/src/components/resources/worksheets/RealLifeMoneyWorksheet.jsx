import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function RealLifeMoneyWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('reallifemoney-content');
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
          <title>Real Life Money: Pay, Spending and Budgeting</title>
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
              
              .part-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
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
                padding: 0.08cm 0;
                font-size: 7.5pt;
              }
              
              .payslip-label {
                font-weight: bold;
              }
              
              .payslip-divider {
                border-top: 1px solid #999;
                margin: 0.1cm 0;
              }
              
              .section {
                margin-bottom: 0.25cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.1cm 0.15cm;
                border-radius: 0.1cm;
                margin-bottom: 0.1cm;
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
              
              .data-table td:first-child {
                text-align: left;
              }
              
              .instruction {
                font-size: 7.5pt;
                font-style: italic;
                color: #666;
                margin-bottom: 0.1cm;
              }
              
              .total-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.15cm;
                margin-top: 0.15cm;
                border-radius: 0.1cm;
                text-align: center;
                font-weight: bold;
                font-size: 8pt;
              }
              
              .info-box-small {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.15cm;
                margin-bottom: 0.15cm;
                border-radius: 0.1cm;
                font-size: 7.5pt;
                line-height: 1.4;
              }
              
              .scenario-box {
                border: 2px solid #3448C5;
                background: #fef3c7;
                padding: 0.15cm;
                margin-bottom: 0.15cm;
                border-radius: 0.1cm;
                font-size: 7.5pt;
                font-style: italic;
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
                min-width: 4.5cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Real Life Money: Pay, Spending and Budgeting</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="reallifemoney-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-2xl font-bold text-[#3448C5]">
                Real Life Money: Pay, Spending and Budgeting
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

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 1: Payslip
            </div>

            <div className="payslip-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg mb-4">
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Job:</span>
                <span>Weekend café assistant</span>
              </div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Hours worked:</span>
                <span>12 hours</span>
              </div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Hourly pay:</span>
                <span>AED 30</span>
              </div>
              <div className="payslip-divider border-t border-gray-400 my-2"></div>
              <div className="text-xs font-bold mb-1">Earnings</div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Gross pay:</span>
                <span className="font-bold">AED 360</span>
              </div>
              <div className="payslip-divider border-t border-gray-400 my-2"></div>
              <div className="text-xs font-bold mb-1">Deductions</div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">National insurance / tax:</span>
                <span>AED 40</span>
              </div>
              <div className="payslip-divider border-t border-gray-400 my-2"></div>
              <div className="payslip-row grid grid-cols-2 py-1 text-sm">
                <span className="payslip-label font-bold">Net pay:</span>
                <span className="font-bold text-green-700">AED 320</span>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Understanding Your Payslip
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">What does gross pay mean?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">What does net pay mean?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Why is net pay lower than gross pay?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 2: Bank Statement
            </div>

            <table className="data-table w-full border-collapse mb-3">
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
                  <td className="border border-gray-400 p-2 text-xs font-bold">120</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">3rd</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Wages</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-green-700">320</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">440</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">4th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Phone credit</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">40</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">400</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">6th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Snacks</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">25</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">375</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">8th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Bus travel</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">35</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">340</td>
                </tr>
                <tr>
                  <td className="border border-gray-400 p-2 text-xs">12th</td>
                  <td className="border border-gray-400 p-2 text-xs text-left">Online purchase</td>
                  <td className="border border-gray-400 p-2 text-xs"></td>
                  <td className="border border-gray-400 p-2 text-xs font-bold text-red-700">60</td>
                  <td className="border border-gray-400 p-2 text-xs font-bold">280</td>
                </tr>
              </tbody>
            </table>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Reading a Bank Statement
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">How much money is in the account at the end?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Which type of spending happens most often?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Is the balance going up or down? Why?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
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
                Section 3: Weekly Budget
              </div>
              <p className="instruction text-xs italic text-gray-600 mb-2">Create a realistic weekly budget using your net pay.</p>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs text-left">Category</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Planned Spending (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Transport</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Food & drinks</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Phone / data</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Entertainment</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Savings</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                  </tr>
                </tbody>
              </table>
              <div className="total-box border-2 border-[#3448C5] bg-blue-50 p-2 rounded mt-3 text-center text-sm font-bold">
                Total weekly spending: __________ AED
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Product Choice & Value
              </div>
              <table className="data-table w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Product</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Price</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Quality</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Value for money</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs">Headphones A</td>
                    <td className="border border-gray-400 p-2 text-xs">120</td>
                    <td className="border border-gray-400 p-2 text-xs">Medium</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs">Headphones B</td>
                    <td className="border border-gray-400 p-2 text-xs">180</td>
                    <td className="border border-gray-400 p-2 text-xs">High</td>
                    <td className="border border-gray-400 p-2" style={{ height: '30px' }}></td>
                  </tr>
                </tbody>
              </table>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">Which product is better value? Why?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Why is the cheapest option not always best?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Inflation & Interest
              </div>
              <div className="info-box-small border-2 border-[#3448C5] bg-orange-50 p-2 rounded mb-2 text-xs">
                Last year, a bus ticket cost AED 3. This year it costs AED 4.
              </div>
              <div className="space-y-2 mb-3">
                <div>
                  <p className="question text-xs font-bold mb-1">What has happened to the price?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">How could this affect your budget?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">If money in a savings account earns interest, why is saving helpful?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: Consumer Rights (Intro)
              </div>
              <div className="scenario-box border-2 border-[#3448C5] bg-yellow-50 p-2 rounded mb-2 text-xs italic">
                You buy headphones online, but they stop working after one week.
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">What should you do first?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Why is keeping receipts important?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-2">
                <div className="sentence-starter text-xs leading-relaxed">
                  The biggest surprise about earning money is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-5"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Budgeting is important because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-5"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  One thing I would change about my spending is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[230px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-5"></div>
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