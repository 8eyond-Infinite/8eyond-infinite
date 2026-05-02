"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const Team = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [isAwakened, setIsAwakened] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.to(".team-title-1", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(".team-title-2", {
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      const phaseLabel = document.querySelector(".phase-label-06");
      const phaseCursor = document.querySelector(".phase-cursor-06");
      const fullText = "[ PHASE_06 // THE_ARCHITECT ]";
      const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]//_!@#$%^&*";

      gsap.to({}, {
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true
        },
        onUpdate: function () {
          const progress = this.progress();
          const currentLength = Math.floor(progress * fullText.length);
          const revealedText = fullText.slice(0, currentLength);

          if (progress < 1) {
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            if (phaseLabel) phaseLabel.textContent = revealedText + randomChar;
            if (phaseCursor) gsap.set(phaseCursor, { opacity: 1 });
          } else {
            if (phaseLabel) {
              phaseLabel.textContent = fullText;
              if (phaseCursor) {
                gsap.to(phaseCursor, {
                  opacity: 0,
                  duration: 0.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut"
                });
              }
            }
          }
        }
      });

      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 50%", // Vừa cuộn đến khoảng giữa là bùng nổ hiệu ứng
          onEnter: () => setIsAwakened(true),
          onLeaveBack: () => setIsAwakened(false),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative min-h-[120vh] bg-black py-40 px-6 overflow-hidden flex items-center justify-center"
    >
      <div id="team-trigger" className="absolute top-0 left-0 w-full h-1 pointer-events-none" />

      <style jsx global>{`
        @keyframes flash-once {
          0% { opacity: 0; }
          10% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-flash-once {
          animation: flash-once 0.8s ease-out forwards;
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h2
          style={{ y: yBg }}
          className="text-[20vw] font-black text-white/[0.03] uppercase tracking-tighter whitespace-nowrap"
        >
          THE ALCHEMIST
        </motion.h2>
      </div>

      <div className="mx-auto max-w-[1400px] w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">

          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <motion.div
              ref={portraitRef}
              style={{ opacity, y: yCard }}
              className={`relative w-72 h-[450px] md:w-[450px] md:h-[600px] group cursor-none transition-all duration-1000 ${isAwakened ? "scale-105" : "scale-100"}`}
            >

              <div className={`absolute inset-[-80px] pointer-events-none transition-opacity duration-700 ${isAwakened ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 left-0 text-accent/40 text-2xl font-serif"
                >
                  ☿
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-0 right-0 text-accent/40 text-2xl font-serif"
                >
                  🜍
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-10 right-0 text-accent/30 text-xl font-serif"
                >
                  🜔
                </motion.div>

                <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <motion.path
                    d="M0,0 L40,40 M300,600 L340,640"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-accent/20"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                  />
                </svg>
              </div>

              <div className={`absolute inset-0 overflow-hidden rounded-[2px] border transition-colors duration-700 shadow-2xl z-10 ${isAwakened ? "border-accent/40" : "border-white/10 group-hover:border-accent/40"}`}>
                <img
                  src="/assets/images/avt.jpg"
                  alt="Tran Hoang Anh Tu"
                  className={`w-full h-full object-cover object-bottom grayscale brightness-90 contrast-110 transition-all duration-1000 ${isAwakened ? "opacity-20" : "opacity-60 group-hover:opacity-20"}`}
                />

                <div className={`absolute inset-0 mix-blend-screen transition-all duration-700 delay-100 ${isAwakened ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_100%_0_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)]"}`}>
                  <img
                    src="/assets/images/avt.jpg"
                    className="w-full h-full object-cover object-bottom brightness-150 contrast-150 filter sepia(1) saturate(10) hue-rotate(-50deg)"
                  />
                </div>

                <div className={`absolute inset-0 mix-blend-screen transition-all duration-700 delay-200 ${isAwakened ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_0_0_100%)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)]"}`}>
                  <img
                    src="/assets/images/avt.jpg"
                    className="w-full h-full object-cover object-bottom brightness-150 contrast-150 filter sepia(1) saturate(10) hue-rotate(180deg)"
                  />
                </div>

                <div className={`absolute inset-0 transition-all duration-1000 delay-500 ease-out ${isAwakened ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <img
                    src="/assets/images/avt.jpg"
                    alt="Tran Hoang Anh Tu"
                    className="w-full h-full object-cover object-bottom brightness-110 contrast-100"
                  />
                  <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                </div>

                <div className={`absolute inset-0 bg-white pointer-events-none z-30 ${isAwakened ? "animate-flash-once" : "opacity-0 group-hover:animate-flash-once"}`} />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className={`absolute -bottom-12 left-0 flex flex-col gap-1 z-30 transition-opacity duration-700 ${isAwakened ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[7px] font-mono text-accent tracking-[0.3em] uppercase">
                    [ TRANSMUTATION_LOG ]
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-mono text-white/40">
                  <span className={`${isAwakened ? "text-accent" : "group-hover:text-accent"} transition-colors`}>ALBEDO: ACTIVE</span>
                  <span className="text-[6px]">0x442 // SYNC</span>
                </div>
              </div>

              <div className={`absolute inset-[-40px] transition-opacity duration-1000 z-5 ${isAwakened ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="absolute top-1/2 left-0 w-full h-px bg-accent/10" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-accent/10" />

                <div className="absolute -top-10 left-0 text-[7px] font-mono text-accent/40 tracking-widest">
                  [ ARCHITECT_UNIT_01 ]
                </div>
                <div className="absolute -bottom-10 right-0 text-[7px] font-mono text-accent/40 tracking-widest">
                  [ STATUS: AWAKENED ]
                </div>
              </div>

              <div className={`absolute -top-4 -left-4 w-20 h-20 border-t border-l border-accent/40 transition-all duration-700 z-20 ${isAwakened ? "w-24 h-24" : "group-hover:w-24 group-hover:h-24"}`} />
              <div className={`absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-accent/40 transition-all duration-700 z-20 ${isAwakened ? "w-24 h-24" : "group-hover:w-24 group-hover:h-24"}`} />

              <div className="absolute top-24 -right-24 vertical-text hidden md:block z-30">
                <span className={`text-[10px] font-mono tracking-[1em] uppercase transition-colors whitespace-nowrap ${isAwakened ? "text-accent" : "text-zinc-500 group-hover:text-accent"}`}>
                  [ TRHGATU // GENESIS_PROTOCOL ]
                </span>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center gap-4 mb-8 w-full"
              >
                <div className="flex items-center font-mono text-accent whitespace-nowrap">
                  <span className="text-[12px] tracking-[0.6em] uppercase phase-label-06">
                  </span>
                  <span className="text-[12px] phase-cursor-06 opacity-0">_</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-8xl font-black text-white tracking-[-0.08em] leading-[0.9] uppercase italic overflow-visible"
              >
                <span className="inline-block team-title-1">Tran Hoang</span> <br />
                <span className="inline-block team-title-2 text-transparent ml-[10%] md:ml-[20%]" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>Anh Tu.</span>
              </motion.h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-4"
            >
              <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed italic max-w-md">
                  &quot;I am the Alchemist of the digital void. I transform the lead of raw logic into the gold of infinite reality.&quot;
                </p>
                <div className="text-[8px] font-mono text-zinc-700 max-w-[150px] leading-relaxed opacity-50 uppercase border-l border-white/10 pl-6">
                  Architect Identity //
                  Origin: 8EYOND_SOURCE //
                  Auth: MASTER_ALCHEMIST
                  <br /><br />
                  Entity Status: AWAKENED
                </div>
              </div>

              <div className="mt-10">
                <Magnetic strength={0.1}>
                  <a
                    href="https://thatu.is-a.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-10 py-4 border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all duration-700 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="text-[10px] font-mono text-accent tracking-[0.5em] uppercase whitespace-nowrap">
                      [ ACCESS_SANCTUM ]
                    </span>

                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Magnetic>
              </div>
            </motion.div>

            <div className="flex flex-row items-center gap-6 md:gap-10 mt-8 overflow-x-visible">
              {["Github", "LinkedIn", "X-Space", "Signal"].map((item, index) => (
                <React.Fragment key={item}>
                  <Magnetic strength={0.2}>
                    <a
                      href="#"
                      className="group relative flex flex-col gap-3 cursor-none whitespace-nowrap"
                    >
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-zinc-700 group-hover:text-accent transition-colors">0{index + 1}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-white/10 text-lg font-mono transition-colors group-hover:text-accent">[</span>
                          <span className="text-sm font-black text-zinc-500 group-hover:text-white uppercase tracking-[0.2em] transition-all group-hover:tracking-[0.4em] duration-500">
                            {item}
                          </span>
                          <span className="text-white/10 text-lg font-mono transition-colors group-hover:text-accent">]</span>
                        </div>
                      </div>

                      <div className="h-0 overflow-hidden group-hover:h-8 transition-all duration-500">
                        <div className="flex flex-col gap-0.5 mt-2 bg-black/80 backdrop-blur-md p-1 rounded-sm">
                          <div className="flex justify-between text-[6px] font-mono text-accent/60 uppercase tracking-widest">
                            <span>STATUS</span>
                            <span>SECURE</span>
                          </div>
                          <div className="h-0.5 w-full bg-accent/20 rounded-full overflow-hidden">
                            <motion.div
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-1/2 h-full bg-accent"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </Magnetic>

                  {index < 3 && (
                    <div className="h-4 w-px bg-white/10 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
