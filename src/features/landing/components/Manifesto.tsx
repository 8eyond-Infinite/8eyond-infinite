"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ManifestoLine = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
        viewport={{ once: true }}
        className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] flex items-center gap-4 whitespace-nowrap"
      >
        <span className="text-zinc-500 font-mono text-xl mr-4 opacity-70">
          [{Math.floor(delay * 100).toString().padStart(3, '0')}]
        </span>
        <span className="text-white hover:text-accent transition-colors duration-500 cursor-default">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

const AlchemicalSymbol = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-opacity duration-700 group/symbol">
    <span className="text-2xl font-serif italic text-accent group-hover/symbol:text-yellow-500 transition-colors">{icon}</span>
    <span className="text-[8px] font-mono tracking-[0.3em] text-zinc-600">{label}</span>
  </div>
);

export const Manifesto = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateCircle = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale8 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section 
      ref={sectionRef} 
      id="manifesto" 
      className="relative min-h-screen py-40 px-6 flex flex-col justify-center overflow-hidden"
    >
      {/* Layer 0: Background Layer (Behind Infinity) */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Sacred Geometry (Part of Background) */}
      <motion.div 
        style={{ rotate: rotateCircle, scale: scale8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] opacity-[0.03] pointer-events-none z-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none">
          <circle cx="50" cy="50" r="48" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="40" strokeWidth="0.05" />
          <path d="M50 2 L98 50 L50 98 L2 50 Z" strokeWidth="0.1" />
          <path d="M50 10 L90 50 L50 90 L10 50 Z" strokeWidth="0.05" />
          <rect x="25" y="25" width="50" height="50" strokeWidth="0.1" transform="rotate(45 50 50)" />
        </svg>
      </motion.div>

      {/* Alchemical Symbols Bar (Should be in front of Infinity) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-16 z-30 hidden xl:flex">
         <AlchemicalSymbol icon="☿" label="MERCURY" />
         <AlchemicalSymbol icon="🜍" label="SULFUR" />
         <AlchemicalSymbol icon="🜔" label="SALT" />
      </div>

      {/* Layer 2: Content Layer (In front of Infinity) */}
      <motion.div 
        className="mx-auto max-w-[1400px] w-full flex flex-col gap-4 relative z-20"
      >
        <div className="mb-24 relative">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[12px] font-mono text-accent tracking-[0.6em] uppercase">
              [ THE_MAGNUM_OPUS // STAGE_ALPHA ]
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>

          <h2 className="text-6xl md:text-[10rem] font-black tracking-[-0.06em] text-white uppercase italic leading-[0.8] mb-12">
            DIGITAL <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
               ALCHEMY.
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <h2 className="text-xl md:text-3xl font-light text-zinc-400 max-w-2xl leading-tight tracking-tight">
              Logic is our lead. Mastery is our gold. We transmute <span className="text-accent italic">chaos into cosmos</span> through the architecture of 8.
            </h2>
            <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase">
              Solve et Coagula // The fundamental principle of our creation. Dissolve the complex, coagulate the essential.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 group/lines">
          <ManifestoLine delay={0.1} text="THE CALCINATION OF CODE" />
          <ManifestoLine delay={0.2} text="THE DISSOLUTION OF BOUNDARIES" />
          <ManifestoLine delay={0.3} text="THE COAGULATION OF LOGIC" />
          <ManifestoLine delay={0.4} text="THE TRANSMUTATION OF REALITY" />
        </div>

        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 relative">
          {/* Phase 01: Nigredo */}
          <div className="flex flex-col gap-6 group/phase cursor-none">
             <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif italic text-zinc-800 group-hover/phase:text-white transition-colors duration-500">I.</span>
                <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase group-hover/phase:text-yellow-500 transition-colors duration-500">Nigredo</span>
             </div>
             <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest leading-relaxed group-hover/phase:text-zinc-400 transition-colors">
               The Blackness. Breaking down the complex structures of the finite world to extract the raw essence of code.
             </p>
          </div>

          {/* Phase 02: Albedo */}
          <div className="flex flex-col gap-6 group/phase cursor-none">
             <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif italic text-zinc-800 group-hover/phase:text-white transition-colors duration-500">II.</span>
                <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase group-hover/phase:text-yellow-500 transition-colors duration-500">Albedo</span>
             </div>
             <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest leading-relaxed group-hover/phase:text-zinc-400 transition-colors">
               The Whiteness. Purifying logic, removing the noise of chaos, and reaching the state of architectural crystalline clarity.
             </p>
          </div>

          {/* Phase 03: Rubedo */}
          <div className="flex flex-col gap-6 group/phase cursor-none">
             <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif italic text-zinc-800 group-hover/phase:text-white transition-colors duration-500">III.</span>
                <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase group-hover/phase:text-yellow-500 transition-colors duration-500">Rubedo</span>
             </div>
             <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest leading-relaxed group-hover/phase:text-zinc-400 transition-colors">
               The Redness. The final stage of transmutation. The birth of the Infinite Protocol. Matter becomes spirit, logic becomes legacy.
             </p>
          </div>
        </div>
      </motion.div>

      {/* Latin Background Text */}
      <div className="absolute bottom-20 left-10 text-[6vh] font-serif italic text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter vertical-text z-0">
        Non ducor, duco // Solve et Coagula
      </div>
    </section>
  );
};
