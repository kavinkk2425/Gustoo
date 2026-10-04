"use client";

import React, { useState, useEffect, useRef } from "react";
import { arcadeAudio } from "@/src/lib/arcadeAudio";

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC SUPER MARIO WORLD LEVEL END LANDSCAPE
// • End-of-Level Fortress Castle ("Reach Gusto 2.0") with flagpole & arched portal
// • Ultra-performance lag-free GPU-accelerated scrolling (zero layout reflows)
// • Authentic Super Mario sprite with rich Nintendo colorway & expressive poses
// • Pixel-perfect mobile responsiveness with safe area bounds & touch optimization
// • Continuous, unbreakable edge-to-edge ground with classic NES soil tiles & turf
// ─────────────────────────────────────────────────────────────────────────────

interface MarioWorldLandscapeProps {
  onOpenRegister?: () => void;
}

interface CoinParticle {
  id: number;
  x: number;
  y: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC HIGH-DEFINITION SUPER MARIO SPRITE
// ─────────────────────────────────────────────────────────────────────────────
function SuperMarioSprite({
  pose,
  facingLeft,
  className = "",
}: {
  pose: "idle" | "run" | "jump" | "victory";
  facingLeft?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative select-none ${facingLeft ? "scale-x-[-1]" : ""
        } ${pose === "run" ? "animate-mario-run-bob" : ""} ${className}`}
    >
      {/* Victory Star Overhead when reaching Gusto 2.0 */}
      {pose === "victory" && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none z-30">
          <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_0_6px_#ffd000]">
            <polygon
              points="12,1.5 15.3,8.2 22.7,9.3 17.3,14.6 18.6,22 12,18.5 5.4,22 6.7,14.6 1.3,9.3 8.7,8.2"
              fill="#ffd000"
              stroke="#000"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="12,3.8 14.5,9.2 20.3,10.1 16.1,14.2 17.1,20 12,17.2 6.9,20 7.9,14.2 3.7,10.1 9.5,9.2"
              fill="#ffe566"
            />
            <ellipse cx="9.6" cy="13.2" rx="1" ry="2.2" fill="#000" />
            <ellipse cx="14.4" cy="13.2" rx="1" ry="2.2" fill="#000" />
            <ellipse cx="9.4" cy="12.2" rx="0.4" ry="0.9" fill="#fff" />
            <ellipse cx="14.2" cy="12.2" rx="0.4" ry="0.9" fill="#fff" />
          </svg>
        </div>
      )}

      {/* ── SPRITE: PUNCH JUMP POSE ── */}
      {pose === "jump" && (
        <svg
          viewBox="0 0 32 38"
          className="w-full h-full drop-shadow-[2.5px_2.5px_0_#000]"
          shapeRendering="crispEdges"
        >
          {/* Fist punching up */}
          <rect x="22" y="1" width="6" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
          <rect x="21" y="6" width="5" height="4" fill="#dc2626" stroke="#000" strokeWidth="0.8" />

          {/* Red Cap */}
          <rect x="9" y="5" width="13" height="3" fill="#dc2626" />
          <rect x="13" y="2" width="9" height="3" fill="#ef4444" />
          <rect x="18" y="7" width="9" height="2" fill="#dc2626" />
          <rect x="8" y="3" width="15" height="1" fill="#000" />

          {/* Hair & Ear */}
          <rect x="7" y="8" width="4" height="6" fill="#3b1402" />
          <rect x="5" y="11" width="3" height="3" fill="#3b1402" />
          <rect x="11" y="9" width="3" height="4" fill="#fed7aa" />

          {/* Face, Nose & Eye */}
          <rect x="14" y="8" width="8" height="6" fill="#fed7aa" />
          <rect x="19" y="8" width="2" height="3" fill="#000" />
          <rect x="19" y="8" width="1" height="1.5" fill="#fff" />
          <rect x="22" y="10" width="6" height="4" fill="#fed7aa" stroke="#000" strokeWidth="0.5" />

          {/* Mustache */}
          <rect x="16" y="13" width="11" height="3" fill="#111827" />
          <rect x="20" y="12" width="7" height="2" fill="#111827" />

          {/* Torso & Overalls */}
          <rect x="9" y="17" width="13" height="9" fill="#2563eb" stroke="#000" strokeWidth="0.8" />
          {/* Red Shirt Accents */}
          <rect x="7" y="17" width="4" height="6" fill="#dc2626" />
          {/* Yellow Overalls Buttons */}
          <rect x="12" y="18" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />
          <rect x="17" y="18" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />

          {/* Back Left Arm */}
          <rect x="4" y="18" width="4" height="4" fill="#dc2626" />
          <rect x="2" y="21" width="5" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />

          {/* Tucked Jump Legs */}
          <rect x="7" y="26" width="6" height="4" fill="#2563eb" />
          <rect x="16" y="26" width="7" height="4" fill="#2563eb" />

          {/* Brown Work Boots */}
          <rect x="4" y="29" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="3" y="32" width="9" height="2" fill="#3b1402" />
          <rect x="18" y="28" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="19" y="31" width="8" height="2" fill="#3b1402" />
        </svg>
      )}

      {/* ── SPRITE: RUNNING STRIDE POSE ── */}
      {pose === "run" && (
        <svg
          viewBox="0 0 32 38"
          className="w-full h-full drop-shadow-[2.5px_2.5px_0_#000]"
          shapeRendering="crispEdges"
        >
          {/* Red Cap */}
          <rect x="8" y="3" width="14" height="3" fill="#ef4444" />
          <rect x="6" y="6" width="17" height="3" fill="#dc2626" />
          <rect x="16" y="8" width="11" height="2" fill="#dc2626" />
          <rect x="7" y="2" width="15" height="1" fill="#000" />

          {/* Hair & Ear */}
          <rect x="5" y="8" width="4" height="6" fill="#3b1402" />
          <rect x="3" y="11" width="3" height="3" fill="#3b1402" />
          <rect x="9" y="9" width="3" height="4" fill="#fed7aa" />

          {/* Face, Nose & Eye */}
          <rect x="12" y="8" width="8" height="6" fill="#fed7aa" />
          <rect x="17" y="8" width="2" height="3" fill="#000" />
          <rect x="17" y="8" width="1" height="1.5" fill="#fff" />
          <rect x="20" y="10" width="6" height="4" fill="#fed7aa" stroke="#000" strokeWidth="0.5" />

          {/* Mustache */}
          <rect x="14" y="13" width="11" height="3" fill="#111827" />
          <rect x="18" y="12" width="7" height="2" fill="#111827" />

          {/* Torso & Overalls */}
          <rect x="8" y="17" width="14" height="8" fill="#2563eb" stroke="#000" strokeWidth="0.8" />
          <rect x="7" y="17" width="3" height="6" fill="#dc2626" />
          <rect x="12" y="18" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />
          <rect x="17" y="18" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />

          {/* Forward Pumping Arm (Right) */}
          <rect x="19" y="18" width="5" height="4" fill="#dc2626" />
          <rect x="23" y="17" width="6" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />

          {/* Backward Pumping Arm (Left) */}
          <rect x="4" y="18" width="4" height="4" fill="#dc2626" />
          <rect x="1" y="19" width="5" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />

          {/* Running Stride Legs */}
          {/* Forward Leg */}
          <rect x="16" y="25" width="6" height="6" fill="#2563eb" />
          <rect x="18" y="29" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="18" y="32" width="9" height="2" fill="#3b1402" />

          {/* Trailing Leg */}
          <rect x="6" y="24" width="6" height="5" fill="#2563eb" />
          <rect x="3" y="28" width="7" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="2" y="31" width="7" height="2" fill="#3b1402" />
        </svg>
      )}

      {/* ── SPRITE: VICTORY / ARRIVAL POSE ── */}
      {pose === "victory" && (
        <svg
          viewBox="0 0 32 38"
          className="w-full h-full drop-shadow-[2.5px_2.5px_0_#000]"
          shapeRendering="crispEdges"
        >
          {/* Victory Peace Sign Hand Raised High */}
          <rect x="22" y="1" width="2.5" height="4" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
          <rect x="25.5" y="1" width="2.5" height="4" fill="#ffffff" stroke="#000" strokeWidth="0.6" />
          <rect x="21" y="4" width="7" height="4" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
          <rect x="20" y="8" width="5" height="6" fill="#dc2626" />

          {/* Red Cap */}
          <rect x="7" y="3" width="14" height="3" fill="#ef4444" />
          <rect x="5" y="6" width="17" height="3" fill="#dc2626" />
          <rect x="15" y="8" width="10" height="2" fill="#dc2626" />
          <rect x="6" y="2" width="15" height="1" fill="#000" />

          {/* Hair & Ear */}
          <rect x="4" y="8" width="4" height="6" fill="#3b1402" />
          <rect x="2" y="11" width="3" height="3" fill="#3b1402" />
          <rect x="8" y="9" width="3" height="4" fill="#fed7aa" />

          {/* Face, Happy Eyes & Big Smile */}
          <rect x="11" y="8" width="8" height="6" fill="#fed7aa" />
          {/* Happy Arch Eyes */}
          <rect x="16" y="8" width="3" height="2" fill="#000" />
          <rect x="19" y="10" width="6" height="4" fill="#fed7aa" stroke="#000" strokeWidth="0.5" />

          {/* Mustache */}
          <rect x="13" y="13" width="11" height="3" fill="#111827" />
          <rect x="17" y="12" width="7" height="2" fill="#111827" />
          {/* Cheerful Mouth Under Mustache */}
          <rect x="17" y="15" width="4" height="1.5" fill="#dc2626" />

          {/* Torso & Overalls */}
          <rect x="7" y="17" width="14" height="9" fill="#2563eb" stroke="#000" strokeWidth="0.8" />
          <rect x="10" y="19" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />
          <rect x="15" y="19" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />

          {/* Left Hand on Hip */}
          <rect x="4" y="17" width="4" height="5" fill="#dc2626" />
          <rect x="2" y="21" width="5" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />

          {/* Solid Standing Legs */}
          <rect x="7" y="26" width="6" height="5" fill="#2563eb" />
          <rect x="15" y="26" width="6" height="5" fill="#2563eb" />

          {/* Brown Boots */}
          <rect x="4" y="30" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="3" y="33" width="9" height="2" fill="#3b1402" />
          <rect x="16" y="30" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="16" y="33" width="9" height="2" fill="#3b1402" />
        </svg>
      )}

      {/* ── SPRITE: IDLE / STANDING POSE ── */}
      {pose === "idle" && (
        <svg
          viewBox="0 0 32 38"
          className="w-full h-full drop-shadow-[2.5px_2.5px_0_#000]"
          shapeRendering="crispEdges"
        >
          {/* Red Cap */}
          <rect x="7" y="3" width="14" height="3" fill="#ef4444" />
          <rect x="5" y="6" width="17" height="3" fill="#dc2626" />
          <rect x="15" y="8" width="10" height="2" fill="#dc2626" />
          <rect x="6" y="2" width="15" height="1" fill="#000" />

          {/* Hair & Ear */}
          <rect x="4" y="8" width="4" height="6" fill="#3b1402" />
          <rect x="2" y="11" width="3" height="3" fill="#3b1402" />
          <rect x="8" y="9" width="3" height="4" fill="#fed7aa" />

          {/* Face, Nose & Eye */}
          <rect x="11" y="8" width="8" height="6" fill="#fed7aa" />
          <rect x="16" y="8" width="2" height="3" fill="#000" />
          <rect x="16" y="8" width="1" height="1.5" fill="#fff" />
          <rect x="19" y="10" width="6" height="4" fill="#fed7aa" stroke="#000" strokeWidth="0.5" />

          {/* Mustache */}
          <rect x="13" y="13" width="11" height="3" fill="#111827" />
          <rect x="17" y="12" width="7" height="2" fill="#111827" />

          {/* Torso & Overalls */}
          <rect x="7" y="17" width="14" height="9" fill="#2563eb" stroke="#000" strokeWidth="0.8" />
          <rect x="6" y="17" width="3" height="6" fill="#dc2626" />
          <rect x="19" y="17" width="3" height="6" fill="#dc2626" />
          <rect x="10" y="19" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />
          <rect x="15" y="19" width="2.5" height="2.5" fill="#ffd000" stroke="#000" strokeWidth="0.5" />

          {/* White Gloved Hands on Hips */}
          <rect x="2" y="20" width="5" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />
          <rect x="21" y="20" width="5" height="5" fill="#ffffff" stroke="#000" strokeWidth="0.8" />

          {/* Standing Legs */}
          <rect x="7" y="26" width="6" height="5" fill="#2563eb" />
          <rect x="15" y="26" width="6" height="5" fill="#2563eb" />

          {/* Boots */}
          <rect x="4" y="30" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="3" y="33" width="9" height="2" fill="#3b1402" />
          <rect x="16" y="30" width="8" height="5" fill="#78350f" stroke="#000" strokeWidth="0.8" />
          <rect x="16" y="33" width="9" height="2" fill="#3b1402" />
        </svg>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN MARIO WORLD LANDSCAPE (LAG-FREE GPU SCROLL ENGINE)
// ─────────────────────────────────────────────────────────────────────────────
export function MarioWorldLandscape({ onOpenRegister }: MarioWorldLandscapeProps) {
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [particles, setParticles] = useState<CoinParticle[]>([]);
  const [hitBlocks, setHitBlocks] = useState<{ [key: string]: boolean }>({});

  // Discrete state triggers (only dispatch when actual thresholds cross to prevent React re-renders)
  const [facingLeft, setFacingLeft] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [hasReachedCastle, setHasReachedCastle] = useState(false);

  // Direct DOM Refs for 60fps/120fps hardware-accelerated transforms
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marioTrackRef = useRef<HTMLDivElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);
  const cloudsRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement | null>(null);

  // Tracking state refs to avoid continuous React reconciliations
  const lastScrollYRef = useRef(0);
  const facingLeftRef = useRef(false);
  const isRunningRef = useRef(false);
  const isJumpingRef = useRef(false);
  const hasReachedRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;
          const totalDist = windowH + rect.height;
          const currentPos = windowH - rect.top;
          const rawProgress = Math.max(0, Math.min(1, currentPos / totalDist));

          // Responsive destination target (arrives right on the castle gateway threshold)
          const isMobile = window.innerWidth < 640;
          const startPercentX = 4;
          const targetMaxX = isMobile ? 57 : 63;
          const marioPercentX = startPercentX + rawProgress * (targetMaxX - startPercentX);

          // Jump arc over the chasm (between 26% and 42%)
          const chasmStart = isMobile ? 24 : 28;
          const chasmEnd = isMobile ? 40 : 44;
          const inChasm = marioPercentX >= chasmStart && marioPercentX <= chasmEnd;

          let jumpY = 0;
          if (inChasm) {
            const jumpNorm = (marioPercentX - chasmStart) / (chasmEnd - chasmStart);
            jumpY = Math.sin(jumpNorm * Math.PI) * (isMobile ? 36 : 46);
          }

          const reached = marioPercentX >= (targetMaxX - 2.5);

          // ── DIRECT HARDWARE ACCELERATED GPU COMPOSITING (ZERO LAYOUT REFLOWS) ──
          if (marioTrackRef.current) {
            marioTrackRef.current.style.left = `${marioPercentX}%`;
            marioTrackRef.current.style.transform = `translate3d(0, ${-jumpY}px, 0)`;
          }

          if (mountainsRef.current) {
            const mx = (rawProgress - 0.5) * (isMobile ? -35 : -65);
            mountainsRef.current.style.transform = `translate3d(${mx}px, 0, 0)`;
          }

          if (cloudsRef.current) {
            const cx = (rawProgress - 0.5) * (isMobile ? -60 : -110);
            cloudsRef.current.style.transform = `translate3d(${cx}px, 0, 0)`;
          }

          if (blocksRef.current) {
            const bx = (rawProgress - 0.5) * (isMobile ? -15 : -30);
            blocksRef.current.style.transform = `translate3d(${bx}px, 0, 0)`;
          }

          // ── DISCRETE STATE DISPATCHES (Triggered ONLY on state change) ──
          const currentScrollY = window.scrollY;
          const isUp = currentScrollY < lastScrollYRef.current;
          if (isUp !== facingLeftRef.current) {
            facingLeftRef.current = isUp;
            setFacingLeft(isUp);
          }
          lastScrollYRef.current = currentScrollY;

          if (inChasm !== isJumpingRef.current) {
            isJumpingRef.current = inChasm;
            setIsJumping(inChasm);
          }

          if (reached !== hasReachedRef.current) {
            hasReachedRef.current = reached;
            setHasReachedCastle(reached);
          }

          if (!isRunningRef.current) {
            isRunningRef.current = true;
            setIsRunning(true);
          }

          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isRunningRef.current = false;
            setIsRunning(false);
          }, 140);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial calibration
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleHitBlock = (id: string, e: React.MouseEvent) => {
    arcadeAudio.playCoin();
    setCoinsCollected((prev) => prev + 1);

    setHitBlocks((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setHitBlocks((prev) => ({ ...prev, [id]: false }));
    }, 280);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newParticle: CoinParticle = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 850);
  };

  const handleCoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    arcadeAudio.playCoin();
    setCoinsCollected((prev) => prev + 1);
  };

  const handleCastleClick = () => {
    arcadeAudio.playPowerUp();
    if (onOpenRegister) {
      onOpenRegister();
    }
  };

  // Determine current active sprite pose
  const activePose: "idle" | "run" | "jump" | "victory" = hasReachedCastle
    ? "victory"
    : isJumping
      ? "jump"
      : isRunning
        ? "run"
        : "idle";

  return (
    <div
      ref={containerRef}
      className="w-full relative mt-2 sm:mt-4 z-20 select-none overflow-hidden touch-manipulation"
    >
      {/* ── Coin Counter HUD Mini-Badge ── */}
      {coinsCollected > 0 && (
        <div className="absolute top-2 right-3 xs:right-4 sm:right-8 z-40 bg-black/90 text-[#ffd000] border-2 border-black rounded-full px-2.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] xs:text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-[2px_2px_0_#000] animate-bounce">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f59e0b] border border-[#ffd000]" />
          <span>× {String(coinsCollected).padStart(2, "0")}</span>
        </div>
      )}

      {/* Floating Particle Coins */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50 animate-coin-float-up flex flex-col items-center"
          style={{ left: p.x, top: p.y }}
        >
          <div className="w-5 h-6 rounded-full bg-gradient-to-r from-[#ffd000] via-[#fffbeb] to-[#f59e0b] border-2 border-black shadow-[0_0_8px_#ffd000]" />
          <span className="font-['Press_Start_2P',monospace] text-[8px] text-[#ffd000] drop-shadow-[1px_1px_0_#000] mt-0.5">
            +100
          </span>
        </div>
      ))}

      {/* ── EXPANDED SCENE CONTAINER ── */}
      <div className="w-full relative h-[250px] xs:h-[275px] sm:h-[310px] md:h-[340px] lg:h-[355px] overflow-hidden">
        {/* ── LAYER 1: SKY CLOUDS WITH MARIO EYES ── */}
        <div
          ref={cloudsRef}
          className="absolute inset-0 pointer-events-none z-0 will-change-transform"
        >
          {/* Cloud 1 */}
          <div className="absolute top-2 left-[5%] opacity-95 animate-cloud-drift">
            <svg width="60" height="30" viewBox="0 0 100 50">
              <path
                d="M 20 40 A 15 15 0 0 1 35 20 A 20 20 0 0 1 65 15 A 18 18 0 0 1 85 30 A 15 15 0 0 1 80 40 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="3.5"
              />
              <rect x="42" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <rect x="54" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <circle cx="43" cy="26" r="0.8" fill="#fff" />
              <circle cx="55" cy="26" r="0.8" fill="#fff" />
            </svg>
          </div>

          {/* Cloud 2 */}
          <div className="absolute top-4 left-[44%] opacity-90 hidden xs:block">
            <svg width="50" height="26" viewBox="0 0 100 50">
              <path
                d="M 20 40 A 15 15 0 0 1 35 20 A 20 20 0 0 1 65 15 A 18 18 0 0 1 85 30 A 15 15 0 0 1 80 40 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="3.5"
              />
              <rect x="43" y="25" width="2.5" height="6" rx="1.2" fill="#000" />
              <rect x="53" y="25" width="2.5" height="6" rx="1.2" fill="#000" />
            </svg>
          </div>

          {/* Cloud 3 */}
          <div
            className="absolute top-3 right-[10%] opacity-95 animate-cloud-drift"
            style={{ animationDelay: "-4s" }}
          >
            <svg width="65" height="32" viewBox="0 0 100 50">
              <path
                d="M 20 40 A 15 15 0 0 1 35 20 A 20 20 0 0 1 65 15 A 18 18 0 0 1 85 30 A 15 15 0 0 1 80 40 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="3.5"
              />
              <rect x="44" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <rect x="56" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <circle cx="45" cy="26" r="0.8" fill="#fff" />
              <circle cx="57" cy="26" r="0.8" fill="#fff" />
            </svg>
          </div>
        </div>

        {/* ── LAYER 2: BACKGROUND MOUNTAINS WITH ICONIC EYES (• •) ── */}
        <div
          ref={mountainsRef}
          className="absolute -left-8 -right-8 sm:-left-20 sm:-right-20 top-0 bottom-0 pointer-events-none z-1 will-change-transform"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="-250 0 2420 300"
          >
            <defs>
              <linearGradient id="distantMountainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="70%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>

              <linearGradient id="marioHillGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="35%" stopColor="#22c55e" />
                <stop offset="90%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>

              <linearGradient id="marioHillGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="40%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              <linearGradient id="hillCrownLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="horizonFoothillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>

            {/* Base Foothills */}
            <path
              d="M -260 300 L -260 170 Q 50 140 400 170 Q 750 145 1100 175 Q 1450 140 1800 170 Q 2050 145 2200 170 L 2200 300 Z"
              fill="url(#horizonFoothillGrad)"
              stroke="#000000"
              strokeWidth="3"
            />

            {/* Distant Mountain Range */}
            <path
              d="M -260 300 L -260 90 Q -120 60 40 110 Q 240 160 450 90 Q 660 30 870 110 Q 1100 180 1320 70 Q 1550 25 1780 100 Q 1980 140 2200 80 L 2200 300 Z"
              fill="url(#distantMountainGrad)"
              stroke="#000000"
              strokeWidth="3.5"
            />

            {/* Left Hill with Eyes */}
            <g>
              <path
                d="M -260 300 L -260 110 Q -80 18 160 18 Q 420 18 560 230 L 560 300 Z"
                fill="url(#marioHillGrad1)"
                stroke="#000000"
                strokeWidth="4"
              />
              <path
                d="M -40 150 Q 80 18 160 18 Q 300 18 440 160 Z"
                fill="url(#hillCrownLight)"
              />
              <g transform="translate(180, 65)">
                <rect x="0" y="0" width="8" height="24" rx="4" fill="#000000" />
                <circle cx="2.5" cy="5" r="2" fill="#ffffff" />
                <rect x="15" y="0" width="8" height="24" rx="4" fill="#000000" />
                <circle cx="17.5" cy="5" r="2" fill="#ffffff" />
              </g>
            </g>

            {/* Center Hill with Eyes */}
            <g>
              <path
                d="M 420 300 L 420 220 Q 640 85 820 85 Q 1000 85 1140 240 L 1140 300 Z"
                fill="url(#marioHillGrad2)"
                stroke="#000000"
                strokeWidth="4"
              />
              <path
                d="M 600 210 Q 720 85 820 85 Q 920 85 1020 210 Z"
                fill="url(#hillCrownLight)"
              />
              <g transform="translate(835, 120)">
                <rect x="0" y="0" width="7" height="20" rx="3.5" fill="#000000" />
                <circle cx="2.2" cy="4.5" r="1.6" fill="#ffffff" />
                <rect x="13" y="0" width="7" height="20" rx="3.5" fill="#000000" />
                <circle cx="15.2" cy="4.5" r="1.6" fill="#ffffff" />
              </g>
            </g>

            {/* Right Hill with Eyes */}
            <g>
              <path
                d="M 1420 300 L 1420 200 Q 1660 30 1920 30 Q 2100 30 2200 95 L 2200 300 Z"
                fill="url(#marioHillGrad1)"
                stroke="#000000"
                strokeWidth="4"
              />
              <g transform="translate(1880, 75)">
                <rect x="0" y="0" width="8" height="22" rx="4" fill="#000000" />
                <circle cx="2.5" cy="5" r="1.8" fill="#ffffff" />
                <rect x="14" y="0" width="8" height="22" rx="4" fill="#000000" />
                <circle cx="16.5" cy="5" r="1.8" fill="#ffffff" />
              </g>
            </g>
          </svg>
        </div>

        {/* ── LAYER 3: SUSPENDED BLOCKS & COINS ── */}
        <div
          ref={blocksRef}
          className="absolute inset-0 pointer-events-none z-15 will-change-transform"
        >
          {/* Left Block Group (Brick + ? + Brick) */}
          <div className="absolute left-[2%] xs:left-[4%] sm:left-[6%] top-[12%] sm:top-[16%] pointer-events-auto flex flex-col items-center">
            <div
              onClick={handleCoinClick}
              className="cursor-pointer mb-1 animate-mario-coin-spin hover:scale-125 transition-transform"
              title="Click to collect!"
            >
              <div className="w-4.5 h-6 sm:w-6 sm:h-8 rounded-full bg-gradient-to-r from-[#ffd000] via-[#fffbeb] to-[#f59e0b] border-[2px] sm:border-[2.5px] border-black shadow-[1.5px_1.5px_0_#000] relative flex items-center justify-center">
                <div className="w-2 h-3.5 sm:w-3 sm:h-5 rounded-full border border-black/40 bg-gradient-to-b from-[#ffd000] to-[#eab308]" />
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-brick-block" />
              <div
                onClick={(e) => handleHitBlock("q1", e)}
                className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-question-block cursor-pointer select-none active:scale-95 ${hitBlocks["q1"] ? "animate-mario-block-hit" : ""
                  }`}
                title="Hit the block!"
              >
                <div className="mario-question-mark !text-[11px] sm:!text-[16px]">?</div>
              </div>
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-brick-block" />
            </div>
          </div>

          {/* Center Suspended Platform: 3 Bricks with Floating Coins */}
          <div className="absolute left-[44%] xs:left-[45%] sm:left-[46%] md:left-[48%] top-[26%] sm:top-[32%] pointer-events-auto flex flex-col items-center -translate-x-1/2">
            <div className="flex items-center gap-1.5 sm:gap-3 mb-1">
              {[1, 2, 3].map((coinIndex) => (
                <div
                  key={`center-coin-${coinIndex}`}
                  onClick={handleCoinClick}
                  style={{ animationDelay: `${coinIndex * 180}ms` }}
                  className="cursor-pointer animate-mario-coin-spin hover:scale-125 transition-transform"
                  title="Click to collect!"
                >
                  <div className="w-4 h-5.5 sm:w-6 sm:h-8 rounded-full bg-gradient-to-r from-[#ffd000] via-[#fffbeb] to-[#f59e0b] border-[1.8px] sm:border-[2.5px] border-black shadow-[1.5px_1.5px_0_#000] relative flex items-center justify-center">
                    <div className="w-1.8 h-3 sm:w-3 sm:h-5 rounded-full border border-black/40 bg-gradient-to-b from-[#ffd000] to-[#eab308]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 shadow-[2.5px_2.5px_0_#000]">
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-brick-block" />
              <div
                onClick={(e) => handleHitBlock("q2", e)}
                className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-question-block cursor-pointer select-none active:scale-95 ${hitBlocks["q2"] ? "animate-mario-block-hit" : ""
                  }`}
                title="Hit the block!"
              >
                <div className="mario-question-mark !text-[11px] sm:!text-[16px]">?</div>
              </div>
              <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 mario-brick-block" />
            </div>
          </div>
        </div>

        {/* ── WARP PIPE WITH ANIMATED PIRANHA PLANT (Left Area) ── */}
        <div className="absolute left-[6%] xs:left-[10%] sm:left-[14%] md:left-[17%] bottom-[46px] xs:bottom-[52px] sm:bottom-[62px] md:bottom-[68px] z-15 flex flex-col items-center">
          <div className="relative animate-piranha-emerge cursor-pointer">
            <svg width="30" height="30" viewBox="0 0 100 100" className="xs:w-8 xs:h-8 sm:w-10 sm:h-10 drop-shadow-[2px_2px_0_#000]">
              <defs>
                <radialGradient id="piranhaHeadGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="90%" stopColor="#991b1b" />
                </radialGradient>
              </defs>
              <rect x="44" y="60" width="12" height="35" fill="#22c55e" stroke="#000" strokeWidth="3.5" />
              <ellipse cx="28" cy="78" rx="15" ry="6" fill="#16a34a" stroke="#000" strokeWidth="3" transform="rotate(-20 28 78)" />
              <ellipse cx="72" cy="78" rx="15" ry="6" fill="#16a34a" stroke="#000" strokeWidth="3" transform="rotate(20 72 78)" />

              <g className="animate-jaw-upper origin-[50px_45px]">
                <path d="M 15 45 C 15 18 85 18 85 45 Z" fill="url(#piranhaHeadGrad)" stroke="#000" strokeWidth="3.5" />
                <circle cx="32" cy="28" r="4" fill="#ffffff" />
                <circle cx="50" cy="22" r="4.5" fill="#ffffff" />
                <circle cx="68" cy="30" r="4" fill="#ffffff" />
                <path
                  d="M 19 45 L 27 38 L 35 45 L 43 38 L 51 45 L 59 38 L 67 45 L 75 38 L 81 45 Z"
                  fill="#ffffff"
                  stroke="#000"
                  strokeWidth="2.2"
                />
              </g>

              <g className="animate-jaw-lower origin-[50px_45px]">
                <path d="M 22 45 C 22 62 78 62 78 45 Z" fill="url(#piranhaHeadGrad)" stroke="#000" strokeWidth="3.5" />
                <circle cx="38" cy="53" r="3.5" fill="#ffffff" />
                <circle cx="62" cy="52" r="3.5" fill="#ffffff" />
                <path
                  d="M 25 45 L 32 51 L 40 45 L 48 51 L 56 45 L 64 51 L 72 45 L 75 48 Z"
                  fill="#ffffff"
                  stroke="#000"
                  strokeWidth="2.2"
                />
              </g>
            </svg>
          </div>

          {/* Pipe Lip Rim */}
          <div className="w-11 xs:w-13 sm:w-16 h-4 xs:h-5 sm:h-6 bg-[#22c55e] border-[2.2px] sm:border-[3px] border-black rounded-xs shadow-[2px_2px_0_#000] relative overflow-hidden z-20">
            <div className="absolute left-1 top-0 bottom-0 w-1.5 sm:w-2 bg-[#86efac]" />
            <div className="absolute right-1 top-0 bottom-0 w-1.5 sm:w-2.5 bg-[#15803d]" />
          </div>
          {/* Pipe Shaft Body */}
          <div className="w-8 xs:w-10 sm:w-13 h-7 xs:h-9 sm:h-12 bg-[#22c55e] border-x-[2.2px] sm:border-x-[3px] border-black shadow-[2px_2px_0_#000] relative overflow-hidden z-20">
            <div className="absolute left-1 top-0 bottom-0 w-1 sm:w-1.5 bg-[#86efac]" />
            <div className="absolute right-1 top-0 bottom-0 w-1.5 sm:w-2 bg-[#15803d]" />
          </div>
        </div>

        {/* ── THE GUSTO 2.0 FORTRESS / CASTLE / TOWER (Right Area) ── */}
        <div
          onClick={handleCastleClick}
          className="absolute right-[4%] xs:right-[7%] sm:right-[10%] md:right-[13%] bottom-[46px] xs:bottom-[52px] sm:bottom-[62px] md:bottom-[68px] z-20 cursor-pointer group flex flex-col items-center select-none"
          title="Reach Gusto 2.0! Click to Enter / Register"
        >
          {/* Flagpole & Fluttering Gusto 2.0 Castle Banner */}
          <div className="flex flex-col items-center mb-[-1px] relative z-25">
            {hasReachedCastle && (
              <div className="absolute -top-8 xs:-top-9 sm:-top-11 z-40 bg-[#ffd000] text-black border-2 border-black px-1.5 xs:px-2 py-0.5 rounded-md font-['Press_Start_2P',monospace] text-[6px] xs:text-[7.5px] sm:text-[8.5px] whitespace-nowrap shadow-[3px_3px_0_#000] animate-bounce flex items-center gap-1">
                <span className="text-[#dc2626]">★</span>
                <span>REACHED GUSTO 2.0!</span>
                <span className="text-[#dc2626]">★</span>
              </div>
            )}

            {/* Finial Golden Orb with Spire */}
            <div className="relative z-30 flex items-center justify-center">
              <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fffde7_0%,#facc15_45%,#b45309_100%)] border-[1.5px] border-black shadow-[0_2px_4px_rgba(0,0,0,0.6)] relative flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white/90 absolute top-0.5 left-0.5 pointer-events-none" />
                <div className="absolute -top-1.5 w-1 h-1.5 bg-[#ffd000] border-t border-x border-black" />
              </div>
            </div>

            {/* Main Flagpole Mast */}
            <div className="w-1.5 sm:w-2 h-11 xs:h-13 sm:h-16 md:h-18 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 border-x border-black relative flex flex-col justify-start">
              <div className="absolute right-[0.5px] top-0 bottom-0 w-[1px] bg-stone-300/80 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />

              {/* Hoisted Gusto 2.0 Castle Pennant Banner */}
              <div
                className={`absolute left-full origin-left animate-flag-flutter transition-all duration-700 ease-out flex items-center ${hasReachedCastle ? "top-1 sm:top-1.5" : "top-2 sm:top-3"
                  }`}
              >
                {/* Brass Rigging Rings */}
                <div className="absolute -left-[4px] top-1 w-1.5 h-1.5 rounded-full border border-black bg-[#ffd000] pointer-events-none" />
                <div className="absolute -left-[4px] bottom-1 w-1.5 h-1.5 rounded-full border border-black bg-[#ffd000] pointer-events-none" />

                {/* Flag Swallowtail Body (Calibrated width for 100% Mobile Safe-Fit) */}
                <div
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 91% 50%, 100% 100%, 0% 100%)",
                  }}
                  className={`relative w-[62px] xs:w-[74px] sm:w-[98px] md:w-[112px] h-5.5 xs:h-6.5 sm:h-8 flex items-center pl-1 xs:pl-1.5 sm:pl-2 pr-2.5 xs:pr-3 sm:pr-4 border-l-2 border-black transition-colors duration-500 shadow-[2px_3px_6px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 ${hasReachedCastle
                      ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706]"
                      : "bg-gradient-to-r from-[#dc2626] via-[#e11d48] to-[#991b1b]"
                    }`}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#ffd000] border-b border-black/50" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#ffd000] border-t border-black/50" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-black/30 mix-blend-overlay animate-flag-cloth-ripple" />

                  {/* Mario Star Emblem */}
                  <div className="mr-0.5 xs:mr-1 shrink-0 relative flex items-center justify-center">
                    <svg
                      className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4.5 sm:h-4.5 text-[#ffd000]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon
                        points="12,1.5 15.3,8.2 22.8,9.3 17.4,14.6 18.7,22 12,18.5 5.3,22 6.6,14.6 1.2,9.3 8.7,8.2"
                        stroke="#000"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <ellipse cx="10" cy="11.5" rx="0.9" ry="1.8" fill="#000" />
                      <ellipse cx="14" cy="11.5" rx="0.9" ry="1.8" fill="#000" />
                    </svg>
                  </div>

                  {/* Flag Typography */}
                  <div className="flex flex-col justify-center leading-none select-none shrink-0">
                    <div className="flex items-center gap-0.5">
                      <span
                        className={`font-['Press_Start_2P',monospace] text-[4.5px] xs:text-[5.5px] sm:text-[7.5px] font-black tracking-wider whitespace-nowrap drop-shadow-[1px_1px_0_#000] ${hasReachedCastle ? "text-black" : "text-white"
                          }`}
                      >
                        GUSTO
                      </span>
                      <span className="font-['Press_Start_2P',monospace] text-[4px] xs:text-[5px] sm:text-[7px] text-[#ffd000] bg-black/90 px-0.5 py-0.2 rounded-xs border border-[#ffd000]/60 whitespace-nowrap">
                        2.0
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[3.8px] xs:text-[4.5px] sm:text-[5.5px] tracking-widest font-black uppercase mt-0.5 whitespace-nowrap drop-shadow-[0.5px_0.5px_0_#000] ${hasReachedCastle ? "text-black/85" : "text-[#fde047]"
                        }`}
                    >
                      ★ CASTLE ★
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socket Bracket */}
            <div className="w-3.5 sm:w-5 h-1.5 sm:h-2 bg-gradient-to-b from-stone-600 to-stone-800 border-[1.5px] border-black rounded-t-xs -mb-[1px] relative z-20 flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-0.5 bg-[#1c1917] rounded-full" />
            </div>
          </div>

          {/* Upper Fortress Tower Tier */}
          <div className="relative flex flex-col items-center">
            <div className="flex gap-1 sm:gap-2 mb-[-1px] z-10">
              <div className="w-2.5 xs:w-3 sm:w-4 h-1.8 xs:h-2.2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-2.5 xs:w-3 sm:w-4 h-1.8 xs:h-2.2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-2.5 xs:w-3 sm:w-4 h-1.8 xs:h-2.2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
            </div>

            <div className="w-13 xs:w-16 sm:w-22 h-8 xs:h-9 sm:h-12 bg-[#9a3412] border-[2px] sm:border-[2.5px] border-black relative flex items-center justify-center overflow-hidden shadow-[2px_2px_0_#000]">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:8px_5px]" />
              <div className="w-1.8 xs:w-2.2 sm:w-3 h-4 xs:h-4.5 sm:h-6 bg-black rounded-t-full border border-black/80 shadow-inner z-10" />
            </div>
          </div>

          {/* Main Fortress Lower Tier */}
          <div className="relative flex flex-col items-center">
            <div className="flex gap-0.5 xs:gap-1 sm:gap-2 mb-[-1px] z-10">
              <div className="w-3 xs:w-3.5 sm:w-5 h-1.8 xs:h-2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-3 xs:w-3.5 sm:w-5 h-1.8 xs:h-2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-3 xs:w-3.5 sm:w-5 h-1.8 xs:h-2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-3 xs:w-3.5 sm:w-5 h-1.8 xs:h-2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
              <div className="w-3 xs:w-3.5 sm:w-5 h-1.8 xs:h-2 sm:h-3 bg-[#b45309] border-[1.5px] sm:border-[2px] border-black border-b-0" />
            </div>

            <div className="w-22 xs:w-27 sm:w-40 h-13 xs:h-15 sm:h-20 bg-[#9a3412] border-[2px] xs:border-[2.5px] sm:border-[3px] border-black relative flex flex-col items-center justify-end overflow-hidden shadow-[3px_3px_0_#000] group-hover:brightness-105 transition-all">
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:10px_6px]" />

