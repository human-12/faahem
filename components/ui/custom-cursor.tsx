'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function subscribeFinePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hovered' | 'card' | 'clicked'>('default');

  // Position motion values for zero-latency spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth trailing spring for the outer ring
  const springConfig = { damping: 24, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isFinePointer || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent is an interactive project card
      const isCard = target.closest('article, [data-cursor="card"]');
      if (isCard) {
        setCursorState('card');
        return;
      }

      // Check if target or parent is any interactive link, button, or control
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="pointer"]'
      );
      if (isInteractive) {
        setCursorState('hovered');
        return;
      }

      setCursorState('default');
    };

    const handleMouseDown = () => {
      setCursorState((prev) => (prev === 'card' ? 'card' : 'clicked'));
    };

    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer'
      );
      setCursorState(isInteractive ? 'hovered' : 'default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isFinePointer, isVisible]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* 1. Precise Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E1E0CC] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? (cursorState === 'card' ? 0.3 : 1) : 0,
          scale: cursorState === 'clicked' ? 0.6 : cursorState === 'hovered' ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Trailing Outer Ring with Contextual Expansion */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#E1E0CC] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center backdrop-blur-[0.5px]"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width:
            cursorState === 'card'
              ? 64
              : cursorState === 'hovered'
              ? 48
              : cursorState === 'clicked'
              ? 24
              : 28,
          height:
            cursorState === 'card'
              ? 64
              : cursorState === 'hovered'
              ? 48
              : cursorState === 'clicked'
              ? 24
              : 28,
          borderColor:
            cursorState === 'card'
              ? 'rgba(225, 224, 204, 0.45)'
              : cursorState === 'hovered'
              ? 'rgba(225, 224, 204, 0.6)'
              : 'rgba(225, 224, 204, 0.25)',
          backgroundColor:
            cursorState === 'card'
              ? 'rgba(225, 224, 204, 0.06)'
              : cursorState === 'hovered'
              ? 'rgba(225, 224, 204, 0.08)'
              : 'rgba(225, 224, 204, 0.01)',
          scale: cursorState === 'clicked' ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.6,
        }}
      >
        {/* Subtle inspect indicator when hovering over project cards */}
        {cursorState === 'card' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-mono tracking-widest text-[#E1E0CC] uppercase select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
