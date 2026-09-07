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
        desc: 'Garantizamos el traslado eficiente de su carga específica desde el puerto de origen hasta su destino final. Asumimos la totalidad de los costos operativos —combustible, tripulación y tasas portuarias— ofreciéndole una tarifa clara por tonelada o un flete fijo.',
        bullets: ['Traslado puerto a puerto de carga específica', 'Costos operativos asumidos por GreyLion', 'Tarifa clara por tonelada o flete fijo'],
        icon: 'route',
        image: '/service_voyage_charter.png',
      },
      {
        title: 'Fletamento por Tiempo (Time Charter)',
        desc: 'Ponemos a su disposición embarcaciones operativas en arriendo por períodos fijos de meses o años. Le entregamos el buque listo para navegar, con tripulación calificada y mantenimiento al día, para gestionar sus rutas con total flexibilidad.',
        bullets: ['Arriendo por períodos fijos (meses o años)', 'Buque listo para navegar con tripulación calificada', 'Gestión comercial flexible de rutas'],
        icon: 'clock',
        image: '/service_time_charter.png',
      },
      {
        title: 'Fletamento a Casco Desnudo (Bareboat Charter)',
        desc: 'Ofrecemos el arrendamiento de buques a largo plazo, ideal para el financiamiento de activos marítimos. Su empresa asume la gestión náutica completa, la contratación de tripulación y el pago de seguros, con control operativo total de la embarcación.',
        bullets: ['Arrendamiento a largo plazo del buque', 'Su empresa gestiona tripulación y seguros', 'Control operativo total de la embarcación'],
        icon: 'check',
        image: '/hero_ship_oceanis.png',
      },
      {
        title: 'Transporte de Carga de Proyecto (Project Cargo)',
        desc: 'Diseñamos soluciones logísticas a la medida para el traslado seguro de mercancías sobredimensionadas y de gran peso: equipos para parques eólicos, maquinaria industrial pesada y grandes estructuras mineras.',
        bullets: ['Mercancías sobredimensionadas y de gran peso', 'Equipos eólicos y maquinaria industrial pesada', 'Grandes estructuras mineras'],
        icon: 'package',
        image: '/service_project_oversized_cargo.png',
      },
      {
        title: 'Fletamento de Apoyo Costero (Offshore Support)',
        desc: 'Brindamos soporte estratégico a las industrias del petróleo, gas y energías renovables marinas, con una flota especializada de embarcaciones menores para transporte de personal y suministro oportuno a plataformas offshore.',
        bullets: ['Soporte a petróleo, gas y energías renovables marinas', 'Flota especializada de embarcaciones menores', 'Transporte de personal y suministro a plataformas'],
        icon: 'anchor',
        image: '/comprehensive_operations_management.png',
      },
      {
        title: 'Corretaje de Fletamentos (Shipbroking)',
        desc: 'Actuamos como el enlace estratégico entre armadores con buques disponibles y cargadores con necesidades de espacio, conectando oferta y demanda para asegurar las mejores tarifas bajo una estructura de comisión competitiva.',
        bullets: ['Enlace entre armadores y cargadores', 'Conexión eficiente de oferta y demanda', 'Comisión competitiva y mejores tarifas'],
        icon: 'network',
        image: '/our-services-main-image.png',
      },
      {
        title: 'Gestión de Operaciones Portuarias',
        desc: 'Garantizamos la máxima eficiencia de sus embarques mediante una coordinación integral de la carga y descarga (estiba), el control de tiempos de plancha (laytime) y el cálculo preciso de demoras.',
        bullets: ['Coordinación integral de carga y descarga (estiba)', 'Control de tiempos de plancha (laytime)', 'Cálculo preciso de demoras'],
        icon: 'building',
        image: '/service_terminal_management.png',
      },
      {
        title: 'Consultoría en Logística Marítima',
        desc: 'Brindamos asesoría especializada a empresas importadoras y exportadoras: diseño de rutas marítimas óptimas, selección de los buques más adecuados y mitigación de riesgos contractuales mediante revisión de sus pólizas de fletamento.',
        bullets: ['Asesoría para importadores y exportadores', 'Diseño de rutas marítimas óptimas', 'Revisión y estructuración de pólizas de fletamento'],
        icon: 'search',
        image: '/service_international_logistics_engineering.png',
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
