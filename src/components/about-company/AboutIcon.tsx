import React from 'react';
import { Target, Eye, Route, TrendingUp, ShieldCheck, LifeBuoy, Check, LucideIcon } from 'lucide-react';

export type AboutIconName = 'mission' | 'vision' | 'route' | 'value' | 'shield' | 'guide' | 'check';

const ICONS: Record<AboutIconName, LucideIcon> = {
  mission: Target,
  vision: Eye,
  route: Route,
  value: TrendingUp,
  shield: ShieldCheck,
  guide: LifeBuoy,
  check: Check,
};

export default function AboutIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: AboutIconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
