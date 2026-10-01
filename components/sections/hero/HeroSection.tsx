"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ABOUT_DATA } from "@/src/data/about";
import { GUSTO_EVENTS } from "@/src/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Play,
  Bus,
  Gamepad2,
  Coins,
  Zap,
  Flame,
} from "lucide-react";
import {
  RetroGamepad,
  RetroConsole,
  RetroCartridge,
  RotatingBadge,
  ComicStar,
  HandwrittenSticker,
} from "@/components/ui/RetroStickers";
import { HangingSpiderman } from "@/components/ui/Spiderman";

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

// Lightweight, performant IntersectionObserver hook for cascading scroll reveals
function useInView(options = { threshold: 0.12 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(el);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC SUPER MARIO WORLD 1-1 PIXEL CLOUDS (Exact 8-Bit NES Sprite Geometry)
// ─────────────────────────────────────────────────────────────────────────────
function MarioCloudSmall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M16 4h16v4h6v4h6v16H4V12h6V8h6V4z" fill="#000" />
      {/* White Body */}
      <path d="M18 6h12v4h6v4h6v12H6V14h6v-4h6V6z" fill="#fff" />
      {/* NES Cyan / Light Blue Shading Accents */}
      <rect x="6" y="20" width="36" height="4" fill="#a4e4fc" />
      <rect x="10" y="24" width="28" height="2" fill="#000" />
      <rect x="8" y="22" width="6" height="2" fill="#000" />
      <rect x="34" y="22" width="6" height="2" fill="#000" />
    </svg>
  );
}

function MarioCloudMedium({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 36" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M16 8h16v-4h20v4h12v4h8v20H4V16h6v-4h6V8z" fill="#000" />
      {/* White Body */}
      <path d="M18 10h14v-4h18v4h12v4h8v16H6V18h8v-4h4v-4z" fill="#fff" />
      {/* NES Light-Blue Details */}
      <rect x="6" y="24" width="64" height="4" fill="#a4e4fc" />
      <rect x="14" y="28" width="16" height="2" fill="#000" />
      <rect x="46" y="28" width="18" height="2" fill="#000" />
      <rect x="22" y="20" width="14" height="2" fill="#a4e4fc" />
      <rect x="52" y="20" width="14" height="2" fill="#a4e4fc" />
    </svg>
  );
}

function MarioCloudLarge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 36" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M14 12h14v-4h14v-4h28v4h14v4h14v4h8v16H2V18h6v-3h6v-3z" fill="#000" />
      {/* White Body */}
      <path d="M16 14h12v-4h14v-4h26v4h14v4h14v4h8v12H4V20h8v-3h4v-3z" fill="#fff" />
      {/* NES Light-Blue Shadow Lines & Pixel Details */}
      <rect x="4" y="24" width="98" height="4" fill="#a4e4fc" />
      <rect x="12" y="28" width="18" height="2" fill="#000" />
      <rect x="44" y="28" width="22" height="2" fill="#000" />
      <rect x="78" y="28" width="18" height="2" fill="#000" />
      <rect x="20" y="20" width="10" height="2" fill="#a4e4fc" />
      <rect x="52" y="16" width="16" height="2" fill="#a4e4fc" />
      <rect x="84" y="20" width="10" height="2" fill="#a4e4fc" />
    </svg>
  );
}

