import React from 'react';
import { Container, Wrench, Truck, Thermometer, Droplet, Package, LucideIcon } from 'lucide-react';

export type CargoTypeIconName = 'container' | 'project' | 'roro' | 'reefer' | 'tank' | 'breakbulk';

const ICONS: Record<CargoTypeIconName, LucideIcon> = {
  container: Container,
  project: Wrench,
  roro: Truck,
  reefer: Thermometer,
  tank: Droplet,
  breakbulk: Package,
};

export default function CargoTypeIcon({ name, className }: { name: CargoTypeIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} />;
}
