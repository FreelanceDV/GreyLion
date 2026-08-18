import { ProcessIconName } from './ProcessIcon';

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: ProcessIconName;
}

export const STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Documentación y Aduanas',
    desc: 'Coordinamos con autoridades portuarias y aduanas para la tramitación ágil de certificados, permisos especiales y despachos arancelarios.',
    icon: 'document',
  },
  {
    num: '02',
    title: 'Carga y Descarga Portuaria',
    desc: 'Supervisión física minuciosa de las maniobras de estiba, desestiba y trincado en puerto, garantizando la integridad de la carga.',
    icon: 'crate',
  },
  {
    num: '03',
    title: 'Almacenamiento Temporal',
    desc: 'Gestión y control de espacios de almacenamiento en terminales portuarias y depósitos francos autorizados bajo condiciones climáticas óptimas.',
    icon: 'archive',
  },
  {
    num: '04',
    title: 'Verificación y Entrega',
    desc: 'Verificación de calidad e inventario físico de las mercancías previo al despacho final, asegurando la satisfacción en destino.',
    icon: 'checklist',
  },
];
