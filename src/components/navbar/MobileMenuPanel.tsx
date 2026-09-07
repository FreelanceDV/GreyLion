import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuNavList from './MobileMenuNavList';
import MobileMenuActions from './MobileMenuActions';

interface MobileMenuPanelProps {
  trackingUrl: string;
  quoteUrl: string;
  onClose: () => void;
}

export default function MobileMenuPanel({ trackingUrl, quoteUrl, onClose }: MobileMenuPanelProps) {
  return (
    <div id="mobile-menu" className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      <button
        className="absolute inset-0 w-full border-0 bg-[rgba(3,7,12,.66)] backdrop-blur-[9px]"
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
      />
      <section className="relative flex h-full w-[min(480px,100%)] flex-col px-[14px] pb-[28px] border-r border-[rgba(34,47,63,.72)] bg-[#030507] shadow-[28px_0_80px_rgba(0,0,0,.62)] animate-panel-in motion-reduce:animate-none max-[991px]:w-full">
        <MobileMenuHeader onClose={onClose} />
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <MobileMenuNavList onItemClick={onClose} />
        </div>
        <MobileMenuActions trackingUrl={trackingUrl} quoteUrl={quoteUrl} />
      </section>
    </div>
  );
}
