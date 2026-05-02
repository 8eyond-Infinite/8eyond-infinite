"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap } from "@/lib/gsap";

const PROJECT_DATA = {
  core: [
    {
      id: "00",
      title: "FORGE OS",
      tag: "THE_MIND_MIRROR",
      tech: "NESTJS / MONGODB / DDD",
      desc: "A living extension of the inner world. A handcrafted personal operating system for reflection, creative forge, and a sanctuary for the moments that shape reality.",
      features: ["Reflection Context", "Forge Chamber", "AI Council", "Mind Module"],
      isMega: true
    },
    {
      id: "01",
      title: "8EYOND CATALYST",
      tag: "THE_VISUAL_ALBEDO",
      tech: "FRAMER / REACT / TAILWIND",
      desc: "The aesthetic soul of the ecosystem. A metaphysical UI library that serves as the ultimate catalyst, breathing life into digital logic with motion-driven precision.",
      features: ["Alchemical Shaders", "Fluid Motion", "Metaphysical UI", "Type Safe"],
      isMega: true
    }
  ],
  starters: [
    {
      id: "S1", title: "NEXT.JS", tag: "FRONTEND", tech: "V15 / APP_ROUTER",
      desc: "Advanced boilerplate featuring atomic design, centralized state management, and optimized hydration strategies for zero-latency user experiences.",
      features: ["Atomic Design", "Edge Runtime", "SEO+"]
    },
    {
      id: "S2", title: "NESTJS_HEXA", tag: "BACKEND_ELIXIR", tech: "DDD / HEXAGONAL / PRISMA",
      desc: "The Great Work of backend architecture. A pure Domain-Driven foundation isolated by Hexagonal boundaries, implementing strict Ports & Adapters to shield your logic from the shifting sands of infrastructure.",
      features: ["DDD Core", "Hexagonal Arch", "Ports & Adapters", "Value Objects"]
    },
    {
      id: "S3", title: "ANGULAR", tag: "FRONTEND", tech: "V19 / SIGNALS",
      desc: "High-end enterprise foundation utilizing fine-grained reactivity with Signals, standalone components, and strict architectural boundaries.",
      features: ["Signals", "RxJS", "Strict TS"]
    },
    {
      id: "S4", title: "GOLANG", tag: "BACKEND", tech: "GIN / GORM",
      desc: "Pure performance-driven engine optimized for cloud-native environments, featuring robust dependency injection and automated migrations.",
      features: ["Clean Arch", "Docker", "gRPC"]
    },
    { id: "S5", title: "VITE", tag: "FRONTEND", tech: "REACT / TS", desc: "Lightweight, blazing-fast foundation for modern SPA masters.", features: ["SWC", "Zustand"] },
    { id: "S6", title: "EXPRESS", tag: "BACKEND", tech: "NODE / MONGO", desc: "Flexible API engine for rapid distillation of complex data.", features: ["JWT", "Mongoose"] },
  ]
};

