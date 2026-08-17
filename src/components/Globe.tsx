'use client';

import React, { useEffect, useRef, useState } from 'react';

// Normalized 1000x500 coordinates for simplified landmasses
const LAND_POLYGONS: [number, number][][] = [
  // North America
  [
    [40, 90], [70, 70], [100, 60], [130, 75], [160, 55], [210, 55], [240, 70], [250, 95], [275, 105], [250, 125], 
    [240, 155], [265, 185], [275, 215], [250, 245], [240, 280], [215, 290], [195, 290], [180, 315], [175, 335], 
    [165, 335], [160, 305], [170, 275], [150, 255], [135, 255], [120, 235], [105, 235], [85, 215], [75, 175], 
    [55, 165], [45, 145]
  ],
  // Greenland
  [
    [260, 45], [315, 30], [330, 65], [290, 100], [255, 75]
  ],
  // South America
  [
    [175, 335], [200, 345], [230, 365], [260, 395], [275, 415], [255, 455], [230, 495], [205, 545], [195, 545], 
    [195, 505], [180, 475], [165, 435], [155, 385], [160, 355]
  ],
  // Africa
  [
    [360, 255], [415, 245], [465, 255], [480, 275], [510, 275], [525, 325], [515, 365], [490, 415], [465, 485], 
    [455, 515], [445, 515], [435, 485], [415, 435], [405, 415], [365, 375], [345, 355], [320, 325], [315, 285], 
    [335, 265]
  ],
  // Eurasia (Europe & Asia)
  [
    [360, 245], [375, 215], [365, 175], [355, 155], [370, 135], [380, 145], [385, 115], [400, 95], [425, 85], 
    [455, 75], [505, 65], [555, 55], [605, 55], [655, 65], [705, 55], [755, 65], [805, 75], [855, 95], 
    [875, 115], [845, 145], [865, 185], [835, 235], [805, 235], [785, 275], [755, 315], [715, 335], [685, 355], 
    [675, 355], [665, 335], [645, 335], [625, 355], [595, 355], [575, 325], [555, 325], [515, 315], [485, 335], 
    [465, 335], [455, 275], [415, 265], [395, 265]
  ],
  // Australia
  [
    [715, 445], [755, 425], [785, 435], [805, 475], [775, 525], [745, 525], [700, 485]
  ],
  // Madagascar
  [
    [495, 425], [505, 455], [485, 465], [475, 435]
  ],
  // Japan
  [
    [825, 175], [845, 195], [835, 225], [815, 205]
  ],
  // United Kingdom & Ireland
  [
    [335, 155], [355, 145], [365, 175], [345, 205], [330, 185]
  ]
];

// Ray casting algorithm for point-in-polygon check
function isPointInPolygon(point: [number, number], polygon: [number, number][]) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

interface Dot2D {
  x: number;
  y: number;
  opacity: number;
  pulseSpeed: number;
}

interface Port2D {
  name: string;
  normX: number;
  normY: number;
  pulse: number;
}

interface RouteSegment {
  from: { x: number; y: number };
  to: { x: number; y: number };
  h: number;
}

interface RouteShip {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const getEllipsePoint = (
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  hVal: number
) => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d === 0) return p0;

  const theta = Math.atan2(dy, dx);
  const mx = (p0.x + p1.x) / 2;
  const my = (p0.y + p1.y) / 2;

  const phi = Math.PI - t * Math.PI;
  const xLocal = (d / 2) * Math.cos(phi);
  const yLocal = hVal * Math.sin(phi);

  return {
    x: mx + xLocal * Math.cos(theta) - yLocal * Math.sin(theta),
    y: my + xLocal * Math.sin(theta) + yLocal * Math.cos(theta),
  };
};

const getSegmentLength = (
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  hVal: number
) => {
  let len = 0;
  let prev = getEllipsePoint(0, p0, p1, hVal);
  const steps = 15;
  for (let i = 1; i <= steps; i++) {
    const curr = getEllipsePoint(i / steps, p0, p1, hVal);
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    len += Math.sqrt(dx * dx + dy * dy);
    prev = curr;
  }
  return len;
};

