# Auditoría · fase 4

Fecha: 9 de octubre de 2026. Rama `claude/epic-bohr-yl0qtj`. Todo se corrió sobre `dist/` (compilación de producción) servido en local con gzip y caché como en un hosting real.

## Resumen

| Revisión | Resultado |
|---|---|
| Lighthouse mobile (13 páginas indexables) | **99–100** en Performance, **100** en Accesibilidad, Buenas prácticas y SEO en todas |
| axe (15 páginas, a 390 y 1440 px, en horario y fuera de horario) | **0 violaciones serias o críticas**. Queda 1 moderada en `/sistema/` (noindex, interna) |
| Links internos, anclas y `http://` (`npm run revisar`) | **0 errores** (1262 referencias internas revisadas) |
| JSON-LD contra el vocabulario de schema.org | **0 errores**: 18 tipos, todas las propiedades existen y corresponden a su tipo |
| `npm run build` / `npx astro check` | sin errores ni warnings / 0 errores, 0 warnings, 0 hints |
| Vista previa con `BASE_PATH=/PaginaPruebaFabela/` | las 15 páginas cargan fuente, sprite, scripts e imágenes bajo la subcarpeta; 0 links fuera del base |

## Lighthouse mobile

Lighthouse 12.8.2 con el Chromium de Playwright (HeadlessChrome 141), perfil mobile con red y CPU simuladas (los valores por defecto de Lighthouse). La última columna es la primera pasada, antes de las correcciones de esta fase.

| Página | Performance | Accesibilidad | Buenas prácticas | SEO | LCP | TBT | CLS | 1.ª pasada (P/A/BP/SEO) |
|---|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/productos/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/productos/aderezos/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/productos/endulzantes/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/productos/mermeladas/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 100 / 100 / 100 / 100 |
| `/productos/lacteos/` | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 | 100 / 100 / 100 / 100 |
| `/productos/galletitas-y-tostadas/` | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 | 100 / 100 / 100 / 100 |
| `/clinicas/` | 100 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/comercios/` | 100 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/entregas/` | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/preguntas-frecuentes/` | 100 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 99 / 100 / 100 / 100 |
| `/contacto/` | 100 | 100 | 100 | 100 | 1.8 s | 0 ms | 0.017 | 99 / 100 / 100 / 100 |
| `/lista/` | 100 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 | 100 / 100 / 100 / 100 |

Cómo se corrió (desde fuera del repo):

```sh
CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx lighthouse@12.8.2 http://127.0.0.1:4405/<ruta> \
  --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json
```

Notas:

- El sitio ya llegaba bien de la fase 3 (HTML de 36 a 110 KB, una sola fuente de 90 KB precargada, CSS por página, JS mínimo): ninguna categoría bajó de 95 en ninguna pasada, así que no hubo que tocar pesos ni CLS.
- Lo que separa el 99 del 100 es el LCP simulado (1,8 s): el titular espera a la tipografía (con `font-display: swap` se ve antes con la letra de respaldo). No vale la pena sacrificar la letra por ese punto.
- El CLS de 0,017 en `/contacto/` es el reloj del tablero de atención cuando el script pone la hora real; está muy por debajo del límite (0,1).
- Lighthouse no se corrió sobre `/sistema/` ni la 404 (son noindex).
- En el hosting real conviene repetir la medición con PageSpeed Insights: `public/_headers` deja en caché por un año los archivos de `/_astro/` (sus nombres cambian con cada cambio).

## axe

`@axe-core/playwright` 4.10 (instalado fuera del repo), reglas WCAG 2.0/2.1/2.2 A y AA más buenas prácticas, en las 15 páginas (las 13 públicas, `/sistema/` y la 404) a 390 × 844 y 1440 × 900, simulando martes 9:30 (abierto) y martes 18:00 (cerrado) en Buenos Aires.

| Vista | Serias o críticas | Moderadas |
|---|---|---|
| 390 px | 0 | 1 (`/sistema/`) |
| 1440 px | 0 | 1 (`/sistema/`) |

**Problemas encontrados y cómo se resolvieron**

| Problema (axe) | Dónde | Solución |
|---|---|---|
| `landmark-complementary-is-top-level` (moderada): un `<aside>` dentro de `<main>` | el compartimento "Si no lo ves, preguntanos" (`CajaCategorias`, `OtrasCategorias`) y la lista de precios en línea (`ListaPreciosCTA`), en 9 páginas | el compartimento pasó a `<div>` (no es contenido aparte, es parte de la caja); la lista de precios, a `<section>` con su título |
| `region` (moderada): el botón flotante de WhatsApp fuera de todo landmark | 5 páginas en el celular | el flotante ahora va dentro del `<footer>` (slot de `Pie.astro`); se ve igual porque es `position: fixed` |

**Queda:** `landmark-unique` (moderada) en `/sistema/`: la página del sistema de diseño muestra cuatro tableros de atención iguales a propósito y comparten el nombre. Es interna y noindex; no afecta al sitio público.

### El flotante de WhatsApp y el pie

Revisado en las 15 páginas a 390 px, con el flotante visible y la página bajada hasta el final: el último renglón del pie termina en y = 732 px y el flotante empieza en y = 778 px (46 px de aire). No tapa nada. El aire de abajo del pie quedó atado al tamaño del flotante y al borde seguro del iPhone (`max(7rem, 3.4rem + safe-area + 2rem)`).

## Links rotos, metadatos y datos estructurados (`npm run revisar`)

`scripts/revisar.mjs` (sin dependencias, queda en el repo) recorre `dist/` y revisa:

- cada `href`, `src` y `srcset` interno apunta a un archivo que existe, y cada `#ancla` (también los `<use href="#…">` del sprite) a un `id` que existe;
- que no haya links `http://`;
- `title` y `description` en cada página, únicos, title ≤ 65 y description de 110 a 160 caracteres; canonical igual a la URL de la página; Open Graph y Twitter Card completos; las URLs absolutas del propio sitio (canonical, `og:image`, URLs dentro del JSON-LD) existen;
- cada JSON-LD se puede leer; el **FAQPage tiene el mismo texto y orden que las preguntas visibles**; el **BreadcrumbList coincide con las migas visibles**;
- `sitemap.xml` tiene todas las páginas indexables y ninguna noindex; `robots.txt` tiene la línea `Sitemap:`.

