"use client";
import dynamic from "next/dynamic";
import SplitText from '../components/ui/SplitText'
import MagneticButton from "../components/ui/MagneticButton";

const ShaderBackground = dynamic(() => import("../components/three/ShaderBackground"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden"
    >
      {/* Constant fixed shader background */}
      <ShaderBackground />

      {/* Main content wrapper — everything flows naturally, no absolute overlap */}
      <div className="relative z-20 max-w-6xl mx-auto w-full pt-28 pb-32">
        {/* Eyebrow label */}
        <p
          className="text-emerald-500 text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-8 opacity-0"
          style={{ animation: "fadeIn 1s ease-out 1.6s forwards" }}
        >
          Portfolio · 2026
        </p>

        {/* Big headline — Editorial & Luxury typography style */}
        <SplitText
          as="h1"
          className="text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] font-syne font-bold not-italic text-white tracking-tight mb-2"
          text="Priyanshu"
          delay={0.4}
        />
        <SplitText
          as="h1"
          className="text-[clamp(2.75rem,9vw,8rem)] leading-[0.95] font-serif italic font-normal text-white tracking-tight mb-8"
          text="Sharma."
          delay={0.8}
        />

        {/* Subline */}
        <p
          className="text-sm md:text-base lg:text-lg text-white/60 max-w-xl leading-relaxed mb-12 opacity-0"
          style={{ animation: "fadeIn 1s ease-out 1.4s forwards" }}
        >
          Building immersive, hand-crafted web experiences at the intersection
          of code, design, and motion. Currently based in India.
          {/* 👆 Update with your own intro */}
        </p>

        {/* CTA row — controlled width, aligned left, no overlap with anything below */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-start opacity-0"
          style={{ animation: "fadeIn 1s ease-out 1.7s forwards" }}
        >
          <MagneticButton strength={25}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black text-sm md:text-base font-medium rounded-full hover:bg-emerald-400 transition-colors duration-300 whitespace-nowrap"
              data-cursor-hover
            >
              View Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
          <MagneticButton strength={25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm md:text-base font-medium rounded-full hover:bg-white/10 transition-colors duration-300 whitespace-nowrap"
              data-cursor-hover
            >
              Get in Touch
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom info bar — part of document flow via margin-top auto, NOT absolute.
          This guarantees it never overlaps the buttons on any screen size. */}
      <div
        className="relative z-20 max-w-6xl mx-auto w-full px-6 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] md:text-xs text-white/40 tracking-[0.25em] uppercase opacity-0"
        style={{ animation: "fadeIn 1s ease-out 2s forwards" }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          Available for work
        </span>
        <span>Pune, Maharashtra, IN</span>
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline-block w-8 h-px bg-white/20"></span>
          Scroll to explore
          <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}