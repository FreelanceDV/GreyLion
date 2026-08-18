'use client';

import React, { useEffect, useRef, useState } from 'react';

// Simplified continent polygons defined in actual geographic coordinates (longitude, latitude)
const LAND_POLYGONS: [number, number][][] = [
  // Florida / USA
  [
    [-83, 30], [-80.5, 25.2], [-80, 25], [-80, 27], [-81.5, 30], [-84, 30]
  ],
  // Cuba
  [
    [-84.9, 21.9], [-80.5, 21.5], [-74.2, 20.1], [-75.8, 19.8], [-82.5, 23.0]
  ],
  // Central America
  [
    [-90.0, 14.5], [-86.0, 12.0], [-83.5, 9.5], [-77.5, 7.5], [-77.2, 8.2],
    [-80.0, 9.2], [-83.0, 10.0], [-85.5, 11.5], [-87.0, 13.0], [-88.5, 13.5]
  ],
  // South America (Northern region)
  [
    [-77.5, 7.5], [-77.2, 8.2], [-76.8, 8.5], [-75.5, 10.5], [-74.8, 11.0],
    [-73.0, 12.0], [-71.5, 12.2], [-70.0, 12.5], [-68.0, 10.5], [-60.0, 10.5],
    [-60.0, -10.0], [-82.0, -10.0], [-81.0, -5.0], [-79.8, -2.2], [-77.5, 1.0],
    [-77.0, 4.0], [-77.5, 7.0]
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

// Distance from point to line segment
function getDistanceToSegment(p: [number, number], a: [number, number], b: [number, number]) {
  const [px, py] = p;
  const [ax, ay] = a;
  const [bx, by] = b;

  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt((px - ax) ** 2 + (py - ay) ** 2);

  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const projX = ax + t * dx;
  const projY = ay + t * dy;
  return Math.sqrt((px - projX) ** 2 + (py - projY) ** 2);
}

// Distance from point to closest polygon border
function getDistanceToPolygonBorder(point: [number, number], polygon: [number, number][]) {
  let minDist = Infinity;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const dist = getDistanceToSegment(point, polygon[i], polygon[j]);
    if (dist < minDist) {
      minDist = dist;
    }
  }
  return minDist;
}

// Mercator Projection formulas to map real-world Lat/Lng to pixel space dynamically
const lngToX = (lng: number) => (lng + 180) / 360;

const latToY = (lat: number) => {
  const sinLatitude = Math.sin((lat * Math.PI) / 180);
  const clamped = Math.max(-0.9999, Math.min(0.9999, sinLatitude));
  return 0.5 - Math.log((1 + clamped) / (1 - clamped)) / (4 * Math.PI);
};

// Global ref for panning offsets to allow butter-smooth, 60fps drag mapping without iframe flickering
const panOffsetGlobal = { x: 0, y: 0 };

// Header and footer heights of the MarineTraffic iframe layout to align coordinate systems
const MAP_HEADER_OFFSET = 38; // px
const MAP_FOOTER_OFFSET = 20; // px

const getCanvasPos = (
  lat: number,
  lng: number,
  zoom: number,
  centerLat: number,
  centerLng: number,
  w: number,
  h: number,
  applyOffset: boolean = true
) => {
  const TILE_SIZE = 256;
  const scale = Math.pow(2, zoom);

  const centerWorldX = lngToX(centerLng) * TILE_SIZE * scale;
  const centerWorldY = latToY(centerLat) * TILE_SIZE * scale;

  const pointWorldX = lngToX(lng) * TILE_SIZE * scale;
  const pointWorldY = latToY(lat) * TILE_SIZE * scale;

  // Calibrate projection Y-center based on MarineTraffic's vertical visible map boundaries
  const mapHeight = h - MAP_HEADER_OFFSET - MAP_FOOTER_OFFSET;
  const centerYPos = mapHeight / 2 + MAP_HEADER_OFFSET;

  let x = w / 2 + (pointWorldX - centerWorldX);
  let y = centerYPos + (pointWorldY - centerWorldY);

  // Apply real-time visual offset from drag panning
  if (applyOffset) {
    x += panOffsetGlobal.x;
    y += panOffsetGlobal.y;
  }

  return { x, y };
};

const canvasToLatLng = (
  screenX: number,
  screenY: number,
  zoom: number,
  centerLat: number,
  centerLng: number,
  w: number,
  h: number
) => {
  const TILE_SIZE = 256;
  const scale = Math.pow(2, zoom);

  const centerWorldX = lngToX(centerLng) * TILE_SIZE * scale;
  const centerWorldY = latToY(centerLat) * TILE_SIZE * scale;

  const mapHeight = h - MAP_HEADER_OFFSET - MAP_FOOTER_OFFSET;
  const centerYPos = mapHeight / 2 + MAP_HEADER_OFFSET;

  const pointWorldX = centerWorldX + (screenX - w / 2);
  const pointWorldY = centerWorldY + (screenY - centerYPos);

  const normX = pointWorldX / (TILE_SIZE * scale);
  const normY = pointWorldY / (TILE_SIZE * scale);

  const lng = normX * 360 - 180;
  const n = Math.PI - 2 * Math.PI * normY;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));

  return { lat, lng };
};

