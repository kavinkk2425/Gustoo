import React from "react";

export function RetroGamepad({ className = "w-36 h-28" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Controller Body with thick shadow */}
      <rect
        x="24"
        y="30"
        width="152"
        height="90"
        rx="45"
        fill="#000000"
      />
      <rect
        x="20"
        y="24"
        width="152"
        height="90"
        rx="45"
        fill="#ec4899"
        stroke="#000000"
        strokeWidth="6"
      />

      {/* Top handles connector / wire */}
      <path
        d="M70 24 C70 8, 40 4, 30 18"
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="18" r="6" fill="#fde047" stroke="#000" strokeWidth="4" />

      {/* Left Grip Bump */}
      <circle cx="45" cy="80" r="32" fill="#ec4899" stroke="#000" strokeWidth="6" />
      {/* Right Grip Bump */}
      <circle cx="147" cy="80" r="32" fill="#ec4899" stroke="#000" strokeWidth="6" />

      {/* D-Pad (Left) */}
      <g transform="translate(32, 60)">
        <path
          d="M10 0 H18 V10 H28 V18 H18 V28 H10 V18 H0 V10 H10 Z"
          fill="#facc15"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="14" r="3" fill="#000" />
      </g>

      {/* Cute Eyes & Smile in center */}
      <circle cx="86" cy="62" r="3.5" fill="#000" />
      <circle cx="106" cy="62" r="3.5" fill="#000" />
      <path
        d="M91 70 Q96 76 101 70"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Middle buttons */}
      <rect x="80" y="80" width="12" height="6" rx="3" fill="#3b0764" stroke="#000" strokeWidth="2" />
      <rect x="100" y="80" width="12" height="6" rx="3" fill="#3b0764" stroke="#000" strokeWidth="2" />

      {/* Right Action Buttons */}
      <g transform="translate(132, 60)">
        <circle cx="8" cy="8" r="6" fill="#3b0764" stroke="#000" strokeWidth="3" />
        <circle cx="22" cy="8" r="6" fill="#3b0764" stroke="#000" strokeWidth="3" />
        <circle cx="15" cy="22" r="6" fill="#3b0764" stroke="#000" strokeWidth="3" />
        {/* Inner dots */}
        <circle cx="8" cy="8" r="2" fill="#fde047" />
        <circle cx="22" cy="8" r="2" fill="#84cc16" />
        <circle cx="15" cy="22" r="2" fill="#06b6d4" />
      </g>
    </svg>
  );
}

export function RetroConsole({ className = "w-32 h-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Console shadow */}
      <rect x="12" y="38" width="80" height="55" rx="10" fill="#000" />
      {/* Console body (cyan) */}
      <rect x="8" y="32" width="80" height="55" rx="10" fill="#06b6d4" stroke="#000" strokeWidth="5" />
      {/* Cartridge slot */}
      <rect x="22" y="22" width="45" height="20" rx="4" fill="#ec4899" stroke="#000" strokeWidth="4" />
      <rect x="30" y="26" width="30" height="10" fill="#fde047" stroke="#000" strokeWidth="2" />

      {/* Vents */}
      <line x1="20" y1="55" x2="40" y2="55" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="62" x2="40" y2="62" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <circle cx="70" cy="58" r="6" fill="#fde047" stroke="#000" strokeWidth="3" />

      {/* Joystick base shadow */}
      <rect x="86" y="58" width="40" height="40" rx="8" fill="#000" />
      {/* Joystick base */}
      <rect x="82" y="54" width="40" height="40" rx="8" fill="#8b5cf6" stroke="#000" strokeWidth="5" />
      {/* Stick */}
      <line x1="102" y1="54" x2="102" y2="34" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      {/* Stick knob */}
      <circle cx="102" cy="30" r="10" fill="#ec4899" stroke="#000" strokeWidth="4" />
    </svg>
  );
}

export function RetroCartridge({
  color = "#ec4899",
  label = "GUSTO",
  className = "w-20 h-24",
}: {
  color?: string;
  label?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 90 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="76" height="92" rx="10" fill="#000" />
      <rect x="4" y="6" width="76" height="92" rx="10" fill={color} stroke="#000" strokeWidth="5" />
      {/* Top ridges */}
      <line x1="16" y1="16" x2="68" y2="16" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="24" x2="68" y2="24" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      {/* Label sticker */}
      <rect x="14" y="36" width="56" height="48" rx="6" fill="#facc15" stroke="#000" strokeWidth="3" />
      <text
        x="42"
        y="65"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#3b0764"
        fontFamily="sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}

export function ComicStar({ className = "w-6 h-6 text-cyan-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" stroke="#000" strokeWidth="2" />
    </svg>
  );
}

export function SoccerFireball({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fire blast lines */}
      <path
        d="M20 20 L5 10 M15 35 L0 35 M20 50 L8 65"
        stroke="#f59e0b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Yellow burst behind */}
      <polygon
        points="30,10 40,25 60,15 50,35 70,40 50,55 60,70 40,60 30,75 25,55 10,50 25,35"
        fill="#fde047"
        stroke="#000"
        strokeWidth="3"
      />
      {/* Soccer Ball */}
      <circle cx="45" cy="45" r="22" fill="#ffffff" stroke="#000" strokeWidth="4" />
      {/* Soccer pattern pentagons */}
      <polygon points="45,35 53,41 50,50 40,50 37,41" fill="#4c1d95" stroke="#000" strokeWidth="2.5" />
      <line x1="45" y1="35" x2="45" y2="23" stroke="#000" strokeWidth="2.5" />
      <line x1="53" y1="41" x2="65" y2="38" stroke="#000" strokeWidth="2.5" />
      <line x1="50" y1="50" x2="58" y2="62" stroke="#000" strokeWidth="2.5" />
      <line x1="40" y1="50" x2="32" y2="62" stroke="#000" strokeWidth="2.5" />
      <line x1="37" y1="41" x2="25" y2="38" stroke="#000" strokeWidth="2.5" />
    </svg>
  );
}

export function RotatingBadge({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative ${className} select-none`}>
      {/* Outer shadow */}
      <div className="absolute inset-0 rounded-full bg-black translate-x-1.5 translate-y-1.5" />
      {/* Circular Body */}
      <div className="relative w-full h-full rounded-full bg-[#fde047] border-[4px] border-black flex items-center justify-center p-1">
        {/* SVG Curved Text Animation */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_12s_linear_infinite]"
        >
          <path
            id="badgeCirclePath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
          <text fontSize="8.2" fontWeight="900" fill="#3b0764" letterSpacing="2.5">
            <textPath href="#badgeCirclePath" startOffset="0%">
              GUSTO 2K26 ★ GCEE ERODE ★ AIT ★
            </textPath>
          </text>
        </svg>

        {/* Center Gameboy Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-12 rounded-lg bg-[#ec4899] border-2 border-black flex flex-col items-center justify-between p-1 shadow-[2px_2px_0px_#000]">
            <div className="w-7 h-5 rounded bg-[#fde047] border border-black flex items-center justify-center text-[7px] font-bold text-black">
              IT
            </div>
            <div className="flex items-center justify-between w-full px-1">
              <span className="w-2.5 h-2.5 rounded-full bg-black text-[5px] text-white flex items-center justify-center font-mono">
                +
              </span>
              <div className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 border border-black" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 border border-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
