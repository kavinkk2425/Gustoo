"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ABOUT_DATA } from "@/src/data/about";
import { GUSTO_EVENTS } from "@/src/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Play,
  Bus,
  Gamepad2,
  Coins,
  Zap,
  Flame,
  GraduationCap,
  Award,
  Ticket,
} from "lucide-react";
import {
  RetroGamepad,
  RetroConsole,
  RetroCartridge,
  RotatingBadge,
  ComicStar,
  HandwrittenSticker,
} from "@/components/ui/RetroStickers";
import { arcadeAudio } from "@/src/lib/arcadeAudio";
import { MarioWorldLandscape } from "./MarioWorldLandscape";

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

// Lightweight, performant IntersectionObserver hook for cascading scroll reveals
function useInView(options = { threshold: 0.12 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(el);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTIC SUPER MARIO WORLD 1-1 PIXEL CLOUDS (Exact 8-Bit NES Sprite Geometry)
// ─────────────────────────────────────────────────────────────────────────────
function MarioCloudSmall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M16 4h16v4h6v4h6v16H4V12h6V8h6V4z" fill="#000" />
      {/* White Body */}
      <path d="M18 6h12v4h6v4h6v12H6V14h6v-4h6V6z" fill="#fff" />
      {/* NES Cyan / Light Blue Shading Accents */}
      <rect x="6" y="20" width="36" height="4" fill="#a4e4fc" />
      <rect x="10" y="24" width="28" height="2" fill="#000" />
      <rect x="8" y="22" width="6" height="2" fill="#000" />
      <rect x="34" y="22" width="6" height="2" fill="#000" />
    </svg>
  );
}

function MarioCloudMedium({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 36" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M16 8h16v-4h20v4h12v4h8v20H4V16h6v-4h6V8z" fill="#000" />
      {/* White Body */}
      <path d="M18 10h14v-4h18v4h12v4h8v16H6V18h8v-4h4v-4z" fill="#fff" />
      {/* NES Light-Blue Details */}
      <rect x="6" y="24" width="64" height="4" fill="#a4e4fc" />
      <rect x="14" y="28" width="16" height="2" fill="#000" />
      <rect x="46" y="28" width="18" height="2" fill="#000" />
      <rect x="22" y="20" width="14" height="2" fill="#a4e4fc" />
      <rect x="52" y="20" width="14" height="2" fill="#a4e4fc" />
    </svg>
  );
}

function MarioCloudLarge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 36" className={className} shapeRendering="crispEdges">
      {/* Black Pixel Outline */}
      <path d="M14 12h14v-4h14v-4h28v4h14v4h14v4h8v16H2V18h6v-3h6v-3z" fill="#000" />
      {/* White Body */}
      <path d="M16 14h12v-4h14v-4h26v4h14v4h14v4h8v12H4V20h8v-3h4v-3z" fill="#fff" />
      {/* NES Light-Blue Shadow Lines & Pixel Details */}
      <rect x="4" y="24" width="98" height="4" fill="#a4e4fc" />
      <rect x="12" y="28" width="18" height="2" fill="#000" />
      <rect x="44" y="28" width="22" height="2" fill="#000" />
      <rect x="78" y="28" width="18" height="2" fill="#000" />
      <rect x="20" y="20" width="10" height="2" fill="#a4e4fc" />
      <rect x="52" y="16" width="16" height="2" fill="#a4e4fc" />
      <rect x="84" y="20" width="10" height="2" fill="#a4e4fc" />
    </svg>
  );
}

