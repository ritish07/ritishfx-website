import { ArrowRight, Activity, TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-slate-950">
      
      {/* Cinematic Sky Background */}
      <img 
        src="/sky.png" 
        alt="Dramatic Sky" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Mountain Cliffs Overlay */}
      <img 
        src="/cliffs.png" 
        alt="Mountain Gap" 
        className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-90"
      />

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-10vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
          <Activity size={16} />
          <span>Elevate Your Edge with Ritish FX</span>
        </div>
        
        <h1 className="heading text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
          Stop Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Emotions.</span><br />
          Start Trading with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Logic.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 mb-10 drop-shadow-md font-medium">
          Automated Trading Bots, High-Accuracy Indicators, and Prop Firm Strategies built for the modern, data-driven trader.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#tools" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-slate-950 font-bold hover:bg-primary-hover hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            Explore Free Tools
            <ArrowRight size={20} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-700 hover:bg-slate-800/80 text-white font-medium transition-all duration-300">
            Request Custom Bot
          </a>
        </div>
      </div>
    </section>
  );
}
