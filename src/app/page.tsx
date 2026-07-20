import SmoothScroller from "@/components/SmoothScroller";
import FloatingHeader from "@/components/FloatingHeader";
import VipWaitlist from "@/components/VipWaitlist";
import InteractiveDots from "@/components/InteractiveDots";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import HeroActions from "@/components/HeroActions";

export default function Home() {
  return (
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans">
      <SmoothScroller />
      <FloatingHeader />
      
      {/* Clean Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center overflow-hidden">
        <InteractiveDots />
        <div className="max-w-5xl mx-auto flex flex-col items-center -mt-16 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-8 border border-zinc-200">
            Algo Trading & Custom MT5 Bots
          </div>
          <h1 className="heading text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
            Automate your edge. <br className="hidden md:block" />
            <span className="text-zinc-400">Scale your trading.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl font-medium mb-12">
            Professional algorithmic trading development, backtesting, and strategy automation for serious traders.
          </p>
          <HeroActions />
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ArrowDown className="w-6 h-6 text-zinc-300" />
        </div>
      </section>


      {/* Global Waitlist Modal */}
      <VipWaitlist />

      {/* Founder's Edge Section */}
      <section className="py-32 px-4 bg-white border-t border-zinc-100 text-center flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1227" className="text-white">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="heading text-3xl font-bold text-zinc-900 mb-4">Deep Market Insights & Manual Execution</h2>
          <p className="text-zinc-500 mb-8 text-lg">Every algorithm starts with a deep understanding of market mechanics. I share my personal, manual trade breakdowns, market structure analysis, and daily insights on X.</p>
          <a 
            href="https://x.com/Billionaire7070" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-sm font-bold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
          >
            Read My Market Breakdowns on X
          </a>
        </div>
      </section>

      {/* Discord Community Section */}
      <section className="py-32 px-4 bg-zinc-50 border-t border-zinc-100 text-center flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 127.14 96.36" className="text-[#5865F2]">
              <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C52.4,60.53,48.06,65.36,42.56,65.36Zm42.06,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C94.46,60.53,90.13,65.36,84.62,65.36Z"/>
            </svg>
          </div>
          <h2 className="heading text-3xl font-bold text-zinc-900 mb-4">Join the Inner Circle</h2>
          <p className="text-zinc-500 mb-8 text-lg">Connect with serious traders, discuss automated strategies, and get real-time updates on our EA development.</p>
          <a 
            href="https://discord.gg/P6Wp8YqpFJ" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 text-sm font-bold text-white bg-[#5865F2] rounded-full hover:bg-[#4752C4] transition-colors shadow-lg"
          >
            Join the Discord Server
          </a>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-zinc-100 py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Ritish FX Logo" className="h-6 w-auto mix-blend-multiply opacity-80" />
            <span className="text-sm font-medium text-zinc-500">© {new Date().getFullYear()} Ritish FX. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="https://discord.gg/P6Wp8YqpFJ" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#5865F2] transition-colors" title="Join our Discord">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 127.14 96.36">
                <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.15ZM42.56,65.36c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C52.4,60.53,48.06,65.36,42.56,65.36Zm42.06,0c-5.36,0-9.8-4.83-9.8-10.74s4.36-10.74,9.8-10.74,9.85,4.83,9.8,10.74C94.46,60.53,90.13,65.36,84.62,65.36Z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
