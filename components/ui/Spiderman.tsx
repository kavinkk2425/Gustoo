"use client";

import React, { useState } from "react";

interface HangingSpidermanProps {
  className?: string;
  onClick?: () => void;
  onOpenRegister?: () => void;
}

export function HangingSpiderman({ className = "", onClick, onOpenRegister }: HangingSpidermanProps) {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showWebBubble, setShowWebBubble] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWiggling(true);
    setShowWebBubble(true);
    setTimeout(() => setIsWiggling(false), 900);
    setTimeout(() => setShowWebBubble(false), 2400);

    if (onOpenRegister) {
      onOpenRegister();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`spidey-wrapper group relative select-none cursor-pointer ${className}`}
      title="Click Spider-Man to Register! THWIP! 🕸️"
    >
      {/* Top Web Anchor Splatter Node attached to the navbar ledge */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
        <div className="w-3 sm:w-4 h-1.5 sm:h-2 bg-white border-[1.5px] border-black rounded-full shadow-[1px_1px_0px_#000]" />
        <div className="w-[1.5px] h-3 bg-white border-x border-black/40" />
      </div>

      {/* Comic Callout Speech Bubble on Hover / Click */}
      <div
        className={`absolute top-10 sm:top-12 -left-12 sm:-left-10 transition-all duration-300 z-50 pointer-events-none ${
          showWebBubble
            ? "opacity-100 scale-100 -translate-y-2"
            : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-95"
        }`}
      >
        <div className="bg-[#e32832] text-white font-black text-[8.5px] sm:text-[11px] font-['Chakra_Petch',sans-serif] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border-[2px] border-black shadow-[3px_3px_0px_#000] tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5">
          <span className="text-yellow-300 animate-spin [animation-duration:4s]">🕸️</span>
          <span>THWIP! REGISTER!</span>
        </div>
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#e32832] ml-12 sm:ml-8 filter drop-shadow-[0_1.5px_0_#000]" />
      </div>

      {/* Spider-Man Hanging Container */}
      <div className={`spidey-box transition-transform duration-200 group-hover:scale-105 active:scale-95 ${isWiggling ? "animate-wiggle" : ""}`}>
        {/* Suspended Web Thread extending to anchor */}
        <div className="spidey-rope spidey-center">
          {/* Upside Down Legs & Boots */}
          <div className="spidey-legs spidey-center">
            <div className="spidey-boot-l" />
            <div className="spidey-boot-r" />
          </div>

          {/* Spider-Man Suit / Costume with comic shadow */}
          <div className="spidey-costume spidey-center drop-shadow-[2px_3px_0px_rgba(0,0,0,0.5)]">
            {/* Chest Spider Emblem with 8 legs */}
            <div className="spidey-spider">
              <div className="spidey-s1 spidey-center" />
              <div className="spidey-s2 spidey-center" />
              <div className="spidey-s3" />
              <div className="spidey-s4" />
            </div>

            {/* Utility Belt */}
            <div className="spidey-belt spidey-center" />

            {/* Hands clinging to sides */}
            <div className="spidey-hand-r" />
            <div className="spidey-hand-l" />

            {/* Neck Connection */}
            <div className="spidey-neck spidey-center" />

            {/* Inverted Mask with White Eyes */}
            <div className="spidey-mask spidey-center">
              <div className="spidey-eye-l" />
              <div className="spidey-eye-r" />
            </div>

            {/* Web strand cover strip */}
            <div className="spidey-cover spidey-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
