# Fotos generadas con IA: lista de tomas y prompts

Mientras no haya fotos reales, se pueden generar fotos **temporales** con un modelo de imagen (Midjourney, DALL·E, Imagen, Firefly, etc.) usando estos prompts. El sitio ya se ve terminado sin fotos (usa los envases dibujados): las fotos son una mejora, no una urgencia.

Cuando lleguen las fotos reales (ver `guia-fotos-reales.md`), se pisa el archivo con el mismo nombre y listo.

## Cómo usar esta lista

1. Copiá el prompt **entero** (está en inglés porque los modelos de imagen rinden mejor así).
2. Pedí la relación de aspecto indicada (en Midjourney: `--ar 4:3`; en otros, elegí "4:3 horizontal" o "cuadrado").
3. Generá varias y elegí la que más se parezca al envase real. Revisá que **no haya letras ni logos**: si aparecen, descartala o pedí otra. Los modelos inventan letras sin sentido y eso se nota.
4. Guardala en JPG con el **nombre exacto** de la columna "Archivo" (minúsculas, sin tildes, con guiones).
5. Copiala a la carpeta indicada y recompilá (`npm run build`). Se activa sola: no hay que tocar código.

**Reglas para todas** (salen de `docs/diseno.md`, "Dirección de fotografía"):

- El producto **solo**, sobre fondo blanco o gris muy claro, parejo. Nada de mesas, bares, bandejas, manos ni comida servida: el color de la categoría lo pone el sitio, no la foto.
- Luz suave y pareja, sombra corta debajo, sin reflejos fuertes en el plástico o el aluminio.
- De frente (sobres y paquetitos) o desde arriba (potecitos). El producto ocupa más o menos el 70 % del cuadro, centrado.
- Uno solo o una pila prolija de tres; nunca un montón desordenado.
- **Sin logos de marcas ajenas ni texto legible.** Las fotos generadas no pueden mostrar Natura, Abedul, Dánica ni Mauri: el envase va liso.
- Mínimo 1600 px de ancho. El sitio genera solo los tamaños chicos (AVIF y WebP).

Al final de cada prompt va la misma lista de "lo que no tiene que aparecer" (*negative prompt*). Si el modelo tiene un campo aparte para eso (Stable Diffusion, Firefly), pegala ahí; si no, dejala al final del prompt como está.

