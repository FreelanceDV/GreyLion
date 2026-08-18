export const controlClasses =
  'cursor-pointer transition-[transform,background-color,border-color] duration-[180ms] ease-[ease] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px] motion-reduce:transition-none';

export const messageBaseClasses = 'max-w-[250px] px-3 py-[10px] border text-[12px] leading-[1.5]';

export const replyBaseClasses = `flex items-center gap-[10px] w-full px-[11px] py-[10px] rounded-[11px] border text-[#e9ebef] text-[12px] font-semibold text-left hover:border-accent hover:bg-[rgba(15,76,129,.25)] ${controlClasses}`;

export const sendBaseClasses = `grid w-10 place-items-center rounded-[11px] border-0 bg-primary text-white text-[18px] no-underline disabled:cursor-not-allowed disabled:bg-[#29323a] disabled:text-accent ${controlClasses}`;