Resultado final: 15 páginas, 13 indexables, 1262 referencias internas, **0 errores, 0 advertencias**. (Se probó que detecta errores inyectando un link roto, un ancla inexistente y un `http://`.)

La validación contra schema.org (tipos y propiedades del vocabulario oficial `schemaorg-current-https.jsonld`, con herencia de clases y rangos de los valores con `@type`) se corrió aparte: 919 nodos, 2221 propiedades, 18 tipos (`Organization`, `WholesaleStore`, `WebSite`, `BreadcrumbList`, `ListItem`, `FAQPage`, `Question`, `Answer`, `OfferCatalog`, `Offer`, `Product`, `Brand`, `PostalAddress`, `OpeningHoursSpecification`, `ContactPoint`, `AdministrativeArea`, `Country`, `ImageObject`), **0 errores**.

## Metadatos por página

| Página | Title | Description |
|---|---|---|
| `/` | 54 | 160 |
| `/productos/` | 58 | 151 |
| `/productos/aderezos/` | 56 | 152 |
| `/productos/endulzantes/` | 57 | 137 |
| `/productos/mermeladas/` | 50 | 151 |
| `/productos/lacteos/` | 49 | 158 |
| `/productos/galletitas-y-tostadas/` | 65 | 152 |
| `/clinicas/` | 56 | 153 |
| `/comercios/` | 58 | 153 |
| `/entregas/` | 60 | 150 |
| `/preguntas-frecuentes/` | 63 | 160 |
| `/contacto/` | 56 | 151 |
| `/lista/` | 45 | 142 |

## Otros problemas encontrados en la fase y cómo se resolvieron

| Problema | Solución |
|---|---|
| Las 13 descriptions de las páginas públicas tenían entre 172 y 286 caracteres (Google las corta) y el title de `/productos/` tenía 69 | reescritas con el dato concreto adelante; `descripcion()` (`src/lib/textos.ts`) agrega el final solo si entra en 160, así que si un dato crece la descripción se acorta sola |
| 7 preguntas frecuentes tenían datos escritos a mano (días de reparto, dirección, horario, formas de pago) | todas se arman con plantillas desde `src/data/`; el texto quedó igual o más preciso ("Capital Federal" como en el resto del sitio, el horario con espacio duro antes de la "h", la lista de precios dice a quién y a qué mail pedirla) |
| El FAQPage salía en el orden del archivo y la página las muestra agrupadas por tema | el JSON-LD usa el mismo orden que la página (lo detectó `npm run revisar`) |
| Las plantillas de las imágenes OG dentro de `src/pages/` partían el CSS del sitio en un archivo más por página y dejaban CSS sin usar en `dist/` | las plantillas viven en `plantillas/` y se compilan aparte (`srcDir` propio); `dist/` quedó igual que antes |
| La foto `mermeladas.jpg` nunca se iba a ver (los sabores siempre se dibujaban) | `src/lib/fotos.ts` centraliza las fotos; si el producto con sabores tiene foto, reemplaza a los cuatro potecitos dibujados |

## Pendiente o fuera de alcance

- **`/sistema/`**: la violación moderada `landmark-unique` (ver arriba). Es interna y noindex.
- **Productos sin precio en el catálogo (JSON-LD)**: es una decisión del negocio (la lista no se publica). Para schema.org es válido; la prueba de resultados enriquecidos de Google puede marcar "fragmentos de producto" con advertencias por no tener `offers.price` ni reseñas. No es un error del sitio y no afecta la indexación.
- **FAQPage**: desde 2023 Google muestra las preguntas desplegadas solo para sitios de gobierno y salud; el marcado igual le sirve a Bing y a los buscadores de IA.
- **`geo` y código postal**: no están en los datos, así que no se publican (pendiente #7). Cuando se carguen en `src/data/empresa.ts`, aparecen solos en el JSON-LD.
- **El número de WhatsApp es de prueba** (pendiente #1): ya figura en los datos para Google y en `llms.txt`; cambia con una línea.
- **Medición en el hosting real**: repetir Lighthouse (PageSpeed Insights) cuando el sitio esté en el dominio.
