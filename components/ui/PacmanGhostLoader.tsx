"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * PacmanGhostLoader.tsx
 * Pure Retro Arcade Game Entrance Screen featuring the iconic 8-bit Pac-Man Red Ghost (Blinky).
 * Bobbing body, moving pupils, flickering skirt tentacles, and dynamic floor shadow.
 * Authentic 80s arcade layout with scores, blinking INSERT COIN, and PUSH START.
 */
const FULL_LOADER_TEXT = "Entering into Gusto 2.0";

export function PacmanGhostLoader() {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [dotCount, setDotCount] = useState(0);
  const DURATION_MS = 2200;

  const triggerExit = useCallback(() => {
    setIsExiting(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setTimeout(() => {
      setVisible(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }, 450);
  }, []);

  // Retro typewriter effect: Type out character-by-character (~50ms cadence)
  useEffect(() => {
    let charIdx = 0;
    const typingTimer = setInterval(() => {
      charIdx++;
      setTypedLength(charIdx);
      if (charIdx >= FULL_LOADER_TEXT.length) {
        clearInterval(typingTimer);
      }
    }, 50);

    return () => clearInterval(typingTimer);
  }, []);

  // Once typing completes, animate the loading dots (1 -> 2 -> 3 -> 1...)
  useEffect(() => {
    if (typedLength < FULL_LOADER_TEXT.length) return;
    const dotTimer = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 280);
    return () => clearInterval(dotTimer);
  }, [typedLength]);

  useEffect(() => {
    // Lock body scroll while loader is active
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // Auto-enter page smoothly after 2.2 seconds
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
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [triggerExit]);


  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gusto '26 Loading"
      onClick={triggerExit}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center p-6 bg-[#070709] cursor-pointer transition-all duration-500 ease-in-out select-none ${isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
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
        <div className="flex items-center justify-center gap-3.5 xs:gap-4 mt-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-xs bg-[#fde047] shadow-[0_0_8px_#fde047] animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* ── ENTERING INTO GUSTO 2.0 (RETRO TYPEWRITER EFFECT WITH LOADING DOTS) ── */}
        <div className="mt-8 flex items-center justify-center text-center">
          <p className="font-['Press_Start_2P',monospace] text-[9px] xs:text-[10.5px] sm:text-xs font-black tracking-wider text-[#ffd000] drop-shadow-[2px_2px_0px_#000] uppercase flex items-center select-none min-h-[20px]">
            <span>{FULL_LOADER_TEXT.slice(0, typedLength)}</span>
            {/* Blinking retro terminal block cursor while typing */}
            {typedLength < FULL_LOADER_TEXT.length ? (
              <span className="inline-block w-1.5 xs:w-2 h-2.5 xs:h-3 bg-[#ffd000] ml-1 animate-pulse" />
            ) : (
              /* Sequential animated dots once typing finishes */
              <span className="inline-flex w-6 xs:w-7 text-left pl-1 text-white tracking-widest font-black">
                {".".repeat(dotCount)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
