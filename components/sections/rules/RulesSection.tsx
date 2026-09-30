"use client";

import { useState } from "react";
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
} from "lucide-react";

interface RulesSectionProps {
  selectedEventId?: string;
  onOpenRegister?: () => void;
}

export function RulesSection({ selectedEventId, onOpenRegister }: RulesSectionProps) {
  const [activeEventId, setActiveEventId] = useState<string>(
    selectedEventId || GUSTO_EVENTS[0]?.id || ""
  );

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
    <section id="rules" className="py-14 sm:py-20 bg-[#fde047] text-black relative border-b-[4px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Gamepad2 className="w-4 h-4 text-[#ec4899]" />
            <span>Mission Guidelines</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Event <span className="text-[#84cc16] [-webkit-text-stroke:2px_#000]">Rules</span>
          </h2>
          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed">
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
        <div className="rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[4px] border-black p-4 sm:p-8 md:p-10 shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000]">
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

            {/* Quick Meta Badges */}
            <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-100 border-2 border-black text-xs font-black">
                <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                <span>{activeEvent.time}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 border-2 border-black text-xs font-black">
                <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{activeEvent.venue}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-100 border-2 border-black text-xs font-black">
                <Users className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>{activeEvent.teamSize}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 border-2 border-black text-xs font-black">
                <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Deadline: {activeEvent.registrationDeadline}</span>
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
                    <div className="p-6 rounded-2xl bg-[#ec4899]/10 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-[#ec4899] border border-black" />
                        <h4 className="text-lg font-black text-[#3b0764] uppercase">
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
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-black">
                              <span className="text-[#ec4899] font-black">•</span>
                              <span className="leading-relaxed">{rule}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Round 2 */}
                {"round2" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { round2?: EventRuleRound }).round2 && (
                    <div className="p-6 rounded-2xl bg-[#84cc16]/15 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-[#84cc16] border border-black" />
                        <h4 className="text-lg font-black text-[#3b0764] uppercase">
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

                {/* General Guidelines */}
                {"general" in (activeEvent.rules as object) &&
                  (activeEvent.rules as { general?: { title: string; rules: string[] } }).general && (
                    <div className="p-6 rounded-2xl bg-[#fde047]/40 border-[3px] border-black shadow-[4px_4px_0px_#000]">
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
              <div className="p-6 rounded-2xl bg-zinc-50 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                <h4 className="text-base font-black text-[#3b0764] mb-4 flex items-center gap-2 uppercase">
                  <FileText className="w-4 h-4 text-black" />
                  <span>Official Regulations & Submission Guidelines</span>
                </h4>
                <div className="space-y-2.5">
                  {(activeEvent.rules as string[]).map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border-2 border-black"
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
