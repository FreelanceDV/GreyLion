import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroCTAProps {
  whatsappUrl: string;
}

export default function HeroCTA({ whatsappUrl }: HeroCTAProps) {
  return (
    <div className="mt-3 animate-[copyEnter_.85s_cubic-bezier(.2,.75,.2,1)_.42s_both] motion-reduce:animate-none">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
        <button className="bg-[#0070f3] text-white border-0 rounded-md px-8 py-4 text-[15px] font-bold cursor-pointer flex items-center gap-3 transition-all duration-300 ease-[ease] shadow-[0_8px_24px_rgba(0,112,243,0.35)] hover:bg-[#005ccb] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#9ad6ff] focus-visible:outline-offset-4 motion-reduce:transition-none">
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          <span>DESCUBRIR MÁS</span>
        </button>
      </a>
    </div>
  );
}
