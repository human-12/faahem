'use client';

import { motion, useInView } from "framer-motion";
import { ArrowRight, Github, Cpu } from "lucide-react";
import { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
const defaultNavItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

export type NavItemType = string | { label: string; href: string };

export interface PrismaHeroProps {
  title?: string;
  showAsterisk?: boolean;
  navItems?: NavItemType[];
  description?: string;
  statusBadge?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryCta?: { text: string; href: string };
  labCta?: { text?: string; onClick: () => void };
  videoUrl?: string;
}

const PrismaHero = ({
  title = "Prisma",
  showAsterisk = true,
  navItems = defaultNavItems,
  description = "Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.",
  statusBadge,
  ctaText = "Join the lab",
  ctaHref,
  onCtaClick,
  secondaryCta,
  labCta,
  videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
}: PrismaHeroProps) => {
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (ctaHref && ctaHref.startsWith("#")) {
      const target = document.querySelector(ctaHref);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="h-screen w-full p-2.5 sm:p-4 md:p-6 lg:p-8">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#262622]/70 shadow-2xl">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />

        {/* Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black/90 backdrop-blur-md border-x border-b border-[#262622] px-4 py-2 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 lg:gap-12">
            {navItems.map((item, idx) => {
              const label = typeof item === "string" ? item : item.label;
              const href = typeof item === "string" ? "#" : item.href;

              return (
                <a
                  key={`${label}-${idx}`}
                  href={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className="text-[10px] transition-colors sm:text-xs md:text-sm font-medium whitespace-nowrap"
                  style={{ color: "rgba(225, 224, 204, 0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10 lg:pb-8">
          
          {/* Optional Status Badge / Academic line */}
          {statusBadge && (
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-[#A6A596]"
            >
              <span className="w-2 h-2 rounded-full bg-[#E1E0CC] inline-block animate-pulse" />
              <span>{statusBadge}</span>
            </motion.div>
          )}

          <div className="grid grid-cols-12 items-end gap-4">
            
            <div className="col-span-12 lg:col-span-8 overflow-hidden">
              <h1
                className={`font-bold leading-[0.88] select-none text-[#E1E0CC] ${
                  title.length > 5
                    ? "text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] xl:text-[7.5vw] 2xl:text-[112px] tracking-[-0.04em]"
                    : "text-6xl sm:text-8xl md:text-9xl lg:text-[12vw] xl:text-[13vw] 2xl:text-[160px] tracking-[-0.06em]"
                }`}
              >
                <WordsPullUp text={title} showAsterisk={showAsterisk} />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-xs text-primary/70 sm:text-sm md:text-base max-w-lg font-light"
                style={{ lineHeight: 1.35 }}
              >
                {description}
              </motion.p>

              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  onClick={handleCta}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base cursor-pointer shadow-lg active:scale-95"
                >
                  {ctaText}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </motion.button>

                {labCta && (
                  <motion.button
                    onClick={labCta.onClick}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
                    className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#E1E0CC]/50 bg-[#121210]/90 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider text-[#E1E0CC] hover:border-[#FFFFFF] hover:bg-[#1a1a17] transition-all cursor-pointer shadow-[0_0_24px_rgba(225,224,204,0.18)] active:scale-95"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E1E0CC] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E1E0CC]" />
                    </span>
                    <span className="font-semibold text-[#FFFFFF]">{labCta.text || "ENTER THE LAB →"}</span>
                    <span className="text-[10px] text-[#E1E0CC]/80 border border-[#E1E0CC]/40 px-1.5 py-0.5 rounded font-mono">WORLD 1</span>
                  </motion.button>
                )}

                <motion.a
                  href="#arduino-uno"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#arduino-uno')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#383730] bg-[#121210]/80 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider text-[#E1E0CC] hover:bg-[#1c1b17] hover:border-[#E1E0CC]/60 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Cpu className="w-3.5 h-3.5 text-[#E1E0CC] group-hover:rotate-12 transition-transform duration-300" />
                  <span>3D ARDUINO UNO</span>
                </motion.a>

                {secondaryCta && (
                  <motion.a
                    href={secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#3b3a32] bg-[#121210]/70 px-5 py-2.5 text-xs sm:text-sm font-medium text-[#D2D1C0] hover:bg-[#1f1e1a] hover:border-[#666559] transition-all"
                  >
                    <Github className="w-4 h-4 text-[#E1E0CC]" />
                    <span>{secondaryCta.text}</span>
                  </motion.a>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
export default PrismaHero;
