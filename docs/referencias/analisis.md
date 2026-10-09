# Análisis de referencias visuales

**Cómo se hizo.** El 9 de octubre de 2026 saqué capturas con Playwright (Chromium) de 14 sitios, a 1440×900 y 390×844 (`deviceScaleFactor` 1). Son capturas del viewport, no de la página completa, en JPEG con calidad 70, y como mucho tres por sitio. Las tipografías y los colores salen de `getComputedStyle` y `document.fonts` sobre la página cargada. Cada captura la miré antes de escribir sobre ella. Cuando algo viene de una página que exploré pero no guardé, lo aclaro.

**Qué se buscaba.** Actitud visual de marcas de comida con identidad fuerte, proveedores B2B bien diseñados, sitios argentinos bien hechos y buenos ejemplos de horario en vivo y de "qué día llegamos a tu zona". La idea es alimentar las tres direcciones:

- **A** · Almacén de confianza;
- **B** · Color de sobre;
- **C** · Despacho a las 5 AM.

El material propio de DPI es el punto de partida:

- **Sobres propios** (`sitio-viejo/sobres-propios-dpi.jpg`): el de edulcorante es blanco con una curva verde; el de sal tiene el borde termosellado dentado.
- **Dorso del sobre de azúcar:** un recuadro redondeado con "Dist. de prod. aliment. envasados en porciones individuales · Atención a empresas de catering · Clínicas · Hospitales…".

**Lo que falló o descarté.**

| Sitio | Motivo |
|---|---|
| siteinspire.com | 429 y 502 |
| awwwards.com | conexión reseteada y 502 |
| land-book.com | desafío de Cloudflare ("Un momento…") |
| godly.website | redirige a recent.design, que hoy es un feed general de diseño y no de sitios |
| natoora.com | 502 y después cargó sin CSS |
| valleyviewproduce.com | "under construction" |
| riverford.co.uk, danica.com.ar | 403 |
| bonafide.com.ar | "Confirm you are human" |
| buckssauce.com | verificación de Vercel |
| larevoltosa.es | quedó colgado en un desafío |
| lasalamandra.com.ar, cabrales.com.ar, jorgito.com.ar, mayoristavital.com.ar, quilapan.com | 502 del proxy |
| guaymallen.com.ar | error de TLS |

Como galería usé **CSS Design Awards** (categoría *food/drink*), que sí cargó. De ahí salió Celtic Sea Salt.

---

## Marcas de comida (actitud, no estructura)

### 1. Graza · https://www.graza.co/
Capturas: [desktop](capturas/graza--desktop.jpg) · [desktop, scroll](capturas/graza--desktop-2.jpg) · [mobile](capturas/graza--mobile.jpg)
**Sirve para:** B, y también A.

**Qué tomar:**
- **Tipografía:** *ITC Garamond Condensed* en los títulos (72 px, interletra −2,16 px) y *GT Alpina Typewriter* (máquina de escribir) en menú, botones y texto. Con esa mono, "Cart [0]" y "FIND CHIPS" se leen como rótulos.
- **Color:** fondo papel rosado `#F6E6D9`, texto oliva `#3C422E`, un bloque amarillo pleno de lado a lado para el lanzamiento y un botón verde lima.
- **Composición:** borde punteado alrededor de la foto y botones con sombra punteada desplazada, como una costura.
- **Ilustración:** una aceituna con canilla y la onomatopeya "\*DRIP\*". Es un chiste dibujado con el propio producto.
- **Microcopy:** "Glog" en lugar de blog y "Get Refills" en el menú.

**Qué no tomar:** el hero con video oscurecido de una mano con la botella. DPI no tiene fotos ni video, y el texto queda chico sobre la imagen.

### 2. Fly By Jing · https://flybyjing.com/
Capturas: [desktop](capturas/flybyjing--desktop.jpg) · [desktop, scroll](capturas/flybyjing--desktop-2.jpg) · [mobile](capturas/flybyjing--mobile.jpg)
**Sirve para:** B.

