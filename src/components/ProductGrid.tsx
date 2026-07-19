"use client";
import { useState } from "react";
import { ExternalLink, PlayCircle, Download, BarChart2 } from "lucide-react";

const tools = {
  indicators: [
    {
      title: "Liquidity Sweep Indicator",
      description: "Identifies liquidity sweeps and potential reversal zones by highlighting areas where price takes out previous highs or lows before reacting.",
      features: ["Auto liquidity sweep detection", "Bullish & bearish signals", "Clean lightweight design"],
      youtube: "https://www.youtube.com/watch?v=your-liquidity-video-link",
      tv: "https://www.tradingview.com/script/your-liquidity-sweep-link",
      badge: "Free"
    },
    {
      title: "Trendline Breakout PRO",
      description: "Automatically draws trendlines and detects breakout opportunities when price closes beyond the trendline. Perfect for momentum trading.",
      features: ["Auto trendline detection", "Breakout signals", "Configurable pivots"],
      youtube: "https://www.youtube.com/watch?v=czcc7VXeRdo",
      tv: "https://www.tradingview.com/script/your-trendline-pro-link",
      badge: "Free"
    },
    {
      title: "Smart Money Concepts (v6)",
      description: "Automatically detects SMC structures and highlights high-probability Order Blocks directly on the chart without manual marking.",
      features: ["Auto OB & BOS/CHoCH", "Swing structure labels", "Volume confirmation filter"],
      youtube: "https://www.youtube.com/watch?v=lJbhp7GM3Pc",
      tv: "https://www.tradingview.com/script/your-smc-v6-link",
      badge: "Free"
    }
  ],
  mt5: [],
  tvBots: []
};

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("indicators");

  return (
    <section id="tools" className="scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="heading text-3xl md:text-5xl font-bold text-white mb-4">Professional <span className="text-primary">Trading Tools</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Gain an unfair advantage in the markets with our precision-engineered indicators and automated bots.</p>
      </div>

      <div className="flex justify-center mb-16">
        <div className="border border-white/10 p-1 flex space-x-1 bg-black/40 backdrop-blur-sm">
          <button 
            onClick={() => setActiveTab("indicators")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === 'indicators' ? 'bg-primary text-background' : 'text-slate-400 hover:text-white'}`}
          >
            TradingView Indicators
          </button>
          <button 
            onClick={() => setActiveTab("mt5")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === 'mt5' ? 'bg-primary text-background' : 'text-slate-400 hover:text-white'}`}
          >
            MT5 Bots
          </button>
          <button 
            onClick={() => setActiveTab("tvBots")}
            className={`px-8 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === 'tvBots' ? 'bg-primary text-background' : 'text-slate-400 hover:text-white'}`}
          >
            TradingView Bots
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "indicators" && tools.indicators.map((tool, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <BarChart2 size={24} />
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-500/30">
                {tool.badge}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow">{tool.description}</p>
            
            <ul className="mb-8 space-y-2">
              {tool.features.map((feature, fIdx) => (
                <li key={fIdx} className="text-slate-300 text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-auto">
              <a href={tool.tv} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-slate-950 font-semibold transition-all duration-300 border border-primary/30">
                <ExternalLink size={18} />
                Open in TradingView
              </a>
              <a href={tool.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg glass text-white hover:bg-slate-800 transition-all duration-300 text-sm font-medium">
                <PlayCircle size={18} className="text-red-500" />
                Watch Tutorial
              </a>
            </div>
          </div>
        ))}

        {activeTab !== "indicators" && (
          <div className="col-span-full py-20 text-center glass-panel rounded-2xl">
            <div className="inline-flex w-16 h-16 rounded-full bg-slate-800 items-center justify-center text-slate-500 mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-slate-400 max-w-md mx-auto">We are currently developing cutting-edge automated solutions for this platform. Join our Discord to get early access when they launch.</p>
          </div>
        )}
      </div>
    </section>
  );
}
