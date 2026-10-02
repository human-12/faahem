'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Understand fundamentals.',
    description: 'Do not rely solely on high-level abstractions. Understand the memory, hardware interrupts, math, and data structures underneath.',
  },
  {
    num: '02',
    title: 'Build real systems.',
    description: 'Theory is validated only when code executes on machines and circuits process signals without crashing.',
  },
  {
    num: '03',
    title: 'Connect software with hardware.',
    description: 'The most interesting frontier is where intelligent algorithms leave the screen and interact with physical sensors, cameras, and microcontrollers.',
  },
  {
    num: '04',
    title: 'Experiment relentlessly.',
    description: 'Break things early. Analyze edge cases, clock jitter, dropped frames, and memory leaks to develop engineering resilience.',
  },
  {
    num: '05',
    title: 'Turn research into working prototypes.',
    description: 'Read papers and documentation not as academic trivia, but as blueprints waiting to be implemented and tested.',
  },
];

export function PhilosophySection() {
  return (
    <section className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#1a1a17]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">ENGINEERING PHILOSOPHY</span>
        </div>

        {/* Massive Headline */}
        <div className="mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#F4F4F0] uppercase max-w-5xl leading-[1.05]"
          >
            BUILD. BREAK. <br />
            UNDERSTAND. <br />
            <span className="text-[#E1E0CC]">REBUILD.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-2xl text-[#B5B4A5] font-light max-w-3xl leading-relaxed"
          >
            &ldquo;I learn by building systems, breaking them, understanding why they fail, and rebuilding them better.&rdquo;
          </motion.p>
        </div>

        {/* 5 Principles Staggered List */}
        <div className="divide-y divide-[#1c1c19] border-y border-[#1c1c19]">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group"
            >
              <div className="md:col-span-2 font-mono text-2xl sm:text-3xl font-bold text-[#44433b] group-hover:text-[#E1E0CC] transition-colors">
                {principle.num}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#F4F4F0] group-hover:text-[#E1E0CC] transition-colors">
                  {principle.title}
                </h3>
              </div>
              <div className="md:col-span-6 text-sm sm:text-base text-[#99988D] font-light leading-relaxed">
                {principle.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
