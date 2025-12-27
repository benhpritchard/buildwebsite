import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function ChocolateBaseWorksheet({ open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('chocolate-worksheet-content');
    const printWindow = window.open('', '', 'width=800,height=600');
    
    // Get all stylesheets from the parent document
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
          <title>Budget Bar Worksheet</title>
          <style>
            ${styles}
            
            @media print {
              @page {
                size: A4;
                margin: 0.3cm;
              }
              
              body {
                margin: 0;
                padding: 0.25cm;
                font-family: Arial, sans-serif;
                font-size: 8pt;
                line-height: 1.1;
              }
              
              .print-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.2cm;
                padding-bottom: 0.15cm;
                border-bottom: 2px solid #3448C5;
              }
              
              .print-title {
                font-size: 14pt;
                font-weight: bold;
                color: #3448C5;
              }
              
              .student-info {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.2cm;
                margin-bottom: 0.2cm;
              }
              
              .info-field {
                display: flex;
                align-items: center;
                gap: 0.2cm;
              }
              
              .info-label {
                font-weight: bold;
                font-size: 9pt;
              }
              
              .info-input {
                flex: 1;
                border-bottom: 1px solid #333;
                min-height: 0.5cm;
              }
              
              .section-title {
                font-size: 9pt;
                font-weight: bold;
                color: #3448C5;
                margin-top: 0.2cm;
                margin-bottom: 0.15cm;
                padding: 0.08cm 0.15cm;
                background-color: #f0f4ff;
                border-left: 3px solid #3448C5;
              }
              
              .ingredients-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.2cm;
                margin-bottom: 0.2cm;
              }
              
              .ingredient-category {
                border: 1px solid #ddd;
                padding: 0.15cm;
                border-radius: 4px;
              }
              
              .category-header {
                font-weight: bold;
                font-size: 8pt;
                margin-bottom: 0.1cm;
                color: #3448C5;
                border-bottom: 1px solid #3448C5;
                padding-bottom: 0.03cm;
              }
              
              .ingredient-list {
                font-size: 7pt;
                line-height: 1.2;
              }
              
              .ingredient-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.03cm;
              }
              
              .planning-section {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 0.2cm;
                margin-top: 0.2cm;
              }
              
              .plan-box {
                border: 2px solid #FFB68B;
                padding: 0.2cm;
                border-radius: 4px;
                min-height: 2.2cm;
              }
              
              .budget-tracker {
                border: 2px solid #35D0BA;
                padding: 0.2cm;
                border-radius: 4px;
              }
              
              .budget-label {
                font-weight: bold;
                font-size: 9pt;
                color: #35D0BA;
                text-align: center;
                margin-bottom: 0.1cm;
              }
              
              .budget-amount {
                font-size: 16pt;
                font-weight: bold;
                color: #35D0BA;
                text-align: center;
                margin-bottom: 0.2cm;
              }
              
              .cost-items {
                font-size: 7pt;
                line-height: 1.3;
              }
              
              .cost-line {
                display: flex;
                justify-content: space-between;
                padding: 0.08cm 0;
                border-bottom: 1px dashed #ddd;
              }
              
              .reflection-box {
                border: 2px solid #8B5CF6;
                padding: 0.2cm;
                border-radius: 4px;
                margin-top: 0.2cm;
                min-height: 1.5cm;
              }
              
              .logo {
                position: fixed;
                bottom: 0.5cm;
                right: 0.5cm;
                opacity: 0.3;
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Budget Bar Worksheet</DialogTitle>
          <Button onClick={handlePrint} className="gap-2 bg-[#FFB68B] hover:bg-[#ff9d6e]">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>

        <div id="chocolate-worksheet-content" className="space-y-4">
          {/* Header */}
          <div className="print-header border-b-2 border-[#3448C5] pb-3">
            <h1 className="print-title text-2xl font-bold text-[#3448C5]">Budget Bar Challenge</h1>
            <p className="text-sm text-gray-600">Design your dream chocolate bar within budget!</p>
          </div>

          {/* Student Info */}
          <div className="student-info grid grid-cols-2 gap-3 text-sm">
            <div className="info-field flex items-center gap-2">
              <span className="info-label font-bold">Name:</span>
              <div className="info-input flex-1 border-b border-gray-400 pb-1"></div>
            </div>
            <div className="info-field flex items-center gap-2">
              <span className="info-label font-bold">Year:</span>
              <div className="info-input flex-1 border-b border-gray-400 pb-1"></div>
            </div>
          </div>

          {/* Ingredients Price List */}
          <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 border-l-4 border-[#3448C5]">
            Ingredient Price List
          </div>

          <div className="ingredients-grid grid grid-cols-2 gap-3 text-xs">
            {/* Chocolate Base */}
            <div className="ingredient-category border border-gray-200 p-2 rounded">
              <div className="category-header text-xs font-bold text-[#3448C5] border-b border-[#3448C5] pb-1 mb-2">
                Chocolate Base
              </div>
              <div className="ingredient-list space-y-0.5">
                <div className="ingredient-item flex justify-between">
                  <span>Dark chocolate</span>
                  <span className="font-semibold">7p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Milk chocolate</span>
                  <span className="font-semibold">11p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>White chocolate</span>
                  <span className="font-semibold">14p</span>
                </div>
              </div>
            </div>

            {/* Flavourings */}
            <div className="ingredient-category border border-gray-200 p-2 rounded">
              <div className="category-header text-xs font-bold text-[#3448C5] border-b border-[#3448C5] pb-1 mb-2">
                Flavourings to Add
              </div>
              <div className="ingredient-list space-y-0.5">
                <div className="ingredient-item flex justify-between">
                  <span>Vanilla essence</span>
                  <span className="font-semibold">4p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Orange essence</span>
                  <span className="font-semibold">6p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Coffee</span>
                  <span className="font-semibold">12p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Mint</span>
                  <span className="font-semibold">5p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Rose</span>
                  <span className="font-semibold">14p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Cinnamon</span>
                  <span className="font-semibold">6p</span>
                </div>
              </div>
            </div>

            {/* Inside the Bar */}
            <div className="ingredient-category border border-gray-200 p-2 rounded">
              <div className="category-header text-xs font-bold text-[#3448C5] border-b border-[#3448C5] pb-1 mb-2">
                Inside the Bar
              </div>
              <div className="ingredient-list space-y-0.5">
                <div className="ingredient-item flex justify-between">
                  <span>Solid chocolate</span>
                  <span className="font-semibold">0p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Wafer</span>
                  <span className="font-semibold">8p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Nougat</span>
                  <span className="font-semibold">10p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Caramel</span>
                  <span className="font-semibold">7p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Nuts</span>
                  <span className="font-semibold">4p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Bubbles</span>
                  <span className="font-semibold">2p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Marshmallow</span>
                  <span className="font-semibold">8p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Liquorice</span>
                  <span className="font-semibold">10p</span>
                </div>
                <div className="ingredient-item flex justify-between">
                  <span>Peanut butter</span>
                  <span className="font-semibold">18p</span>
                </div>
              </div>
            </div>

            {/* Toppings & Colouring */}
            <div className="space-y-2">
              {/* Toppings */}
              <div className="ingredient-category border border-gray-200 p-2 rounded">
                <div className="category-header text-xs font-bold text-[#3448C5] border-b border-[#3448C5] pb-1 mb-2">
                  Toppings
                </div>
                <div className="ingredient-list space-y-0.5">
                  <div className="ingredient-item flex justify-between">
                    <span>Chocolate chips</span>
                    <span className="font-semibold">4p</span>
                  </div>
                  <div className="ingredient-item flex justify-between">
                    <span>Popping candy</span>
                    <span className="font-semibold">12p</span>
                  </div>
                  <div className="ingredient-item flex justify-between">
                    <span>Caramel</span>
                    <span className="font-semibold">7p</span>
                  </div>
                  <div className="ingredient-item flex justify-between">
                    <span>Liquorice</span>
                    <span className="font-semibold">10p</span>
                  </div>
                  <div className="ingredient-item flex justify-between">
                    <span>Sprinkles</span>
                    <span className="font-semibold">6p</span>
                  </div>
                  <div className="ingredient-item flex justify-between">
                    <span>Peanut butter</span>
                    <span className="font-semibold">18p</span>
                  </div>
                </div>
              </div>

              {/* Food Colouring */}
              <div className="ingredient-category border border-gray-200 p-2 rounded">
                <div className="category-header text-xs font-bold text-[#3448C5] border-b border-[#3448C5] pb-1 mb-2">
                  Food Colouring
                </div>
                <div className="ingredient-list">
                  <p className="text-xs mb-1">Red, Blue, White, Green, Yellow, Orange, Purple</p>
                  <p className="text-xs font-semibold text-green-600">1 colour is FREE</p>
                  <p className="text-xs font-semibold">Additional colours: 5p each</p>
                </div>
              </div>
            </div>
          </div>

          {/* Planning Section */}
          <div className="section-title text-sm font-bold text-[#3448C5] bg-blue-50 p-2 border-l-4 border-[#3448C5]">
            Design Your Chocolate Bar
          </div>

          <div className="planning-section grid grid-cols-3 gap-3">
            <div className="col-span-2 plan-box border-2 border-[#FFB68B] p-3 rounded">
              <p className="text-xs font-bold text-[#FFB68B] mb-2">My Chocolate Bar Plan:</p>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold">Base: </span>
                  <div className="border-b border-gray-300 mt-1"></div>
                </div>
                <div>
                  <span className="font-semibold">Flavouring: </span>
                  <div className="border-b border-gray-300 mt-1"></div>
                </div>
                <div>
                  <span className="font-semibold">Inside: </span>
                  <div className="border-b border-gray-300 mt-1"></div>
                </div>
                <div>
                  <span className="font-semibold">Topping: </span>
                  <div className="border-b border-gray-300 mt-1"></div>
                </div>
                <div>
                  <span className="font-semibold">Colours: </span>
                  <div className="border-b border-gray-300 mt-1"></div>
                </div>
              </div>
            </div>

            <div className="budget-tracker border-2 border-[#35D0BA] p-3 rounded">
              <div className="budget-label text-xs font-bold text-[#35D0BA] text-center mb-1">
                Your Budget
              </div>
              <div className="budget-amount text-3xl font-bold text-[#35D0BA] text-center mb-3">
                45p
              </div>
              <div className="cost-items text-xs space-y-1">
                <div className="cost-line flex justify-between py-1 border-b border-dashed border-gray-300">
                  <span>Base:</span>
                  <span>____p</span>
                </div>
                <div className="cost-line flex justify-between py-1 border-b border-dashed border-gray-300">
                  <span>Flavouring:</span>
                  <span>____p</span>
                </div>
                <div className="cost-line flex justify-between py-1 border-b border-dashed border-gray-300">
                  <span>Inside:</span>
                  <span>____p</span>
                </div>
                <div className="cost-line flex justify-between py-1 border-b border-dashed border-gray-300">
                  <span>Topping:</span>
                  <span>____p</span>
                </div>
                <div className="cost-line flex justify-between py-1 border-b border-dashed border-gray-300">
                  <span>Colours:</span>
                  <span>____p</span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t-2 border-[#35D0BA] mt-2">
                  <span>TOTAL:</span>
                  <span>____p</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div className="reflection-box border-2 border-[#8B5CF6] p-3 rounded">
            <p className="text-xs font-bold text-[#8B5CF6] mb-2">Reflection: Did you stay within budget? What changes did you make?</p>
            <div className="space-y-1">
              <div className="border-b border-gray-300"></div>
              <div className="border-b border-gray-300"></div>
              <div className="border-b border-gray-300"></div>
            </div>
          </div>

          {/* Logo */}
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
            alt="FinnQuest Logo"
            className="logo fixed bottom-4 right-4 opacity-30 w-16"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}