"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { YOUTUBE_DATA } from "@/src/data/youtube";
import { Play, ExternalLink, Sparkles, Tv } from "lucide-react";
import { YouTubeIcon } from "@/components/ui/Icons";

export function YouTubeSection() {
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <section id="youtube" className="py-14 sm:py-20 bg-retro-yellow-grid text-black relative border-b-[4px] border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-12 select-none">
          <div className="mb-2.5 sm:mb-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Tv className="w-4 h-4 text-red-600" />
              <span>Official Video Channel</span>
            </div>
          </div>

          <div className="relative w-full flex justify-center items-center my-1">
            <h2
              onClick={triggerJump}
              className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000] cursor-pointer flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 select-none group"
              title="Click to see the letters jump!"
            >
              {/* "Watch" with interactive letter wave */}
              <span className="inline-flex">
                {["W", "a", "t", "c", "h"].map((letter, idx) => (
                  <span
                    key={`yt-watch-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    className={`inline-block text-[#3b0764] ${
                      isJumping ? "animate-purple-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* "Teaser" with interactive red wave */}
              <span className="inline-flex">
                {["T", "e", "a", "s", "e", "r"].map((letter, idx) => (
                  <span
                    key={`yt-teaser-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 5) * 55}ms` }}
                    className={`inline-block text-[#ef4444] [-webkit-text-stroke:2px_#000] drop-shadow-[2px_2px_0px_#000] ${
                      isJumping ? "animate-red-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed max-w-2xl mx-auto">
            {YOUTUBE_DATA.description}
          </p>
        </div>

        {/* Retro Vintage CRT Television Cabinet — Inspired by Stefan Devai */}
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Antenna Dual Rods & Dome Base */}
          <div className="relative flex justify-center -mb-2 z-10 select-none">
            <div className="retro-tv-antenna-dome flex items-center justify-center">
              {/* Left Angled Antenna Rod */}
              <div className="retro-tv-rod-left">
                <div className="retro-tv-rod-tip" />
              </div>
              {/* Right Angled Antenna Rod */}
              <div className="retro-tv-rod-right">
                <div className="retro-tv-rod-tip" />
              </div>
            </div>
          </div>

          {/* Main Television Chassis Body */}
          <div className="retro-tv-chassis w-full rounded-[28px] sm:rounded-[36px] p-3.5 sm:p-5 md:p-6 text-white z-20">
            {/* Top Cabinet Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black/50 text-xs font-black select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 border border-black animate-pulse shadow-[0_0_8px_#ef4444]" />
                <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-200">
                  VHF CH-06 • GUSTO BROADCAST FEED
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs">
                <span className="px-2 py-0.5 rounded bg-black text-[#84cc16] border border-black/40 font-bold">
                  STEREO HI-FI
                </span>
                <span className="px-2 py-0.5 rounded bg-black text-yellow-300 border border-black/40 font-bold">
                  CRT 1080P
                </span>
              </div>
            </div>

            {/* Split TV Layout: CRT Screen (Left) + Control Panel (Right) */}
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-5">
              {/* CRT Video Screen Container */}
              <div className="flex-1 relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border-[3.5px] border-[#1d0e01] shadow-[inset_0_0_25px_rgba(0,0,0,0.85)]">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_DATA.featuredVideoId}?autoplay=1&rel=0`}
                    title={YOUTUBE_DATA.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="relative w-full h-full cursor-pointer group select-none"
                  >
                    <Image
                      src="/placeholder/video-thumbnail.png"
                      alt={YOUTUBE_DATA.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />

                    {/* CRT Scanline Beam Reflection */}
                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_4px)]" />

                    {/* Big Comic Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-[#ef4444] text-white border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] group-hover:scale-110 active:scale-95 transition-all">
                        <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1.5" />
                      </div>
                    </div>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded-md text-[9px] sm:text-xs font-black uppercase tracking-wider bg-[#facc15] text-black border border-black mb-1">
                          GUSTO Official Promo
                        </span>
                        <h3 className="text-sm sm:text-xl font-black drop-shadow-[2px_2px_0px_#000]">
                          {YOUTUBE_DATA.title}
                        </h3>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-yellow-300 drop-shadow flex items-center gap-1">
                        <span>▶ Click to Play</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Vintage TV Control Console (Dials & Speakers) */}
              <div className="retro-tv-controls rounded-2xl p-3 sm:p-4 flex flex-row md:flex-col items-center justify-between gap-3 text-black w-full md:w-36 lg:w-40 shrink-0 select-none">
                {/* Top Air Slats */}
                <div className="flex gap-1.5 py-1">
                  <div className="w-1.5 h-4 sm:h-5 bg-[#1d0e01] rounded-full" />
                  <div className="w-1.5 h-6 sm:h-8 bg-[#1d0e01] rounded-full" />
                  <div className="w-1.5 h-4 sm:h-5 bg-[#1d0e01] rounded-full" />
                </div>

                {/* Rotary Dials Container */}
                <div className="flex md:flex-col items-center gap-3 sm:gap-4">
                  {/* Channel Tuning Knob */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      title="Turn Knob to Toggle Video"
                      className="retro-tv-knob"
                    >
                      <div className="retro-tv-knob-indicator" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase text-[#1d0e01] mt-1 tracking-wider">
                      CH / TUNE
                    </span>
                  </div>

                  {/* Volume / Power Knob */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      title="Turn Knob to Toggle Video"
                      className="retro-tv-knob"
                    >
                      <div className="retro-tv-knob-indicator rotate-90" />
                    </button>
                    <span className="text-[9px] font-mono font-black uppercase text-[#1d0e01] mt-1 tracking-wider">
                      VOL / PWR
                    </span>
                  </div>
                </div>

                {/* Speaker Grille Section */}
                <div className="flex flex-col gap-1.5 w-full max-w-[80px] md:max-w-none">
                  {/* Acoustic Dots */}
                  <div className="flex justify-center gap-1.5">
                    <div className="retro-tv-speaker-dot" />
                    <div className="retro-tv-speaker-dot" />
                    <div className="retro-tv-speaker-dot" />
                  </div>
                  {/* Horizontal Sound Slots */}
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="retro-tv-speaker-slot" />
                    <div className="retro-tv-speaker-slot" />
                    <div className="retro-tv-speaker-slot" />
                  </div>
                </div>

                {/* Vintage Brand Plate */}
                <div className="px-2 py-0.5 rounded bg-[#7f5934] text-white border border-black text-[8px] font-mono font-black uppercase tracking-widest text-center shadow-xs">
                  GUSTO-TRON
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Angled TV Base Stand Legs & Shadow Rail */}
          <div className="w-full flex items-center justify-between px-10 sm:px-16 -mt-1 select-none">
            <div className="retro-tv-foot -rotate-12 rounded-b-md" />
            <div className="h-1.5 flex-1 bg-black/60 rounded-full mx-2 shadow-sm" />
            <div className="retro-tv-foot rotate-12 rounded-b-md" />
          </div>

          {/* Channel Subscribe Action Bar - Seamlessly fit to yellow grid */}
          <div className="mt-6 w-full p-4 sm:p-5 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-black text-[#3b0764]">
                Official YouTube: {YOUTUBE_DATA.channelName}
              </h4>
              <p className="text-xs font-bold text-zinc-600 mt-0.5">
                Subscribe for symposium updates, event teasers, and valedictory coverage.
              </p>
            </div>

            <a
              href={YOUTUBE_DATA.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-black text-xs sm:text-sm bg-[#ef4444] text-white shadow-[3px_3px_0px_#000] uppercase tracking-wider cursor-pointer"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>Visit Channel</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
