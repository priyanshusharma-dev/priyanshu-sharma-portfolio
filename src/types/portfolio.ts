export interface ContactLink {
  name: string;
  value: string;
  href: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: "live" | "in-progress";
  liveUrl?: string;
  repoUrl?: string;
  image?: string | null;
  year?: string;
  runInstructions?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  contactLinks: ContactLink[];
  projects: Project[];
  skillCategories: SkillCategory[];
}
