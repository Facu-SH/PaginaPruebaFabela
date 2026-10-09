# Sistema de diseño · DPI

Dirección elegida: **B · Color de sobre**, con piezas funcionales de C (tablero de atención, remito, hoja de ruta) y escenas de A, traducidas a este lenguaje. Decisión: `docs/direcciones/resumen.md`. El código de las tres direcciones de la fase 1 quedó en el historial de git (commit `737c971` y anteriores).

Todo se ve en **`/sistema/`** (noindex): tokens, contrastes y cada componente con sus variantes y estados.

## Concepto

1. **Abrir la caja.** DPI vende cosas chicas, de colores y que vienen de a muchas: el sitio está hecho con eso.
2. **Una categoría = un color**, el de su envase: amarillo mayonesa, verde del sobre DPI, rojo frutilla, crema manteca, tostado galletita.
3. **El producto es la interfaz:** los envases dibujados en su formato real, los botones son sobres crimpados, el pie es el dorso del sobre.
4. **Una sola tipografía argentina** en tres anchos: expandida negra para gritar, condensada para la letra chica.
5. **El reloj de las 5 de la mañana** es una pieza propia (el tablero), no una pastilla de "online".

## Tipografía

**Archivo** (Omnibus-Type, Buenos Aires · OFL), variable en peso (100–900) y ancho (62–125 %).

| Voz | Ajuste | Uso | Clase / elemento |
|---|---|---|---|
| Expandida negra | `font-stretch: 125%`, 900, interlineado 0.94, −0.02em | Titulares, nombres de categoría, la hora del tablero | `h1`–`h3`, `.t-display` |
| Rótulo | 125 %, 700, versalitas, +0.14em, 12 px | Antetítulos, marcas, etiquetas de datos (el "E D U L C O R A N T E" del sobre) | `.t-rotulo` |
| Texto | 100 %, 400–700 | Párrafos, listas, botones (botones a 112 %) | `body` |
| Condensada | 68–75 %, 600–800 | Letra chica: el dorso, la bandeja, la cuenta regresiva | `.t-condensada` |

**Por qué:** es de una fundidora porteña (una distribuidora de barrio con 25 años habla con una letra de acá); el eje de ancho da todo el contraste tipográfico con **un solo archivo**; en negra expandida tiene el peso de un envase de supermercado y en ancho normal es una grotesca muy legible. Ninguna de las prohibidas de `CLAUDE.md`.

**Carga:** `src/components/Fuente.astro` declara a mano un `@font-face` con **solo el subset latin** (`archivo-latin-wdth-normal.woff2`, 90 KB) importado con `?url`, `font-display: swap` y `<link rel="preload">`. `dist/` tiene un único archivo de fuente. No hay itálicas: no se usan. Ojo: la flecha "→" no está en el subset latin; por eso las flechas son SVG (botones) o una máscara CSS (`.link-flecha`).

**Escala fluida** (390 → 1440 px), en `tokens.css`: `--t-titulo-1` 36→92 px, `--t-titulo-2` 36→84, `--t-titulo-3` 22→32, `--t-texto-grande` 19→24, `--t-texto` 17→19, `--t-chico` 13, `--t-rotulo` 12, `--t-gigante` 68→168 (la hora).

## Paleta

Los hex viven **solo** en `src/styles/tokens.css`; `src/lib/paleta.ts` los lee de ahí (theme-color y tabla de `/sistema/`). El mapeo categoría → color está en `src/lib/color.ts`.

| Rol | Token | Hex | Texto encima | Contraste |
|---|---|---|---|---|
| Neutro | `--tinta` | `#181613` | papel | 17,3 : 1 |
| Neutro | `--tinta-suave` | `#4a453d` | (es texto, solo sobre papel) | 9,1 sobre papel · 8,0 sobre papel hondo |
| Neutro | `--papel` | `#fbfaf6` | tinta | 17,3 |
| Neutro | `--papel-hondo` | `#efebe1` | tinta | 15,2 |
| Neutro | `--blanco` | `#ffffff` | tinta | 18,1 |
| Aderezos | `--mayonesa` | `#f4e13b` | tinta | 13,5 |
| Endulzantes y voz de DPI | `--verde` | `#a9cc8f` | tinta | 10,1 (también verde sobre tinta: 10,1) |
| Mermeladas | `--frutilla` | `#c41f3a` | **papel** | 5,6 (tinta encima: 3,1, no) |
| Lácteos | `--manteca` | `#f5e5a6` | tinta | 14,3 |
| Galletitas y tostadas | `--galletita` | `#c98b4b` | tinta | 6,3 |
| Solo envases | `--env-ketchup` `#d3271c` · `--env-mostaza` `#d99a1e` · `--env-golf` `#eb7a2a` · `--env-durazno` `#f2993e` · `--env-ciruela` `#4d2149` · `--env-frutos-rojos` `#7e1b33` · `--env-aluminio` `#e4e1d9` · `--env-aluminio-dorso` `#c9c5bb` · `--env-cafe` `#7a4a24` · `--env-pan` `#e3ad68` · `--env-salchicha` `#a8492b` | | | no llevan texto del sitio |

