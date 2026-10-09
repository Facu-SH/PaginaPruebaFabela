// Preguntas frecuentes. Se usan en la página y en el JSON-LD FAQPage (se generan de acá).
// `grupo` las ordena en temas en /preguntas-frecuentes/: pedidos (pedidos y entregas), pagos (precios y pagos), productos.
// La primera oración de cada respuesta es la respuesta corta (la página la destaca): que conteste sola.
import type { Dia, PreguntaFrecuente } from './types';
import { empresa } from './empresa';
import { horario } from './horario';
import { entregas } from './entregas';
import { categorias, marcas, productos } from './productos';

// Ayudas de redacción para las respuestas que se arman con los datos (así un cambio de día,
// de marca o de mail se hace en un solo lugar).
const lista = (items: string[]) => (items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`);
const DIA: Partial<Record<Dia, string>> = { miercoles: 'miércoles', sabado: 'sábado' };
const dia = (d: Dia) => DIA[d] ?? d;
const hora = (hhmm: string) => String(Number(hhmm.split(':')[0]));
const atencion = `de ${dia(horario.dias[0])} a ${dia(horario.dias[horario.dias.length - 1])} de ${hora(horario.abre)} a ${hora(horario.cierra)} h`;
const repartos = lista(
  entregas
    .filter((z) => z.dias !== 'consultar')
    .map((z) => `en ${z.zona.replace(/\s*\(.*\)\s*$/, '')} ${z.dias === 'habiles' ? 'todos los días hábiles' : `los ${lista((z.dias as Dia[]).map(dia))}`}`),
);
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

export const faq: PreguntaFrecuente[] = [
  {
    grupo: 'pedidos',
    pregunta: '¿Cómo hago un pedido?',
    respuesta: `Mandale a ${empresa.whatsapp.atiende} por WhatsApp lo que necesitás y en qué zona estás. Atiende ${atencion}; si preferís, mandá el pedido por mail a ${empresa.email}. Si ya sos cliente, alcanza con un “Hola, buen día” y el pedido.`,
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Hay pedido mínimo?',
    respuesta:
      'En Capital no hay pedido mínimo. En Morón y Zona Norte tampoco, si pedís para el día de reparto de tu zona. Para otras zonas, consultanos.',
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Cuándo llega el pedido?',
    respuesta:
      'En Capital, en general, al día siguiente del pedido. A Morón vamos los jueves y a Zona Norte los martes. Depende del producto y del stock, así que te lo confirmamos al tomar el pedido.',
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Llegan a otras zonas?',
    respuesta: `Depende de la zona. Hoy repartimos ${repartos}. Si estás en otro lado, escribinos con tu localidad y te decimos si llegamos; también podés retirar el pedido en el depósito de ${empresa.direccion.localidad}.`,
  },
  {
    grupo: 'pagos',
    pregunta: '¿Cómo pido la lista de precios?',
    respuesta:
      'Por WhatsApp o por mail. La lista no está publicada en la web porque se actualiza seguido: te mandamos la vigente.',
  },
  {
    grupo: 'pedidos',
    pregunta: '¿A qué hora atienden?',
    respuesta:
      'De lunes a viernes, de 5 a 16 h. Si escribís fuera de ese horario, te contestamos a primera hora.',
  },
  {
    grupo: 'pagos',
    pregunta: '¿Hacen Factura A?',
    respuesta:
      'Sí. Hacemos Factura A y también facturamos a consumidor final. Aceptamos efectivo, transferencia y cheque; con clínicas e instituciones trabajamos con cheques a 30 o 60 días.',
  },
  {
    grupo: 'pedidos',
    pregunta: '¿Se puede retirar en el depósito?',
    respuesta:
      'Sí, en Bernardo de Irigoyen 877, Florida, de lunes a viernes de 5 a 16 h. Avisanos antes por WhatsApp así lo dejamos preparado.',
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
