import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('the hero uses the Oceanis PNG with accessible ship motion', async () => {
  const hero = await readFile(new URL('./src/components/Hero.tsx', import.meta.url), 'utf8');

  assert.match(hero, /src="\/hero_ship_oceanis\.png"/);
  assert.match(hero, /animate-\[var\(--animate-ship-arrival\),var\(--animate-ship-drift\)\]/);
  assert.match(hero, /motion-reduce:/);
});
