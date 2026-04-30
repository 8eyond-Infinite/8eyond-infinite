"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const LogoInfinite = () => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="w-10 h-10 flex items-center justify-center"
  >
    <svg viewBox="0 0 100 100" className="w-8 h-8">
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
  const [isOpen, setIsOpen] = React.useState(false);
  const menuItems = ["Vision", "Technology", "Ecosystem"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none">
      <div className="mx-auto max-w-[1800px] flex items-center justify-between relative z-[100]">
        
        {/* Top Left: Monumental Branding */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <Magnetic strength={0.1}>
            <div className="glass-refraction flex items-center px-4 py-2 md:px-5 md:py-2.5 border border-white/10 bg-black/40 backdrop-blur-3xl rounded-[2px] shadow-2xl group cursor-none overflow-hidden relative">
               <div className="flex items-center gap-2 relative z-10">
                  <span className="text-base md:text-lg font-black tracking-[-0.05em] uppercase italic leading-none">
                     <span className="text-accent drop-shadow-[0_0_8px_var(--accent)] transition-all duration-500 group-hover:brightness-125">8</span>
                     <span className="text-white">eyond</span>
                  </span>
                  
                  <span 
                     className="text-base md:text-lg font-black tracking-[-0.05em] uppercase italic leading-none text-transparent transition-all duration-500"
                     style={{ 
                        WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                     }}
                  >
                     <span className="group-hover:text-white/80 transition-colors duration-700">Infinite</span>
                  </span>
               </div>
               
               {/* Ambient Glow on Hover */}
               <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </Magnetic>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          <div className="glass-refraction flex items-center p-1 border border-white/10 bg-black/40 backdrop-blur-3xl rounded-[2px] shadow-2xl">
            {menuItems.map((item) => (
              <Magnetic key={item} strength={0.1}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="group relative px-6 py-2.5 text-[11px] font-black tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition-all duration-500 whitespace-nowrap flex items-center justify-center"
                >
                  <span className="absolute left-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-accent text-[10px]">[</span>
                  <span className="relative z-10">{item}</span>
                  <span className="absolute right-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-accent text-[10px]">]</span>
                </a>
              </Magnetic>
            ))}
            
            <div className="w-px h-4 bg-white/10 mx-3 flex-shrink-0" />
            
            <Magnetic strength={0.15}>
              <button className="group relative bg-white px-6 py-2.5 overflow-hidden transition-all duration-500 rounded-[1px]">
                <span className="relative z-10 text-[10px] font-black tracking-[0.3em] text-black uppercase">Initialize</span>
                <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                   <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">Initialize</span>
                </div>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center pointer-events-auto">
           <button 
             onClick={() => setIsOpen(!isOpen)}
             className="w-12 h-12 flex items-center justify-center glass-refraction border border-white/10 bg-black/40 backdrop-blur-3xl rounded-[2px]"
           >
             <div className="relative w-5 h-4">
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="absolute top-0 left-0 w-full h-[1.5px] bg-white origin-center"
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-3/4 h-[1.5px] bg-accent"
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white origin-center"
                />
             </div>
           </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-black/95 backdrop-blur-[40px] z-[90] flex flex-col justify-center items-center p-8 md:hidden pointer-events-auto"
      >
         <div className="flex flex-col gap-8 items-center w-full max-w-[280px]">
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-2xl font-black tracking-[0.3em] uppercase text-white hover:text-accent transition-colors flex items-center gap-4"
              >
                <span className="text-accent text-sm font-mono tracking-tighter opacity-40">0{index+1}</span>
                {item}
              </motion.a>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="w-full h-px bg-white/10 my-4"
            />

            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6 }}
              className="w-full bg-white text-black py-5 font-black tracking-[0.3em] uppercase text-xs rounded-[2px] active:bg-accent active:text-white transition-colors"
            >
              Initialize System
            </motion.button>
         </div>

         <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-20">
            <span className="text-[10px] font-mono tracking-[1em] text-white uppercase">8eyond_Infinite_v01</span>
         </div>
      </motion.div>
    </nav>
  );
};
