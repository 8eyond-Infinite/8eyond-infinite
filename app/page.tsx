import { Hero, BentoGrid, Manifesto, TechStack, Terminal, Projects, Team } from "@/features/landing";
import { ScrollTimeline } from "@/components/ui/ScrollTimeline";

export default function Home() {
  return (
    <>
      <ScrollTimeline />
      <Hero />
      <BentoGrid />
      <Manifesto />
      <Projects />
      <TechStack />
      <Terminal />
      <Team />
    </>
  );
}
