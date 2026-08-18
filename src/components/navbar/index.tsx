'use client';

import Link from 'next/link';
import Logo from '../Logo';
import DesktopNavLinks from './DesktopNavLinks';
import DesktopActions from './DesktopActions';
import MobileMenuButton from './MobileMenuButton';
import MobileMenuPanel from './MobileMenuPanel';
import { useScrolled } from './useScrolled';
import { useMobileMenu } from './useMobileMenu';

export default function Navbar() {
  const scrolled = useScrolled();
  const { isOpen: mobileMenuOpen, open: openMenu, close: closeMenu } = useMobileMenu();

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573001234567';
  const quoteUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero cotizar un envío.')}`;
  const trackingUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero consultar el estado de mi envío.')}`;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[60] flex items-center border-b transition-[height,background,border-color] duration-[250ms] ease-[ease] motion-reduce:transition-none${
          scrolled
            ? ' h-[68px] border-[rgba(255,255,255,.09)] bg-[rgba(6,13,26,.88)] backdrop-blur-[18px]'
            : ' h-[86px] border-transparent bg-[linear-gradient(180deg,rgba(6,13,26,.78),rgba(6,13,26,.34))] max-[991px]:h-[72px] max-[991px]:bg-[rgba(6,13,26,.86)] max-[991px]:backdrop-blur-[14px]'
        }`}
        aria-label="Navegación principal"
      >
        <div className="w-full max-w-[1280px] mx-auto px-5 grid grid-cols-[1fr_auto_1fr] items-center max-[991px]:grid-cols-[1fr_auto]">
          <Link className="inline-flex w-fit no-underline" href="/" aria-label="GreyLion Maritime, inicio">
            <Logo size={36} textSize="22px" />
          </Link>

          <DesktopNavLinks />
          <DesktopActions trackingUrl={trackingUrl} quoteUrl={quoteUrl} />
          <MobileMenuButton isOpen={mobileMenuOpen} onOpen={openMenu} />
        </div>
      </nav>

      {mobileMenuOpen && (
        <MobileMenuPanel trackingUrl={trackingUrl} quoteUrl={quoteUrl} onClose={closeMenu} />
      )}
    </>
  );
}
