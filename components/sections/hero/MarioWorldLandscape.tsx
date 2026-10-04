"use client";

import React, { useState, useEffect, useRef } from "react";
import { arcadeAudio } from "@/src/lib/arcadeAudio";

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC SUPER MARIO BROS LEVEL END LANDSCAPE
// • End-of-Level Fortress Castle ("Reach the place Gusto 2.0") with flagpole & arched portal
// • Fully covered realistic background mountains with iconic Mario eyes (• •) & bushes
// • Continuous, unbreakable edge-to-edge ground with classic NES soil tiles & scalloped turf
// • Compact proportioned scale (~250px-270px height) to keep Hero well-balanced
// • Scroll-driven running & jumping pixel Mario journey towards the Gusto 2.0 tower
// ─────────────────────────────────────────────────────────────────────────────

interface MarioWorldLandscapeProps {
  onOpenRegister?: () => void;
}

interface CoinParticle {
  id: number;
  x: number;
  y: number;
}

// ── Compact Pixel Mario Sprite ──
function CompactMario({
  isJumping,
  isRunning,
  facingLeft,
}: {
  isJumping: boolean;
  isRunning: boolean;
  facingLeft: boolean;
}) {
  return (
    <svg
      width="28"
      height="36"
      viewBox="0 0 16 16"
      className={`drop-shadow-[2px_2px_0_#000] transition-transform duration-75 ${
        facingLeft ? "scale-x-[-1]" : ""
      } ${isRunning && !isJumping ? "animate-mario-run-bob" : ""}`}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Cap */}
      <rect x="3" y="1" width="5" height="1" fill="#dc2626" />
      <rect x="2" y="2" width="9" height="1" fill="#dc2626" />

      {/* Face & Hair */}
      <rect x="2" y="3" width="3" height="1" fill="#581c87" />
      <rect x="5" y="3" width="2" height="1" fill="#fcd34d" />
      <rect x="7" y="3" width="1" height="1" fill="#000" />
      <rect x="8" y="3" width="1" height="1" fill="#fcd34d" />

      <rect x="1" y="4" width="1" height="2" fill="#581c87" />
      <rect x="2" y="4" width="1" height="1" fill="#581c87" />
      <rect x="3" y="4" width="3" height="1" fill="#fcd34d" />
      <rect x="6" y="4" width="1" height="1" fill="#000" />
      <rect x="7" y="4" width="3" height="1" fill="#fcd34d" />

      {/* Mustache */}
      <rect x="2" y="5" width="2" height="1" fill="#581c87" />
      <rect x="4" y="5" width="4" height="1" fill="#fcd34d" />
      <rect x="8" y="5" width="4" height="1" fill="#000" />

      <rect x="3" y="6" width="6" height="1" fill="#fcd34d" />
      <rect x="5" y="6" width="3" height="1" fill="#000" />

      {/* Shirt & Overalls */}
      <rect x="3" y="7" width="2" height="1" fill="#dc2626" />
      <rect x="5" y="7" width="1" height="1" fill="#2563eb" />
      <rect x="6" y="7" width="2" height="1" fill="#dc2626" />

      <rect x="2" y="8" width="3" height="1" fill="#dc2626" />
      <rect x="5" y="8" width="1" height="1" fill="#2563eb" />
      <rect x="6" y="8" width="1" height="1" fill="#facc15" />
      <rect x="7" y="8" width="2" height="1" fill="#dc2626" />

      <rect x="1" y="9" width="3" height="1" fill="#dc2626" />
      <rect x="4" y="9" width="4" height="1" fill="#2563eb" />
      <rect x="8" y="9" width="2" height="1" fill="#dc2626" />

      <rect x="3" y="10" width="6" height="2" fill="#2563eb" />
      <rect x="1" y="10" width="2" height="2" fill="#ffffff" stroke="#000" strokeWidth="0.2" />
      <rect x="9" y="10" width="2" height="2" fill="#ffffff" stroke="#000" strokeWidth="0.2" />

      {/* Legs & Shoes */}
      {isJumping ? (
        <>
          <rect x="2" y="12" width="3" height="1" fill="#2563eb" />
          <rect x="7" y="12" width="3" height="1" fill="#2563eb" />
          <rect x="1" y="13" width="3" height="2" fill="#713f12" />
          <rect x="8" y="13" width="3" height="2" fill="#713f12" />
        </>
      ) : isRunning ? (
        <>
          <rect x="3" y="12" width="2" height="2" fill="#2563eb" />
          <rect x="7" y="12" width="2" height="1" fill="#2563eb" />
          <rect x="2" y="14" width="3" height="1" fill="#713f12" />
          <rect x="8" y="13" width="3" height="2" fill="#713f12" />
        </>
      ) : (
        <>
          <rect x="3" y="12" width="2" height="2" fill="#2563eb" />
          <rect x="7" y="12" width="2" height="2" fill="#2563eb" />
          <rect x="2" y="14" width="3" height="1" fill="#713f12" />
          <rect x="7" y="14" width="3" height="1" fill="#713f12" />
        </>
      )}
    </svg>
  );
}

