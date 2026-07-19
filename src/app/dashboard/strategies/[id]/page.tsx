import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EquityChart from "@/components/EquityChart";
import PaywallOverlay from "@/components/PaywallOverlay";
import { ArrowLeft, Code2, Download, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function StrategyDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  
  const strategy = await prisma.strategy.findUnique({
    where: { id: params.id },
    include: { results: true, user: true }
  });

  if (!strategy || strategy.user.email !== session?.user?.email) {
    redirect("/dashboard");
  }

  const isPremium = strategy.user.plan === "PREMIUM";
  const equityData = strategy.results?.equityCurve ? JSON.parse(strategy.results.equityCurve) : [];

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Strategies
      </Link>
      
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Strategy Details</h1>
          <p className="text-slate-400 max-w-2xl">{strategy.prompt}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {strategy.status}
        </span>
      </div>

      {strategy.results && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-6 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Win Rate</p>
            <p className="text-3xl font-bold text-white">{strategy.results.winRate}%</p>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Profit Factor</p>
            <p className="text-3xl font-bold text-white">{strategy.results.profitFactor}</p>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Max Drawdown</p>
            <p className="text-3xl font-bold text-rose-400">-{strategy.results.maxDrawdown}%</p>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Trades</p>
            <p className="text-3xl font-bold text-white">{strategy.results.totalTrades}</p>
          </div>
        </div>
      )}

      {equityData.length > 0 && (
        <div className="glass-panel p-6 rounded-xl mb-8">
          <div className="flex items-center gap-2 mb-2 text-white font-medium">
            <TrendingUp className="text-primary" size={20} />
            Equity Curve
          </div>
          <EquityChart data={equityData} />
        </div>
      )}

      <div className="glass-panel rounded-xl overflow-hidden relative">
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-medium">
            <Code2 className="text-primary" size={20} />
            Source Code ({strategy.platform})
          </div>
          {isPremium && (
            <button className="flex items-center gap-2 text-sm text-primary hover:text-white transition-colors">
              <Download size={16} /> Download
            </button>
          )}
        </div>
        
        <div className="relative bg-[#0d1117] p-6 overflow-x-auto min-h-[300px]">
          {!isPremium && <PaywallOverlay />}
          <pre className={`text-sm text-slate-300 font-mono leading-relaxed ${!isPremium ? 'blur-sm select-none' : ''}`}>
            {strategy.sourceCode || "// Code not available"}
          </pre>
        </div>
      </div>
    </div>
  );
}
