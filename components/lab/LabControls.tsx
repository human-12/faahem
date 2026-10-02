'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

function subscribeTouch() {
  return () => {};
}

function getTouchSnapshot() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function getTouchServerSnapshot() {
  return false;
}

interface LabControlsProps {
  onVirtualMove: (dx: number, dy: number) => void;
  onVirtualInteract: () => void;
  canInteract: boolean;
  activeStationTitle?: string;
}

export function LabControls({
  onVirtualMove,
  onVirtualInteract,
  canInteract,
  activeStationTitle,
}: LabControlsProps) {
  const [hintVisible, setHintVisible] = useState(true);
  const isTouchDevice = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  useEffect(() => {
    // Auto-minimize hint after 7 seconds
    const timer = setTimeout(() => {
      setHintVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Desktop Keyboard Hint Box */}
      <AnimatePresence>
        {hintVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] rounded-2xl p-4 text-xs font-mono text-[#D2D1C0] shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#1c1c19] mb-2 text-[#8e8d80] text-[10px]">
              <span>SYSTEM CONTROLS</span>
              <span>AUTO-MINIMIZING</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#E1E0CC] font-bold">WASD / ARROWS</span>
                <span>MOVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E1E0CC] font-bold">E / CLICK</span>
                <span>INTERACT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E1E0CC] font-bold">M</span>
                <span>SOUND</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E1E0CC] font-bold">ESC</span>
                <span>PAUSE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Interaction Prompt when drone is near a station */}
      {canInteract && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
          <button
            onClick={onVirtualInteract}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-mono font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(225,224,204,0.4)] animate-pulse hover:bg-[#FFFFFF] transition-all cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-[#0A0A09] text-[#E1E0CC] flex items-center justify-center text-[10px] font-bold">
              E
            </span>
            <span>ACCESS {activeStationTitle || 'STATION'}</span>
          </button>
        </motion.div>
      )}

      {/* 3. Mobile Virtual Touch Controls */}
      {isTouchDevice && (
        <div className="fixed inset-x-0 bottom-4 z-40 px-6 flex items-end justify-between pointer-events-none select-none">
          
          {/* Virtual D-Pad */}
          <div className="pointer-events-auto grid grid-cols-3 gap-1.5 p-2 rounded-3xl bg-[#0c0c0b]/85 backdrop-blur-md border border-[#21211e]">
            <div />
            <button
              onTouchStart={() => onVirtualMove(0, -1)}
              onTouchEnd={() => onVirtualMove(0, 0)}
              onMouseDown={() => onVirtualMove(0, -1)}
              onMouseUp={() => onVirtualMove(0, 0)}
              className="w-11 h-11 rounded-2xl bg-[#171714] active:bg-[#E1E0CC] active:text-[#0A0A09] flex items-center justify-center text-[#D2D1C0] border border-[#2b2b26]"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <div />

            <button
              onTouchStart={() => onVirtualMove(-1, 0)}
              onTouchEnd={() => onVirtualMove(0, 0)}
              onMouseDown={() => onVirtualMove(-1, 0)}
              onMouseUp={() => onVirtualMove(0, 0)}
              className="w-11 h-11 rounded-2xl bg-[#171714] active:bg-[#E1E0CC] active:text-[#0A0A09] flex items-center justify-center text-[#D2D1C0] border border-[#2b2b26]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-11 h-11 rounded-2xl bg-[#10100e] border border-[#1f1f1c]" />
            <button
              onTouchStart={() => onVirtualMove(1, 0)}
              onTouchEnd={() => onVirtualMove(0, 0)}
              onMouseDown={() => onVirtualMove(1, 0)}
              onMouseUp={() => onVirtualMove(0, 0)}
              className="w-11 h-11 rounded-2xl bg-[#171714] active:bg-[#E1E0CC] active:text-[#0A0A09] flex items-center justify-center text-[#D2D1C0] border border-[#2b2b26]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div />
            <button
              onTouchStart={() => onVirtualMove(0, 1)}
              onTouchEnd={() => onVirtualMove(0, 0)}
              onMouseDown={() => onVirtualMove(0, 1)}
              onMouseUp={() => onVirtualMove(0, 0)}
              className="w-11 h-11 rounded-2xl bg-[#171714] active:bg-[#E1E0CC] active:text-[#0A0A09] flex items-center justify-center text-[#D2D1C0] border border-[#2b2b26]"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
            <div />
          </div>

          {/* Action Button */}
          <div className="pointer-events-auto">
            <button
              onClick={onVirtualInteract}
              className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border font-mono font-bold text-xs shadow-xl active:scale-95 transition-all ${
                canInteract
                  ? 'bg-[#E1E0CC] text-[#0A0A09] border-[#FFFFFF] shadow-[0_0_25px_rgba(225,224,204,0.4)]'
                  : 'bg-[#141412] text-[#6b6a62] border-[#262622]'
              }`}
            >
              <Hand className="w-5 h-5 mb-0.5" />
              <span>INTERACT</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
}
