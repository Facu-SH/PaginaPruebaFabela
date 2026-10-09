#!/usr/bin/env node
// Revisa el sitio compilado (dist/) sin depender de nada externo:
//   1. links internos rotos: cada href/src/srcset interno apunta a un archivo que existe, y cada
//      "#ancla" a un id que existe en esa página (también los <use href="#…"> del sprite);
//   2. links inseguros (http://);
//   3. metadatos: title y description en cada página, únicos y de largo razonable; canonical, og:image
//      y las URLs absolutas del propio sitio apuntan a archivos que existen;
//   4. datos estructurados: cada JSON-LD se puede leer; el texto del FAQPage es idéntico al visible;
//   5. sitemap.xml: tiene todas las páginas indexables y ninguna noindex.
//
//   npm run revisar              (compilá antes con npm run build)
//   BASE_PATH=/PaginaPruebaFabela/ SITE_URL=https://facu-sh.github.io VISTA_PREVIA=1 npm run revisar   (vista previa)
//
// Termina con código 1 si encuentra errores (las advertencias no cortan).

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(fileURLToPath(import.meta.url), '../..');
const dist = join(raiz, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const sitio = new URL(process.env.SITE_URL ?? 'https://dpi-arg.com.ar');
const origenSitio = new URL(base, sitio).href; // https://dpi-arg.com.ar/
// En una vista previa (VISTA_PREVIA=1) todas las páginas son noindex a propósito: las indexables se
// reconocen porque tienen canonical (las noindex de verdad, como la 404 y /sistema/, no lo tienen).
const vistaPrevia = ['1', 'true', 'si'].includes((process.env.VISTA_PREVIA ?? '').toLowerCase());

const errores = [];
const avisos = [];
const error = (pagina, texto) => errores.push(`${pagina}: ${texto}`);
const aviso = (pagina, texto) => avisos.push(`${pagina}: ${texto}`);

if (!existsSync(dist)) {
  console.error('No existe dist/. Corré npm run build.');
  process.exit(1);
}

// ---------- Utilidades ----------
const entidades = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0', '#39': "'" };
const decodificar = (s) =>
  s.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e) =>
    e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : (entidades[e] ?? m),
  );
const textoDe = (html) => decodificar(html.replace(/<[^>]+>/g, ''));

function etiquetas(html) {
  // Saca el contenido de <script> y <style> (no son etiquetas) y devuelve [{ tag, attrs }].
  const limpio = html.replace(/<(script|style)\b([^>]*)>[\s\S]*?<\/\1>/gi, '<$1$2></$1>').replace(/<!--[\s\S]*?-->/g, '');
  const lista = [];
  for (const m of limpio.matchAll(/<([a-zA-Z][\w:-]*)(\s[^>]*?)?\/?>/g)) {
    const attrs = {};
    for (const a of (m[2] ?? '').matchAll(/([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
      attrs[a[1].toLowerCase()] = decodificar(a[2] ?? a[3] ?? a[4] ?? '');
    }
    lista.push({ tag: m[1].toLowerCase(), attrs });
  }
  return lista;
}

const archivos = [];
const recorrer = (dir) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) recorrer(p);
    else archivos.push(p);
  }
};
recorrer(dist);
const htmls = archivos.filter((f) => f.endsWith('.html'));

/** URL pública de un archivo de dist/ ("/productos/" para dist/productos/index.html). */
const rutaDe = (f) => {
  const rel = relative(dist, f).split('\\').join('/');
  return base + rel.replace(/(^|\/)index\.html$/, '$1');
};

/** Archivo de dist/ para una ruta del sitio (con base), o null. */
function archivoDe(pathname) {
  if (!pathname.startsWith(base)) return null;
  let rel = decodeURIComponent(pathname.slice(base.length));
  let f = join(dist, rel);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  else if (!existsSync(f) && existsSync(f + '.html')) f = f + '.html';
  return existsSync(f) && f.startsWith(dist) ? f : null;
}

// ---------- Lectura de páginas ----------
const paginas = new Map(); // archivo -> { ruta, html, tags, ids }
for (const f of htmls) {
  const html = readFileSync(f, 'utf8');
  const tags = etiquetas(html);
  const ids = new Set(tags.map((t) => t.attrs.id).filter(Boolean));
  paginas.set(f, { ruta: rutaDe(f), html, tags, ids });
}

