import React from 'react';
import { Clock, Lock, FileText, DollarSign, Users, MapPin, LucideIcon } from 'lucide-react';

export type WorkWithUsIconName = 'clock' | 'lock' | 'document' | 'tariff' | 'clients' | 'pin';

const ICONS: Record<WorkWithUsIconName, LucideIcon> = {
  clock: Clock,
  lock: Lock,
  document: FileText,
  tariff: DollarSign,
  clients: Users,
  pin: MapPin,
};

export default function WorkWithUsIcon({ name, className }: { name: WorkWithUsIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} width={24} height={24} strokeWidth={2.5} />;
}
