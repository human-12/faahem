'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, X, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { labAudio } from './LabAudio';

interface AICoreModalProps {
  onClose: () => void;
  onExplorePortfolio: () => void;
  isDiscovered: boolean;
  onClaimXP: () => void;
}

export function AICoreModal({
  onClose,
  onExplorePortfolio,
  isDiscovered,
  onClaimXP,
}: AICoreModalProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [claimed, setClaimed] = useState(isDiscovered);

  const steps = [
    { title: 'DATA', desc: 'Financial documents, transaction streams & regional knowledge graphs' },
    { title: 'MODEL', desc: 'Quantized LLMs + Graph Knowledge Representations' },
    { title: 'REASONING', desc: 'Autonomous agent verification & graph traversal loops' },
    { title: 'DECISION', desc: 'Explainable risk score & transparent attribution paths' },
  ];

  const handleClaim = () => {
    if (!claimed) {
      setClaimed(true);
      onClaimXP();
      labAudio.playXP();
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
        {/* Top Specular Rim */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/40 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#1c1c19] mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141412] border border-[#2b2b27] flex items-center justify-center text-[#E1E0CC]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#8e8d80] uppercase tracking-wider font-mono">STATION 01</span>
                <span className="text-[#3a3934]">·</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">ONLINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] font-display">AI CORE</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#2b2b27] flex items-center justify-center text-[#8e8d80] hover:text-[#FFFFFF] hover:border-[#E1E0CC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Intelligence Modules Grid */}
        <div className="mb-6">
          <span className="text-[11px] text-[#737268] uppercase tracking-widest block mb-2 font-mono">
            INTELLIGENCE MODULES
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {['Machine Learning', 'Generative AI', 'AI Agents', 'RAG Systems'].map((mod) => (
              <div
                key={mod}
                className="p-2.5 rounded-xl bg-[#11110f] border border-[#1e1e1b] text-[#C5C4B4] text-center"
              >
                {mod}
              </div>
            ))}
          </div>
        </div>

        {/* Animated Reasoning Flow */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#080807] border border-[#191917] mb-6">
          <span className="text-[10px] text-[#66655c] uppercase tracking-wider block mb-3 font-mono">
            INTERACTIVE REASONING LOOP (CLICK TO INSPECT)
          </span>

          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            {steps.map((st, i) => (
              <button
                key={st.title}
                onClick={() => {
                  setActiveStep(i);
                  labAudio.playBlip(1000 + i * 200);
                }}
                className={`py-2 px-1 rounded-lg border text-xs font-bold font-mono transition-all ${
                  activeStep === i
                    ? 'border-[#E1E0CC] bg-[#1a1a17] text-[#E1E0CC] shadow-[0_0_12px_rgba(225,224,204,0.15)]'
                    : 'border-[#1f1f1c] bg-[#0f0f0d] text-[#8e8d80] hover:text-[#D2D1C0]'
                }`}
              >
                {st.title}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-[#11110f] border border-[#1c1c19] text-xs text-[#A6A596]">
            <span className="text-[#E1E0CC] font-semibold">{steps[activeStep].title}: </span>
            {steps[activeStep].desc}
          </div>
        </div>

        {/* Engineering Philosophy Statement */}
        <blockquote className="text-xs sm:text-sm text-[#D2D1C0] italic border-l-2 border-[#E1E0CC] pl-4 py-1 mb-6 font-sans">
          &ldquo;Exploring how artificial intelligence can become useful engineering systems.&rdquo;
        </blockquote>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#1c1c19] flex flex-col sm:flex-row items-center justify-between gap-3">
          {!claimed ? (
            <button
              onClick={handleClaim}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFFFF] transition-all shadow-[0_0_20px_rgba(225,224,204,0.3)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>COLLECT MODULE (+100 XP)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>AI CORE DISCOVERED (+100 XP)</span>
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onExplorePortfolio}
              className="px-4 py-2 rounded-full border border-[#2a2a26] text-xs text-[#E1E0CC] hover:bg-[#1a1a17] transition-all flex items-center gap-1.5"
            >
              <span>View Finverse AI</span>
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
