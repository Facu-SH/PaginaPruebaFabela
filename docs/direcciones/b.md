# Dirección B · Color de sobre

Home completa en `/direcciones/b/`. Capturas: `docs/capturas/fase-1/direcciones-b--mobile.jpg` y `--desktop.jpg`.
Código: `src/pages/direcciones/b/index.astro` y `src/direcciones/b/` (componentes, `b.css`, `sistema.ts`, `cliente.ts`, `wordmark.ts`).

## Concepto

**Abrir la caja.** DPI vende cosas chicas, de colores y que vienen de a muchas. La página se arma con eso: cada categoría tiene el color de su envase y los productos aparecen dibujados a escala grande, en su formato real y repetidos como en una caja o en una góndola.

- **El sobre es la tarjeta de DPI.** La portada usa el verde del sobre de edulcorante propio. El sobre aparece en grande, con el logo, el teléfono y el mail impresos como en el original.
- **"Lo que más sale"**: tres filas a todo el ancho (almohadillas de mayonesa paradas, sobres de edulcorante DPI encimados, potecitos de mermelada) que se cortan en los bordes de la pantalla, así se entiende que hay más. Cada fila termina en una **cenefa**, la etiqueta del estante, con nombre, marca, dato y un "Preguntá el precio" en el lugar donde iría el precio.
- **Productos: la caja con divisiones.** Cada categoría es un compartimento de su color, de distinto tamaño según su peso: aderezos ocupa todo el ancho porque la mayonesa es lo que más sale. El último compartimento queda **vacío** a propósito y ahí va "Si no lo ves, preguntanos", la única vez que aparece la frase.
- **Clínicas: la bandeja.** "Una porción para cada comida" es una bandeja con cuatro compartimentos (desayuno, almuerzo, merienda, cena) y los envases de cada comida, armada con `comidasClinica`.
- **Comercios: el café.** Un pocillo visto de arriba con un sobre de azúcar, uno de edulcorante DPI y una almohadilla de mayonesa, sobre fondo tinta. El título sale de los datos: "Sin mínimo en Capital Federal".
- **Entregas.** Para el selector "¿Qué día llegamos a tu zona?", el resultado sale impreso en un sobre oscuro con las puntas crimpadas. Sin JS se ven las cuatro fichas.
- **El pie es el dorso del sobre**: tiene el marco de esquinas redondeadas y la letra chica condensada de los sobres que DPI ya imprime, y el "Tel.: 4730-4423" en grande.

El borde dentado (el crimpado del sobre) es el recurso de la marca. Se usa en tres lugares: los envases, los botones (un sobre oscuro con las puntas crimpadas) y dos filos entre bloques (abajo de la portada y arriba de la lista de precios). No se usa en ningún otro lado.

## Tipografía

**Archivo** (Omnibus-Type, Buenos Aires · OFL), una sola familia variable con eje de ancho (`wdth` 62–125) y de peso. Se importa desde `@fontsource-variable/archivo/wdth.css` y se precarga el archivo latin.

| Voz | Ajuste | Uso |
|---|---|---|
| Expandida negra | `font-stretch: 125%`, peso 900, interlineado 0.94 | Titulares, nombres de categoría, "DPI". Es la letra ancha y pesada de los envases: se lee de lejos y ocupa el ancho como un rótulo. |
| Rótulo | 125 %, peso 700, versalitas espaciadas 0.14em | Antetítulos, marcas, etiquetas de datos. Copia el "E D U L C O R A N T E" impreso en el sobre DPI. |
| Condensada | 62–75 %, peso 600–800 | Letra chica: la bajada del wordmark, el texto de la bandeja y el del dorso. |
| Texto | 100 %, peso 400–600 | Párrafos y listas. |

**Por qué Archivo:**
- Es argentina, de la misma fundidora porteña que Chivo. DPI es una distribuidora de barrio que lleva 25 años, y una letra hecha en Buenos Aires encaja con eso.
- El eje de ancho permite armar todo el sistema con **una sola familia y un solo archivo**: expandida para lo que se grita y condensada para la letra chica. Con eso alcanza para el contraste tipográfico y se carga una sola fuente, lo que ayuda al Lighthouse.
- En negra expandida tiene el peso de un envase de supermercado, y en ancho normal es una grotesca muy legible para el texto corrido.

**Chivo quedó afuera** a propósito. Sumarla habría agregado una segunda descarga para lograr un contraste que el eje de ancho de Archivo ya da.

## Paleta

Es un sistema estricto. Cada categoría es **dueña de un color** y solo ese color pinta un bloque. Los colores de producto (ketchup, mostaza, durazno…) aparecen únicamente **dentro de los envases dibujados**. Lo que no es de una categoría va en papel o en tinta. El verde DPI hace de "voz de DPI": portada, lista de precios, punto del wordmark y día de entrega. Ese verde es el del sobre propio, que además pertenece a la categoría endulzantes.

