"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

export const Team = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative min-h-[120vh] bg-black py-40 px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Editorial Background Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h2
          style={{ y: yBg }}
          className="text-[20vw] font-black text-white/[0.03] uppercase tracking-tighter whitespace-nowrap"
        >
          THE ALCHEMIST
        </motion.h2>
      </div>

      <div className="mx-auto max-w-[1400px] w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

          {/* Portrait Side */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <motion.div
              style={{ opacity, y: yCard }}
              className="relative w-72 h-[450px] md:w-[450px] md:h-[600px] group"
            >
              {/* Main Image Container */}
              <div className="absolute inset-0 overflow-hidden rounded-[2px] border border-white/10 group-hover:border-accent/40 transition-colors duration-700 shadow-2xl">
                <motion.img
                  src="/assets/images/avt.jpg"
                  alt="Tran Hoang Anh Tu"
                  className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000 ease-out"
                />

                {/* Liquid Refraction Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Minimalist Tech Accents */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-accent/40" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-accent/40" />

              {/* Floating ID Label */}
              <div className="absolute top-10 -right-12 vertical-text hidden md:block">
                <span className="text-[10px] font-mono text-zinc-500 tracking-[0.5em] uppercase">
                  [ UID: TRHGATU_ORIGIN // GENESIS_01.11 ]
                </span>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12 bg-accent shadow-[0_0_10px_var(--accent)]" />
                <span className="text-[12px] font-mono text-accent tracking-[0.6em] uppercase">[ PHASE_05 // THE_ARCHITECT ]</span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase italic"
              >
                Tran Hoang <br />
                <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>Anh Tu.</span>
              </motion.h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-md"
            >
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed italic">
                &quot;I am the Alchemist of the digital void. I transform the lead of raw logic into the gold of infinite reality.&quot;
              </p>
            </motion.div>

            <div className="flex flex-row items-center gap-6 md:gap-10 mt-8 overflow-x-visible">
              {["Github", "LinkedIn", "X-Space", "Signal"].map((item, index) => (
                <React.Fragment key={item}>
                  <Magnetic strength={0.2}>
                    <a 
                      href="#" 
                      className="group relative flex flex-col gap-3 cursor-none whitespace-nowrap"
                    >
                      {/* The Module Header */}
                      <div className="flex items-center gap-3">
                         <span className="text-[8px] font-mono text-zinc-700 group-hover:text-accent transition-colors">0{index + 1}</span>
                         <div className="flex items-center gap-1">
                            <span className="text-white/10 text-lg font-mono transition-colors group-hover:text-accent">[</span>
                            <span className="text-sm font-black text-zinc-500 group-hover:text-white uppercase tracking-[0.2em] transition-all group-hover:tracking-[0.4em] duration-500">
                              {item}
                            </span>
                            <span className="text-white/10 text-lg font-mono transition-colors group-hover:text-accent">]</span>
                         </div>
                      </div>

                      {/* Revealed Technical Metadata (Expanding Down) */}
                      <div className="absolute top-full left-0 overflow-hidden h-0 group-hover:h-8 transition-all duration-500 opacity-0 group-hover:opacity-100 min-w-[120px] z-20">
                         <div className="flex flex-col gap-0.5 mt-2 bg-black/80 backdrop-blur-md p-1 rounded-sm">
                            <div className="flex justify-between text-[6px] font-mono text-accent/60 uppercase tracking-widest">
                               <span>STATUS</span>
                               <span>SECURE</span>
                            </div>
                            <div className="h-0.5 w-full bg-accent/20 rounded-full overflow-hidden">
                               <motion.div 
                                 animate={{ x: ["-100%", "100%"] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                 className="w-1/2 h-full bg-accent"
                               />
                            </div>
                         </div>
                      </div>

                      {/* Background Trace */}
                      <div className="absolute -inset-x-4 -inset-y-2 bg-accent/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity rounded-lg" />
                    </a>
                  </Magnetic>
                  
                  {/* Vertical HUD Divider */}
                  {index < 3 && (
                    <div className="h-4 w-px bg-white/10 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
