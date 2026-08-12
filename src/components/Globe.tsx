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

// Helper functions declared outside component to avoid initialization order ReferenceError
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
  // Scale from 1000x530 domain to canvas dimensions with 6% safe margins
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
  const [portsCount, setPortsCount] = useState(150);

  useEffect(() => {
    const interval = setInterval(() => {
      setPortsCount((prev) => {
        if (prev >= 180) {
          return 150;
        }
        return prev + Math.floor(Math.random() * 2) + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Define main ports with normalized coords
    const ports: Port2D[] = [
      { name: 'Houston', normX: 210, normY: 220, pulse: 0 },
      { name: 'Rotterdam', normX: 425, normY: 155, pulse: Math.PI / 3 },
      { name: 'Singapore', normX: 690, normY: 350, pulse: (Math.PI * 2) / 3 },
      { name: 'Shanghai', normX: 760, normY: 220, pulse: Math.PI },
      { name: 'Cape Town', normX: 460, normY: 480, pulse: (Math.PI * 4) / 3 },
      { name: 'Barranquilla', normX: 220, normY: 300, pulse: Math.PI / 6 },
    ];

    // Shipping routes segments (1000x500 normalized coordinates)
    const routeSegments: RouteSegment[][] = [
      // Route 0: Houston -> Barranquilla (Caribbean)
      [
        { from: { x: 210, y: 220 }, to: { x: 220, y: 300 }, h: -20 } // Curves East to avoid Yucatan
      ],
      // Route 1: Barranquilla -> Rotterdam (Atlantic)
      [
        { from: { x: 220, y: 300 }, to: { x: 290, y: 260 }, h: 5 },
        { from: { x: 290, y: 260 }, to: { x: 310, y: 250 }, h: 5 },
        { from: { x: 310, y: 250 }, to: { x: 320, y: 110 }, h: 0 },
        { from: { x: 320, y: 110 }, to: { x: 425, y: 155 }, h: -10 }
      ],
      // Route 2: Rotterdam -> Cape Town (Atlantic route)
      [
        { from: { x: 425, y: 155 }, to: { x: 320, y: 110 }, h: -10 },
        { from: { x: 320, y: 110 }, to: { x: 280, y: 220 }, h: 0 },
        { from: { x: 280, y: 220 }, to: { x: 290, y: 310 }, h: 0 },
        { from: { x: 290, y: 310 }, to: { x: 330, y: 525 }, h: 0 },
        { from: { x: 330, y: 525 }, to: { x: 470, y: 525 }, h: 0 },
        { from: { x: 470, y: 525 }, to: { x: 460, y: 480 }, h: 0 }
      ],
      // Route 3: Cape Town -> Singapore (Indian Ocean)
      [
        { from: { x: 460, y: 480 }, to: { x: 690, y: 350 }, h: 80 }
      ],
      // Route 4: Singapore -> Shanghai (East Asia)
      [
        { from: { x: 690, y: 350 }, to: { x: 740, y: 360 }, h: 5 },
        { from: { x: 740, y: 360 }, to: { x: 810, y: 280 }, h: 0 },
        { from: { x: 810, y: 280 }, to: { x: 760, y: 220 }, h: -15 }
      ],
      // Route 5: Shanghai -> Houston (transpacific wrapped)
      [
        { from: { x: 760, y: 220 }, to: { x: 810, y: 235 }, h: 5 },
        { from: { x: 810, y: 235 }, to: { x: 1000, y: 235 }, h: -10 },
        { from: { x: 0, y: 235 }, to: { x: 140, y: 330 }, h: -10 },
        { from: { x: 140, y: 330 }, to: { x: 170, y: 330 }, h: 0 },
        { from: { x: 170, y: 330 }, to: { x: 250, y: 290 }, h: -10 },
        { from: { x: 250, y: 290 }, to: { x: 210, y: 220 }, h: -20 }
      ]
    ];



    // Compute cumulative segment lengths for uniform speed along each route
    const routeLengths = routeSegments.map((segments) => {
      const lengths: number[] = [];
      let total = 0;
      segments.forEach((seg) => {
        // We use raw normalized coordinates to calculate relative segment lengths
        const len = getSegmentLength(seg.from, seg.to, seg.h);
        total += len;
        lengths.push(total);
      });
      return { lengths, total };
    });

    // Cargo ships animated positions - reduced speed for smoother cinematic look
    const ships: RouteShip[] = routeSegments.map((_, idx) => ({
      fromIndex: idx,
      toIndex: idx,
      progress: Math.random(),
      speed: 0.0004 + Math.random() * 0.0003, // Shipped slowly and smoothly
    }));

    let dots: Dot2D[] = [];

    const generateMapDots = (w: number, h: number) => {
      const generated: Dot2D[] = [];
      const spacing = 12; // grid resolution

      for (let x = spacing / 2; x < 1000; x += spacing) {
        for (let y = spacing / 2; y < 500; y += spacing) {
          // Check if point is inside any continent polygon
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
        // Maintain 2:1 map aspect ratio
        const height = width / 2;
        canvas.width = width;
        canvas.height = height;

        // Generate land dots scaled to actual canvas dimensions
        dots = generateMapDots(width, height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);



    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Draw Land Mesh Connections (faint web grid)
      ctx.strokeStyle = 'rgba(140, 150, 158, 0.05)';
      ctx.lineWidth = 0.5;
      const maxDistance = w * 0.022; // max distance to connect nearby dots

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
            if (connections > 2) break; // Limit mesh density for performance & look
          }
        }
      }

      // 2. Draw Land Dots
      dots.forEach((dot) => {
        // Subtle pulsation animation
        dot.opacity += dot.pulseSpeed;
        if (dot.opacity > 0.95 || dot.opacity < 0.35) {
          dot.pulseSpeed = -dot.pulseSpeed;
        }

        ctx.fillStyle = `rgba(140, 150, 158, ${dot.opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, w > 800 ? 1.6 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Shipping Routes & Ships
      const getRoutePt = (t: number, routeIdx: number) => {
        const segments = routeSegments[routeIdx];
        const { lengths, total } = routeLengths[routeIdx];
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

      routeSegments.forEach((segments, routeIdx) => {
        // Draw route path segment by segment
        ctx.strokeStyle = 'rgba(15, 76, 129, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);

        segments.forEach((segment) => {
          const p0 = mapCoords(segment.from.x, segment.from.y, w, h);
          const p1 = mapCoords(segment.to.x, segment.to.y, w, h);
          const scaledH = getScaledH(segment.h, h);

          ctx.beginPath();
          // Draw with dynamic steps based on visual segment length
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

        ctx.setLineDash([]); // Reset dash

        // Animate ship position
        const ship = ships[routeIdx];
        ship.progress += ship.speed;
        if (ship.progress > 1) {
          ship.progress = 0;
        }

        // Draw glowing ship node
        const shipPt = getRoutePt(ship.progress, routeIdx);

        // Draw trailing dots for motion blur / glowing tail
        const trailCount = 6;
        for (let i = 1; i <= trailCount; i++) {
          const trailProgress = ship.progress - (i * 0.0035);
          const adjustedProgress = trailProgress < 0 ? trailProgress + 1 : trailProgress;
          const trailPt = getRoutePt(adjustedProgress, routeIdx);

          ctx.fillStyle = `rgba(27, 108, 168, ${0.7 - (i * 0.11)})`; // Ocean Blue glow color
          ctx.beginPath();
          ctx.arc(trailPt.x, trailPt.y, 4.5 - (i * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw main ship bulb
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'var(--primary-hover)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(shipPt.x, shipPt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        ctx.strokeStyle = 'rgba(15, 76, 129, 0.9)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(shipPt.x, shipPt.y, 7.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Draw Port Markers
      ports.forEach((port) => {
        const { x: px, y: py } = mapCoords(port.normX, port.normY, w, h);

        // Animate pulse radius
        port.pulse += 0.04;
        const pulseRad = 5 + Math.sin(port.pulse) * 3.5;

        // Pulse ring
        ctx.strokeStyle = `rgba(15, 76, 129, ${0.8 - Math.sin(port.pulse) * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Inner solid port circle
        ctx.fillStyle = 'var(--primary-hover)';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Port Label Tag
        ctx.fillStyle = 'rgba(18, 20, 23, 0.75)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        
        const textWidth = ctx.measureText(port.name).width;
        const paddingX = 6;
        const paddingY = 3;
        
        ctx.beginPath();
        ctx.roundRect(px + 8, py - 9, textWidth + paddingX * 2, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Port Label Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px var(--font-space-grotesk)';
        ctx.fillText(port.name, px + 8 + paddingX, py + 3);
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
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            marginBottom: '60px',
          }}
        >
          Sincronizamos rutas intercontinentales seguras y eficientes. Monitoreo constante de tránsitos marítimos comerciales para conectar su negocio con los mercados líderes.
        </p>

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
            style={{
              maxWidth: '100%',
              display: 'block',
              filter: 'drop-shadow(0 15px 50px rgba(15, 76, 129, 0.08))',
            }}
          />

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
                title: `${portsCount}+ Puertos`,
                desc: 'Operación y presencia aduanera activa en los cinco continentes.',
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
                className="glow-card"
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
