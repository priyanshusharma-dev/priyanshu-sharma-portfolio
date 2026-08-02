"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  // { name: "Designs", href: "#designs" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    // Track which section is currently in view (for active link highlight)
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));

    // Live IST clock
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const clock = setInterval(updateTime, 30000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearInterval(clock);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    console.log("Navigating to:", href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "py-3 bg-black/70 backdrop-blur-xl border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="text-xl font-serif italic text-white hover:text-emerald-500 transition-colors"
          data-cursor-hover
        >
          PS<span className="text-emerald-500">.</span>
        </a>

        {/* Center links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-white/20 mr-1.5 text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                {link.name}
                {isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 w-1 h-1 rounded-full bg-emerald-500"></span>
                )}
              </a>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-5">
          <span className="text-xs text-white/40 tabular-nums tracking-wider" suppressHydrationWarning>{time}</span>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2 text-sm bg-white text-black rounded-full font-medium hover:bg-emerald-500 transition-colors duration-300"
            data-cursor-hover
          >
            Let's Talk →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 mt-4">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-lg text-white/80 hover:text-emerald-500 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 px-4 py-3 bg-emerald-500 text-black text-center font-medium rounded-lg"
            >
              Let's Talk →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}