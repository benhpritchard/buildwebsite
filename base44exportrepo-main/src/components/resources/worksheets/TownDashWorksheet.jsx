import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function TownDashWorksheet({ trigger, open, onOpenChange }) {
  const handlePrint = () => {
    const printContent = document.getElementById('towndash-worksheet-content');
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const styles = `
      <style>
        @media print {
          @page { 
            size: A4; 
            margin: 0.4cm; 
          }
          body { 
            font-family: Arial, sans-serif; 
            padding: 0.2cm; 
            line-height: 1.2; 
            color: #333;
            font-size: 9pt;
          }
          h1 { 
            color: #3448C5; 
            font-size: 14pt; 
            margin-bottom: 3px;
            text-align: center;
          }
          h2 { 
            color: #3448C5; 
            font-size: 11pt; 
            margin-top: 8px; 
            margin-bottom: 4px;
            background-color: #f0f4ff;
            padding: 3px 8px;
            border-radius: 4px;
          }
          .header-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            border-bottom: 2px solid #3448C5;
            padding-bottom: 6px;
          }
          .header-info { 
            display: flex;
            gap: 20px;
            font-size: 9pt;
          }
          .logo-header {
            height: 35px;
            width: auto;
            opacity: 0.8;
          }
          .input-line {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 150px;
            padding: 1px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 6px 0;
            font-size: 8pt;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 4px 6px; 
            text-align: left;
            height: 22px;
          }
          th { 
            background-color: #f0f4ff; 
            font-weight: bold;
          }
          .reflection-box {
            border: 1px solid #ddd;
            padding: 8px;
            min-height: 60px;
            margin: 6px 0;
            background-color: #fafafa;
          }
          .section {
            margin-bottom: 8px;
          }
          .space-y-3 > * + * {
            margin-top: 6px;
          }
          p {
            margin-bottom: 4px;
          }
          .footer-logo {
            text-align: right;
            margin-top: 6px;
            padding-top: 4px;
            border-top: 1px solid #ddd;
          }
          .footer-logo img {
            height: 30px;
            width: auto;
            opacity: 0.5;
          }
        }
      </style>
    `;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Town Dash: My Financial Journey</title>
          ${styles}
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#3448C5]">Town Dash Worksheet</DialogTitle>
          <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2 absolute top-4 right-12">
            <Printer className="w-4 h-4" /> Print Worksheet
          </Button>
        </DialogHeader>
        
        <div id="towndash-worksheet-content" className="p-6">
          <div className="header-section mb-4 pb-3 border-b-2 border-[#3448C5]">
            <div>
              <h1 className="text-2xl font-bold text-[#3448C5] mb-1">Town Dash: My Financial Journey</h1>
              <div className="header-info text-sm">
                <div>
                  <span className="font-bold">Name: </span>
                  <span className="input-line">_______________________</span>
                </div>
                <div>
                  <span className="font-bold">Year: </span>
                  <span className="input-line">7</span>
                </div>
              </div>
            </div>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="logo-header h-14 w-auto"
            />
          </div>

          <div className="section">
            <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">1. Exploring Shops & Expenses</h2>
            
            <div className="mb-3">
              <p className="font-semibold mb-1 text-sm">Define in your own words:</p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Essential Good: </span>
                <span className="input-line w-full block mt-1">_______________________________________________________________________</span>
              </p>
              <p className="mb-1 text-sm">
                <span className="font-medium">Non-Essential Good (Want): </span>
                <span className="input-line w-full block mt-1">_______________________________________________________________________</span>
              </p>
            </div>

            <p className="font-semibold mb-1 text-sm">During your exploration, list 3 items you saw and classify them:</p>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 p-1">Item Name</th>
                  <th className="border border-gray-300 p-1">Shop</th>
                  <th className="border border-gray-300 p-1">Price (AED)</th>
                  <th className="border border-gray-300 p-1">Essential / Non-Essential</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 h-6"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 h-6"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 h-6"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section">
            <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">2. Decision Time! (Scenarios)</h2>
            <p className="font-semibold mb-1 text-sm">Choose 2 memorable scenarios from the game. What did you choose and what were the main impacts?</p>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 p-1">Scenario Summary</th>
                  <th className="border border-gray-300 p-1">My Choice</th>
                  <th className="border border-gray-300 p-1">Main Impacts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 h-10"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 h-10"></td>
                  <td className="border border-gray-300 p-1"></td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section">
            <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">3. My Financial Profile</h2>
            
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">My Spender Type: </span>
                <span className="input-line">_______________________________________________</span>
              </p>
              <p>
                <span className="font-semibold">What does this mean for me? </span>
                <span className="input-line block mt-1">_________________________________________________________________</span>
              </p>
              <p>
                <span className="font-semibold">My Top Spending Category: </span>
                <span className="input-line">__________________________</span>
                {' '}
                <span className="font-semibold">Amount Spent: </span>
                <span className="input-line">________</span> AED
              </p>
              <p>
                <span className="font-semibold">One Pro Tip I received: </span>
                <span className="input-line block mt-1">_________________________________________________________________</span>
              </p>
            </div>
          </div>

          <div className="section">
            <h2 className="text-lg font-bold text-[#3448C5] bg-blue-50 p-2 rounded mb-2">4. Reflection & Real-Life Application</h2>
            <p className="font-semibold mb-1 text-sm">What was the most challenging financial decision you had to make in the game and why?</p>
            <div className="reflection-box border border-gray-300 p-3 min-h-[80px] bg-gray-50 rounded">
              {/* Empty space for writing */}
            </div>
          </div>

          <div className="footer-logo mt-3 pt-2 border-t border-gray-200 flex justify-end opacity-50">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6922e5b0ed36c6ebd97761f8/97f27b6e4_Gemini_Generated_Image_nq6anhnq6anhnq6a-Photoroom.png"
              alt="FinnQuest Logo"
              className="h-10 w-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}