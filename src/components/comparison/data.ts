export interface ServiceFeature {
  name: string;
  detail: string;
}

export interface ComparisonService {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  features: ServiceFeature[];
}

export const SERVICES: ComparisonService[] = [
  {
    id: 'maritimo',
    title: 'TRANSPORTE MARÍTIMO',
    subtitle: 'Logística y Fletamento Global',
    desc: 'Llegamos a cualquier puerto del mundo a través de la mayor red de rutas marítimas comerciales. Coordinamos cada embarque con absoluta precisión técnica.',
    image: '/maritime_transport_card.jpg',
    features: [
      { name: 'Contenedor Completo (FCL)', detail: 'Exclusividad y rapidez para operaciones industriales.' },
      { name: 'Carga Consolidada (LCL)', detail: 'Soluciones económicas compartiendo espacio.' },
      { name: 'Fletamento de Buques (Chartering)', detail: 'Arrendamiento de naves a la medida de grandes volúmenes.' },
      { name: 'Carga Proyecto', detail: 'Ingeniería de transporte para piezas sobredimensionadas.' },
    ],
  },
  {
    id: 'integral',
    title: 'LOGÍSTICA INTEGRAL',
    subtitle: 'Operaciones Puerta a Puerta',
    desc: 'Sincronizamos de principio a fin su cadena de suministro. Nos encargamos de la complejidad operativa y legal para que usted se enfoque en su negocio.',
    image: '/integral_logistics_card.jpg',
    features: [
      { name: 'Agenciamiento de Aduanas', detail: 'Clasificación arancelaria, trámites y despacho rápido.' },
      { name: 'Almacenamiento y Depósitos', detail: 'Espacios estratégicos con control y seguridad total.' },
      { name: 'Supervisión Física (Estiba/Trincado)', detail: 'Control riguroso en puerto para mitigar riesgos.' },
      { name: 'Conexión Terrestre', detail: 'Transporte intermodal coordinado desde puerto hasta destino.' },
    ],
  },
];