**Qué tomar:**
- **Tipografía:** *JeanLuc* (condensada pesada, mayúsculas, 88 px) con *Publico* como serif de texto (22 px).
- **Color:** bloques plenos que cambian en cada sección: negro, rojo, verde `#046135` y violeta. La frase de prensa va en amarillo `#FFF000` sobre verde.
- **Composición:** el corte entre el hero negro y el bloque rojo es un **borde dentado**, igual al de un sobre.
- **Sellos:** "VEGAN" y "WOMAN OWNED" son sellos estrella amarillos con texto rojo.

**Qué no tomar:**
- la marquesina con emojis (📦 ⚡ 🎁);
- el muro de logos de prensa;
- el chat flotante que tapa contenido;
- la foto de la fundadora: DPI no muestra al equipo.

### 3. Oatly · https://www.oatly.com/
Capturas: [desktop](capturas/oatly--desktop.jpg) · [ventana "START"](capturas/oatly--desktop-2.jpg) · [mobile](capturas/oatly--mobile.jpg)
**Sirve para:** C (planilla) y B (tono).

**Qué tomar:**
- **Fondo:** papel cuadriculado, como una planilla.
- **Tarjetas:** borde negro y sombra dura. Cada una tiene una etiqueta de categoría en una cajita de color ("PRODUCTS", "NEWS", "TASTEBUDS").
- **Objetos:** foto de un ticket de compra.
- **Gesto de corrección:** "HOW TO ~~MAKE~~ MATCHA", con la palabra tachada en verde.
- **Tipografía:** *Margo Pro* (según `getComputedStyle`, en etiquetas y título) y letras pesadas dibujadas a mano en las piezas.

**Qué no tomar:**
- la metáfora de sistema operativo: para ver productos hay que tocar "START", y en mobile no se entiende en 5 segundos qué venden;
- el humor provocador ("fckoatly.com"), que no es la voz de DPI.

### 4. Brightland · https://brightland.co/
Capturas: [desktop](capturas/brightland--desktop.jpg) · [desktop, scroll](capturas/brightland--desktop-2.jpg) · [mobile](capturas/brightland--mobile.jpg)
**Sirve para:** A.

**Qué tomar:**
- **Tipografía:** *Advercase*, una serif condensada de display ("Hello, Cozy Season"), con *CircularXX* en la interfaz.
- **Fotografía** (para los prompts de la fase 4): el producto de frente, con la etiqueta legible y rodeado de ingredientes reales (limón cortado, ajo, repollo, pan, repasador a cuadros) con luz natural. Para DPI: el sobre de mayonesa junto al pancho y el de azúcar junto al café con leche.

**Qué no tomar:**
- el popup a pantalla completa "You've Got A Mystery Discount", que salió al entrar;
- el carrusel de testimonios con estrellas;
- la cinta de logos de prensa;
- la barra de envío gratis.

### 5. Fishwife · https://eatfishwife.com/
Capturas: [desktop](capturas/fishwife--desktop.jpg) · [desktop, scroll](capturas/fishwife--desktop-2.jpg) · [mobile](capturas/fishwife--mobile.jpg)
**Sirve para:** B, y también A.

**Qué tomar:**
- **Hero:** una **pared de latas apiladas**: más de 15 envases, cada uno de un color, con ingredientes intercalados. La repetición del envase *es* la imagen.
- **Texto:** va en una caja crema con borde fino, encima de la pila.
- **Tipografía:** *Recoleta* (serif suave) con *Albert Sans*, sobre fondo crema `#FFFCF3`.

**Qué no tomar:**
- la fila "Hello Delicious & Nutritious Meals", con 4 ilustraciones, título y dos líneas ("On-the-go", "Protein Packed", "Clean Ingredients", "Sustainably Sourced"): es exactamente la grilla de beneficios que prohíbe `CLAUDE.md`;
- el menú de siete píldoras.

## Galería (CSS Design Awards, *food/drink*)

### 6. Celtic Sea Salt · https://celticseasalt.com/
Capturas: [desktop](capturas/celticseasalt--desktop.jpg) · [desktop, scroll](capturas/celticseasalt--desktop-2.jpg) · [mobile](capturas/celticseasalt--mobile.jpg)
**Sirve para:** A.

