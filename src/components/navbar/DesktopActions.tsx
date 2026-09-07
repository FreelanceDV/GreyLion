import { Search, ArrowUpRight } from 'lucide-react';
import { actionLinkBaseClasses } from './styles';

interface DesktopActionsProps {
  trackingUrl: string;
  quoteUrl: string;
}

export default function DesktopActions({ trackingUrl, quoteUrl }: DesktopActionsProps) {
  return (
    <div className="flex items-center justify-end gap-[10px] max-[991px]:hidden">
      <a
        className={`${actionLinkBaseClasses} px-[13px] py-[10px] text-[#d8dce1] hover:bg-[rgba(255,255,255,.07)]`}
        href={trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Search className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> Seguimiento
      </a>
      <a
        className={`${actionLinkBaseClasses} px-[15px] py-[10px] bg-primary text-text-white shadow-[0_8px_20px_rgba(15,76,129,.28)] hover:bg-primary-hover`}
        href={quoteUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Cotizar envío <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
      </a>
    </div>
  );
}
