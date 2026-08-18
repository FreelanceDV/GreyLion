import React from 'react';
import PromoPanel from './PromoPanel';
import ItemList from './ItemList';
import { PROMO_PANELS, CARGO_LIST_ITEMS, EQUIPMENT_LIST_ITEMS } from './data';

export default function ValueCardsRow() {
  return (
    <div className="grid grid-cols-5 gap-4 max-[991px]:grid-cols-2 max-[560px]:grid-cols-1">
      <PromoPanel panel={PROMO_PANELS[0]} />
      <ItemList items={CARGO_LIST_ITEMS} />
      <PromoPanel panel={PROMO_PANELS[1]} />
      <ItemList items={EQUIPMENT_LIST_ITEMS} />
      <PromoPanel panel={PROMO_PANELS[2]} />
    </div>
  );
}
