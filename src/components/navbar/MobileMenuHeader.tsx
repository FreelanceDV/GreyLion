import Link from 'next/link';
import Logo from '../Logo';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export default function MobileMenuHeader({ onClose }: MobileMenuHeaderProps) {
  return (
    <header className="flex min-h-[60px] items-center justify-between border-b border-[rgba(34,47,63,.72)] pl-6 pr-[10px]">
      <Link href="/" onClick={onClose} aria-label="GreyLion Maritime, inicio" className="group">
        <Logo size={44} textSize="21px" />
      </Link>
      <button
        className="h-[42px] w-[42px] border-0 bg-transparent text-[34px] font-extralight leading-none text-[#f13b38]"
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        ×
      </button>
    </header>
  );
}
