import {
  Anchor,
  Globe2,
  Compass,
  Flag,
  ShieldCheck,
  Layers,
  Briefcase,
  Package,
  Workflow,
  SlidersHorizontal,
  Cog,
  Quote,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';

export interface PageSection {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const PAGE_SECTIONS: PageSection[] = [
  { id: 'inicio', label: 'Inicio', description: 'Transporte marítimo global, confiable y eficiente', icon: Anchor },
  { id: 'red-global', label: 'Red Global', description: 'Rutas y puertos conectados en todo el mundo', icon: Globe2 },
  { id: 'mision-vision', label: 'Misión & Visión', description: 'Nuestro propósito y hacia dónde navegamos', icon: Compass },
  { id: 'objetivos', label: 'Objetivos', description: 'Tiempos, tarifas y seguridad en cada envío', icon: Flag },
  { id: 'porque-elegirnos', label: 'Por Qué Elegirnos', description: 'Coordinación, supervisión y control de calidad', icon: ShieldCheck },
  { id: 'operaciones', label: 'Modalidades', description: 'Formas de transporte marítimo para su carga', icon: Layers },
  { id: 'servicios', label: 'Servicios', description: 'Fletamento, logística y agenciamiento portuario', icon: Briefcase },
  { id: 'tipos-carga', label: 'Tipos de Carga', description: 'Soluciones para cada tipo de mercancía', icon: Package },
  { id: 'proceso', label: 'Proceso', description: 'Cómo trabajamos con usted, paso a paso', icon: Workflow },
  { id: 'servicios-medida', label: 'A la Medida', description: 'Servicios diseñados para su operación', icon: SlidersHorizontal },
  { id: 'maquinaria', label: 'Maquinaria', description: 'Maquinaria pesada y equipos especializados', icon: Cog },
  { id: 'opiniones', label: 'Opiniones', description: 'Lo que dicen nuestros clientes', icon: Quote },
  { id: 'preguntas-frecuentes', label: 'FAQ', description: 'Resolvemos sus dudas más comunes', icon: HelpCircle },
];
