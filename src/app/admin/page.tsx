import { PrismaClient } from "@prisma/client";
import { ShieldCheck, Users, MousePointerClick, CheckSquare } from "lucide-react";
import DownloadCsvButton from "@/components/DownloadCsvButton";
import EAForwardTestDashboard from "@/components/EAForwardTestDashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
  const prisma = new PrismaClient();
  
  // Waitlist Data
  const submissions = await prisma.waitlist.findMany({
    orderBy: { createdAt: "desc" }
  });

  const analytics = await prisma.analytics.findUnique({
    where: { id: "global" }
  });

  const visits = analytics?.visits || 0;
  const clicks = analytics?.waitlistClicks || 0;
  const completions = submissions.length;
  
  const conversionRate = clicks > 0 ? Math.round((completions / clicks) * 100) : 0;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-10 font-sans pt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-zinc-200">
          <ShieldCheck className="text-red-600 w-10 h-10" />
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Super Admin</h1>
            <p className="text-zinc-500 mt-1">Unified Dashboard</p>
          </div>
        </div>

        {/* Section 1: Forward Testing */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Forward Testing Environment</h2>
          <EAForwardTestDashboard />
        </section>

        {/* Section 2: Waitlist Analytics */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Waitlist Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Visits Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-700">Total Visits</h3>
              </div>
              <p className="text-4xl font-bold text-zinc-900">{visits.toLocaleString()}</p>
            </div>

            {/* Waitlist Clicks Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <MousePointerClick className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-700">Waitlist Views</h3>
              </div>
              <p className="text-4xl font-bold text-zinc-900">{clicks.toLocaleString()}</p>
            </div>

            {/* Completions Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-700">Submissions</h3>
              </div>
              <div className="flex items-baseline gap-3 relative z-10">
                <p className="text-4xl font-bold text-zinc-900">{completions.toLocaleString()}</p>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{conversionRate}% Conversion</span>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-6 border-b border-zinc-200 bg-zinc-50/50 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-zinc-900">Waitlist Database</h2>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-600 font-bold rounded-full text-sm">{completions} Total</span>
              </div>
              <DownloadCsvButton data={submissions} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name & Contact</th>
                    <th className="px-6 py-4">Discord</th>
                    <th className="px-6 py-4">Capital / Prop</th>
                    <th className="px-6 py-4">Hesitation</th>
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-zinc-900 text-base">{sub.name} <span className="text-zinc-400 font-normal text-sm ml-2">({sub.country})</span></div>
                        <div className="text-zinc-500 mt-1">{sub.email}</div>
                        {sub.phone && <div className="text-zinc-400 text-xs mt-0.5">{sub.phone}</div>}
                      </td>
                      <td className="px-6 py-4 font-medium text-indigo-600">{sub.discordId}</td>
                      <td className="px-6 py-4">
                        <div className="text-zinc-900 font-medium">{sub.capital}</div>
                        <div className="text-zinc-500 text-xs mt-1">Prop: {sub.propFirm}</div>
                      </td>
                      <td className="px-6 py-4 text-zinc-600">
                        <div className="max-w-[200px] whitespace-normal text-xs leading-relaxed font-medium bg-zinc-50 p-2 rounded-lg border border-zinc-100 group-hover:bg-white transition-colors">
                          {sub.hesitation}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg font-mono text-xs font-bold border border-green-200 shadow-sm">
                          {sub.earlyBirdCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {submissions.length === 0 && (
                <div className="p-16 text-center text-zinc-500 font-medium">
                  No waitlist submissions yet. Check back soon!
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