## Reglas de uso

**Color**
- **Una categoría = un color.** Solo los cinco colores de categoría pintan bloques. Los de envase (ketchup, durazno…) viven únicamente dentro de los dibujos.
- **Bloque de color** cuando el bloque *es* de esa categoría (su compartimento, la cabecera de su página, la faja de su rubro en el remito). El **verde** es además la voz de DPI: portada de la home, lista de precios, día de reparto, ventana de atención.
- **Papel** para leer: listas, explicaciones, formularios, tablas.
- **Tinta** para lo que se tiene que destacar sin ser de una categoría: el tablero de atención, las cenefas de "lo que más sale", las fichas de zona, comercios. Sobre tinta, el texto va en papel y los datos clave en verde.
- **Nunca** texto blanco sobre amarillo, verde o manteca; **nunca** texto tinta sobre frutilla.
- **Color de página** (`colorPagina` en el layout): el punto del wordmark y la marca de la sección actual en el menú. Es un **relleno**, nunca color de texto. Convención: `dpi` (verde) para home, clínicas, comercios, entregas, preguntas, contacto y lista; la categoría en cada `/productos/<slug>/`; `dpi` en `/productos/`.

**Forma**
- **El sobre crimpado (`Boton`) es solo para acciones de contacto** (WhatsApp, mail). La navegación interna va con `.link-flecha`: así nadie confunde "ir a otra página" con "abrir WhatsApp".
- El **dentado** se usa en tres lugares: botones, fichas oscuras (`.dentado-arriba-abajo`) y como filo entre dos bloques (`.filo`, `.filo--arriba`). En ningún otro.
- No hay sombras difusas ni degradés: el relieve es el trazo de tinta de 2 px.
- No hay grillas de tarjetas iguales: la caja tiene compartimentos de distinto tamaño; en una categoría, alterná una `TarjetaProducto` grande y varias normales.

**Atención y WhatsApp**
- **Tablero de atención:** una sola aparición destacada por página (la home lo tiene bajo la portada; `/contacto/` y `/lista/` son buenos lugares). La versión compacta ya está en el pie: no la sumes en otro lado.
- **Botón principal** (`BotonWhatsApp variante="principal"`): uno por pantalla, el de la acción de la página. Mientras alguno está a la vista, el **flotante** del celular se esconde; cuando no, aparece abajo a la derecha. No hace falta hacer nada: el layout lo incluye.
- El número de WhatsApp **no se muestra nunca** (los botones dicen a quién le escribís). El fijo sí: "Tel.: 4730-4423".
- "Si no lo ves, preguntanos" va **una vez por página** (el compartimento vacío de `CajaCategorias`). "Consultá disponibilidad", como mucho una.

**Texto en componentes:** todo dato (marcas, zonas, días, horario, teléfono) sale de `src/data/`. Los componentes solo agregan redacción.

## Layout

`src/layouts/Sitio.astro` (usa `Base.astro`): fuente, tokens, `<head>` (title, description, canonical, Open Graph, theme-color del color de página, favicon), saltar al contenido, sprite de envases, encabezado, `<main id="contenido">`, pie y flotante.

```astro
<Sitio
  title="Sobres de mayonesa, ketchup y mostaza individuales · DPI"
  description="…una o dos oraciones con datos concretos…"
  colorPagina="aderezos"
  whatsapp={{ contexto: 'producto', vars: { producto: 'aderezos' } }}
>
  <Migas items={[{ nombre: 'Productos', href: '/productos/' }, { nombre: 'Aderezos' }]} />
  …
</Sitio>
```

Props: `title` (completo, "Qué es · DPI"), `description`, `colorPagina` (`'dpi'` o slug de categoría), `noindex`, `imagenOG` y `imagenOGAlt` (fase 4: ruta del sitio, se resuelve contra `Astro.site`), `whatsapp` (mensaje del botón del encabezado y del flotante).

Clases globales útiles (`base.css`): `.contenedor`, `.t-display`, `.t-rotulo`, `.t-condensada`, `.t-grande`, `.t-lectura`, `.cifras`, `.link-flecha`, `.fondo-tinta`, `.fondo-frutilla` (invierten el foco), `.dentado-*`, `.filo`, `.solo-js` / `.sin-js`, `.visually-hidden`.

## Componentes

