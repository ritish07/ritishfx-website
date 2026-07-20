"use client";

import Link from "next/link";
import { openWaitlist } from "./VipWaitlist";

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
          <button 
            onClick={openWaitlist}
            className="px-5 py-2 text-sm font-bold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Momentum Pro Waitlist
          </button>
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
        </nav>
      </div>
    </header>
  );
}
