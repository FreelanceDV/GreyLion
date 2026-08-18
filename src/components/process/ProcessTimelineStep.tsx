import React from 'react';
import ProcessIcon from './ProcessIcon';
import { ProcessStep } from './data';

interface ProcessTimelineStepProps {
  step: ProcessStep;
}

export default function ProcessTimelineStep({ step }: ProcessTimelineStepProps) {
  return (
    <div className="relative flex items-center">
      {/* Numbered circle */}
      <div className="absolute -left-[70px] max-[560px]:-left-[56px] top-1/2 -translate-y-1/2 z-10 grid w-12 h-12 place-items-center rounded-full border-2 border-[rgba(255,255,255,0.15)] bg-background-dark font-[family-name:var(--font-space-grotesk)] text-lg font-extrabold text-text-white">
        {step.num}
      </div>
      {/* Connector dot */}
      <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 z-10 w-2 h-2 rounded-full bg-primary-hover" />

      {/* Card */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 flex items-start gap-5 transition-colors duration-300 hover:border-primary-hover/40">
        <span className="absolute top-2 right-5 font-[family-name:var(--font-space-grotesk)] text-[56px] font-extrabold leading-none text-white/5 select-none">
          {step.num}
        </span>
        <span className="relative z-10 shrink-0 grid w-14 h-14 place-items-center rounded-xl bg-primary/15 text-primary-hover [&>svg]:w-7 [&>svg]:h-7">
          <ProcessIcon name={step.icon} />
        </span>
        <div className="relative z-10 flex-1">
          <h3 className="text-[17px] font-bold text-text-white m-0">{step.title}</h3>
          <p className="text-[13.5px] leading-[1.6] text-text-gray mt-1.5">{step.desc}</p>
        </div>
        <span className="relative z-10 shrink-0 grid w-8 h-8 place-items-center rounded-full border border-primary-hover/40 text-primary-hover">
          <ProcessIcon name="chevron-right" strokeWidth={2.5} className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
