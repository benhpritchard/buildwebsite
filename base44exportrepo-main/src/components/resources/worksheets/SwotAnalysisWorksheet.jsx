import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function SwotAnalysisWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('swotanalysis-content');
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
          <title>Case Study: SWOT Analysis of a Subscription Business</title>
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
                font-size: 7pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 4cm;
                margin-left: 0.15cm;
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
              
              .overview-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                margin-bottom: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .overview-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .overview-content {
                font-size: 7pt;
                line-height: 1.4;
              }
              
              .overview-content p {
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
              
              .issues-box {
                border: 2px solid #3448C5;
                background: #fff7ed;
                padding: 0.2cm;
                border-radius: 0.15cm;
              }
              
              .issues-title {
                font-weight: bold;
                font-size: 8pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
              }
              
              .issues-content {
                font-size: 7pt;
                line-height: 1.4;
              }
              
              .issues-content p {
                margin: 0.08cm 0;
              }
              
              .section {
                margin-bottom: 0.25cm;
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
                padding: 0.12cm;
                min-height: 0.7cm;
                margin-bottom: 0.1cm;
                border-radius: 0.1cm;
              }
              
              .swot-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.15cm;
                margin-bottom: 0.25cm;
              }
              
              .swot-box {
                border: 2px solid #3448C5;
                padding: 0.15cm;
                border-radius: 0.1cm;
                min-height: 2.5cm;
              }
              
              .swot-box.strengths {
                background: #dcfce7;
              }
              
              .swot-box.weaknesses {
                background: #fee2e2;
              }
              
              .swot-box.opportunities {
                background: #dbeafe;
              }
              
              .swot-box.threats {
                background: #fef3c7;
              }
              
              .swot-title {
                font-weight: bold;
                font-size: 7.5pt;
                color: #3448C5;
                margin-bottom: 0.1cm;
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
                margin-bottom: 0.1cm;
              }
              
              .recommendation-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.2cm;
                border-radius: 0.15cm;
                min-height: 2.5cm;
              }
              
              .recommendation-title {
                font-weight: bold;
                font-size: 8.5pt;
                color: #3448C5;
                margin-bottom: 0.12cm;
                text-align: center;
              }
              
              .recommendation-prompts {
                font-size: 6.5pt;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Case Study: SWOT Analysis of a Subscription Business</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="swotanalysis-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-3">
              <h1 className="title text-xl font-bold text-[#3448C5]">
                Case Study: SWOT Analysis of a Subscription Business
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

            <div className="overview-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-3">
              <div className="overview-title text-sm font-bold text-[#3448C5] mb-2">
                Company Overview
              </div>
              <div className="overview-content text-xs space-y-1">
                <p><strong>Company name:</strong> StreamSmart</p>
                <p><strong>Business type:</strong> Online video streaming subscription</p>
                <p className="mt-2">StreamSmart offers movies and series to teenagers and families. The company uses monthly subscriptions and long-term contracts to increase income.</p>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Subscription Plans
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Plan</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Monthly cost</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Contract length</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Basic</td>
                    <td className="border border-gray-400 p-2 text-xs">AED 25</td>
                    <td className="border border-gray-400 p-2 text-xs">No contract</td>
                    <td className="border border-gray-400 p-2 text-xs">Ads included</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Standard</td>
                    <td className="border border-gray-400 p-2 text-xs">AED 40</td>
                    <td className="border border-gray-400 p-2 text-xs">12 months</td>
                    <td className="border border-gray-400 p-2 text-xs">No ads</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Premium</td>
                    <td className="border border-gray-400 p-2 text-xs">AED 55</td>
                    <td className="border border-gray-400 p-2 text-xs">24 months</td>
                    <td className="border border-gray-400 p-2 text-xs">No ads + downloads</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Customer Numbers (Last 6 Months)
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Month</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Basic</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Standard</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Jan</td>
                    <td className="border border-gray-400 p-2 text-xs">2,000</td>
                    <td className="border border-gray-400 p-2 text-xs">1,200</td>
                    <td className="border border-gray-400 p-2 text-xs">800</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Feb</td>
                    <td className="border border-gray-400 p-2 text-xs">2,100</td>
                    <td className="border border-gray-400 p-2 text-xs">1,180</td>
                    <td className="border border-gray-400 p-2 text-xs">820</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Mar</td>
                    <td className="border border-gray-400 p-2 text-xs">2,200</td>
                    <td className="border border-gray-400 p-2 text-xs">1,150</td>
                    <td className="border border-gray-400 p-2 text-xs">850</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Apr</td>
                    <td className="border border-gray-400 p-2 text-xs">2,350</td>
                    <td className="border border-gray-400 p-2 text-xs">1,100</td>
                    <td className="border border-gray-400 p-2 text-xs">900</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">May</td>
                    <td className="border border-gray-400 p-2 text-xs">2,500</td>
                    <td className="border border-gray-400 p-2 text-xs">1,050</td>
                    <td className="border border-gray-400 p-2 text-xs">980</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Jun</td>
                    <td className="border border-gray-400 p-2 text-xs">2,650</td>
                    <td className="border border-gray-400 p-2 text-xs">1,000</td>
                    <td className="border border-gray-400 p-2 text-xs">1,050</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Monthly Costs
              </div>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs text-left">Cost type</th>
                    <th className="border border-gray-400 p-2 bg-gray-100 text-xs">Monthly cost (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Content licences</td>
                    <td className="border border-gray-400 p-2 text-xs">180,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Staff wages</td>
                    <td className="border border-gray-400 p-2 text-xs">95,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Marketing</td>
                    <td className="border border-gray-400 p-2 text-xs">60,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Platform & servers</td>
                    <td className="border border-gray-400 p-2 text-xs">45,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-2 text-xs text-left">Customer support</td>
                    <td className="border border-gray-400 p-2 text-xs">20,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="issues-box border-2 border-[#3448C5] bg-orange-50 p-3 rounded-lg">
              <div className="issues-title text-sm font-bold text-[#3448C5] mb-2">
                Recent Issues
              </div>
              <div className="issues-content text-xs space-y-1">
                <p>• Customers complain about rising prices</p>
                <p>• Competitors offer cheaper short-term deals</p>
                <p>• Some users cancel after contracts end</p>
                <p>• Marketing costs have increased</p>
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

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Calculate Monthly Income
              </div>
              <div className="space-y-2">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total income from Basic plan:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total income from Standard plan:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total income from Premium plan:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total monthly income:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Profit Check
              </div>
              <div className="space-y-2">
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Total monthly costs:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
                <div>
                  <p className="calc-prompt text-xs font-bold mb-1">Estimated monthly profit or loss:</p>
                  <div className="calc-space border border-gray-300 bg-gray-50 p-2 rounded"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: SWOT Analysis
              </div>
              <div className="swot-grid grid grid-cols-2 gap-3">
                <div className="swot-box strengths border-2 border-[#3448C5] bg-green-50 p-3 rounded" style={{ minHeight: '120px' }}>
                  <div className="swot-title text-sm font-bold text-[#3448C5] mb-2">Strengths</div>
                </div>
                <div className="swot-box weaknesses border-2 border-[#3448C5] bg-red-50 p-3 rounded" style={{ minHeight: '120px' }}>
                  <div className="swot-title text-sm font-bold text-[#3448C5] mb-2">Weaknesses</div>
                </div>
                <div className="swot-box opportunities border-2 border-[#3448C5] bg-blue-50 p-3 rounded" style={{ minHeight: '120px' }}>
                  <div className="swot-title text-sm font-bold text-[#3448C5] mb-2">Opportunities</div>
                </div>
                <div className="swot-box threats border-2 border-[#3448C5] bg-yellow-50 p-3 rounded" style={{ minHeight: '120px' }}>
                  <div className="swot-title text-sm font-bold text-[#3448C5] mb-2">Threats</div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Strategic Decisions
              </div>
              <div className="space-y-2">
                <div>
                  <p className="question text-xs font-bold mb-1">Which subscription plan is most important to the business? Why?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Should the company change its contract lengths? Explain.</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
                <div>
                  <p className="question text-xs font-bold mb-1">Is the Premium plan worth the long-term commitment for customers?</p>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                  <div className="answer-line border-b border-gray-400 h-4"></div>
                </div>
              </div>
            </div>

            <div className="section mb-3">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Recommendation
              </div>
              <div className="recommendation-prompts text-xs italic text-gray-600 mb-2">
                Include: One change to pricing or contracts • One way to reduce risk • One way to improve value for customers
              </div>
              <div className="recommendation-box border-2 border-[#3448C5] bg-blue-50 p-3 rounded-lg">
                <div className="recommendation-title text-base font-bold text-[#3448C5] mb-2 text-center">
                  My Recommendation to StreamSmart
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-2 rounded space-y-2">
                <div className="sentence-starter text-xs leading-relaxed">
                  A strength of this business model is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  A major risk for subscription businesses is
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[180px] mx-1"></span>
                </div>
                <div className="answer-line border-b border-gray-400 h-4"></div>
                <div className="sentence-starter text-xs leading-relaxed">
                  Long-term contracts can be good or bad because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[160px] mx-1"></span>
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