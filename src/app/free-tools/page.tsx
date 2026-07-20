import FloatingHeader from "@/components/FloatingHeader";
import Link from "next/link";

export default function FreeToolsPage() {
  return (
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans bg-zinc-50">
      <FloatingHeader />
      
      {/* Header Section */}
      <section className="pt-40 pb-20 px-4 text-center relative overflow-hidden bg-white border-b border-zinc-100">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-6 border border-zinc-200">
            Professional Grade Trading Indicators
          </div>
          <h1 className="heading text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
            Institutional Edge. <br />
            <span className="text-zinc-400">100% Free.</span>
          </h1>
          <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">
            These are the exact tools I use for my manual market analysis. Add them to your TradingView for free and start seeing the markets clearly.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 px-4 max-w-5xl mx-auto space-y-32">
        
        {/* Tool 1: SMC Pro */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900">SMC Pro Indicator (All-in-One) 🚀</h2>
            <p className="text-zinc-500 text-lg">
              This indicator is a complete Smart Money Concepts powerhouse that automatically maps accurate market structure, high-probability order blocks, and advanced liquidity sweeps.
            </p>
            <p className="text-zinc-500">
              Designed for serious traders who want an institutional-grade, ultra-clean chart without the clutter of 10 different indicators.
            </p>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Automatic Market Structure (BOS & CHoCH)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Displacement Order Blocks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Advanced Liquidity Sweeps
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Auto-Clean Engine (deletes mitigated blocks)
              </li>
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a href="https://www.tradingview.com/script/L75ztlsk-Smart-Money-Concepts-Pro-RFX/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition shadow-lg text-center">
                Add to TradingView
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl aspect-video relative">
            <iframe 
              className="absolute inset-0 w-full h-full" 
              src="https://www.youtube.com/embed/m8lejg_7180" 
              title="SMC Pro Tutorial" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Tool 2: Liquidity Sweep */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900">Liquidity Sweep Indicator</h2>
            <p className="text-zinc-500 text-lg">
              Helps identify liquidity sweeps and potential reversal zones by highlighting areas where price takes out previous highs or lows before reacting.
            </p>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Automatic liquidity sweep detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Bullish & bearish sweep signals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Clean and lightweight chart design
              </li>
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition shadow-lg text-center">
                Add to TradingView
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-zinc-100 rounded-3xl overflow-hidden shadow-xl aspect-video flex flex-col items-center justify-center text-zinc-400 border border-zinc-200">
            <div className="text-5xl mb-4">🎥</div>
            <p className="font-medium text-zinc-500">Video Link Missing</p>
            <p className="text-sm">Please provide YouTube link</p>
          </div>
        </div>

        {/* Tool 3: Trendline Breakout */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900">Trendline Breakout Indicator PRO</h2>
            <p className="text-zinc-500 text-lg">
              Automatically draws trendlines and detects breakout opportunities when price closes beyond the trendline. Clean breakout visualization without the clutter.
            </p>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Automatic trendline detection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Configurable pivot settings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">✓</span> Works across multiple timeframes
              </li>
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition shadow-lg text-center">
                Add to TradingView
              </a>
            </div>
          </div>
          <div className="flex-1 w-full bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl aspect-video relative">
            <iframe 
              className="absolute inset-0 w-full h-full" 
              src="https://www.youtube.com/embed/czcc7VXeRdo" 
              title="Trendline Breakout Tutorial" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </section>

      {/* CTA Footer - Waitlist Promo */}
      <section className="py-24 px-4 bg-zinc-900 text-center flex flex-col items-center justify-center border-t border-zinc-800">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="heading text-3xl font-bold mb-4">Want to fully automate your edge?</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Stop trading manually. I build custom algorithms and MT5 bots for traders who want to scale without emotions.
          </p>
          <Link 
            href="/#consultation" 
            className="inline-flex items-center px-8 py-4 text-sm font-bold text-zinc-900 bg-white rounded-full hover:bg-zinc-100 transition-colors shadow-lg"
          >
            Book a Custom Bot Consultation
          </Link>
        </div>
      </section>

    </main>
  );
}