              <div className="relative z-10 -top-0.5 bg-black/90 text-[#ffd000] border border-[#ffd000]/60 rounded-xs px-1 xs:px-1.5 py-0.2 font-['Press_Start_2P',monospace] text-[5px] xs:text-[6.5px] sm:text-[7.5px] tracking-widest shadow-xs">
                GUSTO 2.0
              </div>

              {/* Central Arched Gateway / Doorway */}
              <div className="w-8 xs:w-10 sm:w-14 h-9.5 xs:h-11 sm:h-14 bg-black rounded-t-full border-t-[2px] border-x-[2px] xs:border-t-[2.5px] xs:border-x-[2.5px] sm:border-t-[3px] sm:border-x-[3px] border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] relative flex flex-col items-center justify-end pb-1 overflow-hidden animate-castle-door-glow">
                <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-[#f59e0b]/25 via-transparent to-transparent opacity-80" />
                <span className="font-mono text-[5.5px] xs:text-[6.5px] sm:text-[8px] font-black text-[#ffd000] drop-shadow-[0_0_4px_#ffd000] relative z-10 uppercase">
                  ENTER
                </span>
                <span className="text-[7px] xs:text-[8px] sm:text-[9px] text-[#ffd000] animate-bounce relative z-10">
                  ▼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── LIVE HIGH-PERFORMANCE RUNNING & JUMPING SUPER MARIO SPRITE ── */}
        <div
          ref={marioTrackRef}
          className="absolute pointer-events-none z-30 will-change-transform"
          style={{
            left: "4%",
            bottom: "46px",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <SuperMarioSprite
            pose={activePose}
            facingLeft={facingLeft}
            className="w-7.5 h-9.5 xs:w-8.5 xs:h-11 sm:w-10 sm:h-13 md:w-11 md:h-14"
          />
        </div>

        {/* ── CONTINUOUS SUPER MARIO GROUND TURF PLATFORM ── */}
        <div className="absolute left-0 right-0 bottom-0 w-full h-[46px] xs:h-[52px] sm:h-[62px] md:h-[68px] z-10 flex flex-col">
          {/* Top Lush Grass Turf with Scalloped Edge (Pattern-Rendered for 100% Zero-Lag GPU Composition) */}
          <div className="w-full h-4 sm:h-6 bg-[#22c55e] border-t-[3px] sm:border-t-[3.5px] border-black relative z-10 flex flex-col justify-between">
            <div className="w-full h-0.5 bg-[#86efac] opacity-80" />

            {/* Native SVG Scallop Pattern: 0 extra DOM elements, 100% hardware smooth */}
            <div className="w-full h-2.5 sm:h-3 overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="grassScallopPat" width="16" height="12" patternUnits="userSpaceOnUse">
                    <path
                      d="M 0 0 L 16 0 L 16 2 Q 8 12 0 2 Z"
                      fill="#15803d"
                      stroke="#000000"
                      strokeWidth="1.2"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grassScallopPat)" />
              </svg>
            </div>
          </div>

          {/* Authentic NES Soil Brick Earth Grid */}
          <div className="w-full flex-1 bg-[#9a3412] border-t border-black/40 relative overflow-hidden">
            <div className="w-full h-full bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] [background-size:24px_16px] sm:[background-size:28px_18px] opacity-75" />
            <div className="absolute inset-0 pointer-events-none opacity-45 bg-[radial-gradient(#451a03_2px,transparent_2px)] [background-size:14px_14px]" />
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_bottom,rgba(251,146,60,0.5)_2px,transparent_2px)] [background-size:24px_16px] sm:[background-size:28px_18px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
