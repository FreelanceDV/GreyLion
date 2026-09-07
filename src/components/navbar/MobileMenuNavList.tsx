import MobileMenuNavItem from './MobileMenuNavItem';
import { MOBILE_NAV_ITEMS } from './data';

interface MobileMenuNavListProps {
  onItemClick: () => void;
}

export default function MobileMenuNavList({ onItemClick }: MobileMenuNavListProps) {
  return (
    <>
      <p className="mx-[6px] mt-[17px] mb-[14px] text-right text-[10px] font-extrabold tracking-[.16em] text-[#697383]">
        NAVEGACIÓN
      </p>
      <div className="grid gap-2">
        {MOBILE_NAV_ITEMS.map((item, index) => (
          <MobileMenuNavItem key={item.label} item={item} index={index} onClick={onItemClick} />
        ))}
      </div>
    </>
  );
}
