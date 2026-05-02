"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const GlobalInfinity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fireRef = useRef<SVGPathElement>(null);
  const [isBurning, setIsBurning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentZIndex, setCurrentZIndex] = useState(20000);

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const firePath = fireRef.current;

    const pathLength = path.getTotalLength();

    gsap.set(container, {
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

      tl.to(container, {
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

      const sections = [
        { id: "hero", x: "18vw", y: "10vh", rotate: -10, scale: 1.1 },
        { id: "vision", x: "15vw", y: "5vh", rotate: 0, scale: 1.2 },
        { id: "manifesto", x: "35%", y: "15vh", rotate: 90, scale: 0.7 },
        { id: "projects", x: "-20%", y: "-10vh", rotate: 180, scale: 1.3 },
        { id: "tech", x: "20%", y: "10vh", rotate: 220, scale: 0.8 },
        { id: "terminal", x: "0%", y: "5vh", rotate: 280, scale: 1.1 },
        { id: "team-trigger", x: "-15vw", y: "-15vh", rotate: 320, scale: 1.4 },
        { id: "team", x: "-25vw", y: "35vh", rotate: 360, scale: 1.2 },
        { id: "footer", x: "0%", y: "45vh", rotate: 540, scale: 0 }
      ];

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });

      sections.forEach((config, i) => {
        if (i === 0) return;
        const targetEl = document.getElementById(config.id);
        if (!targetEl) return;

        masterTl.to(containerRef.current, {
          x: config.x,
          y: config.y,
          rotate: config.rotate,
          scale: config.scale,
          opacity: config.id === "footer" ? 0 : 1,
          duration: config.id === "team-trigger" ? 3 : 1,
          ease: "none"
        });
      });

      const teamEl = document.getElementById("team");
      if (teamEl) {
        ScrollTrigger.create({
          trigger: teamEl,
          start: "top 30%",
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
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
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

      <div className="relative w-64 h-32 md:w-[450px] md:h-[225px] overflow-visible">
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
