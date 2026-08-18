import { footerColumnLinkClasses } from './styles';

interface FooterContactColumnProps {
  email: string;
  phone: string;
}

export default function FooterContactColumn({ email, phone }: FooterContactColumnProps) {
  return (
    <address className="flex flex-col gap-[11px] not-italic">
      <h2 className="mb-[5px] text-[#e6f2ff] font-[family-name:var(--font-space-grotesk)] text-[14px] font-bold">
        Contacto directo
      </h2>
      <a
        href={`mailto:${email}`}
        className={`flex items-center gap-[8px] [overflow-wrap:anywhere] ${footerColumnLinkClasses}`}
      >
        <span aria-hidden="true" className="text-[#61b8ff] text-[14px]">✉</span>
        {email}
      </a>
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-[8px] [overflow-wrap:anywhere] ${footerColumnLinkClasses}`}
      >
        <span aria-hidden="true" className="text-[#61b8ff] text-[14px]">⌕</span>
        +{phone}
      </a>
      <p className="flex items-start gap-[7px] mt-[6px] text-[#87add4] text-[11px] leading-[1.45]">
        <span
          className="w-[7px] h-[7px] flex-none mt-[4px] rounded-full bg-[#46c982] shadow-[0_0_0_4px_rgba(70,201,130,0.08)]"
          aria-hidden="true"
        />
        Equipo disponible para atender su operación
      </p>
    </address>
  );
}
