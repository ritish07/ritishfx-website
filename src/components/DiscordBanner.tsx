import { MessageSquare } from "lucide-react";

export default function DiscordBanner() {
  return (
    <section className="relative rounded-3xl overflow-hidden glass-panel border-indigo-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-slate-900/80 -z-10" />
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 -z-10" />
      
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className="heading text-3xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-3">
            <MessageSquare className="text-indigo-400" size={32} />
            Join the Community
          </h2>
          <p className="text-slate-300 text-lg max-w-xl">
            Connect with like-minded traders, get early access to our latest bots and indicators, and share your trading setups in the Ritish FX Discord server.
          </p>
        </div>
        
        <div className="shrink-0">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(88,101,242,0.4)] gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
            Join Discord Server
          </a>
        </div>
      </div>
    </section>
  );
}
