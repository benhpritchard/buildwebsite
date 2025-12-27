import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function SchoolBagWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('schoolbag-content');
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
          <title>Fix the Problem: The Ultimate School Bag</title>
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
                margin-bottom: 0.25cm;
              }
              
              .title {
                font-size: 15pt;
                font-weight: bold;
                color: #3448C5;
                margin-bottom: 0.15cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.25cm;
                margin-bottom: 0.3cm;
              }
              
              .info-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.12cm 0.2cm;
                border-radius: 0.1cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #3448C5;
                font-size: 7.5pt;
                display: inline;
              }
              
              .info-line {
                border-bottom: 1px solid #666;
                display: inline-block;
                min-width: 5cm;
                margin-left: 0.2cm;
              }
              
              .problem-box {
                border: 2px solid #3448C5;
                background: #f0f9ff;
                padding: 0.25cm;
                margin-bottom: 0.3cm;
                border-radius: 0.15cm;
              }
              
              .problem-title {
                font-weight: bold;
                font-size: 9.5pt;
                color: #3448C5;
                margin-bottom: 0.15cm;
                text-align: center;
              }
              
              .problem-content {
                font-size: 8pt;
                line-height: 1.4;
              }
              
              .problem-content p {
                margin: 0.08cm 0;
              }
              
              .section {
                margin-bottom: 0.3cm;
              }
              
              .section-title {
                font-weight: bold;
                font-size: 9pt;
                color: #3448C5;
                background: #f0f4ff;
                padding: 0.12cm 0.2cm;
                border-radius: 0.1cm;
                margin-bottom: 0.12cm;
              }
              
              .prompt {
                font-size: 8pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 0.08cm;
              }
              
              .writing-lines {
                display: flex;
                flex-direction: column;
                gap: 0.12cm;
              }
              
              .writing-line {
                border-bottom: 1px solid #999;
                height: 0.45cm;
              }
              
              .brand-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 0.15cm;
              }
              
              .brand-item {
                display: flex;
                align-items: center;
                gap: 0.2cm;
              }
              
              .brand-label {
                font-size: 8pt;
                font-weight: bold;
                color: #3448C5;
                min-width: 3.5cm;
              }
              
              .brand-line {
                border-bottom: 1px solid #999;
                flex: 1;
                height: 0.5cm;
              }
              
              .design-box {
                border: 2px solid #3448C5;
                background: white;
                padding: 0.2cm;
                border-radius: 0.15cm;
                height: 6cm;
              }
              
              .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 0.12cm;
              }
              
              .checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.15cm;
              }
              
              .checkbox {
                width: 0.35cm;
                height: 0.35cm;
                border: 1px solid #666;
                display: inline-block;
                flex-shrink: 0;
              }
              
              .checkbox-label {
                font-size: 7.5pt;
              }
              
              .reflection-box {
                background: #f0f9ff;
                border: 2px solid #3448C5;
                padding: 0.2cm;
                border-radius: 0.1cm;
              }
              
              .sentence-starter {
                font-size: 8pt;
                line-height: 1.6;
                margin-bottom: 0.15cm;
              }
              
              .reflection-line {
                border-bottom: 1px solid #999;
                display: inline-block;
                min-width: 5cm;
                margin: 0 0.1cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.15;
                width: 1.3cm;
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
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Fix the Problem: The Ultimate School Bag</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#3448C5] hover:bg-[#2a3a9f]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="schoolbag-content" className="p-4">
          {/* PAGE 1 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white mb-8">
            <div className="header text-center mb-4">
              <h1 className="title text-2xl font-bold text-[#3448C5]">
                Fix the Problem: The Ultimate School Bag
              </h1>
            </div>

            <div className="info-section grid grid-cols-2 gap-3 mb-4">
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Name:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
              <div className="info-box border-2 border-[#3448C5] p-2 rounded">
                <span className="info-label text-xs font-bold text-[#3448C5]">Year:</span>
                <span className="info-line border-b-2 border-gray-600 inline-block min-w-[180px] ml-2"></span>
              </div>
            </div>

            <div className="problem-box border-2 border-[#3448C5] bg-blue-50 p-4 rounded-lg mb-4">
              <div className="problem-title text-base font-bold text-[#3448C5] mb-2 text-center">
                The Problem
              </div>
              <div className="problem-content text-sm space-y-1">
                <p className="mb-2">Many school bags are not designed for older pupils.</p>
                <p className="mb-2">Common problems include:</p>
                <p>• Bags are too heavy when full</p>
                <p>• Straps cause discomfort</p>
                <p>• Poor organisation for books, laptops, and equipment</p>
                <p>• Bags break easily or are not waterproof</p>
                <p>• They do not suit different body sizes</p>
                <p className="mt-2 font-semibold">Your task is to design a new school bag and a business that solves these problems.</p>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 1: Analysing the Need
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">Which problem is most important to solve? Why?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">Who is the main customer for this product?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 2: Product Design
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">What features will your school bag include? (e.g. compartments, padding, weight distribution, materials)</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">How do these features solve the problems?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 3: Brand & Positioning
              </div>
              <div className="brand-grid space-y-2">
                <div className="brand-item flex items-center gap-3">
                  <span className="brand-label text-sm font-bold text-[#3448C5]">Product name:</span>
                  <div className="brand-line border-b border-gray-600 flex-1 h-8"></div>
                </div>
                <div className="brand-item flex items-center gap-3">
                  <span className="brand-label text-sm font-bold text-[#3448C5]">Company name:</span>
                  <div className="brand-line border-b border-gray-600 flex-1 h-8"></div>
                </div>
                <div className="brand-item flex items-center gap-3">
                  <span className="brand-label text-sm font-bold text-[#3448C5]">Slogan:</span>
                  <div className="brand-line border-b border-gray-600 flex-1 h-8"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 4: Design Sketch
              </div>
              <div className="design-box border-2 border-[#3448C5] bg-white p-4 rounded-lg" style={{ height: '180px' }}>
              </div>
            </div>

            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-15 w-12"
            />
          </div>

          {/* PAGE 2 */}
          <div className="page border-4 border-[#3448C5] p-6 bg-white">
            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 5: Customer Choice
              </div>
              <div className="space-y-3">
                <div>
                  <p className="prompt text-sm font-bold mb-1">Why would students choose your bag instead of other brands?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">Why would parents or schools approve this bag?</p>
                  <div className="writing-lines space-y-2">
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                    <div className="writing-line border-b border-gray-400 h-6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 6: Competition & Strategy
              </div>
              <div className="space-y-2">
                <div>
                  <p className="prompt text-sm font-bold mb-1">One strength of existing school bags:</p>
                  <div className="writing-line border-b border-gray-400 h-6"></div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">One weakness of existing school bags:</p>
                  <div className="writing-line border-b border-gray-400 h-6"></div>
                </div>
                <div>
                  <p className="prompt text-sm font-bold mb-1">One way your business could stay ahead of competitors:</p>
                  <div className="writing-line border-b border-gray-400 h-6"></div>
                </div>
              </div>
            </div>

            <div className="section mb-4">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 7: Predicting Customer Behaviour
              </div>
              <p className="prompt text-sm font-bold mb-2">Customers are most likely to choose my product because:</p>
              <div className="checkbox-group space-y-2 mb-3">
                <div className="checkbox-item flex items-center gap-2">
                  <div className="checkbox w-4 h-4 border border-gray-600"></div>
                  <span className="checkbox-label text-sm">Comfort</span>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <div className="checkbox w-4 h-4 border border-gray-600"></div>
                  <span className="checkbox-label text-sm">Durability</span>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <div className="checkbox w-4 h-4 border border-gray-600"></div>
                  <span className="checkbox-label text-sm">Organisation</span>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <div className="checkbox w-4 h-4 border border-gray-600"></div>
                  <span className="checkbox-label text-sm">Design</span>
                </div>
                <div className="checkbox-item flex items-center gap-2">
                  <div className="checkbox w-4 h-4 border border-gray-600"></div>
                  <span className="checkbox-label text-sm">Value for money</span>
                </div>
              </div>
              <div>
                <p className="prompt text-sm font-bold mb-1">Explain your choice:</p>
                <div className="writing-lines space-y-2">
                  <div className="writing-line border-b border-gray-400 h-6"></div>
                  <div className="writing-line border-b border-gray-400 h-6"></div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title text-base font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">
                Section 8: Reflection
              </div>
              <div className="reflection-box bg-blue-50 border-2 border-[#3448C5] p-3 rounded-lg space-y-2">
                <div className="sentence-starter text-sm leading-relaxed">
                  A successful product solves problems by
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
                <div className="sentence-starter text-sm leading-relaxed">
                  Design choices affect customer behaviour because
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[230px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
                <div className="sentence-starter text-sm leading-relaxed">
                  The most important improvement I made was
                  <span className="reflection-line border-b border-gray-600 inline-block min-w-[280px] mx-1"></span>
                </div>
                <div className="writing-line border-b border-gray-400 h-6"></div>
              </div>
            </div>

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