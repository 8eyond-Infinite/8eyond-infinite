"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Magnetic } from "@/components/ui/Magnetic";

const PhilosopherCore = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Concentric Circles */}
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        className="absolute border border-accent/10 rounded-full"
        style={{ width: `${i * 20 + 20}%`, height: `${i * 20 + 20}%` }}
      />
    ))}
    
    {/* The Master 8 Core is now handled by GlobalInfinity in Layout */}
    <div className="relative w-64 h-32 z-10 opacity-0">
      {/* Invisible placeholder to maintain layout if needed */}
    </div>

  </div>
);

const FloatingSymbols = () => {
  const symbols = ['☿', '🜍', '🜔', '🜁', '🜃', '🜂', '🜄', '🜁', '☉', '☽'];
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.4, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 15 + Math.random() * 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="absolute text-accent font-serif italic"
          style={{ 
            fontSize: `${Math.random() * 30 + 15}px`,
            filter: `blur(${Math.random() * 1.5}px)`
          }}
        >
          {symbols[i % symbols.length]}
        </motion.div>
      ))}
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRedRef = useRef<HTMLHeadingElement>(null);
  const titleBlueRef = useRef<HTMLHeadingElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(coreRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      const xToR = gsap.quickTo(titleRedRef.current, "x", { duration: 0.5, ease: "power3" });
      const yToR = gsap.quickTo(titleRedRef.current, "y", { duration: 0.5, ease: "power3" });
      const xToB = gsap.quickTo(titleBlueRef.current, "x", { duration: 0.8, ease: "power3" });
      const yToB = gsap.quickTo(titleBlueRef.current, "y", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 60;
        const y = (clientY / window.innerHeight - 0.5) * 60;

        xToR(x * 0.4);
        yToR(y * 0.4);
        xToB(x * -0.4);
        yToB(y * -0.4);

        gsap.to(coreRef.current, {
          x: x * 2,
          y: y * 2,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
        scale: 0.9,
        opacity: 0,
        filter: "blur(20px)",
        ease: "none",
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black selection:bg-accent/30"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05)_0%,transparent_70%)]" />
        {/* Manuscript Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png)' }} />
      </div>

      {/* The Philosopher's Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-10">
        <div ref={coreRef} className="w-full h-full">
           <PhilosopherCore />
        </div>
      </div>

      {/* Floating Alchemical Spirits */}
      <FloatingSymbols />

      {/* Particle Field - Gold Dust */}
      <div className="absolute inset-0 pointer-events-none z-20">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ 
               opacity: 0, 
               x: Math.random() * 100 + "%", 
               y: Math.random() * 100 + "%" 
             }}
             animate={{ 
               opacity: [0, 0.5, 0],
               y: ["-10%", "110%"],
               x: ["-5%", "5%"]
             }}
             transition={{ 
               duration: 10 + Math.random() * 20, 
               repeat: Infinity, 
               ease: "linear",
               delay: Math.random() * 10
             }}
             className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
           />
         ))}
      </div>

      <div className="relative z-30 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-6 mb-8"
        >
          <span className="text-[10px] font-mono text-accent tracking-[0.5em] uppercase opacity-70">
            [ MAGNUM_OPUS // THE_BEGINNING ]
          </span>
        </motion.div>

        <div className="relative mb-10">
          <h1
            ref={titleBlueRef}
            className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-accent-secondary opacity-30 mix-blend-screen pointer-events-none uppercase italic"
          >
            8eyond
          </h1>
          <h1
            ref={titleRedRef}
            className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-accent opacity-30 mix-blend-screen pointer-events-none uppercase italic"
          >
            8eyond
          </h1>
          <h1 className="relative text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-white uppercase italic drop-shadow-[0_0_30px_rgba(251,191,36,0.2)]">
            8eyond<br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-accent/50 to-transparent bg-[length:200%_100%] animate-shimmer-fast"
              style={{
                WebkitTextStroke: "1px rgba(251,191,36,0.3)",
              }}
            >
              Infinite.
            </span>
          </h1>
        </div>

        <motion.p
          custom={1}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-12 max-w-lg text-sm md:text-base text-zinc-500 font-light leading-relaxed tracking-wide"
        >
          Transcending the lead of traditional logic. 
          We transmute the code into legacy through the architecture of mastery.
          Digital Alchemy for the post-infinite era.
        </motion.p>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
      >
        <span className="text-[8px] font-mono text-accent uppercase tracking-[0.8em] whitespace-nowrap opacity-50">
          [ DESCEND ]
        </span>
        <div className="w-px h-10 bg-white/5 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent shadow-[0_0_10px_var(--accent)]"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-grid-3d opacity-[0.05] pointer-events-none" />

      {/* Peripheral HUD Modules - Alchemical Version */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-20 pointer-events-none hidden md:flex">
        <div className="flex flex-col gap-2">
          <span className="text-[8px] font-serif italic text-accent opacity-50 uppercase tracking-[0.5em] vertical-text">
            Solve et Coagula
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-accent/40 via-accent/10 to-transparent mx-auto" />
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-20 pointer-events-none hidden md:flex items-end">
        <div className="flex flex-col gap-2 items-end">
          <span className="text-[8px] font-serif italic text-accent opacity-50 uppercase tracking-[0.5em] vertical-text">
            Magnum Opus
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-accent/40 via-accent/10 to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};
