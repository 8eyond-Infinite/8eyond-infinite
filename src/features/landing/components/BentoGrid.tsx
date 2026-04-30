"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CardHeader = ({ title, tag, code }: { title: string; tag: string; code?: string }) => (
  <div className="flex flex-col gap-1 mb-8">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">[ {tag} ]</span>
      {code && <span className="text-[8px] font-mono text-zinc-500 uppercase opacity-80">{code}</span>}
    </div>
    <h3 className="text-2xl font-bold tracking-tight text-white mt-2 uppercase">{title}</h3>
  </div>
);

export const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Parallax trồi lên cho cả cái Grid nội dung
      gsap.from(".bento-content-layer", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      });

      // Hiệu ứng Parallax nhẹ cho từng card để tạo độ nổi
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const speed = [0.05, 0.1, 0.08, 0.12][i];
        
        gsap.to(card, {
          y: -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="vision" className="relative py-40 px-6 bg-transparent overflow-visible">
      {/* Lớp 0: Nền đen (Dưới dấu vô cực) */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Lớp 20: Toàn bộ Nội dung (Trên dấu vô cực) */}
      <div className="bento-content-layer mx-auto max-w-[1400px] relative z-20">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <span className="text-[12px] font-mono text-accent tracking-[0.6em] uppercase block mb-6 opacity-70">[ PHASE_01 // THE_NEXUS ]</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
              Infinite Scaling.<br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Zero Compromise.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          
          {/* Card 1 */}
          <div ref={el => { cardsRef.current[0] = el }} className="relative md:col-span-2 md:row-span-2 group">
             <div className="h-full rounded-sm p-10 border border-white/5 bg-zinc-900/40 backdrop-blur-3xl flex flex-col justify-between">
                <CardHeader tag="The_Alchemy" title="Logic Transmutation" code="LEGACY_v1" />
                <div className="mt-auto">
                   <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                      Transmuting legacy architectures into high-performance alchemical systems with absolute precision.
                   </p>
                </div>
             </div>
          </div>

          {/* Card 2 */}
          <div ref={el => { cardsRef.current[1] = el }} className="relative md:col-span-2 md:row-span-1 group">
             <div className="h-full rounded-sm p-10 border border-white/5 bg-zinc-900/60 backdrop-blur-3xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <CardHeader tag="The_Law" title="Equivalent Exchange" code="BAL_08" />
                  <span className="text-[10px] font-mono text-accent/60 tracking-widest uppercase italic">Harmonized</span>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-4">
                  <p className="text-zinc-400 text-[11px] font-light leading-relaxed max-w-[240px]">
                    Every feature requires equal consideration of performance and maintainability. Pure balance.
                  </p>
                  <div className="text-5xl font-black tracking-tighter text-white uppercase italic">
                     Zero<span className="block text-[10px] not-italic text-accent tracking-[0.4em] mt-1 font-mono">Compromise</span>
                  </div>
                </div>
             </div>
          </div>

          {/* Card 3 */}
          <div ref={el => { cardsRef.current[2] = el }} className="relative md:col-span-1 md:row-span-1 group">
             <div className="h-full rounded-sm p-8 border border-white/5 bg-zinc-900/20 backdrop-blur-xl flex flex-col justify-between">
                <CardHeader tag="The_Cycle" title="Vertical Infinity" />
                <div className="h-24 w-full bg-gradient-to-t from-accent/10 to-transparent rounded-sm opacity-50" />
             </div>
          </div>

          {/* Card 4 */}
          <div ref={el => { cardsRef.current[3] = el }} className="relative md:col-span-1 md:row-span-1 group">
             <div className="h-full rounded-sm p-8 border border-white/10 bg-accent/[0.05] backdrop-blur-3xl flex flex-col justify-between">
                <CardHeader tag="The_Process" title="Chaos to Cosmos" code="DISTILL_01" />
                <div className="space-y-4">
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-accent animate-pulse" />
                   </div>
                   <span className="text-[9px] font-mono text-accent/40 uppercase tracking-widest">Distilling...</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
