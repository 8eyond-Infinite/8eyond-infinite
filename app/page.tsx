import { Navbar, Footer } from "@/features/navigation";
import { Hero, BentoGrid, Manifesto } from "@/features/landing";

export default function Home() {
  return (
    <main className="selection:bg-accent/30 selection:text-white bg-black">
      <Navbar />
      <Hero />
      <BentoGrid />
      <Manifesto />
      <Footer />
    </main>
  );
}
