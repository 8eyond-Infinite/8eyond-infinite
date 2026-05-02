"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero", label: "PRIMA_MATERIA", code: "01" },
  { id: "vision", label: "THE_PRINCIPLES", code: "02" },
  { id: "manifesto", label: "THE_DECLARATION", code: "03" },
  { id: "projects", label: "THE_COAGULATION", code: "04" },
  { id: "tech", label: "THE_ELEMENTS", code: "05" },
  { id: "terminal", label: "THE_TRANSMUTATION", code: "06" },
  { id: "team", label: "THE_ARCHITECT", code: "07" },
];

export const ScrollTimeline = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    SECTIONS.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveSection(section.id);
          gsap.to({}, {
            duration: 0.5,
            onUpdate: () => setProgress((index / (SECTIONS.length - 1)) * 100)
          });
        },
        onEnterBack: () => {
          setActiveSection(section.id);
          gsap.to({}, {
            duration: 0.5,
            onUpdate: () => setProgress((index / (SECTIONS.length - 1)) * 100)
          });
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });

  return (
    <div ref={containerRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col items-end gap-10 pointer-events-none">
      <div className="absolute right-[4px] top-1 bottom-1 w-[1.5px] bg-white/5" />
      <div className="absolute right-[4px] top-1 bottom-1 w-[1.5px] origin-top overflow-hidden">
        <motion.div
          animate={{ height: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="w-full bg-gradient-to-b from-accent/40 via-accent to-accent shadow-[0_0_15px_#fbbf24]"
        />
      </div>
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group relative flex items-center gap-6 pointer-events-auto cursor-none"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(section.id);
            if (el) {
              window.scrollTo({
                top: el.offsetTop,
                behavior: "smooth"
              });
            }
          }}
        >
          <div className={`
            flex flex-col items-end transition-all duration-700
            ${activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 group-hover:opacity-80 group-hover:translate-x-0"}
          `}>
            <span className="text-[8px] font-mono text-accent/50 tracking-[0.4em] uppercase font-light">Stage_{section.code}</span>
            <span className="text-[11px] font-bold text-white tracking-[0.5em] uppercase mt-1 italic drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
              {section.label}
            </span>
          </div>
          <div className={`
            relative w-[9px] h-[9px] border transition-all duration-500 z-10
            ${activeSection === section.id
              ? "border-accent rotate-45 bg-accent/30 shadow-[0_0_15px_#fbbf24]"
              : "border-white/10 rotate-0 bg-transparent group-hover:border-accent/40 group-hover:rotate-45"
            }
          `}>
            {activeSection === section.id && (
              <motion.div
                layoutId="activeMarkerDiamond"
                className="absolute inset-[1px] bg-accent rotate-0 shadow-[0_0_10px_#fbbf24]"
              />
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
