import { Navbar } from "@/features/navigation";
import { Hero, BentoGrid } from "@/features/landing";

export default function Home() {
  return (
    <main className="selection:bg-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <BentoGrid />
      
      {/* Footer can be added to navigation feature later */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-white rounded-sm rotate-45" />
            <span className="font-bold tracking-tighter">8eyond Infinite</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="transition-colors hover:text-white">Twitter</a>
            <a href="#" className="transition-colors hover:text-white">Discord</a>
            <a href="#" className="transition-colors hover:text-white">GitHub</a>
          </div>
          <p className="text-sm text-zinc-600">© 2026 8eyond Infinite. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
