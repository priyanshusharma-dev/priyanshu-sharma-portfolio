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
      skills: ["JavaScript", "TypeScript", "Solidity", "HTML5", "CSS3", "Python"],
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Ethers.js", "Hardhat", "Node.js", "Tailwind CSS"],
    },
    {
      title: "Creative & Animation",
      skills: ["Three.js", "GSAP", "Framer Motion"],
    },
    {
      title: "Tools & Ecosystem",
      skills: ["Git", "GitHub", "MetaMask / Web3", "Sepolia Testnet", "VS Code", "Vercel"],
    },
  ],
};
