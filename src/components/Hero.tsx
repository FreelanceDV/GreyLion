'use client';

const statItemClasses = 'flex items-center gap-4';
const statIconClasses = 'flex items-center text-[#00a3ff]';
const statTextClasses = 'flex flex-col';
const statNumberClasses = 'font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold leading-none text-white';
const statLabelClasses = 'text-[11px] text-[rgba(255,255,255,0.5)] uppercase tracking-[0.05em] mt-0.5';
const statDividerClasses = 'w-px h-9 bg-[rgba(255,255,255,0.1)] max-[991px]:hidden';

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '573000000000';
  const whatsappUrl = `https://wa.me/${phone}?text=Hola%20GreyLion,%20quiero%20cotizar%20el%20envio%20de%20`;

  return (
    <div
      id="inicio"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#060d1c] before:absolute before:inset-0 before:z-0 before:content-[''] before:pointer-events-none before:bg-[radial-gradient(ellipse_48%_38%_at_62%_54%,rgba(255,181,99,.2),transparent_68%),linear-gradient(90deg,rgba(1,7,16,.52),transparent_72%)]"
    >
      <div
        aria-hidden="true"
        className="absolute z-[1] top-[-9%] right-[17%] w-[min(54vw,780px)] aspect-square opacity-[0.32] pointer-events-none bg-[radial-gradient(circle,rgba(99,186,255,.65)_1px,transparent_1.4px)] bg-[length:15px_15px] [mask-image:radial-gradient(circle,#000_0_39%,transparent_72%)] [-webkit-mask-image:radial-gradient(circle,#000_0_39%,transparent_72%)] rotate-[-8deg] animate-route-pulse max-[768px]:top-[13%] max-[768px]:right-[-27%] max-[768px]:w-[93vw] motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="absolute z-[2] inset-x-0 bottom-[31%] h-[2px] pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(99,185,248,.08)_30%,rgba(255,211,151,.86)_62%,rgba(53,165,255,.1)_80%,transparent)] shadow-[0_0_29px_rgba(106,191,255,.45)] animate-horizon-glow max-[768px]:bottom-[33%] motion-reduce:animate-none"
      />

      {/* Background Image Container */}
      <div className="absolute right-0 top-0 bottom-0 w-full z-0 opacity-95 overflow-hidden animate-visual-reveal max-[768px]:opacity-[0.54] motion-reduce:animate-none">
        <img
          className="w-full h-full block object-cover object-center [filter:saturate(1.08)_contrast(1.04)_drop-shadow(-24px_35px_36px_rgba(0,0,0,.57))] origin-[72%_75%] animate-[var(--animate-ship-arrival),var(--animate-ship-drift)] motion-reduce:animate-none"
          src="/hero_ship_oceanis.png"
          alt=""
          aria-hidden="true"
        />
        {/* Soft Radial and Linear Gradients to blend image to background */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#060d1c_0%,rgba(6,13,28,0.8)_25%,rgba(6,13,28,0.2)_70%,transparent_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_top,#060d1c_0%,transparent_20%,transparent_80%,rgba(6,13,28,0.4)_100%)]" />
      </div>

      {/* Decorative Radial Glows */}
      <div className="absolute top-[10%] left-[5%] w-1/2 h-3/5 rounded-full bg-[radial-gradient(circle,rgba(27,108,168,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-[1]" />

      {/* Hero Main Content */}
      <div className="w-full max-w-[1280px] mx-auto px-5 relative z-10 grow flex items-center pt-[120px] pb-10 max-[768px]:px-6!">
        <div className="max-w-[650px] flex flex-col gap-6 items-start text-left animate-copy-enter max-[768px]:max-w-[86%] motion-reduce:animate-none">
          {/* Badge / Kicker with thin horizontal line */}
          <div className="flex items-center gap-4 w-full">
            <span className="text-[13px] font-semibold text-text-muted tracking-[0.15em] uppercase">
              Conectamos el mundo
            </span>
            <div className="h-px grow max-w-[120px] bg-[rgba(255,255,255,0.2)]" />
          </div>

          {/* Large Stacked Title */}
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(44px,6.5vw,84px)] font-extrabold leading-[0.95] tracking-[-0.02em] text-white flex flex-col gap-1 [text-shadow:0_10px_34px_rgba(0,0,0,.24)] max-[768px]:text-[clamp(43px,13vw,68px)]">
            <span>NAVEGAMOS</span>
            <span className="text-[#00a3ff]">CARGAMOS</span>
            <span>ENTREGAMOS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[clamp(15px,1.8vw,18px)] text-text-gray max-w-[520px] leading-[1.6] [text-shadow:0_2px_18px_rgba(0,0,0,.52)]">
            Soluciones logísticas marítimas confiables, eficientes y sostenibles para un mundo en movimiento.
          </p>

          {/* Action Button */}
          <div className="mt-3 animate-[copyEnter_.85s_cubic-bezier(.2,.75,.2,1)_.42s_both] motion-reduce:animate-none">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
              <button className="bg-[#0070f3] text-white border-0 rounded-md px-8 py-4 text-[15px] font-bold cursor-pointer flex items-center gap-3 transition-all duration-300 ease-[ease] shadow-[0_8px_24px_rgba(0,112,243,0.35)] hover:bg-[#005ccb] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#9ad6ff] focus-visible:outline-offset-4 motion-reduce:transition-none">
                <span>→</span>
                <span>DESCUBRIR MÁS</span>
              </button>
            </a>
          </div>
        </div>

        {/* Section indicator "01" on the right side */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-[rgba(255,255,255,0.4)] text-sm font-bold pointer-events-none animate-indicator-in max-[991px]:hidden motion-reduce:animate-none">
          <span className="text-[#00a3ff]">01</span>
          <div className="relative w-px h-[60px] bg-[rgba(255,255,255,0.15)]">
            <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] rounded-full bg-[#00a3ff]" />
            <div className="absolute top-5 left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
            <div className="absolute top-10 left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
            <div className="absolute top-[60px] left-[-2px] w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.3)]" />
          </div>
        </div>
      </div>

      {/* Stats Bar Container (Glassmorphism) & Divider */}
      <div className="relative w-full z-10 animate-stats-rise motion-reduce:animate-none">
        {/* Stats Glass Bar */}
        <div className="w-full border-t border-b border-[rgba(255,255,255,0.08)] bg-[rgba(6,13,28,0.65)] backdrop-blur-[20px] pt-6 pb-[54px]">
          <div className="w-full max-w-[1280px] mx-auto px-5 flex justify-between items-center flex-wrap gap-6 max-[991px]:justify-center max-[991px]:gap-8 max-[768px]:px-6!">
            {/* Stat 1 */}
            <div className={statItemClasses}>
              <span className={statIconClasses}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <div className={statTextClasses}>
                <span className={statNumberClasses}>120+</span>
                <span className={statLabelClasses}>Rutas Globales</span>
              </div>
            </div>

            <div className={statDividerClasses} />

            {/* Stat 2 */}
            <div className={statItemClasses}>
              <span className={statIconClasses}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 9.5c0-3.3-2.7-6-6-6-2.1 0-3.9 1.1-5 2.8C9.9 4.6 8.1 3.5 6 3.5c-3.3 0-6 2.7-6 6 0 2.2.9 4 2.7 5.3" />
                  <path d="M4.5 10.5h15M6 10.5v6.5M18 10.5v6.5M12 10.5v10.5" />
                </svg>
              </span>
              <div className={statTextClasses}>
                <span className={statNumberClasses}>80+</span>
                <span className={statLabelClasses}>Buques en Flota</span>
              </div>
            </div>

            <div className={statDividerClasses} />

            {/* Stat 3 */}
            <div className={statItemClasses}>
              <span className={statIconClasses}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="12" y1="3" x2="12" y2="17" />
                </svg>
              </span>
              <div className={statTextClasses}>
                <span className={statNumberClasses}>2M+</span>
                <span className={statLabelClasses}>TEUs Transportados</span>
              </div>
            </div>

            <div className={statDividerClasses} />

            {/* Stat 4 */}
            <div className={statItemClasses}>
              <span className={statIconClasses}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <div className={statTextClasses}>
                <span className={statNumberClasses}>500+</span>
                <span className={statLabelClasses}>Clientes Satisfechos</span>
              </div>
            </div>

            <div className={statDividerClasses} />

            {/* Stat 5 */}
            <div className={statItemClasses}>
              <span className={statIconClasses}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 2 8a9 9 0 0 1-10 10z" />
                  <path d="M9.8 6.1C9 8 9.5 12 11 13" />
                </svg>
              </span>
              <div className={statTextClasses}>
                <span className="text-[10px] text-[rgba(255,255,255,0.4)] font-extrabold uppercase tracking-[0.05em]">Comprometidos</span>
                <span className="text-[12px] text-[#00a3ff] font-bold uppercase tracking-[0.05em] mt-0.5">Con el Planeta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wavy bottom divider using inline SVG */}
        <div className="absolute bottom-[-4px] left-0 w-full overflow-hidden leading-none z-[12]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-10">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#060b16"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
