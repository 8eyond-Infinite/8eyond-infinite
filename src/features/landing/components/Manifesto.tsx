"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.to(".manifesto-title-1", {
        x: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".manifesto-title-2", {
        x: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Phase Label Scramble Typewriter
      const phaseLabel = document.querySelector(".phase-label-03");
      const phaseCursor = document.querySelector(".phase-cursor-03");
      const fullText = "[ PHASE_03 // THE_DECLARATION ]";
      const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]//_!@#$%^&*";
      
      gsap.to({}, {
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      <div className="mx-auto max-w-[1400px] w-full flex flex-col gap-4 relative z-20">
        <div className="mb-24 relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center font-mono text-accent">
              <span className="text-[12px] tracking-[0.6em] uppercase phase-label-03">
                {/* GSAP will fill this */}
              </span>
              <span className="text-[12px] phase-cursor-03 opacity-0">_</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
          </div>

          <h2 className="text-6xl md:text-9xl font-black tracking-[-0.08em] text-white uppercase italic leading-[0.9] mb-12 overflow-visible">
            <span className="inline-block manifesto-title-1">DIGITAL</span> <br /> 
            <span className="inline-block manifesto-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
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

        <div className="flex flex-col">
          <ManifestoLine text="Domain-Driven Excellence" delay={0.1} />
          <ManifestoLine text="Metaphysical Aesthetics" delay={0.2} />
          <ManifestoLine text="Immutable Reality" delay={0.3} />
          <ManifestoLine text="Infinite Scalability" delay={0.4} />
        </div>
      </div>
    </section>
  );
};