```
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

---

## Productos (`src/assets/productos/`)

Cada foto reemplaza al envase dibujado del producto en su página de categoría: en la **tarjeta del producto** y en la **cabecera de color** de la página. En la fila de "lo que más sale" del inicio se siguen usando los dibujos (la repetición es el punto).

| # | Archivo | Aspecto | Dónde se usa |
|---|---|---|---|
| 1 | `src/assets/productos/mayonesa.jpg` | 4:3 | `/productos/aderezos/`: cabecera y tarjeta grande (es el más vendido) |
| 2 | `src/assets/productos/ketchup.jpg` | 4:3 | `/productos/aderezos/`: cabecera y tarjeta |
| 3 | `src/assets/productos/mostaza.jpg` | 4:3 | `/productos/aderezos/`: cabecera y tarjeta |
| 4 | `src/assets/productos/salsa-golf.jpg` | 4:3 | `/productos/aderezos/`: cabecera y tarjeta |
| 5 | `src/assets/productos/azucar.jpg` | 4:3 | `/productos/endulzantes/`: cabecera (atrás) y tarjeta |
| 6 | `src/assets/productos/edulcorante.jpg` | 4:3 | `/productos/endulzantes/`: cabecera (adelante) y tarjeta grande |
| 7 | `src/assets/productos/mermeladas.jpg` | 4:3 | `/productos/mermeladas/`: tarjeta grande y cabecera, en lugar de los cuatro potecitos dibujados |
| 8 | `src/assets/productos/mermelada-surtida.jpg` | 4:3 | `/productos/mermeladas/`: tarjeta de la caja surtida |
| 9 | `src/assets/productos/queso-crema.jpg` | 1:1 o 4:3 | `/productos/lacteos/`: cabecera y tarjeta |
| 10 | `src/assets/productos/manteca.jpg` | 1:1 o 4:3 | `/productos/lacteos/`: cabecera y tarjeta |
| 11 | `src/assets/productos/galletitas.jpg` | 4:3 | `/productos/galletitas-y-tostadas/`: cabecera y tarjeta grande |
| 12 | `src/assets/productos/vainillas.jpg` | 4:3 | `/productos/galletitas-y-tostadas/`: cabecera y tarjeta |
| 13 | `src/assets/productos/tostadas.jpg` | 4:3 | `/productos/galletitas-y-tostadas/`: cabecera y tarjeta |

### 1. Mayonesa · `mayonesa.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve mayonnaise sachet: a small rectangular plastic pillow pack about 4 by 10 centimeters, slightly puffed, with crimped serrated heat seals across both short ends. The film is plain glossy pale butter-yellow with no printing at all. The sachet stands upright, seen straight from the front, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light from both sides and above, a short soft shadow directly under the sachet, no harsh highlights on the plastic. True-to-life color, crisp focus across the whole pack, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 2. Ketchup · `ketchup.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve ketchup sachet: a small rectangular plastic pillow pack about 4 by 10 centimeters, slightly puffed, with crimped serrated heat seals across both short ends. The film is plain glossy tomato red with no printing at all. The sachet stands upright, seen straight from the front, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light from both sides and above, a short soft shadow directly under the sachet, no harsh highlights on the plastic. True-to-life color, crisp focus across the whole pack, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 3. Mostaza · `mostaza.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve mustard sachet: a small rectangular plastic pillow pack about 4 by 10 centimeters, slightly puffed, with crimped serrated heat seals across both short ends. The film is plain glossy deep mustard ochre with no printing at all. The sachet stands upright, seen straight from the front, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light from both sides and above, a short soft shadow directly under the sachet, no harsh highlights on the plastic. True-to-life color, crisp focus across the whole pack, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 4. Salsa golf · `salsa-golf.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve "salsa golf" sauce sachet (a pink-orange mayonnaise and ketchup sauce): a small rectangular plastic pillow pack about 4 by 10 centimeters, slightly puffed, with crimped serrated heat seals across both short ends. The film is plain glossy warm orange with no printing at all. The sachet stands upright, seen straight from the front, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light from both sides and above, a short soft shadow directly under the sachet, no harsh highlights on the plastic. True-to-life color, crisp focus across the whole pack, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 5. Azúcar · `azucar.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve sugar packet: a flat rectangular paper sachet about 7 by 5 centimeters, matte white paper with finely crimped serrated edges on all four sides and a thin heat-sealed border, completely plain with no printing. The packet lies flat, photographed from directly above, slightly rotated a few degrees, centered and filling about 70 percent of the frame with even margins. Seamless very light gray light-box background so the white paper edge stays visible, soft even diffused light, a faint short shadow along the bottom edge. True-to-life color, crisp paper texture, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, spilled sugar
```

### 6. Edulcorante (línea propia DPI) · `edulcorante.jpg` · 4:3

> Este es el único envase propio: **conviene que sea la primera foto real** (hay una de referencia en `docs/referencias/edulcorante.png`). La generada no puede llevar el logo DPI (los modelos lo deforman), así que va lisa con la curva verde.

```
Studio product photograph for a wholesale food catalog. A single-serve sweetener packet: a flat rectangular paper sachet about 7 by 5 centimeters, matte white paper with finely crimped serrated edges on all four sides. A smooth soft sage-green curved band (hex a9cc8f) sweeps from the top left corner down to the bottom right corner, covering the lower left part of the packet; the rest is plain white. No printing, no text, no logo. The packet lies flat, photographed from directly above, slightly rotated a few degrees, centered and filling about 70 percent of the frame with even margins. Seamless very light gray light-box background, soft even diffused light, a faint short shadow along the bottom edge. True-to-life color, crisp paper texture, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 7. Mermeladas (los cuatro sabores) · `mermeladas.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. Four single-serve jam portion cups arranged in a neat 2 by 2 grid with small even gaps: each is a small square plastic tub about 4 by 4 centimeters with rounded corners and a plain brushed-aluminum foil lid with no printing. On each cup the foil lid is peeled back from one corner to show the jam inside: bright strawberry red, golden peach orange, deep plum purple, and dark mixed-berry red. Centered, filling about 70 percent of the frame. Seamless pure white light-box background, soft even diffused light, very short soft shadows, no harsh glare on the foil. True-to-life color, glossy jam surface, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, spoon, toast
```

