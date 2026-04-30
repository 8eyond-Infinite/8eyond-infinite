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

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const firePath = fireRef.current;

    // Lấy chiều dài thực tế của path
    const pathLength = path.getTotalLength();

    // --- PHASE 1: PRELOADER STATE (Centered) ---
    gsap.set(container, { 
      x: 0, 
      y: 0, 
      scale: 0.5, 
      rotate: 0,
      opacity: 1 
    });
    
    // Khởi tạo dasharray chuẩn theo chiều dài thực
    gsap.set(path, { 
      strokeDasharray: pathLength, 
      strokeDashoffset: pathLength 
    });

    // Lắng nghe tiến trình vẽ từ Preloader
    const handleProgress = (e: any) => {
      const progress = e.detail;
      // Tính toán offset dựa trên chiều dài thực tế
      gsap.to(path, { 
        strokeDashoffset: pathLength - (pathLength * (progress / 100)), 
        duration: 0.2,
        ease: "power1.out"
      });
    };

    // Lắng nghe lệnh hoàn tất để "bay" về Hero
    const handleComplete = () => {
      setIsLoaded(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          buildJourney();
        }
      });

      tl.to(container, {
        x: "18vw",
        y: "10vh",
        scale: 1.1,
        rotate: -10,
        duration: 1.8, // Tăng nhẹ thời gian bay cho nó điện ảnh
        ease: "expo.inOut"
      });
    };

    window.addEventListener("alchemist:progress", handleProgress);
    window.addEventListener("alchemist:complete", handleComplete);

    // --- PHASE 2: SCROLL JOURNEY ---
    const buildJourney = () => {
      ScrollTrigger.refresh();

      const sections = [
        { id: "hero", x: "18vw", y: "10vh", rotate: -10, scale: 1.1 },
        { id: "vision", x: "10%", y: "5vh", rotate: 20, scale: 0.9 },
        { id: "manifesto", x: "35%", y: "15vh", rotate: 90, scale: 0.7 },
        { id: "projects", x: "-20%", y: "-10vh", rotate: 180, scale: 1.3 },
        { id: "tech", x: "20%", y: "10vh", rotate: 220, scale: 0.8 },
        { id: "terminal", x: "0%", y: "5vh", rotate: 280, scale: 1.1 },
        { id: "team", x: "-22vw", y: "0vh", rotate: 360, scale: 1.2 }
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

        masterTl.to(container, {
          x: config.x,
          y: config.y,
          rotate: config.rotate,
          scale: config.scale,
          ease: "power1.inOut",
        });

        if (config.id === "team") {
          masterTl.to(path, { stroke: "#ffffff", strokeWidth: 3, duration: 0.2 }, "<");
          masterTl.to(container, { y: "-150vh", ease: "power2.in", duration: 0.5 });
        }
      });

      const teamEl = document.getElementById("team");
      if (teamEl) {
        ScrollTrigger.create({
          trigger: teamEl,
          start: "top center",
          onEnter: () => {
            setIsBurning(true);
            gsap.to(firePath, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
          },
          onLeaveBack: () => {
            setIsBurning(false);
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
      style={{ zIndex: 10000 }}
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
          {/* Lớp bóng tỏa mỏng theo hình dáng dấu vô cực */}
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
          
          {/* Hạt năng lượng sắc nét */}
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
