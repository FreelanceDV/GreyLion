import { Anchor, Compass, Flag, Briefcase, Cog, LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Principal', path: '/', icon: Anchor },
  { label: 'Misión / Visión', path: '/#mision-vision', icon: Compass },
  { label: 'Objetivos', path: '/#objetivos', icon: Flag },
  { label: 'Servicios', path: '/#servicios', icon: Briefcase },
  { label: 'Maquinaria', path: '/#maquinaria', icon: Cog },
];
