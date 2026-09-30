"use client";

/**
 * ArcadeShooters.tsx — Realistic Stealth Fighter Aircraft
 *
 * Two high-fidelity supersonic stealth fighter jets patrol the left and right margins of the viewport.
 * Left jet: Deep stealth carbon hull with neon cyan avionics, navigation strobes, and supersonic pulse cannons.
 * Right jet: Deep stealth carbon hull with neon magenta/pink avionics, navigation strobes, and supersonic pulse cannons.
 *
 * Realism features:
 *  • Realistic aerodynamic stealth fighter silhouette with delta wings, LERX chines, and canted twin rudders
 *  • Multi-coated tinted bubble canopy with gold/iridescent glass reflections, HUD reticle, & pilot visor
 *  • Wingtip missile rails with detailed air-to-air missiles
 *  • Twin titanium afterburner nozzles with pulsing Mach shock diamonds and heat distortion
 *  • Left/right port & starboard anti-collision navigation strobes (red port / green starboard)
 *  • Synchronized muzzle flashes with supersonic kinetic tracer rounds
 *  • Aerodynamic bank/roll patrol physics (tilts into turns realistically)
 *  • Wingtip vortex condensation trails
 *  • Zero interference: pointer-events: none, stays in side gutters, hidden on mobile/tablet (lg: screens only)
 */

import React from "react";

