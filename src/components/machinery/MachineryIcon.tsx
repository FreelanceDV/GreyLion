import React from 'react';
import { Construction, Layers, Forklift, Truck, Settings, Headset, ArrowRight, LucideIcon } from 'lucide-react';
import { MachineryIconName } from './data';

const ICONS: Record<MachineryIconName, LucideIcon> = {
  excavator: Construction,
  roller: Layers,
  forklift: Forklift,
  truck: Truck,
  gear: Settings,
  headset: Headset,
  'arrow-right': ArrowRight,
};

export default function MachineryIcon({ name, className }: { name: MachineryIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} />;
}
