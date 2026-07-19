import SmoothScroller from "@/components/SmoothScroller";
import FloatingHeader from "@/components/FloatingHeader";
import VipWaitlist from "@/components/VipWaitlist";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans">
      <SmoothScroller />
      <FloatingHeader />
      
      {/* Clean Hero Section */}
      <section className="pt-40 pb-20 px-4 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-6 border border-zinc-200">
          Algo Trading & Custom MT5 Bots
        </div>
        <h1 className="heading text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
          Automate your edge. <br className="hidden md:block" />
          <span className="text-zinc-400">Scale your trading.</span>
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl font-medium mb-12">
          Professional algorithmic trading development, backtesting, and strategy automation for serious traders.
        </p>
        <ArrowDown className="w-6 h-6 text-zinc-300 animate-bounce" />
      </section>

      {/* Booking Section */}
      <section id="consultation" className="min-h-screen flex flex-col justify-center py-20 px-4 bg-zinc-50/50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h2 className="heading text-3xl font-bold text-zinc-900 mb-4">Book a 1:1 Consultation</h2>
          <p className="text-zinc-500">Have a winning strategy? Let's automate it and build your Custom MT5 Bot.</p>
        </div>
        
        <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">1:1 Automation Strategy Call</h3>
          <p className="text-sm text-zinc-500 mb-6">Secure your slot via Topmate for a private video session.</p>
          <div className="text-2xl font-bold text-zinc-900 mb-8">₹499</div>
          <a 
            href="https://topmate.io/ritishfx" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            Book via Topmate
          </a>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="min-h-screen flex flex-col justify-center py-20 px-4">
        <div className="max-w-5xl w-full mx-auto">
          <VipWaitlist />
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="py-10 text-center border-t border-zinc-100">
        <p className="text-sm text-zinc-400 font-medium">© {new Date().getFullYear()} Ritish FX. All rights reserved.</p>
      </footer>
    </main>
  );
}
