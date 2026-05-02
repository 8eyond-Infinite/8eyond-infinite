"use client";

import React, { useState } from "react";
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

const Ember = ({ delay, left, size }: { delay: number; left: string; size: number }) => {
  const [randoms] = useState(() => ({
    xOffset: Math.random() * 50 - 25,
    duration: 4 + Math.random() * 4
  }));

  return (
    <motion.div
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -200,
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
        x: [0, randoms.xOffset]
      }}
      transition={{
        duration: randoms.duration,
        repeat: Infinity,
        delay,
        ease: "easeOut"
      }}
      style={{ left, width: size, height: size }}
      className="absolute bottom-0 bg-accent rounded-full blur-[1px]"
    />
  );
};

export const Footer = () => {
  return (
    <footer id="footer" className="relative bg-black pt-32 pb-16 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none z-0"
      />


      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-[40%] h-full bg-gradient-to-r from-transparent via-accent/60 to-transparent shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        />
      </div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 md:gap-8 mb-24">

          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col leading-none">
                <span className="text-3xl font-black tracking-tighter text-white uppercase italic">8eyond</span>
                <span className="text-3xl font-black tracking-tighter text-transparent uppercase italic" style={{ WebkitTextStroke: "1px rgba(251,191,36,0.3)" }}>Infinite.</span>
              </div>
              <p className="text-[12px] text-zinc-500 font-mono uppercase tracking-widest leading-relaxed max-w-[240px]">
                Engineering the foundational layers of post-infinite computation.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] animate-pulse" />
                <span className="text-[9px] font-mono text-accent uppercase tracking-[0.4em]">
                  [ FORGE_STATUS: ACTIVE ]
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase mb-10">[ NAV_MAP ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="01" label="Vision" href="#vision" />
              <FooterLink code="02" label="Technology" href="#tech" />
              <FooterLink code="03" label="Ecosystem" href="#projects" />
              <FooterLink code="04" label="Manifesto" href="#manifesto" />
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase mb-10">[ DATA_RES ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="DOC" label="Documentation" href="#" />
              <FooterLink code="SDK" label="Interface SDK" href="#" />
              <FooterLink code="API" label="Neural API" href="#" />
              <FooterLink code="LOG" label="Changelog" href="#" />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-mono text-zinc-600 tracking-[0.4em] uppercase mb-10">[ CONNECT_NODES ]</h4>
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

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-[9px] font-mono text-zinc-700 tracking-[0.4em] uppercase">
              © 2026 8eyond_Infinite // [ TRANSMUTING_FUTURE ]
            </div>
          </div>
          <div className="flex items-center gap-12 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
            <div className="flex flex-col gap-1">
              <span className="opacity-40">Uptime</span>
              <span className="text-accent font-bold">99.999%</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-40">Latency</span>
              <span className="text-white">0.02ms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black border-t border-white/5 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-20" />
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[9px] font-mono text-zinc-800 tracking-[1.5em] uppercase flex items-center gap-20"
        >
          <span>ALCHEMICAL_TRANSFORM_COMPLETE</span>
          <span className="text-accent/30">GOLDEN_CORE_ESTABLISHED</span>
          <span>SYSTEMS_STABLE_AT_INFINITY</span>
          <span className="text-accent/30">8EYOND_THE_VOID</span>
        </motion.div>
      </div>
    </footer>
  );
};
