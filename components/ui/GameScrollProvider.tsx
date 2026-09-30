"use client";

/**
 * GameScrollProvider.tsx — GUSTO '26 Realistic Highway & Racetrack Progress System
 *
 * Realism Features:
 *  • FIA Red & White alternating diagonal racing kerbs (rumble strips)
 *  • Fine asphalt tarmac texture with dark gradient & depth
 *  • Moving highway centerline markings that shift with scroll motion
 *  • Neon illuminated driven road trailing the car with laser contact tip
 *  • 25%, 50%, 75% track sector checkpoints with status LEDs
 *  • Live racing telemetry HUD: Real-time Speedometer (KM/H) & Gear indicator reactive to scroll velocity
 *  • Authentic compact GT Sports Car with rotating alloy rims, road-projecting LED headlight beam,
 *    exhaust smoke puffs, and suspension vibration
 *  • Checkered race finish line gantry with victory signal lights
 */

import { useEffect, useRef, useState, useCallback } from "react";

const BAR_H = 48;             // Total bar height (fits seamlessly with header top: 48px)
const ROAD_H = 22;            // Road height with tarmac, kerbs, and lane lines
const SKY_H = BAR_H - ROAD_H; // 26px sky & telemetry horizon
const CAR_W = 46;
const CAR_H = 17;

