"use client";

import { useEffect, useState } from "react";

export default function InteractiveDots() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Initial check in case mouse is already over window
    if (document.body.matches(':hover')) {
      setIsHovering(true);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
      style={{
        opacity: isHovering ? 1 : 0,
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle at center, #d4d4d8 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`
        }}
      />
    </div>
  );
}
