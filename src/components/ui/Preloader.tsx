"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const TERMINAL_LINES = [
  "> INITIALIZING_BEYOND_INFINITE_CORE...",
  "> LOADING_PRIMA_MATERIA_V1.0.4...",
  "> STABILIZING_MERCURY_FLOW... [DONE]",
  "> CALIBRATING_AETHER_COORDINATES...",
  "> EXECUTING_TRANSMUTE.SH...",
  "> SUCCESS: LEAD_TRANSMUTED_TO_LEGACY.",
  "> INITIATING_MAGNUM_OPUS_PROTOCOL...",
  "> BEYOND_INFINITE_IS_READY."
];

const TypewriterLine = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(onComplete, 50); // Tăng nhẹ delay để mobile xử lý kịp
      }
    }, 10); // 10ms là đủ nhanh và ổn định hơn 5ms
    return () => clearInterval(timer);
  }, [text, onComplete]);

  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-3 max-w-lg w-full">
        <span className="text-accent/30 font-mono text-[10px] shrink-0 mt-0.5">[$]</span>
        <span className="text-accent font-mono text-[11px] tracking-[0.25em] leading-relaxed uppercase">
          {displayedText}
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1.5 h-3.5 bg-accent ml-1 align-middle shadow-[0_0_10px_#fbbf24]"
          />
        </span>
      </div>
    </div>
  );
};

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLines, setActiveLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Tốc độ ánh sáng - Mobile nhanh gấp đôi
        const step = isMobile ? 10 : 5;
        const next = prev >= 100 ? 100 : prev + step;
        window.dispatchEvent(new CustomEvent("alchemist:progress", { detail: next }));
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 10);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const handleLineComplete = () => {
    const nextIndex = currentLineIndex + 1;
    if (nextIndex < TERMINAL_LINES.length) {
      setCurrentLineIndex(nextIndex);
      setActiveLines((prev) => [...prev, TERMINAL_LINES[nextIndex]]);
    } else {
      // BẮT ĐẦU CHUỖI EXIT
      window.dispatchEvent(new CustomEvent("alchemist:complete"));
      
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          filter: "blur(15px)", // Giảm từ 40px xuống 15px để mobile ko bị lag
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => setIsVisible(false)
        });
      }
    }
  };

  useEffect(() => {
    if (activeLines.length === 0) {
       setActiveLines([TERMINAL_LINES[0]]);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[50] bg-black flex flex-col items-center justify-center p-12 overflow-hidden"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1)_0%,transparent_75%)]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png)' }} />

      {/* Content Center */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Spacer for GlobalInfinity */}
        <div className="relative w-64 h-32 mb-16 pointer-events-none" />

        {/* Terminal Content */}
        <div className="w-full max-w-2xl space-y-5 min-h-[220px]">
          {activeLines.map((line, idx) => {
            if (idx === activeLines.length - 1) {
              return <TypewriterLine key={idx} text={line} onComplete={handleLineComplete} />;
            }
            return (
              <div key={idx} className="flex justify-center w-full opacity-20">
                <div className="flex gap-3 max-w-lg w-full">
                  <span className="text-accent/30 font-mono text-[10px] shrink-0 mt-0.5">[$]</span>
                  <span className="text-accent font-mono text-[11px] tracking-[0.25em] leading-relaxed uppercase">{line}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UI Accents */}
      <div className="absolute top-12 left-12 flex flex-col gap-3">
         <div className="w-8 h-[1px] bg-accent/40" />
         <span className="text-[9px] font-mono text-accent/60 tracking-[0.6em] uppercase">Phase_I: Nigredo</span>
      </div>
      
      <div className="absolute top-12 right-12 flex flex-col items-end gap-3">
         <div className="w-8 h-[1px] bg-accent/40" />
         <span className="text-[9px] font-mono text-accent/60 tracking-[0.6em] uppercase">Protocol: Aether_V1</span>
      </div>

      <div className="absolute bottom-12 left-12 flex flex-col gap-3">
         <span className="text-[9px] font-mono text-accent/60 tracking-[0.6em] uppercase italic">Beyond_Infinite</span>
         <div className="w-12 h-[1px] bg-accent/40" />
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-3">
         <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black italic text-white/90 tabular-nums">{Math.floor(progress).toString().padStart(2, '0')}</span>
            <span className="text-[11px] font-mono text-accent/50">%</span>
         </div>
         <div className="w-12 h-[1px] bg-accent/40" />
      </div>
    </div>
  );
};
