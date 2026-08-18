import Link from 'next/link';
import { footerColumnLinkClasses } from './styles';
import { FooterLink } from './data';

interface FooterNavColumnProps {
  title: string;
  links: FooterLink[];
  ariaLabel: string;
}

export default function FooterNavColumn({ title, links, ariaLabel }: FooterNavColumnProps) {
  return (
    <nav className="flex flex-col gap-[11px] not-italic" aria-label={ariaLabel}>
      <h2 className="mb-[5px] text-[#e6f2ff] font-[family-name:var(--font-space-grotesk)] text-[14px] font-bold">
        {title}
      </h2>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={footerColumnLinkClasses}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
