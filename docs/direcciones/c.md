# Dirección C · Despacho a las 5 AM

Home completa en `/direcciones/c/` (noindex). Capturas: `docs/capturas/fase-1/direcciones-c--mobile.jpg` y `--desktop.jpg` (martes 9:30, abierto).

## Concepto

Mientras la ciudad duerme, DPI ya está armando pedidos y Diego contesta el WhatsApp. La página está hecha con los papeles de esa operación: **el remito con original, duplicado y triplicado**, la tinta de carbónico, la hoja de ruta, la planilla de bandejas, el ticket de mostrador y el sello de goma.

Hay una regla que ordena todo el sistema: **lo impreso del formulario va en tinta negra; lo que se completa va en azul carbónico.** Las horas, los días, las zonas, las marcas, las cantidades y los datos del negocio aparecen en azul, como escritos sobre el formulario. Hasta en el H1, los productos y los lugares están "completados" en carbónico.

La pieza central es el **tablero de despacho**:
- la hora de Buenos Aires en casilleros de formulario (como los de "fecha" de un remito);
- un fechador (sello de goma con la fecha) que dice ATENDIENDO o CERRADO;
- una franja de 24 h con el horario de atención pintado y una marca "ahora";
- los campos Atiende / Días / Desde / Hasta y el botón grande a WhatsApp.

Cuando DPI no atiende, el sello pasa a azul y dice CERRADO, el texto pasa a "Arrancamos mañana a las 5:00", la marca cae en la zona rayada de la noche y **el sol del logo baja bajo el horizonte**.

### Recorrido de la home (4 hojas y un pie)

| Hoja | Papel | Qué tiene |
|---|---|---|
| Portada | original, blanco | H1 que responde qué es, qué vende, a quién y dónde. Tablero de despacho. Bajada y tres datos en casilleros (desde 2001, más de 200 clientes, sin mínimo en Capital). En el celular el tablero va inmediatamente después del H1, así el reloj entra en la primera pantalla. |
| Productos | original, blanco | "Lo que más sale" (mayonesa Natura, edulcorante DPI, mermeladas Abedul) como **rótulos de dorso de sobre** con su dibujo técnico sobre papel cuadriculado. Después, el **remito**: las 5 categorías con su formato de envase y todos los productos como renglones (marcá · descripción · marca · cant.). Los renglones arman el mensaje de WhatsApp ("Armá tu consulta"). Al pie, en el lugar del TOTAL, está la lista de precios: no se publica, se pide. |
| Clientes | duplicado, rosa | Clínicas: la **planilla de bandejas de un día**, productos × comidas, con el envase dibujado en cada celda. Muestra de un vistazo que el desayuno son potecitos y sobres de papel y el almuerzo son almohadillas. Comercios: un **ticket térmico** con el pedido de mostrador típico (edulcorante para el café, mayonesa para el pancho), sin mínimo en Capital. |
| Entregas | triplicado, amarillo | **Hoja de ruta**: zonas × días hábiles con cruces de carbónico, la columna de hoy marcada y la fila de retiro en depósito. Selector "¿Qué día llegamos a tu zona?" que muestra un **rótulo de envío** (destino, días, plazo, mínimo, próxima fecha) y el botón de WhatsApp con la zona escrita. |
| Pie | papel carbónico | "A las 5 de la mañana ya estamos armando pedidos." Debajo, el membrete completo: nombre, razón social, depósito, teléfono, mail, horario y "desde 2001". |

Entre hojas hay una línea de **troquel** (perforado) y cada hoja lleva en el margen su copia ("Original · para el cliente", "Duplicado · clientes", "Triplicado · reparto"), en vertical en escritorio.

## Tipografías y por qué

Las dos familias son **argentinas**, libres y ya estaban instaladas por Fontsource. Se cargan autoalojadas, con `font-display: swap` y subsets por `unicode-range`: el navegador baja solo el latin, unos 26 KB la mono y 45 KB la sans.

- **Encode Sans** (Impallari Type, variable con ejes de peso y ancho 75–125). La uso en dos registros:
  - **Condensada pesada** (`font-stretch: 75%`, 800) para titulares. Remite a los carteles de horarios y a la tipografía angosta impresa en formularios y rótulos. Entra mucho texto en poco ancho, algo clave para un H1 largo a 390 px.
  - **Ancho normal** (100%, 400–600) para párrafos. Es una sans humanista que se lee bien en tamaños chicos.

  Que la variable tenga el eje de ancho permite tener "dos familias" en un solo archivo.
