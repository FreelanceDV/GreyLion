'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navItems = [
  { label: 'Principal', path: '/', icon: '⌂' },
  { label: 'Misión / Visión', path: '/#mision-vision', icon: '◉' },
  { label: 'Objetivos', path: '/#objetivos', icon: '◫' },
  { label: 'Servicios', path: '/#servicios', icon: '⌁' },
  { label: 'Maquinaria', path: '/#maquinaria', icon: '⚙' },
];

const desktopNavLinkClasses =
  'relative px-0 py-[9px] text-[13px] font-semibold text-[rgba(255,255,255,.72)] no-underline transition-colors duration-200 ease-[ease] hover:text-text-white focus-visible:text-text-white focus-visible:outline-none motion-reduce:transition-none after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-primary-hover after:transition-transform after:duration-200 after:content-[\'\'] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none';

const actionLinkBaseClasses =
  'inline-flex items-center gap-[7px] rounded-full text-[13px] font-bold no-underline transition-[transform,background,border-color] duration-200 ease-[ease] hover:-translate-y-[2px] motion-reduce:transition-none';

const mobileActionBaseClasses =
  'flex min-h-[47px] items-center justify-center rounded-[14px] text-[14px] font-[750] no-underline';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573001234567';
  const quoteUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero cotizar un envío.')}`;
  const trackingUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero consultar el estado de mi envío.')}`;

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.body.classList.add('overflow-hidden');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[60] flex items-center border-b transition-[height,background,border-color] duration-[250ms] ease-[ease] motion-reduce:transition-none${
          scrolled
            ? ' h-[68px] border-[rgba(255,255,255,.09)] bg-[rgba(10,11,13,.88)] backdrop-blur-[18px]'
            : ' h-[86px] border-transparent bg-[linear-gradient(180deg,rgba(10,11,13,.78),rgba(10,11,13,.34))] max-[991px]:h-[72px] max-[991px]:bg-[rgba(10,11,13,.86)] max-[991px]:backdrop-blur-[14px]'
        }`}
        aria-label="Navegación principal"
      >
        <div className="w-full max-w-[1280px] mx-auto px-5 grid grid-cols-[1fr_auto_1fr] items-center max-[991px]:grid-cols-[1fr_auto]">
          <Link className="inline-flex w-fit no-underline" href="/" aria-label="GreyLion Maritime, inicio"><Logo size={36} textSize="22px" /></Link>

          <div className="flex items-center gap-[25px] max-[991px]:hidden">
            {navItems.map((item) => <Link key={item.label} href={item.path} className={desktopNavLinkClasses}>{item.label}</Link>)}
          </div>

          <div className="flex items-center justify-end gap-[10px] max-[991px]:hidden">
            <a className={`${actionLinkBaseClasses} px-[13px] py-[10px] text-[#d8dce1] hover:bg-[rgba(255,255,255,.07)]`} href={trackingUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌁</span> Seguimiento</a>
            <a className={`${actionLinkBaseClasses} px-[15px] py-[10px] bg-primary text-text-white shadow-[0_8px_20px_rgba(15,76,129,.28)] hover:bg-primary-hover`} href={quoteUrl} target="_blank" rel="noopener noreferrer">Cotizar envío <span aria-hidden="true">↗</span></a>
          </div>

          <button className="hidden h-[42px] w-[42px] justify-self-end rounded-xl border border-[rgba(255,255,255,.13)] bg-[rgba(10,11,13,.58)] p-[10px] max-[991px]:block" type="button" onClick={() => setMobileMenuOpen(true)} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" aria-label="Abrir menú">
            <span className="my-1 block h-0.5 rounded-[1px] bg-white" /><span className="my-1 block h-0.5 rounded-[1px] bg-white" /><span className="my-1 block h-0.5 rounded-[1px] bg-white" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <button className="absolute inset-0 w-full border-0 bg-[rgba(3,7,12,.66)] backdrop-blur-[9px]" type="button" onClick={closeMenu} aria-label="Cerrar menú" />
          <section className="relative flex min-h-full w-[min(480px,100%)] flex-col px-[14px] pb-[28px] border-r border-[rgba(34,47,63,.72)] bg-[#030507] shadow-[28px_0_80px_rgba(0,0,0,.62)] animate-panel-in motion-reduce:animate-none max-[991px]:w-full">
            <header className="flex min-h-[60px] items-center justify-between border-b border-[rgba(34,47,63,.72)] pl-6 pr-[10px]">
              <Link href="/" onClick={closeMenu} aria-label="GreyLion Maritime, inicio"><Logo size={38} textSize="21px" /></Link>
              <button className="h-[42px] w-[42px] border-0 bg-transparent text-[34px] font-extralight leading-none text-[#f13b38]" type="button" onClick={closeMenu} aria-label="Cerrar menú">×</button>
            </header>
            <p className="mx-[6px] mt-[17px] mb-[14px] text-right text-[10px] font-extrabold tracking-[.16em] text-[#697383]">NAVEGACIÓN</p>
            <div className="grid gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className="grid min-h-[62px] grid-cols-[29px_1px_37px_minmax(0,1fr)_18px] items-center gap-[12px] rounded-[15px] border border-[rgba(61,103,144,.62)] bg-[linear-gradient(105deg,#10161f,#0c1118)] px-[18px] py-[10px] text-[#e8ebef] no-underline transition-[transform,border-color,background] duration-[180ms] ease-[ease] hover:translate-x-[3px] hover:border-primary-hover hover:bg-[#131d28] hover:outline-none focus-visible:translate-x-[3px] focus-visible:border-primary-hover focus-visible:bg-[#131d28] focus-visible:outline-none motion-reduce:transition-none"
                  onClick={closeMenu}
                >
                  <span className="text-[11px] font-extrabold text-[#516176]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="self-stretch bg-[rgba(86,104,128,.36)]" />
                  <span className="grid h-[33px] w-[33px] place-items-center rounded-[10px] border border-[rgba(15,76,129,.68)] bg-[rgba(15,76,129,.2)] text-[16px] text-[#9ed2fc]" aria-hidden="true">{item.icon}</span>
                  <span className="text-[14px] font-[750]">{item.label}</span>
                  <span className="justify-self-end text-[24px] font-light text-[#59687a]" aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
            <div className="mt-[18px] grid gap-[9px] max-[991px]:mt-auto max-[991px]:pt-[18px]">
              <a className={`${mobileActionBaseClasses} border border-[rgba(255,255,255,.15)] bg-[#171b20] text-text-white`} href={trackingUrl} target="_blank" rel="noopener noreferrer">Seguimiento de carga</a>
              <a className={`${mobileActionBaseClasses} gap-2 bg-primary text-text-white`} href={quoteUrl} target="_blank" rel="noopener noreferrer">Cotizar envío <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
