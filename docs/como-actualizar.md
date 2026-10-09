# Cómo actualizar el sitio

Guía para cambiar los datos del sitio sin saber programar. Casi todo se cambia editando **una línea** en un archivo de la carpeta `src/data/`, y el cambio aparece solo en todas las páginas: en los textos, en los botones de WhatsApp, en las preguntas frecuentes, en lo que leen Google y las IA (`llms.txt`, datos estructurados) y en el pie.

## Antes de empezar

**Dónde se edita.** Hay dos formas:

- **En GitHub, desde el navegador** (lo más simple para un cambio chico): abrí el archivo en github.com, tocá el lápiz ("Edit this file"), cambiá la línea y abajo tocá "Commit changes". Si el sitio está conectado a Cloudflare Pages o Netlify, se publica solo en un par de minutos.
- **En la compu**, para ver el cambio antes de publicarlo (ver "Probar el sitio en la compu", más abajo).

**Tres cuidados al editar** (son los errores más comunes):

1. Los textos van **entre comillas simples**: `'Diego'`. Si el texto lleva un apóstrofo, usá comillas dobles: `"Dino's"`.
2. Cada línea de dato termina con **coma**: `atiende: 'Diego',`
3. Lo que está después de `//` es un comentario: se puede leer y borrar, no cambia nada.

Después de cada cambio conviene correr `npm run build` (o mirar que la publicación automática no haya fallado): si hay un error de tipeo, avisa ahí.

---

## Cambiar el WhatsApp

Archivo: `src/data/empresa.ts`

```ts
  whatsapp: {
    numero: '5491100000000', // ← el número, solo dígitos, con 549 adelante (54 = Argentina, 9 = celular)
    numeroVisible: '11 0000-0000', // ← cómo se escribe en pantalla (hoy no se muestra en ningún lado)
    atiende: 'Diego', // ← quién contesta
  },
```

Ejemplo: para el celular `11 5555-1234`, la línea queda `numero: '5491155551234',`.

Cambia todos los botones de WhatsApp, el flotante del celular, los datos para Google y `llms.txt`. **El número de hoy es de prueba y no funciona**: es lo primero que hay que cambiar antes de publicar.

## Cambiar quién atiende

Mismo archivo, `atiende: 'Diego',`. Cambia "Escribile a Diego", "Te contesta Diego", los mensajes y las preguntas frecuentes. Después corré `npm run og` (las imágenes para compartir dicen "Te contesta Diego").

## Horario y feriados

Archivo: `src/data/horario.ts`

```ts
  dias: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'], // ← días de atención (sin tildes: miercoles, sabado)
  abre: '05:00', // ← hora de apertura, siempre con dos dígitos
  cierra: '16:00',
  feriados: [], // ← días sin atención
```

**Feriados:** van como fecha `'AAAA-MM-DD'`, separadas por coma. Ese día el cartel "Estamos atendiendo" dice que se arranca al día siguiente.

```ts
  feriados: ['2026-12-25', '2027-01-01'],
```

Si cambia el horario, corré también `npm run og` (las imágenes para compartir dicen "desde las 5:00").

## Zonas, días de reparto y pedido mínimo

Archivo: `src/data/entregas.ts`. Cada zona es un bloque entre llaves `{ … }`; el orden es el que se muestra.

Ejemplo: si el reparto de Morón pasa del jueves al miércoles, cambiá **solo** esta línea:

```ts
    dias: ['jueves'], // (S)
```

por

```ts
    dias: ['miercoles'],
```

Y se actualiza en el selector "¿Qué día llegamos a tu zona?", la hoja de ruta, las preguntas frecuentes ("A Morón vamos los miércoles…"), las descripciones para Google y `llms.txt`.

- Dos días: `dias: ['martes', 'viernes'],`
- Todos los días hábiles: `dias: 'habiles',`
- A coordinar: `dias: 'consultar',`
- Pedido mínimo: `pedidoMinimo: 'sin mínimo si pedís para el día de reparto',` (se escribe como se lee en la página).
- Qué abarca la zona: `detalle: 'Vicente López, San Isidro y Olivos',` (opcional).

**Zona nueva:** copiá un bloque entero (desde `{` hasta `},`), pegalo donde quieras que aparezca y cambiale `id` (una palabra sin espacios ni tildes, por ejemplo `'san-martin'`), `zona`, `dias` y `pedidoMinimo`.

## Productos y marcas

Archivo: `src/data/productos.ts`

**Cambiar una marca:** buscá el producto y cambiá `marca`. Ejemplo, si el azúcar pasa a ser de otra marca:

```ts
  { slug: 'azucar', nombre: 'Azúcar', categoria: 'endulzantes', marca: 'Abedul' },
```

→ `marca: 'Ledesma'`. Si es una marca nueva, sumala también a la lista `marcas` del mismo archivo (al final): `{ slug: 'ledesma', nombre: 'Ledesma' },`.

