"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 12 + 4;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              yPercent: -100,
              duration: 1.1,
              ease: "expo.inOut",
              onComplete: () => setDone(true),
            });
          }
        }, 300);
      } else {
        setProgress(Math.floor(value));
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
      suppressHydrationWarning
    >
      <div
        ref={numberRef}
        className="text-white text-7xl md:text-9xl font-bold tracking-tighter tabular-nums"
        style={{ fontFamily: "'Instrument Serif', serif" }}
        suppressHydrationWarning
      >
        {progress}
        <span className="text-3xl md:text-5xl text-emerald-500 align-top">%</span>
      </div>
      <div className="mt-4 text-white/40 text-xs tracking-[0.3em] uppercase">Loading experience</div>
    </div>
  );
}