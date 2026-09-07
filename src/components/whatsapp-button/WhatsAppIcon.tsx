import React from 'react';
import { MessageCircle, LucideIcon } from 'lucide-react';

export type WhatsAppIconName = 'chat';

const ICONS: Record<WhatsAppIconName, LucideIcon> = {
  chat: MessageCircle,
};

export default function WhatsAppIcon({ name, className }: { name: WhatsAppIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} strokeWidth={2} aria-hidden="true" />;
}
