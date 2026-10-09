#!/usr/bin/env node
// Captura cada página del sitio a 390×844 (celular) y 1440×900 (escritorio), página completa.
//
// Uso:
//   npm run capturas -- <carpeta> [opciones]
//
//   <carpeta>          subcarpeta de docs/capturas/ (por ejemplo: fase-1). Por defecto: "borrador".
//   --solo <prefijo>   solo las rutas que empiezan con ese prefijo (ej.: --solo /direcciones/a/).
//   --cerrado          simula un horario fuera de atención (martes 18:00 en Buenos Aires).
//                      Por defecto se simula martes 9:30, en horario de atención.
//   --sin-build        no compila; usa el dist/ existente.
//   --salida <dir>     carpeta de salida alternativa (en lugar de docs/capturas/<carpeta>).
//
// Las capturas se guardan en JPG para no inflar el repositorio.

import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const raiz = resolve(fileURLToPath(import.meta.url), '../..');
const args = process.argv.slice(2);
const opcion = (nombre) => {
  const i = args.indexOf(nombre);
  return i === -1 ? undefined : args[i + 1];
};
const bandera = (nombre) => args.includes(nombre);
const carpeta = args.find((a, i) => !a.startsWith('--') && !['--solo', '--salida'].includes(args[i - 1])) ?? 'borrador';
const solo = opcion('--solo');
const salida = resolve(raiz, opcion('--salida') ?? join('docs/capturas', carpeta));

// Martes 6 de octubre de 2026. 12:30 UTC = 9:30 en Buenos Aires; 21:00 UTC = 18:00.
const hora = bandera('--cerrado') ? '2026-10-06T21:00:00Z' : '2026-10-06T12:30:00Z';

const vistas = [
  { nombre: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { nombre: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

// 1. Compilar
const base = process.env.BASE_PATH ?? '/';
if (!bandera('--sin-build')) {
  console.log('Compilando el sitio…');
  const r = spawnSync('npx', ['astro', 'build'], { cwd: raiz, stdio: 'inherit', env: process.env });
  if (r.status !== 0) {
    console.error('La compilación falló.');
    process.exit(1);
  }
}
const dist = join(raiz, 'dist');
if (!existsSync(dist)) {
  console.error('No existe dist/. Corré sin --sin-build.');
  process.exit(1);
}

// 2. Encontrar las páginas (cada index.html de dist/ es una ruta)
const rutas = [];
const recorrer = (dir) => {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) recorrer(ruta);
    else if (nombre === 'index.html') {
      const rel = relative(dist, dir).split('\\').join('/');
      rutas.push(rel ? `/${rel}/` : '/');
    }
  }
};
recorrer(dist);
rutas.sort();
const elegidas = solo ? rutas.filter((r) => r.startsWith(solo)) : rutas;
if (elegidas.length === 0) {
  console.error(`No hay páginas que coincidan con ${solo}. Páginas: ${rutas.join(', ')}`);
  process.exit(1);
}

// 3. Servidor estático mínimo sobre dist/, respetando el base
const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml', '.ico': 'image/x-icon',
};
const prefijo = base.replace(/\/$/, '');
const servidor = createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (prefijo && ruta.startsWith(prefijo)) ruta = ruta.slice(prefijo.length) || '/';
  let archivo = join(dist, ruta);
  if (existsSync(archivo) && statSync(archivo).isDirectory()) archivo = join(archivo, 'index.html');
  if (!archivo.startsWith(dist) || !existsSync(archivo)) {
    res.writeHead(404).end('404');
    return;
  }
  res.writeHead(200, { 'content-type': tipos[extname(archivo)] ?? 'application/octet-stream' });
  res.end(readFileSync(archivo));
});
await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
const origen = `http://127.0.0.1:${servidor.address().port}${prefijo}`;

// 4. Capturar
mkdirSync(salida, { recursive: true });
const navegador = await chromium.launch();
const errores = [];
for (const ruta of elegidas) {
  const nombreArchivo = ruta === '/' ? 'inicio' : ruta.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  for (const v of vistas) {
    const contexto = await navegador.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: v.deviceScaleFactor,
      isMobile: v.isMobile,
      hasTouch: v.hasTouch,
      locale: 'es-AR',
      timezoneId: 'America/Argentina/Buenos_Aires',
      reducedMotion: 'reduce',
    });
    const pagina = await contexto.newPage();
    await pagina.clock.setFixedTime(new Date(hora));
    pagina.on('pageerror', (e) => errores.push(`${ruta} (${v.nombre}): ${e.message}`));
    pagina.on('console', (m) => m.type() === 'error' && errores.push(`${ruta} (${v.nombre}) consola: ${m.text()}`));
    await pagina.goto(origen + ruta, { waitUntil: 'networkidle' });
    // Recorrer la página para disparar cargas diferidas y luego volver arriba.
    await pagina.evaluate(async () => {
      const paso = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += paso) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await pagina.waitForTimeout(300);
    const destino = join(salida, `${nombreArchivo}--${v.nombre}.jpg`);
    await pagina.screenshot({ path: destino, fullPage: true, type: 'jpeg', quality: 82 });
    console.log('✓', relative(raiz, destino));
    await contexto.close();
  }
}
await navegador.close();
servidor.close();

if (errores.length) {
  console.warn('\nErrores de JavaScript durante las capturas:');
  for (const e of errores) console.warn(' -', e);
  process.exitCode = 1;
}
