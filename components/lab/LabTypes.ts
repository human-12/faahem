export type StationId = 'ai-core' | 'vision' | 'hardware' | 'digital-twin' | 'terminal';

export interface StationData {
  id: StationId;
  title: string;
  category: string;
  x: number;
  y: number;
  radius: number;
  unlocked: boolean;
  discovered: boolean;
  accentColor: string;
  xpReward: number;
  unlockedItem?: string;
}

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  energy: number;
  xp: number;
  inventory: string[];
  discoveredCount: number;
}

export const STATIONS: StationData[] = [
  {
    id: 'ai-core',
    title: 'AI CORE',
    category: 'Intelligence & RAG',
    x: 380,
    y: 420,
    radius: 75,
    unlocked: true,
    discovered: false,
    accentColor: '#E1E0CC',
    xpReward: 100,
    unlockedItem: 'AI CORE',
  },
  {
    id: 'vision',
    title: 'VISION SYSTEM',
    category: 'Computer Vision & Retail',
    x: 900,
    y: 280,
    radius: 75,
    unlocked: true,
    discovered: false,
    accentColor: '#D2D1C0',
    xpReward: 150,
    unlockedItem: 'CAMERA MODULE',
  },
  {
    id: 'hardware',
    title: 'HARDWARE WORKBENCH',
    category: 'ESP32-S3 & Embedded',
    x: 1420,
    y: 420,
    radius: 75,
    unlocked: true,
    discovered: false,
    accentColor: '#E1E0CC',
    xpReward: 150,
    unlockedItem: 'ESP32-S3',
  },
  {
    id: 'digital-twin',
    title: 'DIGITAL TWIN',
    category: 'Cyber-Physical Systems',
    x: 900,
    y: 720,
    radius: 80,
    unlocked: true,
    discovered: false,
    accentColor: '#C5C4B4',
    xpReward: 200,
    unlockedItem: 'DIGITAL TWIN CORE',
  },
  {
    id: 'terminal',
    title: 'CENTRAL LAB TERMINAL',
    category: 'Mainframe & Identity',
    x: 900,
    y: 1100,
    radius: 85,
    unlocked: true,
    discovered: false,
    accentColor: '#FFFFFF',
    xpReward: 0,
  },
];

export const INITIAL_INVENTORY = [
  { id: 'ai-core', name: 'AI CORE', collected: false },
  { id: 'camera', name: 'CAMERA MODULE', collected: false },
  { id: 'esp32', name: 'ESP32-S3', collected: false },
  { id: 'sensor', name: 'SENSOR', collected: false },
  { id: 'digital-twin', name: 'DIGITAL TWIN CORE', collected: false },
];
