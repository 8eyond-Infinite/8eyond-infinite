"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity, 
  useAnimationFrame,
  useMotionValue
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const TECH_1 = [
  { name: "Next.js", cat: "FE", val: "99" },
  { name: "React", cat: "FE", val: "98" },
  { name: "Tailwind", cat: "FE", val: "100" },
  { name: "Three.js", cat: "FE", val: "GL" }
];
const TECH_2 = [
  { name: "Golang", cat: "BE", val: "FAST" },
  { name: "Rust", cat: "BE", val: "SAFE" },
  { name: "NestJS", cat: "BE", val: "MOD" },
  { name: "PostgreSQL", cat: "DB", val: "ACID" }
];
const TECH_3 = [
  { name: "Kubernetes", cat: "OPS", val: "AUTO" },
  { name: "Docker", cat: "OPS", val: "ISOL" },
  { name: "Terraform", cat: "OPS", val: "IaC" },
  { name: "AWS", cat: "INFRA", val: "CLD" }
];

const TechCard = ({ name, cat, val }: { name: string; cat: string; val: string }) => (
  <div className="flex-shrink-0 w-56 h-20 mx-3 relative overflow-hidden border border-white/10 bg-white/[0.03] rounded-sm p-4 group hover:border-accent/40 transition-all duration-500 flex items-center justify-between backdrop-blur-md">
     <div className="flex flex-col">
        <span className="text-[6px] font-mono text-accent tracking-[0.3em] mb-1">[ {cat} ]</span>
        <h3 className="text-sm font-black text-white uppercase tracking-widest group-hover:text-accent transition-colors">{name}</h3>
     </div>
     <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
        <span className="text-[6px] font-mono text-zinc-500 uppercase">{val}</span>
        <div className="w-4 h-px bg-accent/30 mt-1" />
     </div>
  </div>
);

const DataLine = ({ text }: { text: string }) => (
  <div className="flex-shrink-0 mx-8 text-[9px] font-mono text-zinc-600 uppercase tracking-[1em] whitespace-nowrap italic group-hover:text-accent transition-colors duration-700">
    {text} {" // "} {text} {" // "} {text}
  </div>
);

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
}

const KineticMarquee = ({ children, baseVelocity = 1 }: MarqueeProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-5, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 1000);
    const vFactor = velocityFactor.get();
    moveBy += moveBy * vFactor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap flex-nowrap py-2 border-y border-white/[0.02] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div className="flex whitespace-nowrap flex-nowrap items-center" style={{ x }}>
        {children}{children}{children}{children}
      </motion.div>
    </div>
  );
};

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef}
      id="tech" 
      className="relative py-80 bg-black overflow-hidden border-y border-white/5"
    >
      {/* Blueprint Grid - Tilted */}
      <div className="absolute inset-0 -rotate-12 scale-150 opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Decorative HUD corners */}
      <div className="absolute top-20 left-20 font-mono text-[8px] text-zinc-700 space-y-1 opacity-50">
         <div>[ SECTOR_04 // ENGINE_ROOM ]</div>
         <div>[ VOLTAGE: 220V // LOAD: NOMINAL ]</div>
      </div>
      <div className="absolute bottom-20 right-20 font-mono text-[8px] text-accent/40 space-y-1 text-right">
         <div>[ SYNC_STATUS: STABLE ]</div>
         <div>[ LATENCY: 0.002MS ]</div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 mb-40 text-center">
          <span className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-6">
            [ PHASE_03 // THE_ENGINE_ROOM ]
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
            The Engine of <br /> <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>Infinity.</span>
          </h2>
        </div>

        {/* The Dense Diagonal Engine */}
        <div className="relative -rotate-12 scale-110 md:scale-150 py-10 bg-zinc-950/20 backdrop-blur-sm">
           {/* Edge Fades Overlays */}
           <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
           <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

           <div className="flex flex-col gap-2 relative z-10">
              <KineticMarquee baseVelocity={-0.4}>
                 {TECH_1.map((t) => <TechCard key={t.name} {...t} />)}
              </KineticMarquee>
              
              <KineticMarquee baseVelocity={0.6}>
                 <DataLine text="SYNCHRONIZING_NODES_ACTIVE_PROTOCOL_INIT_0x8F_ESTABLISHED_CONNECTION" />
              </KineticMarquee>

              <KineticMarquee baseVelocity={-0.3}>
                 {TECH_2.map((t) => <TechCard key={t.name} {...t} />)}
              </KineticMarquee>

              <KineticMarquee baseVelocity={0.5}>
                 <DataLine text="DECENTRALIZED_STORAGE_VERIFIED_ENCRYPTION_AES256_STABLE_FLUX" />
              </KineticMarquee>

              <KineticMarquee baseVelocity={-0.4}>
                 {TECH_3.map((t) => <TechCard key={t.name} {...t} />)}
              </KineticMarquee>
           </div>
        </div>

        <div className="mt-40 flex flex-col items-center gap-4 opacity-30">
           <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent" />
           <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.5em]">End of Core</span>
        </div>
      </div>
    </section>
  );
};
