import { AboutIconName } from './AboutIcon';

export interface MissionVisionCard {
  kicker: string;
  title: string;
  quote: string;
  items: string[];
  icon: AboutIconName;
}

export const MISSION_VISION_CARDS: MissionVisionCard[] = [
  {
    kicker: '01 / PROPÓSITO',
    title: 'Nuestra Misión',
    quote: '"Garantizar un nivel elevado de seguridad marítima, proteger el medio ambiente y prevenir la contaminación por buques; así como facilitar el tráfico marítimo eficiente y que nuestros clientes estén satisfechos de nuestro servicio."',
    items: [
      'Procesos logísticos y aduaneros simplificados',
      'Coordinación portuaria de principio a fin',
      'Soluciones ajustadas a cada operación',
    ],
    icon: 'mission',
  },
  {
    kicker: '02 / RUMBO 2030',
    title: 'Nuestra Visión',
    quote: '"Ser un centro de excelencia en la seguridad marítima y la protección del medio ambiente, contribuyendo al desarrollo sostenible del sector marítimo."',
    items: [
      'Tecnología avanzada para rastreo de carga',
      'Red global de puertos y aliados estratégicos',
      'Respaldo experto para crecer con confianza',
    ],
    icon: 'vision',
  },
];

export interface Objective {
  num: string;
  title: string;
  desc: string;
  label: string;
  icon: AboutIconName;
}

export const OBJECTIVES: Objective[] = [
  {
    num: '01',
    title: 'Optimización de Tiempos',
    desc: 'Minimizar los tiempos de entrega mediante una planificación de rutas inteligente y el flete de buques de última generación.',
    label: 'Planificación de ruta',
    icon: 'route',
  },
  {
    num: '02',
    title: 'Tarifas Competitivas',
    desc: 'Garantizar márgenes económicos favorables para su negocio con base en nuestros acuerdos navieros directos y exclusivos.',
    label: 'Acuerdos navieros',
    icon: 'value',
  },
  {
    num: '03',
    title: 'Seguridad Total',
    desc: 'Alcanzar una tasa de cero incidentes implementando rigurosas inspecciones de estiba y pólizas de seguro de carga incluidas.',
    label: 'Control de riesgo',
    icon: 'shield',
  },
  {
    num: '04',
    title: 'Asesoría Integral',
    desc: 'Brindar acompañamiento personalizado de principio a fin, liberándolo de la complejidad burocrática y aduanera.',
    label: 'Acompañamiento experto',
    icon: 'guide',
  },
];

export interface Pillar {
  title: string;
  desc: string;
}

export const PILLARS: Pillar[] = [
  {
    title: 'Coordinación Portuaria y Aduanas',
    desc: 'Enlace directo con autoridades aduaneras y portuarias en múltiples países para liberar su carga sin contratiempos.',
  },
  {
    title: 'Supervisión de Operaciones',
    desc: 'Control y supervisión física exhaustiva en las maniobras de estiba y desestiba para resguardar su mercancía.',
  },
  {
    title: 'Gestión de Almacenamiento',
    desc: 'Espacios de almacenamiento temporal controlados y seguros en depósitos aduaneros estratégicos.',
  },
  {
    title: 'Control de Calidad y Verificación',
    desc: 'Verificación física y control cuantitativo previo al despacho final, reduciendo discrepancias en origen.',
  },
];
