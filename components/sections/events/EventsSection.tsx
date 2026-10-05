"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GUSTO_EVENTS } from "@/src/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  Sparkles,
  Search,
  ArrowRight,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface EventsSectionProps {
  onSelectEventForRules?: (eventId: string) => void;
  onOpenRegister?: () => void;
  searchFilter?: string;
}

export function EventsSection({
  onSelectEventForRules,
  onOpenRegister,
  searchFilter = "",
}: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Technical" | "Non-Technical">("All");
  const [localSearch, setLocalSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");
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

  const effectiveSearch = searchFilter || localSearch;

  const filteredEvents = GUSTO_EVENTS.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesType =
      selectedType === "All" || event.eventType === selectedType;
    const matchesSearch =
      event.title.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      event.description.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      event.venue.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      event.coordinators.some((c) =>
        c.name.toLowerCase().includes(effectiveSearch.toLowerCase())
      );
    return matchesCategory && matchesType && matchesSearch;
  });

  const effectiveEvents = filteredEvents.filter((event) => {
    if (selectedEventId !== "all") {
      return event.id === selectedEventId;
    }
    return true;
  });

  const isSearchOrFilterActive = effectiveSearch.trim() !== "" || selectedCategory !== "All" || selectedType !== "All";

  // Show 3 events first unless expanded or search/filter or specific event picked
  const displayedEvents =
    showAllEvents || selectedEventId !== "all" || isSearchOrFilterActive
      ? effectiveEvents
      : effectiveEvents.slice(0, 3);

  const techCount = GUSTO_EVENTS.filter((e) => e.category === "Technical").length;
  const nonTechCount = GUSTO_EVENTS.filter((e) => e.category === "Non-Technical").length;

  return (
    <section id="events" className="py-20 bg-[#fffbeb] text-black relative border-b-[4px] border-black font-unbounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 select-none">
          <div className="mb-2.5 sm:mb-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fde047] border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Choose Your Challenge</span>
            </div>
          </div>

          <div className="relative w-full flex justify-center items-center my-1">
            <h2
              onClick={triggerJump}
              className="text-2xl xs:text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000] cursor-pointer flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 select-none group font-unbounded"
              title="Click to see the letters jump!"
            >
              {/* "Symposium" with interactive letter wave */}
              <span className="inline-flex">
                {["S", "y", "m", "p", "o", "s", "i", "u", "m"].map((letter, idx) => (
                  <span
                    key={`symp-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    className={`inline-block text-[#3b0764] ${isJumping ? "animate-purple-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* "Events" with interactive neon pink wave */}
              <span className="inline-flex">
                {["E", "v", "e", "n", "t", "s"].map((letter, idx) => (
                  <span
                    key={`events-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 9) * 55}ms` }}
                    className={`inline-block text-[#ec4899] drop-shadow-[2px_2px_0px_#000] ${isJumping ? "animate-pink-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base font-bold text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            All 9 Technical and Non-Technical events with official venue, timings, rules, team guidelines, and coordinator hotlines.
          </p>
        </div>

        {/* Filters and Search Bar in Neo-Brutalist Strip */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border-[3px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap cursor-pointer ${selectedCategory === "All"
                ? "bg-[#3b0764] text-white shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
                }`}
            >
              All Events ({GUSTO_EVENTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory("Technical")}
              className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap cursor-pointer ${selectedCategory === "Technical"
                ? "bg-[#84cc16] text-black shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
                }`}
            >
              Technical ({techCount})
            </button>
            <button
              onClick={() => setSelectedCategory("Non-Technical")}
              className={`neo-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider whitespace-nowrap cursor-pointer ${selectedCategory === "Non-Technical"
                ? "bg-[#ec4899] text-white shadow-[3px_3px_0px_#000]"
                : "bg-white text-black hover:bg-zinc-100"
                }`}
            >
              Non-Technical ({nonTechCount})
            </button>
          </div>

          {/* Sub-format Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-2xl bg-white border-[2.5px] border-black text-xs font-black text-black shadow-[2px_2px_0px_#000] focus:outline-none"
            >
              <option value="All">All Formats</option>
              <option value="DIRECT">Direct / Offline Arena</option>
              <option value="ABSTRACT">Abstract Screening</option>
              <option value="SUBMISSION">Online Submission</option>
            </select>

            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search event, venue..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#fde047] border-[2.5px] border-black text-xs font-bold text-black placeholder:text-zinc-700 shadow-[2px_2px_0px_#000] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Events Grid (Retro Game Cartridge / Comic Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col rounded-3xl bg-white border-[3.5px] border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[9px_9px_0px_#000] transition-all duration-200 overflow-hidden group"
            >
              {/* Event Header Ribbon */}
              <div
                className={`px-4 py-2 border-b-[3px] border-black flex items-center justify-between ${event.category === "Technical" ? "bg-[#84cc16]" : "bg-[#ec4899]"
                  }`}
              >
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  {event.category}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-black text-white">
                  {event.subCategory}
                </span>
              </div>

              {/* Event Poster Image */}
              <div className="relative h-48 w-full bg-zinc-900 border-b-[3px] border-black overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Slot Status Sticker Tag */}
                <div className="absolute top-3 right-3">
                  {event.isSlotsFull ? (
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#ef4444] text-white border-2 border-black shadow-[2px_2px_0px_#000]">
                      SLOTS FULL
                    </span>
                  ) : event.onSpotRegistrationAvailable ? (
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#84cc16] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                      ON-SPOT AVAIL.
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#facc15] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                      PRE-REG ONLY
                    </span>
                  )}
                </div>
              </div>

              {/* Event Content Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#3b0764] mb-2 tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs font-bold text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                    {event.description}
                  </p>

                  {/* Metadata Sticker Tags */}
                  <div className="space-y-2 py-3 border-y-[2px] border-black text-xs font-black mb-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-zinc-700">
                        <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                        <span>Schedule:</span>
                      </span>
                      <span className="text-black">{event.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-zinc-700">
                        <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>Venue:</span>
                      </span>
                      <span className="text-black truncate max-w-[170px] text-right">
                        {event.venue}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-zinc-700">
                        <Users className="w-3.5 h-3.5 text-[#ec4899]" />
                        <span>Team Size:</span>
                      </span>
                      <span className="text-black">{event.teamSize}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-zinc-700">
                        <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span>Deadline:</span>
                      </span>
                      <span className="text-[#b45309] truncate max-w-[170px]">
                        {event.registrationDeadline}
                      </span>
                    </div>
                  </div>

                  {/* Abstract Email if present */}
                  {event.submissionEmail && (
                    <div className="p-2.5 rounded-xl bg-[#fef08a] border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-bold mb-4 flex items-start gap-2">
                      <Mail className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <div className="overflow-hidden">
                        <span className="text-black block font-black text-[11px] uppercase">
                          {event.submissionName}:
                        </span>
                        <a
                          href={`mailto:${event.submissionEmail}`}
                          className="text-[#3b0764] underline truncate block text-xs"
                        >
                          {event.submissionEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Coordinators */}
                  <div className="mb-4">
                    <p className="text-[10px] font-black uppercase text-zinc-500 mb-1.5">
                      Event Coordinators:
                    </p>
                    <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                      {event.coordinators.map((c, idx) => (
                        <a
                          key={idx}
                          href={`tel:${c.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-[#fde047] border-[1.5px] border-black transition-colors max-w-full"
                        >
                          <Phone className="w-2.5 h-2.5 text-[#3b0764] shrink-0" />
                          <span className="truncate">{c.name}</span>
                          <span className="text-[10px] text-zinc-500 shrink-0">({c.phone})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="#rules"
                    onClick={() => onSelectEventForRules?.(event.id)}
                    className="neo-btn flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-100 text-xs font-black text-black text-center flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#3b0764]" />
                    <span>Rules</span>
                  </a>

                  <button
                    onClick={onOpenRegister}
                    className="neo-btn flex-1 py-2.5 px-3 rounded-xl bg-[#ec4899] hover:bg-[#db2777] text-xs font-black text-white text-center flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / View All Events Controls */}
        {!showAllEvents && selectedEventId === "all" && !isSearchOrFilterActive && effectiveEvents.length > 3 && (
          <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setShowAllEvents(true)}
              className="neo-btn px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#fde047] hover:bg-[#facc15] border-[3.5px] border-black text-black font-black uppercase text-xs sm:text-sm tracking-wider shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] flex items-center gap-2.5 cursor-pointer transition-all active:translate-y-1 active:shadow-[2px_2px_0px_#000]"
            >
              <span>View All {effectiveEvents.length} Events ({effectiveEvents.length - 3} More)</span>
              <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
            </button>
            <span className="text-xs font-bold text-zinc-600">
              Showing first 3 featured events • Expand or select from dropdown to see all
            </span>
          </div>
        )}

        {showAllEvents && selectedEventId === "all" && !isSearchOrFilterActive && (
          <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => {
                setShowAllEvents(false);
                const el = document.getElementById("events");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="neo-btn px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 border-[3px] border-black text-black font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_#000] flex items-center gap-2 cursor-pointer"
            >
              <span>Show First 3 Events Only</span>
              <ChevronUp className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>
        )}

        {selectedEventId !== "all" && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setSelectedEventId("all");
                setShowAllEvents(false);
              }}
              className="neo-btn px-5 py-2.5 rounded-xl bg-white border-2 border-black text-xs font-black text-black shadow-[3px_3px_0px_#000] hover:bg-zinc-100 flex items-center gap-2 cursor-pointer"
            >
              <span>Clear Filter (Show First 3 Events)</span>
            </button>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
            <p className="font-bold text-zinc-700">No events found matching your filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
