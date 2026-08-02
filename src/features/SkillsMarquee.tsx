import Marquee from "../components/ui/Marquee";

export default function SkillsMarquee() {
  const words = [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Tailwind CSS",
    "Node.js",
    "Motion Design",
    "UI/UX",
  ];

  return (
    <section className="py-8 bg-black border-y border-white/5">
      <Marquee items={words} speed={30} />
    </section>
  );
}