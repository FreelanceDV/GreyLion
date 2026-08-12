'use client';

import Link from 'next/link';
import Logo from './Logo';

const socialLinks = [
  { label: 'Facebook', icon: 'f' },
  { label: 'X', icon: '𝕏' },
  { label: 'Instagram', icon: '◎' },
  { label: 'LinkedIn', icon: 'in' },
];

export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const proposalUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero recibir una propuesta personalizada.')}`;

  return (
    <footer className="footer">
      <div className="footer-beam" aria-hidden="true" />
      <div className="container footer-content">
        <section className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="GreyLion Maritime, inicio"><Logo size={38} textSize="22px" /></Link>
            <p>Operaciones marítimas, logística industrial y maquinaria especializada con respaldo de punta a punta.</p>
            <a className="footer-cta" href={proposalUrl} target="_blank" rel="noopener noreferrer">Solicitar propuesta <span aria-hidden="true">↗</span></a>
          </div>

          <nav className="footer-column" aria-label="Navegación del pie de página">
            <h2>Navegación</h2>
            <Link href="/">Inicio</Link>
            <Link href="/#mision-vision">Nuestra identidad</Link>
            <Link href="/#servicios">Servicios marítimos</Link>
            <Link href="/#maquinaria">Maquinaria especializada</Link>
          </nav>

          <div className="footer-column">
            <h2>Operaciones</h2>
            <Link href="/#servicios">Fletamento marítimo</Link>
            <Link href="/#servicios">Logística de proyectos</Link>
            <Link href="/#servicios">Carga especializada</Link>
            <Link href="/#maquinaria">Suministro industrial</Link>
          </div>

          <address className="footer-column footer-contact">
            <h2>Contacto directo</h2>
            <a href={`mailto:${email}`}><span aria-hidden="true">✉</span>{email}</a>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌕</span>+{phone}</a>
            <p><span className="status-dot" aria-hidden="true" />Equipo disponible para atender su operación</p>
          </address>
        </section>

        <section className="footer-bottom">
          <p>© 2026 GreyLion Maritime S.A. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <Link href="/trabaja-con-nosotros">Trabaja con nosotros</Link>
            <a href="#">Condiciones de servicio</a>
            <a href="#">Privacidad</a>
            <a href="#">Cookies</a>
          </div>
          <div className="footer-social" aria-label="Redes sociales">
            {socialLinks.map((social) => <a key={social.label} href="#" aria-label={social.label}>{social.icon}</a>)}
          </div>
        </section>
      </div>

      <style jsx>{`
        .footer { position: relative; overflow: hidden; padding: 76px 0 28px; background: #0a0d11; border-top: 1px solid rgba(140,150,158,.14); color: #8e9aa5; }
        .footer-beam { position: absolute; top: -140px; left: 50%; width: 760px; height: 230px; border-radius: 50%; background: radial-gradient(ellipse, rgba(15,76,129,.28), transparent 68%); filter: blur(16px); pointer-events: none; transform: translateX(-50%); }
        .footer-content { position: relative; }
        .footer-top { display: grid; grid-template-columns: 1.45fr .85fr .9fr 1.1fr; gap: 42px; padding-bottom: 58px; }
        .footer-brand { display: flex; max-width: 330px; flex-direction: column; align-items: flex-start; gap: 18px; }
        .footer-brand :global(a:first-child) { text-decoration: none; }
        .footer-brand p { margin: 0; color: #8e9aa5; font-size: 13px; line-height: 1.7; }
        .footer-cta { display: inline-flex; gap: 9px; align-items: center; padding: 11px 15px; border: 1px solid rgba(57,132,192,.55); border-radius: 10px; background: rgba(15,76,129,.16); color: #dcefff; font-size: 12px; font-weight: 800; text-decoration: none; transition: background .2s ease, transform .2s ease; }
        .footer-cta:hover { background: rgba(15,76,129,.35); transform: translateY(-2px); }
        .footer-column { display: flex; flex-direction: column; gap: 11px; margin: 0; font-style: normal; }
        .footer-column h2 { margin: 0 0 5px; color: #f4f7f9; font-family: var(--font-space-grotesk); font-size: 14px; font-weight: 700; }
        .footer-column :global(a), .footer-column > a { color: #8e9aa5; font-size: 12px; line-height: 1.45; text-decoration: none; transition: color .2s ease, transform .2s ease; }
        .footer-column :global(a:hover), .footer-column > a:hover { color: #8ed0ff; transform: translateX(3px); }
        .footer-contact > a { display: flex; gap: 8px; align-items: center; overflow-wrap: anywhere; }
        .footer-contact > a span { color: #8ed0ff; font-size: 14px; }
        .footer-contact p { display: flex; gap: 7px; align-items: flex-start; margin: 6px 0 0; color: #75838e; font-size: 11px; line-height: 1.45; }
        .status-dot { width: 7px; height: 7px; flex: 0 0 auto; margin-top: 4px; border-radius: 50%; background: #46c982; box-shadow: 0 0 0 4px rgba(70,201,130,.08); }
        .footer-bottom { display: grid; grid-template-columns: 1fr auto auto; gap: 24px; align-items: center; padding-top: 23px; border-top: 1px solid rgba(140,150,158,.13); }
        .footer-bottom p { margin: 0; font-size: 11px; }
        .footer-legal { display: flex; gap: 16px; flex-wrap: wrap; }
        .footer-legal :global(a), .footer-legal > a { color: #8e9aa5; font-size: 11px; text-decoration: none; transition: color .2s ease; }
        .footer-legal :global(a:hover), .footer-legal > a:hover { color: #fff; }
        .footer-social { display: flex; gap: 8px; }
        .footer-social a { display: grid; width: 29px; height: 29px; place-items: center; border: 1px solid rgba(140,150,158,.22); border-radius: 8px; color: #d5dce1; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; text-decoration: none; transition: border-color .2s ease, background .2s ease, color .2s ease; }
        .footer-social a:hover { border-color: #4d9bce; background: #0f4c81; color: #fff; }
        @media (max-width: 900px) { .footer-top { grid-template-columns: repeat(2, minmax(0, 1fr)); } .footer-bottom { grid-template-columns: 1fr; gap: 16px; } }
        @media (max-width: 560px) { .footer { padding-top: 58px; } .footer-top { grid-template-columns: 1fr; gap: 30px; padding-bottom: 40px; } .footer-brand { max-width: none; } .footer-legal { gap: 12px; } }
      `}</style>
    </footer>
  );
}
