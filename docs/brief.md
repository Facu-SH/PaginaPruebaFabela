# Brief — DPI (Productos Individuales SRL)

> Los datos marcados **(S)** son supuestos provisorios: se usan tal cual y después se confirman. No cambian la estructura, solo los valores.

## El negocio en una frase
Distribuidora de alimentos en porciones individuales con base en Florida (Vicente López) que desde 2001 abastece a clínicas, bares, kioscos y comercios de Capital y GBA, y que se distingue por contestar el WhatsApp al instante desde las 5 de la mañana.

## Qué los hace distintos (en orden de importancia)
1. **Atención rápida y humana.** El WhatsApp lo atiende una persona, Diego (S), de lunes a viernes de 5 a 16 h, y contesta en minutos. Es la razón principal por la que los clientes se quedan.
2. **Arrancan a las 5 de la mañana.** Un bar o una clínica que abre temprano tiene a quién escribirle. Es el dato más memorable del negocio: usalo.
3. **Entrega rápida en Capital.** Pedís hoy y en general lo tenés al día siguiente. Depende del producto y del stock: es un "en general", no una garantía.
4. **Precio.** Los clientes también se quedan por el precio, pero la lista no es pública: se pide por WhatsApp o mail.
5. **25 años en el rubro** (desde 2001) y especialización total: solo porciones individuales.

## Quiénes compran

### Clínicas e instituciones (el cliente más rentable)
- Son pocas, compran mucho y con regularidad. Hoy generan la mayor parte del volumen.
- Piden un mix de todo, porque dan algo en cada comida:
  - **Desayuno y merienda:** azúcar, edulcorante, mermeladas, manteca, queso crema, tostadas, galletitas, vainillas.
  - **Almuerzo y cena:** mayonesa, ketchup, mostaza, salsa golf.
- Pagan con cheque a 30 o 60 días, con Factura A.
- Les importa que no falte nada, la regularidad y la facturación en regla.

### Comercios: kioscos, bares, almacenes, confiterías, puestos de comida
- Son muchos y cada uno compra poco. Son la mayoría de los clientes en cantidad.
- Pedido típico: edulcorante y mayonesa; a veces azúcar o mermeladas. Es el aderezo que se regala con el pancho, o el azúcar y el edulcorante que acompañan el café.
- Les importa que no haya mínimo, la rapidez y el precio.

### Clientes actuales
No usan la web: escriben "Hola, buen día" por WhatsApp y dejan el pedido. **El sitio es para clientes nuevos.**

## Cómo llegan los clientes nuevos
- Boca en boca (el canal principal).
- La lista de precios impresa que se deja en los repartos. Oportunidad: sumarle un QR que lleve al sitio o al WhatsApp.
- Algunos por Google o Google Maps.
- Objetivo nuevo: que también los recomienden ChatGPT, Gemini, Perplexity y Claude.

## Productos (S)
Las marcas pueden cambiar. Los más vendidos son **mayonesa Natura, edulcorante y mermeladas**.

| Categoría | Producto | Marca | Notas |
|---|---|---|---|
| Aderezos | Mayonesa | Natura | El más vendido |
| Aderezos | Ketchup | Natura | |
| Aderezos | Mostaza | Natura | |
| Aderezos | Salsa golf | Natura | |
| Endulzantes | Azúcar | Abedul (S) | |
| Endulzantes | Edulcorante | Línea propia DPI (S: nombre a definir) | Sobre con diseño propio. Muy vendido |
| Mermeladas | Frutilla, durazno, ciruela, frutos rojos | Abedul | Muy vendidas |
| Mermeladas | Surtida | La arma DPI | Mix de los sabores anteriores |
| Lácteos (frío) | Queso crema | Abedul (S) | Viene creciendo |
| Lácteos (frío) | Manteca | Danica (S) | Viene creciendo |
| Galletitas | Dulces, sándwich, sin sal | Abedul (S) | |
| Galletitas | Vainillas | Mauri | |
| Panificados | Tostadas | (S: marca a confirmar) | Las piden las clínicas |

- Hay más productos de los que se muestran. El sitio tiene que decir "si no lo ves, preguntanos", una sola vez y bien dicho.
- Todavía no hay gramajes ni unidades por caja. El modelo de datos tiene que permitir sumarlos después (campos opcionales).

