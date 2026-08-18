export type ServicesIconName =
  | 'anchor'
  | 'globe'
  | 'building'
  | 'clipboard'
  | 'search'
  | 'route'
  | 'clock'
  | 'package'
  | 'calendar'
  | 'layers'
  | 'network'
  | 'check'
  | 'arrow-right';

export interface ServiceItem {
  title: string;
  desc: string;
  bullets: string[];
  icon: ServicesIconName;
  image: string;
}

export interface ServiceCategory {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  icon: ServicesIconName;
  items: ServiceItem[];
}

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: 'fletamento',
    tabLabel: 'Fletamento Marítimo (Chartering)',
    title: 'Fletamento Marítimo (Chartering)',
    subtitle:
      'Conectamos sus grandes volúmenes de carga con la flota global adecuada. Encontramos el buque óptimo bajo las mejores condiciones del mercado internacional.',
    icon: 'anchor',
    items: [
      {
        title: 'Fletamento por Viaje (Voyage Charter)',
        desc: 'Conseguimos el buque ideal para trasladar un lote específico de mercancía en rutas exclusivas.',
        bullets: ['Buque asignado por viaje', 'Rutas exclusivas', 'Lote específico de carga'],
        icon: 'route',
        image: '/service_voyage_charter.png',
      },
      {
        title: 'Fletamento por Tiempo (Time Charter)',
        desc: 'Arrendamiento de naves por periodos determinados para empresas con flujos constantes de importación o exportación.',
        bullets: ['Arrendamiento por periodos', 'Ideal para flujo constante', 'Importación y exportación'],
        icon: 'clock',
        image: '/service_time_charter.png',
      },
      {
        title: 'Carga Proyecto y Sobredimensionada',
        desc: 'Logística y fletamento especializado para maquinaria pesada, estructuras industriales y equipos energéticos.',
        bullets: ['Maquinaria pesada', 'Estructuras industriales', 'Equipos energéticos'],
        icon: 'package',
        image: '/service_project_oversized_cargo.png',
      },
    ],
  },
  {
    id: 'logistica',
    tabLabel: 'Logística de Comercio Exterior',
    title: 'Logística de Comercio Exterior',
    subtitle:
      'Optimizamos su cadena de suministro global, asegurando espacios y reduciendo los tiempos de tránsito de sus mercancías.',
    icon: 'globe',
    items: [
      {
        title: 'Reserva de Espacios (Booking de Carga)',
        desc: 'Gestión de contratos de volumen para garantizar cupos prioritarios en las principales líneas navieras.',
        bullets: ['Contratos de volumen', 'Cupos prioritarios', 'Principales líneas navieras'],
        icon: 'calendar',
        image: '/service_space_reservation.png',
      },
      {
        title: 'Consolidación de Carga Industrial',
        desc: 'Coordinación logística para el envío eficiente de lotes de carga suelta (acero, tuberías, sacos) sin requerir un buque completo.',
        bullets: ['Carga suelta consolidada', 'Sin buque completo', 'Envío eficiente'],
        icon: 'layers',
        image: '/service_industrial_cargo_consolidation.png',
      },
      {
        title: 'Ingeniería Logística Internacional',
        desc: 'Diseño integral de rutas puerta a puerta y puerto a puerto, sincronizando el transporte terrestre con el marítimo.',
        bullets: ['Puerta a puerta', 'Puerto a puerto', 'Transporte terrestre y marítimo'],
        icon: 'network',
        image: '/service_international_logistics_engineering.png',
      },
    ],
  },
  {
    id: 'agenciamiento',
    tabLabel: 'Agenciamiento y Operaciones Portuarias',
    title: 'Agenciamiento y Operaciones Portuarias',
    subtitle:
      'Protegemos sus intereses comerciales y legales en el puerto, garantizando que su carga se manipule con los más altos estándares.',
    icon: 'building',
    items: [
      {
        title: 'Supervisión de Estiba y Desestiba',
        desc: 'Control físico y operativo en el muelle para optimizar los ritmos de carga y descarga del buque.',
        bullets: ['Supervisión profesional en sitio', 'Control de tiempos y productividad', 'Prevención de daños y mermas'],
        icon: 'clipboard',
        image: '/service_supervision_stowage_unstowage.png',
      },
      {
        title: 'Inspecciones y Peritajes',
        desc: 'Certificación del estado, peso y calidad de la mercancía antes del embarque y al momento del desembarque.',
        bullets: ['Inspección de carga y contenedores', 'Verificación de pesos y medidas', 'Informes y certificaciones oficiales'],
        icon: 'search',
        image: '/service_inspections_expert_assessments.png',
      },
      {
        title: 'Gestión de Terminales y Ventanas de Atraque',
        desc: 'Coordinación directa con las autoridades portuarias para agilizar las operaciones y evitar costosas demoras.',
        bullets: ['Programación de atraques', 'Coordinación con autoridades', 'Gestión documental y permisos'],
        icon: 'building',
        image: '/service_terminal_management.png',
      },
    ],
  },
];
