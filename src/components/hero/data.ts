import { HeroIconName } from './HeroIcon';

export interface HeroStat {
  icon: HeroIconName;
  /** Primary numeric value, e.g. "120+". Omit for the special two-line variant. */
  number?: string;
  label?: string;
  /** Two-line variant used by the "commitment" stat instead of number/label. */
  topLabel?: string;
  bottomLabel?: string;
}

export const HERO_STATS: HeroStat[] = [
  { icon: 'globe', number: '120+', label: 'Rutas Globales' },
  { icon: 'ships', number: '80+', label: 'Buques en Flota' },
  { icon: 'container', number: '2M+', label: 'TEUs Transportados' },
  { icon: 'clients', number: '500+', label: 'Clientes Satisfechos' },
  { icon: 'leaf', topLabel: 'Comprometidos', bottomLabel: 'Con el Planeta' },
];
