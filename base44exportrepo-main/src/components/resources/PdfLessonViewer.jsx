import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Loader2, Maximize2, Minimize2, Download } from 'lucide-react';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfLessonViewer({ url, title, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const fadeTimerRef = React.useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  // Use ResizeObserver to track container width
  useEffect(() => {
    const container = document.getElementById('pdf-container');
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setPageWidth(width - 40);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isFullscreen]);

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      return Math.max(1, Math.min(newPage, numPages || 1));
    });
  };

  const toggleFullscreen = () => {
    const elem = document.getElementById('pdf-lesson-wrapper');
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        changePage(1);
      } else if (e.key === 'ArrowLeft') {
        changePage(-1);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, isFullscreen]);

  // Auto-fade controls
  const resetFadeTimer = () => {
    setShowControls(true);
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleMouseMove = () => {
    resetFadeTimer();
  };

  const handleMouseLeave = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => setShowControls(false), 1000);
  };

  useEffect(() => {
    resetFadeTimer();
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  return (
    <div 
      id="pdf-lesson-wrapper" 
      className={`flex flex-col h-full bg-slate-900 text-white ${isFullscreen ? 'p-0' : 'rounded-lg overflow-hidden'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header / Controls */}
      <div className={`flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold truncate max-w-[300px]">{title}</h2>
          <span className="text-sm text-slate-400 bg-slate-700 px-2 py-1 rounded">
            Slide {pageNumber} of {numPages || '--'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDownload}
            className="text-white hover:bg-slate-700"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFullscreen}
            className="text-white hover:bg-slate-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
          {!isFullscreen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white hover:bg-red-600/20 hover:text-red-400"
            >
              <X className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        id="pdf-container" 
        className="flex-1 flex items-center justify-center relative bg-slate-900 overflow-auto p-4"
        onClick={(e) => {
          // Click on left/right side to navigate
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          if (x > rect.width / 2) changePage(1);
          else changePage(-1);
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        )}

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-slate-400">Loading lesson...</div>}
          error={<div className="text-red-400">Failed to load PDF. Please try again.</div>}
          className="flex justify-center shadow-2xl"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            width={pageWidth}
            className="shadow-2xl border border-slate-700"
          />
        </Document>

        {/* Navigation Overlays */}
        <div className={`absolute inset-y-0 left-0 w-24 flex items-center justify-start transition-opacity duration-500 bg-gradient-to-r from-black/20 to-transparent pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-20 w-12 text-white bg-black/40 hover:bg-black/60 pointer-events-auto ml-2"
            onClick={(e) => { e.stopPropagation(); changePage(-1); }}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        </div>
        <div className={`absolute inset-y-0 right-0 w-24 flex items-center justify-end transition-opacity duration-500 bg-gradient-to-l from-black/20 to-transparent pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-20 w-12 text-white bg-black/40 hover:bg-black/60 pointer-events-auto mr-2"
            onClick={(e) => { e.stopPropagation(); changePage(1); }}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}