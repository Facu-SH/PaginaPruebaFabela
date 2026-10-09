# Fase 1 · Resumen comparativo y decisión

Tres homes completas, con datos reales, en `/direcciones/a/`, `/direcciones/b/` y `/direcciones/c/`.
Capturas: `docs/capturas/fase-1/` (`comparacion-mobile.jpg` y `comparacion-desktop.jpg` muestran la primera pantalla de las tres lado a lado).
Detalle de cada una: `a.md`, `b.md`, `c.md`. Referencias: `docs/referencias/analisis.md`.

| | A · Almacén de confianza | B · Color de sobre | C · Despacho a las 5 AM |
|---|---|---|---|
| Idea | El sobre impreso de DPI sobre papel y kraft: la imprenta de barrio | Abrir la caja: cada categoría es dueña del color de su producto | Los papeles de la madrugada: remito, hoja de ruta, ticket |
| Tipografía | Alegreya + SC + Sans (Huerta Tipográfica, BA) | Archivo en tres anchos (Omnibus-Type, BA) | Encode Sans condensada (Impallari) + Chivo Mono (Omnibus) |
| Lo mejor | La más cálida; el wordmark con esfera tramada es el más fiel al logo actual; escenas del café y el pancho | La más memorable y la que mejor pone al producto de protagonista; sistema simple que escala a cada página de categoría | La más funcional: reloj con cuenta regresiva, remito que arma el mensaje de WhatsApp, hoja de ruta zonas × días |
| Riesgo | Kraft marrón pesado en pantalla; el registro "cálido editorial" es el más visto en marcas de comida | Puede leerse como marca de consumo; "atendiendo ahora" aparece tres veces; poca información de entregas en la home | La más larga (≈10.000 px en el celular); muchos rótulos chicos en mono; puede sentirse fría o burocrática para un kiosquero |
| 5 segundos en el celular | Se entiende, pero el CTA queda abajo | Se entiende de inmediato: qué, para quién, Diego desde las 5, botón | Se entiende, pero hay que leer más |

## Decisión: B como base, con las piezas funcionales de C

**Por qué B.** El objetivo del sitio es que alguien entienda en 5 segundos qué vende DPI y termine escribiendo por WhatsApp. B lo logra mejor en la primera pantalla, convierte el producto real (los sobres de colores) en la identidad, funciona sin fotos y su sistema (una categoría = un color, una sola familia tipográfica) escala sin esfuerzo a las páginas de categoría, clínicas, comercios y entregas. Es la que mejor se va a sostener cuando el dueño cambie marcas o sume productos.

**Qué se toma de C** (traducido al lenguaje visual de B, no como estética de formulario):
- El **tablero de atención**: hora de Buenos Aires, franja de 5 a 16 h con la marca "ahora" y cuenta regresiva. Reemplaza las tres pastillas repetidas de B por una sola pieza fuerte.
- El **remito "Armá tu consulta"**: renglones con casilla y cantidad que arman el mensaje de WhatsApp, con la vista previa "Así le llega a Diego". Va en `/productos/`.
- La **hoja de ruta zonas × días** con la columna de hoy marcada y la fecha estimada del próximo reparto. Va en `/entregas/` y resumida en la home.
- La **planilla de bandejas** para clínicas (productos × comidas), combinada con la bandeja ilustrada de B.

**Qué se toma de A:**
- Las **escenas de uso** (el pocillo con los sobres, el pancho con la mayonesa) como recurso para `/comercios/`, redibujadas en el estilo de B.
- La esfera **tramada** del wordmark queda como alternativa para que el dueño compare con el punto sólido de B (ver `docs/pendientes.md`).

**Correcciones a B que entran en la fase 2:**
- Un solo estado "atendiendo ahora" visible por pantalla.
- El botón flotante de WhatsApp aparece solo cuando el botón principal no está a la vista (como en C), así no tapa la portada.
- La primera oración del celular, más corta: el botón tiene que entrar holgado en la primera pantalla.
- La home más corta: el detalle de productos, clínicas y entregas vive en sus páginas.