**Qué tomar:**
- **Tipografía:** *Texturina* (OFL) en todo, una serif con trazo de grabado.
- **Color:** azul `#0033A1` sobre blanco, con acento amarillo en el carrito.
- **Ilustración:** grabado de la salina con un salinero y el borde inferior de **papel rasgado**.
- **Marco de etiqueta:** con ornamentos en las esquinas.
- **Detalles de sello:** botón con contorno punteado, pestañas de producto con forma de etiqueta y un sello circular de un color distinto por variedad, y un sticker inclinado ("Loved by Chefs & Home Cooks").
- **Microcopy:** "Since 1976" en la primera línea.

**Para DPI:** un marco-etiqueta que retome el recuadro del dorso del sobre de azúcar, con "Desde 2001" arriba.

**Qué no tomar:**
- el discurso de bienestar ("hydration and mental clarity");
- la tarjeta centrada sobre una ilustración a sangre como único esquema de página.

## Proveedores B2B

### 7. Wildfarmed · https://wildfarmed.com/
Capturas: [desktop](capturas/wildfarmed--desktop.jpg) · [desktop, scroll](capturas/wildfarmed--desktop-2.jpg) · [mobile](capturas/wildfarmed--mobile.jpg)
**Sirve para:** B.

**Qué tomar:**
- **Tipografía:** *interstate-compressed* 900, en mayúsculas y a 130 px, con **una sola palabra por frase** en letra manuscrita (*wildly*): "REGENERATIVE".
- **Color:** verde lima `#9AFF65` con verde oscuro `#0D3126`.
- **Composición:** borde ondulado entre la foto y el bloque de color.
- **Acceso B2B:** "WHOLESALE" y "TRADE LOGIN" están en el menú principal. En mobile, "TRADE LOGIN" queda **fuera de la hamburguesa**.
- **Fotografía:** con flash y sin pose; por ejemplo, una tostada con mermelada (un desayuno real).

**Qué no tomar:**
- los stickers de animales sin relación con el producto;
- las fotos de gente comiendo, porque DPI no va a tener fotos de personas;
- el tono de misión ("pioneering").

### 8. Baldor Specialty Foods · https://www.baldorfood.com/
Capturas: [desktop](capturas/baldorfood--desktop.jpg) · [desktop, scroll](capturas/baldorfood--desktop-2.jpg) · [mobile](capturas/baldorfood--mobile.jpg)
**Sirve para:** C.

**Qué tomar:**
- **Tarjeta mayorista**, de arriba hacia abajo:
  - el proveedor en verde chico (`#007050`, 12 px, semibold): "Campo Rosso Farm";
  - el nombre del producto;
  - un chip con la unidad: "5 LB" o "8 LB AVG | 2 PC";
  - el código: "R52", "MEPKCOB";
  - etiquetas como "Local" o "Peak".
- **Editorial que le habla al cliente en su tarea:** "Fall Menu Reset: Braising — … to *reset your seasonal menus*", con la última frase en itálica.
- **Tipografía:** *RuderPlakat* (condensada) en los titulares y *Herbik* (serif) en el texto. La interfaz usa *Inter*, que está prohibida para DPI.

**Qué no tomar:**
- la grilla de tarjetas iguales con "+" de e-commerce, porque DPI no tiene carrito;
- el menú de 13 categorías;
- las fotos de carne cruda.

## Sitios argentinos

### 9. Atelier Fuerza · https://atelierfuerza.com/
Capturas: [desktop](capturas/atelierfuerza--desktop.jpg) · [desktop, preventas](capturas/atelierfuerza--desktop-2.jpg) · [mobile, /locales/](capturas/atelierfuerza--mobile.jpg)
**Sirve para:** C. Es la mejor referencia de la lista.