interface PortNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
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

interface LiveTrackingMapProps {
  onPortsCountChange: (count: number) => void;
}

export default function LiveTrackingMap({ onPortsCountChange }: LiveTrackingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [mapMode, setMapMode] = useState<'navigation' | 'draw'>('navigation');
  const [iframeKey, setIframeKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map state (centered to fit Ecuador, Panama, Colombia, and Miami comfortably)
  const [zoom, setZoom] = useState(3);
  const [centerLat, setCenterLat] = useState(11.0);
  const [centerLng, setCenterLng] = useState(-78.0);

  // Sync references for animation loop readouts without resetting useEffect
  const zoomRef = useRef(zoom);
  const centerLatRef = useRef(centerLat);
  const centerLngRef = useRef(centerLng);

  useEffect(() => {
    zoomRef.current = zoom;
    centerLatRef.current = centerLat;
    centerLngRef.current = centerLng;
  }, [zoom, centerLat, centerLng]);

  // Drag Panning variables
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const centerStartRef = useRef({ lat: 0, lng: 0 });

  // Initial geographic ports (all located in water)
  const portsRef = useRef<PortNode[]>([
    { id: 'miami', name: 'Miami (EE.UU.)', lat: 25.7617, lng: -80.1918, connections: ['barranquilla', 'nicaragua'], pulse: 0 },
    { id: 'nicaragua', name: 'Nicaragua', lat: 12.1364, lng: -86.2513, connections: ['miami', 'panama'], pulse: Math.PI / 4 },
    { id: 'panama', name: 'Canal de Panamá', lat: 8.9824, lng: -79.5199, connections: ['nicaragua', 'ecuador', 'barranquilla'], pulse: Math.PI / 2 },
    { id: 'barranquilla', name: 'Barranquilla (Col)', lat: 10.9639, lng: -74.7964, connections: ['miami', 'panama', 'cartagena', 'santa_marta'], pulse: Math.PI / 6 },
    { id: 'ecuador', name: 'Ecuador', lat: -2.1894, lng: -79.8890, connections: ['panama'], pulse: (Math.PI * 3) / 4 },
    { id: 'cartagena', name: 'Cartagena (Col)', lat: 10.3910, lng: -75.4794, connections: ['barranquilla', 'santa_marta'], pulse: Math.PI / 3 },
    { id: 'santa_marta', name: 'Santa Marta (Col)', lat: 11.2404, lng: -74.1990, connections: ['barranquilla', 'cartagena'], pulse: Math.PI / 8 },
  ]);

  const shipsRef = useRef<SimulatedShip[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  // Initialize simulated vessels distributed along the starting routes
  useEffect(() => {
    const shipTypes: ('cargo' | 'tanker' | 'tug' | 'passenger')[] = ['cargo', 'tanker', 'tug', 'passenger'];
    const isMob = window.innerWidth < 768;
    const maxShips = isMob ? 5 : 15;

    const initialShips: SimulatedShip[] = [];
    for (let i = 0; i < maxShips; i++) {
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
    onPortsCountChange(portsRef.current.length);
  }, [onPortsCountChange]);

  // Handle Drag Start
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (window.innerWidth < 768) return; // Disable drag panning on mobile to prevent scroll hijacking
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    centerStartRef.current = { lat: centerLat, lng: centerLng };
    panOffsetGlobal.x = 0;
    panOffsetGlobal.y = 0;
  };

  // Handle Dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDraggedRef.current = true;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pixelScaleX = canvas.width / rect.width;
    const pixelScaleY = canvas.height / rect.height;

    // Set translation visually immediately for fluid 60fps movement
    panOffsetGlobal.x = dx * pixelScaleX;
    panOffsetGlobal.y = dy * pixelScaleY;
  };

  // Handle Drag End and commit translation changes to map coordinates
  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (hasDraggedRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const w = canvas.width;
        const h = canvas.height;
        const mapHeight = h - MAP_HEADER_OFFSET - MAP_FOOTER_OFFSET;
        const centerYPos = mapHeight / 2 + MAP_HEADER_OFFSET;

        const newCenter = canvasToLatLng(
          w / 2 - panOffsetGlobal.x,
          centerYPos - panOffsetGlobal.y,
          zoom,
          centerStartRef.current.lat,
          centerStartRef.current.lng,
          w,
          h
        );

        setCenterLng(newCenter.lng);
        setCenterLat(Math.max(-60, Math.min(80, newCenter.lat)));
      }
    }

    // Reset temporary canvas offset ref
    panOffsetGlobal.x = 0;
    panOffsetGlobal.y = 0;
  };

  // Handle click on canvas overlay to create custom ports and link bidirectionally
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Prevent adding a port if click was part of a drag action
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }

    // Only place ports in drawing mode
    if (mapMode !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickX = (x / rect.width) * canvas.width;
    const clickY = (y / rect.height) * canvas.height;

    // Convert pixel coordinates directly to real Lat/Lng
    const { lat, lng } = canvasToLatLng(clickX, clickY, zoom, centerLat, centerLng, canvas.width, canvas.height);

    // COLLISION CHECK: Enforce that ports are in water OR very close to the coast (coastlines allowed, deep land blocked)
    const onLand = LAND_POLYGONS.some((poly) =>
      isPointInPolygon([lng, lat], poly)
    );

    if (onLand) {
      let minDistanceToCoast = Infinity;
      LAND_POLYGONS.forEach((poly) => {
        const dist = getDistanceToPolygonBorder([lng, lat], poly);
        if (dist < minDistanceToCoast) {
          minDistanceToCoast = dist;
        }
      });

      // 1.2 degrees is coastal margin
      const COAST_THRESHOLD = 1.2;
      if (minDistanceToCoast > COAST_THRESHOLD) {
        setToastMessage('⚓ Error: Los puertos costeros deben ubicarse cerca de la costa, no en el interior del continente.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3200);
        return;
      }
    }

    // Find nearest port to connect with
    let nearestPort = portsRef.current[0];
    let minDist = Infinity;

    portsRef.current.forEach((port) => {
      const dx = port.lng - lng;
      const dy = port.lat - lat;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearestPort = port;
      }
    });

    if (minDist < 1.0) { // Keep ports at least 1 degree of distance apart
      setToastMessage('Haz clic más lejos de un puerto existente para crear una nueva conexión.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newPortId = `custom_${portsRef.current.length}`;
    const portName = `Ruta GreyLion #${portsRef.current.length - 6}`;

    const newPort: PortNode = {
      id: newPortId,
      name: portName,
      lat: Number(lat.toFixed(4)),
      lng: Number(lng.toFixed(4)),
      connections: [nearestPort.id],
      pulse: Math.random() * Math.PI,
    };

    // Add bidirectional link to the nearest port
    nearestPort.connections.push(newPortId);

    // Auto-connect to other nearby ports (under 12 degrees) to form a web, as long as it doesn't cross land
    portsRef.current.forEach((p) => {
      if (p.id !== nearestPort.id && p.id !== newPortId) {
        const dx = p.lng - lng;
        const dy = p.lat - lat;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 12) {
          const midLng = (p.lng + lng) / 2;
          const midLat = (p.lat + lat) / 2;
          const midOnLand = LAND_POLYGONS.some((poly) => isPointInPolygon([midLng, midLat], poly));

          if (!midOnLand) {
            newPort.connections.push(p.id);
            p.connections.push(newPortId);
          }
        }
      }
    });

    portsRef.current.push(newPort);

    // Spawn 2 new active ships on these new connections
    const shipTypes: ('cargo' | 'tanker' | 'tug' | 'passenger')[] = ['cargo', 'tanker', 'tug', 'passenger'];

    shipsRef.current.push({
      fromIndex: portsRef.current.findIndex(p => p.id === nearestPort.id),
      toIndex: portsRef.current.length - 1,
      progress: 0,
      speed: 0.001 + Math.random() * 0.0008,
      type: shipTypes[portsRef.current.length % shipTypes.length],
      curveHeight: getCurveHeight(nearestPort.id, newPortId),
    });

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

    onPortsCountChange(portsRef.current.length);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom((prev) => {
      const next = direction === 'in' ? prev + 1 : prev - 1;
      return Math.max(3, Math.min(10, next));
    });
  };

  const handlePan = (dir: 'up' | 'down' | 'left' | 'right') => {
    const step = 60 / Math.pow(2, zoom);
    if (dir === 'up') setCenterLat((prev) => Math.min(80, prev + step * 0.45));
    if (dir === 'down') setCenterLat((prev) => Math.max(-60, prev - step * 0.45));
    if (dir === 'left') setCenterLng((prev) => prev - step * 0.8);
    if (dir === 'right') setCenterLng((prev) => prev + step * 0.8);
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
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const isMob = window.innerWidth < 768;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Shipping Lanes (Dashed overlay lines linking nodes projected to Mercator coordinates)
      ctx.strokeStyle = 'rgba(0, 163, 255, 0.25)';
      ctx.lineWidth = isMob ? 0.7 : 1.2;
      ctx.setLineDash([4, 6]);

      portsRef.current.forEach((port) => {
        const p0 = getCanvasPos(port.lat, port.lng, zoomRef.current, centerLatRef.current, centerLngRef.current, w, h);
        port.connections.forEach((connId) => {
          const dest = portsRef.current.find(p => p.id === connId);
          if (dest && port.id < dest.id) { // Avoid double drawing
            const p1 = getCanvasPos(dest.lat, dest.lng, zoomRef.current, centerLatRef.current, centerLngRef.current, w, h);
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
          const pt0 = getCanvasPos(p0.lat, p0.lng, zoomRef.current, centerLatRef.current, centerLngRef.current, w, h);
          const pt1 = getCanvasPos(p1.lat, p1.lng, zoomRef.current, centerLatRef.current, centerLngRef.current, w, h);

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
          ctx.lineWidth = isMob ? 0.5 : 0.8;

          ctx.shadowColor = shipColor;
          ctx.shadowBlur = isMob ? 1.5 : 4;

          const vScale = isMob ? 0.65 : 1.0;
          ctx.beginPath();
          ctx.moveTo(5 * vScale, 0);         // Bow
          ctx.lineTo(-4 * vScale, -4 * vScale);       // Port stern
          ctx.lineTo(-2 * vScale, 0);        // Transom indentation
          ctx.lineTo(-4 * vScale, 4 * vScale);        // Starboard stern
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        }
      });

      // 3. Draw Port Markers
      portsRef.current.forEach((port) => {
        const { x: px, y: py } = getCanvasPos(port.lat, port.lng, zoomRef.current, centerLatRef.current, centerLngRef.current, w, h);

        port.pulse += 0.04;
        const pulseRad = (isMob ? 3 : 5) + Math.sin(port.pulse) * (isMob ? 1.8 : 3.5);

        // Radar pulses
        ctx.strokeStyle = `rgba(0, 163, 255, ${0.7 - Math.sin(port.pulse) * 0.45})`;
        ctx.lineWidth = isMob ? 0.8 : 1.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseRad, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dot
        ctx.fillStyle = '#00a3ff';
        ctx.beginPath();
        ctx.arc(px, py, isMob ? 2.2 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Port Label card
        ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
        ctx.strokeStyle = 'rgba(0, 163, 255, 0.25)';
        ctx.lineWidth = isMob ? 0.6 : 1;

        ctx.font = isMob ? '7.5px var(--font-space-grotesk)' : '9px var(--font-space-grotesk)';
        const textWidth = ctx.measureText(port.name).width;
        const paddingX = isMob ? 4 : 6;
        const cardH = isMob ? 12 : 16;
        const cardOffset = isMob ? 5 : 8;
        const cardYOffset = isMob ? 6 : 9;

        ctx.beginPath();
        ctx.roundRect(px + cardOffset, py - cardYOffset, textWidth + paddingX * 2, cardH, isMob ? 3 : 4);
        ctx.fill();
        ctx.stroke();

        // Port Text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(port.name, px + cardOffset + paddingX, py + (isMob ? 2 : 3));
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
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl max-[991px]:rounded-xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.6)] ${
        isMobile ? 'aspect-[4/3]' : 'aspect-[2/1]'
      }`}
    >
      {/* Real-time MarineTraffic AIS Embed Map as dynamic background, centered on Barranquilla / Caribbean zone */}
      <iframe
        key={iframeKey}
        src={`https://www.marinetraffic.com/en/ais/embed/centerx:${centerLng}/centery:${centerLat}/zoom:${zoom}/maptype:3/shownames:false/shownation:false/showmenu:false/fleet:0/fleet_id:0/trackvessel:0`}
        width="100%"
        height="100%"
        className="absolute inset-0 border-0 pointer-events-none"
        title="MarineTraffic Live AIS Map Background"
      />

      {/* Transparent Canvas overlay drawing simulated routes and rotated ship arrows */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClick={handleCanvasClick}
        className={`absolute inset-0 z-[5] block bg-transparent touch-pan-y ${
          mapMode === 'draw' ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      {/* MarineTraffic Map Legend Card */}
      {!isMobile && (
        <div className="absolute top-5 right-5 z-10 bg-[rgba(5,8,17,0.85)] border border-white/10 rounded-lg py-3 px-4 backdrop-blur-[10px] pointer-events-none flex flex-col gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="text-[10px] font-extrabold uppercase text-white/40 tracking-[0.05em] mb-0.5">
            Leyenda AIS
          </div>
          {[
            { label: 'Carga (Cargo)', color: SHIP_COLORS.cargo },
            { label: 'Petrolero (Tanker)', color: SHIP_COLORS.tanker },
            { label: 'Especial / Remolcador', color: SHIP_COLORS.tug },
            { label: 'Pasajero / Pesca', color: SHIP_COLORS.passenger },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="inline-block w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent rotate-45"
                style={{ borderBottom: `8px solid ${item.color}` }}
              />
              <span className="text-[10.5px] text-white/85 font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Map Controls Floating Bar */}
      {!isMobile && (
        <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-2.5 bg-[rgba(5,8,17,0.85)] border border-white/10 rounded-lg p-2.5 backdrop-blur-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="flex gap-2">
            <button
              onClick={() => setMapMode('navigation')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded text-white text-[11px] font-bold cursor-pointer transition-all duration-300 ease-[ease] ${
                mapMode === 'navigation' ? 'bg-primary-hover' : 'bg-transparent'
              }`}
            >
              🧭 Navegar
            </button>
            <button
              onClick={() => setMapMode('draw')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded text-white text-[11px] font-bold cursor-pointer transition-all duration-300 ease-[ease] ${
                mapMode === 'draw' ? 'bg-primary-hover' : 'bg-transparent'
              }`}
            >
              ⚓ Trazar Puertos
            </button>
          </div>

          {/* Custom Control Pad for perfect Lat/Lng synchronized panning and zooming */}
          <div className="border-t border-white/10 pt-2 flex items-center justify-between gap-3">
            {/* Zoom Buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => handleZoom('in')}
                title="Acercar mapa"
                className="w-[26px] h-[26px] bg-white/[0.06] text-white border border-white/10 rounded font-bold text-sm cursor-pointer"
              >
                +
              </button>
              <button
                onClick={() => handleZoom('out')}
                title="Alejar mapa"
                className="w-[26px] h-[26px] bg-white/[0.06] text-white border border-white/10 rounded font-bold text-sm cursor-pointer"
              >
                -
              </button>
            </div>

            {/* D-Pad Pan Directions */}
            <div className="grid grid-cols-3 gap-0.5 [grid-template-columns:repeat(3,22px)]">
              <span />
              <button
                onClick={() => handlePan('up')}
                title="Desplazar arriba"
                className="h-5 bg-white/[0.06] border-0 rounded-[3px] text-white cursor-pointer text-[10px]"
              >
                ▲
              </button>
              <span />
              <button
                onClick={() => handlePan('left')}
                title="Desplazar izquierda"
                className="h-5 bg-white/[0.06] border-0 rounded-[3px] text-white cursor-pointer text-[10px]"
              >
                ◀
              </button>
              <button
                onClick={() => {
                  // Reset to initial settings
                  setZoom(3);
                  setCenterLat(11.0);
                  setCenterLng(-78.0);
                  setIframeKey(prev => prev + 1);
                  setToastMessage('Posición y zoom restablecidos al valor de origen.');
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                title="Centrar mapa"
                className="h-5 bg-[rgba(0,163,255,0.2)] border-0 rounded-[3px] text-white cursor-pointer text-[10px]"
              >
                ●
              </button>
              <button
                onClick={() => handlePan('right')}
                title="Desplazar derecha"
                className="h-5 bg-white/[0.06] border-0 rounded-[3px] text-white cursor-pointer text-[10px]"
              >
                ▶
              </button>
              <span />
              <button
                onClick={() => handlePan('down')}
                title="Desplazar abajo"
                className="h-5 bg-white/[0.06] border-0 rounded-[3px] text-white cursor-pointer text-[10px]"
              >
                ▼
              </button>
              <span />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Toast Notifications */}
      {showToast && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[100] bg-[rgba(5,8,17,0.95)] border border-[rgba(0,163,255,0.3)] rounded-lg py-3 px-5 text-white text-[13px] font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-[10px] animate-fade-in-up whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
