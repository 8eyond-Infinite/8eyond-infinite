"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from "framer-motion";
import { gsap } from "@/lib/gsap";

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

const TechCard = ({ name, cat, val }: { name: string; cat: string; val: string }) => {
  return (
    <div className="flex-shrink-0 w-64 h-24 mx-4 relative overflow-hidden border border-white/5 bg-black/60 rounded-[2px] p-5 group hover:border-accent/40 transition-all duration-700 flex items-center justify-between backdrop-blur-3xl">
      <style jsx>{`
        @keyframes resonance {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
        .resonance-bar {
          animation: resonance 1.2s infinite ease-in-out;
          animation-play-state: paused;
        }
        .group:hover .resonance-bar {
          animation-play-state: running;
        }
      `}</style>

      {/* Background Noise Fragment */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-black text-white uppercase tracking-tighter group-hover:text-accent transition-all duration-500 relative inline-block">
            {name}
            {/* Subtle Glitch Shadow */}
            <span className="absolute inset-0 text-accent/10 group-hover:translate-x-[1px] transition-transform pointer-events-none">{name}</span>
          </h3>
          <div className="text-[8px] font-mono text-zinc-600 mt-1 tracking-[0.3em] uppercase">{cat}</div>
        </div>
        
        {/* Simplified Visualizer */}
        <div className="flex items-end gap-1 h-2">
          {[1,2,3,4].map(i => (
            <div 
              key={i}
              className="resonance-bar w-1 bg-zinc-800 group-hover:bg-accent/60 transition-colors" 
              style={{ 
                height: `${i * 20}%`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-end justify-center h-full">
        <div className="text-[12px] font-mono text-accent font-black tracking-tighter">
           {val}
        </div>
      </div>

      {/* Minimal Corner HUD */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/10" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/10" />
    </div>
  );
};

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
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.to(".tech-title-1", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".tech-title-2", {
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Phase Label Scramble Typewriter
      const phaseLabel = document.querySelector(".phase-label-05");
      const phaseCursor = document.querySelector(".phase-cursor-05");
      const fullText = "[ PHASE_05 // THE_ELEMENTS ]";
      const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]//_!@#$%^&*";

      gsap.to({}, {
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true
        },
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * fullText.length);
          const revealedText = fullText.slice(0, currentLength);

          if (progress < 1) {
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            if (phaseLabel) phaseLabel.textContent = revealedText + randomChar;
            if (phaseCursor) gsap.set(phaseCursor, { opacity: 1 });
          } else {
            if (phaseLabel) {
              phaseLabel.textContent = fullText;
              if (phaseCursor) {
                gsap.to(phaseCursor, {
                  opacity: 0,
                  duration: 0.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut"
                });
              }
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
        <div>[ SECTOR_05 // ENGINE_ROOM ]</div>
        <div>[ VOLTAGE: 220V // LOAD: NOMINAL ]</div>
      </div>
      <div className="absolute bottom-20 right-20 font-mono text-[8px] text-accent/40 space-y-1 text-right">
        <div>[ SYNC_STATUS: STABLE ]</div>
        <div>[ LATENCY: 0.002MS ]</div>
      </div>

      <div className="relative z-20">
        <div className="mx-auto max-w-[1400px] px-6 mb-40 text-left">
          <div className="flex items-center gap-4 mb-8 w-full">
            <div className="flex items-center font-mono text-accent whitespace-nowrap">
              <span className="text-[12px] tracking-[0.6em] uppercase phase-label-05">
                {/* GSAP will fill this */}
              </span>
              <span className="text-[12px] phase-cursor-05 opacity-0">_</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-9xl font-black tracking-[-0.08em] text-white uppercase italic leading-[0.9] overflow-visible">
            <span className="inline-block tech-title-1">The Engine of</span> <br />
            <span className="inline-block tech-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              Infinity.
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mt-12">
            <p className="text-xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight tracking-tight">
              A precise distillation of modern primitives. We harness the <span className="text-accent italic">purest elements</span> of engineering to build systems that defy the entropy of time.
            </p>
            <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase border-l border-white/10 pl-6">
              Elemental Composition //
              FE: Reactive_Glass //
              BE: Immutable_Gold //
              OPS: Ethereal_Cloud
              <br /><br />
              System Status: Nominal
            </div>
          </div>
        </div>

        {/* The Dense Diagonal Engine */}
        <div className="relative -rotate-12 scale-110 md:scale-150 py-10 bg-zinc-950/20 backdrop-blur-sm">
          {/* Edge Fades Overlays */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

          <div className="flex flex-col gap-2 relative z-10">
            <KineticMarquee baseVelocity={-0.6}>
              {TECH_1.map((t) => <TechCard key={t.name} {...t} />)}
            </KineticMarquee>

            <KineticMarquee baseVelocity={1.2}>
              <DataLine text="SYNCHRONIZING_NODES_ACTIVE_PROTOCOL_INIT_0x8F_ESTABLISHED_CONNECTION" />
            </KineticMarquee>

            <KineticMarquee baseVelocity={-0.4}>
              {TECH_2.map((t) => <TechCard key={t.name} {...t} />)}
            </KineticMarquee>

            <KineticMarquee baseVelocity={0.8}>
              <DataLine text="DECENTRALIZED_STORAGE_VERIFIED_ENCRYPTION_AES256_STABLE_FLUX" />
            </KineticMarquee>

            <KineticMarquee baseVelocity={-0.8}>
              {TECH_3.map((t) => <TechCard key={t.name} {...t} />)}
            </KineticMarquee>
          </div>
        </div>
      </div>
    </section>
  );
};
