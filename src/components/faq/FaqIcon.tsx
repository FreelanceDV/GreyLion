import React from 'react';
import {
  LayoutGrid,
  Ship,
  Container,
  FileText,
  Tag,
  Headset,
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

export type FaqIconName =
  | 'grid'
  | 'ship'
  | 'container'
  | 'document'
  | 'tag'
  | 'headset'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'pin'
  | 'shield'
  | 'arrow-right';

const ICONS: Record<FaqIconName, LucideIcon> = {
  grid: LayoutGrid,
  ship: Ship,
  container: Container,
  document: FileText,
  tag: Tag,
  headset: Headset,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  pin: MapPin,
  shield: Shield,
  'arrow-right': ArrowRight,
};

export default function FaqIcon({ name, className }: { name: FaqIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} />;
}