**Qué tomar:**
- **Tipografía:** *Anton* (96 a 187 px) con *Space Mono* en todo el texto. Las dos son OFL.
- **Color:** `#1A1B1B`, `#DEDFDE` y rojo `#B95348`.
- **Secciones numeradas:** "[01]. PANADERÍA & PASTELERÍA", "[02]. PREVENTAS ABIERTAS".
- **Rótulos:**
  - el rótulo en caja "INDUSTRIA ARGENTINA";
  - la etiqueta roja "ABIERTA HASTA EL 14/10";
  - "RETIRO: SÁB 17 O DOM 18 DE OCT";
  - "Hasta 3 por persona".
- **Locales en mobile:**
  - un filtro "Todos (21) / Con WhatsApp (10)";
  - cada local con el barrio en mono chico, la dirección grande, un botón negro "WHATSAPP" con el número y "CÓMO LLEGAR →";
  - la honestidad de "Sin WhatsApp por ahora".
- **Proveeduría** (lo vi en la exploración de `/proveeduria/`, sin captura guardada):
  - "Si tenés un local gastronómico y querés tener nuestros productos, escribinos.";
  - un selector "¿Tenés local? Sí / No";
  - "Contanos qué productos te interesan y cada cuánto los necesitás." Es casi el texto de "Armá tu consulta".

**Qué no tomar:**
- Anton + Space Mono tal cual: es su identidad;
- el casi monocromo: DPI tiene que usar los colores de su producto;
- un formulario con servidor: en DPI eso es WhatsApp.

### 10. Cuervo Café · https://cuervocafe.com/
Capturas: [desktop](capturas/cuervocafe--desktop.jpg) · [desktop, /mayorista/](capturas/cuervocafe--desktop-2.jpg) · [mobile](capturas/cuervocafe--mobile.jpg)
**Sirve para:** C.

**Qué tomar:**
- **Tipografía:** *Thunder* (condensada) con *Iki Mono*.
- **Color:** amarillo `#ECC655` en la cinta superior y en el ítem activo del menú.
- **"MAYORISTA" en el menú principal,** al mismo nivel que "TIENDA".
- **Texto de la página mayorista:** "Si te gustaría usar café tostado por nosotros en tu cafetería, restaurante u oficina, nos encantaría **laburar con vos**". El link va resaltado como con marcador.
- **Cinta superior:** con un dato concreto ("ENVIOS GRATIS EN CABA DESDE $95.000").

**Qué no tomar:**
- el hero de video y las fotos del tostadero y del equipo (DPI no va a tener fotos de depósito ni de equipo);
- el formulario mayorista, que mezcla tú y vos ("¿Ya tienes local?" junto a "Completá este formulario");
- la marquesina en movimiento.

### 11. Diarco · https://www.diarco.com.ar/
Capturas: [desktop](capturas/diarco--desktop.jpg) · [mobile](capturas/diarco--mobile.jpg)
**Sirve para:** sobre todo como anti-referencia; también es un caso de horarios.

**Qué tomar:** el aviso del feriado, anticipado y con la hora exacta: "HORARIOS FERIADO 12 DE OCTUBRE · Todas las sucursales abrirán de 8 a 21 hs." En otra slide que vi en la exploración, las sucursales están agrupadas por franja horaria.

**Qué no tomar:**
- el aviso va **en una imagen dentro de un carrusel de 8 slides**: no se lee sin JS, no lo indexan Google ni las IA, y desaparece al rotar;
- *Montserrat*;
- los íconos al lado de cada ítem del menú;
- los bloques rojo y amarillo de supermercado, con fotos del folleto y del edificio;
- el botón flotante encimado sobre el contenido.

## Horarios en vivo y días por zona

### 12. Oddbox · https://www.oddbox.co.uk/
Capturas: [desktop, después de cargar el código postal](capturas/oddbox--desktop.jpg) · [desktop, scroll](capturas/oddbox--desktop-2.jpg) · [mobile](capturas/oddbox--mobile.jpg)
**Sirve para:** C.

