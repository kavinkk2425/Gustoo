"use client";

import { useState } from "react";
import Image from "next/image";
import { YOUTUBE_DATA } from "@/src/data/youtube";
import { Play, ExternalLink, Sparkles, Tv } from "lucide-react";
import { YouTubeIcon } from "@/components/ui/Icons";

export function YouTubeSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="youtube" className="py-14 sm:py-20 bg-retro-yellow-grid text-black relative border-b-[4px] border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Tv className="w-4 h-4 text-red-600" />
            <span>Official Video Channel</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Watch <span className="text-[#ef4444] [-webkit-text-stroke:2px_#000]">Teaser</span>
          </h2>
          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed">
            {YOUTUBE_DATA.description}
          </p>
        </div>

        {/* Retro Arcade Television Cabinet */}
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-6 bg-white border-[3px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000]">
          {/* Top Arcade Screen Status bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black text-xs font-black">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-black animate-pulse" />
              <span className="uppercase text-[#3b0764] tracking-wider">LIVE STREAM FEED • GUSTO GCEE</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#84cc16] border border-black text-black text-[10px]">
              HD 1080P
            </span>
          </div>

          {/* Screen Frame */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border-[3px] border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
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
                className="relative w-full h-full cursor-pointer group"
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

                {/* Big Comic Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#ef4444] text-white border-[3.5px] border-black shadow-[5px_5px_0px_#000] group-hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1.5" />
                  </div>
                </div>

                {/* Video Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#facc15] text-black border border-black mb-1.5">
                      GUSTO Official Promo
                    </span>
                    <h3 className="text-base sm:text-2xl font-black drop-shadow-[2px_2px_0px_#000]">
                      {YOUTUBE_DATA.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-yellow-300 drop-shadow">
                    ▶ Click to Play
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Under-video Banner */}
          <div className="mt-4 pt-4 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-black text-[#3b0764]">
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
              className="neo-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-black text-xs sm:text-sm bg-[#ef4444] text-white shadow-[3px_3px_0px_#000] uppercase tracking-wider"
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