const ProjectCard = ({ project, isMega = false }: { project: any, isMega?: boolean }) => (
  <Magnetic strength={isMega ? 0.02 : 0.1}>
    <div className={`group relative border ${isMega ? 'border-accent/40' : 'border-white/5'} rounded-[2px] px-8 py-8 bg-black/40 backdrop-blur-3xl transition-all duration-700 hover:border-accent/60 hover:bg-black/80 flex flex-col justify-between h-full ${isMega ? 'md:col-span-2 shadow-[0_0_50px_rgba(251,191,36,0.05)]' : ''}`}>
      {isMega && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          />
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-transparent via-accent/40 to-transparent"
          />
        </div>
      )}
      {isMega && (
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      )}
      <div className={`absolute -top-px -left-px w-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className={`absolute -top-px -left-px w-px h-20 bg-gradient-to-b from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <span className="text-[10px] font-mono text-zinc-700 tracking-widest uppercase">[{project.id}]</span>
          <div className="flex items-center gap-2">
            <div className={`h-1 w-1 rounded-full ${isMega ? 'bg-accent shadow-[0_0_10px_var(--accent)]' : 'bg-zinc-700'}`} />
            <span className={`text-[8px] font-mono ${isMega ? 'text-accent' : 'text-zinc-600'} uppercase tracking-[0.3em]`}>
              {isMega ? 'CORE_SYSTEM' : 'OPERATIONAL'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className={`inline-flex items-center px-2 py-1 ${isMega ? 'bg-accent/10 border border-accent/20' : ''} mb-1 w-fit`}>
            <span className={`text-[10px] font-mono ${isMega ? 'text-accent' : 'text-accent/60'} tracking-[0.4em] uppercase`}>{project.tag}</span>
          </div>
          <h3 className="text-3xl font-black text-white tracking-[-0.06em] leading-[0.9] uppercase group-hover:text-accent transition-colors duration-500 break-words">
            {project.title.split(' ').map((word: string, i: number) => (
              <React.Fragment key={i}>
                {word}{i === 0 && project.title.includes(' ') ? <span className="text-zinc-800">_</span> : ''}
              </React.Fragment>
            ))}
          </h3>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{project.tech}</div>
          <p className="text-zinc-500 font-light leading-relaxed mt-4 text-sm max-w-md">
            {project.desc}
          </p>

          {project.features && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.features.map((f: string, i: number) => (
                <span key={i} className={`text-[8px] font-mono ${isMega ? 'text-accent/80 border-accent/30 bg-accent/5' : 'text-accent/50 border-accent/20'} border px-2 py-0.5 rounded-[1px] uppercase tracking-tighter`}>
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-between items-end relative z-10">
        <div className={`w-12 h-[1px] ${isMega ? 'bg-accent/40' : 'bg-white/10'}`} />
        <div className={`rounded-full border ${isMega ? 'border-accent/40 bg-accent/10' : 'border-white/10'} flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-700 w-10 h-10 text-sm`}>
          <span>→</span>
        </div>
      </div>

      {isMega && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/[0.08] opacity-30 group-hover:opacity-50 blur-[120px] pointer-events-none transition-opacity duration-1000" />
      )}
    </div>
  </Magnetic>
);

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.to(".projects-title-1", {
        x: -70,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".projects-title-2", {
        x: 70,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Phase Label Scramble Typewriter
      const phaseLabel = document.querySelector(".phase-label-03");
      const phaseCursor = document.querySelector(".phase-cursor-03");
      const fullText = "[ PHASE_03 // THE_FORGE ]";
      const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]//_!@#$%^&*";
      
      gsap.to({}, {
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true
        },
        onUpdate: function() {
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
    <section ref={containerRef} id="projects" className="relative py-60 bg-black px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      <div className="mx-auto max-w-[1400px] relative z-20">
        {/* Header */}
        <div className="mb-32 relative">
          <div className="flex items-center gap-4 mb-8 w-full">
            <div className="flex items-center font-mono text-accent whitespace-nowrap">
              <span className="text-[12px] tracking-[0.6em] uppercase phase-label-03">
                {/* GSAP will fill this */}
              </span>
              <span className="text-[12px] phase-cursor-03 opacity-0">_</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-9xl font-black tracking-[-0.08em] text-white uppercase italic leading-[0.9] overflow-visible">
            <span className="inline-block projects-title-1">Magnum</span> <br /> 
            <span className="inline-block projects-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
               Opus.
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mt-12">
            <p className="text-xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight tracking-tight">
              The furnace where logic meets matter. We catalyze raw potential into <span className="text-accent italic">sovereign digital artifacts</span>, standardized by the 8-fold path of excellence.
            </p>
            <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase border-l border-white/10 pl-6">
              Project Forge v3.0 // Currently Distilling 12 Core Transmutations.
              <br /><br />
              Status: Operational
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {PROJECT_DATA.core.map((p, i) => (
            <ProjectCard key={i} project={p} isMega={true} />
          ))}
          {PROJECT_DATA.starters.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
          <div className="md:col-span-2 border border-dashed border-white/10 rounded-[2px] p-10 flex flex-col justify-center items-center gap-6 group hover:border-accent/40 transition-colors">
            <span className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase">+ 6 MORE TRANSMUTATIONS IN PROGRESS</span>
            <div className="text-zinc-500 text-[11px] font-mono text-center max-w-xs uppercase leading-loose opacity-50">
              The ecosystem is constantly evolving. New starters and advanced modules are being distilled in the alchemical furnace.
            </div>
            <div className="w-12 h-px bg-zinc-800 group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};
