"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "SINGULARITY", code: "01" },
  { id: "vision", label: "THE_NEXUS", code: "02" },
  { id: "manifesto", label: "MANIFESTO", code: "03" },
  { id: "projects", label: "ECOSYSTEM", code: "04" },
  { id: "tech", label: "INFRASTRUCTURE", code: "05" },
  { id: "terminal", label: "COMMAND_CENTER", code: "06" },
  { id: "team", label: "ALCHEMIST", code: "07" },
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
      { threshold: 0.3 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col items-end gap-12 pointer-events-none">
      {/* Background Track Line */}
      <div className="absolute right-[4px] top-0 bottom-0 w-px bg-white/5" />

      {/* Active Progress Line */}
      <div className="absolute right-[4px] top-0 bottom-0 w-px origin-top">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-accent shadow-[0_0_15px_var(--accent)]"
        />
      </div>

      {/* Section Markers */}
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center gap-6 pointer-events-auto cursor-none"
        >
          {/* Label Text - Visible when active or hover */}
          <div className={`
            flex flex-col items-end transition-all duration-700
            ${activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}
          `}>
            <span className="text-[7px] font-mono text-accent/60 tracking-[0.3em] uppercase">Phase_{section.code}</span>
            <span className="text-[10px] font-black text-white tracking-[0.4em] uppercase mt-1 italic">{section.label}</span>
          </div>

          {/* Marker Point */}
          <div className={`
            relative w-[9px] h-[9px] border transition-all duration-500 rounded-sm
            ${activeSection === section.id ? "border-accent rotate-45 bg-accent/20" : "border-white/10 rotate-0 bg-transparent group-hover:border-white/40"}
          `}>
            {activeSection === section.id && (
              <motion.div
                layoutId="activeMarker"
                className="absolute inset-0 bg-accent shadow-[0_0_10px_var(--accent)]"
              />
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