// ---------- 1 y 2. Links ----------
let revisados = 0;
const vistos = new Set();
for (const [f, p] of paginas) {
  const urlPagina = new URL(p.ruta, sitio);
  const refs = [];
  for (const t of p.tags) {
    for (const atributo of ['href', 'src', 'xlink:href', 'action', 'poster']) if (t.attrs[atributo] != null) refs.push({ t, v: t.attrs[atributo], atributo });
    for (const atributo of ['srcset', 'imagesrcset']) {
      if (t.attrs[atributo]) for (const parte of t.attrs[atributo].split(',')) refs.push({ t, v: parte.trim().split(/\s+/)[0], atributo });
    }
    // Metadatos con URL absoluta (canonical, og:url, og:image, twitter:image)
    if (t.tag === 'meta' && /^(og:url|og:image|twitter:image)$/.test(t.attrs.property ?? t.attrs.name ?? '')) refs.push({ t, v: t.attrs.content, atributo: 'content' });
  }
  for (const { t, v, atributo } of refs) {
    if (!v) {
      if (atributo === 'href' && t.tag === 'a') error(p.ruta, `<a> con href vacío`);
      continue;
    }
    if (/^http:\/\//i.test(v)) {
      error(p.ruta, `link inseguro (http://): ${v}`);
      continue;
    }
    if (/^(mailto|tel|data|javascript):/i.test(v)) continue;
    let destino;
    try {
      destino = new URL(v, urlPagina);
    } catch {
      error(p.ruta, `URL inválida: ${v}`);
      continue;
    }
    if (destino.origin !== sitio.origin) continue; // externo (https): no se revisa acá
    revisados++;
    const archivo = destino.pathname === urlPagina.pathname && v.startsWith('#') ? f : archivoDe(destino.pathname);
    if (!archivo) {
      error(p.ruta, `<${t.tag} ${atributo}="${v}"> apunta a un archivo que no existe (${destino.pathname})`);
      continue;
    }
    if (destino.hash && destino.hash.length > 1) {
      const id = decodeURIComponent(destino.hash.slice(1));
      const otra = paginas.get(archivo);
      if (otra && !otra.ids.has(id)) error(p.ruta, `<${t.tag} ${atributo}="${v}">: no hay ningún id="${id}" en ${otra.ruta}`);
    }
    vistos.add(archivo);
  }
}

