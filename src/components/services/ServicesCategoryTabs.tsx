import React from 'react';
import ServicesIcon from './ServicesIcon';
import { SERVICES_CATEGORIES } from './data';

interface ServicesCategoryTabsProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function ServicesCategoryTabs({ activeCategory, onSelect }: ServicesCategoryTabsProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {SERVICES_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold cursor-pointer transition-all duration-300 ease-[ease] border whitespace-nowrap ${
              isActive
                ? 'bg-primary border-primary text-white'
                : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-text-gray hover:border-primary-hover/40'
            }`}
          >
            <ServicesIcon name={cat.icon} className="w-4 h-4 shrink-0" />
            {cat.tabLabel}
          </button>
        );
      })}
    </div>
  );
}
