'use client';

import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'mision-vision', label: 'Misión & Visión' },
  { id: 'objetivos', label: 'Objetivos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'maquinaria', label: 'Maquinaria' },
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'inicio';
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = section.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section-indicator-container">
      <div className="indicator-line" />
      <div className="dots-list">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`dot-button ${isActive ? 'active' : ''}`}
              aria-label={`Ir a sección ${sec.label}`}
            >
              <span className="dot-circle" />
              <span className="dot-label-tooltip">{sec.label}</span>
              <span className="dot-number-badge">{String(idx + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .section-indicator-container {
          position: fixed;
          right: 32px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 99;
          pointer-events: none;
        }
        .indicator-line {
          position: absolute;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }
        .dots-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 28px;
          z-index: 2;
        }
        .dot-button {
          position: relative;
          width: 12px;
          height: 12px;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justifyContent: center;
          outline: none;
        }
        .dot-circle {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dot-button:hover .dot-circle,
        .dot-button.active .dot-circle {
          background: #00a3ff;
          transform: scale(1.6);
          box-shadow: 0 0 10px rgba(0, 163, 255, 0.6);
        }
        .dot-label-tooltip {
          position: absolute;
          right: 28px;
          background: rgba(10, 11, 19, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .dot-button:hover .dot-label-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        .dot-number-badge {
          position: absolute;
          left: 24px;
          font-size: 10px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.15);
          font-family: var(--font-space-grotesk);
          transition: color 0.3s ease;
        }
        .dot-button.active .dot-number-badge {
          color: #00a3ff;
        }
        @media (max-width: 991px) {
          .section-indicator-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
