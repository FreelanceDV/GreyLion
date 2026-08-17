import React from 'react';
import MachineryIcon from './MachineryIcon';
import { CATEGORIES } from './data';

interface MachineryCategoryTabsProps {
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function MachineryCategoryTabs({ activeCategory, onSelect }: MachineryCategoryTabsProps) {
  return (
    <div className="flex gap-2.5 justify-center flex-wrap mb-12">
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2.5 rounded-xl border py-3 px-5 text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-300 ease-[ease] ${
              isActive
                ? 'bg-primary/15 border-primary-hover text-white'
                : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-text-gray hover:border-primary-hover/50'
            }`}
          >
            <span className={`grid w-7 h-7 place-items-center rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-primary/15 text-primary-hover'}`}>
              <MachineryIcon name={cat.icon} className="w-4 h-4" />
            </span>
            {cat.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
