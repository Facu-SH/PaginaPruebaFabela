# Cómo sacar las fotos de producto con el celular

Esta guía es para sacar las fotos **reales** de los productos, que van a reemplazar a los dibujos (y a las fotos generadas con IA, si se usaron). No hace falta un fotógrafo: con un celular de los últimos años, una caja de luz y media hora alcanza.

La idea es que todas las fotos se vean **iguales entre sí**: mismo fondo, misma luz, misma distancia. Así el sitio se ve prolijo.

## Lo que necesitás

- **El celular**, con la lente limpia (pasale un paño o la remera: una lente con grasa de dedo hace fotos lechosas).
- **Una caja de luz.** Se compra hecha (las plegables de 40 × 40 cm con luces LED salen poco) o se arma:
  - una caja de cartón de unos 40 cm, con tres lados recortados como ventanas y tapados con papel manteca o papel de calcar;
  - adentro, una cartulina blanca que baje por la pared del fondo y siga por el piso **sin hacer esquina** (curvada, como un tobogán): así no se ve la línea del fondo;
  - dos lámparas LED de **luz blanca/día** (no cálida), una de cada lado, apuntando al papel manteca.
- **Sin caja de luz:** una mesa junto a una **ventana un día nublado**, con la cartulina blanca curvada. Nada de sol directo.
- **Algo para apoyar el celular** (un trípode chico o una pila de libros), así todas las fotos salen desde el mismo lugar.
- **Productos sanos:** los sobres sin arrugas ni manchas, los potecitos sin golpes. Elegí los más lindos de la caja.

## La luz

- Pareja y suave: que no haya una mitad del producto más oscura que la otra.
- **Sin flash.** Apagalo.
- Una sombra corta y suave justo debajo del producto está bien. Sombras largas o duras, no.
- Cuidado con los **reflejos** en el plástico de los sobres y en el aluminio de los potecitos: si aparece una mancha blanca brillante, mové un poco la lámpara o el producto hasta que desaparezca.

## Cómo sacar cada tipo de envase

| Envase | Productos | Cómo va | Desde dónde |
|---|---|---|---|
| Sobre de plástico (almohadilla) | mayonesa, ketchup, mostaza, salsa golf | parado, de frente (apoyalo contra algo que no se vea) o acostado | de frente, a la altura del producto |
| Sobre de papel | azúcar, edulcorante DPI | acostado sobre la cartulina | **desde arriba**, con el celular paralelo a la mesa |
| Potecito | mermeladas, queso crema, manteca | acostado, con la tapa un poco levantada en una esquina para que se vea el color | **desde arriba** |
| Paquetito | galletitas, vainillas, tostadas | acostado | **desde arriba** |

- **Uno solo, o una pila prolija de tres.** Nunca un montón desordenado.
- **Nada alrededor:** ni manos, ni tazas, ni pan, ni bandejas. El color de cada familia lo pone el sitio.
- Las marcas se ven como son (Natura, Abedul, Dánica, Mauri): en las fotos reales está bien. Lo que no va es inventar envases.

## Distancia y encuadre

- Poné la cámara del celular en formato **4:3** (es el normal en la mayoría; no uses 16:9 ni "cuadrado", salvo para los potecitos, que pueden ir cuadrados).
- Alejate unos **40 o 50 cm** y usá el **zoom 2×** (o el lente "2x"/"tele" si tiene): de muy cerca el celular deforma el envase.
- El producto tiene que ocupar más o menos **el 70 % de la foto**, centrado, con el mismo aire arriba, abajo y a los costados.
- Tocá la pantalla sobre el producto para enfocar. Si la foto sale oscura o quemada, deslizá el dedo hacia arriba o abajo junto al cuadrado de enfoque para corregir la luz.
- Sacá **3 a 5 fotos de cada producto** y después elegí la mejor.

## Recortar y revisar

En la galería del celular (o en la compu):

1. Abrí la foto → **Editar → Recortar** → elegí **4:3** (o cuadrado para los potecitos).
2. Centrá el producto y dejá aire parejo alrededor.
3. Si el fondo se ve gris o amarillento, subí un poco el **brillo** o la **exposición** hasta que quede blanco, sin que el producto se "lave".
4. No le pongas filtros.
5. Guardala en el tamaño original (mínimo 1600 px de ancho; las de cualquier celular actual lo cumplen).

