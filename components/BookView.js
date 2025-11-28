'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function BookView({ data }) {
  const images = data?.chapter?.data || [];
  const baseUrl = data?.baseUrl;
  const hash = data?.chapter?.hash;

  // Sort pages by number in filename
  const sortedImages = [...images].sort((a, b) => {
    const aNum = parseInt(a.split('-')[0], 10) || 0;
    const bNum = parseInt(b.split('-')[0], 10) || 0;
    return aNum - bNum;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const totalPages = sortedImages.length;
  const currentFilename = sortedImages[currentPage];
  const imageUrl = currentFilename ? `${baseUrl}/data/${hash}/${currentFilename}` : '';

  const goNext = () => currentPage < totalPages - 1 && setCurrentPage(p => p + 1);
  const goPrev = () => currentPage > 0 && setCurrentPage(p => p - 1);

  // Keyboard + Swipe (same as before)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentPage]);

  useEffect(() => {
    let startX = 0;
    const start = (e) => startX = e.touches[0].clientX;
    const end = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    };
    const el = containerRef.current;
    el?.addEventListener('touchstart', start);
    el?.addEventListener('touchend', end);
    return () => { el?.removeEventListener('touchstart', start); el?.removeEventListener('touchend', end); };
  }, [currentPage]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    else document.exitFullscreen().then(() => setIsFullscreen(false));
  };

  if (totalPages === 0) return <div className="flex items-center justify-center h-screen text-white text-2xl">No pages</div>;

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black overflow-y-auto overflow-x-hidden">
      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goPrev} disabled={currentPage === 0}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition">
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold">Chapter {data?.chapter?.chapter || ''}</h2>
            <p className="text-sm text-gray-400">Page {currentPage + 1} / {totalPages}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={toggleFullscreen} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              {isFullscreen ? <X className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </button>
            <button onClick={goNext} disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 transition">
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>
      </div>

      {/* Page Content - Centered & Full Height Allowed */}
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-2">
        <div className="relative max-w-full w-auto">
          {/* Page Container */}
          <div
            key={currentPage}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-400"
          >
            {/* THE FIX: Let image define its own height */}
            <Image
              src={imageUrl}
              alt={`Page ${currentPage + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto max-w-full h-auto object-contain select-none"
              unoptimized={true}
              priority
              draggable={false}
            />
          </div>

          {/* Invisible tap zones (left 30% = prev, right 30% = next) */}
          <button
            onClick={goPrev}
            className="absolute inset-y-0 left-0 w-1/3 z-10"
            aria-label="Previous page"
          />
          <button
            onClick={goNext}
            className="absolute inset-y-0 right-0 w-1/3 z-10"
            aria-label="Next page"
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center text-gray-500 text-sm">
        ← Swipe • Tap sides • Arrow keys →
      </div>
    </div>
  );
}