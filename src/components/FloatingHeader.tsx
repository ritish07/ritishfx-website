"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="w-full flex items-center justify-between px-8 py-8 bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm">
        <Link href="/" className="heading text-2xl font-medium tracking-[0.3em] uppercase text-foreground">
          RITISH FX
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link 
            href="#consultation" 
            className="px-5 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Book a Call
          </Link>
          <Link 
            href="#waitlist" 
            className="px-5 py-2 text-sm font-bold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-sm"
          >
            EA Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
