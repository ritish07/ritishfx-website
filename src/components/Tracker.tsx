"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();
  const hasTrackedVisit = useRef(false);

  useEffect(() => {
    // Only track once per page load to prevent hydration mismatches and strict mode double mounts
    
    // 1. Track global website visit (once per session)
    if (!hasTrackedVisit.current && !sessionStorage.getItem("tracked_visit")) {
      fetch("/api/track", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "VISIT" }) 
      }).catch(console.error);
      
      sessionStorage.setItem("tracked_visit", "true");
      hasTrackedVisit.current = true;
    }

    // 2. Track waitlist clicks/views (once per session)
    if (pathname === "/waitlist" && !sessionStorage.getItem("tracked_waitlist")) {
      fetch("/api/track", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "WAITLIST_CLICK" }) 
      }).catch(console.error);
      
      sessionStorage.setItem("tracked_waitlist", "true");
    }
  }, [pathname]);

  return null; // Invisible component
}
