import { SOCIAL_LINKS } from './data';

export default function FooterSocialLinks() {
  return (
    <div className="flex gap-[8px]" aria-label="Redes sociales">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="grid w-[29px] h-[29px] place-items-center border border-[rgba(144,203,255,0.38)] rounded-[8px] text-[#e0f0ff] font-[Arial,sans-serif] text-[12px] font-bold no-underline transition-[border-color,background,color] duration-200 ease-[ease] hover:border-[#80c4ff] hover:bg-[#075ca8] hover:text-white"
        >
          {social.icon ? <social.icon className="h-3.5 w-3.5" strokeWidth={2} /> : social.textIcon}
        </a>
      ))}
    </div>
  );
}