const mapCoords = (nx: number, ny: number, w: number, h: number) => {
  const paddingX = Math.max(20, w * 0.06);
  const paddingY = Math.max(20, h * 0.06);
  const drawW = w - paddingX * 2;
  const drawH = h - paddingY * 2;

  return {
    x: paddingX + (nx / 1000) * drawW,
    y: paddingY + (ny / 530) * drawH,
  };
};

const getScaledH = (hVal: number, h: number) => {
  const paddingY = Math.max(20, h * 0.06);
  const drawH = h - paddingY * 2;
  return (hVal / 530) * drawH;
};

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [portsCount, setPortsCount] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Use refs to persist routes, ports, ships and ripples across render ticks
  const portsRef = useRef<Port2D[]>([
    { name: 'Houston', normX: 210, normY: 220, pulse: 0 },
    { name: 'Rotterdam', normX: 425, normY: 155, pulse: Math.PI / 3 },
    { name: 'Singapore', normX: 690, normY: 350, pulse: (Math.PI * 2) / 3 },
    { name: 'Shanghai', normX: 760, normY: 220, pulse: Math.PI },
    { name: 'Cape Town', normX: 460, normY: 480, pulse: (Math.PI * 4) / 3 },
    { name: 'Barranquilla', normX: 220, normY: 300, pulse: Math.PI / 6 },
  ]);

  const routeSegmentsRef = useRef<RouteSegment[][]>([
    [{ from: { x: 210, y: 220 }, to: { x: 220, y: 300 }, h: -20 }],
    [
      { from: { x: 220, y: 300 }, to: { x: 290, y: 260 }, h: 5 },
      { from: { x: 290, y: 260 }, to: { x: 310, y: 250 }, h: 5 },
      { from: { x: 310, y: 250 }, to: { x: 320, y: 110 }, h: 0 },
      { from: { x: 320, y: 110 }, to: { x: 425, y: 155 }, h: -10 }
    ],
    [
      { from: { x: 425, y: 155 }, to: { x: 320, y: 110 }, h: -10 },
      { from: { x: 320, y: 110 }, to: { x: 280, y: 220 }, h: 0 },
      { from: { x: 280, y: 220 }, to: { x: 290, y: 310 }, h: 0 },
      { from: { x: 290, y: 310 }, to: { x: 330, y: 525 }, h: 0 },
      { from: { x: 330, y: 525 }, to: { x: 470, y: 525 }, h: 0 },
      { from: { x: 470, y: 525 }, to: { x: 460, y: 480 }, h: 0 }
    ],
    [{ from: { x: 460, y: 480 }, to: { x: 690, y: 350 }, h: 80 }],
    [
      { from: { x: 690, y: 350 }, to: { x: 740, y: 360 }, h: 5 },
      { from: { x: 740, y: 360 }, to: { x: 810, y: 280 }, h: 0 },
      { from: { x: 810, y: 280 }, to: { x: 760, y: 220 }, h: -15 }
    ],
    [
      { from: { x: 760, y: 220 }, to: { x: 810, y: 235 }, h: 5 },
      { from: { x: 810, y: 235 }, to: { x: 1000, y: 235 }, h: -10 },
      { from: { x: 0, y: 235 }, to: { x: 140, y: 330 }, h: -10 },
      { from: { x: 140, y: 330 }, to: { x: 170, y: 330 }, h: 0 },
      { from: { x: 170, y: 330 }, to: { x: 250, y: 290 }, h: -10 },
      { from: { x: 250, y: 290 }, to: { x: 210, y: 220 }, h: -20 }
    ]
  ]);

  const routeLengthsRef = useRef<{ lengths: number[]; total: number }[]>([]);
  const shipsRef = useRef<RouteShip[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  // Initialize Route Lengths & Ships
  useEffect(() => {
    routeLengthsRef.current = routeSegmentsRef.current.map((segments) => {
      const lengths: number[] = [];
      let total = 0;
      segments.forEach((seg) => {
        const len = getSegmentLength(seg.from, seg.to, seg.h);
        total += len;
        lengths.push(total);
      });
      return { lengths, total };
    });

    shipsRef.current = routeSegmentsRef.current.map((_, idx) => ({
      fromIndex: idx,
      toIndex: idx,
      progress: Math.random(),
      speed: 0.0004 + Math.random() * 0.0003,
    }));
    
    setPortsCount(portsRef.current.length);
  }, []);

  // Handle Canvas Click: Toggles custom port addition and auto route integration
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert mouse client coordinates to internal canvas coordinates
    const clickX = (x / rect.width) * canvas.width;
    const clickY = (y / rect.height) * canvas.height;

    const w = canvas.width;
    const h = canvas.height;

    // Convert to normalized 1000x530 domain
    const paddingX = Math.max(20, w * 0.06);
    const paddingY = Math.max(20, h * 0.06);
    const drawW = w - paddingX * 2;
    const drawH = h - paddingY * 2;

    const nx = ((clickX - paddingX) / drawW) * 1000;
    const ny = ((clickY - paddingY) / drawH) * 530;

    // Bounds safety checks
    if (nx < 10 || nx > 990 || ny < 10 || ny > 520) return;

    // Find nearest port in existing ports to connect to
    let nearestPort = portsRef.current[0];
    let minDist = Infinity;

    portsRef.current.forEach((port) => {
      const dx = port.normX - nx;
      const dy = port.normY - ny;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearestPort = port;
      }
    });

    // Prevent placing port too close to another
    if (minDist < 25) {
      setToastMessage('Haz clic más lejos de un puerto existente para crear una nueva conexión.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Add port
    const customIndex = portsRef.current.length - 5;
    const portName = `Ruta GreyLion #${customIndex}`;
    const newPort: Port2D = {
      name: portName,
      normX: Math.round(nx),
      normY: Math.round(ny),
      pulse: Math.random() * Math.PI,
    };
    portsRef.current.push(newPort);

    // Create segment to connect it to the closest port in the network
    const newSegment: RouteSegment[] = [
      {
        from: { x: nearestPort.normX, y: nearestPort.normY },
        to: { x: newPort.normX, y: newPort.normY },
        h: (Math.random() - 0.5) * 35,
      }
    ];
    routeSegmentsRef.current.push(newSegment);

    // Recalculate lengths for new segments
    const newLen = getSegmentLength(newSegment[0].from, newSegment[0].to, newSegment[0].h);
    routeLengthsRef.current.push({
      lengths: [newLen],
      total: newLen,
    });

    // Spawn new ship on the new route segment
    shipsRef.current.push({
      fromIndex: routeSegmentsRef.current.length - 1,
      toIndex: routeSegmentsRef.current.length - 1,
      progress: 0,
      speed: 0.002 + Math.random() * 0.0015, // Travel faster to give instant feedback
    });

    // Push click ripple animation details
    ripplesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 4,
      maxRadius: 40,
      opacity: 1,
    });

    // Show feedback toast
    setToastMessage(`Conectado exitosamente con ${nearestPort.name}. Se trazó la '${portName}'.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setPortsCount(portsRef.current.length);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Dot2D[] = [];

    const generateMapDots = (w: number, h: number) => {
      const generated: Dot2D[] = [];
      const spacing = 12; // grid spacing

      for (let x = spacing / 2; x < 1000; x += spacing) {
        for (let y = spacing / 2; y < 500; y += spacing) {
          const onLand = LAND_POLYGONS.some((poly) =>
            isPointInPolygon([x, y], poly)
          );

          if (onLand) {
            const pt = mapCoords(x, y, w, h);
            generated.push({
              x: pt.x,
              y: pt.y,
              opacity: Math.random() * 0.4 + 0.5,
              pulseSpeed: 0.02 + Math.random() * 0.03,
            });
          }
        }
      }
      return generated;
    };

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container && canvas) {
        const width = container.clientWidth;
        const height = width / 2;
        canvas.width = width;
        canvas.height = height;
        dots = generateMapDots(width, height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Land Mesh grid connections
      ctx.strokeStyle = 'rgba(140, 150, 158, 0.05)';
      ctx.lineWidth = 0.5;
      const maxDistance = w * 0.022;

      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i];
        let connections = 0;
        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
            connections++;
            if (connections > 2) break;
          }
        }
      }

      // 2. Draw Land Dots
      dots.forEach((dot) => {
        dot.opacity += dot.pulseSpeed;
        if (dot.opacity > 0.95 || dot.opacity < 0.35) {
          dot.pulseSpeed = -dot.pulseSpeed;
        }

        ctx.fillStyle = `rgba(140, 150, 158, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, w > 800 ? 1.6 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Shipping Routes & Cargo Ships
      const getRoutePt = (t: number, routeIdx: number) => {
        const segments = routeSegmentsRef.current[routeIdx];
        const lengthsObj = routeLengthsRef.current[routeIdx];
        if (!segments || !lengthsObj) return { x: 0, y: 0 };
        
        const { lengths, total } = lengthsObj;
        const targetLen = t * total;

        let segIndex = 0;
        while (segIndex < segments.length - 1 && lengths[segIndex] < targetLen) {
          segIndex++;
        }

        const prevLen = segIndex === 0 ? 0 : lengths[segIndex - 1];
        const segLen = lengths[segIndex] - prevLen;
        const segT = segLen === 0 ? 0 : (targetLen - prevLen) / segLen;

        const segment = segments[segIndex];
        const p0 = mapCoords(segment.from.x, segment.from.y, w, h);
        const p1 = mapCoords(segment.to.x, segment.to.y, w, h);
        const scaledH = getScaledH(segment.h, h);

        return getEllipsePoint(segT, p0, p1, scaledH);
      };

      routeSegmentsRef.current.forEach((segments, routeIdx) => {
        // Draw route path
        ctx.strokeStyle = 'rgba(15, 76, 129, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);

        segments.forEach((segment) => {
          const p0 = mapCoords(segment.from.x, segment.from.y, w, h);
          const p1 = mapCoords(segment.to.x, segment.to.y, w, h);
          const scaledH = getScaledH(segment.h, h);

          ctx.beginPath();
          const dist = Math.sqrt((p1.x - p0.x)**2 + (p1.y - p0.y)**2);
          const drawSteps = Math.max(10, Math.floor(dist / 8));
          
          for (let i = 0; i <= drawSteps; i++) {
            const t = i / drawSteps;
            const pt = getEllipsePoint(t, p0, p1, scaledH);
            if (i === 0) {
              ctx.moveTo(pt.x, pt.y);
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          }
          ctx.stroke();
        });

        ctx.setLineDash([]);

        // Animate ship position
        const ship = shipsRef.current[routeIdx];
        if (ship) {
          ship.progress += ship.speed;
          if (ship.progress > 1) {
            ship.progress = 0;
          }

          const shipPt = getRoutePt(ship.progress, routeIdx);

          // Glowing tail
          const trailCount = 6;
          for (let i = 1; i <= trailCount; i++) {
            const trailProgress = ship.progress - (i * 0.0035);
            const adjustedProgress = trailProgress < 0 ? trailProgress + 1 : trailProgress;
            const trailPt = getRoutePt(adjustedProgress, routeIdx);

            ctx.fillStyle = `rgba(27, 108, 168, ${0.7 - (i * 0.11)})`;
            ctx.beginPath();
            ctx.arc(trailPt.x, trailPt.y, 4.5 - (i * 0.6), 0, Math.PI * 2);
            ctx.fill();
          }

          // Main ship bulb
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'var(--primary-hover)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(shipPt.x, shipPt.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Glowing border circle
          ctx.strokeStyle = 'rgba(15, 76, 129, 0.9)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(shipPt.x, shipPt.y, 7.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // 4. Draw Port Markers
      portsRef.current.forEach((port) => {
        const { x: px, y: py } = mapCoords(port.normX, port.normY, w, h);

        port.pulse += 0.04;
        const pulseRad = 5 + Math.sin(port.pulse) * 3.5;

        // Pulse ring
        ctx.strokeStyle = `rgba(15, 76, 129, ${0.8 - Math.sin(port.pulse) * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.fillStyle = 'var(--primary-hover)';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Port Label Tag
        ctx.fillStyle = 'rgba(18, 20, 23, 0.85)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        
        const textWidth = ctx.measureText(port.name).width;
        const paddingX = 6;
        const paddingY = 3;
        
        ctx.beginPath();
        ctx.roundRect(px + 8, py - 9, textWidth + paddingX * 2, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px var(--font-space-grotesk)';
        ctx.fillText(port.name, px + 8 + paddingX, py + 3);
      });

      // 5. Draw Ripples from User Click
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 1.5;
        ripple.opacity -= 0.025;

        if (ripple.opacity <= 0) return false;

        ctx.strokeStyle = `rgba(0, 163, 255, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--background-black)',
        color: 'var(--text-white)',
        padding: '100px 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Section title */}
        <h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(28px, 4vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.2,
            textAlign: 'center',
            marginBottom: '16px',
            maxWidth: '850px',
          }}
        >
          Red Global de{' '}
          <span style={{ color: 'var(--primary-hover)', display: 'inline-block' }}>
            Conexiones Marítimas
          </span>{' '}
          y Puertos Mundiales
        </h2>
        
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-gray)',
            textAlign: 'center',
            maxWidth: '620px',
            lineHeight: 1.6,
            marginBottom: '40px',
          }}
        >
          Sincronizamos rutas intercontinentales seguras y eficientes. Monitoreo constante de tránsitos marítimos comerciales para conectar su negocio con los mercados líderes.
        </p>

        {/* Click instructions badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0, 163, 255, 0.08)',
            border: '1px solid rgba(0, 163, 255, 0.25)',
            borderRadius: '30px',
            padding: '8px 18px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#00a3ff',
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(0, 163, 255, 0.05)',
          }}
        >
          <span style={{ animation: 'float 2s ease-in-out infinite' }}>💡</span>
          <span>¡Interactivo! Haz clic en cualquier parte del océano para trazar una nueva ruta y añadir tu puerto.</span>
        </div>

        {/* Outer container */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Flat World Map Canvas */}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              maxWidth: '100%',
              display: 'block',
              filter: 'drop-shadow(0 15px 50px rgba(15, 76, 129, 0.08))',
              cursor: 'crosshair', // Show crosshair cursor to suggest interactivity
            }}
          />

          {/* Interactive Toast Notifications */}
          {showToast && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                backgroundColor: 'rgba(13, 17, 24, 0.95)',
                border: '1.5px solid rgba(0, 163, 255, 0.3)',
                borderRadius: '8px',
                padding: '12px 20px',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                animation: 'fadeInUp 0.3s ease forwards',
              }}
            >
              {toastMessage}
            </div>
          )}

          {/* Stats Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              width: '100%',
              marginTop: '60px',
            }}
          >
            {[
              {
                title: `${portsCount} Puertos Activos`,
                desc: 'Operación y presencia aduanera activa ampliable en tiempo real.',
              },
              {
                title: '50+ Navieras',
                desc: 'Acuerdos comerciales directos con los operadores líderes del comercio internacional.',
              },
              {
                title: 'Operación 24/7',
                desc: 'Acompañamiento permanente de principio a fin, liberándolo de complejidades.',
              },
              {
                title: 'Trazabilidad Total',
                desc: 'Tecnología integrada para el seguimiento y verificación en tiempo real de su carga.',
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.01)',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                }}
                className="relative rounded-[14px] overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)]"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(15, 76, 129, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--primary-hover)',
                    fontFamily: 'var(--font-space-grotesk)',
                  }}
                >
                  {stat.title}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.5,
                    color: 'var(--text-gray)',
                  }}
                >
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
