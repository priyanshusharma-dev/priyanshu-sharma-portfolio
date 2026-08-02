"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 *  Splits a string into wrapped letters and animates them
 *  sliding up into view.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  as: Component = "h1",
  triggerOnScroll = false,
}) {
  const containerRef = useRef(null);

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

  return (
    <Component ref={containerRef} className={className}>
      {letters}
    </Component>
  );
}