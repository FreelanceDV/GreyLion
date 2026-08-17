import React from 'react';
import FaqIcon, { FaqIconName } from './FaqIcon';
import { FAQ_CATEGORIES } from './data';

const CATEGORY_ICONS: Record<string, FaqIconName> = {
  todas: 'grid',
  servicios: 'ship',
  transporte: 'container',
  documentacion: 'document',
  tarifas: 'tag',
};

interface FaqCategoryTabsProps {
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function FaqCategoryTabs({ activeCategory, onSelect }: FaqCategoryTabsProps) {
  return (
    <div>
      <p className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.14em] mb-3">Categorías</p>
      <div className="flex gap-2.5 flex-wrap mb-8">
        {FAQ_CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`inline-flex items-center gap-2 rounded-lg border py-2.5 px-4 text-[15px] font-semibold transition-all duration-200 ease-[ease] cursor-pointer ${
                isActive
                  ? 'bg-primary border-primary text-white'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-text-gray hover:border-primary-hover/50'
              }`}
            >
              <FaqIcon name={CATEGORY_ICONS[category.id]} className="w-5 h-5" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