/* ─────────────────────── Realistic GT Sports Car SVG ─────────────────────── */
function GustoCar({ moving, speed }: { moving: boolean; speed: number }) {
  return (
    <svg
      viewBox="0 0 52 19"
      width={CAR_W}
      height={CAR_H}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Metallic GT Sports Car Paint Gradient */}
        <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="28%" stopColor="#e11d48" />
          <stop offset="85%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        {/* Tinted Cockpit Glass */}
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </linearGradient>

        {/* Headlight Beam Cone Gradient on Asphalt */}
        <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#fde047" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
        </linearGradient>

        {/* Metallic Alloy Rim Gradient */}
        <linearGradient id="wheelRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>

      {/* ── Ground Contact Shadow ── */}
      <ellipse cx="25" cy="18.2" rx="22" ry="0.9" fill="#000" opacity="0.45" />

      {/* ── Forward Headlight Beam on Road (Active when driving) ── */}
      <polygon
        points="48,11.5 64,8 64,17 48,14"
        fill="url(#headlightBeam)"
        opacity={moving ? 0.85 : 0.3}
      />

      {/* ── Aerodynamic Sports Car Chassis ── */}
      <path
        d="M 2 14.5 L 1.8 10.5 Q 1.8 8.8 3.5 7.8 L 7 8.2 Q 10 4.8 16 3.2 L 25 3.2 Q 29 4.8 34.5 8.2 L 46.5 11 Q 48.8 11.8 49 13.5 L 48 15 L 41 15 A 5 5 0 0 0 31 15 L 17 15 A 5 5 0 0 0 7 15 L 2 14.5 Z"
        fill="url(#carBodyGrad)"
        stroke="#18181b"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />

      {/* ── Front Chin Splitter & Carbon Skirt ── */}
      <line x1="47" y1="14.8" x2="49" y2="14.8" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="14.8" x2="31" y2="14.8" stroke="#09090b" strokeWidth="0.9" strokeLinecap="round" />

      {/* ── Dual Chrome Exhaust Tips ── */}
      <rect x="0.6" y="13.2" width="2" height="1.1" rx="0.5" fill="#cbd5e1" stroke="#000" strokeWidth="0.4" />

      {/* ── Tinted Cockpit Glass ── */}
      <path
        d="M 8.8 8.1 L 16.2 3.8 L 24.2 3.8 L 33.5 8.1 Z"
        fill="url(#glassGrad)"
        stroke="#09090b"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />

      {/* Driver Seat Headrest Silhouette */}
      <ellipse cx="18" cy="6.2" rx="1.3" ry="1.6" fill="#020617" />

      {/* Glass Specular Glare Highlights */}
      <polygon points="21.5,4.2 20.2,7.8 21.4,7.8 22.8,4.2" fill="#fff" opacity="0.4" />
      <polygon points="27.5,4.6 25,7.9 26.3,7.9 28.9,4.6" fill="#fff" opacity="0.5" />

      {/* Center B-Pillar */}
      <line x1="19.5" y1="3.8" x2="19" y2="8.1" stroke="#09090b" strokeWidth="0.8" />

      {/* ── Aerodynamic Side Wing Mirror ── */}
      <path d="M 31.5 8.2 Q 32.5 6.8 34 7 L 34 8.4 Z" fill="#e11d48" stroke="#09090b" strokeWidth="0.4" />

      {/* ── Body Character Line / Shoulder Reflection ── */}
      <path
        d="M 4 9.5 Q 26 8.5 45 11.5"
        stroke="#fecdd3"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.95"
      />

      {/* Door Shut Line & Handle */}
      <line x1="21.5" y1="8.2" x2="20.5" y2="14.8" stroke="#4c0519" strokeWidth="0.5" opacity="0.8" />
      <rect x="22" y="9.8" width="2.2" height="0.5" rx="0.25" fill="#18181b" opacity="0.75" />

      {/* ── Slim Modern LED Projector Headlight ── */}
      <polygon points="45,10.6 48.5,12 47.2,12.8 44.5,11.5" fill="#f8fafc" stroke="#38bdf8" strokeWidth="0.35" />
      <circle cx="46.8" cy="11.8" r="0.6" fill="#38bdf8" />

      {/* ── Sleek LED Taillight Bar ── */}
      <line x1="1.8" y1="9.5" x2="4.2" y2="9.8" stroke="#ef4444" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="1.8" y1="9.5" x2="4.2" y2="9.8" stroke="#fca5a5" strokeWidth="0.4" strokeLinecap="round" />

      {/* ── REAR WHEEL ASSEMBLY ── */}
      <g transform="translate(12, 14.8)">
        <circle cx="0" cy="0" r="2.6" fill="#94a3b8" />
        <rect x="-2.5" y="-2" width="1.5" height="1.8" rx="0.4" fill="#ef4444" />
        <circle cx="0" cy="0" r="3.7" fill="#09090b" stroke="#18181b" strokeWidth="0.8" />
        <g className={moving ? "car-wheel-spinning" : ""}>
          <circle cx="0" cy="0" r="1.1" fill="url(#wheelRimGrad)" stroke="#1e293b" strokeWidth="0.3" />
          <line x1="0" y1="-0.9" x2="0" y2="-3.2" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="0.85" y1="-0.28" x2="3" y2="-1" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="0.53" y1="0.73" x2="1.9" y2="2.6" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-0.53" y1="0.73" x2="-1.9" y2="2.6" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-0.85" y1="-0.28" x2="-3" y2="-1" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="0" cy="0" r="0.4" fill="#f8fafc" />
        </g>
      </g>

      {/* ── FRONT WHEEL ASSEMBLY ── */}
      <g transform="translate(36, 14.8)">
        <circle cx="0" cy="0" r="2.6" fill="#94a3b8" />
        <rect x="-2.5" y="-2" width="1.5" height="1.8" rx="0.4" fill="#ef4444" />
        <circle cx="0" cy="0" r="3.7" fill="#09090b" stroke="#18181b" strokeWidth="0.8" />
        <g className={moving ? "car-wheel-spinning" : ""}>
          <circle cx="0" cy="0" r="1.1" fill="url(#wheelRimGrad)" stroke="#1e293b" strokeWidth="0.3" />
          <line x1="0" y1="-0.9" x2="0" y2="-3.2" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="0.85" y1="-0.28" x2="3" y2="-1" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="0.53" y1="0.73" x2="1.9" y2="2.6" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-0.53" y1="0.73" x2="-1.9" y2="2.6" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="-0.85" y1="-0.28" x2="-3" y2="-1" stroke="url(#wheelRimGrad)" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="0" cy="0" r="0.4" fill="#f8fafc" />
        </g>
      </g>

      {/* High-speed blur streaks */}
      {speed > 60 && (
        <g opacity={Math.min(speed / 160, 0.8)}>
          <line x1="0" y1="9" x2="-12" y2="9" stroke="#fde047" strokeWidth="1" strokeLinecap="round" />
          <line x1="0" y1="13" x2="-16" y2="13" stroke="#fde047" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/* ─────────────────────── Checkered Finish Gantry ─────────────────────────── */
function FinishGantry({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="flex items-end gap-1 select-none pointer-events-none">
      {/* Race Light Pillar */}
      <div className="flex flex-col items-center bg-black px-0.5 py-0.5 rounded border border-neutral-700 shadow-[1px_1px_0_#000]">
        <div className={`w-1.5 h-1.5 rounded-full mb-0.5 transition-colors ${isComplete ? "bg-[#22c55e] shadow-[0_0_6px_#22c55e]" : "bg-neutral-800"}`} />
        <div className={`w-1.5 h-1.5 rounded-full mb-0.5 transition-colors ${isComplete ? "bg-[#22c55e] shadow-[0_0_6px_#22c55e]" : "bg-neutral-800"}`} />
        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isComplete ? "bg-[#eab308] shadow-[0_0_6px_#eab308]" : "bg-neutral-800"}`} />
      </div>

      {/* Checkered Flag */}
      <svg viewBox="0 0 18 32" width="16" height="28" fill="none" aria-hidden="true">
        {/* Pole */}
        <line x1="2" y1="2" x2="2" y2="31" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        {/* 3×4 Checkered squares */}
        {([0, 1, 2, 3] as const).flatMap((row) =>
          ([0, 1, 2] as const).map((col) => (
            <rect
              key={`${row}-${col}`}
              x={2 + col * 4}
              y={2 + row * 4}
              width="4"
              height="4"
              fill={(row + col) % 2 === 0 ? "#000" : "#fff"}
              opacity={isComplete ? 1 : 0.65}
            />
          ))
        )}
        <rect x="2" y="2" width="12" height="16" fill="none" stroke="#000" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ─────────────────────── Main Component ──────────────────────────────────── */
export function GameScrollProvider() {
  const [pct, setPct] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const prevPctRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speedDecayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    setPct(p);

    const now = Date.now();
    const dt = lastScrollTime.current > 0 ? Math.max(now - lastScrollTime.current, 16) : 16;
    const dy = Math.abs(scrollTop - lastScrollY.current);
    const scrollVelocity = (dy / dt) * 100;
    const calculatedSpeed = Math.min(Math.round(scrollVelocity * 1.8), 240);

    lastScrollY.current = scrollTop;
    lastScrollTime.current = now;

    if (calculatedSpeed > 6) {
      setSpeed(calculatedSpeed);
      if (speedDecayRef.current) clearTimeout(speedDecayRef.current);
      speedDecayRef.current = setTimeout(() => {
        setSpeed(0);
      }, 300);
    }

    // "moving" flag
    if (Math.abs(p - prevPctRef.current) > 0.05) {
      setIsMoving(true);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 280);
    }
    prevPctRef.current = p;

    // Parallax drivers for background sections
    const slow = document.querySelectorAll<HTMLElement>(".parallax-slow");
    const med = document.querySelectorAll<HTMLElement>(".parallax-med");
    const fast = document.querySelectorAll<HTMLElement>(".parallax-fast");
    slow.forEach((el) => {
      el.style.transform = `translateY(${scrollTop * 0.04}px)`;
    });
    med.forEach((el) => {
      el.style.transform = `translateY(${scrollTop * 0.08}px)`;
    });
    fast.forEach((el) => {
      el.style.transform = `translateY(${scrollTop * 0.14}px)`;
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    const rAF = requestAnimationFrame(handleScroll);
    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener("scroll", handleScroll);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      if (speedDecayRef.current) clearTimeout(speedDecayRef.current);
    };
  }, [handleScroll]);

  const isComplete = pct >= 99;
  const gear = speed === 0 ? "N" : speed < 40 ? "1" : speed < 80 ? "2" : speed < 130 ? "3" : speed < 180 ? "4" : "5";

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: `${BAR_H}px`,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
        borderBottom: "3px solid #000",
        boxShadow: "0 3px 0 #000",
      }}
    >
      {/* ══════════════════════════════════════════════
          SKY / HORIZON & TELEMETRY LAYER (Top 26px)
          ══════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${SKY_H}px`,
          background: "linear-gradient(to bottom, #fec800 0%, #fde047 100%)",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid texture matching GUSTO theme */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Distant Skyline Silhouettes */}
        <svg
          viewBox="0 0 800 26"
          width="100%"
          height={`${SKY_H}px`}
          preserveAspectRatio="none"
          style={{ position: "absolute", bottom: 0 }}
        >
          {[
            [15, 16, 12], [55, 20, 10], [90, 14, 16], [130, 22, 10],
            [180, 13, 18], [225, 18, 12], [270, 16, 14], [315, 20, 10],
            [360, 14, 16], [405, 22, 10], [450, 16, 14], [495, 18, 12],
            [540, 13, 18], [585, 20, 12], [630, 16, 14], [675, 18, 10],
            [720, 14, 16], [760, 20, 10],
          ].map(([x, h, w], i) => (
            <g key={i}>
              <rect x={x} y={26 - h} width={w} height={h} fill="#3b0764" opacity="0.16" />
              <rect x={x + 2} y={26 - h + 2} width={2.5} height={2.5} fill="#fde047" opacity="0.5" />
              <rect x={x + 2} y={26 - h + 7} width={2.5} height={2.5} fill="#fde047" opacity="0.4" />
            </g>
          ))}
        </svg>

        {/* Drifting Clouds */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200%",
            height: "100%",
            animation: "gusto-cloud-drift 32s linear infinite",
          }}
        >
          <svg viewBox="0 0 1600 26" width="1600" height={`${SKY_H}px`} preserveAspectRatio="none">
            {[
              [40, 8, 48, 7],
              [190, 6, 38, 6],
              [380, 10, 52, 8],
              [590, 6, 36, 6],
              [780, 9, 44, 7],
              [960, 6, 34, 6],
              [1140, 10, 48, 8],
              [1320, 7, 38, 6],
              [1500, 9, 42, 7],
            ].map(([cx, cy, rx, ry], i) => (
              <g key={i} opacity="0.4">
                <ellipse cx={cx} cy={cy} rx={rx * 0.55} ry={ry * 0.7} fill="white" />
                <ellipse cx={cx + rx * 0.3} cy={cy - 1.5} rx={rx * 0.45} ry={ry * 0.85} fill="white" />
                <ellipse cx={cx + rx * 0.65} cy={cy} rx={rx * 0.4} ry={ry * 0.65} fill="white" />
              </g>
            ))}
          </svg>
        </div>

        {/* ── RACING TELEMETRY HUD ── */}
        <div className="absolute inset-0 px-3 flex items-center justify-between">
          {/* Left: Speedometer & Gear */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#18181b]/90 text-[#fde047] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000]">
              <span className="text-[7.5px] font-mono font-black text-neutral-400">SPD:</span>
              <span className={`text-[8.5px] font-mono font-black tabular-nums ${speed > 100 ? "text-[#ef4444]" : "text-[#fde047]"}`}>
                {String(speed).padStart(3, "0")}
              </span>
              <span className="text-[6.5px] font-mono font-bold text-neutral-400">KM/H</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-[#3b0764] text-white px-1.5 py-0.5 rounded border border-black shadow-[1px_1px_0_#000]">
              <span className="text-[7px] font-mono font-bold opacity-75">GEAR</span>
              <span className="text-[8px] font-mono font-black text-[#fde047]">{gear}</span>
            </div>
          </div>

          {/* Right: Lap / Completion Pill */}
          <div className="flex items-center gap-1.5 bg-[#3b0764] text-[#fde047] px-2.5 py-0.5 rounded border-1.5 border-black shadow-[1.5px_1.5px_0_#000]">
            <span className="text-[7px] font-mono font-black text-white/80 tracking-wider">GUSTO GP</span>
            <span className="text-[7.5px] font-mono font-black text-[#fde047]">
              {Math.round(pct)}%
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          REALISTIC RACETRACK / ROAD LAYER (Bottom 22px)
          ══════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${ROAD_H}px`,
          background: "linear-gradient(180deg, #22252c 0%, #16181e 50%, #0d0e12 100%)",
          borderTop: "1.5px solid #000",
        }}
      >
        {/* ── FIA Red & White Alternating Racing Rumble Kerbs (Top Edge) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "repeating-linear-gradient(90deg, #dc2626 0px, #dc2626 12px, #f8fafc 12px, #f8fafc 24px)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.6)",
            zIndex: 2,
          }}
        />

        {/* ── Highway Yellow Dashed Center Lane Line ── */}
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: 0,
            right: 0,
            height: "2px",
            transform: "translateY(-50%)",
            background:
              "repeating-linear-gradient(90deg, #facc15 0px, #facc15 16px, transparent 16px, transparent 32px)",
            backgroundPositionX: `-${(pct * 6) % 32}px`,
            opacity: 0.7,
            boxShadow: "0 0 4px rgba(250, 204, 21, 0.4)",
          }}
        />

        {/* ── Roadside Steel Barrier / Lower Guardrail ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #475569 0%, #64748b 50%, #334155 100%)",
            opacity: 0.6,
          }}
        />

        {/* ── Sector Distance Checkpoint Markers (25%, 50%, 75%) ── */}
        {[
          { pos: 25, label: "S1" },
          { pos: 50, label: "MID" },
          { pos: 75, label: "S3" },
        ].map((cp) => {
          const cleared = pct >= cp.pos;
          return (
            <div
              key={cp.pos}
              style={{
                position: "absolute",
                left: `${cp.pos}%`,
                bottom: 0,
                top: "3px",
                width: "1px",
                background: cleared ? "rgba(34, 197, 94, 0.45)" : "rgba(255, 255, 255, 0.15)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "2px",
                  fontSize: "5.5px",
                  fontFamily: "monospace",
                  fontWeight: 900,
                  color: cleared ? "#22c55e" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.2px",
                }}
              >
                {cp.label}
              </div>
            </div>
          );
        })}

        {/* ══════════════════════════════════════════════
            ILLUMINATED PROGRESS TRAIL (Driven Asphalt)
            ══════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: `${pct}%`,
            height: `${ROAD_H - 3}px`,
            background:
              "linear-gradient(90deg, rgba(59, 7, 100, 0.85) 0%, rgba(109, 40, 217, 0.85) 80%, rgba(236, 72, 153, 0.85) 100%)",
            transition: "width 0.1s linear",
            zIndex: 1,
          }}
        >
          {/* White illuminated dashed lane on driven road */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              transform: "translateY(-50%)",
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.85) 0px, rgba(255,255,255,0.85) 16px, transparent 16px, transparent 32px)",
              backgroundPositionX: `-${(pct * 6) % 32}px`,
            }}
          />
        </div>

        {/* ── Leading-Edge Laser Tip Contact Beam ── */}
        {pct > 0.5 && pct < 99.5 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: `${pct}%`,
              width: "2.5px",
              height: `${ROAD_H - 3}px`,
              transform: "translateX(-50%)",
              background: "#f43f5e",
              boxShadow: "0 0 8px 1px #f43f5e, 0 0 16px 2px #ec4899",
              zIndex: 2,
              transition: "left 0.1s linear",
            }}
          />
        )}
      </div>

      {/* ══════════════════════════════════════════════
          COMPACT REALISTIC GT SPORTS CAR
          ══════════════════════════════════════════════ */}
      <div
        className={isMoving ? "car-chassis-rumble" : ""}
        style={{
          position: "absolute",
          bottom: `${ROAD_H - 10}px`,
          left: `calc(4px + (${pct} * 0.01) * (100% - ${CAR_W + 30}px))`,
          width: `${CAR_W}px`,
          height: `${CAR_H}px`,
          transition: "left 0.1s linear",
          zIndex: 4,
        }}
      >
        {/* Exhaust puffs — when moving */}
        {isMoving && (
          <>
            <div
              className="exhaust-puff"
              style={{
                left: "-3px",
                bottom: "3px",
                animationDelay: "0ms",
                width: "4px",
                height: "4px",
              }}
            />
            <div
              className="exhaust-puff"
              style={{
                left: "-7px",
                bottom: "5px",
                animationDelay: "180ms",
                width: "3px",
                height: "3px",
              }}
            />
          </>
        )}
        <GustoCar moving={isMoving} speed={speed} />
      </div>

      {/* ══════════════════════════════════════════════
          CHECKERED FINISH LINE & GANTRY
          ══════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          right: "4px",
          bottom: `${ROAD_H - 6}px`,
          zIndex: 4,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          transform: isComplete ? "scale(1.15) translateY(-2px)" : "scale(1)",
        }}
      >
        <FinishGantry isComplete={isComplete} />
      </div>
    </div>
  );
}
