"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const MiniCore = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className="relative h-6 w-10"
  >
    <svg viewBox="0 0 100 50" className="h-full w-full opacity-80">
      <path
        d="M25,25 C25,10 40,10 50,25 C60,40 75,40 75,25 C75,10 60,10 50,25 C40,40 25,40 25,25 Z"
        stroke="var(--accent)"
        strokeWidth="4"
        fill="none"
        className="drop-shadow-[0_0_5px_var(--accent)]"
      />
    </svg>
  </motion.div>
);

export const Navbar = () => {
  const [latency, setLatency] = React.useState("0.002");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLatency((Math.random() * 0.005 + 0.001).toFixed(3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-6 pointer-events-none">
      <div className="mx-auto max-w-[1800px] flex items-start justify-between">
        
        {/* Top Left: Logo & System ID */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <Magnetic strength={0.3}>
            <div className="glass-refraction flex items-center gap-4 px-4 py-2 rounded-full border border-white/10">
              <MiniCore />
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase leading-none">8eyond</span>
                <span className="text-[8px] font-mono text-accent opacity-60 leading-none mt-1">ID: INF-8.0</span>
              </div>
            </div>
          </Magnetic>
        </div>

        {/* Top Center: System Status HUD - Live Monitoring */}
        <div className="hidden lg:flex flex-col items-center gap-1 group">
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[7px] font-mono tracking-[0.4em] uppercase text-white/80">
              [ NEURAL_LINK: ESTABLISHED ]
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent/50" />
            <span className="text-[6px] font-mono text-accent/60 uppercase">
              Latency: {latency}ms
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>

        {/* Top Right: Navigation Pills */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="glass-refraction flex items-center gap-1 p-1 rounded-full border border-white/10 flex-nowrap overflow-hidden">
            {["Vision", "Technology", "Ecosystem"].map((item) => (
              <Magnetic key={item} strength={0.2}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="group relative px-6 py-2 text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  <span className="absolute left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0">[</span>
                  <span className="relative">{item}</span>
                  <span className="absolute right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">]</span>
                </a>
              </Magnetic>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2 flex-shrink-0" />
            <Magnetic strength={0.4}>
              <button className="bg-white text-black text-[9px] font-black tracking-widest uppercase px-5 py-2 rounded-full hover:bg-accent transition-colors flex items-center gap-2 whitespace-nowrap flex-shrink-0">
                <span>[</span> CONNECT <span>]</span>
              </button>
            </Magnetic>
          </div>
        </div>

      </div>
    </nav>
  );
};
