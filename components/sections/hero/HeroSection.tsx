"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  RetroGamepad,
  RetroConsole,
  RetroCartridge,
  SoccerFireball,
  RotatingBadge,
  ComicStar,
} from "@/components/ui/RetroStickers";

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const targetDate = new Date("2026-03-06T09:00:00+05:30").getTime();

  const [letterAnimationKey, setLetterAnimationKey] = useState(0);

  const handleGustoClick = () => {
    setLetterAnimationKey((prev) => prev + 1);
  };

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
    <section className="relative min-h-[92vh] bg-retro-yellow-grid overflow-hidden pt-12 pb-20 border-b-[4px] border-black">
      {/* === ANIMATED BACKGROUND ENVIRONMENT LAYER (pointer-events-none, non-intrusive) === */}

      {/* Top Left Console — floats slowly */}
      <div className="absolute top-10 left-6 sm:left-14 hidden md:block deco-obj animate-float-slow pointer-events-auto select-none z-[1]"
        style={{ animationDelay: '0s' }}>
        <RetroConsole className="w-28 sm:w-36 h-auto drop-shadow-[4px_4px_0px_#000]" />
      </div>

      {/* Top Right Soccer Fireball — faster float for foreground depth */}
      <div className="absolute top-12 right-8 sm:right-20 hidden md:block deco-obj animate-float-fast pointer-events-auto select-none z-[1]"
        style={{ animationDelay: '0.7s' }}>
        <SoccerFireball className="w-20 sm:w-24 h-auto drop-shadow-[4px_4px_0px_#000]" />
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
          {/* Top Symposium Institution Pill (Optimized for Mobile & Desktop) */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] mb-4 sm:mb-6 max-w-[95%]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] border border-black animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm font-black text-black uppercase tracking-wider truncate">
              <span className="sm:hidden">GCEE ERODE • IT DEPARTMENT</span>
              <span className="hidden sm:inline">{ABOUT_DATA.institution} • {ABOUT_DATA.department}</span>
            </span>
          </div>

          {/* EXACT BEHANCE "Let The Game Begin" COMPOSITION */}
          <div className="relative my-2 sm:my-5 select-none w-full max-w-full">
            {/* Top Line: "Let The" with cute Pink Gamepad Character */}
            <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-8 flex-nowrap">
              <h1 className="text-[2.6rem] xs:text-[3.25rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000]">
                Let
              </h1>

              {/* The Cute Gamepad Mascot from Behance — idle wiggle animation */}
              <div className="relative -mt-1 sm:-mt-6 deco-obj animate-idle-wiggle cursor-pointer shrink-0">
                <RetroGamepad className="w-16 xs:w-20 sm:w-32 md:w-44 lg:w-56 h-auto drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000]" />
              </div>

              <h1 className="text-[2.6rem] xs:text-[3.25rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000]">
                The
              </h1>
            </div>

            {/* Middle Line: Chunky Gaming Speech Bubble Banner */}
            <div className="my-2 sm:my-4 flex justify-center">
              <div
                onClick={handleGustoClick}
                className="relative inline-block px-6 xs:px-8 sm:px-14 md:px-20 py-2 xs:py-3 sm:py-4 rounded-2xl sm:rounded-3xl border-[3px] sm:border-[5px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[10px_10px_0px_#000] animate-gusto-float animate-gusto-color cursor-pointer select-none group"
                title="Click to see the Gusto letters jump!"
              >
                {/* Speech bubble tail pointer with synchronized color cycle */}
                <div className="absolute -bottom-2.5 sm:-bottom-4 right-5 sm:right-10 w-0 h-0 border-l-[10px] sm:border-l-[16px] border-l-transparent border-t-[10px] sm:border-t-[16px] border-r-[10px] sm:border-r-[16px] border-r-transparent filter drop-shadow-[0_2px_0_#000] sm:drop-shadow-[0_4px_0_#000] animate-gusto-tail" />

                {/* Floating Little Retro Game Pixel Accents */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 text-yellow-300 animate-spin [animation-duration:6s] text-base sm:text-2xl pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ★
                </div>
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-cyan-300 animate-bounce [animation-duration:2.5s] text-sm sm:text-xl pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ✦
                </div>
                <div className="absolute -bottom-2 -left-2 text-pink-300 animate-pulse text-xs sm:text-lg pointer-events-none drop-shadow-[1.5px_1.5px_0px_#000]">
                  ◆
                </div>

                {/* Individual Animated Jumping Letters for GUSTO */}
                <div className="flex items-center justify-center">
                  {["G", "u", "s", "t", "o"].map((letter, idx) => (
                    <span
                      key={`${idx}-${letterAnimationKey}`}
                      style={{
                        animationDelay: `${idx * 70}ms`,
                      }}
                      className={`inline-block text-[2.6rem] xs:text-[3.25rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[7px_7px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:4px_#000] ${letterAnimationKey > 0
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

            {/* Bottom Line: "Begin" */}
            <div className="flex justify-center">
              <h1 className="text-[2.6rem] xs:text-[3.25rem] sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#581c87] tracking-tight drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[6px_6px_0px_#000] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:3.5px_#000]">
                Begin
              </h1>
            </div>
          </div>

          {/* Subtitle Card (Contained for mobile) */}
          <div className="mt-2 sm:mt-3 mb-5 sm:mb-6 inline-block max-w-[94%] sm:max-w-full px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
            <p className="text-[10px] xs:text-xs sm:text-base md:text-lg font-black text-[#3b0764] uppercase tracking-wide leading-snug">
              {ABOUT_DATA.tagline} • {ABOUT_DATA.eventDate}
            </p>
          </div>

          {/* Quick Stats Grid in Neo-Brutalist Arcade Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-3xl mb-6 sm:mb-8">
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] text-center flex flex-col justify-between">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#ec4899] mb-1" />
              <span className="text-[9px] sm:text-[11px] font-bold text-zinc-600 uppercase block truncate">Event Date</span>
              <span className="text-xs sm:text-base font-black text-black leading-tight">{ABOUT_DATA.eventDate}</span>
            </div>
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] text-center flex flex-col justify-between">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#8b5cf6] mb-1" />
              <span className="text-[9px] sm:text-[11px] font-bold text-zinc-600 uppercase block truncate">Reg. Last Date</span>
              <span className="text-xs sm:text-sm font-black text-black leading-tight truncate">
                {ABOUT_DATA.registrationLastDate}
              </span>
            </div>
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] text-center flex flex-col justify-between">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#f59e0b] mb-1" />
              <span className="text-[9px] sm:text-[11px] font-bold text-zinc-600 uppercase block truncate">Competitions</span>
              <span className="text-xs sm:text-base font-black text-black leading-tight">
                {GUSTO_EVENTS.length} Total Events
              </span>
            </div>
            <div className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[3px] border-black shadow-[2.5px_2.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] text-center flex flex-col justify-between">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-[#10b981] mb-1" />
              <span className="text-[9px] sm:text-[11px] font-bold text-zinc-600 uppercase block truncate">Campus Venue</span>
              <span className="text-xs sm:text-sm font-black text-black leading-tight">GCEE, Erode</span>
            </div>
          </div>

          {/* Retro Arcade Countdown Timer */}
          <div className="w-full max-w-xl p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#3b0764] border-[3px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000] mb-8">
            <div className="flex items-center justify-between mb-2.5 px-1 sm:px-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#fde047]">
                ★ Level Starts In ★
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-pink-300">March 06, 2026</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#facc15] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
                <span className="text-xl sm:text-4xl font-black text-black font-mono">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-black uppercase mt-0.5">Days</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#84cc16] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
                <span className="text-xl sm:text-4xl font-black text-black font-mono">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-black uppercase mt-0.5">Hours</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#06b6d4] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
                <span className="text-xl sm:text-4xl font-black text-black font-mono">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-black uppercase mt-0.5">Mins</span>
              </div>
              <div className="flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#ec4899] border-2 sm:border-[3px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000]">
                <span className="text-xl sm:text-4xl font-black text-white font-mono">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-black text-white uppercase mt-0.5">Secs</span>
              </div>
            </div>
          </div>

          {/* Action CTAs in Neo-Brutalist 3D Button Style */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl">
            <button
              onClick={onOpenRegister}
              className="neo-btn w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-black text-sm sm:text-lg text-white bg-[#ec4899] hover:bg-[#db2777] shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Register Now • ₹{ABOUT_DATA.registrationFee}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#events"
              className="neo-btn px-5 sm:px-6 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm text-black bg-[#84cc16] hover:bg-[#65a30d] shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] text-center uppercase tracking-wide"
            >
              Explore 9 Events
            </a>

            <a
              href="#rules"
              className="neo-btn px-5 sm:px-6 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm text-black bg-white hover:bg-zinc-100 shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] flex items-center justify-center gap-1.5 uppercase tracking-wide"
            >
              <FileText className="w-4 h-4 text-[#3b0764]" />
              <span>Event Rules</span>
            </a>

            <a
              href="#youtube"
              className="neo-btn px-5 sm:px-6 py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm text-white bg-[#ef4444] hover:bg-[#dc2626] shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] flex items-center justify-center gap-1.5 uppercase tracking-wide"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Teaser</span>
            </a>
          </div>

          {/* Ticker Badges */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] xs:text-[11px] sm:text-xs font-black text-black w-full max-w-2xl">
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] w-full sm:w-auto text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Official GUSTO Registration</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] w-full sm:w-auto text-center">
              <Bus className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Buses from Erode, Chithode & Bhavani</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] w-full sm:w-auto text-center">
              <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Cash Prizes & Certificates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

