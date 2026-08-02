"use client";
import ScrollReveal from '../components/ui/ScrollReveal';
import SplitText from '../components/ui/SplitText'
import { motion } from "framer-motion";

const skillCategories = [
  { title: "Languages", icon: "◆", skills: ["JavaScript", "TypeScript", "Solidity", "HTML5", "CSS3", "Python"] },
  { title: "Frameworks", icon: "◇", skills: ["React", "Next.js", "Ethers.js", "Hardhat", "Node.js", "Tailwind CSS"] },
  { title: "Creative", icon: "✦", skills: ["Three.js", "GSAP", "Framer Motion"] },
  { title: "Tools", icon: "/", skills: ["Git", "GitHub", "MetaMask / Web3", "Sepolia Testnet", "VS Code", "Vercel"] },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-black px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-emerald-500 mb-4">02 — Skills</p>
          <SplitText
            as="h2"
            className="text-4xl md:text-6xl font-normal text-white mb-16 tracking-tight"
            text="Tools of the trade."
            triggerOnScroll
          />
        </ScrollReveal>

        <motion.div
          className="grid sm:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              whileHover={{ x: 6, borderColor: "rgba(16,185,129,0.4)" }}
              className="group p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-lg font-medium text-white">{category.title}</h3>
                <span className="text-emerald-500 text-xl">{category.icon}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-white/5 text-white/70 rounded-full border border-white/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}