# Pendientes para la reunión con el dueño

Checklist para repasar juntos, ordenada por prioridad. Cada dato se cambia en **una sola línea** del archivo que se indica (detalle en `docs/como-actualizar.md`). Los datos marcados **(S)** en el brief son supuestos: el sitio ya los usa, pero hay que confirmarlos.

---

## 1. Urgente: antes de publicar

- [ ] **El sitio viejo está hackeado.** El WordPress de `dpi-arg.com.ar` tiene escondido un texto con un link a un casino sueco (`tackel.se`). Google lo ve y eso perjudica al dominio. Conviene limpiarlo o darlo de baja ya, sin esperar al sitio nuevo.
- [ ] **Número de WhatsApp real.** Hoy el sitio usa uno de prueba (`5491100000000`) que **no funciona**: todos los botones de WhatsApp, los datos para Google y `llms.txt` salen de ahí. Se cambia en `src/data/empresa.ts` → `whatsapp.numero` (y `numeroVisible`).
- [ ] **¿Quién contesta el WhatsApp?** El sitio dice "te contesta Diego" en casi todas las páginas. Si es otra persona o varias, se cambia en `src/data/empresa.ts` → `whatsapp.atiende`. (Sin foto de Diego por ahora.)
- [ ] **Mail de contacto.** El sitio usa `ventas@dpi-arg.com.ar`. En los sobres impresos figuran dos: `ventas@` (azúcar) y `contacto@` (edulcorante). ¿Cuál se usa? ¿Llegan los dos? → `src/data/empresa.ts` → `email`.
- [ ] **Dominio.** ¿Quién administra `dpi-arg.com.ar` y dónde están los DNS? Hace falta para publicar el sitio nuevo en Cloudflare Pages o Netlify (pasos en `docs/como-actualizar.md`).

## 2. Datos del negocio a confirmar (S)

**Entregas** (`src/data/entregas.ts`)
- [ ] Morón: ¿el reparto es los **jueves**?
- [ ] Zona Norte: ¿el reparto es los **martes**? ¿Qué localidades entran en "Zona Norte"? (El depósito está en Florida, que es Zona Norte.)
- [ ] **Hasta qué hora se puede pedir.** En Capital, el sitio calcula "si pedís ahora, llegaría el…" suponiendo que lo que se pide **antes de las 16 h** de un día hábil llega al día hábil siguiente. En Morón y Zona Norte supone que hay que pedir **hasta el día anterior** al reparto. ¿Es así?
- [ ] **Los lácteos "viajan en frío".** El brief solo dice "Lácteos (frío)". El sitio dice que la manteca y el queso crema viajan en frío y llegan fríos a tu negocio (cabecera de lácteos, entregas, preguntas frecuentes, la caja de productos). ¿Es correcto? Si no, hay que suavizarlo.

**Productos y marcas** (`src/data/productos.ts`)
- [ ] Azúcar: ¿marca **Abedul**? En el sitio viejo hay un sobre "Atenas" con el dorso impreso por DPI: ¿el azúcar también es de línea propia?
- [ ] Nombre de la línea propia de edulcorante: hoy dice "**Edulcorante DPI**" (el sobre dice "DPI · Edulcorante" y el dorso "Endulcina").
- [ ] Queso crema: ¿**Abedul**? · Manteca: ¿**Dánica**? · Galletitas: ¿**Abedul**?
- [ ] Tostadas: hoy van **sin marca**. En el sitio viejo aparecen tostadas Breviss: ¿siguen siendo esas?
- [ ] Productos del sitio viejo que no están en el brief: sal, pimienta, aceite, vinagre, jugo de limón, salsa de soja, aderezo César, miel, dulce de leche, jalea de membrillo, leche, té, submarino; aderezos Dánica; galletitas Granix, María Elena, Maurita. ¿Alguno se sigue vendiendo y conviene mostrarlo?
- [ ] ¿Venden a **oficinas**? La versión anterior del sitio las nombraba (sin respaldo en el brief) y se sacaron. Si es un cliente real, se pueden sumar en azúcar y edulcorante.

**Clientes y contacto** (`src/data/empresa.ts`, `src/data/horario.ts`)
- [ ] ¿Se puede publicar "**más de 200 clientes**"? Hoy aparece en el pie de todas las páginas. Para ocultarlo: `clientesPublicables: null`.
- [ ] Feriados en los que no se atiende (para el cartel "atendiendo ahora"): hoy no hay ninguno cargado.
- [ ] Ficha de **Google Maps**: ¿existe? Si no, conviene crearla (ayuda mucho en búsquedas de la zona). Pasar el link.
- [ ] **Instagram**: ¿hay cuenta? Pasar el link.
- [ ] Código postal y coordenadas del depósito (para los datos que lee Google).

