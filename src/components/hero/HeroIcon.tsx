import React from 'react';
import { Globe, Ship, Container, Users, Leaf, LucideIcon } from 'lucide-react';

export type HeroIconName = 'globe' | 'ships' | 'container' | 'clients' | 'leaf';

const ICONS: Record<HeroIconName, LucideIcon> = {
  globe: Globe,
  ships: Ship,
  container: Container,
  clients: Users,
  leaf: Leaf,
};

export default function HeroIcon({ name, className }: { name: HeroIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} width={40} height={40} strokeWidth={2} />;
}
