import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

export type ShowcaseIconName = 'check';

const ICONS: Record<ShowcaseIconName, LucideIcon> = {
  check: Check,
};

export default function ShowcaseIcon({ name, className }: { name: ShowcaseIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2.5} />;
}
