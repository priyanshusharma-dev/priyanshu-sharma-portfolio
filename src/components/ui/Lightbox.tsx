"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
/*
 *  A clean, minimal image lightbox:
 *  - Click a thumbnail → opens fullscreen view
 *  - Click the X or press Esc to close
 *  - Click ← → or use arrow keys to navigate between designs
 *  - Click outside image to close
 *  - Smooth fade/zoom animation via Framer Motion
 */
export type LightboxImage = {
  src: string;
  title: string;
  figmaUrl?: string;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const current = images[currentIndex];

  const next = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const prev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard shortcuts (Esc to close, arrows to navigate)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-300 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
        data-cursor-hover
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image + title */}
                <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "85vh" }}
        >
          {/* Image area — fixed max height with flex: 1 to fill available space */}
          <div className="relative w-full flex items-center justify-center shrink-0 min-h-0" style={{ maxHeight: "75vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.title}
              className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              style={{ userSelect: "none" }}
            />
          </div>

          {/* Caption bar */}
          <div className="mt-4 flex items-center gap-4 text-white w-full px-1 shrink-0">
            <h3 className="text-lg md:text-xl font-serif italic">{current.title}</h3>
            {current.figmaUrl && (
              <a
                href={current.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                data-cursor-hover
              >
                Open in Figma ↗
              </a>
            )}
            <span className="text-xs text-white/40 ml-auto tabular-nums">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}