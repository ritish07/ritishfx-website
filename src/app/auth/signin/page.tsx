"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password: "password123", // mock password
      redirect: false,
    });
    
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-slate-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white">Access Dashboard</h1>
          <p className="text-slate-400 mt-2">Log in or enter email to auto-register</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1.5 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary text-slate-950 font-bold hover:bg-primary-hover transition-colors flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-70"
          >
            {loading ? "Authenticating..." : (
              <>
                <LogIn size={20} />
                Continue
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm mb-4">Having trouble logging in?</p>
          <button 
            type="button"
            onClick={async () => {
              setLoading(true);
              const res = await signIn("credentials", {
                email: "bypass@test.com",
                password: "password123",
                redirect: false,
              });
              if (res?.ok) router.push("/dashboard");
            }}
            className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
          >
            Bypass Login (Dev Mode)
          </button>
        </div>
      </div>
    </div>
  );
}