/* ─────────────────────── Realistic Fighter Jet SVG ─────────────────────── */
function RealisticFighterJet({
  themeColor,
  accentColor,
  side,
}: {
  themeColor: string;   // primary neon highlight (e.g. #06b6d4 for left, #ec4899 for right)
  accentColor: string;  // secondary contrast (e.g. #38bdf8 / #f43f5e)
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  // Left wingtip navigation light is red (port), right wingtip is green (starboard)
  const portNavColor = isLeft ? "#ef4444" : "#22c55e";
  const stbdNavColor = isLeft ? "#22c55e" : "#ef4444";

  return (
    <svg
      viewBox="0 0 100 130"
      width="78"
      height="102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Fuselage metallic coating gradient */}
        <linearGradient id={`hullGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="35%" stopColor="#1e293b" />
          <stop offset="70%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Wing surface gradient */}
        <linearGradient id={`wingGrad-${side}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="25%" stopColor="#1e293b" />
          <stop offset="85%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1e2f" />
        </linearGradient>

        {/* Polarized cockpit glass reflection */}
        <linearGradient id={`canopyGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="30%" stopColor="#0284c7" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.75" />
        </linearGradient>

        {/* Titanium afterburner nozzle */}
        <linearGradient id={`nozzleGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Supersonic afterburner flame core */}
        <linearGradient id={`afterburnerGrad-${side}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor={themeColor} />
          <stop offset="60%" stopColor={accentColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Glow filter for weapon discharge & afterburner */}
        <filter id={`jetGlow-${side}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Wingtip Vortex Vapor Trails (faint supersonic contrails) ── */}
      <line
        x1="7" y1="88" x2="7" y2="128"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        strokeDasharray="4 2"
        style={{ animation: "jetVortexTrail 1.8s ease-in-out infinite" }}
      />
      <line
        x1="93" y1="88" x2="93" y2="128"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.2"
        strokeDasharray="4 2"
        style={{ animation: "jetVortexTrail 1.8s ease-in-out 0.9s infinite" }}
      />

      {/* ── Twin Supersonic Afterburners with Mach Shock Diamonds ── */}
      <g style={{ animation: "jetAfterburnerPulse 0.16s ease-in-out infinite alternate" }}>
        {/* Left engine exhaust plume */}
        <path
          d="M 40,103 L 36,128 Q 42,133 46,128 L 44,103 Z"
          fill={`url(#afterburnerGrad-${side})`}
          filter={`url(#jetGlow-${side})`}
          opacity="0.9"
        />
        {/* Left Mach shock diamonds */}
        <polygon points="41,107 43,112 41,117 39,112" fill="#ffffff" opacity="0.95" />
        <polygon points="41,118 42.5,122 41,126 39.5,122" fill="#ffffff" opacity="0.85" />

        {/* Right engine exhaust plume */}
        <path
          d="M 56,103 L 54,128 Q 58,133 64,128 L 60,103 Z"
          fill={`url(#afterburnerGrad-${side})`}
          filter={`url(#jetGlow-${side})`}
          opacity="0.9"
        />
        {/* Right Mach shock diamonds */}
        <polygon points="59,107 61,112 59,117 57,112" fill="#ffffff" opacity="0.95" />
        <polygon points="59,118 60.5,122 59,126 57.5,122" fill="#ffffff" opacity="0.85" />
      </g>

      {/* ── Afterburner Nozzle Casing (Segmented Titanium Petals) ── */}
      <g>
        {/* Left nozzle */}
        <rect x="37" y="99" width="8" height="5" rx="1.5" fill={`url(#nozzleGrad-${side})`} stroke="#000" strokeWidth="0.8" />
        <line x1="39" y1="99" x2="39" y2="104" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="41" y1="99" x2="41" y2="104" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="43" y1="99" x2="43" y2="104" stroke="#1e293b" strokeWidth="0.6" />

        {/* Right nozzle */}
        <rect x="55" y="99" width="8" height="5" rx="1.5" fill={`url(#nozzleGrad-${side})`} stroke="#000" strokeWidth="0.8" />
        <line x1="57" y1="99" x2="57" y2="104" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="59" y1="99" x2="59" y2="104" stroke="#1e293b" strokeWidth="0.6" />
        <line x1="61" y1="99" x2="61" y2="104" stroke="#1e293b" strokeWidth="0.6" />
      </g>

      {/* ── Main Swept Delta Wings (Stealth Faceted Composite Structure) ── */}
      <path
        d="M 50,14 
           L 44,38 
           L 38,52 
           L 7,85 
           L 7,90 
           L 32,87 
           L 34,101 
           L 50,98 
           L 66,101 
           L 68,87 
           L 93,90 
           L 93,85 
           L 62,52 
           L 56,38 
           Z"
        fill={`url(#wingGrad-${side})`}
        stroke="#020617"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* ── Wing Aerodynamic Bevels & Panel Lines ── */}
      {/* Left wing ailerons & paneling */}
      <path d="M 38,56 L 16,84 L 32,85 Z" fill="#334155" opacity="0.35" />
      <line x1="16" y1="84" x2="32" y2="85" stroke="#475569" strokeWidth="0.8" />
      <line x1="24" y1="74" x2="28" y2="85" stroke="#475569" strokeWidth="0.6" />
      <line x1="38" y1="62" x2="44" y2="84" stroke="#0f172a" strokeWidth="0.7" />

      {/* Right wing ailerons & paneling */}
      <path d="M 62,56 L 84,84 L 68,85 Z" fill="#334155" opacity="0.35" />
      <line x1="84" y1="84" x2="68" y2="85" stroke="#475569" strokeWidth="0.8" />
      <line x1="76" y1="74" x2="72" y2="85" stroke="#475569" strokeWidth="0.6" />
      <line x1="62" y1="62" x2="56" y2="84" stroke="#0f172a" strokeWidth="0.7" />

      {/* ── Wingtip Weapon Rails & AIM-9X Sidewinder Air-to-Air Missiles ── */}
      {/* Left missile station */}
      <g>
        <rect x="5.5" y="70" width="3" height="19" rx="1" fill="#475569" stroke="#0f172a" strokeWidth="0.6" />
        {/* Missile nose seeker cone */}
        <polygon points="7,66 5.5,70 8.5,70" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.5" />
        {/* Forward canard fins */}
        <polygon points="4,72 7,71 7,73" fill="#334155" />
        <polygon points="10,72 7,71 7,73" fill="#334155" />
        {/* Warning yellow strip */}
        <rect x="6" y="74" width="2" height="1.5" fill="#facc15" />
        {/* Rear stabilizer fins */}
        <polygon points="3.5,86 7,85 7,88" fill="#1e293b" />
        <polygon points="10.5,86 7,85 7,88" fill="#1e293b" />
      </g>

      {/* Right missile station */}
      <g>
        <rect x="91.5" y="70" width="3" height="19" rx="1" fill="#475569" stroke="#0f172a" strokeWidth="0.6" />
        {/* Missile nose seeker cone */}
        <polygon points="93,66 91.5,70 94.5,70" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.5" />
        {/* Forward canard fins */}
        <polygon points="90,72 93,71 93,73" fill="#334155" />
        <polygon points="96,72 93,71 93,73" fill="#334155" />
        {/* Warning yellow strip */}
        <rect x="92" y="74" width="2" height="1.5" fill="#facc15" />
        {/* Rear stabilizer fins */}
        <polygon points="89.5,86 93,85 93,88" fill="#1e293b" />
        <polygon points="96.5,86 93,85 93,88" fill="#1e293b" />
      </g>

      {/* ── Canted Twin Vertical Stabilizers (Twin Tail Fins) ── */}
      {/* Left canted vertical fin */}
      <path
        d="M 33,65 L 25,97 L 29,101 L 37,84 Z"
        fill="#1e293b"
        stroke="#020617"
        strokeWidth="1"
      />
      {/* Rudder cut line */}
      <line x1="27" y1="91" x2="33" y2="82" stroke="#475569" strokeWidth="0.8" />
      {/* Fin antenna tip */}
      <rect x="24" y="96" width="2" height="4" fill="#94a3b8" />

      {/* Right canted vertical fin */}
      <path
        d="M 67,65 L 75,97 L 71,101 L 63,84 Z"
        fill="#1e293b"
        stroke="#020617"
        strokeWidth="1"
      />
      {/* Rudder cut line */}
      <line x1="73" y1="91" x2="67" y2="82" stroke="#475569" strokeWidth="0.8" />
      {/* Fin antenna tip */}
      <rect x="74" y="96" width="2" height="4" fill="#94a3b8" />

      {/* ── Main Fuselage & LERX Chines ── */}
      <path
        d="M 50,6 
           L 46,24 
           L 41,40 
           L 39,68 
           L 43,99 
           L 50,101 
           L 57,99 
           L 61,68 
           L 59,40 
           L 54,24 
           Z"
        fill={`url(#hullGrad-${side})`}
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* ── Stealth Engine Air Intake Ramps ── */}
      {/* Left intake scoop */}
      <polygon points="40,50 37,70 41,71 42,52" fill="#020617" stroke="#334155" strokeWidth="0.6" />
      {/* Right intake scoop */}
      <polygon points="60,50 63,70 59,71 58,52" fill="#020617" stroke="#334155" strokeWidth="0.6" />

      {/* ── Fuselage Centre Spine & Panel Details ── */}
      <line x1="50" y1="7" x2="50" y2="24" stroke="#64748b" strokeWidth="0.8" />
      <line x1="50" y1="58" x2="50" y2="98" stroke="#475569" strokeWidth="0.9" />

      {/* Avionics maintenance hatch & refuel receptacle */}
      <rect x="47.5" y="47" width="5" height="3" rx="0.5" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
      <circle cx="50" cy="48.5" r="0.8" fill="#facc15" />

      {/* ── Electroluminescent Formation / Slime Lights (High-Tech Avionics Strip) ── */}
      <rect x="42" y="78" width="1.5" height="12" rx="0.5" fill={themeColor} opacity="0.8" />
      <rect x="56.5" y="78" width="1.5" height="12" rx="0.5" fill={themeColor} opacity="0.8" />
      <rect x="22" y="79" width="6" height="1.2" rx="0.4" fill={themeColor} opacity="0.75" />
      <rect x="72" y="79" width="6" height="1.2" rx="0.4" fill={themeColor} opacity="0.75" />

      {/* ── Cockpit Glass Canopy (Polarized multi-layer bubble canopy) ── */}
      <path
        d="M 50,21 
           Q 46.5,25 46.5,33 
           L 46,41 
           Q 50,44 54,41 
           L 53.5,33 
           Q 53.5,25 50,21 
           Z"
        fill={`url(#canopyGrad-${side})`}
        stroke="#000"
        strokeWidth="1.1"
      />

      {/* Pilot Helmet & Ejection Seat Silhouette inside canopy */}
      <circle cx="50" cy="33.5" r="2.2" fill="#020617" opacity="0.8" />
      {/* Pilot helmet gold visor */}
      <ellipse cx="50" cy="32.8" rx="1.4" ry="0.8" fill="#f59e0b" opacity="0.9" />
      {/* Heads-Up Display (HUD) holographic glass bracket */}
      <rect x="48.5" y="26" width="3" height="2.2" rx="0.3" fill="none" stroke="#22c55e" strokeWidth="0.6" opacity="0.85" />
      <line x1="49.2" y1="27" x2="50.8" y2="27" stroke="#22c55e" strokeWidth="0.5" opacity="0.9" />

      {/* Realistic Glare Highlight Streak across Canopy */}
      <path
        d="M 47.8,25 Q 49.5,23 51,25 L 49.5,38 L 48,37 Z"
        fill="#ffffff"
        opacity="0.55"
      />

      {/* ── Radome Nose Cone & Pitot Probe ── */}
      <polygon points="50,6 47,20 53,20" fill="#475569" stroke="#000" strokeWidth="0.8" />
      {/* Supersonic Pitot Tube Needle */}
      <line x1="50" y1="0" x2="50" y2="6" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="50" cy="1" r="0.6" fill="#f8fafc" />

      {/* ── Anti-Collision Navigation Strobes ── */}
      {/* Left Wingtip Navigation Light (Port) */}
      <circle
        cx="7" cy="89" r="2.2"
        fill={portNavColor}
        style={{ animation: "jetNavStrobe 1.2s ease-in-out infinite" }}
      />
      {/* Right Wingtip Navigation Light (Starboard) */}
      <circle
        cx="93" cy="89" r="2.2"
        fill={stbdNavColor}
        style={{ animation: "jetNavStrobe 1.2s ease-in-out 0.6s infinite" }}
      />

      {/* ── Internal Kinetic Cannon / Laser Ports ── */}
      {/* Left Cannon Port Muzzle */}
      <circle cx="43.5" cy="42" r="1.4" fill="#000" stroke="#64748b" strokeWidth="0.6" />
      {/* Right Cannon Port Muzzle */}
      <circle cx="56.5" cy="42" r="1.4" fill="#000" stroke="#64748b" strokeWidth="0.6" />
    </svg>
  );
}

