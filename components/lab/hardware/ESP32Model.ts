// Procedural Three.js 3D Model Generator for ESP32-S3 Development Board
// Faithfully matches the user's reference CAD rendering with PBR materials, gold pads, RF shield, USB-C, and pin headers.

import * as THREE from 'three';
import { ESP32ComponentId } from './ESP32Types';

export interface ESP32ModelNodes {
  group: THREE.Group;
  ledGPIO4Material: THREE.MeshStandardMaterial;
  ledGPIO4Light: THREE.PointLight;
  ledPowerLight: THREE.PointLight;
  interactiveMeshes: THREE.Mesh[];
}

export function createESP32Model(): ESP32ModelNodes {
  const group = new THREE.Group();
  group.name = 'ESP32_S3_BOARD';

  const interactiveMeshes: THREE.Mesh[] = [];

  // =========================================================================
  // 1. SHARED PBR MATERIALS
  // =========================================================================

  // Solder mask: dark matte PCB green with subtle sheen
  const pcbMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#142419'),
    roughness: 0.65,
    metalness: 0.1,
  });

  // Antenna substrate: matte dark FR4
  const antennaSubstrateMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#222421'),
    roughness: 0.8,
    metalness: 0.05,
  });

  // Gold pads, header pins & antenna traces
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e0b338'),
    roughness: 0.28,
    metalness: 0.88,
  });

  // Metallic RF shield can (brushed nickel-silver)
  const rfCanMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cfd3d8'),
    roughness: 0.35,
    metalness: 0.85,
  });

  // Stainless steel (USB-C & button brackets)
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e2e5e9'),
    roughness: 0.22,
    metalness: 0.92,
  });

  // Black plastic / epoxy (ICs, headers, button plungers)
  const blackPlasticMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#181818'),
    roughness: 0.55,
    metalness: 0.1,
  });

  // SMD passives (capacitors: ceramic tan)
  const capacitorMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9c7855'),
    roughness: 0.45,
    metalness: 0.2,
  });

  // SMD passives (resistors: matte black)
  const resistorMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#202020'),
    roughness: 0.6,
    metalness: 0.1,
  });

  // SMD solder endcaps
  const solderMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c0c4c8'),
    roughness: 0.3,
    metalness: 0.8,
  });

  // LEDs
  const ledPowerMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ff3333'),
    emissive: new THREE.Color('#ff2222'),
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });

  const ledStatusMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#33cc55'),
    emissive: new THREE.Color('#22aa44'),
    emissiveIntensity: 0.7,
    roughness: 0.2,
  });

  // GPIO 4 User LED (Interactive!)
  const ledGPIO4Material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#224455'),
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.0,
    roughness: 0.2,
  });

  // =========================================================================
  // 2. PROCEDURAL SILKSCREEN & TRACE TEXTURE
  // =========================================================================
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base PCB dark solder mask
    ctx.fillStyle = '#142419';
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle copper ground plane hatch / traces
    ctx.strokeStyle = '#1b3423';
    ctx.lineWidth = 1.5;
    for (let x = 40; x < 980; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x + 20, 470);
      ctx.stroke();
    }

    // White silkscreen borders & pin labels
    ctx.strokeStyle = '#e6e8e2';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#e6e8e2';
    ctx.font = 'bold 15px monospace';

    // Top pin numbers
    const topPins = ['5V', '1', '2', '43', '44', '42', '41', '40', '39', '38', '37', '36', '35', '0', '45', '48', '47', '21', '14', '13'];
    topPins.forEach((label, i) => {
      const x = 110 + i * 42;
      ctx.fillText(label, x - 10, 85);
    });

    // Bottom pin numbers
    const bottomPins = ['GND', '3V3', 'EN', '4', '5', '6', '7', '15', '16', '17', '18', '8', '19', '20', '3', '46', '9', '10', '11', '12'];
    bottomPins.forEach((label, i) => {
      const x = 110 + i * 42;
      ctx.fillText(label, x - 12, 440);
    });

    // Component silkscreen labels
    ctx.font = '13px monospace';
    ctx.fillText('BOOT', 785, 220);
    ctx.fillText('RESET', 785, 310);
    ctx.fillText('R1', 740, 220);
    ctx.fillText('C4', 740, 205);
    ctx.fillText('R2', 710, 345);
    ctx.fillText('R3 R6 R5 R4', 530, 190);
    ctx.fillText('D1 D2 D3', 530, 290);
    ctx.fillText('ESP32-S3 DevKit', 420, 260);

    // Espressif logo hint on board
    ctx.lineWidth = 2.5;
    ctx.strokeRect(90, 105, 320, 300);
  }

  const pcbTexture = new THREE.CanvasTexture(canvas);
  pcbTexture.colorSpace = THREE.SRGBColorSpace;
  pcbMaterial.map = pcbTexture;

  // =========================================================================
  // 3. MAIN PCB SLAB
  // =========================================================================
  const pcbWidth = 5.6;
  const pcbHeight = 0.12;
  const pcbDepth = 2.6;

  const pcbGeo = new THREE.BoxGeometry(pcbWidth, pcbHeight, pcbDepth);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMaterial);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  group.add(pcbMesh);

  // =========================================================================
  // 4. PCB ANTENNA TAB (LEFT EXTENSION)
  // =========================================================================
  const antennaWidth = 1.0;
  const antennaGeo = new THREE.BoxGeometry(antennaWidth, pcbHeight * 0.95, pcbDepth * 0.85);
  const antennaMesh = new THREE.Mesh(antennaGeo, antennaSubstrateMaterial);
  antennaMesh.position.set(-pcbWidth / 2 - antennaWidth / 2 + 0.05, 0, 0);
  antennaMesh.castShadow = true;
  antennaMesh.userData = { componentId: 'antenna' as ESP32ComponentId };
  interactiveMeshes.push(antennaMesh);
  group.add(antennaMesh);

  // Gold meandering trace on the antenna
  const meanderGroup = new THREE.Group();
  const traceMat = goldMaterial;
  const traceHeight = 0.015;

  // Meander lines
  const meanderLines = [
    { x: -0.35, z: 0, w: 0.08, d: 1.8 },
    { x: -0.2, z: 0.5, w: 0.22, d: 0.08 },
    { x: -0.05, z: 0, w: 0.08, d: 1.2 },
    { x: 0.1, z: -0.5, w: 0.22, d: 0.08 },
    { x: 0.25, z: 0, w: 0.08, d: 1.8 },
  ];

  meanderLines.forEach((m) => {
    const geo = new THREE.BoxGeometry(m.w, traceHeight, m.d);
    const trace = new THREE.Mesh(geo, traceMat);
    trace.position.set(m.x, pcbHeight / 2 + traceHeight / 2, m.z);
    meanderGroup.add(trace);
  });
  antennaMesh.add(meanderGroup);

  // =========================================================================
  // 5. METAL RF SHIELD CAN (ESP32-S3 MODULE)
  // =========================================================================
  const canWidth = 1.8;
  const canHeight = 0.22;
  const canDepth = 1.8;

  const canGeo = new THREE.BoxGeometry(canWidth, canHeight, canDepth);

  // Create canvas for laser engraving on top of the RF shield
  const canCanvas = document.createElement('canvas');
  canCanvas.width = 512;
  canCanvas.height = 512;
  const cctx = canCanvas.getContext('2d');
  if (cctx) {
    cctx.fillStyle = '#d2d6dc';
    cctx.fillRect(0, 0, 512, 512);

    // Brushed metal noise lines
    cctx.strokeStyle = '#c4c8ce';
    cctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 4) {
      cctx.beginPath();
      cctx.moveTo(0, i);
      cctx.lineTo(512, i);
      cctx.stroke();
    }

    // Espressif logo spiral
    cctx.strokeStyle = '#5a5d62';
    cctx.lineWidth = 8;
    cctx.beginPath();
    cctx.arc(256, 190, 45, 0, Math.PI * 1.7);
    cctx.stroke();

    // Laser text
    cctx.fillStyle = '#4a4d52';
    cctx.font = 'bold 36px sans-serif';
    cctx.textAlign = 'center';
    cctx.fillText('ESP32-S3', 256, 275);

    cctx.font = '18px monospace';
    cctx.fillText('Xtensa Dual-Core LX7', 256, 315);
    cctx.fillText('240MHz · 512KB SRAM', 256, 345);
    cctx.fillText('FCC ID: 2AC7Z-ESPS3', 256, 380);
    cctx.fillText('CE / RoHS · Espressif', 256, 410);
  }
  const canTexture = new THREE.CanvasTexture(canCanvas);
  canTexture.colorSpace = THREE.SRGBColorSpace;

  const canTopMat = new THREE.MeshStandardMaterial({
    map: canTexture,
    roughness: 0.35,
    metalness: 0.85,
  });

  const canMaterials = [
    rfCanMaterial, // right
    rfCanMaterial, // left
    canTopMat,     // top
    rfCanMaterial, // bottom
    rfCanMaterial, // front
    rfCanMaterial, // back
  ];

  const canMesh = new THREE.Mesh(canGeo, canMaterials);
  canMesh.position.set(-1.1, pcbHeight / 2 + canHeight / 2, 0);
  canMesh.castShadow = true;
  canMesh.receiveShadow = true;
  canMesh.userData = { componentId: 'chip' as ESP32ComponentId };
  interactiveMeshes.push(canMesh);
  group.add(canMesh);

  // Castellated solder pads on the module edge
  const castGeo = new THREE.BoxGeometry(0.04, 0.08, 0.08);
  for (let cz = -0.8; cz <= 0.8; cz += 0.16) {
    const pad1 = new THREE.Mesh(castGeo, goldMaterial);
    pad1.position.set(-1.1 - canWidth / 2 - 0.02, pcbHeight / 2 + 0.04, cz);
    group.add(pad1);

    const pad2 = new THREE.Mesh(castGeo, goldMaterial);
    pad2.position.set(-1.1 + canWidth / 2 + 0.02, pcbHeight / 2 + 0.04, cz);
    group.add(pad2);
  }

  // =========================================================================
  // 6. USB-C CONNECTOR (RIGHT EDGE)
  // =========================================================================
  const usbGroup = new THREE.Group();
  usbGroup.position.set(pcbWidth / 2 - 0.25, pcbHeight / 2 + 0.18, 0);

  // Outer metal shell
  const usbShellGeo = new THREE.BoxGeometry(0.85, 0.32, 0.75);
  const usbShell = new THREE.Mesh(usbShellGeo, steelMaterial);
  usbShell.castShadow = true;
  usbGroup.add(usbShell);

  // Inner black tongue
  const tongueGeo = new THREE.BoxGeometry(0.4, 0.08, 0.45);
  const tongue = new THREE.Mesh(tongueGeo, blackPlasticMaterial);
  tongue.position.set(0.25, 0, 0);
  usbGroup.add(tongue);

  usbShell.userData = { componentId: 'usb_c' as ESP32ComponentId };
  interactiveMeshes.push(usbShell);
  group.add(usbGroup);

  // =========================================================================
  // 7. BOOT & RESET TACTILE BUTTONS
  // =========================================================================
  const createButton = (id: ESP32ComponentId, zPos: number) => {
    const btnGroup = new THREE.Group();
    btnGroup.position.set(pcbWidth / 2 - 0.75, pcbHeight / 2 + 0.08, zPos);

    // Metal bracket
    const bracketGeo = new THREE.BoxGeometry(0.4, 0.14, 0.4);
    const bracket = new THREE.Mesh(bracketGeo, steelMaterial);
    bracket.castShadow = true;
    btnGroup.add(bracket);

    // Black central plunger
    const plungerGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.12, 16);
    const plunger = new THREE.Mesh(plungerGeo, blackPlasticMaterial);
    plunger.position.set(0, 0.1, 0);
    btnGroup.add(plunger);

    bracket.userData = { componentId: id };
    interactiveMeshes.push(bracket);
    group.add(btnGroup);
  };

  createButton('boot_btn', -0.85);
  createButton('reset_btn', 0.85);

  // =========================================================================
  // 8. SOT-223 LDO VOLTAGE REGULATOR (CENTER)
  // =========================================================================
  const ldoGroup = new THREE.Group();
  ldoGroup.position.set(0.95, pcbHeight / 2 + 0.1, -0.1);

  // Main black IC body
  const ldoBodyGeo = new THREE.BoxGeometry(0.65, 0.18, 0.45);
  const ldoBody = new THREE.Mesh(ldoBodyGeo, blackPlasticMaterial);
  ldoBody.castShadow = true;
  ldoGroup.add(ldoBody);

  // Heatsink tab
  const tabGeo = new THREE.BoxGeometry(0.45, 0.04, 0.2);
  const tab = new THREE.Mesh(tabGeo, solderMaterial);
  tab.position.set(0, -0.04, -0.3);
  ldoGroup.add(tab);

  // 3 lead legs
  const legGeo = new THREE.BoxGeometry(0.1, 0.04, 0.18);
  [-0.2, 0, 0.2].forEach((lx) => {
    const leg = new THREE.Mesh(legGeo, solderMaterial);
    leg.position.set(lx, -0.06, 0.28);
    ldoGroup.add(leg);
  });

  ldoBody.userData = { componentId: 'ldo_regulator' as ESP32ComponentId };
  interactiveMeshes.push(ldoBody);
  group.add(ldoGroup);

  // =========================================================================
  // 9. STATUS LEDS (D1, D2, D3)
  // =========================================================================
  const ledGeo = new THREE.BoxGeometry(0.12, 0.08, 0.09);

  // D1: Power LED (Red)
  const d1Mesh = new THREE.Mesh(ledGeo, ledPowerMaterial);
  d1Mesh.position.set(0.35, pcbHeight / 2 + 0.05, 0.35);
  d1Mesh.userData = { componentId: 'led_power' as ESP32ComponentId };
  interactiveMeshes.push(d1Mesh);
  group.add(d1Mesh);

  const ledPowerLight = new THREE.PointLight('#ff3333', 0.8, 1.2);
  ledPowerLight.position.set(0.35, pcbHeight / 2 + 0.12, 0.35);
  group.add(ledPowerLight);

  // D2: Status LED (Green)
  const d2Mesh = new THREE.Mesh(ledGeo, ledStatusMaterial);
  d2Mesh.position.set(0.15, pcbHeight / 2 + 0.05, 0.35);
  d2Mesh.userData = { componentId: 'led_status' as ESP32ComponentId };
  interactiveMeshes.push(d2Mesh);
  group.add(d2Mesh);

  // D3: Interactive GPIO 4 LED (Blue/Amber)
  const d3Mesh = new THREE.Mesh(ledGeo, ledGPIO4Material);
  d3Mesh.position.set(-0.05, pcbHeight / 2 + 0.05, 0.35);
  d3Mesh.userData = { componentId: 'led_gpio4' as ESP32ComponentId };
  interactiveMeshes.push(d3Mesh);
  group.add(d3Mesh);

  const ledGPIO4Light = new THREE.PointLight('#38bdf8', 0, 2.5);
  ledGPIO4Light.position.set(-0.05, pcbHeight / 2 + 0.15, 0.35);
  group.add(ledGPIO4Light);

  // =========================================================================
  // 10. SMD RESISTORS & CAPACITORS (SCATTERED ON BOARD)
  // =========================================================================
  const smdLocations = [
    { x: 0.1, z: -0.65, type: 'res' },
    { x: 0.3, z: -0.65, type: 'cap' },
    { x: 0.5, z: -0.65, type: 'res' },
    { x: 0.7, z: -0.65, type: 'cap' },
    { x: 0.1, z: 0.05, type: 'cap' },
    { x: 0.3, z: 0.05, type: 'res' },
    { x: 1.45, z: -0.45, type: 'res' },
    { x: 1.45, z: 0.45, type: 'cap' },
  ];

  smdLocations.forEach((s) => {
    const smdGroup = new THREE.Group();
    smdGroup.position.set(s.x, pcbHeight / 2 + 0.03, s.z);

    const bodyGeo = new THREE.BoxGeometry(0.1, 0.05, 0.06);
    const bodyMat = s.type === 'cap' ? capacitorMaterial : resistorMaterial;
    const bMesh = new THREE.Mesh(bodyGeo, bodyMat);
    smdGroup.add(bMesh);

    // Endcaps
    const capGeo = new THREE.BoxGeometry(0.025, 0.052, 0.062);
    const leftCap = new THREE.Mesh(capGeo, solderMaterial);
    leftCap.position.set(-0.05, 0, 0);
    smdGroup.add(leftCap);

    const rightCap = new THREE.Mesh(capGeo, solderMaterial);
    rightCap.position.set(0.05, 0, 0);
    smdGroup.add(rightCap);

    group.add(smdGroup);
  });

  // =========================================================================
  // 11. DUAL 20-PIN GPIO HEADERS & GOLD THROUGH-HOLE PADS
  // =========================================================================
  const pinCount = 20;
  const pinPitch = 0.24;
  const startX = -((pinCount - 1) * pinPitch) / 2 + 0.2;

  const padGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16);
  const holeGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 16);
  const holeMat = blackPlasticMaterial;

  const headerBlockGeo = new THREE.BoxGeometry(pinCount * pinPitch, 0.3, 0.24);
  const headerPinGeo = new THREE.BoxGeometry(0.05, 0.85, 0.05);

  // Top header row (-Z)
  const topHeaderZ = -pcbDepth / 2 + 0.16;
  const topBlock = new THREE.Mesh(headerBlockGeo, blackPlasticMaterial);
  topBlock.position.set(startX + ((pinCount - 1) * pinPitch) / 2, -pcbHeight / 2 - 0.15, topHeaderZ);
  group.add(topBlock);

  // Bottom header row (+Z)
  const bottomHeaderZ = pcbDepth / 2 - 0.16;
  const bottomBlock = new THREE.Mesh(headerBlockGeo, blackPlasticMaterial);
  bottomBlock.position.set(startX + ((pinCount - 1) * pinPitch) / 2, -pcbHeight / 2 - 0.15, bottomHeaderZ);
  group.add(bottomBlock);

  // Interactive bounding collision boxes for GPIO headers
  const topHitBoxGeo = new THREE.BoxGeometry(pinCount * pinPitch + 0.2, 0.4, 0.4);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });

  const topHitBox = new THREE.Mesh(topHitBoxGeo, hitMat);
  topHitBox.position.set(startX + ((pinCount - 1) * pinPitch) / 2, 0, topHeaderZ);
  topHitBox.userData = { componentId: 'gpio_left' as ESP32ComponentId };
  interactiveMeshes.push(topHitBox);
  group.add(topHitBox);

  const bottomHitBox = new THREE.Mesh(topHitBoxGeo, hitMat);
  bottomHitBox.position.set(startX + ((pinCount - 1) * pinPitch) / 2, 0, bottomHeaderZ);
  bottomHitBox.userData = { componentId: 'gpio_right' as ESP32ComponentId };
  interactiveMeshes.push(bottomHitBox);
  group.add(bottomHitBox);

  // Populate individual 40 pins & pads
  for (let i = 0; i < pinCount; i++) {
    const px = startX + i * pinPitch;

    // Top Pad
    const padTop = new THREE.Mesh(padGeo, goldMaterial);
    padTop.position.set(px, pcbHeight / 2 + 0.005, topHeaderZ);
    group.add(padTop);

    const holeTop = new THREE.Mesh(holeGeo, holeMat);
    holeTop.position.set(px, pcbHeight / 2 + 0.006, topHeaderZ);
    group.add(holeTop);

    // Top Pin underneath
    const pinTop = new THREE.Mesh(headerPinGeo, goldMaterial);
    pinTop.position.set(px, -pcbHeight / 2 - 0.35, topHeaderZ);
    group.add(pinTop);

    // Bottom Pad
    const padBottom = new THREE.Mesh(padGeo, goldMaterial);
    padBottom.position.set(px, pcbHeight / 2 + 0.005, bottomHeaderZ);
    group.add(padBottom);

    const holeBottom = new THREE.Mesh(holeGeo, holeMat);
    holeBottom.position.set(px, pcbHeight / 2 + 0.006, bottomHeaderZ);
    group.add(holeBottom);

    // Bottom Pin underneath
    const pinBottom = new THREE.Mesh(headerPinGeo, goldMaterial);
    pinBottom.position.set(px, -pcbHeight / 2 - 0.35, bottomHeaderZ);
    group.add(pinBottom);
  }

  return {
    group,
    ledGPIO4Material,
    ledGPIO4Light,
    ledPowerLight,
    interactiveMeshes,
  };
}
