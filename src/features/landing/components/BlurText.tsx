"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText = ({ text, className, delay = 0 }: BlurTextProps) => {
  const words = useMemo(() => text.split(" "), [text]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(20px)",
      y: 20 
    },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  return (
    <motion.h1 
      className="flex flex-wrap justify-center gap-y-[0.1em]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block mr-[0.25em]", className)}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
