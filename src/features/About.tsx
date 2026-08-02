import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitText from "@/components/ui/SplitText";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-emerald-500 text-xs tracking-[0.4em] uppercase font-medium mb-8">
            01 — About
          </p>
          <SplitText
            as="h2"
            className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-normal text-white tracking-tight mb-16"
            text="A little about me."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-12 gap-16 items-start">
          <ScrollReveal delay={0.2} className="md:col-span-5">
            <div className="aspect-4/5 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group">
              <Image
                src="/profile.png"
                alt="Priyanshu Sharma"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none"></div>
            </div>
          </ScrollReveal>

          {/* About text - styled with highlighted keywords */}
          <ScrollReveal delay={0.3} className="md:col-span-7 space-y-6 text-base md:text-lg text-white/70 leading-relaxed font-light">
            <p>
              I am a <span className="text-white font-normal">Computer Science & Engineering</span> student passionate about crafting high-performance <span className="text-emerald-400 font-medium">full-stack web applications</span>, <span className="text-emerald-400 font-medium">decentralized solutions</span>, and <span className="text-emerald-400 font-medium">AI-driven developer tools</span>.
            </p>
            <p>
              My focus spans the modern JavaScript ecosystem (<span className="text-white font-medium">React, Node.js, Next.js</span>), Web3 infrastructure (<span className="text-white font-medium">Solidity, Smart Contracts</span>), and intelligent automation using <span className="text-white font-medium">Python & LLMs</span>. I thrive on building production-grade software that bridges complex backend systems with <span className="italic font-serif text-emerald-400">intuitive, modern UI design</span>.
            </p>
            <p>
              Dedicated to continuous growth, I actively sharpen my <span className="text-white font-medium">Data Structures & Algorithms</span>, contribute to <span className="text-emerald-400 font-medium">open-source initiatives</span>, and build <span className="text-emerald-400 font-medium">hackathon-winning projects</span>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}