#!/usr/bin/env node
// Genera las imágenes para compartir (Open Graph, 1200 × 630) y el logo cuadrado de los datos
// estructurados, a partir de las plantillas de plantillas/pages/[pieza].astro.
//
//   npm run og
//
// Salida:
//   public/og/<slug>.png   una por página de src/lib/paginas.ts (inicio, productos, aderezos…)
//   public/logo-dpi.png    600 × 600, el logo para Google
//
// Los textos salen de src/lib/paginas.ts y de src/data/: si cambia un dato (por ejemplo, el horario
// o quién atiende), volvé a correr `npm run og` y commiteá los PNG nuevos.

import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import sharp from 'sharp';
import { abrirPlantilla, conPlantillas, raiz } from './plantillas.mjs';

const dirOG = join(raiz, 'public/og');
mkdirSync(dirOG, { recursive: true });

/** PNG con paleta (colores planos: pesa poco y no pierde nitidez). */
const optimizar = (png) => sharp(png).png({ palette: true, colors: 256, quality: 100, effort: 10, compressionLevel: 9 }).toBuffer();

await conPlantillas(async ({ navegador, origen, piezas }) => {
  const elegidas = piezas.filter((p) => p.startsWith('og-') || p === 'logo');
  if (!elegidas.length) throw new Error('No se compilaron plantillas: revisá plantillas/pages/[pieza].astro');

  const contexto = await navegador.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, locale: 'es-AR' });
  for (const pieza of elegidas) {
    const pagina = await abrirPlantilla(contexto, origen, pieza);
    const lienzo = pagina.locator('[data-lienzo]');
    const png = await lienzo.screenshot({ type: 'png', animations: 'disabled' });
    const destino = pieza === 'logo' ? join(raiz, 'public/logo-dpi.png') : join(dirOG, `${pieza.replace(/^og-/, '')}.png`);
    writeFileSync(destino, await optimizar(png));
    const { width, height } = await sharp(destino).metadata();
    console.log(`✓ ${relative(raiz, destino)}  ${width}×${height}  ${Math.round(statSync(destino).size / 1024)} KB`);
    await pagina.close();
  }
  await contexto.close();
});
