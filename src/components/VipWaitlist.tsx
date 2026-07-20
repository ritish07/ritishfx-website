"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react";

// Global helper to open the modal from anywhere
export const openWaitlist = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  document.dispatchEvent(new CustomEvent('open-waitlist'));
};

export default function VipWaitlist() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    capital: "",
    propFirm: "",
    struggle: "",
    discordId: ""
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-waitlist', handleOpen);
    return () => document.removeEventListener('open-waitlist', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {submitted ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-zinc-900 mb-4">You're on the VIP List!</h3>
            <p className="text-zinc-600 text-lg">Keep an eye on your inbox and Discord. We will send you an exclusive Early Bird discount code the moment Momentum Pro EA launches.</p>
            <button onClick={() => setIsOpen(false)} className="mt-8 px-8 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium rounded-xl transition-colors">
              Close Window
            </button>
          </div>
        ) : (
          <>
            <div className="bg-primary p-6 md:p-8 text-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-6 opacity-10"><Sparkles className="w-24 h-24 text-white" /></div>
              <h2 className="text-2xl font-bold text-white mb-1 relative z-10">Momentum Pro EA</h2>
              <p className="text-white/80 text-sm relative z-10">Join the VIP Waitlist for massive Early Bird discount</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Name <span className="text-red-500">*</span></label>
                  <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2.5 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="you@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Phone Number <span className="text-zinc-400 font-normal">(Optional)</span></label>
                  <p className="text-xs text-zinc-500 mb-1">For exclusive SMS early bird link.</p>
                  <input type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2.5 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1">Country <span className="text-red-500">*</span></label>
                  <p className="text-xs text-zinc-500 mb-1">To optimize server latency matching.</p>
                  <input required type="text" onChange={e => setFormData({...formData, country: e.target.value})} className="w-full p-2.5 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="e.g. United Kingdom" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1">Discord Username <span className="text-red-500">*</span></label>
                <p className="text-xs text-zinc-500 mb-1">Required to verify your community role for discounts.</p>
                <input required type="text" onChange={e => setFormData({...formData, discordId: e.target.value})} className="w-full p-2.5 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="username#1234 or @username" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">What is your current active trading capital? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Under $500", "$500 - $2,000", "$2,000+"].map(opt => (
                    <label key={opt} className={`cursor-pointer p-2.5 border rounded-xl text-center text-sm font-medium transition-colors ${formData.capital === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                      <input required type="radio" name="capital" value={opt} className="hidden" onChange={(e) => setFormData({...formData, capital: e.target.value})} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">Are you currently trading a Prop Firm account? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Yes", "No", "Planning to"].map(opt => (
                    <label key={opt} className={`cursor-pointer p-2.5 border rounded-xl text-center text-sm font-medium transition-colors ${formData.propFirm === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                      <input required type="radio" name="propFirm" value={opt} className="hidden" onChange={(e) => setFormData({...formData, propFirm: e.target.value})} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-2">What is your biggest struggle? <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {["Emotions", "Risk Management", "Lack of Time"].map(opt => (
                    <label key={opt} className={`cursor-pointer p-2.5 border rounded-xl text-center text-sm font-medium transition-colors ${formData.struggle === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                      <input required type="radio" name="struggle" value={opt} className="hidden" onChange={(e) => setFormData({...formData, struggle: e.target.value})} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full mt-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center disabled:opacity-70 shadow-lg">
                {loading ? "Securing Spot..." : "Secure My Early Bird Spot"} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
