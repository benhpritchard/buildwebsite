import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function RealCostWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('realcost-content');
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
          <title>The Real Cost: Credit, Contracts and Subscriptions</title>
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
                font-size: 8pt;
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
                font-size: 7pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 4cm;
                margin-left: 0.15cm;
              }
              
              .part-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.1cm 0.15cm;
                border-radius: 0.1cm;
                margin-bottom: 0.1cm;
              }
              
              .info-box-compact {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.15cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .info-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                font-size: 7pt;
                padding: 0.05cm 0;
              }
              
              .info-label-small {
                font-weight: bold;
              }
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.12cm;
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
              
              .section {
                margin-bottom: 0.25cm;
              }
              
              .question {
                font-size: 7pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .answer-line {
                border-bottom: 1px solid #999;
                height: 0.35cm;
                margin-bottom: 0.08cm;
              }
              
              .calc-prompt {
                font-size: 7pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.05cm;
              }
              
              .calc-space {
                border: 1px solid #ccc;
                background: #fafafa;
                padding: 0.15cm;
                min-height: 0.8cm;
                margin-bottom: 0.12cm;
                border-radius: 0.1cm;
              }
              
              .contract-box {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.2cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .contract-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .contract-row {
                font-size: 7pt;
                line-height: 1.5;
              }
              
              .scenario-box {
                border: 2px solid #3448C5;
                background: #fef3c7;
                padding: 0.2cm;
                margin-bottom: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .scenario-title {
                font-weight: bold;
                font-size: 7.5pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .scenario-content {
                font-size: 7pt;
                line-height: 1.4;
              }
              
              .response-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                border-radius: 0.1cm;
                min-height: 2cm;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.15cm;
                border-radius: 0.1cm;
              }
              
              .sentence-starter {
                font-size: 7pt;
                line-height: 1.5;
                margin-bottom: 0.1cm;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                display: inline-block;
                min-width: 3.5cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">The Real Cost: Credit, Contracts and Subscriptions</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="realcost-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-xl font-bold text-[#3448C5]">
                The Real Cost: Credit, Contracts and Subscriptions
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[140px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[140px] ml-2"></span>
              </div>
            </div>

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 1: Subscription Comparison
            </div>

            <div className="info-box-compact border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
              <div className="font-bold text-sm text-[#3448C5] mb-2">Music Streaming Options</div>
              <div className="space-y-1 text-xs">
                <div className="info-row grid grid-cols-2">
                  <span className="info-label-small font-bold">Plan A:</span>
                  <span>AED 25 per month</span>
                </div>
                <div className="info-row grid grid-cols-2">
                  <span className="info-label-small font-bold">Plan B:</span>
                  <span>AED 240 per year (paid upfront)</span>
                </div>
                <div className="info-row grid grid-cols-2">
                  <span className="info-label-small font-bold">Plan C:</span>
                  <span>AED 30 per month with no contract</span>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Calculate the Total Cost
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Plan</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Monthly cost</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Cost for 1 year</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Cost for 2 years</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Plan A</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Plan B</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Plan C</td>
                    <td className="border border-gray-400 p-2" style={{ height: '35px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Value Comparison
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">Which plan is cheapest after 1 year? Show your working.</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Which plan is cheapest after 2 years?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Which plan looks cheap at first but costs more over time?</p>
                  <div className="answer-line border-b border-gray-400 h-5"></div>
                </div>
              </div>
            </div>

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 2: Phone Contract
            </div>

            <div className="contract-box border-2 border-[#3448C5] bg-orange-50 p-3 rounded-lg mb-3">
              <div className="contract-title text-sm font-bold text-[#3448C5] mb-2">Phone Contract Offer</div>
              <div className="space-y-1 text-xs">
                <div className="contract-row"><strong>Contract length:</strong> 24 months</div>
                <div className="contract-row"><strong>Monthly cost:</strong> AED 160</div>
                <div className="contract-row"><strong>Upfront cost:</strong> AED 300</div>
                <div className="contract-row"><strong>Early exit fee:</strong> AED 600</div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Total Contract Cost
              </div>
              <div className="space-y-2">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total monthly payments over 24 months:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total cost including upfront fee:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Average cost per month (including upfront fee):</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
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
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[140px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[140px] ml-2"></span>
              </div>
            </div>

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 3: Borrowing Money
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="info-box-compact border-2 border-[#3448C5] bg-blue-50 p-2 rounded-lg">
                <div className="font-bold text-xs text-[#3448C5] mb-1">Borrowing Option 1</div>
                <div className="space-y-1 text-xs">
                  <div><strong>Amount borrowed:</strong> AED 2,000</div>
                  <div><strong>Interest rate:</strong> 10% per year</div>
                  <div><strong>Time:</strong> 1 year</div>
                </div>
              </div>
              <div className="info-box-compact border-2 border-[#3448C5] bg-blue-50 p-2 rounded-lg">
                <div className="font-bold text-xs text-[#3448C5] mb-1">Borrowing Option 2</div>
                <div className="space-y-1 text-xs">
                  <div><strong>Amount borrowed:</strong> AED 2,000</div>
                  <div><strong>Interest rate:</strong> 18% per year</div>
                  <div><strong>Time:</strong> 2 years</div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Interest Calculations
              </div>
              <table className="data-table w-full border-collapse mb-2">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Option</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Interest paid</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Total repaid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Option 1</td>
                    <td className="border border-gray-400 p-2" style={{ height: '40px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Option 2</td>
                    <td className="border border-gray-400 p-2" style={{ height: '40px' }}></td>
                    <td className="border border-gray-400 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Comparing Credit Offers
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">Which option costs more overall?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Why is a lower interest rate not always cheaper?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">How does time affect the cost of borrowing?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="part-title text-base font-bold text-[#3448C5] mb-2">
              Part 4: Hidden Fees
            </div>

            <div className="scenario-box border-2 border-[#3448C5] bg-yellow-50 p-3 rounded-lg mb-3">
              <div className="scenario-title text-sm font-bold text-[#3448C5] mb-2">
                A gaming subscription advertises "Only AED 20 per month!"
              </div>
              <div className="scenario-content text-xs space-y-1">
                <div><strong>Additional fees:</strong></div>
                <div>• Setup fee: AED 120</div>
                <div>• Cancellation fee: AED 200</div>
                <div>• Price increase after 6 months: AED 25 per month</div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: True Cost Calculation
              </div>
              <div className="space-y-2">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total cost for 1 year:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total cost for 18 months:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Average monthly cost over 1 year:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 7: Final Decision
              </div>
              <div className="response-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg mb-2" style={{ minHeight: '70px' }}>
                <p className="text-xs font-bold mb-1">Which option would you avoid and why?</p>
              </div>
              <div className="response-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg" style={{ minHeight: '70px' }}>
                <p className="text-xs font-bold mb-1">What warning signs should customers look for in contracts?</p>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-2">
                <div className="sentence-starter text-xs leading-relaxed">
                  A small monthly cost can become expensive because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[180px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Interest makes borrowing risky because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[220px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  The most important calculation in this worksheet was
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[180px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
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