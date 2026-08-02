"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const emailLink = portfolioData.contactLinks.find((l) => l.name === "Email") || portfolioData.contactLinks[0];

  return (
    <section id="contact" className="relative py-28 bg-black px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-emerald-500 mb-4">05 — Contact</p>
          <SplitText
            as="h2"
            className="text-4xl md:text-7xl font-normal text-white mb-8 tracking-tight"
            text="Let's build together."
            triggerOnScroll
          />
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed mb-12">
            Have a project in mind, a role to fill, or just want to say hi?
            My inbox is always open.
          </p>
        </ScrollReveal>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemAnim}>
            <MagneticButton strength={30}>
              <a
                href={emailLink?.href ?? "#"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-medium rounded-full hover:bg-emerald-400 transition-colors text-base"
                data-cursor-hover
              >
                Say Hello
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {portfolioData.contactLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              variants={itemAnim}
              whileHover={{ backgroundColor: "rgba(16,185,129,0.08)" }}
              className="group p-6 bg-black transition-colors"
              data-cursor-hover
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2">{link.label}</div>
              <div className="text-white font-medium mb-1 group-hover:text-emerald-400 transition-colors">{link.name}</div>
              <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors break-all">{link.value}</div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}