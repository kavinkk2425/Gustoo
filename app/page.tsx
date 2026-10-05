"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { EventsSection } from "@/components/sections/events/EventsSection";
import { RulesSection } from "@/components/sections/rules/RulesSection";
import { YouTubeSection } from "@/components/sections/youtube/YouTubeSection";
import { TransportSection } from "@/components/sections/transport/TransportSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { RegisterModal } from "@/components/sections/register/RegisterModal";
import { GameScrollProvider } from "@/components/ui/GameScrollProvider";
import { ScrollReveal, SectionDivider } from "@/components/ui/ScrollReveal";
import { PacmanGhostLoader } from "@/components/ui/PacmanGhostLoader";

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("paper-presentation");
  const [searchFilter, setSearchFilter] = useState("");

  const handleSelectEventForRules = (eventId: string) => {
    setSelectedEventId(eventId);
    const element = document.getElementById("rules");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchFilter(query);
    if (query.trim()) {
      const element = document.getElementById("events");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#5c94fc] text-black selection:bg-[#ec4899] selection:text-white overflow-x-hidden w-full max-w-[100vw]">
      {/* 5-second retro Pac-Man Ghost loader before entering page */}
      <PacmanGhostLoader />

      {/* Sticky Neo-Brutalist Navbar */}
      <Navbar
        onOpenRegister={() => setRegisterOpen(true)}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Sections */}
      <main className="relative overflow-x-hidden w-full">
        {/* ── HERO — no reveal (always visible on load) ── */}
        <HeroSection onOpenRegister={() => setRegisterOpen(true)} />

        {/* Level-up text divider */}
        <SectionDivider variant="level-up" />

        {/* ── EVENTS — slides in from right (like a side-scrolling level) — First! ── */}
        <ScrollReveal variant="slide-left" threshold={0.06}>
          <EventsSection
            onSelectEventForRules={handleSelectEventForRules}
            onOpenRegister={() => setRegisterOpen(true)}
            searchFilter={searchFilter}
          />
        </ScrollReveal>

        {/* Ground tile divider */}
        <SectionDivider variant="ground" />

        {/* ── RULES — glitch-in (data/code theme) ── */}
        <ScrollReveal variant="glitch-in" threshold={0.06}>
          <RulesSection
            selectedEventId={selectedEventId}
            onOpenRegister={() => setRegisterOpen(true)}
          />
        </ScrollReveal>

        {/* Warp divider */}
        <SectionDivider variant="warp" />

        {/* ── YOUTUBE — pixel-pop (power-up style) ── */}
        <ScrollReveal variant="pixel-pop" threshold={0.08}>
          <YouTubeSection />
        </ScrollReveal>

        {/* Ground divider */}
        <SectionDivider variant="ground" />

        {/* ── TRANSPORT — rises up from below (ground spawn) ── */}
        <ScrollReveal variant="rise-up" threshold={0.06}>
          <TransportSection />
        </ScrollReveal>

        {/* Warp divider */}
        <SectionDivider variant="warp" />

        {/* ── ABOUT — platform drops in from above (placed right above contact) ── */}
        <ScrollReveal variant="platform-drop" threshold={0.08}>
          <AboutSection />
        </ScrollReveal>

        {/* Level-up text divider */}
        <SectionDivider variant="level-up" />

        {/* ── CONTACT — slides in from left (final boss door) ── */}
        <ScrollReveal variant="slide-right" threshold={0.06}>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Global Footer */}
      <ScrollReveal variant="fade-up" threshold={0.05}>
        <Footer />
      </ScrollReveal>

      {/* Interactive Registration Modal Flow */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        preSelectedEventId={selectedEventId}
      />
    </div>
  );
}
