"use client";
import { useEffect, useState } from "react";

/*
 *  A soft radial glow that follows the mouse inside the hero.
 *  Pure CSS — no Three.js needed, super lightweight.
 */
export default function SpotlightCursor() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e) => {
      // Convert mouse position to % of viewport
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
      }}
    />
  );
}