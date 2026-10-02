'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Cpu,
  CheckCircle2,
  Sparkles,
  Zap,
  Radio,
  Camera,
  Activity,
  Layers,
  ExternalLink,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  ESP32ComponentId,
  HardwareObjective,
  SensorTelemetry,
  DigitalTwinState,
} from './ESP32Types';

interface ESP32HUDProps {
  selectedComponent: ESP32ComponentId | null;
  hoveredComponent: ESP32ComponentId | null;
  objectives: HardwareObjective[];
  discoveredComponents: string[];
  isLedActive: boolean;
  onToggleLED: () => void;
  sensorTelemetry: SensorTelemetry;
  onToggleSensorConnection: () => void;
  digitalTwin: DigitalTwinState;
  onToggleDigitalTwinSync: () => void;
  onClose: () => void;
  onNavigatePortfolio: (section?: string) => void;
  isAllCompleted: boolean;
  onClaimAllXP: () => void;
  xpClaimed: boolean;
  onSetFocus: (target: 'board' | 'chip' | 'gpio' | 'camera' | 'sensor') => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export function ESP32HUD({
  selectedComponent,
  hoveredComponent,
  objectives,
  discoveredComponents,
  isLedActive,
  onToggleLED,
  sensorTelemetry,
  onToggleSensorConnection,
  digitalTwin,
  onToggleDigitalTwinSync,
  onClose,
  onNavigatePortfolio,
  isAllCompleted,
  onClaimAllXP,
  xpClaimed,
  onSetFocus,
  isMuted,
  onToggleSound,
}: ESP32HUDProps) {
  const [showEdgeAIPipeline, setShowEdgeAIPipeline] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  const displayCompId = selectedComponent || hoveredComponent || 'chip';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 font-mono select-none overflow-hidden">
      
      {/* =====================================================================
          1. TOP ENGINEERING TELEMETRY HEADER
         ===================================================================== */}
      <header className="pointer-events-auto flex items-center justify-between pb-3 border-b border-[#232320]/80 bg-[#090908]/80 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141412] border border-[#2b2b27] flex items-center justify-center text-[#E1E0CC]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#8e8d80] uppercase tracking-widest font-bold">
                FAAHEM LAB // HARDWARE
              </span>
              <span className="text-[#3a3934]">·</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE 3D
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-[#F4F4F0] tracking-tight">
              ESP32-S3 DEVELOPMENT BOARD
            </h1>
          </div>
        </div>

        {/* Action Controls Top-Right */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            className="w-8 h-8 rounded-full bg-[#141412] border border-[#262622] text-[#8e8d80] hover:text-[#FFFFFF] flex items-center justify-center transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#E1E0CC]" />}
          </button>

          {/* Close / Return button */}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-[#181815] border border-[#2d2d28] text-xs text-[#A6A596] hover:text-[#FFFFFF] hover:border-[#E1E0CC] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Exit Workbench</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN BODY (LEFT OBJECTIVES & RIGHT INSPECTION DOCK)
         ===================================================================== */}
      <div className="flex-1 flex flex-col md:flex-row items-start justify-between gap-4 my-3 overflow-hidden">
        
        {/* LEFT DOCK: MISSION TASKS & COMPONENT DISCOVERY */}
        <div className="pointer-events-auto w-full md:w-72 sm:w-80 flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-1">
          
          {/* Mission Objectives Card */}
          <div className="p-4 rounded-2xl bg-[#0c0c0b]/90 backdrop-blur-md border border-[#21211e] text-[#F4F4F0] shadow-xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1c1c19] mb-3">
              <span className="text-[10px] tracking-widest text-[#8e8d80] uppercase font-bold flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#E1E0CC]" />
                LAB OBJECTIVES
              </span>
              <span className="text-[10px] text-[#E1E0CC] font-bold">
                {objectives.filter((o) => o.isCompleted).length} / {objectives.length}
              </span>
            </div>

            <div className="space-y-2.5">
              {objectives.map((obj, i) => (
                <div
                  key={obj.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all ${
                    obj.isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-[#121210] border-[#1e1e1b] text-[#A6A596]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-[11px] flex items-center gap-1.5">
                      <span className="text-[#66655c]">0{i + 1}.</span> {obj.title}
                    </span>
                    {obj.isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-400/80 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#737268] leading-tight">{obj.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Claim XP when all complete */}
            {isAllCompleted && !xpClaimed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onClaimAllXP}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(225,224,204,0.3)] hover:bg-[#FFFFFF] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLAIM LAB XP (+250 XP)</span>
              </motion.button>
            )}
          </div>

          {/* Discovery Inventory */}
          <div className="p-3.5 rounded-2xl bg-[#0c0c0b]/80 backdrop-blur-md border border-[#1e1e1b] text-xs text-[#8e8d80]">
            <span className="text-[9px] tracking-wider uppercase text-[#66655c] block mb-2 font-bold">
              DISCOVERED HARDWARE CONCEPTS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['ESP32-S3', 'GPIO', 'SENSOR', 'CAMERA', 'EDGE AI', 'DIGITAL TWIN'].map((item) => {
                const isFound = discoveredComponents.includes(item);
                return (
                  <span
                    key={item}
                    className={`text-[9px] px-2 py-0.5 rounded-full border transition-all ${
                      isFound
                        ? 'border-[#E1E0CC]/40 bg-[#161614] text-[#E1E0CC]'
                        : 'border-[#1f1f1c] bg-[#0c0c0b] text-[#55544c]'
                    }`}
                  >
                    {isFound ? '✓ ' : '○ '}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT DOCK: REAL-TIME COMPONENT INSPECTOR & ACTIONS */}
        <div className="pointer-events-auto w-full md:w-80 sm:w-96 flex flex-col gap-3 max-h-[85vh] overflow-y-auto pl-1">
          
          <div className="p-5 rounded-3xl bg-[#0c0c0b]/95 backdrop-blur-xl border border-[#232320] text-[#F4F4F0] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/30 to-transparent" />

            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1a1a17] mb-3">
              <span className="text-[10px] tracking-widest text-[#8e8d80] uppercase font-bold">
                SUBSYSTEM TELEMETRY
              </span>
              <span className="text-[10px] font-bold text-[#E1E0CC] px-2 py-0.5 rounded bg-[#161614] border border-[#262622]">
                STATUS: ONLINE
              </span>
            </div>

            {/* Dynamic Content based on Active / Clicked Component */}

            {/* 1. ESP32-S3 CHIP */}
            {displayCompId === 'chip' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#141412] border border-[#2b2b27] flex items-center justify-center text-[#E1E0CC]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#FFFFFF]">ESP32-S3 CHIP</h3>
                    <span className="text-[10px] text-[#8e8d80]">Dual Xtensa LX7 @ 240MHz</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#121210] border border-[#1e1e1b] text-[11px] space-y-1.5 text-[#B5B4A5]">
                  <p><strong className="text-[#E1E0CC]">Role:</strong> Embedded Computing, Edge AI, IoT Transduction</p>
                  <p><strong className="text-[#E1E0CC]">Memory:</strong> 512KB SRAM + 8MB PSRAM (Octal SPI)</p>
                  <p><strong className="text-[#E1E0CC]">Capabilities:</strong> Vector instructions for AI acceleration</p>
                </div>

                {/* Conceptual Pipeline Flow */}
                <div className="p-2.5 rounded-xl bg-[#090908] border border-[#1a1a17] text-center text-[10px] text-[#8e8d80]">
                  SOFTWARE ──▶ ESP32-S3 ──▶ HARDWARE ──▶ PHYSICAL WORLD
                </div>
              </div>
            )}

            {/* 2. GPIO PINS & VIRTUAL LED */}
            {(displayCompId.includes('gpio') || displayCompId === 'led_gpio4' || displayCompId === 'led_status') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold text-[#FFFFFF]">GPIO 4 INTERACTION</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isLedActive ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-[#181816] text-[#737268]'
                  }`}>
                    {isLedActive ? 'SIGNAL HIGH (3.3V)' : 'SIGNAL LOW (0V)'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#121210] border border-[#1e1e1b] text-[11px] space-y-2">
                  <div className="flex justify-between text-[#8e8d80]">
                    <span>Pin Assignment:</span>
                    <span className="text-[#E1E0CC]">GPIO 4 (Digital Out)</span>
                  </div>
                  <div className="flex justify-between text-[#8e8d80]">
                    <span>Hardware Attached:</span>
                    <span className="text-[#E1E0CC]">SMD User LED (D3)</span>
                  </div>
                </div>

                {/* Toggle Button for GPIO / LED */}
                <button
                  onClick={onToggleLED}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isLedActive
                      ? 'bg-sky-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'bg-[#171714] text-[#E1E0CC] border border-[#2b2b27] hover:border-[#E1E0CC]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{isLedActive ? 'SWITCH GPIO TO LOW [LED OFF]' : 'SWITCH GPIO TO HIGH [LED ON]'}</span>
                </button>

                <div className="p-2 rounded-lg bg-[#090908] border border-[#1a1a17] text-[10px] text-center text-[#737268]">
                  GPIO ──▶ SIGNAL ──▶ PHYSICAL OUTPUT
                </div>
              </div>
            )}

            {/* 3. TEMPERATURE SENSOR MODULE */}
            {displayCompId === 'temp_sensor' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-[#FFFFFF]">TEMPERATURE SENSOR</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    sensorTelemetry.connected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {sensorTelemetry.connected ? 'I2C CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>

                {sensorTelemetry.connected ? (
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#8e8d80]">REAL-TIME READING:</span>
                      <span className="text-2xl font-bold font-mono text-emerald-300">
                        {sensorTelemetry.temperature.toFixed(1)}°C
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#737268]">
                      <span>Bus: {sensorTelemetry.bus}</span>
                      <span>VDD: {sensorTelemetry.voltage}V</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#141412] border border-[#22221f] text-xs text-[#8e8d80]">
                    Sensor jumper wires are not yet connected to the ESP32 GPIO bus.
                  </div>
                )}

                <button
                  onClick={onToggleSensorConnection}
                  className="w-full py-2 px-3 rounded-xl bg-[#1a1a17] border border-[#33322d] hover:border-[#E1E0CC] text-xs text-[#E1E0CC] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{sensorTelemetry.connected ? 'Disconnect Sensor' : 'Connect Sensor to GPIO'}</span>
                </button>

                <div className="p-2 rounded-lg bg-[#090908] border border-[#1a1a17] text-[10px] text-center text-[#737268]">
                  PHYSICAL DATA ──▶ SENSOR ──▶ ESP32 DIGITAL STREAM
                </div>
              </div>
            )}

            {/* 4. CAMERA MODULE & EDGE AI */}
            {displayCompId === 'camera_module' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#E1E0CC]" />
                    <h3 className="text-sm font-bold text-[#FFFFFF]">OV2640 CAMERA MODULE</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    DVP 8-BIT
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#121210] border border-[#1e1e1b] text-[11px] space-y-1.5 text-[#B5B4A5]">
                  <p>2 Megapixel optical sensor with DVP parallel bus directly mapped to ESP32 DMA buffer.</p>
                </div>

                <button
                  onClick={() => setShowEdgeAIPipeline(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(225,224,204,0.25)] hover:bg-[#FFFFFF] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>OPEN SIMULATED EDGE AI PIPELINE</span>
                </button>
              </div>
            )}

            {/* 5. DEFAULT / OTHER COMPONENT INFO */}
            {!['chip', 'temp_sensor', 'camera_module'].includes(displayCompId) &&
              !displayCompId.includes('gpio') && (
                <div className="space-y-2 text-xs text-[#B5B4A5]">
                  <h3 className="text-sm font-bold text-[#FFFFFF] uppercase">{displayCompId.replace('_', ' ')}</h3>
                  <p className="text-[#8e8d80]">Hardware sub-circuit component on ESP32-S3 development board.</p>
                </div>
              )}

            {/* Digital Twin Real-Time Sync Action */}
            <div className="mt-4 pt-3 border-t border-[#1a1a17]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#8e8d80] uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#E1E0CC]" />
                  DIGITAL TWIN SIMULATION
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  digitalTwin.isSynced ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[#181815] text-[#66655c]'
                }`}>
                  {digitalTwin.isSynced ? 'SYNCED' : 'OFFLINE'}
                </span>
              </div>

              {digitalTwin.isSynced && (
                <div className="p-2.5 rounded-xl bg-[#090908] border border-[#1e1e1b] text-[10px] mb-2 font-mono flex items-center justify-between">
                  <div>
                    <span className="text-[#737268] block">ESP32 STREAM</span>
                    <span className="text-emerald-400 font-bold">{sensorTelemetry.temperature.toFixed(1)}°C</span>
                  </div>
                  <span className="text-[#44433d]">⮀</span>
                  <div>
                    <span className="text-[#737268] block">VIRTUAL CLONE</span>
                    <span className="text-emerald-400 font-bold">{digitalTwin.twinTemperature.toFixed(1)}°C</span>
                  </div>
                </div>
              )}

              <button
                onClick={onToggleDigitalTwinSync}
                className="w-full py-1.5 px-3 rounded-lg border border-[#2b2b27] bg-[#141412] hover:border-[#E1E0CC] text-[11px] text-[#E1E0CC] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{digitalTwin.isSynced ? 'Disconnect Digital Twin' : 'Sync to Digital Twin'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================================
          3. BOTTOM CONTROLS & CAMERA SHORTCUTS BAR
         ===================================================================== */}
      <footer className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#090908]/90 backdrop-blur-md border border-[#21211e]">
        
        {/* Interaction hints */}
        <div className="flex items-center gap-3 text-[11px] text-[#8e8d80]">
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-[#181816] text-[#E1E0CC] text-[9px] border border-[#262622]">DRAG</span> Orbit
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-[#181816] text-[#E1E0CC] text-[9px] border border-[#262622]">SCROLL</span> Zoom
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-[#181816] text-[#E1E0CC] text-[9px] border border-[#262622]">CLICK</span> Inspect
          </span>
        </div>

        {/* Quick Camera Focus Targets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#66655c] mr-1 hidden sm:inline">FOCUS:</span>
          {[
            { id: 'board', label: 'RESET' },
            { id: 'chip', label: 'CHIP' },
            { id: 'gpio', label: 'GPIO' },
            { id: 'camera', label: 'CAMERA' },
            { id: 'sensor', label: 'SENSOR' },
          ].map((target) => (
            <button
              key={target.id}
              onClick={() => onSetFocus(target.id as 'board' | 'chip' | 'gpio' | 'camera' | 'sensor')}
              className="px-2.5 py-1 rounded-lg bg-[#141412] border border-[#232320] text-[10px] text-[#A6A596] hover:text-[#FFFFFF] hover:border-[#E1E0CC] transition-all cursor-pointer"
            >
              {target.label}
            </button>
          ))}
        </div>

      </footer>

      {/* =====================================================================
          4. SIMULATED EDGE AI PIPELINE MODAL DRAWER
         ===================================================================== */}
      <AnimatePresence>
        {showEdgeAIPipeline && (
          <div className="pointer-events-auto fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#0c0c0b] border border-[#292926] p-6 shadow-2xl text-[#F4F4F0]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1c1c19] mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#E1E0CC]" />
                  <h3 className="text-base font-bold">SIMULATED EDGE AI PIPELINE</h3>
                </div>
                <button
                  onClick={() => setShowEdgeAIPipeline(false)}
                  className="w-7 h-7 rounded-full border border-[#2b2b27] flex items-center justify-center text-[#8e8d80] hover:text-[#FFFFFF]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Simulated Camera Viewfinder */}
              <div className="relative aspect-video w-full rounded-2xl bg-[#070707] border border-[#232320] flex items-center justify-center overflow-hidden mb-4">
                <div className="absolute inset-0 bg-[radial-gradient(#1c2e22_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                {/* Simulated Object Detection Reticle */}
                <div className="relative w-48 h-32 border-2 border-[#38bdf8] rounded-xl flex flex-col justify-between p-2 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#38bdf8] bg-black/80 px-1.5 py-0.5 rounded">
                    <span>OBJECT: PCB COMPONENT</span>
                    <span>CONF: 97.4%</span>
                  </div>
                  <div className="text-[8px] text-sky-300 font-mono text-center">
                    [ROI: x:120 y:80 w:192 h:128]
                  </div>
                </div>

                <div className="absolute bottom-2 left-3 text-[9px] text-[#66655c]">
                  SIMULATED SENSOR STREAM &bull; OV2640 DVP &bull; 15 FPS
                </div>
              </div>

              {/* Step-by-Step Pipeline */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs mb-4">
                {[
                  { step: '01. CAMERA', sub: 'Captures photons' },
                  { step: '02. IMAGE', sub: 'DMA buffer frame' },
                  { step: '03. EDGE AI', sub: 'TinyML quantized' },
                  { step: '04. RESULT', sub: 'Actionable logic' },
                ].map((s, idx) => (
                  <button
                    key={s.step}
                    onClick={() => setPipelineStep(idx)}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                      pipelineStep === idx
                        ? 'border-[#E1E0CC] bg-[#1a1a17]'
                        : 'border-[#1f1f1c] bg-[#11110f] hover:border-[#33322d]'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-[#E1E0CC]">{s.step}</div>
                    <div className="text-[8px] text-[#737268]">{s.sub}</div>
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#121210] border border-[#1e1e1b] text-xs text-[#B5B4A5]">
                {pipelineStep === 0 && 'The physical camera module captures ambient photons and converts them to digital pixels.'}
                {pipelineStep === 1 && 'Image rows are streamed via an 8-bit parallel bus straight into high-speed memory buffers.'}
                {pipelineStep === 2 && 'Onboard TinyML convolutional networks classify objects with microsecond latency without cloud dependence.'}
                {pipelineStep === 3 && 'Classification predictions trigger actuators, logging events, or telemetric digital-twin updates.'}
              </div>

              <div className="mt-4 pt-3 border-t border-[#1c1c19] text-center">
                <button
                  onClick={() => setShowEdgeAIPipeline(false)}
                  className="px-6 py-2 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs hover:bg-[#FFFFFF]"
                >
                  Return to 3D Workbench
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          5. ALL OBJECTIVES COMPLETE CELEBRATION MODAL
         ===================================================================== */}
      <AnimatePresence>
        {isAllCompleted && xpClaimed && (
          <div className="pointer-events-auto fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0c0c0b] border border-[#E1E0CC]/40 p-6 sm:p-8 shadow-2xl text-center text-[#F4F4F0] overflow-hidden"
            >
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#E1E0CC] to-transparent" />

              <div className="w-14 h-14 rounded-2xl bg-[#1a1a17] border border-[#E1E0CC] text-[#E1E0CC] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(225,224,204,0.3)]">
                <Sparkles className="w-7 h-7" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-2">HARDWARE SYSTEM ONLINE</h2>
              <p className="text-xs text-emerald-400 font-mono mb-4">
                ALL 3 LAB OBJECTIVES COMPLETED (+250 XP CLAIMED)
              </p>

              {/* Core Philosophy Reveal */}
              <div className="p-4 rounded-2xl bg-[#121210] border border-[#232320] text-xs font-mono text-[#D2D1C0] space-y-2 mb-6">
                <div className="text-[#E1E0CC] font-bold">
                  HARDWARE + SOFTWARE + DATA = INTELLIGENT SYSTEM
                </div>
                <div className="text-[11px] text-[#8e8d80]">
                  &ldquo;This is where computer engineering becomes physical.&rdquo;
                </div>
              </div>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] font-bold text-xs hover:bg-[#FFFFFF] transition-all cursor-pointer"
                >
                  Continue Lab Exploration
                </button>
                <button
                  onClick={() => onNavigatePortfolio('work')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-[#2b2b27] bg-[#161614] hover:border-[#E1E0CC] text-xs text-[#E1E0CC] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View Embedded Projects</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
