'use client';

import React from 'react';

const FAQS = [
  {
    q: '¿Cuáles son los tiempos de tránsito típicos para envíos marítimos?',
    a: 'Los tiempos de tránsito varían según la ruta de destino. Por ejemplo, los tránsitos entre Asia y América Latina suelen demorar de 25 a 35 días, mientras que las rutas transatlánticas desde Europa toman aproximadamente de 15 a 20 días operacionales.',
  },
  {
    q: '¿Qué documentación necesito para iniciar un proceso de exportación?',
    a: 'Generalmente se requiere la Factura Comercial (Commercial Invoice), la Lista de Empaque (Packing List), el Conocimiento de Embarque (Bill of Lading - B/L) y la Declaración de Aduanas de salida. Nuestro equipo le guiará paso a paso para recopilar todos los requisitos.',
  },
  {
    q: '¿Cómo puedo cotizar el alquiler de maquinaria pesada?',
    a: 'Puede cotizar haciendo clic en cualquiera de nuestros botones de cotización directa que le conectarán instantáneamente con nuestro equipo comercial en WhatsApp, o enviando un correo electrónico con los requerimientos técnicos de su obra.',
  },
  {
    q: '¿Cuál es la diferencia entre los servicios de carga FCL y LCL?',
    a: 'FCL (Full Container Load) implica reservar el contenedor de 20 o 40 pies de forma exclusiva para su mercancía. LCL (Less than Container Load) o carga consolidada agrupa su mercancía con la de otros exportadores en un solo contenedor, pagando solo por el espacio ocupado.',
  },
  {
    q: '¿Qué medidas de seguridad se aplican durante la carga y descarga en puerto?',
    a: 'Aplicamos estrictos protocolos de supervisión física en puerto que incluyen inspección visual previa de las bodegas, trincado certificado de la carga con tensores de alta resistencia, precintado de seguridad homologado y control de peso para evitar cualquier siniestro.',
  },
];

export default function FAQ() {
  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        color: 'var(--background-dark)',
        padding: '100px 0',
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-5" style={{ maxWidth: '800px' }}>
        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4vw, 54px)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '64px',
            color: 'var(--background-dark)',
          }}
        >
          Preguntas Frecuentes
        </h2>

        {/* FAQ Accordion list using native HTML details/summary */}
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E4E7EC' }}>
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              style={{
                borderBottom: '1px solid #E4E7EC',
                padding: '24px 0',
              }}
              className="faq-details"
            >
              {/* Header Toggle Row */}
              <summary
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  listStyle: 'none',
                  outline: 'none',
                  color: 'var(--background-dark)',
                  gap: '24px',
                  userSelect: 'none',
                }}
                className="faq-summary"
              >
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#B7B7B7',
                      width: '30px',
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {faq.q}
                  </h3>
                </div>

                {/* Toggle Sign Icon */}
                <div
                  className="toggle-sign-icon"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#F0F0F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#737373',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <span className="sign-char">+</span>
                </div>
              </summary>

              {/* Answer Body */}
              <div
                style={{
                  paddingTop: '16px',
                  paddingLeft: '50px',
                  paddingRight: '48px',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#475467',
                }}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Global CSS to style details states and hide markers natively */}
      <style jsx global>{`
        .faq-summary::-webkit-details-marker {
          display: none !important;
        }
        .faq-summary {
          list-style: none !important;
        }
        /* Custom styles when the parent <details> is open */
        .faq-details[open] .toggle-sign-icon {
          background-color: var(--primary) !important;
          color: #FFFFFF !important;
        }
        .faq-details[open] .sign-char {
          content: "";
        }
        .faq-details[open] .toggle-sign-icon::after {
          content: "−";
        }
        .faq-details[open] .sign-char {
          display: none;
        }
      `}</style>
    </section>
  );
}
