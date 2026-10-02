// Procedural Three.js 3D Model Generator for Arduino Uno R3
// Built with physically-based (PBR) materials, authentic Arduino Teal PCB, ATmega328P DIP IC,
// USB Type-B port, DC barrel jack, female headers, crystal oscillator, and interactive LEDs.

import * as THREE from 'three';

export type ArduinoComponentId =
  | 'board'
  | 'atmega328p'
  | 'usb_b'
  | 'dc_jack'
  | 'reset_btn'
  | 'led_l'
  | 'led_on'
  | 'led_tx_rx'
  | 'crystal'
  | 'digital_headers'
  | 'analog_headers'
  | 'power_headers'
  | 'regulator'
  | 'capacitors';

export interface ArduinoModelNodes {
  group: THREE.Group;
  ledLMaterial: THREE.MeshStandardMaterial;
  ledLLight: THREE.PointLight;
  ledOnLight: THREE.PointLight;
  ledTxMaterial: THREE.MeshStandardMaterial;
  ledRxMaterial: THREE.MeshStandardMaterial;
  interactiveMeshes: THREE.Mesh[];
}

export function createArduinoUnoModel(): ArduinoModelNodes {
  const group = new THREE.Group();
  group.name = 'ARDUINO_UNO_R3';

  const interactiveMeshes: THREE.Mesh[] = [];

  // =========================================================================
  // 1. PBR MATERIALS
  // =========================================================================

  // Iconic Arduino Teal Blue solder mask
  const pcbMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#008184'),
    roughness: 0.55,
    metalness: 0.12,
  });

  // Metallic Gold contacts / pads / test points
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e0b338'),
    roughness: 0.25,
    metalness: 0.9,
  });

  // Stainless steel metal (USB-B shell, crystal can, bracket)
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#dcdfe4'),
    roughness: 0.25,
    metalness: 0.9,
  });

  // Black plastic (DC jack, IC body, headers)
  const blackPlasticMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#141414'),
    roughness: 0.55,
    metalness: 0.08,
  });

  // Matte IC package plastic with slight texture
  const icBodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e1e1e'),
    roughness: 0.65,
    metalness: 0.05,
  });

  // Silver tin solder pins & endcaps
  const solderPinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c5cbd2'),
    roughness: 0.3,
    metalness: 0.82,
  });

  // Aluminum electrolytic capacitor can (silver cylinder with black negative stripe)
  const aluCapMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c8ccd0'),
    roughness: 0.35,
    metalness: 0.75,
  });

  // Red tactile reset button actuator
  const resetActuatorMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#dc2626'),
    roughness: 0.4,
    metalness: 0.1,
  });

  // LEDs:
  // ON LED: Green
  const ledOnMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22c55e'),
    emissive: new THREE.Color('#16a34a'),
    emissiveIntensity: 1.2,
    roughness: 0.2,
  });

  // L LED (Pin 13): Amber / Yellow (Interactive!)
  const ledLMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#332200'),
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.0,
    roughness: 0.2,
  });

  // TX & RX LEDs: Yellow
  const ledTxMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#443300'),
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.0,
    roughness: 0.2,
  });

  const ledRxMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#443300'),
    emissive: new THREE.Color('#000000'),
    emissiveIntensity: 0.0,
    roughness: 0.2,
  });

  // =========================================================================
  // 2. PROCEDURAL SILKSCREEN & PCB TEXTURE
  // =========================================================================
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base Teal Blue
    ctx.fillStyle = '#008184';
    ctx.fillRect(0, 0, 1024, 800);

    // Subtle ground copper tracks / contours
    ctx.strokeStyle = '#006e71';
    ctx.lineWidth = 2;
    for (let x = 60; x < 980; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x + 30, 760);
      ctx.stroke();
    }

    // White silkscreen layer
    ctx.strokeStyle = '#f4f4f0';
    ctx.fillStyle = '#f4f4f0';

    // Outer board outline
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 964, 740);

    // Arduino infinity logo
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('ARDUINO', 460, 260);
    ctx.font = 'bold 52px sans-serif';
    ctx.fillText('UNO', 670, 265);

    // Infinity loop symbol (two interlocking circles)
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(400, 248, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(435, 248, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = 'bold 20px monospace';
    ctx.fillText('-', 394, 255);
    ctx.fillText('+', 429, 255);

    // Top Digital Pin Header labels
    ctx.font = 'bold 15px monospace';
    ctx.fillText('DIGITAL (PWM ~)', 420, 70);
    const topPins = ['AREF', 'GND', '13', '12', '~11', '~10', '~9', '8', '7', '~6', '~5', '4', '~3', '2', 'TX>1', 'RX<0'];
    topPins.forEach((p, idx) => {
      ctx.fillText(p, 250 + idx * 44, 98);
    });

    // Bottom Power & Analog Pin Header labels
    ctx.fillText('POWER', 270, 725);
    const pwrPins = ['IOREF', 'RESET', '3.3V', '5V', 'GND', 'GND', 'VIN'];
    pwrPins.forEach((p, idx) => {
      ctx.fillText(p, 230 + idx * 40, 695);
    });

    ctx.fillText('ANALOG IN', 630, 725);
    const analogPins = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
    analogPins.forEach((p, idx) => {
      ctx.fillText(p, 620 + idx * 42, 695);
    });

    // Component Indicators
    ctx.font = 'bold 13px monospace';
    ctx.fillText('MADE IN ITALY', 460, 290);
    ctx.fillText('RESET', 110, 160);
    ctx.fillText('ON', 775, 410);
    ctx.fillText('L', 365, 140);
    ctx.fillText('TX', 365, 195);
    ctx.fillText('RX', 365, 225);
    ctx.fillText('ATMEGA328P-PU', 480, 520);
    ctx.fillText('ICSP', 850, 480);
  }

  const pcbTexture = new THREE.CanvasTexture(canvas);
  pcbTexture.colorSpace = THREE.SRGBColorSpace;
  pcbMaterial.map = pcbTexture;

  // =========================================================================
  // 3. MAIN PCB SLAB (ARDUINO DIMENSIONS)
  // =========================================================================
  const pcbWidth = 6.86;
  const pcbDepth = 5.34;
  const pcbHeight = 0.16;

  const pcbGeo = new THREE.BoxGeometry(pcbWidth, pcbHeight, pcbDepth);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMaterial);
  pcbMesh.castShadow = true;
  pcbMesh.receiveShadow = true;
  pcbMesh.userData = { componentId: 'board' as ArduinoComponentId };
  interactiveMeshes.push(pcbMesh);
  group.add(pcbMesh);

  // 4 Corner Gold Mounting Holes
  const holePositions = [
    { x: -pcbWidth / 2 + 1.4, z: -pcbDepth / 2 + 0.35 },
    { x: pcbWidth / 2 - 0.4, z: -pcbDepth / 2 + 0.8 },
    { x: pcbWidth / 2 - 0.4, z: pcbDepth / 2 - 0.7 },
    { x: -pcbWidth / 2 + 1.5, z: pcbDepth / 2 - 0.35 },
  ];

  const holeRingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.01, 16);
  const holeDarkGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);

  holePositions.forEach((hp) => {
    const ring = new THREE.Mesh(holeRingGeo, goldMaterial);
    ring.position.set(hp.x, pcbHeight / 2 + 0.006, hp.z);
    group.add(ring);

    const hole = new THREE.Mesh(holeDarkGeo, blackPlasticMaterial);
    hole.position.set(hp.x, 0, hp.z);
    group.add(hole);
  });

  // =========================================================================
  // 4. ATMEGA328P DUAL IN-LINE PACKAGE (DIP-28) & SOCKET
  // =========================================================================
  const atmegaGroup = new THREE.Group();
  atmegaGroup.position.set(0.9, pcbHeight / 2 + 0.18, 0.95);

  // Black IC Socket
  const socketGeo = new THREE.BoxGeometry(3.6, 0.12, 1.05);
  const socketMesh = new THREE.Mesh(socketGeo, blackPlasticMaterial);
  socketMesh.castShadow = true;
  atmegaGroup.add(socketMesh);

  // Main DIP-28 Chip Body
  const icGeo = new THREE.BoxGeometry(3.4, 0.22, 0.85);

  // Laser engraved text texture on the chip
  const icCanvas = document.createElement('canvas');
  icCanvas.width = 512;
  icCanvas.height = 128;
  const icCtx = icCanvas.getContext('2d');
  if (icCtx) {
    icCtx.fillStyle = '#1c1c1c';
    icCtx.fillRect(0, 0, 512, 128);

    // Laser text
    icCtx.fillStyle = '#9ca3af';
    icCtx.font = 'bold 28px sans-serif';
    icCtx.fillText('ATMEGA328P-PU', 110, 55);
    icCtx.font = '20px monospace';
    icCtx.fillText('ATMEL 2620 / 16MHz', 110, 88);

    // Pin 1 Notch & Dot
    icCtx.fillStyle = '#111111';
    icCtx.beginPath();
    icCtx.arc(28, 64, 18, 0, Math.PI * 2);
    icCtx.fill();
    icCtx.fillStyle = '#9ca3af';
    icCtx.beginPath();
    icCtx.arc(55, 38, 7, 0, Math.PI * 2);
    icCtx.fill();
  }
  const icTex = new THREE.CanvasTexture(icCanvas);
  icTex.colorSpace = THREE.SRGBColorSpace;

  const icTopMat = new THREE.MeshStandardMaterial({
    map: icTex,
    roughness: 0.6,
    metalness: 0.1,
  });

  const icMaterials = [
    icBodyMaterial, // right
    icBodyMaterial, // left
    icTopMat,       // top
    icBodyMaterial, // bottom
    icBodyMaterial, // front
    icBodyMaterial, // back
  ];

  const icMesh = new THREE.Mesh(icGeo, icMaterials);
  icMesh.position.set(0, 0.15, 0);
  icMesh.castShadow = true;
  icMesh.userData = { componentId: 'atmega328p' as ArduinoComponentId };
  interactiveMeshes.push(icMesh);
  atmegaGroup.add(icMesh);

  // 28 Silver Pins (14 on top row, 14 on bottom row)
  const pinGeo = new THREE.BoxGeometry(0.06, 0.22, 0.12);
  const pinPitch = 0.24;
  for (let i = 0; i < 14; i++) {
    const px = -1.55 + i * pinPitch;

    // Top pin
    const pinTop = new THREE.Mesh(pinGeo, solderPinMaterial);
    pinTop.position.set(px, 0.04, -0.48);
    atmegaGroup.add(pinTop);

    // Bottom pin
    const pinBottom = new THREE.Mesh(pinGeo, solderPinMaterial);
    pinBottom.position.set(px, 0.04, 0.48);
    atmegaGroup.add(pinBottom);
  }

  group.add(atmegaGroup);

  // =========================================================================
  // 5. USB TYPE-B CONNECTOR (TOP-LEFT)
  // =========================================================================
  const usbGroup = new THREE.Group();
  usbGroup.position.set(-pcbWidth / 2 + 0.65, pcbHeight / 2 + 0.55, -pcbDepth / 2 + 1.2);

  // Outer metal casing
  const usbShellGeo = new THREE.BoxGeometry(1.5, 1.1, 1.2);
  const usbShell = new THREE.Mesh(usbShellGeo, steelMaterial);
  usbShell.castShadow = true;
  usbGroup.add(usbShell);

  // Interior socket cavity
  const usbHoleGeo = new THREE.BoxGeometry(0.7, 0.7, 0.9);
  const usbHole = new THREE.Mesh(usbHoleGeo, blackPlasticMaterial);
  usbHole.position.set(-0.45, 0, 0);
  usbGroup.add(usbHole);

  usbShell.userData = { componentId: 'usb_b' as ArduinoComponentId };
  interactiveMeshes.push(usbShell);
  group.add(usbGroup);

  // =========================================================================
  // 6. DC BARREL POWER JACK (BOTTOM-LEFT)
  // =========================================================================
  const dcGroup = new THREE.Group();
  dcGroup.position.set(-pcbWidth / 2 + 0.7, pcbHeight / 2 + 0.55, pcbDepth / 2 - 1.0);

  // Outer black plastic body
  const dcBodyGeo = new THREE.BoxGeometry(1.4, 1.05, 0.95);
  const dcBody = new THREE.Mesh(dcBodyGeo, blackPlasticMaterial);
  dcBody.castShadow = true;
  dcGroup.add(dcBody);

  // Circular barrel opening
  const dcHoleGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16);
  dcHoleGeo.rotateZ(Math.PI / 2);
  const dcHole = new THREE.Mesh(dcHoleGeo, new THREE.MeshBasicMaterial({ color: 0x050505 }));
  dcHole.position.set(-0.35, 0.05, 0);
  dcGroup.add(dcHole);

  // Center pin
  const dcCenterPinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
  dcCenterPinGeo.rotateZ(Math.PI / 2);
  const dcCenterPin = new THREE.Mesh(dcCenterPinGeo, steelMaterial);
  dcCenterPin.position.set(-0.25, 0.05, 0);
  dcGroup.add(dcCenterPin);

  dcBody.userData = { componentId: 'dc_jack' as ArduinoComponentId };
  interactiveMeshes.push(dcBody);
  group.add(dcGroup);

  // =========================================================================
  // 7. 16.000 MHz CRYSTAL OSCILLATOR (HC-49S OVAL CAN)
  // =========================================================================
  const crystalGroup = new THREE.Group();
  crystalGroup.position.set(-0.4, pcbHeight / 2 + 0.16, 0.15);

  const crystalCanGeo = new THREE.BoxGeometry(0.95, 0.3, 0.38);
  const crystalCan = new THREE.Mesh(crystalCanGeo, steelMaterial);
  crystalCan.castShadow = true;
  crystalGroup.add(crystalCan);

  crystalCan.userData = { componentId: 'crystal' as ArduinoComponentId };
  interactiveMeshes.push(crystalCan);
  group.add(crystalGroup);

  // =========================================================================
  // 8. TACTILE RESET BUTTON (TOP-LEFT)
  // =========================================================================
  const btnGroup = new THREE.Group();
  btnGroup.position.set(-pcbWidth / 2 + 0.45, pcbHeight / 2 + 0.16, -pcbDepth / 2 + 2.3);

  const btnBracketGeo = new THREE.BoxGeometry(0.55, 0.24, 0.55);
  const btnBracket = new THREE.Mesh(btnBracketGeo, steelMaterial);
  btnBracket.castShadow = true;
  btnGroup.add(btnBracket);

  const btnPlungerGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 16);
  const btnPlunger = new THREE.Mesh(btnPlungerGeo, resetActuatorMaterial);
  btnPlunger.position.set(0, 0.16, 0);
  btnGroup.add(btnPlunger);

  btnBracket.userData = { componentId: 'reset_btn' as ArduinoComponentId };
  interactiveMeshes.push(btnBracket);
  group.add(btnGroup);

  // =========================================================================
  // 9. FEMALE PIN HEADERS (TOP & BOTTOM ROWS)
  // =========================================================================
  const createHeader = (
    id: ArduinoComponentId,
    x: number,
    z: number,
    numPins: number
  ) => {
    const headerGroup = new THREE.Group();
    const pitch = 0.254;
    const length = numPins * pitch;
    const height = 0.85;
    const width = 0.25;

    headerGroup.position.set(x, pcbHeight / 2 + height / 2, z);

    // Black plastic block
    const blockGeo = new THREE.BoxGeometry(length, height, width);
    const blockMesh = new THREE.Mesh(blockGeo, blackPlasticMaterial);
    blockMesh.castShadow = true;
    headerGroup.add(blockMesh);

    // Square pin socket receptacles
    const sockGeo = new THREE.BoxGeometry(0.12, 0.05, 0.12);
    for (let p = 0; p < numPins; p++) {
      const px = -length / 2 + (p + 0.5) * pitch;
      const hole = new THREE.Mesh(sockGeo, new THREE.MeshBasicMaterial({ color: 0x020202 }));
      hole.position.set(px, height / 2 - 0.02, 0);
      headerGroup.add(hole);
    }

    blockMesh.userData = { componentId: id };
    interactiveMeshes.push(blockMesh);
    group.add(headerGroup);
  };

  // Top digital headers: 10-pin + 8-pin
  createHeader('digital_headers', 0.2, -pcbDepth / 2 + 0.2, 10);
  createHeader('digital_headers', 1.85, -pcbDepth / 2 + 0.2, 8);

  // Bottom headers: 8-pin Power + 6-pin Analog
  createHeader('power_headers', 0.4, pcbDepth / 2 - 0.2, 8);
  createHeader('analog_headers', 2.3, pcbDepth / 2 - 0.2, 6);

  // =========================================================================
  // 10. STATUS & INTERACTIVE LEDS (ON, L, TX, RX)
  // =========================================================================
  const ledGeo = new THREE.BoxGeometry(0.14, 0.09, 0.1);

  // ON LED (Green)
  const ledOnMesh = new THREE.Mesh(ledGeo, ledOnMaterial);
  ledOnMesh.position.set(1.9, pcbHeight / 2 + 0.05, -0.6);
  ledOnMesh.userData = { componentId: 'led_on' as ArduinoComponentId };
  interactiveMeshes.push(ledOnMesh);
  group.add(ledOnMesh);

  const ledOnLight = new THREE.PointLight('#22c55e', 0.9, 1.5);
  ledOnLight.position.set(1.9, pcbHeight / 2 + 0.15, -0.6);
  group.add(ledOnLight);

  // L LED (Pin 13 Interactive - Amber/Yellow)
  const ledLMesh = new THREE.Mesh(ledGeo, ledLMaterial);
  ledLMesh.position.set(-0.8, pcbHeight / 2 + 0.05, -1.4);
  ledLMesh.userData = { componentId: 'led_l' as ArduinoComponentId };
  interactiveMeshes.push(ledLMesh);
  group.add(ledLMesh);

  const ledLLight = new THREE.PointLight('#f59e0b', 0.0, 2.5);
  ledLLight.position.set(-0.8, pcbHeight / 2 + 0.18, -1.4);
  group.add(ledLLight);

  // TX & RX LEDs
  const ledTxMesh = new THREE.Mesh(ledGeo, ledTxMaterial);
  ledTxMesh.position.set(-0.8, pcbHeight / 2 + 0.05, -0.9);
  ledTxMesh.userData = { componentId: 'led_tx_rx' as ArduinoComponentId };
  interactiveMeshes.push(ledTxMesh);
  group.add(ledTxMesh);

  const ledRxMesh = new THREE.Mesh(ledGeo, ledRxMaterial);
  ledRxMesh.position.set(-0.8, pcbHeight / 2 + 0.05, -0.65);
  ledRxMesh.userData = { componentId: 'led_tx_rx' as ArduinoComponentId };
  interactiveMeshes.push(ledRxMesh);
  group.add(ledRxMesh);

  // =========================================================================
  // 11. ELECTROLYTIC CAPACITORS & VOLTAGE REGULATOR
  // =========================================================================
  // 2 cylindrical aluminum capacitors near the power jack
  const capLocations = [
    { x: -pcbWidth / 2 + 1.8, z: 0.1 },
    { x: -pcbWidth / 2 + 1.8, z: 0.9 },
  ];

  capLocations.forEach((cl) => {
    const capGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 20);
    const capMesh = new THREE.Mesh(capGeo, aluCapMaterial);
    capMesh.position.set(cl.x, pcbHeight / 2 + 0.4, cl.z);
    capMesh.castShadow = true;
    capMesh.userData = { componentId: 'capacitors' as ArduinoComponentId };
    interactiveMeshes.push(capMesh);
    group.add(capMesh);
  });

  // Voltage regulator (SOT-223 / D-PAK)
  const regGroup = new THREE.Group();
  regGroup.position.set(-pcbWidth / 2 + 1.1, pcbHeight / 2 + 0.12, 0.2);

  const regBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.5), blackPlasticMaterial);
  regGroup.add(regBody);

  const regTab = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.25), solderPinMaterial);
  regTab.position.set(0, -0.06, -0.3);
  regGroup.add(regTab);

  regBody.userData = { componentId: 'regulator' as ArduinoComponentId };
  interactiveMeshes.push(regBody);
  group.add(regGroup);

  // ICSP 2x3 Pin Header
  const icspGroup = new THREE.Group();
  icspGroup.position.set(2.8, pcbHeight / 2 + 0.3, 0.95);
  const pinPostGeo = new THREE.BoxGeometry(0.06, 0.65, 0.06);

  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const pin = new THREE.Mesh(pinPostGeo, goldMaterial);
      pin.position.set((c - 1) * 0.254, 0, (r - 0.5) * 0.254);
      icspGroup.add(pin);
    }
  }
  group.add(icspGroup);

  return {
    group,
    ledLMaterial,
    ledLLight,
    ledOnLight,
    ledTxMaterial,
    ledRxMaterial,
    interactiveMeshes,
  };
}
