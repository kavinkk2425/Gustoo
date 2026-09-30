"use client";

/**
 * ScrollReveal.tsx — GUSTO '26 Gaming-Style Scroll Animation System
 *
 * Variants (all inspired by 3D platformer game design):
 *   "platform-drop"   — element falls down from above and lands with a bounce (like a platform appearing)
 *   "rise-up"         — element rises from below the ground (character spawn)
 *   "slide-left"      — slides in from right, like a level scrolling left
 *   "slide-right"     — slides in from left, like a level scrolling right
 *   "pixel-pop"       — scales from 0 with a spring overshoot (power-up pickup)
 *   "flip-in"         — 3D flip on X axis (card flipping)
 *   "glitch-in"       — quick horizontal glitch then settles (enemy spawn effect)
 *   "stagger-grid"    — children stagger in with small delays (grid of items)
 *   "fade-up"         — simple fade + translate (clean fallback)
 */

import React, { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealVariant =
  | "platform-drop"
  | "rise-up"
  | "slide-left"
  | "slide-right"
  | "pixel-pop"
  | "flip-in"
  | "glitch-in"
  | "stagger-grid"
  | "fade-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;          // ms
  duration?: number;       // ms
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  as?: React.ElementType;
}

// The hidden (before reveal) styles for each variant
const hiddenStyles: Record<RevealVariant, CSSProperties> = {
  "platform-drop":  { opacity: 0, transform: "translateY(-80px) scaleY(0.7)", transformOrigin: "top center" },
  "rise-up":        { opacity: 0, transform: "translateY(90px) scale(0.92)"  },
  "slide-left":     { opacity: 0, transform: "translateX(100px)"             },
  "slide-right":    { opacity: 0, transform: "translateX(-100px)"            },
  "pixel-pop":      { opacity: 0, transform: "scale(0.4) rotate(-6deg)"      },
  "flip-in":        { opacity: 0, transform: "perspective(600px) rotateX(60deg)", transformOrigin: "top center" },
  "glitch-in":      { opacity: 0, transform: "translateX(-18px) skewX(-6deg)" },
  "stagger-grid":   { opacity: 0, transform: "translateY(50px) scale(0.95)"  },
  "fade-up":        { opacity: 0, transform: "translateY(36px)"              },
};

// The visible (after reveal) styles for each variant
const visibleStyles: Record<RevealVariant, CSSProperties> = {
  "platform-drop":  { opacity: 1, transform: "translateY(0) scaleY(1)"                          },
  "rise-up":        { opacity: 1, transform: "translateY(0) scale(1)"                           },
  "slide-left":     { opacity: 1, transform: "translateX(0)"                                    },
  "slide-right":    { opacity: 1, transform: "translateX(0)"                                    },
  "pixel-pop":      { opacity: 1, transform: "scale(1) rotate(0deg)"                            },
  "flip-in":        { opacity: 1, transform: "perspective(600px) rotateX(0deg)"                 },
  "glitch-in":      { opacity: 1, transform: "translateX(0) skewX(0deg)"                        },
  "stagger-grid":   { opacity: 1, transform: "translateY(0) scale(1)"                           },
  "fade-up":        { opacity: 1, transform: "translateY(0)"                                    },
};

// Per-variant easing and duration multipliers
const timingMap: Record<RevealVariant, { easing: string; durationScale: number }> = {
  "platform-drop": { easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", durationScale: 1.1 },
  "rise-up":       { easing: "cubic-bezier(0.22, 1, 0.36, 1)",     durationScale: 1.0 },
  "slide-left":    { easing: "cubic-bezier(0.22, 1, 0.36, 1)",     durationScale: 0.9 },
  "slide-right":   { easing: "cubic-bezier(0.22, 1, 0.36, 1)",     durationScale: 0.9 },
  "pixel-pop":     { easing: "cubic-bezier(0.34, 1.72, 0.64, 1)",  durationScale: 0.85},
  "flip-in":       { easing: "cubic-bezier(0.25, 1, 0.5, 1)",      durationScale: 1.0 },
  "glitch-in":     { easing: "cubic-bezier(0.16, 1, 0.3, 1)",      durationScale: 0.7 },
  "stagger-grid":  { easing: "cubic-bezier(0.22, 1, 0.36, 1)",     durationScale: 0.9 },
  "fade-up":       { easing: "cubic-bezier(0.22, 1, 0.36, 1)",     durationScale: 1.0 },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 650,
  className = "",
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
  once = true,
  as: Tag = "div",
}: ScrollRevealProps) {
  const [ref, inView] = useScrollReveal({ threshold, rootMargin, once });

  const { easing, durationScale } = timingMap[variant];
  const finalDuration = Math.round(duration * durationScale);

  const style: CSSProperties = {
    ...(inView ? visibleStyles[variant] : hiddenStyles[variant]),
    transition: `opacity ${finalDuration}ms ${easing} ${delay}ms,
                 transform ${finalDuration}ms ${easing} ${delay}ms`,
    willChange: "transform, opacity",
  };

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} style={style} className={className}>
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SectionDivider — animated "level ground" tile divider between sections
// ─────────────────────────────────────────────────────────────────────────────
interface SectionDividerProps {
  variant?: "ground" | "level-up" | "warp";
  className?: string;
}

export function SectionDivider({ variant = "ground", className = "" }: SectionDividerProps) {
  const [ref, inView] = useScrollReveal({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height: "56px" }}
    >
      {variant === "ground" && (
        <div
          className="absolute inset-0 flex items-end"
          style={{
            transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
            transform: inView ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {/* Repeating neo-brutalist ground tiles */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-l-[2px] border-black"
              style={{
                height: i % 3 === 0 ? "44px" : i % 3 === 1 ? "36px" : "28px",
                backgroundColor: i % 4 === 0 ? "#3b0764" : i % 4 === 1 ? "#ec4899" : i % 4 === 2 ? "#84cc16" : "#06b6d4",
                transition: `transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 28}ms`,
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>
      )}

      {variant === "level-up" && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 overflow-hidden">
          {["L", "E", "V", "E", "L", " ", "U", "P", "!"].map((ch, i) => (
            <span
              key={i}
              className="text-xs font-black text-[#3b0764] uppercase tracking-widest"
              style={{
                transition: `opacity 0.4s ease ${i * 60}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.5)",
              }}
            >
              {ch === " " ? "\u00A0\u00A0" : ch}
            </span>
          ))}
        </div>
      )}

      {variant === "warp" && (
        <div
          className="absolute inset-x-0 bottom-0 h-full bg-[#3b0764] flex items-center justify-center"
          style={{
            clipPath: inView
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            transition: "clip-path 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="flex gap-3"
            style={{
              transition: "opacity 0.4s ease 0.35s",
              opacity: inView ? 1 : 0,
            }}
          >
            {["★", "◆", "★"].map((s, i) => (
              <span key={i} className="text-[#fde047] text-xs font-black animate-pulse">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StaggerChildren — wraps children and staggers their reveal with delays
// ─────────────────────────────────────────────────────────────────────────────
interface StaggerChildrenProps {
  children: ReactNode[];
  baseDelay?: number;   // delay before first child (ms)
  stagger?: number;     // additional delay per child (ms)
  variant?: RevealVariant;
  className?: string;
}

export function StaggerChildren({
  children,
  baseDelay = 0,
  stagger = 100,
  variant = "rise-up",
  className = "",
}: StaggerChildrenProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          variant={variant}
          delay={baseDelay + i * stagger}
          threshold={0.08}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
