// Preguntas frecuentes. Se usan en la página y en el JSON-LD FAQPage (se generan de acá).
// `grupo` las ordena en temas en /preguntas-frecuentes/: pedidos (pedidos y entregas), pagos (precios y pagos), productos.
// La primera oración de cada respuesta es la respuesta corta (la página la destaca): que conteste sola.
//
// Las respuestas se arman con los datos de esta carpeta (quién atiende, horario, zonas y días,
// pedido mínimo, formas de pago, dirección, marcas). Si cambia un dato, por ejemplo el día de reparto
// de Morón en entregas.ts, cambia solo en todas las respuestas. Acá se edita la redacción.
import type { Dia, PreguntaFrecuente, ZonaEntrega } from './types';
import { empresa } from './empresa';
import { horario } from './horario';
import { entregas } from './entregas';
import { pagos } from './pagos';
import { categorias, marcas, productos } from './productos';

// ---------- Ayudas de redacción ----------
const lista = (items: string[]) => (items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`);
const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const DIA: Partial<Record<Dia, string>> = { miercoles: 'miércoles', sabado: 'sábado' };
const dia = (d: Dia) => DIA[d] ?? d;
const hora = (hhmm: string) => String(Number(hhmm.split(':')[0]));
/** "Zona Norte (GBA)" -> "Zona Norte" */
const zonaCorta = (z: ZonaEntrega) => z.zona.replace(/\s*\(.*\)\s*$/, '');
/** "los jueves", "todos los días hábiles" */
const cuando = (z: ZonaEntrega) => (z.dias === 'habiles' ? 'todos los días hábiles' : `los ${lista((z.dias as Dia[]).map(dia))}`);

// ---------- Datos que se repiten en varias respuestas ----------
const atiende = empresa.whatsapp.atiende;
const { calle, localidad } = empresa.direccion;
/** "de lunes a viernes de 5 a 16 h" (con espacio duro antes de la "h", para que no quede sola). */
const atencion = `de ${dia(horario.dias[0])} a ${dia(horario.dias[horario.dias.length - 1])} de ${hora(horario.abre)} a ${hora(horario.cierra)} h`;

const conReparto = entregas.filter((z) => z.dias !== 'consultar');
const aConsultar = entregas.filter((z) => z.dias === 'consultar');
const diaria = entregas.find((z) => z.dias === 'habiles');
const conDiaFijo = entregas.filter((z) => Array.isArray(z.dias));
/** "en Capital Federal todos los días hábiles, en Morón los jueves y en Zona Norte los martes" */
const repartos = lista(conReparto.map((z) => `en ${zonaCorta(z)} ${cuando(z)}`));

// Pedido mínimo: "sin mínimo" a secas, "sin mínimo si pedís para…" (con condición) y "a consultar".
const sinMinimo = entregas.filter((z) => z.pedidoMinimo === 'sin mínimo');
const conCondicion = entregas.filter((z) => /^sin mínimo si /.test(z.pedidoMinimo));
const condicion = (conCondicion[0]?.pedidoMinimo ?? '').replace(/^sin mínimo /, '');
const deTuZona = /reparto$/.test(condicion) && conCondicion.length > 1 ? ' de tu zona' : '';
const respuestaMinimo = [
  sinMinimo.length > 0 && `En ${lista(sinMinimo.map(zonaCorta))} no hay pedido mínimo.`,
  conCondicion.length > 0 &&
    (sinMinimo.length > 0
      ? `En ${lista(conCondicion.map(zonaCorta))} tampoco, ${condicion}${deTuZona}.`
      : `En ${lista(conCondicion.map(zonaCorta))} no hay pedido mínimo ${condicion}${deTuZona}.`),
  aConsultar.length > 0 && `Para ${lista(aConsultar.map((z) => minuscula(z.zona)))}, consultanos.`,
]
  .filter(Boolean)
  .join(' ');

// Cuándo llega: la zona de todos los días con su plazo, y las de día fijo.
const respuestaLlegada = [
  diaria && `En ${zonaCorta(diaria)}, ${diaria.plazo ?? cuando(diaria)}.`,
  conDiaFijo.length > 0 && `${mayuscula(lista(conDiaFijo.map((z, i) => `a ${zonaCorta(z)} ${i === 0 ? 'vamos ' : ''}${cuando(z)}`)))}.`,
  'Depende del producto y del stock, así que te lo confirmamos al tomar el pedido.',
]
  .filter(Boolean)
  .join(' ');

// Facturación y pagos: "Factura A" + "consumidor final"; "efectivo, transferencia y cheque".
const [factura, ...otrasFacturas] = pagos.facturacion;

// Marcas y productos.
const ajenas = marcas.filter((m) => !m.propia);
const porMarca = ajenas
  .map((m) => ({ marca: m.nombre, items: productos.filter((p) => p.marca === m.nombre).map((p) => p.nombre.toLowerCase()) }))
  .filter((m) => m.items.length > 0)
  .map((m) => `${m.marca}: ${lista(m.items)}`)
  .join('; ');
const frios = productos.filter((p) => categorias.find((c) => c.slug === p.categoria)?.frio);
const enFrio = lista(frios.map((p, i) => `${i === 0 ? p.nombre : p.nombre.toLowerCase()}${p.marca ? ` ${p.marca}` : ''}`));
const edulcorante = productos.find((p) => p.slug === 'edulcorante');
const surtida = productos.find((p) => p.slug === 'mermelada-surtida');
const sabores = productos.find((p) => p.slug === 'mermeladas');

const preguntas: (PreguntaFrecuente | false)[] = [
  {
    grupo: 'pedidos',
    pregunta: '¿Cómo hago un pedido?',
    respuesta: `Mandale a ${atiende} por WhatsApp lo que necesitás y en qué zona estás. Atiende ${atencion}; si preferís, mandá el pedido por mail a ${empresa.email}. Si ya sos cliente, alcanza con un “Hola, buen día” y el pedido.`,
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Hay pedido mínimo?',
    respuesta: respuestaMinimo,
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Cuándo llega el pedido?',
    respuesta: respuestaLlegada,
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Llegan a otras zonas?',
    respuesta: `Depende de la zona. Hoy repartimos ${repartos}. Si estás en otro lado, escribinos con tu localidad y te decimos si llegamos${
      horario.retiroEnDeposito ? `; también podés retirar el pedido en el depósito de ${localidad}` : ''
    }.`,
  },
  {
    grupo: 'pagos',
    pregunta: '¿Cómo pido la lista de precios?',
    respuesta: `Pedísela a ${atiende} por WhatsApp o por mail a ${empresa.email}. La lista no está publicada en la web porque se actualiza seguido: te mandamos la vigente.`,
  },
  {
    grupo: 'pedidos',
    pregunta: '¿A qué hora atienden?',
    respuesta: `${mayuscula(atencion)}, por WhatsApp y por teléfono. Si escribís fuera de ese horario, te contestamos a primera hora.`,
  },
  {
    grupo: 'pagos',
    pregunta: `¿Hacen ${factura}?`,
    respuesta: `Sí. Hacemos ${factura}${otrasFacturas.length ? ` y también facturamos a ${lista(otrasFacturas.map(minuscula))}` : ''}. Aceptamos ${lista(pagos.medios)}; con clínicas e instituciones trabajamos con ${pagos.instituciones}.`,
  },
  horario.retiroEnDeposito && {
    grupo: 'pedidos',
    pregunta: '¿Se puede retirar en el depósito?',
    respuesta: `Sí, en ${calle}, ${localidad}, ${atencion}. Avisanos antes por WhatsApp así lo dejamos preparado.`,
  },
  {
    grupo: 'productos',
    pregunta: '¿Qué marcas trabajan?',
    respuesta: `${lista(ajenas.map((m) => m.nombre))}, y nuestra línea propia de edulcorante. ${porMarca}. Las marcas pueden cambiar: si buscás una en particular, preguntanos.`,
  },
  {
    grupo: 'productos',
    pregunta: `¿Qué es la línea propia ${empresa.nombreComercial}?`,
    respuesta: `Es nuestro edulcorante en sobre. El sobre es de diseño ${empresa.nombreComercial}, blanco con la curva verde y nuestro teléfono impreso${edulcorante?.masVendido ? ', y es de lo que más se vende' : ''}.${
      surtida && sabores?.variantes ? ` También armamos la ${surtida.nombre.toLowerCase()}: una caja con los sabores de ${sabores.marca} (${lista(sabores.variantes)}).` : ''
    }`,
  },
  {
    grupo: 'productos',
    pregunta: '¿Qué productos viajan en frío?',
    respuesta: `${enFrio}. Son porciones individuales para la tostada del desayuno y viajan en frío.`,
  },
  {
    grupo: 'productos',
    pregunta: '¿Tienen otros productos además de los de la web?',
    respuesta:
      'Sí. En la web mostramos los que más se piden, pero trabajamos más productos en porción individual. Si no lo ves, preguntanos.',
  },
];

export const faq: PreguntaFrecuente[] = preguntas.filter((p): p is PreguntaFrecuente => p !== false);
