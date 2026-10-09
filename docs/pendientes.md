# Pendientes para confirmar con el dueño

Datos provisorios **(S)** que el sitio ya usa, y preguntas que surgieron en el camino.
Cada dato se cambia en **una sola línea** del archivo indicado.

## Contacto y horario

| # | Dato | Valor que usa el sitio hoy | Dónde se cambia |
|---|---|---|---|
| 1 | Número de WhatsApp | `5491100000000` (placeholder, **no funciona**) | `src/data/empresa.ts` → `whatsapp.numero` y `numeroVisible` |
| 2 | Quién atiende el WhatsApp | Diego | `src/data/empresa.ts` → `whatsapp.atiende` |
| 3 | Mail de contacto | `ventas@dpi-arg.com.ar`. En los sobres impresos figuran **dos**: `ventas@` (azúcar) y `contacto@` (edulcorante). ¿Cuál se usa hoy? ¿Llegan los dos? | `src/data/empresa.ts` → `email` |
| 4 | Feriados sin atención | ninguno cargado | `src/data/horario.ts` → `feriados` |
| 5 | Instagram | no hay | `src/data/empresa.ts` → `instagram` |
| 6 | Perfil de Google Maps | no hay link. ¿Existe la ficha? Si no, conviene crearla (ayuda mucho en búsquedas locales) | `src/data/empresa.ts` → `googleMaps` |
| 7 | Código postal y coordenadas del depósito | sin cargar (para el mapa y los datos estructurados) | `src/data/empresa.ts` → `direccion` |

## Clientes

| # | Dato | Valor que usa el sitio hoy | Dónde se cambia |
|---|---|---|---|
| 8 | ¿Se puede publicar "más de 200 clientes"? | sí, se muestra | `src/data/empresa.ts` → `clientesPublicables` (`null` para ocultarlo) |

## Productos y marcas

| # | Dato | Valor que usa el sitio hoy | Dónde se cambia |
|---|---|---|---|
| 9 | Marca del azúcar | Abedul. En el sitio viejo hay un sobre "Atenas" con el dorso impreso por DPI: ¿el azúcar también es de línea propia? | `src/data/productos.ts` |
| 10 | Nombre de la línea propia de edulcorante | "Edulcorante DPI" (el sobre actual dice "DPI · Edulcorante" y el dorso "Endulcina") | `src/data/productos.ts` |
| 11 | Marca del queso crema | Abedul | `src/data/productos.ts` |
| 12 | Marca de la manteca | Dánica | `src/data/productos.ts` |
| 13 | Marca de las galletitas | Abedul | `src/data/productos.ts` |
| 14 | Marca de las tostadas | sin marca. En el sitio viejo aparecen tostadas **Breviss**: ¿siguen siendo esas? | `src/data/productos.ts` |
| 15 | Productos del sitio viejo que no están en el brief | sal, pimienta, aceite, vinagre, jugo de limón, salsa de soja, aderezo César, miel, dulce de leche, jalea de membrillo, leche, té, submarino; aderezos Dánica; galletitas Granix, María Elena, Maurita. ¿Alguno se sigue vendiendo y conviene mostrarlo? | `src/data/productos.ts` |

## Entregas

| # | Dato | Valor que usa el sitio hoy | Dónde se cambia |
|---|---|---|---|
| 16 | Día de reparto en Morón | jueves | `src/data/entregas.ts` |
| 17 | Día de reparto en Zona Norte | martes | `src/data/entregas.ts` |
| 18 | ¿Qué localidades entran en "Zona Norte"? (el depósito está en Florida, que es Zona Norte) | sin detalle | `src/data/entregas.ts` → `detalle` |

## Sitio, dominio e identidad

| # | Tema | Estado |
|---|---|---|
| 19 | **El sitio viejo (WordPress) está hackeado**: tiene inyectado un texto con un link a un casino sueco (`tackel.se`), que Google ve y que perjudica la reputación del dominio. Conviene limpiarlo o darlo de baja cuanto antes, sin esperar al sitio nuevo. | urgente |
| 20 | Acceso al dominio `dpi-arg.com.ar` (quién lo administra, dónde están los DNS) para publicar el sitio nuevo en Cloudflare Pages o Netlify | a definir |
| 21 | Logo: el sitio usa propuestas de renovación del wordmark "DPI" (misma estructura: esfera, DPI, línea, "Productos Individuales"). Hay que elegir una y, si se aprueba, actualizar también los sobres impresos | fase 1 |
| 22 | Fotos reales de producto | más adelante (fase 4: guía de fotos y prompts) |

## Decisiones de diseño para que el dueño vea

| # | Tema | Estado |
|---|---|---|
| 23 | Dirección visual elegida: **B · Color de sobre** con piezas de C (ver `docs/direcciones/resumen.md`). Las tres propuestas están en `docs/capturas/fase-1/` | elegida por el equipo, se puede revisar |
| 24 | Wordmark: punto sólido de color (B) o esfera tramada (A). Las dos mantienen la estructura del logo actual | a elegir |
