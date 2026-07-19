"use client";

import { useState, useEffect } from "react";

export default function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal on first load if not seen
    const hasSeenModal = sessionStorage.getItem("rfx_location_seen");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("rfx_location_seen", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl transition-opacity duration-1000">
      <div className="max-w-md w-full p-12 flex flex-col items-center text-center border border-white/5 bg-black/40 shadow-2xl">
        <h2 className="heading text-3xl font-light text-primary mb-6 tracking-widest uppercase">Welcome</h2>
        <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase mb-12 leading-loose">
          To provide you with the most tailored experience, please select your region.
        </p>
        
        <div className="flex flex-col w-full gap-4">
          <button 
            onClick={closeModal}
            className="w-full py-4 border border-primary/30 text-primary uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-background transition-all duration-500"
          >
            Shop in India
          </button>
          <button 
            onClick={closeModal}
            className="w-full py-4 border border-slate-800 text-slate-400 uppercase tracking-[0.2em] text-[10px] hover:border-slate-500 hover:text-white transition-all duration-500"
          >
            Continue Global
          </button>
        </div>
      </div>
    </div>
  );
}
