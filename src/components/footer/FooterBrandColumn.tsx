import Link from 'next/link';
import Logo from '../Logo';

interface FooterBrandColumnProps {
  proposalUrl: string;
}

export default function FooterBrandColumn({ proposalUrl }: FooterBrandColumnProps) {
  return (
    <div className="flex max-w-[330px] flex-col items-start gap-[18px] max-[560px]:max-w-none">
      <Link href="/" aria-label="GreyLion Maritime, inicio" className="no-underline">
        <Logo size={38} textSize="22px" />
      </Link>
      <p className="text-[13px] leading-[1.7] text-[#a4c8ed]">
        Operaciones marítimas, logística industrial y maquinaria especializada con respaldo de punta a punta.
      </p>
      <a
        className="inline-flex items-center gap-[9px] px-[15px] py-[11px] border border-[rgba(89,176,255,0.72)] rounded-[10px] bg-[rgba(7,92,168,0.2)] text-[#e2f2ff] text-[12px] font-extrabold no-underline transition-[background,transform] duration-200 ease-[ease] hover:bg-[rgba(7,92,168,0.48)] hover:-translate-y-[2px]"
        href={proposalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Solicitar propuesta <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
