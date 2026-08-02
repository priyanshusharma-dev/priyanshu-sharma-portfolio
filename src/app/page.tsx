import Navbar from "@/components/Layout/Navbar";
import Hero from "@/features/Hero";
import SkillsMarquee from "@/features/SkillsMarquee";
import About from "@/features/About";
import Skills from "@/features/Skills";
import Projects from "@/features/Projects";
// import Designs from "@/features/Designs";   
import Contact from "@/features/Contact";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <main className="relative bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <About />
      <Skills />
      <Projects />
      {/* <Designs /> */}
      <Contact />
      <Footer />
    </main>
  );
}