"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * PacmanGhostLoader.tsx
 * Pure Retro Arcade Game Entrance Screen featuring the iconic 8-bit Pac-Man Red Ghost (Blinky).
 * Bobbing body, moving pupils, flickering skirt tentacles, and dynamic floor shadow.
 * Authentic 80s arcade layout with scores, blinking INSERT COIN, and PUSH START.
 */
export function PacmanGhostLoader() {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const DURATION_MS = 5000;

  const triggerExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 600);
  }, []);

  useEffect(() => {
    // Lock body scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-enter page after 5 seconds
    const timer = setTimeout(() => {
      triggerExit();
    }, DURATION_MS);

    // Any key press immediately starts
    const handleKeyDown = () => {
      triggerExit();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [triggerExit]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gusto '26 Loading"
      onClick={triggerExit}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center p-6 bg-[#070709] cursor-pointer transition-all duration-500 ease-in-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 28px 28px, 28px 28px",
      }}
    >
      {/* CRT Scanline Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)",
        }}
      />

      {/* ── CENTER: PAC-MAN GHOST (BLINKY) ANIMATION ── */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Animated Pac-Man Ghost (Blinky) */}
        <div id="ghost">
          <div id="red">
            <div id="pupil"></div>
            <div id="pupil1"></div>
            <div id="eye"></div>
            <div id="eye1"></div>
            <div id="top0"></div>
            <div id="top1"></div>
            <div id="top2"></div>
            <div id="top3"></div>
            <div id="top4"></div>
            <div id="st0"></div>
            <div id="st1"></div>
            <div id="st2"></div>
            <div id="st3"></div>
            <div id="st4"></div>
            <div id="st5"></div>
            <div id="an1"></div>
            <div id="an2"></div>
            <div id="an3"></div>
            <div id="an4"></div>
            <div id="an5"></div>
            <div id="an6"></div>
            <div id="an7"></div>
            <div id="an8"></div>
            <div id="an9"></div>
            <div id="an10"></div>
            <div id="an11"></div>
            <div id="an12"></div>
            <div id="an13"></div>
            <div id="an14"></div>
            <div id="an15"></div>
            <div id="an16"></div>
            <div id="an17"></div>
            <div id="an18"></div>
          </div>
          <div id="shadow"></div>
        </div>

        {/* Trail of arcade energizer dots */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-sm bg-[#fde047] shadow-[0_0_8px_#fde047] animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
