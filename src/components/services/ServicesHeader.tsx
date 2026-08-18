import React from 'react';
import ServicesIcon from './ServicesIcon';
import ServicesCategoryTabs from './ServicesCategoryTabs';
import { ServiceCategory } from './data';
import DynamicMedia from '../DynamicMedia';

interface ServicesHeaderProps {
  activeCategory: ServiceCategory;
  onSelect: (id: string) => void;
}

export default function ServicesHeader({ activeCategory, onSelect }: ServicesHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-2 gap-12 items-center max-[991px]:grid-cols-1">
          <div className="flex flex-col gap-5 py-16 max-[991px]:py-10">
            <div className="flex items-center gap-2">
              <span className="text-primary-hover [&>svg]:w-4 [&>svg]:h-4">
                <ServicesIcon name="anchor" />
              </span>
              <span className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.15em]">
                Soluciones Integrales
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.05] text-text-white">
              Nuestros <span className="text-primary-hover">Servicios</span>
            </h2>

            <p className="text-[15px] leading-[1.6] text-text-gray max-w-[440px]">
              {activeCategory.subtitle}
            </p>

            <ServicesCategoryTabs activeCategory={activeCategory.id} onSelect={onSelect} />
          </div>

          {/* Spacer column: keeps the grid track width; the photo bleeds past it to the viewport edge */}
          <div className="max-[991px]:hidden" aria-hidden="true" />
        </div>
      </div>

      {/* Hero photo: bleeds from the right column all the way to the true viewport edge */}
      <div className="absolute inset-y-0 right-0 w-[46%] max-[991px]:hidden">
        <DynamicMedia
          src="/our-services-main-image.png"
          alt="Operación portuaria y logística de GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background-dark)_0%,transparent_20%)]" />
      </div>
    </div>
  );
}