- **Chivo Mono** (Omnibus-Type) para lo que en un formulario se completa o se rotula: horas, días, etiquetas de campo, encabezados de columna, el ticket, los sellos. Es una mono con personalidad (no la de terminal) y cifras tabulares, así que el reloj no baila.

  **No se usa en párrafos largos.** El único bloque mono de más de dos líneas es el ticket, que imita uno real y tiene renglones cortos.

Lo que evité: verde sobre negro, terminal, todo en mono. La mono pesa a lo sumo un 25 % del texto visible.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--dc-papel` | `#FBF9F4` | Original (blanco cálido): portada y productos |
| `--dc-papel-rosa` | `#F6D8DD` | Duplicado: clínicas y comercios |
| `--dc-papel-amarillo` | `#F4E6A2` | Triplicado: hoja de ruta |
| `--dc-blanco` | `#FFFFFF` | Tablero, remito, ticket, rótulos |
| `--dc-carbon` | `#1B2047` | Papel carbónico: el pie |
| `--dc-tinta` | `#17181C` | Impresión del formulario: textos, reglas |
| `--dc-tinta-2` | `#4A4C57` | Rótulos secundarios |
| `--dc-carbonico` | `#22308F` | **Lo completado**: datos, botones |
| `--dc-amanecer` | `#F08A24` | Sol, franja de atención, botón del pie (relleno; nunca texto sobre claro) |
| `--dc-amanecer-txt` | `#A3470A` | Sello ATENDIENDO, etiqueta "más pedido" |
| `--dc-sello` | `#B3261E` | Sello "lista vigente a pedido" |

Los colores de los dibujos (mayonesa, ketchup, mostaza, golf, mermeladas, etc.) viven aparte en `src/direcciones/c/lib.ts`. Son de ilustración, no datos.

Contrastes clave (WCAG, todos AA para texto normal):

| Par | Contraste |
|---|---|
| tinta sobre papel / rosa / amarillo | 16,9 / 13,3 / 14,1 |
| carbónico sobre papel / rosa / amarillo / blanco | 10,6 / 8,4 / 8,8 / 11,1 |
| tinta-2 sobre papel / rosa | 8,1 / 6,4 |
| blanco sobre carbónico (botones) | 11,1 |
| tinta sobre amanecer (franja, botón del pie) | 7,1 |
| amanecer-txt sobre blanco (sello, "más pedido") | 6,1 |
| amanecer sobre carbón (el "5" del pie) | 6,2 |
| papel sobre carbón (pie) / gris del pie sobre carbón | 13,6 / 8,4 |
| gris de etiqueta sobre la barra negra del tablero | 9,6 |

Los sellos llevan una máscara de ruido (tinta irregular). Son decorativos (`aria-hidden`) y repiten lo que ya dice el texto.

No hay gradientes violeta ni azul. El único "degradé" del sitio viejo, el de la esfera, pasó a ser un sol plano.

## Tratamiento de imágenes

**Hoy, sin fotos, todo es dibujo técnico de línea en SVG**, como en una ficha de producto. Son los cuatro envases reales, con trazo de tinta y relleno plano del color del producto:
- sobre almohadilla con extremos crimpados y muesca de corte;
- sobre de papel cuadrado con borde dentado y marco redondeado;
- potecito con tapa pelable y pestaña;
- paquetito flow-pack con sellos dentados.

Se usan en tres escalas:
- grande, sobre papel cuadriculado, en las fichas de "lo que más sale";
- mediana, en el encabezado de cada categoría del remito;
- mini, en las celdas de la planilla de clínicas.

El **sobre de edulcorante DPI** se redibujó completo con el wordmark propuesto, la franja verde, "EDULCORANTE" y el teléfono y el mail de `src/data/`. Es la única marca dibujada. Las ajenas (Natura, Abedul, Dánica, Mauri) aparecen **solo como texto**.

**Cuando haya fotos reales** (caja de luz, fondo blanco), entran en el mismo lugar que hoy ocupan los dibujos grandes de las fichas:
- **foto recortada sobre el papel cuadriculado**, como un producto apoyado sobre la planilla, con una sombra dura corta como la del sobre DPI;
- el dibujo técnico pasa a acompañar a la foto, chico y en una esquina, con su leyenda de formato ("sobre almohadilla · extremos crimpados"), como en un plano;
- en el remito y en la planilla se mantienen los dibujos: a esa escala una foto no se lee y el dibujo explica el formato.

