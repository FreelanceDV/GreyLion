'use client';

import Link from 'next/link';
import Logo from './Logo';

const socialLinks = [
  { label: 'Facebook', icon: 'f' },
  { label: 'X', icon: '𝕏' },
  { label: 'Instagram', icon: '◎' },
  { label: 'LinkedIn', icon: 'in' },
];

const footerColumnLinkClasses =
  'text-[#9fc6ee] text-[12px] leading-[1.45] no-underline transition-[color,transform] duration-200 ease-[ease] hover:text-white hover:translate-x-[3px]';

const footerLegalLinkClasses =
  'text-[#9fc6ee] text-[11px] no-underline transition-[color] duration-200 ease-[ease] hover:text-white';

export default function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const proposalUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero recibir una propuesta personalizada.')}`;

  return (
    <footer className="relative overflow-hidden pt-[76px] pb-[28px] max-[560px]:pt-[58px] bg-[linear-gradient(118deg,#031b35_0%,#041b35_48%,#021326_100%)] border-t border-[rgba(65,143,214,0.27)] text-[#8bb6e4]">
      <div
        className="absolute -top-[140px] left-1/2 w-[760px] h-[230px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(7,92,168,.42),transparent_68%)] blur-[16px] pointer-events-none -translate-x-1/2"
        aria-hidden="true"
      />
      <div className="w-full max-w-[1280px] mx-auto px-5 relative">
        <section className="grid grid-cols-[1.45fr_.85fr_.9fr_1.1fr] gap-[42px] pb-[58px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 max-[560px]:gap-[30px] max-[560px]:pb-[40px]">
          <div className="flex max-w-[330px] flex-col items-start gap-[18px] max-[560px]:max-w-none">
            <Link href="/" aria-label="GreyLion Maritime, inicio" className="no-underline">
              <Logo size={38} textSize="22px" />
            </Link>
            <p className="text-[13px] leading-[1.7] text-[#a4c8ed]">
              Operaciones marítimas, logística industrial y maquinaria especializada con respaldo de punta a punta.
            </p>
            <a
              className="inline-flex items-center gap-[9px] px-[15px] py-[11px] border border-[rgba(89,176,255,0.72)] rounded-[10px] bg-[rgba(7,92,168,0.2)] text-[#e2f2ff] text-[12px] font-extrabold no-underline transition-[background,transform] duration-200 ease-[ease] hover:bg-[rgba(7,92,168,0.48)] hover:-translate-y-[2px]"
              href={proposalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar propuesta <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav className="flex flex-col gap-[11px] not-italic" aria-label="Navegación del pie de página">
            <h2 className="mb-[5px] text-[#e6f2ff] font-[family-name:var(--font-space-grotesk)] text-[14px] font-bold">
              Navegación
            </h2>
            <Link href="/" className={footerColumnLinkClasses}>Inicio</Link>
            <Link href="/#mision-vision" className={footerColumnLinkClasses}>Nuestra identidad</Link>
            <Link href="/#servicios" className={footerColumnLinkClasses}>Servicios marítimos</Link>
            <Link href="/#maquinaria" className={footerColumnLinkClasses}>Maquinaria especializada</Link>
          </nav>

          <div className="flex flex-col gap-[11px] not-italic">
            <h2 className="mb-[5px] text-[#e6f2ff] font-[family-name:var(--font-space-grotesk)] text-[14px] font-bold">
              Operaciones
            </h2>
            <Link href="/#servicios" className={footerColumnLinkClasses}>Fletamento marítimo</Link>
            <Link href="/#servicios" className={footerColumnLinkClasses}>Logística de proyectos</Link>
            <Link href="/#servicios" className={footerColumnLinkClasses}>Carga especializada</Link>
            <Link href="/#maquinaria" className={footerColumnLinkClasses}>Suministro industrial</Link>
          </div>

          <address className="flex flex-col gap-[11px] not-italic">
            <h2 className="mb-[5px] text-[#e6f2ff] font-[family-name:var(--font-space-grotesk)] text-[14px] font-bold">
              Contacto directo
            </h2>
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-[8px] [overflow-wrap:anywhere] ${footerColumnLinkClasses}`}
            >
              <span aria-hidden="true" className="text-[#61b8ff] text-[14px]">✉</span>
              {email}
            </a>
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-[8px] [overflow-wrap:anywhere] ${footerColumnLinkClasses}`}
            >
              <span aria-hidden="true" className="text-[#61b8ff] text-[14px]">⌕</span>
              +{phone}
            </a>
            <p className="flex items-start gap-[7px] mt-[6px] text-[#87add4] text-[11px] leading-[1.45]">
              <span
                className="w-[7px] h-[7px] flex-none mt-[4px] rounded-full bg-[#46c982] shadow-[0_0_0_4px_rgba(70,201,130,0.08)]"
                aria-hidden="true"
              />
              Equipo disponible para atender su operación
            </p>
          </address>
        </section>

        <section className="grid grid-cols-[1fr_auto_auto] gap-[24px] items-center pt-[23px] border-t border-[rgba(125,185,241,0.2)] max-[900px]:grid-cols-1 max-[900px]:gap-[16px]">
          <p className="text-[11px]">© 2026 GreyLion Maritime S.A. Todos los derechos reservados.</p>
          <div className="flex gap-[16px] flex-wrap max-[560px]:gap-[12px]">
            <Link href="/trabaja-con-nosotros" className={footerLegalLinkClasses}>Trabaja con nosotros</Link>
            <a href="#" className={footerLegalLinkClasses}>Condiciones de servicio</a>
            <a href="#" className={footerLegalLinkClasses}>Privacidad</a>
            <a href="#" className={footerLegalLinkClasses}>Cookies</a>
          </div>
          <div className="flex gap-[8px]" aria-label="Redes sociales">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="grid w-[29px] h-[29px] place-items-center border border-[rgba(144,203,255,0.38)] rounded-[8px] text-[#e0f0ff] font-[Arial,sans-serif] text-[12px] font-bold no-underline transition-[border-color,background,color] duration-200 ease-[ease] hover:border-[#80c4ff] hover:bg-[#075ca8] hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}
