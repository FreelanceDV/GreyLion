import Link from 'next/link';
import { desktopNavLinkClasses } from './styles';
import { NAV_ITEMS } from './data';

export default function DesktopNavLinks() {
  return (
    <div className="flex items-center gap-[25px] max-[991px]:hidden">
      {NAV_ITEMS.map((item) => (
        <Link key={item.label} href={item.path} className={desktopNavLinkClasses}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
