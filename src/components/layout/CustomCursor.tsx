"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High response for the core star
  const coreConfig = { damping: 40, stiffness: 400 };
  const starX = useSpring(cursorX, coreConfig);
  const starY = useSpring(cursorY, coreConfig);

  // Soft trail for the glow
  const glowConfig = { damping: 20, stiffness: 150 };
  const glowX = useSpring(cursorX, glowConfig);
  const glowY = useSpring(cursorY, glowConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest(".magnetic-target") ||
        target.closest('button, a, .interactive') ||
        target.onclick
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, [role="button"], .interactive {
          cursor: none !important;
        }
      `}</style>

      {/* Star Ambient Glow */}
      <motion.div
        style={{
          translateX: glowX,
          translateY: glowY,
          left: -40,
          top: -40,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isClicking ? 0.3 : 0.6,
        }}
        className="fixed w-20 h-20 pointer-events-none z-[100000] rounded-full bg-[radial-gradient(circle,rgba(41,98,255,0.4)_0%,transparent_70%)] blur-md"
      />

      {/* The Core Star */}
      <motion.div
        style={{
          translateX: starX,
          translateY: starY,
          left: -15,
          top: -15,
        }}
        className="fixed w-[30px] h-[30px] pointer-events-none z-[100001] flex items-center justify-center"
      >
        {/* Horizontal Flare */}
        <motion.div 
          animate={{ 
            width: isHovered ? 60 : 0,
            opacity: isHovered ? 0.8 : 0
          }}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
        />
        {/* Vertical Flare */}
        <motion.div 
          animate={{ 
            height: isHovered ? 60 : 0,
            opacity: isHovered ? 0.8 : 0
          }}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-white to-transparent"
        />
        
        {/* The Star Body */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 90 : 0
          }}
          className="relative flex items-center justify-center"
        >
           {/* Outer Glow */}
           <div className="absolute inset-0 bg-accent rounded-full blur-[4px] opacity-60" />
           {/* White Core */}
           <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#fff]" />
           
           {/* Star Points (Diamond shape) */}
           <div className="absolute w-4 h-4 border border-white/20 rotate-45 scale-75" />
        </motion.div>
      </motion.div>

      {/* Click Impact */}
      {isClicking && (
        <motion.div
          initial={{ scale: 0.2, opacity: 1, x: cursorX.get(), y: cursorY.get() }}
          animate={{ scale: 2, opacity: 0 }}
          style={{ left: -10, top: -10 }}
          className="fixed w-5 h-5 rounded-full border border-white pointer-events-none z-[100002]"
        />
      )}
    </>
  );
};
