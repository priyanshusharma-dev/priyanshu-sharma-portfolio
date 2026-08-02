import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Priyanshu Sharma",
  role: "Frontend Developer",
  contactLinks: [
    {
      name: "GitHub",
      value: "@priyanshusharma-dev",
      href: "https://github.com/priyanshusharma-dev",
      label: "Follow",
    },
    {
      name: "Email",
      value: "priyanshusharma9822@gmail.com",
      href: "mailto:priyanshusharma9822@gmail.com",
      label: "Write",
    },
    {
      name: "LinkedIn",
      value: "Priyanshu Sharma",
      href: "https://www.linkedin.com/in/priyanshu-sharma-ai/",
      label: "Connect",
    },
  ],
  projects: [
    {
      title: "SmartCommit",
      description:
        "An AI-powered Python CLI tool that generates meaningful Git commit messages locally using Ollama LLMs, configured with pydantic-settings and verified with 19 unit tests on GitHub Actions CI.",
      tech: ["Python", "Ollama", "Pydantic", "GitHub Actions", "pytest"],
      status: "live",
      repoUrl: "https://github.com/priyanshusharma-dev/smartcommit",
      image: "/images/smartcommit.png",
      year: "2026",
    },
    {
      title: "Portfolio Website",
      description:
        "An immersive personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, custom GLSL shader backgrounds powered by Three.js, GSAP, and Framer Motion.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Framer Motion"],
      status: "live",
      repoUrl: "https://github.com/priyanshusharma-dev/priyanshu-sharma-portfolio",
      image: "/images/portfolio.png",
      year: "2026",
    },
  ],
  skillCategories: [
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "HTML/CSS", "GLSL"],
    },
    {
      title: "Frameworks & Libraries",
      skills: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    },
    {
      title: "Creative & Animation",
      skills: ["Three.js", "React Three Fiber", "GSAP", "Framer Motion", "Lenis"],
    },
    {
      title: "Tools & Ecosystem",
      skills: ["Git", "GitHub Actions", "ESLint", "Turbopack", "Pydantic"],
    },
  ],
};
