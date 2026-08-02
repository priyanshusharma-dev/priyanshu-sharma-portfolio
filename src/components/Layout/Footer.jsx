export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-serif italic text-xl text-white">
            PS<span className="text-emerald-500">.</span>
          </p>
          <p className="text-xs text-white/30 mt-2" suppressHydrationWarning>
            © {new Date().getFullYear()} — Crafted with care.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-white/40">
          <a href="#home" className="hover:text-emerald-400 transition-colors" data-cursor-hover>Back to top ↑</a>
          <span>Built with Next.js · Three.js · GSAP</span>
        </div>
      </div>
    </footer>
  );
}