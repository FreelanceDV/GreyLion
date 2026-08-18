'use client';

import FooterBrandColumn from './FooterBrandColumn';
import FooterNavColumn from './FooterNavColumn';
import FooterContactColumn from './FooterContactColumn';
import FooterBottomBar from './FooterBottomBar';
import { NAV_LINKS, OPERATIONS_LINKS } from './data';

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
          <FooterBrandColumn proposalUrl={proposalUrl} />
          <FooterNavColumn title="Navegación" links={NAV_LINKS} ariaLabel="Navegación del pie de página" />
          <FooterNavColumn title="Operaciones" links={OPERATIONS_LINKS} ariaLabel="Enlaces de operaciones" />
          <FooterContactColumn email={email} phone={phone} />
        </section>

        <FooterBottomBar />
      </div>
    </footer>
  );
}