## Datos iniciales (portar a `src/data/`)
```yaml
empresa:
  razon_social: Productos Individuales SRL
  nombre_comercial: DPI
  desde: 2001
  direccion:
    calle: Bernardo de Irigoyen 877
    localidad: Florida
    partido: Vicente López
    provincia: Buenos Aires
    pais: AR
  telefono: "+54 11 4730-4423"
  email: ventas@dpi-arg.com.ar
  whatsapp:
    numero: "5491100000000"     # (S) placeholder, reemplazar por el real
    atiende: Diego              # (S) sin foto por ahora
  dominio: https://dpi-arg.com.ar
  instagram: null               # (S) completar
  google_maps: null             # (S) completar

horario:
  zona_horaria: America/Argentina/Buenos_Aires
  dias: [lunes, martes, miercoles, jueves, viernes]
  abre: "05:00"
  cierra: "16:00"
  feriados: []                  # (S) opcional, para el indicador "atendiendo ahora"
  retiro_en_deposito: true      # mismo horario, en la dirección de arriba

entregas:
  - zona: Capital Federal (incluye microcentro)
    dias: todos los días hábiles
    plazo: en general, al día siguiente del pedido
    pedido_minimo: sin mínimo
  - zona: Morón
    dias: jueves                # (S)
    pedido_minimo: sin mínimo si pedís para el día de reparto
  - zona: Zona Norte (GBA)
    dias: martes                # (S)
    pedido_minimo: sin mínimo si pedís para el día de reparto
  - zona: Otras zonas
    dias: consultar
    pedido_minimo: consultar

pagos:
  facturacion: [Factura A, Consumidor final]
  medios: [efectivo, transferencia, cheque]
  instituciones: cheques a 30 o 60 días

clientes:
  total_aprox: 200              # (S) confirmar si se puede publicar ("más de 200 clientes")
  regulares_aprox: 50           # dato interno: NO publicar
  nombrables: []                # no hay por ahora: no inventar

precios:
  publicos: false
  como_pedir: por WhatsApp o mail
```

## Voz
Cordial, cercana y respetuosa, como habla el dueño con sus clientes: ni formal extremo ni "holaaa ¿cómo va?".

| Bien | Mal |
|---|---|
| "Escribinos por WhatsApp de lunes a viernes desde las 5 de la mañana. Te contesta Diego, en minutos." | "Brindamos una atención personalizada y de excelencia." |
| "En Capital no hay pedido mínimo: si pedís hoy, en general lo tenés mañana." | "Soluciones logísticas ágiles adaptadas a tus necesidades." |
| "Mayonesa, ketchup y mostaza Natura en sobre, para el pancho o la hamburguesa." | "Amplia variedad de aderezos de primera calidad." |

## Mapa del sitio sugerido
Podés proponer cambios con argumentos.
- `/`: inicio.
- `/productos/` y una página por categoría: `aderezos`, `endulzantes`, `mermeladas`, `lacteos`, `galletitas-y-tostadas`.
- `/clinicas/`: clínicas, geriátricos e instituciones.
- `/comercios/`: kioscos, bares, almacenes y confiterías.
- `/entregas/`: zonas, días, pedido mínimo, retiro en depósito y formas de pago.
- `/preguntas-frecuentes/`.
- `/contacto/`.
- `/lista/` (opcional): destino del QR de la lista de precios impresa. Una pantalla, pensada para el celular, con botón directo a WhatsApp.

## Funcionalidades (por prioridad)
1. **WhatsApp con mensaje prellenado según el contexto:** pedir lista de precios, hacer un pedido, consulta de clínica, consulta de comercio o un producto puntual. En el celular, el botón es flotante.
2. **"Atendiendo ahora":** se calcula con la hora de Buenos Aires, sin importar dónde esté el visitante.
   - Abierto: "Estamos atendiendo · contestamos en minutos".
   - Cerrado: "Arrancamos a las 5:00 · dejanos tu mensaje y te contestamos a primera hora".
   - Sin JS: muestra el horario.
3. **"¿Qué día llegamos a tu zona?":** elegís la zona y te muestra el día de entrega, si hay pedido mínimo y un botón de WhatsApp con la zona ya escrita en el mensaje.
4. **"Armá tu consulta":** elegís productos (con cantidad aproximada opcional), tipo de negocio y zona, y se abre WhatsApp con el mensaje armado. No guarda datos.
5. **Clínicas, "una porción para cada comida":** el mix de desayuno, almuerzo, merienda y cena presentado como pieza visual, no como lista.

## Identidad
- **Logo:** el actual está medio viejo y se puede renovar. Si está disponible, hay una foto en `docs/referencias/` (`logo-actual.*`). En la fase 1, cada dirección puede proponer un tratamiento del nombre "DPI", siempre aclarado como propuesta.
- **Edulcorante propio:** si está disponible, hay una foto en `docs/referencias/` (`edulcorante.*`).

## Fotos
- Todavía no hay fotos reales. El diseño no puede depender de ellas (ver la regla de placeholders en CLAUDE.md).
- Las imágenes temporales salen de prompts que vos escribís y el dueño genera con un modelo de imagen (fase 4). Sin logos legibles de marcas ajenas.
- Más adelante habrá fotos reales de producto (con celular y caja de luz) o fotos oficiales de los proveedores. Los nombres de archivo son fijos: reemplazar una foto es pisar el archivo.
- No va a haber fotos del depósito, de la camioneta ni del equipo: visualmente no suman.

## Redirecciones del sitio viejo (301)
```
/index.php/salsas/       -> /productos/aderezos/
/index.php/condimentos/  -> /productos/
/index.php/dulces/       -> /productos/mermeladas/
/index.php/galletitas/   -> /productos/galletitas-y-tostadas/
/index.php/varios/       -> /productos/
/index.php/contacto/     -> /contacto/
```

## Contexto previo
- **Sitio actual:** https://dpi-arg.com.ar, en WordPress y desactualizado. Linkea a Natura, Danica y Abedul.
- **Prototipo anterior:** https://facu-sh.github.io/PaginaPruebaFabela/. Sirve como referencia de contenido (preguntas frecuentes, datos estructurados), **no** de diseño: es justamente el look genérico que hay que evitar.
