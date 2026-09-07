import { ArrowUpRight } from 'lucide-react';
import { mobileActionBaseClasses } from './styles';

interface MobileMenuActionsProps {
  trackingUrl: string;
  quoteUrl: string;
}

export default function MobileMenuActions({ trackingUrl, quoteUrl }: MobileMenuActionsProps) {
  return (
    <div className="mt-[18px] grid gap-[9px] max-[991px]:mt-auto max-[991px]:pt-[18px]">
      <a
        className={`${mobileActionBaseClasses} border border-[rgba(255,255,255,.15)] bg-[#171b20] text-text-white`}
        href={trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Seguimiento de carga
      </a>
      <a
        className={`${mobileActionBaseClasses} gap-2 bg-primary text-text-white`}
        href={quoteUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Cotizar envío <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      </a>
    </div>
  );
}
