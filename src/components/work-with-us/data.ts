import { WorkWithUsIconName } from './WorkWithUsIcon';

export interface Advantage {
  title: string;
  desc: string;
  icon: WorkWithUsIconName;
}

export const ADVANTAGES: Advantage[] = [
  {
    title: 'Eficiencia Operativa',
    desc: 'Optimización de rutas y tiempos de tránsito mediante tecnología avanzada de planificación logística y seguimiento en tiempo real.',
    icon: 'clock',
  },
  {
    title: 'Seguridad Garantizada',
    desc: 'Protocolos rigurosos de manipulación, embalaje y estiba de mercancías con seguro de carga incluido en todos los servicios.',
    icon: 'lock',
  },
  {
    title: 'Gestión Documental Completa',
    desc: 'Tramitación integral de documentación aduanera, certificados de origen y permisos especiales según normativa internacional.',
    icon: 'document',
  },
  {
    title: 'Tarifas Competitivas',
    desc: 'Acuerdos preferentes con navieras que nos permiten ofrecer las mejores tarifas del mercado sin comprometer la calidad del servicio.',
    icon: 'tariff',
  },
  {
    title: 'Atención Personalizada',
    desc: 'Equipo experto dedicado a cada cliente con asesoramiento especializado en comercio exterior y logística marítima internacional.',
    icon: 'clients',
  },
  {
    title: 'Trazabilidad Total',
    desc: 'Sistema de seguimiento avanzado que permite conocer la ubicación exacta de su mercancía en cualquier momento del trayecto.',
    icon: 'pin',
  },
];
