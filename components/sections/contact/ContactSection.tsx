"use client";

import { useState } from "react";
import { CORE_CONTACTS, ALL_CONTACTS } from "@/src/data/contacts";
import { ABOUT_DATA } from "@/src/data/about";
import {
  Phone,
  Mail,
  User,
  Search,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Contact2,
} from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/Icons";

export function ContactSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const secretaries = CORE_CONTACTS.filter((c) => c.category === "Secretary");
  const regCoordinators = CORE_CONTACTS.filter(
    (c) => c.category === "Registration Coordinator"
  );

  const filteredContacts = ALL_CONTACTS.filter((contact) => {
    const matchesCategory =
      selectedCategory === "All" || contact.category === selectedCategory;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="contact" className="py-14 sm:py-20 bg-retro-yellow-grid text-black relative border-b-[4px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Contact2 className="w-4 h-4 text-[#ec4899]" />
            <span>Committee Directory</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Get In <span className="text-[#ec4899] [-webkit-text-stroke:2px_#000]">Touch</span>
          </h2>
          <p className="text-xs sm:text-base font-bold text-zinc-800 leading-relaxed">
            Contact student secretaries, registration coordinators, and dedicated event leads for queries, rules, and payments.
          </p>
        </div>

        {/* Core Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 sm:mb-12">
          {/* Student Secretaries */}
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
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

          {/* Registration Coordinators */}
          <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#3b0764] mb-4">
              <span className="w-3 h-3 rounded-full bg-[#84cc16] border border-black" />
              <span>Registration & Helpdesk Leads</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regCoordinators.map((reg) => (
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

        {/* Filter / Search Bar */}
        <div className="mb-6 p-4 rounded-3xl bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`neo-btn px-3.5 py-1.5 rounded-xl text-xs font-black uppercase whitespace-nowrap cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-[#3b0764] text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              All ({ALL_CONTACTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory("Secretary")}
              className={`neo-btn px-3.5 py-1.5 rounded-xl text-xs font-black uppercase whitespace-nowrap cursor-pointer ${
                selectedCategory === "Secretary"
                  ? "bg-[#ec4899] text-white shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              Secretaries
            </button>
            <button
              onClick={() => setSelectedCategory("Registration Coordinator")}
              className={`neo-btn px-3.5 py-1.5 rounded-xl text-xs font-black uppercase whitespace-nowrap cursor-pointer ${
                selectedCategory === "Registration Coordinator"
                  ? "bg-[#84cc16] text-black shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              Registration
            </button>
            <button
              onClick={() => setSelectedCategory("Event Coordinator")}
              className={`neo-btn px-3.5 py-1.5 rounded-xl text-xs font-black uppercase whitespace-nowrap cursor-pointer ${
                selectedCategory === "Event Coordinator"
                  ? "bg-[#06b6d4] text-black shadow-[2px_2px_0px_#000]"
                  : "bg-white text-black hover:bg-zinc-100"
              }`}
            >
              Event Leads
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search coordinator, event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#fde047] border-[2px] border-black text-xs font-black text-black placeholder:text-zinc-700 shadow-[2px_2px_0px_#000] focus:outline-none"
            />
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#facc15] border border-black text-black truncate max-w-[140px]">
                    {contact.category}
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-[#3b0764] text-white font-black flex items-center justify-center text-xs border border-black">
                    {contact.initials}
                  </span>
                </div>
                <h4 className="text-sm font-black text-black">{contact.name}</h4>
                <p className="text-xs font-bold text-zinc-600 line-clamp-1 mt-0.5">{contact.role}</p>
              </div>

              <div className="mt-4 pt-2 border-t-2 border-black">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 text-xs font-black text-[#ec4899] hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>{contact.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Institution & Socials Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-[#3b0764] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-black text-black">
                {ABOUT_DATA.institution} ({ABOUT_DATA.formerlyKnownAs})
              </h4>
              <p className="text-xs font-bold text-zinc-700 mt-1">
                {ABOUT_DATA.venueAddress.campus}, {ABOUT_DATA.venueAddress.road}, {ABOUT_DATA.venueAddress.district}, {ABOUT_DATA.venueAddress.state} - {ABOUT_DATA.venueAddress.pincode}
              </p>
              <p className="text-xs font-bold text-zinc-700 mt-1">
                Official Email:{" "}
                <a href={`mailto:${ABOUT_DATA.contactEmail}`} className="text-[#3b0764] underline font-black">
                  {ABOUT_DATA.contactEmail}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={ABOUT_DATA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ec4899] text-white text-xs font-black uppercase tracking-wider"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@gcee_gusto_</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href={ABOUT_DATA.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ef4444] text-white text-xs font-black uppercase tracking-wider"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>@gusto-25</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
