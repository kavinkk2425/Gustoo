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

  const triggerJump = () => {
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
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
      {/* === ANIMATED BACKGROUND ENVIRONMENT LAYER (pointer-events-none, non-intrusive) === */}

      {/* Top Left Console — floats slowly */}
      <div className="absolute top-24 sm:top-28 left-6 sm:left-14 hidden md:block deco-obj animate-float-slow pointer-events-auto select-none z-[1]"
        style={{ animationDelay: '0s' }}>
        <RetroConsole className="w-28 sm:w-36 h-auto drop-shadow-[4px_4px_0px_#000]" />
      </div>

      {/* Top Right Hanging Spider-Man directly below Register CTA button */}
      <div className="absolute top-0 right-4 xs:right-8 sm:right-14 md:right-20 lg:right-24 xl:right-28 z-30 pointer-events-auto">
        <HangingSpiderman onOpenRegister={onOpenRegister} />
      </div>

      {/* Floating Game Cartridges on Right Edge — three speeds for parallax depth */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-auto select-none z-[1]">
        <div className="deco-obj animate-cart1">
          <RetroCartridge color="#06b6d4" label="CODE" className="w-16 h-20" />
        </div>
        <div className="deco-obj animate-cart2" style={{ animationDelay: '0.5s' }}>
          <RetroCartridge color="#ec4899" label="AI" className="w-16 h-20" />
        </div>
        <div className="deco-obj animate-cart3" style={{ animationDelay: '1.1s' }}>
          <RetroCartridge color="#8b5cf6" label="GUSTO" className="w-16 h-20" />
        </div>
      </div>

      {/* Floating Sparkle Stars — twinkle independently */}
      <div className="absolute top-24 left-1/4 hidden sm:block pointer-events-none z-[1] animate-twinkle"
        style={{ animationDelay: '0.3s' }}>
        <ComicStar className="w-6 h-6 text-cyan-400" />
      </div>
      <div className="absolute bottom-28 right-1/4 hidden sm:block pointer-events-none z-[1] animate-twinkle-slow"
        style={{ animationDelay: '1.8s' }}>
        <ComicStar className="w-7 h-7 text-pink-500" />
      </div>
      {/* Extra subtle star — top-right quadrant */}
      <div className="absolute top-[35%] left-[15%] hidden lg:block pointer-events-none z-[1] animate-twinkle"
        style={{ animationDelay: '2.4s' }}>
        <ComicStar className="w-4 h-4 text-yellow-300" />
      </div>

      {/* Sun / gear-like background element — top-right, very slow oscillate */}
      <div className="absolute -top-8 right-[20%] hidden xl:block pointer-events-none select-none z-[0] opacity-30 deco-obj animate-gear"
        style={{ animationDelay: '0s' }}>
        <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gear/sun rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="56" y="4" width="8" height="20" rx="4"
              fill="#3b0764"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="28" fill="#3b0764" />
          <circle cx="60" cy="60" r="18" fill="#fec800" />
          <circle cx="60" cy="60" r="8" fill="#3b0764" />
        </svg>
      </div>

      {/* Small code/tech pixel decoration — mid left */}
      <div className="absolute left-[5%] top-[55%] hidden xl:block pointer-events-none select-none z-[0] opacity-40 animate-float-med"
        style={{ animationDelay: '1.3s' }}>
        <svg viewBox="0 0 64 40" className="w-16 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="64" height="40" rx="6" fill="#3b0764" stroke="#000" strokeWidth="3" />
          <text x="8" y="16" fontSize="9" fontFamily="monospace" fill="#84cc16" fontWeight="bold">&lt;IT/&gt;</text>
          <text x="8" y="30" fontSize="8" fontFamily="monospace" fill="#fde047">printf(42)</text>
        </svg>
      </div>

      {/* Rotating Circular Stamp Badge on Bottom-Left */}
      <div className="absolute bottom-6 left-6 hidden md:block z-20">
        <RotatingBadge className="w-28 h-28" />
      </div>

      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          {/* Top Symposium Institution Banner (Clean & Responsive Neo-Brutalist Arcade Capsule) */}
          <div className="w-full flex justify-center items-center mb-5 sm:mb-8 z-20 px-2 sm:px-4">
            <div className="group relative inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-white border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 transition-all duration-200 max-w-[98%] sm:max-w-[96%] select-none text-center">

              {/* Status diode + College Title row (never breaks awkwardly on mobile) */}
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="relative flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 bg-[#84cc16] border-[1.5px] border-black shadow-[0_0_6px_#84cc16]"></span>
                </span>
                <span className="font-['Chakra_Petch',sans-serif] font-black text-[11px] xs:text-xs sm:text-sm md:text-base text-zinc-950 tracking-wider uppercase drop-shadow-[0_1px_0px_rgba(255,255,255,0.8)] leading-tight text-center">
                  GOVERNMENT COLLEGE OF ENGINEERING, ERODE
                </span>
              </div>

              {/* Arcade Divider (desktop only) */}
              <span className="hidden sm:inline text-zinc-400 font-black text-sm select-none">
                •
              </span>

              {/* Department Accent Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 sm:py-1 rounded-md bg-[#ec4899] text-white text-[9.5px] xs:text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider font-['Chakra_Petch',sans-serif] border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000] whitespace-nowrap">
                  DEPARTMENT OF INFORMATION TECHNOLOGY
                </span>
                <span className="hidden lg:inline-flex items-center text-[10px] sm:text-[11px] font-mono text-zinc-900 font-extrabold bg-[#fec800] px-2 py-0.5 rounded border-[1.5px] border-black shadow-[1px_1px_0px_#000] tracking-wider whitespace-nowrap">
                  ESTD 1984 // AUTONOMOUS
                </span>
              </div>
            </div>
          </div>

          {/* EXACT BEHANCE "Let The Game Begin" COMPOSITION */}
          <div className="relative my-2 sm:my-5 select-none w-full max-w-full">
            {/* Top Line: "Let The" with cute Pink Gamepad Character */}
            <div className="flex items-center justify-center gap-2.5 xs:gap-4 sm:gap-8 flex-nowrap">
              {/* "Let" with interactive letter bouncing */}
              <h1
                onClick={triggerJump}
                className="text-[3.2rem] xs:text-[3.8rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000] cursor-pointer inline-flex"
                title="Click to see the letters jump!"
              >
                {["L", "e", "t"].map((letter, idx) => (
                  <span
                    key={`let-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`inline-block text-[#581c87] ${isJumping ? "animate-purple-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </h1>

              {/* The Cute Gamepad Mascot from Behance — idle wiggle animation & clickable jump trigger */}
              <div
                onClick={triggerJump}
                className="relative -mt-1 sm:-mt-6 deco-obj animate-idle-wiggle cursor-pointer shrink-0 active:scale-95 transition-transform duration-150"
                title="Click to see the letters jump!"
              >
                <RetroGamepad className="w-18 xs:w-24 sm:w-36 md:w-44 lg:w-56 h-auto drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000]" />
              </div>

              {/* "The" with interactive letter bouncing */}
              <h1
                onClick={triggerJump}
                className="text-[3.2rem] xs:text-[3.8rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000] cursor-pointer inline-flex"
                title="Click to see the letters jump!"
              >
                {["T", "h", "e"].map((letter, idx) => (
                  <span
                    key={`the-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 3) * 60}ms` }}
                    className={`inline-block text-[#581c87] ${isJumping ? "animate-purple-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>

            {/* Middle Line: Chunky Gaming Speech Bubble Banner */}
            <div className="my-2 xs:my-3 sm:my-4 flex justify-center relative">
              {/* Handwritten sticker badge floating on speech bubble */}
              <div
                onClick={triggerJump}
                className="absolute -top-5 sm:-top-7 -right-2 sm:-right-6 z-30 cursor-pointer"
                title="Click to see the letters jump!"
              >
                <HandwrittenSticker text="Click to Jump! ✨" color="#fde047" rotation="rotate-6" className="shadow-[3px_3px_0px_#000] text-sm xs:text-base sm:text-2xl" />
              </div>
              <div
                onClick={triggerJump}
                className="relative inline-block px-7 xs:px-10 sm:px-14 md:px-20 py-2.5 xs:py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl border-[3.5px] sm:border-[5px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000] animate-gusto-float animate-gusto-color cursor-pointer select-none group"
                title="Click to see the Gusto letters jump!"
              >
                {/* Speech bubble tail pointer with synchronized color cycle */}
                <div className="absolute -bottom-3 sm:-bottom-4 right-6 sm:right-10 w-0 h-0 border-l-[12px] sm:border-l-[16px] border-l-transparent border-t-[12px] sm:border-t-[16px] border-r-[12px] sm:border-r-[16px] border-r-transparent filter drop-shadow-[0_2px_0_#000] sm:drop-shadow-[0_4px_0_#000] animate-gusto-tail" />

                {/* Floating Little Retro Game Pixel Accents */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 text-yellow-300 animate-spin [animation-duration:6s] text-lg sm:text-2xl pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ★
                </div>
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-cyan-300 animate-bounce [animation-duration:2.5s] text-base sm:text-xl pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ✦
                </div>
                <div className="absolute -bottom-2 -left-2 text-pink-300 animate-pulse text-sm sm:text-lg pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ◆
                </div>

                {/* Individual Animated Jumping Letters for GUSTO */}
                <div className="flex items-center justify-center">
                  {["G", "u", "s", "t", "o"].map((letter, idx) => (
                    <span
                      key={`gusto-${idx}-${letterAnimationKey}`}
                      style={{
                        animationDelay: `${idx * 70}ms`,
                      }}
                      className={`inline-block text-[3.2rem] xs:text-[3.8rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase text-[#facc15] drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[7px_7px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:4px_#000] ${isJumping
                          ? "animate-letter-jump"
                          : "animate-gusto-text"
                        } hover:-translate-y-3 hover:scale-110 transition-transform duration-150 cursor-pointer`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Line: "Begin" with interactive letter bouncing */}
            <div className="flex justify-center">
              <h1
                onClick={triggerJump}
                className="text-[3.2rem] xs:text-[3.8rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[4px_4px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000] cursor-pointer inline-flex"
                title="Click to see the letters jump!"
              >
                {["B", "e", "g", "i", "n"].map((letter, idx) => (
                  <span
                    key={`begin-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`inline-block text-[#581c87] ${isJumping ? "animate-purple-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {/* === NATIONAL LEVEL TECHNICAL SYMPOSIUM BRIEFING (EXPANDED TO FIT PAGE PROPORTIONATELY WITH SCROLL REVEAL) === */}
          <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-12 px-2 sm:px-4 relative z-20">
            {/* 1. Top Continuous Moving Text Marquee Capsule - Scroll Reveal */}
            <div
              ref={marqueeRef}
              className={`w-full max-w-5xl mx-auto mb-8 sm:mb-10 rounded-full bg-white border-[3px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000] py-3 sm:py-4 px-6 sm:px-8 overflow-hidden select-none hover:shadow-[10px_10px_0px_#000] hover:-translate-y-0.5 transition-all duration-300 scroll-reveal ${
                marqueeInView ? "is-visible" : ""
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
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fff1f2] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${
                  statsInView ? "is-visible" : ""
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
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f5f3ff] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${
                  statsInView ? "is-visible" : ""
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
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fffbeb] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${
                  statsInView ? "is-visible" : ""
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
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f0fdf4] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${
                  statsInView ? "is-visible" : ""
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
              className={`w-full max-w-4xl mx-auto mb-8 sm:mb-12 select-none scroll-reveal ${
                timerInView ? "is-visible" : ""
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
              className={`relative flex flex-col items-center justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto px-2 select-none scroll-reveal ${
                ctaInView ? "is-visible" : ""
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
              className={`mt-8 sm:mt-12 w-full max-w-4xl mx-auto px-2 select-none scroll-reveal ${
                badgesInView ? "is-visible" : ""
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
              className={`mt-8 sm:mt-10 w-full max-w-4xl mx-auto rounded-2xl bg-black border-[3px] sm:border-[3.5px] border-black shadow-[5px_5px_0px_#000] py-2 sm:py-2.5 px-4 overflow-hidden select-none scroll-reveal ${
                bottomTickerInView ? "is-visible" : ""
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
    </section>
  );
}

