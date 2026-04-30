"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LOG_LINES = [
  "> INITIALIZING_SYSTEM_CORE...",
  "> LOADING_NEURAL_NETWORK_V8.4...",
  "> SYNCING_WITH_GLOBAL_NODES_[0x8F]",
  "> CHECKING_QUANTUM_ENCRYPTION...",
  "> STATUS:_OPERATIONAL",
  "> [MISSION]:_TRANSCEND_INFINITE",
  "> [WARNING]:_LATENCY_IN_SECTOR_7",
  "> RE-ROUTING_DATA_FLOW...",
  "> SYSTEM_OPTIMIZED_READY.",
  "> WAITING_FOR_INITIALIZATION...",
];

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-1 mb-4">
    <div className="flex justify-between text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
      />
    </div>
  </div>
);

export const Terminal = () => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  useEffect(() => {
    if (currentLineIndex < LOG_LINES.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, LOG_LINES[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedLogs([]);
        setCurrentLineIndex(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLineIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  const fluxData = [
    { h1: "45%", h2: "82%" }, { h1: "32%", h2: "65%" }, { h1: "78%", h2: "41%" },
    { h1: "55%", h2: "90%" }, { h1: "20%", h2: "75%" }, { h1: "85%", h2: "30%" },
    { h1: "62%", h2: "88%" }, { h1: "40%", h2: "60%" }, { h1: "95%", h2: "25%" },
    { h1: "50%", h2: "70%" }, { h1: "35%", h2: "85%" }, { h1: "72%", h2: "50%" }
  ];

  return (
    <section 
      ref={containerRef}
      id="terminal"
      className="relative py-60 bg-black px-6 overflow-hidden perspective-1000"
    >
      <div className="mx-auto max-w-[1200px] relative z-20">
        {/* Monumental Header */}
        <div className="mb-32">
          <span className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-6">
            [ PHASE_03 // COMMAND_NEXUS ]
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
            System <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
              Terminal.
            </span>
          </h2>
        </div>

        {/* 3D Terminal Container */}
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative glass-refraction rounded-[2px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left HUD Panel */}
          <div className="lg:col-span-3 border-r border-white/5 bg-white/[0.02] p-8 hidden lg:block">
            <div className="text-[10px] font-mono text-accent mb-8 tracking-widest uppercase">System_Health</div>
            <StatBar label="CPU_CORE" value={42} />
            <StatBar label="MEM_SYNC" value={68} />
            <StatBar label="NET_FLUX" value={91} />
            <div className="mt-12 pt-12 border-t border-white/5 text-[8px] font-mono text-zinc-600 space-y-4 uppercase tracking-[0.2em]">
               <div>Kernel: v8.0.4-LTS</div>
               <div>Uptime: 1,204:54:12</div>
               <div>Auth: Genesis_01</div>
            </div>
          </div>

          {/* Main Console Area */}
          <div className="lg:col-span-6 relative">
            {/* Header Bar */}
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/30" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                <div className="w-2 h-2 rounded-full bg-green-500/30" />
              </div>
              <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                root@8eyond-infinite:~
              </div>
            </div>

            {/* Console Output */}
            <div
              ref={scrollRef}
              className="p-8 h-[450px] overflow-y-auto font-mono text-[11px] leading-relaxed scrollbar-hide bg-black/40"
            >
              <div className="flex flex-col gap-2">
                {displayedLogs.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${line.includes("WARNING") ? "text-yellow-500" : line.includes("OPERATIONAL") || line.includes("READY") ? "text-accent" : "text-zinc-400"}`}
                  >
                    <span className="text-zinc-700 mr-2 opacity-50">{new Date().toLocaleTimeString()}</span>
                    {line}
                  </motion.div>
                ))}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-accent mt-1"
                />
              </div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
          </div>

          {/* Right Data Viz Panel */}
          <div className="lg:col-span-3 border-l border-white/5 bg-white/[0.02] p-8 hidden lg:block">
             <div className="text-[10px] font-mono text-accent mb-8 tracking-widest uppercase">Global_Flux</div>
             <div className="h-40 flex items-end gap-1 mb-8">
                {fluxData.map((data, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [data.h1, data.h2] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                    className="flex-1 bg-accent/20 border-t border-accent"
                  />
                ))}
             </div>
             <div className="text-[8px] font-mono text-zinc-500 uppercase leading-loose">
                [ COORDINATES ]: 43.12 N<br />
                [ TARGET ]: INFINITE_TRANSIT<br />
                [ ENCRYPTION ]: QUANTUM_8<br />
                [ STATUS ]: SYNCED
             </div>
          </div>
        </motion.div>

        {/* Ambient Floor Glow */}
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/10 blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
};
