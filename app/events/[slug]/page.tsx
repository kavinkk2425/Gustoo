import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUSTO_EVENTS } from "@/src/data/events";
import { ABOUT_DATA } from "@/src/data/about";
import { EventRuleRound } from "@/src/data/types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function generateStaticParams() {
  return GUSTO_EVENTS.map((event) => ({
    slug: event.id,
  }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = GUSTO_EVENTS.find((e) => e.id === slug);

  if (!event) {
    notFound();
  }

  const isStructuredRules =
    typeof event.rules === "object" &&
    !Array.isArray(event.rules) &&
    event.rules !== null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-600 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>

          {/* Event Header Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 mb-10">
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.category === "Technical"
                      ? "bg-indigo-600 text-white"
                      : "bg-emerald-600 text-white"
                    }`}
                >
                  {event.category} Event
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-zinc-300 border border-white/20 backdrop-blur-md">
                  {event.subCategory}
                </span>
                {event.isSlotsFull && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                    Slots Full
                  </span>
                )}
                {event.onSpotRegistrationAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    On-Spot Available
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <Clock className="w-4 h-4 text-indigo-400 mb-1" />
              <span className="text-[11px] text-zinc-400 block">Time</span>
              <span className="text-sm font-bold text-white">{event.time}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <MapPin className="w-4 h-4 text-purple-400 mb-1" />
              <span className="text-[11px] text-zinc-400 block">Venue</span>
              <span className="text-sm font-bold text-white truncate block">
                {event.venue}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <Users className="w-4 h-4 text-pink-400 mb-1" />
              <span className="text-[11px] text-zinc-400 block">Team Size</span>
              <span className="text-sm font-bold text-white">{event.teamSize}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <Calendar className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-[11px] text-zinc-400 block">Registration Deadline</span>
              <span className="text-xs font-bold text-amber-300 truncate block">
                {event.registrationDeadline}
              </span>
            </div>
          </div>

          {/* Event Description */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 mb-10">
            <h2 className="text-xl font-bold text-white mb-3">About The Event</h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {event.description}
            </p>

            {event.submissionEmail && (
              <div className="mt-6 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                <span className="font-bold block mb-1">{event.submissionName}:</span>
                <a
                  href={`mailto:${event.submissionEmail}`}
                  className="text-sm text-indigo-300 underline font-semibold"
                >
                  {event.submissionEmail}
                </a>
                <p className="text-[11px] text-zinc-400 mt-2">
                  Please remember to include your name, college, department, phone number, and symposium registration pass code in the submission email.
                </p>
              </div>
            )}
          </div>

          {/* Rules Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 mb-10">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Official Rules & Guidelines</h2>
            </div>

            {isStructuredRules ? (
              <div className="space-y-6">
                {"round1" in (event.rules as object) &&
                  (event.rules as { round1?: EventRuleRound }).round1 && (
                    <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                      <h3 className="font-bold text-white mb-2">
                        {(event.rules as { round1: EventRuleRound }).round1.title}
                      </h3>
                      {(event.rules as { round1: EventRuleRound }).round1.description && (
                        <p className="text-xs text-indigo-200/80 mb-3 italic">
                          {(event.rules as { round1: EventRuleRound }).round1.description}
                        </p>
                      )}
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {(event.rules as { round1: EventRuleRound }).round1.rules.map(
                          (r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-indigo-400 font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {"round2" in (event.rules as object) &&
                  (event.rules as { round2?: EventRuleRound }).round2 && (
                    <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20">
                      <h3 className="font-bold text-white mb-2">
                        {(event.rules as { round2: EventRuleRound }).round2.title}
                      </h3>
                      {(event.rules as { round2: EventRuleRound }).round2.description && (
                        <p className="text-xs text-purple-200/80 mb-3 italic">
                          {(event.rules as { round2: EventRuleRound }).round2.description}
                        </p>
                      )}
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {(event.rules as { round2: EventRuleRound }).round2.rules.map(
                          (r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-purple-400 font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {"general" in (event.rules as object) &&
                  (event.rules as { general?: { title: string; rules: string[] } }).general && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <h3 className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>
                          {(event.rules as { general: { title: string; rules: string[] } }).general.title}
                        </span>
                      </h3>
                      <ul className="space-y-2 text-xs text-zinc-300">
                        {(event.rules as { general: { title: string; rules: string[] } }).general.rules.map(
                          (r, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {(event.rules as string[]).map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coordinators */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Event Coordinators
              </h3>
              <p className="text-xs text-zinc-400 mb-3">
                For questions regarding {event.title} rules and rounds:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {event.coordinators.map((c, i) => (
                  <a
                    key={i}
                    href={`tel:${c.phone}`}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Phone className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="truncate font-bold">{c.name}</span>
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 shrink-0 ml-1">({c.phone})</span>
                  </a>
                ))}
              </div>
            </div>

            <Link
              href="/#register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Register (₹{ABOUT_DATA.registrationFee})</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