| Rol | Nombre | Hex | Texto encima | Contraste |
|---|---|---|---|---|
| Neutro | Tinta | `#181613` | papel | 17.3 : 1 |
| Neutro | Papel (azúcar) | `#FBFAF6` | tinta | 17.3 : 1 |
| Aderezos | Amarillo mayonesa | `#F4E13B` | tinta | 13.5 : 1 |
| Endulzantes / DPI | Verde edulcorante DPI | `#A9CC8F` | tinta | 10.1 : 1 |
| Mermeladas | Rojo frutilla | `#C41F3A` | papel | 5.6 : 1 (AA texto normal) |
| Lácteos | Crema manteca | `#F5E5A6` | tinta | 14.3 : 1 |
| Galletitas y tostadas | Tostado galletita | `#C98B4B` | tinta | 6.3 : 1 |
| Solo envases | Rojo ketchup | `#D3271C` | papel | 4.9 : 1 |
| Solo envases | Dorado mostaza | `#D99A1E` | tinta | 7.4 : 1 |
| Solo envases | Naranja golf | `#EB7A2A` | tinta | 6.3 : 1 |
| Solo envases | Naranja durazno | `#F2993E` | tinta | 8.1 : 1 |
| Solo envases | Violeta ciruela | `#4D2149` | papel | 12.3 : 1 |
| Solo envases | Bordó frutos rojos | `#7E1B33` | papel | 9.6 : 1 |
| Material | Aluminio (tapa) | `#E4E1D9` | tinta | — |

- Los colores salieron de muestrear `productos-sitio-viejo.jpg` (mayonesa, mostaza y golf Natura) y `edulcorante.png` (el verde del sobre). Después se limpiaron para que funcionen como tinta plana.
- Contrastes que importan: el día de reparto va en verde sobre tinta (10.1 : 1) y los links blancos sobre frutilla dan 5.6 : 1. Nunca hay texto oscuro sobre frutilla ni texto blanco sobre amarillo.
- El mapeo categoría → color vive en `src/direcciones/b/sistema.ts` (`colorCategoria`, `colorEnvase`) y los hex en `src/direcciones/b/b.css`.

## Tratamiento de imágenes

**Hoy, sin fotos, la página ya se ve terminada.** Todo es ilustración vectorial propia en SVG inline:
- Hay cuatro formatos de envase, dibujados según los reales (`componentes/Almohadilla`, `SobrePapel`, `Pote`, `Paquete`):
  - **Almohadilla** de aderezo: alargada, con las puntas crimpadas y estriadas.
  - **Sobre de papel** cuadrado: dentado en los cuatro lados, con margen sellado.
  - **Potecito** visto de arriba: tapa de aluminio con la esquina pelada (se ve el contenido) y una faja con el sabor.
  - **Paquetito flow-pack**: sellos laterales y una ventana con galletitas, vainillas o tostadas adentro.
- El estilo es línea clara: color plano, un trazo de tinta de 2 px constante a cualquier escala (`vector-effect: non-scaling-stroke`) y nada de degradés ni sombras. Por eso los envases se leen igual sobre su propio color (la mayonesa sobre el compartimento amarillo).
- **Ninguna marca ajena está dibujada.** Los envases solo llevan el nombre genérico del producto ("MAYONESA", "FRUTILLA"). Natura, Abedul, Dánica y Mauri aparecen solo como texto. El único envase con logo es el sobre DPI, que es de ellos.
- Las formas repetidas son símbolos (`componentes/Sprite.astro`) que se reusan con `<use>`. Así las filas de 22 envases no inflan el HTML: la página pesa 126 KB (20 KB con gzip).

**Cuando lleguen fotos reales** (con celular y caja de luz, o las oficiales de los proveedores):
- Van **recortadas, sin fondo y sin sombra**, apoyadas sobre el color de su categoría, a la misma escala que hoy tienen los dibujos. Reemplazan a los envases de los compartimentos de "Productos". El compartimento de color sigue siendo el que manda; la foto es el objeto adentro de la caja.
- Las filas de "Lo que más sale" pueden quedar ilustradas, porque la repetición y el ritmo son el punto, o usar la misma foto recortada repetida. Conviene no mezclar foto e ilustración en una misma fila.
- La portada **no** lleva foto. El sobre DPI dibujado es la imagen de marca y más adelante se puede cambiar por la foto real del sobre, de frente.
- El dato ya está previsto: `producto.foto` en `src/data/productos.ts`. El componente elegiría foto si existe y dibujo si no.

## Propuesta de wordmark "DPI"

