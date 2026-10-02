'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { labAudio } from './LabAudio';

interface LabIntroProps {
  onComplete: () => void;
}

export function LabIntro({ onComplete }: LabIntroProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 0: Initializing terminal
    const timer1 = setTimeout(() => {
      setStep(1);
      labAudio.playBlip(900);
    }, 400);

    // Step 1: Progress bar loading from 0 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Step 2: System Online
    const timer2 = setTimeout(() => {
      setStep(2);
      labAudio.playBlip(1400);
    }, 1500);

    // Step 3: Welcome Engineer
    const timer3 = setTimeout(() => {
      setStep(3);
      labAudio.playInteract();
    }, 2200);

    // Step 4: Finish transition and hand over controls
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#060606] text-[#F4F4F0] flex flex-col items-center justify-center p-6 select-none font-mono">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141412_1px,transparent_1px),linear-gradient(to_bottom,#141412_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#060606]/70 to-[#060606]" />
      
      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8 text-xs tracking-widest text-[#8e8d80] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC] animate-ping" />
          <span>FAAHEM LAB // 01 — BOOT PROTOCOL</span>
        </motion.div>

        {/* Boot Sequence Content */}
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key="boot-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-4"
            >
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] font-display">
                INITIALIZING VIRTUAL LAB...
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#141412] rounded-full h-2 overflow-hidden border border-[#262622] p-0.5">
                <motion.div
                  className="bg-gradient-to-r from-[#E1E0CC] via-[#FFFFFF] to-[#E1E0CC] h-full rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#8e8d80] font-mono">
                <span>ENVIRONMENT</span>
                <span className="text-[#E1E0CC] font-bold">{progress}%</span>
              </div>

              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-4 text-emerald-400 font-bold tracking-widest text-xs font-mono"
                >
                  SYSTEM ONLINE
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="welcome-phase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full border border-[#E1E0CC]/30 bg-[#141412] text-[#E1E0CC] text-xs tracking-widest uppercase">
                AUTHENTICATED
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] font-display">
                WELCOME, ENGINEER.
              </h2>

              <div className="p-5 rounded-2xl bg-[#0c0c0b] border border-[#21211e] text-xs sm:text-sm text-[#A6A596] leading-relaxed max-w-sm mx-auto shadow-xl">
                <div className="text-[#E1E0CC] font-semibold mb-2 tracking-wider uppercase font-mono">OBJECTIVE:</div>
                <div className="space-y-1 font-mono text-[#D2D1C0]">
                  <div>EXPLORE.</div>
                  <div>DISCOVER.</div>
                  <div>BUILD.</div>
                </div>
              </div>

              <div className="text-[11px] text-[#6b6a62] font-mono animate-pulse">
                DEPLOYING AVATAR INTO SECTOR 01...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
