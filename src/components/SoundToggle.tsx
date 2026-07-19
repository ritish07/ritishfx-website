"use client";

import { useState, useRef } from "react";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) {
      // In a real app, this would be a high-quality ambient track.
      // We will use a placeholder or silent audio instance for the UI effect.
      audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=ambient-piano-amp-strings-10711.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio playback failed. User interaction needed.", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={toggleSound}
      className="fixed bottom-8 right-8 z-[60] text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute right-full mr-4 whitespace-nowrap">
        {isPlaying ? "Mute Atmosphere" : "Play Atmosphere"}
      </span>
      [ {isPlaying ? "SOUND ON" : "SOUND OFF"} ]
    </button>
  );
}
