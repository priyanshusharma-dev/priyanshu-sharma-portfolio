"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let hasMoved = false;

    const resetCursor = () => {
      dot.classList.remove("scale-0");
      ring.classList.remove("w-10", "h-10", "border-emerald-500", "bg-emerald-500/10");
    };

    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringX = e.clientX;
        ringY = e.clientY;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
    };

    let animationFrameId: number;
    const animate = () => {
      if (hasMoved) {
        ringX += (mouseX - ringX) * 0.35;
        ringY += (mouseY - ringY) * 0.35;
        ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const handleHoverEnter = () => {
      dot.classList.add("scale-0");
      ring.classList.add("w-10", "h-10", "border-emerald-500", "bg-emerald-500/10");
    };
    const handleHoverLeave = () => resetCursor();

    const handleWindowLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleWindowEnter = () => {
      if (hasMoved) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const addListeners = () => {
      document
        .querySelectorAll('a, button, [data-cursor-hover], summary, input, textarea')
        .forEach((el) => {
          el.addEventListener("mouseenter", handleHoverEnter);
          el.addEventListener("mouseleave", handleHoverLeave);
        });
    };

    addListeners();
    const observer = new MutationObserver(() => {
      resetCursor();
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleWindowLeave);
    document.addEventListener("mouseenter", handleWindowEnter);
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const handleVisibility = () => {
      if (document.hidden) resetCursor();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleWindowLeave);
      document.removeEventListener("mouseenter", handleWindowEnter);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-emerald-500 rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/80 pointer-events-none z-[9998] opacity-0 transition-[width,height,border-color,background-color,opacity] duration-150"
        style={{ willChange: "transform" }}
      />
    </>
  );
}