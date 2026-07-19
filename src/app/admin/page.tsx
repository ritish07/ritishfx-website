import { PrismaClient } from "@prisma/client";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0; 

export default async function AdminPage() {
  const prisma = new PrismaClient();
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
          <ShieldCheck className="text-primary w-8 h-8" />
          <h1 className="heading text-3xl font-bold">Ritish FX Admin Dashboard</h1>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Custom Bot Submissions ({submissions.length})</h2>
          <p className="text-slate-400">View and manage strategy automation requests.</p>
        </div>

        {submissions.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl">
            <p className="text-slate-400">No submissions yet. They will appear here once users fill out the contact form.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map(sub => (
              <div key={sub.id} className="glass-panel p-6 rounded-xl group hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{sub.name}</h3>
                    <a href={`mailto:${sub.email}`} className="text-primary hover:underline">{sub.email}</a>
                  </div>
                  <span className="text-sm px-3 py-1 bg-slate-800 rounded-lg text-slate-300 font-medium whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleString()}
                  </span>
                </div>
                
                <div className="bg-slate-950/80 p-5 rounded-lg border border-slate-800/50 mt-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Strategy Details</h4>
                  <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{sub.strategy}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
