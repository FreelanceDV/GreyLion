import React from 'react';

export default function WorkWithUsHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-5 mb-[72px]">
      <span className="text-[13px] font-semibold text-primary-dark uppercase tracking-[0.05em]">
        Ventajas Corporativas
      </span>
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,54px)] font-extrabold leading-[1.15] max-w-[800px]">
        Ventajas de Trabajar con <br />
        <span className="text-primary-dark">GreyLion Maritime</span>
      </h2>
      <p className="text-base text-[#475467] max-w-[680px] leading-[1.6]">
        Ofrecemos excelencia operativa, seguridad y gestión aduanera simplificada para potenciar el crecimiento comercial de tu empresa.
      </p>
    </div>
  );
}
