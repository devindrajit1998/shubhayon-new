import React, { useEffect, useState } from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { Sparkles, Heart } from 'lucide-react';

export default function PageDataLoader() {
  const { isLoading } = useAdminData();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Smooth fade-out transition after data arrives
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
      setIsFadingOut(false);
    }
  }, [isLoading]);

  // Safety fallback: auto-hide after 3.5s in case of offline / slow network
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setShouldRender(false), 550);
    }, 3500);
    return () => clearTimeout(safetyTimer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      id="global-page-loader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0d0707] transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
      aria-label="Loading Shuvayan Event Management"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#c8102e]/25 via-[#d4af37]/15 to-transparent blur-[90px] animate-pulse pointer-events-none" />

      {/* Center Royal Seal / Animated Ring */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Golden Orbit Ring */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#d4af37]/30 border-t-[#d4af37] border-r-[#c8102e] animate-spin [animation-duration:2.5s]" />

        {/* Inner Counter-Rotating Red Orbit Ring */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-[#c8102e]/40 border-b-[#c8102e] animate-spin [animation-duration:3.5s] [animation-direction:reverse]" />

        {/* Center Glowing Brand Emblem */}
        <div className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#2a0e10] to-[#120506] border border-[#d4af37]/60 shadow-[0_0_25px_rgba(200,16,46,0.5)] flex items-center justify-center">
          <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#d4af37] fill-[#c8102e] animate-bounce [animation-duration:1.8s]" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="text-center px-4 z-10">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <p className="font-script text-[#d4af37] text-2xl sm:text-3xl tracking-wide">
            Shuvayan
          </p>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
        </div>

        <h3 className="font-serif-display text-white text-sm sm:text-base tracking-[0.25em] uppercase font-light">
          Wedding & Event Management
        </h3>

        {/* Royal Progress Bar Line */}
        <div className="w-44 sm:w-56 h-[2px] bg-white/10 rounded-full mx-auto mt-5 overflow-hidden relative">
          <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-[#c8102e] rounded-full animate-loader-slide" />
        </div>

        <p className="text-xs text-white/50 tracking-wider font-light mt-3">
          Curating Moments of Grandeur...
        </p>
      </div>
    </div>
  );
}
