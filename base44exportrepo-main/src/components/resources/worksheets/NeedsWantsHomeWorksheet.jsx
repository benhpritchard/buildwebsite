import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function NeedsWantsHomeWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('needs-wants-home-content');
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
          <title>Needs and Wants at Home</title>
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
                font-size: 12pt;
                line-height: 1.3;
              }
              
              .worksheet-container {
                height: 28cm;
                display: flex;
                flex-direction: column;
              }
              
              .title {
                font-size: 22pt;
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
                font-size: 11pt;
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
                font-size: 13pt;
                margin-bottom: 0.2cm;
              }
              
              .table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.3cm;
              }
              
              .table th,
              .table td {
                border: 1px solid #000;
                padding: 0.15cm;
                text-align: left;
              }
              
              .table th {
                background: #f0f0f0;
                font-weight: bold;
                text-align: center;
              }
              
              .table td.item {
                width: 50%;
              }
              
              .table td.checkbox {
                width: 25%;
                text-align: center;
              }
              
              .checkbox-box {
                width: 0.5cm;
                height: 0.5cm;
                border: 1px solid #000;
                display: inline-block;
              }
              
              .sentence-starters {
                margin-top: 0.3cm;
              }
              
              .sentence {
                margin-bottom: 0.4cm;
              }
              
              .sentence-text {
                font-size: 11pt;
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

  const items = [
    'Food', 'Water', 'Toys', 'Clothes',
    'TV', 'Bed', 'Sweets', 'Shoes',
    'Books', 'Phone', 'Medicine', 'Games'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Needs and Wants at Home</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="needs-wants-home-content" className="p-4">
          <div className="worksheet-container bg-white">
            
            {/* Title */}
            <h1 className="title text-4xl font-bold text-center mb-6 uppercase">
              Needs and Wants at Home
            </h1>

            {/* Name and Date */}
            <div className="info-line flex gap-4 items-center mb-4">
              <span className="info-label text-base font-bold">Name:</span>
              <div className="line flex-1 border-b-2 border-black h-8"></div>
              <span className="info-label text-base font-bold">Date:</span>
              <div className="line flex-1 border-b-2 border-black h-8"></div>
            </div>

            {/* Section 1: Table */}
            <div className="section mb-6">
              <h2 className="section-title text-xl font-bold mb-3">Tick the correct box for each item:</h2>
              
              <table className="table w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-black p-2 bg-gray-100">Item</th>
                    <th className="border-2 border-black p-2 bg-gray-100">Need</th>
                    <th className="border-2 border-black p-2 bg-gray-100">Want</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="item border-2 border-black p-2">{item}</td>
                      <td className="checkbox border-2 border-black p-2 text-center">
                        <span className="checkbox-box inline-block w-6 h-6 border-2 border-black"></span>
                      </td>
                      <td className="checkbox border-2 border-black p-2 text-center">
                        <span className="checkbox-box inline-block w-6 h-6 border-2 border-black"></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Sentence Starters */}
            <div className="sentence-starters mt-6">
              <h2 className="section-title text-xl font-bold mb-3">Complete these sentences:</h2>
              
              <div className="sentence mb-5">
                <p className="sentence-text text-base mb-2">I need _____________ because _____________.</p>
                <div className="writing-line border-b-2 border-black h-8 mb-2"></div>
                <div className="writing-line border-b-2 border-black h-8"></div>
              </div>

              <div className="sentence mb-5">
                <p className="sentence-text text-base mb-2">I want _____________ but I do not need it because _____________.</p>
                <div className="writing-line border-b-2 border-black h-8 mb-2"></div>
                <div className="writing-line border-b-2 border-black h-8"></div>
              </div>

              <div className="sentence mb-5">
                <p className="sentence-text text-base mb-2">One thing everyone needs is _____________.</p>
                <div className="writing-line border-b-2 border-black h-8 mb-2"></div>
                <div className="writing-line border-b-2 border-black h-8"></div>
              </div>
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