import { Camera, LucideIcon } from 'lucide-react';

export interface FooterLink {
  label: string;
  href: string;
}

export const NAV_LINKS: FooterLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nuestra identidad', href: '/#mision-vision' },
  { label: 'Servicios marítimos', href: '/#servicios' },
  { label: 'Maquinaria especializada', href: '/#maquinaria' },
];

export const OPERATIONS_LINKS: FooterLink[] = [
  { label: 'Fletamento marítimo', href: '/#servicios' },
  { label: 'Logística de proyectos', href: '/#servicios' },
  { label: 'Carga especializada', href: '/#servicios' },
  { label: 'Suministro industrial', href: '/#maquinaria' },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
  { label: 'Condiciones de servicio', href: '#' },
  { label: 'Privacidad', href: '#' },
  { label: 'Cookies', href: '#' },
];

export interface SocialLink {
  label: string;
  /** Lucide icon — only used where a generic (non-brand) icon reads as the platform. */
  icon?: LucideIcon;
  /** Text glyph fallback — Lucide dropped all brand/logo icons, so most platforms use their letter mark instead. */
  textIcon?: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', textIcon: 'f', href: '#' },
  { label: 'X', textIcon: '𝕏', href: '#' },
  { label: 'Instagram', icon: Camera, href: '#' },
  { label: 'LinkedIn', textIcon: 'in', href: '#' },
];
