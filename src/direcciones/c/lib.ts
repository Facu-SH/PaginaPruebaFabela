// Helpers propios de la dirección C ("Despacho a las 5 AM").
// Nada de datos del negocio acá: todo sale de src/data/. Solo presentación y cálculos.
import { categorias, entregas, horario, productos, type Categoria, type Dia, type Producto, type ZonaEntrega } from '../../data';
import { ahoraEnBA, estadoAtencion, horaCorta, nombreDia } from '../../lib/horario';

export type Envase = Categoria['envase'];

/** Envase de un producto (lo hereda de su categoría). */
export const envaseDe = (p: Producto): Envase => categorias.find((c) => c.slug === p.categoria)?.envase ?? 'sobre';

/**
 * Color de dibujo de cada producto (solo ilustración: no es un dato del negocio).
 * El relleno del envase en los dibujos técnicos; el trazo siempre es tinta.
 */
const COLOR: Record<string, string> = {
  mayonesa: '#F3D35B',
  ketchup: '#C8372D',
  mostaza: '#D69A17',
  'salsa-golf': '#EC8A4A',
  azucar: '#FFFFFF',
  edulcorante: '#B7D3A6',
  mermeladas: '#B8283E',
  'mermelada-surtida': '#E9963F',
  'queso-crema': '#FBF8EF',
  manteca: '#F4E19A',
  galletitas: '#DDAE6C',
  vainillas: '#EDCB82',
  tostadas: '#C98E4E',
};
export const colorDe = (slug: string) => COLOR[slug] ?? '#FFFFFF';

/** Color de dibujo de cada sabor o variante (también solo ilustración). */
const COLOR_VARIANTE: Record<string, string> = {
  frutilla: '#C42B3F',
  durazno: '#EFA048',
  ciruela: '#6E2346',
  'frutos rojos': '#8E1B3B',
};
export const colorVariante = (variante: string, porDefecto: string) => COLOR_VARIANTE[variante] ?? porDefecto;

/** Nombre de cada formato de envase, como en una ficha técnica. */
export const FORMATO: Record<Envase, { nombre: string; detalle: string }> = {
  sobre: { nombre: 'Sobre almohadilla', detalle: 'alargado, extremos crimpados' },
  'sobre-papel': { nombre: 'Sobre de papel', detalle: 'cuadrado, borde dentado' },
  pote: { nombre: 'Potecito', detalle: 'tapa pelable' },
  paquete: { nombre: 'Paquetito', detalle: 'flow-pack, sellado en los extremos' },
};

/** ["a", "b", "c"] -> "a, b y c" */
export const listaNatural = (items: string[], conjuncion = 'y') =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} ${conjuncion} ${items.at(-1)}` : (items[0] ?? '');

/** Primera letra en mayúscula. */
export const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "Mayonesa Natura", "Edulcorante DPI", "Tostadas". */
export const nombreConMarca = (p: Producto) => (p.marca ? `${p.nombre} ${p.marca}` : p.nombre);

/** Los días hábiles de atención, en orden, para las columnas de la hoja de ruta. */
export const diasDeReparto = (): Dia[] => horario.dias;

/** Días en que una zona recibe reparto. */
export const diasDeZona = (z: ZonaEntrega): Dia[] =>
  z.dias === 'habiles' ? horario.dias : z.dias === 'consultar' ? [] : z.dias;

/** "todos los días hábiles", "los jueves", "a coordinar". */
export const textoDiasZona = (z: ZonaEntrega) => {
  if (z.dias === 'habiles') return 'todos los días hábiles';
  if (z.dias === 'consultar') return 'a coordinar';
  const nombres = z.dias.map((d) => `los ${nombreDia(d)}`);
  return nombres.length > 1 ? `${nombres.slice(0, -1).join(', ')} y ${nombres.at(-1)}` : nombres[0];
};

/** Abreviatura de día para encabezados de planilla: "LUN", "MIÉ". */
export const diaCorto = (d: Dia) => nombreDia(d).slice(0, 3).toUpperCase();

/** Horario como "05:00" (formato de reloj, con cero adelante). */
export const horaReloj = (hhmm: string) => hhmm.padStart(5, '0');

/** Minutos desde medianoche de un "HH:MM". */
export const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** Posición (0 a 100) de un horario dentro de la franja de 24 h. */
export const posicionEnDia = (minutos: number) => (minutos / 1440) * 100;

export const abreCorto = () => horaCorta(horario.abre);
export const cierraCorto = () => horaCorta(horario.cierra);
export const abreReloj = () => horaCorta(horario.abre, true);

/** "lun a vie" para etiquetas de planilla. */
export const rangoDiasCorto = () => {
  const d = horario.dias;
  return d.length > 1 ? `${diaCorto(d[0]).toLowerCase()} a ${diaCorto(d.at(-1)!).toLowerCase()}` : diaCorto(d[0]).toLowerCase();
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** "2026-10-06" -> { dia: "06", mes: "OCT", anio: "2026" } */
export const partesFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split('-');
  return { dia, mes: MESES[Number(mes) - 1].toUpperCase(), anio };
};

/** "2026-10-08" -> "8 de octubre" */
export const fechaLarga = (fecha: string) => {
  const [, mes, dia] = fecha.split('-');
  return `${Number(dia)} de ${MESES_LARGOS[Number(mes) - 1]}`;
};

const sumarDias = (fecha: string, n: number) => {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const DIAS_JS: Dia[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

/**
 * Próxima fecha de reparto de una zona con días fijos, a partir de mañana (hora de Buenos Aires).
 * Es un dato de calendario, no una promesa de entrega.
 */
export function proximoReparto(z: ZonaEntrega, ahora = new Date()) {
  if (z.dias === 'habiles' || z.dias === 'consultar') return null;
  const { indiceDia, fecha } = ahoraEnBA(ahora);
  for (let n = 1; n <= 7; n++) {
    const d = DIAS_JS[(indiceDia + n) % 7];
    if (z.dias.includes(d)) return { dia: d, fecha: sumarDias(fecha, n) };
  }
  return null;
}

/** Minutos que faltan para la próxima apertura (en pasos de 15 min: abre en hora exacta). */
export function minutosParaAbrir(ahora = new Date()) {
  const paso = 15 * 60_000;
  const inicio = Math.ceil(ahora.getTime() / paso) * paso;
  for (let t = inicio, i = 0; i < 14 * 96; t += paso, i++) {
    if (estadoAtencion(new Date(t)).abierto) return Math.round((t - ahora.getTime()) / 60_000);
  }
  return null;
}

/** 390 -> "6 h 30 min"; 45 -> "45 min"; 600 -> "10 h". */
export const duracion = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
};

/** Productos en el orden de las categorías. */
export const productosOrdenados = () =>
  categorias.flatMap((c) => productos.filter((p) => p.categoria === c.slug).map((p) => ({ ...p, cat: c })));

/** Zonas con id, para selectores. */
export const zonas = entregas;
