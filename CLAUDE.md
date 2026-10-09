# DPI — sitio web nuevo

Sitio de **DPI (Productos Individuales SRL)**, distribuidora de alimentos en porciones individuales (sobres de mayonesa, azúcar, edulcorante, mermeladas, etc.) de Florida, Buenos Aires, activa desde 2001. Reemplaza a https://dpi-arg.com.ar (un WordPress viejo).

Antes de hacer cualquier cosa, leé:
1. `docs/brief.md`: el negocio, los datos y la voz. Es la fuente de verdad. No lo reescribas; si encontrás una contradicción, preguntá.
2. `docs/plan.md`: las fases. Trabajá solo en la fase que te pidan y frená en cada punto de control.

## Objetivo del sitio
Que alguien que encuentra a DPI (por Google, Google Maps, una IA o el QR de la lista de precios impresa) entienda en 5 segundos qué venden, a quién, dónde y lo rápido que contestan, y termine escribiendo por **WhatsApp** (o por mail). Es un sitio chico que se ve mayormente desde el celular. No es un e-commerce: no hay carrito ni precios publicados.

## Stack
- Astro (última versión estable), salida estática, TypeScript.
- CSS propio con custom properties (tokens) en `src/styles/`. Sin Tailwind ni librerías de UI.
- JS solo donde hace falta (islas chicas, vanilla). Todo funciona sin JS: los widgets degradan a texto.
- Imágenes con `astro:assets` (AVIF/WebP, tamaños responsivos).
- Tipografías autoalojadas (Fontsource o archivos locales), con subset latin y `font-display: swap`. Solo licencias libres.
- Deploy estático (`dist/`) servido en la raíz del dominio (Cloudflare Pages o Netlify). Redirecciones en `public/_redirects`. No asumas subcarpeta.

## Estructura (fase 0)
- `src/data/`: datos del negocio (`empresa`, `horario`, `entregas`, `pagos`, `productos`, `mensajes`, `faq`) y sus tipos. Importá desde `src/data` (index).
- `src/lib/horario.ts`: `estadoAtencion()` ("atendiendo ahora", siempre en hora de Buenos Aires) y `textoHorario()` (respaldo sin JS).
- `src/lib/whatsapp.ts`: `waLink(contexto, vars)`, `mailtoLink(asunto)`, `telLink()`.
- `src/lib/url.ts`: `url('/ruta/')` para todo link interno (respeta `BASE_PATH`, para vistas previas en subcarpeta).
- `src/layouts/Base.astro`: `<head>` común. `src/styles/reset.css`: reset sin marca.
- `docs/referencias/`: logo actual, sobre de edulcorante, capturas y fotos del sitio viejo (`sitio-viejo/`).
- `docs/prototipo-anterior/`: el prototipo anterior, archivado como referencia de contenido.

## Datos: una sola fuente
- Todo dato del negocio (WhatsApp, horarios, zonas, pagos, dirección, productos, marcas) vive en `src/data/`. Nunca va hardcodeado en componentes ni en textos.
- Cambiar un dato (por ejemplo, el número de WhatsApp) tiene que ser editar UNA línea.
- Los datos marcados **(S)** en el brief son supuestos provisorios. Usalos normalmente, pero listalos en `docs/pendientes.md` para que el dueño los confirme.

## Reglas de diseño (anti-genérico)
El prototipo anterior se veía "hecho por IA". Estas reglas existen para evitarlo:
- **Tipografía con carácter.** Prohibidas como tipografía principal: Inter, Roboto, Open Sans, Poppins, Montserrat, Sora, Lato, Nunito, DM Sans, Space Grotesk. Justificá la elección en `docs/diseno.md`.
- **Nada de la plantilla de landing por defecto:**
  - grillas de 6 a 8 tarjetas iguales (ícono + título + 2 líneas);
  - "Por qué elegirnos" con beneficios abstractos;
  - "Cómo funciona" en 3 pasos con números en círculos;
  - hero centrado con gradiente o blobs;
  - glassmorphism, emojis como íconos, gradientes violeta o azul.

  Si una sección se parece a lo que saldría de cualquier generador, rehacela.