**Qué tomar:**
- **Interacción:** cargué el código postal "E1 6AN" y el hero se reemplazó por "Good news! We deliver to your area overnight every **Wednesday**". El día va en color y el botón "Pick your box" queda justo abajo. En mobile entra en el primer pantallazo.
- **Microcopy:** "we deliver overnight – just like the milkman. So your box will be there in time for breakfast."
- **Tipografía:** *GT Alpina* (serif) con *Azeret SemiMono* (OFL) en el texto.
- **Color:** naranja, el kraft de la caja y marrón `#2D1C0E`.

**Qué no tomar:**
- el "How it works" en 3 pasos con íconos, que está prohibido;
- las estrellas de Trustpilot;
- la marquesina de slogans;
- el botón "help" flotante.

### 13. Milk & More · https://www.milkandmore.co.uk/
Capturas: [desktop](capturas/milkandmore--desktop.jpg) · [resultado "¿llegamos?"](capturas/milkandmore--desktop-2.jpg) · [mobile](capturas/milkandmore--mobile.jpg)
**Sirve para:** C, y A por la tipografía.

**Qué tomar:**
- **Consulta de zona:** "Check we deliver" abre un único campo de código postal. Con "BS6 6AA" responde:
  - "Great news! We deliver to you";
  - una franja con "Delivery days **Tuesday, Thursday, Saturday**";
  - tres datos: "On your doorstep by 7am", "Place and amend orders up to 9pm the night before" y "FREE delivery".
- **Tagline:** "good mornings delivered".
- **Tipografía:** *Libre Baskerville* con *Gill Sans Nova*.
- **Ilustración:** textura de grabado o linóleo en azul (botellas y cucharas).
- **Menú:** "Business Deliveries" en el menú superior.

**Qué no tomar:**
- las fotos del lechero y de la camioneta (el brief las descarta);
- el resultado en un modal: en DPI va en la página;
- el hero centrado en una caja sobre un patrón.

### 14. Blue Bottle Coffee · https://bluebottlecoffee.com/us/eng/cafes
Capturas: [desktop](capturas/bluebottle--desktop.jpg) · [mobile](capturas/bluebottle--mobile.jpg). Saqué por script un popup de suscripción y el banner de la app, que tapaban todo.
**Sirve para:** C (el reloj).

**Qué tomar:**
- **Cada café** muestra el nombre en mayúsculas espaciadas (*ABC Marfa*), la dirección subrayada como link y, alineado a la derecha, "Open until 8:00 PM" en gris (*ABC Diatype*, 14 px, `#333`).
- **El estado se expresa con la hora de cierre,** sin punto verde ni animación.

**Qué no tomar:**
- las fotos de los locales;
- el popup y el banner de la app, que en mobile tapan todo el contenido.

**Nota sobre licencias.** Varias de estas familias son comerciales: GT Alpina, Recoleta, Publico, Advercase, interstate y Thunder. Las libres que aparecieron son Anton, Space Mono, Azeret Mono, Texturina y Libre Baskerville. La elección final y su justificación van en `docs/diseno.md`.

---

## Principios extraídos

1. **La hora es el dato más grande de la página.**
   - Referencias: Atelier Fuerza pone "ABIERTA HASTA EL 14/10" en una etiqueta roja; Milk & More promete "by 7am"; Blue Bottle resuelve el "abierto" con "Open until 8:00 PM".
   - En DPI: "5:00" es el número más grande de la home. El estado va en texto: "Atendiendo hasta las 16:00 · te contesta Diego" o "Arrancamos a las 5:00 · dejanos tu mensaje". Un punto verde puede acompañar, pero no reemplaza la hora.

2. **La zona se responde con un día, en una frase.**
   - Referencias: Oddbox ("We deliver to your area overnight every Wednesday") y Milk & More ("Delivery days Tuesday, Thursday, Saturday").
   - En DPI: "A Morón vamos los jueves. Sin mínimo si pedís para ese día." o "Capital: en general, al día siguiente. Sin mínimo.". El día va resaltado y abajo, el botón de WhatsApp con la zona ya escrita. Todo en la página, sin modal.