## 3. Redacción para que el dueño valide

Frases que el sitio dice y que no están en el brief. Son razonables para el rubro, pero conviene que el dueño las lea. Están en `src/components/productos/textos.ts` (los "para qué se usa") y en los archivos que se indican.

- [ ] **Para qué se usa cada producto** (páginas de cada familia):
  - Mayonesa: la hamburguesa y el pedido para llevar en bares y rotiserías.
  - Ketchup: las papas fritas y la hamburguesa en el bar; el almuerzo en la clínica.
  - Mostaza: el pancho y el choripán en kioscos y puestos de comida.
  - Salsa golf: el sándwich y la ensalada en el bar; el almuerzo y la cena en la clínica.
  - Edulcorante: el café para llevar en kioscos; en clínicas, "para quien no toma azúcar".
  - Galletitas: las sin sal, "para quien no puede comer sal".
  - Mermeladas: el desayuno con tostadas o medialunas en bares y confiterías.
  - Mermelada surtida: "que las bandejas no lleven todas el mismo sabor" (clínicas) y "la canastita del desayuno, para que cada uno elija" (confiterías).
  - Vainillas: la merienda en clínicas y geriátricos; el café con leche de la tarde en el bar.
- [ ] **El té.** El sitio pone el azúcar y el edulcorante con "el café y el té" (comercios, la caja de productos) y la merienda "con el té o el café con leche" (galletitas). El brief solo habla del café.
- [ ] **"Avisanos antes y te lo dejamos preparado"** (retiro en el depósito, en entregas, contacto y preguntas). El brief dice que se puede retirar en el mismo horario, pero no que haya que avisar.
- [ ] **"Escribís «Hola, buen día» y dejás el pedido, como hacen hoy nuestros clientes"** (clínicas). Sale del brief, pero nombra a los clientes actuales: confirmar que no le moleste.
- [ ] **"Es el número que está impreso en el sobre de edulcorante"** (contacto). Sale de la foto del sobre: confirmar que sigue siendo así en los sobres nuevos.
- [ ] **"Contestamos en minutos"** y **"si escribís fuera de horario, te contestamos a primera hora"**: son las frases del brief; solo confirmar que se pueden sostener.

## 4. Decisiones de diseño

- [ ] **Logo.** El sitio usa una propuesta de renovación del wordmark "DPI" (misma estructura que el actual: esfera, DPI, línea y "Productos Individuales"). Hay que elegir entre el **punto sólido de color** (el que se ve hoy) y la **esfera tramada** (dirección A). Si se aprueba, conviene actualizar también los sobres impresos.
- [ ] **Dirección visual.** Se eligió **B · Color de sobre** (cada familia con el color de su envase), con piezas de C (el reloj de atención, la hoja de ruta). Las tres propuestas están en `docs/capturas/fase-1/`. Se puede revisar.

## 5. Fotos

- [ ] **Fotos reales de producto**: 13 de producto y 5 de grupo por familia. Mientras no estén, el sitio usa los envases dibujados (no hay ningún hueco vacío). Cómo sacarlas con el celular: `docs/fotos/guia-fotos-reales.md`. Si prefieren generarlas con IA mientras tanto: `docs/fotos/prompts.md`. Para activarlas alcanza con dejar el archivo en `src/assets/productos/` con el nombre del producto (`docs/diseno.md`, "Cómo activar una foto").

## 6. Para publicar y después

- [ ] **Vista previa**: activar GitHub Pages en el repositorio (Settings → Pages → Source: "GitHub Actions"). Una sola vez.
- [ ] **Publicar**: elegir Cloudflare Pages o Netlify, conectar el dominio y enviar `sitemap.xml` en Google Search Console (pasos en `docs/como-actualizar.md`).
- [ ] **QR de la lista de precios impresa**: sumar `docs/qr/lista-qr.svg` (o la tarjeta `lista-qr-imprimir.pdf`) a la próxima tirada y probarlo con varios celulares. Lleva a `/lista/`.
- [ ] **Medir en el dominio real** con PageSpeed Insights (en local da 99–100; ver `docs/auditoria.md`).