> **Es una propuesta.** Hay que aprobarla antes de usarla en otro lado (ver `docs/pendientes.md` #21).

Respeta la estructura del logo actual (**esfera + DPI + línea + "Productos Individuales"**), reinterpretada en esta dirección:
- **La esfera pasa a ser un punto sólido** (`--b-punto`) que toma el color de la sección. Acá va en verde DPI. En una página de categoría iría en amarillo mayonesa, rojo frutilla, etc.
- **"DPI" va en Archivo expandida negra** (ancho 125, peso 900, interletrado −30).
- **La línea pasa a ser una barra gruesa** que sale del centro del punto y corre bajo las letras, como en el original, donde la línea arranca en la esfera.
- **"PRODUCTOS INDIVIDUALES"** va en Archivo condensada (ancho 62, peso 700) y justificada a todo el ancho del logo, en lugar de la itálica chica. Con eso se lee a 140 px de ancho en el encabezado del celular.
- Los contornos están **convertidos a trazos** (`src/direcciones/b/wordmark.ts`), así que el logo no depende de que cargue la fuente y se puede exportar tal cual a SVG, favicon o imprenta.
- Se usa en el encabezado, en el pie y, en chico, dentro del sobre de edulcorante dibujado. Esto último muestra cómo quedaría en los sobres impresos.

## Qué la hace no genérica

- **El producto es literalmente la interfaz.** Los botones son sobres crimpados, el resultado de zona es un sobre, la portada es el sobre DPI, el pie es el dorso de un sobre y los productos son envases dibujados en su formato real. No hay un solo ícono genérico.
- **No hay grilla de tarjetas iguales.** "Productos" es una caja con compartimentos de distinto tamaño y color, con un compartimento vacío que dice algo. "Clínicas" es una bandeja. "Comercios" es un café.
- **Hay repetición en vez de cantidad de secciones.** Las filas de envases que se cortan en el borde dicen "distribuidora" mejor que cualquier frase.
- **La paleta es estricta y viene de la góndola real** (amarillo mayonesa, rojo frutilla, verde del sobre DPI), con una regla clara de quién es dueño de cada color. Por eso no queda un arcoíris.
- **Una sola tipografía argentina** usada en tres anchos. La expandida negra en titulares de 90 px es la firma.
- **El ritmo es variado**: verde lleno, filas a sangre, caja de colores, papel y tinta partidos al medio, ficha oscura, verde con filo dentado, marco de dorso. Cambian la escala, la densidad, la alineación y el fondo.
- **Cada bloque tiene un dato concreto que sale de `src/data/`**: Florida, 2001, las 5 de la mañana, Natura/Abedul/Dánica/Mauri, Factura A y cheques a 30 o 60 días, sin mínimo en Capital, jueves en Morón, martes en Zona Norte, "más de 200 clientes" y el teléfono.

## Funcionalidad y accesibilidad

- **Primera oración (para Google y las IA)**, armada con los datos: "DPI es una distribuidora de Florida, Vicente López, que desde 2001 vende mayonesa, azúcar, edulcorante, mermeladas, manteca y galletitas en porciones individuales a clínicas, bares, kioscos y comercios de Capital Federal, Morón y Zona Norte (GBA)."
- **Atendiendo ahora en vivo** (`cliente.ts` usa `estadoAtencion()`) en el encabezado (versión corta: "Atendiendo ahora" / "Abrimos mañana 5:00"), bajo el botón de la portada y en la lista de precios. Sin JS se ve `textoHorario()`.
- **Selector de zona**: radios nativos (se manejan con el teclado y las flechas) y la ficha en una región `aria-live`. Sin JS se oculta el selector y se ven las cuatro fichas, cada una con su botón `waLink('zona', { zona })`.
- El botón flotante de WhatsApp aparece en el celular (< 1080 px), con el punto de estado. No se muestra el número de WhatsApp en ningún lado.
- HTML semántico (h1 → h2 → h3 en orden), enlace "Saltar al contenido", foco visible (contorno de 3 px más un anillo de papel), envases decorativos con `aria-hidden` y el sobre de portada con `role="img"`. Respeta `prefers-reduced-motion`: el único movimiento es el hover del botón y se apaga. No hay scroll horizontal a 390 px.
- `npm run build` sin warnings y `npx astro check` con 0 errores, 0 warnings y 0 hints.

## Pedidos al orquestador

1. **El worktree se creó desde `main`**, que no tiene la base de la Fase 0. Hice `git merge --ff-only claude/epic-bohr-yl0qtj` (hasta `23d60b2`) antes de empezar. Conviene revisar que los worktrees de A y C no tengan el mismo problema.
2. **Mensaje de WhatsApp para "Otras zonas".** Hoy el botón usa `waLink('zona', { zona: '(escribí acá tu localidad)' })` para que la persona complete su localidad. Sería más limpio sumar `mensajesWhatsApp.otraZona` en `src/data/mensajes.ts` (por ejemplo: "Hola, buen día. Estoy en ___, ¿llegan hasta acá?").
3. **Mail del sobre.** El sobre de edulcorante dibujado imprime `empresa.email` (`ventas@`), pero el sobre real dice `contacto@`. Ya figura en pendientes (#3).
4. **Wordmark.** Si se elige, conviene exportar `wordmark.ts` a `public/` como SVG suelto y a favicon. Los trazos se generaron una vez con fontTools a partir del archivo de Archivo de `node_modules`, fuera del repo: no se agregó ninguna dependencia.
5. Si la dirección B sigue, en la fase 2 el mapeo `colorCategoria` puede pasar a `src/styles/tokens.css`. No lo moví a `src/data/` porque es diseño, no un dato del negocio.
