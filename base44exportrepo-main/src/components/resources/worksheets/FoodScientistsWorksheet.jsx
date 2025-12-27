import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function FoodScientistsWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('food-scientists-content');
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
          <title>Food Scientists Scoring Chart</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4 landscape;
                margin: 0.5cm;
              }
              
              body {
                margin: 0;
                padding: 0.4cm;
                font-family: Arial, sans-serif;
                font-size: 10pt;
                line-height: 1.2;
              }
              
              .worksheet-container {
                border: 4px solid #FFB68B;
                padding: 0.6cm;
                height: 19cm;
                display: flex;
                flex-direction: column;
                background: linear-gradient(135deg, #fff 0%, #fffaf5 100%);
              }
              
              .header {
                text-align: center;
                margin-bottom: 0.5cm;
              }
              
              .title {
                font-size: 22pt;
                font-weight: bold;
                color: #FFB68B;
                margin-bottom: 0.2cm;
                text-transform: uppercase;
                letter-spacing: 2px;
              }
              
              .subtitle {
                font-size: 12pt;
                color: #666;
                font-style: italic;
              }
              
              .info-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.4cm;
                margin-bottom: 0.4cm;
              }
              
              .info-box {
                border: 2px solid #FFB68B;
                background: white;
                padding: 0.2cm 0.4cm;
                border-radius: 0.2cm;
              }
              
              .info-label {
                font-weight: bold;
                color: #FFB68B;
                font-size: 9pt;
              }
              
              .info-line {
                border-bottom: 1px solid #ccc;
                height: 0.6cm;
                margin-top: 0.1cm;
              }
              
              .scoring-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 0.5cm;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              
              .scoring-table th {
                background: linear-gradient(135deg, #FFB68B 0%, #ff9d6e 100%);
                color: white;
                padding: 0.3cm;
                font-size: 10pt;
                font-weight: bold;
                border: 2px solid #FFB68B;
                text-align: center;
              }
              
              .scoring-table th:first-child {
                width: 15%;
              }
              
              .scoring-table th.taste-col {
                width: 10%;
              }
              
              .scoring-table th:last-child {
                width: 25%;
              }
              
              .scoring-table td {
                border: 2px solid #FFB68B;
                padding: 0.25cm;
                height: 2.2cm;
                background: white;
              }
              
              .scoring-table tr:nth-child(even) td {
                background: #fffaf5;
              }
              
              .legend {
                display: flex;
                justify-content: center;
                gap: 1cm;
                margin-top: 0.3cm;
              }
              
              .legend-item {
                font-size: 9pt;
                color: #666;
              }
              
              .emoji {
                font-size: 11pt;
                margin-right: 0.1cm;
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#FFB68B]">Food Scientists Scoring Chart</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#FFB68B] hover:bg-[#ff9d6e]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="food-scientists-content" className="p-4">
          <div className="worksheet-container border-4 border-[#FFB68B] p-8 bg-gradient-to-br from-white to-orange-50">
            
            {/* Header */}
            <div className="header text-center mb-6">
              <h1 className="title text-4xl font-bold text-[#FFB68B] mb-2 uppercase tracking-wider">
                🧪 Food Scientists Tasting Lab 🧪
              </h1>
              <p className="subtitle text-base text-gray-600 italic">Rate each chocolate combination!</p>
            </div>

            {/* Info Section */}
            <div className="info-section grid grid-cols-2 gap-4 mb-6">
              <div className="info-box border-2 border-[#FFB68B] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#FFB68B]">Name:</div>
                <div className="info-line border-b-2 border-gray-300 h-8 mt-1"></div>
              </div>
              <div className="info-box border-2 border-[#FFB68B] bg-white p-3 rounded-lg">
                <div className="info-label text-sm font-bold text-[#FFB68B]">Year:</div>
                <div className="info-line border-b-2 border-gray-300 h-8 mt-1"></div>
              </div>
            </div>

            {/* Scoring Table */}
            <table className="scoring-table w-full border-collapse shadow-lg mb-4">
              <thead>
                <tr>
                  <th className="bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    Combination
                  </th>
                  <th className="taste-col bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    😋 Sweet
                  </th>
                  <th className="taste-col bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    🍋 Sour
                  </th>
                  <th className="taste-col bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    😖 Bitter
                  </th>
                  <th className="taste-col bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    🧂 Salt
                  </th>
                  <th className="taste-col bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    ⭐ Overall
                  </th>
                  <th className="bg-gradient-to-r from-[#FFB68B] to-[#ff9d6e] text-white p-3 border-2 border-[#FFB68B]">
                    💭 Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((row) => (
                  <tr key={row}>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                    <td className="border-2 border-[#FFB68B] p-3 bg-white"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="legend flex justify-center gap-8 mt-4">
              <div className="legend-item text-sm text-gray-600">
                <span className="emoji text-lg">👍</span> = I like it!
              </div>
              <div className="legend-item text-sm text-gray-600">
                <span className="emoji text-lg">😐</span> = It's okay
              </div>
              <div className="legend-item text-sm text-gray-600">
                <span className="emoji text-lg">👎</span> = Not for me
              </div>
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