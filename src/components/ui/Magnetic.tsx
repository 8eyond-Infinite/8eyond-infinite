"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export const Magnetic = ({ children, strength = 0.3 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "power3", opacity: 1 });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "power3", opacity: 1 });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = (clientX - centerX) * strength;
      const deltaY = (clientY - centerY) * strength;
      
      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block w-full h-full">
      {children}
    </div>
  );
};