export function MarioWorldLandscape({ onOpenRegister }: MarioWorldLandscapeProps) {
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [particles, setParticles] = useState<CoinParticle[]>([]);
  const [hitBlocks, setHitBlocks] = useState<{ [key: string]: boolean }>({});

  // ── Scroll Tracking State for Parallax & Running Mario ──
  const [scrollProgress, setScrollProgress] = useState(0.15);
  const [isScrolling, setIsScrolling] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;

          const totalDist = windowH + rect.height;
          const currentPos = windowH - rect.top;
          const rawProgress = Math.max(0, Math.min(1, currentPos / totalDist));
          setScrollProgress(rawProgress);

          const currentScrollY = window.scrollY;
          if (currentScrollY < lastScrollYRef.current) {
            setFacingLeft(true);
          } else if (currentScrollY > lastScrollYRef.current) {
            setFacingLeft(false);
          }
          lastScrollYRef.current = currentScrollY;

          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 180);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
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
    arcadeAudio.playCoin();
    setCoinsCollected((prev) => prev + 1);
  };

  const handleCastleClick = () => {
    arcadeAudio.playPowerUp();
    if (onOpenRegister) {
      onOpenRegister();
    }
  };

  // Mario runs from 5% to 76% (arriving right in front of the Gusto 2.0 castle portal)
  const marioPercentX = 5 + scrollProgress * 71;
  const hasReachedCastle = marioPercentX >= 70;

  // Jump arc over the chasm (between 36% and 48%)
  const isInChasm = marioPercentX >= 36 && marioPercentX <= 48;
  let jumpOffsetY = 0;
  if (isInChasm) {
    const jumpNormalized = (marioPercentX - 36) / 12;
    jumpOffsetY = -Math.sin(jumpNormalized * Math.PI) * 44;
  }

  // Parallax offsets
  const mountainsParallaxX = (scrollProgress - 0.5) * -70;
  const cloudsParallaxX = (scrollProgress - 0.5) * -120;
  const blocksParallaxX = (scrollProgress - 0.5) * -30;

  return (
    <div
      ref={containerRef}
      className="w-full relative mt-2 sm:mt-4 z-20 select-none overflow-hidden"
    >
      {/* ── Coin Counter HUD Mini-Badge ── */}
      {coinsCollected > 0 && (
        <div className="absolute top-2 right-4 sm:right-8 z-40 bg-black/90 text-[#ffd000] border-2 border-black rounded-full px-2.5 py-0.5 font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-[2px_2px_0_#000] animate-bounce">
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

      {/* ── EXPANDED SCENE CONTAINER (Ensures flag, finial, and sky elements are 100% fully shown) ── */}
      <div className="w-full relative h-[270px] xs:h-[295px] sm:h-[325px] md:h-[350px] lg:h-[365px] overflow-hidden">
        {/* ── LAYER 1: SKY CLOUDS WITH SMILING MARIO EYES ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-transform duration-75"
          style={{ transform: `translate3d(${cloudsParallaxX}px, 0, 0)` }}
        >
          {/* Cloud 1 with Classic Eyes */}
          <div className="absolute top-2 left-[5%] opacity-95 animate-cloud-drift">
            <svg width="65" height="32" viewBox="0 0 100 50">
              <path
                d="M 20 40 A 15 15 0 0 1 35 20 A 20 20 0 0 1 65 15 A 18 18 0 0 1 85 30 A 15 15 0 0 1 80 40 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="3.5"
              />
              {/* Mario Cloud Eyes */}
              <rect x="42" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <rect x="54" y="24" width="3" height="7" rx="1.5" fill="#000" />
              <circle cx="43" cy="26" r="0.8" fill="#fff" />
              <circle cx="55" cy="26" r="0.8" fill="#fff" />
            </svg>
          </div>

          {/* Cloud 2 */}
          <div className="absolute top-4 left-[44%] opacity-90">
            <svg width="55" height="28" viewBox="0 0 100 50">
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
            className="absolute top-3 right-[12%] opacity-95 animate-cloud-drift"
            style={{ animationDelay: "-4s" }}
          >
            <svg width="70" height="34" viewBox="0 0 100 50">
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

          {/* Sunburst Stars */}
          <span className="absolute top-4 left-[22%] text-[#ffd000] text-xs font-bold animate-pulse">✦</span>
          <span className="absolute top-7 left-[36%] text-[#ffd000] text-[10px] font-bold animate-ping opacity-75">✦</span>
          <span className="absolute top-6 right-[38%] text-[#ffd000] text-xs font-bold animate-pulse">✦</span>
        </div>

        {/* ── LAYER 2: REALISTIC FULLY-COVERED BACKGROUND MOUNTAINS WITH ICONIC EYES (• •) ── */}
        <div
          className="absolute -left-12 -right-12 sm:-left-24 sm:-right-24 top-0 bottom-0 pointer-events-none z-1 transition-transform duration-75"
          style={{ transform: `translate3d(${mountainsParallaxX}px, 0, 0)` }}
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="-250 0 2420 300"
          >
            <defs>
              {/* Deep Distant Forest Mountains Gradient */}
              <linearGradient id="distantMountainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="70%" stopColor="#065f46" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>

              {/* Classic Midground Mario Hills Gradient */}
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

              {/* Hill Crown Light Bevel */}
              <linearGradient id="hillCrownLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>

              {/* Low Horizon Foothills Gradient */}
              <linearGradient id="horizonFoothillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>

            {/* ── 0. Continuous Horizon Foothills Base (Edge-to-edge solid green base) ── */}
            <path
              d="M -260 300 L -260 170 Q 50 140 400 170 Q 750 145 1100 175 Q 1450 140 1800 170 Q 2050 145 2200 170 L 2200 300 Z"
              fill="url(#horizonFoothillGrad)"
              stroke="#000000"
              strokeWidth="3"
            />

            {/* ── 1. Distant Mountain Range (Solid edge-to-edge peaks from -260 to 2200) ── */}
            <path
              d="M -260 300 L -260 90 Q -120 60 40 110 Q 240 160 450 90 Q 660 30 870 110 Q 1100 180 1320 70 Q 1550 25 1780 100 Q 1980 140 2200 80 L 2200 300 Z"
              fill="url(#distantMountainGrad)"
              stroke="#000000"
              strokeWidth="3.5"
            />

            {/* ── 2. Left End Anchor Mountain (Solidly fills left boundary from -260 deep off-screen) ── */}
            <g>
              {/* Rounded Hill Body anchoring left edge */}
              <path
                d="M -260 300 L -260 110 Q -80 18 160 18 Q 420 18 560 230 L 560 300 Z"
                fill="url(#marioHillGrad1)"
                stroke="#000000"
                strokeWidth="4"
              />
              {/* Crown Highlight */}
              <path
                d="M -40 150 Q 80 18 160 18 Q 300 18 440 160 Z"
                fill="url(#hillCrownLight)"
              />
              {/* Iconic Mario Eyes (• •) */}
              <g transform="translate(180, 65)">
                <rect x="0" y="0" width="8" height="24" rx="4" fill="#000000" />
                <circle cx="2.5" cy="5" r="2" fill="#ffffff" />
                <rect x="15" y="0" width="8" height="24" rx="4" fill="#000000" />
                <circle cx="17.5" cy="5" r="2" fill="#ffffff" />
              </g>
            </g>

            {/* ── 3. Midground Rolling Hill (Left-Center) with Eyes ── */}
            <g>
              <path
                d="M 420 300 L 420 220 Q 640 85 820 85 Q 1000 85 1140 240 L 1140 300 Z"
                fill="url(#marioHillGrad2)"
                stroke="#000000"
                strokeWidth="4"
              />
              {/* Crown Highlight */}
              <path
                d="M 600 210 Q 720 85 820 85 Q 920 85 1020 210 Z"
                fill="url(#hillCrownLight)"
              />
              {/* Eyes */}
              <g transform="translate(835, 120)">
                <rect x="0" y="0" width="7" height="20" rx="3.5" fill="#000000" />
                <circle cx="2.2" cy="4.5" r="1.6" fill="#ffffff" />
                <rect x="13" y="0" width="7" height="20" rx="3.5" fill="#000000" />
                <circle cx="15.2" cy="4.5" r="1.6" fill="#ffffff" />
              </g>
            </g>

            {/* ── 4. Midground Rolling Hill (Right-Center) ── */}
            <g>
              <path
                d="M 980 300 L 980 230 Q 1160 110 1320 110 Q 1480 110 1600 250 L 1600 300 Z"
                fill="url(#marioHillGrad2)"
                stroke="#000000"
                strokeWidth="4"
              />
              {/* Crown Highlight */}
              <path
                d="M 1140 215 Q 1240 110 1320 110 Q 1400 110 1480 215 Z"
                fill="url(#hillCrownLight)"
              />
              {/* Eyes */}
              <g transform="translate(1335, 142)">
                <rect x="0" y="0" width="6.5" height="18" rx="3.2" fill="#000000" />
                <circle cx="2" cy="4" r="1.5" fill="#ffffff" />
                <rect x="12" y="0" width="6.5" height="18" rx="3.2" fill="#000000" />
                <circle cx="14" cy="4" r="1.5" fill="#ffffff" />
              </g>
            </g>

            {/* ── 5. Right End Anchor Mountain (Solidly fills right boundary to 2200 deep off-screen) ── */}
            <g>
              <path
                d="M 1420 300 L 1420 200 Q 1660 30 1920 30 Q 2100 30 2200 95 L 2200 300 Z"
                fill="url(#marioHillGrad1)"
                stroke="#000000"
                strokeWidth="4"
              />
              {/* Crown Highlight */}
              <path
                d="M 1640 170 Q 1780 30 1920 30 Q 2060 30 2180 140 Z"
                fill="url(#hillCrownLight)"
              />
              {/* Eyes */}
              <g transform="translate(1880, 75)">
                <rect x="0" y="0" width="8" height="22" rx="4" fill="#000000" />
                <circle cx="2.5" cy="5" r="1.8" fill="#ffffff" />
                <rect x="14" y="0" width="8" height="22" rx="4" fill="#000000" />
                <circle cx="16.5" cy="5" r="1.8" fill="#ffffff" />
              </g>
            </g>

            {/* ── 6. Classic Mario Leafy Bushes (Foreground) ── */}
            {/* Bush near left hill */}
            <path
              d="M 380 300 Q 380 255 410 255 Q 435 240 465 255 Q 495 255 495 300 Z"
              fill="#16a34a"
              stroke="#000000"
              strokeWidth="3.5"
            />
            {/* Bush near center */}
            <path
              d="M 740 300 Q 740 260 765 260 Q 790 245 815 260 Q 840 260 840 300 Z"
              fill="#16a34a"
              stroke="#000000"
              strokeWidth="3.5"
            />
            {/* Bush near right castle */}
            <path
              d="M 1250 300 Q 1250 255 1275 255 Q 1300 240 1325 255 Q 1350 255 1350 300 Z"
              fill="#16a34a"
              stroke="#000000"
              strokeWidth="3.5"
            />
          </svg>
        </div>

        {/* ── LAYER 3: SUSPENDED BLOCKS & COINS (Left & Mid-Air) ── */}
        <div
          className="absolute inset-0 pointer-events-none z-15 transition-transform duration-75"
          style={{ transform: `translate3d(${blocksParallaxX}px, 0, 0)` }}
        >
          {/* Left Block Group (Matching Reference: Brick + ? + Brick) */}
          <div className="absolute left-[3%] sm:left-[6%] top-[14%] sm:top-[16%] pointer-events-auto flex flex-col items-center">
            {/* Rotating Gold Coin */}
            <div
              onClick={handleCoinClick}
              className={`cursor-pointer mb-1 animate-mario-coin-spin hover:scale-125 transition-transform ${
                isScrolling ? "[animation-duration:0.8s]" : ""
              }`}
              title="Click to collect!"
            >
              <div className="w-5 h-7 sm:w-6 sm:h-8 rounded-full bg-gradient-to-r from-[#ffd000] via-[#fffbeb] to-[#f59e0b] border-[2.5px] border-black shadow-[1.5px_1.5px_0_#000] relative flex items-center justify-center">
                <div className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-full border border-black/40 bg-gradient-to-b from-[#ffd000] to-[#eab308]" />
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="w-6 h-6 sm:w-7 sm:h-7 mario-brick-block" />
              <div
                onClick={(e) => handleHitBlock("q1", e)}
                className={`w-6 h-6 sm:w-7 sm:h-7 mario-question-block cursor-pointer select-none ${
                  hitBlocks["q1"] ? "animate-mario-block-hit" : ""
                }`}
                title="Hit the block!"
              >
                <div className="mario-question-mark !text-[14px] sm:!text-[16px]">?</div>
                <span className="mario-block-rivet top-0.5 left-0.5 !w-0.5 !h-0.5" />
                <span className="mario-block-rivet top-0.5 right-0.5 !w-0.5 !h-0.5" />
                <span className="mario-block-rivet bottom-0.5 left-0.5 !w-0.5 !h-0.5" />
                <span className="mario-block-rivet bottom-0.5 right-0.5 !w-0.5 !h-0.5" />
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 mario-brick-block" />
            </div>
          </div>

          {/* Center Suspended Platform over Pit: 3 Bricks with Floating Coins */}
          <div className="absolute left-[41%] sm:left-[43%] top-[30%] sm:top-[34%] pointer-events-auto flex flex-col items-center -translate-x-1/2">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              {[1, 2, 3].map((coinIndex) => (
                <div
                  key={`center-coin-${coinIndex}`}
                  onClick={handleCoinClick}
                  style={{ animationDelay: `${coinIndex * 180}ms` }}
                  className={`cursor-pointer animate-mario-coin-spin hover:scale-125 transition-transform ${
                    isScrolling ? "[animation-duration:0.8s]" : ""
                  }`}
                  title="Click to collect!"
                >
                  <div className="w-5 h-7 sm:w-6 sm:h-8 rounded-full bg-gradient-to-r from-[#ffd000] via-[#fffbeb] to-[#f59e0b] border-[2.5px] border-black shadow-[1.5px_1.5px_0_#000] relative flex items-center justify-center">
                    <div className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-full border border-black/40 bg-gradient-to-b from-[#ffd000] to-[#eab308]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 shadow-[2.5px_2.5px_0_#000]">
              <div className="w-6 h-6 sm:w-7 sm:h-7 mario-brick-block" />
              <div
                onClick={(e) => handleHitBlock("q2", e)}
                className={`w-6 h-6 sm:w-7 sm:h-7 mario-question-block cursor-pointer select-none ${
                  hitBlocks["q2"] ? "animate-mario-block-hit" : ""
                }`}
                title="Hit the block!"
              >
                <div className="mario-question-mark !text-[14px] sm:!text-[16px]">?</div>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 mario-brick-block" />
            </div>
          </div>
        </div>

        {/* ── WARP PIPE WITH ANIMATED PIRANHA PLANT (Left Area) ── */}
        <div className="absolute left-[13%] sm:left-[17%] bottom-[54px] sm:bottom-[62px] md:bottom-[68px] z-15 flex flex-col items-center">
          {/* Snapping Piranha Plant */}
          <div className="relative animate-piranha-emerge cursor-pointer">
            <svg width="40" height="40" viewBox="0 0 100 100" className="drop-shadow-[2px_2px_0_#000]">
              <defs>
                <radialGradient id="piranhaHeadGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="90%" stopColor="#991b1b" />
                </radialGradient>
              </defs>

              {/* Stem */}
              <rect x="44" y="60" width="12" height="35" fill="#22c55e" stroke="#000" strokeWidth="3.5" />
              {/* Leaves */}
              <ellipse cx="28" cy="78" rx="15" ry="6" fill="#16a34a" stroke="#000" strokeWidth="3" transform="rotate(-20 28 78)" />
              <ellipse cx="72" cy="78" rx="15" ry="6" fill="#16a34a" stroke="#000" strokeWidth="3" transform="rotate(20 72 78)" />

              {/* Upper Snapping Jaw */}
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

              {/* Lower Snapping Jaw */}
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
          <div className="w-14 sm:w-16 h-5 sm:h-6 bg-[#22c55e] border-[3px] border-black rounded-xs shadow-[2px_2px_0_#000] relative overflow-hidden z-20">
            <div className="absolute left-1.5 top-0 bottom-0 w-2 bg-[#86efac]" />
            <div className="absolute right-1.5 top-0 bottom-0 w-2.5 bg-[#15803d]" />
          </div>
          {/* Pipe Shaft Body */}
          <div className="w-11 sm:w-13 h-10 sm:h-12 bg-[#22c55e] border-x-[3px] border-black shadow-[2px_2px_0_#000] relative overflow-hidden z-20">
            <div className="absolute left-1 top-0 bottom-0 w-1.5 bg-[#86efac]" />
            <div className="absolute right-1 top-0 bottom-0 w-2 bg-[#15803d]" />
          </div>
        </div>

        {/* ── THE GUSTO 2.0 FORTRESS / CASTLE / TOWER (Right Area) ── */}
        {/* User reference: Super Mario Bros End-of-Level Fortress Castle with Flagpole & Arched Portal */}
        <div
          onClick={handleCastleClick}
          className="absolute right-[8%] sm:right-[12%] md:right-[14%] lg:right-[16%] bottom-[54px] sm:bottom-[62px] md:bottom-[68px] z-20 cursor-pointer group flex flex-col items-center select-none"
          title="Reach Gusto 2.0! Click to Enter / Register"
        >
          {/* Flagpole & Fluttering Gusto 2.0 Castle Banner */}
          <div className="flex flex-col items-center mb-[-1px] relative z-25">
            {/* Destination Reach Badge when Mario arrives */}
            {hasReachedCastle && (
              <div className="absolute -top-11 z-40 bg-[#ffd000] text-black border-2 border-black px-2.5 py-0.5 rounded-md font-['Press_Start_2P',monospace] text-[7.5px] sm:text-[8.5px] whitespace-nowrap shadow-[3px_3px_0_#000] animate-bounce flex items-center gap-1.5">
                <span className="text-[#dc2626]">★</span>
                <span>REACHED GUSTO 2.0!</span>
                <span className="text-[#dc2626]">★</span>
              </div>
            )}

            {/* Finial Golden Orb with Gleam & Sparkles */}
            <div className="relative z-30 flex items-center justify-center">
              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fffde7_0%,#facc15_45%,#b45309_100%)] border-[1.5px] border-black shadow-[0_2px_4px_rgba(0,0,0,0.6)] relative flex items-center justify-center">
                {/* Specular gleam */}
                <div className="w-1.5 h-1.5 rounded-full bg-white/90 absolute top-0.5 left-0.5 pointer-events-none" />
                {/* Golden spire needle tip */}
                <div className="absolute -top-1.5 w-1 h-1.5 bg-[#ffd000] border-t border-x border-black" />
              </div>

              {/* Sparkle particles on arrival */}
              {hasReachedCastle && (
                <>
                  <div className="absolute -top-3 -right-2 text-[#ffd000] text-[10px] animate-castle-flag-sparkle select-none pointer-events-none">✦</div>
                  <div className="absolute -top-1 -left-3 text-[#fde047] text-[8px] animate-castle-flag-sparkle select-none pointer-events-none [animation-delay:0.5s]">✧</div>
                </>
              )}
            </div>

            {/* Main Flagpole Mast */}
            <div className="w-1.5 sm:w-2 h-14 sm:h-16 md:h-18 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 border-x border-black relative flex flex-col justify-start">
              {/* Halyard Rigging Rope */}
              <div className="absolute right-[0.5px] top-0 bottom-0 w-[1px] bg-stone-300/80 shadow-[0_0_1px_rgba(0,0,0,0.5)]" />

              {/* Top Pulley Bracket */}
              <div className="absolute top-0 -left-[1.5px] -right-[1.5px] h-1 bg-[#44403c] border-b border-black" />

              {/* Hoisted Gusto 2.0 Castle Pennant Banner */}
              <div
                className={`absolute left-full origin-left animate-flag-flutter transition-all duration-700 ease-out flex items-center ${
                  hasReachedCastle ? "top-1 sm:top-1.5" : "top-2.5 sm:top-3.5"
                }`}
              >
                {/* Brass Rigging Rings (attaching flag to pole) */}
                <div className="absolute -left-[5px] top-1.5 w-2 h-1.5 rounded-full border border-black bg-[#ffd000] shadow-xs pointer-events-none" />
                <div className="absolute -left-[5px] bottom-1.5 w-2 h-1.5 rounded-full border border-black bg-[#ffd000] shadow-xs pointer-events-none" />

                {/* Flag Swallowtail Body */}
                <div
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 91% 50%, 100% 100%, 0% 100%)",
                  }}
                  className={`relative w-[88px] xs:w-[98px] sm:w-[110px] md:w-[118px] h-7 sm:h-8 flex items-center pl-2 pr-3.5 sm:pr-4.5 border-l-2 border-black transition-colors duration-500 shadow-[2px_3px_6px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 ${
                    hasReachedCastle
                      ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706]"
                      : "bg-gradient-to-r from-[#dc2626] via-[#e11d48] to-[#991b1b]"
                  }`}
                >
                  {/* Embroidered Golden Trim (top & bottom borders) */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ffd000] border-b border-black/50" />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffd000] border-t border-black/50" />

                  {/* Dynamic cloth wave sheen ripple overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-black/30 mix-blend-overlay animate-flag-cloth-ripple" />

                  {/* Mario Super Star Emblem with expressive eyes */}
                  <div className="mr-1.5 shrink-0 relative flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ffd000] drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon
                        points="12,1.5 15.3,8.2 22.8,9.3 17.4,14.6 18.7,22 12,18.5 5.3,22 6.6,14.6 1.2,9.3 8.7,8.2"
                        stroke="#000"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      {/* Super Star Oval Eyes */}
                      <ellipse cx="10" cy="11.5" rx="0.9" ry="1.8" fill="#000" />
                      <ellipse cx="14" cy="11.5" rx="0.9" ry="1.8" fill="#000" />
                    </svg>
                  </div>

                  {/* Flag Typography (Press Start 2P) - Guaranteed 100% visible inside the safe area */}
                  <div className="flex flex-col justify-center leading-none select-none shrink-0">
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-['Press_Start_2P',monospace] text-[6.5px] sm:text-[7.5px] font-black tracking-wider whitespace-nowrap drop-shadow-[1px_1px_0_#000] ${
                          hasReachedCastle ? "text-black" : "text-white"
                        }`}
                      >
                        GUSTO
                      </span>
                      <span className="font-['Press_Start_2P',monospace] text-[6px] sm:text-[7px] text-[#ffd000] bg-black/90 px-1 py-0.2 rounded-xs border border-[#ffd000]/60 drop-shadow-xs whitespace-nowrap">
                        2.0
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[5px] sm:text-[5.5px] tracking-widest font-black uppercase mt-0.5 whitespace-nowrap drop-shadow-[0.5px_0.5px_0_#000] ${
                        hasReachedCastle ? "text-black/85" : "text-[#fde047]"
                      }`}
                    >
                      ★ FORTRESS ★
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Halyard Cleat */}
              <div className="absolute bottom-1 -left-[1px] -right-[1px] h-0.5 bg-[#44403c] border-y border-black" />
            </div>

            {/* Castle Mount Socket Bracket (anchors pole into center battlement) */}
            <div className="w-4 sm:w-5 h-2 bg-gradient-to-b from-stone-600 to-stone-800 border-[1.5px] border-black rounded-t-xs -mb-[1px] relative z-20 flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-0.5 bg-[#1c1917] rounded-full" />
            </div>
          </div>

          {/* Upper Fortress Tower Tier */}
          <div className="relative flex flex-col items-center">
            {/* Crenellations / Battlements (3 teeth) */}
            <div className="flex gap-1.5 sm:gap-2 mb-[-1px] z-10">
              <div className="w-3.5 sm:w-4 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0 shadow-xs" />
              <div className="w-3.5 sm:w-4 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0 shadow-xs" />
              <div className="w-3.5 sm:w-4 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0 shadow-xs" />
            </div>

            {/* Upper Tower Body with Brick Texture */}
            <div className="w-18 sm:w-22 h-10 sm:h-12 bg-[#9a3412] border-[2.5px] border-black relative flex items-center justify-center overflow-hidden shadow-[2px_2px_0_#000]">
              {/* Brick Mortar Lines */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:8px_5px]" />
              {/* Narrow Arched Window Slot */}
              <div className="w-2.5 sm:w-3 h-5 sm:h-6 bg-black rounded-t-full border border-black/80 shadow-inner z-10" />
            </div>
          </div>

          {/* Main Fortress Lower Tier */}
          <div className="relative flex flex-col items-center">
            {/* Lower Tier Battlements (5 teeth) */}
            <div className="flex gap-1.5 sm:gap-2 mb-[-1px] z-10">
              <div className="w-4 sm:w-5 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0" />
              <div className="w-4 sm:w-5 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0" />
              <div className="w-4 sm:w-5 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0" />
              <div className="w-4 sm:w-5 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0" />
              <div className="w-4 sm:w-5 h-2.5 sm:h-3 bg-[#b45309] border-[2px] border-black border-b-0" />
            </div>

            {/* Lower Fortress Main Body */}
            <div className="w-32 sm:w-40 h-16 sm:h-20 bg-[#9a3412] border-[3px] border-black relative flex flex-col items-center justify-end overflow-hidden shadow-[3px_3px_0_#000] group-hover:brightness-105 transition-all">
              {/* Brick Mortar Texture */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:10px_6px]" />

              {/* Overhead Portal Sign */}
              <div className="relative z-10 -top-1 bg-black/90 text-[#ffd000] border border-[#ffd000]/60 rounded-xs px-1.5 py-0.2 font-['Press_Start_2P',monospace] text-[6.5px] sm:text-[7.5px] tracking-widest shadow-xs">
                GUSTO 2.0
              </div>

              {/* Central Arched Gateway / Doorway to Reach Gusto 2.0 */}
              <div className="w-11 sm:w-14 h-12 sm:h-14 bg-black rounded-t-full border-t-[3px] border-x-[3px] border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)] relative flex flex-col items-center justify-end pb-1 overflow-hidden animate-castle-door-glow">
                {/* Glowing portal pulse */}
                <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-[#f59e0b]/25 via-transparent to-transparent opacity-80" />
                <span className="font-mono text-[7px] sm:text-[8px] font-black text-[#ffd000] drop-shadow-[0_0_4px_#ffd000] relative z-10 uppercase">
                  ENTER
                </span>
                <span className="text-[9px] text-[#ffd000] animate-bounce relative z-10">
                  ▼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── LIVE RUNNING & JUMPING SCROLL-DRIVEN MARIO ── */}
        <div
          className="absolute pointer-events-none z-30 transition-transform duration-75 ease-out"
          style={{
            left: `${marioPercentX}%`,
            bottom: `calc(${54}px + ${Math.abs(jumpOffsetY)}px)`,
            transform: `translate3d(0, 0, 0)`,
          }}
        >
          <CompactMario
            isJumping={isInChasm}
            isRunning={isScrolling}
            facingLeft={facingLeft}
          />
        </div>

        {/* ── 100% FULLY COVERED CONTINUOUS SUPER MARIO GROUND PLATFORM ── */}
        {/* Spans 100% edge-to-edge from left 0 to right 0, reaching bottom-0 with NO GAPS */}
        <div className="absolute left-0 right-0 bottom-0 w-full h-[54px] sm:h-[62px] md:h-[68px] z-10 flex flex-col">
          {/* Top Lush Grass Turf with Scalloped Overhang */}
          <div className="w-full h-5 sm:h-6 bg-[#22c55e] border-t-[3.5px] border-black relative z-10 flex flex-col justify-between">
            {/* Top highlight line */}
            <div className="w-full h-0.5 bg-[#86efac] opacity-80" />

            {/* Continuous Scalloped Turf Drops */}
            <div className="w-full h-2.5 sm:h-3 flex overflow-hidden">
              {Array.from({ length: 90 }).map((_, i) => (
                <span
                  key={`grass-scallop-${i}`}
                  className="w-3.5 sm:w-4.5 h-2.5 sm:h-3 bg-[#15803d] border-b-[2px] border-black rounded-b-full shrink-0 -mr-0.5"
                />
              ))}
            </div>
          </div>

          {/* Authentic NES Soil Brick Blocks (Repeating modular earth grid) */}
          <div className="w-full flex-1 bg-[#9a3412] border-t border-black/40 relative overflow-hidden">
            {/* Repeating Brick Grid with Pixel Bevels */}
            <div className="w-full h-full bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] [background-size:24px_16px] sm:[background-size:28px_18px] opacity-75" />

            {/* Brick Highlights and Embedded Stone Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-45 bg-[radial-gradient(#451a03_2px,transparent_2px)] [background-size:14px_14px]" />
            <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_bottom,rgba(251,146,60,0.5)_2px,transparent_2px)] [background-size:24px_16px] sm:[background-size:28px_18px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
