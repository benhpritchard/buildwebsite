import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function PricingDemandWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('pricing-demand-content');
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
          <title>Pricing and Demand: Finding a Fair Price</title>
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
                font-size: 16pt;
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
              
              .data-table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .data-table td, .data-table th {
                border: 1px solid #999;
                padding: 0.15cm;
                font-size: 8pt;
                text-align: center;
              }
              
              .data-table th {
                background: #f8f9fa;
                font-weight: bold;
                font-size: 8.5pt;
              }
              
              .cost-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.25cm;
                border-radius: 0.1cm;
              }
              
              .cost-item {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 0.2cm;
                margin-bottom: 0.15cm;
                align-items: center;
              }
              
              .cost-label {
                font-size: 8.5pt;
                font-weight: bold;
                color: #3448C5;
              }
              
              .cost-input {
                border: 1px solid #999;
                background: white;
                height: 0.6cm;
                border-radius: 0.1cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Pricing and Demand: Finding a Fair Price</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="pricing-demand-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-4">
              <h1 className="title text-3xl font-bold text-[#3448C5]">
                Pricing and Demand: Finding a Fair Price
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
                Business Notes: School Book Fair
              </div>
              <div className="notes-content text-sm space-y-1">
                <p className="mb-2">A school runs a one-day book fair selling notebooks.</p>
                <p>• Each notebook costs AED 6 to buy from the supplier</p>
                <p>• The stall has 80 notebooks available</p>
                <p>• Posters cost AED 20</p>
                <p>• Table hire costs AED 40</p>
                <p className="mt-3 mb-2">The stall owner is testing different prices:</p>
                <p>• At AED 10, 50 notebooks are sold</p>
                <p>• At AED 12, 40 notebooks are sold</p>
                <p>• At AED 14, 28 notebooks are sold</p>
              </div>
            </div>

            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 1: Record the Data
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Complete the table using the information above.
              </p>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Price per notebook (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Number sold</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Total income (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>10</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>12</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>14</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 2: Costs
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Calculate the total costs.
              </p>
              <div className="cost-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg space-y-3">
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">Cost of notebooks sold at each price:</p>
                  <div className="cost-item grid grid-cols-2 gap-4 items-center mb-2">
                    <span className="cost-label text-sm text-[#3448C5]">At AED 10 (50 notebooks):</span>
                    <div className="cost-input border border-gray-400 bg-white h-10 rounded"></div>
                  </div>
                  <div className="cost-item grid grid-cols-2 gap-4 items-center mb-2">
                    <span className="cost-label text-sm text-[#3448C5]">At AED 12 (40 notebooks):</span>
                    <div className="cost-input border border-gray-400 bg-white h-10 rounded"></div>
                  </div>
                  <div className="cost-item grid grid-cols-2 gap-4 items-center">
                    <span className="cost-label text-sm text-[#3448C5]">At AED 14 (28 notebooks):</span>
                    <div className="cost-input border border-gray-400 bg-white h-10 rounded"></div>
                  </div>
                </div>

                <div className="cost-item grid grid-cols-2 gap-4 items-center">
                  <span className="cost-label text-sm text-[#3448C5]">Advertising cost:</span>
                  <div className="cost-input border border-gray-400 bg-white h-10 rounded"></div>
                </div>
                <div className="cost-item grid grid-cols-2 gap-4 items-center">
                  <span className="cost-label text-sm text-[#3448C5]">Table hire cost:</span>
                  <div className="cost-input border border-gray-400 bg-white h-10 rounded"></div>
                </div>
              </div>
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
                Section 3: Profit Comparison
              </div>
              <p className="instruction text-sm italic text-gray-600 mb-3">
                Work out the profit or loss for each price.
              </p>
              <table className="data-table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 bg-gray-100">Price</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Total income (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Total costs (AED)</th>
                    <th className="border border-gray-400 p-2 bg-gray-100">Profit or loss (AED)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>AED 10</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>AED 12</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-3" style={{ height: '45px' }}>AED 14</td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                    <td className="border border-gray-400 p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section mb-5">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 4: Decision Making
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm mb-1 font-semibold">Which price gives the highest profit?</p>
                  <div className="reflection-line border-b border-gray-400 h-8"></div>
                </div>
                <div>
                  <p className="text-sm mb-1 font-semibold">Which price do you think is the fairest for customers?</p>
                  <div className="reflection-line border-b border-gray-400 h-8"></div>
                </div>
                <div>
                  <p className="text-sm mb-1 font-semibold">Explain your choices:</p>
                  <div className="reflection-line border-b border-gray-400 h-8"></div>
                  <div className="reflection-line border-b border-gray-400 h-8 mt-2"></div>
                  <div className="reflection-line border-b border-gray-400 h-8 mt-2"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded mb-2">
                Section 5: Reflection
              </div>
              <div className="space-y-2">
                <div className="sentence-starter text-sm">
                  If the price is too high, demand may
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[250px] mx-1"></span>
                </div>
                <div className="reflection-line border-b border-gray-600 h-8"></div>
                <div className="sentence-starter text-sm">
                  A fair price is important because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="reflection-line border-b border-gray-600 h-8"></div>
                <div className="sentence-starter text-sm">
                  Businesses must balance profit and demand because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[200px] mx-1"></span>
                </div>
                <div className="reflection-line border-b border-gray-600 h-8"></div>
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