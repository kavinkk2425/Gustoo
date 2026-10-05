"use client";

import { useState, useEffect } from "react";
import { ABOUT_DATA } from "@/src/data/about";
import { Menu, X } from "lucide-react";
import { RetroGamepad } from "@/components/ui/RetroStickers";
import { HangingSpiderman } from "@/components/ui/Spiderman";

interface NavbarProps {
  onOpenRegister?: () => void;
  onSearchChange?: (query: string) => void;
}

export function Navbar({ onOpenRegister, onSearchChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("All Events");
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const navLinks = [
    { name: "All Events", href: "#events", tag: "r1" },
    { name: "Rules", href: "#rules", tag: "r2" },
    { name: "About", href: "#about", tag: "r3" },
    { name: "Transport", href: "#transport", tag: "r4" },
    { name: "Contacts", href: "#contact", tag: "r5" },
  ];

  // Classic retro gaming palette with uniform high-contrast black pixel text
  const buttonColors: Record<string, string> = {
    "ALL EVENTS": "bg-[#00d8f8] hover:bg-[#5ce6fc] text-black",
    "RULES": "bg-[#ff9900] hover:bg-[#ffb033] text-black",
    "ABOUT": "bg-[#48d050] hover:bg-[#68e06f] text-black",
    "TRANSPORT": "bg-[#ffd000] hover:bg-[#ffe04d] text-black",
    "CONTACTS": "bg-[#f472b6] hover:bg-[#f9a8d4] text-black",
  };

  // Scroll spy to dynamically track and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const id = navLinks[i].href.replace("#", "");
        const elem = document.getElementById(id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveLink(navLinks[i].name);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string,
    isMobile = false
  ) => {
    e.preventDefault();
    setActiveLink(name);
    setClickedLink(name);

    if (isMobile) {
      setMobileMenuOpen(false);
    }

    setTimeout(() => {
      setClickedLink(null);
    }, 220);

    const id = href.replace("#", "");
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 80;
      const top = elem.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegisterClick = () => {
    onOpenRegister?.();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#5c94fc] border-b-[3.5px] border-black shadow-[0_4px_0_#000] w-full h-[64px] sm:h-[70px] flex items-center">
      {/* Full width container spanning end-to-end with seamless edge-to-edge coverage */}
      <div className="w-full px-3 sm:px-5 lg:px-6 xl:px-8 h-full flex items-center justify-between gap-3 lg:gap-4 xl:gap-6">
        {/* FAR LEFT END: GUSTO '26 Brand Anchor */}
        <div className="flex items-center justify-start shrink-0">
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer"
            title="Gusto '26 - Return to Top"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-lg bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] border-[2.5px] border-black shadow-[3px_3px_0px_#000] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_#000] group-active:translate-y-0.5 group-active:shadow-[1px_1px_0px_#000] transition-all duration-150 flex items-center justify-center p-1 overflow-hidden shrink-0">
              <RetroGamepad className="w-6 h-5 sm:w-7 sm:h-6 xl:w-8 xl:h-7" />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-['Press_Start_2P',monospace] font-black text-sm sm:text-base xl:text-lg text-white drop-shadow-[2.5px_2.5px_0px_#000] tracking-tight whitespace-nowrap">
                  GUSTO&apos;26
                </span>
                <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-[2px] text-[8px] sm:text-[9px] xl:text-[9.5px] font-black bg-[#ffd000] text-black border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000] leading-none font-['Press_Start_2P',monospace] animate-pulse">
                  2K26
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 font-['Press_Start_2P',monospace]">
                <span className="text-[7.5px] sm:text-[8.5px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-[2px] border border-black shadow-[1px_1px_0px_#000]">
                  GCE ERODE
                </span>
                <span className="text-[7px] sm:text-[8px] font-bold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                  • IT DEPT
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* CENTER: Navigation Links - Multi-Layer Expanding Bubble Style */}
        <nav
          className="hidden lg:flex items-center justify-between flex-1 gap-2 xl:gap-3 2xl:gap-4 px-2 xl:px-4 max-w-[1250px]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.name)}
                className={`button button-item nav-bubble-btn flex-1 max-w-[170px] ${
                  isActive ? "is-active" : ""
                }`}
                title={link.name}
              >
                <span className="button-bg">
                  <span className="button-bg-layers">
                    <span className="button-bg-layer button-bg-layer-1 -purple"></span>
                    <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
                    <span className="button-bg-layer button-bg-layer-3 -yellow"></span>
                  </span>
                </span>
                <span className="button-inner">
                  <span className="button-inner-static">{link.name}</span>
                  <span className="button-inner-hover">{link.name}</span>
                </span>
              </a>
            );
          })}
        </nav>

        {/* FAR RIGHT END: REGISTER Button with Among Us Interactive Animation */}
        <div className="hidden lg:flex items-center justify-end shrink-0 relative">
          <button
            onClick={handleRegisterClick}
            className="arcade-reg-btn"
            title="Register for Gusto '26"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="34px"
              height="34px"
            >
              <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
              <path
                fill="#e53935"
                d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"
              ></path>
              <path
                fill="#b71c1c"
                d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"
              ></path>
              <path
                fill="#212121"
                d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"
              ></path>
              <path
                fill="#01579b"
                d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"
              ></path>
              <path
                fill="#212121"
                d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"
              ></path>
              <path
                fill="#81d4fa"
                d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"
              ></path>
              <path
                fill="#212121"
                d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"
              ></path>
              <path
                fill="#e1f5fe"
                d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"
              ></path>
            </svg>
            <span className="now">now!</span>
            <span className="play">register ₹{ABOUT_DATA.registrationFee}</span>
          </button>

          {/* Upside-Down Hanging Spider-Man directly suspended below Register CTA */}
          <div className="absolute top-[52px] right-6 xl:right-8 z-40 pointer-events-auto">
            <HangingSpiderman onOpenRegister={handleRegisterClick} />
          </div>
        </div>

        {/* MOBILE CONTROLS: Register & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2 shrink-0 relative">
          <button
            onClick={handleRegisterClick}
            className="arcade-reg-btn arcade-reg-btn-mobile"
            title="Register for Gusto '26"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="28px"
              height="28px"
            >
              <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
              <path
                fill="#e53935"
                d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"
              ></path>
              <path
                fill="#b71c1c"
                d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"
              ></path>
              <path
                fill="#212121"
                d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"
              ></path>
              <path
                fill="#01579b"
                d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"
              ></path>
              <path
                fill="#212121"
                d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"
              ></path>
              <path
                fill="#81d4fa"
                d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"
              ></path>
              <path
                fill="#212121"
                d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"
              ></path>
              <path
                fill="#e1f5fe"
                d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"
              ></path>
            </svg>
            <span className="now">now!</span>
            <span className="play">₹{ABOUT_DATA.registrationFee}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-[40px] w-[40px] bg-white hover:bg-zinc-100 border-[2.5px] border-black shadow-[2.5px_2.5px_0px_#000] text-black flex items-center justify-center shrink-0 cursor-pointer active:translate-y-0.5 active:shadow-[1px_1px_0_#000] rounded-[3px] transition-all select-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-150 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-150" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE RETRO DRAWER (6-Link Symmetric 3x2 Grid) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#090d16] border-b-[3.5px] border-black p-4 space-y-3 shadow-[0_12px_24px_rgba(0,0,0,0.85)] animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2.5">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name, true)}
                  className={`button button-item nav-bubble-btn nav-bubble-btn-mobile ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <span className="button-bg">
                    <span className="button-bg-layers">
                      <span className="button-bg-layer button-bg-layer-1 -purple"></span>
                      <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
                      <span className="button-bg-layer button-bg-layer-3 -yellow"></span>
                    </span>
                  </span>
                  <span className="button-inner">
                    <span className="button-inner-static">{link.name}</span>
                    <span className="button-inner-hover">{link.name}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
