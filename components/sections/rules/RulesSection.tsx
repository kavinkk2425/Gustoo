"use client";

import { useState, useEffect } from "react";
import { GUSTO_EVENTS } from "@/src/data/events";
import { EventRuleRound } from "@/src/data/types";
import {
  FileText,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Calendar,
  Phone,
  Sparkles,
  Gamepad2,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";

interface RulesSectionProps {
  selectedEventId?: string;
  onOpenRegister?: () => void;
}

export function RulesSection({ selectedEventId, onOpenRegister }: RulesSectionProps) {
  const [activeEventId, setActiveEventId] = useState<string>(
    selectedEventId || GUSTO_EVENTS[0]?.id || ""
  );
  const [showDetailedContent, setShowDetailedContent] = useState(false);
  const [letterAnimationKey, setLetterAnimationKey] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const triggerJump = () => {
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
  };

  useEffect(() => {
    if (selectedEventId) {
      setActiveEventId(selectedEventId);
    }
  }, [selectedEventId]);

  useEffect(() => {
    setShowDetailedContent(false);
  }, [activeEventId]);

  useEffect(() => {
    if (isJumping) {
      const timer = setTimeout(() => {
        setIsJumping(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [isJumping, letterAnimationKey]);

  const activeEvent =
    GUSTO_EVENTS.find((e) => e.id === activeEventId) || GUSTO_EVENTS[0] || null;

  if (!activeEvent) {
    return (
      <section id="rules" className="py-14 sm:py-20 bg-[#fde047] text-black relative border-b-[4px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Gamepad2 className="w-4 h-4 text-[#ec4899]" />
            <span>Mission Guidelines</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Event <span className="text-[#84cc16] [-webkit-text-stroke:2px_#000]">Rules</span>
          </h2>
          <div className="p-8 max-w-md mx-auto rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] mt-6">
            <p className="font-bold text-zinc-600">No event rules available.</p>
          </div>
        </div>
      </section>
    );
  }

  const isStructuredRules =
    typeof activeEvent.rules === "object" &&
    !Array.isArray(activeEvent.rules) &&
    activeEvent.rules !== null;

  return (
    <section id="rules" className="py-14 sm:py-20 bg-[#fde047] text-black relative border-b-[4px] border-black font-unbounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-12 select-none">
          <div className="mb-2.5 sm:mb-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Gamepad2 className="w-4 h-4 text-[#ec4899]" />
              <span>Mission Guidelines</span>
            </div>
          </div>

          <div className="relative w-full flex justify-center items-center my-1">
            <h2
              onClick={triggerJump}
              className="text-2xl xs:text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000] cursor-pointer flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 select-none group font-unbounded"
              title="Click to see the letters jump!"
            >
              {/* "Event" with interactive letter wave */}
              <span className="inline-flex">
                {["E", "v", "e", "n", "t"].map((letter, idx) => (
                  <span
                    key={`ev-rule-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    className={`inline-block text-[#3b0764] ${isJumping ? "animate-purple-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* "Rules" with interactive neon lime wave */}
              <span className="inline-flex">
                {["R", "u", "l", "e", "s"].map((letter, idx) => (
                  <span
                    key={`rules-w-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 5) * 55}ms` }}
                    className={`inline-block text-[#84cc16] [-webkit-text-stroke:2px_#000] drop-shadow-[2px_2px_0px_#000] ${isJumping ? "animate-lime-jump" : ""
                      } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed max-w-2xl mx-auto">
            Exact regulations, round breakdowns, evaluation metrics, and submission instructions directly from the organizing committee.
          </p>
        </div>

        {/* Dynamic Event Selector Pills */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin">
            {GUSTO_EVENTS.map((event) => {
              const isActive = event.id === activeEvent.id;
              return (
                <button
                  key={event.id}
                  onClick={() => setActiveEventId(event.id)}
                  className={`neo-btn px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${isActive
                    ? "bg-[#3b0764] text-white shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] scale-102"
                    : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full border border-black ${event.category === "Technical" ? "bg-[#84cc16]" : "bg-[#ec4899]"
                      }`}
                  />
                  <span>{event.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Event Rule Container (Arcade Console Manual) */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[4px] border-black p-3.5 xs:p-4 sm:p-8 md:p-10 shadow-[4.5px_4.5px_0px_#000] sm:shadow-[8px_8px_0px_#000]">
          {/* Header Info Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-[3px] border-black">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black ${activeEvent.category === "Technical"
                    ? "bg-[#84cc16] text-black"
                    : "bg-[#ec4899] text-white"
                    }`}
                >
                  {activeEvent.category} Event
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-zinc-100 text-black border-2 border-black">
                  {activeEvent.subCategory}
                </span>
                {activeEvent.isSlotsFull && (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-red-500 text-white border-2 border-black">
                    Slots Filled
                  </span>
                )}
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-[#3b0764] tracking-tight">
                {activeEvent.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-bold text-zinc-700 max-w-3xl leading-relaxed">
                {activeEvent.description}
              </p>
            </div>

            {/* Quick Meta Badges - Structured Neo-Brutalist Grid Bar */}
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-2.5 w-full lg:w-[380px] xl:w-[420px] shrink-0 mt-4 lg:mt-0">
              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-yellow-100 border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000] min-w-0">
                <div className="w-7 h-7 rounded-lg bg-yellow-200 border border-black/40 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[8.5px] uppercase tracking-wider text-black/60 block font-bold leading-none mb-0.5">Schedule</span>
                  <span className="truncate block font-black text-black text-xs">{activeEvent.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-purple-100 border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000] min-w-0">
                <div className="w-7 h-7 rounded-lg bg-purple-200 border border-black/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[8.5px] uppercase tracking-wider text-black/60 block font-bold leading-none mb-0.5">Venue</span>
                  <span className="truncate block font-black text-black text-xs" title={activeEvent.venue}>{activeEvent.venue}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-pink-100 border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000] min-w-0">
                <div className="w-7 h-7 rounded-lg bg-pink-200 border border-black/40 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-[#ec4899]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[8.5px] uppercase tracking-wider text-black/60 block font-bold leading-none mb-0.5">Team Size</span>
                  <span className="truncate block font-black text-black text-xs">{activeEvent.teamSize}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-emerald-100 border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000] min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-200 border border-black/40 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[8.5px] uppercase tracking-wider text-black/60 block font-bold leading-none mb-0.5">Deadline</span>
                  <span className="truncate block font-black text-black text-xs" title={activeEvent.registrationDeadline}>{activeEvent.registrationDeadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules Presentation */}
          <div className="mt-8">
            {isStructuredRules ? (
              <div className="space-y-6">
                {/* Round 1 */}
                {"round1" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { round1?: EventRuleRound }).round1 && (
                    <div className="p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#ec4899]/10 border-[3px] border-black shadow-[3.5px_3.5px_0px_#000] sm:shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-[#ec4899] border border-black" />
                        <h4 className="text-base sm:text-lg font-black text-[#3b0764] uppercase">
                          {(activeEvent.rules as { round1: EventRuleRound }).round1.title}
                        </h4>
                      </div>
                      {(activeEvent.rules as { round1: EventRuleRound }).round1.description && (
                        <p className="text-xs sm:text-sm font-bold text-zinc-700 mb-3 italic">
                          {(activeEvent.rules as { round1: EventRuleRound }).round1.description}
                        </p>
                      )}
                      <ul className="space-y-2">
                        {(activeEvent.rules as { round1: EventRuleRound }).round1.rules.map(
                          (rule, idx) => (
                            <li
                              key={idx}
                              className={`items-start gap-2.5 text-xs sm:text-sm font-bold text-black ${
                                !showDetailedContent && idx >= 2 ? "hidden sm:flex" : "flex"
                              }`}
                            >
                              <span className="text-[#ec4899] font-black">•</span>
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Round 2 Preview Pill (Mobile when collapsed) */}
                {"round2" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { round2?: EventRuleRound }).round2 &&
                  !showDetailedContent && (
                    <div className="sm:hidden p-3.5 rounded-xl bg-[#84cc16]/15 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] border border-black" />
                        <span className="text-xs font-black uppercase text-[#3b0764]">
                          {(activeEvent.rules as { round2: EventRuleRound }).round2.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md border border-black text-black">
                        {(activeEvent.rules as { round2: EventRuleRound }).round2.rules?.length || 0} rules
                      </span>
                    </div>
                  )}

                {/* Round 2 Full Details */}
                {"round2" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { round2?: EventRuleRound }).round2 && (
                    <div
                      className={`p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#84cc16]/15 border-[3px] border-black shadow-[3.5px_3.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] ${
                        !showDetailedContent ? "hidden sm:block" : "block"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-[#84cc16] border border-black" />
                        <h4 className="text-base sm:text-lg font-black text-[#3b0764] uppercase">
                          {(activeEvent.rules as { round2: EventRuleRound }).round2.title}
                        </h4>
                      </div>
                      {(activeEvent.rules as { round2: EventRuleRound }).round2.description && (
                        <p className="text-xs sm:text-sm font-bold text-zinc-700 mb-3 italic">
                          {(activeEvent.rules as { round2: EventRuleRound }).round2.description}
                        </p>
                      )}
                      <ul className="space-y-2">
                        {(activeEvent.rules as { round2: EventRuleRound }).round2.rules.map(
                          (rule, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                              <span className="text-[#65a30d] font-black">•</span>
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* General Guidelines Preview Pill (Mobile when collapsed) */}
                {"general" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { general?: { title: string; rules: string[] } }).general &&
                  !showDetailedContent && (
                    <div className="sm:hidden p-3.5 rounded-xl bg-[#fde047]/40 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-[#3b0764]" />
                        <span className="text-xs font-black uppercase text-black">
                          {(activeEvent.rules as { general: { title: string; rules: string[] } }).general.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-md border border-black text-black">
                        {(activeEvent.rules as { general: { title: string; rules: string[] } }).general.rules?.length || 0} guidelines
                      </span>
                    </div>
                  )}

                {/* General Guidelines Full Details */}
                {"general" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { general?: { title: string; rules: string[] } }).general && (
                    <div
                      className={`p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#fde047]/40 border-[3px] border-black shadow-[3.5px_3.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] ${
                        !showDetailedContent ? "hidden sm:block" : "block"
                      }`}
                    >
                      <h4 className="text-base font-black text-black mb-3 flex items-center gap-2 uppercase">
                        <ShieldAlert className="w-5 h-5 text-[#3b0764]" />
                        <span>
                          {(activeEvent.rules as { general: { title: string; rules: string[] } }).general.title}
                        </span>
                      </h4>
                      <ul className="space-y-2">
                        {(activeEvent.rules as { general: { title: string; rules: string[] } }).general.rules.map(
                          (rule, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-black">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            ) : (
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-50 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                <h4 className="text-sm sm:text-base font-black text-[#3b0764] mb-4 flex items-center gap-2 uppercase">
                  <FileText className="w-4 h-4 text-black" />
                  <span>Official Regulations &amp; Submission Guidelines</span>
                </h4>
                <div className="space-y-2.5">
                  {(activeEvent.rules as string[]).map((rule, idx) => (
                    <div
                      key={idx}
                      className={`items-start gap-3 p-3 rounded-xl bg-white border-2 border-black ${
                        !showDetailedContent && idx >= 3 ? "hidden sm:flex" : "flex"
                      }`}
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#3b0764] text-white font-mono text-xs font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-black leading-relaxed">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Expand / Collapse Trigger */}
            <div className="sm:hidden mt-5">
              {!showDetailedContent ? (
                <button
                  onClick={() => setShowDetailedContent(true)}
                  className="neo-btn w-full py-3.5 px-4 rounded-2xl bg-[#fde047] hover:bg-[#facc15] border-[3px] border-black text-black font-black uppercase text-xs tracking-wider shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1 active:shadow-[1px_1px_0px_#000]"
                >
                  <BookOpen className="w-4 h-4 text-black" />
                  <span>Click to Show All Detailed Content</span>
                  <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowDetailedContent(false);
                    const el = document.getElementById("rules");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="neo-btn w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-100 border-[2.5px] border-black text-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Hide Detailed Content (Show Compact View)</span>
                  <ChevronUp className="w-4 h-4 text-black stroke-[3]" />
                </button>
              )}
            </div>
          </div>

          {/* Coordinators Bar */}
          <div className="mt-8 pt-6 border-t-[3px] border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-zinc-600">
                Inquiries for {activeEvent.title}:
              </span>
              {activeEvent.coordinators.map((c, idx) => (
                <a
                  key={idx}
                  href={`tel:${c.phone}`}
                  className="neo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-black text-black"
                >
                  <Phone className="w-3 h-3 text-[#3b0764]" />
                  <span>{c.name}</span>
                  <span className="text-zinc-600">({c.phone})</span>
                </a>
              ))}
            </div>

            <button
              onClick={onOpenRegister}
              className="neo-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-black text-xs sm:text-sm text-white bg-[#ec4899] hover:bg-[#db2777] uppercase tracking-wider cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Register for GUSTO &apos;26</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
