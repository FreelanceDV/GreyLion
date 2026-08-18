import React from 'react';
import DynamicMedia from '../DynamicMedia';
import FaqIcon from './FaqIcon';

export default function FaqSidebar() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@greylionmaritime.com';
  const contactUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, tengo una pregunta que no encontré en las preguntas frecuentes.')}`;

  return (
    <aside className="flex flex-col gap-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-7">
      <div className="w-20 h-20 rounded-full bg-primary/15 text-primary-hover flex items-center justify-center">
        <FaqIcon name="headset" className="w-10 h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-text-white leading-[1.25]">
          ¿No encuentras <br />
          <span className="text-primary-hover">lo que buscas?</span>
        </h3>
        <p className="text-md leading-[1.6] text-text-gray">
          Nuestro equipo de expertos está listo para ayudarte en todo momento.
        </p>
      </div>

      <a
        href={contactUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white no-underline py-3 px-5 text-[15px] font-bold transition-all duration-200 ease-[ease] hover:bg-primary-hover hover:-translate-y-0.5"
      >
        Contactar Ahora
        <FaqIcon name="arrow-right" className="w-5 h-5" />
      </a>

      <div className="flex flex-col gap-4 pt-2 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex gap-3 items-start">
          <FaqIcon name="phone" className="w-5 h-5 text-primary-hover mt-0.5 shrink-0" />
          <div>
            <p className="text-base font-semibold text-text-white m-0">Llámanos</p>
            <p className="text-base text-text-gray m-0">+57 (601) 123 4567</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <FaqIcon name="mail" className="w-5 h-5 text-primary-hover mt-0.5 shrink-0" />
          <div>
            <p className="text-base font-semibold text-text-white m-0">Escríbenos</p>
            <p className="text-base text-text-gray m-0 break-all">{email}</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <FaqIcon name="clock" className="w-5 h-5 text-primary-hover mt-0.5 shrink-0" />
          <div>
            <p className="text-base font-semibold text-text-white m-0">Horario de atención</p>
            <p className="text-base text-text-gray m-0">Lun - Vie: 8:00 AM - 6:00 PM</p>
            <p className="text-base text-text-gray m-0">Sáb: 8:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden min-h-[180px]">
        <DynamicMedia
          src="/Cant_find_what_youre_looking_for.png"
          alt="Cobertura global de rutas marítimas GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(6,13,28,0.15)_0%,rgba(6,13,28,0.9)_100%)] flex flex-col justify-end">
        <p className="text-lg font-extrabold text-primary-hover m-0">Cobertura Global</p>
        <p className="text-base text-white/75 m-0">Conectamos tu carga con el mundo entero.</p>
      </div>
      
    </aside>
  );
}
