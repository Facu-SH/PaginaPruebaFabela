// Dirección B · Color de sobre.
// Sistema de color (diseño, no datos del negocio) y ayudas para armar textos a partir de src/data/.
import { categorias, empresa, entregas, productoPorSlug, type CategoriaSlug, type ZonaEntrega } from '../../data';
import { nombreDia } from '../../lib/horario';

/* ------------------------------------------------------------------ */
/* Color                                                                */
/* ------------------------------------------------------------------ */

/**
 * Paleta estricta: cada categoría es dueña de UN color de bloque. Los colores de producto
 * (ketchup, mostaza, durazno…) solo aparecen dentro de las ilustraciones de envases.
 * Los hex viven en b.css (custom properties); acá se nombran.
 */
export const colorCategoria: Record<CategoriaSlug, { fondo: string; texto: string; nombre: string }> = {
  aderezos: { fondo: 'var(--b-mayonesa)', texto: 'var(--b-tinta)', nombre: 'amarillo mayonesa' },
  endulzantes: { fondo: 'var(--b-verde)', texto: 'var(--b-tinta)', nombre: 'verde edulcorante DPI' },
  mermeladas: { fondo: 'var(--b-frutilla)', texto: 'var(--b-papel)', nombre: 'rojo frutilla' },
  lacteos: { fondo: 'var(--b-manteca)', texto: 'var(--b-tinta)', nombre: 'crema manteca' },
  'galletitas-y-tostadas': { fondo: 'var(--b-galletita)', texto: 'var(--b-tinta)', nombre: 'tostado galletita' },
};

/** Color del envase de cada producto o sabor (c = envase, t = impresión sobre el envase). */
const ENVASE: Record<string, { c: string; t: string }> = {
  mayonesa: { c: 'var(--b-mayonesa)', t: 'var(--b-tinta)' },
  ketchup: { c: 'var(--b-ketchup)', t: 'var(--b-papel)' },
  mostaza: { c: 'var(--b-mostaza)', t: 'var(--b-tinta)' },
  'salsa-golf': { c: 'var(--b-golf)', t: 'var(--b-tinta)' },
  azucar: { c: 'var(--b-blanco)', t: 'var(--b-tinta)' },
  edulcorante: { c: 'var(--b-blanco)', t: 'var(--b-tinta)' },
  frutilla: { c: 'var(--b-frutilla)', t: 'var(--b-papel)' },
  durazno: { c: 'var(--b-durazno)', t: 'var(--b-tinta)' },
  ciruela: { c: 'var(--b-ciruela)', t: 'var(--b-papel)' },
  'frutos rojos': { c: 'var(--b-frutos-rojos)', t: 'var(--b-papel)' },
  manteca: { c: 'var(--b-manteca)', t: 'var(--b-tinta)' },
  'queso-crema': { c: 'var(--b-blanco)', t: 'var(--b-tinta)' },
  galletitas: { c: 'var(--b-galletita)', t: 'var(--b-tinta)' },
  vainillas: { c: 'var(--b-galletita)', t: 'var(--b-tinta)' },
  tostadas: { c: 'var(--b-galletita)', t: 'var(--b-tinta)' },
};

export const colorEnvase = (clave: string) => ENVASE[clave] ?? { c: 'var(--b-papel)', t: 'var(--b-tinta)' };

/* ------------------------------------------------------------------ */
/* Textos a partir de los datos                                          */
/* ------------------------------------------------------------------ */

export const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** ['a', 'b', 'c'] -> "a, b y c" */
export const enumerar = (items: readonly string[]) =>
  items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;

/** Nombre de un producto por slug, en minúscula (para usar dentro de una oración). */
export const producto = (slug: string) => (productoPorSlug(slug)?.nombre ?? slug).toLowerCase();

export const categoria = (slug: CategoriaSlug) => categorias.find((c) => c.slug === slug)!;

/** "4730-4423": el número local, como está impreso en los sobres. */
export const telefonoCorto = () => empresa.telefono.split(' ').slice(-1)[0];

export const direccionLinea = () =>
  `${empresa.direccion.calle}, ${empresa.direccion.localidad}, ${empresa.direccion.partido}, ${empresa.direccion.provincia}`;

/** Zonas con reparto propio (todas menos "otras"). */
export const zonasConReparto = () => entregas.filter((z) => z.dias !== 'consultar');

/** Día de reparto para mostrar en grande y en una frase. */
export function diaDeReparto(z: ZonaEntrega) {
  if (z.dias === 'habiles') return { grande: 'Todos los días hábiles', frase: 'todos los días hábiles' };
  if (z.dias === 'consultar') return { grande: 'A coordinar', frase: 'a coordinar' };
  const dias = z.dias.map(nombreDia);
  return { grande: mayuscula(enumerar(dias)), frase: `los ${enumerar(dias)}` };
}

/** Nombre corto de la zona para usar en una oración ("Zona Norte (GBA)" -> "Zona Norte"). */
export const zonaCorta = (z: ZonaEntrega) => z.zona.replace(/\s*\(.*\)\s*$/, '');

/* ------------------------------------------------------------------ */
/* Bordes dentados (el crimpado de los sobres)                           */
/* ------------------------------------------------------------------ */

const n1 = (v: number) => Math.round(v * 10) / 10;

/**
 * Contorno de un rectángulo w×h con bordes dentados (dientes de ancho ~t y profundidad a) en los lados elegidos.
 * Las esquinas son picos; los valles miran hacia adentro.
 */
export function contornoDentado(
  w: number,
  h: number,
  t: number,
  a: number,
  lados: { arriba?: boolean; derecha?: boolean; abajo?: boolean; izquierda?: boolean },
) {
  const pts: string[] = ['M0 0'];
  const lado = (largo: number, punto: (s: number, adentro: number) => [number, number]) => {
    const n = Math.max(1, Math.round(largo / t));
    const paso = largo / n;
    for (let i = 0; i < n; i++) {
      const [x1, y1] = punto(i * paso + paso / 2, a);
      const [x2, y2] = punto((i + 1) * paso, 0);
      pts.push(`L${n1(x1)} ${n1(y1)}L${n1(x2)} ${n1(y2)}`);
    }
  };
  if (lados.arriba) lado(w, (s, d) => [s, d]);
  else pts.push(`L${w} 0`);
  if (lados.derecha) lado(h, (s, d) => [w - d, s]);
  else pts.push(`L${w} ${h}`);
  if (lados.abajo) lado(w, (s, d) => [w - s, h - d]);
  else pts.push(`L0 ${h}`);
  if (lados.izquierda) lado(h, (s, d) => [d, h - s]);
  pts.push('Z');
  return pts.join('');
}

/** Rayitas del sellado (el estriado de las puntas de un sobre), como un solo path. */
export function estrias(x0: number, x1: number, y0: number, y1: number, paso: number, vertical = true) {
  const d: string[] = [];
  if (vertical) for (let x = x0; x <= x1 + 0.01; x += paso) d.push(`M${n1(x)} ${y0}V${y1}`);
  else for (let y = y0; y <= y1 + 0.01; y += paso) d.push(`M${x0} ${n1(y)}H${x1}`);
  return d.join('');
}
