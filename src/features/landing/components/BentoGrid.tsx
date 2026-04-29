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
        y: 100,
        opacity: 0,
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

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[900px]">
          
          {/* Big Card: Compute */}
          <motion.div style={{ y: y1 }} className="bento-card md:col-span-2 md:row-span-2">
            <Magnetic strength={0.05}>
              <div className="glass-refraction h-full rounded-[2rem] p-10 flex flex-col justify-between border border-white/10 group hover:border-accent/30 transition-all duration-500">
                <div>
                  <CardHeader tag="Compute" title="Neural Mesh Architecture" code="0x8F_NEXUS" />
                  <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-light">
                    Our proprietary decentralized compute fabric allows for horizontal scaling without the traditional overhead of synchronized states.
                  </p>
                </div>
                <div className="relative h-64 mt-12 bg-black/50 rounded-2xl overflow-hidden border border-white/5 p-4 flex flex-col gap-2">
                   <div className="flex justify-between text-[8px] font-mono text-zinc-400 opacity-80">
                     <span>[ STREAMING_DATA ]</span>
                     <span>BUFFER: 98%</span>
                   </div>
                  <div className="absolute inset-0 bg-grid-3d opacity-10 scale-50 pointer-events-none" />
                  <div className="relative z-10 flex flex-col gap-2 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i}
                        initial={{ width: "30%" }}
                        animate={{ width: ["30%", "70%", "40%", "90%", "30%"] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        className="h-1 bg-accent/10 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-accent w-1/4 animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Magnetic>
          </motion.div>

          {/* Medium Card: Intelligence */}
          <motion.div style={{ y: y2 }} className="bento-card md:col-span-2 md:row-span-1">
             <Magnetic strength={0.1}>
                <div className="glass-refraction h-full rounded-[2rem] p-10 flex flex-col justify-between border border-white/10 hover:border-accent/40 transition-all">
                  <div className="flex justify-between items-start">
                    <CardHeader tag="Intelligence" title="Predictive Latency" code="LAT_01" />
                    <span className="text-[10px] font-mono text-accent">[ ONLINE ]</span>
                  </div>
                  <div className="flex gap-4 items-end">
                    <div className="text-5xl font-black tracking-tighter text-white">0.02<span className="text-lg text-accent ml-1 uppercase">ms</span></div>
                    <span className="text-[10px] font-mono text-zinc-600 mb-2 uppercase">[ GLOBAL_AVG ]</span>
                  </div>
                </div>
             </Magnetic>
          </motion.div>

          {/* Small Card: Security */}
          <motion.div style={{ y: y3 }} className="bento-card md:col-span-1 md:row-span-1">
            <Magnetic strength={0.1}>
              <div className="glass-refraction h-full rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
                <CardHeader tag="Security" title="Hardened Nodes" code="SEC_ALPHA" />
                <div className="font-mono text-[9px] text-zinc-600 space-y-1">
                  <div className="flex justify-between"><span>[ ENCRYPTION ]</span> <span className="text-white">AES-256</span></div>
                  <div className="flex justify-between"><span>[ PROTOCOL ]</span> <span className="text-white">QUANTUM-RES</span></div>
                  <div className="flex justify-between"><span>[ STATUS ]</span> <span className="text-green-500">SECURE</span></div>
                </div>
              </div>
            </Magnetic>
          </motion.div>

          {/* Small Card: Ecosystem */}
          <motion.div style={{ y: y4 }} className="bento-card md:col-span-1 md:row-span-1">
            <Magnetic strength={0.1}>
              <div className="glass-refraction h-full rounded-[2rem] p-8 flex flex-col justify-between border border-white/10 bg-accent/5 hover:bg-accent/10 transition-all">
                <CardHeader tag="Connect" title="Open Protocol" code="SDK_v1" />
                <button className="w-full py-3 bg-white text-black text-[9px] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2">
                  <span>[</span> READ_SDK <span>]</span>
                </button>
              </div>
            </Magnetic>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

