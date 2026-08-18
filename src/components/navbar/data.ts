export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Principal', path: '/', icon: '⌂' },
  { label: 'Misión / Visión', path: '/#mision-vision', icon: '◉' },
  { label: 'Objetivos', path: '/#objetivos', icon: '◫' },
  { label: 'Servicios', path: '/#servicios', icon: '⌁' },
  { label: 'Maquinaria', path: '/#maquinaria', icon: '⚙' },
];
