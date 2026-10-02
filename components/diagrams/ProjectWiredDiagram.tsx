'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectWiredDiagramProps {
  projectId: string;
  className?: string;
  interactive?: boolean;
}

export function ProjectWiredDiagram({
  projectId,
  className = '',
  interactive = true,
}: ProjectWiredDiagramProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Normalize project id
  const pid = projectId.toLowerCase();

  if (pid.includes('finverse') || pid.includes('01')) {
    return <FinverseWiredDiagram activeNode={activeNode} setActiveNode={setActiveNode} className={className} />;
  }

  if (pid.includes('skin') || pid.includes('02')) {
    return <SkinAnalysisWiredDiagram activeNode={activeNode} setActiveNode={setActiveNode} className={className} />;
  }

  if (pid.includes('retail') || pid.includes('shelf') || pid.includes('03')) {
    return <RetailShelfWiredDiagram activeNode={activeNode} setActiveNode={setActiveNode} className={className} />;
  }

  // Default to embedded vision lab
  return <EmbeddedVisionWiredDiagram activeNode={activeNode} setActiveNode={setActiveNode} className={className} />;
}

// =============================================================================
// 1. FINVERSE AI: MULTI-AGENT GRAPH & DIGITAL TWIN WIRED TOPOLOGY DIAGRAM
// =============================================================================
function FinverseWiredDiagram({
  activeNode,
  setActiveNode,
  className,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full bg-[#080807] overflow-hidden select-none font-mono ${className}`}>
      {/* Precision CAD Matrix Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cad-grid-finverse" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E1E0CC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-finverse)" />
      </svg>

      {/* Main Vector Schematic */}
      <svg
        viewBox="0 0 800 500"
        className="relative z-10 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Signal Pulse Gradient */}
          <linearGradient id="wire-glow-cream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E1E0CC" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E1E0CC" stopOpacity="0.2" />
          </linearGradient>

          {/* Marker arrows */}
          <marker id="arrow-cream" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#E1E0CC" />
          </marker>
        </defs>

        {/* Blueprint Metadata Header */}
        <g opacity="0.8">
          <text x="30" y="35" fill="#E1E0CC" fontSize="11" letterSpacing="2" fontWeight="700">
            SCHEMATIC // FINVERSE-TOPOLOGY-V2
          </text>
          <text x="30" y="52" fill="#737268" fontSize="9" letterSpacing="1">
            MULTI-AGENT ORCHESTRATION &bull; DUAL-LAYER RAG &bull; GRAPH XAI
          </text>
          <rect x="710" y="24" width="60" height="18" rx="4" fill="#141412" stroke="#2b2b27" strokeWidth="1" />
          <text x="740" y="36" fill="#34D399" fontSize="9" textAnchor="middle" fontWeight="bold">SYNCED</text>
        </g>

        {/* ===================================================================
            BUS CONDUITS & INTERCONNECT WIRES
           =================================================================== */}
        
        {/* Document Ingestion Bus -> Vector Database */}
        <path
          d="M 160 150 L 260 150 L 260 210 L 320 210"
          fill="none"
          stroke="#3d3c35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Live Signal Pulse */}
        <path
          d="M 160 150 L 260 150 L 260 210 L 320 210"
          fill="none"
          stroke="#E1E0CC"
          strokeWidth="1.8"
          strokeDasharray="12 120"
          className="animate-[dash_6s_linear_infinite]"
        />

        {/* Entity Graph Ingestion -> Property Graph */}
        <path
          d="M 160 330 L 260 330 L 260 280 L 320 280"
          fill="none"
          stroke="#3d3c35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Dual Layer Core -> Agent Swarm Hub */}
        <path
          d="M 430 250 L 490 250"
          fill="none"
          stroke="#E1E0CC"
          strokeWidth="2"
          markerEnd="url(#arrow-cream)"
        />

        {/* Agent Swarm -> Output Attribution */}
        <path
          d="M 600 210 L 660 210 L 660 250"
          fill="none"
          stroke="#3d3c35"
          strokeWidth="1.5"
        />
        <path
          d="M 600 290 L 660 290 L 660 250"
          fill="none"
          stroke="#3d3c35"
          strokeWidth="1.5"
        />
        <path
          d="M 660 250 L 710 250"
          fill="none"
          stroke="#E1E0CC"
          strokeWidth="2"
          markerEnd="url(#arrow-cream)"
        />

        {/* Digital Twin Feedback Loop */}
        <path
          d="M 545 350 L 545 420 L 200 420 L 200 370"
          fill="none"
          stroke="#E1E0CC"
          strokeWidth="1"
          strokeDasharray="6 6"
          opacity="0.4"
        />
        <text x="370" y="412" fill="#737268" fontSize="8" textAnchor="middle" letterSpacing="1">
          &lt;&lt; RECURRENT DIGITAL-TWIN COUNTERFACTUAL VERIFICATION &gt;&gt;
        </text>

        {/* ===================================================================
            ARCHITECTURAL SCHEMATIC MODULE BLOCKS
           =================================================================== */}

        {/* 1. Unstructured Ingest Node */}
        <g
          onMouseEnter={() => setActiveNode('doc-in')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <rect x="40" y="115" width="120" height="70" rx="8" fill="#0f0f0e" stroke={activeNode === 'doc-in' ? '#FFFFFF' : '#262622'} strokeWidth="1.5" />
          <text x="50" y="138" fill="#8e8d80" fontSize="8" letterSpacing="1">STREAM 01</text>
          <text x="50" y="155" fill="#E1E0CC" fontSize="11" fontWeight="bold">DOCUMENTS</text>
          <text x="50" y="170" fill="#66655c" fontSize="8">PDF / SEC / Urdu NLP</text>
        </g>

        {/* 2. Structured Graph Ingest Node */}
        <g
          onMouseEnter={() => setActiveNode('graph-in')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <rect x="40" y="295" width="120" height="70" rx="8" fill="#0f0f0e" stroke={activeNode === 'graph-in' ? '#FFFFFF' : '#262622'} strokeWidth="1.5" />
          <text x="50" y="318" fill="#8e8d80" fontSize="8" letterSpacing="1">STREAM 02</text>
          <text x="50" y="335" fill="#E1E0CC" fontSize="11" fontWeight="bold">GRAPH LEDGER</text>
          <text x="50" y="350" fill="#66655c" fontSize="8">Transactions / Accounts</text>
        </g>

        {/* 3. Dual-Layer Core: Vector Embeddings + Labeled Graph */}
        <g
          onMouseEnter={() => setActiveNode('dual-core')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <rect x="320" y="170" width="110" height="150" rx="10" fill="#0c0c0b" stroke={activeNode === 'dual-core' ? '#FFFFFF' : '#33322b'} strokeWidth="1.8" />
          
          {/* Internal sub-blocks */}
          <rect x="330" y="185" width="90" height="50" rx="4" fill="#141412" stroke="#232320" strokeWidth="1" />
          <text x="375" y="205" fill="#E1E0CC" fontSize="9" textAnchor="middle" fontWeight="bold">VECTOR DB</text>
          <text x="375" y="222" fill="#737268" fontSize="8" textAnchor="middle">Dense Chunks</text>

          <rect x="330" y="250" width="90" height="50" rx="4" fill="#141412" stroke="#232320" strokeWidth="1" />
          <text x="375" y="270" fill="#E1E0CC" fontSize="9" textAnchor="middle" fontWeight="bold">GRAPH RAG</text>
          <text x="375" y="287" fill="#737268" fontSize="8" textAnchor="middle">Property Nodes</text>
        </g>

        {/* 4. Multi-Agent Reasoning Swarm Hub */}
        <g
          onMouseEnter={() => setActiveNode('agent-swarm')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <rect x="490" y="170" width="110" height="155" rx="10" fill="#11110f" stroke={activeNode === 'agent-swarm' ? '#FFFFFF' : '#E1E0CC'} strokeWidth="1.5" />
          <text x="545" y="195" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">AGENT SWARM</text>
          
          {/* Agent Pill 1 */}
          <rect x="500" y="210" width="90" height="24" rx="4" fill="#181816" stroke="#2b2b27" strokeWidth="1" />
          <text x="545" y="225" fill="#D2D1C0" fontSize="8" textAnchor="middle">Risk Traversal</text>

          {/* Agent Pill 2 */}
          <rect x="500" y="242" width="90" height="24" rx="4" fill="#181816" stroke="#2b2b27" strokeWidth="1" />
          <text x="545" y="257" fill="#D2D1C0" fontSize="8" textAnchor="middle">Audit Synthesizer</text>

          {/* Agent Pill 3 */}
          <rect x="500" y="274" width="90" height="24" rx="4" fill="#181816" stroke="#2b2b27" strokeWidth="1" />
          <text x="545" y="289" fill="#D2D1C0" fontSize="8" textAnchor="middle">Digital Twin Loop</text>
        </g>

        {/* 5. Explainable Attribution Output */}
        <g
          onMouseEnter={() => setActiveNode('output')}
          onMouseLeave={() => setActiveNode(null)}
          className="cursor-pointer"
        >
          <rect x="710" y="215" width="70" height="70" rx="8" fill="#141412" stroke={activeNode === 'output' ? '#FFFFFF' : '#34D399'} strokeWidth="1.5" />
          <text x="745" y="245" fill="#34D399" fontSize="9" textAnchor="middle" fontWeight="bold">XAI OUTPUT</text>
          <text x="745" y="260" fill="#8e8d80" fontSize="7" textAnchor="middle">Sub-Graph</text>
          <text x="745" y="272" fill="#8e8d80" fontSize="7" textAnchor="middle">Confidence</text>
        </g>

        {/* Live Coordinate Reticle Bottom */}
        <g opacity="0.6">
          <text x="30" y="475" fill="#66655c" fontSize="8">NODE_ADDR: 0x88F4 &bull; LATENCY: 12ms &bull; MODEL: LOCAL-QUANT-8B</text>
          <line x1="30" y1="460" x2="770" y2="460" stroke="#1c1c19" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

// =============================================================================
// 2. AI SKIN ANALYSIS: OPTICAL SEGMENTATION & MULTIMODAL CAD RETICLE
// =============================================================================
function SkinAnalysisWiredDiagram({
  activeNode,
  setActiveNode,
  className,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full bg-[#080807] overflow-hidden select-none font-mono ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cad-grid-skin" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E1E0CC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-skin)" />
      </svg>

      <svg viewBox="0 0 800 500" className="relative z-10 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Header */}
        <text x="30" y="35" fill="#E1E0CC" fontSize="11" letterSpacing="2" fontWeight="700">
          OPTICAL PIPELINE // DERMA-VISION-SEGMENTATION
        </text>
        <text x="30" y="52" fill="#737268" fontSize="9" letterSpacing="1">
          IMAGE KERNEL FILTERING &bull; CONTOUR ASYMMETRY &bull; MULTIMODAL VLM
        </text>

        {/* Main Viewfinder Optical Reticle Box */}
        <rect x="50" y="90" width="320" height="340" rx="14" fill="#0b0b0a" stroke="#232320" strokeWidth="1.5" />
        <text x="70" y="120" fill="#737268" fontSize="9">OPTICAL VIEWPORT #01</text>
        
        {/* Viewfinder Target Brackets */}
        <g stroke="#E1E0CC" strokeWidth="2" fill="none">
          <path d="M 100 170 L 100 150 L 120 150" />
          <path d="M 320 170 L 320 150 L 300 150" />
          <path d="M 100 350 L 100 370 L 120 370" />
          <path d="M 320 350 L 320 370 L 300 370" />
        </g>

        {/* Center Target Segmentation Wireframe */}
        <ellipse cx="210" cy="260" rx="65" ry="80" fill="none" stroke="#3d3c35" strokeWidth="1.5" strokeDasharray="3 3" />
        <ellipse cx="210" cy="260" rx="45" ry="55" fill="none" stroke="#E1E0CC" strokeWidth="1.8" />
        <circle cx="210" cy="260" r="3" fill="#E1E0CC" />

        {/* Asymmetry Vector Axes */}
        <line x1="210" y1="160" x2="210" y2="360" stroke="#E1E0CC" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <line x1="120" y1="260" x2="300" y2="260" stroke="#E1E0CC" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* Bounding Box Coordinates Label */}
        <rect x="130" y="385" width="160" height="24" rx="4" fill="#141412" stroke="#2b2b27" strokeWidth="1" />
        <text x="210" y="401" fill="#E1E0CC" fontSize="8" textAnchor="middle">
          ROI: [120, 150, 300, 370] CONF: 0.962
        </text>

        {/* Connecting Data Bus Line */}
        <path d="M 370 260 L 460 260" fill="none" stroke="#E1E0CC" strokeWidth="2" strokeDasharray="8 8" />

        {/* Feature Extraction Node */}
        <g className="cursor-pointer">
          <rect x="460" y="140" width="130" height="240" rx="10" fill="#0f0f0e" stroke="#2b2b27" strokeWidth="1.5" />
          <text x="525" y="170" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">OPENCV KERNEL</text>

          {/* Sub feature bars */}
          <rect x="475" y="195" width="100" height="35" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="485" y="212" fill="#D2D1C0" fontSize="8">Texture (LBP)</text>
          <text x="485" y="224" fill="#737268" fontSize="7">Homogeneity 0.84</text>

          <rect x="475" y="240" width="100" height="35" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="485" y="257" fill="#D2D1C0" fontSize="8">Sobel Contour</text>
          <text x="485" y="269" fill="#737268" fontSize="7">Edge Gradient 0.72</text>

          <rect x="475" y="285" width="100" height="35" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="485" y="302" fill="#D2D1C0" fontSize="8">Color Norm</text>
          <text x="485" y="314" fill="#737268" fontSize="7">Illumination Invariant</text>
        </g>

        {/* Connector to Multimodal LLM */}
        <path d="M 590 260 L 650 260" fill="none" stroke="#E1E0CC" strokeWidth="2" />

        {/* Multimodal Diagnostic Assistant Node */}
        <g className="cursor-pointer">
          <rect x="650" y="170" width="120" height="180" rx="10" fill="#141412" stroke="#E1E0CC" strokeWidth="1.5" />
          <text x="710" y="205" fill="#E1E0CC" fontSize="10" textAnchor="middle" fontWeight="bold">MULTIMODAL</text>
          <text x="710" y="220" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">ASSISTANT</text>
          
          <rect x="662" y="240" width="96" height="40" rx="4" fill="#1b1b18" stroke="#2b2b27" strokeWidth="1" />
          <text x="710" y="257" fill="#34D399" fontSize="8" textAnchor="middle">TRIAGE READY</text>
          <text x="710" y="270" fill="#8e8d80" fontSize="7" textAnchor="middle">Explanatory Report</text>

          <rect x="662" y="290" width="96" height="40" rx="4" fill="#1b1b18" stroke="#2b2b27" strokeWidth="1" />
          <text x="710" y="307" fill="#D2D1C0" fontSize="8" textAnchor="middle">GRADIO UI</text>
          <text x="710" y="320" fill="#8e8d80" fontSize="7" textAnchor="middle">Interactive Testbench</text>
        </g>

        {/* Footer info */}
        <text x="30" y="475" fill="#66655c" fontSize="8">
          FRAME_RATE: 30 FPS &bull; KERNEL: 5x5 GAUSSIAN &bull; RES: 1024x1024 NORMALIZED
        </text>
      </svg>
    </div>
  );
}

// =============================================================================
// 3. RETAIL SHELF INTELLIGENCE: PLANOGRAM & OPTICAL SKU DETECTOR CAD
// =============================================================================
function RetailShelfWiredDiagram({
  activeNode,
  setActiveNode,
  className,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full bg-[#080807] overflow-hidden select-none font-mono ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cad-grid-shelf" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E1E0CC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-shelf)" />
      </svg>

      <svg viewBox="0 0 800 500" className="relative z-10 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Header */}
        <text x="30" y="35" fill="#E1E0CC" fontSize="11" letterSpacing="2" fontWeight="700">
          PLANOGRAM AUDIT // RETAIL-CV-CAD
        </text>
        <text x="30" y="52" fill="#737268" fontSize="9" letterSpacing="1">
          HOMOGRAPHY PLANAR PERSPECTIVE &bull; SKU BOUNDING RETICLES &bull; GAP DETECTION
        </text>

        {/* Shelf Planogram Matrix Frame */}
        <rect x="40" y="85" width="460" height="350" rx="12" fill="#0a0a09" stroke="#232320" strokeWidth="1.5" />
        
        {/* Shelf Tier 1 (Top) */}
        <line x1="40" y1="200" x2="500" y2="200" stroke="#33322b" strokeWidth="2" />
        <text x="55" y="110" fill="#737268" fontSize="8">SHELF TIER 01: BEVERAGES (330ML CANS)</text>

        {/* SKU Row 1 Detections */}
        {[
          { x: 60, title: 'COKE', conf: '98%', status: 'detected' },
          { x: 120, title: 'COKE', conf: '99%', status: 'detected' },
          { x: 180, title: 'COKE', conf: '97%', status: 'detected' },
          { x: 240, title: 'COKE', conf: '98%', status: 'detected' },
          { x: 300, title: 'PEPSI', conf: '0%', status: 'gap' },
          { x: 360, title: 'PEPSI', conf: '0%', status: 'gap' },
          { x: 420, title: 'SPRITE', conf: '96%', status: 'detected' },
        ].map((sku, i) => (
          <g key={i}>
            <rect
              x={sku.x}
              y={125}
              width={50}
              height={65}
              rx={4}
              fill={sku.status === 'gap' ? 'rgba(239, 68, 68, 0.1)' : '#121210'}
              stroke={sku.status === 'gap' ? '#ef4444' : '#E1E0CC'}
              strokeWidth={sku.status === 'gap' ? 1.5 : 1.2}
              strokeDasharray={sku.status === 'gap' ? '4 2' : 'none'}
            />
            <text x={sku.x + 25} y={150} fill={sku.status === 'gap' ? '#ef4444' : '#E1E0CC'} fontSize="8" textAnchor="middle" fontWeight="bold">
              {sku.title}
            </text>
            <text x={sku.x + 25} y={165} fill={sku.status === 'gap' ? '#ef4444' : '#737268'} fontSize="7" textAnchor="middle">
              {sku.status === 'gap' ? 'OOS GAP' : sku.conf}
            </text>
          </g>
        ))}

        {/* Shelf Tier 2 (Bottom) */}
        <line x1="40" y1="330" x2="500" y2="330" stroke="#33322b" strokeWidth="2" />
        <text x="55" y="235" fill="#737268" fontSize="8">SHELF TIER 02: DRY GOODS</text>

        {/* SKU Row 2 Detections */}
        {[
          { x: 60, title: 'SKU-A', conf: '95%' },
          { x: 130, title: 'SKU-A', conf: '94%' },
          { x: 200, title: 'SKU-B', conf: '99%' },
          { x: 270, title: 'SKU-B', conf: '97%' },
          { x: 340, title: 'SKU-C', conf: '92%' },
          { x: 410, title: 'SKU-C', conf: '98%' },
        ].map((sku, i) => (
          <g key={i}>
            <rect x={sku.x} y={250} width={60} height={70} rx={4} fill="#121210" stroke="#C5C4B4" strokeWidth="1" />
            <text x={sku.x + 30} y={280} fill="#D2D1C0" fontSize="8" textAnchor="middle">{sku.title}</text>
            <text x={sku.x + 30} y={298} fill="#737268" fontSize="7" textAnchor="middle">{sku.conf}</text>
          </g>
        ))}

        {/* Perspective Homography Transformation Indicator */}
        <path d="M 500 260 L 540 260" fill="none" stroke="#E1E0CC" strokeWidth="2" />

        {/* Inventory Analytics & Gap Resolution Node */}
        <g>
          <rect x="540" y="110" width="220" height="300" rx="12" fill="#0f0f0e" stroke="#2b2b27" strokeWidth="1.5" />
          <text x="650" y="140" fill="#E1E0CC" fontSize="10" textAnchor="middle" fontWeight="bold">INVENTORY TELEMETRY</text>

          {/* Metric 1 */}
          <rect x="555" y="160" width="190" height="48" rx="6" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="570" y="180" fill="#8e8d80" fontSize="8">COCA-COLA 330ML</text>
          <text x="570" y="196" fill="#E1E0CC" fontSize="10" fontWeight="bold">EXP 25 &bull; DETECTED 18 (-7)</text>

          {/* Metric 2 Critical Alert */}
          <rect x="555" y="220" width="190" height="52" rx="6" fill="#181111" stroke="#4a1d1d" strokeWidth="1" />
          <text x="570" y="240" fill="#ef4444" fontSize="8" fontWeight="bold">CRITICAL STOCKOUT DETECTED</text>
          <text x="570" y="258" fill="#fca5a5" fontSize="10" fontWeight="bold">PEPSI: -10 EMPTY FACINGS</text>

          {/* Metric 3 Compliance Score */}
          <rect x="555" y="285" width="190" height="48" rx="6" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="570" y="305" fill="#8e8d80" fontSize="8">PLANOGRAM COMPLIANCE</text>
          <text x="570" y="322" fill="#34D399" fontSize="10" fontWeight="bold">82.4% AUDIT INDEX</text>

          {/* Action Trigger */}
          <rect x="555" y="348" width="190" height="40" rx="6" fill="#181815" stroke="#E1E0CC" strokeWidth="1" />
          <text x="650" y="373" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontWeight="bold">AUTOMATED RESTOCK EVENT</text>
        </g>

        {/* Footer */}
        <text x="30" y="475" fill="#66655c" fontSize="8">
          HOMOGRAPHY CALIBRATION: ACTIVE &bull; CAMERA ID: OV2640-SHELF-04 &bull; INVENTORY REFRESH: 10s
        </text>
      </svg>
    </div>
  );
}

// =============================================================================
// 4. EMBEDDED VISION LAB: SILICON PCB CIRCUIT & HARDWARE BUS CAD
// =============================================================================
function EmbeddedVisionWiredDiagram({
  activeNode,
  setActiveNode,
  className,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-full bg-[#080807] overflow-hidden select-none font-mono ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cad-grid-pcb" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E1E0CC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-pcb)" />
      </svg>

      <svg viewBox="0 0 800 500" className="relative z-10 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Header */}
        <text x="30" y="35" fill="#E1E0CC" fontSize="11" letterSpacing="2" fontWeight="700">
          CIRCUIT SCHEMATIC // ESP32-S3-OV2640-EDGE-AI
        </text>
        <text x="30" y="52" fill="#737268" fontSize="9" letterSpacing="1">
          XTENSA DUAL-CORE &bull; PARALLEL DVP BUS &bull; DMA FRAMEBUFFER &bull; TINYML
        </text>

        {/* ===================================================================
            HARDWARE COMPONENT 1: OV2640 CAMERA DIE (LEFT)
           =================================================================== */}
        <g>
          {/* Outer PCB Sensor Breakout */}
          <rect x="50" y="130" width="160" height="220" rx="10" fill="#0d0d0c" stroke="#2b2b27" strokeWidth="1.5" />
          <text x="130" y="160" fill="#E1E0CC" fontSize="10" textAnchor="middle" fontWeight="bold">OV2640 SENSOR</text>
          <text x="130" y="175" fill="#737268" fontSize="8" textAnchor="middle">2MP Optical DVP</text>

          {/* Sensor Lens Circle */}
          <circle cx="130" cy="230" r="38" fill="#141412" stroke="#E1E0CC" strokeWidth="1.5" />
          <circle cx="130" cy="230" r="22" fill="#070706" stroke="#44433d" strokeWidth="1" />
          <circle cx="130" cy="230" r="6" fill="#E1E0CC" />

          {/* Breakout Pinout Header (Right side pins) */}
          {[180, 200, 220, 240, 260, 280, 300].map((py, idx) => (
            <g key={idx}>
              <rect x="195" y={py} width="15" height="10" rx="1" fill="#E1E0CC" />
            </g>
          ))}
          <text x="130" y="325" fill="#8e8d80" fontSize="8" textAnchor="middle">UXGA / SVGA / CIF</text>
        </g>

        {/* ===================================================================
            DVP PARALLEL DATA BUS LINES (8-BIT DVP + CLK + SYNC)
           =================================================================== */}
        <g stroke="#E1E0CC" strokeWidth="1.2">
          {/* D0-D7 Bus Lines */}
          <path d="M 210 185 L 340 185" strokeDasharray="3 3" />
          <path d="M 210 205 L 340 205" />
          <path d="M 210 225 L 340 225" />
          <path d="M 210 245 L 340 245" />
          <path d="M 210 265 L 340 265" />
          <path d="M 210 285 L 340 285" />
          <path d="M 210 305 L 340 305" />
        </g>
        <rect x="235" y="160" width="80" height="20" rx="3" fill="#141412" stroke="#2b2b27" strokeWidth="1" />
        <text x="275" y="174" fill="#E1E0CC" fontSize="8" textAnchor="middle">8-BIT DVP BUS</text>

        {/* ===================================================================
            HARDWARE COMPONENT 2: ESP32-S3 MICROCONTROLLER DIE (CENTER)
           =================================================================== */}
        <g>
          {/* MCU Silicon Package */}
          <rect x="340" y="100" width="220" height="280" rx="12" fill="#0d0e0f" stroke="#E1E0CC" strokeWidth="1.8" />
          
          {/* Pin 1 Index Notch */}
          <circle cx="355" cy="115" r="3.5" fill="#E1E0CC" />
          
          <text x="450" y="135" fill="#FFFFFF" fontSize="12" textAnchor="middle" fontWeight="bold">ESP32-S3-WROOM</text>
          <text x="450" y="152" fill="#8e8d80" fontSize="8" textAnchor="middle">XTENSA LX7 @ 240MHz</text>

          {/* Internal Die Cores */}
          <rect x="360" y="170" width="85" height="50" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="402" y="195" fill="#E1E0CC" fontSize="8" textAnchor="middle" fontWeight="bold">CORE 0</text>
          <text x="402" y="210" fill="#737268" fontSize="7" textAnchor="middle">DMA Framebuffer</text>

          <rect x="455" y="170" width="85" height="50" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="497" y="195" fill="#E1E0CC" fontSize="8" textAnchor="middle" fontWeight="bold">CORE 1</text>
          <text x="497" y="210" fill="#737268" fontSize="7" textAnchor="middle">TinyML Inference</text>

          {/* SRAM & PSRAM Allocation */}
          <rect x="360" y="235" width="180" height="55" rx="4" fill="#11110f" stroke="#21211e" strokeWidth="1" />
          <text x="450" y="255" fill="#D2D1C0" fontSize="8" textAnchor="middle" fontWeight="bold">MEMORY ARCHITECTURE</text>
          <text x="450" y="270" fill="#737268" fontSize="7" textAnchor="middle">512KB SRAM + 8MB OCTAL PSRAM</text>
          <text x="450" y="282" fill="#34D399" fontSize="7" textAnchor="middle">DMA ZERO-COPY RING BUFFER</text>

          {/* Edge ML Runtime Pill */}
          <rect x="360" y="305" width="180" height="55" rx="6" fill="#171714" stroke="#E1E0CC" strokeWidth="1" />
          <text x="450" y="328" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontWeight="bold">TENSORFLOW LITE MICRO</text>
          <text x="450" y="345" fill="#D2D1C0" fontSize="8" textAnchor="middle">INT8 Quantized ConvNet</text>
        </g>

        {/* ===================================================================
            TELEMETRY BUS & SENSOR COMPONENT (RIGHT)
           =================================================================== */}
        <path d="M 560 240 L 630 240" fill="none" stroke="#E1E0CC" strokeWidth="2" markerEnd="url(#arrow-cream)" />

        <g>
          <rect x="630" y="130" width="140" height="220" rx="10" fill="#0d0d0c" stroke="#2b2b27" strokeWidth="1.5" />
          <text x="700" y="160" fill="#E1E0CC" fontSize="10" textAnchor="middle" fontWeight="bold">TELEMETRY BUS</text>
          
          {/* I2C / SPI Sensors */}
          <rect x="645" y="185" width="110" height="38" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="700" y="202" fill="#D2D1C0" fontSize="8" textAnchor="middle">I2C SENSORS</text>
          <text x="700" y="215" fill="#737268" fontSize="7" textAnchor="middle">IMU / Thermistor</text>

          <rect x="645" y="235" width="110" height="38" rx="4" fill="#141412" stroke="#21211e" strokeWidth="1" />
          <text x="700" y="252" fill="#D2D1C0" fontSize="8" textAnchor="middle">PICO BRIDGE</text>
          <text x="700" y="265" fill="#737268" fontSize="7" textAnchor="middle">SPI Hardware Bus</text>

          <rect x="645" y="285" width="110" height="45" rx="4" fill="#161d19" stroke="#1b4332" strokeWidth="1" />
          <text x="700" y="304" fill="#34D399" fontSize="8" textAnchor="middle" fontWeight="bold">ZERO CLOUD</text>
          <text x="700" y="318" fill="#a7f3d0" fontSize="7" textAnchor="middle">Deterministic Edge</text>
        </g>

        {/* Footer */}
        <text x="30" y="475" fill="#66655c" fontSize="8">
          REGISTER POLLING: DMA ACTIVE &bull; POWER: 3.3V REGULATED &bull; LATENCY: 22ms / INFERENCE
        </text>
      </svg>
    </div>
  );
}
