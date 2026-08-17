import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('the footer uses the maritime navy color treatment', async () => {
  const footer = await readFile(new URL('./src/components/Footer.tsx', import.meta.url), 'utf8');

  assert.match(footer, /#031b35/);
  assert.match(footer, /#075ca8/);
});

test('the testimonials section is an automatic carousel with an operations panel', async () => {
  const testimonials = await readFile(new URL('./src/components/Testimonials.tsx', import.meta.url), 'utf8');

  assert.match(testimonials, /^'use client';/);
  assert.match(testimonials, /useEffect/);
  assert.match(testimonials, /setInterval/);
  assert.match(testimonials, /aria-live="polite"/);
  assert.match(testimonials, /Operación en <span[^>]*>movimiento/);
  assert.match(testimonials, /Rutas activas/);
  assert.doesNotMatch(testimonials, /Aliados estratégicos/);
});
