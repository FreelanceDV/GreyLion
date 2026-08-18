import React from 'react';
import ProcessTimelineStep from './ProcessTimelineStep';
import { STEPS } from './data';

export default function ProcessTimeline() {
  return (
    <div className="relative pl-[70px] max-[560px]:pl-[56px]">
      {/* Timeline vertical bar, running through the numbered circles */}
      <div className="absolute left-6 top-6 bottom-6 w-px bg-[rgba(255,255,255,0.1)] z-0" />

      <div className="flex flex-col gap-8">
        {STEPS.map((step, idx) => (
          <ProcessTimelineStep key={idx} step={step} />
        ))}
      </div>
    </div>
  );
}
