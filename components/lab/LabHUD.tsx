'use client';

import React from 'react';
import { Volume2, VolumeX, Pause, LogOut, Compass } from 'lucide-react';

interface LabHUDProps {
  energy: number;
  xp: number;
  objective: string;
  inventory: string[];
  isMuted: boolean;
  onToggleSound: () => void;
  onPause: () => void;
  onExit: () => void;
  playerPos: { x: number; y: number };
}

export function LabHUD({
  energy,
  xp,
  objective,
  inventory,
  isMuted,
  onToggleSound,
  onPause,
  onExit,
  playerPos,
}: LabHUDProps) {
  const energyBlocks = 10;
  const filledBlocks = Math.round((energy / 100) * energyBlocks);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 p-4 sm:p-6 flex flex-col justify-between select-none font-mono text-xs">
      
      {/* Top Bar */}
      <div className="flex items-start justify-between w-full">
        
        {/* Top-Left: Lab Title & Coordinates */}
        <div className="pointer-events-auto flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] shadow-xl">
          <div className="w-2 h-2 rounded-full bg-[#E1E0CC] animate-pulse" />
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] tracking-wider">
              FAAHEM LAB // 01
            </div>
            <div className="text-[10px] text-[#6b6a62] font-mono">
              SECTOR GRID · X {Math.round(playerPos.x)} · Y {Math.round(playerPos.y)}
            </div>
          </div>
        </div>

        {/* Top-Right: Energy + Audio + Pause + Exit */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          
          {/* Energy Bar */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] shadow-xl">
            <span className="text-[10px] text-[#8e8d80] uppercase tracking-wider font-mono">ENERGY</span>
            <div className="flex gap-0.5">
              {Array.from({ length: energyBlocks }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 rounded-xs transition-colors ${
                    i < filledBlocks ? 'bg-[#E1E0CC]' : 'bg-[#1c1c19]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#E1E0CC] font-bold">{Math.round(energy)}%</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] hover:border-[#E1E0CC]/40 text-[#D2D1C0] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
            title="Toggle Sound (M)"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#E1E0CC]" />
            )}
            <span className="hidden sm:inline text-[10px] font-mono">[M]</span>
          </button>

          {/* Pause Button */}
          <button
            onClick={onPause}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] hover:border-[#E1E0CC]/40 text-[#D2D1C0] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
            title="Pause Simulation (ESC)"
          >
            <Pause className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px] font-mono">[ESC]</span>
          </button>

          {/* Exit Lab */}
          <button
            onClick={onExit}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-[#141412]/90 backdrop-blur-md border border-[#2b2b27] hover:border-red-500/50 text-[#8e8d80] hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
            title="Exit to Portfolio"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] font-mono">EXIT</span>
          </button>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-end sm:items-end justify-between gap-3 w-full">
        
        {/* Bottom-Left: Objective Directive */}
        <div className="pointer-events-auto p-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#0c0c0b]/95 backdrop-blur-md border border-[#21211e] shadow-2xl max-w-sm sm:max-w-md">
          <div className="flex items-center gap-2 text-[10px] text-[#737268] tracking-widest uppercase mb-1 font-mono">
            <Compass className="w-3 h-3 text-[#E1E0CC]" />
            <span>PRIMARY OBJECTIVE</span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-[#F4F4F0] leading-snug">
            {objective}
          </div>
        </div>

        {/* Bottom-Right: XP & Inventory Bar */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          
          {/* XP Counter */}
          <div className="px-4 py-2 rounded-2xl bg-[#0c0c0b]/95 backdrop-blur-md border border-[#21211e] shadow-xl flex items-center gap-2">
            <span className="text-[10px] text-[#8e8d80] uppercase tracking-wider font-mono">XP</span>
            <span className="text-sm font-bold text-[#E1E0CC]">{String(xp).padStart(4, '0')}</span>
          </div>

          {/* Discovered Engineering Inventory */}
          <div className="flex flex-wrap justify-end gap-1.5 p-2 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] shadow-xl max-w-xs sm:max-w-md">
            {[
              { id: 'AI CORE', label: 'AI CORE' },
              { id: 'CAMERA MODULE', label: 'CAMERA' },
              { id: 'ESP32-S3', label: 'ESP32-S3' },
              { id: 'SENSOR', label: 'SENSOR' },
              { id: 'DIGITAL TWIN CORE', label: 'DIGITAL TWIN' },
            ].map((item) => {
              const collected = inventory.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all flex items-center gap-1.5 ${
                    collected
                      ? 'bg-[#171714] border border-[#E1E0CC]/50 text-[#E1E0CC] shadow-[0_0_10px_rgba(225,224,204,0.12)]'
                      : 'bg-[#0f0f0e] border border-[#1a1a17] text-[#55544d]'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${collected ? 'bg-[#E1E0CC]' : 'bg-[#3b3a32]'}`} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
