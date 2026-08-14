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

interface PortNode {
  id: string;
  name: string;
  normX: number;
  normY: number;
  connections: string[];
  pulse: number;
}

interface SimulatedShip {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  type: 'cargo' | 'tanker' | 'tug' | 'passenger';
  curveHeight: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const SHIP_COLORS = {
  cargo: '#2ecc71',     // Green
  tanker: '#e74c3c',    // Red
  tug: '#3498db',       // Blue
  passenger: '#f39c12', // Orange
};

const getCurveHeight = (fromId: string, toId: string) => {
  let hash = 0;
  const str = fromId < toId ? `${fromId}_${toId}` : `${toId}_${fromId}`;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 40) - 20; // Curved height between -20 and +20
};

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

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [portsCount, setPortsCount] = useState(6);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Port nodes with direct bidirectional connections representing routes
  const portsRef = useRef<PortNode[]>([
    { id: 'houston', name: 'Houston', normX: 210, normY: 220, connections: ['barranquilla', 'rotterdam'], pulse: 0 },
    { id: 'rotterdam', name: 'Rotterdam', normX: 425, normY: 155, connections: ['barranquilla', 'cape_town', 'houston'], pulse: Math.PI / 3 },
    { id: 'singapore', name: 'Singapore', normX: 690, normY: 350, connections: ['cape_town', 'shanghai'], pulse: (Math.PI * 2) / 3 },
    { id: 'shanghai', name: 'Shanghai', normX: 760, normY: 220, connections: ['singapore', 'houston'], pulse: Math.PI },
    { id: 'cape_town', name: 'Cape Town', normX: 460, normY: 480, connections: ['rotterdam', 'singapore'], pulse: (Math.PI * 4) / 3 },
    { id: 'barranquilla', name: 'Barranquilla', normX: 220, normY: 300, connections: ['houston', 'rotterdam'], pulse: Math.PI / 6 },
  ]);

  const shipsRef = useRef<SimulatedShip[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  // Initialize simulated vessels distributed along the starting routes
  useEffect(() => {
    const shipTypes: ('cargo' | 'tanker' | 'tug' | 'passenger')[] = ['cargo', 'tanker', 'tug', 'passenger'];
    
    // Spawn 15 initial ships traveling between existing nodes
    const initialShips: SimulatedShip[] = [];
    for (let i = 0; i < 15; i++) {
      const fromIdx = Math.floor(Math.random() * portsRef.current.length);
      const fromPort = portsRef.current[fromIdx];
      
      if (fromPort.connections.length > 0) {
        const destId = fromPort.connections[Math.floor(Math.random() * fromPort.connections.length)];
        const toIdx = portsRef.current.findIndex(p => p.id === destId);
        
        if (toIdx !== -1) {
          initialShips.push({
            fromIndex: fromIdx,
            toIndex: toIdx,
            progress: Math.random(), // Distributed progress
            speed: 0.0006 + Math.random() * 0.0006, // Smooth slow speed
            type: shipTypes[i % shipTypes.length],
            curveHeight: getCurveHeight(fromPort.id, destId),
          });
        }
      }
    }
    shipsRef.current = initialShips;
    setPortsCount(portsRef.current.length);
  }, []);

  // Handle click on canvas: Creates custom ports and connects them bidirectionally
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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

    if (nx < 15 || nx > 985 || ny < 15 || ny > 515) return;

    // Find nearest port to connect with
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

    if (minDist < 30) {
      setToastMessage('Haz clic más lejos de un puerto existente para crear una nueva conexión.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newPortId = `custom_${portsRef.current.length}`;
    const portName = `Ruta GreyLion #${portsRef.current.length - 5}`;
    
    // Create new port node
    const newPort: PortNode = {
      id: newPortId,
      name: portName,
      normX: Math.round(nx),
      normY: Math.round(ny),
      connections: [nearestPort.id],
      pulse: Math.random() * Math.PI,
    };

    // Add bidirectional link to the nearest port
    nearestPort.connections.push(newPortId);

    // Auto-connect to any other port that is relatively close (under 180px) to form a web
    portsRef.current.forEach((p) => {
      if (p.id !== nearestPort.id && p.id !== newPortId) {
        const dx = p.normX - nx;
        const dy = p.normY - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          newPort.connections.push(p.id);
          p.connections.push(newPortId);
        }
      }
    });

    portsRef.current.push(newPort);

    // Spawn 2 new active ships on these new connections (one entering, one leaving!)
    const shipTypes: ('cargo' | 'tanker' | 'tug' | 'passenger')[] = ['cargo', 'tanker', 'tug', 'passenger'];
    
    // Ship leaving (from nearestPort to newPort)
    shipsRef.current.push({
      fromIndex: portsRef.current.findIndex(p => p.id === nearestPort.id),
      toIndex: portsRef.current.length - 1,
      progress: 0,
      speed: 0.001 + Math.random() * 0.0008,
      type: shipTypes[portsRef.current.length % shipTypes.length],
      curveHeight: getCurveHeight(nearestPort.id, newPortId),
    });

    // Ship entering (from newPort to nearestPort)
    shipsRef.current.push({
      fromIndex: portsRef.current.length - 1,
      toIndex: portsRef.current.findIndex(p => p.id === nearestPort.id),
      progress: 0,
      speed: 0.001 + Math.random() * 0.0008,
      type: shipTypes[(portsRef.current.length + 1) % shipTypes.length],
      curveHeight: getCurveHeight(newPortId, nearestPort.id),
    });

    // Trigger radar ripple animation
    ripplesRef.current.push({
      x: clickX,
      y: clickY,
      radius: 4,
      maxRadius: 45,
      opacity: 1,
    });

    setToastMessage(`Puerto '${portName}' incorporado con éxito. Rutas bidireccionales activadas.`);
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

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container && canvas) {
        const width = container.clientWidth;
        const height = width / 2;
        canvas.width = width;
        canvas.height = height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Ocean Background Grid (MarineTraffic style)
      ctx.fillStyle = '#060a14'; // Dark navy sea
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 163, 255, 0.05)';
      ctx.lineWidth = 0.5;

      // Latitude lines (horizontal)
      const latSpacing = h / 10;
      for (let i = 1; i < 10; i++) {
        const y = i * latSpacing;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '8px var(--font-space-grotesk)';
        const degrees = Math.round(90 - (i * 18));
        const labelText = degrees === 0 ? 'EQ' : `${Math.abs(degrees)}°${degrees > 0 ? 'N' : 'S'}`;
        ctx.fillText(labelText, 8, y - 2);
      }

      // Longitude lines (vertical)
      const lngSpacing = w / 12;
      for (let i = 1; i < 12; i++) {
        const x = i * lngSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '8px var(--font-space-grotesk)';
        const degrees = Math.round(-180 + (i * 30));
        const labelText = degrees === 0 ? 'PM' : `${Math.abs(degrees)}°${degrees > 0 ? 'E' : 'W'}`;
        ctx.fillText(labelText, x + 2, 10);
      }

      // 2. Draw Solid Landmasses with sleek neon borders
      ctx.fillStyle = '#0f172a'; // Deep slate land
      ctx.strokeStyle = '#1e293b'; // Slate borders
      ctx.lineWidth = 1.2;

      LAND_POLYGONS.forEach((poly) => {
        ctx.beginPath();
        poly.forEach((pt, idx) => {
          const canvasPt = mapCoords(pt[0], pt[1], w, h);
          if (idx === 0) {
            ctx.moveTo(canvasPt.x, canvasPt.y);
          } else {
            ctx.lineTo(canvasPt.x, canvasPt.y);
          }
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // 3. Draw Shipping Lanes (Active connections)
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      portsRef.current.forEach((port) => {
        const p0 = mapCoords(port.normX, port.normY, w, h);
        port.connections.forEach((connId) => {
          const dest = portsRef.current.find(p => p.id === connId);
          if (dest && port.id < dest.id) { // Avoid double drawing
            const p1 = mapCoords(dest.normX, dest.normY, w, h);
            const curveH = getCurveHeight(port.id, dest.id);

            ctx.beginPath();
            const dist = Math.sqrt((p1.x - p0.x)**2 + (p1.y - p0.y)**2);
            const steps = Math.max(10, Math.floor(dist / 8));
            
            for (let i = 0; i <= steps; i++) {
              const t = i / steps;
              const pt = getEllipsePoint(t, p0, p1, curveH);
              if (i === 0) {
                ctx.moveTo(pt.x, pt.y);
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            }
            ctx.stroke();
          }
        });
      });
      ctx.setLineDash([]); // Reset line dash

      // 4. Update and Draw Simulated Vessels (Triangular pointers moving smoothly)
      shipsRef.current.forEach((ship) => {
        // Increment progress along path
        ship.progress += ship.speed;
        
        // Node arrival: Choose a new random connected path to navigate continuously (entering and leaving!)
        if (ship.progress >= 1) {
          const currentDestPort = portsRef.current[ship.toIndex];
          if (currentDestPort && currentDestPort.connections.length > 0) {
            const nextDestId = currentDestPort.connections[Math.floor(Math.random() * currentDestPort.connections.length)];
            const nextIdx = portsRef.current.findIndex(p => p.id === nextDestId);
            
            if (nextIdx !== -1) {
              ship.fromIndex = ship.toIndex;
              ship.toIndex = nextIdx;
              ship.progress = 0;
              ship.curveHeight = getCurveHeight(currentDestPort.id, nextDestId);
              // Slight speed variance
              ship.speed = 0.0005 + Math.random() * 0.0006;
            } else {
              ship.progress = 0; // fallback reset
            }
          } else {
            ship.progress = 0; // fallback reset
          }
        }

        const p0 = portsRef.current[ship.fromIndex];
        const p1 = portsRef.current[ship.toIndex];
        if (p0 && p1) {
          const pt0 = mapCoords(p0.normX, p0.normY, w, h);
          const pt1 = mapCoords(p1.normX, p1.normY, w, h);

          // Get current coordinates and small ahead coordinates to calculate tangent heading angle
          const currentPt = getEllipsePoint(ship.progress, pt0, pt1, ship.curveHeight);
          const nextPt = getEllipsePoint(Math.min(1, ship.progress + 0.005), pt0, pt1, ship.curveHeight);
          const angle = Math.atan2(nextPt.y - currentPt.y, nextPt.x - currentPt.x);

          // Render triangular MarineTraffic-style ship pointing in direction of movement
          ctx.save();
          ctx.translate(currentPt.x, currentPt.y);
          ctx.rotate(angle);

          const shipColor = SHIP_COLORS[ship.type] || SHIP_COLORS.cargo;
          ctx.fillStyle = shipColor;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.7;
          
          ctx.shadowColor = shipColor;
          ctx.shadowBlur = 4;

          ctx.beginPath();
          ctx.moveTo(5, 0);         // Bow (tip)
          ctx.lineTo(-4, -4);       // Port stern corner
          ctx.lineTo(-2, 0);        // Transom indentation
          ctx.lineTo(-4, 4);        // Starboard stern corner
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        }
      });

      // 5. Draw Port Markers
      portsRef.current.forEach((port) => {
        const { x: px, y: py } = mapCoords(port.normX, port.normY, w, h);

        port.pulse += 0.04;
        const pulseRad = 5 + Math.sin(port.pulse) * 3.5;

        // Radar circular pulse ring
        ctx.strokeStyle = `rgba(0, 163, 255, ${0.7 - Math.sin(port.pulse) * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Inner anchor point
        ctx.fillStyle = '#00a3ff';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Label tooltip card
        ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
        ctx.strokeStyle = 'rgba(0, 163, 255, 0.25)';
        ctx.lineWidth = 1;
        
        const textWidth = ctx.measureText(port.name).width;
        const paddingX = 6;
        
        ctx.beginPath();
        ctx.roundRect(px + 8, py - 9, textWidth + paddingX * 2, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Label text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px var(--font-space-grotesk)';
        ctx.fillText(port.name, px + 8 + paddingX, py + 3);
      });

      // 6. Draw Interactive Click Ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 1.2;
        ripple.opacity -= 0.02;

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
        backgroundColor: '#050811',
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
          <span style={{ animation: 'float 2s ease-in-out infinite' }}>⚓</span>
          <span>AIS Interactivo: Haz clic en el océano para conectar puertos bidireccionales y ver los tránsitos.</span>
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
              filter: 'drop-shadow(0 15px 50px rgba(0, 163, 255, 0.04))',
              cursor: 'crosshair',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          />

          {/* MarineTraffic-style Map Legend Card */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(5, 8, 17, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '12px 16px',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', marginBottom: '2px' }}>
              Leyenda AIS
            </div>
            {[
              { label: 'Carga (Cargo)', color: SHIP_COLORS.cargo },
              { label: 'Petrolero (Tanker)', color: SHIP_COLORS.tanker },
              { label: 'Especial / Remolcador', color: SHIP_COLORS.tug },
              { label: 'Pasajero / Pesca', color: SHIP_COLORS.passenger },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: `8px solid ${item.color}`,
                    display: 'inline-block',
                    transform: 'rotate(45deg)',
                  }}
                />
                <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Interactive Toast Notifications */}
          {showToast && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(5, 8, 17, 0.95)',
                border: '1px solid rgba(0, 163, 255, 0.3)',
                borderRadius: '8px',
                padding: '12px 20px',
                color: '#ffffff',
                fontSize: '13px',
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
                className="glow-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0, 163, 255, 0.2)';
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
                    color: '#00a3ff',
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
