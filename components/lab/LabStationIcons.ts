// Precision SVG & Canvas Vector Glyphs for Lab Stations
// High-craft architectural schematics replacing toy emojis for luxury consistency.

export type StationType = 'ai-core' | 'vision' | 'hardware' | 'digital-twin' | 'terminal';

export function drawStationVector(
  ctx: CanvasRenderingContext2D,
  type: StationType,
  x: number,
  y: number,
  color: string,
  isActive: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (type) {
    case 'ai-core': {
      // Neural Node & Knowledge Topology Vector
      const r = 18;
      // Center node
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Outer satellite nodes
      const angles = [0, (Math.PI * 2) / 5, (Math.PI * 4) / 5, (Math.PI * 6) / 5, (Math.PI * 8) / 5];
      angles.forEach((ang) => {
        const nx = Math.cos(ang) * r;
        const ny = Math.sin(ang) * r;

        // Trace line from center to satellite
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Satellite node
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Inter-satellite ring
      ctx.lineWidth = 1;
      ctx.beginPath();
      angles.forEach((ang, i) => {
        const nx = Math.cos(ang) * r;
        const ny = Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(nx, ny);
        else ctx.lineTo(nx, ny);
      });
      ctx.closePath();
      ctx.stroke();
      break;
    }

    case 'vision': {
      // Precision Optical Reticle & Viewfinder Aperture
      const s = 16;
      // Center focal point
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner lens circle
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Four corner brackets
      const bLen = 6;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(-s, -s + bLen);
      ctx.lineTo(-s, -s);
      ctx.lineTo(-s + bLen, -s);
      // Top-Right
      ctx.moveTo(s - bLen, -s);
      ctx.lineTo(s, -s);
      ctx.lineTo(s, -s + bLen);
      // Bottom-Right
      ctx.moveTo(s, s - bLen);
      ctx.lineTo(s, s);
      ctx.lineTo(s - bLen, s);
      // Bottom-Left
      ctx.moveTo(-s + bLen, s);
      ctx.lineTo(-s, s);
      ctx.lineTo(-s, s - bLen);
      ctx.stroke();

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(-s - 4, 0);
      ctx.lineTo(-11, 0);
      ctx.moveTo(11, 0);
      ctx.lineTo(s + 4, 0);
      ctx.moveTo(0, -s - 4);
      ctx.lineTo(0, -11);
      ctx.moveTo(0, 11);
      ctx.lineTo(0, s + 4);
      ctx.stroke();
      break;
    }

    case 'hardware': {
      // Silicon Microcontroller IC & Pinout Bus
      const chipSize = 13;
      // Chip Body
      ctx.beginPath();
      ctx.roundRect(-chipSize, -chipSize, chipSize * 2, chipSize * 2, 2.5);
      ctx.stroke();

      // Pin 1 Index Notch
      ctx.beginPath();
      ctx.arc(-chipSize + 4, -chipSize + 4, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core Die
      ctx.fillStyle = isActive ? color : 'rgba(225, 224, 204, 0.25)';
      ctx.fillRect(-5, -5, 10, 10);

      // Pins on all 4 sides
      const pinOffset = 6;
      [-pinOffset, 0, pinOffset].forEach((p) => {
        // Left pins
        ctx.beginPath();
        ctx.moveTo(-chipSize, p);
        ctx.lineTo(-chipSize - 4, p);
        ctx.stroke();

        // Right pins
        ctx.beginPath();
        ctx.moveTo(chipSize, p);
        ctx.lineTo(chipSize + 4, p);
        ctx.stroke();

        // Top pins
        ctx.beginPath();
        ctx.moveTo(p, -chipSize);
        ctx.lineTo(p, -chipSize - 4);
        ctx.stroke();

        // Bottom pins
        ctx.beginPath();
        ctx.moveTo(p, chipSize);
        ctx.lineTo(p, chipSize + 4);
        ctx.stroke();
      });
      break;
    }

    case 'digital-twin': {
      // Dual Interlocking Cyber-Physical Twin Wireframe Cubes
      const halfW = 12;
      const halfH = 7;
      const vertH = 14;

      // Physical Cube (Left)
      ctx.save();
      ctx.translate(-7, 0);
      // Top diamond
      ctx.beginPath();
      ctx.moveTo(0, -vertH);
      ctx.lineTo(halfW, -vertH + halfH);
      ctx.lineTo(0, -vertH + halfH * 2);
      ctx.lineTo(-halfW, -vertH + halfH);
      ctx.closePath();
      ctx.stroke();
      // Side drops
      ctx.beginPath();
      ctx.moveTo(-halfW, -vertH + halfH);
      ctx.lineTo(-halfW, halfH);
      ctx.moveTo(halfW, -vertH + halfH);
      ctx.lineTo(halfW, halfH);
      ctx.moveTo(0, -vertH + halfH * 2);
      ctx.lineTo(0, halfH * 2);
      // Bottom lines
      ctx.lineTo(-halfW, halfH);
      ctx.moveTo(0, halfH * 2);
      ctx.lineTo(halfW, halfH);
      ctx.stroke();
      ctx.restore();

      // Digital Twin Ghost Cube (Right)
      ctx.save();
      ctx.translate(7, -4);
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 2]);
      // Top diamond
      ctx.beginPath();
      ctx.moveTo(0, -vertH);
      ctx.lineTo(halfW, -vertH + halfH);
      ctx.lineTo(0, -vertH + halfH * 2);
      ctx.lineTo(-halfW, -vertH + halfH);
      ctx.closePath();
      ctx.stroke();
      // Side drops
      ctx.beginPath();
      ctx.moveTo(-halfW, -vertH + halfH);
      ctx.lineTo(-halfW, halfH);
      ctx.moveTo(halfW, -vertH + halfH);
      ctx.lineTo(halfW, halfH);
      ctx.moveTo(0, -vertH + halfH * 2);
      ctx.lineTo(0, halfH * 2);
      ctx.lineTo(-halfW, halfH);
      ctx.moveTo(0, halfH * 2);
      ctx.lineTo(halfW, halfH);
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'terminal': {
      // Mainframe Server Rack / Command Station
      const w = 15;
      const h = 20;

      // Outer Rack Chassis
      ctx.beginPath();
      ctx.roundRect(-w, -h, w * 2, h * 2, 3);
      ctx.stroke();

      // Server Blade Slots
      const slotYs = [-12, -4, 4, 12];
      slotYs.forEach((sy) => {
        ctx.beginPath();
        ctx.moveTo(-w + 4, sy);
        ctx.lineTo(w - 7, sy);
        ctx.stroke();

        // LED Indicator on blade
        ctx.beginPath();
        ctx.arc(w - 4, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Terminal Header Accent
      ctx.fillRect(-w + 4, -h + 3, 5, 2);
      break;
    }
  }

  ctx.restore();
}
