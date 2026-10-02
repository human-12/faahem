'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { ArduinoShowcaseSection } from '@/components/arduino/ArduinoShowcaseSection';
import { AboutSection } from '@/components/about-section';
import { WhatIBuild } from '@/components/what-i-build';
import { SelectedWork } from '@/components/selected-work';
import { ResearchSection } from '@/components/research-section';
import { ToolboxSection } from '@/components/toolbox-section';
import { PhilosophySection } from '@/components/philosophy-section';
import { GithubSection } from '@/components/github-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

// Lazy-load the interactive Lab World experience only when the visitor enters it
const LabExperience = dynamic(
  () => import('@/components/lab/LabExperience').then((mod) => mod.LabExperience),
  { ssr: false }
);

export default function Home() {
  const [isLabOpen, setIsLabOpen] = useState(false);

  const handleCloseLab = (sectionId?: string) => {
    setIsLabOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <main className="min-h-screen bg-[#060606] text-[#F4F4F0] flex flex-col selection:bg-[#E1E0CC] selection:text-[#060606]">
      {/* 1. Prisma Hero Section with Obvious Lab Entry CTA */}
      <PrismaHero
        title="FAAHEM"
        showAsterisk={false}
        statusBadge="FAST-NUCES · BS Computer Engineering · 2026 — 2030"
        description="I’m Faahem Tayyeb, a freshman Computer Engineering student at FAST-NUCES, building at the intersection of artificial intelligence, embedded systems, computer vision and digital twins."
        ctaText="Explore my work"
        ctaHref="#work"
        labCta={{
          text: "ENTER THE LAB →",
          onClick: () => setIsLabOpen(true),
        }}
        navItems={[
          { label: "3D Arduino", href: "#arduino-uno" },
          { label: "About", href: "#about" },
          { label: "Work", href: "#work" },
          { label: "Research", href: "#research" },
          { label: "Stack", href: "#stack" },
          { label: "Contact", href: "#contact" },
        ]}
        secondaryCta={{ text: "GitHub", href: "https://github.com/human-12" }}
      />

      {/* 2. Interactive 3D Arduino Uno R3 Physical Computing Showcase */}
      <ArduinoShowcaseSection />

      {/* 3. Who I Am (About) */}
      <AboutSection />

      {/* 3. What I Build */}
      <WhatIBuild />

      {/* 4. Selected Work (Finverse AI, Skin Analysis, Retail Shelf CV, Embedded Vision Lab) */}
      <SelectedWork />

      {/* 5. Research Interests */}
      <ResearchSection />

      {/* 6. The Toolbox (Tech Stack) */}
      <ToolboxSection />

      {/* 7. Engineering Philosophy (Build. Break. Understand. Rebuild.) */}
      <PhilosophySection />

      {/* 8. GitHub / Build Log */}
      <GithubSection />

      {/* 9. Contact / Social */}
      <ContactSection />

      {/* 10. Footer */}
      <Footer />

      {/* Interactive FAAHEM LAB // WORLD 1 */}
      {isLabOpen && (
        <LabExperience onClose={handleCloseLab} />
      )}
    </main>
  );
}
