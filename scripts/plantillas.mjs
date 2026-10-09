// Ayuda compartida por scripts/og.mjs y scripts/qr.mjs: compila las plantillas de plantillas/pages/
// (un "sitio" aparte, con srcDir = plantillas/, que usa los componentes y datos de src/) en
// tmp/plantillas/, lo sirve en un puerto local y abre Chromium.
//
//   import { conPlantillas } from './plantillas.mjs';
//   await conPlantillas(async ({ navegador, origen, piezas }) => { … });
//
// `piezas` es la lista de plantillas compiladas ('og-inicio', 'logo', 'qr-lista'…).

import { createServer } from 'node:http';
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const raiz = resolve(fileURLToPath(import.meta.url), '../..');

const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

export async function conPlantillas(tarea) {
  const salida = join(raiz, 'tmp/plantillas');
  rmSync(salida, { recursive: true, force: true });

  // 1. Compilar las plantillas (en la raíz, sin el base de una vista previa).
  const { build } = await import('astro');
  console.log('Compilando las plantillas…');
  // publicDir apunta a una carpeta que no existe: las plantillas no necesitan public/.
  await build({ root: raiz, srcDir: join(raiz, 'plantillas'), publicDir: join(raiz, 'plantillas/public'), outDir: salida, base: '/', logLevel: 'warn' });

  const piezas = readdirSync(salida).filter((n) => existsSync(join(salida, n, 'index.html')));

  // 2. Servidor estático mínimo.
  const servidor = createServer((req, res) => {
    let archivo = join(salida, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (existsSync(archivo) && statSync(archivo).isDirectory()) archivo = join(archivo, 'index.html');
    if (!archivo.startsWith(salida) || !existsSync(archivo)) return res.writeHead(404).end('404');
    res.writeHead(200, { 'content-type': tipos[extname(archivo)] ?? 'application/octet-stream' });
    res.end(readFileSync(archivo));
  });
  await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
  const origen = `http://127.0.0.1:${servidor.address().port}`;

  // 3. Chromium (el de Playwright).
  const { chromium } = await import('playwright');
  const navegador = await chromium.launch();
  try {
    await tarea({ navegador, origen, piezas });
  } finally {
    await navegador.close();
    servidor.close();
    rmSync(salida, { recursive: true, force: true });
  }
}

/** Abre una plantilla y espera a que cargue la fuente. */
export async function abrirPlantilla(contexto, origen, pieza) {
  const pagina = await contexto.newPage();
  await pagina.goto(`${origen}/${pieza}/`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  return pagina;
}
