import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorkWithUs from '@/components/WorkWithUs';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Trabaja con Nosotros | GreyLion Maritime',
  description: 'Únete a nuestro equipo y forma parte del operador logístico marítimo global líder. Descubre nuestras ventajas corporativas y oportunidades.',
};

export default function CareersPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';

  return (
    <main style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', backgroundColor: 'var(--background-dark)' }}>
      <Navbar />

      {/* Career Hero Section */}
      <section
        style={{
          padding: '160px 0 80px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#060B18',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '30%',
            width: '50%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(90, 110, 216, 0.12) 0%, transparent 70%)',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="w-full max-w-[1280px] mx-auto px-5" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Oportunidades Profesionales
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text-white)',
              marginTop: '16px',
            }}
          >
            Únete al Equipo de <span className="bg-[linear-gradient(90deg,#FFFFFF_0%,#FFFFFF_20%,var(--color-primary)_50%,#FFFFFF_80%,#FFFFFF_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">GreyLion Maritime</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'var(--text-gray)',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: '24px auto 0 auto',
            }}
          >
            Buscamos profesionales apasionados por los desafíos de la logística internacional, el transporte marítimo y las soluciones de infraestructura vial.
          </p>
        </div>
      </section>

      {/* Main WorkWithUs Advantages Grid */}
      <WorkWithUs />

      {/* Job application instructions */}
      <section
        style={{
          backgroundColor: 'var(--background-black)',
          padding: '100px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-5" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1.5px solid rgba(90, 110, 216, 0.25)',
              borderRadius: '24px',
              padding: '60px clamp(24px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              boxShadow: '0 15px 40px rgba(90, 110, 216, 0.04)',
            }}
            className="relative rounded-[14px] overflow-hidden transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:p-[1.5px] before:[background:linear-gradient(135deg,rgba(90,110,216,0.4)_0%,transparent_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] before:[-webkit-mask-composite:xor] before:pointer-events-none hover:before:[background:linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent)_100%)]"
          >
            <h2
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--text-white)',
              }}
            >
              ¿Cómo postularse?
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-gray)',
              }}
            >
              Si te interesa formar parte de nuestros futuros procesos de selección o enviar una postulación espontánea, por favor remite tu currículum vitae detallado e indicando tu área de interés al correo electrónico de recursos humanos:
            </p>

            <a
              href={`mailto:${email}`}
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--primary)',
                textDecoration: 'none',
                wordBreak: 'break-all',
                transition: 'color 0.2s',
              }}
              className="email-link"
            >
              {email}
            </a>

            <div
              style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                margin: '12px 0',
              }}
            />

            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Evaluaremos tu perfil técnico y nos pondremos en contacto cuando surja una oportunidad que se adapte a tus competencias.
            </p>
          </div>
        </div>
      </section>

      {/* Styled email hover */}
      <style>{`
        .email-link:hover {
          color: #84C1FA !important;
        }
      `}</style>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