| Componente | Para qué | Props principales |
|---|---|---|
| `Wordmark` | Logo en contornos; el punto toma el color de la página | `colorPunto`, `colorTinta`, `bajada`, `decorativo`, `inline` |
| `Encabezado` / `Pie` | Los pone el layout. Menú `<details>` en el celular; el pie es el dorso del sobre con el NAP | — |
| `Boton` | Sobre crimpado para contacto (mail, teléfono) | `href`, `tamano` (grande/normal/chico), `tono` (tinta/papel), `externo`, `ancho` |
| `BotonWhatsApp` | WhatsApp con mensaje según contexto | `variante` (principal/secundario/compacto), `contexto`, `vars`, `texto`, `tono` |
| `WhatsAppFlotante` | Lo pone el layout (celular) | `contexto`, `vars` |
| `TableroAtencion` | Hora de Buenos Aires, estado, franja 0–24 h, cuenta regresiva, "te contesta Diego" | `variante` (destacado/compacta), `fecha` (prueba), `boton`, `id` |
| `Envase` | Un envase dibujado (almohadilla, sobre de papel, pote, paquete) | `producto`, `sabor`, `formato`, `clave`, `etiqueta`, `detalle`, `trazo`, `titulo` |
| `FotoOEnvase` | Foto si existe, si no el dibujo | `producto`, `sabor`, `alt`, `sizes`, `ancho`, `soloDibujo` |
| `CajaCategorias` + `TarjetaCategoria` | La caja con compartimentos, cada uno link a su categoría | `variante` (compacta/completa), `vacio`, `nivel` |
| `TarjetaProducto` | Un producto en su color con la cenefa | `producto`, `tamano` (grande/normal) |
| `FilaProducto` | La fila de envases repetidos de "lo que más sale" | `producto`, `cantidad`, `dato` |
| `BloqueDato` | Un dato grande y su aclaración | `dato`, `aclaracion`, `rotulo`, `tamano` |
| `ListaPreciosCTA` | Pedir la lista por WhatsApp o mail | `variante` (bloque/en-linea), `titulo`, `id` |
| `SelectorZona` | Zona → día, mínimo, próxima fecha y WhatsApp con la zona | `fecha`, `id`, `nivel` |
| `HojaDeRuta` | Tabla zonas × días con la columna de hoy | `fecha` |
| `ArmaTuConsulta` | El remito que arma el mensaje de WhatsApp | `titulo`, `id` |
| `BandejaClinica` | "Una porción para cada comida" | `variante` (grande/compacta), `nivel` |
| `EscenaUso` | El café y el pancho (comercios) | `tipo` (cafe/pancho) |
| `Migas` | Migas de pan visibles | `items` |

Todo funciona sin JS: el tablero muestra el horario, el selector muestra las cuatro fichas, la consulta muestra la lista y un botón de WhatsApp genérico, el flotante queda siempre visible. Los scripts están en `src/scripts/` y se cargan solo en las páginas que usan el componente.

## Dirección de fotografía

Las fotos (reales con celular y caja de luz, oficiales de proveedores o generadas en la fase 4) tienen que poder **reemplazar al dibujo sin cambiar el diseño**:

- **El producto solo, recortado o sobre fondo neutro claro** (blanco o gris muy claro de caja de luz), sin ambientación: nada de mesas de bar, bandejas de clínica, manos ni escenas. El color de la categoría lo pone el bloque, no la foto.
- **Luz pareja y suave**, de caja de luz o día nublado junto a la ventana; sombra corta y apenas marcada debajo, sin reflejos fuertes en el plástico ni en el aluminio de los potes.
- **Encuadre frontal o cenital**, como los dibujos: la almohadilla parada o acostada de frente, el sobre de papel de frente, el potecito visto de arriba (que se vea el sabor), el paquetito de frente. El producto ocupa ~70 % del cuadro, centrado, con aire parejo alrededor.
- **Relación de aspecto 4:3** (horizontal) para tarjetas; 1:1 sirve para potes y sobres. Mínimo 1200 px de lado largo; el sitio genera los tamaños.
- **Uno o una pila de tres**, nunca un montón desordenado. Para las filas de "lo que más sale" se siguen usando los dibujos (la repetición es el punto): no mezclar foto y dibujo en una fila.
- **Marcas ajenas:** en las fotos reales el envase es el que es; en las generadas con IA, **sin logos ni texto legible**.
- **Cómo conviven con los bloques de color:** la foto va adentro del compartimento de su categoría (amarillo para aderezos, etc.), centrada sobre el color, sin borde ni marco. El compartimento manda; la foto es el objeto adentro de la caja. Si el fondo de la foto no es transparente, que sea claro y parejo: el borde del recorte queda como una "etiqueta" sobre el color.
- La portada no lleva foto: el sobre DPI dibujado es la imagen de marca (más adelante puede ser la foto real del sobre, de frente).

## Cómo activar una foto

1. Guardá la foto en `src/assets/productos/` con el **slug del producto** como nombre: `mayonesa.jpg`, `edulcorante.png`, `mermeladas.webp`, `vainillas.jpg`… Los slugs están en `src/data/productos.ts`.
2. Recompilá (`npm run build`). `FotoOEnvase` la encuentra con `import.meta.glob`, genera AVIF y WebP en varios tamaños y la muestra en lugar del dibujo. No hay que tocar código.
3. Para reemplazarla, pisá el archivo. Si un producto necesita otro nombre de archivo, completá `foto` en `src/data/productos.ts` (por ejemplo `foto: 'mayonesa-natura.jpg'`).

Sirven `.jpg`, `.jpeg`, `.png`, `.webp` y `.avif`. El texto alternativo sale solo ("Mayonesa Natura en porción individual").
