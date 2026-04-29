"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";

const CardHeader = ({ title, tag, code }: { title: string; tag: string; code?: string }) => (
  <div className="flex flex-col gap-1 mb-8">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">[ {tag} ]</span>
      {code && <span className="text-[8px] font-mono text-zinc-500 uppercase opacity-80">{code}</span>}
    </div>
    <h3 className="text-2xl font-bold tracking-tight text-white mt-2">{title}</h3>
  </div>
);

export const BentoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [systemTime, setSystemTime] = React.useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  useEffect(() => {
    // 1. Live System Clock
    const timer = setInterval(() => {
      setSystemTime(new Date().toISOString());
    }, 1000);

    // 2. Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <section ref={containerRef} id="vision" className="relative py-40 px-6 bg-black overflow-hidden">
      {/* Background decoration with HUD lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-accent/20 via-transparent to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30" />
      <div className="absolute bottom-10 left-10 text-[8px] font-mono text-zinc-500 opacity-80 hidden lg:block">
        [ COORDINATES: 43.1209° N // 77.6197° W ]<br />
        [ SYSTEM_TIME: {systemTime || "INITIALIZING..."} ]
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-4"
            >
              [ PHASE_01 // THE_NEXUS ]
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
              Infinite Scaling.<br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                Zero Compromise.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
            [ ARCHITECTURE_REPORT ]: We are re-engineering the foundational layers of digital existence to support the magnitude of the next decade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          
          {/* Big Card: Logic Transmutation */}
          <motion.div style={{ y: y1 }} className="bento-card md:col-span-2 md:row-span-2">
            <Magnetic strength={0.05}>
              <div className="glass-refraction h-full rounded-[2px] p-8 flex flex-col justify-between border border-white/10 group hover:border-accent/30 transition-all duration-500 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(41,98,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
                </div>

                <div>
                  <CardHeader tag="The_Alchemy" title="Logic Transmutation" code="LEGACY_v1" />
                  <p className="text-zinc-500 text-[13px] max-w-sm leading-relaxed font-light">
                    Transmuting complexity into legacy. Every line is an incantation, every architecture a testament to mastery.
                  </p>
                </div>

                {/* CENTRAL VISUALIZER: Compact Neural Core */}
                <div className="relative flex-1 flex items-center justify-center my-4">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="relative w-24 h-24 border border-white/[0.05] rounded-full flex items-center justify-center"
                   >
                      <div className="absolute inset-0 border border-accent/10 rounded-full scale-75 opacity-20" />
                      <div className="absolute flex flex-col items-center">
                         <div className="w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" />
                      </div>
                   </motion.div>
                </div>

                <div className="relative bg-black/60 rounded-sm border border-white/5 p-5 flex flex-col gap-4">
                   <div className="flex justify-between items-center">
                      <span className="text-[7px] font-mono text-zinc-400 opacity-80 uppercase tracking-widest">[ ACTIVE_MISSIONS ]</span>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-1.5">
                      {[
                        { label: "DEPLOYING_FOUNDATIONS", status: "DONE" },
                        { label: "TRANSCENDING_PARADIGMS", status: "RUNNING" },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className={`w-1 h-1 ${m.status === "DONE" ? "bg-accent" : "bg-accent animate-pulse"}`} />
                              <span className="text-[7px] font-mono text-zinc-500 uppercase">{m.label}</span>
                           </div>
                           <span className="text-[6px] font-mono text-zinc-800">[{m.status}]</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </Magnetic>
          </motion.div>

          {/* Medium Card: Equivalent Exchange */}
          <motion.div style={{ y: y2 }} className="bento-card md:col-span-2 md:row-span-1">
             <Magnetic strength={0.1}>
                <div className="glass-refraction h-full rounded-[2px] p-8 flex flex-col justify-between border border-white/10 bg-black/40 backdrop-blur-3xl hover:border-accent/40 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-3d opacity-5 pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <CardHeader tag="The_Law" title="Equivalent Exchange" code="BAL_08" />
                    <span className="text-[9px] font-mono text-accent tracking-widest">[ HARMONIZED ]</span>
                  </div>

                  <div className="flex items-center justify-between gap-8">
                    <p className="text-zinc-500 text-[11px] font-light leading-relaxed max-w-[220px]">
                      Every feature requires equal consideration of performance, maintainability, and scalability. Pure balance.
                    </p>
                    <div className="text-4xl font-black tracking-tighter text-white uppercase italic shrink-0">
                       Zero<span className="block text-[10px] not-italic text-accent tracking-[0.4em] mt-1">Compromise</span>
                    </div>
                  </div>
                </div>
             </Magnetic>
          </motion.div>

          {/* Small Card: Vertical Infinity */}
          <motion.div style={{ y: y3 }} className="bento-card md:col-span-1 md:row-span-1">
            <Magnetic strength={0.1}>
              <div className="glass-refraction h-full rounded-[2px] p-6 flex flex-col justify-between border border-white/10 bg-black/40 backdrop-blur-3xl hover:border-white/20 transition-all group/card">
                <div>
                  <CardHeader tag="The_Cycle" title="Vertical Infinity" code="8_LOOP" />
                  <p className="text-zinc-500 text-[10px] font-light leading-tight mt-2 uppercase tracking-tighter">
                    Code that stands the test of time. Continuous evolution without boundaries.
                  </p>
                </div>
                <div className="relative h-12 flex items-center justify-center overflow-hidden border-y border-white/5 bg-white/[0.01] my-4">
                   <span className="text-[32px] font-black text-white/5 tracking-tighter group-hover/card:text-accent/10 transition-colors">8</span>
                </div>
                <div className="font-mono text-[8px] text-zinc-600 space-y-1.5">
                  <div className="flex justify-between"><span>[ CYCLE ]</span> <span className="text-white uppercase">Rebirth</span></div>
                  <div className="flex justify-between"><span>[ STATUS ]</span> <span className="text-accent uppercase">Immortal</span></div>
                </div>
              </div>
            </Magnetic>
          </motion.div>

          {/* Small Card: Chaos to Cosmos */}
          <motion.div style={{ y: y4 }} className="bento-card md:col-span-1 md:row-span-1">
            <Magnetic strength={0.1}>
              <div className="glass-refraction h-full rounded-[2px] p-6 flex flex-col justify-between border border-white/10 bg-accent/5 backdrop-blur-3xl hover:bg-accent/10 transition-all">
                <div>
                  <CardHeader tag="The_Process" title="Chaos to Cosmos" code="DISTILL_01" />
                  <p className="text-white/40 text-[10px] font-light leading-tight mt-2 uppercase tracking-tighter">
                    Distilling complexity into elegant simplicity through technical precision.
                  </p>
                </div>
                <div className="space-y-4 mt-4">
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-accent" 
                      />
                   </div>
                   <div className="text-[7px] font-mono text-zinc-600 leading-tight uppercase">
                      [ MISSION ]: STARTERS
                   </div>
                </div>
              </div>
            </Magnetic>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

