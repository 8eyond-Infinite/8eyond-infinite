"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "SINGULARITY", code: "01" },
  { id: "vision", label: "THE_NEXUS", code: "02" },
  { id: "manifesto", label: "MANIFESTO", code: "03" },
  { id: "projects", label: "PROJECT_NODES", code: "04" },
  { id: "tech", label: "INFRASTRUCTURE", code: "05" },
  { id: "terminal", label: "NEURAL_LOG", code: "06" },
  { id: "team", label: "THE_ARCHITECT", code: "07" },
];

export const ScrollTimeline = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col items-start gap-8">
      {/* Vertical Progress Line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/5">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-accent shadow-[0_0_10px_var(--accent)]"
        />
      </div>

      {/* Section Indicators */}
      {SECTIONS.map((section) => (
        <a 
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center gap-4 cursor-pointer"
        >
          <div className={`
            w-[23px] h-[23px] rounded-full border flex items-center justify-center transition-all duration-500 z-10 bg-black
            ${activeSection === section.id ? "border-accent" : "border-white/10 group-hover:border-white/40"}
          `}>
            <div className={`
              w-1 h-1 rounded-full transition-all duration-500
              ${activeSection === section.id ? "bg-accent shadow-[0_0_8px_var(--accent)]" : "bg-zinc-800 group-hover:bg-zinc-400"}
            `} />
          </div>

          <div className={`
            flex flex-col transition-all duration-500 transform
            ${activeSection === section.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}
          `}>
            <span className="text-[9px] font-mono text-accent leading-none tracking-tighter">[{section.code}]</span>
            <span className="text-[10px] font-bold text-white tracking-widest uppercase mt-1">{section.label}</span>
          </div>
        </a>
      ))}
    </div>
  );
};
