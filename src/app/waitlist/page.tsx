import FloatingHeader from "@/components/FloatingHeader";
import InteractiveDots from "@/components/InteractiveDots";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function WaitlistPage() {
  return (
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans bg-zinc-50 flex flex-col">
      <FloatingHeader />
      
      <section className="flex-1 flex flex-col items-center justify-center relative px-4 text-center overflow-hidden bg-white pt-32 pb-20">
        <InteractiveDots />
        
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-8 border border-zinc-200">
            Momentum Pro EA
          </div>
          
          <div className="text-center mb-10">
            <h1 className="heading text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Join the VIP Waitlist
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
              Secure your spot for a massive Early Bird discount when we launch.
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
