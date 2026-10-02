'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  Minimize2,
  Maximize2,
  Music,
  Repeat,
} from 'lucide-react';
import { rapBeatEngine, BEAT_TRACKS, BeatTrack } from './RapBeatEngine';

export function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<BeatTrack>(BEAT_TRACKS[0]);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Equalizer animation ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Step listener
  useEffect(() => {
    const handleStep = (step: number) => {
      setActiveStep(step);
    };

    rapBeatEngine.addStepListener(handleStep);

    return () => {
      rapBeatEngine.removeStepListener(handleStep);
      rapBeatEngine.stop();
    };
  }, []);

  // 2. Auto-start on first user interaction as default
  useEffect(() => {
    // Check if visitor has manually paused during this session
    const isManuallyPaused = sessionStorage.getItem('faahem_audio_paused') === 'true';

    if (!isManuallyPaused) {
      const startAudioOnFirstGesture = () => {
        if (!rapBeatEngine.getIsPlaying()) {
          rapBeatEngine.start();
          setIsPlaying(true);
        }
        cleanupListeners();
      };

      const cleanupListeners = () => {
        window.removeEventListener('click', startAudioOnFirstGesture);
        window.removeEventListener('keydown', startAudioOnFirstGesture);
        window.removeEventListener('touchstart', startAudioOnFirstGesture);
      };

      window.addEventListener('click', startAudioOnFirstGesture, { once: true });
      window.addEventListener('keydown', startAudioOnFirstGesture, { once: true });
      window.addEventListener('touchstart', startAudioOnFirstGesture, { once: true });

      return cleanupListeners;
    }
  }, []);

  // 3. Spectrum visualizer loop
  useEffect(() => {
    let animId: number;

    const renderSpectrum = () => {
      if (canvasRef.current && isPlaying) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const data = rapBeatEngine.getByteFrequencyData();
          const barCount = 14;
          const barWidth = 3;
          const gap = 2;

          for (let i = 0; i < barCount; i++) {
            const rawVal = data[i * 2] || 0;
            const height = Math.max(3, (rawVal / 255) * canvas.height * 0.9);
            const x = i * (barWidth + gap);
            const y = canvas.height - height;

            ctx.fillStyle = i % 2 === 0 ? '#E1E0CC' : '#C5C4B4';
            ctx.fillRect(x, y, barWidth, height);
          }
        }
      }
      animId = requestAnimationFrame(renderSpectrum);
    };

    if (isPlaying) {
      animId = requestAnimationFrame(renderSpectrum);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const togglePlay = () => {
    const nextState = rapBeatEngine.toggle();
    setIsPlaying(nextState);
    if (!nextState) {
      sessionStorage.setItem('faahem_audio_paused', 'true');
    } else {
      sessionStorage.removeItem('faahem_audio_paused');
    }
  };

  const handleNextTrack = () => {
    const next = rapBeatEngine.nextTrack();
    setCurrentTrack(next);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    rapBeatEngine.setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = rapBeatEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-5 left-5 z-[9995] font-mono select-none">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* =========================================================
             1. COMPACT CAPSULE BAR
             ========================================================= */
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-[#0c0c0b]/90 backdrop-blur-md border border-[#232320] shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-xs text-[#F4F4F0]"
          >
            {/* Play/Pause Disc Button */}
            <button
              onClick={togglePlay}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-[#E1E0CC] text-[#0A0A09] shadow-[0_0_15px_rgba(225,224,204,0.35)]'
                  : 'bg-[#181815] text-[#D2D1C0] hover:text-[#FFFFFF] border border-[#2b2b27]'
              }`}
              title={isPlaying ? 'Pause Background Beat' : 'Play Background Rap Beat'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Track Info & Visualizer */}
            <div
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#FFFFFF] group-hover:text-[#E1E0CC] transition-colors truncate max-w-[150px] sm:max-w-[210px]">
                    {currentTrack.name}
                  </span>
                </div>
                <span className="text-[9px] text-[#737268] tracking-widest uppercase">
                  {isPlaying ? `${currentTrack.bpm} BPM // LOOP ACTIVE` : `CLICK TO PLAY RAP BEAT`}
                </span>
              </div>

              {/* Animated Mini Waveform */}
              <div className="flex items-end gap-0.5 h-4 w-7 px-1">
                {[40, 80, 50, 100, 60].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-[#E1E0CC]' : 'bg-[#3b3a32]'
                    }`}
                    style={{
                      height: isPlaying ? `${((activeStep + i * 3) % 10) * 10 + 15}%` : '20%',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Expand details button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1.5 rounded-full text-[#8e8d80] hover:text-[#FFFFFF] transition-colors"
              title="Expand Music Player"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          /* =========================================================
             2. EXPANDED AUDIO COMMAND CENTER
             ========================================================= */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-80 sm:w-88 rounded-3xl bg-[#0c0c0b]/95 backdrop-blur-xl border border-[#262622] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.85)] text-[#F4F4F0] relative overflow-hidden"
          >
            {/* Top Specular Rim */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E1E0CC]/40 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1b1b18] mb-4">
              <div className="flex items-center gap-2 text-xs text-[#8e8d80]">
                <Music className="w-3.5 h-3.5 text-[#E1E0CC]" />
                <span className="tracking-widest uppercase text-[10px]">BACKGROUND RAP BEAT</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#2b2b27] bg-[#141412] text-[#E1E0CC] flex items-center gap-1">
                  <Repeat className="w-2.5 h-2.5" />
                  <span>LOOP ∞</span>
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full text-[#8e8d80] hover:text-[#FFFFFF] transition-colors ml-1"
                  title="Minimize Player"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Track Info Card */}
            <div className="p-3.5 rounded-2xl bg-[#121210] border border-[#1e1e1b] flex items-center gap-3.5 mb-4">
              {/* Spinning Vinyl Icon */}
              <div
                className={`w-12 h-12 rounded-full border border-[#33322d] bg-[#070706] flex items-center justify-center shrink-0 ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                <Disc3 className="w-7 h-7 text-[#E1E0CC]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#FFFFFF] truncate tracking-tight">
                  {currentTrack.name}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#8e8d80] mt-0.5">
                  <span>{currentTrack.genre}</span>
                  <span className="text-[#3b3a32]">·</span>
                  <span className="text-[#E1E0CC]">{currentTrack.bpm} BPM</span>
                </div>
              </div>
            </div>

            {/* Real-time Spectrum Canvas */}
            <div className="h-10 w-full bg-[#080807] rounded-xl border border-[#171715] flex items-center justify-center px-4 mb-4 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={200}
                height={35}
                className="w-full h-full block"
              />
            </div>

            {/* Playback Controls & Track Switch */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <button
                onClick={handleNextTrack}
                className="px-3 py-2 rounded-xl bg-[#141412] border border-[#21211e] text-[11px] text-[#A6A596] hover:text-[#FFFFFF] hover:border-[#383730] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Switch Beat Style"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Next Beat</span>
              </button>

              <button
                onClick={togglePlay}
                className={`px-6 py-2.5 rounded-full flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-[#E1E0CC] text-[#0A0A09] shadow-[0_0_20px_rgba(225,224,204,0.35)]'
                    : 'bg-[#1b1b18] text-[#FFFFFF] border border-[#2f2f2a] hover:bg-[#262622]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>PLAY LOOP</span>
                  </>
                )}
              </button>
            </div>

            {/* Volume Control Slider */}
            <div className="pt-3 border-t border-[#191916] flex items-center gap-2.5">
              <button
                onClick={toggleMute}
                className="text-[#8e8d80] hover:text-[#E1E0CC] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#D2D1C0]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#1c1c19] rounded-lg appearance-none cursor-pointer accent-[#E1E0CC]"
              />
              <span className="text-[10px] text-[#737268] w-7 text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
