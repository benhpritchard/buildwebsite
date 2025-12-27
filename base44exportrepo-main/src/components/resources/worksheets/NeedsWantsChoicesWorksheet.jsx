import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function NeedsWantsChoicesWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('needs-wants-choices-content');
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
          <title>Needs, Wants and Making Choices</title>
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
              
              .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .items-table td {
                border: 1px solid #ccc;
                padding: 0.12cm 0.2cm;
                font-size: 8.5pt;
              }
              
              .items-table td:first-child {
                width: 60%;
              }
              
              .items-table td:nth-child(2),
              .items-table td:nth-child(3) {
                width: 20%;
                text-align: center;
              }
              
              .checkbox {
                width: 0.35cm;
                height: 0.35cm;
                border: 1px solid #666;
                display: inline-block;
                vertical-align: middle;
              }
              
              .scenario-box {
                background: #fffbea;
                border: 2px solid #f59e0b;
                padding: 0.2cm 0.3cm;
                border-radius: 0.15cm;
                margin-bottom: 0.2cm;
                font-style: italic;
                text-align: center;
                font-size: 9pt;
              }
              
              .choice-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.2cm;
              }
              
              .choice-table td {
                border: 1px solid #ccc;
                padding: 0.15cm;
                vertical-align: top;
              }
              
              .choice-table td:first-child {
                font-weight: bold;
                width: 30%;
                background: #f8f9fa;
                font-size: 8.5pt;
              }
              
              .choice-table td:last-child {
                width: 70%;
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
                min-width: 3cm;
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

  const items = [
    'Food',
    'Water',
    'Toys',
    'Clothes',
    'Books',
    'Games',
    'Shoes',
    'Sweets',
    'Phone',
    'Medicine'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Needs, Wants and Making Choices</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="needs-wants-choices-content" className="p-4">
          <div className="worksheet-container border-4 border-[#3448C5] p-6 bg-white">
            
            {/* Header */}
            <div className="header text-center mb-4">
              <h1 className="title text-3xl font-bold text-[#3448C5] mb-2">
                Needs, Wants and Making Choices
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

            {/* Section 1: Items Table */}
            <div className="section mb-6">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
                Section 1: Sort the Items
              </div>
              <table className="items-table w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 p-2 font-bold text-sm">Item</td>
                    <td className="border border-gray-300 p-2 font-bold text-sm text-center">Need</td>
                    <td className="border border-gray-300 p-2 font-bold text-sm text-center">Want</td>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2">{item}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="checkbox inline-block w-4 h-4 border border-gray-600"></span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="checkbox inline-block w-4 h-4 border border-gray-600"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Making Choices */}
            <div className="section mb-6">
              <div className="section-title text-lg font-bold text-[#3448C5] bg-blue-50 p-3 rounded-lg mb-3">
                Section 2: Making Choices
              </div>
              <div className="scenario-box bg-yellow-50 border-2 border-yellow-500 p-3 rounded-lg mb-3 text-center italic">
                You have a small amount of money and cannot buy everything.
              </div>
              <table className="choice-table w-full border-collapse">
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">What I would buy</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                      <div className="writing-line border-b border-gray-400 h-6"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-bold bg-gray-50">Why I chose it</td>
                  <td className="border border-gray-300 p-3">
                    <div className="writing-lines space-y-2">
                      <div className="writing-line border-b border-gray-400 h-6"></div>
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
                  If I could only buy one thing, I would choose
                  <span className="reflection-line border-b-2 border-gray-600 inline-block min-w-[150px] mx-1"></span>
                  because
                  <span className="reflection-line border-b-2 border-gray-600 inline-block min-w-[200px] mx-1"></span>
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