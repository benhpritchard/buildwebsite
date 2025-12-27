import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function BuildBoxWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('build-box-content');
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
          <title>Build a Box - Cuboid Net</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4;
                margin: 0.4cm;
              }
              
              body {
                margin: 0;
                padding: 0.3cm;
                font-family: Arial, sans-serif;
                font-size: 9pt;
              }
              
              .worksheet-container {
                border: 3px solid #FFB68B;
                padding: 0.4cm;
                height: 28cm;
                display: flex;
                flex-direction: column;
                background: white;
              }
              
              .header {
                text-align: center;
                margin-bottom: 0.3cm;
              }
              
              .title {
                font-size: 18pt;
                font-weight: bold;
                color: #FFB68B;
                margin-bottom: 0.15cm;
                text-transform: uppercase;
              }
              
              .subtitle {
                font-size: 10pt;
                color: #666;
                font-style: italic;
                margin-bottom: 0.2cm;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.3cm;
                margin-bottom: 0.3cm;
              }
              
              .info-box {
                border: 2px solid #FFB68B;
                background: white;
                padding: 0.15cm 0.3cm;
                border-radius: 0.15cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #FFB68B;
                font-size: 8pt;
              }
              
              .info-line {
                border-bottom: 1px solid #ccc;
                height: 0.5cm;
                margin-top: 0.1cm;
              }
              
              .net-container {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0.3cm 0;
              }
              
              .cuboid-net {
                display: grid;
                grid-template-columns: repeat(4, 7cm);
                grid-template-rows: repeat(3, 4.5cm);
                gap: 0;
                position: relative;
              }
              
              .face {
                border: 2px solid #FFB68B;
                background: white;
                position: relative;
              }
              
              .tab {
                background: #ffe8d9;
                border: 2px solid #FFB68B;
                position: absolute;
              }
              
              .tab-top {
                width: calc(100% - 4px);
                height: 1cm;
                top: -1cm;
                left: 0;
                clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
              }
              
              .tab-bottom {
                width: calc(100% - 4px);
                height: 1cm;
                bottom: -1cm;
                left: 0;
                clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
              }
              
              .tab-left {
                width: 1cm;
                height: calc(100% - 4px);
                left: -1cm;
                top: 0;
                clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 90%);
              }
              
              .tab-right {
                width: 1cm;
                height: calc(100% - 4px);
                right: -1cm;
                top: 0;
                clip-path: polygon(0 0, 100% 10%, 100% 90%, 0 100%);
              }
              
              .face.top {
                grid-column: 2;
                grid-row: 1;
              }
              
              .face.left {
                grid-column: 1;
                grid-row: 2;
              }
              
              .face.front {
                grid-column: 2;
                grid-row: 2;
              }
              
              .face.right {
                grid-column: 3;
                grid-row: 2;
              }
              
              .face.back {
                grid-column: 4;
                grid-row: 2;
              }
              
              .face.bottom {
                grid-column: 2;
                grid-row: 3;
              }
              
              .instructions {
                text-align: center;
                font-size: 8pt;
                color: #666;
                margin-top: 0.2cm;
                line-height: 1.3;
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#FFB68B]">Build a Box - Cuboid Net</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#FFB68B] hover:bg-[#ff9d6e]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="build-box-content" className="p-4">
          <div className="worksheet-container border-4 border-[#FFB68B] p-6 bg-white">
            
            {/* Header */}
            <div className="header text-center mb-4">
              <h1 className="title text-3xl font-bold text-[#FFB68B] mb-2 uppercase">
                📦 Build a Box 📦
              </h1>
              <p className="subtitle text-base text-gray-600 italic mb-2">Design your chocolate bar wrapper on this net</p>
            </div>

            {/* Info Section */}
            <div className="info-section grid grid-cols-2 gap-4 mb-4">
              <div className="info-box border-2 border-[#FFB68B] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#FFB68B]">Name:</div>
                <div className="info-line border-b-2 border-gray-300 h-6 mt-1"></div>
              </div>
              <div className="info-box border-2 border-[#FFB68B] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#FFB68B]">Year:</div>
                <div className="info-line border-b-2 border-gray-300 h-6 mt-1"></div>
              </div>
            </div>

            {/* Cuboid Net */}
            <div className="net-container flex items-center justify-center my-6">
              <div className="cuboid-net grid gap-0" style={{ gridTemplateColumns: 'repeat(4, 220px)', gridTemplateRows: 'repeat(3, 140px)' }}>
                {/* Top */}
                <div className="face top border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 2, gridRow: 1 }}>
                  <div className="tab tab-top absolute bg-orange-100 border-2 border-[#FFB68B]"></div>
                </div>
                
                {/* Left */}
                <div className="face left border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 1, gridRow: 2 }}>
                  <div className="tab tab-left absolute bg-orange-100 border-2 border-[#FFB68B]"></div>
                </div>
                
                {/* Front (Main Panel) */}
                <div className="face front border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 2, gridRow: 2 }}>
                </div>
                
                {/* Right */}
                <div className="face right border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 3, gridRow: 2 }}>
                  <div className="tab tab-right absolute bg-orange-100 border-2 border-[#FFB68B]"></div>
                </div>
                
                {/* Back */}
                <div className="face back border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 4, gridRow: 2 }}>
                </div>
                
                {/* Bottom */}
                <div className="face bottom border-2 border-[#FFB68B] bg-white relative" style={{ gridColumn: 2, gridRow: 3 }}>
                  <div className="tab tab-bottom absolute bg-orange-100 border-2 border-[#FFB68B]"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="instructions text-center text-sm text-gray-600 mt-4 leading-relaxed">
              <p className="font-semibold text-[#FFB68B] mb-1">Design Tips:</p>
              <p>Include your company logo, slogan, chocolate bar name, and eye-catching colours!</p>
              <p className="text-xs mt-2">Cut out along the outer edges, fold along the inner lines, and glue the tabs to create your box.</p>
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