**Sumar un producto:** copiá la línea de uno parecido y cambiá los datos:

```ts
  { slug: 'miel', nombre: 'Miel', categoria: 'mermeladas', marca: 'Abedul' },
```

- `slug`: el nombre corto, en minúsculas, sin tildes ni espacios (es también el nombre de su foto: `miel.jpg`).
- `categoria`: una de `aderezos`, `endulzantes`, `mermeladas`, `lacteos`, `galletitas-y-tostadas`.
- Opcionales: `masVendido: true` (aparece en "lo que más sale"), `nota: 'Viene creciendo'`, `variantes: ['frutilla', 'durazno']` (sabores), `gramaje: '10 g'`, `unidadesPorCaja: 200`.

Si sumás un producto, conviene contarle a quien mantiene el sitio: algunos textos de la página de su categoría ("para qué se usa") se escriben a mano en `src/components/productos/textos.ts`.

**Sacar un producto:** borrá su línea entera.

## Mail, teléfono, dirección, Instagram y Google Maps

Archivo: `src/data/empresa.ts`

```ts
  telefono: '+54 11 4730-4423', // ← como se muestra: el sitio lo convierte solo para el link "llamar"
  email: 'ventas@dpi-arg.com.ar',
  instagram: null, // ← 'https://www.instagram.com/usuario/' cuando exista
  googleMaps: null, // ← el link a la ficha de Google Maps cuando exista
```

Instagram y Google Maps aparecen solos (en contacto y en los datos para Google) cuando dejan de ser `null`. La dirección (`calle`, `localidad`, `partido`) tiene que ser **idéntica** a la de la ficha de Google Maps.

Si cambian el teléfono o la dirección, corré también `npm run og` y `npm run qr`.

## Preguntas frecuentes

Archivo: `src/data/faq.ts`. Cada pregunta es un bloque:

```ts
  {
    grupo: 'pedidos', // ← tema: 'pedidos', 'pagos' o 'productos'
    pregunta: '¿Hacen envíos los sábados?',
    respuesta: 'No. Repartimos de lunes a viernes. Si necesitás algo para el sábado, pedilo hasta el viernes a la mañana.',
  },
```

- La **primera oración** de la respuesta es la respuesta corta (la página la resalta en verde): que conteste sola.
- Las respuestas que ya están usan los datos con `${…}` (por ejemplo `${atiende}` es "Diego", `${atencion}` es "de lunes a viernes de 5 a 16 h"). Esas van entre comillas invertidas `` ` `` en lugar de simples. Si no te animás, escribí la tuya entre comillas simples y con el dato a mano.
- Lo que se escribe acá es exactamente lo que ve la gente y lo que lee Google (no hay que tocar nada más).

## Los mensajes de WhatsApp

Archivo: `src/data/mensajes.ts`. Son los textos que le llegan a quien atiende cuando alguien toca un botón ("Hola, buen día. ¿Me pasan la lista de precios?"). Se pueden cambiar libremente; `{producto}` y `{zona}` se completan solos.

## Fotos

- **De producto:** `src/assets/productos/<slug>.jpg` (por ejemplo `mayonesa.jpg`). Aparecen solas en lugar del dibujo.
- **De grupo por familia:** `src/assets/categorias/<categoria>.jpg` (por ejemplo `aderezos.jpg`). Se usan en la imagen para compartir: después corré `npm run og`.
- Cómo sacarlas: `docs/fotos/guia-fotos-reales.md`. Prompts para generarlas con IA mientras tanto: `docs/fotos/prompts.md`.
- Para reemplazar una foto, pisá el archivo con el mismo nombre.

---

## Probar el sitio en la compu

Hace falta [Node.js](https://nodejs.org) versión 22 o más nueva (una sola vez).

```sh
npm install        # la primera vez, o cuando cambian las dependencias
npm run dev        # abre el sitio en http://localhost:4321 y se actualiza solo al guardar
```

Antes de publicar:

```sh
npm run build      # arma el sitio en la carpeta dist/ (tiene que terminar sin errores)
npm run revisar    # busca links rotos, textos repetidos para Google y errores en los datos para buscadores
npm run capturas -- prueba   # (opcional) saca capturas de todas las páginas en docs/capturas/prueba/
```

## Imágenes para compartir (las que aparecen al mandar un link)

Cuando alguien comparte un link del sitio por WhatsApp o en redes, aparece una imagen con el logo, un titular y un dato ("Te contesta Diego desde las 5:00"). Están en `public/og/` y se arman solas desde los datos:

```sh
npm run og
```

Corré esto (y commiteá los PNG nuevos) cuando cambien: quién atiende, el horario, el teléfono, las marcas, los días de reparto, o cuando sumes fotos de grupo. También rehace `public/logo-dpi.png`, el logo que usa Google. Los titulares de cada imagen están en `src/lib/paginas.ts`.

## El QR de la lista de precios

El QR lleva a `https://dpi-arg.com.ar/lista/`, una página pensada para el celular con el botón de WhatsApp. Está en `docs/qr/`:

