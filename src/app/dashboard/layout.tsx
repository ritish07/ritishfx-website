import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, PlusCircle, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const userPlan = (session.user as any).plan || "FREE";

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-6">
          <Link href="/" className="block">
            <h2 className="text-2xl font-bold tracking-tight text-white"><span className="text-primary">Ritish</span> FX</h2>
          </Link>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {userPlan} PLAN
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} />
            My Strategies
          </Link>
          <Link href="/dashboard/generator" className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors">
            <PlusCircle size={20} />
            New AI Strategy
          </Link>
          <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <CreditCard size={20} />
            Billing
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm">
              {session.user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-slate-400 truncate">{session.user.email}</p>
            </div>
          </div>
          <Link href="/api/auth/signout" className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm">
            <LogOut size={16} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
