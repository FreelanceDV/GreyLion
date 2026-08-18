export interface QuickReply {
  icon: string;
  text: string;
}

export const QUICK_REPLIES: QuickReply[] = [
  { icon: '↗', text: 'Cotizar un envío' },
  { icon: '⌁', text: 'Consultar seguimiento' },
  { icon: '◫', text: 'Conocer nuestros servicios' },
  { icon: '⚙', text: 'Maquinaria pesada' },
];
