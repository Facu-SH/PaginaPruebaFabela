// Ayudas de redacción para la dirección A: arman frases a partir de los datos de src/data/.
// Ningún dato del negocio vive acá: solo cómo se dicen.
import { empresa, entregas, horario, masVendidos, categorias, productos, type Dia, type ZonaEntrega } from '../../../data';
import { horaCorta, nombreDia } from '../../../lib/horario';

/** ['a', 'b', 'c'] -> 'a, b y c' */
export const listaConY = (items: string[]) =>
  items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

export const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** 'jueves' -> 'jueves'; 'sabado' -> 'sábados' */
const plural = (dia: Dia) => {
  const n = nombreDia(dia);
  return n.endsWith('s') ? n : `${n}s`;
};

/** Días de reparto de una zona, en una frase corta. */
export function diasDeReparto(z: ZonaEntrega) {
  if (z.dias === 'habiles') return 'todos los días hábiles';
  if (z.dias === 'consultar') return 'a coordinar';
  return `los ${listaConY(z.dias.map(plural))}`;
}

/** ¿Hay reparto ese día en la zona? */
export function hayReparto(z: ZonaEntrega, dia: Dia) {
  if (z.dias === 'habiles') return horario.dias.includes(dia);
  if (z.dias === 'consultar') return false;
  return z.dias.includes(dia);
}

/** Abreviatura de día para la tira de la semana. */
export const diaCorto = (d: Dia) => capitalizar(nombreDia(d).slice(0, 3));

/** "de la mañana" a partir de "05:00". */
export function franjaDe(hhmm: string) {
  const h = Number(hhmm.split(':')[0]);
  return h < 12 ? 'de la mañana' : h < 20 ? 'de la tarde' : 'de la noche';
}

/** "las 5 de la mañana" a partir de "05:00". */
export function horaDicha(hhmm: string) {
  const h = Number(hhmm.split(':')[0]);
  const hora = h > 12 ? h - 12 : h;
  return `las ${hora === 1 ? 'una' : hora} ${franjaDe(hhmm)}`;
}

/** "lunes a viernes" a partir de los días de atención. */
export function diasDeAtencion() {
  const d = horario.dias;
  return d.length > 1 ? `${nombreDia(d[0])} a ${nombreDia(d[d.length - 1])}` : nombreDia(d[0]);
}

/** Nombre de un producto en minúscula, por slug. Vacío si ya no está en los datos. */
export const nombreDe = (slug: string) => {
  const p = productos.find((x) => x.slug === slug);
  return p ? minuscula(p.nombre) : '';
};

export const apertura = () => horaDicha(horario.abre);
export const aperturaReloj = () => horaCorta(horario.abre, true);

/** "Florida, Vicente López" */
export const lugar = () => `${empresa.direccion.localidad}, ${empresa.direccion.partido}`;

/** Dirección completa, igual en todo el sitio. */
export const direccionCompleta = () =>
  `${empresa.direccion.calle}, ${empresa.direccion.localidad}, ${empresa.direccion.partido}, ${empresa.direccion.provincia}`;

/** Zona de Capital (la primera de la lista de entregas). */
export const zonaCapital = () => entregas.find((z) => z.id === 'capital') ?? entregas[0];

/** Nombre corto de la zona, sin paréntesis: "Zona Norte (GBA)" -> "Zona Norte". */
export const zonaCorta = (z: ZonaEntrega) => z.zona.replace(/\s*\(.*\)\s*/, '');

/**
 * Los más vendidos dichos en una frase: "mayonesa Natura, edulcorante de línea propia DPI y mermeladas Abedul".
 * Si el producto tiene variantes, se nombra la categoría en plural.
 */
export function masVendidosEnFrase() {
  return listaConY(
    masVendidos().map((p) => {
      const nombre = p.variantes
        ? minuscula(categorias.find((c) => c.slug === p.categoria)?.nombre ?? p.nombre)
        : minuscula(p.nombre);
      if (!p.marca) return nombre;
      return p.marca === empresa.nombreComercial ? `${nombre} de línea propia ${p.marca}` : `${nombre} ${p.marca}`;
    }),
  );
}

/** Teléfono sin el prefijo internacional, como está impreso en los sobres: "4730-4423". */
export const telefonoCorto = () => empresa.telefono.replace(/^\+54\s*11\s*/, '');
