import { Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function PaywallOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-slate-950/60">
      <div className="bg-slate-900 border border-primary/40 p-8 rounded-2xl max-w-md text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-primary w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">Source Code Locked</h3>
        <p className="text-slate-400 mb-6">
          Upgrade to the Premium plan to download the full MQL5/PineScript source code for this bot.
        </p>
        <Link href="/dashboard/billing" className="inline-flex items-center gap-2 bg-primary text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <Zap size={20} />
          Upgrade to Premium (₹4,999)
        </Link>
      </div>
    </div>
  );
}
