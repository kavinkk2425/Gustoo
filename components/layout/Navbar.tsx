"use client";

import { useState, useEffect } from "react";
import { ABOUT_DATA } from "@/src/data/about";
import { Sparkles, Menu, X, Search } from "lucide-react";
import { RetroGamepad } from "@/components/ui/RetroStickers";

interface NavbarProps {
  onOpenRegister?: () => void;
  onSearchChange?: (query: string) => void;
}

// Click sound feedback disabled per user preference (silent interactions)
function playRetroClick(_type: "nav" | "action" | "logo" = "nav") {
  // Silent - sound disabled
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
    <header className="sticky top-0 z-50 bg-[#5c94fc] border-b-[3.5px] border-black shadow-[0_4px_0_#000] w-full h-[62px] sm:h-[68px] flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between">
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

            {/* Center Navigation Links featuring Authentic Pixel-Game Panels */}
            <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3 min-w-0">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                const isClicked = clickedLink === link.name;

                // Game cartridge button colors matching 2D platformer palette
                const buttonColors: Record<string, string> = {
                  "ALL EVENTS": "bg-[#00d8f8] hover:bg-[#5ce6fc]",
                  "RULES": "bg-[#ff8800] hover:bg-[#ffa333]",
                  "ABOUT": "bg-[#43b047] hover:bg-[#68d16c] text-white",
                  "TEASER": "bg-[#e52521] hover:bg-[#ff4d4a] text-white",
                  "TRANSPORT": "bg-[#ffd000] hover:bg-[#ffe04d]",
                  "CONTACTS": "bg-[#ec4899] hover:bg-[#f472b6] text-white",
                };

                const colorClass = buttonColors[link.name] || "bg-white hover:bg-zinc-100";

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`pixel-btn px-2.5 xl:px-3.5 py-2 text-[9px] xl:text-[10px] font-black uppercase tracking-wider rounded-xs select-none transition-all duration-120 ${colorClass} ${isActive
                        ? "ring-2 ring-black -translate-y-1 shadow-[4px_4px_0_#000]"
                        : ""
                      } ${isClicked ? "translate-y-1 shadow-[0px_0px_0_#000]" : ""}`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Search Bar & Register Button */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Rotating Expandable Search Button */}
              <div className="expand-search-container shrink-0">
                <input
                  placeholder="Search levels..."
                  value={searchValue}
                  onChange={handleSearch}
                  className="expand-search-input font-['Press_Start_2P',monospace] text-[10px]"
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

              {/* Pixel Platform Game REGISTER Button */}
              <button
                onClick={handleRegisterClick}
                className="pixel-btn bg-[#ffd000] text-black px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[3px_3px_0_#000] hover:shadow-[5px_5px_0_#000] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] rounded-xs"
                title="Register for Gusto '26"
              >
                {/* Spinning 2D Retro Coin */}
                <span className="w-4 h-4 bg-[#f59e0b] border-[1.5px] border-black rounded-full inline-flex items-center justify-center animate-coin-spin text-[9px] shrink-0">
                  🪙
                </span>
                <span>REGISTER ₹{ABOUT_DATA.registrationFee}</span>
              </button>
            </div>

            {/* Mobile Menu Toggle & Register Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
              {/* Mobile Pixel Coin Register Button */}
              <button
                onClick={handleRegisterClick}
                className="pixel-btn bg-[#ffd000] text-black px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0_#000] rounded-xs"
                title="Register for Gusto '26"
              >
                <span className="animate-coin-spin text-[10px]">🪙</span>
                <span>₹{ABOUT_DATA.registrationFee}</span>
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

          {/* Mobile Menu Drawer with Cyberpunk Cards */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#090d16] border-t-[3px] border-b-[4px] border-black p-4 space-y-3 shadow-[0_14px_28px_rgba(0,0,0,0.85)] animate-in slide-in-from-top-2 duration-200">
              {/* Mobile Search Bar */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search 9 events, rules, venues..."
                  value={searchValue}
                  onChange={handleSearch}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white border-2 border-black text-xs font-bold text-black placeholder:text-zinc-500 shadow-[2.5px_2.5px_0px_#000] focus:outline-none"
                />
                <Search className="w-4 h-4 text-black absolute right-3 pointer-events-none" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {navLinks.map((link, index) => {
                  const isActive = activeLink === link.name;
                  const isLastItem = index === navLinks.length - 1;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.name, true)}
                      className={`cyber-nav-link !h-11 relative block select-none ${isActive ? "active" : ""} ${isLastItem ? "col-span-2" : ""
                        }`}
                    >
                      <div className="cyber-btn !w-full !h-11 !px-3.5 !text-xs xs:!text-sm font-black flex items-center justify-center">
                        <span className="truncate whitespace-nowrap text-center font-black tracking-wider">{link.name}</span>
                        <label className="cyber-number">{link.tag}</label>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </header>
        );
}
