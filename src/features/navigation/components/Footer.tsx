"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const FooterLink = ({ label, href, code }: { label: string; href: string; code: string }) => (
  <Magnetic strength={0.2}>
    <a 
      href={href} 
      className="group flex items-center gap-3 text-[12px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors py-2"
    >
      <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">[ {code} ]</span>
      <span className="uppercase">{label}</span>
    </a>
  </Magnetic>
);

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-24 pb-16 px-6 overflow-hidden">
      {/* The Up-Glow - Compacted */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(41,98,255,0.2)_0%,transparent_70%)] pointer-events-none z-0" />
      
      {/* Top Border with Shimmer Effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent/50 to-transparent shadow-[0_0_15px_var(--accent)]"
        />
      </div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 md:gap-8 mb-20">
          
          {/* Column 1: Monumental Branding */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col leading-none">
                 <span className="text-3xl font-black tracking-tighter text-white uppercase italic">8eyond</span>
                 <span className="text-3xl font-black tracking-tighter text-transparent uppercase italic" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>Infinite.</span>
              </div>
              <p className="text-[12px] text-zinc-500 font-mono uppercase tracking-widest leading-relaxed max-w-[240px]">
                Engineering the foundational layers of post-infinite computation.
              </p>
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] animate-pulse" />
                 <span className="text-[10px] font-mono text-accent uppercase tracking-[0.3em]">
                   [ CORE_STABLE ]
                 </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8 opacity-50">[ NAV_MAP ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="01" label="Vision" href="#vision" />
              <FooterLink code="02" label="Technology" href="#tech" />
              <FooterLink code="03" label="Ecosystem" href="#ecosystem" />
              <FooterLink code="04" label="Manifesto" href="#manifesto" />
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-1">
            <h4 className="text-[11px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8 opacity-50">[ DATA_RES ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="DOC" label="Documentation" href="#" />
              <FooterLink code="SDK" label="Interface SDK" href="#" />
              <FooterLink code="API" label="Neural API" href="#" />
              <FooterLink code="LOG" label="Changelog" href="#" />
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8 opacity-50">[ CONNECT_NODES ]</h4>
            <div className="flex flex-wrap gap-4 mb-8">
              {["X", "GH", "DC", "LI"].map((social) => (
                <Magnetic key={social} strength={0.4}>
                  <a href="#" className="h-10 w-10 md:h-12 md:w-12 rounded-sm border border-white/10 bg-white/[0.02] flex items-center justify-center text-[11px] font-mono text-zinc-500 hover:text-white hover:border-accent hover:bg-accent/5 transition-all">
                    {social}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: System Metadata */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-[9px] md:text-[10px] font-mono text-zinc-600 tracking-[0.2em] md:tracking-[0.4em] uppercase">
              © 2026 8eyond_Infinite // [ THE_FUTURE_IS_HERE ]
            </div>
          </div>
          <div className="flex items-center gap-8 md:gap-12 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
            <div className="flex flex-col gap-1">
              <span className="opacity-40">Uptime</span>
              <span className="text-accent">99.999%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-40">Latency</span>
              <span className="text-white">0.02ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Data Stream */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-white/5 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-30" />
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[10px] font-mono text-zinc-700 tracking-[1.5em] uppercase flex items-center gap-20"
        >
          <span>INIT_SEQUENCE_SUCCESS</span>
          <span className="text-accent/40">CORE_SYNCHRONIZED_STABLE</span>
          <span>NEURAL_LINK_ESTABLISHED</span>
          <span className="text-accent/40">ACCESS_GRANTED_BY_8</span>
        </motion.div>
      </div>
    </footer>
  );
};
