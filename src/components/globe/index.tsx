'use client';

import React, { useState } from 'react';
import StylizedMap from './StylizedMap';
import LiveTrackingMap from './LiveTrackingMap';
import MapModeToggle, { GlobeMapMode } from './MapModeToggle';
import DynamicMedia from '../DynamicMedia';

export default function Globe() {
  const [mapMode, setMapMode] = useState<GlobeMapMode>('stylized');
  const [portsCount, setPortsCount] = useState(6);

  return (
    <div className="w-full overflow-hidden bg-background-black text-text-white pt-[100px] border-t border-white/5">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-2 gap-12 items-start max-[991px]:grid-cols-1">
          {/* Left column: heading, copy, interactive badge, stats */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-extrabold text-primary-hover uppercase tracking-[0.14em]">Red Global</span>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.15]">
                <span className="text-primary-hover">Conexiones Marítimas</span><br />
                y Puertos Mundiales
              </h2>
              <p className="text-[15px] text-text-gray leading-[1.6]">
                Sincronizamos rutas intercontinentales seguras y eficientes. Monitoreo constante de tránsitos marítimos comerciales para conectar su negocio con los mercados líderes.
              </p>
            </div>

            {/* Map mode toggle */}
            <MapModeToggle mode={mapMode} onChange={setMapMode} />

            {/* Click instructions badge */}
            <div className="flex items-start gap-2 rounded-xl border border-[rgba(0,163,255,0.25)] bg-[rgba(0,163,255,0.06)] p-4">
              <span className="shrink-0 mt-0.5 text-[#00a3ff] animate-float">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p className="text-[13px] leading-[1.5] ">
                <strong className="font-extrabold uppercase tracking-[0.04em]">Interactivo</strong>{' '}
                {mapMode === 'stylized'
                  ? '· Haz clic en cualquier parte del océano para trazar una nueva ruta y añadir tu puerto.'
                  : '· Arrastra el mapa AIS en vivo para navegar, o activa "Trazar Puertos" para añadir el tuyo.'}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-4 max-[560px]:grid-cols-2">
              {[
                {
                  value: `${portsCount}`,
                  label: 'Puertos Activos',
                  desc: 'Operación y presencia aduanera activa ampliable en tiempo real.',
                },
                {
                  value: '50+',
                  label: 'Navieras',
                  desc: 'Acuerdos comerciales directos con los operadores líderes del comercio internacional.',
                },
                {
                  value: '24/7',
                  label: 'Operación',
                  desc: 'Acompañamiento permanente de principio a fin, liberándolo de complejidades.',
                },
                {
                  value: '100%',
                  label: 'Trazabilidad',
                  desc: 'Tecnología integrada para el seguimiento y verificación en tiempo real de su carga.',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.01)] p-5 transition-colors duration-300 hover:border-primary-hover/40"
                >
                  <div className="text-[30px] font-extrabold text-primary-hover font-[family-name:var(--font-space-grotesk)] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-text-white uppercase tracking-[0.05em] mt-2.5">
                    {stat.label}
                  </div>
                  <p className="text-xs leading-[1.5] text-text-gray mt-1.5">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: interactive world map */}
          <div>
            {mapMode === 'stylized' ? (
              <StylizedMap onPortsCountChange={setPortsCount} />
            ) : (
              <LiveTrackingMap onPortsCountChange={setPortsCount} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom banner photo: full-bleed, spans the entire viewport width */}
      <div className="relative w-full min-h-[300px] -mt-36">
        <DynamicMedia
          src="/red_global.png"
          alt="Operación portuaria global de GreyLion Maritime"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-background-black)_0%,transparent_35%)]" />
      </div>
    </div>
  );
}
