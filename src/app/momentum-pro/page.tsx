import FloatingHeader from "@/components/FloatingHeader";
import InteractiveDots from "@/components/InteractiveDots";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import { ArrowDown, Zap, Shield, Target } from "lucide-react";

export default function MomentumProPage() {
  return (
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans bg-zinc-50 flex flex-col">
      <FloatingHeader />
      
      {/* Hero Section */}
      <section className="relative px-4 text-center overflow-hidden bg-white pt-32 pb-20">
        <InteractiveDots />
        
        <div className="w-full max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-8 border border-zinc-200">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            Forward Testing (Coming Soon)
          </div>
          
          <h1 className="heading text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight">
            Momentum Pro EA
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium mb-10">
            Institutional-grade automated trading. Strict risk management. Full transparency. Watch our algorithm trade in real-time below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#waitlist" className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition-colors shadow-lg flex items-center">
              Join the Waitlist <ArrowDown className="ml-2 w-5 h-5" />
            </a>
            <a href="#dashboard" className="px-8 py-4 bg-white text-zinc-900 border-2 border-zinc-200 font-bold rounded-full hover:bg-zinc-50 transition-colors shadow-sm flex items-center">
              See Live Results
            </a>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 text-left">
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <Shield className="w-8 h-8 text-zinc-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">No Martingale</h3>
              <p className="text-zinc-500 text-sm">Strict stop losses on every single trade. We prioritize capital preservation over risky recovery methods.</p>
            </div>
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <Target className="w-8 h-8 text-zinc-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">High Precision</h3>
              <p className="text-zinc-500 text-sm">Taking only 1 to 2 high-probability setups a day. Quality over quantity ensures a smoother equity curve.</p>
            </div>
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <Zap className="w-8 h-8 text-zinc-900 mb-4" />
              <h3 className="font-bold text-lg mb-2">Prop Firm Ready</h3>
              <p className="text-zinc-500 text-sm">Hard-coded daily drawdown limits and risk parameters designed specifically to pass prop firm evaluations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Dashboard Section */}
      <section id="dashboard" className="py-20 px-4 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">100% Transparent Results</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              We don't hide behind backtests. Our live, real-time forward test on a demo account is currently being set up. Check back soon for live data direct from MT5!
            </p>
          </div>
          
          <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-zinc-400 mb-2">Dashboard Coming Soon</h3>
            <p className="text-zinc-500">We are currently linking our MT5 terminals to the website.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-4 bg-white border-t border-zinc-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Join the VIP Waitlist</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Momentum Pro is currently in closed beta. Secure your spot now to get a massive Early Bird discount when we open to the public.
            </p>
          </div>
          
          <WaitlistForm />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 py-12 px-4 bg-white relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpg" alt="Ritish FX Logo" className="h-6 w-auto mix-blend-multiply opacity-80" />
          </Link>
          <span className="text-sm font-medium text-zinc-500">© {new Date().getFullYear()} Ritish FX. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