/* ─────────────────────── Supersonic Weapon System ──────────────────────── */
function KineticCannonRound({
  xPos,
  delayMs,
  color,
  glowColor,
}: {
  xPos: number;
  delayMs: number;
  color: string;
  glowColor: string;
}) {
  return (
    <div
      style={{
        position:     "absolute",
        top:          "28px",          /* aligned with internal gun port */
        left:         `${xPos}px`,
        width:        "4px",
        height:       "28px",
        borderRadius: "2px",
        background:   `linear-gradient(to top, transparent, ${color}, #ffffff)`,
        boxShadow:    `0 0 8px 3px ${glowColor}, 0 0 16px 5px ${glowColor}66`,
        animation:    `jetTracerFire 0.65s cubic-bezier(0.15, 0.85, 0.35, 1) ${delayMs}ms infinite`,
        willChange:   "transform, opacity",
      }}
    />
  );
}

/* Muzzle flash burst at cannon barrel */
function MuzzleFlashFlare({
  xPos,
  delayMs,
  color,
}: {
  xPos: number;
  delayMs: number;
  color: string;
}) {
  return (
    <div
      style={{
        position:     "absolute",
        top:          "26px",
        left:         `${xPos - 4}px`,
        width:        "12px",
        height:       "12px",
        borderRadius: "50%",
        background:   `radial-gradient(circle, #ffffff 15%, ${color} 70%, transparent 100%)`,
        boxShadow:    `0 0 10px 4px ${color}`,
        animation:    `jetMuzzleFlash 0.65s ease-out ${delayMs}ms infinite`,
        pointerEvents:"none",
      }}
    />
  );
}