## Nombres de archivo (para que se activen solas)

Cada foto se guarda con un **nombre fijo**: el sitio la reconoce por el nombre y la pone en lugar del dibujo. Todo en minúsculas, sin tildes ni espacios, con guiones. Sirven `.jpg`, `.png`, `.webp` o `.avif`.

### Productos → carpeta `src/assets/productos/`

| Producto | Archivo |
|---|---|
| Mayonesa | `mayonesa.jpg` |
| Ketchup | `ketchup.jpg` |
| Mostaza | `mostaza.jpg` |
| Salsa golf | `salsa-golf.jpg` |
| Azúcar | `azucar.jpg` |
| Edulcorante DPI | `edulcorante.jpg` |
| Mermeladas (los cuatro sabores juntos, desde arriba) | `mermeladas.jpg` |
| Mermelada surtida (la caja que arma DPI, abierta, desde arriba) | `mermelada-surtida.jpg` |
| Queso crema | `queso-crema.jpg` |
| Manteca | `manteca.jpg` |
| Galletitas | `galletitas.jpg` |
| Vainillas | `vainillas.jpg` |
| Tostadas | `tostadas.jpg` |

### Fotos de grupo por familia → carpeta `src/assets/categorias/`

Todos los productos de la familia juntos, en la misma caja de luz. Se usan en la imagen que aparece cuando alguien comparte el link de esa página.

| Familia | Archivo | Qué va |
|---|---|---|
| Aderezos | `aderezos.jpg` | los cuatro sobres parados, uno al lado del otro |
| Azúcar y edulcorante | `endulzantes.jpg` | el sobre de azúcar atrás y el de edulcorante DPI adelante, encimados |
| Mermeladas | `mermeladas.jpg` | los potecitos de los cuatro sabores, abiertos en una esquina |
| Manteca y queso crema | `lacteos.jpg` | un potecito de cada uno, abiertos |
| Galletitas y tostadas | `galletitas-y-tostadas.jpg` | el paquetito de galletitas, el de tostadas y la tira de vainillas |

## Lista de tomas (para tildar)

- [ ] Mayonesa · sobre parado, de frente
- [ ] Ketchup · sobre parado, de frente
- [ ] Mostaza · sobre parado, de frente
- [ ] Salsa golf · sobre parado, de frente
- [ ] Azúcar · sobre acostado, desde arriba
- [ ] Edulcorante DPI · sobre acostado, desde arriba (**la más importante**: es el envase propio)
- [ ] Mermeladas · cuatro potecitos (frutilla, durazno, ciruela, frutos rojos), desde arriba, en dos filas de dos
- [ ] Mermelada surtida · la caja abierta, desde arriba
- [ ] Queso crema · uno o dos potecitos, desde arriba, uno abierto
- [ ] Manteca · uno o dos potecitos, desde arriba, uno abierto
- [ ] Galletitas · el paquetito, desde arriba
- [ ] Vainillas · la tira, desde arriba
- [ ] Tostadas · el paquetito, desde arriba
- [ ] Grupo aderezos
- [ ] Grupo azúcar y edulcorante
- [ ] Grupo mermeladas
- [ ] Grupo manteca y queso crema
- [ ] Grupo galletitas y tostadas

## Para subirlas al sitio

1. Copiá cada foto a su carpeta con su nombre (por ejemplo, `src/assets/productos/mayonesa.jpg`). Si ya había una, pisala.
2. Si sumaste fotos de grupo (`src/assets/categorias/`), corré `npm run og` para rehacer las imágenes para compartir.
3. Probá el sitio en la compu (`npm run dev`) y mirá la página de esa familia: la foto tiene que aparecer en lugar del dibujo.
4. Publicá (ver `docs/como-actualizar.md`).

Si una foto no se ve bien en el sitio (muy chica, muy oscura, cortada), lo más fácil es volver a sacarla con más aire alrededor o más luz. Los detalles de diseño están en `docs/diseno.md` → "Dirección de fotografía".
