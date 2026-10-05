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

export function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const targetDate = new Date("2026-03-06T09:00:00+05:30").getTime();

  // Scroll reveal observers for cascading view animation
  const [marqueeRef, marqueeInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [timerRef, timerInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });

  const [letterAnimationKey, setLetterAnimationKey] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

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
      label: "CAMPUS HOST",
    },
    {
      line1: "DEPARTMENT OF",
      line2: "INFORMATION TECHNOLOGY",
      label: "ORGANIZING DEPARTMENT",
    },
    {
      line1: "ASSOCIATION OF",
      line2: "INFORMATION TECHNOLOGY",
      label: "ORGANIZING ASSOCIATION",
    },
  ];

  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerAnimState, setBannerAnimState] = useState<"in" | "out">("in");
  const [sheenKey, setSheenKey] = useState(0);

  // Cycle the institution signboard every 4 seconds with cool arcade reel roll & light sweep
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerAnimState("out");
      setSheenKey((k) => k + 1);
      setTimeout(() => {
        setBannerIndex((prev) => (prev + 1) % INSTITUTION_BANNER_ITEMS.length);
        setBannerAnimState("in");
      }, 280);
    }, 4000);

    return () => clearInterval(bannerTimer);
  }, [INSTITUTION_BANNER_ITEMS.length]);

  const handleBannerFlipToggle = () => {
    try {
      arcadeAudio.playCoin();
    } catch { }
    setBannerAnimState("out");
    setSheenKey((k) => k + 1);
    setTimeout(() => {
      setBannerIndex((prev) => (prev + 1) % INSTITUTION_BANNER_ITEMS.length);
      setBannerAnimState("in");
    }, 240);
  };

  // Decrement game timer like an authentic arcade clock
  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer((prev) => (prev > 10 ? prev - 1 : 245));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const triggerJump = () => {
    setLetterAnimationKey((prev) => prev + 1);
    setIsJumping(true);
  };

  const handleHitBlock = (blockId: string) => {
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
      const now = new Date().getTime();
      const difference = targetDate - now;

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
  }, [targetDate]);

  return (
    <section className="relative min-h-[92vh] bg-retro-yellow-grid overflow-hidden pt-16 sm:pt-20 pb-0 border-b-[4px] border-black">
      {/* === SUPER MARIO WORLD 1-1 ARCADE ENVIRONMENT LAYER === */}

      {/* Retro Pixel Super Mario Horizon Cloud Drift System (Authentic Parallax Movement) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] select-none">
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

      {/* Retro Mario Sky Twinkling/Blinking Stars Layer */}
      <MarioSkyStarsLayer />

      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          {/* === SUPER MARIO WORLD 1-1 TOP ARCADE HUD (EXACT SCREENSHOT LAYOUT) === */}
          {/* Top Retro Game HUD Bar (Clean Classic: PLAYER 000200, COINS ×01, WORLD 1-1, TIME 245) */}
          <div className="w-full max-w-4xl mx-auto px-2 xs:px-4 mb-3 sm:mb-6 flex items-center justify-between font-['Press_Start_2P',monospace] text-white text-[10px] xs:text-[11.5px] sm:text-xs md:text-sm tracking-wider select-none z-30 drop-shadow-[2px_2px_0px_#000]">
            <div className="flex flex-col items-start leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">PLAYER</span>
              <span className="font-extrabold tracking-widest text-white">000200</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 leading-snug">
              <span className="inline-block animate-coin-spin text-sm sm:text-base">🪙</span>
              <span className="font-extrabold tracking-wider text-white">×01</span>
            </div>
            <div className="flex flex-col items-center leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">WORLD</span>
              <span className="font-extrabold tracking-widest text-white">1-1</span>
            </div>
            <div className="flex flex-col items-end leading-snug">
              <span className="font-black tracking-widest text-[#ffd000]">TIME</span>
              <span className="font-extrabold tracking-widest text-white">245</span>
            </div>
          </div>

          {/* Top Symposium Institution Banner (Strict Fixed-Size Mario Signboard: Alternates between College, Department & Association) */}
          <div className="w-full flex justify-center items-center mb-5 sm:mb-8 md:mb-10 z-20 px-2 sm:px-4 select-none">
            {/* STRICT FIXED BOX SIZE: Dimensions never change or resize during transitions */}
            <div
              onClick={handleBannerFlipToggle}
              className="relative flex items-center justify-between px-3 xs:px-4 sm:px-6 w-[96%] max-w-[560px] xs:max-w-[600px] sm:max-w-[690px] md:max-w-[760px] h-[58px] xs:h-[64px] sm:h-[50px] md:h-[54px] bg-[#ffd000] border-[3.5px] sm:border-[4px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] rounded-xs hover:-translate-y-0.5 active:scale-[0.99] transition-transform duration-150 cursor-pointer overflow-hidden group/sign"
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

              {/* Left Spinning Coin */}
              <span className="text-[14px] xs:text-base sm:text-base animate-coin-spin shrink-0 z-10 select-none">🪙</span>

              {/* Center Slot-Reel Scrolling Container (Fixed Height & Center-Aligned) */}
              <div className="flex-1 overflow-hidden h-full flex items-center justify-center px-0.5 xs:px-1 sm:px-2 z-10">
                <div
                  key={`sign-${bannerIndex}`}
                  className={`font-['Press_Start_2P',monospace] font-black text-[8px] xs:text-[9.5px] sm:text-xs md:text-sm lg:text-[14.5px] text-black tracking-wider uppercase text-center leading-relaxed sm:leading-snug drop-shadow-[1px_1px_0px_rgba(255,255,255,0.7)] flex flex-col sm:flex-row items-center justify-center ${bannerAnimState === "out" ? "animate-sign-reel-out" : "animate-sign-reel-in"
                    }`}
                >
                  <span className="whitespace-nowrap">{INSTITUTION_BANNER_ITEMS[bannerIndex].line1}</span>
                  <span className="sm:ml-1.5 whitespace-nowrap">{INSTITUTION_BANNER_ITEMS[bannerIndex].line2}</span>
                </div>
              </div>

              {/* Right Spinning Coin */}
              <span className="text-[14px] xs:text-base sm:text-base animate-coin-spin shrink-0 z-10 select-none">🪙</span>
            </div>
          </div>

          {/* === RETRO 2D PLATFORM TITLE LOGO: "LET THE" & "GUSTO BEGIN" === */}
          <div
            onClick={triggerJump}
            className="flex flex-col items-center justify-center my-4 sm:my-8 md:my-10 cursor-pointer select-none group w-full animate-gusto-light-float"
            title="Click to see the letters jump!"
          >
            {/* Row 1: "LET" + [GAMING CONSOLE] + "THE" */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-6 md:gap-8 flex-nowrap animate-gusto-row1-wave w-full max-w-full px-1">
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
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.85rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>

              {/* RETRO GAMING CONSOLE / GAMEPAD MASCOT in between "LET" and "THE" */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  triggerJump();
                  try {
                    arcadeAudio.playJump();
                  } catch { }
                }}
                className="relative -mt-1 sm:-mt-5 md:-mt-7 mx-0.5 xs:mx-1.5 sm:mx-4 animate-idle-wiggle cursor-pointer shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200 select-none group/console z-10"
                title="Click Console to Jump &amp; Sound!"
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
                  className="w-16 xs:w-22 sm:w-28 md:w-36 lg:w-44 h-auto drop-shadow-[3px_3px_0px_#000] sm:drop-shadow-[5px_5px_0px_#000]"
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
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.85rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 2: "GUSTO BEGIN" - Well-spaced gap so title lines breathe with arcade punch */}
            <div className="flex items-center justify-center gap-1.5 xs:gap-3 sm:gap-6 md:gap-10 flex-nowrap mt-3.5 sm:mt-10 md:mt-14 animate-gusto-row2-wave w-full max-w-full px-1">
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
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.55rem] xs:text-[3.15rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] ${isJumping ? "animate-mario-letter-jump" : ""
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
                    className={`mario-letter-span ${item.color} ${item.rotate} text-[2.55rem] xs:text-[3.15rem] sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10rem] ${isJumping ? "animate-mario-letter-jump" : ""
                      } hover:-translate-y-2 hover:scale-105 transition-transform duration-150`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Retro Pixel Tagline Subtitle - Increased Scale */}
          <div className="mt-5 sm:mt-10 md:mt-12 mb-4 sm:mb-6 select-none px-3 xs:px-4 max-w-5xl">
            <p className="font-['Press_Start_2P',monospace] text-white text-[11px] xs:text-[13px] sm:text-sm md:text-base lg:text-lg drop-shadow-[3px_3px_0px_#000] tracking-wider uppercase text-center leading-relaxed font-bold">
              A NATIONAL LEVEL TECHNICAL SYMPOSIUM • MARCH 06, 2026 • GCE ERODE
            </p>
          </div>

          {/* Retro Arcade Presentation Card - Styled with Playfair Display Font */}
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 xs:px-6 sm:px-10 py-5 sm:py-7 rounded-2xl sm:rounded-3xl bg-black/45 backdrop-blur-md border-[3.5px] sm:border-[4px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] text-center my-4 sm:my-8 select-none relative overflow-hidden group">
            {/* Corner Arcade Screws */}
            <span className="absolute top-2 left-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute top-2 right-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute bottom-2 left-3 text-[10px] font-mono text-white/40 select-none">✚</span>
            <span className="absolute bottom-2 right-3 text-[10px] font-mono text-white/40 select-none">✚</span>

            {/* Top Amber Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-[3px] bg-gradient-to-r from-transparent via-[#ffd000] to-transparent opacity-80" />

            <div className="font-playfair font-black text-[#ffd000] text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-[32px] mb-2 sm:mb-3 text-center drop-shadow-[2px_2px_0px_#000] tracking-wider uppercase leading-snug flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse hidden xs:inline" />
              <span>BEGINNING OUR PRESENTATION // GUSTO 2K26</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse hidden xs:inline" />
            </div>
            <p className="font-playfair font-medium text-white/95 text-[15px] xs:text-[16.5px] sm:text-lg md:text-xl lg:text-[22px] leading-relaxed md:leading-relaxed max-w-3xl mx-auto drop-shadow-[1px_1px_2px_rgba(0,0,0,0.9)]">
              Welcome to Gusto 2.0 at Government College of Engineering, Erode. Step into World 1-1 featuring 9 technical &amp; non-technical arenas, cash prize bounty pools, certificates, and free bus transit!
            </p>
          </div>


          {/* === NATIONAL LEVEL TECHNICAL SYMPOSIUM BRIEFING (EXPANDED TO FIT PAGE PROPORTIONATELY WITH SCROLL REVEAL) === */}
          <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-12 px-2 sm:px-4 relative z-20">
            {/* 1. Top Continuous Moving Text Marquee Capsule - Scroll Reveal */}
            <div
              ref={marqueeRef}
              className={`w-full max-w-5xl mx-auto mb-8 sm:mb-10 rounded-full bg-white border-[3px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[8px_8px_0px_#000] py-3 sm:py-4 px-6 sm:px-8 overflow-hidden select-none hover:shadow-[10px_10px_0px_#000] hover:-translate-y-0.5 transition-all duration-300 scroll-reveal ${marqueeInView ? "is-visible" : ""
                }`}
            >
              <div className="flex w-max animate-marquee">
                <span className="font-['Chakra_Petch',sans-serif] font-black text-sm sm:text-lg md:text-xl text-[#3b0764] tracking-wider uppercase flex items-center gap-5 sm:gap-6 pr-8">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 inline shrink-0 animate-spin [animation-duration:4s]" />
                  <span>NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">MARCH 06, 2026</span>
                  <span className="text-zinc-400">•</span>
                  <span>GCEE ERODE</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#65a30d]">DEPARTMENT OF IT</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#2563eb]">9 COMPETITIONS</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#d97706]">CASH PRIZES &amp; CERTIFICATES</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">REGISTER NOW (₹250)</span>
                  <span className="text-zinc-400">•</span>
                </span>
                <span className="font-['Chakra_Petch',sans-serif] font-black text-sm sm:text-lg md:text-xl text-[#3b0764] tracking-wider uppercase flex items-center gap-5 sm:gap-6 pr-8" aria-hidden="true">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 inline shrink-0 animate-spin [animation-duration:4s]" />
                  <span>NATIONAL LEVEL TECHNICAL SYMPOSIUM</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">MARCH 06, 2026</span>
                  <span className="text-zinc-400">•</span>
                  <span>GCEE ERODE</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#65a30d]">DEPARTMENT OF IT</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#2563eb]">9 COMPETITIONS</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#d97706]">CASH PRIZES &amp; CERTIFICATES</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-[#ec4899]">REGISTER NOW (₹250)</span>
                  <span className="text-zinc-400">•</span>
                </span>
              </div>
            </div>

            {/* 2. 4 Quick Stat Cards — Retro Arcade Gaming Cartridge Module Design */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full mb-8 sm:mb-12"
            >
              {/* Cartridge 01: Event Date */}
              <div
                style={{ transitionDelay: statsInView ? "0ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fff1f2] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ec4899] border border-black animate-pulse shadow-[0_0_6px_#ec4899]" />
                    <span className="text-[10px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-01
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[9.5px] font-mono font-black bg-pink-100 text-[#ec4899] px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    DATE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#fbcfe8] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-[#db2777]" />
                  </div>
                  <span className="text-[11px] xs:text-[12px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Event Date
                  </span>
                  <span className="text-base xs:text-lg sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {ABOUT_DATA.eventDate}
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 02: Reg. Last Date */}
              <div
                style={{ transitionDelay: statsInView ? "120ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f5f3ff] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8b5cf6] border border-black animate-pulse shadow-[0_0_6px_#8b5cf6]" />
                    <span className="text-[10px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-02
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[9.5px] font-mono font-black bg-purple-100 text-[#8b5cf6] px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    DEADLINE
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#ddd6fe] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#7c3aed]" />
                  </div>
                  <span className="text-[11px] xs:text-[12px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Reg. Last Date
                  </span>
                  <span className="text-sm xs:text-base sm:text-sm lg:text-base font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {ABOUT_DATA.registrationLastDate}
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 03: Competitions */}
              <div
                style={{ transitionDelay: statsInView ? "240ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fffbeb] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] border border-black animate-pulse shadow-[0_0_6px_#f59e0b]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-03
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    ARENA
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#fef08a] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#b45309]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Competitions
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    {GUSTO_EVENTS?.length || 9} Total Events
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                </div>
              </div>

              {/* Cartridge 04: Campus Venue */}
              <div
                style={{ transitionDelay: statsInView ? "360ms" : "0ms" }}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f0fdf4] border-[3.5px] sm:border-[4px] border-black shadow-[5px_5px_0px_#000] sm:shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-all duration-200 flex flex-col justify-between text-center select-none scroll-reveal ${statsInView ? "is-visible" : ""
                  }`}
              >
                {/* Corner Screws */}
                <span className="absolute top-2 left-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>
                <span className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-400 select-none pointer-events-none">✚</span>

                {/* Top Cartridge Grip Ridges */}
                <div className="flex justify-center gap-1 sm:gap-1.5 pt-2 pb-1 opacity-25 group-hover:opacity-60 transition-opacity">
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                  <div className="w-5 sm:w-6 h-1 rounded-full bg-black" />
                </div>

                {/* Cartridge Header Bar */}
                <div className="mx-2 sm:mx-3 mb-2 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-white border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] border border-black animate-pulse shadow-[0_0_6px_#10b981]" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-zinc-900 tracking-wider">
                      ROM-04
                    </span>
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-mono font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-black/30 uppercase">
                    MAP
                  </span>
                </div>

                {/* Main Content */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-[#a7f3d0] border-2 border-black shadow-[2.5px_2.5px_0px_#000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#059669]" />
                  </div>
                  <span className="text-[10px] xs:text-[11px] sm:text-xs font-black text-zinc-600 uppercase font-mono tracking-wider block mb-0.5">
                    Campus Venue
                  </span>
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-['Chakra_Petch',sans-serif] font-black text-black leading-tight">
                    GCEE, Erode
                  </span>
                </div>

                {/* Bottom Gold Cartridge Pins */}
                <div className="pt-1 pb-1.5 px-3 bg-zinc-900 border-t-2 border-black flex justify-center gap-1 sm:gap-1.5">
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
                  <span className="w-2 sm:w-2.5 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xs border-[0.5px] border-black/40 shadow-inner" />
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
                <div className="switch-joycon-left w-7 xs:w-10 sm:w-20 md:w-24 p-1 xs:p-2 sm:p-3 flex flex-col justify-between items-center relative border-r-2 border-black/40 shrink-0">
                  {/* Minus Button (-) */}
                  <div className="w-full flex justify-end pr-0.5 sm:pr-2 pt-1">
                    <div className="w-2 sm:w-3.5 h-0.5 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60 shadow-xs" />
                  </div>

                  {/* Top Analog Joystick */}
                  <div className="switch-thumbstick w-5 h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 my-0.5 sm:my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* D-Pad Buttons (▲, ◀, ▶, ▼) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-0.5 sm:my-1">
                    <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▲</div>
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                      <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">◀</div>
                      <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▶</div>
                    </div>
                    <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/80 font-mono">▼</div>
                  </div>

                  {/* Square Capture/Record Button */}
                  <div className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 rounded-[2px] bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95">
                    <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#202226]" />
                  </div>
                </div>

                {/* CENTER OLED DISPLAY SCREEN */}
                <div className="switch-screen-outline flex-1 p-1.5 xs:p-2 sm:p-4 md:p-5 flex flex-col justify-between">
                  {/* Top Game Console Status Bar */}
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3 px-0.5 sm:px-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
                      <span className="text-[8px] xs:text-[9px] sm:text-xs font-['Chakra_Petch',sans-serif] font-black uppercase tracking-wider sm:tracking-widest text-[#fde047] flex items-center gap-1">
                        <span>★</span>
                        <span>LEVEL STARTS IN</span>
                        <span className="hidden xs:inline">★</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 font-mono text-[8px] sm:text-xs font-bold text-pink-300">
                      <span>March 06</span>
                      <span className="hidden sm:inline">, 2026</span>
                      <span className="hidden xs:inline px-1 py-0.5 rounded bg-black/60 text-[#84cc16] border border-white/20 text-[8px] sm:text-[9px]">100% 🔋</span>
                    </div>
                  </div>

                  {/* Inner Dark Screen Glass with Countdown Blocks */}
                  <div className="relative rounded-lg xs:rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-4 bg-black/85 border-2 border-black/60 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                    <div className="grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-3 lg:gap-4">
                      {/* Days */}
                      <div className="flex flex-col items-center p-1.5 xs:p-2 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#facc15] border-[1.5px] sm:border-[3px] border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.days).padStart(2, "0")}
                        </span>
                        <span className="text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Days
                        </span>
                      </div>

                      {/* Hours */}
                      <div className="flex flex-col items-center p-1.5 xs:p-2 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#84cc16] border-[1.5px] sm:border-[3px] border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                        <span className="text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Hours
                        </span>
                      </div>

                      {/* Mins */}
                      <div className="flex flex-col items-center p-1.5 xs:p-2 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#06b6d4] border-[1.5px] sm:border-[3px] border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-black font-mono leading-none">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                        <span className="text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-black uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
                          Mins
                        </span>
                      </div>

                      {/* Secs */}
                      <div className="flex flex-col items-center p-1.5 xs:p-2 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl bg-[#ec4899] border-[1.5px] sm:border-[3px] border-black shadow-[1.5px_1.5px_0px_#000] sm:shadow-[4px_4px_0px_#000] group hover:-translate-y-1 transition-transform cursor-pointer">
                        <span className="text-lg xs:text-2xl sm:text-5xl lg:text-6xl font-black text-white font-mono leading-none">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                        <span className="text-[7.5px] xs:text-[9px] sm:text-xs lg:text-sm font-black text-white uppercase mt-0.5 tracking-wider font-['Chakra_Petch',sans-serif]">
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
                <div className="switch-joycon-right w-7 xs:w-10 sm:w-20 md:w-24 p-1 xs:p-2 sm:p-3 flex flex-col justify-between items-center relative border-l-2 border-black/40 shrink-0">
                  {/* Plus Button (+) */}
                  <div className="w-full flex justify-start pl-0.5 sm:pr-2 pt-1">
                    <div className="relative w-2.5 sm:w-4 h-2.5 sm:h-4 flex items-center justify-center">
                      <div className="absolute w-2 sm:w-3.5 h-0.5 sm:h-1.5 bg-[#222] rounded-[1px] border border-black/60" />
                      <div className="absolute w-0.5 sm:w-1.5 h-2 sm:h-3.5 bg-[#222] rounded-[1px] border border-black/60" />
                    </div>
                  </div>

                  {/* Diamond Action Buttons (X, Y, A, B) */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 my-0.5 sm:my-1">
                    <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">X</div>
                    <div className="flex items-center gap-0.5 sm:gap-1.5">
                      <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">Y</div>
                      <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">A</div>
                    </div>
                    <div className="switch-btn w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 text-[6px] xs:text-[7px] sm:text-[9px] flex items-center justify-center text-white/90 font-mono font-bold">B</div>
                  </div>

                  {/* Bottom Analog Joystick */}
                  <div className="switch-thumbstick w-5 h-5 xs:w-6 xs:h-6 sm:w-10 sm:h-10 my-0.5 sm:my-1">
                    <div className="switch-thumbstick-inner" />
                  </div>

                  {/* Circular Home Button (⌂) */}
                  <div className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#383a40] border border-black/60 flex items-center justify-center shadow-inner cursor-pointer active:scale-95 text-white/80 text-[7px] sm:text-[10px]">
                    ⌂
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Action Arcade HUD & Controller Action Deck - Scroll Reveal */}
            <div
              ref={ctaRef}
              className={`relative flex flex-col items-center justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto px-2 select-none scroll-reveal ${ctaInView ? "is-visible" : ""
                }`}
            >
              {/* Master Arcade Coin-Op CTA Button ("PRESS START / REGISTER NOW") */}
              <div className="w-full flex justify-center">
                <button
                  onClick={onOpenRegister}
                  className="arcade-push-btn group relative overflow-hidden w-full max-w-2xl px-5 sm:px-8 py-3.5 sm:py-4.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#ec4899] via-[#f43f5e] to-[#ec4899] border-[3.5px] sm:border-[4.5px] border-black text-white cursor-pointer select-none"
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

                  <div className="relative flex items-center justify-center gap-3 sm:gap-4 py-0.5">
                    {/* Center: Bold Arcade Text */}
                    <div className="flex items-center gap-2 sm:gap-3 text-center">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 animate-pulse hidden xs:inline" />
                      <span className="font-['Chakra_Petch',sans-serif] font-black text-base xs:text-lg sm:text-2xl md:text-3xl text-white tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                        PRESS START • REGISTER NOW
                      </span>
                    </div>

                    {/* Right: Controller Arrow Trigger */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black border-2 border-white/40 flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-[2px_2px_0px_#000] shrink-0">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
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

      {/* ── SUPER MARIO WORLD LIVE ANIMATED LANDSCAPE & COIN ENGINE (Desktop Only) ── */}
      <div className="hidden sm:block">
        <MarioWorldLandscape onOpenRegister={onOpenRegister} />
      </div>

      {/* Clean Retro Turf Ground Baseline for Mobile View */}
      <div className="sm:hidden w-full h-8 bg-[#22c55e] border-t-[3.5px] border-black shadow-[inset_0_3px_0_#4ade80]" />
    </section>
  );
}

