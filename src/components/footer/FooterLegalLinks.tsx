import Link from 'next/link';
import { footerLegalLinkClasses } from './styles';
import { LEGAL_LINKS } from './data';

export default function FooterLegalLinks() {
  return (
    <div className="flex gap-[16px] flex-wrap max-[560px]:gap-[12px]">
      {LEGAL_LINKS.map((link) =>
        link.href.startsWith('/') ? (
          <Link key={link.label} href={link.href} className={footerLegalLinkClasses}>
            {link.label}
          </Link>
        ) : (
          <a key={link.label} href={link.href} className={footerLegalLinkClasses}>
            {link.label}
          </a>
        )
      )}
    </div>
  );
}