// ---------- 3. Metadatos ----------
const meta = (p, nombre) => p.tags.find((t) => t.tag === 'meta' && (t.attrs.name === nombre || t.attrs.property === nombre))?.attrs.content;
const indexables = [];
const titulos = new Map();
const descripciones = new Map();
for (const [, p] of paginas) {
  if (p.ruta.includes('/plantillas/')) error(p.ruta, 'una plantilla llegó a dist/ (se compilan aparte, con npm run og)');
  const robots = meta(p, 'robots') ?? '';
  const conCanonical = p.tags.some((t) => t.tag === 'link' && t.attrs.rel === 'canonical');
  const noindex = /noindex/.test(robots) && !(vistaPrevia && conCanonical);
  if (vistaPrevia && !/noindex/.test(robots)) error(p.ruta, 'vista previa sin <meta name="robots" content="noindex">');
  const title = textoDe(p.html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').trim();
  const description = meta(p, 'description') ?? '';
  if (!title) error(p.ruta, 'sin <title>');
  if (!description) error(p.ruta, 'sin meta description');
  if (!noindex) {
    indexables.push(p.ruta);
    if (title.length > 65) aviso(p.ruta, `title de ${title.length} caracteres (más de 65): ${title}`);
    if (description.length > 160 || description.length < 110) aviso(p.ruta, `description de ${description.length} caracteres (ideal 120–160)`);
    if (titulos.has(title)) error(p.ruta, `title repetido con ${titulos.get(title)}`);
    if (descripciones.has(description)) error(p.ruta, `description repetida con ${descripciones.get(description)}`);
    titulos.set(title, p.ruta);
    descripciones.set(description, p.ruta);
    const canonical = p.tags.find((t) => t.tag === 'link' && t.attrs.rel === 'canonical')?.attrs.href;
    if (!canonical) error(p.ruta, 'sin canonical');
    else if (canonical !== new URL(p.ruta, sitio).href) error(p.ruta, `canonical ${canonical} no es la URL de la página`);
    for (const m of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'og:locale', 'og:site_name', 'twitter:card', 'twitter:image']) {
      if (!meta(p, m)) error(p.ruta, `falta <meta ${m}>`);
    }
  }

  // ---------- 4. JSON-LD ----------
  for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let datos;
    try {
      datos = JSON.parse(m[1]);
    } catch (e) {
      error(p.ruta, `JSON-LD que no se puede leer: ${e.message}`);
      continue;
    }
    const nodos = datos['@graph'] ?? [datos];
    if (datos['@context'] !== 'https://schema.org') error(p.ruta, 'JSON-LD sin @context https://schema.org');
    for (const n of nodos) {
      // URLs del propio sitio dentro del JSON-LD
      JSON.stringify(n, (k, v) => {
        if (typeof v === 'string' && v.startsWith(origenSitio) && !archivoDe(new URL(v).pathname)) error(p.ruta, `JSON-LD: ${k} apunta a ${v}, que no existe`);
        return v;
      });
      if (n['@type'] === 'FAQPage') {
        const visibles = [...p.html.matchAll(/<p class="pregunta__respuesta"[^>]*>([\s\S]*?)<\/p>/g)].map((x) => textoDe(x[1]));
        const preguntas = [...p.html.matchAll(/<h3 class="pregunta__titulo"[^>]*>([\s\S]*?)<\/h3>/g)].map((x) => textoDe(x[1]));
        if (visibles.length !== n.mainEntity.length) error(p.ruta, `FAQPage tiene ${n.mainEntity.length} preguntas y la página muestra ${visibles.length}`);
        n.mainEntity.forEach((q, i) => {
          if (q.name !== preguntas[i]) error(p.ruta, `FAQPage: la pregunta ${i + 1} no coincide con la visible`);
          if (q.acceptedAnswer?.text !== visibles[i]) error(p.ruta, `FAQPage: la respuesta ${i + 1} no coincide con la visible`);
        });
      }
      if (n['@type'] === 'BreadcrumbList') {
        const ultimo = n.itemListElement.at(-1);
        if (ultimo.item !== new URL(p.ruta, sitio).href) error(p.ruta, `BreadcrumbList: el último ítem (${ultimo.item}) no es esta página`);
        const visibles = [...p.html.matchAll(/<nav class="migas[^"]*"[\s\S]*?<\/nav>/g)][0]?.[0];
        const nombres = visibles ? [...visibles.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => textoDe(x[1]).trim()) : [];
        if (nombres.join(' > ') !== n.itemListElement.map((x) => x.name).join(' > ')) error(p.ruta, 'BreadcrumbList no coincide con las migas visibles');
      }
    }
  }
}

// ---------- 5. sitemap.xml ----------
const sitemap = join(dist, 'sitemap.xml');
if (!existsSync(sitemap)) error('/sitemap.xml', 'no existe');
else {
  const locs = [...readFileSync(sitemap, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const esperadas = indexables.filter((r) => !/\/404(\.html)?$/.test(r)).map((r) => new URL(r, sitio).href);
  for (const u of esperadas) if (!locs.includes(u)) error('/sitemap.xml', `falta la página indexable ${u}`);
  for (const u of locs) {
    if (!esperadas.includes(u)) error('/sitemap.xml', `${u} está en el sitemap pero es noindex o no existe`);
    if (!u.startsWith(origenSitio)) error('/sitemap.xml', `${u} no usa el dominio del sitio (${origenSitio})`);
  }
}
const robots = join(dist, 'robots.txt');
if (!existsSync(robots) || !/Sitemap: https:\/\//.test(readFileSync(robots, 'utf8'))) error('/robots.txt', 'no existe o no tiene la línea Sitemap:');

// ---------- Resultado ----------
console.log(`Páginas HTML: ${htmls.length} (${indexables.length} indexables) · referencias internas revisadas: ${revisados}`);
if (avisos.length) {
  console.log(`\nAdvertencias (${avisos.length}):`);
  for (const a of avisos) console.log(' ·', a);
}
if (errores.length) {
  console.log(`\nErrores (${errores.length}):`);
  for (const e of errores) console.log(' ✗', e);
  process.exitCode = 1;
} else {
  console.log('\n✓ Sin links rotos, sin http://, metadatos completos, JSON-LD legible y sitemap al día.');
}
