'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Eye, Network, Zap, Radio, ChevronRight } from 'lucide-react';

const RESEARCH_TOPICS = [
  {
    id: 'embedded-ai',
    title: 'AI × Embedded Systems',
    description: 'Intelligent systems operating under real-world hardware constraints, microsecond clock cycles, and limited power envelopes.',
    icon: Cpu,
    tag: 'Hardware AI',
    hypothesis: 'Can quantized transformer attention blocks execute within 512KB SRAM on dual-core microcontrollers using fixed-point SIMD?',
  },
  {
    id: 'edge-ai',
    title: 'Edge AI & Low Latency',
    description: 'Running machine learning models closer to where data is generated — eliminating cloud round-trip latency and network jitter.',
    icon: Zap,
    tag: 'Zero Cloud',
    hypothesis: 'Balancing inference frame-rates against thermal throttling across constrained edge vision coprocessors.',
  },
  {
    id: 'digital-twins',
    title: 'Digital Twins & State Sync',
    description: 'Connecting physical systems, sensor telemetry, simulation, and predictive AI feedback into unified cyber-physical graphs.',
    icon: Network,
    tag: 'Cyber-Physical',
    hypothesis: 'Achieving sub-2ms state convergence between asynchronous physical I2C sensors and digital graph state machines.',
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Spatial Perception',
    description: 'Teaching machines to understand visual environments, detect spatial context, and interpret scenes under changing lighting.',
    icon: Eye,
    tag: 'Perception',
    hypothesis: 'Combining homography perspective rectification with lightweight feature pyramids for dense retail shelf auditing.',
  },
  {
    id: 'intelligent-systems',
    title: 'Autonomous Intelligent Systems',
    description: 'Combining multi-modal sensors, on-device compute, and decision policies into coherent autonomous actors.',
    icon: Radio,
    tag: 'Autonomy',
    hypothesis: 'Closed-loop feedback architectures where sensor anomalies trigger dynamic runtime model pruning and reallocation.',
  },
];

const EXPLORING_TOPICS = [
  'AI',
  'Embedded Systems',
  'Computer Vision',
  'Digital Twins',
  'Edge AI',
  'Robotics',
  'Machine Learning',
  'Computer Engineering',
];

export function ResearchSection() {
  const [activeTopic, setActiveTopic] = useState<string>(RESEARCH_TOPICS[0].id);

  return (
    <section id="research" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#181816]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">RESEARCH VECTORS</span>
        </div>

        {/* Large Statement */}
        <div className="mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.03em] text-[#F4F4F0] max-w-4xl leading-tight"
          >
            I&apos;m interested in research that connects{' '}
            <span className="text-[#E1E0CC]">artificial intelligence</span> with{' '}
            <span className="text-[#E1E0CC]">physical systems</span>.
          </motion.h2>
          <p className="mt-4 text-sm sm:text-base text-[#8e8d80] font-light max-w-2xl">
            Focusing on foundational understanding and prototyping early experiments in preparation for formal academic investigations.
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {RESEARCH_TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            const isSelected = activeTopic === topic.id;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                onClick={() => setActiveTopic(topic.id)}
                className={`relative p-8 rounded-[28px] border transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl ${
                  isSelected
                    ? 'bg-[#11110f] border-[#E1E0CC]/50 shadow-[0_0_24px_rgba(225,224,204,0.06)]'
                    : 'bg-[#0c0c0b] border-[#21211e] hover:border-[#383730]'
                }`}
              >
                {/* Hairline highlight */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/15 to-transparent" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-2xl bg-[#141412] text-[#E1E0CC] border border-[#232320]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#737268] tracking-wider uppercase">
                      {topic.tag}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#F4F4F0] mb-3">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-[#A6A596] leading-relaxed font-light mb-5">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181816] text-[11px] font-mono text-[#8e8d80]">
                  <span className="text-[#636259] block mb-1">Investigation Hypothesis:</span>
                  <span className="text-[#C5C4B4] italic line-clamp-2">
                    &ldquo;{topic.hypothesis}&rdquo;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Currently Exploring" Stream Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090909] border border-[#1e1e1b] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#737268] block mb-2">
              ACADEMIC CURIOSITY
            </span>
            <h4 className="text-base sm:text-lg font-medium text-[#F4F4F0]">
              Currently reading, prototyping & exploring
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-mono text-[#D2D1C0]">
            {EXPLORING_TOPICS.map((topic, index) => (
              <React.Fragment key={topic}>
                <span className="text-[#E1E0CC] hover:text-[#FFFFFF] transition-colors cursor-default">
                  {topic}
                </span>
                {index < EXPLORING_TOPICS.length - 1 && (
                  <span className="text-[#3d3c34]">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
