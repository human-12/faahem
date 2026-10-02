'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, LogOut, HelpCircle, X } from 'lucide-react';
import { labAudio } from './LabAudio';

interface LabPauseMenuProps {
  onResume: () => void;
  onExit: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export function LabPauseMenu({
  onResume,
  onExit,
  isMuted,
  onToggleSound,
}: LabPauseMenuProps) {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-sm rounded-3xl bg-[#0c0c0b] border border-[#262622] p-6 shadow-2xl text-center text-[#F4F4F0]"
      >
        <div className="flex items-center justify-center gap-2 mb-2 text-xs tracking-widest text-[#8e8d80] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span>FAAHEM LAB // 01</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-[#FFFFFF] mb-6">
          SIMULATION PAUSED
        </h3>

        <div className="space-y-3 mb-6">
          
          {/* Resume */}
          <button
            onClick={onResume}
            className="w-full py-3 px-4 rounded-2xl bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFFFF] transition-all cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>RESUME SIMULATION</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-full py-3 px-4 rounded-2xl bg-[#141412] border border-[#21211e] text-xs font-medium text-[#D2D1C0] hover:text-[#FFFFFF] hover:border-[#383730] transition-all flex items-center justify-center gap-2"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span>SOUND: OFF (ENABLE AUDIO)</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#44E5FF]" />
                <span>SOUND: ON (SYNTHESIZER ACTIVE)</span>
              </>
            )}
          </button>

          {/* Controls toggle */}
          <button
            onClick={() => setShowControls(!showControls)}
            className="w-full py-3 px-4 rounded-2xl bg-[#141412] border border-[#21211e] text-xs font-medium text-[#8e8d80] hover:text-[#F4F4F0] hover:border-[#383730] transition-all flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span>CONTROLS SCHEMATIC</span>
          </button>

          {/* Exit Lab */}
          <button
            onClick={onExit}
            className="w-full py-3 px-4 rounded-2xl border border-red-950/60 bg-red-950/20 text-red-300 hover:bg-red-950/40 text-xs font-medium transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>EXIT LAB → RETURN TO PORTFOLIO</span>
          </button>

        </div>

        {/* Controls Overlay inside Pause */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-[#070706] border border-[#1f1f1c] text-left text-xs space-y-2 mb-4"
            >
              <div className="flex justify-between text-[#A6A596]">
                <span className="text-[#E1E0CC]">WASD / ARROWS</span>
                <span>MOVE DRONE</span>
              </div>
              <div className="flex justify-between text-[#A6A596]">
                <span className="text-[#E1E0CC]">E / TAP STATION</span>
                <span>INTERACT</span>
              </div>
              <div className="flex justify-between text-[#A6A596]">
                <span className="text-[#E1E0CC]">M</span>
                <span>TOGGLE SOUND</span>
              </div>
              <div className="flex justify-between text-[#A6A596]">
                <span className="text-[#E1E0CC]">ESC</span>
                <span>PAUSE SIMULATOR</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-[10px] text-[#55544d]">
          ESC will automatically resume the session
        </div>
      </motion.div>
    </div>
  );
}
