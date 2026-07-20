import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { Lock } from "lucide-react";

const prisma = new PrismaClient();

async function authenticate(data: FormData) {
  "use server";
  const code = data.get("code");
  if (code === "1bhkg7^y2be8%") {
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "true", { path: "/", maxAge: 60 * 60 * 24 });
  }
}

export default async function AdminWaitlistPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4 font-sans">
        <form action={authenticate} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center border border-zinc-200">
          <Lock className="w-12 h-12 text-zinc-300 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-zinc-900 mb-6">Restricted Area</h2>
          <input 
            type="password" 
            name="code" 
            placeholder="Secret Code" 
            className="w-full p-3 border border-zinc-300 rounded-xl mb-4 focus:ring-2 focus:ring-zinc-900 focus:outline-none text-center"
            required
          />
          <button type="submit" className="w-full bg-zinc-900 text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition-colors">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  // They are authenticated
  const submissions = await prisma.waitlist.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Waitlist Dashboard</h1>
            <p className="text-zinc-500 mt-1">{submissions.length} Total Signups</p>
          </div>
          <a href="/" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 bg-white border border-zinc-200 rounded-lg shadow-sm">
            Back to Site
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Discord</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Capital</th>
                <th className="px-6 py-4">Prop Firm</th>
                <th className="px-6 py-4">Hesitation</th>
                <th className="px-6 py-4">Early Bird Code</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{sub.name}</td>
                  <td className="px-6 py-4">
                    <div className="text-zinc-900">{sub.email}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{sub.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">{sub.discordId}</td>
                  <td className="px-6 py-4 text-zinc-600">{sub.country}</td>
                  <td className="px-6 py-4 text-zinc-600">{sub.capital}</td>
                  <td className="px-6 py-4 text-zinc-600">{sub.propFirm}</td>
                  <td className="px-6 py-4 text-zinc-600 max-w-xs truncate" title={sub.hesitation}>{sub.hesitation}</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-mono text-xs font-bold">{sub.earlyBirdCode}</span></td>
                  <td className="px-6 py-4 text-zinc-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {submissions.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              No waitlist submissions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