- `lista-qr.svg` y `lista-qr.png`: el código solo, para pegar en el archivo de la lista de precios (el SVG se puede agrandar sin perder calidad; el PNG tiene 2048 px).
- `lista-qr-imprimir.pdf` (y `.png`): una tarjeta de 8 × 11 cm con el logo y "Escaneá y escribile a Diego por WhatsApp", lista para imprimir o mandar a la imprenta.

Para rehacerlo (por ejemplo, si cambia el dominio o quién atiende):

```sh
npm run qr
```

Consejos para imprimirlo: que el código mida **al menos 2,5 cm** de lado, en negro sobre blanco, sin estirarlo, y con el margen blanco alrededor. Probalo con un par de celulares antes de imprimir muchas.

---

## Publicar el sitio

El sitio es una carpeta de archivos (`dist/`): se publica gratis en **Cloudflare Pages** o **Netlify**, conectados al repositorio de GitHub. Cada cambio que se guarda en GitHub se publica solo.

### Cloudflare Pages

1. En dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → elegí el repositorio.
2. Configuración:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variables de entorno: `NODE_VERSION` = `22`
3. **Save and Deploy**. Te da una dirección de prueba (`algo.pages.dev`) para mirar el sitio.
4. **Custom domains** → **Set up a custom domain** → `dpi-arg.com.ar` (y también `www.dpi-arg.com.ar`). Si el dominio ya está en Cloudflare, se configura solo; si no, Cloudflare te dice qué registro DNS cargar donde esté el dominio (NIC Argentina o el proveedor).

### Netlify

1. En app.netlify.com → **Add new site** → **Import an existing project** → GitHub → elegí el repositorio.
2. Build command: `npm run build` · Publish directory: `dist` · en **Environment variables**, `NODE_VERSION` = `22`.
3. **Deploy**. Después, **Domain management** → **Add a domain** → `dpi-arg.com.ar`, y seguí los pasos de DNS.

En los dos casos **no** hay que configurar nada más: las redirecciones del sitio viejo (`public/_redirects`) y los encabezados (`public/_headers`) se leen solos. No pongas `BASE_PATH` ni `SITE_URL`: el sitio va en la raíz del dominio.

### Después de publicar (una vez)

- **Google Search Console** (search.google.com/search-console): agregá el dominio y enviá el mapa del sitio: `https://dpi-arg.com.ar/sitemap.xml`.
- **Google Maps** (Perfil de Empresa de Google): que el nombre, la dirección y el teléfono sean idénticos a los del pie del sitio, y poné el link del sitio. Después cargá el link de la ficha en `googleMaps` (ver arriba).
- Probá desde el celular: el botón de WhatsApp, el QR impreso y que `https://dpi-arg.com.ar/index.php/contacto/` lleve a la página de contacto nueva.

## Vista previa en GitHub Pages

Además del sitio real, el repositorio puede publicar una **vista previa** en `https://facu-sh.github.io/PaginaPruebaFabela/`, útil para mostrar cambios antes de pasarlos al dominio. No compite con el sitio real en Google: todas sus páginas dicen "no indexar".

**Para activarla, una sola vez:** en GitHub → el repositorio → **Settings** → **Pages** → **Build and deployment** → **Source**: elegí **"GitHub Actions"**.

Desde ahí se publica sola con cada cambio en la rama `main`, o a mano: pestaña **Actions** → **Vista previa** → **Run workflow**. La receta está en `.github/workflows/vista-previa.yml` (compila con `BASE_PATH=/PaginaPruebaFabela/`, `SITE_URL=https://facu-sh.github.io` y `VISTA_PREVIA=1`).

Para probar la vista previa en la compu:

```sh
BASE_PATH=/PaginaPruebaFabela/ SITE_URL=https://facu-sh.github.io VISTA_PREVIA=1 npm run build
BASE_PATH=/PaginaPruebaFabela/ SITE_URL=https://facu-sh.github.io VISTA_PREVIA=1 npm run revisar
```

---

## Dónde está cada cosa (resumen)

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, quién atiende, teléfono, mail, dirección, Instagram, Google Maps | `src/data/empresa.ts` |
| Días y horario de atención, feriados | `src/data/horario.ts` |
| Zonas, días de reparto, pedido mínimo | `src/data/entregas.ts` |
| Facturación y formas de pago | `src/data/pagos.ts` |
| Productos, marcas, sabores | `src/data/productos.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |
| Mensajes de WhatsApp | `src/data/mensajes.ts` |
| Fotos | `src/assets/productos/` y `src/assets/categorias/` |
| Titulares de las imágenes para compartir y resumen de cada página para `llms.txt` | `src/lib/paginas.ts` |
| Redirecciones del sitio viejo | `public/_redirects` |
| Lo que falta confirmar | `docs/pendientes.md` |
