export interface ModalityDetail {
  label: string;
  value: string;
}

export interface Modality {
  name: string;
  tagline: string;
  desc: string;
  logoText: string;
  accentClass: string;
  details: ModalityDetail[];
  badges: string[];
}

export const MODALITIES: Modality[] = [
  {
    name: 'Contenedor Completo (FCL)',
    tagline: 'Proteja sus grandes operaciones',
    desc: 'Rapidez, exclusividad y total seguridad. Asignamos contenedores sellados de 20 y 40 pies exclusivos para su negocio, garantizando un tránsito directo y minimizando tiempos de entrega.',
    logoText: 'FC',
    accentClass: 'bg-primary',
    details: [
      { label: 'Equipos', value: 'Contenedores de 20 y 40 pies' },
      { label: 'Exclusividad', value: 'Contenedor sellado único' },
      { label: 'Tránsito', value: 'Directo y prioritario' },
    ],
    badges: ['FCL', 'Seguro de Carga', 'Prioritario'],
  },
  {
    name: 'Carga Consolidada (LCL)',
    tagline: 'Flexibilidad económica para su negocio',
    desc: 'Logística flexible y rentable. Envíe mercancía fraccionada compartiendo contenedor de forma segura, divida gastos y pague únicamente por el espacio que utiliza.',
    logoText: 'LC',
    accentClass: 'bg-accent',
    details: [
      { label: 'Modalidad de Envío', value: 'Compartido (Grupaje)' },
      { label: 'Optimización de Costos', value: 'Pague solo espacio ocupado' },
      { label: 'Logística', value: 'Consolidación propia' },
    ],
    badges: ['LCL', 'Económico', 'Flexible'],
  },
  {
    name: 'Transporte de Graneles',
    tagline: 'Infraestructura para grandes industrias',
    desc: 'Movilización experta de carga pesada, minerales y productos agrícolas. Gestionamos la logística compleja de materias primas con la precisión técnica y los buques de gran capacidad que su sector exige.',
    logoText: 'TG',
    accentClass: 'bg-primary-hover',
    details: [
      { label: 'Tipos de Granel', value: 'Minerales, agro, carbón' },
      { label: 'Buques', value: 'Bulk Carriers de alta capacidad' },
      { label: 'Ingeniería', value: 'Logística compleja y precisa' },
    ],
    badges: ['Graneles', 'Industrial', 'Gran Capacidad'],
  },
];

export interface ListItem {
  name: string;
  detail: string;
}

export const CARGO_LIST_ITEMS: ListItem[] = [
  { name: "Contenedores Estándar", detail: "20' / 40' / 40' HC" },
  { name: 'Carga Proyecto Especial', detail: 'Sobredimensionada y pesada' },
  { name: 'Vehículos Ro-Ro', detail: 'Automóviles y maquinaria' },
  { name: 'Carga Refrigerada', detail: 'Control de temperatura' },
  { name: 'Granel Sólido y Líquido', detail: 'Materias primas y químicos' },
];

export const EQUIPMENT_LIST_ITEMS: ListItem[] = [
  { name: 'Excavadoras de Cadena', detail: 'Potencia y estabilidad' },
  { name: 'Grúas Móviles y Portuarias', detail: 'Alta capacidad de izaje' },
  { name: 'Montacargas y Reach Stackers', detail: 'Manejo de contenedores' },
  { name: 'Plataformas y Lowboys', detail: 'Transporte especializado' },
  { name: 'Equipos Auxiliares', detail: 'Generadores, compresores, más' },
];

export interface PromoPanelData {
  image: string;
  title: string;
  desc: string;
  linkHref: string;
  linkLabel: string;
}

export const PROMO_PANELS: PromoPanelData[] = [
  {
    image: '/types_of_cargo.png',
    title: 'Tipos de Carga Especializada',
    desc: 'Gestionamos y coordinamos el fletamento marítimo adaptándonos a las especificaciones técnicas e industriales de cada tipo de mercancía.',
    linkHref: '#servicios',
    linkLabel: 'Ver todos',
  },
  {
    image: '/customized_solutions_equipment.png',
    title: 'Soluciones y Equipos Especializados',
    desc: 'Contamos con maquinaria de última generación para garantizar eficiencia, seguridad y cumplimiento en cada operación.',
    linkHref: '#maquinaria',
    linkLabel: 'Ver catálogo',
  },
  {
    image: '/intelligent_tracking.png',
    title: 'Seguimiento Inteligente',
    desc: 'Visibilidad 24/7 de su carga con tecnología de punta y alertas en tiempo real.',
    linkHref: '#maquinaria',
    linkLabel: 'Rastrear ahora',
  },
];
