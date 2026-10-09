// Ayudas para armar textos a partir de src/data/ (nada de datos acá: solo redacción).
import { categorias, empresa, entregas, productoPorSlug, type CategoriaSlug, type Producto, type ZonaEntrega } from '../data';
import { nombreDia } from './horario';

export const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** ['a', 'b', 'c'] -> "a, b y c" (o "a, b o c"). */
export const enumerar = (items: readonly string[], conjuncion = 'y') =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} ${conjuncion} ${items[items.length - 1]}`;

/** Nombre de un producto por slug, en minúscula, para usar dentro de una oración. */
export const nombreProducto = (slug: string) => (productoPorSlug(slug)?.nombre ?? slug).toLowerCase();

/** "Mayonesa Natura", "Edulcorante DPI", "Tostadas". */
/** "Mayonesa Natura" -> "mayonesa Natura": baja solo la primera letra (las marcas quedan como son). */
export const primeraMinuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const nombreConMarca = (p: Producto) => (p.marca ? `${p.nombre} ${p.marca}` : p.nombre);

export const categoria = (slug: CategoriaSlug) => categorias.find((c) => c.slug === slug)!;
export const categoriaDe = (p: Producto) => categoria(p.categoria);

/** "4730-4423": el número local, como está impreso en los sobres. */
export const telefonoCorto = () => empresa.telefono.split(' ').slice(-1)[0];

/** "Bernardo de Irigoyen 877, Florida, Vicente López, Buenos Aires" */
export const direccionLinea = () => {
  const { calle, localidad, partido, provincia } = empresa.direccion;
  return `${calle}, ${localidad}, ${partido}, ${provincia}`;
};

/** Zonas con reparto propio (todas menos "a consultar"). */
export const zonasConReparto = () => entregas.filter((z) => z.dias !== 'consultar');

/** Nombre corto de la zona para una oración ("Zona Norte (GBA)" -> "Zona Norte"). */
export const zonaCorta = (z: ZonaEntrega) => z.zona.replace(/\s*\(.*\)\s*$/, '');

/** Día de reparto, en grande ("Jueves") y dentro de una frase ("los jueves"). */
export function diaDeReparto(z: ZonaEntrega) {
  if (z.dias === 'habiles') return { grande: 'Todos los días hábiles', frase: 'todos los días hábiles' };
  if (z.dias === 'consultar') return { grande: 'A coordinar', frase: 'a coordinar' };
  const dias = z.dias.map(nombreDia);
  return { grande: mayuscula(enumerar(dias)), frase: `los ${enumerar(dias)}` };
}

/** "A Capital Federal vamos todos los días hábiles; a Morón, los jueves; a Zona Norte, los martes." */
export const resumenRepartos = () =>
  zonasConReparto()
    .map((z, i) => (i === 0 ? `A ${z.zona} vamos ${diaDeReparto(z).frase}` : `a ${zonaCorta(z)}, ${diaDeReparto(z).frase}`))
    .join('; ') + '.';

/** "Capital Federal, Morón y Zona Norte": las zonas con reparto propio, con su nombre corto. */
export const zonasCortas = () => enumerar(zonasConReparto().map(zonaCorta));

/**
 * Meta description de largo razonable para buscadores (hasta 160 caracteres): `base` y, después,
 * el primer agregado de la lista que todavía entre. Así, si cambia un dato (una marca, una zona),
 * la descripción se acorta sola en lugar de quedar cortada por Google.
 */
export function descripcion(base: string, agregados: string[] = [], max = 160) {
  return agregados.map((a) => base + a).find((d) => d.length <= max) ?? base;
}
