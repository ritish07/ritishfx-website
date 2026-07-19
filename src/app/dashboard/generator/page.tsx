"use client";

import { useState } from "react";
import { Send, Bot, Loader2, Cpu, LineChart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingState, setLoadingState] = useState(0);
  const router = useRouter();

  const loadingMessages = [
    "Initializing Hermes Agent...",
    "Parsing strategy logic...",
    "Writing source code (MQL5/PineScript)...",
    "Running historical backtests...",
    "Finalizing scorecard metrics..."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    const interval = setInterval(() => {
      setLoadingState(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const res = await fetch("/api/strategies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        clearInterval(interval);
        router.push(`/dashboard/strategies/${data.id}`);
      }
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12 mt-10">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Bot className="text-primary w-10 h-10 relative z-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Hermes Strategy Builder</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Describe your trading rules in plain English. Hermes will generate the code and run a comprehensive backtest.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 flex flex-col justify-end">
        {isGenerating && (
          <div className="glass-panel p-6 rounded-2xl w-full max-w-2xl mx-auto border border-primary/30 flex items-center gap-6">
            <div className="relative">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full" />
            </div>
            <div>
              <p className="text-white font-medium mb-1">Agent is working...</p>
              <p className="text-slate-400 text-sm animate-pulse">{loadingMessages[loadingState]}</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative max-w-3xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            rows={3}
            className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-6 pr-16 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none shadow-2xl backdrop-blur-xl placeholder:text-slate-500"
            placeholder="E.g., Buy when the 50 EMA crosses above the 200 EMA on the 1H timeframe. Set a 1.5% stop loss and 3% take profit."
          />
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute right-3 bottom-3 p-3 rounded-xl bg-primary text-slate-950 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:hover:bg-primary"
          >
            <Send size={20} className={isGenerating ? "opacity-0" : "opacity-100"} />
          </button>
        </form>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
          <div className="flex items-center gap-2"><Cpu size={16} /> MQL5 & PineScript Support</div>
          <div className="flex items-center gap-2"><LineChart size={16} /> Real Tick Data Backtests</div>
        </div>
      </div>
    </div>
  );
}
