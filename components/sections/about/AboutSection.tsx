"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ABOUT_DATA } from "@/src/data/about";
import { CheckCircle2, MapPin, Award, Sparkles, Building2, Flame } from "lucide-react";
import { HandwrittenSticker } from "@/components/ui/RetroStickers";

export function AboutSection() {
  const [letterAnimationKey, setLetterAnimationKey] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const [highlightsKey, setHighlightsKey] = useState(0);
  const [isHighlightsJumping, setIsHighlightsJumping] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number | null>(null);

  const triggerJump = () => {
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
  };

  const triggerHighlightsJump = () => {
    setHighlightsKey((prev) => prev + 1);
    setIsHighlightsJumping(true);
  };

  const handleHighlightClick = (index: number) => {
    setActiveHighlightIndex(index);
    setTimeout(() => {
      setActiveHighlightIndex(null);
    }, 750);
  };

  useEffect(() => {
    if (isJumping) {
      const timer = setTimeout(() => {
        setIsJumping(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [isJumping, letterAnimationKey]);

  useEffect(() => {
    if (isHighlightsJumping) {
      const timer = setTimeout(() => {
        setIsHighlightsJumping(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [isHighlightsJumping, highlightsKey]);

  return (
    <section id="about" className="py-14 sm:py-20 bg-[#fffbeb] text-black relative border-b-[4px] border-black font-unbounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14 relative select-none">
          {/* Top Pill Badge - Dedicated Stacked Row */}
          <div className="mb-2.5 sm:mb-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#ec4899]" />
              <span>Legacy & Heritage</span>
            </div>
          </div>

          {/* Interactive Title with Letter-by-Letter Wave Bounce */}
          <div className="relative w-full flex justify-center items-center my-1">
            {/* Click to Jump hint sticker */}
            <div
              onClick={triggerJump}
              className="absolute -top-6 sm:-top-8 right-2 sm:right-12 z-20 cursor-pointer hidden xs:block"
              title="Click to see the letters jump!"
            >
              <HandwrittenSticker
                text="Click to Jump! ✨"
                color="#facc15"
                textColor="#000000"
                rotation="rotate-6"
                className="text-xs sm:text-sm shadow-[2px_2px_0px_#000]"
              />
            </div>

            <h2
              onClick={triggerJump}
              className="text-2xl xs:text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000] cursor-pointer flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 select-none group font-unbounded"
              title="Click to see the letters jump!"
            >
              {/* "About" with interactive letter wave */}
              <span className="inline-flex">
                {["A", "b", "o", "u", "t"].map((letter, idx) => (
                  <span
                    key={`about-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    className={`inline-block text-[#3b0764] ${
                      isJumping ? "animate-purple-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* "GUSTO" with interactive neon lime wave */}
              <span className="inline-flex">
                {["G", "U", "S", "T", "O"].map((letter, idx) => (
                  <span
                    key={`gusto-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 5) * 55}ms` }}
                    className={`inline-block text-[#84cc16] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:2.5px_#000] drop-shadow-[2px_2px_0px_#000] ${
                      isJumping ? "animate-lime-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* "'26" with interactive neon wave */}
              <span className="inline-flex">
                {["'", "2", "6"].map((letter, idx) => (
                  <span
                    key={`year-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 10) * 55}ms` }}
                    className={`inline-block text-[#84cc16] [-webkit-text-stroke:2px_#000] sm:[-webkit-text-stroke:2.5px_#000] drop-shadow-[2px_2px_0px_#000] ${
                      isJumping ? "animate-lime-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed">
            {ABOUT_DATA.institution} • {ABOUT_DATA.department}
          </p>
        </div>

        {/* 3 Authentic Retro Gaming Cartridge Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-14 items-stretch">
          
          {/* CARTRIDGE 01: GUSTO '26 (Cyber Arcade Cartridge) */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#fff5f9] border-[3px] sm:border-[3.5px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[6px_6px_0px_#000] flex flex-col justify-between h-full hover:-translate-y-2 hover:shadow-[10px_10px_0px_#000] transition-all duration-200 relative overflow-hidden group">
            {/* Corner Hardware Screws */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>

            {/* Top Cartridge Grip Ridges */}
            <div className="flex justify-center gap-1.5 pt-2.5 pb-1 opacity-30 group-hover:opacity-60 transition-opacity">
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
            </div>

            {/* Cartridge Header Bar with LED Blinker */}
            <div className="mx-2.5 xs:mx-3.5 mt-1 px-2.5 xs:px-3 py-1.5 rounded-xl bg-[#ec4899] border-2 border-black flex items-center justify-between text-white shadow-[2px_2px_0px_#000]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 border border-black animate-pulse" />
                <span className="text-[9px] xs:text-[10px] font-mono font-black uppercase tracking-wider">
                  ROM-01 // GUSTO_OS
                </span>
              </div>
              <span className="text-[8px] xs:text-[9px] font-mono font-bold bg-black/40 px-1.5 py-0.5 rounded text-yellow-300">
                64-BIT
              </span>
            </div>

            {/* Main Cartridge Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Holographic Logo Chip */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#ec4899] border-[2.5px] border-black shadow-[3px_3px_0px_#000] p-1.5 flex items-center justify-center shrink-0">
                    <Image
                      src="/logos/GUSTO/gradient.png"
                      alt="GUSTO 2K26"
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <h3
                      onClick={triggerJump}
                      className="text-xl sm:text-2xl font-black text-[#3b0764] leading-tight font-unbounded cursor-pointer hover:text-[#84cc16] transition-colors select-none"
                      title="Click to jump!"
                    >
                      {ABOUT_DATA.symposiumName}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-black text-[#ec4899] uppercase tracking-wider">
                      {ABOUT_DATA.tagline}
                    </p>
                  </div>
                </div>

                {/* RPG Attributes Grid */}
                <div className="grid grid-cols-3 gap-1.5 mb-3 text-center">
                  <div className="p-1 rounded-lg bg-pink-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">QUESTS</span>
                    <span className="text-[10px] font-mono font-black text-[#ec4899]">9 EVENTS</span>
                  </div>
                  <div className="p-1 rounded-lg bg-yellow-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">TIER</span>
                    <span className="text-[10px] font-mono font-black text-amber-700">NATIONAL</span>
                  </div>
                  <div className="p-1 rounded-lg bg-purple-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">REWARDS</span>
                    <span className="text-[10px] font-mono font-black text-purple-700">₹ CASH</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                  {ABOUT_DATA.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="font-mono text-zinc-600 text-[11px]">EVENT LAUNCH:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#facc15] border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-black text-[11px]">
                  {ABOUT_DATA.eventDate}
                </span>
              </div>
            </div>

            {/* Cartridge Bottom Gold Circuit Connector Pins */}
            <div className="bg-zinc-900 border-t-[2.5px] border-black py-1 px-4 flex justify-between items-center overflow-hidden">
              <span className="text-[8px] font-mono text-zinc-400 font-bold tracking-widest uppercase">
                GUSTO-PIN-BUS
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-3 bg-gradient-to-b from-yellow-300 to-amber-500 rounded-b-[1px] border-[0.5px] border-black/60 shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CARTRIDGE 02: GCEE ERODE (Hardware / Campus Core Unit) */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#f7fee7] border-[3px] sm:border-[3.5px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[6px_6px_0px_#000] flex flex-col justify-between h-full hover:-translate-y-2 hover:shadow-[10px_10px_0px_#000] transition-all duration-200 relative overflow-hidden group">
            {/* Corner Hardware Screws */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>

            {/* Top Cartridge Grip Ridges */}
            <div className="flex justify-center gap-1.5 pt-2.5 pb-1 opacity-30 group-hover:opacity-60 transition-opacity">
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
            </div>

            {/* Cartridge Header Bar with LED Blinker */}
            <div className="mx-2.5 xs:mx-3.5 mt-1 px-2.5 xs:px-3 py-1.5 rounded-xl bg-[#84cc16] border-2 border-black flex items-center justify-between text-black shadow-[2px_2px_0px_#000]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 border border-black animate-pulse" />
                <span className="text-[9px] xs:text-[10px] font-mono font-black uppercase tracking-wider">
                  SECTOR-02 // GCEE_CORE
                </span>
              </div>
              <span className="text-[8px] xs:text-[9px] font-mono font-bold bg-black text-lime-400 px-1.5 py-0.5 rounded">
                ESTD 1984
              </span>
            </div>

            {/* Main Cartridge Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Holographic Logo Chip */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#84cc16] border-[2.5px] border-black shadow-[3px_3px_0px_#000] p-1.5 flex items-center justify-center shrink-0">
                    <Image
                      src="/logos/GCEE/bronze.png"
                      alt="GCEE College Logo"
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#3b0764] leading-tight font-unbounded">
                      GCEE Erode
                    </h3>
                    <p className="text-[10px] sm:text-xs font-black text-[#65a30d] uppercase tracking-wider">
                      Formerly: {ABOUT_DATA.formerlyKnownAs}
                    </p>
                  </div>
                </div>

                {/* RPG Attributes Grid */}
                <div className="grid grid-cols-3 gap-1.5 mb-3 text-center">
                  <div className="p-1 rounded-lg bg-lime-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">FOUNDED</span>
                    <span className="text-[10px] font-mono font-black text-[#4d7c0f]">1984 IRTT</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">TYPE</span>
                    <span className="text-[10px] font-mono font-black text-emerald-800">GOVT ENGG</span>
                  </div>
                  <div className="p-1 rounded-lg bg-cyan-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">CAMPUS</span>
                    <span className="text-[10px] font-mono font-black text-cyan-800">ERODE</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                  A premier government institution established in 1984 under the Institute of Road and Transport Technology, situated in Suriyampalayam, Chithode, Erode. Renowned for technical education, innovation, and producing outstanding engineers.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="flex items-center gap-1 font-mono text-zinc-700 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#ec4899]" />
                  <span>Chithode, Erode</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#84cc16] border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-black text-[11px]">
                  PIN: 638316
                </span>
              </div>
            </div>

            {/* Cartridge Bottom Gold Circuit Connector Pins */}
            <div className="bg-zinc-900 border-t-[2.5px] border-black py-1 px-4 flex justify-between items-center overflow-hidden">
              <span className="text-[8px] font-mono text-zinc-400 font-bold tracking-widest uppercase">
                GCEE-PIN-BUS
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-3 bg-gradient-to-b from-yellow-300 to-amber-500 rounded-b-[1px] border-[0.5px] border-black/60 shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CARTRIDGE 03: IT DEPARTMENT & AIT (Dev Guild Unit) */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#ecfeff] border-[3px] sm:border-[3.5px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[6px_6px_0px_#000] flex flex-col justify-between h-full hover:-translate-y-2 hover:shadow-[10px_10px_0px_#000] transition-all duration-200 relative overflow-hidden group">
            {/* Corner Hardware Screws */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-zinc-400 select-none">✚</span>

            {/* Top Cartridge Grip Ridges */}
            <div className="flex justify-center gap-1.5 pt-2.5 pb-1 opacity-30 group-hover:opacity-60 transition-opacity">
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
              <div className="w-7 h-1 rounded-full bg-black" />
            </div>

            {/* Cartridge Header Bar with LED Blinker */}
            <div className="mx-2.5 xs:mx-3.5 mt-1 px-2.5 xs:px-3 py-1.5 rounded-xl bg-[#06b6d4] border-2 border-black flex items-center justify-between text-black shadow-[2px_2px_0px_#000]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400 border border-black animate-pulse" />
                <span className="text-[9px] xs:text-[10px] font-mono font-black uppercase tracking-wider">
                  UNIT-03 // AIT_GUILD
                </span>
              </div>
              <span className="text-[8px] xs:text-[9px] font-mono font-bold bg-black text-cyan-300 px-1.5 py-0.5 rounded">
                ACTIVE
              </span>
            </div>

            {/* Main Cartridge Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* Holographic Logo Chip */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#06b6d4] border-[2.5px] border-black shadow-[3px_3px_0px_#000] p-1.5 flex items-center justify-center shrink-0">
                    <Image
                      src="/logos/AIT/gold.png"
                      alt="AIT Logo"
                      fill
                      sizes="56px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#3b0764] leading-tight font-unbounded">
                      IT Department
                    </h3>
                    <p className="text-[10px] sm:text-xs font-black text-[#0891b2] uppercase tracking-wider">
                      Association of Info Tech (AIT)
                    </p>
                  </div>
                </div>

                {/* RPG Attributes Grid */}
                <div className="grid grid-cols-3 gap-1.5 mb-3 text-center">
                  <div className="p-1 rounded-lg bg-cyan-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">SKILLS</span>
                    <span className="text-[10px] font-mono font-black text-cyan-800">CODE / AI</span>
                  </div>
                  <div className="p-1 rounded-lg bg-indigo-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">EVENTS</span>
                    <span className="text-[10px] font-mono font-black text-indigo-800">HACKATHONS</span>
                  </div>
                  <div className="p-1 rounded-lg bg-amber-100 border border-black/30">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase block">STATUS</span>
                    <span className="text-[10px] font-mono font-black text-amber-800">VERIFIED</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 leading-relaxed">
                  Empowering students through advanced software engineering, algorithmic problem solving, hands-on hackathons, and state-level technical symposiums.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black">
                <span className="flex items-center gap-1 font-mono text-zinc-700 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Student Guild</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#06b6d4] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-black text-[11px]">
                  AIT Active
                </span>
              </div>
            </div>

            {/* Cartridge Bottom Gold Circuit Connector Pins */}
            <div className="bg-zinc-900 border-t-[2.5px] border-black py-1 px-4 flex justify-between items-center overflow-hidden">
              <span className="text-[8px] font-mono text-zinc-400 font-bold tracking-widest uppercase">
                AIT-PIN-BUS
              </span>
              <div className="flex gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-3 bg-gradient-to-b from-yellow-300 to-amber-500 rounded-b-[1px] border-[0.5px] border-black/60 shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Highlights Board */}
        <div className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#3b0764] border-[3.5px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b-2 border-white/20 select-none">
            <div>
              <div
                onClick={triggerHighlightsJump}
                className="cursor-pointer inline-flex flex-wrap items-center gap-x-2 sm:gap-x-3 group font-unbounded"
                title="Click to see text jump! ✨"
              >
                {/* "Symposium" */}
                <span className="inline-flex">
                  {["S", "y", "m", "p", "o", "s", "i", "u", "m"].map((letter, idx) => (
                    <span
                      key={`hl-symp-${idx}-${highlightsKey}`}
                      style={{ animationDelay: `${idx * 45}ms` }}
                      className={`inline-block font-black text-xl sm:text-3xl text-[#fde047] drop-shadow-[2px_2px_0px_#000] ${
                        isHighlightsJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-1.5 hover:scale-110 transition-transform duration-150`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>

                {/* "Key" */}
                <span className="inline-flex">
                  {["K", "e", "y"].map((letter, idx) => (
                    <span
                      key={`hl-key-${idx}-${highlightsKey}`}
                      style={{ animationDelay: `${(idx + 9) * 45}ms` }}
                      className={`inline-block font-black text-xl sm:text-3xl text-[#bef264] drop-shadow-[2px_2px_0px_#000] ${
                        isHighlightsJumping ? "animate-lime-jump" : ""
                      } hover:-translate-y-1.5 hover:scale-110 transition-transform duration-150`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>

                {/* "Highlights" */}
                <span className="inline-flex">
                  {["H", "i", "g", "h", "l", "i", "g", "h", "t", "s"].map((letter, idx) => (
                    <span
                      key={`hl-high-${idx}-${highlightsKey}`}
                      style={{ animationDelay: `${(idx + 12) * 45}ms` }}
                      className={`inline-block font-black text-xl sm:text-3xl text-[#fde047] drop-shadow-[2px_2px_0px_#000] ${
                        isHighlightsJumping ? "animate-letter-jump" : ""
                      } hover:-translate-y-1.5 hover:scale-110 transition-transform duration-150`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-pink-200 mt-1">
                Why thousands of engineering students converge at GUSTO:
              </p>
            </div>

            {/* Registration Fee Pill with Tactile Click */}
            <div
              onClick={triggerHighlightsJump}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#84cc16] hover:bg-[#a3e635] active:translate-y-1 active:shadow-[1px_1px_0px_#000] border-2 border-black text-black font-black text-xs sm:text-sm shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] cursor-pointer transition-all duration-150"
              title="Click to trigger jump!"
            >
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
              <span>Registration Fee: ₹{ABOUT_DATA.registrationFee} per head</span>
            </div>
          </div>

          {/* 6 Interactive Clickable Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 select-none">
            {ABOUT_DATA.highlights.map((highlight, index) => {
              const isCardActive = activeHighlightIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => handleHighlightClick(index)}
                  className={`group relative flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-[2.5px] border-black cursor-pointer transition-all duration-150 active:translate-y-1.5 active:shadow-[1px_1px_0px_#000] ${
                    isCardActive
                      ? "bg-[#fef08a] text-black shadow-[6px_6px_0px_#000] scale-[1.03] border-amber-400"
                      : "bg-white text-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#000] hover:border-[#84cc16]"
                  }`}
                  title="Click to interact!"
                >
                  {/* Active Sparkle Tag */}
                  {isCardActive && (
                    <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-black text-[#facc15] font-mono font-black text-[9px] border border-yellow-400 shadow-sm animate-bounce">
                      ★ ACTIVE
                    </span>
                  )}

                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border border-black flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                      isCardActive
                        ? "bg-black text-[#84cc16] scale-125 rotate-12"
                        : "bg-[#84cc16] text-black group-hover:scale-110 group-hover:rotate-6"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs sm:text-sm font-black leading-snug transition-colors ${
                        isCardActive ? "text-purple-950 font-black" : "text-black"
                      }`}
                    >
                      {highlight}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCardActive ? "⚡ VERIFIED HIGHLIGHT" : "CLICK TO FOCUS"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
