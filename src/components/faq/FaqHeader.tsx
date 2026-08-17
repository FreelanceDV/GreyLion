import React from 'react';

export default function FaqHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[360px] mb-4 max-[850px]:min-h-[420px]">
      {/* Background ship photo, blended into the section background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/main_image_faq.png"
          alt="Buque portacontenedores de GreyLion Maritime"
          className="w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background-dark)_0%,rgba(11,18,32,0.85)_28%,rgba(11,18,32,0.35)_55%,transparent_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-background-dark)_0%,transparent_25%,transparent_75%,rgba(11,18,32,0.5)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 max-w-[560px] p-8 max-[850px]:max-w-full">
        <span className="text-[13px] font-extrabold text-primary-hover uppercase tracking-[0.14em]">
          Preguntas Frecuentes
        </span>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.15] text-text-white">
          Resolvemos tus dudas, <br />
          navegamos <span className="text-primary-hover">contigo</span>
        </h2>
        <p className="text-base leading-[1.6] text-text-gray max-w-[480px]">
          Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, procesos y soluciones logísticas marítimas.
        </p>
      </div>
    </div>
  );
}
