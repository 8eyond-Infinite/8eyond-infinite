"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const FooterLink = ({ label, href, code }: { label: string; href: string; code: string }) => (
  <Magnetic strength={0.2}>
    <a 
      href={href} 
      className="group flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors py-2"
    >
      <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">[ {code} ]</span>
      <span className="uppercase">{label}</span>
    </a>
  </Magnetic>
);

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-32 pb-10 px-6 overflow-hidden border-t border-white/5">
      {/* Background Subtle Logo */}
      <div className="absolute bottom-[-10%] right-[-5%] text-[40rem] font-black text-white/[0.02] select-none pointer-events-none leading-none">
        8
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          
          {/* Column 1: Branding */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="text-xl font-black tracking-tighter text-white uppercase">8eyond Infinite</div>
              <p className="text-xs text-zinc-600 font-light leading-relaxed max-w-[200px]">
                Engineering the foundational layers of post-infinite computation and digital sentience.
              </p>
              <div className="text-[9px] font-mono text-accent/40 uppercase">
                [ SYSTEM_VER: 8.0.4_BETA ]
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8">[ NAV_MAP ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="01" label="Vision" href="#vision" />
              <FooterLink code="02" label="Technology" href="#tech" />
              <FooterLink code="03" label="Ecosystem" href="#ecosystem" />
              <FooterLink code="04" label="Manifesto" href="#manifesto" />
            </div>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8">[ DATA_RES ]</h4>
            <div className="flex flex-col gap-2">
              <FooterLink code="DOC" label="Documentation" href="#" />
              <FooterLink code="SDK" label="Interface SDK" href="#" />
              <FooterLink code="API" label="Neural API" href="#" />
              <FooterLink code="LOG" label="Changelog" href="#" />
            </div>
          </div>

          {/* Column 4: Social/Status */}
          <div>
            <h4 className="text-[10px] font-mono text-zinc-400 tracking-[0.4em] uppercase mb-8">[ CONNECT_NODES ]</h4>
            <div className="flex flex-wrap gap-4">
              {["Twitter", "Discord", "Github", "LinkedIn"].map((social) => (
                <Magnetic key={social} strength={0.4}>
                  <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-zinc-500 hover:text-white hover:border-accent transition-all">
                    {social[0]}
                  </a>
                </Magnetic>
              ))}
            </div>
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] font-mono text-zinc-400 uppercase">Neural Network Status</span>
              </div>
              <div className="text-[10px] font-mono text-white tracking-widest uppercase">ALL_SYSTEMS_OPERATIONAL</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: System Metadata */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase opacity-80">
            © 2026 8EYOND_INFINITE // [ ALL_RIGHTS_RESERVED ]
          </div>
          <div className="flex items-center gap-8">
            <div className="text-[8px] font-mono text-zinc-500 uppercase opacity-80">
              [ LATENCY: 0.002MS ]
            </div>
            <div className="text-[8px] font-mono text-zinc-500 uppercase opacity-80">
              [ LOC: 43.1209° N // 77.6197° W ]
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Data Stream - Industrial Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-accent/5 border-t border-accent/20 flex items-center overflow-hidden opacity-100">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[11px] font-mono text-accent tracking-[1em] uppercase py-2"
        >
          INIT_SEQUENCE... DATA_STREAM_STABLE... CORE_SYNCHRONIZED... NEURAL_LINK_ESTABLISHED... ACCESS_GRANTED... 8EYOND_INFINITE... 
          INIT_SEQUENCE... DATA_STREAM_STABLE... CORE_SYNCHRONIZED... NEURAL_LINK_ESTABLISHED... ACCESS_GRANTED... 8EYOND_INFINITE... 
          INIT_SEQUENCE... DATA_STREAM_STABLE... CORE_SYNCHRONIZED... NEURAL_LINK_ESTABLISHED... ACCESS_GRANTED... 8EYOND_INFINITE... 
        </motion.div>
      </div>
    </footer>
  );
};
