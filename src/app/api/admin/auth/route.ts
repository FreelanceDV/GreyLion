import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'greylion2026';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'La contraseña es requerida' }, { status: 400 });
    }

    if (password === DEFAULT_PASSWORD) {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json({ error: 'Contraseña incorrecta', authenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
