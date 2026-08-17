export interface FaqCategory {
  id: string;
  label: string;
}

export interface FaqItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: 'todas', label: 'Todas las preguntas' },
  { id: 'servicios', label: 'Servicios y Procesos' },
  { id: 'transporte', label: 'Transporte y Carga' },
  { id: 'documentacion', label: 'Documentación' },
  { id: 'tarifas', label: 'Tarifas y Pagos' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'tipos-carga',
    categoryId: 'transporte',
    question: '¿Qué tipos de carga transporta GreyLion Maritime?',
    answer: 'Transportamos una amplia variedad de carga especializada incluyendo contenedores (FCL/LCL), carga proyecto, vehículos, carga refrigerada, carga suelta, hidrocarburos, productos químicos y más. Nos adaptamos a las necesidades específicas de cada cliente.',
  },
  {
    id: 'tiempos-transito',
    categoryId: 'transporte',
    question: '¿Cuáles son los tiempos de tránsito de mis envíos?',
    answer: 'Los tiempos de tránsito varían según la ruta de destino. Por ejemplo, los tránsitos entre Asia y América Latina suelen demorar de 25 a 35 días, mientras que las rutas transatlánticas desde Europa toman aproximadamente de 15 a 20 días operacionales.',
  },
  {
    id: 'documentacion-envio',
    categoryId: 'documentacion',
    question: '¿Qué documentación necesito para realizar un envío?',
    answer: 'Generalmente se requiere la Factura Comercial (Commercial Invoice), la Lista de Empaque (Packing List), el Conocimiento de Embarque (Bill of Lading - B/L) y la Declaración de Aduanas de salida. Nuestro equipo le guiará paso a paso para recopilar todos los requisitos.',
  },
  {
    id: 'despacho-aduanero',
    categoryId: 'documentacion',
    question: '¿Pueden ayudarme con el despacho aduanero?',
    answer: 'Sí, gestionamos de forma integral el agenciamiento de aduanas: clasificación arancelaria, trámites y despacho rápido en origen y destino, para que su carga fluya sin contratiempos.',
  },
  {
    id: 'seguro-carga',
    categoryId: 'tarifas',
    question: '¿Ofrecen seguros para la carga?',
    answer: 'Sí, todas nuestras operaciones incluyen la opción de póliza de seguro de carga para proteger su mercancía frente a cualquier eventualidad durante el tránsito.',
  },
  {
    id: 'seguimiento-envio',
    categoryId: 'servicios',
    question: '¿Cómo puedo hacer seguimiento a mi envío?',
    answer: 'Ofrecemos visibilidad 24/7 de su carga con tecnología de punta y alertas en tiempo real. Puede solicitar el estado de su envío directamente con nuestro equipo por WhatsApp.',
  },
  {
    id: 'tipos-contenedores',
    categoryId: 'transporte',
    question: '¿Qué tipo de contenedores tienen disponibles?',
    answer: "Contamos con contenedores estándar de 20' y 40', contenedores reefer para cadena de frío, y equipos especializados para carga sobredimensionada o a granel.",
  },
  {
    id: 'rutas-maritimas',
    categoryId: 'servicios',
    question: '¿Cuáles son sus principales rutas marítimas?',
    answer: 'Operamos una red de más de 120 rutas globales con acuerdos directos con las principales navieras, conectando los puertos más importantes de América, Europa, Asia y África.',
  },
  {
    id: 'solicitar-cotizacion',
    categoryId: 'tarifas',
    question: '¿Cómo solicito una cotización?',
    answer: 'Puede cotizar haciendo clic en cualquiera de nuestros botones de cotización directa, que le conectarán instantáneamente con nuestro equipo comercial en WhatsApp.',
  },
  {
    id: 'metodos-pago',
    categoryId: 'tarifas',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria internacional y acuerdos de crédito corporativo para clientes frecuentes. Nuestro equipo comercial le brindará las opciones disponibles según su operación.',
  },
];

export interface QuickHelpItem {
  id: string;
  label: string;
  href: string;
}

export const QUICK_HELP_ITEMS: QuickHelpItem[] = [
  { id: 'rastrear', label: 'Rastrea tu envío', href: 'whatsapp:tracking' },
  { id: 'cotizar', label: 'Cotiza tu carga', href: 'whatsapp:quote' },
  { id: 'documentos', label: 'Documentos necesarios', href: '#documentacion' },
  { id: 'politicas', label: 'Políticas y términos', href: '#' },
  { id: 'soporte', label: 'Soporte técnico', href: 'whatsapp:support' },
];
