"use client";

import React, { useRef, useState } from "react";
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

  useGSAP(() => {
    if (!containerRef.current || !pathRef.current) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const firePath = fireRef.current;

    const buildJourney = () => {
      const hero = document.getElementById("hero");
      const vision = document.getElementById("vision");
      const manifesto = document.getElementById("manifesto");
      const projects = document.getElementById("projects");
      const tech = document.getElementById("tech");
      const terminal = document.getElementById("terminal");
      const team = document.getElementById("team");

      // Kiểm tra sự tồn tại của các thành phần quan trọng trước khi chạy
      if (!hero || !team || !firePath) return;

      const totalScroll = document.body.scrollHeight - window.innerHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      const getPos = (el: HTMLElement | null) => (el ? el.offsetTop / totalScroll : 0);

      // --- HÀNH TRÌNH ---
      tl.to(container, { x: "10%", y: "5vh", rotate: 20, scale: 0.9, duration: getPos(vision) })
        .to(container, { x: "30%", y: "15vh", rotate: 90, scale: 0.7, duration: getPos(manifesto) - getPos(vision) })
        .to(container, { x: "-20%", y: "-10vh", rotate: 180, scale: 1.3, duration: getPos(projects) - getPos(manifesto) })
        .to(container, { x: "15%", y: "10vh", rotate: 220, scale: 0.8, duration: getPos(tech) - getPos(projects) })
        .to(container, { x: "0%", y: "5vh", rotate: 280, scale: 1.1, duration: getPos(terminal) - getPos(tech) })
        .to(container, { x: "-10vw", y: "0vh", rotate: 360, scale: 0.9, duration: getPos(team) - getPos(terminal) });

      const teamDuration = (totalScroll - team.offsetTop) / totalScroll;
      
      // Docking
      tl.to(container, { x: "-22vw", y: "0vh", scale: 1.2, ease: "power2.inOut", duration: teamDuration * 0.4 });
      tl.to(path, { stroke: "#ffffff", strokeWidth: 3, duration: teamDuration * 0.4 }, "<");

      // Sticking
      tl.to(container, { y: "-150vh", ease: "none", duration: teamDuration * 0.6 });

      // Trigger ngọn lửa (Đưa vào đây để đảm bảo #team đã tồn tại)
      ScrollTrigger.create({
        trigger: team,
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          setIsBurning(true);
          gsap.to(firePath, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
        },
        onLeaveBack: () => {
          setIsBurning(false);
          gsap.to(firePath, { opacity: 0, duration: 1, ease: "power2.inOut" });
        },
      });
      
      ScrollTrigger.refresh();
    };

    // Đợi 1 giây để đảm bảo toàn bộ DOM đã sẵn sàng
    const timer = setTimeout(() => {
      buildJourney();
    }, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      style={{ zIndex: 10 }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
    >
      <style jsx global>{`
        @keyframes infinity-fire-flicker {
          0%, 100% {
            filter: 
              drop-shadow(0 0 2px #fff)
              drop-shadow(0 -1px 3px #ff3)
              drop-shadow(1px -2px 5px #f90)
              drop-shadow(-1px -5px 7px #f60)
              drop-shadow(1px -8px 10px #f30);
          }
          50% {
            filter: 
              drop-shadow(0 0 2px #fff)
              drop-shadow(0 -2px 5px #ff3)
              drop-shadow(2px -4px 8px #f90)
              drop-shadow(-2px -8px 10px #f60)
              drop-shadow(2px -12px 15px #f30);
          }
        }
        .fire-path {
          animation: infinity-fire-flicker 2s infinite alternate ease-in-out;
        }
      `}</style>

      <div className="relative w-64 h-32 md:w-[450px] md:h-[225px]">
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
          <path
            ref={pathRef}
            d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
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
          
          <circle r="1.5" fill="white" filter="blur(1px)">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50 Z"
            />
          </circle>
        </svg>

        <div 
           className={`absolute inset-0 blur-[60px] rounded-full scale-110 -z-10 bg-orange-600/20 transition-opacity duration-1500 ${isBurning ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>
    </div>
  );
};