/* ─────────────────────── Jet Patrol Unit ───────────────────────────────── */
function JetPatrolUnit({
  side,
  patrolAnim,
  animDelay,
  themeColor,
  accentColor,
}: {
  side:        "left" | "right";
  patrolAnim:  string;
  animDelay:   string;
  themeColor:  string;
  accentColor: string;
}) {
  const isRight = side === "right";

  /* Cannon muzzle coordinates relative to the 78px-wide jet */
  // Left gun: 43.5% of 78px ≈ 34px
  // Right gun: 56.5% of 78px ≈ 44px
  const leftGunX  = 33;
  const rightGunX = 43;

  return (
    <div
      style={{
        position: "absolute",
        [isRight ? "right" : "left"]: "12px",
        top: 0,
        bottom: 0,
        width: "82px",
      }}
    >
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          width:      "82px",
          animation:  `${patrolAnim} 13s ease-in-out ${animDelay} infinite`,
          willChange: "transform",
        }}
      >
        {/* Supersonic Atmospheric Ionization Field / Afterburner Halo */}
        <div
          style={{
            position:      "absolute",
            top:           "35px",
            left:          "-15px",
            width:         "112px",
            height:        "85px",
            borderRadius:  "50%",
            background:    `radial-gradient(ellipse at 50% 65%, ${themeColor}1a 0%, ${accentColor}0a 45%, transparent 70%)`,
            filter:        "blur(10px)",
            pointerEvents: "none",
          }}
        />

        {/* Supersonic Tracer Pulses — staggered alternating dual cannon fire */}
        <KineticCannonRound xPos={leftGunX}  delayMs={0}   color={themeColor} glowColor={themeColor} />
        <MuzzleFlashFlare   xPos={leftGunX}  delayMs={0}   color={themeColor} />

        <KineticCannonRound xPos={rightGunX} delayMs={160} color={themeColor} glowColor={themeColor} />
        <MuzzleFlashFlare   xPos={rightGunX} delayMs={160} color={themeColor} />

        <KineticCannonRound xPos={leftGunX}  delayMs={320} color={themeColor} glowColor={themeColor} />
        <MuzzleFlashFlare   xPos={leftGunX}  delayMs={320} color={themeColor} />

        <KineticCannonRound xPos={rightGunX} delayMs={480} color={themeColor} glowColor={themeColor} />
        <MuzzleFlashFlare   xPos={rightGunX} delayMs={480} color={themeColor} />

        {/* Realistic Fighter Jet Model */}
        <div
          style={{
            position:  "relative",
            zIndex:    2,
            filter:    "drop-shadow(0 8px 12px rgba(0,0,0,0.35))",
          }}
        >
          <RealisticFighterJet
            themeColor={themeColor}
            accentColor={accentColor}
            side={side}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Export ───────────────────────────────────── */
export function ArcadeShooters() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="arcade-shooters-overlay"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        6,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    >
      {/* Only display on desktop viewports (1024px+) to keep mobile content completely clean */}
      <div className="hidden lg:block" style={{ position: "relative", width: "100%", height: "100%" }}>

        {/* LEFT FIGHTER — Cyan plasma weaponry & high-tech avionics, begins at ~18vh */}
        <JetPatrolUnit
          side="left"
          patrolAnim="leftShipPatrol"
          animDelay="0s"
          themeColor="#06b6d4"
          accentColor="#38bdf8"
        />

        {/* RIGHT FIGHTER — Magenta/Pink plasma weaponry & high-tech avionics, offset patrol cycle */}
        <JetPatrolUnit
          side="right"
          patrolAnim="rightShipPatrol"
          animDelay="3.2s"
          themeColor="#ec4899"
          accentColor="#f43f5e"
        />

      </div>
    </div>
  );
}
