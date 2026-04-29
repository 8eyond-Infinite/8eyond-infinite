"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export const BentoGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;
      
      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vision" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Infinite Potential</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Our ecosystem is built on the foundations of speed, intelligence, and boundless scaling.</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <div className="glass glass-hover col-span-1 row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl p-8 md:col-span-2 md:row-span-2">
            <div>
              <div className="mb-4 h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-4xl font-bold tracking-tight">Limitless Compute</h3>
              <p className="mt-4 max-w-md text-zinc-400">Our neural mesh architecture allows for near-infinite horizontal scaling, providing the power needed for the next generation of AI.</p>
            </div>
            <div className="mt-12 h-64 w-full bg-gradient-to-t from-accent/20 to-transparent rounded-t-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
            </div>
          </div>

          <div className="glass glass-hover flex flex-col justify-between rounded-3xl p-8">
            <div className="mb-8 h-10 w-10 rounded-xl bg-accent-secondary/20 flex items-center justify-center text-accent-secondary">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Secure by Design</h3>
              <p className="mt-2 text-sm text-zinc-400">Hardened architecture that protects your data at every scale.</p>
            </div>
          </div>

          <div className="glass glass-hover flex flex-col justify-between rounded-3xl p-8">
            <div className="mb-8 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">Rapid Evolution</h3>
              <p className="mt-2 text-sm text-zinc-400">Continuous updates and learning cycles integrated directly into the core.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