3. **Repetir el producto hasta que sea textura.**
   - Referencias: Fishwife arma el hero con una pared de latas; Graza llena un canasto de bolsas.
   - En DPI: una pila o grilla de sobres ilustrados (amarillo mayonesa, rojo ketchup, el verde del edulcorante propio, potecitos de mermelada) dice "por mayor" sin escribirlo. En mobile alcanza con una franja de 6 a 8 sobres.

4. **El borde del sobre como firma.**
   - Referencias: Fly By Jing corta con un dentado, Wildfarmed con una onda y Celtic con papel rasgado.
   - En DPI: el sobre de sal tiene el borde termosellado dentado (se ve en `sobres-propios-dpi.jpg`). Usarlo como corte entre secciones o como borde de tarjeta. Es el borde real del producto, no una onda decorativa.

5. **Un color por categoría, sacado del envase.**
   - Referencias: Fly By Jing cambia de bloque pleno en cada sección; Celtic le da un sello de color a cada variedad.
   - En DPI:
     - Aderezos en amarillo mayonesa (Natura).
     - Ketchup en rojo.
     - Endulzantes con el verde del sobre propio.
     - Mermeladas en frutilla o durazno.

     Planos y sin degradés, con texto AA encima.

6. **Una letra con voz y una letra de dato.**
   - Referencias: Graza (Garamond condensada con máquina de escribir), Atelier Fuerza (Anton con Space Mono), Oddbox (GT Alpina con Azeret SemiMono) y Cuervo (Thunder con Iki Mono).
   - En DPI:
     - La letra de voz, para "Te contesta Diego, desde las 5".
     - La de dato (mono o condensada), para horarios, zonas, "Factura A", "cheque a 30 o 60 días" y "Natura · Abedul · Danica".

7. **Numerar y rotular como en un remito.**
   - Referencias: Atelier Fuerza usa "[01]." y rótulos en caja ("INDUSTRIA ARGENTINA"); Baldor pone en cada tarjeta el proveedor, un chip de unidad y el código.
   - En DPI: una tarjeta con la marca en chico ("Natura"), el nombre grande ("Mayonesa en sobre") y un chip de categoría. El gramaje y las unidades por caja se suman cuando existan; hoy no están, así que el diseño no puede depender de ellos.

8. **Hablarle al negocio en su momento del día.**
   - Referencias: Baldor ("Fall Menu Reset: Braising") para cocineros; Cuervo ("en tu cafetería, restaurante u oficina"); Atelier ("¿Tenés local?").
   - En DPI:
     - Para clínicas: la bandeja del desayuno (azúcar, edulcorante, mermelada, manteca, tostadas) y la del almuerzo (mayonesa, ketchup, mostaza, salsa golf), como pieza visual.
     - Para comercios: "el aderezo del pancho y el edulcorante del café".

9. **El canal de pedido, siempre a la vista.**
   - Referencias: Wildfarmed deja "TRADE LOGIN" fuera de la hamburguesa en mobile; Cuervo pone "MAYORISTA" en el menú principal; Atelier pone un botón "WHATSAPP" en cada local.
   - En DPI: a 390 px, el WhatsApp y el estado "Atendiendo" quedan en el header o fijos abajo, nunca adentro del menú.

10. **Microcopy de dato, y honesto.**
    - Referencias: Milk & More ("Place and amend orders up to 9pm the night before"); Atelier ("Hasta 3 por persona", "Sin WhatsApp por ahora"); Celtic ("Since 1976" en la primera línea).
    - En DPI: "Desde 2001", "Lunes a viernes, de 5 a 16", "en general, al día siguiente" y una sola vez "Si no lo ves en la lista, preguntanos".

11. **Horarios y feriados en texto, nunca en una imagen.**
    - Referencia: Diarco anuncia el horario del feriado en una imagen dentro de un carrusel.
    - En DPI: el aviso sale de `horario.feriados` como texto visible y como `openingHoursSpecification` en el JSON-LD, y funciona sin JS. Ejemplo de formato: "El lunes 12/10 no atendemos. El martes arrancamos a las 5:00."