Dirección para la fase 4: luz pareja, sin ambientación, cenital o a 3/4, el producto solo o en pila de 3. Nada de escenas de bar ni de clínica.

## Propuesta de wordmark "DPI"

> **Es una propuesta.** No reemplaza el logo actual hasta que el dueño la apruebe; si se aprueba, conviene actualizar también los sobres impresos.

Respeta la estructura del logo actual: **esfera + DPI + línea + "Productos Individuales"**. Cambia el sentido de cada parte:
- **La esfera es un sol que asoma** sobre **la línea, que pasa a ser el horizonte** de las 5 de la mañana. La parte del sol que queda bajo el horizonte se dibuja **punteada, como una arista oculta en un plano técnico**: une la idea del amanecer con el lenguaje de ficha.
- **"DPI"** en letras dibujadas a mano (paths, no fuente), condensadas y muy pesadas, con esquinas redondeadas tipo rotulación industrial. Heredan el peso del logo viejo, pero más compactas.
- **"PRODUCTOS INDIVIDUALES"** en mono chica espaciada, alineada a la derecha bajo la línea, en el mismo lugar que la bajada itálica original.
- Dos colores: tinta (o papel, sobre fondo oscuro) y el naranja de amanecer para el sol. Funciona en una tinta sola: el sol queda como disco lleno.
- **Es "vivo" en la web**: cuando DPI está cerrado, el sol baja bajo el horizonte (en la cabecera, el pie y el botón flotante). Al cargar en horario de atención, el sol sube una vez; con `prefers-reduced-motion` no se anima.

Archivo: `src/direcciones/c/componentes/Wordmark.astro` (SVG inline con `role="img"` y `aria-label`). Para producción habría que pasar la bajada a curvas; hoy es texto SVG con la mono. El sol sobre el horizonte, solo, funciona como isotipo y favicon.

## Qué la hace no genérica

- **No hay ninguna grilla de tarjetas con íconos**: cada bloque es un papel distinto, con su forma propia (tablero, rótulo de sobre, remito, planilla, ticket, hoja de ruta, membrete).
- **El reloj no es un puntito verde de "online"**: es la hora real de Buenos Aires en casilleros, un sello con la fecha y una franja de 24 h. El dato más memorable del negocio, las 5 de la mañana, se ve como una franja naranja que empieza en "05".
- **El producto se ve con su forma real.** Los cuatro formatos dibujados son los que DPI vende; la planilla de clínicas se "lee" por la forma de los envases.
- **Ritmo variado**: blanco → rosa → amarillo → carbón. Alterna escalas: H1 de diario, reloj gigante, renglones densos, ticket angosto. Y alterna densidades: el remito es largo y apretado, el ticket chico y el pie con una sola frase grande.
- **Funcionalidades metidas en la metáfora**:
  - "Armá tu consulta" es marcar renglones del remito;
  - la lista de precios ocupa el lugar del TOTAL;
  - "si no lo ves, preguntanos" es un renglón en blanco al final del remito;
  - en escritorio, las categorías cortas muestran renglones vacíos, como un remito real.
- **Microcopy con datos**: "Del otro lado está Diego.", "Cerramos a las 16 · faltan 6 h 30 min", "Si escribís ahora: en general, llega el miércoles 7 de octubre", "Próximo reparto: jueves 8 de octubre".

## Funcionalidades (con y sin JS)

| Funcionalidad | Con JS | Sin JS |
|---|---|---|
| Atendiendo ahora | Hora de Buenos Aires (aunque el visitante esté en otro huso), sello, texto de `estadoAtencion()`, cuenta regresiva, marca en la franja. Se actualiza cada 20 s y al volver a la pestaña. | "Abrimos a las 05:00" y `textoHorario()`. |
| WhatsApp con contexto | general, pedido, lista, clínica, comercio, producto, zona y consulta armada | Igual (son links). La consulta arma un pedido genérico. |
| Armá tu consulta | Casillas + cantidad aproximada (escribir una cantidad marca el renglón) + "es para" + zona + "otro producto". Muestra "Así le llega a Diego" y reescribe el link. No guarda nada. | Los renglones se ven como lista; las casillas se ocultan. |
| ¿Qué día llegamos? | Elegís zona y ves un rótulo con días, plazo, mínimo, próxima fecha y WhatsApp con la zona. En "otras zonas" escribís tu localidad y va en el mensaje. | Se ven los cuatro rótulos y la hoja de ruta completa. |
| Una porción para cada comida | Planilla productos × comidas generada desde `comidasClinica` | Igual (es HTML estático). |
| Flotante (celular) | Aparece cuando no se ve otro botón de WhatsApp (el de la cabecera o el del tablero), así no tapa el reloj al entrar | Siempre visible |

