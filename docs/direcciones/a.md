# Dirección A · Almacén de confianza

Home completa en `/direcciones/a/` (`src/pages/direcciones/a/index.astro`; componentes, estilos y helpers en `src/direcciones/a/`).
Capturas: `docs/capturas/fase-1/direcciones-a--mobile.jpg`, `--desktop.jpg` y `--cerrado-mobile.jpg` (primera pantalla fuera de horario).

## Concepto

**El sobre es la tarjeta personal de DPI.** Hace 25 años que DPI imprime su nombre, su esfera y su teléfono en sobres de papel con borde dentado, a una o dos tintas, con un marco de esquinas redondeadas. Esta dirección toma ese objeto real como materia de diseño y arma el sitio como una imprenta de barrio bien hecha: papel crema, kraft, tinta azul-negra, el verde del sobre de edulcorante, el rojo de un sello de goma y filetes tipográficos.

El tono es el del almacén que te conoce por el nombre: editorial, cálido y preciso. No es vintage: no hay pizarrones, madera, letra manuscrita, texturas sucias ni ornamentos de plantilla. Las piezas son nítidas y planas, con el color de producto levemente fuera de registro, como una impresión a dos tintas.

Recorrido de la home (6 bloques):

1. **Portada.** Un estante en miniatura (solo en el celular, para que el producto esté en la primera pantalla), la oración que responde qué es DPI, la **ficha de atención** (marco del sobre, con el estado "atendiendo ahora" montado sobre el filete como un legend: Diego, desde las 5 de la mañana, WhatsApp y teléfono) y, como objeto, el **sobre de edulcorante DPI** con su dorso y un **sello rojo de las 5:00**.
2. **El estante** (fondo kraft): un estante por categoría con los envases dibujados según su formato real y la **cenefa** (la tira de etiquetas del borde del estante) con producto y marca. Los más vendidos llevan una estampa. Cierra con "Si no lo ves, preguntanos", una sola vez, como etiqueta pegada en el cartón.
3. **Clínicas: "Una porción para cada comida"**: una **bandeja de cuatro huecos** (desayuno, almuerzo, merienda, cena) con las porciones dibujadas, generada desde `comidasClinica`.
4. **Comercios: "Sin mínimo en Capital Federal"**: titular en itálica grande y dos escenas: el pocillo de café con el edulcorante DPI y el azúcar, y el pancho con la mayonesa y el ketchup.
5. **"¿Qué día llegamos a tu zona?"** (fondo tinta): selector de zona y una **hoja de almanaque** con el día en rojo y la semana con los días de reparto sellados. Debajo, el retiro en depósito.
6. **Lista de precios**: un sobre de papel madera con el marco impreso, botones a WhatsApp y mail, y facturación y pagos.
7. **Pie**: el **dorso del sobre** en HTML (borde dentado en CSS, franja crimpada y marco), con nombre, razón social, rubros, teléfono, dirección, mail, horario y "desde 2001".

## Tipografías y por qué

Las tres son de la familia **Alegreya**, de **Huerta Tipográfica (Buenos Aires)**: una distribuidora argentina con 25 años habla con una letra argentina. Licencia OFL, autoalojada con Fontsource.

| Uso | Fuente | Por qué |
|---|---|---|
| Titulares, texto y wordmark | **Alegreya** (variable 400–900, con itálicas) | Serif caligráfica, con ritmo de libro y mucho carácter en los pesos altos. La itálica hace de "segunda voz" (la parte cálida de cada titular). A 900 tiene el peso del "DPI" del logo viejo. |
| Antetítulos, cenefas, sellos, rótulos de datos | **Alegreya SC** (versalitas reales, 500 y 700) | Es la letra de etiqueta: la de la cenefa del estante, el sello de goma y el rótulo de una caja. Versalitas de verdad, no mayúsculas achicadas. |
| Botones, estado, teléfono, datos del sobre | **Alegreya Sans** (400, 500, 700) | La sans hermana: la misma estructura humanista, más clara a tamaños chicos y en botones. Es la letra "impresa" del sobre (EDULCORANTE, TEL.). |

Bitter (también de Huerta) se probó para el "DPI" y se descartó: queda más neutra y rompe la unidad de una sola familia.

Cuerpo a 18 px (19 px en escritorio) por el ojo medio chico de Alegreya; números de estilo antiguo en el texto y alineados en titulares y datos.

## Paleta

Dos tintas de color (la del sobre y la del sello) sobre papel; el color de producto queda solo en los envases.

