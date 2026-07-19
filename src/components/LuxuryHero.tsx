"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !subRef.current) return;

    // Split text into characters
    const splitText = new SplitType(textRef.current, { types: 'chars, words' });
    
    // Initial load animation
    const tl = gsap.timeline();
    tl.fromTo(
      splitText.chars,
      { opacity: 0, filter: "blur(10px)", y: 50 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, stagger: 0.03, ease: "power4.out", delay: 0.5 }
    ).fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=1"
    );

    // Scroll animation (fade out and scale up slightly on scroll)
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      scale: 1.05,
      y: 100,
    });

    return () => {
      splitText.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Scroll indicator down arrow */}
      <div ref={containerRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <h1 
          ref={textRef} 
          className="heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-[0.2em] uppercase leading-tight mb-8"
          style={{ fontVariantLigatures: 'common-ligatures' }}
        >
          Algorithms of<br/>
          <span className="text-primary italic font-medium">Precision</span>
        </h1>
        <p ref={subRef} className="text-xs md:text-sm text-slate-400 tracking-[0.4em] uppercase max-w-2xl font-light drop-shadow-lg">
          Master of Markets. Engineered for the Elite.
        </p>

        {/* Scroll indicator down arrow */}
        <div className="absolute bottom-[-20vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse opacity-50">
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll to explore</span>
          <div className="w-[1px] h-16 bg-primary/50"></div>
        </div>
      </div>
    </section>
  );
}
