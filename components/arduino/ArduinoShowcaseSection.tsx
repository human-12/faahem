'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  Terminal,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Code2,
  Info,
} from 'lucide-react';
import { ArduinoInteractiveCanvas } from './ArduinoInteractiveCanvas';
import { ArduinoComponentId } from './ArduinoUnoModel';

export function ArduinoShowcaseSection() {
  // Interactive States
  const [selectedComponent, setSelectedComponent] = useState<ArduinoComponentId>('atmega328p');
  const [hoveredComponent, setHoveredComponent] = useState<ArduinoComponentId | null>(null);
  const [isLedLActive, setIsLedLActive] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<'isometric' | 'atmega' | 'pins' | 'power' | 'reset'>('isometric');
  const [autoRotate, setAutoRotate] = useState(true);

  // Active Control Panel Tab
  const [activeTab, setActiveTab] = useState<'blink' | 'analog' | 'serial'>('blink');

  // Simulated Analog A0 slider (0..1023)
  const [analogValue, setAnalogValue] = useState(672);

  // Simulated Serial Logs
  const [serialLogs, setSerialLogs] = useState<string[]>([
    '[BOOT] ATmega328P initialized at 16.000 MHz',
    '[UART] Baud rate: 9600 (8-N-1)',
    '[SETUP] DDRB |= (1 << DDB5) // Pin 13 configured OUTPUT',
    '[LOOP] Physical computing runtime online.',
  ]);

  const activeComp = hoveredComponent || selectedComponent;

  // Toggle Pin 13 LED
  const handleToggleLed = () => {
    const nextState = !isLedLActive;
    setIsLedLActive(nextState);
    setSerialLogs((prev) => [
      ...prev.slice(-6),
      `[GPIO] PORTB5 (Pin 13) -> ${nextState ? 'HIGH (5.0V) [LED ACTIVE]' : 'LOW (0.0V) [LED IDLE]'}`,
    ]);
  };

  // Reset Button trigger
  const handleResetBoard = () => {
    if (isResetting) return;
    setIsResetting(true);
    setSerialLogs((prev) => [
      ...prev.slice(-4),
      '[RESET] Tactile Reset line pulled LOW',
      '[BOOT] ATmega328P vector jump to 0x3E00',
      '[TX/RX] Optiboot bootloader handshake OK',
      '[SYSTEM] setup() re-executed successfully.',
    ]);
    setTimeout(() => {
      setIsResetting(false);
    }, 1200);
  };

  // Component details dictionary
  const getComponentDetails = (id: ArduinoComponentId) => {
    switch (id) {
      case 'atmega328p':
        return {
          title: 'ATMEGA328P-PU MICROCONTROLLER',
          category: '8-Bit AVR RISC Architecture',
          desc: 'The computational core of the Arduino Uno. Incorporates 32KB ISP Flash memory, 2KB SRAM, 1KB EEPROM, and executes most instructions in a single 62.5ns clock cycle.',
          specs: ['32KB Flash Memory', '2KB SRAM / 1KB EEPROM', '16.000 MHz Crystal Clock', '28-Pin Dual In-line Package (DIP)'],
        };
      case 'usb_b':
        return {
          title: 'USB TYPE-B & ATMEGA16U2 BRIDGE',
          category: 'UART Communication & 5V Bus',
          desc: 'Provides full-duplex serial communication to the host computer while supplying regulated 5V power protected by an onboard 500mA resettable polyfuse.',
          specs: ['Standard USB Type-B Port', 'ATmega16U2 USB-UART Bridge', '5V Regulated Bus Power', '500mA Polyfuse Protection'],
        };
      case 'dc_jack':
        return {
          title: '2.1mm DC POWER BARREL JACK',
          category: 'Unregulated Power In (VIN)',
          desc: 'Enables tetherless deployment from 7V to 12V battery packs or wall supplies, stepped down through an onboard low-dropout linear voltage regulator.',
          specs: ['2.1mm Center-Positive Socket', 'Operational Range: 7V - 12V DC', 'Reverse Polarity Diode', 'Onboard 5V / 3.3V Regulators'],
        };
      case 'led_l':
        return {
          title: 'PIN 13 STATUS INDICATOR ("L")',
          category: 'Digital GPIO / SCK Output',
          desc: 'Surface-mount yellow indicator mapped to digital pin 13 (PB5) via an operational amplifier buffer to avoid loading the high-impedance pin.',
          specs: ['Yellow/Amber SMD LED', 'Mapped to Digital Pin 13 (PB5)', 'Buffered via LMV358 Op-Amp', 'Active High'],
        };
      case 'digital_headers':
        return {
          title: 'DIGITAL I/O HEADERS (PINS 0 — 13)',
          category: 'Bidirectional GPIO & Hardware PWM',
          desc: '14 software-configurable input/output pins. Pins 3, 5, 6, 9, 10, and 11 feature 8-bit timer hardware PWM outputs for variable duty cycles.',
          specs: ['14 Digital Pins (0 - 13)', '6 Hardware PWM Channels', 'Pins 0 & 1: Hardware USART', '20mA Continuous Current per Pin'],
        };
      case 'analog_headers':
        return {
          title: 'ANALOG INPUT HEADERS (A0 — A5)',
          category: '10-Bit Successive-Approximation ADC',
          desc: '6 multiplexed analog channels measuring continuous voltages (0 to 5V) converted into 1024 discrete digital levels with ~4.88mV granularity.',
          specs: ['6 Analog Channels (A0 - A5)', '10-bit Resolution (0 - 1023)', 'I2C Bus: A4 (SDA) / A5 (SCL)', 'AREF External Reference Support'],
        };
      case 'crystal':
        return {
          title: '16.000 MHz QUARTZ CRYSTAL',
          category: 'Fundamental Clock Source',
          desc: 'HC-49S metal can quartz resonator establishing a precise 16 million cycle per second reference, driving internal instruction fetch and timers.',
          specs: ['16.000 MHz Frequency', 'Frequency Stability: ±20 ppm', 'Dual 22pF Load Capacitors', 'Instruction Period: 62.5 ns'],
        };
      case 'reset_btn':
        return {
          title: 'TACTILE RESET PUSHBUTTON',
          category: 'Hardware Vector Interrupt',
          desc: 'Pulls the active-low RESET pin to GND, asserting a hardware interrupt that jumps the program counter back to the bootloader entry point.',
          specs: ['Momentary SPST Switch', 'Active-Low Pull-down', '10k Ohm Pull-up Resistor', 'Re-executes setup() sequence'],
        };
      default:
        return {
          title: 'ARDUINO UNO R3 PLATFORM',
          category: 'Physical Computing Laboratory',
          desc: 'The foundational microcontroller platform for physical computing, register-level embedded development, and transducer interfacing.',
          specs: ['Official Italian Blue PCB', 'ATmega328P @ 16MHz', 'Open Hardware Architecture', '5V CMOS Transistor Logic'],
        };
    }
  };

  const activeDetails = getComponentDetails(activeComp);

  return (
    <section id="arduino-uno" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#181816] bg-[#060606] overflow-hidden">
      
      {/* Subtle Specular Ambient Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E1E0CC]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header (Matches About & What I Build exactly) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">
                PHYSICAL COMPUTING // 3D HARDWARE LAB
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.18] tracking-[-0.03em] text-[#F4F4F0] max-w-5xl">
              The Arduino Uno R3.
            </h2>
            <p className="text-sm sm:text-base font-light text-[#B5B4A5] max-w-2xl leading-relaxed mt-4">
              An interactive 3D study of physical computing fundamentals — exploring Harvard architecture, direct register manipulation, and sensor interfacing on the ATmega328P.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0c0c0b] border border-[#232320] text-xs font-mono text-[#8e8d80] max-w-sm">
            <span className="text-[#E1E0CC] font-bold block mb-1">FOUNDATIONAL EXPERIMENTATION</span>
            Interfacing microsecond transistor timing with real-world physical perception.
          </div>
        </div>

        {/* ===================================================================
            MAIN 3D WORKBENCH & INTERACTIVE CONSOLE GRID
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 3D VIEWPORT CONTAINER (Cols 7 on desktop) */}
          <div className="lg:col-span-7 relative rounded-[32px] sm:rounded-[40px] bg-[#0a0a09] border border-[#232320] hover:border-[#3d3c33] transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[520px] sm:min-h-[600px] group">
            
            {/* Top Specular Hairline */}
            <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent z-10" />

            {/* Top Telemetry Overlay */}
            <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121210]/95 backdrop-blur-md border border-[#262622] text-[11px] font-mono text-[#E1E0CC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
                <span className="font-bold">3D BENCH</span>
                <span className="text-[#44433d]">·</span>
                <span className="text-[#8e8d80]">{activeDetails.category}</span>
              </div>

              {/* Pin 13 Live Indicator Pill */}
              <div className={`px-3.5 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono font-bold flex items-center gap-2 transition-all ${
                isLedLActive
                  ? 'bg-[#181815] border-[#E1E0CC]/50 text-[#E1E0CC] shadow-[0_0_15px_rgba(225,224,204,0.15)]'
                  : 'bg-[#121210] border-[#21211e] text-[#66655c]'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLedLActive ? 'bg-amber-400 animate-pulse' : 'bg-[#333]'}`} />
                <span>PIN 13: {isLedLActive ? 'HIGH [LED ON]' : 'LOW [LED OFF]'}</span>
              </div>
            </div>

            {/* Main Interactive Three.js Canvas */}
            <div className="relative w-full h-full flex-1">
              <ArduinoInteractiveCanvas
                onSelectComponent={(id) => setSelectedComponent(id)}
                onHoverComponent={(id) => setHoveredComponent(id)}
                isLedLActive={isLedLActive}
                isResetting={isResetting}
                cameraPreset={cameraPreset}
                autoRotate={autoRotate}
              />
            </div>

            {/* Bottom Camera Toolbar Overlay */}
            <div className="relative z-20 p-4 border-t border-[#1c1c19] bg-[#0c0c0b]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              {/* Interaction hints */}
              <div className="flex items-center gap-2 text-[#737268] text-[11px]">
                <span className="px-1.5 py-0.5 rounded bg-[#161614] border border-[#262622] text-[#E1E0CC]">DRAG 360°</span>
                <span className="px-1.5 py-0.5 rounded bg-[#161614] border border-[#262622] text-[#E1E0CC]">SCROLL ZOOM</span>
                <span className="px-1.5 py-0.5 rounded bg-[#161614] border border-[#262622] text-[#E1E0CC]">CLICK PARTS</span>
              </div>

              {/* Camera Presets */}
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'isometric', label: '3D' },
                  { id: 'atmega', label: 'CHIP' },
                  { id: 'pins', label: 'PINS' },
                  { id: 'power', label: 'POWER' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setCameraPreset(preset.id as 'isometric' | 'atmega' | 'pins' | 'power' | 'reset')}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      cameraPreset === preset.id
                        ? 'bg-[#E1E0CC] text-[#0A0A09] shadow-md'
                        : 'bg-[#141412] text-[#8e8d80] hover:text-[#FFFFFF] border border-[#21211e]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}

                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer ${
                    autoRotate
                      ? 'bg-[#1a1a17] text-[#E1E0CC] border border-[#E1E0CC]/40'
                      : 'bg-[#141412] text-[#66655c] border border-[#21211e]'
                  }`}
                  title="Toggle Auto Rotation"
                >
                  AUTO
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT CONTROL DOCK & SIMULATION BENCH (Cols 5 on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* 1. Component Inspector Box */}
            <div className="p-6 sm:p-7 rounded-[32px] bg-[#0c0c0b] border border-[#232320] text-[#F4F4F0] relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

              <div className="flex items-center justify-between pb-3.5 border-b border-[#1c1c19] mb-4">
                <span className="font-mono text-[10px] tracking-widest text-[#8e8d80] uppercase font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#E1E0CC]" />
                  SUBSYSTEM TELEMETRY
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#161614] border border-[#2b2b27] text-[#E1E0CC]">
                  5V CMOS LOGIC
                </span>
              </div>

              <h3 className="text-xl font-medium tracking-tight text-[#FFFFFF] font-display mb-1.5">
                {activeDetails.title}
              </h3>
              <p className="text-xs text-[#B5B4A5] font-light leading-relaxed mb-5">
                {activeDetails.desc}
              </p>

              {/* Hardware Spec Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                {activeDetails.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#11110f] border border-[#1e1e1b] text-[#D2D1C0] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E1E0CC] shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Interactive Hardware Testbench Console */}
            <div className="p-6 sm:p-7 rounded-[32px] bg-[#0c0c0b] border border-[#232320] text-[#F4F4F0] flex-1 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

              {/* Tab Selector */}
              <div>
                <div className="flex items-center gap-2 pb-3.5 border-b border-[#1c1c19] mb-5 overflow-x-auto">
                  {[
                    { id: 'blink', label: 'PIN 13 BLINK', icon: Zap },
                    { id: 'analog', label: 'ANALOG A0', icon: Sliders },
                    { id: 'serial', label: 'SERIAL MONITOR', icon: Terminal },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'blink' | 'analog' | 'serial')}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-[#E1E0CC] text-[#0A0A09] font-bold shadow-md'
                            : 'bg-[#141412] text-[#8e8d80] hover:text-[#FFFFFF] border border-[#21211e]'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Blink Controller */}
                {activeTab === 'blink' && (
                  <div className="space-y-4 font-mono">
                    <div className="flex items-center justify-between text-xs text-[#8e8d80]">
                      <span>ACTUATOR TARGET:</span>
                      <span className="text-[#E1E0CC] font-bold">PORTB5 (DIGITAL 13)</span>
                    </div>

                    {/* Interactive Toggle Button */}
                    <button
                      onClick={handleToggleLed}
                      className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                        isLedLActive
                          ? 'bg-[#E1E0CC] text-[#0A0A09] shadow-[0_0_25px_rgba(225,224,204,0.25)] hover:bg-[#FFFFFF]'
                          : 'bg-[#161614] text-[#A6A596] border border-[#2b2b27] hover:border-[#E1E0CC] hover:text-white'
                      }`}
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>{isLedLActive ? 'TOGGLE PIN 13 -> LOW [LED OFF]' : 'TOGGLE PIN 13 -> HIGH [LED ON]'}</span>
                    </button>

                    {/* Arduino C++ Code Mirror */}
                    <div className="p-3.5 rounded-xl bg-[#070707] border border-[#1e1e1b] text-[11px] text-[#A6A596]">
                      <div className="text-[10px] text-[#66655c] mb-1.5 flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-[#E1E0CC]" />
                        <span>FIRMWARE SKETCH // RUNTIME LOOP</span>
                      </div>
                      <p><span className="text-[#E1E0CC]">digitalWrite</span>(13, <span className={isLedLActive ? 'text-amber-300 font-bold' : 'text-[#66655c]'}>{isLedLActive ? 'HIGH' : 'LOW'}</span>);</p>
                      <p><span className="text-[#E1E0CC]">delay</span>(500);</p>
                    </div>
                  </div>
                )}

                {/* Tab 2: Analog Potentiometer */}
                {activeTab === 'analog' && (
                  <div className="space-y-4 font-mono">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-[#8e8d80]">ANALOG TRANSDUCER (A0):</span>
                      <span className="text-2xl font-bold font-mono text-[#E1E0CC]">
                        {((analogValue / 1023) * 5.0).toFixed(2)}V
                      </span>
                    </div>

                    {/* Slider input */}
                    <input
                      type="range"
                      min="0"
                      max="1023"
                      value={analogValue}
                      onChange={(e) => setAnalogValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1b1b18] rounded-lg appearance-none cursor-pointer accent-[#E1E0CC]"
                    />

                    <div className="flex justify-between text-[11px] text-[#737268]">
                      <span>ADC Quantization: <strong className="text-[#F4F4F0]">{analogValue}</strong> / 1023</span>
                      <span>Resolution: ~4.88 mV</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#070707] border border-[#1e1e1b] text-[11px] text-[#A6A596]">
                      <p className="text-[#E1E0CC] font-bold">int sensorVal = analogRead(A0);</p>
                      <p className="text-[#66655c]">10-bit Successive Approximation ADC Conversion</p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Serial Terminal */}
                {activeTab === 'serial' && (
                  <div className="space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[10px] text-[#737268]">
                      <span>USART SERIAL MONITOR (9600 BAUD)</span>
                      <button
                        onClick={() => setSerialLogs(['[UART LOG CLEARED]'])}
                        className="text-[#8e8d80] hover:text-[#FFFFFF] transition-colors"
                      >
                        CLEAR
                      </button>
                    </div>

                    {/* Terminal Window */}
                    <div className="h-32 p-3 rounded-xl bg-[#050505] border border-[#1e1e1b] text-[10px] text-[#D2D1C0] font-mono overflow-y-auto space-y-1">
                      {serialLogs.map((log, idx) => (
                        <div key={idx} className="leading-tight">
                          <span className="text-[#55544c] mr-1.5">&gt;</span>
                          <span className={log.includes('HIGH') ? 'text-amber-300' : ''}>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Tactile Reset Trigger */}
              <div className="pt-4 border-t border-[#1c1c19] flex items-center justify-between gap-3">
                <button
                  onClick={handleResetBoard}
                  disabled={isResetting}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isResetting
                      ? 'bg-red-500/20 border-red-500/40 text-red-300'
                      : 'bg-[#141412] border-[#2b2b27] hover:border-[#E1E0CC] text-[#D2D1C0] hover:text-white'
                  }`}
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin text-red-400' : 'text-[#8e8d80]'}`} />
                  <span>{isResetting ? 'PULLING RESET LOW...' : 'TRIGGER HARDWARE RESET INTERRUPT'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
