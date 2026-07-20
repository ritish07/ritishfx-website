"use client";

import Link from "next/link";

export default function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      <Link 
        href="#consultation" 
        className="px-8 py-3.5 text-sm font-bold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
      >
        Book a Strategy Call
      </Link>
      <Link 
        href="/free-tools"
        className="px-8 py-3.5 text-sm font-bold text-zinc-700 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-colors shadow-sm cursor-pointer"
      >
        Explore Free Tools
      </Link>
    </div>
  );
}
