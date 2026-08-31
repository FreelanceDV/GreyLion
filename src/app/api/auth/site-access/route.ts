import { NextRequest, NextResponse } from 'next/server';

function formatDDMMYYYY(date: Date, timeZone?: string): string {
  try {
    const parts = new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: timeZone || 'UTC',
    }).formatToParts(date);

    const day = parts.find((p) => p.type === 'day')?.value || '';
    const month = parts.find((p) => p.type === 'month')?.value || '';
    const year = parts.find((p) => p.type === 'year')?.value || '';

    return `${day}${month}${year}`;
  } catch {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear());
    return `${d}${m}${y}`;
  }
}

function getValidAccessKeys(clientTimezone?: string): string[] {
  const keys = new Set<string>();
  const now = new Date();

  // 1. Hora UTC
  keys.add(formatDDMMYYYY(now, 'UTC'));

  // 2. Hora Colombia / América Latina (America/Bogota, UTC-5)
  keys.add(formatDDMMYYYY(now, 'America/Bogota'));

  // 3. Hora local del servidor
  const localDay = String(now.getDate()).padStart(2, '0');
  const localMonth = String(now.getMonth() + 1).padStart(2, '0');
  const localYear = String(now.getFullYear());
  keys.add(`${localDay}${localMonth}${localYear}`);

  // 4. Zona horaria reportada por el navegador del cliente (si es válida)
  if (clientTimezone && typeof clientTimezone === 'string') {
    try {
      keys.add(formatDDMMYYYY(now, clientTimezone.trim()));
    } catch {
      // Ignorar si la zona horaria no es soportada por Intl
    }
  }

  // 5. Clave de respaldo configurada opcionalmente en variables de entorno
  if (process.env.SITE_ACCESS_PASSWORD) {
    keys.add(process.env.SITE_ACCESS_PASSWORD.trim());
  }

  return Array.from(keys);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawPassword = body?.password;
    const clientTimezone = body?.clientTimezone;

    if (!rawPassword || typeof rawPassword !== 'string') {
      return NextResponse.json(
        { error: 'Por favor ingresa la clave de acceso.', authenticated: false },
        { status: 400 }
      );
    }

    // Limpiar espacios, barras o guiones (ej. '31/08/2026' -> '31082026')
    const cleanedPassword = rawPassword.trim().replace(/[\s\/-]/g, '');

    const validKeys = getValidAccessKeys(clientTimezone);
    const isValid = validKeys.includes(cleanedPassword);

    if (!isValid) {
      return NextResponse.json(
        {
          authenticated: false,
          error: 'Clave incorrecta. Recuerda que la clave es día/mes/año (ej. 31082026).',
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      authenticated: true,
      message: 'Acceso autorizado correctamente.',
    });

    // Guardar cookie de sesión por 24 horas
    response.cookies.set({
      name: 'greylion_site_access',
      value: 'authenticated',
      httpOnly: false, // Accesible por el cliente para evitar parpadeos al cargar
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return response;
  } catch (error) {
    console.error('Error en serverless site-access:', error);
    return NextResponse.json(
      { error: 'Error interno al validar la clave.', authenticated: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('greylion_site_access');
  const isAuthenticated = cookie?.value === 'authenticated';

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}

export async function DELETE() {
  const response = NextResponse.json({
    authenticated: false,
    message: 'Sesión finalizada con éxito.',
  });

  response.cookies.set({
    name: 'greylion_site_access',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return response;
}
