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
  icon: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', icon: 'f', href: '#' },
  { label: 'X', icon: '𝕏', href: '#' },
  { label: 'Instagram', icon: '◎', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
];
