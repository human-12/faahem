'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { labAudio } from './LabAudio';

interface TerminalModalProps {
  onClose: () => void;
  discoveredCount: number;
  totalStations: number;
  xp: number;
  onCompleteMission: () => void;
}

export function TerminalModal({
  onClose,
  discoveredCount,
  totalStations,
  xp,
  onCompleteMission,
}: TerminalModalProps) {
  const isFullyDiscovered = discoveredCount >= 4;

  const handleComplete = () => {
    labAudio.playCompletion();
    onCompleteMission();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c0c0b] border border-[#2b2b27] p-6 sm:p-8 shadow-2xl text-[#F4F4F0] overflow-hidden"
      >
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/50 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#1c1c19] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1c1c18] border border-[#383730] flex items-center justify-center text-[#E1E0CC]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8e8d80] uppercase tracking-wider">MAINFRAME TERMINAL</span>
                <span className="text-[#3a3934]">·</span>
                <span className="text-xs text-[#E1E0CC] font-bold">NODE 05</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#FFFFFF]">FAAHEM SYSTEM</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2b2b27] flex items-center justify-center text-[#8e8d80] hover:text-[#FFFFFF] hover:border-[#E1E0CC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Identity Verified Badge */}
        <div className="p-5 rounded-2xl bg-[#080807] border border-[#1e1e1b] mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#171714] mb-4">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              IDENTITY CONFIRMED
            </span>
            <span className="text-xs text-[#8e8d80]">FAST-NUCES // ISLAMABAD</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-[#6b6a62] uppercase tracking-widest block">ENGINEER</span>
              <div className="text-2xl font-bold text-[#E1E0CC] tracking-tight">FAAHEM TAYYEB</div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div>
                <span className="text-[#6b6a62] block">DISCIPLINE:</span>
                <span className="text-[#F4F4F0] font-medium">BS Computer Engineering</span>
              </div>
              <div>
                <span className="text-[#6b6a62] block">TIMELINE:</span>
                <span className="text-[#E1E0CC] font-bold">2026 → 2030 (Freshman)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Exploration Areas */}
        <div className="mb-6">
          <span className="text-[11px] text-[#737268] uppercase tracking-widest block mb-2">
            RESEARCH & ENGINEERING VECTORS
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {['AI', 'Computer Vision', 'Embedded Systems', 'Digital Twins', 'Robotics'].map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-lg bg-[#141412] border border-[#232320] text-[#D2D1C0]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Metric */}
        <div className="p-4 rounded-2xl bg-[#0f0f0d] border border-[#1d1d1a] mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span>SECTOR DISCOVERY STATUS:</span>
            <span className="text-[#E1E0CC] font-bold">
              {discoveredCount} / {totalStations - 1} STATIONS LOGGED
            </span>
          </div>
          <div className="w-full bg-[#1c1c19] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#E1E0CC] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (discoveredCount / 4) * 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6b6a62] mt-2">
            <span>TOTAL ACCUMULATED XP: {xp}</span>
            <span>{isFullyDiscovered ? 'OBJECTIVE READY' : 'EXPLORE REMAINING NODES'}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#1c1c19] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFFFF] transition-all shadow-[0_0_20px_rgba(225,224,204,0.3)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>MISSION COMPLETE — REVEAL SUMMARY</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#161614] border border-[#2b2b27] text-xs text-[#8e8d80] hover:text-[#FFFFFF]"
          >
            Return to Lab Floor
          </button>
        </div>

      </motion.div>
    </div>
  );
}
