"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const PROJECTS = [
  {
    id: "01",
    title: "NEURAL_LINK_OS",
    tag: "CORE_PLATFORM",
    desc: "A decentralized operating system for distributed neural computation.",
    status: "ACTIVE",
  },
  {
    id: "02",
    title: "QUANTUM_MESH",
    tag: "INFRASTRUCTURE",
    desc: "High-speed communication protocol with quantum-resistant encryption.",
    status: "BETA",
  },
  {
    id: "03",
    title: "8_INTELLIGENCE",
    tag: "AI_MODEL",
    desc: "Self-evolving transformer model for post-infinite logic processing.",
    status: "RESEARCH",
  },
];

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <Magnetic strength={0.1}>
    <div className="group relative glass-refraction border border-white/5 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 cursor-none">
      <div className="flex justify-between items-start mb-12">
        <span className="text-[10px] font-mono text-zinc-500">[ {project.id} ]</span>
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${project.status === "ACTIVE" ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">{project.status}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">{project.tag}</span>
        <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-[200px]">
          {project.desc}
        </p>
      </div>

      <div className="mt-12 flex justify-end">
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
          <span className="text-[10px] text-white">→</span>
        </div>
      </div>
    </div>
  </Magnetic>
);

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} id="projects" className="relative py-60 bg-black px-6 overflow-hidden border-t border-white/5">
      {/* Parallax Background Text */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0"
      >
        <span className="text-[30vw] font-black uppercase tracking-tighter italic">PROJECTS</span>
      </motion.div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-4">
              [ PHASE_04 // THE_ECOSYSTEM ]
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
              The Infinite <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                Ecosystem.
              </span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
              Propelling digital evolution through modular, high-performance infrastructure and neural engineering.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
