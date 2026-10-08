"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { arcadeAudio } from "@/src/lib/arcadeAudio";
import { Trophy } from "lucide-react";

// ============================================================================
// SUPER MARIO WORLD 2.0 - 3 FULL RETRO PLATFORMER LEVELS
// 100% Lag-Free HTML5 Canvas 60FPS Physics Engine
// World 1-1: Grassland Plains | World 1-2: Underground Cavern | World 1-3: Cloud Citadel
// ============================================================================

interface MarioWorldLandscapeProps {
  onOpenRegister?: () => void;
}

// Entity & Level Types
type EntityType = "mario" | "goomba" | "coin" | "block_q" | "block_brick" | "block_hard" | "pipe" | "flagpole" | "mushroom";

interface Block {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: "q_coin" | "q_mushroom" | "brick" | "hard" | "empty";
  bumpY: number;
  hit: boolean;
}

interface Goomba {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  alive: boolean;
  squishedTime: number;
}

interface Coin {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  collected: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  opacity: number;
  vy: number;
}

interface MushroomItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

interface LevelConfig {
  id: number;
  worldName: string;
  subTitle: string;
  theme: "overworld" | "underground" | "sky";
  skyColor: string;
  horizonColor: string;
  groundColor: string;
  groundBrickColor: string;
  length: number;
  blocks: Block[];
  goombas: Goomba[];
  coins: Coin[];
  pipes: { x: number; y: number; w: number; h: number }[];
  flagpoleX: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// LEVEL BUILDER UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
function buildLevel1(): LevelConfig {
  const GROUND_Y = 360;
  const blocks: Block[] = [
    // Early intro question block
    { id: "b1", x: 260, y: GROUND_Y - 90, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    // Question & Brick pyramid
    { id: "b2", x: 420, y: GROUND_Y - 90, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "b3", x: 452, y: GROUND_Y - 90, w: 32, h: 32, type: "q_mushroom", bumpY: 0, hit: false },
    { id: "b4", x: 484, y: GROUND_Y - 90, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "b5", x: 516, y: GROUND_Y - 90, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "b6", x: 548, y: GROUND_Y - 90, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    // High floating arch
    { id: "b7", x: 484, y: GROUND_Y - 170, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    // Stepping stones
    { id: "b8", x: 800, y: GROUND_Y - 90, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "b9", x: 832, y: GROUND_Y - 90, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "b10", x: 864, y: GROUND_Y - 90, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    // Staircase leading to finish
    { id: "s1", x: 1200, y: GROUND_Y - 32, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "s2", x: 1232, y: GROUND_Y - 32, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "s3", x: 1232, y: GROUND_Y - 64, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "s4", x: 1264, y: GROUND_Y - 32, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "s5", x: 1264, y: GROUND_Y - 64, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "s6", x: 1264, y: GROUND_Y - 96, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
  ];

  const goombas: Goomba[] = [
    { id: 1, x: 380, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.1, alive: true, squishedTime: 0 },
    { id: 2, x: 740, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.2, alive: true, squishedTime: 0 },
    { id: 3, x: 1040, y: GROUND_Y - 30, w: 30, h: 30, vx: 1.1, alive: true, squishedTime: 0 },
  ];

  const coins: Coin[] = [
    { id: 1, x: 320, y: GROUND_Y - 45, w: 20, h: 24, collected: false },
    { id: 2, x: 350, y: GROUND_Y - 45, w: 20, h: 24, collected: false },
    { id: 3, x: 650, y: GROUND_Y - 120, w: 20, h: 24, collected: false },
    { id: 4, x: 690, y: GROUND_Y - 140, w: 20, h: 24, collected: false },
    { id: 5, x: 730, y: GROUND_Y - 120, w: 20, h: 24, collected: false },
    { id: 6, x: 1080, y: GROUND_Y - 45, w: 20, h: 24, collected: false },
    { id: 7, x: 1120, y: GROUND_Y - 45, w: 20, h: 24, collected: false },
  ];

  const pipes = [
    { x: 620, y: GROUND_Y - 60, w: 52, h: 60 },
    { x: 960, y: GROUND_Y - 84, w: 52, h: 84 },
  ];

  return {
    id: 1,
    worldName: "WORLD 1-1",
    subTitle: "EMERALD PLAINS",
    theme: "overworld",
    skyColor: "#5c94fc",
    horizonColor: "#22c55e",
    groundColor: "#16a34a",
    groundBrickColor: "#9a3412",
    length: 1650,
    blocks,
    goombas,
    coins,
    pipes,
    flagpoleX: 1480,
  };
}

function buildLevel2(): LevelConfig {
  const GROUND_Y = 360;
  const blocks: Block[] = [
    // Subterranean ceiling bridges & platforms
    { id: "u1", x: 220, y: GROUND_Y - 85, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "u2", x: 252, y: GROUND_Y - 85, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "u3", x: 284, y: GROUND_Y - 85, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    // Floating cave terrace
    { id: "u4", x: 440, y: GROUND_Y - 120, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u5", x: 472, y: GROUND_Y - 120, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u6", x: 504, y: GROUND_Y - 120, w: 32, h: 32, type: "q_mushroom", bumpY: 0, hit: false },
    { id: "u7", x: 536, y: GROUND_Y - 120, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u8", x: 568, y: GROUND_Y - 120, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    // High bounty row
    { id: "u9", x: 740, y: GROUND_Y - 160, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "u10", x: 772, y: GROUND_Y - 160, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "u11", x: 804, y: GROUND_Y - 160, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    // Cave exit stepped blocks
    { id: "u12", x: 1080, y: GROUND_Y - 32, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u13", x: 1112, y: GROUND_Y - 64, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u14", x: 1144, y: GROUND_Y - 96, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "u15", x: 1176, y: GROUND_Y - 128, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
  ];

  const goombas: Goomba[] = [
    { id: 101, x: 340, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.3, alive: true, squishedTime: 0 },
    { id: 102, x: 490, y: GROUND_Y - 150, w: 30, h: 30, vx: 0.9, alive: true, squishedTime: 0 },
    { id: 103, x: 720, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.3, alive: true, squishedTime: 0 },
    { id: 104, x: 980, y: GROUND_Y - 30, w: 30, h: 30, vx: 1.2, alive: true, squishedTime: 0 },
  ];

  const coins: Coin[] = [
    { id: 101, x: 252, y: GROUND_Y - 125, w: 20, h: 24, collected: false },
    { id: 102, x: 456, y: GROUND_Y - 160, w: 20, h: 24, collected: false },
    { id: 103, x: 550, y: GROUND_Y - 160, w: 20, h: 24, collected: false },
    { id: 104, x: 620, y: GROUND_Y - 50, w: 20, h: 24, collected: false },
    { id: 105, x: 660, y: GROUND_Y - 50, w: 20, h: 24, collected: false },
    { id: 106, x: 900, y: GROUND_Y - 60, w: 20, h: 24, collected: false },
  ];

  const pipes = [
    { x: 380, y: GROUND_Y - 70, w: 52, h: 70 },
    { x: 860, y: GROUND_Y - 95, w: 52, h: 95 },
  ];

  return {
    id: 2,
    worldName: "WORLD 1-2",
    subTitle: "UNDERGROUND CAVERN",
    theme: "underground",
    skyColor: "#090d16",
    horizonColor: "#1e1b4b",
    groundColor: "#0284c7",
    groundBrickColor: "#1e293b",
    length: 1650,
    blocks,
    goombas,
    coins,
    pipes,
    flagpoleX: 1460,
  };
}

function buildLevel3(): LevelConfig {
  const GROUND_Y = 360;
  const blocks: Block[] = [
    // High cloud mushroom kingdom floating platforms
    { id: "c1", x: 200, y: GROUND_Y - 100, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "c2", x: 232, y: GROUND_Y - 100, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "c3", x: 264, y: GROUND_Y - 100, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    // Cloud bridge
    { id: "c4", x: 420, y: GROUND_Y - 140, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "c5", x: 452, y: GROUND_Y - 140, w: 32, h: 32, type: "q_mushroom", bumpY: 0, hit: false },
    { id: "c6", x: 484, y: GROUND_Y - 140, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    // High sky leap
    { id: "c7", x: 640, y: GROUND_Y - 180, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "c8", x: 672, y: GROUND_Y - 180, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "c9", x: 704, y: GROUND_Y - 180, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    // Fortress approach
    { id: "c10", x: 880, y: GROUND_Y - 110, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    { id: "c11", x: 912, y: GROUND_Y - 110, w: 32, h: 32, type: "q_coin", bumpY: 0, hit: false },
    { id: "c12", x: 944, y: GROUND_Y - 110, w: 32, h: 32, type: "brick", bumpY: 0, hit: false },
    // Castle grand steps
    { id: "c13", x: 1120, y: GROUND_Y - 32, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "c14", x: 1152, y: GROUND_Y - 64, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "c15", x: 1184, y: GROUND_Y - 96, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "c16", x: 1216, y: GROUND_Y - 128, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
    { id: "c17", x: 1248, y: GROUND_Y - 128, w: 32, h: 32, type: "hard", bumpY: 0, hit: false },
  ];

  const goombas: Goomba[] = [
    { id: 201, x: 320, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.4, alive: true, squishedTime: 0 },
    { id: 202, x: 580, y: GROUND_Y - 30, w: 30, h: 30, vx: 1.3, alive: true, squishedTime: 0 },
    { id: 203, x: 820, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.5, alive: true, squishedTime: 0 },
    { id: 204, x: 1040, y: GROUND_Y - 30, w: 30, h: 30, vx: -1.3, alive: true, squishedTime: 0 },
  ];

  const coins: Coin[] = [
    { id: 201, x: 232, y: GROUND_Y - 140, w: 20, h: 24, collected: false },
    { id: 202, x: 436, y: GROUND_Y - 180, w: 20, h: 24, collected: false },
    { id: 203, x: 468, y: GROUND_Y - 180, w: 20, h: 24, collected: false },
    { id: 204, x: 672, y: GROUND_Y - 220, w: 20, h: 24, collected: false },
    { id: 205, x: 780, y: GROUND_Y - 60, w: 20, h: 24, collected: false },
    { id: 206, x: 810, y: GROUND_Y - 60, w: 20, h: 24, collected: false },
    { id: 207, x: 912, y: GROUND_Y - 150, w: 20, h: 24, collected: false },
  ];

  const pipes = [
    { x: 360, y: GROUND_Y - 65, w: 52, h: 65 },
    { x: 750, y: GROUND_Y - 80, w: 52, h: 80 },
    { x: 1010, y: GROUND_Y - 95, w: 52, h: 95 },
  ];

  return {
    id: 3,
    worldName: "WORLD 1-3",
    subTitle: "CLOUD CITADEL & CASTLE",
    theme: "sky",
    skyColor: "#f43f5e",
    horizonColor: "#fb923c",
    groundColor: "#eab308",
    groundBrickColor: "#7c2d12",
    length: 1750,
    blocks,
    goombas,
    coins,
    pipes,
    flagpoleX: 1520,
  };
}

export function MarioWorldLandscape({ onOpenRegister }: MarioWorldLandscapeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game High-level State
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [isSuper, setIsSuper] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [stageClear, setStageClear] = useState<boolean>(false);

  // Active Level Data Reference (Mutable for ultra 60fps performance)
  const levelRef = useRef<LevelConfig>(buildLevel1());

  // Mario Physics Engine State Ref
  const marioRef = useRef({
    x: 80,
    y: 320,
    w: 28,
    h: 36,
    vx: 0,
    vy: 0,
    isGrounded: false,
    facingLeft: false,
    invincibleTimer: 0,
    animFrame: 0,
    animTimer: 0,
    slidingDownFlag: false,
    flagSlideY: 0,
  });

  // Mushroom Item Ref
  const mushroomRef = useRef<MushroomItem>({
    x: 0,
    y: 0,
    vx: 1.2,
    vy: 0,
    active: false,
  });

  // Floating score particles
  const particlesRef = useRef<Particle[]>([]);

  // Input State
  const keysRef = useRef<{
    left: boolean;
    right: boolean;
    jump: boolean;
    down: boolean;
  }>({
    left: false,
    right: false,
    jump: false,
    down: false,
  });

  // Camera X
  const cameraXRef = useRef<number>(0);

  // Switch Levels Helper
  const loadLevel = useCallback((index: number) => {
    let newLevel: LevelConfig;
    if (index === 0) newLevel = buildLevel1();
    else if (index === 1) newLevel = buildLevel2();
    else newLevel = buildLevel3();

    levelRef.current = newLevel;
    setLevelIndex(index);
    setStageClear(false);
    setGameOver(false);

    // Reset Mario
    marioRef.current.x = 80;
    marioRef.current.y = 300;
    marioRef.current.vx = 0;
    marioRef.current.vy = 0;
    marioRef.current.slidingDownFlag = false;
    cameraXRef.current = 0;
    mushroomRef.current.active = false;
    particlesRef.current = [];
  }, []);

  // Restart current level
  const restartLevel = useCallback(() => {
    setLives(3);
    setGameWon(false);
    loadLevel(levelIndex);
  }, [levelIndex, loadLevel]);

  // Keyboard Event Listeners with page-scroll protection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        keysRef.current.left = true;
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        keysRef.current.right = true;
      }
      if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
        if (!keysRef.current.jump && marioRef.current.isGrounded) {
          arcadeAudio.playJump();
        }
        keysRef.current.jump = true;
        // Prevent window from scrolling down on spacebar / up arrow
        if (e.code === "Space" || e.code === "ArrowUp") {
          e.preventDefault();
        }
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        keysRef.current.down = true;
      }
      if (e.code === "KeyP") {
        setIsPaused((p) => !p);
      }
      if (e.code === "KeyM") {
        arcadeAudio.toggleMute();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowLeft", "KeyA"].includes(e.code)) {
        keysRef.current.left = false;
      }
      if (["ArrowRight", "KeyD"].includes(e.code)) {
        keysRef.current.right = false;
      }
      if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
        keysRef.current.jump = false;
      }
      if (["ArrowDown", "KeyS"].includes(e.code)) {
        keysRef.current.down = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // 60 FPS MAIN GAME PHYSICS & RENDERING LOOP
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const V_WIDTH = 840;
    const V_HEIGHT = 400;
    const GROUND_Y = 360;
    const GRAVITY = 0.55;

    const gameLoop = () => {
      if (!isPaused && !gameOver && !gameWon) {
        const mario = marioRef.current;
        const level = levelRef.current;
        const keys = keysRef.current;

        // 1. Invincibility tick
        if (mario.invincibleTimer > 0) {
          mario.invincibleTimer--;
        }

        // 2. Mario Flagpole Victory Sequence
        if (mario.slidingDownFlag) {
          if (mario.y < GROUND_Y - mario.h) {
            mario.y += 2.5;
          } else {
            // Reached ground, walk towards castle
            mario.vx = 2.0;
            mario.x += mario.vx;
            if (mario.x >= level.flagpoleX + 110) {
              // Level Clear!
              if (levelIndex < 2) {
                setStageClear(true);
                setTimeout(() => {
                  loadLevel(levelIndex + 1);
                }, 1600);
              } else {
                setGameWon(true);
              }
            }
          }
        } else {
          // Normal Platformer Movement Physics
          const ACCEL = 0.5;
          const FRICTION = 0.82;
          const MAX_SPEED = 4.2;
          const JUMP_POWER = -11.8;

          // Horizontal Input
          if (keys.left) {
            mario.vx -= ACCEL;
            mario.facingLeft = true;
          } else if (keys.right) {
            mario.vx += ACCEL;
            mario.facingLeft = false;
          } else {
            mario.vx *= FRICTION;
            if (Math.abs(mario.vx) < 0.1) mario.vx = 0;
          }

          // Cap speed
          mario.vx = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, mario.vx));
          mario.x += mario.vx;

          // Prevent left boundary escape
          if (mario.x < 10) mario.x = 10;

          // Gravity & Jump
          mario.vy += GRAVITY;
          if (mario.vy > 12) mario.vy = 12;

          if (keys.jump && mario.isGrounded) {
            mario.vy = JUMP_POWER;
            mario.isGrounded = false;
          }

          mario.y += mario.vy;

          // Ground collision
          if (mario.y >= GROUND_Y - mario.h) {
            mario.y = GROUND_Y - mario.h;
            mario.vy = 0;
            mario.isGrounded = true;
          } else {
            mario.isGrounded = false;
          }

          // Pipe Collisions (Left, Right, and Top surfaces)
          for (const pipe of level.pipes) {
            if (
              mario.x + mario.w > pipe.x &&
              mario.x < pipe.x + pipe.w &&
              mario.y + mario.h > pipe.y &&
              mario.y < pipe.y + pipe.h
            ) {
              // Standing on top of pipe
              if (mario.vy > 0 && mario.y + mario.h - mario.vy <= pipe.y + 8) {
                mario.y = pipe.y - mario.h;
                mario.vy = 0;
                mario.isGrounded = true;
              } else {
                // Sideways collision
                if (mario.vx > 0) mario.x = pipe.x - mario.w;
                else if (mario.vx < 0) mario.x = pipe.x + pipe.w;
              }
            }
          }

          // Block Collisions (Hitting from bottom, standing on top, bumping)
          for (const block of level.blocks) {
            // Block bump animation return
            if (block.bumpY < 0) {
              block.bumpY += 1.5;
              if (block.bumpY > 0) block.bumpY = 0;
            }

            if (
              mario.x + mario.w > block.x &&
              mario.x < block.x + block.w &&
              mario.y + mario.h > block.y + block.bumpY &&
              mario.y < block.y + block.h + block.bumpY
            ) {
              // Hit block from below!
              if (mario.vy < 0 && mario.y >= block.y + block.h - 12) {
                mario.y = block.y + block.h;
                mario.vy = 1.2;
                block.bumpY = -8;

                if (!block.hit) {
                  if (block.type === "q_coin") {
                    arcadeAudio.playCoin();
                    block.hit = true;
                    setScore((s) => s + 100);
                    setCoinsCount((c) => c + 1);
                    particlesRef.current.push({
                      id: Math.random(),
                      x: block.x + 8,
                      y: block.y - 12,
                      text: "🪙 +100",
                      color: "#ffd000",
                      opacity: 1,
                      vy: -2.2,
                    });
                  } else if (block.type === "q_mushroom") {
                    arcadeAudio.playPowerUp();
                    block.hit = true;
                    mushroomRef.current = {
                      x: block.x + 6,
                      y: block.y - 24,
                      vx: 1.4,
                      vy: -2.0,
                      active: true,
                    };
                    particlesRef.current.push({
                      id: Math.random(),
                      x: block.x,
                      y: block.y - 18,
                      text: "POWER UP",
                      color: "#ef4444",
                      opacity: 1,
                      vy: -2,
                    });
                  } else if (block.type === "brick") {
                    arcadeAudio.playBump();
                    setScore((s) => s + 50);
                    particlesRef.current.push({
                      id: Math.random(),
                      x: block.x + 8,
                      y: block.y - 8,
                      text: "+50",
                      color: "#ffffff",
                      opacity: 1,
                      vy: -1.8,
                    });
                  }
                } else {
                  arcadeAudio.playBump();
                }
              }
              // Land on top of block
              else if (mario.vy > 0 && mario.y + mario.h - mario.vy <= block.y + 10) {
                mario.y = block.y - mario.h;
                mario.vy = 0;
                mario.isGrounded = true;
              }
              // Side collisions
              else {
                if (mario.vx > 0) mario.x = block.x - mario.w;
                else if (mario.vx < 0) mario.x = block.x + block.w;
              }
            }
          }

          // Coin pickups
          for (const coin of level.coins) {
            if (!coin.collected) {
              if (
                mario.x + mario.w > coin.x &&
                mario.x < coin.x + coin.w &&
                mario.y + mario.h > coin.y &&
                mario.y < coin.y + coin.h
              ) {
                coin.collected = true;
                arcadeAudio.playCoin();
                setScore((s) => s + 100);
                setCoinsCount((c) => c + 1);
                particlesRef.current.push({
                  id: Math.random(),
                  x: coin.x,
                  y: coin.y - 10,
                  text: "+100",
                  color: "#ffd000",
                  opacity: 1,
                  vy: -2.5,
                });
              }
            }
          }

          // Mushroom movement & Mario collision
          if (mushroomRef.current.active) {
            const mush = mushroomRef.current;
            mush.x += mush.vx;
            mush.vy += GRAVITY * 0.8;
            mush.y += mush.vy;
            if (mush.y >= GROUND_Y - 24) {
              mush.y = GROUND_Y - 24;
              mush.vy = 0;
            }
            // Check pickup
            if (
              mario.x + mario.w > mush.x &&
              mario.x < mush.x + 24 &&
              mario.y + mario.h > mush.y &&
              mario.y < mush.y + 24
            ) {
              mush.active = false;
              setIsSuper(true);
              mario.w = 32;
              mario.h = 44;
              mario.y -= 10;
              setScore((s) => s + 1000);
              arcadeAudio.playPowerUp();
              particlesRef.current.push({
                id: Math.random(),
                x: mario.x,
                y: mario.y - 20,
                text: "SUPER GUSTO! +1000",
                color: "#10b981",
                opacity: 1,
                vy: -3,
              });
            }
          }

          // Goomba Updates & Stomp Mechanics
          for (const g of level.goombas) {
            if (g.alive) {
              g.x += g.vx;

              // Reverse at edges or barriers
              if (g.x < 120 || g.x > level.length - 100) {
                g.vx *= -1;
              }
              // Reverse on pipes
              for (const pipe of level.pipes) {
                if (g.x + g.w > pipe.x && g.x < pipe.x + pipe.w) {
                  g.vx *= -1;
                  g.x += g.vx * 2;
                }
              }

              // Mario vs Goomba Collision
              if (
                mario.x + mario.w > g.x &&
                mario.x < g.x + g.w &&
                mario.y + mario.h > g.y &&
                mario.y < g.y + g.h
              ) {
                // Stomp Goomba from above!
                if (mario.vy > 0 && mario.y + mario.h - mario.vy <= g.y + 12) {
                  g.alive = false;
                  g.squishedTime = 25;
                  mario.vy = -7.5; // Mario bounce up
                  arcadeAudio.playStomp();
                  setScore((s) => s + 200);
                  particlesRef.current.push({
                    id: Math.random(),
                    x: g.x,
                    y: g.y - 12,
                    text: "+200 STOMP!",
                    color: "#f59e0b",
                    opacity: 1,
                    vy: -2.2,
                  });
                }
                // Mario takes damage
                else if (mario.invincibleTimer === 0) {
                  if (isSuper) {
                    setIsSuper(false);
                    mario.w = 28;
                    mario.h = 36;
                    mario.invincibleTimer = 90; // flicker
                    arcadeAudio.playBump();
                  } else {
                    arcadeAudio.playGameOver();
                    const newLives = lives - 1;
                    setLives(newLives);
                    if (newLives <= 0) {
                      setGameOver(true);
                    } else {
                      // Respawn
                      mario.x = Math.max(40, mario.x - 180);
                      mario.y = GROUND_Y - mario.h;
                      mario.vx = 0;
                      mario.vy = 0;
                      mario.invincibleTimer = 90;
                    }
                  }
                }
              }
            } else if (g.squishedTime > 0) {
              g.squishedTime--;
            }
          }

          // Flagpole finish collision
          if (mario.x + mario.w >= level.flagpoleX && !mario.slidingDownFlag) {
            mario.slidingDownFlag = true;
            mario.vx = 0;
            mario.vy = 0;
            arcadeAudio.playStageClear();
            setScore((s) => s + 2000);
            particlesRef.current.push({
              id: Math.random(),
              x: level.flagpoleX - 40,
              y: 120,
              text: "COURSE CLEAR! +2000",
              color: "#ffd000",
              opacity: 1,
              vy: -2,
            });
          }

          // Animation frame tracking
          if (Math.abs(mario.vx) > 0.2) {
            mario.animTimer++;
            if (mario.animTimer > 5) {
              mario.animFrame = (mario.animFrame + 1) % 4;
              mario.animTimer = 0;
            }
          } else {
            mario.animFrame = 0;
          }
        }

        // Camera Smooth Follow
        const targetCamX = mario.x - V_WIDTH * 0.38;
        cameraXRef.current += (targetCamX - cameraXRef.current) * 0.12;
        cameraXRef.current = Math.max(0, Math.min(level.length - V_WIDTH, cameraXRef.current));
      }

      // ───────────────────────────────────────────────────────────────────────
      // 3. CANVAS 2D DRAW ROUTINE (Hardware Accelerated Crisp Pixel Rendering)
      // ───────────────────────────────────────────────────────────────────────
      ctx.imageSmoothingEnabled = false;
      const camX = Math.floor(cameraXRef.current);
      const level = levelRef.current;
      const mario = marioRef.current;

      // A. Sky Background
      ctx.fillStyle = level.skyColor;
      ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

      // B. Parallax Hills / Mountains
      if (level.theme === "overworld") {
        ctx.fillStyle = "#15803d";
        ctx.beginPath();
        for (let i = -100; i < level.length + 300; i += 340) {
          const hillX = i - camX * 0.35;
          ctx.arc(hillX + 170, GROUND_Y, 130, Math.PI, 0);
        }
        ctx.fill();

        // Fluffy Mario Clouds
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        for (let i = 50; i < level.length + 200; i += 280) {
          const cx = i - camX * 0.15;
          ctx.beginPath();
          ctx.arc(cx, 80, 24, 0, Math.PI * 2);
          ctx.arc(cx + 26, 70, 32, 0, Math.PI * 2);
          ctx.arc(cx + 56, 80, 22, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (level.theme === "underground") {
        // Stalactites & dark blue cavern backdrops
        ctx.fillStyle = "#1e1b4b";
        for (let i = 0; i < level.length; i += 90) {
          const sx = i - camX * 0.4;
          ctx.beginPath();
          ctx.moveTo(sx, 0);
          ctx.lineTo(sx + 35, 75);
          ctx.lineTo(sx + 70, 0);
          ctx.fill();
        }
      } else if (level.theme === "sky") {
        // Sunset gradient cloud platforms
        ctx.fillStyle = "rgba(254, 205, 211, 0.5)";
        for (let i = 40; i < level.length; i += 220) {
          const cx = i - camX * 0.2;
          ctx.beginPath();
          ctx.arc(cx, 100, 30, 0, Math.PI * 2);
          ctx.arc(cx + 40, 85, 42, 0, Math.PI * 2);
          ctx.arc(cx + 80, 100, 30, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // C. Draw Warp Pipes
      for (const pipe of level.pipes) {
        const px = pipe.x - camX;
        if (px + pipe.w < -20 || px > V_WIDTH + 20) continue;

        // Pipe rim
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(px, pipe.y, pipe.w, 20);
        ctx.fillStyle = "#86efac";
        ctx.fillRect(px + 4, pipe.y, 6, 20);
        ctx.fillStyle = "#15803d";
        ctx.fillRect(px + pipe.w - 10, pipe.y, 8, 20);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2.5;
        ctx.strokeRect(px, pipe.y, pipe.w, 20);

        // Pipe body
        const bodyW = pipe.w - 8;
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(px + 4, pipe.y + 20, bodyW, pipe.h - 20);
        ctx.fillStyle = "#86efac";
        ctx.fillRect(px + 8, pipe.y + 20, 6, pipe.h - 20);
        ctx.fillStyle = "#15803d";
        ctx.fillRect(px + 4 + bodyW - 8, pipe.y + 20, 6, pipe.h - 20);
        ctx.strokeRect(px + 4, pipe.y + 20, bodyW, pipe.h - 20);
      }

      // D. Draw Blocks
      for (const block of level.blocks) {
        const bx = block.x - camX;
        const by = block.y + block.bumpY;
        if (bx + block.w < -20 || bx > V_WIDTH + 20) continue;

        if (block.type === "q_coin" || block.type === "q_mushroom") {
          if (!block.hit) {
            // Golden Animated ? Block
            ctx.fillStyle = "#ffd000";
            ctx.fillRect(bx, by, block.w, block.h);
            ctx.fillStyle = "#fffbeb";
            ctx.fillRect(bx, by, block.w, 3);
            ctx.fillRect(bx, by, 3, block.h);
            ctx.fillStyle = "#b45309";
            ctx.fillRect(bx, by + block.h - 3, block.w, 3);
            ctx.fillRect(bx + block.w - 3, by, 3, block.h);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, by, block.w, block.h);

            // Center ? symbol
            ctx.fillStyle = "#78350f";
            ctx.font = "bold 18px 'Press Start 2P', monospace, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("?", bx + block.w / 2, by + 23);
          } else {
            // Empty Hit Block
            ctx.fillStyle = "#78350f";
            ctx.fillRect(bx, by, block.w, block.h);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.strokeRect(bx, by, block.w, block.h);
            ctx.fillStyle = "#000000";
            ctx.fillRect(bx + 4, by + 4, 3, 3);
            ctx.fillRect(bx + block.w - 7, by + 4, 3, 3);
            ctx.fillRect(bx + 4, by + block.h - 7, 3, 3);
            ctx.fillRect(bx + block.w - 7, by + block.h - 7, 3, 3);
          }
        } else if (block.type === "brick") {
          // Authentic Terracotta Brick
          ctx.fillStyle = level.theme === "underground" ? "#1e3a8a" : "#b45309";
          ctx.fillRect(bx, by, block.w, block.h);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1.8;
          ctx.strokeRect(bx, by, block.w, block.h);
          // Brick mortar lines
          ctx.fillStyle = "#000000";
          ctx.fillRect(bx, by + 10, block.w, 2);
          ctx.fillRect(bx, by + 20, block.w, 2);
          ctx.fillRect(bx + 16, by, 2, 10);
          ctx.fillRect(bx + 8, by + 10, 2, 10);
          ctx.fillRect(bx + 24, by + 10, 2, 10);
        } else if (block.type === "hard") {
          // Hard stepping block
          ctx.fillStyle = "#94a3b8";
          ctx.fillRect(bx, by, block.w, block.h);
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, block.w, block.h);
        }
      }

      // E. Draw Coins
      for (const coin of level.coins) {
        if (!coin.collected) {
          const cx = coin.x - camX;
          if (cx + coin.w < -20 || cx > V_WIDTH + 20) continue;

          ctx.fillStyle = "#ffd000";
          ctx.beginPath();
          ctx.ellipse(cx + 10, coin.y + 12, 9, 12, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Inner reflection
          ctx.fillStyle = "#fffbeb";
          ctx.beginPath();
          ctx.ellipse(cx + 8, coin.y + 12, 4, 8, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // F. Draw Mushroom
      if (mushroomRef.current.active) {
        const mx = mushroomRef.current.x - camX;
        const my = mushroomRef.current.y;
        // Red cap
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(mx + 12, my + 10, 12, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // White dots
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(mx + 7, my + 7, 3, 0, Math.PI * 2);
        ctx.arc(mx + 17, my + 7, 3, 0, Math.PI * 2);
        ctx.fill();
        // Stem
        ctx.fillStyle = "#fed7aa";
        ctx.fillRect(mx + 6, my + 10, 12, 12);
        ctx.strokeRect(mx + 6, my + 10, 12, 12);
      }

      // G. Draw Goombas
      for (const g of level.goombas) {
        const gx = g.x - camX;
        if (gx + g.w < -20 || gx > V_WIDTH + 20) continue;

        if (g.alive) {
          // Mushroom body
          ctx.fillStyle = "#9a3412";
          ctx.beginPath();
          ctx.ellipse(gx + 15, g.y + 13, 15, 13, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Eyes
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(gx + 7, g.y + 7, 5, 8);
          ctx.fillRect(gx + 18, g.y + 7, 5, 8);
          ctx.fillStyle = "#000000";
          ctx.fillRect(gx + 9, g.y + 9, 3, 6);
          ctx.fillRect(gx + 18, g.y + 9, 3, 6);

          // Angry Brows
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(gx + 5, g.y + 6);
          ctx.lineTo(gx + 12, g.y + 10);
          ctx.moveTo(gx + 25, g.y + 6);
          ctx.lineTo(gx + 18, g.y + 10);
          ctx.stroke();

          // Waddling black shoes
          ctx.fillStyle = "#000000";
          ctx.fillRect(gx + 2, g.y + 24, 11, 6);
          ctx.fillRect(gx + 17, g.y + 24, 11, 6);
        } else if (g.squishedTime > 0) {
          // Squished Goomba pancake
          ctx.fillStyle = "#9a3412";
          ctx.fillRect(gx + 2, g.y + 20, 26, 10);
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(gx + 2, g.y + 20, 26, 10);
        }
      }

      // H. Draw Flagpole & Castle End Portal
      const flagX = level.flagpoleX - camX;
      // Mast
      ctx.fillStyle = "#cbd5e1";
      ctx.fillRect(flagX, 80, 6, GROUND_Y - 80);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(flagX, 80, 6, GROUND_Y - 80);

      // Gold finial ball
      ctx.fillStyle = "#ffd000";
      ctx.beginPath();
      ctx.arc(flagX + 3, 76, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Gusto 2.0 Pennant Banner
      const flagY = mario.slidingDownFlag ? Math.min(GROUND_Y - 50, 100 + (mario.y - 120)) : 95;
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.moveTo(flagX + 6, flagY);
      ctx.lineTo(flagX + 75, flagY + 16);
      ctx.lineTo(flagX + 6, flagY + 32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffd000";
      ctx.font = "bold 9px 'Press Start 2P', monospace";
      ctx.fillText("GUSTO", flagX + 16, flagY + 19);

      // Gusto 2.0 End Fortress Castle
      const castleX = level.flagpoleX + 70 - camX;
      ctx.fillStyle = "#7c2d12";
      ctx.fillRect(castleX, GROUND_Y - 120, 140, 120);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.strokeRect(castleX, GROUND_Y - 120, 140, 120);

      // Crenelations on roof
      for (let cr = 0; cr < 140; cr += 28) {
        ctx.fillRect(castleX + cr, GROUND_Y - 138, 18, 18);
        ctx.strokeRect(castleX + cr, GROUND_Y - 138, 18, 18);
      }

      // Castle Portal Door
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(castleX + 70, GROUND_Y - 55, 26, Math.PI, 0);
      ctx.rect(castleX + 44, GROUND_Y - 55, 52, 55);
      ctx.fill();

      ctx.fillStyle = "#ffd000";
      ctx.font = "bold 9px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GUSTO 2.0", castleX + 70, GROUND_Y - 95);

      // I. Draw Continuous Ground Platform
      ctx.fillStyle = level.groundColor;
      ctx.fillRect(0, GROUND_Y, V_WIDTH, 14);
      ctx.fillStyle = level.groundBrickColor;
      ctx.fillRect(0, GROUND_Y + 14, V_WIDTH, V_HEIGHT - (GROUND_Y + 14));

      // Ground brick texture lines
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(V_WIDTH, GROUND_Y);
      ctx.moveTo(0, GROUND_Y + 14);
      ctx.lineTo(V_WIDTH, GROUND_Y + 14);
      ctx.stroke();

      for (let gx = 0; gx < V_WIDTH + 40; gx += 32) {
        const offset = Math.floor(camX % 32);
        ctx.strokeRect(gx - offset, GROUND_Y + 14, 32, 20);
        ctx.strokeRect(gx - offset - 16, GROUND_Y + 34, 32, 20);
      }

      // J. Draw SUPER MARIO
      const mx = Math.floor(mario.x - camX);
      const my = Math.floor(mario.y);

      // Flicker during invincibility
      if (mario.invincibleTimer === 0 || Math.floor(mario.invincibleTimer / 4) % 2 === 0) {
        ctx.save();
        if (mario.facingLeft) {
          ctx.translate(mx + mario.w, my);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(mx, my);
        }

        // Mario Sprite Drawing
        // 1. Red Cap
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(6, 2, 18, 7);
        ctx.fillRect(18, 6, 8, 3); // cap brim
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.2;
        ctx.strokeRect(6, 2, 18, 7);

        // 2. Head & Nose
        ctx.fillStyle = "#fed7aa";
        ctx.fillRect(8, 9, 13, 8);
        ctx.fillRect(18, 10, 6, 5); // nose

        // 3. Eye
        ctx.fillStyle = "#000";
        ctx.fillRect(16, 9, 2.5, 4);

        // 4. Mustache
        ctx.fillStyle = "#111827";
        ctx.fillRect(14, 13, 11, 4);

        // 5. Hair
        ctx.fillStyle = "#451a03";
        ctx.fillRect(4, 9, 4, 7);

        // 6. Overalls (Blue) & Red Shirt
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(6, 17, 16, 12);
        ctx.strokeRect(6, 17, 16, 12);

        // Red Shirt Sleeves
        ctx.fillStyle = "#dc2626";
        ctx.fillRect(3, 18, 4, 6);
        ctx.fillRect(20, 18, 4, 6);

        // Yellow Overalls Buttons
        ctx.fillStyle = "#ffd000";
        ctx.fillRect(9, 20, 2.5, 2.5);
        ctx.fillRect(16, 20, 2.5, 2.5);

        // White Gloves
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(2, 23, 5, 5);
        ctx.fillRect(21, 23, 5, 5);

        // Boots (Brown)
        ctx.fillStyle = "#78350f";
        if (mario.isGrounded) {
          if (Math.abs(mario.vx) > 0.5) {
            // Running stride animation
            if (mario.animFrame % 2 === 0) {
              ctx.fillRect(4, 28, 8, 7);
              ctx.fillRect(18, 28, 8, 7);
            } else {
              ctx.fillRect(2, 27, 8, 7);
              ctx.fillRect(16, 29, 8, 7);
            }
          } else {
            // Standing boots
            ctx.fillRect(4, 29, 8, 7);
            ctx.fillRect(16, 29, 8, 7);
          }
        } else {
          // Jumping tucked boots
          ctx.fillRect(3, 27, 8, 6);
          ctx.fillRect(17, 25, 8, 6);
        }

        ctx.restore();
      }

      // K. Floating Score Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.y += p.vy;
        p.opacity -= 0.02;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.font = "bold 11px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText(p.text, p.x - camX, p.y);
        ctx.globalAlpha = 1.0;

        if (p.opacity <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [levelIndex, isPaused, gameOver, gameWon, lives, isSuper, loadLevel]);

  return (
    <div className="w-full relative select-none mt-2 sm:mt-4 z-20 overflow-hidden">
      {/* ── MAIN CANVAS CONSOLE SHELL ── */}
      <div className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border-[3.5px] sm:border-[4.5px] border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] bg-black overflow-hidden relative group">
        {/* Top Retro Score HUD Overlay */}
        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-4 sm:right-4 z-40 flex items-center justify-between font-['Press_Start_2P',monospace] text-white text-[8px] xs:text-[9.5px] sm:text-xs select-none pointer-events-none drop-shadow-[2px_2px_0px_#000]">
          {/* Score */}
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[#ffd000]">SCORE</span>
            <span className="font-bold">{String(score).padStart(6, "0")}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1 leading-tight">
            <span className="text-sm">🪙</span>
            <span className="font-bold">×{String(coinsCount).padStart(2, "0")}</span>
          </div>

          {/* Level */}
          <div className="hidden xs:flex flex-col items-center leading-tight">
            <span className="text-[#ffd000]">WORLD</span>
            <span className="font-bold">{levelRef.current.worldName}</span>
          </div>

          {/* Lives */}
          <div className="flex items-center gap-1 leading-tight">
            <span className="text-[#ffd000]">LIVES</span>
            <span className="text-red-500 font-bold tracking-widest">
              {"❤️".repeat(Math.max(0, lives))}
            </span>
          </div>
        </div>

        {/* HTML5 Game Canvas */}
        <canvas
          ref={canvasRef}
          width={840}
          height={400}
          className="w-full h-[240px] xs:h-[280px] sm:h-[350px] md:h-[400px] object-cover block bg-black"
        />

        {/* ── STAGE CLEAR POPUP OVERLAY ── */}
        {stageClear && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-50 animate-in fade-in zoom-in duration-200">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#ffd000] border-4 border-black shadow-[6px_6px_0px_#000] text-center max-w-sm">
              <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#b45309] mx-auto mb-2 animate-bounce" />
              <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-sm font-black text-black uppercase mb-1">
                STAGE CLEAR!
              </h3>
              <p className="font-mono text-xs sm:text-sm font-bold text-black mb-3">
                Advancing to Next World...
              </p>
              <div className="w-full bg-black h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full animate-marquee w-1/2" />
              </div>
            </div>
          </div>
        )}

        {/* ── GAME OVER POPUP OVERLAY ── */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#ef4444] border-4 border-black shadow-[6px_6px_0px_#000] text-center max-w-sm text-white">
              <h3 className="font-['Press_Start_2P',monospace] text-sm sm:text-base font-black uppercase mb-2">
                GAME OVER
              </h3>
              <p className="font-mono text-xs sm:text-sm font-bold mb-4 opacity-90">
                Score: {score} • Coins: {coinsCount}
              </p>
              <button
                onClick={restartLevel}
                className="px-4 py-2 rounded-xl bg-white text-black font-['Press_Start_2P',monospace] text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-yellow-300 active:translate-y-0.5 cursor-pointer"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}

        {/* ── GAME WON ALL 3 LEVELS POPUP OVERLAY ── */}
        {gameWon && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#ffd000] via-[#facc15] to-[#f59e0b] border-4 border-black shadow-[8px_8px_0px_#000] text-center max-w-md text-black">
              <h3 className="font-['Press_Start_2P',monospace] text-xs sm:text-base font-black uppercase mb-2">
                GUSTO 2.0 CHAMPION!
              </h3>
              <p className="font-mono text-xs sm:text-sm font-black mb-4">
                You cleared all 3 Worlds! Ready for the real National Technical Symposium?
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2 rounded-xl bg-[#ec4899] text-white font-['Press_Start_2P',monospace] text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 active:translate-y-0.5 cursor-pointer"
                >
                  REGISTER NOW
                </button>
                <button
                  onClick={restartLevel}
                  className="px-4 py-2 rounded-xl bg-white text-black font-['Press_Start_2P',monospace] text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-zinc-100 active:translate-y-0.5 cursor-pointer"
                >
                  PLAY AGAIN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PAUSE OVERLAY ── */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-40">
            <div className="px-5 py-3 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] font-['Press_Start_2P',monospace] text-xs font-black text-black">
              PAUSED
            </div>
          </div>
        )}
      </div>

      {/* ── KEYBOARD CONTROLS TIP ── */}
      <div className="w-full max-w-5xl mx-auto mt-2.5 px-2 sm:px-4 flex items-center justify-center z-30">
        <div className="flex items-center gap-2 bg-white/90 border-2 border-black rounded-lg px-3 py-1 shadow-[2px_2px_0px_#000] text-[8.5px] sm:text-[9.5px] font-['Press_Start_2P',monospace] text-black">
          <span>CONTROLS:</span>
          <span className="bg-zinc-200 px-1 py-0.5 rounded border border-black/40">◀ ▶ / A D</span>
          <span>RUN</span>
          <span className="bg-zinc-200 px-1 py-0.5 rounded border border-black/40">SPACE / ▲</span>
          <span>JUMP</span>
        </div>
      </div>
    </div>
  );
}
