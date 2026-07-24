"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShieldAlert } from "lucide-react";

export default function FloatingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("allowAdmin=1bhkg7^y2be8%")) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="w-full flex items-center justify-between px-6 md:px-8 py-4 bg-gradient-to-b from-white via-white/90 to-transparent backdrop-blur-sm">
        <Link href="/" className="flex items-center -ml-2 md:-ml-4">
          <img src="/logo.jpg" alt="Ritish FX Logo" className="h-14 md:h-16 w-auto scale-150 origin-left object-contain mix-blend-multiply" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {isAdmin && (
            <a 
              href="/admin" 
              className="px-5 py-2 text-sm font-bold text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors shadow-sm cursor-pointer flex items-center gap-2 border border-red-100"
            >
              <ShieldAlert className="w-4 h-4" /> Admin
            </a>
          )}
          <Link 
            href="/free-tools" 
            className="px-5 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Free Tools
          </Link>
          <Link 
            href="/book-a-call" 
            className="px-5 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Book a Call
          </Link>
          <Link 
            href="/momentum-pro"
            className="px-5 py-2 text-sm font-bold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Momentum Pro
          </Link>
          <a
            href="https://discord.gg/P6Wp8YqpFJ"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-zinc-400 hover:text-[#5865F2] transition-colors"
            title="Join our Discord"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 127.14 96.36">
              <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C52.4,60.53,48.06,65.36,42.56,65.36Zm42.06,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C94.46,60.53,90.13,65.36,84.62,65.36Z"/>
            </svg>
          </a>
          <a
            href="https://x.com/Billionaire7070"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
            title="Follow on X"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="none">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
            </svg>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-zinc-100 flex flex-col p-4 animate-in slide-in-from-top-4 fade-in duration-200">
          {isAdmin && (
            <a 
              href="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-4 text-base font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" /> Admin Dashboard
            </a>
          )}
          <Link 
            href="/free-tools" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-4 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            Free Tools
          </Link>
          <Link 
            href="/book-a-call" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-4 text-base font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            Book a Call
          </Link>
          <div className="h-px w-full bg-zinc-100 my-2"></div>
          <Link 
            href="/momentum-pro"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full mt-2 px-4 py-4 text-base font-bold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors shadow-sm text-center block"
          >
            Momentum Pro
          </Link>
          
          <div className="flex items-center gap-6 mt-6 px-4 pb-2">
            <a
              href="https://discord.gg/P6Wp8YqpFJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#5865F2] transition-colors"
              title="Join our Discord"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 127.14 96.36">
                <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C52.4,60.53,48.06,65.36,42.56,65.36Zm42.06,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C94.46,60.53,90.13,65.36,84.62,65.36Z"/>
              </svg>
            </a>
            <a
              href="https://x.com/Billionaire7070"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
              title="Follow on X"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1200 1227" fill="none">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
