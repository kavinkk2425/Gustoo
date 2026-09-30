"use client";

import { useState, useEffect } from "react";
import { ABOUT_DATA } from "@/src/data/about";
import { Sparkles, Menu, X, Search } from "lucide-react";
import { RetroGamepad } from "@/components/ui/RetroStickers";

interface NavbarProps {
  onOpenRegister?: () => void;
  onSearchChange?: (query: string) => void;
}

// Gentle 8-bit web audio synth feedback for authentic retro arcade tactile feel
function playRetroClick(type: "nav" | "action" | "logo" = "nav") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "logo") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "action") {
      osc.type = "square";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.04); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.05);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // Audio silently disabled if browser restricts AudioContext
  }
}

export function Navbar({ onOpenRegister, onSearchChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeLink, setActiveLink] = useState<string>("All Events");
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchChange?.(e.target.value);
  };

  const navLinks = [
    { name: "All Events", href: "#events", tag: "r1" },
    { name: "Rules", href: "#rules", tag: "r2" },
    { name: "About", href: "#about", tag: "r3" },
    { name: "Gallery", href: "#gallery", tag: "r4" },
    { name: "Teaser", href: "#youtube", tag: "r5" },
    { name: "Transport", href: "#transport", tag: "r6" },
    { name: "Contacts", href: "#contact", tag: "r7" },
  ];

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

  // Click handler with tactile animation, audio blip, and smooth scroll offset
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string,
    isMobile = false
  ) => {
    e.preventDefault();
    setActiveLink(name);
    setClickedLink(name);
    playRetroClick("nav");

    if (isMobile) {
      setMobileMenuOpen(false);
    }

    setTimeout(() => {
      setClickedLink(null);
    }, 280);

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
    playRetroClick("logo");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegisterClick = () => {
    playRetroClick("action");
    onOpenRegister?.();
  };

  return (
    <header className="sticky top-[48px] z-50 bg-[#fec800] border-b-[3px] border-black shadow-[0_4px_0_#000] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5">
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo with Bouncy Press Animation & Glowing Moving Effect */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none cursor-pointer transition-all duration-200 active:scale-95"
            title="Gusto '26 - Return to Top"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] border-2 border-black shadow-[2px_2px_0px_#000] group-hover:rotate-[-6deg] group-hover:scale-105 group-active:rotate-[12deg] group-active:scale-90 transition-all duration-200 flex items-center justify-center p-1 overflow-hidden shrink-0 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]">
              <RetroGamepad className="w-6 h-5 sm:w-8 sm:h-6.5" />
            </div>
            <div className="flex flex-col justify-center min-w-0 leading-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="gusto-brand-text font-black text-base xs:text-lg sm:text-xl xl:text-2xl tracking-tight whitespace-nowrap">
                  GUSTO &apos;26
                </span>
                <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black bg-[#84cc16] text-black border-[1.5px] border-black shadow-[1px_1px_0px_#000] leading-none animate-pulse">
                  2K26
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] xs:text-[10px] font-extrabold text-black font-['Chakra_Petch',sans-serif] tracking-wider uppercase bg-white/70 px-1.5 py-0.5 rounded border border-black/30 shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
                  GCEE ERODE
                </span>
                <span className="text-[8.5px] xs:text-[9.5px] font-bold text-zinc-900 tracking-wide uppercase">
                  • IT DEPT
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links featuring Cyberpunk Glitch Radio Buttons with Enhanced Size and Increased Gaps */}
          <nav className="hidden lg:flex items-center justify-center gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 shrink-0">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              const isClicked = clickedLink === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name)}
                  className={`cyber-nav-link relative block select-none transition-transform duration-150 ${isActive ? "active" : ""
                    } ${isClicked ? "scale-90" : "active:scale-95"}`}
                >
                  <div className="cyber-btn">
                    <span>{link.name}</span>
                    <span className="cyber-btn__glitch" aria-hidden="true">
                      _{link.name}_
                    </span>
                    <label className="cyber-number">{link.tag}</label>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Search Bar & Register Button */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-5 xl:gap-6 shrink-0">
            {/* Rotating Expandable Search Button */}
            <div className="expand-search-container shrink-0">
              <input
                placeholder="Search something..."
                value={searchValue}
                onChange={handleSearch}
                className="expand-search-input"
                name="text"
                type="text"
                autoComplete="off"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="expand-search-icon"
                aria-hidden="true"
              >
                <path
                  d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Among Us Arcade Register Button */}
            <button
              onClick={handleRegisterClick}
              className="among-reg-btn shrink-0"
              title="Register for Gusto '26"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                width="36px"
                height="36px"
                aria-hidden="true"
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
              <span className="now">NOW!</span>
              <span className="play">REGISTER (₹{ABOUT_DATA.registrationFee})</span>
            </button>
          </div>

          {/* Mobile Menu Toggle & Register Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={handleRegisterClick}
              className="cyber-nav-link relative block select-none active:scale-95 cursor-pointer"
            >
              <div className="cyber-btn !h-8 !px-3.5 text-xs font-black">
                <span>Register</span>
                <span className="cyber-btn__glitch" aria-hidden="true">
                  _REG_
                </span>
              </div>
            </button>
            <button
              onClick={() => {
                playRetroClick("nav");
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="h-8 w-8 sm:h-8.5 sm:w-8.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] text-black flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-100 transition-all duration-150 active:scale-90 active:rotate-12 select-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 rotate-90 animate-in" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with Cyberpunk Cards */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fde047] border-t-[3px] border-black p-4 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Search Bar */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search 9 events, rules, venues..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 py-2 rounded-2xl bg-white border-2 border-black text-xs font-bold text-black placeholder:text-zinc-600 shadow-[2.5px_2.5px_0px_#000] focus:outline-none"
            />
            <Search className="w-4 h-4 text-black absolute right-3 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name, true)}
                  className={`cyber-nav-link relative block select-none ${isActive ? "active" : ""}`}
                >
                  <div className="cyber-btn !w-full">
                    <span>{link.name}</span>
                    <span className="cyber-btn__glitch" aria-hidden="true">
                      _{link.name}_
                    </span>
                    <label className="cyber-number">{link.tag}</label>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleRegisterClick();
              }}
              className="w-full cyber-nav-link relative block select-none cursor-pointer"
            >
              <div className="cyber-btn !w-full !h-11 !text-sm">
                <span>Register for GUSTO 2K26 (₹{ABOUT_DATA.registrationFee})</span>
                <span className="cyber-btn__glitch" aria-hidden="true">
                  _JOIN_GUSTO_2K26_
                </span>
                <label className="cyber-number">NOW</label>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
