"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const CardHeader = ({ title, tag, code }: { title: string; tag: string; code?: string }) => (
  <div className="flex flex-col gap-1 mb-6">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-mono text-accent tracking-[0.4em] uppercase">[ {tag} ]</span>
      {code && <span className="text-[8px] font-mono text-zinc-600 uppercase opacity-60 tracking-[0.2em]">{code}</span>}
    </div>
    <h3 className="text-2xl font-black tracking-[-0.05em] text-white mt-1 uppercase italic leading-none">{title}</h3>
  </div>
);

const TechnicalLine = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center text-[8px] font-mono tracking-widest border-b border-white/5 py-2">
    <span className="text-zinc-600 uppercase">{label}</span>
    <span className="text-accent/60 uppercase">{value}</span>
  </div>
);

export const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.from(".bento-content-layer", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const speed = [0.04, 0.08, 0.05, 0.09][i];
        
        gsap.to(card, {
          y: -70 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Tiêu đề Parallax
      gsap.to(".bento-title-1", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".bento-title-2", {
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
      const phaseLabel = document.querySelector(".phase-label-01");
      const phaseCursor = document.querySelector(".phase-cursor-01");
      const fullText = "[ PHASE_01 // THE_NEXUS_OF_REALITY ]";
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
            if (phaseLabel) phaseLabel.textContent = fullText;
            // Continuous blinking cursor after typing is done
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
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="vision" className="relative py-60 px-6 bg-transparent overflow-visible">
      {/* Background Sacred Geometry (Ambient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/5 rounded-full pointer-events-none opacity-20 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full pointer-events-none opacity-10 animate-spin-reverse-slow" />

      {/* Lớp 0: Nền đen */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Lớp 20: Nội dung (Dày đặc thông tin) */}
      <div className="bento-content-layer mx-auto max-w-[1400px] relative z-20">
        
        {/* Header */}
        <div className="mb-32">
          <div className="w-full relative">
            <div className="flex items-center gap-4 mb-8 w-full">
              <div className="flex items-center font-mono text-accent opacity-60 whitespace-nowrap">
                <span className="text-[12px] tracking-[0.8em] uppercase phase-label-01">
                  {/* GSAP will fill this */}
                </span>
                <span className="text-[12px] phase-cursor-01 opacity-0">_</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-9xl font-black tracking-[-0.08em] text-white uppercase italic leading-[0.9] overflow-visible">
              <span className="inline-block bento-title-1">DISSOLVE</span> <br /> 
              <span className="inline-block bento-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>COAGULATE.</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mt-12">
            <p className="text-xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight tracking-tight">
              The Genesis of the Sanctum. We dismantle the <span className="text-accent italic">lead of convention</span> to reveal the hidden gold of infinite possibilities.
            </p>
            <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase border-l border-white/10 pl-6">
              Vision Protocol // 
              Sector: 01_ORIGIN // 
              Depth: INFINITE_VOID
              <br /><br />
              Sanctum Status: INITIALIZING
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[850px]">
          
          {/* Card 1: THE CORE KERNEL (DDD) */}
          <div ref={el => { cardsRef.current[0] = el }} className="relative md:col-span-2 md:row-span-2 group">
             <div className="h-full rounded-[2px] p-12 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-[4px] flex flex-col justify-between hover:border-accent/40 transition-all duration-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader tag="Law_01" title="Core Kernel" code="HEX_DDD_v2.0" />
                
                <div className="space-y-8 relative z-10">
                   <p className="text-zinc-400 text-2xl font-light italic leading-tight max-w-sm">
                      &quot;The boundary is the only sanctuary against entropy.&quot;
                   </p>
                   <div className="grid grid-cols-2 gap-x-12 gap-y-2 mt-12">
                      <TechnicalLine label="Domain" value="Pure" />
                      <TechnicalLine label="Port" value="Active" />
                      <TechnicalLine label="Adapter" value="Synced" />
                      <TechnicalLine label="Logic" value="Immutable" />
                   </div>
                </div>

                <div className="mt-16 relative z-10">
                   <div className="text-[10px] font-mono text-accent/40 mb-4 tracking-widest uppercase">System_Manifesto:</div>
                   <p className="text-zinc-500 text-[11px] leading-relaxed max-w-sm uppercase tracking-widest opacity-80">
                      We isolate the essential from the incidental. By anchoring our reality in Domain-Driven Design, we ensure that logic remains eternal while infrastructure fades into the void.
                   </p>
                </div>
                
                {/* Decorative Technical Artifact */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-accent/10 rounded-full group-hover:scale-150 transition-transform duration-1000" />
             </div>
          </div>

          {/* Card 2: VISUAL PRESENCE */}
          <div ref={el => { cardsRef.current[1] = el }} className="relative md:col-span-2 md:row-span-1 group">
             <div className="h-full rounded-[2px] p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-[4px] flex flex-col justify-between hover:border-accent/40 transition-all duration-700 relative">
                <CardHeader tag="Law_02" title="Visual Albedo" code="CATALYST_SYNC" />
                <div className="flex justify-between items-end gap-12 relative z-10">
                  <div className="space-y-4 max-w-sm">
                    <p className="text-zinc-400 text-sm font-light leading-relaxed uppercase tracking-widest opacity-80">
                      Metaphysical UI design that breathes with intent. Not just pixels, but a digital skin that reacts to the human soul.
                    </p>
                    <div className="flex gap-2">
                       {[1,2,3,4].map(i => <div key={i} className="w-8 h-[1px] bg-accent/20" />)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end font-mono">
                     <span className="text-4xl font-black text-accent/10">0x8F</span>
                     <span className="text-[8px] text-zinc-600 tracking-[0.5em]">HEX_VALUE</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Card 3: INFINITE VELOCITY */}
          <div ref={el => { cardsRef.current[2] = el }} className="relative md:col-span-1 md:row-span-1 group">
             <div className="h-full rounded-[2px] p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-[4px] flex flex-col justify-between hover:border-accent/40 transition-all duration-700">
                <CardHeader tag="Law_03" title="Velocity" />
                <div className="flex flex-col gap-4">
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white group-hover:text-accent transition-colors tracking-tighter italic">0.02</span>
                      <span className="text-xs font-mono text-zinc-500 uppercase">ms</span>
                   </div>
                   <div className="h-12 w-full bg-accent/5 rounded-sm relative overflow-hidden flex items-center px-4">
                      <div className="text-[8px] font-mono text-accent/40 animate-pulse tracking-[0.4em]">SYNCING_FLOW...</div>
                      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1, repeat: Infinity }} className="absolute bottom-0 left-0 h-[1px] bg-accent w-full" />
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4: ECOSYSTEM UNITY (Full Stack) */}
          <div ref={el => { cardsRef.current[3] = el }} className="relative md:col-span-1 md:row-span-1 group">
             <div className="h-full rounded-[2px] p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] backdrop-blur-[4px] flex flex-col justify-between hover:border-accent/40 transition-all duration-700">
                <CardHeader tag="Law_04" title="Ecosystem" />
                <div className="space-y-6">
                   <div className="flex flex-wrap gap-2">
                      {[
                        "NEXT.JS", "NESTJS", "GOLANG", "ANGULAR", 
                        "VITE", "EXPRESS", "PRISMA", "DOCKER", 
                        "REDIS", "MONGODB"
                      ].map(t => (
                        <span key={t} className="text-[9px] font-mono border border-accent/20 bg-accent/5 px-2 py-1 text-accent/80 uppercase tracking-tighter">
                          {t}
                        </span>
                      ))}
                   </div>
                   <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] leading-relaxed italic">
                      [ ALL_NODES_ARE_ONE ]
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
