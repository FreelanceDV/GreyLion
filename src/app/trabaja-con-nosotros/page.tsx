import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WorkWithUs from '@/components/work-with-us';
import WhatsAppButton from '@/components/whatsapp-button';

export const metadata = {
  title: 'Trabaja con Nosotros | GreyLion Maritime',
  description: 'Únete a nuestro equipo y forma parte del operador logístico marítimo global líder. Descubre nuestras ventajas corporativas y oportunidades.',
};

export default function CareersPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background-dark">
      <Navbar />

      {/* Career Hero Section */}
      <section className="relative overflow-hidden py-[160px] pb-20 bg-[#060B18]">
        {/* Glow */}
        <div className="absolute top-[-20%] left-[30%] w-1/2 h-3/5 rounded-full bg-[radial-gradient(circle,rgba(90,110,216,0.12)_0%,transparent_70%)] blur-[120px] pointer-events-none z-[1]" />

        <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10 text-center">
          <span className="text-[13px] font-semibold text-primary uppercase tracking-[0.05em]">
            Oportunidades Profesionales
          </span>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.15] text-text-white mt-4">
            Únete al Equipo de <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_20%,var(--color-primary)_50%,#FFFFFF_80%,#FFFFFF_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">GreyLion Maritime</span>
          </h1>
          <p className="text-[clamp(15px,1.8vw,18px)] text-text-gray max-w-[720px] leading-[1.6] mt-6 mx-auto">
            Buscamos profesionales apasionados por los desafíos de la logística internacional, el transporte marítimo y las soluciones de infraestructura vial.
          </p>
        </div>
      </section>

      {/* Main WorkWithUs Advantages Grid */}
      <WorkWithUs />

      {/* Job application instructions */}
      <section className="bg-background-black py-[100px] border-t border-[rgba(255,255,255,0.05)]">
        <div className="w-full max-w-[800px] mx-auto px-5 text-center">
          <div className="bg-[rgba(255,255,255,0.02)] border-[1.5px] border-[rgba(90,110,216,0.25)] rounded-[24px] py-[60px] px-[clamp(24px,5vw,64px)] flex flex-col gap-7 shadow-[0_15px_40px_rgba(90,110,216,0.04)]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[28px] font-bold text-text-white">
              ¿Cómo postularse?
            </h2>
            <p className="text-[15px] leading-[1.6] text-text-gray">
              Si te interesa formar parte de nuestros futuros procesos de selección o enviar una postulación espontánea, por favor remite tu currículum vitae detallado e indicando tu área de interés al correo electrónico de recursos humanos:
            </p>

            <a
              href={`mailto:${email}`}
              className="text-xl font-bold text-primary no-underline break-all transition-colors duration-200 hover:text-[#84C1FA]"
            >
              {email}
            </a>

            <div className="h-px bg-[rgba(255,255,255,0.08)] my-3" />

            <p className="text-[13px] text-text-muted">
              Evaluaremos tu perfil técnico y nos pondremos en contacto cuando surja una oportunidad que se adapte a tus competencias.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
