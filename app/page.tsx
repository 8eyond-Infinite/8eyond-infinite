import { Navbar, Footer } from "@/features/navigation";
import { Hero, BentoGrid, Manifesto, TechStack, Terminal, Projects, Team } from "@/features/landing";
import { ScrollTimeline } from "@/components/ui/ScrollTimeline";

export default function Home() {
  return (
    <main className="selection:bg-accent/30 selection:text-white bg-black">
      <ScrollTimeline />
      <Navbar />
      <Hero />
      <BentoGrid />
      <Manifesto />
      <Projects />
      <TechStack />
      <Terminal />
      <Team />
      <Footer />
    </main>
  );
}
