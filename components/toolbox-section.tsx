'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Layers, ExternalLink, Code2 } from 'lucide-react';
import {
  PythonLogo,
  CppLogo,
  TypeScriptLogo,
  PyTorchLogo,
  OpenCVLogo,
  ESP32Logo,
  RaspberryPiLogo,
  ReactLogo,
  NextJsLogo,
  TailwindLogo,
  LinuxLogo,
  GitLogo,
  DockerLogo,
  HuggingFaceLogo,
  NodeLogo,
  SensorBusLogo,
} from './tech-logos';

interface SkillItem {
  name: string;
  category: 'languages' | 'ai-vision' | 'embedded' | 'web-tools';
  categoryLabel: string;
  logo: React.ComponentType<{ className?: string }>;
  role: string;
  status: 'Building with' | 'Exploring' | 'Lab Work';
  projectRef?: string;
  details: string;
}

const ALL_SKILLS: SkillItem[] = [
  {
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Primary Language',
    logo: PythonLogo,
    role: 'Core algorithmic language for AI, data pipelines & CV',
    status: 'Building with',
    projectRef: 'Finverse AI, Skin Analysis & Retail CV',
    details: 'Primary prototyping language. Used across PyTorch model pipelines, OpenCV matrix operations, and LangGraph agent flows.',
  },
  {
    name: 'C++',
    category: 'languages',
    categoryLabel: 'Systems Language',
    logo: CppLogo,
    role: 'Low-level microcontroller firmware & memory efficiency',
    status: 'Building with',
    projectRef: 'Embedded Vision Lab & ESP32-S3',
    details: 'Writing bare-metal and RTOS firmware for ESP32 and RP2040. Managing register interrupts and DMA memory buffers.',
  },
  {
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'Type-Safe Systems',
    logo: TypeScriptLogo,
    role: 'Interactive dashboards, API contracts & web prototypes',
    status: 'Building with',
    projectRef: 'Full-stack prototypes & Portfolio',
    details: 'Building strongly typed user interfaces, telemetry visualizers, and reactive client-server architectures.',
  },
  {
    name: 'PyTorch',
    category: 'ai-vision',
    categoryLabel: 'Deep Learning',
    logo: PyTorchLogo,
    role: 'Neural network training, model tuning & tensor math',
    status: 'Exploring',
    projectRef: 'Finverse AI & Multimodal Triage',
    details: 'Exploring tensor computation, transformer architectures, and local quantized inference pipelines.',
  },
  {
    name: 'OpenCV',
    category: 'ai-vision',
    categoryLabel: 'Computer Vision',
    logo: OpenCVLogo,
    role: 'Homography, perspective correction & SKU counting',
    status: 'Building with',
    projectRef: 'Retail Shelf Intelligence',
    details: 'Image pre-processing, morphological filtering, bounding box contours, and real-time planar geometric transformations.',
  },
  {
    name: 'ESP32-S3',
    category: 'embedded',
    categoryLabel: 'Silicon Platform',
    logo: ESP32Logo,
    role: 'Dual-core Xtensa LX7 MCU with camera interface & WiFi/BLE',
    status: 'Lab Work',
    projectRef: 'Embedded Vision Lab',
    details: 'Interfacing OV2640 camera sensors over 8-bit parallel DVP, running lightweight TinyML classifiers at 240MHz.',
  },
  {
    name: 'Raspberry Pi Pico',
    category: 'embedded',
    categoryLabel: 'Microcontroller',
    logo: RaspberryPiLogo,
    role: 'RP2040 dual ARM Cortex-M0+ sensor aggregator & SPI controller',
    status: 'Lab Work',
    projectRef: 'Sensor Fusion Experiments',
    details: 'Low-jitter sensor polling, PWM motor signals, and high-frequency SPI bus telemetry collection.',
  },
  {
    name: 'Sensor Fusion & I2C',
    category: 'embedded',
    categoryLabel: 'Bus Protocols',
    logo: SensorBusLogo,
    role: 'Hardware communication across I2C, SPI, UART & GPIO',
    status: 'Lab Work',
    projectRef: 'Digital Twins & Telemetry',
    details: 'Connecting physical sensors with sub-millisecond clock sync, bus arbitration, and parity checking.',
  },
  {
    name: 'Next.js & React',
    category: 'web-tools',
    categoryLabel: 'Frontend Engineering',
    logo: NextJsLogo,
    role: 'Server-side rendering, reactive state & high-performance UI',
    status: 'Building with',
    projectRef: 'Web Interfaces & Simulation Views',
    details: 'Building performant web applications, Framer Motion animations, and real-time websocket dashboards.',
  },
  {
    name: 'Tailwind CSS',
    category: 'web-tools',
    categoryLabel: 'Styling Architecture',
    logo: TailwindLogo,
    role: 'Design systems, responsive tokens & dark mode layouts',
    status: 'Building with',
    projectRef: 'All Web Projects',
    details: 'Crafting responsive UI with strict typographic scale, CSS variables, and modern Tailwind v4 themes.',
  },
  {
    name: 'Linux',
    category: 'web-tools',
    categoryLabel: 'Operating System',
    logo: LinuxLogo,
    role: 'Primary development environment & embedded toolchains',
    status: 'Building with',
    projectRef: 'Daily Engineering Workstation',
    details: 'Bash scripting, GCC toolchains, CMake compilation, and direct hardware serial port debugging.',
  },
  {
    name: 'Git & GitHub',
    category: 'web-tools',
    categoryLabel: 'Version Control',
    logo: GitLogo,
    role: 'Branching workflows, versioning & open-source logs',
    status: 'Building with',
    projectRef: 'github.com/human-12',
    details: 'Tracking daily commits, open-source experiment repositories, and structured code versioning.',
  },
  {
    name: 'Hugging Face',
    category: 'ai-vision',
    categoryLabel: 'Model Hub',
    logo: HuggingFaceLogo,
    role: 'Foundation models, tokenizers & open weights',
    status: 'Exploring',
    projectRef: 'Finverse AI NLP',
    details: 'Investigating transformer pipelines, Urdu tokenization models, and vector embeddings.',
  },
  {
    name: 'Docker',
    category: 'web-tools',
    categoryLabel: 'Containerization',
    logo: DockerLogo,
    role: 'Reproducible machine learning environments & testbeds',
    status: 'Exploring',
    projectRef: 'AI Model Serving',
    details: 'Creating isolated runtime containers for model inference servers and dependency reproducibility.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'ai-vision', label: 'AI & Vision' },
  { id: 'embedded', label: 'Silicon & Hardware' },
  { id: 'languages', label: 'Languages' },
  { id: 'web-tools', label: 'Web & Systems' },
];

export function ToolboxSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    activeCategory === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="stack" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#181816]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">THE TOOLBOX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-[#F4F4F0]">
              Silicon to software stack.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#8e8d80] max-w-sm">
            Technologies explored, used for active prototyping, and studied from hardware registers up to algorithmic layers.
          </p>
        </div>

        {/* Continuous Flow Marquee Banner */}
        <div className="relative w-full mb-14 overflow-hidden rounded-2xl bg-[#090908] border border-[#1b1b18] py-4">
          <div className="animate-marquee items-center gap-8 whitespace-nowrap">
            {[...ALL_SKILLS, ...ALL_SKILLS].map((item, idx) => {
              const Logo = item.logo;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="inline-flex items-center gap-2.5 text-xs font-mono text-[#99988D] hover:text-[#E1E0CC] transition-colors shrink-0 px-2"
                >
                  <Logo className="w-4 h-4 text-[#C5C4B4]" />
                  <span>{item.name}</span>
                  <span className="text-[#33322d]">/</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#1c1c19]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E1E0CC] text-[#0A0A09] font-medium shadow-md'
                  : 'bg-[#11110f] text-[#8e8d80] hover:text-[#F4F4F0] border border-[#1f1f1c]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Tactile Logo Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {filteredSkills.map((skill, index) => {
            const Logo = skill.logo;
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onClick={() => setSelectedSkill(isSelected ? null : skill)}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141412] border-[#E1E0CC]/50 shadow-[0_0_20px_rgba(225,224,204,0.06)] ring-1 ring-[#E1E0CC]/30'
                    : 'bg-[#0c0c0b] border-[#1e1e1b] hover:border-[#383730] hover:bg-[#10100e]'
                }`}
              >
                <div>
                  {/* Card Top: Logo + Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#141412] border border-[#232320] flex items-center justify-center text-[#E1E0CC] group-hover:text-[#FFFFFF] group-hover:border-[#E1E0CC]/40 transition-all">
                      <Logo className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#737268] bg-[#121210] px-2 py-0.5 rounded border border-[#1e1e1b]">
                      {skill.status}
                    </span>
                  </div>

                  {/* Name & Category */}
                  <h3 className="text-base font-semibold text-[#F4F4F0] group-hover:text-[#E1E0CC] transition-colors mb-1">
                    {skill.name}
                  </h3>
                  <span className="font-mono text-[11px] text-[#8e8d80] block mb-3 uppercase tracking-wider">
                    {skill.categoryLabel}
                  </span>

                  {/* Role */}
                  <p className="text-xs text-[#A6A596] font-light leading-relaxed mb-4 line-clamp-2">
                    {skill.role}
                  </p>
                </div>

                {/* Bottom Project Reference */}
                <div className="pt-3 border-t border-[#181816] flex items-center justify-between text-[11px] font-mono text-[#66655c]">
                  <span className="truncate">{skill.projectRef || 'Core Stack'}</span>
                  <span className="text-[#8e8d80] group-hover:text-[#E1E0CC] transition-colors ml-2">
                    {isSelected ? 'close' : 'inspect →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Telemetry Drawer */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#11110f] border border-[#2b2b27] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#171714] border border-[#2c2b26] text-[#E1E0CC] shrink-0">
                  <selectedSkill.logo className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-semibold text-[#F4F4F0]">{selectedSkill.name}</h4>
                    <span className="text-xs font-mono text-[#8e8d80] bg-[#1a1a17] px-2 py-0.5 rounded border border-[#2b2a26]">
                      {selectedSkill.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#B5B4A5] font-light leading-relaxed max-w-2xl">
                    {selectedSkill.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-4 py-2 rounded-full border border-[#2b2b27] text-xs font-mono text-[#8e8d80] hover:text-[#F4F4F0] hover:bg-[#1a1a17] transition-all cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
