import Link from 'next/link';
import { NavItem } from './data';

interface MobileMenuNavItemProps {
  item: NavItem;
  index: number;
  onClick: () => void;
}

export default function MobileMenuNavItem({ item, index, onClick }: MobileMenuNavItemProps) {
  return (
    <Link
      href={item.path}
      className="grid min-h-[62px] grid-cols-[29px_1px_37px_minmax(0,1fr)_18px] items-center gap-[12px] rounded-[15px] border border-[rgba(61,103,144,.62)] bg-[linear-gradient(105deg,#10161f,#0c1118)] px-[18px] py-[10px] text-[#e8ebef] no-underline transition-[transform,border-color,background] duration-[180ms] ease-[ease] hover:translate-x-[3px] hover:border-primary-hover hover:bg-[#131d28] hover:outline-none focus-visible:translate-x-[3px] focus-visible:border-primary-hover focus-visible:bg-[#131d28] focus-visible:outline-none motion-reduce:transition-none"
      onClick={onClick}
    >
      <span className="text-[11px] font-extrabold text-[#516176]">{String(index + 1).padStart(2, '0')}</span>
      <span className="self-stretch bg-[rgba(86,104,128,.36)]" />
      <span className="grid h-[33px] w-[33px] place-items-center rounded-[10px] border border-[rgba(15,76,129,.68)] bg-[rgba(15,76,129,.2)] text-[16px] text-[#9ed2fc]" aria-hidden="true">
        {item.icon}
      </span>
      <span className="text-[14px] font-[750]">{item.label}</span>
      <span className="justify-self-end text-[24px] font-light text-[#59687a]" aria-hidden="true">›</span>
    </Link>
  );
}
