"use client";

import { useState } from "react";
import EAForwardTestDashboard from "@/components/EAForwardTestDashboard";

export default function SecretDashboardPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The secret code to enter the dashboard
    if (password === "1bhkg7^y2be8%") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <main className="text-zinc-900 w-full min-h-screen font-sans bg-zinc-50 pt-12 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Secret Admin Dashboard</h2>
            <p className="text-lg text-zinc-500">Live MT5 Forward Testing Data</p>
          </div>
          <EAForwardTestDashboard />
        </div>
      </main>
    );
  }

  return (
    <main className="text-zinc-900 w-full min-h-screen font-sans bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="Enter Secret Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            {error && <p className="text-red-500 text-sm mt-2 text-left">Incorrect code.</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white font-bold py-3 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Enter Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
