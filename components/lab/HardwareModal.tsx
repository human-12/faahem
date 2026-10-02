'use client';

import React from 'react';
import { ESP32Experience } from './hardware/ESP32Experience';

interface HardwareModalProps {
  onClose: () => void;
  onExplorePortfolio: (section?: string) => void;
  isDiscovered: boolean;
  onClaimXP: () => void;
}

export function HardwareModal({
  onClose,
  onExplorePortfolio,
  isDiscovered,
  onClaimXP,
}: HardwareModalProps) {
  return (
    <ESP32Experience
      onClose={onClose}
      onExplorePortfolio={onExplorePortfolio}
      onClaimParentXP={() => {
        if (!isDiscovered) {
          onClaimXP();
        }
      }}
    />
  );
}
