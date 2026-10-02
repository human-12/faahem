'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Eye, Network, BrainCircuit, Activity, Sliders, Radio, Sparkles } from 'lucide-react';

export function WhatIBuild() {
  const [activeTab01, setActiveTab01] = useState<'agents' | 'graph' | 'xai'>('graph');
  const [cvScanning, setCvScanning] = useState(true);
  const [clockSpeed, setClockSpeed] = useState<'160MHz' | '240MHz'>('240MHz');
  const [twinSyncRate, setTwinSyncRate] = useState<'Real-time' | 'Predictive'>('Real-time');

  return (
    <section id="build" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#181816]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">CORE DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-[#F4F4F0]">
              What I build & explore.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#8e8d80] max-w-md">
            Connecting algorithmic models with physical hardware, microsecond timing, and real-world perception.
          </p>
        </div>

        {/* Asymmetrical High-Craft Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 01: Artificial Intelligence (Col 7 - Wide Featured Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-7 relative p-8 sm:p-10 rounded-[32px] bg-[#0c0c0b] border border-[#232320] hover:border-[#3d3c33] transition-all duration-300 flex flex-col justify-between shadow-2xl group overflow-hidden"
          >
            {/* Subtle top specular hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

            <div>
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#1c1c19] mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-[#3d3c35] group-hover:text-[#E1E0CC] transition-colors">
                    01
                  </span>
                  <span className="text-[#363530]">/</span>
                  <span className="font-mono text-xs tracking-wider uppercase text-[#8e8d80]">
                    Artificial Intelligence & Agents
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#262622] flex items-center justify-center text-[#737268] group-hover:text-[#E1E0CC] group-hover:border-[#E1E0CC]/40 transition-all">
                  <BrainCircuit className="w-5 h-5" />
                </div>
              </div>

              {/* Title & Prose */}
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F0] mb-3 group-hover:text-[#E1E0CC] transition-colors">
                Machine Learning & Intelligent Agents
              </h3>
              <p className="text-sm sm:text-base text-[#A6A596] font-light leading-relaxed mb-8 max-w-xl">
                Machine learning systems, autonomous agents, RAG architectures, financial intelligence, and applied AI.
                Exploring algorithmic reasoning beyond black-box APIs toward graph-based knowledge and explainability.
              </p>

              {/* Interactive Telemetry Inspector */}
              <div className="p-5 rounded-2xl bg-[#080807] border border-[#1d1d1a] mb-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#161613]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#737268] flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#E1E0CC]" />
                    <span>Pipeline Architecture Mode</span>
                  </span>
                  {/* Mode switch */}
                  <div className="flex items-center gap-1 bg-[#121210] p-1 rounded-lg border border-[#21211e]">
                    {(['graph', 'agents', 'xai'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab01(tab)}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors uppercase ${
                          activeTab01 === tab
                            ? 'bg-[#E1E0CC] text-[#0A0A09] font-medium'
                            : 'text-[#8e8d80] hover:text-[#F4F4F0]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic View based on Active Tab */}
                {activeTab01 === 'graph' && (
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Knowledge Schema</span>
                      <span className="text-[#D2D1C0] font-medium">Labeled Property Graph</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Retrieval Path</span>
                      <span className="text-[#D2D1C0] font-medium">Vector + Graph RAG</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Inference Target</span>
                      <span className="text-[#E1E0CC] font-medium">Entity Resolution</span>
                    </div>
                  </div>
                )}
                {activeTab01 === 'agents' && (
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Agent Loop</span>
                      <span className="text-[#D2D1C0] font-medium">ReAct / Planning</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">State Machine</span>
                      <span className="text-[#D2D1C0] font-medium">Graph Transitions</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Evaluation</span>
                      <span className="text-[#E1E0CC] font-medium">Strict Verification</span>
                    </div>
                  </div>
                )}
                {activeTab01 === 'xai' && (
                  <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Attribution</span>
                      <span className="text-[#D2D1C0] font-medium">Sub-graph Highlighting</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Transparency</span>
                      <span className="text-[#D2D1C0] font-medium">Step-by-step Auditing</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                      <span className="text-[#6b6a62] block mb-1">Regional NLP</span>
                      <span className="text-[#E1E0CC] font-medium">Urdu Document Parse</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Tech Bar */}
            <div className="pt-6 border-t border-[#1a1a17] flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#8e8d80]">
                <span className="text-[#D2D1C0]">PyTorch</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">Graph AI</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">LangGraph</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">XAI</span>
              </div>
              <span className="text-xs font-mono text-[#66655c]">Hardware-aware ML</span>
            </div>
          </motion.div>

          {/* Card 02: Computer Vision (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative p-8 sm:p-10 rounded-[32px] bg-[#0c0c0b] border border-[#232320] hover:border-[#3d3c33] transition-all duration-300 flex flex-col justify-between shadow-2xl group overflow-hidden"
          >
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1c1c19] mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-[#3d3c35] group-hover:text-[#E1E0CC] transition-colors">
                    02
                  </span>
                  <span className="text-[#363530]">/</span>
                  <span className="font-mono text-xs tracking-wider uppercase text-[#8e8d80]">
                    Computer Vision
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#262622] flex items-center justify-center text-[#737268] group-hover:text-[#E1E0CC] group-hover:border-[#E1E0CC]/40 transition-all">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F0] mb-3 group-hover:text-[#E1E0CC] transition-colors">
                Perception & Edge Vision
              </h3>
              <p className="text-sm text-[#A6A596] font-light leading-relaxed mb-6">
                Real-world visual intelligence including retail inventory detection, stock gap analytics, automated visual inspection, and skin texture diagnosis.
              </p>

              {/* Viewfinder Reticle Simulated HUD */}
              <div className="relative p-5 rounded-2xl bg-[#080807] border border-[#1d1d1a] font-mono text-xs mb-6 overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-[#161614] mb-3 text-[11px] text-[#737268]">
                  <span>FRAME RETICLE #0492</span>
                  <button
                    onClick={() => setCvScanning(!cvScanning)}
                    className="text-[#E1E0CC] hover:underline"
                  >
                    {cvScanning ? 'Scanning: Live' : 'Scan: Paused'}
                  </button>
                </div>

                <div className="space-y-2 text-[#C5C4B4]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b6a62]">Planogram Expected:</span>
                    <span className="text-[#F4F4F0]">25 Units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b6a62]">Optical Detected:</span>
                    <span className="text-[#E1E0CC] font-bold">18 Units</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#161614]">
                    <span className="text-[#6b6a62]">Stock Gap Anomaly:</span>
                    <span className="text-amber-400 font-bold">-7 [Gap Alert]</span>
                  </div>
                </div>

                {cvScanning && (
                  <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E1E0CC] to-transparent animate-pulse" />
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#1a1a17] flex items-center justify-between text-xs font-mono text-[#8e8d80]">
              <div className="flex items-center gap-2">
                <span className="text-[#D2D1C0]">OpenCV</span>
                <span>·</span>
                <span className="text-[#D2D1C0]">YOLO</span>
                <span>·</span>
                <span className="text-[#D2D1C0]">Gradio</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#737268] group-hover:text-[#E1E0CC] transition-colors" />
            </div>
          </motion.div>

          {/* Card 03: Embedded Intelligence (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative p-8 sm:p-10 rounded-[32px] bg-[#0c0c0b] border border-[#232320] hover:border-[#3d3c33] transition-all duration-300 flex flex-col justify-between shadow-2xl group overflow-hidden"
          >
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1c1c19] mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-[#3d3c35] group-hover:text-[#E1E0CC] transition-colors">
                    03
                  </span>
                  <span className="text-[#363530]">/</span>
                  <span className="font-mono text-xs tracking-wider uppercase text-[#8e8d80]">
                    Embedded Systems
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#262622] flex items-center justify-center text-[#737268] group-hover:text-[#E1E0CC] group-hover:border-[#E1E0CC]/40 transition-all">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F0] mb-3 group-hover:text-[#E1E0CC] transition-colors">
                Silicon & Edge Intelligence
              </h3>
              <p className="text-sm text-[#A6A596] font-light leading-relaxed mb-6">
                Microcontrollers, sensor fusion, edge AI, and hardware peripherals. Testing what happens when AI runs directly on constrained silicon without cloud dependence.
              </p>

              {/* Hardware Pinout Console */}
              <div className="p-5 rounded-2xl bg-[#080807] border border-[#1d1d1a] font-mono text-xs mb-6">
                <div className="flex items-center justify-between mb-3 text-[11px] text-[#737268]">
                  <span>HARDWARE BUS REGISTER</span>
                  <button
                    onClick={() => setClockSpeed(clockSpeed === '240MHz' ? '160MHz' : '240MHz')}
                    className="text-[#E1E0CC] flex items-center gap-1 hover:underline"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Clock: {clockSpeed}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-[#11110f] border border-[#191916]">
                    <span className="text-[#6b6a62] block">SoC Platform</span>
                    <span className="text-[#E1E0CC]">ESP32-S3 Dual LX7</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#11110f] border border-[#191916]">
                    <span className="text-[#6b6a62] block">Co-Processor</span>
                    <span className="text-[#D2D1C0]">RP2040 Cortex-M0+</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#11110f] border border-[#191916]">
                    <span className="text-[#6b6a62] block">Camera Bus</span>
                    <span className="text-[#D2D1C0]">DVP 8-bit Parallel</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#11110f] border border-[#191916]">
                    <span className="text-[#6b6a62] block">Inference Budget</span>
                    <span className="text-emerald-400 font-medium">&lt; 35ms / frame</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1a1a17] flex items-center justify-between text-xs font-mono text-[#8e8d80]">
              <div className="flex items-center gap-2">
                <span className="text-[#D2D1C0]">ESP32</span>
                <span>·</span>
                <span className="text-[#D2D1C0]">RP2040</span>
                <span>·</span>
                <span className="text-[#D2D1C0]">C++</span>
                <span>·</span>
                <span className="text-[#D2D1C0]">TinyML</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#737268] group-hover:text-[#E1E0CC] transition-colors" />
            </div>
          </motion.div>

          {/* Card 04: Digital Twins (Col 7 - Wide Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-7 relative p-8 sm:p-10 rounded-[32px] bg-[#0c0c0b] border border-[#232320] hover:border-[#3d3c33] transition-all duration-300 flex flex-col justify-between shadow-2xl group overflow-hidden"
          >
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1c1c19] mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-[#3d3c35] group-hover:text-[#E1E0CC] transition-colors">
                    04
                  </span>
                  <span className="text-[#363530]">/</span>
                  <span className="font-mono text-xs tracking-wider uppercase text-[#8e8d80]">
                    Cyber-Physical Systems
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#262622] flex items-center justify-center text-[#737268] group-hover:text-[#E1E0CC] group-hover:border-[#E1E0CC]/40 transition-all">
                  <Network className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F0] mb-3 group-hover:text-[#E1E0CC] transition-colors">
                Digital Twins & Dynamic Systems
              </h3>
              <p className="text-sm sm:text-base text-[#A6A596] font-light leading-relaxed mb-8 max-w-xl">
                Systems that connect physical environments with software models, analytics and AI. Synchronizing real-time telemetry from physical sensors into digital simulation graphs for predictive foresight.
              </p>

              {/* Digital Twin State Synchronizer */}
              <div className="p-5 rounded-2xl bg-[#080807] border border-[#1d1d1a] mb-6">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#737268]">
                  <span className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-[#E1E0CC]" />
                    <span>CYBER-PHYSICAL STATE SYNC</span>
                  </span>
                  <button
                    onClick={() => setTwinSyncRate(twinSyncRate === 'Real-time' ? 'Predictive' : 'Real-time')}
                    className="text-[#E1E0CC] hover:underline"
                  >
                    Sync Mode: {twinSyncRate}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                    <span className="text-[#6b6a62] block mb-1">Sensor Ingest</span>
                    <span className="text-[#D2D1C0] font-medium">MQTT / I2C Bus</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                    <span className="text-[#6b6a62] block mb-1">State Latency</span>
                    <span className="text-emerald-400 font-medium">Δt: 1.4ms</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0f0f0d] border border-[#191916]">
                    <span className="text-[#6b6a62] block mb-1">Model Fidelity</span>
                    <span className="text-[#E1E0CC] font-medium">Continuous Sync</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1a1a17] flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#8e8d80]">
                <span className="text-[#D2D1C0]">Telemetry</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">State Sync</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">Simulation</span>
                <span className="text-[#3b3a33]">·</span>
                <span className="text-[#D2D1C0]">Graph Models</span>
              </div>
              <span className="text-xs font-mono text-[#66655c]">Predictive Loops</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