function PixelCloudSmall() {
  return (
    <svg viewBox="0 0 56 26" width="62" height="28" fill="none" className="drop-shadow-[2.5px_2.5px_0px_#000]">
      <path d="M16 0h24v6h8v6h8v14H0V12h8V6h8V0z" fill="#000" />
      <path d="M18 2h20v6h8v6h8v10H2V14h8v-6h8V2z" fill="#fff" />
      <rect x="4" y="18" width="48" height="4" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

function PixelCloudMedium() {
  return (
    <svg viewBox="0 0 72 32" width="90" height="38" fill="none" className="drop-shadow-[3px_3px_0px_#000]">
      <path d="M20 0h32v8h12v8h8v16H0V16h8V8h12V0z" fill="#000" />
      <path d="M22 2h28v8h12v8h8v12H2V18h8v-8h12V2z" fill="#fff" />
      <rect x="4" y="22" width="64" height="6" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

function PixelCloudLarge() {
  return (
    <svg viewBox="0 0 96 36" width="120" height="45" fill="none" className="drop-shadow-[3.5px_3.5px_0px_#000]">
      <path d="M24 0h48v8h16v8h8v20H0V16h8V8h16V0z" fill="#000" />
      <path d="M26 2h44v8h16v8h8v16H2V18h8v-8h16V2z" fill="#fff" />
      <rect x="4" y="24" width="88" height="6" fill="#bce4fc" opacity="0.65" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPER MARIO WORLD SKY BLINKING STARS & SPARKLE SPRITES
// ─────────────────────────────────────────────────────────────────────────────
function MarioSuperStar({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`drop-shadow-[2.5px_2.5px_0px_#000] select-none ${className}`}
    >
      {/* Black 5-Point Star Outline */}
      <polygon
        points="12,1.5 15.3,8.2 22.7,9.3 17.3,14.6 18.6,22 12,18.5 5.4,22 6.7,14.6 1.3,9.3 8.7,8.2"
        fill="#ffd000"
        stroke="#000000"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Inner Golden Highlight Gradient Layer */}
      <polygon
        points="12,3.8 14.5,9.2 20.3,10.1 16.1,14.2 17.1,20 12,17.2 6.9,20 7.9,14.2 3.7,10.1 9.5,9.2"
        fill="#ffe566"
      />
      {/* Top Specular Shine */}
      <polygon
        points="12,4.5 13.8,8.8 12,9.8 10.2,8.8"
        fill="#ffffff"
        opacity="0.9"
      />
      {/* Iconic Mario Power Star Vertical Eyes (Left & Right) */}
      <ellipse cx="9.6" cy="13.2" rx="1.1" ry="2.7" fill="#000000" />
      <ellipse cx="14.4" cy="13.2" rx="1.1" ry="2.7" fill="#000000" />
      {/* White Eye Reflection Dots */}
      <ellipse cx="9.4" cy="12.2" rx="0.5" ry="1.1" fill="#ffffff" />
      <ellipse cx="14.2" cy="12.2" rx="0.5" ry="1.1" fill="#ffffff" />
    </svg>
  );
}

function PixelStarCross({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`drop-shadow-[1.5px_1.5px_0px_#000] select-none ${className}`}
    >
      {/* Black Outline */}
      <rect x="7" y="1" width="2" height="14" fill="#000" />
      <rect x="1" y="7" width="14" height="2" fill="#000" />
      <rect x="5" y="3" width="6" height="10" fill="#000" />
      <rect x="3" y="5" width="10" height="6" fill="#000" />
      {/* Yellow Body */}
      <rect x="7" y="2" width="2" height="12" fill="#ffd000" />
      <rect x="2" y="7" width="12" height="2" fill="#ffd000" />
      <rect x="5" y="4" width="6" height="8" fill="#ffd000" />
      <rect x="4" y="5" width="8" height="6" fill="#ffd000" />
      {/* White Glowing Center */}
      <rect x="6" y="6" width="4" height="4" fill="#ffffff" />
    </svg>
  );
}

function PixelSparkleDiamond({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={`drop-shadow-[1.5px_1.5px_0px_#000] select-none ${className}`}
    >
      <polygon
        points="8,1 10.5,6.5 15,8 10.5,9.5 8,15 5.5,9.5 1,8 5.5,6.5"
        fill="#fef08a"
        stroke="#000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.6" fill="#ffffff" />
    </svg>
  );
}

function MarioSkyStarsLayer() {
  return (
    <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none z-[2] select-none">
      {/* === TOP SKY REGION (Around Arcade HUD & Signboard) === */}
      {/* Top Left: above and left of PLAYER score */}
      <div className="absolute top-2 left-[3%] animate-star-blink-1" style={{ animationDelay: "-0.2s" }}>
        <MarioSuperStar size={24} />
      </div>
      <div className="absolute top-9 left-[10%] animate-star-blink-2" style={{ animationDelay: "-1.1s" }}>
        <PixelStarCross size={16} />
      </div>
      <div className="absolute top-16 left-[4%] animate-star-blink-3" style={{ animationDelay: "-0.5s" }}>
        <PixelSparkleDiamond size={13} />
      </div>
      <div className="absolute top-6 left-[18%] animate-star-float-blink" style={{ animationDelay: "-1.7s" }}>
        <PixelStarCross size={14} />
      </div>

      {/* Top Center-Left & Center-Right: flanking college signboard */}
      <div className="absolute top-4 left-[30%] animate-star-blink-2" style={{ animationDelay: "-0.8s" }}>
        <PixelSparkleDiamond size={15} />
      </div>
      <div className="absolute top-12 left-[26%] animate-star-float-blink" style={{ animationDelay: "-2.3s" }}>
        <MarioSuperStar size={20} />
      </div>
      <div className="absolute top-4 right-[30%] animate-star-blink-3" style={{ animationDelay: "-1.4s" }}>
        <PixelSparkleDiamond size={15} />
      </div>
      <div className="absolute top-12 right-[26%] animate-star-blink-1" style={{ animationDelay: "-0.6s" }}>
        <MarioSuperStar size={20} />
      </div>

      {/* Top Right: around TIME HUD and below Spider-Man */}
      <div className="absolute top-3 right-[4%] animate-star-blink-1" style={{ animationDelay: "-1.5s" }}>
        <MarioSuperStar size={24} />
      </div>
      <div className="absolute top-10 right-[12%] animate-star-blink-2" style={{ animationDelay: "-0.4s" }}>
        <PixelStarCross size={16} />
      </div>
      <div className="absolute top-18 right-[5%] animate-star-blink-3" style={{ animationDelay: "-1.9s" }}>
        <PixelSparkleDiamond size={14} />
      </div>
      <div className="absolute top-8 right-[19%] animate-star-float-blink" style={{ animationDelay: "-0.9s" }}>
        <PixelStarCross size={14} />
      </div>

      {/* === MID SKY REGION (Flanking "LET THE" and "GUSTO BEGIN") === */}
      {/* Left side flanking hero title */}
      <div className="absolute top-32 left-[6%] animate-star-blink-1" style={{ animationDelay: "-1.3s" }}>
        <MarioSuperStar size={26} />
      </div>
      <div className="absolute top-40 left-[14%] animate-star-blink-3" style={{ animationDelay: "-0.7s" }}>
        <PixelStarCross size={18} />
      </div>
      <div className="absolute top-52 left-[3%] animate-star-float-blink" style={{ animationDelay: "-2.1s" }}>
        <PixelSparkleDiamond size={16} />
      </div>
      <div className="absolute top-64 left-[10%] animate-star-blink-2" style={{ animationDelay: "-1.6s" }}>
        <MarioSuperStar size={22} />
      </div>
      <div className="absolute top-76 left-[5%] animate-star-blink-1" style={{ animationDelay: "-0.3s" }}>
        <PixelStarCross size={15} />
      </div>

      {/* Right side flanking hero title */}
      <div className="absolute top-32 right-[7%] animate-star-blink-2" style={{ animationDelay: "-0.5s" }}>
        <MarioSuperStar size={26} />
      </div>
      <div className="absolute top-42 right-[15%] animate-star-blink-1" style={{ animationDelay: "-1.8s" }}>
        <PixelStarCross size={18} />
      </div>
      <div className="absolute top-54 right-[4%] animate-star-blink-3" style={{ animationDelay: "-1.1s" }}>
        <PixelSparkleDiamond size={16} />
      </div>
      <div className="absolute top-66 right-[11%] animate-star-float-blink" style={{ animationDelay: "-0.8s" }}>
        <MarioSuperStar size={22} />
      </div>
      <div className="absolute top-78 right-[6%] animate-star-blink-2" style={{ animationDelay: "-2.4s" }}>
        <PixelStarCross size={15} />
      </div>

      {/* === LOWER SKY REGION (Above Ground & Mario World Landscape) === */}
      <div className="absolute top-[86%] left-[16%] animate-star-blink-3" style={{ animationDelay: "-1.2s" }}>
        <PixelSparkleDiamond size={14} />
      </div>
      <div className="absolute top-[90%] left-[8%] animate-star-float-blink" style={{ animationDelay: "-0.6s" }}>
        <PixelStarCross size={15} />
      </div>
      <div className="absolute top-[86%] right-[17%] animate-star-blink-1" style={{ animationDelay: "-1.7s" }}>
        <PixelSparkleDiamond size={14} />
      </div>
      <div className="absolute top-[90%] right-[9%] animate-star-blink-2" style={{ animationDelay: "-0.9s" }}>
        <PixelStarCross size={15} />
      </div>
    </div>
  );
}

// Original GUSTO '26 Cyber Runner Mascot
function GustoPixelMascot() {
  return (
    <div
      className="absolute bottom-[56px] left-4 z-30 pointer-events-auto cursor-pointer animate-mascot-walk group select-none"
      title="GUSTO '26 Player Mascot - Let's Go!"
    >
      {/* Speech bubble on hover */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-2 border-black rounded px-1.5 py-0.5 whitespace-nowrap shadow-[2px_2px_0px_#000] pointer-events-none">
        <span className="font-['Press_Start_2P',monospace] text-[7.5px] text-black font-black">
          GUSTO 2.0!
        </span>
      </div>

      {/* 16-Bit Style Original Retro Runner */}
      <svg
        viewBox="0 0 32 36"
        width="42"
        height="48"
        className="drop-shadow-[3px_3px_0px_rgba(0,0,0,0.9)]"
      >
        {/* Antenna */}
        <rect x="15" y="0" width="2" height="4" fill="#000" />
        <rect x="14" y="0" width="4" height="2" fill="#ffd000" />
        {/* Helmet / Head */}
        <rect x="8" y="4" width="16" height="12" fill="#0284c7" stroke="#000" strokeWidth="1.5" />
        {/* Glowing Visor */}
        <rect x="11" y="7" width="10" height="4" fill="#00f0ff" stroke="#000" strokeWidth="1" />
        <rect x="12" y="8" width="3" height="2" fill="#ffffff" />
        {/* Neck */}
        <rect x="13" y="16" width="6" height="2" fill="#000" />
        {/* Torso / Armor Body */}
        <rect x="7" y="18" width="18" height="9" fill="#1e3a8a" stroke="#000" strokeWidth="1.5" />
        {/* GUSTO 'G' Chest Emblem */}
        <rect x="13" y="20" width="6" height="5" fill="#facc15" stroke="#000" strokeWidth="0.8" />
        <rect x="14" y="21" width="3" height="1.5" fill="#000" />
        <rect x="14" y="23" width="4" height="1" fill="#000" />
        <rect x="16" y="22" width="2" height="1.5" fill="#000" />
        {/* Left Arm / Shoulder */}
        <rect x="4" y="19" width="3" height="7" fill="#0284c7" stroke="#000" strokeWidth="1" />
        <rect x="4" y="26" width="3" height="3" fill="#ffd000" stroke="#000" strokeWidth="1" />
        {/* Right Arm / Shoulder */}
        <rect x="25" y="19" width="3" height="7" fill="#0284c7" stroke="#000" strokeWidth="1" />
        <rect x="25" y="26" width="3" height="3" fill="#ffd000" stroke="#000" strokeWidth="1" />
        {/* Belt */}
        <rect x="9" y="27" width="14" height="2" fill="#000" />
        <rect x="14" y="27" width="4" height="2" fill="#ef4444" />
        {/* Left Leg & Red Boot */}
        <rect x="9" y="29" width="5" height="4" fill="#1e3a8a" stroke="#000" strokeWidth="1" />
        <rect x="8" y="32" width="6" height="4" fill="#dc2626" stroke="#000" strokeWidth="1.2" />
        {/* Right Leg & Red Boot */}
        <rect x="18" y="29" width="5" height="4" fill="#1e3a8a" stroke="#000" strokeWidth="1" />
        <rect x="18" y="32" width="6" height="4" fill="#dc2626" stroke="#000" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

// Color-coded professional announcement marquee items (White Neo-Brutalist Theme)
const MARQUEE_TICKER_ITEMS = [
  {
    icon: Trophy,
    label: "NATIONAL LEVEL TECHNICAL SYMPOSIUM",
    badgeColor: "bg-amber-50 border-amber-300 text-amber-950",
    iconColor: "text-amber-600",
  },
  {
    icon: Calendar,
    label: "OCTOBER 23, 2026",
    badgeColor: "bg-pink-50 border-pink-300 text-pink-950",
    iconColor: "text-pink-600",
  },
  {
    icon: MapPin,
    label: "GCE ERODE (IRTT)",
    badgeColor: "bg-sky-50 border-sky-300 text-sky-950",
    iconColor: "text-sky-600",
  },
  {
    icon: GraduationCap,
    label: "DEPT OF IT & AIT",
    badgeColor: "bg-emerald-50 border-emerald-300 text-emerald-950",
    iconColor: "text-emerald-700",
  },
  {
    icon: Gamepad2,
    label: "9 ARENAS (TECH & NON-TECH)",
    badgeColor: "bg-purple-50 border-purple-300 text-purple-950",
    iconColor: "text-purple-700",
  },
  {
    icon: Award,
    label: "CASH PRIZES & CERTIFICATES",
    badgeColor: "bg-yellow-50 border-yellow-300 text-yellow-950",
    iconColor: "text-yellow-700",
  },
  {
    icon: Bus,
    label: "FREE BUS TRANSIT AVAILABLE",
    badgeColor: "bg-cyan-50 border-cyan-300 text-cyan-950",
    iconColor: "text-cyan-700",
  },
  {
    icon: Ticket,
    label: "REGISTER NOW • ₹250 PASS",
    badgeColor: "bg-rose-50 border-rose-300 text-rose-950",
    iconColor: "text-rose-600",
  },
];

// Static target timestamp for symposium inauguration countdown (October 23, 2026 9:00 AM IST)
const TARGET_SYMPOSIUM_TIMESTAMP = new Date("2026-10-23T09:00:00+05:30").getTime();

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  // Scroll reveal observers for cascading view animation
  const [marqueeRef, marqueeInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [timerRef, timerInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });

  const [letterAnimationKey, setLetterAnimationKey] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  // Desktop-only: disable all game interactions & audio on mobile for lag-free experience
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Retro Arcade Live Game State
  const [score, setScore] = useState(200);
  const [coins, setCoins] = useState(1);
  const [gameTimer, setGameTimer] = useState(245);
  const [bumpedBlock, setBumpedBlock] = useState<string | null>(null);
  const [poppedBlock, setPoppedBlock] = useState<string | null>(null);

  // Retro Mario Platform Signboard: Auto-switching between College, Department, and Association with 3D flip effect
  const INSTITUTION_BANNER_ITEMS = [
    {
      line1: "GOVERNMENT COLLEGE OF",
      line2: "ENGINEERING, ERODE",
      logo: "/logos/GCEE/bronze.png",
      logoAlt: "GCEE College Crest",
    },
    {
      line1: "DEPARTMENT OF",
      line2: "INFORMATION TECHNOLOGY",
      logo: "/logos/AIT/gold.png",
      logoAlt: "IT Department Logo",
    },
    {
      line1: "ASSOCIATION OF INFORMATION TECHNOLOGISTS",
      line2: "(AIT)",
      logo: "/logos/AIT/gold.png",
      logoAlt: "AIT Association Logo",
    },
  ];

  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerAnimState, setBannerAnimState] = useState<"in" | "out">("in");
  const [sheenKey, setSheenKey] = useState(0);

  // Cycle the institution signboard with a smooth, lag-free slide & fade transition
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerAnimState("out");
      setTimeout(() => {
        setBannerIndex((prev) => (prev + 1) % INSTITUTION_BANNER_ITEMS.length);
        setBannerAnimState("in");
        setSheenKey((k) => k + 1);
      }, 400);
    }, 4500);

    return () => clearInterval(bannerTimer);
  }, [INSTITUTION_BANNER_ITEMS.length]);

  const handleBannerFlipToggle = () => {
    if (!isDesktop) return; // no interaction on mobile
    try {
      arcadeAudio.playCoin();
    } catch { }
    setBannerAnimState("out");
    setTimeout(() => {
      setBannerIndex((prev) => (prev + 1) % INSTITUTION_BANNER_ITEMS.length);
      setBannerAnimState("in");
      setSheenKey((k) => k + 1);
    }, 360);
  };

  // Decrement game timer like an authentic arcade clock
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer((prev) => (prev > 10 ? prev - 1 : 245));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const triggerJump = () => {
    if (!isDesktop) return; // desktop-only interaction
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
  };

  const handleHitBlock = (blockId: string) => {
    if (!isDesktop) return; // desktop-only game interaction
    triggerJump();
    setBumpedBlock(blockId);
    setPoppedBlock(blockId);
    setScore((s) => s + 100);
    setCoins((c) => c + 1);

    setTimeout(() => {
      setBumpedBlock((curr) => (curr === blockId ? null : curr));
    }, 380);

    setTimeout(() => {
      setPoppedBlock((curr) => (curr === blockId ? null : curr));
    }, 700);
  };

  useEffect(() => {
    if (isJumping) {
      const timer = setTimeout(() => {
        setIsJumping(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [isJumping, letterAnimationKey]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const difference = TARGET_SYMPOSIUM_TIMESTAMP - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] bg-retro-yellow-grid overflow-hidden pt-2 xs:pt-2.5 sm:pt-3 md:pt-4 pb-0 border-b-[4px] border-black">
      {/* === SUPER MARIO WORLD 1-1 ARCADE ENVIRONMENT LAYER === */}

      {/* Retro Pixel Super Mario Horizon Cloud Drift System (Authentic Parallax Movement) — Desktop only */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-[1] select-none">
        {/* Cloud 1: High Sky Large Mario Cloud (Slow Parallax Drift) */}
        <div
          className="hidden sm:block absolute top-4 sm:top-6 left-0 animate-cloud-drift-slow"
          style={{ animationDelay: "-18s" }}
        >
          <MarioCloudLarge className="w-32 xs:w-44 sm:w-56 md:w-68 h-auto drop-shadow-[4px_4px_0px_#000]" />
        </div>

        {/* Cloud 2: Mid-High Sky Medium Mario Cloud (Medium Drift) */}
        <div
          className="absolute top-16 sm:top-24 left-0 animate-cloud-drift-med"
          style={{ animationDelay: "-38s" }}
        >
          <MarioCloudMedium className="w-24 xs:w-32 sm:w-40 md:w-52 h-auto drop-shadow-[3.5px_3.5px_0px_#000]" />
        </div>

        {/* Cloud 3: Mid Sky Small Mario Cloud (Breezy Fast Drift) */}
        <div
          className="absolute top-28 sm:top-36 left-0 animate-cloud-drift-fast"
          style={{ animationDelay: "-10s" }}
        >
          <MarioCloudSmall className="w-16 xs:w-20 sm:w-26 md:w-32 h-auto drop-shadow-[3px_3px_0px_#000]" />
        </div>

        {/* Cloud 4: Lower Sky Large Mario Cloud (Majestic Deep Drift) */}
        <div
          className="absolute top-44 sm:top-60 left-0 animate-cloud-drift-slow"
          style={{ animationDelay: "-52s" }}
        >
          <MarioCloudLarge className="w-28 xs:w-38 sm:w-48 md:w-60 h-auto drop-shadow-[4px_4px_0px_#000] opacity-85" />
        </div>

        {/* Cloud 5: High Far-Right Small Mario Cloud (Fast Drift) */}
        <div
          className="hidden sm:block absolute top-8 sm:top-12 left-0 animate-cloud-drift-fast"
          style={{ animationDelay: "-24s" }}
        >
          <MarioCloudSmall className="w-14 xs:w-18 sm:w-22 md:w-28 h-auto drop-shadow-[2.5px_2.5px_0px_#000]" />
        </div>

        {/* Cloud 6: Mid Horizon Medium Mario Cloud (Steady Medium Drift) */}
        <div
          className="absolute top-36 sm:top-48 left-0 animate-cloud-drift-med"
          style={{ animationDelay: "-6s" }}
        >
          <MarioCloudMedium className="w-20 xs:w-28 sm:w-36 md:w-44 h-auto drop-shadow-[3px_3px_0px_#000] opacity-90" />
        </div>
      </div>

      {/* Retro Mario Sky Twinkling/Blinking Stars Layer — Desktop only */}
      <div className="hidden md:block"><MarioSkyStarsLayer /></div>

      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          {/* === SUPER MARIO WORLD 1-1 TOP ARCADE HUD — Desktop only === */}
          {/* Top Retro Game HUD Bar (Clean Classic: PLAYER 000200, COINS ×01, WORLD 1-1, TIME 245) */}
          <div className="hidden md:flex w-full max-w-3xl sm:max-w-4xl mx-auto px-2 xs:px-4 mb-3 sm:mb-4 items-center justify-between font-['Press_Start_2P',monospace] text-white text-[8px] xxs:text-[9.5px] xs:text-[11px] sm:text-xs md:text-[13px] tracking-wider select-none z-30 drop-shadow-[1.5px_1.5px_0px_#000]">
            <div className="flex flex-col items-start leading-tight">
              <span className="font-bold tracking-wider text-[#ffd000]">PLAYER</span>
              <span className="font-bold tracking-wider text-white mt-0.5">000200</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 leading-tight">
              <span className="inline-block animate-coin-spin text-sm xs:text-base sm:text-lg">🪙</span>
              <span className="font-bold tracking-wider text-white">×01</span>
            </div>
            <div className="flex flex-col items-center leading-tight">
              <span className="font-bold tracking-wider text-[#ffd000]">WORLD</span>
              <span className="font-bold tracking-wider text-white mt-0.5">1-1</span>
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="font-bold tracking-wider text-[#ffd000]">TIME</span>
              <span className="font-bold tracking-wider text-white mt-0.5">245</span>
            </div>
          </div>

          {/* Top Symposium Institution Banner (Strict Fixed-Size Mario Signboard: Alternates between College, Department & Association) */}
          <div className="w-full flex justify-center items-center mb-3 sm:mb-6 md:mb-8 z-20 px-1.5 xs:px-2 sm:px-4 select-none">
            {/* STRICT FIXED BOX SIZE: Dimensions calibrated for both desktop and mobile legibility */}
            <div
              onClick={handleBannerFlipToggle}
              className="relative flex items-center justify-between px-1.5 xs:px-3 sm:px-4 w-full max-w-[580px] xs:max-w-[650px] sm:max-w-[760px] md:max-w-[840px] min-h-[48px] xxs:min-h-[52px] xs:min-h-[56px] sm:min-h-[60px] py-1 xs:py-1.5 bg-[#ffd000] border-[3px] sm:border-[4px] border-black shadow-[3.5px_3.5px_0px_#000] sm:shadow-[6px_6px_0px_#000] rounded-xs hover:-translate-y-0.5 active:scale-[0.99] transition-transform duration-150 cursor-pointer overflow-hidden group/sign"
              title="Click to switch: College, Department & Association!"
            >
              {/* Cool Light Sheen Sweep Bar across the fixed box */}
              <div
                key={`sheen-${sheenKey}`}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-sign-sheen z-20"
              />

              {/* 4 Corner Mario Rivet Screws */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs z-10" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs z-10" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs z-10" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#804000] border border-black rounded-xs z-10" />

              {/* Left Institution Dynamic Logo Badge */}
              <div className="relative w-7 h-7 xxs:w-8 xxs:h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-white border-[1.5px] sm:border-2 border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] flex items-center justify-center p-0.5 sm:p-1 shrink-0 mr-1 xs:mr-2.5 sm:mr-3.5 overflow-hidden z-20 transition-transform duration-200 group-hover/sign:scale-105">
                <Image
                  src={INSTITUTION_BANNER_ITEMS[bannerIndex].logo}
                  alt={INSTITUTION_BANNER_ITEMS[bannerIndex].logoAlt}
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Center Slot-Reel Scrolling Container (Fixed Height & Center-Aligned) */}
              <div className="flex-1 min-w-0 overflow-hidden h-full flex items-center justify-center px-0.5 xs:px-1 z-10">
                <div
                  key={`sign-${bannerIndex}`}
                  className={`w-full flex flex-col items-center justify-center text-center drop-shadow-[1px_1px_0px_rgba(255,255,255,0.7)] ${bannerAnimState === "out" ? "animate-sign-reel-out" : "animate-sign-reel-in"
                    }`}
                >
                  <div className="font-['Press_Start_2P',monospace] font-black text-[5.5px] xxs:text-[6.5px] xs:text-[8px] sm:text-[9.5px] md:text-[11px] lg:text-[12px] text-black tracking-tight uppercase flex flex-col items-center justify-center gap-0.5 sm:gap-1 leading-snug w-full">
                    <span className="whitespace-nowrap max-w-full overflow-hidden text-ellipsis">{INSTITUTION_BANNER_ITEMS[bannerIndex].line1}</span>
                    <span className="whitespace-nowrap max-w-full overflow-hidden text-ellipsis">{INSTITUTION_BANNER_ITEMS[bannerIndex].line2}</span>
                  </div>
                </div>
              </div>

              {/* Right Symposium Gusto Logo Badge */}
              <div className="relative w-7 h-7 xxs:w-8 xxs:h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-white border-[1.5px] sm:border-2 border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000] flex items-center justify-center p-0.5 shrink-0 ml-1 xs:ml-2.5 sm:ml-3.5 overflow-hidden z-20 transition-transform duration-200 group-hover/sign:scale-105">
                <Image
                  src="/logos/GUSTO/gradient.png"
                  alt="GUSTO 2K26 Logo"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* === RETRO 2D PLATFORM TITLE LOGO: "LET THE" & "GUSTO BEGIN" === */}
          <div
            onClick={triggerJump}
            className="flex flex-col items-center justify-center my-3 sm:my-8 md:my-10 cursor-pointer select-none group w-full animate-gusto-light-float"
            title="Click to see the letters jump!"
          >
            {/* Row 1: "LET" + [GAMING CONSOLE] + "THE" */}
            <div className="flex items-center justify-center gap-0.5 xxs:gap-1 xs:gap-2 sm:gap-6 md:gap-8 flex-nowrap animate-gusto-row1-wave w-full max-w-full px-1">
              {/* "LET" */}
              <div className="inline-flex items-center gap-0.5 xs:gap-1 sm:gap-2.5 md:gap-3 shrink-0">
                {[
                  { char: "L", color: "mario-c-blue", rotate: "-rotate-3" },
                  { char: "E", color: "mario-c-yellow", rotate: "rotate-2" },
                  { char: "T", color: "mario-c-red", rotate: "-rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`let-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.25rem] xxs:text-[2.65rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>

              {/* RETRO GAMING CONSOLE / GAMEPAD MASCOT in between "LET" and "THE" */}
              <div
                onClick={(e) => {
                  if (!isDesktop) return; // desktop-only sound & interaction
                  e.stopPropagation();
                  triggerJump();
                  try {
                    arcadeAudio.playJump();
                  } catch { }
                }}
                className="relative -mt-0.5 sm:-mt-5 md:-mt-7 mx-0.5 xs:mx-1 sm:mx-4 animate-idle-wiggle cursor-pointer shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200 select-none group/console z-10"
                title="Click Console to Jump & Sound!"
              >
                {/* Cute speech bubble on hover */}
                <div className="absolute -top-7 sm:-top-9 left-1/2 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] opacity-0 group-hover/console:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30">
                  <span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[10px] text-black font-bold tracking-wider">
                    LET'S PLAY! 🍄
                  </span>
                </div>

                <RetroGamepad
                  color="#e52521"
                  dpadColor="#ffd000"
                  className="w-10 xxs:w-12 xs:w-16 sm:w-28 md:w-36 lg:w-44 h-auto drop-shadow-[2.5px_2.5px_0px_#000] sm:drop-shadow-[5px_5px_0px_#000]"
                />
              </div>

              {/* "THE" */}
              <div className="inline-flex items-center gap-0.5 xs:gap-1 sm:gap-2.5 md:gap-3 shrink-0">
                {[
                  { char: "T", color: "mario-c-green", rotate: "rotate-3" },
                  { char: "H", color: "mario-c-blue", rotate: "-rotate-2" },
                  { char: "E", color: "mario-c-yellow", rotate: "rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`the-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 3) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.25rem] xxs:text-[2.65rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2: "GUSTO BEGIN" - Well-spaced gap so title lines breathe with arcade punch */}
            <div className="flex items-center justify-center gap-2.5 xxs:gap-3.5 xs:gap-6 sm:gap-8 md:gap-12 flex-nowrap mt-3 xxs:mt-4 sm:mt-10 md:mt-14 animate-gusto-row2-wave w-full max-w-full px-1">
              <div className="inline-flex items-center gap-0.5 xs:gap-1 sm:gap-2.5 md:gap-3 shrink-0">
                {[
                  { char: "G", color: "mario-c-red", rotate: "-rotate-3" },
                  { char: "U", color: "mario-c-blue", rotate: "rotate-2" },
                  { char: "S", color: "mario-c-green", rotate: "-rotate-2" },
                  { char: "T", color: "mario-c-yellow", rotate: "rotate-2" },
                  { char: "O", color: "mario-c-red", rotate: "-rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`gusto-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 6) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[1.85rem] xxs:text-[2.25rem] xs:text-[2.95rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-0.5 xs:gap-1 sm:gap-2.5 md:gap-3 shrink-0">
                {[
                  { char: "B", color: "mario-c-green", rotate: "rotate-2" },
                  { char: "E", color: "mario-c-yellow", rotate: "-rotate-2" },
                  { char: "G", color: "mario-c-blue", rotate: "rotate-3" },
                  { char: "I", color: "mario-c-red", rotate: "-rotate-2" },
                  { char: "N", color: "mario-c-green", rotate: "rotate-2" },
                ].map((item, idx) => (
                  <span
                    key={`begin-${idx}-${letterAnimationKey}`}
                    style={{ animationDelay: `${(idx + 11) * 60}ms` }}
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[1.85rem] xxs:text-[2.25rem] xs:text-[2.95rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Retro Pixel Tagline Subtitle - Increased Scale */}
          <div className="mt-4 sm:mt-10 md:mt-12 mb-3 sm:mb-6 select-none px-2 xs:px-4 max-w-5xl">
            <p className="font-['Press_Start_2P',monospace] text-white text-[9.5px] xxs:text-[11px] xs:text-[13px] sm:text-sm md:text-base lg:text-lg drop-shadow-[2.5px_2.5px_0px_#000] sm:drop-shadow-[3px_3px_0px_#000] tracking-wider uppercase text-center leading-relaxed font-bold">
              A NATIONAL LEVEL TECHNICAL SYMPOSIUM • OCTOBER 23, 2026 • GCE ERODE
            </p>
          </div>

          {/* Retro Arcade Presentation Card - Styled with Playfair Display Font */}
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-3.5 xxs:px-4 xs:px-6 sm:px-10 py-4 sm:py-7 rounded-2xl sm:rounded-3xl bg-black/45 backdrop-blur-md border-[3px] sm:border-[4px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[8px_8px_0px_#000] text-center my-3 sm:my-8 select-none relative overflow-hidden group">
            {/* Corner Arcade Screws */}
            <span className="absolute top-2 left-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute top-2 right-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute bottom-2 right-3 text-[10px] font-mono text-white/40 select-none">✚</span>

            {/* Top Amber Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-[3px] bg-gradient-to-r from-transparent via-[#ffd000] to-transparent opacity-80" />

            <div className="font-playfair font-black text-[#ffd000] text-sm xxs:text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-[32px] mb-1.5 sm:mb-3 text-center drop-shadow-[2px_2px_0px_#000] tracking-wider uppercase leading-snug flex items-center justify-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-300 animate-pulse hidden xs:inline" />
              <span>BEGINNING OUR PRESENTATION // GUSTO 2K26</span>
              <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-300 animate-pulse hidden xs:inline" />
            </div>
            <p className="font-playfair font-medium text-white/95 text-[13px] xxs:text-[15px] xs:text-[16.5px] sm:text-lg md:text-xl lg:text-[22px] leading-relaxed md:leading-relaxed max-w-3xl mx-auto drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
              Welcome to Gusto 2.0 at Government College of Engineering, Erode. Step into World 1-1 featuring 9 technical &amp; non-technical arenas, cash prize bounty pools, certificates, and free bus transit!
            </p>
          </div>


          {/* === NATIONAL LEVEL TECHNICAL SYMPOSIUM BRIEFING (EXPANDED TO FIT PAGE PROPORTIONATELY WITH SCROLL REVEAL) === */}
          <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-12 px-2 sm:px-4 relative z-20">
            {/* 1. Top Continuous Moving Text Marquee Capsule - White Theme Scroll Reveal */}
            <div
              ref={marqueeRef}
              className={`w-full max-w-5xl mx-auto mb-8 sm:mb-10 rounded-2xl sm:rounded-full bg-white border-[3.5px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] py-2 sm:py-2.5 px-3 sm:px-4 overflow-hidden select-none hover:shadow-[10px_10px_0px_#000] hover:-translate-y-0.5 transition-all duration-300 relative group scroll-reveal flex items-center ${marqueeInView ? "is-visible" : ""
                }`}
            >
              {/* Edge Gradient Faders for Smooth Ticker Fade */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

              {/* Ticker Content Wrapper */}
              <div className="flex-1 overflow-hidden">
                <div className="flex w-max animate-marquee items-center">
                  {[1, 2].map((loop) => (
                    <div key={`marquee-loop-${loop}`} className="flex items-center gap-3.5 sm:gap-5 pr-3.5 sm:pr-5">
                      {MARQUEE_TICKER_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={`m-item-${loop}-${idx}`} className="flex items-center gap-3.5 sm:gap-5">
                            <span
                              className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-[1.5px] ${item.badgeColor} font-['Chakra_Petch',sans-serif] font-bold text-xs sm:text-[13px] tracking-wider uppercase whitespace-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors`}
                            >
                              <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.iconColor} shrink-0`} />
                              <span>{item.label}</span>
                            </span>
                            <span className="text-black/35 text-[10px] sm:text-xs select-none">
                              ◆
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. 4 Quick Stat Cards — Super Mario World 1-1 Power-Up Stage Blocks */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3.5 sm:gap-5 w-full mb-8 sm:mb-12"
            >
              {/* Mario Block 01: Event Date (Golden Coin & Star Block) */}
              <div
                style={{ transitionDelay: statsInView ? "0ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl bg-[#ffd000] border-[3px] sm:border-[4px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 active:translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-center select-none cursor-pointer min-h-[155px] xs:min-h-[175px] sm:min-h-[210px] scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* 4 Corner Mario Block Rivet Screws */}
                <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#804000] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#804000] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#804000] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 xs:bottom-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#804000] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />

                {/* Top Inner Specular Bevel */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 pointer-events-none" />

                {/* Mario Stage Header Ribbon */}
                <div className="mx-1.5 xs:mx-2.5 sm:mx-3.5 mt-2 sm:mt-2.5 mb-1 sm:mb-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl bg-white border-[1.5px] sm:border-2 border-black flex items-center justify-between shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 border border-black animate-pulse shrink-0" />
                    <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-['Press_Start_2P',monospace] font-bold uppercase text-black tracking-tight sm:tracking-wider truncate">
                      STAGE 01
                    </span>
                  </div>
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-['Press_Start_2P',monospace] font-black bg-amber-100 text-amber-950 px-1 xs:px-1.5 py-0.5 rounded border border-black/30 uppercase shrink-0">
                    DATE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200">
                    <Calendar className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 sm:w-7 sm:h-7 text-[#b45309]" />
                  </div>
                  <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-['Press_Start_2P',monospace] font-black text-black/85 uppercase tracking-tight sm:tracking-wide block mb-0.5 sm:mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                    Event Date
                  </span>
                  <span className="text-[12.5px] xs:text-[14.5px] sm:text-xl lg:text-[22px] font-['Chakra_Petch',sans-serif] font-black text-black leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.6)]">
                    {ABOUT_DATA.eventDate}
                  </span>
                </div>

                {/* Bottom Mario Block Base Studs */}
                <div className="pb-1.5 xs:pb-2 sm:pb-2.5 px-4 flex justify-center items-center gap-1 sm:gap-1.5 opacity-85">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                </div>
              </div>

              {/* Mario Block 02: Reg. Last Date (Fire Flower Coral Block) */}
              <div
                style={{ transitionDelay: statsInView ? "120ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl bg-[#ff5b5b] border-[3px] sm:border-[4px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 active:translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-center select-none cursor-pointer min-h-[155px] xs:min-h-[175px] sm:min-h-[210px] scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* 4 Corner Mario Block Rivet Screws */}
                <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#7f1d1d] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#7f1d1d] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#7f1d1d] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 xs:bottom-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#7f1d1d] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />

                {/* Top Inner Specular Bevel */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 pointer-events-none" />

                {/* Mario Stage Header Ribbon */}
                <div className="mx-1.5 xs:mx-2.5 sm:mx-3.5 mt-2 sm:mt-2.5 mb-1 sm:mb-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl bg-white border-[1.5px] sm:border-2 border-black flex items-center justify-between shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-500 border border-black animate-pulse shrink-0" />
                    <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-['Press_Start_2P',monospace] font-bold uppercase text-black tracking-tight sm:tracking-wider truncate">
                      STAGE 02
                    </span>
                  </div>
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-['Press_Start_2P',monospace] font-black bg-rose-100 text-rose-950 px-1 xs:px-1.5 py-0.5 rounded border border-black/30 uppercase shrink-0">
                    DEADLINE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200">
                    <Clock className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 sm:w-7 sm:h-7 text-[#dc2626]" />
                  </div>
                  <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-['Press_Start_2P',monospace] font-black text-black/85 uppercase tracking-tight sm:tracking-wide block mb-0.5 sm:mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                    Reg. Last Date
                  </span>
                  <span className="text-[12px] xs:text-[13.5px] sm:text-base lg:text-lg font-['Chakra_Petch',sans-serif] font-black text-black leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.6)]">
                    {ABOUT_DATA.registrationLastDate}
                  </span>
                </div>

                {/* Bottom Mario Block Base Studs */}
                <div className="pb-1.5 xs:pb-2 sm:pb-2.5 px-4 flex justify-center items-center gap-1 sm:gap-1.5 opacity-85">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                </div>
              </div>

              {/* Mario Block 03: Competitions (Electric Aqua Ice Flower Block) */}
              <div
                style={{ transitionDelay: statsInView ? "240ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl bg-[#00d8f8] border-[3px] sm:border-[4px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 active:translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-center select-none cursor-pointer min-h-[155px] xs:min-h-[175px] sm:min-h-[210px] scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* 4 Corner Mario Block Rivet Screws */}
                <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#0369a1] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#0369a1] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#0369a1] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 xs:bottom-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#0369a1] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />

                {/* Top Inner Specular Bevel */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 pointer-events-none" />

                {/* Mario Stage Header Ribbon */}
                <div className="mx-1.5 xs:mx-2.5 sm:mx-3.5 mt-2 sm:mt-2.5 mb-1 sm:mb-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl bg-white border-[1.5px] sm:border-2 border-black flex items-center justify-between shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500 border border-black animate-pulse shrink-0" />
                    <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-['Press_Start_2P',monospace] font-bold uppercase text-black tracking-tight sm:tracking-wider truncate">
                      STAGE 03
                    </span>
                  </div>
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-['Press_Start_2P',monospace] font-black bg-sky-100 text-sky-950 px-1 xs:px-1.5 py-0.5 rounded border border-black/30 uppercase shrink-0">
                    ARENAS
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200">
                    <Trophy className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 sm:w-7 sm:h-7 text-[#0284c7]" />
                  </div>
                  <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-['Press_Start_2P',monospace] font-black text-black/85 uppercase tracking-tight sm:tracking-wide block mb-0.5 sm:mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                    Competitions
                  </span>
                  <span className="text-[12.5px] xs:text-[14.5px] sm:text-xl lg:text-[22px] font-['Chakra_Petch',sans-serif] font-black text-black leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.6)]">
                    {GUSTO_EVENTS?.length || 9} Total Events
                  </span>
                </div>

                {/* Bottom Mario Block Base Studs */}
                <div className="pb-1.5 xs:pb-2 sm:pb-2.5 px-4 flex justify-center items-center gap-1 sm:gap-1.5 opacity-85">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                </div>
              </div>

              {/* Mario Block 04: Campus Venue (1-UP Emerald Green Block) */}
              <div
                style={{ transitionDelay: statsInView ? "360ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl bg-[#34d399] border-[3px] sm:border-[4px] border-black shadow-[4.5px_4.5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 active:translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-center select-none cursor-pointer min-h-[155px] xs:min-h-[175px] sm:min-h-[210px] scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* 4 Corner Mario Block Rivet Screws */}
                <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#065f46] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 xs:top-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#065f46] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 xs:bottom-2 xs:left-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#065f46] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 xs:bottom-2 xs:right-2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#065f46] border border-black rounded-xs shadow-[0.5px_0.5px_0_rgba(255,255,255,0.4)] pointer-events-none z-10" />

                {/* Top Inner Specular Bevel */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 pointer-events-none" />

                {/* Mario Stage Header Ribbon */}
                <div className="mx-1.5 xs:mx-2.5 sm:mx-3.5 mt-2 sm:mt-2.5 mb-1 sm:mb-1.5 px-1.5 xs:px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-xl bg-white border-[1.5px] sm:border-2 border-black flex items-center justify-between shadow-[1.5px_1.5px_0px_#000] sm:shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 border border-black animate-pulse shrink-0" />
                    <span className="text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-['Press_Start_2P',monospace] font-bold uppercase text-black tracking-tight sm:tracking-wider truncate">
                      STAGE 04
                    </span>
                  </div>
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] font-['Press_Start_2P',monospace] font-black bg-emerald-100 text-emerald-950 px-1 xs:px-1.5 py-0.5 rounded border border-black/30 uppercase shrink-0">
                    VENUE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl bg-white border-[2px] sm:border-[2.5px] border-black shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-200">
                    <MapPin className="w-4.5 h-4.5 xs:w-5.5 xs:h-5.5 sm:w-7 sm:h-7 text-[#059669]" />
                  </div>
                  <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-['Press_Start_2P',monospace] font-black text-black/85 uppercase tracking-tight sm:tracking-wide block mb-0.5 sm:mb-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                    Campus Venue
                  </span>
                  <span className="text-[12.5px] xs:text-[14.5px] sm:text-xl lg:text-[22px] font-['Chakra_Petch',sans-serif] font-black text-black leading-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.6)]">
                    GCEE, Erode
                  </span>
                </div>

                {/* Bottom Mario Block Base Studs */}
                <div className="pb-1.5 xs:pb-2 sm:pb-2.5 px-4 flex justify-center items-center gap-1 sm:gap-1.5 opacity-85">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-black/40 border border-black/20" />
                </div>
              </div>
            </div>

            {/* 3. Retro Nintendo Switch Handheld Gaming Console Countdown Timer - Scroll Reveal */}
            <div
              ref={timerRef}
              className={`w-full max-w-4xl mx-auto mb-8 sm:mb-12 select-none scroll-reveal ${timerInView ? "is-visible" : ""
                }`}
            >
              {/* Nintendo Switch Outer Shell */}
              <div className="flex items-stretch w-full rounded-[24px] sm:rounded-[36px] overflow-hidden border-[3.5px] sm:border-[4.5px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[9px_9px_0px_#000]">

                {/* LEFT JOY-CON (Neon Cyan) */}
                <div className="switch-joycon-left w-6 xxs:w-7 xs:w-10 sm:w-20 md:w-24 p-0.5 xs:p-2 sm:p-3 flex flex-col justify-between items-center relative border-r-2 border-black/40 shrink-0">
                  {/* Minus Button (-) */}
                  <div className="w-full flex justify-end pr-0.5 sm:pr-2 pt-1">
                    <div className="w-1.5 sm:w-3.5 h-0.5 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60 shadow-xs" />
                  </div>

                  {/* Top Analog Joystick */}
                  <div className="switch-thumbstick w-4 h-4 xxs:w-5 xxs:h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 my-0.5 sm:my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* D-Pad Buttons (▲, ◀, ▶, ▼) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-0.5 sm:my-1">
                    <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▲</div>
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                      <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">◀</div>
                      <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▶</div>
                    </div>
                    <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▼</div>
                  </div>

                  {/* Square Capture/Record Button */}
                  <div className="w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 rounded-[2px] bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#202226]" />
                  </div>
                </div>

                {/* CENTER OLED DISPLAY SCREEN */}
                <div className="switch-screen-outline flex-1 p-1 xs:p-2 sm:p-4 md:p-5 flex flex-col justify-between min-w-0">
                  {/* Top Game Console Status Bar */}
                  <div className="flex items-center justify-between mb-1 sm:mb-3 px-0.5 sm:px-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
                      <span className="text-[7px] xxs:text-[8px] xs:text-[9px] sm:text-xs font-['Chakra_Petch',sans-serif] font-black uppercase tracking-wider sm:tracking-widest text-[#fde047] flex items-center gap-1">
                        <span>★</span>
                        <span>LEVEL STARTS IN</span>
                        <span className="hidden xs:inline">★</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 font-mono text-[7px] xxs:text-[8px] sm:text-xs font-bold text-pink-300">
                      <span>October 23</span>
                      <span className="hidden sm:inline">, 2026</span>
                      <span className="hidden xs:inline px-1 py-0.5 rounded bg-black/60 text-[#84cc16] border border-white/20 text-[8px] sm:text-[9px]">100% 🔋</span>
                    </div>
                  </div>

                  {/* Inner Dark Screen Glass with Countdown Blocks */}
                  <div className="relative rounded-lg xs:rounded-xl sm:rounded-2xl p-1 xs:p-2 sm:p-4 bg-black/85 border-2 border-black/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                    <div className="grid grid-cols-4 gap-0.5 xxs:gap-1 xs:gap-1.5 sm:gap-3 lg:gap-4">
                      {/* Days */}
                      <div className="flex flex-col items-center p-1 xxs:p-1.5 xs:p-2 sm:p-4 rounded-md xxs:rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#facc15] border-[1.5px] sm:border-[3px] border-black shadow-[1px_1px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-base xxs:text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.days).padStart(2, "0")}
                        </span>
                        <span className="text-[6.5px] xxs:text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Days
                        </span>
                      </div>

                      {/* Hours */}
                      <div className="flex flex-col items-center p-1 xxs:p-1.5 xs:p-2 sm:p-4 rounded-md xxs:rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#84cc16] border-[1.5px] sm:border-[3px] border-black shadow-[1px_1px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-base xxs:text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                        <span className="text-[6.5px] xxs:text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Hours
                        </span>
                      </div>

                      {/* Mins */}
                      <div className="flex flex-col items-center p-1 xxs:p-1.5 xs:p-2 sm:p-4 rounded-md xxs:rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#06b6d4] border-[1.5px] sm:border-[3px] border-black shadow-[1px_1px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-base xxs:text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                        <span className="text-[6.5px] xxs:text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Mins
                        </span>
                      </div>

                      {/* Secs */}
                      <div className="flex flex-col items-center p-1 xxs:p-1.5 xs:p-2 sm:p-4 rounded-md xxs:rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#ec4899] border-[1.5px] sm:border-[3px] border-black shadow-[1px_1px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-base xxs:text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-white font-mono leading-none">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                        <span className="text-[6.5px] xxs:text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-white uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Secs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Stereo Speaker Slits on screen bottom */}
                  <div className="flex justify-between items-center px-2 sm:px-4 pt-1 opacity-40">
                    <div className="w-3 sm:w-8 h-0.5 sm:h-1 bg-black rounded-full" />
                    <div className="text-[7px] sm:text-[8px] font-mono text-zinc-400 uppercase tracking-widest">GUSTO OLED</div>
                    <div className="w-3 sm:w-8 h-0.5 sm:h-1 bg-black rounded-full" />
                  </div>
                </div>

                {/* RIGHT JOY-CON (Neon Red/Coral) */}
                <div className="switch-joycon-right w-6 xxs:w-7 xs:w-10 sm:w-20 md:w-24 p-0.5 xs:p-2 sm:p-3 flex flex-col justify-between items-center relative border-l-2 border-black/40 shrink-0">
                  {/* Plus Button (+) */}
                  <div className="w-full flex justify-start pl-0.5 sm:pr-2 pt-1">
                    <div className="relative w-2 sm:w-4 h-2 sm:h-4 flex items-center justify-center">
                      <div className="absolute w-1.5 sm:w-3.5 h-0.5 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60" />
                      <div className="absolute w-0.5 sm:w-1.5 h-1.5 sm:h-3.5 bg-[#222] rounded-[1px] border border-black/60" />
                    </div>
                  </div>

                  {/* Diamond Action Buttons (X, Y, A, B) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-0.5 sm:my-1">
                    <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">X</div>
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                      <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">Y</div>
                      <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">A</div>
                    </div>
                    <div className="switch-btn w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[5px] xxs:text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">B</div>
                  </div>

                  {/* Bottom Analog Joystick */}
                  <div className="switch-thumbstick w-4 h-4 xxs:w-5 xxs:h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 my-0.5 sm:my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* Circular Home Button (⌂) */}
                  <div className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95 text-white/80 text-[6px] xxs:text-[7px] sm:text-[10px]">
                    ⌂
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Action Arcade HUD & Controller Action Deck - Scroll Reveal */}
            <div
              ref={ctaRef}
              className={`relative flex flex-col items-center justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto px-1 xs:px-2 select-none scroll-reveal ${ctaInView ? "is-visible" : ""
                }`}
            >
              {/* Master Arcade Coin-Op CTA Button ("PRESS START / REGISTER NOW") */}
              <div className="w-full flex justify-center">
                <button
                  onClick={onOpenRegister}
                  className="arcade-push-btn group relative overflow-hidden w-full max-w-2xl px-3 xs:px-5 sm:px-8 py-3 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#ec4899] border-[3px] sm:border-[4.5px] border-black text-white cursor-pointer select-none"
                >
                  {/* Glowing Laser Sweep Animation */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-laser-sweep" />
                  </div>

                  {/* Corner Arcade Screws */}
                  <span className="absolute top-2 left-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute top-2 right-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute bottom-2 left-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>
                  <span className="absolute bottom-2 right-2.5 text-[9px] font-mono text-white/50 select-none">✚</span>

                  <div className="relative flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 py-0.5">
                    {/* Center: Bold Arcade Text */}
                    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 text-center">
                      <Sparkles className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-yellow-300 animate-pulse hidden xs:inline" />
                      <span className="font-['Chakra_Petch',sans-serif] font-black text-[13px] xxs:text-sm xs:text-lg sm:text-2xl md:text-3xl text-white tracking-tight xs:tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                        PRESS START • REGISTER NOW
                      </span>
                    </div>

                    {/* Right: Controller Arrow Trigger */}
                    <div className="w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black border-2 border-white/40 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-[2px_2px_0px_#000] shrink-0">
                      <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Quick Action Buttons: 9 Events & Rules */}
              <div className="w-full max-w-2xl grid grid-cols-2 gap-2 sm:gap-3.5">
                {/* Button: 9 Events */}
                <a
                  href="#events"
                  className="arcade-face-btn group relative overflow-hidden p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#84cc16] border-[3px] sm:border-[3.5px] border-black text-black flex items-center justify-center text-center cursor-pointer"
                >
                  <div className="flex flex-col text-center">
                    <span className="font-['Chakra_Petch',sans-serif] font-black text-[13px] sm:text-base leading-tight uppercase">
                      9 Events
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-mono font-extrabold text-zinc-900 uppercase opacity-75">
                      ⚔️ ARENA
                    </span>
                  </div>
                </a>

                {/* Button: Rules */}
                <a
                  href="#rules"
                  className="arcade-face-btn group relative overflow-hidden p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-[3px] sm:border-[3.5px] border-black text-black flex items-center justify-center text-center cursor-pointer"
                >
                  <div className="flex flex-col text-center">
                    <span className="font-['Chakra_Petch',sans-serif] font-black text-[13px] sm:text-base leading-tight uppercase">
                      Rules
                    </span>
                    <span className="text-[9px] sm:text-[9.5px] font-mono font-extrabold text-zinc-700 uppercase opacity-75">
                      📜 CODEX
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUPER MARIO WORLD 2.0 ARCADE GAME — Desktop only ── */}
      <div className="hidden md:block w-full">
        <MarioWorldLandscape onOpenRegister={onOpenRegister} />
      </div>
    </section>
  );
}

