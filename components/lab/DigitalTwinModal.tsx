'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, X, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { labAudio } from './LabAudio';

interface DigitalTwinModalProps {
  onClose: () => void;
  onExplorePortfolio: () => void;
  isDiscovered: boolean;
  onClaimXP: () => void;
}

export function DigitalTwinModal({
  onClose,
  onExplorePortfolio,
  isDiscovered,
  onClaimXP,
}: DigitalTwinModalProps) {
  const [claimed, setClaimed] = useState(isDiscovered);
  const [temp, setTemp] = useState<number>(32);

  const isWarning = temp > 48;

  const handleClaim = () => {
    if (!claimed) {
      setClaimed(true);
      onClaimXP();
      labAudio.playXP();
    }
  };

  const handleSliderChange = (newTemp: number) => {
    setTemp(newTemp);
    if (newTemp > 48 && !isWarning) {
      labAudio.playSync();
    } else if (newTemp % 5 === 0) {
      labAudio.playBlip(700 + newTemp * 10);
    }
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
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8e8d80] uppercase tracking-wider font-mono">STATION 04</span>
                <span className="text-[#3a3934]">·</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">STATE SYNCED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] font-display">DIGITAL TWIN SIMULATOR</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2b2b27] flex items-center justify-center text-[#8e8d80] hover:text-[#FFFFFF] hover:border-[#E1E0CC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side-by-Side: Physical System vs Digital Twin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          
          {/* Physical System */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isWarning
              ? 'border-amber-500/50 bg-[#17120a]'
              : 'border-[#21211e] bg-[#10100e]'
          }`}>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a1a17] mb-3 font-mono">
              <span className="text-[#8e8d80]">PHYSICAL MACHINE</span>
              <span className={`font-bold ${isWarning ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
                {isWarning ? 'STATUS: WARNING' : 'STATUS: NOMINAL'}
              </span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#66655c]">Thermistor:</span>
                <span className="text-[#E1E0CC] font-bold">{temp}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66655c]">Hardware Ingest:</span>
                <span>I2C Bus / DMA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66655c]">Bus Jitter:</span>
                <span>&lt; 0.4ms</span>
              </div>
            </div>
          </div>

          {/* Digital Twin */}
          <div className={`p-4 rounded-2xl border transition-all ${
            isWarning
              ? 'border-amber-500/50 bg-[#17120a]'
              : 'border-[#21211e] bg-[#10100e]'
          }`}>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1a1a17] mb-3 font-mono">
              <span className="text-[#E1E0CC] font-bold">DIGITAL TWIN MODEL</span>
              <span className="text-xs text-[#8e8d80]">CONVERGED</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#66655c]">Simulated Temp:</span>
                <span className="text-[#E1E0CC] font-bold">{temp}°C (synced)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66655c]">Model State:</span>
                <span>Graph Telemetry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66655c]">Predictive AI:</span>
                <span className={isWarning ? 'text-amber-400 font-bold' : 'text-[#8e8d80]'}>
                  {isWarning ? 'Anomaly Flagged' : 'Stable Curve'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Real-time slider controller */}
        <div className="p-4 rounded-2xl bg-[#090908] border border-[#1e1e1b] mb-6">
          <div className="flex items-center justify-between text-xs mb-2 font-mono">
            <span className="text-[#8e8d80]">MANIPULATE TEMPERATURE TELEMETRY:</span>
            <span className="text-[#E1E0CC] font-bold">{temp}°C</span>
          </div>
          <input
            type="range"
            min={24}
            max={68}
            value={temp}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-1.5 bg-[#1a1a17] rounded-lg appearance-none cursor-pointer accent-[#E1E0CC]"
          />
          <div className="flex justify-between text-[10px] text-[#66655c] mt-1 font-mono">
            <span>24°C (Nominal)</span>
            <span>48°C (Threshold)</span>
            <span>68°C (Critical)</span>
          </div>
        </div>

        {/* System Pipeline statement */}
        <div className="p-3 bg-[#11110f] rounded-xl border border-[#1e1e1b] text-center text-xs text-[#A6A596] mb-6 font-sans italic">
          &ldquo;Digital twins connect physical systems with intelligent virtual models.&rdquo;
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#1c1c19] flex flex-col sm:flex-row items-center justify-between gap-3">
          {!claimed ? (
            <button
              onClick={handleClaim}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFFFF] transition-all shadow-[0_0_20px_rgba(225,224,204,0.3)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>SYNCHRONIZE TWIN (+200 XP)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>DIGITAL TWIN SYNCHRONIZED (+200 XP)</span>
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onExplorePortfolio}
              className="px-4 py-2 rounded-full border border-[#2a2a26] text-xs text-[#E1E0CC] hover:bg-[#1a1a17] transition-all flex items-center gap-1.5"
            >
              <span>View Digital Twins</span>
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
