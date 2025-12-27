import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function ValuePriceStandaloneWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('value-price-standalone-content');
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
          <title>Value and Price</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4 portrait;
                margin: 0.8cm;
              }
              
              body {
                margin: 0;
                padding: 0.4cm;
                font-family: Arial, sans-serif;
                font-size: 9pt;
                line-height: 1.3;
              }
              
              .worksheet-container {
                border: 3px solid #3448C5;
                padding: 0.4cm;
                background: white;
                height: 27.5cm;
                display: flex;
                flex-direction: column;
              }
              
              .header {
                text-align: center;
                margin-bottom: 0.3cm;
              }
              
              .title {
                font-size: 18pt;
                font-weight: bold;
                color: #3448C5;
                margin-bottom: 0.2cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.3cm;
                margin-bottom: 0.3cm;
              }
              
              .info-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.15cm 0.25cm;
                border-radius: 0.15cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 8pt;
              }
              
              .info-line {
                border-bottom: 1px solid #ccc;
                height: 0.4cm;
                margin-top: 0.1cm;
              }
              
              .section {
                margin-bottom: 0.35cm;
                page-break-inside: avoid;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 11pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.15cm 0.25cm;
                border-radius: 0.15cm;
                margin-bottom: 0.2cm;
              }
              
              .comparison-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .comparison-table td {
                border: 1px solid #ccc;
                padding: 0.12cm 0.2cm;
                font-size: 8pt;
              }
              
              .comparison-table td:first-child,
              .comparison-table td:nth-child(2) {
                width: 35%;
              }
              
              .comparison-table td:nth-child(3) {
                width: 30%;
                text-align: center;
              }
              
              .checkbox {
                width: 0.35cm;
                height: 0.35cm;
                border: 1px solid #666;
                display: inline-block;
                vertical-align: middle;
                margin: 0 0.1cm;
              }
              
              .value-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .value-table td {
                border: 1px solid #ccc;
                padding: 0.15cm;
                vertical-align: top;
              }
              
              .value-table td:first-child {
                font-weight: bold;
                width: 35%;
                background: #f8f9fa;
                font-size: 8.5pt;
              }
              
              .value-table td:last-child {
                width: 65%;
              }
              
              .writing-lines {
                display: flex;
                flex-direction: column;
                gap: 0.15cm;
              }
              
              .writing-line {
                border-bottom: 1px solid #999;
                height: 0.5cm;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.25cm;
                border-radius: 0.15cm;
              }
              
              .reflection-text {
                font-size: 9pt;
                line-height: 1.6;
              }
              
              .reflection-line {
                border-bottom: 2px solid #999;
                display: inline-block;
                min-width: 6cm;
                margin: 0 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.4cm;
                right: 0.4cm;
                opacity: 0.15;
                width: 1.5cm;
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

  const itemPairs = [
    { itemA: 'Small toy', itemB: 'Larger toy' },
    { itemA: 'Basic pencil', itemB: 'Coloured pencil set' },
    { itemA: 'Single snack', itemB: 'Multipack' },
    { itemA: 'Thin notebook', itemB: 'Thick notebook' },
    { itemA: 'Plain water bottle', itemB: 'Insulated bottle' },
    { itemA: 'Small book', itemB: 'Longer book' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Value and Price</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="value-price-standalone-content" className="p-4">
          <div className="worksheet-container border-4 border-[#3448C5] p-6 bg-white">
            
            {/* Header */}
            <div className="header text-center mb-4">
              <h1 className="title text-3xl font-bold text-[#3448C5] mb-2">
                Value and Price
              </h1>
            </div>

            {/* Info Section */}
            <div className="info-section grid grid-cols-2 gap-4 mb-4">
              <div className="info-box border-2 border-[#3448C5] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#3448C5]">Name:</div>
                <div className="info-line border-b-2 border-gray-300 h-6 mt-1"></div>
              </div>
              <div className="info-box border-2 border-[#3448C5] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#3448C5]">Year:</div>
                <div className="info-line border-b-2 border-gray-300 h-6 mt-1"></div>
              </div>
            </div>

            {/* Section 1: Comparison Table */}
            <div className="section mb-6">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
                Section 1: Which is better value?
              </div>
              <table className="comparison-table w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 p-2 font-bold text-sm">Item A (lower price)</td>
                    <td className="border border-gray-300 p-2 font-bold text-sm">Item B (higher price)</td>
                    <td className="border border-gray-300 p-2 font-bold text-sm text-center">Better value</td>
                  </tr>
                </thead>
                <tbody>
                  {itemPairs.map((pair, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2">{pair.itemA}</td>
                      <td className="border border-gray-300 p-2">{pair.itemB}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="checkbox inline-block w-4 h-4 border border-gray-600 mr-1"></span> A
                        <span className="checkbox inline-block w-4 h-4 border border-gray-600 ml-2 mr-1"></span> B
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Good Value Examples */}
            <div className="section mb-6">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
                Section 2: What makes good value?
              </div>
              <table className="value-table w-full border-collapse">
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Item</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Why it is good value</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Item</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Why it is good value</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Item</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Why it is good value</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            {/* Section 3: Reflection */}
            <div className="section">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
                Section 3: Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-4 rounded-lg">
                <p className="reflection-text text-base leading-relaxed">
                  Something can be good value even if it costs more because
                  <span className="reflection-line border-b-2 border-gray-600 inline-block min-w-[400px] mx-1"></span>
                  <span className="reflection-line border-b-2 border-gray-600 inline-block w-full mt-2"></span>
                </p>
              </div>
            </div>

            {/* Logo */}
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