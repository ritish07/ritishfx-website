import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Activity, Plus } from "lucide-react";
import MiniEquityChart from "@/components/MiniEquityChart";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  
  const strategies = await prisma.strategy.findMany({
    where: { user: { email: session?.user?.email } },
    include: { results: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Strategies</h1>
          <p className="text-slate-400">View and manage your AI-generated trading bots.</p>
        </div>
        <Link href="/dashboard/generator" className="flex items-center gap-2 bg-primary text-slate-950 px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-[0_0_10px_rgba(0,240,255,0.2)]">
          <Plus size={18} />
          Generate New
        </Link>
      </div>

      {strategies.length === 0 ? (
        <div className="border border-dashed border-slate-700 rounded-2xl p-12 text-center bg-slate-900/30">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No strategies yet</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">Use the AI Generator to describe your trading logic, and Hermes will build and backtest it for you.</p>
          <Link href="/dashboard/generator" className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors font-medium">
            Open Generator
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {strategies.map(strat => {
            const isCompleted = strat.status === 'COMPLETED';
            const hasResults = isCompleted && strat.results;
            const equityData = hasResults && strat.results?.equityCurve ? JSON.parse(strat.results.equityCurve) : [];
            const isProfitable = hasResults && strat.results!.profitFactor! > 1;

            return (
              <Link key={strat.id} href={`/dashboard/strategies/${strat.id}`} className="block glass-panel rounded-2xl hover:border-primary/50 transition-all group overflow-hidden flex flex-col h-full bg-slate-900/50 shadow-lg hover:shadow-primary/10">
                {/* Chart Area */}
                <div className="h-44 bg-[#0b1120] relative border-b border-slate-800/50 p-4">
                  {hasResults ? (
                    <MiniEquityChart data={equityData} isProfitable={isProfitable} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                      <Activity className="w-8 h-8 mb-2 animate-pulse text-slate-600" />
                      <span className="text-sm font-medium animate-pulse">Backtesting...</span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                     <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {strat.status}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-sm font-medium text-slate-300 line-clamp-2 group-hover:text-white transition-colors leading-relaxed mb-5 flex-1" title={strat.prompt}>
                    "{strat.prompt}"
                  </h3>
                  
                  {hasResults ? (
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Win Rate</p>
                        <p className="text-lg font-bold text-white">{strat.results?.winRate}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Drawdown</p>
                        <p className="text-lg font-bold text-rose-400">-{strat.results?.maxDrawdown}%</p>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-sm text-slate-500 italic">Metrics pending...</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
