'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, RotateCcw } from 'lucide-react';

interface LabCompletionProps {
  xp: number;
  onExitToPortfolio: (sectionId?: string) => void;
  onReplay: () => void;
}

export function LabCompletion({ xp, onExitToPortfolio, onReplay }: LabCompletionProps) {
  return (
    <div className="fixed inset-0 z-[130] bg-[#040404]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#040404]/70 to-[#040404]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="relative z-10 max-w-2xl w-full flex flex-col items-center"
      >
        {/* Terminal Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E1E0CC]/30 bg-[#121210] text-[#E1E0CC] text-xs uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span>FAAHEM LAB // 01 — SYSTEM ONLINE</span>
        </div>

        {/* Formula */}
        <div className="text-xs sm:text-sm text-[#8e8d80] tracking-widest font-mono uppercase mb-4 max-w-lg leading-relaxed">
          COMPUTER ENGINEERING <span className="text-[#E1E0CC]">×</span> AI <span className="text-[#E1E0CC]">×</span> COMPUTER VISION <span className="text-[#E1E0CC]">×</span> EMBEDDED SYSTEMS <span className="text-[#E1E0CC]">×</span> DIGITAL TWINS
        </div>

        {/* Big Reveal Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FFFFFF] mb-6 font-display">
          THIS IS ONLY THE BEGINNING.
        </h2>

        {/* Summary Metric Card */}
        <div className="w-full p-6 rounded-3xl bg-[#0c0c0b] border border-[#232320] mb-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-[10px] text-[#66655c] uppercase tracking-wider block">ENGINEER</span>
            <div className="text-base font-bold text-[#E1E0CC]">Faahem Tayyeb</div>
            <div className="text-[11px] text-[#8e8d80]">FAST-NUCES &apos;26-&apos;30</div>
          </div>
          <div>
            <span className="text-[10px] text-[#66655c] uppercase tracking-wider block">LAB PROGRESS</span>
            <div className="text-base font-bold text-emerald-400">100% Explored</div>
            <div className="text-[11px] text-[#8e8d80]">5/5 Sectors Logged</div>
          </div>
          <div>
            <span className="text-[10px] text-[#66655c] uppercase tracking-wider block">FINAL SCORE</span>
            <div className="text-base font-bold text-[#44E5FF]">{xp} XP Earned</div>
            <div className="text-[11px] text-[#8e8d80]">Inventory Assembled</div>
          </div>
        </div>

        {/* Navigation Action Buttons (As requested by the prompt) */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-6">
          <button
            onClick={() => onExitToPortfolio('work')}
            className="px-6 py-3 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs sm:text-sm hover:bg-[#FFFFFF] transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(225,224,204,0.3)] cursor-pointer"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onExitToPortfolio('about')}
            className="px-6 py-3 rounded-full border border-[#3b3a32] bg-[#121210] text-[#E1E0CC] hover:bg-[#1f1e1a] text-xs sm:text-sm font-medium transition-all"
          >
            ABOUT FAAHEM
          </button>

          <a
            href="https://github.com/human-12"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-[#3b3a32] bg-[#121210] text-[#D2D1C0] hover:text-[#FFFFFF] hover:border-[#666559] text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-[#E1E0CC]" />
            <span>GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <button
            onClick={() => onExitToPortfolio()}
            className="px-6 py-3 rounded-full border border-[#2b2b27] bg-[#0c0c0b] text-[#8e8d80] hover:text-[#F4F4F0] text-xs sm:text-sm transition-all"
          >
            EXPLORE FULL PORTFOLIO
          </button>
        </div>

        {/* Replay */}
        <button
          onClick={onReplay}
          className="flex items-center gap-1.5 text-xs text-[#6b6a62] hover:text-[#A6A596] transition-colors mt-2"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Re-enter Lab Simulator</span>
        </button>

      </motion.div>
    </div>
  );
}
