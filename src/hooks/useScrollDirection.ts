import { useState, useEffect } from "react";

export const useScrollDirection = (): "up" | "down" => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
};