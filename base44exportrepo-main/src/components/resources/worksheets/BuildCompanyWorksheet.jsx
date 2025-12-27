import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function BuildCompanyWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('business-plan-content');
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
          <title>Business Plan Worksheet</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4;
                margin: 0.5cm;
              }
              
              body {
                margin: 0;
                padding: 0.4cm;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                line-height: 1.2;
              }
              
              .business-plan-container {
                border: 3px solid #333;
                padding: 0.5cm;
                height: 26cm;
                display: flex;
                flex-direction: column;
              }
              
              .plan-header {
                text-align: center;
                border-bottom: 2px solid #333;
                padding-bottom: 0.3cm;
                margin-bottom: 0.3cm;
              }
              
              .plan-title {
                font-size: 20pt;
                font-weight: bold;
                letter-spacing: 3px;
                margin-bottom: 0.2cm;
              }
              
              .team-label {
                font-size: 11pt;
                font-weight: bold;
                text-align: left;
                margin-bottom: 0.2cm;
              }
              
              .decorative-line {
                border-top: 2px solid #FFB68B;
                margin: 0.2cm 0;
              }
              
              .team-lines {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.3cm;
                margin-bottom: 0.4cm;
              }
              
              .team-line {
                border-bottom: 1px solid #333;
                height: 0.6cm;
              }
              
              .logo-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0.5cm 0;
              }
              
              .logo-box {
                width: 8cm;
                height: 8cm;
                border: 2px dashed #888;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #fafafa;
                position: relative;
              }
              
              .logo-text {
                font-size: 12pt;
                font-weight: bold;
                color: #666;
              }
              
              .paperclip {
                position: absolute;
                top: -0.3cm;
                left: 50%;
                transform: translateX(-50%);
                width: 1cm;
                height: 1.5cm;
                border: 2px solid #888;
                border-radius: 0.2cm 0.2cm 0 0;
                background-color: transparent;
              }
              
              .quote-left {
                position: absolute;
                top: 0.3cm;
                right: 0.5cm;
                font-size: 36pt;
                color: #FFB68B;
                font-family: serif;
              }
              
              .quote-right {
                position: absolute;
                bottom: 0.3cm;
                right: 0.5cm;
                font-size: 36pt;
                color: #FFB68B;
                font-family: serif;
              }
              
              .plan-footer {
                text-align: center;
                border-top: 2px solid #333;
                padding-top: 0.3cm;
                margin-top: 0.3cm;
              }
              
              .footer-label {
                font-size: 11pt;
                font-weight: bold;
                margin-bottom: 0.1cm;
              }
              
              .footer-line {
                border-bottom: 1px solid #333;
                height: 0.5cm;
                margin: 0 auto;
                width: 60%;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.2;
                width: 2cm;
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Business Plan Worksheet</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#FFB68B] hover:bg-[#ff9d6e]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="business-plan-content" className="p-4">
          <div className="business-plan-container border-4 border-gray-800 p-8 min-h-[800px] flex flex-col bg-white">
            
            {/* Header */}
            <div className="plan-header text-center border-b-2 border-gray-800 pb-4 mb-4">
              <h1 className="plan-title text-3xl font-bold tracking-widest mb-2">BUSINESS PLAN</h1>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <div className="team-label text-base font-bold mb-2">Team Members:</div>
              <div className="decorative-line border-t-2 border-[#FFB68B] mb-3"></div>
              <div className="team-lines grid grid-cols-2 gap-4 mb-2">
                <div className="team-line border-b-2 border-gray-700 h-8"></div>
                <div className="team-line border-b-2 border-gray-700 h-8"></div>
              </div>
              <div className="team-lines grid grid-cols-2 gap-4">
                <div className="team-line border-b-2 border-gray-700 h-8"></div>
                <div className="team-line border-b-2 border-gray-700 h-8"></div>
              </div>
              <div className="decorative-line border-t-2 border-[#FFB68B] mt-3"></div>
            </div>

            {/* Logo Section */}
            <div className="logo-section flex-1 flex flex-col items-center justify-center my-6 relative">
              <span className="quote-left absolute top-4 right-8 text-6xl text-[#FFB68B] font-serif">"</span>
              
              <div className="logo-box relative w-64 h-64 border-4 border-dashed border-gray-400 flex items-center justify-center bg-gray-50">
                <div className="paperclip absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-12 border-2 border-gray-500 rounded-t-lg bg-transparent"></div>
                <span className="logo-text text-lg font-bold text-gray-500">Company Logo</span>
              </div>
              
              <span className="quote-right absolute bottom-4 right-8 text-6xl text-[#FFB68B] font-serif">"</span>
            </div>

            {/* Footer */}
            <div className="plan-footer text-center border-t-2 border-gray-800 pt-4 mt-4">
              <div className="footer-label text-base font-bold mb-2">Prepared For:</div>
              <div className="footer-line border-b-2 border-gray-700 h-8 mx-auto w-3/5"></div>
            </div>

            {/* Logo */}
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo fixed bottom-4 right-4 opacity-20 w-16"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}