Accesibilidad:
- un solo H1 y tablas reales con `caption` y `scope`;
- fieldsets con nombre, labels en todos los campos y foco visible en carbónico (en el pie, en naranja);
- `aria-live` solo en el estado (no en los segundos);
- los sellos y dibujos decorativos llevan `aria-hidden`;
- "saltar al contenido";
- `prefers-reduced-motion` desactiva la salida del sol, el golpe del sello y el scroll suave.

## Verificación

- `npm run build`: sin errores ni warnings. `npx astro check`: 0 errores, 0 warnings, 0 hints.
- Capturas abierto (martes 9:30) y cerrado (martes 18:00), en 390 y 1440. Tres vueltas de crítica y corrección:
  - **Vuelta 1.** El reloj y el sello desbordaban la columna en el celular y empujaban todo el hero. El wordmark anidado en el sobre se rompía. La cabecera partía el teléfono. Había huecos en el remito de escritorio. El sello pisaba el título de la lista de precios. Leyendas y cortes de "h".
  - **Vuelta 2.** La etiqueta de la franja no entraba a 390 px. El sello caía debajo del reloj. "EDULCORANTE" se salía del sobre. El nombre en singular ("mermelada").
  - **Vuelta 3.** El flotante tapaba el reloj en la primera pantalla. El tablero se veía apenas en el celular, así que lo subí debajo del H1. Una frase de entregas era imprecisa ("al resto vamos un día fijo", y "otras zonas" es a coordinar).
- QA con Playwright:
  - sin JS se ven el horario y los 4 rótulos de zona;
  - con un visitante en Madrid el reloj marca 9:30 de Buenos Aires;
  - el mensaje de consulta, el link de zona y el de "otras zonas" se arman bien;
  - la columna "hoy" queda marcada;
  - el flotante se esconde y aparece como corresponde;
  - no hay desborde horizontal a 360, 375 ni 390 px;
  - no hay errores de consola.

## Lo que todavía no me convence

- **Largo en el celular** (unos 10.000 px): el remito completo con 13 renglones pesa. En la fase 2 lo partiría: en la home, solo las 5 categorías con sus dibujos; el remito completo, en `/productos/`.
- En escritorio, el bloque **TOTAL** negro es muy contundente, y en la hoja rosa la columna de comercios queda más corta que la planilla.
- **HTML de 90 KB** sin comprimir, por los SVG inline repetidos (planilla y remito). En la fase 2 pasaría los envases a `<symbol>` y `<use>`.
- Las palabras en carbónico del H1 pueden leerse como links. Si molesta, se baja a tinta y queda el carbónico solo para cifras y horas.

## Pedidos al orquestador

1. **La copia de trabajo arrancó desactualizada**: el worktree se creó sobre `b2104ef` (la landing vieja), sin la fase 0. Hice *fast-forward* de mi rama a `23d60b2` (`claude/epic-bohr-yl0qtj`) antes de empezar. Es probable que las otras direcciones tengan lo mismo. Además, el *scratchpad* es compartido entre agentes (otro agente pisó un script mío): conviene usar nombres con prefijo.
2. **Mensaje "consulta"** para "Armá tu consulta": hoy está en `src/direcciones/c/mensajes.ts` (`mensajeConsulta`). Si se adopta, pasarlo a `src/data/mensajes.ts`.
3. **Nombre en plural** de los productos con sabores ("Mermeladas"): hoy lo saco del nombre de la categoría. Un campo opcional `nombrePlural` en `Producto` lo resolvería.
4. **"Pedido típico de comercio"** (edulcorante y mayonesa; a veces azúcar o mermeladas): está como lista de slugs en `Clientes.astro`. Podría vivir en `src/data/` (por ejemplo, `pedidoTipicoComercio`).
5. `textoHorario()` devuelve "de 5 a 16 h" con espacio común antes de "h": en pantallas angostas queda "16 / h". Sugiero un espacio duro en `src/lib/horario.ts` (acá lo reemplazo localmente).
6. `src/lib/horario.ts` podría exportar `sumarDias` y la lista de días de JS: los dupliqué en `src/direcciones/c/lib.ts` y en `cliente/zonas.ts` para calcular la próxima fecha de reparto.
7. Si se elige esta dirección: favicon con el isotipo del sol sobre el horizonte (no toqué `public/`).
