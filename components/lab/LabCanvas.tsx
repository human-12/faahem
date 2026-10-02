'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { StationData, StationId, STATIONS } from './LabTypes';
import { drawStationVector } from './LabStationIcons';
import { labAudio } from './LabAudio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface LabCanvasProps {
  onStationTrigger: (stationId: StationId) => void;
  discoveredStations: StationId[];
  onPlayerUpdate: (pos: { x: number; y: number }, energyDelta: number) => void;
  virtualMove: { dx: number; dy: number };
  onInteractStateChange: (canInteract: boolean, stationTitle?: string) => void;
  isPaused: boolean;
}

export function LabCanvas({
  onStationTrigger,
  discoveredStations,
  onPlayerUpdate,
  virtualMove,
  onInteractStateChange,
  isPaused,
}: LabCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // World bounds
  const WORLD_WIDTH = 1800;
  const WORLD_HEIGHT = 1400;

  // Drone State
  const playerRef = useRef({
    x: 900,
    y: 500,
    vx: 0,
    vy: 0,
    angle: 0,
    targetAngle: 0,
    speed: 3.8,
    accel: 0.45,
    friction: 0.86,
    radius: 18,
  });

  // Camera State
  const cameraRef = useRef({ x: 900, y: 500 });

  // Key states
  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Active station in proximity
  const activeStationRef = useRef<StationData | null>(null);

  // Particles
  const particlesRef = useRef<Particle[]>([]);

  // Telemetry callback throttler
  const lastUpdateRef = useRef(0);

  // Interaction check
  const checkInteraction = useCallback(() => {
    if (activeStationRef.current) {
      labAudio.playInteract();
      onStationTrigger(activeStationRef.current.id);
    }
  }, [onStationTrigger]);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;

      if (e.key.toLowerCase() === 'e') {
        checkInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [checkInteraction]);

  // Click on canvas to interact
  const handleCanvasClick = () => {
    if (activeStationRef.current) {
      checkInteraction();
    }
  };

  // Main game rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize floating ambient dust motes matching warm luxury palette
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push({
        x: Math.random() * WORLD_WIDTH,
        y: Math.random() * WORLD_HEIGHT,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.35 + 0.1,
        decay: 0,
        color: '#E1E0CC',
      });
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      lastTime = currentTime;

      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;

      if (!isPaused) {
        const player = playerRef.current;

        // 1. Process Input Movement
        let moveX = 0;
        let moveY = 0;

        if (keysRef.current['w'] || keysRef.current['arrowup']) moveY -= 1;
        if (keysRef.current['s'] || keysRef.current['arrowdown']) moveY += 1;
        if (keysRef.current['a'] || keysRef.current['arrowleft']) moveX -= 1;
        if (keysRef.current['d'] || keysRef.current['arrowright']) moveX += 1;

        if (virtualMove.dx !== 0 || virtualMove.dy !== 0) {
          moveX = virtualMove.dx;
          moveY = virtualMove.dy;
        }

        const isMoving = moveX !== 0 || moveY !== 0;

        if (isMoving) {
          const len = Math.hypot(moveX, moveY);
          const nx = moveX / len;
          const ny = moveY / len;

          player.vx += nx * player.accel;
          player.vy += ny * player.accel;
          player.targetAngle = Math.atan2(ny, nx);

          // Subtle warm propellant sparks
          if (Math.random() > 0.45) {
            particlesRef.current.push({
              x: player.x - Math.cos(player.angle) * 16 + (Math.random() - 0.5) * 5,
              y: player.y - Math.sin(player.angle) * 16 + (Math.random() - 0.5) * 5,
              vx: -Math.cos(player.angle) * 1.4 + (Math.random() - 0.5) * 0.4,
              vy: -Math.sin(player.angle) * 1.4 + (Math.random() - 0.5) * 0.4,
              size: Math.random() * 2.5 + 1,
              alpha: 0.7,
              decay: 0.035,
              color: '#E1E0CC',
            });
          }
        }

        // Apply friction
        player.vx *= player.friction;
        player.vy *= player.friction;

        const currentSpeed = Math.hypot(player.vx, player.vy);
        if (currentSpeed > player.speed) {
          player.vx = (player.vx / currentSpeed) * player.speed;
          player.vy = (player.vy / currentSpeed) * player.speed;
        }

        player.x += player.vx;
        player.y += player.vy;

        // Smooth angle rotation
        let angleDiff = player.targetAngle - player.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        player.angle += angleDiff * 0.15;

        // Clamp inside World Bounds
        player.x = Math.max(60, Math.min(WORLD_WIDTH - 60, player.x));
        player.y = Math.max(60, Math.min(WORLD_HEIGHT - 60, player.y));

        // Camera tracking player
        cameraRef.current.x += (player.x - cameraRef.current.x) * 0.08;
        cameraRef.current.y += (player.y - cameraRef.current.y) * 0.08;

        // Station proximity check
        let foundStation: StationData | null = null;
        for (const station of STATIONS) {
          const dist = Math.hypot(player.x - station.x, player.y - station.y);
          if (dist < station.radius + 35) {
            foundStation = station;
            break;
          }
        }

        if (foundStation !== activeStationRef.current) {
          activeStationRef.current = foundStation;
          onInteractStateChange(!!foundStation, foundStation?.title);
          if (foundStation) {
            labAudio.playBlip(1200);
          }
        }

        // Telemetry updates to parent
        if (currentTime - lastUpdateRef.current > 100) {
          const energyDrain = isMoving ? 0.02 : -0.01;
          onPlayerUpdate({ x: player.x, y: player.y }, energyDrain);
          lastUpdateRef.current = currentTime;
        }
      }

      // ==========================================
      // RENDERING SECTION
      // ==========================================

      const camX = cameraRef.current.x - viewWidth / 2;
      const camY = cameraRef.current.y - viewHeight / 2;

      ctx.save();
      ctx.clearRect(0, 0, viewWidth, viewHeight);

      // Deep obsidian void canvas background
      ctx.fillStyle = '#060606';
      ctx.fillRect(0, 0, viewWidth, viewHeight);

      // Translate view to camera coordinates
      ctx.translate(-camX, -camY);

      // 1. Draw Architectural Floor Tile Grid
      const gridSize = 60;
      ctx.strokeStyle = '#141412';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= WORLD_WIDTH; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WORLD_HEIGHT);
      }
      for (let y = 0; y <= WORLD_HEIGHT; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(WORLD_WIDTH, y);
      }
      ctx.stroke();

      // Outer boundary wall
      ctx.strokeStyle = '#232320';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, WORLD_WIDTH - 60, WORLD_HEIGHT - 60);

      // 2. Draw Holographic Power Conduits Connecting Stations
      ctx.strokeStyle = 'rgba(225, 224, 204, 0.18)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(900, 1100);
      ctx.lineTo(900, 720);
      ctx.lineTo(380, 420);
      ctx.moveTo(900, 720);
      ctx.lineTo(900, 280);
      ctx.moveTo(900, 720);
      ctx.lineTo(1420, 420);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw Stations with SVG Vector Glyphs
      for (const station of STATIONS) {
        const isDiscovered = discoveredStations.includes(station.id);
        const isActive = activeStationRef.current?.id === station.id;

        // Ground ambient glow halo
        const haloGrad = ctx.createRadialGradient(
          station.x,
          station.y,
          10,
          station.x,
          station.y,
          station.radius + 35
        );
        haloGrad.addColorStop(
          0,
          isActive
            ? 'rgba(225, 224, 204, 0.28)'
            : isDiscovered
            ? 'rgba(52, 211, 153, 0.18)'
            : 'rgba(225, 224, 204, 0.08)'
        );
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(station.x, station.y, station.radius + 35, 0, Math.PI * 2);
        ctx.fill();

        // Platform base
        ctx.fillStyle = '#0a0a09';
        ctx.strokeStyle = isActive ? '#E1E0CC' : isDiscovered ? '#34D399' : '#232320';
        ctx.lineWidth = isActive ? 2 : 1.2;
        ctx.beginPath();
        ctx.arc(station.x, station.y, station.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner rim highlight
        ctx.strokeStyle = isActive
          ? 'rgba(225, 224, 204, 0.6)'
          : isDiscovered
          ? 'rgba(52, 211, 153, 0.5)'
          : 'rgba(225, 224, 204, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(
          station.x,
          station.y,
          station.radius * 0.65 + Math.sin(currentTime * 0.003 + station.x) * 2,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        // Render Precision SVG Vector Glyph
        const glyphColor = isActive ? '#FFFFFF' : isDiscovered ? '#34D399' : '#E1E0CC';
        drawStationVector(ctx, station.id, station.x, station.y, glyphColor, isActive);

        // Station Floating Monospace Label
        ctx.font = '11px var(--font-mono), monospace';
        ctx.fillStyle = isActive ? '#FFFFFF' : isDiscovered ? '#34D399' : '#D2D1C0';
        ctx.textAlign = 'center';
        ctx.fillText(station.title, station.x, station.y - station.radius - 14);

        ctx.font = '9px var(--font-mono), monospace';
        ctx.fillStyle = '#737268';
        ctx.fillText(
          isDiscovered ? 'LOGGED [✓]' : 'PENDING INSPECTION',
          station.x,
          station.y + station.radius + 16
        );

        // Interactive pulse indicator when player is near
        if (isActive) {
          ctx.strokeStyle = '#E1E0CC';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          const pulseR = station.radius + 14 + Math.sin(currentTime * 0.008) * 6;
          ctx.arc(station.x, station.y, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Update and Draw Ambient Dust Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.decay > 0) {
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        } else {
          if (p.x < 0) p.x = WORLD_WIDTH;
          if (p.x > WORLD_WIDTH) p.x = 0;
          if (p.y < 0) p.y = WORLD_HEIGHT;
          if (p.y > WORLD_HEIGHT) p.y = 0;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 5. Draw Precision Engineering Drone
      const player = playerRef.current;
      const hoverY = Math.sin(currentTime * 0.005) * 3;

      ctx.save();
      ctx.translate(player.x, player.y + hoverY);
      ctx.rotate(player.angle);

      // Drone forward light cone (Warm luxury luminescence)
      const coneGrad = ctx.createRadialGradient(0, 0, 10, 80, 0, 110);
      coneGrad.addColorStop(0, 'rgba(225, 224, 204, 0.22)');
      coneGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(120, -45);
      ctx.lineTo(120, 45);
      ctx.closePath();
      ctx.fill();

      // Drone aerodynamic chassis
      ctx.fillStyle = '#0c0c0b';
      ctx.strokeStyle = '#E1E0CC';
      ctx.lineWidth = 1.4;

      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-12, -12);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Wing thruster pods
      ctx.fillStyle = '#1c1c19';
      ctx.fillRect(-10, -15, 6, 4);
      ctx.fillRect(-10, 11, 6, 4);

      // Thruster warm glow
      ctx.fillStyle = 'rgba(225, 224, 204, 0.85)';
      ctx.beginPath();
      ctx.arc(-11, -13, 2.2, 0, Math.PI * 2);
      ctx.arc(-11, 13, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Central glowing sensor core
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#E1E0CC';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(2, 0, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [discoveredStations, isPaused, virtualMove, onInteractStateChange, onPlayerUpdate]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full block cursor-crosshair touch-none"
    />
  );
}
