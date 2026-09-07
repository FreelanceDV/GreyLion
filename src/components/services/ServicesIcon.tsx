import React from 'react';
import {
  Anchor,
  Globe,
  Building2,
  ClipboardCheck,
  Search,
  Route,
  Clock,
  Package,
  CalendarCheck2,
  Layers,
  Network,
  Check,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { ServicesIconName } from './data';

const ICONS: Record<ServicesIconName, LucideIcon> = {
  anchor: Anchor,
  globe: Globe,
  building: Building2,
  clipboard: ClipboardCheck,
  search: Search,
  route: Route,
  clock: Clock,
  package: Package,
  calendar: CalendarCheck2,
  layers: Layers,
  network: Network,
  check: Check,
  'arrow-right': ArrowRight,
};

export default function ServicesIcon({ name, className }: { name: ServicesIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} />;
}
