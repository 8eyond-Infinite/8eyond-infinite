"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

const PhilosopherCore = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
        className="absolute border border-accent/10 rounded-full"
        style={{ width: `${i * 20 + 20}%`, height: `${i * 20 + 20}%` }}
      />
    ))}
    <div className="absolute w-32 h-32 bg-accent/20 blur-[60px] rounded-full animate-pulse" />
  </div>
);

const AlchemicalSymbol3D = ({ symbol, position, delay }: { symbol: string; position: [number, number, number]; delay: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    // Dùng performance.now() thay cho state.clock để tránh đụng độ với module đã deprecated
    const t = performance.now() / 1000 + delay;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        <Text
          fontSize={1.2}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          {symbol}
          <meshStandardMaterial 
            color="#fbbf24" 
            metalness={1} 
            roughness={0.2} 
            emissive="#fbbf24"
            emissiveIntensity={0.05}
            transparent
            opacity={0.6}
          />
        </Text>
      </group>
    </Float>
  );
};

const SymbolsCanvas = () => {
  const [mounted, setMounted] = useState(false);
  const symbols = [
    '☿', '🜍', '🜔', '🜁', '🜃', '🜂', '🜄', '☉', '☽', 
    '🜅', '🜈', '🜐', '🜛', '🜜', '🜝', '🜞', '🜟', '🜠', '🜡'
  ];
  
  const items = useMemo(() => {
    const shuffled = [...symbols].sort(() => Math.random() - 0.5);
    return Array.from({ length: 15 }).map((_, i) => ({
      symbol: shuffled[i % shuffled.length],
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      delay: Math.random() * 10
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-5 pointer-events-none opacity-20">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4400" />
        
        {items.map((item, i) => (
          <AlchemicalSymbol3D key={i} {...item} />
        ))}
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRedRef = useRef<HTMLHeadingElement>(null);
  const titleBlueRef = useRef<HTMLHeadingElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<any[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Lắng nghe sự kiện hoàn tất từ Preloader để hiện hình
    const handleReveal = () => {
      // Đợi một chút cho dấu vô cực bắt đầu bay rồi mới hiện chữ
      setTimeout(() => setIsRevealed(true), 500);
    };

    window.addEventListener("alchemist:complete", handleReveal);

    setParticles(Array.from({ length: 40 }).map(() => ({
      startX: Math.random() * 100 + "%",
      startY: Math.random() * 100 + "%",
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10
    })));

    const ctx = gsap.context(() => {
      gsap.to(coreRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "none" });

      const xToR = gsap.quickTo(titleRedRef.current, "x", { duration: 0.6, ease: "power2.out" });
      const yToR = gsap.quickTo(titleRedRef.current, "y", { duration: 0.6, ease: "power2.out" });
      const xToB = gsap.quickTo(titleBlueRef.current, "x", { duration: 0.9, ease: "power2.out" });
      const yToB = gsap.quickTo(titleBlueRef.current, "y", { duration: 0.9, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5);
        const y = (clientY / window.innerHeight - 0.5);

        xToR(x * 60); yToR(y * 60); 
        xToB(x * -60); yToB(y * -60);
        
        gsap.to(coreRef.current, { x: x * 80, y: y * 80, duration: 1.5, ease: "power3.out" });
        gsap.to(gridRef.current, { x: x * 30, y: y * 30, duration: 2, ease: "power2.out" });
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
        scale: 0.95,
        opacity: 0,
        filter: "blur(15px)",
        ease: "none",
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("alchemist:complete", handleReveal);
      };
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.2, 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <div ref={gridRef} className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png)' }} />
      </div>

      {/* --- 3D SYMBOLS CANVAS --- */}
      <SymbolsCanvas />

      {/* --- LAYER 1: PHILOSOPHER CORE --- */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-5">
        <div ref={coreRef} className="w-full h-full opacity-60">
           <PhilosopherCore />
        </div>
      </div>
      
      {/* --- LAYER 2: GOLD DUST --- */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
         {particles.map((p, i) => (
           <motion.div key={i} initial={{ opacity: 0, x: p.startX, y: p.startY }} animate={{ opacity: [0, 0.5, 0], y: ["-10%", "110%"], x: ["-5%", "5%"] }} transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }} className="absolute w-0.5 h-0.5 bg-accent rounded-full blur-[0.5px]" />
         ))}
      </div>

      {/* --- LAYER 3: MAIN TYPOGRAPHY --- */}
      <motion.div 
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        className="relative z-20 flex flex-col items-center w-full max-w-[1200px]"
      >
        <motion.div
          variants={contentVariants}
          custom={1}
          className="mb-8 self-center"
        >
          <span className="text-[10px] font-mono text-accent tracking-[0.5em] uppercase opacity-60">
            [ MAGNUM_OPUS // THE_BEGINNING ]
          </span>
        </motion.div>

        <div className="relative mb-20 w-full flex flex-col items-center">
          <h1 ref={titleBlueRef} className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-9xl lg:text-[11rem] leading-none text-accent-secondary opacity-20 mix-blend-screen pointer-events-none uppercase italic text-center md:ml-[-15vw]">8eyond</h1>
          <h1 ref={titleRedRef} className="absolute inset-0 text-7xl font-black tracking-[-0.04em] sm:text-9xl lg:text-[11rem] leading-none text-accent opacity-20 mix-blend-screen pointer-events-none uppercase italic text-center md:ml-[-15vw]">8eyond</h1>
          
          <motion.h1 
             variants={contentVariants}
             custom={2}
             className="text-7xl font-black tracking-[-0.04em] sm:text-9xl lg:text-[11rem] leading-none text-white uppercase italic md:ml-[-15vw] drop-shadow-[0_0_50px_rgba(251,191,36,0.1)]"
          >
            8eyond
          </motion.h1>

          <motion.h1 
             variants={contentVariants}
             custom={3}
             className="relative text-7xl font-black tracking-[-0.04em] sm:text-9xl lg:text-[11rem] leading-none text-white uppercase italic md:mr-[-10vw]"
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-transparent via-accent/60 to-transparent bg-[length:200%_100%] animate-shimmer-fast"
              style={{ WebkitTextStroke: "1px rgba(251,191,36,0.5)" }}
            >
              Infinite.
            </span>
          </motion.h1>
        </div>

        <motion.p
          variants={contentVariants}
          custom={4}
          className="mx-auto mb-12 max-w-lg text-sm md:text-base text-zinc-500 font-light leading-relaxed tracking-wide text-center"
        >
          Transcending the lead of traditional logic. 
          We transmute the code into legacy through the architecture of mastery.
        </motion.p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-10 left-10 flex flex-col items-start gap-3 z-40">
        <span className="text-[8px] font-mono text-accent uppercase tracking-[0.8em] whitespace-nowrap opacity-50">[ DESCEND ]</span>
        <div className="w-px h-10 bg-white/5 relative overflow-hidden">
          <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/2 bg-accent" />
        </div>
      </motion.div>
    </section>
  );
};