| Token | Hex | Uso |
|---|---|---|
| `--papel` | `#F3ECDF` | Fondo general (crema, no sepia) |
| `--papel-claro` | `#FBF8F1` | El blanco del sobre, cenefas, tarjetas |
| `--kraft` | `#C9A479` | Fondo del estante (cartón de la caja) |
| `--kraft-claro` | `#DCC29C` | Sobre de la lista de precios; antetítulos sobre tinta |
| `--tinta` | `#1C2230` | Texto, filetes, línea de los dibujos (azul-negro de imprenta) |
| `--tinta-suave` | `#4D5260` | Texto secundario |
| `--verde` | `#1F5B3A` | Botones de WhatsApp (el verde del sobre de edulcorante, oscurecido) |
| `--verde-claro` | `#D3E4C5` | Fondo de comercios; la curva del sobre de edulcorante |
| `--rojo` | `#B0301D` | Sellos de goma, días de reparto, filete de dato |
| `--azul` | `#24527F` | Estampa "Viaja en frío" y marco del sobre de azúcar |
| Producto | `#F2D45C` mayonesa · `#C3322A` ketchup · `#D39B1C` mostaza · `#EC8A5E` golf · `#C42A3C` frutilla · `#EE9A45` durazno · `#5A2747` ciruela · `#7C1F3B` frutos rojos | Solo en los envases dibujados |

Contrastes clave (WCAG, todos AA o más):

| Par | Contraste |
|---|---|
| Tinta sobre papel | 13,5 |
| Tinta suave sobre papel / sobre papel claro | 6,6 / 7,4 |
| Rojo sobre papel / sobre papel claro | 5,4 / 6,0 |
| Rojo de estampa sobre su fondo en el kraft | 4,9 |
| Papel claro sobre botón verde | 7,6 |
| Verde (texto) sobre papel | 6,8 |
| Tinta sobre kraft | 6,9 (**en kraft solo va texto en tinta**: tinta suave, rojo y verde no llegan; por eso las etiquetas van sobre papel) |
| Tinta sobre kraft claro / sobre verde claro | 9,3 / 11,9 |
| Papel sobre tinta (sección de entregas, pie) | 13,5 |
| Azul sobre papel claro | 7,7 |

Foco visible: contorno de 3 px en tinta (en papel claro sobre las secciones oscuras).

## Tratamiento de imágenes

**Hoy, sin fotos**, la página se ve terminada con ilustración propia en SVG, generada desde los datos:

- **Envases según su formato real** (`Envase.astro` + `envases.ts`): sobre almohadilla con extremos crimpados (aderezos), sobre de papel con los cuatro bordes dentados y franja de pliegues (azúcar y edulcorante), potecito con tapa pelable y lengüeta (mermeladas, manteca y queso crema), paquetito flow-pack con ventana (galletitas, vainillas, tostadas).
- **Estilo**: línea de tinta de grosor constante (`vector-effect: non-scaling-stroke`) y el color desplazado 1 o 2 px, como un pliego impreso a dos tintas con el registro apenas corrido. Sombra corta de objeto apoyado.
- **Sin logos ajenos**: los sobres de Natura o los potes de Abedul se dibujan genéricos y la marca va como texto en la cenefa. Solo el sobre propio de edulcorante lleva la marca DPI (y el teléfono y el mail, interpolados).
- **Escenas** (café y pancho) y **bandeja de clínica** hechas con las mismas piezas.

**Cómo entran las fotos reales después** (fondo neutro o caja de luz, de arriba o a 3/4):

- **Estante**: cada dibujo se reemplaza por la foto recortada (PNG/WebP con fondo transparente) del envase, parada sobre la misma cenefa. Como `Producto` ya tiene el campo `foto`, el componente puede usar la foto si existe y el dibujo si no. El estante, la cenefa y las estampas no cambian.
- **Portada**: el sobre DPI puede pasar a ser una foto cenital del sobre real sobre papel, con el sello rojo encima (el sello sigue siendo SVG).
- **Escenas de comercio**: fotos cenitales (pocillo con los sobrecitos, pancho con la mayonesa) en formato 300:230, sobre el fondo verde claro.
- **Regla de fotografía**: luz pareja de día, de arriba, sin desenfoque de fondo de stock, sin manos ni personas, y siempre con el producto chico como objeto principal. Kraft o papel como superficie, nunca madera ni mármol.

## Propuesta de wordmark "DPI"

> **Es una propuesta.** En la página no se aclara para que no se vea raro ante un cliente; queda dicho acá y en `docs/pendientes.md` (punto 21).

Respeta la estructura del logo actual (**esfera + DPI + línea + "Productos Individuales" en itálica**) y la reinterpreta como sale impresa en el sobre:

- **La esfera, tramada.** El degradé azul/lila del logo viejo, impreso a una tinta en el sobre, se convierte en trama de puntos. La propuesta la asume a propósito: una esfera hecha de puntos de semitono (trama hexagonal, iluminada arriba a la izquierda) generada en `lib/trama.ts`. Funciona a una tinta, en cualquier color y en un sello de goma. Hay dos densidades: gruesa para tamaños chicos (encabezado, sobre) y fina para tamaños grandes (pie).
- **"DPI" en Alegreya Black**: conserva el peso del original con un dibujo más tibio y argentino.
- **La línea** arranca debajo de la esfera y termina con la I; **"Productos Individuales"** en Alegreya itálica, alineada a la derecha debajo de la línea, como en el original.
- **Dos variantes**: horizontal (encabezado) y **sello** (dentro del marco redondeado del sobre, con el teléfono), pensada para sobres, cajas y la lista de precios impresa.
- En la página la usan el encabezado, el sobre de edulcorante dibujado, el dorso del sobre y el pie.

