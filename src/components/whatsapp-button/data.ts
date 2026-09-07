import { Send, Search, Briefcase, Cog, LucideIcon } from 'lucide-react';

export interface QuickReply {
  icon: LucideIcon;
  text: string;
}

export const QUICK_REPLIES: QuickReply[] = [
  { icon: Send, text: 'Cotizar un envío' },
  { icon: Search, text: 'Consultar seguimiento' },
  { icon: Briefcase, text: 'Conocer nuestros servicios' },
  { icon: Cog, text: 'Maquinaria pesada' },
];
