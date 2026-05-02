"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";

const LOG_LINES = [
  "> [PROCESS]:_INITIATING_GREAT_WORK...",
  "> [STAGE]:_NIGREDO_STABILIZED.",
  "> [ACTION]:_DISSOLVING_LEGACY_STRUCTURES...",
  "> [FORMULA]:_SOLVE_ET_COAGULA_V2.0",
  "> [TRANSMUTE]:_LATENCY_>>_INSTANT_FLOW",
  "> [SCAN]:_NEURAL_NODES_DETOXIFIED.",
  "> [SYNC]:_ALIGNING_WITH_INFINITE_SOURCE",
  "> [STATUS]:_ALCHEMY_IN_PROGRESS...",
  "> [SUCCESS]:_DIGITAL_GOLD_DISTILLED.",
  "> [WARNING]:_CHAOS_DETECTED_IN_SECTOR_8",
  "> [ACTION]:_APPLYING_ORDER_MATRICES...",
  "> [RESULT]:_PURE_LOGIC_COAGULATED.",
  "> [SYSTEM]:_BEYOND_INFINITE_OPERATIONAL.",
  "> WAITING_FOR_NEXT_TRANSMUTATION...",
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
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.to(".terminal-title-1", {
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".terminal-title-2", {
        x: 60,
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
      const fullText = "[ PHASE_05 // COMMAND_NEXUS ]";
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
            <span className="inline-block terminal-title-1">Alchemical</span> <br /> 
            <span className="inline-block terminal-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              Nexus.
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-12 items-start justify-between mt-12">
            <p className="text-xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight tracking-tight">
              The interface of the Great Work. Here, we execute the protocols of <span className="text-accent italic">conscious creation</span>, bridging the void between thought and reality.
            </p>
            <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase border-l border-white/10 pl-6">
              Command Protocol // 
              Root: 0x8_INFINITE // 
              Kernel: STABLE_FLUX
              <br /><br />
              Nexus Status: ACTIVE
            </div>
          </div>
        </div>

        {/* 3D Terminal Container */}
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative glass-refraction rounded-[2px] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left HUD Panel */}
          <div className="lg:col-span-3 border-r border-white/5 bg-white/[0.02] p-8 hidden lg:block">
            <div className="text-[10px] font-mono text-accent mb-8 tracking-widest uppercase">Transmutation_Metrics</div>
            <StatBar label="ETHER_STABILITY" value={88} />
            <StatBar label="SOUL_COHESION" value={74} />
            <StatBar label="VOID_RESONANCE" value={12} />
            <div className="mt-12 pt-12 border-t border-white/5 text-[8px] font-mono text-zinc-600 space-y-4 uppercase tracking-[0.2em]">
               <div>Protocol: SOLVE_ET_COAGULA</div>
               <div>Uptime: INFINITE_STREAM</div>
               <div>Auth: Master_Alchemist</div>
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
                {displayedLogs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={log.includes('[SUCCESS]') ? 'text-accent' : log.includes('[WARNING]') ? 'text-red-500' : 'text-zinc-400'}
                  >
                    {log}
                  </motion.div>
                ))}
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-accent mt-1"
                />
              </div>
            </div>
          </div>

          {/* Right Data Stream Panel */}
          <div className="lg:col-span-3 border-l border-white/5 bg-white/[0.01] p-6 hidden lg:flex flex-col">
             <div className="text-[10px] font-mono text-zinc-600 mb-6 tracking-widest uppercase">Flux_Oscillations</div>
             <div className="flex-1 flex flex-col gap-1">
                {fluxData.map((d, i) => (
                  <div key={i} className="flex gap-1 h-3 items-end">
                    <motion.div 
                      animate={{ height: [d.h1, d.h2, d.h1] }}
                      transition={{ duration: 2 + i*0.1, repeat: Infinity }}
                      className="flex-1 bg-white/[0.03] border-t border-white/10"
                    />
                    <motion.div 
                      animate={{ height: [d.h2, d.h1, d.h2] }}
                      transition={{ duration: 1.5 + i*0.1, repeat: Infinity }}
                      className="flex-1 bg-accent/10 border-t border-accent/30"
                    />
                  </div>
                ))}
             </div>
             <div className="mt-6 text-[7px] font-mono text-zinc-700 leading-tight">
                [ SCANNING_SECTOR_8_FOR_ANOMALIES... ]
                <br />
                [ ENCRYPTING_DATA_STREAM... ]
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
