"use client";

import { useState, useEffect } from "react";
import { CORE_CONTACTS } from "@/src/data/contacts";
import { ABOUT_DATA } from "@/src/data/about";
import { Phone, MapPin, ExternalLink, Contact2 } from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/Icons";

export function ContactSection() {
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

  const secretaries = CORE_CONTACTS.filter((c) => c.category === "Secretary");
  const helpdesk = CORE_CONTACTS.filter(
    (c) => c.category === "Registration Coordinator"
  );

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 bg-retro-yellow-grid text-black relative border-b-[4px] border-black font-unbounded"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-12 select-none">
          <div className="mb-2.5 sm:mb-3.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider">
              <Contact2 className="w-4 h-4 text-[#ec4899]" />
              <span>Get In Touch</span>
            </div>
          </div>

          <div className="relative w-full flex justify-center items-center my-1">
            <h2
              onClick={triggerJump}
              className="text-2xl xs:text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000] cursor-pointer flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 select-none font-unbounded"
              title="Click to see the letters jump!"
            >
              <span className="inline-flex">
                {["G", "e", "t", "\u00A0", "I", "n"].map((letter, idx) => (
                  <span
                    key={`ct-get-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 55}ms` }}
                    className={`inline-block text-[#3b0764] ${
                      isJumping ? "animate-purple-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span className="inline-flex">
                {["T", "o", "u", "c", "h"].map((letter, idx) => (
                  <span
                    key={`ct-touch-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 6) * 55}ms` }}
                    className={`inline-block text-[#ec4899] drop-shadow-[2px_2px_0px_#000] ${
                      isJumping ? "animate-pink-jump" : ""
                    } hover:-translate-y-2 hover:scale-110 transition-transform duration-150`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed max-w-2xl mx-auto">
            Reach out to our student secretaries or helpdesk for queries, rules, and payments.
          </p>
        </div>

        {/* Secretary & Helpdesk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {/* Student Secretaries */}
          <div className="p-3.5 xs:p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#3b0764] mb-4">
              <span className="w-3 h-3 rounded-full bg-[#ec4899] border border-black" />
              <span>Student Secretaries</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secretaries.map((sec) => (
                <div
                  key={sec.id}
                  className="p-4 rounded-2xl bg-[#fffbeb] border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ec4899] text-white font-black flex items-center justify-center text-sm border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
                      {sec.initials}
                    </div>
                    <h4 className="text-base font-black text-black">{sec.name}</h4>
                    <p className="text-xs font-bold text-[#ec4899] mt-0.5">{sec.role}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-black space-y-1">
                    <a
                      href={`tel:${sec.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-black text-[#3b0764] hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{sec.phone}</span>
                    </a>
                    {sec.email && (
                      <span className="text-[11px] font-bold text-zinc-600 block truncate">
                        {sec.email}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpdesk */}
          <div className="p-3.5 xs:p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#3b0764] mb-4">
              <span className="w-3 h-3 rounded-full bg-[#84cc16] border border-black" />
              <span>Helpdesk</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {helpdesk.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 rounded-2xl bg-[#fffbeb] border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-black font-black flex items-center justify-center text-sm border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
                      {reg.initials}
                    </div>
                    <h4 className="text-base font-black text-black">{reg.name}</h4>
                    <p className="text-xs font-bold text-[#65a30d] mt-0.5">{reg.role}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t-2 border-black space-y-1">
                    <a
                      href={`tel:${reg.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-black text-[#3b0764] hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{reg.phone}</span>
                    </a>
                    {reg.email && (
                      <span className="text-[11px] font-bold text-zinc-600 block truncate">
                        {reg.email}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Institution & Socials Banner */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-[3.5px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 overflow-hidden">
          <div className="flex items-start gap-3 min-w-0">
            <MapPin className="w-6 h-6 text-[#3b0764] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h4 className="text-base sm:text-lg font-black text-black">
                {ABOUT_DATA.institution} ({ABOUT_DATA.formerlyKnownAs})
              </h4>
              <p className="text-xs font-bold text-zinc-700 mt-1 leading-relaxed">
                {ABOUT_DATA.venueAddress.campus}, {ABOUT_DATA.venueAddress.road},{" "}
                {ABOUT_DATA.venueAddress.district}, {ABOUT_DATA.venueAddress.state} -{" "}
                {ABOUT_DATA.venueAddress.pincode}
              </p>
              <p className="text-xs font-bold text-zinc-700 mt-1">
                Official Email:{" "}
                <a
                  href={`mailto:${ABOUT_DATA.contactEmail}`}
                  className="text-[#3b0764] underline font-black break-all"
                >
                  {ABOUT_DATA.contactEmail}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap xs:flex-nowrap items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0 pt-1 md:pt-0">
            <a
              href={ABOUT_DATA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#ec4899] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider flex-1 xs:flex-initial whitespace-nowrap"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span>@gcee_gusto_</span>
              <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
            </a>
            <a
              href={ABOUT_DATA.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#ef4444] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider flex-1 xs:flex-initial whitespace-nowrap"
            >
              <YouTubeIcon className="w-4 h-4 shrink-0" />
              <span>@gusto-25</span>
              <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
