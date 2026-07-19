import { BookOpen, Server, PlayCircle } from "lucide-react";

export default function EducationHub() {
  return (
    <section className="scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="heading text-3xl md:text-5xl font-bold text-white mb-4">Education <span className="text-indigo-400">Hub</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Learn how to deploy and automate your trading strategies without writing a single line of code.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-2 rounded-3xl overflow-hidden group">
          <div className="aspect-video bg-slate-900 rounded-2xl relative flex items-center justify-center overflow-hidden border border-slate-800 group-hover:border-indigo-500/50 transition-colors duration-300">
            {/* Placeholder for YouTube Video */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80 z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
            
            <div className="z-20 w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center backdrop-blur-md border border-indigo-400/30 group-hover:scale-110 group-hover:bg-indigo-500/40 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <PlayCircle className="text-white w-8 h-8 ml-1" />
            </div>
            
            <div className="absolute bottom-4 left-4 z-20">
              <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold rounded-full backdrop-blur-md mb-2 inline-block">BEGINNER GUIDE</span>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">Zero Coding Algo Setup</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-400 text-sm">Step-by-step guide to linking your TradingView indicators to your exchange or MT5 platform to automate your trades seamlessly.</p>
          </div>
        </div>

        <div className="glass-panel p-2 rounded-3xl overflow-hidden group">
          <div className="aspect-video bg-slate-900 rounded-2xl relative flex items-center justify-center overflow-hidden border border-slate-800 group-hover:border-primary/50 transition-colors duration-300">
            {/* Placeholder for YouTube Video */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80 z-10" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
            
            <div className="z-20 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/30 group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <PlayCircle className="text-white w-8 h-8 ml-1" />
            </div>
            
            <div className="absolute bottom-4 left-4 z-20">
              <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold rounded-full backdrop-blur-md mb-2 inline-block">ADVANCED</span>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">VPS 24/7 Deployment Guide</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-slate-400 text-sm">Learn how to set up a Virtual Private Server (VPS) to run your MT5 bots and strategies 24/7 without latency interruptions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
