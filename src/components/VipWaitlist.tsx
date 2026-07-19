"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function VipWaitlist() {
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    capital: "",
    propFirm: "",
    struggle: "",
    discordId: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we will save to database/Google Sheets and process pricing logic
    console.log("Waitlist Data:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-zinc-200 rounded-3xl p-12 text-center shadow-xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 mb-2">You're on the VIP List!</h3>
        <p className="text-zinc-600">Keep an eye on your inbox. We will send you an exclusive Early Bird discount code the moment Momentum Pro EA launches.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xl">
      <div className="bg-primary p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles className="w-32 h-32 text-white" /></div>
        <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Momentum Pro EA</h2>
        <p className="text-white/80 relative z-10">Join the VIP Waitlist for massive Early Bird pricing</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">Name</label>
            <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">Email Address</label>
            <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900 mb-2">Discord Username <span className="text-zinc-400 font-normal">(Optional)</span></label>
          <input type="text" onChange={e => setFormData({...formData, discordId: e.target.value})} className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none" placeholder="@username" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900 mb-2">What is your current active trading capital? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Under $500", "$500 - $2,000", "$2,000+"].map(opt => (
              <label key={opt} className={`cursor-pointer p-4 border rounded-xl text-center text-sm font-medium transition-colors ${formData.capital === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                <input required type="radio" name="capital" value={opt} className="hidden" onChange={(e) => setFormData({...formData, capital: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900 mb-2">Are you currently trading a Prop Firm account? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Yes", "No", "Planning to"].map(opt => (
              <label key={opt} className={`cursor-pointer p-4 border rounded-xl text-center text-sm font-medium transition-colors ${formData.propFirm === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                <input required type="radio" name="propFirm" value={opt} className="hidden" onChange={(e) => setFormData({...formData, propFirm: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900 mb-2">What is your biggest struggle? <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["Emotions", "Risk Management", "Lack of Time"].map(opt => (
              <label key={opt} className={`cursor-pointer p-4 border rounded-xl text-center text-sm font-medium transition-colors ${formData.struggle === opt ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                <input required type="radio" name="struggle" value={opt} className="hidden" onChange={(e) => setFormData({...formData, struggle: e.target.value})} />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full mt-4 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center">
          Secure My Early Bird Spot <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </form>
    </div>
  );
}
