import FloatingHeader from "@/components/FloatingHeader";
import InteractiveDots from "@/components/InteractiveDots";
import Link from "next/link";

export default function BookACallPage() {
  return (
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans bg-zinc-50">
      <FloatingHeader />
      
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center overflow-hidden bg-white">
        <InteractiveDots />
        
        <div className="w-full max-w-5xl mx-auto relative z-10 pt-32 pb-20">
          <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-8 border border-zinc-200">
            Custom MT5 Bot Development
          </div>
          
          <div className="text-center mb-12">
            <h1 className="heading text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Book a 1:1 Consultation
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
              Have a winning strategy? Let's automate it and build your Custom MT5 Bot so you can scale without emotions.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">Automation Strategy Call</h3>
            <p className="text-zinc-500 mb-8">Secure your slot via Topmate for a private video session to discuss your trading strategy and bot requirements.</p>
            

            <a 
              href="https://topmate.io/ritishfx" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-zinc-900 text-white font-bold py-5 rounded-xl hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg transform hover:-translate-y-1"
            >
              <span>Book via Topmate</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 py-12 px-4 bg-zinc-50">
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
