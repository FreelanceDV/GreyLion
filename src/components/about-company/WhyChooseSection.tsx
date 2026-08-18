import React from 'react';
import WhyChooseContent from './WhyChooseContent';
import WhyChoosePillars from './WhyChoosePillars';
import WhyChooseImage from './WhyChooseImage';

interface WhyChooseSectionProps {
  whatsappUrl: string;
}

export default function WhyChooseSection({ whatsappUrl }: WhyChooseSectionProps) {
  return (
    <div id="porque-elegirnos" className="relative z-10 scroll-mt-[100px] mt-[100px] border-t border-[rgba(255,255,255,0.06)] bg-background-black py-10">
      <div className="grid grid-cols-[0.85fr_1.15fr_0.8fr] w-full max-[991px]:grid-cols-1">
        <WhyChooseContent whatsappUrl={whatsappUrl} />
        <WhyChoosePillars />
        <WhyChooseImage />
      </div>
    </div>
  );
}
