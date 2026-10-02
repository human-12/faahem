'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Network, Layers, Sparkles, Binary, Compass, Terminal } from 'lucide-react';

const INTEREST_AREAS = [
  { name: 'Artificial Intelligence', icon: Sparkles },
  { name: 'Machine Learning', icon: Binary },
  { name: 'Computer Vision', icon: Eye },
  { name: 'Embedded Systems', icon: Cpu },
  { name: 'Robotics', icon: Layers },
  { name: 'Digital Twins', icon: Network },
  { name: 'Edge AI', icon: Terminal },
  { name: 'Software Engineering', icon: Compass },
  { name: 'Research', icon: Sparkles },
];

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#1a1a17]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">WHO I AM</span>
        </div>

        {/* Large Editorial Statement */}
        <div className="mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.18] tracking-[-0.03em] text-[#F4F4F0] max-w-5xl"
          >
            I&apos;m a Computer Engineering student building toward the intersection of{' '}
            <span className="text-[#E1E0CC] font-medium underline decoration-[#44433c] underline-offset-8">
              intelligent software
            </span>{' '}
            and{' '}
            <span className="text-[#E1E0CC] font-medium underline decoration-[#44433c] underline-offset-8">
              intelligent machines
            </span>.
          </motion.h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Story & Context */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#B5B4A5] font-light leading-relaxed">
            <p>
              I&apos;m currently a freshman at{' '}
              <strong className="text-[#F4F4F0] font-medium">FAST-NUCES</strong>, pursuing a BS in{' '}
              <strong className="text-[#F4F4F0] font-medium">Computer Engineering</strong> from{' '}
              <span className="font-mono text-sm text-[#E1E0CC]">2026 to 2030</span>.
            </p>
            <p>
              The goal is not simply to use existing AI tools, but to understand how intelligent systems work
              from the software layer all the way down to hardware — from algorithmic models and vision pipelines to
              the silicon, buses, and sensors that execute them in physical reality.
            </p>
            <p className="text-[#8e8d80] text-sm sm:text-base">
              Early in the journey, building with relentless curiosity, writing code daily, testing circuits, and
              refining intuition through prototypes.
            </p>
          </div>

          {/* Right Column: Academic Details & Connected Focus Areas */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Academic Snapshot Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0c0b] border border-[#20201c] shadow-lg">
              <span className="font-mono text-xs uppercase tracking-wider text-[#737268] block mb-3">
                ACADEMIC PROFILE
              </span>
              <h3 className="text-lg font-semibold text-[#F4F4F0] mb-1">
                FAST National University
              </h3>
              <p className="text-xs sm:text-sm text-[#99988D] mb-4">
                FAST-NUCES · Islamabad, Pakistan
              </p>
              <div className="pt-3 border-t border-[#1c1c19] flex items-center justify-between text-xs font-mono text-[#D2D1C0]">
                <span>Degree: BS Computer Engineering</span>
                <span className="text-[#E1E0CC]">2026 — 2030</span>
              </div>
            </div>

            {/* Core Interest Spectrum */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0a0a09] border border-[#1b1b18]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#737268] block mb-4">
                CONNECTED FOCUS AREAS
              </span>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                {INTEREST_AREAS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="flex items-center gap-2 text-xs sm:text-sm text-[#D2D1C0]">
                      <Icon className="w-3.5 h-3.5 text-[#E1E0CC] opacity-80 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
