'use client';

import HeroBackground from './HeroBackground';
import HeroBadge from './HeroBadge';
import HeroHeading from './HeroHeading';
import HeroCTA from './HeroCTA';
import HeroPageMarker from './HeroPageMarker';
import HeroStatsBar from './HeroStatsBar';

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <div
      id="inicio"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#060d1c] before:absolute before:inset-0 before:z-0 before:content-[''] before:pointer-events-none before:bg-[radial-gradient(ellipse_48%_38%_at_62%_54%,rgba(255,181,99,.2),transparent_68%),linear-gradient(90deg,rgba(1,7,16,.52),transparent_72%)]"
    >
      <HeroBackground />

      {/* Hero Main Content */}
      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10 grow flex items-center pt-[120px] pb-10 max-[768px]:px-6!">
        <div className="max-w-[650px] flex flex-col gap-6 items-start text-left animate-copy-enter max-[768px]:max-w-[86%] motion-reduce:animate-none">
          <HeroBadge />
          <HeroHeading />
          <HeroCTA whatsappUrl={whatsappUrl} />
        </div>

        <HeroPageMarker />
      </div>

      <HeroStatsBar />
    </div>
  );
}
