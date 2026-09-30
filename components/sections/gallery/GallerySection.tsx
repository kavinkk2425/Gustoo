"use client";

import { useState } from "react";
import Image from "next/image";
import { GALLERY_ITEMS } from "@/src/data/gallery";
import { GalleryItem } from "@/src/data/types";
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedPhoto(item);
    setCurrentIndex(index);
  };

  const nextPhoto = () => {
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(filteredItems[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(filteredItems[prevIdx]);
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#fffbeb] text-black relative border-b-[4px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4 text-[#ec4899]" />
            <span>Memories Captured</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Symposium <span className="text-[#ec4899]">Gallery</span>
          </h2>
          <p className="text-xs sm:text-base font-bold text-zinc-700 leading-relaxed">
            Real snapshots from previous editions of GUSTO showcasing inaugurations, intense coding rounds, paper & project presentations, and awards at GCEE.
          </p>
        </div>

        {/* Category Filter Pills in Neo-Brutalist Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8 sm:mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`neo-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer ${activeCategory === "all"
                ? "bg-[#3b0764] text-white shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
              }`}
          >
            All Moments ({GALLERY_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveCategory("ceremony")}
            className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer ${activeCategory === "ceremony"
                ? "bg-[#ec4899] text-white shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
              }`}
          >
            Ceremonies & Awards
          </button>
          <button
            onClick={() => setActiveCategory("events")}
            className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer ${activeCategory === "events"
                ? "bg-[#84cc16] text-black shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
              }`}
          >
            Competitions & Labs
          </button>
          <button
            onClick={() => setActiveCategory("symposium")}
            className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer ${activeCategory === "symposium"
                ? "bg-[#06b6d4] text-black shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
              }`}
          >
            Auditorium Delegates
          </button>
          <button
            onClick={() => setActiveCategory("campus")}
            className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider cursor-pointer ${activeCategory === "campus"
                ? "bg-[#f59e0b] text-black shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
              }`}
          >
            Campus & Volunteers
          </button>
        </div>

        {/* Gallery Polaroid / Trading Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item, index)}
              className="p-3 bg-white rounded-3xl border-[3.5px] border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] cursor-pointer transition-all flex flex-col group"
            >
              {/* Photo Frame */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-black border-2 border-black">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-xl bg-white border border-black shadow-[2px_2px_0px_#000] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-black" />
                </div>
              </div>

              {/* Caption Bottom Bar */}
              <div className="pt-3 px-1">
                <h4 className="text-sm font-black text-[#3b0764] truncate">{item.alt}</h4>
                <p className="text-[11px] font-bold text-zinc-600 line-clamp-2 mt-0.5 leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-[#ec4899] text-white border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-all cursor-pointer z-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#facc15] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-all cursor-pointer z-50"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#facc15] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-all cursor-pointer z-50"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 font-bold" />
            </button>

            <div className="max-w-3xl w-full p-3 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[10px_10px_0px_#000]">
              <div className="relative w-full h-[40vh] sm:h-[60vh] rounded-xl sm:rounded-2xl overflow-hidden bg-black border-2 border-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <h3 className="text-base sm:text-xl font-black text-[#3b0764]">{selectedPhoto.alt}</h3>
                <p className="text-xs sm:text-sm font-bold text-zinc-700 mt-0.5 sm:mt-1">{selectedPhoto.caption}</p>
                <p className="text-[10px] sm:text-xs font-black text-[#ec4899] mt-1.5 sm:mt-2">
                  PHOTO {currentIndex + 1} OF {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
