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

interface RouteShip {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

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
    ];

    // Shipping routes
    const routes = [
      { from: 0, to: 1, ctrlOffsetY: -40 }, // Houston -> Rotterdam
      { from: 1, to: 4, ctrlOffsetY: 0 },   // Rotterdam -> Cape Town
      { from: 4, to: 2, ctrlOffsetY: -20 },  // Cape Town -> Singapore
      { from: 2, to: 3, ctrlOffsetY: 20 },   // Singapore -> Shanghai
      { from: 3, to: 0, ctrlOffsetY: -120 }, // Shanghai -> Houston (transpacific)
    ];

    // Cargo ships animated positions
    const ships: RouteShip[] = routes.map((_, idx) => ({
      fromIndex: routes[idx].from,
      toIndex: routes[idx].to,
      progress: Math.random(),
      speed: 0.0015 + Math.random() * 0.001,
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
            generated.push({
              x: (x / 1000) * w,
              y: (y / 500) * h,
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

    const getBezierPoint = (
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) => {
      return {
        x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
        y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
      };
    };

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
      routes.forEach((route, routeIdx) => {
        const fromPort = ports[route.from];
        const toPort = ports[route.to];

        const startPt = { x: (fromPort.normX / 1000) * w, y: (fromPort.normY / 500) * h };
        const endPt = { x: (toPort.normX / 1000) * w, y: (toPort.normY / 500) * h };

        // Midpoint and control offset to curve the routes
        const midX = (startPt.x + endPt.x) / 2;
        const midY = (startPt.y + endPt.y) / 2;
        const ctrlPt = {
          x: midX,
          y: midY + (route.ctrlOffsetY / 500) * h,
        };

        // Draw curved route path
        ctx.strokeStyle = 'rgba(15, 76, 129, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.quadraticCurveTo(ctrlPt.x, ctrlPt.y, endPt.x, endPt.y);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Animate ship position
        const ship = ships[routeIdx];
        ship.progress += ship.speed;
        if (ship.progress > 1) {
          ship.progress = 0;
        }

        // Get coordinates of the cargo ship along the route
        const shipPt = getBezierPoint(ship.progress, startPt, ctrlPt, endPt);

        // Draw glowing ship node
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'var(--primary-hover)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(shipPt.x, shipPt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        ctx.strokeStyle = 'rgba(15, 76, 129, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(shipPt.x, shipPt.y, 7, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Draw Port Markers
      ports.forEach((port) => {
        const px = (port.normX / 1000) * w;
        const py = (port.normY / 500) * h;

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
