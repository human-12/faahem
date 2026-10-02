'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StationId, STATIONS } from './LabTypes';
import { labAudio } from './LabAudio';
import { LabIntro } from './LabIntro';
import { LabCanvas } from './LabCanvas';
import { LabHUD } from './LabHUD';
import { LabControls } from './LabControls';
import { LabPauseMenu } from './LabPauseMenu';
import { AICoreModal } from './AICoreModal';
import { VisionModal } from './VisionModal';
import { HardwareModal } from './HardwareModal';
import { DigitalTwinModal } from './DigitalTwinModal';
import { TerminalModal } from './TerminalModal';
import { LabCompletion } from './LabCompletion';

interface LabExperienceProps {
  onClose: (sectionId?: string) => void;
}

export function LabExperience({ onClose }: LabExperienceProps) {
  const [showingIntro, setShowingIntro] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(labAudio.getMuted());

  // Player telemetry & game state
  const [playerPos, setPlayerPos] = useState({ x: 900, y: 500 });
  const [energy, setEnergy] = useState(100);
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState<string[]>([]);
  const [discoveredStations, setDiscoveredStations] = useState<StationId[]>([]);
  const [activeModal, setActiveModal] = useState<StationId | null>(null);

  // Interaction availability
  const [canInteract, setCanInteract] = useState(false);
  const [activeStationTitle, setActiveStationTitle] = useState<string | undefined>();

  // Virtual mobile movement
  const [virtualMove, setVirtualMove] = useState({ dx: 0, dy: 0 });

  // Dynamic Objective
  const getObjectiveText = useCallback(() => {
    if (isCompleted) return 'Mission complete. Access real portfolio links.';
    if (!discoveredStations.includes('ai-core')) {
      return 'Explore the laboratory. Approach Station 01: AI CORE.';
    }
    if (!discoveredStations.includes('vision')) {
      return 'Objective: Investigate the Vision System (North).';
    }
    if (!discoveredStations.includes('hardware')) {
      return 'Objective: Inspect the Hardware Workbench (East).';
    }
    if (!discoveredStations.includes('digital-twin')) {
      return 'Objective: Synchronize the Digital Twin Simulator.';
    }
    return 'Objective: Proceed to Central Lab Terminal (South).';
  }, [discoveredStations, isCompleted]);

  // Audio mute toggle
  const handleToggleSound = useCallback(() => {
    const nextMuted = labAudio.toggleMuted();
    setIsMuted(nextMuted);
  }, []);

  // Keyboard shortcut listener for ESC (Pause) & M (Sound)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModal) {
          setActiveModal(null);
        } else {
          setIsPaused((prev) => !prev);
        }
      }
      if (e.key.toLowerCase() === 'm') {
        handleToggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, handleToggleSound]);

  // Handle station modal opens
  const handleStationTrigger = (stationId: StationId) => {
    setActiveModal(stationId);
  };

  // Station Discovery & XP claim
  const handleClaimStation = (stationId: StationId, reward: number, item?: string) => {
    if (!discoveredStations.includes(stationId)) {
      setDiscoveredStations((prev) => [...prev, stationId]);
      setXp((prev) => prev + reward);
      if (item && !inventory.includes(item)) {
        setInventory((prev) => [...prev, item]);
      }
    }
  };

  // Telemetry updates from Canvas
  const handlePlayerUpdate = (pos: { x: number; y: number }, energyDelta: number) => {
    setPlayerPos(pos);
    setEnergy((prev) => Math.min(100, Math.max(15, prev + energyDelta)));
  };

  // Virtual touch controls
  const handleVirtualMove = (dx: number, dy: number) => {
    setVirtualMove({ dx, dy });
  };

  const handleVirtualInteract = () => {
    if (activeStationTitle) {
      // Find matching station
      const st = STATIONS.find((s) => s.title === activeStationTitle);
      if (st) {
        handleStationTrigger(st.id);
      }
    }
  };

  // Exit with section navigation
  const handleExitWithSection = (sectionId?: string) => {
    labAudio.stopAmbient();
    onClose(sectionId);
  };

  // Replay
  const handleReplay = () => {
    setIsCompleted(false);
    setActiveModal(null);
    setShowingIntro(false);
  };

  return (
    <div className="fixed inset-0 z-[9990] bg-[#050608] text-[#F4F4F0] overflow-hidden select-none font-mono">
      
      {/* 1. Cinematic Intro Sequence */}
      {showingIntro && (
        <LabIntro onComplete={() => setShowingIntro(false)} />
      )}

      {/* 2. Main Canvas Game World */}
      <LabCanvas
        onStationTrigger={handleStationTrigger}
        discoveredStations={discoveredStations}
        onPlayerUpdate={handlePlayerUpdate}
        virtualMove={virtualMove}
        onInteractStateChange={(can, title) => {
          setCanInteract(can);
          setActiveStationTitle(title);
        }}
        isPaused={isPaused || !!activeModal || showingIntro || isCompleted}
      />

      {/* 3. Minimal HUD */}
      {!showingIntro && !isCompleted && (
        <LabHUD
          energy={energy}
          xp={xp}
          objective={getObjectiveText()}
          inventory={inventory}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onPause={() => setIsPaused(true)}
          onExit={() => handleExitWithSection()}
          playerPos={playerPos}
        />
      )}

      {/* 4. Controls Hints & Mobile Virtual D-Pad */}
      {!showingIntro && !isCompleted && !activeModal && !isPaused && (
        <LabControls
          onVirtualMove={handleVirtualMove}
          onVirtualInteract={handleVirtualInteract}
          canInteract={canInteract}
          activeStationTitle={activeStationTitle}
        />
      )}

      {/* 5. Pause Menu */}
      {isPaused && (
        <LabPauseMenu
          onResume={() => setIsPaused(false)}
          onExit={() => handleExitWithSection()}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* 6. Station Interactive Modals */}
      {activeModal === 'ai-core' && (
        <AICoreModal
          onClose={() => setActiveModal(null)}
          onExplorePortfolio={() => handleExitWithSection('work')}
          isDiscovered={discoveredStations.includes('ai-core')}
          onClaimXP={() => handleClaimStation('ai-core', 100, 'AI CORE')}
        />
      )}

      {activeModal === 'vision' && (
        <VisionModal
          onClose={() => setActiveModal(null)}
          onExplorePortfolio={() => handleExitWithSection('work')}
          isDiscovered={discoveredStations.includes('vision')}
          onClaimXP={() => handleClaimStation('vision', 150, 'CAMERA MODULE')}
        />
      )}

      {activeModal === 'hardware' && (
        <HardwareModal
          onClose={() => setActiveModal(null)}
          onExplorePortfolio={() => handleExitWithSection('work')}
          isDiscovered={discoveredStations.includes('hardware')}
          onClaimXP={() => handleClaimStation('hardware', 150, 'ESP32-S3')}
        />
      )}

      {activeModal === 'digital-twin' && (
        <DigitalTwinModal
          onClose={() => setActiveModal(null)}
          onExplorePortfolio={() => handleExitWithSection('work')}
          isDiscovered={discoveredStations.includes('digital-twin')}
          onClaimXP={() => handleClaimStation('digital-twin', 200, 'DIGITAL TWIN CORE')}
        />
      )}

      {activeModal === 'terminal' && (
        <TerminalModal
          onClose={() => setActiveModal(null)}
          discoveredCount={discoveredStations.length}
          totalStations={STATIONS.length}
          xp={xp}
          onCompleteMission={() => {
            setActiveModal(null);
            setIsCompleted(true);
          }}
        />
      )}

      {/* 7. Grand Completion Sequence */}
      {isCompleted && (
        <LabCompletion
          xp={xp}
          onExitToPortfolio={handleExitWithSection}
          onReplay={handleReplay}
        />
      )}

    </div>
  );
}
