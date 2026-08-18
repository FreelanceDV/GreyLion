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
        // Measure the container's own box (CSS aspect-ratio guarantees its
        // height, so this is accurate regardless of JS/layout timing) and
        // fill it exactly, rather than deriving height from width in JS.
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        if (width === 0 || height === 0) return;
        canvas.width = width;
        canvas.height = height;
        dots = generateMapDots(width, height);
      }
    };

    // Defer the first measurement to the next frame so the container's
    // grid track has finished laying out before we read its clientWidth.
    const initialResizeFrame = requestAnimationFrame(resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) resizeObserver.observe(containerRef.current);

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
      cancelAnimationFrame(initialResizeFrame);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-background-black text-text-white pt-[100px] border-t border-white/5">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-2 gap-12 items-start max-[991px]:grid-cols-1">
          {/* Left column: heading, copy, interactive badge, stats */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.14em]">Red Global</span>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.15]">
                <span className="text-primary-hover">Conexiones Marítimas</span><br />
                y Puertos Mundiales
              </h2>
              <p className="text-[15px] text-text-gray leading-[1.6]">
                Sincronizamos rutas intercontinentales seguras y eficientes. Monitoreo constante de tránsitos marítimos comerciales para conectar su negocio con los mercados líderes.
              </p>
            </div>

            {/* Click instructions badge */}
            <div className="flex items-start gap-2 rounded-xl border border-[rgba(0,163,255,0.25)] bg-[rgba(0,163,255,0.06)] p-4">
              <span className="shrink-0 mt-0.5 text-[#00a3ff] animate-float">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p className="text-[13px] leading-[1.5] ">
                <strong className="font-extrabold uppercase tracking-[0.04em]">Interactivo</strong> · Haz clic en cualquier parte del océano para trazar una nueva ruta y añadir tu puerto.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-4 max-[560px]:grid-cols-2">
              {[
                {
                  value: `${portsCount}`,
                  label: 'Puertos Activos',
                  desc: 'Operación y presencia aduanera activa ampliable en tiempo real.',
                },
                {
                  value: '50+',
                  label: 'Navieras',
                  desc: 'Acuerdos comerciales directos con los operadores líderes del comercio internacional.',
                },
                {
                  value: '24/7',
                  label: 'Operación',
                  desc: 'Acompañamiento permanente de principio a fin, liberándolo de complejidades.',
                },
                {
                  value: '100%',
                  label: 'Trazabilidad',
                  desc: 'Tecnología integrada para el seguimiento y verificación en tiempo real de su carga.',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.01)] p-5 transition-colors duration-300 hover:border-primary-hover/40"
                >
                  <div className="text-[30px] font-extrabold text-primary-hover font-[family-name:var(--font-space-grotesk)] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-text-white uppercase tracking-[0.05em] mt-2.5">
                    {stat.label}
                  </div>
                  <p className="text-xs leading-[1.5] text-text-gray mt-1.5">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: interactive world map */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[1.35/1] max-[991px]:aspect-[1.5/1]"
          >
            {/* Flat World Map Canvas */}
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="absolute inset-0 w-full h-full block [filter:drop-shadow(0_15px_50px_rgba(15,76,129,0.08))] cursor-crosshair"
            />

            {/* Interactive Toast Notifications */}
            {showToast && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[rgba(13,17,24,0.95)] border-[1.5px] border-[rgba(0,163,255,0.3)] rounded-lg px-5 py-3 text-white text-[13.5px] font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-[10px] z-[100] animate-fade-in-up whitespace-nowrap">
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom banner photo: full-bleed, spans the entire viewport width */}
      <div className="relative w-full min-h-[300px] -mt-36">
        <img
          src="/red_global.png"
          alt="Operación portuaria global de GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-black)_0%,transparent_35%)]" />
      </div>
    </div>
  );
}
