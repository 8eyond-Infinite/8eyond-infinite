"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";

const ManifestoLine = ({ text, delay, direction = 1 }: { text: string; delay: number; direction?: number }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  
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

export const Manifesto = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);
  const skew = useTransform(scrollYProgress, [0, 1], [1, -1]);

  return (
    <section 
      ref={sectionRef} 
      id="manifesto" 
      className="relative min-h-screen bg-black py-40 px-6 flex flex-col justify-center overflow-hidden"
    >
      {/* Background HUD Elements */}
      <div className="absolute top-20 right-10 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] vertical-text hidden lg:block opacity-70">
        Beyond_Infinite_v8.0 // Core_Vision_Protocol
      </div>

      <motion.div 
        style={{ rotate, skewX: skew }}
        className="mx-auto max-w-[1400px] flex flex-col gap-4"
      >
        <div className="mb-20">
          <span className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-6">
            [ SECTION_03 // THE_MANIFESTO ]
          </span>
          <h2 className="text-xl md:text-2xl font-light text-zinc-500 max-w-xl leading-relaxed">
            We do not build for the present. We engineer for the post-infinite era where computation meets sentience.
          </h2>
        </div>

        <div className="flex flex-col">
          <ManifestoLine delay={0.1} text="THE LIMITS OF LOGIC" />
          <ManifestoLine delay={0.2} text="ARE NOT THE LIMITS" />
          <ManifestoLine delay={0.3} text="OF REALITY. WE BEYOND" />
          <ManifestoLine delay={0.4} text="THE INFINITE HORIZON" />
          <ManifestoLine delay={0.5} text="TO REDEFINE EXISTENCE" />
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-10 gap-8">
          <div className="max-w-md">
             <p className="text-sm text-zinc-600 font-light leading-relaxed">
               [ PROTOCOL_LOG ]: Reality is a malleable construct. Our mission is to provide the architectural integrity needed to reshape it. No latency. No compromise. Only transcendence.
             </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase opacity-80">Authentication: VERIFIED</span>
            <div className="h-px w-32 bg-accent/50" />
          </div>
        </div>
      </motion.div>

      {/* Background Interactive Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-grid-3d scale-150 rotate-12" />
      </div>
    </section>
  );
};
