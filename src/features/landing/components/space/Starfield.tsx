"use client";

import React, { useEffect, useRef } from "react";

export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const starCount = 200; // Reduced from 400

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.2,
        speed: Math.random() * 0.02,
        opacity: Math.random() * 0.5, // Fainter
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - w / 2) * 0.02;
      mouseY = (e.clientY - h / 2) * 0.02;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        const x = star.x + mouseX * star.size;
        const y = star.y + mouseY * star.size;

        // Twinkle effect logic
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;

        ctx.globalAlpha = star.opacity;

        // Draw Star Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.4)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Star Flare for brighter/bigger stars
        if (star.size > 0.8) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(x - star.size * 4, y);
          ctx.lineTo(x + star.size * 4, y);
          // Vertical line
          ctx.moveTo(x, y - star.size * 4);
          ctx.lineTo(x, y + star.size * 4);
          ctx.stroke();
        }

        // Wrap around screen
        if (star.x + mouseX * star.size < -50) star.x = w + 50;
        if (star.x + mouseX * star.size > w + 50) star.x = -50;
        if (star.y + mouseY * star.size < -50) star.y = h + 50;
        if (star.y + mouseY * star.size > h + 50) star.y = -50;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ filter: "blur(0.5px)" }}
    />
  );
};