- **Ritmo variado.** No todas las secciones pueden tener el mismo esquema (antetítulo + h2 + párrafo + grilla). Alterná escala, densidad, alineación y fondos.
- **El producto es el protagonista.** Son sobres chicos y de colores: usá esa materia (escala, color, textura, repetición). Nada de íconos genéricos de categorías.
- **Nunca un placeholder visible** ("Foto próximamente", "Marca a confirmar", "Lorem"). Si falta una foto, el diseño tiene que verse terminado igual, con ilustración, composición tipográfica o color.
- **Mobile primero.** Diseñá y revisá a 390 px antes que a 1440 px. En el celular, el botón de WhatsApp siempre está a mano.
- **Accesible:** contraste AA, foco visible, HTML semántico y `prefers-reduced-motion`. Animaciones solo si suman; nunca para "darle vida".

## Reglas de texto
- Español rioplatense con voseo ("escribinos", "pedí"). Tono cordial y directo, como un proveedor de confianza: ni corporativo ni canchero.
- **Cada sección tiene al menos un dato concreto:** una hora, un día, una zona, una marca, un producto o un año. Si la frase la podría decir cualquier distribuidora, reescribila.
- Frases prohibidas: "soluciones integrales", "calidad premium", "excelencia", "líderes del mercado", "tu aliado estratégico", "experiencia única", "a otro nivel", "impulsamos", "potenciá tu negocio".
- No prometas de más. Decí "en general, al día siguiente", no "entrega garantizada". "Consultá disponibilidad" va como mucho una vez por página.
- No inventes clientes, testimonios, cifras ni certificaciones que no estén en el brief.

## SEO y visibilidad en IA
- Cada página arranca con una oración que responde directo: qué es, qué vende, dónde y para quién. Las IA citan frases así.
- Títulos y `h2` con las palabras que usa la gente: "sobres de mayonesa individuales", "edulcorante en sobre para bares", "porciones individuales para clínicas".
- JSON-LD generado desde `src/data/`:
  - `Organization` + `WholesaleStore` con dirección, geo, `openingHoursSpecification`, `areaServed`, `foundingDate`, `contactPoint` con WhatsApp y `hasOfferCatalog` con los productos (sin precio);
  - `FAQPage`;
  - `BreadcrumbList`.
- Nombre, dirección y teléfono idénticos en todo el sitio y en el perfil de Google Maps.
- `sitemap.xml`.
- `robots.txt` que permita GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot y Google-Extended.
- `llms.txt` con el resumen del negocio.
- Canonical, Open Graph e imagen OG en cada página.
- URLs del sitio viejo redirigidas con 301 (ver el brief).
- Objetivo: Lighthouse mobile ≥ 95 en las cuatro categorías.

## Cómo verificar (obligatorio)
- `npm run build` sin errores ni warnings.
- `npm run capturas -- <fase>`: un script de Playwright (`scripts/capturas.mjs`) que captura cada página a 390×844 y 1440×900, página completa, en `docs/capturas/<fase>/`. Opciones: `--solo <ruta>`, `--cerrado` (simula fuera de horario), `--sin-build`, `--salida <dir>`. Simula martes 9:30 en Buenos Aires por defecto.
- **Mirá las capturas** y criticalas contra estas reglas antes de dar algo por terminado. Mínimo dos vueltas de crítica y corrección por fase.
- Si Playwright no se puede instalar (por ejemplo, por restricciones de red), avisalo explícitamente; no lo saltees en silencio.

## Qué NO hacer
- No agregues backend, base de datos, CMS, login, carrito ni formularios con servidor. El contacto es WhatsApp (`wa.me` con mensaje prellenado) y mail (`mailto:` con asunto).
- No uses cookies ni trackers.
- No uses fotos de stock ni imágenes generadas con logos de marcas ajenas.
- No avances a la fase siguiente sin aprobación.
