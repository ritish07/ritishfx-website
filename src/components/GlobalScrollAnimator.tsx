"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const LeapingVector = () => (
  <svg width="100%" height="100%" viewBox="0 0 512 512" fill="url(#neon-gradient)" className="drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
    <defs>
      <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    {/* Geometric, sharp, high-tech leaping figure */}
    <circle cx="360" cy="100" r="35" />
    <path d="M340 140 L230 220 L130 180 L100 220 L210 280 L270 230 L270 360 L190 460 L240 480 L330 360 L350 220 L450 180 L430 130 Z" />
  </svg>
);

export default function GlobalScrollAnimator() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering motion on client
  useEffect(() => setMounted(true), []);

  // Complex Keyframes over the [0, 1] global scroll progress
  // 0.0: Hero Section (Starts jumping)
  // 0.2: Vaulting past Hero
  // 0.4: Landing on Product Grid
  // 0.6: Flipping over Education Hub
  // 0.8: Falling towards Footer
  // 1.0: Landed near Contact Form
  
  const charX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["10vw", "75vw", "80vw", "20vw", "10vw", "70vw"]
  );

  const charY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["30vh", "15vh", "50vh", "20vh", "60vh", "85vh"]
  );

  const charRotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 45, 0, -180, -360, -360]
  );

  const charScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 1.3, 0.8, 1.4, 0.9, 1]
  );

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed z-[100] pointer-events-none w-24 h-24 md:w-32 md:h-32"
      style={{
        x: charX,
        y: charY,
        rotate: charRotate,
        scale: charScale,
        left: 0,
        top: 0
      }}
    >
      <LeapingVector />
    </motion.div>
  );
}
