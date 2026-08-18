import { CargoTypeIconName } from './CargoTypeIcon';

export interface CargoType {
  title: string;
  code: string;
  desc: string;
  icon: CargoTypeIconName;
}

export const CARGO_TYPES: CargoType[] = [
  {
    title: 'Contenedores Estándar: Eficiencia para su stock',
    code: 'DRY / 20–40',
    desc: 'Equipos dry de 20 y 40 pies para el traslado rápido de mercancía general.',
    icon: 'container',
  },
  {
    title: 'Carga Proyecto: Logística para grandes dimensiones',
    code: 'OOG / PROJECT',
    desc: 'Manipulación experta e ingeniería de transporte para maquinaria pesada y sobredimensionada.',
    icon: 'project',
  },
  {
    title: 'Vehículos Ro-Ro: Conectividad para su flota',
    code: 'RO-RO / ROLLING',
    desc: 'Embarque eficiente de automóviles, camiones y maquinaria rodante en buques especializados.',
    icon: 'roro',
  },
  {
    title: 'Productos Refrigerados: Control de cadena de frío',
    code: 'REEFER / COLD',
    desc: 'Contenedores reefer con monitoreo térmico para alimentos perecederos y productos farmacéuticos.',
    icon: 'reefer',
  },
  {
    title: 'Gas y Petróleo: Seguridad en hidrocarburos',
    code: 'TANK / ENERGY',
    desc: 'Transporte especializado de combustibles y derivados en buques tanque bajo estrictas normas.',
    icon: 'tank',
  },
  {
    title: 'Carga Suelta: Flexibilidad a la medida',
    code: 'BREAK BULK / FLEX',
    desc: 'Logística adaptada para mercancías no contenedorizadas, paletizadas o embaladas según su naturaleza.',
    icon: 'breakbulk',
  },
];
