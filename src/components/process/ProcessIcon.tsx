import React from 'react';
import { Shield, Ship, FileText, Package, Archive, ClipboardCheck, ChevronRight, LucideIcon } from 'lucide-react';

export type ProcessIconName = 'shield' | 'network' | 'document' | 'crate' | 'archive' | 'checklist' | 'chevron-right';

const ICONS: Record<ProcessIconName, LucideIcon> = {
  shield: Shield,
  network: Ship,
  document: FileText,
  crate: Package,
  archive: Archive,
  checklist: ClipboardCheck,
  'chevron-right': ChevronRight,
};

export default function ProcessIcon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: ProcessIconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
