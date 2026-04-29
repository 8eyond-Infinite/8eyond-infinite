"use client";

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Starfield } from "./space/Starfield";

const InfinityIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
    <path
      className="infinity-path"
      d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeDasharray="500"
      strokeDashoffset="500"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--accent)" />
        <stop offset="100%" stopColor="var(--accent-secondary)" />
      </linearGradient>
    </defs>
  </svg>
);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRedRef = useRef<HTMLHeadingElement>(null);
  const titleBlueRef = useRef<HTMLHeadingElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".infinity-path", {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(coreRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      // 2. RGB Split Mouse Momentum (Direct DOM manipulation)
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

        // Core Parallax
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
        scale: 0.8,
        rotateX: 15,
        z: -500,
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
      <Starfield />
      <div className="grain-overlay" />
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,6,23,0.3)_0%,transparent_70%)]" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <Magnetic strength={0.2}>
          <div
            ref={coreRef}
            className="w-full h-full opacity-30 blur-[40px]"
          >
            <InfinityIcon />
          </div>
        </Magnetic>
      </div>
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-6 mb-8"
        >
          <span className="text-[10px] font-mono text-accent tracking-[0.5em] uppercase opacity-70">
            [ ORIGIN_POINT // GENESIS_00 ]
          </span>
        </motion.div>

        <div className="relative mb-10">
          <h1
            ref={titleBlueRef}
            className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-blue-500 opacity-50 mix-blend-screen pointer-events-none uppercase italic"
          >
            8eyond
          </h1>
          <h1
            ref={titleRedRef}
            className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-red-500 opacity-50 mix-blend-screen pointer-events-none uppercase italic"
          >
            8eyond
          </h1>
          <h1 className="relative text-7xl font-black tracking-[-0.04em] sm:text-8xl lg:text-[10rem] leading-none text-white uppercase italic">
            8eyond<br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] animate-shimmer-fast" 
              style={{ 
                WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                textShadow: "0 0 20px rgba(6,182,212,0.1)"
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
          Transcending the boundaries of traditional computation.
          We build the infrastructure for the next epoch of digital sentience.
          Pure logic. Boundless scale. Infinite vision.
        </motion.p>

        <motion.div
          custom={2}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-12 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <Button variant="primary" size="lg" className="group relative overflow-hidden rounded-full bg-white px-10 py-6 text-black transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 font-bold tracking-widest text-xs">INITIALIZE INTERFACE</span>
              <div className="absolute inset-0 z-0 bg-accent translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </Button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a href="#manifesto">
              <Button variant="ghost" className="group flex items-center gap-4 font-mono text-xs tracking-widest text-zinc-400 hover:text-white transition-colors whitespace-nowrap">
                <span className="h-px w-8 bg-zinc-800 transition-all group-hover:w-12 group-hover:bg-white flex-shrink-0" />
                [ VIEW MANIFESTO ]
              </Button>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-grid-3d opacity-20 pointer-events-none" />
    </section>
  );
};
