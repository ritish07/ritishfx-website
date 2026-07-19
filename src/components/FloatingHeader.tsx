"use client";

import Link from "next/link";

export default function FloatingHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-b from-white via-white/90 to-transparent backdrop-blur-sm">
        <Link href="/" className="flex items-center -ml-4">
          <img src="/logo.jpg" alt="Ritish FX Logo" className="h-16 w-auto scale-150 origin-left object-contain mix-blend-multiply" />
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
