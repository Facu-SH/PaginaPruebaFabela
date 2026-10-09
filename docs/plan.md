# Plan de trabajo

Cada fase marcada con ⛔ termina en un **punto de control**: frená, resumí lo hecho con capturas y esperá aprobación. Trabajá en una rama y abrí un PR por fase.

## Fase 0: Base (sin diseño)
- Proyecto Astro, estructura de carpetas, y `src/data/` con los datos del brief y sus tipos TS.
- `scripts/capturas.mjs` y el comando `npm run capturas`.
- `docs/pendientes.md` con todos los datos (S) y cualquier supuesto nuevo.
- No tiene punto de control: seguí directo a la fase 1.

## Fase 1: Referencias y 3 direcciones visuales ⛔
1. **Investigá referencias.** Sacá capturas con Playwright de 12 a 15 sitios y analizalos en `docs/referencias/analisis.md`. Para cada uno, anotá qué tomar: tipografía, color, fotografía, composición o microcopy. Extraé principios; no copies. Puntos de partida (ampliá con tu criterio):
   - Galerías: godly.website, awwwards.com, land-book.com, siteinspire.com.
   - Marcas de comida con identidad fuerte: graza.co, flybyjing.com, oatly.com, brightland.co, eatfishwife.com. Son de venta al consumidor: tomá la actitud visual, no la estructura.
   - Buscá también proveedores mayoristas o B2B con buen diseño, sitios argentinos bien hechos y buenos ejemplos de "abierto ahora", horarios o zonas de reparto.
2. **Hacé tres direcciones realmente distintas.** Cada una es una home completa, en mobile y desktop, con datos reales, en `/direcciones/a`, `/direcciones/b` y `/direcciones/c`. Podés usar subagentes en paralelo. Estas son semillas: podés proponer mejores, pero tienen que ser igual de distintas entre sí.
   - **A · Almacén de confianza:** cálido y editorial, con 25 años de oficio. Serif expresiva, papel, kraft, etiquetas.
   - **B · Color de sobre:** cada categoría con el color de su producto (amarillo mayonesa, rojo ketchup, etc.). Bloques sólidos, grotesca pesada, sobres ilustrados en SVG/CSS. Funciona sin fotos.
   - **C · Despacho a las 5 AM:** lenguaje de remito, hoja de ruta y planilla de reparto. Tipografía mono o condensada. El reloj "atendiendo ahora" y los días por zona son los protagonistas.
3. **Documentá cada dirección** en `docs/direcciones/<a|b|c>.md`:
   - concepto;
   - tipografías y por qué;
   - paleta;
   - tratamiento de imágenes;
   - propuesta de wordmark "DPI";
   - qué la hace no genérica.
4. **Hacé una crítica cruzada:** revisá las tres contra las reglas de `CLAUDE.md`, corregí, y recién ahí cerrá.
5. **Entregá:**
   - capturas en `docs/capturas/fase-1/`;
   - un resumen comparativo corto;
   - tu recomendación.

> Prompt para seguir: "Vamos con la dirección __. De la __ quiero __. Cambiá __. Seguí con la fase 2."

## Fase 2: Sistema de diseño ⛔
- Tokens (color, tipografía, escala, espaciado, radios, sombras) en `src/styles/tokens.css`.
- Componentes base:
  - header y footer;
  - botón de WhatsApp (en línea y flotante);
  - estado "atendiendo ahora";
  - tarjeta de producto;
  - bloque de dato;
  - CTA de lista de precios;
  - selector de zona.
- Una página `/sistema/` que muestre todo, con `noindex`.
- `docs/diseno.md` con las reglas de uso y la dirección de fotografía.
- Borrá `/direcciones/`.

> Prompt para seguir: "Aprobado [con estos cambios: __]. Seguí con la fase 3."

## Fase 3: Sitio completo ⛔
- Todas las páginas del mapa del brief, con textos finales.
- Las funcionalidades 1 a 5 del brief. La 6 (`/lista/`) si da el tiempo.
- Capturas de todas las páginas y dos vueltas de crítica y corrección.

## Fase 4: SEO, IA, rendimiento y fotos ⛔
- JSON-LD, sitemap, robots, `llms.txt`, imágenes OG, `_redirects` y metadatos por página.
- Auditoría: Lighthouse (si se puede correr), accesibilidad con axe y links rotos.
- `docs/fotos/prompts.md`, una lista de tomas para generar con IA. Para cada una:
  - archivo destino;
  - relación de aspecto;
  - dónde se usa;
  - prompt completo en inglés, en el estilo de la dirección elegida, sin logos de marcas ajenas ni texto legible.
- `docs/fotos/guia-fotos-reales.md`: cómo sacar las fotos de producto con el celular (fondo, luz, ángulos y lista de tomas).
- `docs/como-actualizar.md`: cómo cambiar el WhatsApp, los horarios, las zonas, los productos y las fotos sin saber mucho de programación.

## Fase 5: Pulido final
- **Pasada de director de arte:** recorré cada página en mobile, anotá 10 cosas para mejorar y hacelas.
- **Pasada de texto:** leé todo en voz alta con la voz del brief y borrá el relleno.
- Actualizá `docs/pendientes.md` con lo que el dueño todavía tiene que confirmar.
