"use client";

import { useState } from "react";
import FloatingHeader from "@/components/FloatingHeader";
import InteractiveDots from "@/components/InteractiveDots";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function WaitlistPage() {
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
    hesitation: "",
    discordId: "",
  });

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
    <main className="text-zinc-900 relative selection:bg-zinc-200 w-full min-h-screen font-sans bg-zinc-50 flex flex-col">
      <FloatingHeader />
      
      <section className="flex-1 flex flex-col items-center justify-center relative px-4 text-center overflow-hidden bg-white pt-32 pb-20">
        <InteractiveDots />
        
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 bg-zinc-100 text-zinc-600 text-sm font-medium rounded-full mb-8 border border-zinc-200">
            Momentum Pro EA
          </div>
          
          <div className="text-center mb-10">
            <h1 className="heading text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Join the VIP Waitlist
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
              Secure your spot for a massive Early Bird discount when we launch.
            </p>
          </div>
          
          <div className="w-full bg-white border border-zinc-200 rounded-3xl shadow-2xl relative overflow-hidden text-left">
            {submitted ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-4">You're on the VIP List!</h3>
                <p className="text-zinc-600 text-lg max-w-lg mx-auto mb-8">
                  Keep an eye on your inbox and Discord. We will send you an exclusive Early Bird discount code the moment Momentum Pro EA launches.
                </p>
                <Link href="/" className="inline-flex items-center px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl transition-colors shadow-lg">
                  Return Home
                </Link>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-center relative overflow-hidden shrink-0">
                  <div className="absolute top-0 right-0 p-6 opacity-10"><Sparkles className="w-24 h-24 text-white" /></div>
                  <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Secure Your Early Bird Spot</h2>
                  <p className="text-zinc-300 text-sm relative z-10">Fill out this quick form to verify your status</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Name <span className="text-red-500">*</span></label>
                      <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition-shadow" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition-shadow" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-1">Phone Number <span className="text-zinc-400 font-normal">(Optional)</span></label>
                      <p className="text-xs text-zinc-500 mb-2">For exclusive SMS early bird link.</p>
                      <input type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition-shadow" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-1">Country <span className="text-red-500">*</span></label>
                      <p className="text-xs text-zinc-500 mb-2">For regional pricing considerations.</p>
                      <input required type="text" onChange={e => setFormData({...formData, country: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition-shadow" placeholder="India" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-1">Discord Username <span className="text-red-500">*</span></label>
                    <p className="text-xs text-zinc-500 mb-2">Required to verify your community role for discounts.</p>
                    <input required type="text" onChange={e => setFormData({...formData, discordId: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 focus:outline-none transition-shadow" placeholder="username#1234 or @username" />
                  </div>

                  <div className="pt-4 border-t border-zinc-100">
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">What is your current active trading capital? <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["Under $500", "$500 - $2,000", "$2,000+"].map(opt => (
                        <label key={opt} className={`cursor-pointer p-3 border rounded-xl text-center text-sm font-medium transition-all ${formData.capital === opt ? 'border-zinc-900 bg-zinc-900 text-white shadow-md transform scale-[1.02]' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                          <input required type="radio" name="capital" value={opt} className="hidden" onChange={(e) => setFormData({...formData, capital: e.target.value})} />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">Are you currently trading a Prop Firm account? <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["Yes", "No", "Planning to"].map(opt => (
                        <label key={opt} className={`cursor-pointer p-3 border rounded-xl text-center text-sm font-medium transition-all ${formData.propFirm === opt ? 'border-zinc-900 bg-zinc-900 text-white shadow-md transform scale-[1.02]' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                          <input required type="radio" name="propFirm" value={opt} className="hidden" onChange={(e) => setFormData({...formData, propFirm: e.target.value})} />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">What is your biggest struggle? <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["Emotions", "Risk Management", "Lack of Time"].map(opt => (
                        <label key={opt} className={`cursor-pointer p-3 border rounded-xl text-center text-sm font-medium transition-all ${formData.struggle === opt ? 'border-zinc-900 bg-zinc-900 text-white shadow-md transform scale-[1.02]' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                          <input required type="radio" name="struggle" value={opt} className="hidden" onChange={(e) => setFormData({...formData, struggle: e.target.value})} />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-900 mb-3">What is your biggest hesitation when buying trading algorithms? <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        "High upfront costs before knowing if it works", 
                        "Hidden ongoing fees or subscriptions", 
                        "The bot stops working when markets change"
                      ].map(opt => (
                        <label key={opt} className={`cursor-pointer p-4 border rounded-xl text-sm font-medium transition-all ${formData.hesitation === opt ? 'border-zinc-900 bg-zinc-900 text-white shadow-md transform scale-[1.01]' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'}`}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.hesitation === opt ? 'border-white' : 'border-zinc-300'}`}>
                              {formData.hesitation === opt && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                            </div>
                            <input required type="radio" name="hesitation" value={opt} className="hidden" onChange={(e) => setFormData({...formData, hesitation: e.target.value})} />
                            {opt}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button disabled={loading} type="submit" className="w-full mt-6 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-70 shadow-lg text-lg">
                    {loading ? "Securing Spot..." : "Secure My Early Bird Spot"} <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 py-12 px-4 bg-white relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6">
          <Link href="/" className="flex items-center">
            <img src="/logo.jpg" alt="Ritish FX Logo" className="h-6 w-auto mix-blend-multiply opacity-80" />
          </Link>
          <span className="text-sm font-medium text-zinc-500">© {new Date().getFullYear()} Ritish FX. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
