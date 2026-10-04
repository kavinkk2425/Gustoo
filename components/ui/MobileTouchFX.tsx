"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TapEffect {
  id: number;
  x: number;
  y: number;
  label: string;
  color: string;
}

const TAP_LABELS = ["+100", "★", "GUSTO!", "+200", "LEVEL UP!", "✦"];
const TAP_COLORS = ["#ffd000", "#ec4899", "#22c55e", "#00d8f8", "#f97316"];

export function MobileTouchFX() {
  const [effects, setEffects] = useState<TapEffect[]>([]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Only spawn effect for primary pointers
    if (!e.isPrimary) return;

    // Check if clicked element has interactive class or is a tap on mobile
    const x = e.clientX;
    const y = e.clientY;

    const randomLabel = TAP_LABELS[Math.floor(Math.random() * TAP_LABELS.length)];
    const randomColor = TAP_COLORS[Math.floor(Math.random() * TAP_COLORS.length)];

    const newEffect: TapEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      label: randomLabel,
      color: randomColor,
    };

    setEffects((prev) => [...prev.slice(-4), newEffect]);

    // Lightweight subtle haptic feedback for mobile touch
    if (e.pointerType === "touch" && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(8);
    }

    setTimeout(() => {
      setEffects((prev) => prev.filter((item) => item.id !== newEffect.id));
    }, 600);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [handlePointerDown]);

  if (effects.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {effects.map((fx) => (
        <div
          key={fx.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ left: fx.x, top: fx.y }}
        >
          {/* Expanding Neon Shockwave Ring */}
          <div
            className="w-12 h-12 rounded-full border-2 animate-mobile-tap-ripple pointer-events-none absolute -left-6 -top-6"
            style={{ borderColor: fx.color }}
          />

          {/* Floating Retro Coin / Score Label */}
          <div className="flex flex-col items-center animate-mobile-tap-float pointer-events-none">
            <span
              className="font-['Press_Start_2P',monospace] text-[9px] font-black drop-shadow-[1.5px_1.5px_0_#000] tracking-wider whitespace-nowrap"
              style={{ color: fx.color }}
            >
              {fx.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