function PixelCloudSmall() {
  return (
    <svg viewBox="0 0 56 26" width="62" height="28" fill="none" className="drop-shadow-[2.5px_2.5px_0px_#000]">
      <path d="M16 0h24v6h8v6h8v14H0V12h8V6h8V0z" fill="#000" />
      <path d="M18 2h20v6h8v6h8v10H2V14h8v-6h8V2z" fill="#fff" />
      <rect x="4" y="18" width="48" height="4" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

function PixelCloudMedium() {
  return (
    <svg viewBox="0 0 72 32" width="90" height="38" fill="none" className="drop-shadow-[3px_3px_0px_#000]">
      <path d="M20 0h32v8h12v8h8v16H0V16h8V8h12V0z" fill="#000" />
      <path d="M22 2h28v8h12v8h8v12H2V18h8v-8h12V2z" fill="#fff" />
      <rect x="4" y="22" width="64" height="6" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

function PixelCloudLarge() {
  return (
    <svg viewBox="0 0 96 36" width="120" height="45" fill="none" className="drop-shadow-[3.5px_3.5px_0px_#000]">
      <path d="M24 0h48v8h16v8h8v20H0V16h8V8h16V0z" fill="#000" />
      <path d="M26 2h44v8h16v8h8v16H2V18h8v-8h16V2z" fill="#fff" />
      <rect x="4" y="24" width="88" height="6" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

// Original GUSTO '26 Cyber Runner Mascot
function GustoPixelMascot() {
  return (
    <div
      className="absolute bottom-[56px] left-4 z-30 pointer-events-auto cursor-pointer animate-mascot-walk group select-none"
      title="GUSTO '26 Player Mascot - Let's Go!"
    >
      {/* Speech bubble on hover */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-2 border-black rounded px-1.5 py-0.5 whitespace-nowrap shadow-[2px_2px_0px_#000] pointer-events-none">
        <span className="font-['Press_Start_2P',monospace] text-[7.5px] text-black font-black">
          GUSTO 2.0!
        </span>
      </div>

      {/* 16-Bit Style Original Retro Runner */}
      <svg
        viewBox="0 0 32 36"
        width="42"
        height="48"
        className="drop-shadow-[3px_3px_0px_rgba(0,0,0,0.9)]"
      >
        {/* Antenna */}
        <rect x="15" y="0" width="2" height="4" fill="#000" />
        <rect x="14" y="0" width="4" height="2" fill="#ffd000" />
        {/* Helmet / Head */}
        <rect x="8" y="4" width="16" height="12" fill="#0284c7" stroke="#000" strokeWidth="1.5" />
        {/* Glowing Visor */}
        <rect x="11" y="7" width="10" height="4" fill="#00f0ff" stroke="#000" strokeWidth="1" />
        <rect x="12" y="8" width="3" height="2" fill="#ffffff" />
        {/* Neck */}
        <rect x="13" y="16" width="6" height="2" fill="#000" />
        {/* Torso / Armor Body */}
        <rect x="7" y="18" width="18" height="9" fill="#1e3a8a" stroke="#000" strokeWidth="1.5" />
        {/* GUSTO 'G' Chest Emblem */}
        <rect x="13" y="20" width="6" height="5" fill="#facc15" stroke="#000" strokeWidth="0.8" />
        <rect x="14" y="21" width="3" height="1.5" fill="#000" />
        <rect x="14" y="23" width="4" height="1" fill="#000" />
        <rect x="16" y="22" width="2" height="1.5" fill="#000" />
        {/* Left Arm / Shoulder */}
        <rect x="4" y="19" width="3" height="7" fill="#0284c7" stroke="#000" strokeWidth="1" />
        <rect x="4" y="26" width="3" height="3" fill="#ffd000" stroke="#000" strokeWidth="1" />
        {/* Right Arm / Shoulder */}
        <rect x="25" y="19" width="3" height="7" fill="#0284c7" stroke="#000" strokeWidth="1" />
        <rect x="25" y="26" width="3" height="3" fill="#ffd000" stroke="#000" strokeWidth="1" />
        {/* Belt */}
        <rect x="9" y="27" width="14" height="2" fill="#000" />
        <rect x="14" y="27" width="4" height="2" fill="#ef4444" />
        {/* Left Leg & Red Boot */}
        <rect x="9" y="29" width="5" height="4" fill="#1e3a8a" stroke="#000" strokeWidth="1" />
        <rect x="8" y="32" width="6" height="4" fill="#dc2626" stroke="#000" strokeWidth="1.2" />
        {/* Right Leg & Red Boot */}
        <rect x="18" y="29" width="5" height="4" fill="#1e3a8a" stroke="#000" strokeWidth="1" />
        <rect x="18" y="32" width="6" height="4" fill="#dc2626" stroke="#000" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const targetDate = new Date("2026-03-06T09:00:00+05:30").getTime();

  // Scroll reveal observers for cascading view animation
  const [marqueeRef, marqueeInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [timerRef, timerInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });
  const [badgesRef, badgesInView] = useInView({ threshold: 0.1 });
  const [bottomTickerRef, bottomTickerInView] = useInView({ threshold: 0.1 });

  const [letterAnimationKey, setLetterAnimationKey] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  // Retro Arcade Live Game State
  const [score, setScore] = useState(200);
  const [coins, setCoins] = useState(1);
  const [gameTimer, setGameTimer] = useState(245);
  const [bumpedBlock, setBumpedBlock] = useState<string | null>(null);
  const [poppedBlock, setPoppedBlock] = useState<string | null>(null);

  // Decrement game timer like an authentic arcade clock
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer((prev) => (prev > 10 ? prev - 1 : 245));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const triggerJump = () => {
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
  };

  const handleHitBlock = (blockId: string) => {
    triggerJump();
    setBumpedBlock(blockId);
    setPoppedBlock(blockId);
    setScore((s) => s + 100);
    setCoins((c) => c + 1);

    setTimeout(() => {
      setBumpedBlock((curr) => (curr === blockId ? null : curr));
    }, 380);

    setTimeout(() => {
      setPoppedBlock((curr) => (curr === blockId ? null : curr));
    }, 700);
  };

  useEffect(() => {
    if (isJumping) {
      const timer = setTimeout(() => {
        setIsJumping(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [isJumping, letterAnimationKey]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="relative min-h-[92vh] bg-retro-yellow-grid overflow-hidden pt-16 sm:pt-20 pb-20 border-b-[4px] border-black">
      {/* === SUPER MARIO WORLD 1-1 ARCADE ENVIRONMENT LAYER === */}

      {/* Retro Pixel Super Mario Horizon Cloud Drift System (Authentic Parallax Movement) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] select-none">
        {/* Cloud 1: High Sky Large Mario Cloud (Slow Parallax Drift) */}
        <div
          className="absolute top-4 sm:top-6 left-0 animate-cloud-drift-slow"
          style={{ animationDelay: "-18s" }}
        >
          <MarioCloudLarge className="w-32 xs:w-44 sm:w-56 md:w-68 h-auto drop-shadow-[4px_4px_0px_#000]" />
        </div>

        {/* Cloud 2: Mid-High Sky Medium Mario Cloud (Medium Drift) */}
        <div
          className="absolute top-16 sm:top-24 left-0 animate-cloud-drift-med"
          style={{ animationDelay: "-38s" }}
        >
          <MarioCloudMedium className="w-24 xs:w-32 sm:w-40 md:w-52 h-auto drop-shadow-[3.5px_3.5px_0px_#000]" />
        </div>

        {/* Cloud 3: Mid Sky Small Mario Cloud (Breezy Fast Drift) */}
        <div
          className="absolute top-28 sm:top-36 left-0 animate-cloud-drift-fast"
          style={{ animationDelay: "-10s" }}
        >
          <MarioCloudSmall className="w-16 xs:w-20 sm:w-26 md:w-32 h-auto drop-shadow-[3px_3px_0px_#000]" />
        </div>

        {/* Cloud 4: Lower Sky Large Mario Cloud (Majestic Deep Drift) */}
        <div
          className="absolute top-44 sm:top-60 left-0 animate-cloud-drift-slow"
          style={{ animationDelay: "-52s" }}
        >
          <MarioCloudLarge className="w-28 xs:w-38 sm:w-48 md:w-60 h-auto drop-shadow-[4px_4px_0px_#000] opacity-85" />
        </div>

        {/* Cloud 5: High Far-Right Small Mario Cloud (Fast Drift) */}
        <div
          className="absolute top-8 sm:top-12 left-0 animate-cloud-drift-fast"
          style={{ animationDelay: "-24s" }}
        >
          <MarioCloudSmall className="w-14 xs:w-18 sm:w-22 md:w-28 h-auto drop-shadow-[2.5px_2.5px_0px_#000]" />
        </div>

        {/* Cloud 6: Mid Horizon Medium Mario Cloud (Steady Medium Drift) */}
        <div
          className="absolute top-36 sm:top-48 left-0 animate-cloud-drift-med"
          style={{ animationDelay: "-6s" }}
        >
          <MarioCloudMedium className="w-20 xs:w-28 sm:w-36 md:w-44 h-auto drop-shadow-[3px_3px_0px_#000] opacity-90" />
        </div>
      </div>

      {/* Floating Super Mario Lucky ? Block on Mid Right (Exact Screenshot Location) */}
      <div className="absolute top-52 sm:top-56 right-4 sm:right-10 z-20 select-none">
        <div
          onClick={triggerJump}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#fc9838] border-[3px] border-black rounded-xs shadow-[4px_4px_0px_#000] flex items-center justify-center font-['Press_Start_2P',monospace] text-black font-black text-sm sm:text-base relative hover:-translate-y-1.5 transition-transform cursor-pointer group active:scale-95"
          title="Hit the ? block!"
        >
          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-[#804000]" />
          <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#804000]" />
          <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-[#804000]" />
          <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#804000]" />
          <span className="group-hover:scale-125 transition-transform">?</span>
        </div>
      </div>

      {/* Environment background is pure Super Mario World 1-1 sky with pixel clouds */}

      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          {/* === SUPER MARIO WORLD 1-1 TOP ARCADE HUD (EXACT SCREENSHOT LAYOUT) === */}
          {/* Top Retro Game HUD Bar (Clean Classic: PLAYER 000200, COINS ×01, WORLD 1-1, TIME 245) */}
          <div className="w-full max-w-4xl mx-auto px-4 mb-4 sm:mb-6 flex items-center justify-between font-['Press_Start_2P',monospace] text-white text-[10px] xs:text-xs sm:text-sm tracking-wider select-none z-30 drop-shadow-[2px_2px_0px_#000]">
            <div className="flex flex-col items-start leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">PLAYER</span>
              <span className="font-extrabold tracking-widest text-white">000200</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 leading-snug">
              <span className="inline-block animate-coin-spin text-sm sm:text-base">🪙</span>
              <span className="font-extrabold tracking-wider text-white">×01</span>
            </div>
            <div className="flex flex-col items-center leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">WORLD</span>
              <span className="font-extrabold tracking-widest text-white">1-1</span>
            </div>
            <div className="flex flex-col items-end leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">TIME</span>
              <span className="font-extrabold tracking-widest text-white">245</span>
            </div>
          </div>

          {/* Top Symposium Institution Banner (Authentic Mario Platformer Signboard: Government College of Engineering, Erode) */}
          <div className="w-full flex justify-center items-center mb-6 sm:mb-8 md:mb-10 z-20 px-2 sm:px-4 select-none">
            <div className="relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#ffd000] border-[3.5px] sm:border-[4px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] rounded-xs hover:-translate-y-0.5 transition-all duration-150 max-w-full">
              {/* 4 Corner Mario Rivet Screws */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs" />

              {/* Left Spinning Coin */}
              <span className="text-xs sm:text-base animate-coin-spin shrink-0">🪙</span>

              {/* College Title in Authentic Mario 8-Bit Font */}
              <span className="font-['Press_Start_2P',monospace] font-black text-[9.5px] xs:text-[11px] sm:text-sm md:text-base lg:text-lg text-black tracking-wider uppercase text-center leading-snug drop-shadow-[1px_1px_0px_rgba(255,255,255,0.7)] px-1 sm:px-2">
                GOVERNMENT COLLEGE OF ENGINEERING, ERODE
              </span>

              {/* Right Spinning Coin */}
              <span className="text-xs sm:text-base animate-coin-spin shrink-0">🪙</span>
            </div>
          </div>

          {/* === RETRO 2D PLATFORM TITLE LOGO: "LET THE" & "GUSTO BEGIN" === */}
          <div
            onClick={triggerJump}
            className="flex flex-col items-center justify-center my-4 sm:my-8 md:my-10 cursor-pointer select-none group w-full"
            title="Click to see the letters jump!"
          >
            {/* Row 1: "LET THE" */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap">
              <div className="inline-flex items-center gap-1 sm:gap-2">
                {[
                  { char: "L", color: "mario-c-blue", rotate: "-rotate-3" },
                  { char: "E", color: "mario-c-yellow", rotate: "rotate-2" },
                  { char: "T", color: "mario-c-red", rotate: "-rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`let-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[3.4rem] xs:text-[4.4rem] sm:text-7xl md:text-8xl lg:text-[8.8rem] xl:text-[10.5rem] ${isJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
              <span className="w-3 xs:w-5 sm:w-8 md:w-12" />
              <div className="inline-flex items-center gap-1 sm:gap-2">
                {[
                  { char: "T", color: "mario-c-green", rotate: "rotate-3" },
                  { char: "H", color: "mario-c-blue", rotate: "-rotate-2" },
                  { char: "E", color: "mario-c-yellow", rotate: "rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`the-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 3) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[3.4rem] xs:text-[4.4rem] sm:text-7xl md:text-8xl lg:text-[8.8rem] xl:text-[10.5rem] ${isJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2: "GUSTO BEGIN" - Well-spaced gap so title lines breathe with arcade punch */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap mt-4 sm:mt-6 md:mt-8">
              <div className="inline-flex items-center gap-1 sm:gap-2">
                {[
                  { char: "G", color: "mario-c-red", rotate: "-rotate-3" },
                  { char: "U", color: "mario-c-blue", rotate: "rotate-2" },
                  { char: "S", color: "mario-c-green", rotate: "-rotate-2" },
                  { char: "T", color: "mario-c-yellow", rotate: "rotate-2" },
                  { char: "O", color: "mario-c-red", rotate: "-rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`gusto-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 6) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[3.4rem] xs:text-[4.4rem] sm:text-7xl md:text-8xl lg:text-[8.8rem] xl:text-[10.5rem] ${isJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
              <span className="w-3 xs:w-5 sm:w-8 md:w-12" />
              <div className="inline-flex items-center gap-1 sm:gap-2">
                {[
                  { char: "B", color: "mario-c-green", rotate: "rotate-2" },
                  { char: "E", color: "mario-c-yellow", rotate: "-rotate-2" },
                  { char: "G", color: "mario-c-blue", rotate: "rotate-3" },
                  { char: "I", color: "mario-c-red", rotate: "-rotate-2" },
                  { char: "N", color: "mario-c-green", rotate: "rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`begin-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 11) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[3.4rem] xs:text-[4.4rem] sm:text-7xl md:text-8xl lg:text-[8.8rem] xl:text-[10.5rem] ${isJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Retro Pixel Tagline Subtitle - Increased Scale */}
          <div className="mt-6 sm:mt-10 md:mt-12 mb-5 sm:mb-6 select-none px-4 max-w-5xl">
            <p className="font-['Press_Start_2P',monospace] text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-[3px_3px_0px_#000] tracking-widest uppercase text-center leading-relaxed font-bold">
              A NATIONAL LEVEL TECHNICAL SYMPOSIUM • MARCH 06, 2026 • GCE ERODE
            </p>
          </div>

          {/* Retro Arcade Presentation Card - Significantly Increased Content Size */}
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-6 sm:px-10 py-6 sm:py-8 rounded-2xl bg-white/15 backdrop-blur-xs border-[3.5px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] text-center my-5 sm:my-8 select-none">
            <div className="font-['Press_Start_2P',monospace] text-[#ffd000] text-sm xs:text-base sm:text-lg md:text-2xl mb-3 sm:mb-4 text-center drop-shadow-[2px_2px_0px_#000] tracking-wider uppercase font-black">
              BEGINNING OUR PRESENTATION // GUSTO 2K26
            </div>
            <p className="font-['Press_Start_2P',monospace] text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-[19px] leading-relaxed md:leading-loose max-w-3xl mx-auto drop-shadow-[1.5px_1.5px_0px_#000]">
              Welcome to Gusto 2.0 at Government College of Engineering, Erode. Step into World 1-1 featuring 9 technical &amp; non-technical arenas, cash prize bounty pools, certificates, and free bus transit!
            </p>
          </div>

          {/* Floating Super Mario Blocks: Single [?] on Left, and [#][?][#][?][#] Platform in Center - Scaled Up */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 my-5 sm:my-8 select-none z-20">
            {/* Left Single ? Block */}
            <div
              onClick={triggerJump}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-[#fc9838] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] flex items-center justify-center font-['Press_Start_2P',monospace] text-black font-black text-base sm:text-xl relative cursor-pointer hover:-translate-y-2 transition-transform active:scale-95 group"
              title="Hit the ? block!"
            >
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
              <span className="group-hover:scale-125 transition-transform">?</span>
            </div>

            {/* Center 5-Block Platform: [#][?][#][?][#] */}
            <div className="flex items-center gap-1.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#c84c0c] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] relative">
                <div className="absolute inset-1 border border-black/40" />
                <div className="absolute top-3.5 left-0 right-0 h-[2.5px] bg-black" />
                <div className="absolute top-8 left-0 right-0 h-[2.5px] bg-black" />
              </div>
              <div
                onClick={triggerJump}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-[#fc9838] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] flex items-center justify-center font-['Press_Start_2P',monospace] text-black font-black text-base sm:text-xl relative cursor-pointer hover:-translate-y-2 transition-transform active:scale-95 group"
                title="Hit the ? block!"
              >
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
                <span className="group-hover:scale-125 transition-transform">?</span>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#c84c0c] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] relative">
                <div className="absolute inset-1 border border-black/40" />
                <div className="absolute top-3.5 left-0 right-0 h-[2.5px] bg-black" />
                <div className="absolute top-8 left-0 right-0 h-[2.5px] bg-black" />
              </div>
              <div
                onClick={triggerJump}
                className="w-14 h-14 sm:w-16 sm:h-16 bg-[#fc9838] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] flex items-center justify-center font-['Press_Start_2P',monospace] text-black font-black text-base sm:text-xl relative cursor-pointer hover:-translate-y-2 transition-transform active:scale-95 group"
                title="Hit the ? block!"
              >
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#804000]" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#804000]" />
                <span className="group-hover:scale-125 transition-transform">?</span>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#c84c0c] border-[3.5px] sm:border-[4px] border-black rounded-xs shadow-[4px_4px_0px_#000] relative">
                <div className="absolute inset-1 border border-black/40" />
                <div className="absolute top-3.5 left-0 right-0 h-[2.5px] bg-black" />
                <div className="absolute top-8 left-0 right-0 h-[2.5px] bg-black" />
              </div>
            </div>
          </div>

          {/* === NATIONAL LEVEL TECHNICAL SYMPOSIUM BRIEFING (EXPANDED TO FIT PAGE PROPORTIONATELY WITH SCROLL REVEAL) === */}
          <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-12 px-2 sm:px-4 relative z-20">
            {/* 1. Top Continuous Moving Text Marquee Capsule - Scroll Reveal */}
            <div
              ref={marqueeRef}
              className={`w-full max-w-5xl mx-auto mb-8 sm:mb-10 rounded-full bg-white border-[3px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000] py-3 sm:py-4 px-6 sm:px-8 overflow-hidden select-none hover:shadow-[10px_10px_0px_#000] hover:-translate-y-0.5 transition-all duration-300 scroll-reveal ${marqueeInView ? "is-visible" : ""
                }`}
            >
              <div className="flex w-max animate-marquee">
                <span className="font-['Chakra_Petch',sans-serif] font-black text-sm sm:text-lg md:text-xl text-[#3b0764] tracking-wider uppercase flex items-center gap-5 sm:gap-6 pr-8">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 inline shrink-0 animate-spin [animation-duration:4s]" />
                  <span>NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">MARCH 06, 2026</span>
                  <span className="text-zinc-400">•</span>
                  <span>GCEE ERODE</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#65a30d]">DEPARTMENT OF IT</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#2563eb]">9 COMPETITIONS</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#d97706]">CASH PRIZES &amp; CERTIFICATES</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">REGISTER NOW (₹250)</span>
                  <span className="text-zinc-400">•</span>
                </span>
                <span className="font-['Chakra_Petch',sans-serif] font-black text-sm sm:text-lg md:text-xl text-[#3b0764] tracking-wider uppercase flex items-center gap-5 sm:gap-6 pr-8" aria-hidden="true">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 inline shrink-0 animate-spin [animation-duration:4s]" />
                  <span>NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">MARCH 06, 2026</span>
                  <span className="text-zinc-400">•</span>
                  <span>GCEE ERODE</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#65a30d]">DEPARTMENT OF IT</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#2563eb]">9 COMPETITIONS</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#d97706]">CASH PRIZES &amp; CERTIFICATES</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">REGISTER NOW (₹250)</span>
                  <span className="text-zinc-400">•</span>
                </span>
              </div>
            </div>

            {/* 2. 4 Quick Stat Cards — Retro Arcade Gaming Cartridge Module Design */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full mb-8 sm:mb-12"
            >
              {/* Cartridge 01: Event Date */}
              <div
                style={{ transitionDelay: statsInView ? "0ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fff1f2] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899] border border-black animate-pulse shadow-[0_0_6px_#ec4899]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-01
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-pink-100 text-[#ec4899] px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    DATE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#fbcfe8] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#db2777]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Event Date
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {ABOUT_DATA.eventDate}
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 02: Reg. Last Date */}
              <div
                style={{ transitionDelay: statsInView ? "120ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f5f3ff] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8b5cf6] border border-black animate-pulse shadow-[0_0_6px_#8b5cf6]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-02
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-purple-100 text-[#8b5cf6] px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    DEADLINE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#ddd6fe] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#7c3aed]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Reg. Last Date
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {ABOUT_DATA.registrationLastDate}
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 03: Competitions */}
              <div
                style={{ transitionDelay: statsInView ? "240ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fffbeb] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] border border-black animate-pulse shadow-[0_0_6px_#f59e0b]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-03
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    ARENA
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#fef08a] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#b45309]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Competitions
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {GUSTO_EVENTS?.length || 9} Total Events
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 04: Campus Venue */}
              <div
                style={{ transitionDelay: statsInView ? "360ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f0fdf4] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] border border-black animate-pulse shadow-[0_0_6px_#10b981]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-04
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    MAP
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#a7f3d0] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#059669]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Campus Venue
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    GCEE, Erode
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>
            </div>

            {/* 3. Retro Nintendo Switch Handheld Gaming Console Countdown Timer - Scroll Reveal */}
            <div
              ref={timerRef}
              className={`w-full max-w-4xl mx-auto mb-8 sm:mb-12 select-none scroll-reveal ${timerInView ? "is-visible" : ""
                }`}
            >
              {/* Nintendo Switch Outer Shell */}
              <div className="flex items-stretch w-full rounded-[24px] sm:rounded-[36px] overflow-hidden border-[3.5px] sm:border-[4.5px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[9px_9px_0px_#000]">

                {/* LEFT JOY-CON (Neon Cyan) */}
                <div className="switch-joycon-left w-14 xs:w-16 sm:w-20 md:w-24 p-2 sm:p-3 flex flex-col justify-between items-center relative border-r-2 border-black/40 shrink-0">
                  {/* Minus Button (-) */}
                  <div className="w-full flex justify-end pr-1 sm:pr-2 pt-1">
                    <div className="w-2.5 sm:w-3.5 h-1 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60 shadow-xs" />
                  </div>

                  {/* Top Analog Joystick */}
                  <div className="switch-thumbstick w-7 h-7 sm:w-10 sm:h-10 my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* D-Pad Buttons (▲, ◀, ▶, ▼) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-1">
                    <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▲</div>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">◀</div>
                      <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▶</div>
                    </div>
                    <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▼</div>
                  </div>

                  {/* Square Capture/Record Button */}
                  <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-[2px] bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#202226]" />
                  </div>
                </div>

                {/* CENTER OLED DISPLAY SCREEN */}
                <div className="switch-screen-outline flex-1 p-2 sm:p-4 md:p-5 flex flex-col justify-between">
                  {/* Top Game Console Status Bar */}
                  <div className="flex items-center justify-between mb-2 sm:mb-3 px-1 sm:px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-['Chakra_Petch',sans-serif] font-black uppercase tracking-widest text-[#fde047] flex items-center gap-1.5">
                        <span>★</span>
                        <span>LEVEL STARTS IN</span>
                        <span>★</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[9px] sm:text-xs font-bold text-pink-300">
                      <span>March 06, 2026</span>
                      <span className="hidden xs:inline px-1.5 py-0.5 rounded bg-black/60 text-[#84cc16] border border-white/20 text-[9px]">100% 🔋</span>
                    </div>
                  </div>

                  {/* Inner Dark Screen Glass with Countdown Blocks */}
                  <div className="relative rounded-xl sm:rounded-2xl p-2 sm:p-4 bg-black/85 border-2 border-black/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4">
                      {/* Days */}
                      <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#facc15] border-2 sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.days).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm font-black text-black uppercase mt-1 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Days
                        </span>
                      </div>

                      {/* Hours */}
                      <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#84cc16] border-2 sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm font-black text-black uppercase mt-1 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Hours
                        </span>
                      </div>

                      {/* Mins */}
                      <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#06b6d4] border-2 sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm font-black text-black uppercase mt-1 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Mins
                        </span>
                      </div>

                      {/* Secs */}
                      <div className="flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ec4899] border-2 sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-white font-mono leading-none">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm font-black text-white uppercase mt-1 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Secs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Stereo Speaker Slits on screen bottom */}
                  <div className="flex justify-between items-center px-4 pt-1.5 opacity-40">
                    <div className="w-5 sm:w-8 h-1 bg-black rounded-full" />
                    <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">NINTENDO GUSTO OLED</div>
                    <div className="w-5 sm:w-8 h-1 bg-black rounded-full" />
                  </div>
                </div>

                {/* RIGHT JOY-CON (Neon Red/Coral) */}
                <div className="switch-joycon-right w-14 xs:w-16 sm:w-20 md:w-24 p-2 sm:p-3 flex flex-col justify-between items-center relative border-l-2 border-black/40 shrink-0">
                  {/* Plus Button (+) */}
                  <div className="w-full flex justify-start pl-1 sm:pr-2 pt-1">
                    <div className="relative w-3 sm:w-4 h-3 sm:h-4 flex items-center justify-center">
                      <div className="absolute w-2.5 sm:w-3.5 h-1 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60" />
                      <div className="absolute w-1 sm:w-1.5 h-2.5 sm:h-3.5 bg-[#222] rounded-[1px] border border-black/60" />
                    </div>
                  </div>

                  {/* Diamond Action Buttons (X, Y, A, B) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-1">
                    <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">X</div>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">Y</div>
                      <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">A</div>
                    </div>
                    <div className="switch-btn w-3.5 h-3.5 sm:w-5 sm:h-5 text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">B</div>
                  </div>

                  {/* Bottom Analog Joystick */}
                  <div className="switch-thumbstick w-7 h-7 sm:w-10 sm:h-10 my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* Circular Home Button (⌂) */}
                  <div className="w-4 h-4 sm:w-5.5 sm:h-5.5 rounded-full bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95 text-white/80 text-[8px] sm:text-[10px]">
                    ⌂
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Action Arcade HUD & Controller Action Deck - Scroll Reveal */}
            <div
              ref={ctaRef}
              className={`relative flex flex-col items-center justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto px-2 select-none scroll-reveal ${ctaInView ? "is-visible" : ""
                }`}
            >
              {/* Mission Objective / Critical Drop Top Strip */}
              <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black text-white border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-[#fde047] uppercase">
                    MISSION: LEVEL-26 ENTRY
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-black text-pink-400">
                  <Zap className="w-3.5 h-3.5 fill-pink-400" />
                  <span>LIMITED SLOTS (₹{ABOUT_DATA.registrationFee})</span>
                </div>
                <div className="hidden xs:flex items-center gap-1 font-mono text-[10px] font-black text-zinc-400">
                  <span>[ P1 READY ]</span>
                </div>
              </div>

              {/* Master Arcade Coin-Op CTA Button ("PRESS START / REGISTER NOW") */}
              <div className="w-full flex justify-center">
                <button
                  onClick={onOpenRegister}
                  className="arcade-push-btn group relative overflow-hidden w-full max-w-2xl px-5 sm:px-8 py-3.5 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#ec4899] border-[3.5px] sm:border-[4.5px] border-black text-white cursor-pointer select-none"
                >
                  {/* Glowing Laser Sweep Animation */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-laser-sweep" />
                  </div>

                  {/* Corner Arcade Screws */}
                  <span className="absolute top-2 left-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute top-2 right-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute bottom-2 left-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute bottom-2 right-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>

                  <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    {/* Left: Glowing Coin Slot Graphic */}
                    <div className="flex items-center gap-2 bg-black/35 backdrop-blur-xs px-3 sm:px-4 py-1.5 rounded-xl border border-white/30">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border border-black flex items-center justify-center animate-coin-bounce shadow-[0_0_8px_#facc15]">
                        <span className="text-[10px] font-black text-black">₹</span>
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[8.5px] font-mono font-bold text-yellow-300 uppercase leading-none">INSERT COIN</span>
                        <span className="text-xs sm:text-sm font-['Chakra_Petch',sans-serif] font-black text-white leading-tight">₹{ABOUT_DATA.registrationFee} PASS</span>
                      </div>
                    </div>

                    {/* Center: Bold Arcade Text */}
                    <div className="flex items-center gap-2 sm:gap-3 text-center">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse hidden xs:inline" />
                      <span className="font-['Chakra_Petch',sans-serif] font-black text-lg sm:text-2xl md:text-3xl text-white tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                        PRESS START • REGISTER NOW
                      </span>
                    </div>

                    {/* Right: Controller Arrow Trigger */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black border-2 border-white/40 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-[2px_2px_0px_#000]">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Arcade Controller Face Buttons [A] [B] [X] */}
              <div className="w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-3.5">
                {/* [A] Button: 9 Events */}
                <a
                  href="#events"
                  className="arcade-face-btn group relative overflow-hidden p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#84cc16] border-[3px] sm:border-[3.5px] border-black text-black flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 text-center cursor-pointer"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-[#84cc16] font-mono font-black text-xs sm:text-sm flex items-center justify-center border border-black shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    A
                  </span>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-['Chakra_Petch',sans-serif] font-black text-xs sm:text-base leading-tight uppercase">
                      9 Events
                    </span>
                    <span className="text-[8px] sm:text-[9.5px] font-mono font-extrabold text-zinc-900 uppercase opacity-75">
                      ⚔️ ARENA
                    </span>
                  </div>
                </a>

                {/* [B] Button: Rules */}
                <a
                  href="#rules"
                  className="arcade-face-btn group relative overflow-hidden p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[3px] sm:border-[3.5px] border-black text-black flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 text-center cursor-pointer"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white font-mono font-black text-xs sm:text-sm flex items-center justify-center border border-black shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    B
                  </span>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-['Chakra_Petch',sans-serif] font-black text-xs sm:text-base leading-tight uppercase">
                      Rules
                    </span>
                    <span className="text-[8px] sm:text-[9.5px] font-mono font-extrabold text-zinc-700 uppercase opacity-75">
                      📜 CODEX
                    </span>
                  </div>
                </a>

                {/* [X] Button: Teaser */}
                <a
                  href="#youtube"
                  className="arcade-face-btn group relative overflow-hidden p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#ef4444] border-[3px] sm:border-[3.5px] border-black text-white flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 text-center cursor-pointer"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-[#ef4444] font-mono font-black text-xs sm:text-sm flex items-center justify-center border border-black shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                    X
                  </span>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="font-['Chakra_Petch',sans-serif] font-black text-xs sm:text-base leading-tight uppercase">
                      Teaser
                    </span>
                    <span className="text-[8px] sm:text-[9.5px] font-mono font-extrabold text-white uppercase opacity-75">
                      🎬 TRAILER
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* 5. RPG Quest Inventory & Perks Dock - Scroll Reveal */}
            <div
              ref={badgesRef}
              className={`mt-8 sm:mt-12 w-full max-w-4xl mx-auto px-2 select-none scroll-reveal ${badgesInView ? "is-visible" : ""
                }`}
            >
              {/* Inventory Header HUD Tag */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-zinc-600 font-mono text-[10px] sm:text-xs">◄ ◄ ◄</span>
                <span className="font-['Chakra_Petch',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest text-black bg-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#7c3aed]" />
                  <span>ACTIVE PASS BUFFS &amp; REWARDS</span>
                </span>
                <span className="text-zinc-600 font-mono text-[10px] sm:text-xs">► ► ►</span>
              </div>

              {/* 3 Gaming Perk Inventory Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {/* Perk 01: Verified Pass */}
                <div
                  style={{ transitionDelay: badgesInView ? "0ms" : "0ms" }}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1.5 transition-all duration-150 flex flex-col justify-between"
                >
                  {/* Top Gamer Pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-400">
                      ★ LEGENDARY PASS
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-black shadow-[0_0_6px_#10b981]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform shadow-[2px_2px_0px_#000]">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs sm:text-sm font-['Chakra_Petch',sans-serif] font-black text-black block leading-tight">
                        Official GUSTO Registration
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block leading-tight mt-0.5">
                        Direct Campus &amp; Event Access
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perk 02: Free Fast Travel */}
                <div
                  style={{ transitionDelay: badgesInView ? "120ms" : "0ms" }}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1.5 transition-all duration-150 flex flex-col justify-between"
                >
                  {/* Top Gamer Pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-400">
                      ★ FAST TRAVEL
                    </span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse border border-black shadow-[0_0_6px_#6366f1]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 border-2 border-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform shadow-[2px_2px_0px_#000]">
                      <Bus className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs sm:text-sm font-['Chakra_Petch',sans-serif] font-black text-black block leading-tight">
                        Free Transit Bus Fleet
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block leading-tight mt-0.5">
                        Erode • Chithode • Bhavani
                      </span>
                    </div>
                  </div>
                </div>

                {/* Perk 03: Cash Trophy Bounty */}
                <div
                  style={{ transitionDelay: badgesInView ? "240ms" : "0ms" }}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1.5 transition-all duration-150 flex flex-col justify-between"
                >
                  {/* Top Gamer Pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-400">
                      ★ BOUNTY VAULT
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse border border-black shadow-[0_0_6px_#f59e0b]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 border-2 border-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform shadow-[2px_2px_0px_#000]">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs sm:text-sm font-['Chakra_Petch',sans-serif] font-black text-black block leading-tight">
                        Cash Prizes &amp; Certificates
                      </span>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block leading-tight mt-0.5">
                        Awarded to Event Champions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Cyber Ground Data Streamer Strip - Scroll Reveal */}
            <div
              ref={bottomTickerRef}
              className={`mt-8 sm:mt-10 w-full max-w-4xl mx-auto rounded-2xl bg-black border-[3px] sm:border-[3.5px] border-black shadow-[5px_5px_0px_#000] py-2 sm:py-2.5 px-4 overflow-hidden select-none scroll-reveal ${bottomTickerInView ? "is-visible" : ""
                }`}
            >
              <div className="flex w-max animate-marquee-fast">
                <span className="font-mono text-xs sm:text-sm font-extrabold text-[#fde047] tracking-widest uppercase flex items-center gap-5 sm:gap-6 pr-6">
                  <span className="text-emerald-400">● LIVE BROADCAST</span>
                  <span>►►►</span>
                  <span>🏆 BOUNTY POOL: CASH PRIZES &amp; CERTIFICATES</span>
                  <span>►►►</span>
                  <span>🚌 FAST TRAVEL: FREE BUS TRANSIT SYSTEM</span>
                  <span>►►►</span>
                  <span>⚔️ 9 BATTLE ARENAS: TECH &amp; NON-TECH</span>
                  <span>►►►</span>
                  <span>📍 ARENA HQ: GCEE AUTONOMOUS CAMPUS</span>
                  <span>►►►</span>
                  <span>🎟️ ENTRY: LIMITED PASSES ₹{ABOUT_DATA.registrationFee}</span>
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-[#fde047] tracking-widest uppercase flex items-center gap-5 sm:gap-6 pr-6" aria-hidden="true">
                  <span className="text-emerald-400">● LIVE BROADCAST</span>
                  <span>►►►</span>
                  <span>🏆 BOUNTY POOL: CASH PRIZES &amp; CERTIFICATES</span>
                  <span>►►►</span>
                  <span>🚌 FAST TRAVEL: FREE BUS TRANSIT SYSTEM</span>
                  <span>►►►</span>
                  <span>⚔️ 9 BATTLE ARENAS: TECH &amp; NON-TECH</span>
                  <span>►►►</span>
                  <span>📍 ARENA HQ: GCEE AUTONOMOUS CAMPUS</span>
                  <span>►►►</span>
                  <span>🎟️ ENTRY: LIMITED PASSES ₹{ABOUT_DATA.registrationFee}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUPER MARIO WORLD 1-1 GROUND PLATFORM WITH WARP PIPE & BRICK TILES ── */}
      <div className="w-full relative mt-10 z-20 pointer-events-none select-none">
        {/* Green Hill, Bush, Warp Pipe & Goomba positioned on top of the brick ground (Exact Reference Image) */}
        <div className="w-full max-w-6xl mx-auto px-4 flex items-end justify-between relative -mb-[2px] z-10">
          {/* Left: Green Bush with eyes */}
          <div className="relative flex items-end">
            <div className="w-16 sm:w-22 h-8 sm:h-11 bg-[#00a800] border-[2.5px] sm:border-[3px] border-black rounded-t-full relative">
              <div className="absolute top-2 left-3 sm:left-4 w-1.5 h-3 bg-black rounded-full" />
              <div className="absolute top-2 right-3 sm:right-4 w-1.5 h-3 bg-black rounded-full" />
            </div>
            <div className="w-12 sm:w-16 h-6 sm:h-8 bg-[#00d800] border-[2px] sm:border-[2.5px] border-black rounded-t-full -ml-3 relative">
              <div className="absolute top-1.5 left-2.5 w-1 h-2 bg-black rounded-full" />
              <div className="absolute top-1.5 right-2.5 w-1 h-2 bg-black rounded-full" />
            </div>
          </div>

          {/* Center-Left: Big Iconic Mario Hill with eyes */}
          <div className="hidden md:flex flex-col items-center relative -mb-[1px]">
            <div className="w-28 sm:w-36 h-14 sm:h-18 bg-[#00a800] border-[3px] border-black rounded-t-full relative">
              <div className="absolute top-3 left-8 sm:left-10 w-2 h-4 bg-black rounded-full" />
              <div className="absolute top-3 right-8 sm:right-10 w-2 h-4 bg-black rounded-full" />
            </div>
          </div>

          {/* Center: ORIGINAL GUSTO-Themed Pixel Mascot (No copyrighted characters) */}
          <div className="hidden sm:flex flex-col items-center animate-mascot-walk relative z-20" title="GUSTO '26 Cyber Mascot">
            {/* Robot Antenna with Blinking Beacon */}
            <div className="w-1.5 h-2.5 bg-black -mb-0.5 relative">
              <span className="absolute -top-1.5 -left-1 w-3 h-3 bg-[#e52521] border border-black rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1.5 -left-1 w-3 h-3 bg-[#ffd000] border-[1.5px] border-black rounded-full" />
            </div>

            {/* Mascot Head / Visor */}
            <div className="w-10 h-7 bg-[#00d8f8] border-[2.5px] border-black rounded-t-lg rounded-b-xs relative shadow-[2px_2px_0px_#000]">
              {/* Visor Screen with Glowing Cyan Pixel Eyes */}
              <div className="absolute inset-1 bg-black rounded-xs flex items-center justify-around px-1">
                <span className="w-1.5 h-2.5 bg-[#43b047] rounded-xs animate-pulse shadow-[0_0_4px_#43b047]" />
                <span className="w-1.5 h-2.5 bg-[#43b047] rounded-xs animate-pulse shadow-[0_0_4px_#43b047]" />
              </div>
            </div>

            {/* Mascot Chest / Armor Body */}
            <div className="w-8 h-4 bg-[#ffd000] border-x-[2.5px] border-b-[2.5px] border-black relative flex items-center justify-center">
              <span className="text-[6px] font-['Press_Start_2P',monospace] font-black text-black">G26</span>
            </div>

            {/* Mascot Walking Pixel Boots */}
            <div className="flex gap-1.5 -mt-0.5">
              <div className="w-3.5 h-2 bg-[#e52521] border border-black rounded-b-xs shadow-[1px_1px_0_#000]" />
              <div className="w-3.5 h-2 bg-[#e52521] border border-black rounded-b-xs shadow-[1px_1px_0_#000]" />
            </div>
          </div>

          {/* Center-Right: Another Bush with eyes */}
          <div className="hidden lg:flex items-end relative -mb-[1px]">
            <div className="w-16 sm:w-20 h-8 sm:h-10 bg-[#00d800] border-[2.5px] border-black rounded-t-full relative">
              <div className="absolute top-2 left-3 w-1 h-2.5 bg-black rounded-full" />
              <div className="absolute top-2 right-3 w-1 h-2.5 bg-black rounded-full" />
            </div>
          </div>

          {/* Right: Iconic Green Warp Pipe with GUSTO 2K26 Plaque */}
          <div className="flex flex-col items-center relative">
            {/* Level Plaque */}
            <div className="font-['Press_Start_2P',monospace] text-[7px] font-black bg-[#ffd000] text-black px-1.5 py-0.5 border border-black shadow-[1.5px_1.5px_0_#000] mb-0.5 z-10 select-none">
              WORLD 1-1
            </div>

            {/* Pipe Top Rim */}
            <div className="w-16 sm:w-20 h-6 sm:h-7 bg-[#00a800] border-[3px] border-black rounded-xs shadow-[3px_3px_0px_#000] relative overflow-hidden">
              <div className="absolute left-2 top-0 bottom-0 w-2.5 bg-[#80f840] opacity-80" />
              <div className="absolute right-2 top-0 bottom-0 w-2 bg-[#006000] opacity-80" />
            </div>
            {/* Pipe Shaft Body */}
            <div className="w-14 sm:w-16 h-10 sm:h-14 bg-[#00a800] border-x-[3px] border-black shadow-[3px_3px_0px_#000] relative overflow-hidden">
              <div className="absolute left-1.5 top-0 bottom-0 w-2 bg-[#80f840] opacity-80" />
              <div className="absolute right-1.5 top-0 bottom-0 w-2 bg-[#006000] opacity-80" />
            </div>
          </div>
        </div>

        {/* 2-Tier Retro Platform Ground: Vibrant Pixel Grass Top + Earthy Brick Body */}
        <div className="w-full">
          {/* Pixel Grass Blades Layer */}
          <div className="w-full h-2.5 bg-[#00d800] border-t-[3.5px] border-black border-b-[2px] border-black flex" />
          {/* Dirt Brick Body */}
          <div className="w-full mario-brick-ground shadow-[0_4px_0_#000] !border-t-0" />
        </div>
      </div>
    </section>
  );
}

