'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-[#181815] py-14 sm:py-20 px-5 sm:px-8 md:px-12 lg:px-16 text-[#99988D]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-12">
        
        {/* Top Footer Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand & Degree Info */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="font-mono text-base sm:text-lg font-bold uppercase tracking-widest text-[#F4F4F0]">
              FAAHEM TAYYEB
            </h3>
            <p className="text-xs sm:text-sm text-[#A6A596] font-light max-w-sm">
              Computer Engineering student at FAST-NUCES (2026 — 2030).
              Building at the intersection of AI, Embedded Systems, Computer Vision, and Digital Twins.
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-xs sm:text-sm font-mono">
            <span className="text-[#66655c] uppercase text-[11px] tracking-wider mb-1">CONNECT</span>
            <a
              href="https://github.com/human-12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D2D1C0] hover:text-[#E1E0CC] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub (@human-12)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammadfaahem/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D2D1C0] hover:text-[#E1E0CC] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn (Muhammad Faahem)</span>
            </a>
            <a
              href="https://www.instagram.com/m.faahem/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#D2D1C0] hover:text-[#E1E0CC] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram (@m.faahem)</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#232320] bg-[#0c0c0b] text-xs font-mono text-[#D2D1C0] hover:text-[#F4F4F0] hover:border-[#44433a] transition-all cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#141412] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737268]">
          <div>
            © 2026 Faahem Tayyeb. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]/80" />
            <span className="text-[#A6A596]">Built with curiosity.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
