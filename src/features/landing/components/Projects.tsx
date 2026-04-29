"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const PROJECTS = [
  {
    id: "01",
    title: "NEURAL_LINK",
    tag: "CORE_PLATFORM",
    desc: "A decentralized operating system for distributed neural computation and link.",
    status: "ACTIVE",
  },
  {
    id: "02",
    title: "QUANTUM_MESH",
    tag: "INFRASTRUCTURE",
    desc: "High-speed communication protocol with quantum-resistant encryption layers.",
    status: "BETA",
  },
  {
    id: "03",
    title: "AETHER_CORE",
    tag: "ENERGY_SYSTEM",
    desc: "Autonomous power distribution network for massive scale digital nodes.",
    status: "READY",
  },
  {
    id: "04",
    title: "VOID_STORAGE",
    tag: "DATA_SCIENCE",
    desc: "Non-linear data architecture designed for infinite state persistence.",
    status: "ACTIVE",
  },
  {
    id: "05",
    title: "CHRONOS_LOG",
    tag: "SECURITY",
    desc: "Immutable historical ledger with zero-latency synchronization.",
    status: "TESTING",
  },
  {
    id: "06",
    title: "GHOST_PROTOCL",
    tag: "CYBERNETICS",
    desc: "Untraceable routing protocol for secure high-level system operations.",
    status: "BETA",
  },
];

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <Magnetic strength={0.1}>
    <div className="group relative border border-white/10 rounded-[2px] p-10 bg-black/40 backdrop-blur-3xl transition-[border-color,background-color] duration-300 hover:border-accent/30 hover:bg-black/60 shadow-2xl">
      <div className="flex justify-between items-start mb-16">
        <span className="text-[10px] font-mono text-zinc-600">[ {project.id} ]</span>
        <div className="flex items-center gap-2">
          <div className={`h-1 w-1 rounded-full ${project.status === "ACTIVE" || project.status === "READY" ? "bg-accent shadow-[0_0_8px_var(--accent)]" : "bg-zinc-600"} ${project.status === "ACTIVE" ? "animate-pulse" : ""}`} />
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">{project.status}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <span className="text-[9px] font-mono text-accent/60 tracking-[0.4em] uppercase">{project.tag}</span>
        <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-accent transition-colors duration-500 uppercase">
          {project.title}
        </h3>
        <p className="text-[11px] text-zinc-500 font-light leading-relaxed max-w-[240px]">
          {project.desc}
        </p>
      </div>

      <div className="mt-16 flex justify-between items-end">
        <div className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
           Level_0{project.id}
        </div>
        <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
          <span className="text-sm font-light">→</span>
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

  const yBg = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yNormal = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} id="projects" className="relative py-60 bg-black px-6 overflow-hidden border-t border-white/5">
      {/* Parallax Background Text - Optimized for readability */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] z-0"
      >
        <span className="text-[22vw] font-black uppercase tracking-tighter italic select-none">SYSTEMS</span>
      </motion.div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <span className="text-[12px] font-mono text-accent tracking-[0.5em] uppercase block mb-6">
              [ PHASE_04 // THE_ECOSYSTEM ]
            </span>
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.85]">
              The Infinite <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                Ecosystem.
              </span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
              Propelling digital evolution through modular, high-performance infrastructure, neural engineering and decentralized sovereignty protocols.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 1 }}
            >
              <motion.div
                style={{ y: index % 3 === 1 ? yFast : yNormal }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
