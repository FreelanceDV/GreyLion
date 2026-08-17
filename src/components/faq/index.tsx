'use client';

import React, { useMemo, useState } from 'react';
import FaqHeader from './FaqHeader';
import FaqSearch from './FaqSearch';
import FaqCategoryTabs from './FaqCategoryTabs';
import FaqAccordionList from './FaqAccordionList';
import FaqSidebar from './FaqSidebar';
import FaqQuickHelp from './FaqQuickHelp';
import { FAQ_ITEMS } from './data';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'todas' || item.categoryId === activeCategory;
      const matchesQuery = query === '' || item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="preguntas-frecuentes" className="bg-background-dark py-[100px]">
      <div className="w-full max-w-[1280px] mx-auto px-5">
        <FaqHeader />
        <FaqSearch value={searchQuery} onChange={setSearchQuery} />

        <div className="grid grid-cols-[1.99fr_1fr] gap-10 items-start max-[850px]:grid-cols-1">
          <div>
            <FaqCategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
            <FaqAccordionList items={filteredItems} />
          </div>

          <FaqSidebar />
        </div>

        <div id="documentacion">
          <FaqQuickHelp />
        </div>
      </div>
    </section>
  );
}
