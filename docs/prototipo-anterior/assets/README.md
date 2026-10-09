# Assets de la web DPI — guía para reemplazar imágenes y logos

Todo lo visual de la página está preparado para reemplazarse por fotos y
logos reales **sin tocar la estructura del sitio**. Esta guía indica qué
archivo crear, con qué nombre y dónde activarlo.

> Regla general: respetar los nombres de archivo indicados. Si se respeta
> el nombre, en la mayoría de los casos alcanza con guardar el archivo y
> descomentar una línea en `index.html`.

---

## 1. Foto principal del hero (prioridad alta)

| Qué | Detalle |
|---|---|
| Archivo a crear | `assets/images/hero-productos-destacados.jpg` |
| Contenido sugerido | Foto real de los productos más vendidos: mayonesa individual, ketchup y mostaza; o combinación sal / azúcar / edulcorante |
| Tamaño sugerido | ~1200 × 1000 px (proporción similar a 56:47), JPG o WebP |
| Cómo activarla | En `index.html`, sección HERO: descomentar el `<img class="hero-photo">` y borrar el bloque `<svg>` con la ilustración. Las instrucciones están comentadas en el lugar exacto |

Mientras la foto no exista, la página sigue mostrando la ilustración actual
(no se rompe nada).

## 2. Fotos de productos destacados

Sección "Productos destacados" (`#destacados`). Cada card tiene un
placeholder "Foto próximamente" y un `<img>` comentado con su nombre:

| Card | Archivo a crear |
|---|---|
| Mayonesa individual | `assets/images/prod-mayonesa-individual.jpg` |
| Ketchup individual | `assets/images/prod-ketchup-individual.jpg` |
| Mostaza individual | `assets/images/prod-mostaza-individual.jpg` |
| Azúcar individual | `assets/images/prod-azucar-individual.jpg` |
| Edulcorante DPI (línea propia) | `assets/images/prod-edulcorante-dpi.jpg` |
| Mermeladas y dulces | `assets/images/prod-mermeladas-individuales.jpg` |

- Tamaño sugerido: 800 × 600 px (proporción 4:3), JPG o WebP.
- Cómo activar cada foto: en la card correspondiente de `index.html`,
  borrar el `<span class="media-placeholder">…</span>` y descomentar el
  `<img>`, ajustando el `alt` si hace falta.

## 3. Fotos de categorías

Hoy usan ilustraciones SVG (`assets/images/cat-*.svg`). Para pasar a fotos
reales, crear estos archivos y cambiar el `src` del `<img>` de cada card
en la sección "Catálogo" (`#productos`):

| Categoría | Archivo a crear |
|---|---|
| Salsas y aderezos | `assets/images/cat-salsas.jpg` |
| Condimentos | `assets/images/cat-condimentos.jpg` |
| Dulces | `assets/images/cat-dulces.jpg` |
| Galletitas y grisines | `assets/images/cat-galletitas.jpg` |
| Varios | `assets/images/cat-varios.jpg` |

- Tamaño sugerido: 800 × 520 px, JPG o WebP. El recorte se adapta solo
  (`object-fit: cover`).
- Actualizar también el `alt` para describir la foto real.

## 4. Logos de marcas

Sección "Marcas" (`#marcas`). Hoy cada marca se muestra como **texto**
(placeholder). Cuando se consigan los logos **autorizados** (no descargar
de internet, no inventar):

1. Crear la carpeta `assets/images/brands/`.
2. Guardar cada logo como `marca-NOMBRE.png` (o `.svg` / `.webp`),
   ~300 px de ancho, fondo transparente:
   - `assets/images/brands/marca-natura.png`
   - `assets/images/brands/marca-dpi-edulcorante.png` (línea propia)
   - una por cada marca adicional
3. En `index.html`, dentro del `<li class="brand-tile">` de esa marca:
   borrar los `<span>` de texto y descomentar/ajustar el `<img>`.
   Hay una plantilla comentada para agregar más marcas.

**Pendiente de confirmar con el dueño:** el nombre exacto de la segunda
marca (¿Abedul o Vegul?). Hasta confirmarlo, esa tile dice "Marca a
confirmar" y no hay que publicar ningún nombre.

## 5. Imagen para compartir (og-image)

| Qué | Detalle |
|---|---|
| Archivo a crear | `assets/og-image.jpg` |
| Tamaño | 1200 × 630 px exactos (formato estándar de redes/WhatsApp) |
| Contenido sugerido | Foto real de productos + logo DPI |
| Dónde se usa | Etiquetas `og:image` y `twitter:image` del `<head>` de `index.html` (ya apuntan a este archivo; solo falta crearlo y confirmar el dominio) |

## 6. Logo y favicon

- `assets/logo-dpi.svg`: reemplazar por el logo definitivo manteniendo el
  nombre de archivo (se usa en header y footer).
- `assets/favicon.svg`: ídem para el ícono de pestaña.

---

## Qué fotos conviene sacar primero

1. **Hero**: composición de los productos más vendidos (la imagen más visible).
2. **Edulcorante DPI**: producto propio, diferencial de la empresa.
3. **Mayonesa / ketchup / mostaza individuales** (las cards más consultadas).
4. Azúcar y mermeladas individuales.
5. Las cinco fotos de categorías.
6. og-image (puede armarse con la foto del hero + logo).

Consejos: fondo neutro y limpio, buena luz natural o difusa, productos
sellados y prolijos, fotos horizontales, sin marcas de terceros fuera de
foco legal (usar solo productos que la empresa comercializa).

---

## Checklist antes de publicar el sitio

- [ ] Reemplazar `REEMPLAZAR-DOMINIO.com.ar` por el dominio real en
      `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt`
      y `sitemap.xml`.
- [ ] Configurar Formspree: reemplazar `REEMPLAZAR_ENDPOINT` en el
      `action` del formulario de `index.html`.
- [ ] Cargar el número real de WhatsApp en `WHATSAPP_NUMBER` (`script.js`).
- [ ] Cargar la URL de la lista de precios en `PRICE_LIST_URL`
      (`script.js`) cuando el dueño la autorice.
- [ ] Confirmar email de contacto (buscar "A CONFIRMAR" en `index.html`).
- [ ] Confirmar horario de atención y zona de cobertura.
- [ ] Confirmar el nombre de la marca pendiente (¿Abedul o Vegul?).
- [ ] Crear `assets/og-image.jpg`.
