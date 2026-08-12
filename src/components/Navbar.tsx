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
    document.body.classList.add('overlay-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('overlay-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Navegación principal">
        <div className="nav-content container">
          <Link className="logo-link" href="/" aria-label="GreyLion Maritime, inicio"><Logo size={36} textSize="22px" /></Link>

          <div className="desktop-nav">
            {navItems.map((item) => <Link key={item.label} href={item.path}>{item.label}</Link>)}
          </div>

          <div className="desktop-actions">
            <a className="tracking-link" href={trackingUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌁</span> Seguimiento</a>
            <a className="quote-link" href={quoteUrl} target="_blank" rel="noopener noreferrer">Cotizar envío <span aria-hidden="true">↗</span></a>
          </div>

          <button className="menu-toggle" type="button" onClick={() => setMobileMenuOpen(true)} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" aria-label="Abrir menú">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <button className="menu-backdrop" type="button" onClick={closeMenu} aria-label="Cerrar menú" />
          <section className="menu-panel">
            <header className="menu-header">
              <Link href="/" onClick={closeMenu} aria-label="GreyLion Maritime, inicio"><Logo size={38} textSize="21px" /></Link>
              <button className="menu-close" type="button" onClick={closeMenu} aria-label="Cerrar menú">×</button>
            </header>
            <p className="menu-label">NAVEGACIÓN</p>
            <div className="menu-links">
              {navItems.map((item, index) => (
                <Link key={item.label} href={item.path} className="menu-card" onClick={closeMenu}>
                  <span className="index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="card-divider" />
                  <span className="menu-icon" aria-hidden="true">{item.icon}</span>
                  <span className="menu-text">{item.label}</span>
                  <span className="menu-arrow" aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
            <div className="menu-actions">
              <a className="mobile-tracking" href={trackingUrl} target="_blank" rel="noopener noreferrer">Seguimiento de carga</a>
              <a className="mobile-quote" href={quoteUrl} target="_blank" rel="noopener noreferrer">Cotizar envío <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>
      )}

      <style jsx>{`
        .navbar { position: fixed; inset: 0 0 auto; z-index: 60; height: 86px; display: flex; align-items: center; border-bottom: 1px solid transparent; background: linear-gradient(180deg, rgba(10,11,13,.78), rgba(10,11,13,.34)); transition: height .25s ease, background .25s ease, border-color .25s ease; }
        .navbar.scrolled { height: 68px; border-color: rgba(255,255,255,.09); background: rgba(10,11,13,.88); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
        .nav-content { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
        .logo-link { display: inline-flex; width: fit-content; text-decoration: none; }
        .desktop-nav { display: flex; gap: 25px; align-items: center; }
        .desktop-nav :global(a) { position: relative; padding: 9px 0; color: rgba(255,255,255,.72); font-size: 13px; font-weight: 600; text-decoration: none; transition: color .2s ease; }
        .desktop-nav :global(a)::after { position: absolute; right: 0; bottom: 3px; left: 0; height: 1px; content: ''; background: var(--primary-hover); transform: scaleX(0); transform-origin: center; transition: transform .2s ease; }
        .desktop-nav :global(a:hover), .desktop-nav :global(a:focus-visible) { color: #fff; outline: none; }
        .desktop-nav :global(a:hover)::after, .desktop-nav :global(a:focus-visible)::after { transform: scaleX(1); }
        .desktop-actions { display: flex; gap: 10px; justify-content: end; align-items: center; }
        .tracking-link, .quote-link { display: inline-flex; gap: 7px; align-items: center; border-radius: 999px; font-size: 13px; font-weight: 700; text-decoration: none; transition: transform .2s ease, background .2s ease, border-color .2s ease; }
        .tracking-link { padding: 10px 13px; color: #d8dce1; }
        .quote-link { padding: 10px 15px; background: var(--primary); color: #fff; box-shadow: 0 8px 20px rgba(15,76,129,.28); }
        .tracking-link:hover, .quote-link:hover { transform: translateY(-2px); }
        .tracking-link:hover { background: rgba(255,255,255,.07); }
        .quote-link:hover { background: var(--primary-hover); }
        .menu-toggle { display: none; justify-self: end; width: 42px; height: 42px; padding: 10px; border: 1px solid rgba(255,255,255,.13); border-radius: 12px; background: rgba(10,11,13,.58); }
        .menu-toggle span { display: block; height: 2px; margin: 4px 0; border-radius: 1px; background: #fff; }
        .mobile-menu { position: fixed; inset: 0; z-index: 120; }
        .menu-backdrop { position: absolute; inset: 0; width: 100%; border: 0; background: rgba(3,7,12,.66); backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px); }
        .menu-panel { position: relative; display: flex; width: min(480px, 100%); min-height: 100%; flex-direction: column; padding: 0 14px 28px; border-right: 1px solid rgba(34, 47, 63, .72); background: #030507; box-shadow: 28px 0 80px rgba(0,0,0,.62); animation: panelIn .24s ease-out; }
        .menu-header { display: flex; min-height: 60px; justify-content: space-between; align-items: center; padding: 0 10px 0 24px; border-bottom: 1px solid rgba(34, 47, 63, .72); }
        .menu-close { width: 42px; height: 42px; border: 0; background: transparent; color: #f13b38; font-size: 34px; font-weight: 200; line-height: 1; }
        .menu-label { margin: 17px 6px 14px; color: #697383; font-size: 10px; font-weight: 800; letter-spacing: .16em; text-align: right; }
        .menu-links { display: grid; gap: 8px; }
        :global(.menu-card) { display: grid; grid-template-columns: 29px 1px 37px minmax(0, 1fr) 18px; gap: 12px; align-items: center; min-height: 62px; padding: 10px 18px; border: 1px solid rgba(61, 103, 144, .62); border-radius: 15px; background: linear-gradient(105deg, #10161f, #0c1118); color: #e8ebef; text-decoration: none; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
        :global(.menu-card:hover), :global(.menu-card:focus-visible) { border-color: var(--primary-hover); background: #131d28; outline: none; transform: translateX(3px); }
        .index { color: #516176; font-size: 11px; font-weight: 800; }
        .card-divider { align-self: stretch; background: rgba(86, 104, 128, .36); }
        .menu-icon { display: grid; width: 33px; height: 33px; place-items: center; border: 1px solid rgba(15, 76, 129, .68); border-radius: 10px; background: rgba(15, 76, 129, .2); color: #9ed2fc; font-size: 16px; }
        .menu-text { font-size: 14px; font-weight: 750; }
        .menu-arrow { justify-self: end; color: #59687a; font-size: 24px; font-weight: 300; }
        .menu-actions { display: grid; gap: 9px; margin-top: 18px; }
        .mobile-tracking, .mobile-quote { display: flex; justify-content: center; align-items: center; min-height: 47px; border-radius: 14px; font-size: 14px; font-weight: 750; text-decoration: none; }
        .mobile-tracking { border: 1px solid rgba(255,255,255,.15); background: #171b20; color: #fff; }
        .mobile-quote { gap: 8px; background: var(--primary); color: #fff; }
        @keyframes panelIn { from { transform: translateX(-16px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @media (max-width: 991px) { .navbar { height: 72px; background: rgba(10,11,13,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); } .nav-content { grid-template-columns: 1fr auto; } .desktop-nav, .desktop-actions { display: none; } .menu-toggle { display: block; } .menu-panel { width: 100%; } .menu-actions { margin-top: auto; padding-top: 18px; } }
        @media (prefers-reduced-motion: reduce) { .navbar, .desktop-nav :global(a), .desktop-nav :global(a)::after, .tracking-link, .quote-link, :global(.menu-card), .menu-panel { animation: none; transition: none; } }
      `}</style>
    </>
  );
}
