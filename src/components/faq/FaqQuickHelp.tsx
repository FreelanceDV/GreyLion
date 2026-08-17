import React from 'react';
import FaqIcon, { FaqIconName } from './FaqIcon';
import { QUICK_HELP_ITEMS } from './data';

const ITEM_ICONS: Record<string, FaqIconName> = {
  rastrear: 'pin',
  cotizar: 'tag',
  documentos: 'document',
  politicas: 'shield',
  soporte: 'headset',
};

export default function FaqQuickHelp() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';

  const resolveHref = (href: string) => {
    if (href === 'whatsapp:tracking') {
      return `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero consultar el estado de mi envío.')}`;
    }
    if (href === 'whatsapp:quote') {
      return `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, quiero cotizar mi carga.')}`;
    }
    if (href === 'whatsapp:support') {
      return `https://wa.me/${phone}?text=${encodeURIComponent('Hola GreyLion, necesito soporte técnico.')}`;
    }
    return href;
  };

  const isExternal = (href: string) => href.startsWith('whatsapp:');

  return (
    <div className="relative mt-8 rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden p-7">
      {/* Background photo, fused into the card via a dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/do_you_need_help.png"
          alt="Operación portuaria de GreyLion Maritime"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background-dark)_0%,rgba(11,18,32,0.92)_38%,rgba(11,18,32,0.55)_68%,rgba(11,18,32,0.25)_100%)]" />
      </div>

      <div className="relative z-10">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-text-white mb-1">
          ¿Necesitas ayuda con algo específico?
        </h3>
        <p className="text-base text-text-gray mb-6">Accede rápidamente a la información que necesitas</p>

        <div className="grid grid-cols-8 gap-3 max-[700px]:grid-cols-2">
          {QUICK_HELP_ITEMS.map((item) => (
            <a
              key={item.id}
              href={resolveHref(item.href)}
              target={isExternal(item.href) ? '_blank' : undefined}
              rel={isExternal(item.href) ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center text-center gap-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(6,13,26,0.55)] backdrop-blur-sm py-7 px-3 no-underline transition-colors duration-200 ease-[ease] hover:border-primary-hover/60"
            >
              <span className="w-16 h-16 rounded-full bg-primary/20 text-primary-hover flex items-center justify-center">
                <FaqIcon name={ITEM_ICONS[item.id]} className="w-8 h-8" />
              </span>
              <span className="text-sm font-bold text-text-white leading-[1.3]">{item.label}</span>
              <FaqIcon name="arrow-right" className="w-6 h-6 text-primary-hover transition-transform duration-200 ease-[ease] group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
