"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export const GlobalInfinity = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fireRef = useRef<SVGPathElement>(null);
  const [isBurning, setIsBurning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentZIndex, setCurrentZIndex] = useState(20000);

  useGSAP(() => {
    if (!outerRef.current || !innerRef.current || !pathRef.current) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    const path = pathRef.current;
    const firePath = fireRef.current;

    const pathLength = path.getTotalLength();

    gsap.set(outer, {
      x: 0,
      y: 0,
      scale: 0.5,
      rotate: 0,
      opacity: 1
    });

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Bobbing animation on INNER container
    gsap.to(inner, {
      y: "+=20",
      x: "+=8",
      rotate: "+=4",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleProgress = (e: any) => {
      const progress = e.detail;
      const offset = pathLength - (pathLength * (progress / 100));

      gsap.to(path, {
        strokeDashoffset: offset,
        duration: 0.2,
        ease: "power1.out"
      });
    };

    const handleComplete = () => {
      setIsLoaded(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentZIndex(10);
          buildJourney();
        }
      });

      tl.to(outer, {
        x: "18vw",
        y: "10vh",
        scale: 1.1,
        rotate: -10,
        duration: 1.8,
        ease: "expo.inOut"
      });
    };

    window.addEventListener("alchemist:progress", handleProgress);
    window.addEventListener("alchemist:complete", handleComplete);

    const buildJourney = () => {
      ScrollTrigger.refresh();

      // --- SECTION WAYPOINTS (TIMELINE MỚI SIÊU MƯỢT) ---
      const sections = [
        { id: "hero", rotate: -10, scale: 1.1, x: "18vw", y: "10vh" },
        { id: "vision", rotate: 15, scale: 1.2, x: "15vw", y: "5vh" },
        { id: "manifesto", rotate: 90, scale: 0.8, x: "35vw", y: "15vh" },
        { id: "projects", rotate: 180, scale: 1.3, x: "-20vw", y: "-10vh" },
        { id: "tech", rotate: 240, scale: 0.9, x: "20vw", y: "10vh" },
        { id: "terminal", rotate: 280, scale: 1.2, x: "0vw", y: "5vh" },
        { id: "team", rotate: 360, scale: 1.7, x: "-25vw", y: "35vh" },
        { id: "footer", rotate: 540, scale: 0, x: "0vw", y: "45vh" }
      ];

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true
        }
      });

      // --- CHUYẾN DU HÀNH DUY NHẤT (NO CONFLICT) ---
      sections.forEach((config, i) => {
        if (i === 0) return;
        
        masterTl.to(outer, {
          x: config.x,
          y: config.y,
          rotate: config.rotate,
          scale: config.scale,
          opacity: config.id === "footer" ? 0 : 1,
          duration: 1,
          ease: "power1.inOut"
        });
      });

      // --- CHỈ DÙNG TRIGGER ĐỂ KÍCH HOẠT HIỆU ỨNG (KHÔNG TOUCH SCALE) ---
      const teamSection = document.getElementById("team");
      if (teamSection) {
        ScrollTrigger.create({
          trigger: teamSection,
          start: "top 40%",
          onEnter: () => {
            setIsBurning(true);
            setCurrentZIndex(100);
            gsap.to(path, { stroke: "#ff3300", duration: 1.5, ease: "power2.inOut" });
            gsap.to(firePath, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
          },
          onLeaveBack: () => {
            setIsBurning(false);
            setCurrentZIndex(10);
            gsap.to(path, { stroke: "#fbbf24", duration: 1, ease: "power2.inOut" });
            gsap.to(firePath, { opacity: 0, duration: 1, ease: "power2.inOut" });
          },
        });
      }
    };

    return () => {
      window.removeEventListener("alchemist:progress", handleProgress);
      window.removeEventListener("alchemist:complete", handleComplete);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: outerRef });

  return (
    <div
      ref={outerRef}
      style={{ zIndex: currentZIndex }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-visible"
    >
      <style jsx global>{`
        @keyframes infinity-fire-flicker {
          0%, 100% {
            filter: drop-shadow(0 0 2px #fff) drop-shadow(0 -1px 3px #ff3) drop-shadow(1px -2px 5px #f90) drop-shadow(-1px -5px 7px #f60) drop-shadow(1px -8px 10px #f30);
          }
          50% {
            filter: drop-shadow(0 0 2px #fff) drop-shadow(0 -2px 5px #ff3) drop-shadow(2px -4px 8px #f90) drop-shadow(-2px -8px 10px #f60) drop-shadow(2px -12px 15px #f30);
          }
        }
        .fire-path { animation: infinity-fire-flicker 2s infinite alternate ease-in-out; }
      `}</style>

      <div ref={innerRef} className="relative w-64 h-32 md:w-[450px] md:h-[225px] overflow-visible">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          <path
            d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            className="opacity-20 blur-[4px]"
          />

          <path
            ref={pathRef}
            d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            className="drop-shadow-[0_0_5px_#fbbf24]"
          />

          <path
            ref={fireRef}
            d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            className="fire-path"
            style={{ opacity: 0 }}
          />

          <circle r="1.5" fill="white" className="shadow-[0_0_10px_#fff]">
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};
