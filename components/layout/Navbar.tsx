"use client";

import { useState, useEffect } from "react";
import { ABOUT_DATA } from "@/src/data/about";
import { Menu, X, Search } from "lucide-react";
import { RetroGamepad } from "@/components/ui/RetroStickers";

interface NavbarProps {
  onOpenRegister?: () => void;
  onSearchChange?: (query: string) => void;
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

  // Cartridge button colors matching classic 2D platform game aesthetic
  const buttonColors: Record<string, string> = {
    "ALL EVENTS": "bg-[#00d8f8] hover:bg-[#5ce6fc] text-black",
    "RULES": "bg-[#ff8800] hover:bg-[#ffa333] text-black",
    "ABOUT": "bg-[#43b047] hover:bg-[#68d16c] text-white",
    "GALLERY": "bg-[#a855f7] hover:bg-[#c084fc] text-white",
    "TEASER": "bg-[#e52521] hover:bg-[#ff4d4a] text-white",
    "TRANSPORT": "bg-[#ffd000] hover:bg-[#ffe04d] text-black",
    "CONTACTS": "bg-[#ec4899] hover:bg-[#f472b6] text-white",
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
    }, 250);

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
    <header className="sticky top-0 z-50 bg-[#5c94fc] border-b-[3.5px] border-black shadow-[0_4px_0_#000] w-full h-[66px] sm:h-[72px] flex items-center">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo with Pixel Arcade Badge */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 select-none cursor-pointer"
          title="Gusto '26 - Return to Top"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] border-2 border-black shadow-[2.5px_2.5px_0px_#000] group-hover:-translate-y-0.5 group-hover:shadow-[3.5px_3.5px_0px_#000] group-active:translate-y-0.5 group-active:shadow-[1px_1px_0px_#000] transition-all duration-150 flex items-center justify-center p-1 overflow-hidden shrink-0">
            <RetroGamepad className="w-6 h-5 sm:w-8 sm:h-6.5" />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-['Press_Start_2P',monospace] font-black text-sm xs:text-base sm:text-lg text-white drop-shadow-[2px_2px_0px_#000] tracking-wider whitespace-nowrap">
                GUSTO &apos;26
              </span>
              <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9.5px] font-black bg-[#ffd000] text-black border-[1.5px] border-black shadow-[1px_1px_0px_#000] leading-none font-['Press_Start_2P',monospace] animate-pulse">
                2K26
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1 font-['Press_Start_2P',monospace]">
              <span className="text-[7.5px] xs:text-[8.5px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded-xs border border-black shadow-[1px_1px_0px_#000]">
                GCE ERODE
              </span>
              <span className="text-[7px] xs:text-[8px] font-bold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                • IT DEPT
              </span>
            </div>
          </div>
        </a>

        {/* Center: Navigation Options - Perfectly Balanced & Equal Height HUD Buttons */}
        <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 min-w-0">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            const isClicked = clickedLink === link.name;
            const colorClass = buttonColors[link.name.toUpperCase()] || "bg-white hover:bg-zinc-100 text-black";

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.name)}
                className={`h-[40px] px-2.5 xl:px-3.5 flex items-center justify-center font-['Press_Start_2P',monospace] text-[9.5px] xl:text-[10.5px] font-bold uppercase tracking-wider rounded-xs border-[2px] border-black shadow-[2.5px_2.5px_0_#000] select-none transition-all duration-120 cursor-pointer ${colorClass} ${
                  isActive
                    ? "ring-2 ring-black -translate-y-1 shadow-[4px_4px_0_#000]"
                    : "hover:-translate-y-1 hover:shadow-[3.5px_3.5px_0_#000]"
                } ${isClicked ? "!translate-y-0.5 !shadow-[1px_1px_0_#000]" : ""}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Search & Register - Exact Uniform Height HUD Modules */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3 shrink-0">
          {/* HUD Search Box */}
          <div className="expand-search-container shrink-0 h-[40px]">
            <input
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
              className="expand-search-input font-['Press_Start_2P',monospace] text-[9.5px] !h-[40px] border-[2px] border-black"
              name="text"
              type="text"
              autoComplete="off"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="expand-search-icon !h-[40px] !w-[40px] border-[2px] border-black shadow-[2.5px_2.5px_0_#000] rounded-xs"
              aria-hidden="true"
            >
              <path
                d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Platform Game REGISTER Button - Identical 40px Height */}
          <button
            onClick={handleRegisterClick}
            className="h-[40px] px-3.5 xl:px-4 bg-[#ffd000] hover:bg-[#ffe04d] text-black font-['Press_Start_2P',monospace] text-[9.5px] xl:text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer border-[2px] border-black shadow-[2.5px_2.5px_0_#000] hover:shadow-[4px_4px_0_#000] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] rounded-xs select-none transition-all duration-120 shrink-0"
            title="Register for Gusto '26"
          >
            <span className="animate-coin-spin text-[12px] shrink-0">🪙</span>
            <span>REGISTER ₹{ABOUT_DATA.registrationFee}</span>
          </button>
        </div>

        {/* Mobile: Compact HUD Menu Toggle & Register */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <button
            onClick={handleRegisterClick}
            className="h-[36px] px-2.5 bg-[#ffd000] text-black font-['Press_Start_2P',monospace] text-[8.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-[2px] border-black shadow-[2px_2px_0_#000] active:translate-y-0.5 active:shadow-[0_0_0_#000] rounded-xs select-none"
            title="Register for Gusto '26"
          >
            <span className="animate-coin-spin text-[10px]">🪙</span>
            <span>₹{ABOUT_DATA.registrationFee}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-[36px] w-[36px] bg-white border-[2px] border-black shadow-[2px_2px_0px_#000] text-black flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-100 active:translate-y-0.5 active:shadow-[0_0_0_#000] rounded-xs transition-all select-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 transition-transform duration-150 rotate-90" />
            ) : (
              <Menu className="w-4 h-4 transition-transform duration-150" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Retro HUD Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#090d16] border-b-[3.5px] border-black p-4 space-y-3 shadow-[0_12px_24px_rgba(0,0,0,0.85)] animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Search Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search 9 events, rules..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full pl-3 pr-9 py-2.5 bg-white border-[2px] border-black text-[10px] font-['Press_Start_2P',monospace] text-black placeholder:text-zinc-500 shadow-[2px_2px_0px_#000] rounded-xs focus:outline-none"
            />
            <Search className="w-4 h-4 text-black absolute right-3 pointer-events-none" />
          </div>

          {/* Mobile Nav Links Matrix */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.name;
              const isLastItem = index === navLinks.length - 1;
              const colorClass = buttonColors[link.name.toUpperCase()] || "bg-white text-black";
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name, true)}
                  className={`h-[42px] px-3 flex items-center justify-center font-['Press_Start_2P',monospace] text-[9px] font-bold uppercase tracking-wide border-[2px] border-black shadow-[2px_2px_0_#000] rounded-xs select-none active:translate-y-0.5 active:shadow-[0_0_0_#000] ${colorClass} ${
                    isLastItem ? "col-span-2" : ""
                  } ${isActive ? "ring-2 ring-white" : ""}`}
                >
                  <span className="truncate">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
