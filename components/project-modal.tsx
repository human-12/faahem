'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { ProjectWiredDiagram } from './diagrams/ProjectWiredDiagram';

export interface ProjectData {
  number: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: string;
  image: string;
  keyFeatures: string[];
  architectureFocus: string;
  hardwareOrModelNote?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-[#0c0c0b] border border-[#2b2b27] shadow-2xl text-[#F4F4F0] z-10"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-5 bg-[#0c0c0b]/90 backdrop-blur-md border-b border-[#1c1c19]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">
                PROJECT {project.number}
              </span>
              <span className="text-[#44433d]">/</span>
              <span className="font-mono text-xs text-[#E1E0CC]">{project.status}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#181816] text-[#99988D] hover:text-[#F4F4F0] hover:bg-[#252522] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Project Architectural Wired Schematic */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#232320] bg-[#080807] shadow-2xl">
              <ProjectWiredDiagram projectId={project.title} />
            </div>

            {/* Title & Category */}
            <div>
              <span className="font-mono text-xs tracking-wider text-[#A6A596] uppercase block mb-2">
                {project.category}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F4F0]">
                {project.title}
              </h2>
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 text-base sm:text-lg text-[#BDBCAE] leading-relaxed font-light">
              <p>{project.longDescription}</p>
            </div>

            {/* Key Capabilities / Focus Areas */}
            <div className="p-6 rounded-2xl bg-[#121210] border border-[#21211e]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-wider uppercase text-[#E1E0CC]">
                <Sparkles className="w-4 h-4 text-[#E1E0CC]" />
                <span>Exploration Scope & Subsystems</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#D2D1C0]">
                {project.keyFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8e8d80] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture / Hardware Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e0e0d] border border-[#1e1e1b]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#8e8d80] uppercase">
                  <Layers className="w-4 h-4 text-[#A6A596]" />
                  <span>Architecture Concept</span>
                </div>
                <p className="text-sm text-[#B5B4A5] leading-relaxed">
                  {project.architectureFocus}
                </p>
              </div>

              {project.hardwareOrModelNote && (
                <div className="p-5 rounded-2xl bg-[#0e0e0d] border border-[#1e1e1b]">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#8e8d80] uppercase">
                    <Cpu className="w-4 h-4 text-[#A6A596]" />
                    <span>Hardware / Model Stack</span>
                  </div>
                  <p className="text-sm text-[#B5B4A5] leading-relaxed">
                    {project.hardwareOrModelNote}
                  </p>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div className="pt-4 border-t border-[#1c1c19]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#737268] block mb-3">
                TECHNOLOGY & TOOLING
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-[#D2D1C0]">
                {project.technologies.map((t, idx) => (
                  <React.Fragment key={t}>
                    <span className="text-[#E1E0CC]">{t}</span>
                    {idx < project.technologies.length - 1 && (
                      <span className="text-[#3b3a34]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#737268]">
                Status: {project.status} (Experimental / Academic Investigation)
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl || 'https://github.com/human-12'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] text-xs font-medium hover:bg-[#F2F1E6] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