### 8. Mermelada surtida (caja que arma DPI) · `mermelada-surtida.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. A small open plain kraft-brown cardboard box, seen from above, neatly filled with rows of single-serve jam portion cups, each a small square plastic tub with a plain brushed-aluminum foil lid with no printing. The cups are mixed: a few lids are peeled back at one corner to reveal strawberry red, peach orange, plum purple and mixed-berry dark red jam, so the four flavors read clearly. The box is centered and fills about 70 percent of the frame. Seamless pure white light-box background, soft even diffused light, short soft shadow, no harsh glare on the foil. True-to-life color, crisp focus, orderly and clean, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, printed box
```

### 9. Queso crema · `queso-crema.jpg` · 1:1 (o 4:3)

```
Studio product photograph for a wholesale food catalog, shot from directly above. One single-serve cream cheese portion cup: a small square white plastic tub about 4 by 4 centimeters with rounded corners and a plain brushed-aluminum foil lid with no printing, the lid peeled back from one corner to reveal smooth bright white cream cheese. A second identical closed cup sits slightly behind and overlapping, so there are two. Centered, filling about 70 percent of the frame with even margins. Seamless very light gray light-box background so the white tub stays visible, soft even diffused light, very short soft shadow, no harsh glare on the foil. True-to-life color, crisp focus, clean and minimal, square 1:1, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, knife, bread
```

### 10. Manteca · `manteca.jpg` · 1:1 (o 4:3)

```
Studio product photograph for a wholesale food catalog, shot from directly above. One single-serve butter portion: a small square plastic tub about 4 by 4 centimeters with rounded corners and a plain brushed-aluminum foil lid with no printing, the lid peeled back from one corner to reveal pale creamy yellow butter with a smooth surface. A second identical closed tub sits slightly behind and overlapping, so there are two. Centered, filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light, very short soft shadow, no harsh glare on the foil. True-to-life color, crisp focus, clean and minimal, square 1:1, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, knife, bread
```

### 11. Galletitas · `galletitas.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve biscuit flow-pack: a small rectangular pack about 9 by 5 centimeters made of plain matte warm-beige film with crimped serrated seals on both short ends and a clear window on the front showing three round golden sweet biscuits side by side. No printing on the film. The pack lies flat, seen straight from the front (from above), slightly rotated a few degrees, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light, short soft shadow, no harsh reflections on the clear film. True-to-life color, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, loose biscuits
```

### 12. Vainillas · `vainillas.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve ladyfinger (vainilla) flow-pack: a long narrow rectangular pack about 14 by 4 centimeters made of clear film with crimped serrated seals on both short ends, holding three ladyfinger sponge biscuits in a row, pale golden with a light sugar crust. No printing on the film. The pack lies flat, seen from above, slightly rotated a few degrees, centered horizontally and filling about 70 percent of the frame width with even margins. Seamless pure white light-box background, soft even diffused light, short soft shadow, no harsh reflections on the film. True-to-life color, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, loose biscuits
```

### 13. Tostadas · `tostadas.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. A single-serve toast flow-pack: a small rectangular pack about 9 by 7 centimeters made of clear film with crimped serrated seals on both short ends, holding two dry golden toast slices (crisp rusks, like small bread slices with a rounded top) stacked slightly offset. No printing on the film. The pack lies flat, seen straight from above, slightly rotated a few degrees, centered and filling about 70 percent of the frame with even margins. Seamless pure white light-box background, soft even diffused light, short soft shadow, no harsh reflections on the film. True-to-life color, crisp toasted texture, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, butter, jam
```

---

## Categorías (`src/assets/categorias/`)

Una foto de grupo por familia. Se usa en la **imagen para compartir** de cada categoría (la que aparece cuando alguien manda el link por WhatsApp o lo publica en redes), en lugar de los envases dibujados. Después de copiarla, corré `npm run og` y commiteá los PNG nuevos de `public/og/` (ver `docs/como-actualizar.md`).

| # | Archivo | Aspecto | Dónde se usa |
|---|---|---|---|
| 14 | `src/assets/categorias/aderezos.jpg` | 4:3 | Imagen para compartir de `/productos/aderezos/` |
| 15 | `src/assets/categorias/endulzantes.jpg` | 4:3 | Imagen para compartir de `/productos/endulzantes/` |
| 16 | `src/assets/categorias/mermeladas.jpg` | 4:3 | Imagen para compartir de `/productos/mermeladas/` |
| 17 | `src/assets/categorias/lacteos.jpg` | 4:3 | Imagen para compartir de `/productos/lacteos/` |
| 18 | `src/assets/categorias/galletitas-y-tostadas.jpg` | 4:3 | Imagen para compartir de `/productos/galletitas-y-tostadas/` |

### 14. Aderezos · `aderezos.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog. Four single-serve condiment sachets standing upright side by side with small even gaps, each a small rectangular plastic pillow pack about 4 by 10 centimeters with crimped serrated seals on both short ends, in plain glossy colors with no printing: pale butter-yellow (mayonnaise), tomato red (ketchup), mustard ochre (mustard) and warm orange (golf sauce). Each one tilted a few degrees differently, like freshly taken out of the box. Seen straight from the front, the group centered and filling about 70 percent of the frame. Seamless pure white light-box background, soft even diffused light, short soft shadows, no harsh highlights on the plastic. True-to-life color, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging
```

### 15. Azúcar y edulcorante · `endulzantes.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. Two single-serve paper sachets, each about 7 by 5 centimeters with finely crimped serrated edges on all four sides: behind and slightly to the left, a plain matte white sugar packet rotated about minus 9 degrees; in front, overlapping it, a white sweetener packet with a soft sage-green curved band (hex a9cc8f) across its lower left part, rotated about plus 4 degrees. No printing, no text, no logos on either. The pair is centered and fills about 70 percent of the frame. Seamless very light gray light-box background, soft even diffused light, faint short shadows. True-to-life color, crisp paper texture, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, spilled sugar, coffee cup
```

### 16. Mermeladas · `mermeladas.jpg` (en `categorias/`) · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. Five single-serve jam portion cups, small square plastic tubs about 4 by 4 centimeters with rounded corners and plain brushed-aluminum foil lids with no printing, arranged in a loose diagonal group with even gaps, each tilted a few degrees differently. Four lids are peeled back at one corner to show the flavors: bright strawberry red, golden peach orange, deep plum purple, dark mixed-berry red; the fifth cup stays closed. Group centered, filling about 70 percent of the frame. Seamless pure white light-box background, soft even diffused light, very short soft shadows, no harsh glare on the foil. True-to-life color, glossy jam, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, spoon, toast
```

