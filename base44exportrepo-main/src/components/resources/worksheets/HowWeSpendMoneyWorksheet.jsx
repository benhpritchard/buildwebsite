import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function HowWeSpendMoneyWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('how-we-spend-money-content');
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
          <title>How Do We Spend Our Money?</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4 portrait;
                margin: 0.5cm;
              }
              
              body {
                margin: 0;
                padding: 0.4cm;
                font-family: Arial, sans-serif;
                font-size: 11pt;
                line-height: 1.3;
              }
              
              .worksheet-container {
                height: 28cm;
                display: flex;
                flex-direction: column;
              }
              
              .title {
                font-size: 20pt;
                font-weight: bold;
                text-align: center;
                margin-bottom: 0.4cm;
                text-transform: uppercase;
              }
              
              .info-line {
                display: flex;
                gap: 0.3cm;
                align-items: center;
                margin-bottom: 0.3cm;
              }
              
              .info-label {
                font-weight: bold;
                font-size: 10pt;
              }
              
              .line {
                flex: 1;
                border-bottom: 1px solid #000;
                height: 0.6cm;
              }
              
              .section {
                margin-bottom: 0.4cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 12pt;
                margin-bottom: 0.2cm;
              }
              
              .spending-item {
                display: grid;
                grid-template-columns: 1fr 2fr;
                border-bottom: 1px solid #ccc;
                padding: 0.15cm 0;
                align-items: center;
              }
              
              .item-name {
                font-size: 10pt;
              }
              
              .choices {
                display: flex;
                gap: 0.8cm;
              }
              
              .choice {
                display: flex;
                align-items: center;
                gap: 0.15cm;
                font-size: 9pt;
              }
              
              .checkbox-box {
                width: 0.45cm;
                height: 0.45cm;
                border: 1px solid #000;
                display: inline-block;
              }
              
              .table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.3cm;
              }
              
              .table th,
              .table td {
                border: 1px solid #000;
                padding: 0.2cm;
                text-align: left;
              }
              
              .table th {
                background: #f0f0f0;
                font-weight: bold;
              }
              
              .reflection {
                margin-top: 0.3cm;
              }
              
              .reflection-text {
                font-size: 10pt;
                margin-bottom: 0.1cm;
              }
              
              .writing-line {
                border-bottom: 1px solid #000;
                height: 0.7cm;
                margin-bottom: 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.8cm;
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

  const spendingItems = [
    'Food', 'Toys', 'Books', 'Clothes',
    'Sweets', 'Games', 'Shoes', 'Presents'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">How Do We Spend Our Money?</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="how-we-spend-money-content" className="p-4">
          <div className="worksheet-container bg-white">
            
            {/* Title */}
            <h1 className="title text-3xl font-bold text-center mb-6 uppercase">
              How Do We Spend Our Money?
            </h1>

            {/* Name and Date */}
            <div className="info-line flex gap-4 items-center mb-4">
              <span className="info-label text-base font-bold">Name:</span>
              <div className="line flex-1 border-b-2 border-black h-8"></div>
              <span className="info-label text-base font-bold">Date:</span>
              <div className="line flex-1 border-b-2 border-black h-8"></div>
            </div>

            {/* Section 1: Spending Choices */}
            <div className="section mb-6">
              <h2 className="section-title text-lg font-bold mb-3">Tick the box for each spending choice:</h2>
              
              <div className="space-y-2">
                {spendingItems.map((item, index) => (
                  <div key={index} className="spending-item grid grid-cols-2 border-b border-gray-300 py-2">
                    <span className="item-name text-base font-medium">{item}</span>
                    <div className="choices flex gap-6">
                      <div className="choice flex items-center gap-2 text-sm">
                        <span className="checkbox-box inline-block w-5 h-5 border-2 border-black"></span>
                        <span>Good</span>
                      </div>
                      <div className="choice flex items-center gap-2 text-sm">
                        <span className="checkbox-box inline-block w-5 h-5 border-2 border-black"></span>
                        <span>Sometimes</span>
                      </div>
                      <div className="choice flex items-center gap-2 text-sm">
                        <span className="checkbox-box inline-block w-5 h-5 border-2 border-black"></span>
                        <span>Not good</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Table */}
            <div className="section mb-6">
              <h2 className="section-title text-lg font-bold mb-3">What would you buy and why?</h2>
              
              <table className="table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-black p-3 bg-gray-100">What I would buy</th>
                    <th className="border-2 border-black p-3 bg-gray-100">Why I would buy it</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((num) => (
                    <tr key={num}>
                      <td className="border-2 border-black p-3 h-16"></td>
                      <td className="border-2 border-black p-3 h-16"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 3: Reflection */}
            <div className="reflection mt-6">
              <h2 className="section-title text-lg font-bold mb-3">Complete this sentence:</h2>
              
              <p className="reflection-text text-base mb-2">I think spending money on _____________ is important because _____________.</p>
              <div className="writing-line border-b-2 border-black h-8 mb-2"></div>
              <div className="writing-line border-b-2 border-black h-8 mb-2"></div>
              <div className="writing-line border-b-2 border-black h-8"></div>
            </div>

            {/* Logo */}
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