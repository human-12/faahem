'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, X, Sparkles, CheckCircle2, ExternalLink, Scan } from 'lucide-react';
import { labAudio } from './LabAudio';

interface VisionModalProps {
  onClose: () => void;
  onExplorePortfolio: () => void;
  isDiscovered: boolean;
  onClaimXP: () => void;
}

export function VisionModal({
  onClose,
  onExplorePortfolio,
  isDiscovered,
  onClaimXP,
}: VisionModalProps) {
  const [claimed, setClaimed] = useState(isDiscovered);
  const [scanActive, setScanActive] = useState(true);

  const handleClaim = () => {
    if (!claimed) {
      setClaimed(true);
      onClaimXP();
      labAudio.playXP();
    }
  };

  const handleToggleScan = () => {
    setScanActive(!scanActive);
    labAudio.playScan();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c0c0b] border border-[#262622] p-6 sm:p-8 shadow-2xl text-[#F4F4F0] overflow-hidden"
      >
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/40 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#1c1c19] mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141412] border border-[#2b2b27] flex items-center justify-center text-[#E1E0CC]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8e8d80] uppercase tracking-wider font-mono">STATION 02</span>
                <span className="text-[#3a3934]">·</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">OPTICAL FEED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] font-display">VISION SYSTEM</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2b2b27] flex items-center justify-center text-[#8e8d80] hover:text-[#FFFFFF] hover:border-[#E1E0CC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Simulated Camera Viewfinder */}
        <div className="relative p-5 rounded-2xl bg-[#080807] border border-[#21211e] mb-6 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[#171714] mb-4 text-xs text-[#E1E0CC]">
            <span className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              CAMERA FEED #OV2640 // PLANOGRAM ANALYSIS
            </span>
            <button
              onClick={handleToggleScan}
              className="text-xs font-mono text-[#D2D1C0] hover:text-[#FFFFFF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{scanActive ? 'Recalibrate' : 'Start Scan'}</span>
            </button>
          </div>

          {/* Optical Target Overlay */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
            
            {/* Target 1 */}
            <div className="p-3.5 rounded-xl bg-[#0f0f0e] border border-[#1e1e1b] relative">
              <div className="flex items-center justify-between text-[#8e8d80] mb-1 font-mono">
                <span>SKU: COCA-COLA 330ML</span>
                <span className="text-emerald-400 font-bold">CONF 98.4%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8e8d80]">Expected: 25 units</span>
                <span className="text-[#E1E0CC] font-bold">Detected: 18</span>
              </div>
              <div className="text-[11px] text-amber-400 font-bold mt-1 font-mono">
                STOCK GAP: -7 FACINGS
              </div>
            </div>

            {/* Target 2 */}
            <div className="p-3.5 rounded-xl bg-[#0f0f0e] border border-[#1e1e1b] relative">
              <div className="flex items-center justify-between text-[#8e8d80] mb-1 font-mono">
                <span>SKU: PEPSI 330ML</span>
                <span className="text-red-400 font-bold">OUT OF STOCK</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8e8d80]">Expected: 10 units</span>
                <span className="text-red-400 font-bold">Detected: 0</span>
              </div>
              <div className="text-[11px] text-red-400 font-bold mt-1 font-mono">
                CRITICAL GAP: -10 EMPTY
              </div>
            </div>

          </div>

          {/* Scanning Beam */}
          {scanActive && (
            <motion.div
              animate={{ y: [0, 80, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC] to-transparent w-full pointer-events-none"
            />
          )}

          {/* Pipeline flow */}
          <div className="pt-3 border-t border-[#171714] flex items-center justify-between text-[11px] text-[#8e8d80] font-mono">
            <span>PERCEPTION</span>
            <span className="text-[#44433c]">→</span>
            <span>DETECTION</span>
            <span className="text-[#44433c]">→</span>
            <span>ANALYSIS</span>
            <span className="text-[#44433c]">→</span>
            <span className="text-[#E1E0CC] font-bold">DECISION</span>
          </div>
        </div>

        {/* Prototype attribution */}
        <div className="flex items-center justify-between text-xs text-[#8e8d80] mb-6 px-1">
          <span className="italic font-sans">
            &ldquo;Computer Vision → Perception → Decision&rdquo;
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded border border-[#2b2b27] bg-[#141412] uppercase font-mono">
            PROTOTYPE / EXPLORATION
          </span>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#1c1c19] flex flex-col sm:flex-row items-center justify-between gap-3">
          {!claimed ? (
            <button
              onClick={handleClaim}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFFFF] transition-all shadow-[0_0_20px_rgba(225,224,204,0.3)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>COLLECT CAMERA MODULE (+150 XP)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>VISION LAB DISCOVERED (+150 XP)</span>
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onExplorePortfolio}
              className="px-4 py-2 rounded-full border border-[#2a2a26] text-xs text-[#E1E0CC] hover:bg-[#1a1a17] transition-all flex items-center gap-1.5"
            >
              <span>View Retail Shelf CV</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#161614] border border-[#2b2b27] text-xs text-[#8e8d80] hover:text-[#FFFFFF]"
            >
              Resume Lab
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