### 17. Manteca y queso crema · `lacteos.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. Two single-serve dairy portion cups side by side, slightly tilted in opposite directions: on the left a small square white plastic tub with its plain brushed-aluminum foil lid peeled back to reveal smooth bright white cream cheese; on the right an identical tub peeled back to reveal pale creamy yellow butter. Plain lids with no printing. A light sense of freshness: clean, cool, even light, as if just taken from the refrigerator, but no ice, no frost, no props. The pair is centered and fills about 70 percent of the frame. Seamless very light gray light-box background, soft even diffused light, very short soft shadows. True-to-life color, crisp focus, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, knife, bread, ice cubes
```

### 18. Galletitas y tostadas · `galletitas-y-tostadas.jpg` · 4:3

```
Studio product photograph for a wholesale food catalog, shot from directly above. Three single-serve flow-packs with crimped serrated seals on their short ends and no printing: top left, a small warm-beige pack with a clear window showing three round golden sweet biscuits; top right, a clear pack holding two golden toast slices; across the bottom, a long narrow clear pack holding three ladyfinger sponge biscuits in a row. Each pack tilted a few degrees differently, arranged with even gaps, the group centered and filling about 70 percent of the frame. Seamless pure white light-box background, soft even diffused light, short soft shadows, no harsh reflections on the film. True-to-life color, crisp textures, clean and minimal, 4:3 landscape, high resolution.
Negative: logos, brand names, letters, words, numbers, labels with text, watermark, hands, people, table, tablecloth, plate, served food, crumbs, clutter, props, dramatic shadows, strong reflections, gradient background, colored background, vignette, blur, low resolution, distorted packaging, loose biscuits, coffee cup
```

---

## Qué no hace falta generar

- **La portada del inicio**: el sobre DPI dibujado es la imagen de marca. Más adelante puede ser la foto real del sobre de edulcorante, de frente (no generada: tiene que ser el sobre de verdad).
- **Las imágenes para compartir** (`public/og/`) y el **logo** (`public/logo-dpi.png`): se arman solas con `npm run og`, con la tipografía y los colores del sitio.
- **Depósito, camioneta, equipo**: no van (ver el brief).
