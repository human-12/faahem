'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ESP32Scene } from './ESP32Scene';
import { ESP32HUD } from './ESP32HUD';
import {
  ESP32ComponentId,
  HardwareObjective,
  SensorTelemetry,
  DigitalTwinState,
} from './ESP32Types';
import { labAudio } from '../LabAudio';

interface ESP32ExperienceProps {
  onClose: () => void;
  onExplorePortfolio: (section?: string) => void;
  onClaimParentXP: (reward: number) => void;
}

export function ESP32Experience({
  onClose,
  onExplorePortfolio,
  onClaimParentXP,
}: ESP32ExperienceProps) {
  // Selection & Hover
  const [selectedComponent, setSelectedComponent] = useState<ESP32ComponentId | null>('chip');
  const [hoveredComponent, setHoveredComponent] = useState<ESP32ComponentId | null>(null);
  const [focusTarget, setFocusTarget] = useState<'board' | 'chip' | 'gpio' | 'camera' | 'sensor'>('board');

  // Objectives State
  const [objectives, setObjectives] = useState<HardwareObjective[]>([
    {
      id: 'activate_led',
      title: 'ACTIVATE THE LED',
      description: 'Select GPIO 4 and switch signal from LOW to HIGH.',
      isCompleted: false,
      xpReward: 80,
    },
    {
      id: 'connect_sensor',
      title: 'CONNECT THE SENSOR',
      description: 'Attach the temperature transducer to the I2C bus.',
      isCompleted: false,
      xpReward: 80,
    },
    {
      id: 'sync_twin',
      title: 'SYNC DIGITAL TWIN',
      description: 'Stream live hardware telemetry to virtual machine.',
      isCompleted: false,
      xpReward: 90,
    },
  ]);

  // Discovered Components List
  const [discoveredComponents, setDiscoveredComponents] = useState<string[]>(['ESP32-S3']);

  // Hardware State
  const [isLedActive, setIsLedActive] = useState(false);
  const [isMuted, setIsMuted] = useState(labAudio.getMuted());

  // Sensor Telemetry
  const [sensorTelemetry, setSensorTelemetry] = useState<SensorTelemetry>({
    temperature: 24.6,
    humidity: 48.2,
    voltage: 3.3,
    connected: false,
    bus: 'DISCONNECTED',
  });

  // Digital Twin Sync State
  const [digitalTwin, setDigitalTwin] = useState<DigitalTwinState>({
    isSynced: false,
    syncRate: '20 Hz',
    latencyMs: 14,
    packetCount: 0,
    twinTemperature: 24.6,
  });

  const [xpClaimed, setXpClaimed] = useState(false);

  // Discover tracker helper
  const registerDiscovery = useCallback((name: string) => {
    setDiscoveredComponents((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }, []);

  // Realistic temperature oscillation
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorTelemetry((prev) => {
        if (!prev.connected) return prev;
        // Subtle drift between 24.4 and 24.9 degrees
        const delta = (Math.random() - 0.49) * 0.12;
        const newTemp = Math.max(24.2, Math.min(25.1, prev.temperature + delta));

        // If digital twin is synced, mirror immediately
        if (digitalTwin.isSynced) {
          setDigitalTwin((d) => ({
            ...d,
            twinTemperature: newTemp,
            packetCount: d.packetCount + 1,
          }));
        }

        return {
          ...prev,
          temperature: newTemp,
        };
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [digitalTwin.isSynced]);

  // Audio Toggle
  const handleToggleSound = () => {
    const nextMuted = labAudio.toggleMuted();
    setIsMuted(nextMuted);
  };

  // Complete Objective Helper
  const completeObjective = useCallback((id: HardwareObjective['id']) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === id && !obj.isCompleted) {
          labAudio.playInteract();
          return { ...obj, isCompleted: true };
        }
        return obj;
      })
    );
  }, []);

  // Component Selection Handler
  const handleSelectComponent = (id: ESP32ComponentId) => {
    setSelectedComponent(id);
    labAudio.playBlip(1200);

    if (id === 'chip') {
      registerDiscovery('ESP32-S3');
      setFocusTarget('chip');
    } else if (id === 'gpio_left' || id === 'gpio_right' || id === 'led_gpio4') {
      registerDiscovery('GPIO');
      setFocusTarget('gpio');
    } else if (id === 'camera_module') {
      registerDiscovery('CAMERA');
      registerDiscovery('EDGE AI');
      setFocusTarget('camera');
    } else if (id === 'temp_sensor') {
      registerDiscovery('SENSOR');
      setFocusTarget('sensor');
    }
  };

  // Toggle LED Interaction
  const handleToggleLED = () => {
    const nextState = !isLedActive;
    setIsLedActive(nextState);
    registerDiscovery('GPIO');

    if (nextState) {
      labAudio.playInteract();
      completeObjective('activate_led');
    } else {
      labAudio.playBlip(900);
    }
  };

  // Toggle Sensor Connection
  const handleToggleSensorConnection = () => {
    const nextConnected = !sensorTelemetry.connected;
    setSensorTelemetry((prev) => ({
      ...prev,
      connected: nextConnected,
      bus: nextConnected ? 'I2C (GPIO 1 / GPIO 2)' : 'DISCONNECTED',
    }));

    registerDiscovery('SENSOR');

    if (nextConnected) {
      labAudio.playScan();
      completeObjective('connect_sensor');
    } else {
      labAudio.playBlip(800);
    }
  };

  // Toggle Digital Twin Sync
  const handleToggleDigitalTwinSync = () => {
    const nextSynced = !digitalTwin.isSynced;
    setDigitalTwin((prev) => ({
      ...prev,
      isSynced: nextSynced,
      twinTemperature: sensorTelemetry.temperature,
    }));

    registerDiscovery('DIGITAL TWIN');

    if (nextSynced) {
      labAudio.playSync();
      completeObjective('sync_twin');
    } else {
      labAudio.playBlip(800);
    }
  };

  const isAllCompleted = objectives.every((o) => o.isCompleted);

  // Claim all XP
  const handleClaimAllXP = () => {
    if (!xpClaimed) {
      setXpClaimed(true);
      onClaimParentXP(250);
      labAudio.playXP();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#070707] flex flex-col font-mono overflow-hidden">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0">
        <ESP32Scene
          onSelectComponent={handleSelectComponent}
          onHoverComponent={setHoveredComponent}
          isLedActive={isLedActive}
          isSensorConnected={sensorTelemetry.connected}
          isDigitalTwinSynced={digitalTwin.isSynced}
          focusTarget={focusTarget}
        />
      </div>

      {/* Holographic Technical HUD Layer */}
      <ESP32HUD
        selectedComponent={selectedComponent}
        hoveredComponent={hoveredComponent}
        objectives={objectives}
        discoveredComponents={discoveredComponents}
        isLedActive={isLedActive}
        onToggleLED={handleToggleLED}
        sensorTelemetry={sensorTelemetry}
        onToggleSensorConnection={handleToggleSensorConnection}
        digitalTwin={digitalTwin}
        onToggleDigitalTwinSync={handleToggleDigitalTwinSync}
        onClose={onClose}
        onNavigatePortfolio={onExplorePortfolio}
        isAllCompleted={isAllCompleted}
        onClaimAllXP={handleClaimAllXP}
        xpClaimed={xpClaimed}
        onSetFocus={setFocusTarget}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

    </div>
  );
}
