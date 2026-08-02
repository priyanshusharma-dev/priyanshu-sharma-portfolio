"use client";
import Image from "next/image";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = project.status === "live";
  const projectUrl = project.liveUrl || project.repoUrl || "#";

  return (
    <motion.div
      variants={cardAnim}
      className="group relative rounded-2xl border border-white/10 bg-white/0.02 overflow-hidden hover:border-emerald-500/40 transition-all duration-500 flex flex-col"
    >
      <div className={`h-0.5 ${isLive ? "bg-green-500" : "bg-amber-500"}`}></div>

      <div className="absolute top-4 right-5 text-5xl md:text-6xl font-serif italic text-white/5 group-hover:text-emerald-500/20 transition-colors z-10 pointer-events-none">
        0{index + 1}
      </div>

      <div className="relative aspect-16/10 bg-white/0.02 flex items-center justify-center overflow-hidden p-4">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={375}
            className="max-w-full h-auto object-contain rounded-md shadow-xl"
          />
        ) : (
          <div className="w-full h-full rounded-md bg-linear-to-br from-white/5 to-transparent flex items-center justify-center">
            <span className="text-4xl opacity-20">{isLive ? "◈" : "◇"}</span>
          </div>
        )}
        <div className="absolute top-4 left-5">
          <span className={`text-[10px] tracking-[0.3em] uppercase ${isLive ? "text-green-400" : "text-amber-400"}`}>
            {isLive ? "● Live" : "○ In Progress"}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-2xl font-serif italic text-white mb-2">{project.title}</h3>
        <p className="text-white/60 text-sm mb-6 grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 text-[10px] uppercase text-white/50 border border-white/10 rounded-full">{t}</span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {projectUrl !== "#" ? (
            <MagneticButton strength={20}>
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-center px-5 py-2.5 ${
                  isLive ? "bg-emerald-500 text-black hover:bg-emerald-400" : "border border-white/20 text-white hover:bg-white/10"
                } text-sm font-medium rounded-full transition-colors`}
              >
                {project.liveUrl ? "View Live" : "GitHub Repo"}
              </a>
            </MagneticButton>
          ) : (
            <span className="px-5 py-2.5 border border-white/10 text-white/40 text-sm font-medium rounded-full text-center">
              Coming Soon
            </span>
          )}

          {project.runInstructions && (
            <details className="text-sm cursor-pointer text-white/40">
              <summary>Run locally</summary>
              <pre className="mt-2 p-3 bg-black border border-white/10 rounded text-green-400 text-[10px] font-mono whitespace-pre-wrap">
                {project.runInstructions.join("\n")}
              </pre>
            </details>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-black px-6">
      <div className="max-w-6xl mx-auto">
        <SplitText as="h2" className="text-4xl md:text-6xl text-white mb-16" text="Selected projects." triggerOnScroll />
        
        <motion.div className="grid md:grid-cols-2 gap-8" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {portfolioData.projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}