12. **Ilustrar con oficio, no con íconos.**
    - Referencias: Celtic (grabado de la salina), Milk & More (textura de linóleo), Graza (aceituna con canilla y "\*DRIP\*").
    - En DPI: dibujar los sobres y los potecitos con su proporción, su borde y su etiqueta. También se puede usar el recuadro redondeado del dorso del sobre de azúcar como marco tipográfico. Nada de íconos de taza o tenedor por categoría.

## Lo que hay que evitar

Esto es lo que se vio genérico o "hecho por IA" en este rubro, con ejemplos. Los marcados con "(expl.)" los vi en la exploración pero no guardé captura.

- **Grilla de beneficios con íconos y "Cómo funciona" en 3 pasos.** Fishwife ("On-the-go / Protein Packed / Clean Ingredients / Sustainably Sourced") y Oddbox ("Pick a box / Make swaps / Wake up"). Si marcas bien diseñadas caen ahí, cualquier generador también cae.
- **Frase abstracta centrada sobre una foto oscura, con botón píldora.** Rapanui ("INNOVAR ES NUESTRA MÁS RICA TRADICIÓN") y Natura, el proveedor de DPI ("CALIDAD NATURA · BIEN DE FAMILIA") (expl.). No dicen qué venden, a quién ni cuándo.
- **Fotos de stock de gente en un comedor.** Smucker Away From Home, un proveedor de porciones para foodservice ("We thrive on delight…") (expl.). Es el riesgo más alto del rubro.
- **Información clave adentro de un carrusel con puntitos.** Diarco (el feriado), Paladini y Café Martínez (expl.).
- **Muros de logos de prensa y estrellas de reseñas.** Brightland, Fly By Jing y Oddbox. DPI no los tiene y no se inventan.
- **Popups al entrar.** Brightland ("Mystery Discount"), Blue Bottle y Belazu (expl.). Tapan el botón de WhatsApp.
- **Marquesinas de slogans, a veces con emojis.** Fly By Jing (📦 ⚡ 🎁), Oddbox y Cuervo.
- **La tipografía por defecto del rubro.** *Montserrat* en Diarco, Paladini, Taragüí y Smucker; *Open Sans*, *Poppins* y *Roboto* en Maxiconsumo (expl.). Es el look que hay que esquivar.
- **Fotos de camión, depósito o equipo.** El camión en sepia del sitio viejo de DPI, el lechero y la camioneta de Milk & More, el tostadero de Cuervo. El brief las descarta.
- **Tarjetas iguales con "+" de e-commerce.** Baldor. DPI no tiene carrito: la tarjeta termina en "Pedir por WhatsApp".
- **Mezclar tú y vos.** El formulario mayorista de Cuervo.

## Tabla: dirección → referencias clave

| Dirección | Referencia | Qué tomar |
|---|---|---|
| **A · Almacén de confianza** | Celtic Sea Salt | Marco de etiqueta con ornamentos, grabado, sello punteado y "Since 1976" en la primera línea → "Desde 2001" y el recuadro del dorso del sobre. |
| | Graza | Serif condensada para la voz, máquina de escribir para la interfaz, papel rosado y bordes punteados tipo costura. |
| | Milk & More | Baskerville con textura de grabado; "good mornings delivered" como tono para las 5 de la mañana. |
| **B · Color de sobre** | Fly By Jing | Bloques plenos que cambian en cada sección, borde dentado y sellos estrella. |
| | Fishwife | Pared de envases de colores como imagen principal → pila de sobres ilustrados. |
| | Wildfarmed | Condensada 900 con una palabra manuscrita; lima sobre verde oscuro; acceso B2B fuera de la hamburguesa. |
| **C · Despacho a las 5 AM** | Atelier Fuerza | "[01]." numerado, Anton con Space Mono, etiquetas con fecha, locales con botón de WhatsApp y "Sin WhatsApp por ahora". |
| | Oddbox / Milk & More | El día de reparto en una frase con el día resaltado; la hora de corte ("up to 9pm the night before"). |
| | Blue Bottle | El estado como hora de cierre ("Open until 8:00 PM"), en texto chico junto a la dirección. |
