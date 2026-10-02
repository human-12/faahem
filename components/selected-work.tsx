'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2, Github, Cpu, Eye, Network, Terminal, CheckCircle2 } from 'lucide-react';
import { ProjectWiredDiagram } from './diagrams/ProjectWiredDiagram';
import { ProjectModal, ProjectData } from './project-modal';

const PROJECTS: (ProjectData & {
  tagline: string;
  badgeAccent: string;
  icon: React.ComponentType<{ className?: string }>;
  interactiveWidget: React.ReactNode;
})[] = [
  {
    number: '01',
    title: 'FINVERSE AI',
    tagline: 'Multi-Agent Risk Modeling & Digital Twins',
    category: 'AI / Financial Intelligence / Digital Twins',
    badgeAccent: '#E1E0CC',
    icon: Network,
    description:
      'An experimental AI financial intelligence platform exploring how AI agents, graph intelligence, RAG, explainability and digital-twin concepts can be applied to financial risk, fraud and business intelligence.',
    longDescription:
      'FINVERSE AI investigates the convergence of multi-agent LLM systems with graph knowledge structures to uncover subtle systemic patterns in financial datasets. Rather than treating financial risk as isolated numerical metrics, the project explores modeling businesses as interconnected digital twins — mapping counterparty networks, supply chain vulnerabilities, and transactional graphs.',
    technologies: ['AI', 'ML', 'RAG', 'Graph AI', 'Agents', 'NLP', 'XAI'],
    status: 'Research / Prototype',
    image: '/images/finverse_ai_showcase_1790700445262.jpg',
    keyFeatures: [
      'Fraud pattern detection & anomalous transaction flows',
      'Corporate risk & SME business failure modeling',
      'Scam detection heuristics & entity graph resolution',
      'Explainable AI (XAI) transparent attribution paths',
      'Urdu NLP experimentation for regional financial documents',
      'Default prediction utilizing multi-factor behavioral graphs',
    ],
    architectureFocus:
      'Dual-layer retrieval architecture combining vector embeddings for unstructured documents with labeled property graph traversal for relational risk inference.',
    hardwareOrModelNote:
      'Local LLM inference pipelines with HuggingFace transformers, NetworkX/Neo4j graph representation, and LangGraph multi-agent orchestration.',
    githubUrl: 'https://github.com/human-12',
    interactiveWidget: (
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090908] border border-[#1b1b18] font-mono text-[11px]">
        <div>
          <span className="text-[#66655d] block">Risk Topology</span>
          <span className="text-[#E1E0CC]">Multi-Agent Graph</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Language Scope</span>
          <span className="text-[#D2D1C0]">Urdu + English NLP</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Attribution</span>
          <span className="text-emerald-400">Explainable XAI</span>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'AI SKIN ANALYSIS ASSISTANT',
    tagline: 'Computer Vision & Multimodal Diagnostic Triage',
    category: 'Multimodal AI / Computer Vision',
    badgeAccent: '#D2D1C0',
    icon: Eye,
    description:
      'An experimental AI system exploring image-based skin analysis and conversational assistance using computer vision and multimodal AI.',
    longDescription:
      'An exploration into computer vision-assisted dermatological triage and educational assistance. The system combines local feature extraction filters for texture and lesion boundary detection with multimodal LLMs that provide context-aware, empathetic explanatory dialogues and guidance.',
    technologies: ['Python', 'Computer Vision', 'Multimodal AI', 'LLMs', 'Gradio'],
    status: 'Prototype',
    image: '/images/skin_analysis_showcase_1790700466490.jpg',
    keyFeatures: [
      'Visual texture & asymmetry segmentation using computer vision',
      'Interactive conversational assistant via multimodal prompts',
      'Skin tone invariant contrast normalization',
      'Gradio-based interactive testbench for rapid inspection',
    ],
    architectureFocus:
      'Two-stage pipeline: OpenCV image pre-processing and feature masking followed by vision-language model inference for conversational reasoning.',
    hardwareOrModelNote:
      'Vision-language foundation models with local GPU quantization and lightweight OpenCV image kernels.',
    githubUrl: 'https://github.com/human-12',
    interactiveWidget: (
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090908] border border-[#1b1b18] font-mono text-[11px]">
        <div>
          <span className="text-[#66655d] block">Perception</span>
          <span className="text-[#E1E0CC]">Texture Segmentation</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Interface</span>
          <span className="text-[#D2D1C0]">Gradio Testbench</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Modalities</span>
          <span className="text-[#D2D1C0]">Vision + Dialogue</span>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'RETAIL SHELF INTELLIGENCE',
    tagline: 'Optical SKU Counting & Out-of-Stock Anomaly Detection',
    category: 'Computer Vision / Retail AI',
    badgeAccent: '#E1E0CC',
    icon: Terminal,
    description:
      'A computer vision concept for analyzing retail shelves and detecting product availability, stock gaps and shelf conditions. (e.g. Expected: 25 Coke items · Detected: 18 · Stock Gap: -7 detected).',
    longDescription:
      'Designed to address out-of-stock retail blindspots through automated visual auditing. The pipeline analyzes camera feeds overlooking store shelves, identifies SKU positions, compares detected counts against expected planograms, and flags stock gaps and facing disarray.',
    technologies: ['Python', 'OpenCV', 'Computer Vision', 'Object Detection', 'AI'],
    status: 'Prototype / Research',
    image: '/images/retail_shelf_cv_1790700482945.jpg',
    keyFeatures: [
      'Multi-class FMCG product detection & bounding box estimation',
      'Planogram comparison & out-of-stock anomaly calculation',
      'Occlusion handling across packed merchandise facings',
      'Real-time retail inventory intelligence generation',
    ],
    architectureFocus:
      'Custom fine-tuned detection models combined with planar geometric perspective transformation to flatten oblique shelf camera angles.',
    hardwareOrModelNote:
      'OpenCV for homography and color correction; lightweight convolutional detectors optimized for edge video streams.',
    githubUrl: 'https://github.com/human-12',
    interactiveWidget: (
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090908] border border-[#1b1b18] font-mono text-[11px]">
        <div>
          <span className="text-[#66655d] block">Expected SKU</span>
          <span className="text-[#D2D1C0]">25 Units</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Optical Count</span>
          <span className="text-[#E1E0CC] font-bold">18 Detected</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Inventory Delta</span>
          <span className="text-amber-400 font-bold">-7 [Gap Alert]</span>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'EMBEDDED VISION LAB',
    tagline: 'TinyML Microcontroller Firmware & Sensor Fusion',
    category: 'Embedded Systems / Edge AI',
    badgeAccent: '#D2D1C0',
    icon: Cpu,
    description:
      'A growing collection of experiments exploring cameras, microcontrollers, sensors and computer vision at the physical edge on ESP32-S3 and Raspberry Pi Pico.',
    longDescription:
      'A hands-on laboratory playground testing what happens when vision models are compressed and deployed directly onto low-power microcontrollers without cloud connectivity. The experiments explore camera interfaces, DMA buffers, hardware interrupts, and real-time sensor fusion.',
    technologies: ['ESP32-S3', 'Raspberry Pi Pico', 'Camera Modules', 'Sensors', 'C++'],
    status: 'Learning / Experimental',
    image: '/images/embedded_vision_lab_1790700500489.jpg',
    keyFeatures: [
      'ESP32-S3 OV2640 camera capture & frame buffer streaming',
      'Raspberry Pi Pico RP2040 sensor acquisition & SPI communication',
      'Ultrasonic & infrared sensor fusion with visual cues',
      'Low-latency on-device TinyML classification testbed',
    ],
    architectureFocus:
      'Direct register-level sensor polling and DMA transfers to minimize latency and memory footprints under tight SRAM budgets.',
    hardwareOrModelNote:
      'Microcontrollers (ESP32-S3 Dual-Core Xtensa LX7, RP2040 Dual ARM Cortex-M0+), OV2640/OV5640 sensors, I2C/SPI peripherals.',
    githubUrl: 'https://github.com/human-12',
    interactiveWidget: (
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#090908] border border-[#1b1b18] font-mono text-[11px]">
        <div>
          <span className="text-[#66655d] block">Hardware Target</span>
          <span className="text-[#E1E0CC]">ESP32-S3 + Pico</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Vision Sensor</span>
          <span className="text-[#D2D1C0]">OV2640 DVP</span>
        </div>
        <div>
          <span className="text-[#66655d] block">Inference Mode</span>
          <span className="text-emerald-400">Zero Cloud / Onboard</span>
        </div>
      </div>
    ),
  },
];

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="work" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#181816]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-[#F4F4F0]">
              Projects & prototypes.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#8e8d80] max-w-md">
            Projects built while exploring the intersection of AI, engineering, and real-world physical systems.
          </p>
        </div>

        {/* Masterclass Project Exhibition Cards */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            const Icon = project.icon;

            return (
              <motion.article
                key={project.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                className="group relative rounded-[32px] sm:rounded-[40px] bg-[#0c0c0b] border border-[#21211e] hover:border-[#383730] transition-all duration-300 overflow-hidden shadow-2xl p-6 sm:p-8 md:p-12"
              >
                {/* Subtle top edge specular reflection */}
                <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/20 to-transparent" />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Architectural Wired Vector Diagram Window */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#080807] border border-[#21211e] group-hover:border-[#E1E0CC]/50 transition-all ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <ProjectWiredDiagram projectId={project.title} />

                    {/* Quick Expand Badge */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#383730] text-xs font-mono text-[#E1E0CC] hover:bg-[#1a1a17] hover:border-[#E1E0CC]/60 transition-all cursor-pointer shadow-xl"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect Schematic</span>
                    </button>
                  </div>

                  {/* Text Editorial Content */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div>
                      {/* Meta Line */}
                      <div className="flex items-center justify-between pb-6 border-b border-[#1c1c19] mb-6">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl font-bold font-mono text-[#383730] group-hover:text-[#E1E0CC] transition-colors">
                            {project.number}
                          </span>
                          <span className="text-[#3b3a32]">/</span>
                          <span className="text-xs font-mono tracking-wider uppercase text-[#8e8d80]">
                            {project.category}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#737268] bg-[#141412] px-2.5 py-1 rounded-full border border-[#232320]">
                          {project.status}
                        </span>
                      </div>

                      {/* Tagline & Title */}
                      <span className="text-xs font-mono text-[#8e8d80] uppercase tracking-wider block mb-1">
                        {project.tagline}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#F4F4F0] group-hover:text-[#E1E0CC] transition-colors mb-4">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-[#A6A596] leading-relaxed font-light mb-6">
                        {project.description}
                      </p>

                      {/* Live In-Card Telemetry Widget */}
                      <div className="mb-6">
                        {project.interactiveWidget}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-6 border-t border-[#1a1a17] flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#737268]">
                        {project.technologies.map((t, idx) => (
                          <React.Fragment key={t}>
                            <span className="text-[#B5B4A5]">{t}</span>
                            {idx < project.technologies.length - 1 && (
                              <span className="text-[#33322c]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 rounded-full border border-[#2b2b27] bg-[#141412] text-xs font-mono text-[#D2D1C0] hover:text-[#0A0A09] hover:bg-[#E1E0CC] transition-all cursor-pointer"
                        >
                          View Details
                        </button>
                        <a
                          href={project.githubUrl || 'https://github.com/human-12'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full border border-[#2b2b27] bg-[#141412] flex items-center justify-center text-[#737268] hover:text-[#E1E0CC] hover:border-[#E1E0CC]/50 transition-all"
                          aria-label={`View ${project.title} code repository`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Expanded Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
