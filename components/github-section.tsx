'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, GitBranch, Terminal, FolderGit2 } from 'lucide-react';

const RECENT_EXPLORATIONS = [
  {
    repo: 'finverse-ai',
    description: 'Experimental AI financial intelligence platform investigating multi-agent RAG and graph modeling.',
    language: 'Python',
    visibility: 'Public exploration',
  },
  {
    repo: 'skin-analysis-assistant',
    description: 'Computer vision & multimodal assistant prototype for image-based skin texture triage.',
    language: 'Python / Gradio',
    visibility: 'Public prototype',
  },
  {
    repo: 'retail-shelf-cv',
    description: 'Computer vision algorithms for retail shelf inventory auditing and stock gap detection.',
    language: 'Python / OpenCV',
    visibility: 'Research concept',
  },
  {
    repo: 'embedded-vision-lab',
    description: 'Experiments exploring camera modules, ESP32-S3, and Raspberry Pi Pico edge vision pipelines.',
    language: 'C++ / MicroPython',
    visibility: 'Hardware lab',
  },
];

export function GithubSection() {
  return (
    <section id="github" className="relative w-full py-24 sm:py-32 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#1a1a17]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">OPEN SOURCE / BUILD LOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#F4F4F0]">
              Code written in the open.
            </h2>
          </div>

          <a
            href="https://github.com/human-12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#161614] border border-[#30302b] text-[#E1E0CC] hover:bg-[#20201c] hover:border-[#E1E0CC]/50 text-xs sm:text-sm font-medium tracking-wide transition-all group"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub @human-12</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* GitHub Terminal & Repository Log Preview */}
        <div className="rounded-[28px] bg-[#0c0c0b] border border-[#21211e] overflow-hidden shadow-2xl">
          {/* Terminal Top Bar */}
          <div className="px-6 py-4 bg-[#11110f] border-b border-[#1c1c19] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2925]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2925]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2925]" />
              <span className="ml-3 font-mono text-xs text-[#737268]">github.com/human-12 — workspace</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8e8d80]">
              <GitBranch className="w-3.5 h-3.5 text-[#E1E0CC]" />
              <span>main branch</span>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {RECENT_EXPLORATIONS.map((item, idx) => (
              <motion.a
                key={item.repo}
                href="https://github.com/human-12"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-6 rounded-2xl bg-[#090908] border border-[#1b1b18] hover:border-[#383730] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#E1E0CC]">
                      <FolderGit2 className="w-4 h-4 text-[#A6A596]" />
                      <span className="font-mono text-sm font-semibold tracking-tight text-[#F4F4F0] group-hover:text-[#E1E0CC] transition-colors">
                        {item.repo}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#737268]">
                      {item.visibility}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#99988D] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#161614] flex items-center justify-between text-xs font-mono text-[#8e8d80]">
                  <span className="flex items-center gap-1.5 text-[#C5C4B4]">
                    <Terminal className="w-3 h-3 text-[#E1E0CC]" />
                    {item.language}
                  </span>
                  <span className="text-[#66655c] group-hover:text-[#E1E0CC] transition-colors">
                    explore code →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="px-6 sm:px-8 py-4 bg-[#0a0a09] border-t border-[#181816] text-xs font-mono text-[#737268] flex items-center justify-between">
            <span>Repository commits & experimental logs published continuously</span>
            <span className="text-[#A6A596]">github.com/human-12</span>
          </div>
        </div>

      </div>
    </section>
  );
}
