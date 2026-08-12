const LAND_POLYGONS = [
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

function isPointInPolygon(point, polygon) {
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

function isOnLand(x, y) {
  return LAND_POLYGONS.some(poly => isPointInPolygon([x, y], poly));
}

const ports = [
  { name: 'Houston', normX: 210, normY: 220 },
  { name: 'Rotterdam', normX: 425, normY: 155 },
  { name: 'Singapore', normX: 690, normY: 350 },
  { name: 'Shanghai', normX: 760, normY: 220 },
  { name: 'Cape Town', normX: 460, normY: 480 },
];

function getEllipsePoint(t, p0, p1, h) {
  const dx = p1.normX - p0.normX;
  const dy = p1.normY - p0.normY;
  const d = Math.sqrt(dx * dx + dy * dy);
  const theta = Math.atan2(dy, dx);
  const mx = (p0.normX + p1.normX) / 2;
  const my = (p0.normY + p1.normY) / 2;

  const phi = Math.PI - t * Math.PI;
  const xLocal = (d / 2) * Math.cos(phi);
  const yLocal = h * Math.sin(phi);

  const x = mx + xLocal * Math.cos(theta) - yLocal * Math.sin(theta);
  const y = my + xLocal * Math.sin(theta) + yLocal * Math.cos(theta);

  return { x, y };
}

function checkRoute(p0, p1, h) {
  let landIntersections = 0;
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const pt = getEllipsePoint(t, p0, p1, h);
    if (isOnLand(pt.x, pt.y)) {
      landIntersections++;
    }
  }
  return landIntersections;
}

console.log("--- Testing Route: Houston -> Rotterdam ---");
for (let h = -150; h <= 150; h += 10) {
  const land = checkRoute(ports[0], ports[1], h);
  if (land === 0) {
    console.log(`h = ${h} is a clean sea route!`);
  }
}

console.log("--- Testing Route: Rotterdam -> Cape Town ---");
for (let h = -150; h <= 150; h += 10) {
  const land = checkRoute(ports[1], ports[4], h);
  if (land === 0) {
    console.log(`h = ${h} is a clean sea route!`);
  }
}

console.log("--- Testing Route: Cape Town -> Singapore ---");
for (let h = -150; h <= 150; h += 10) {
  const land = checkRoute(ports[4], ports[2], h);
  if (land === 0) {
    console.log(`h = ${h} is a clean sea route!`);
  }
}

console.log("--- Testing Route: Singapore -> Shanghai ---");
for (let h = -150; h <= 150; h += 10) {
  const land = checkRoute(ports[2], ports[3], h);
  if (land === 0) {
    console.log(`h = ${h} is a clean sea route!`);
  }
}
