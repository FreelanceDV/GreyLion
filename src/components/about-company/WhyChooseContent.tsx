import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WhyChooseContentProps {
  whatsappUrl: string;
}

export default function WhyChooseContent({ whatsappUrl }: WhyChooseContentProps) {
  return (
    <div className="flex flex-col gap-6 justify-center py-10 pl-[clamp(20px,6vw,96px)] pr-8 max-[991px]:p-8">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-bold text-primary-hover uppercase tracking-[0.14em]">
          Valores Agregados
        </span>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] text-white">
          ¿Por qué elegir a GreyLion <br />
          <span className="text-primary-hover underline decoration-primary-hover/70 underline-offset-8">Maritime?</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm leading-[1.7] text-text-gray">
          Optimizamos su cadena de suministro combinando tecnología avanzada para el seguimiento en tiempo real con tarifas competitivas gracias a nuestros acuerdos navieros directos.
        </p>
        <p className="text-sm leading-[1.7] text-text-gray">
          Garantizamos la máxima seguridad de su carga con pólizas incluidas y gestionamos de forma integral todo el papeleo aduanero bajo normativas internacionales. Con nosotros, obtiene el respaldo de un equipo experto dedicado exclusivamente a brindarle asesoría personalizada de principio a fin.
        </p>
      </div>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline w-fit">
        <button className="flex items-center gap-2 bg-primary text-white border-0 rounded-lg py-3.5 px-6 text-[12px] font-bold uppercase tracking-[0.04em] cursor-pointer transition-all duration-300 ease-[ease] shadow-[0_8px_20px_rgba(15,76,129,0.25)] hover:bg-primary-hover hover:-translate-y-0.5">
          Recibir Propuesta Personalizada
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </a>
    </div>
  );
}
