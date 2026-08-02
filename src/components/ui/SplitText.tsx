"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SupportedTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: SupportedTags;
  triggerOnScroll?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  as: Component = "h1",
  triggerOnScroll = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const spans = containerRef.current.querySelectorAll(".split-char");

    const from = { yPercent: 120, opacity: 0 };
    const to = {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.025,
      ease: "expo.out",
      delay,
    };

    if (triggerOnScroll) {
      gsap.fromTo(spans, from, {
        ...to,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    } else {
      gsap.fromTo(spans, from, to);
    }
  }, [text, delay, triggerOnScroll]);

  const letters = text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden align-top">
      <span className="split-char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));

  const Tag = Component as SupportedTags;

  return (
    <Tag ref={containerRef as any} className={className}>
      {letters}
    </Tag>
  );
}