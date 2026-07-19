"use client";
import { useState } from "react";
import { Send, Terminal, Shield, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", strategy: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit request");
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", strategy: "" });
    } catch (err: any) {
      setError("Something went wrong. Please try again or contact us on Discord.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
            <Terminal size={16} />
            <span>Custom Bot Development</span>
          </div>
          <h2 className="heading text-3xl md:text-5xl font-bold text-white mb-6">Have a winning strategy? <br/><span className="text-primary">Let's automate it.</span></h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg">
            Stop losing sleep over missed entries. Tell us about your trading strategy, and we'll build a robust, custom MT5 or TradingView bot tailored to your exact rules.
          </p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-slate-300">
              <Shield className="text-emerald-400" size={20} />
              100% Confidentiality & Non-Disclosure
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-primary" size={20} />
              Rigorous Backtesting & Optimization
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-primary" size={20} />
              Prop-firm Compliant Logic
            </li>
          </ul>
        </div>

        <div className="glass-panel p-8 rounded-3xl relative">
          {/* Subtle glow behind form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] -z-10 rounded-full" />
          
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
              <p className="text-slate-400 mb-6">We're reviewing your strategy and will get back to you within 24 hours.</p>
              <button onClick={() => setIsSuccess(false)} className="px-6 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Your Name</label>
                  <input 
                    id="name"
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="strategy" className="text-sm font-medium text-slate-300">Tell us about your strategy</label>
                <textarea 
                  id="strategy"
                  required
                  rows={5}
                  value={formData.strategy}
                  onChange={(e) => setFormData({...formData, strategy: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600 resize-none"
                  placeholder="E.g., I want a bot that takes buys when price sweeps the Asian low and forms a bullish order block on the 5m timeframe..."
                ></textarea>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary text-slate-950 font-bold hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
