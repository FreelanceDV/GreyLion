'use client';

import React, { useEffect, useRef, useState } from 'react';

// Normalized 1000x530 coordinates for landmasses visible in the Caribbean/Latin American zoom-5 frame
// Used to block users from creating ports on land and to keep routes over the sea
const LAND_POLYGONS: [number, number][][] = [
  // Florida / Miami land area (Top center/left)
  [
    [370, 0], [400, 70], [415, 105], [425, 105], [435, 70], [445, 0]
  ],
  // Cuba / Bahamas (Islands in the middle top)
  [
    [420, 140], [480, 160], [530, 170], [550, 160], [450, 130]
  ],
  // Central America (Nicaragua / Costa Rica / Panama)
  [
    [0, 150], [100, 170], [160, 200], [170, 220], [150, 240], [130, 250],
    [140, 280], [160, 310], [210, 320], [260, 335], [290, 345], [300, 355],
    [280, 365], [240, 360], [200, 350], [140, 330], [110, 310], [60, 300],
    [0, 270]
  ],
  // South America (Colombia / Ecuador / Venezuela)
  [
    [290, 345], [320, 350], [350, 330], [380, 310], [430, 320], [460, 320],
    [480, 320], [500, 315], [520, 315], [550, 310], [570, 300], [590, 295],
    [630, 310], [680, 320], [750, 320], [1000, 320], [1000, 530], [200, 530],
    [200, 500], [225, 470], [250, 460], [275, 440], [295, 420], [295, 390],
    [290, 370]
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
  const [portsCount, setPortsCount] = useState(7);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Port nodes overlayed on the Caribbean centered MarineTraffic projection coordinates (zoom: 5)
  const portsRef = useRef<PortNode[]>([
    { id: 'miami', name: 'Miami (EE.UU.)', normX: 435, normY: 120, connections: ['barranquilla', 'nicaragua'], pulse: 0 },
    { id: 'nicaragua', name: 'Nicaragua', normX: 190, normY: 230, connections: ['miami', 'panama'], pulse: Math.PI / 4 },
    { id: 'panama', name: 'Canal de Panamá', normX: 310, normY: 330, connections: ['nicaragua', 'ecuador', 'barranquilla'], pulse: Math.PI / 2 },
    { id: 'barranquilla', name: 'Barranquilla (Col)', normX: 520, normY: 295, connections: ['miami', 'panama', 'cartagena', 'santa_marta'], pulse: Math.PI / 6 },
    { id: 'ecuador', name: 'Ecuador', normX: 210, normY: 485, connections: ['panama'], pulse: (Math.PI * 3) / 4 },
    { id: 'cartagena', name: 'Cartagena (Col)', normX: 485, normY: 308, connections: ['barranquilla', 'santa_marta'], pulse: Math.PI / 3 },
    { id: 'santa_marta', name: 'Santa Marta (Col)', normX: 550, normY: 285, connections: ['barranquilla', 'cartagena'], pulse: Math.PI / 8 },
  ]);

  const shipsRef = useRef<SimulatedShip[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  // Initialize simulated vessels distributed along the starting routes
  useEffect(() => {
    const shipTypes: ('cargo' | 'tanker' | 'tug' | 'passenger')[] = ['cargo', 'tanker', 'tug', 'passenger'];
    
    // Spawn initial ships traveling between nodes
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
            progress: Math.random(),
            speed: 0.0006 + Math.random() * 0.0008,
            type: shipTypes[i % shipTypes.length],
            curveHeight: getCurveHeight(fromPort.id, destId),
          });
        }
      }
    }
    shipsRef.current = initialShips;
    setPortsCount(portsRef.current.length);
  }, []);

  // Handle click on canvas overlay to create custom ports and link bidirectionally
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

    // COLLISION CHECK: Enforce that ships and ports are placed only in water, not on land!
    const onLand = LAND_POLYGONS.some((poly) =>
      isPointInPolygon([nx, ny], poly)
    );

    if (onLand) {
      setToastMessage('⚓ Error: No se puede establecer un puerto en tierra firme. Selecciona un punto en el océano.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3200);
      return;
    }

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

    if (minDist < 35) {
      setToastMessage('Haz clic más lejos de un puerto existente para crear una nueva conexión.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newPortId = `custom_${portsRef.current.length}`;
    const portName = `Ruta GreyLion #${portsRef.current.length - 6}`;
    
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

    // Auto-connect to other nearby ports (under 180px) to form a web, as long as the straight line does not cross land
    portsRef.current.forEach((p) => {
      if (p.id !== nearestPort.id && p.id !== newPortId) {
        const dx = p.normX - nx;
        const dy = p.normY - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          // Double check: check middle points of the path to avoid land crossing
          const midX = (p.normX + nx) / 2;
          const midY = (p.normY + ny) / 2;
          const midOnLand = LAND_POLYGONS.some((poly) => isPointInPolygon([midX, midY], poly));

          if (!midOnLand) {
            newPort.connections.push(p.id);
            p.connections.push(newPortId);
          }
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

    setToastMessage(`Puerto '${portName}' incorporado en el océano.`);
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
        const height = container.clientHeight;
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

      // 1. Draw Shipping Lanes (Dashed overlay lines linking nodes)
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.25)';
      ctx.lineWidth = 1.2;
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
      ctx.setLineDash([]); // Reset

      // 2. Update and Draw Simulated Vessels (Triangular pointers moving smoothly)
      shipsRef.current.forEach((ship) => {
        ship.progress += ship.speed;
        
        // Node arrival: Choose new destination among connections
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
              ship.speed = 0.0005 + Math.random() * 0.0006;
            } else {
              ship.progress = 0;
            }
          } else {
            ship.progress = 0;
          }
        }

        const p0 = portsRef.current[ship.fromIndex];
        const p1 = portsRef.current[ship.toIndex];
        if (p0 && p1) {
          const pt0 = mapCoords(p0.normX, p0.normY, w, h);
          const pt1 = mapCoords(p1.normX, p1.normY, w, h);

          const currentPt = getEllipsePoint(ship.progress, pt0, pt1, ship.curveHeight);
          const nextPt = getEllipsePoint(Math.min(1, ship.progress + 0.005), pt0, pt1, ship.curveHeight);
          const angle = Math.atan2(nextPt.y - currentPt.y, nextPt.x - currentPt.x);

          // Render triangular vessel
          ctx.save();
          ctx.translate(currentPt.x, currentPt.y);
          ctx.rotate(angle);

          const shipColor = SHIP_COLORS[ship.type] || SHIP_COLORS.cargo;
          ctx.fillStyle = shipColor;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.8;
          
          ctx.shadowColor = shipColor;
          ctx.shadowBlur = 4;

          ctx.beginPath();
          ctx.moveTo(5, 0);         // Bow
          ctx.lineTo(-4, -4);       // Port stern
          ctx.lineTo(-2, 0);        // Transom indentation
          ctx.lineTo(-4, 4);        // Starboard stern
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        }
      });

      // 3. Draw Port Markers
      portsRef.current.forEach((port) => {
        const { x: px, y: py } = mapCoords(port.normX, port.normY, w, h);

        port.pulse += 0.04;
        const pulseRad = 5 + Math.sin(port.pulse) * 3.5;

        // Radar pulses
        ctx.strokeStyle = `rgba(0, 163, 255, ${0.7 - Math.sin(port.pulse) * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dot
        ctx.fillStyle = '#00a3ff';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Port Label card
        ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
        ctx.strokeStyle = 'rgba(0, 163, 255, 0.25)';
        ctx.lineWidth = 1;
        
        const textWidth = ctx.measureText(port.name).width;
        const paddingX = 6;
        
        ctx.beginPath();
        ctx.roundRect(px + 8, py - 9, textWidth + paddingX * 2, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Port Text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '9px var(--font-space-grotesk)';
        ctx.fillText(port.name, px + 8 + paddingX, py + 3);
      });

      // 4. Draw Click Ripples
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
          <span>AIS Interactivo: Haz clic sobre el mapa en vivo de MarineTraffic para trazar rutas y tránsitos adicionales.</span>
        </div>

        {/* Outer container holding both background iframe and transparent canvas overlay */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2/1', // Keep aspect ratio locked to fit overlays accurately
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Real-time MarineTraffic AIS Embed Map as dynamic background, centered on Barranquilla / Caribbean zone */}
          <iframe
            src="https://www.marinetraffic.com/en/ais/embed/zoom:5/centery:12.0/centerx:-77.5/maptype:3/shownames:false/shownation:false/showmenu:false"
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              inset: 0,
              border: 0,
              pointerEvents: 'none', // Allow mouse click to pass through to the interactive canvas
            }}
            title="MarineTraffic Live AIS Map Background"
          />

          {/* Transparent Canvas overlay drawing simulated routes and rotated ship arrows */}
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              display: 'block',
              cursor: 'crosshair',
              backgroundColor: 'transparent',
            }}
          />

          {/* MarineTraffic Map Legend Card */}
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
        </div>
      </div>
    </div>
  );
}
