"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LuxuryHero from "@/components/LuxuryHero";
import ProductGrid from "@/components/ProductGrid";
import EducationHub from "@/components/EducationHub";
import ContactForm from "@/components/ContactForm";
import DiscordBanner from "@/components/DiscordBanner";

gsap.registerPlugin(ScrollTrigger);

// Cinematic placeholder backgrounds from Unsplash
const SCENES = [
  { id: "room", bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" }, // Elegant dark room
  { id: "mountain", bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" }, // Mountain
  { id: "beach", bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" }, // Beach
  { id: "city", bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" }, // City / Architecture (brighter)
];

export default function RotatingScenes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLImageElement>(null);
  const bg2Ref = useRef<HTMLImageElement>(null);
  const bg3Ref = useRef<HTMLImageElement>(null);
  const bg4Ref = useRef<HTMLImageElement>(null);
  
  const [tz, setTz] = useState(0);

  useEffect(() => {
    // We only need a radius enough to push the UI elements outward
    const updateTz = () => setTz(window.innerWidth * 0.6); // Slightly larger radius
    updateTz();
    window.addEventListener("resize", updateTz);
    return () => window.removeEventListener("resize", updateTz);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || tz === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000", // Smooth long scroll
        scrub: 1,
        pin: true,
      }
    });

    // 1. The 3D UI Rotation
    tl.to(wrapperRef.current, {
      rotateY: -270,
      ease: "none",
      duration: 3,
    }, 0);

    // 2. The Background Crossfades and Pans
    // Scene 1 (Room) -> Scene 2 (Mountain)
    tl.to(bg1Ref.current, { opacity: 0, x: "-10%", duration: 1 }, 0);
    tl.fromTo(bg2Ref.current, { opacity: 0, x: "10%" }, { opacity: 0.6, x: "0%", duration: 1 }, 0);

    // Scene 2 (Mountain) -> Scene 3 (Beach)
    tl.to(bg2Ref.current, { opacity: 0, x: "-10%", duration: 1 }, 1);
    tl.fromTo(bg3Ref.current, { opacity: 0, x: "10%" }, { opacity: 0.6, x: "0%", duration: 1 }, 1);

    // Scene 3 (Beach) -> Scene 4 (City)
    tl.to(bg3Ref.current, { opacity: 0, x: "-10%", duration: 1 }, 2);
    tl.fromTo(bg4Ref.current, { opacity: 0, x: "10%" }, { opacity: 0.6, x: "0%", duration: 1 }, 2);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [tz]);

  return (
    <div ref={containerRef} className="h-screen w-full overflow-hidden bg-black" style={{ perspective: "1500px" }}>
      
      {/* GLOBAL IMMERSIVE BACKGROUNDS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img ref={bg1Ref} src={SCENES[0].bg} className="absolute inset-0 w-full h-[120%] object-cover opacity-60 will-change-transform" alt="Room" />
        <img ref={bg2Ref} src={SCENES[1].bg} className="absolute inset-0 w-full h-[120%] object-cover opacity-0 will-change-transform" alt="Mountain" />
        <img ref={bg3Ref} src={SCENES[2].bg} className="absolute inset-0 w-full h-[120%] object-cover opacity-0 will-change-transform" alt="Beach" />
        <img ref={bg4Ref} src={SCENES[3].bg} className="absolute inset-0 w-full h-[120%] object-cover opacity-0 will-change-transform" alt="City" />
        {/* Global Dark Gradient Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* THE INVISIBLE 3D UI CAROUSEL */}
      <div 
        ref={wrapperRef} 
        className="relative w-full h-full will-change-transform z-10"
        style={{ 
          transformStyle: "preserve-3d",
          transform: `translateZ(${tz}px) rotateY(0deg)`
        }}
      >
        
        {/* SCENE 1: FRONT (Hero) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transform: `rotateY(0deg) translateZ(${-tz}px)` }}
        >
          <div className="w-full pointer-events-auto">
            <LuxuryHero />
          </div>
        </div>

        {/* SCENE 2: RIGHT (Products) */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
          style={{ transform: `rotateY(90deg) translateZ(${-tz}px)` }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 pointer-events-auto mt-20">
            <div className="text-center mb-10">
              <h2 className="heading text-3xl md:text-5xl font-light tracking-widest uppercase mb-6 text-primary">The Collections</h2>
              <div className="w-[1px] h-12 bg-primary mx-auto"></div>
            </div>
            <ProductGrid />
          </div>
        </div>

        {/* SCENE 3: BACK (Education) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transform: `rotateY(180deg) translateZ(${-tz}px)` }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 pointer-events-auto mt-20">
             <EducationHub />
          </div>
        </div>

        {/* SCENE 4: LEFT (Contact) */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
          style={{ transform: `rotateY(270deg) translateZ(${-tz}px)` }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 pointer-events-auto flex flex-col space-y-20 mt-20">
            <DiscordBanner />
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
