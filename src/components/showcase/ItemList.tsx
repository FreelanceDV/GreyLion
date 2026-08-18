import React from 'react';
import ShowcaseIcon from './ShowcaseIcon';
import { ListItem } from './data';

interface ItemListProps {
  items: ListItem[];
}

export default function ItemList({ items }: ItemListProps) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-3.5">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2.5">
          <span className="shrink-0 grid place-items-center w-7 h-7 rounded-md bg-[rgba(15,76,129,0.18)] text-primary-hover">
            <ShowcaseIcon name="check" className="w-[13px] h-[13px]" />
          </span>
          <div>
            <h5 className="text-[12.5px] font-bold text-white leading-[1.2]">{item.name}</h5>
            <p className="text-[10.5px] text-text-gray leading-[1.3]">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
