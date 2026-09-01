'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Logo from '@/components/Logo';

interface SiteAccessGateProps {
  children: React.ReactNode;
}

export default function SiteAccessGate({ children }: SiteAccessGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  // Comprobar estado de autenticación al montar
  useEffect(() => {
    // 1. Verificación rápida local para experiencia instantánea
    if (typeof window !== 'undefined') {
      const localAuth = sessionStorage.getItem('greylion_site_access');
      const hasCookie = document.cookie.includes('greylion_site_access=authenticated');

      if (localAuth === 'true' || hasCookie) {
        setIsAuthenticated(true);
        return;
      }
    }

    // 2. Verificación contra la API serverless
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/site-access', { cache: 'no-store' });
        const data = await res.json();
        if (data.authenticated) {
          sessionStorage.setItem('greylion_site_access', 'true');
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    verifySession();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Por favor ingresa la clave.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Obtener la zona horaria del navegador
      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await fetch('/api/auth/site-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password.trim(),
          clientTimezone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.authenticated) {
        sessionStorage.setItem('greylion_site_access', 'true');
        setIsAuthenticated(true);
      } else {
        setErrorMessage(data.error || 'Clave incorrecta. Verifica e intenta de nuevo.');
        triggerShake();
      }
    } catch {
      setErrorMessage('Ocurrió un error al validar la clave. Intenta de nuevo.');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // Mientras verifica sesión inicial, mostrar fondo neutro oscuro sin parpadeo
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#02152a]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Si está autenticado, renderizar el contenido normalmente
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Pantalla de bloqueo / Gate de seguridad
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#02152a] px-4 overflow-y-auto">
      {/* Luces y degradados de fondo */}
      <div className="fixed top-[-15%] left-[20%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(15,76,129,0.3)_0%,transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(90,110,216,0.18)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Tarjeta de Acceso */}
      <div
        className={`relative z-10 w-full max-w-[440px] bg-[rgba(6,13,26,0.85)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[24px] rounded-[24px] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
          shake ? 'animate-pulse-error translate-x-[-4px]' : ''
        }`}
      >
        {/* Encabezado con Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex justify-center">
            <Logo size={46} textSize="22px" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(15,76,129,0.25)] border border-[rgba(15,76,129,0.5)] text-primary-hover text-[12px] font-semibold tracking-wider uppercase mb-3">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Acceso Restringido
          </div>

          <h1 className="font-space-grotesk text-2xl font-bold text-text-white tracking-tight">
            Ingreso Seguro
          </h1>
          <p className="text-[14px] text-text-muted mt-2 leading-relaxed">
            Ingresa la clave de acceso para continuar.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          <div className="relative">
            <label
              htmlFor="access-key"
              className="block text-[12px] font-medium text-text-gray mb-1.5"
            >
              Clave de Acceso
            </label>
            <div className="relative">
              <input
                id="access-key"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                disabled={isLoading}
                maxLength={20}
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none rounded-xl px-4 py-3 text-text-white text-[16px] tracking-wider placeholder:text-text-muted/50 placeholder:tracking-normal transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-white p-1 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] leading-snug">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-text-white font-semibold text-[15px] shadow-[0_4px_16px_rgba(15,76,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Validando...</span>
              </>
            ) : (
              <>
                <span>Entrar al Sitio</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center">
          <p className="text-[12px] text-text-muted">
            GreyLion Maritime Logistics &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
