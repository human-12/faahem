'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Linkedin, Github, Instagram, MessageSquare, Check, Copy } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    handle: 'Muhammad Faahem',
    href: 'https://www.linkedin.com/in/muhammadfaahem/',
    icon: Linkedin,
    description: 'Professional networking & research updates',
  },
  {
    name: 'GitHub',
    handle: '@human-12',
    href: 'https://github.com/human-12',
    icon: Github,
    description: 'Code repositories & daily build logs',
  },
  {
    name: 'Instagram',
    handle: '@m.faahem',
    href: 'https://www.instagram.com/m.faahem/',
    icon: Instagram,
    description: 'Personal glimpses & engineering life',
  },
];

export function ContactSection() {
  const [copiedLink, setCopiedLink] = useState(false);

  const copyProfileUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('https://www.linkedin.com/in/muhammadfaahem/');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 sm:py-36 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-[#1a1a17]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#99988D]">GET IN TOUCH</span>
        </div>

        {/* Large Visual Headline */}
        <div className="mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] text-[#F4F4F0] uppercase leading-[0.95] max-w-5xl"
          >
            LET&apos;S BUILD <br />
            <span className="text-[#E1E0CC]">SOMETHING.</span>
          </motion.h2>

          <p className="mt-8 text-base sm:text-xl md:text-2xl text-[#B5B4A5] font-light max-w-2xl leading-relaxed">
            I&apos;m interested in engineering, AI, research, ambitious projects, and interesting technical problems.
          </p>
        </div>

        {/* Social & Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = social.icon;

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-[24px] bg-[#0c0c0b] border border-[#21211e] hover:border-[#424137] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl bg-[#141412] text-[#E1E0CC] border border-[#232320]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#262622] flex items-center justify-center text-[#737268] group-hover:text-[#F4F4F0] group-hover:border-[#E1E0CC]/50 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <span className="font-mono text-xs uppercase tracking-wider text-[#737268] block mb-1">
                    {social.name}
                  </span>
                  <h3 className="text-xl font-semibold text-[#F4F4F0] group-hover:text-[#E1E0CC] transition-colors mb-3">
                    {social.handle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#99988D] font-light">
                    {social.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#181816] flex items-center justify-between text-xs font-mono text-[#E1E0CC]/80">
                  <span>Connect →</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Primary CTA Action Card */}
        <div className="p-8 sm:p-12 rounded-[28px] bg-[#0f0f0d] border border-[#282723] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#A6A596] block mb-2">
              DIRECT REACHOUT
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#F4F4F0] mb-1">
              Have an idea, research inquiry, or collaboration?
            </h3>
            <p className="text-xs sm:text-sm text-[#99988D] font-light">
              Reach out directly on LinkedIn or explore my latest commits on GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.linkedin.com/in/muhammadfaahem/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E1E0CC] text-[#0A0A09] text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#F2F1E6] transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get in touch →</span>
            </a>

            <button
              onClick={copyProfileUrl}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#33322b] bg-[#171714] text-[#D2D1C0] hover:bg-[#22211d] text-xs sm:text-sm font-medium tracking-wide transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>LinkedIn link copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8e8d80]" />
                  <span>Copy profile link</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
