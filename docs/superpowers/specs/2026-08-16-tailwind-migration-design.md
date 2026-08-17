# Migración de CSS puro a Tailwind CSS

## Contexto

La app (Next.js 16.2.12 App Router, React 19.2.4) usa hoy `styled-jsx`
(`<style jsx>{...}`) en cada componente para su CSS, más `src/app/globals.css`
(tokens globales vía variables CSS, animaciones `@keyframes`, utilidades como
`.container`, `.glass`, `.glow-card`) y `src/app/page.module.css` (boilerplate
de `create-next-app`, no importado en ningún lado).

Este repo corre Next.js 16, una versión con cambios de breaking respecto a lo
que un LLM asume por defecto (ver `AGENTS.md`). La guía oficial para CSS en
`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` confirma que
el setup recomendado es **Tailwind CSS v4, CSS-first**: sin
`tailwind.config.js`, con `@import 'tailwindcss';` en el CSS global y el
plugin `@tailwindcss/postcss` en PostCSS.

Alcance: 19 componentes en `src/components/`, `src/app/layout.tsx`,
`src/app/page.tsx`, `src/app/admin/page.tsx`,
`src/app/trabaja-con-nosotros/page.tsx`, `src/app/globals.css`, y borrar
`src/app/page.module.css`. ~6500 líneas de CSS/JSX en total.

Nota: `Footer.tsx`, `Hero.tsx` y `Testimonials.tsx` tienen cambios sin
commitear al iniciar este trabajo (WIP previo); la migración parte del estado
actual de esos archivos en el working tree, no de la última versión
commiteada.

Fuera de alcance: lógica de componentes (estado, efectos, fetch), archivos
binarios en `public/`, el `.exe` suelto en la raíz.

## Approaches considerados

1. **Tailwind v4 CSS-first con `@theme` (elegido).** Tokens actuales
   (colores, fuentes, animaciones) se declaran en `@theme` dentro de
   `globals.css`, generando utilidades nativas (`bg-primary`,
   `font-inter`, `animate-marquee`, etc.). Utilidades repetidas
   (`.glass`, `.glow-card`) se migran con `@utility`. Es el enfoque
   documentado para esta versión de Next y deja el resultado más
   idiomático y mantenible a futuro.
2. **Tailwind con variables CSS como arbitrary values** (`bg-[var(--primary)]`)
   sin tocar `@theme`. Menos refactor, pero pierde autocompletado/consistencia
   de Tailwind y no aprovecha la migración para limpiar tokens.
3. **Migración parcial / mantener styled-jsx en componentes muy complejos**
   (p.ej. `Globe.tsx`, 791 líneas). Se descartó: el usuario pidió migrar
   "cada parte", y dejar CSS-in-JS mezclado con Tailwind es inconsistente
   y más difícil de mantener a largo plazo.

Se eligió la opción 1, alcance completo, en una sola pasada por fases.

## Diseño

### 1. Instalación y configuración base

- `npm install -D tailwindcss @tailwindcss/postcss`.
- Crear `postcss.config.mjs`:
  ```js
  export default { plugins: { '@tailwindcss/postcss': {} } };
  ```
- `globals.css` pasa a:
  - `@import 'tailwindcss';` primero.
  - Bloque `@theme` mapeando las variables actuales (`--background-dark`,
    `--background-black`, `--primary`, `--primary-hover`, `--primary-active`,
    `--primary-dark`, `--accent`, `--text-white`, `--text-gray-light`,
    `--text-gray`, `--text-muted`, `--border-light`, `--border-glow`,
    `--font-inter`, `--font-space-grotesk`) a tokens Tailwind
    (`--color-*`, `--font-*`).
  - Todos los `@keyframes` existentes (`gradientFlow`, `marquee`,
    `marquee-reverse`, `ripple`, `float`, `pulseGlow`, `borderFlow`, y
    `shipDrift` que vive hoy en `Hero.tsx`) se centralizan aquí y se
    registran como `--animate-*` para usarse como utilidades
    (`animate-marquee`, etc.).
  - `.glass` y `.glow-card` se reescriben con `@utility` (sintaxis Tailwind
    v4) preservando el efecto visual (incluyendo el truco de
    `mask-composite` del borde animado de `.glow-card`).
  - Reglas de scrollbar, `html`/`body` base, y `body.overlay-open` se
    mantienen como CSS plano (no tienen equivalente de utilidad razonable).
- Borrar `src/app/page.module.css` (confirmado sin imports).

### 2. Migración componente por componente

Para cada archivo con `<style jsx>`:
- Se elimina el bloque `<style jsx>` y su CSS se traduce a clases de
  Tailwind aplicadas directamente en el JSX.
- Breakpoints: el proyecto usa quiebres pixel-específicos por componente
  (900px, 600px, 560px, etc.) que no calzan con la escala default de
  Tailwind. Se preservan exactos usando variantes arbitrarias
  (`max-[900px]:`, `min-[561px]:`, etc.) en vez de forzar el diseño a
  `sm/md/lg/xl`.
- Pseudo-elementos y efectos sin utilidad directa (glow borders, gradientes
  de texto animados, blur beams) se resuelven con variantes `before:`/
  `after:` y valores arbitrarios (`bg-[radial-gradient(...)]`), o quedan
  como utilidad compartida vía `@utility` si se repiten en 2+ componentes.
- Componentes afectados: `AboutCompany, CTA, CargoTypes, Comparison,
  DynamicMedia, FAQ, Globe, Logo, MachineryCatalog, Navbar, Process,
  SectionIndicator, Showcase, WhatsAppButton, WorkWithUs, Hero, Footer,
  Testimonials`, más `layout.tsx`, `page.tsx` (incluye convertir el
  `style={{...}}` inline de `<main>`), `admin/page.tsx`,
  `trabaja-con-nosotros/page.tsx`.

### 3. Tests existentes

`hero.test.mjs` y `sections.test.mjs` (sin commitear) hacen aserciones por
regex sobre el código fuente crudo, incluyendo nombres de clases CSS y
`@keyframes` que desaparecerán del TSX tras la migración. Se actualizan para
verificar comportamiento/contenido real en vez de artefactos de
implementación CSS:
- `hero.test.mjs`: seguir verificando el uso de la imagen
  `hero_ship_oceanis.png` y que exista soporte de `prefers-reduced-motion`
  (ahora verificable vía la utilidad `motion-reduce:` de Tailwind o el CSS
  plano que la implemente), sin depender del nombre literal `shipDrift` ni
  de que el keyframe esté inline en el componente.
- `sections.test.mjs`: seguir verificando los colores de marca del footer y
  el comportamiento del carrusel de testimonios (`useEffect`, `setInterval`,
  contenido visible), sin depender de nombres de clase como
  `testimonial-carousel`.

### 4. Verificación

- `next build` sin errores tras cada tanda de componentes migrados.
- Tests actualizados (`node --test hero.test.mjs sections.test.mjs`) en
  verde.
- Revisión visual en navegador (dev server) del home completo y de las dos
  páginas sueltas (`/admin`, `/trabaja-con-nosotros`) en al menos 3 anchos
  (~375px, ~800px, ~1440px) antes de dar la tarea por completada, según
  las instrucciones del proyecto para cambios de UI.

## Testing

Cubierto en la sección de Verificación arriba: build, tests unitarios
actualizados, y revisión visual manual multi-breakpoint. No se introduce
tooling nuevo de testing (sin visual regression automatizado) — está fuera
de alcance para esta migración.