Para producción habría que pasar el texto a contornos (hoy es texto SVG con la fuente cargada) y probar la trama impresa a 2 cm.

## Qué la hace no genérica

- **El material es de DPI y no de una plantilla**: el sobre impreso, el dorso con sus rubros y su teléfono, el borde dentado, el marco redondeado y la esfera tramada salen de los sobres reales de la empresa.
- **El producto está dibujado según su envase real** (almohadilla, papel dentado, potecito, flow-pack) y en sus colores. No hay íconos de categoría ni grillas de tarjetas iguales: cada estante tiene su composición según lo que lleva, y las cenefas son un objeto de almacén, no una tarjeta.
- **Piezas visuales en lugar de listas**: la bandeja de cuatro huecos para "una porción para cada comida", el almanaque con los días sellados en rojo, el pocillo y el pancho.
- **Ritmo variado**: portada en dos columnas, estante en grilla 7/5 sobre kraft, clínicas texto + bandeja, comercios con un titular de 90 px en itálica y dos escenas, entregas oscura con selector, lista como sobre de papel madera, pie como dorso del sobre. Los antetítulos están solo donde nombran un público o un tema (clínicas, comercios, repartos), no en todas las secciones.
- **Cada bloque tiene un dato concreto**: 2001, Florida, más de 200 clientes, Diego, las 5:00, Natura/Abedul/Dánica/Mauri, Factura A, cheques a 30 o 60 días, sin mínimo en Capital, jueves en Morón y martes en Zona Norte, ventas@, Bernardo de Irigoyen 877.
- **Todo sale de `src/data/`**: teléfono, horario, días, zonas, marcas, productos, año, mail, dirección, la bajada del logo y hasta el texto impreso en los sobres dibujados. El número de WhatsApp no se muestra: los botones dicen "Escribile a Diego".

## Funcionalidades

- **Atendiendo ahora** (`Estado.astro`): sin JS muestra `textoHorario()`; con JS usa `estadoAtencion()` (hora de Buenos Aires) y se actualiza cada minuto. Variante corta en el encabezado ("Atendiendo ahora" / "Abrimos mañana a las 5:00") y un punto en el botón flotante. En la ficha, el texto largo de fuera de horario baja a una segunda línea dentro del marco sin romperlo (ver `direcciones-a--cerrado-mobile.jpg`).
- **¿Qué día llegamos a tu zona?** (`Entregas.astro`): sin JS se ven las cuatro zonas completas, cada una con su botón; con JS aparece el selector (radios accesibles) y queda una sola hoja, con región `aria-live`. El botón usa `waLink('zona', { zona })`; para "Otras zonas" el mensaje dice "otra zona".
- **Botón flotante** de WhatsApp solo en el celular, con el punto de estado.
- `prefers-reduced-motion`: solo hay transiciones mínimas en botones; el reset las anula.

## Pedidos al orquestador

1. **Base del worktree.** Mi copia se creó desde `main` (`b2104ef`, el sitio viejo) y no desde la base de Fase 0 (`23d60b2`, rama `claude/epic-bohr-yl0qtj`). La avancé con fast-forward antes de empezar. Las ramas `worktree-agent-aa4d3ba038868f729` y `worktree-agent-aab969fe6627fe0b3` también estaban en `b2104ef`: conviene revisar que las direcciones B y C hayan partido de la base correcta.
2. **Dibujo por producto.** El formato y los colores de cada envase viven en `src/direcciones/a/envases.ts` (presentación). Si se elige esta dirección, conviene pasarlo al sistema de diseño (fase 2) y usar `Producto.foto` cuando exista.
3. **Datos que hoy son redacción** y podrían ir a `src/data/`: el área servida resumida ("Capital y GBA") y la lista de públicos del pie (clínicas, geriátricos, bares, kioscos, almacenes, confiterías).
4. **`estadoAtencion()`**: para la variante corta saco la hora del título con una expresión regular; sería más limpio que devuelva también `horaApertura` (por ejemplo `"5:00"`).
5. **Fuentes**: `@fontsource-variable/alegreya/wght.css` declara todos los subsets (el navegador baja solo latin por `unicode-range`, pero `dist/` copia todos). En la fase 2 se puede declarar solo el `woff2` latin.
6. **Mail en el sobre**: el sobre de edulcorante dibujado muestra `empresa.email` (`ventas@`); el sobre real dice `contacto@`. Ya está en `docs/pendientes.md` (punto 3).
