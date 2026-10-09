// Sistema de color (diseño, no datos del negocio): una categoría = un color.
// Los hex viven en src/styles/tokens.css; acá se nombran los tokens.
import type { CategoriaSlug } from '../data';

export type TokenColor = 'tinta' | 'papel' | 'blanco' | 'mayonesa' | 'verde' | 'frutilla' | 'manteca' | 'galletita';

export interface ColorBloque {
  /** Token del fondo (sin "--"). */
  fondo: TokenColor;
  /** Token del texto que va encima. */
  texto: TokenColor;
  /** Nombre para documentar. */
  nombre: string;
}

/** Cada categoría es dueña de un color de bloque. */
export const colorCategoria: Record<CategoriaSlug, ColorBloque> = {
  aderezos: { fondo: 'mayonesa', texto: 'tinta', nombre: 'amarillo mayonesa' },
  endulzantes: { fondo: 'verde', texto: 'tinta', nombre: 'verde edulcorante DPI' },
  mermeladas: { fondo: 'frutilla', texto: 'papel', nombre: 'rojo frutilla' },
  lacteos: { fondo: 'manteca', texto: 'tinta', nombre: 'crema manteca' },
  'galletitas-y-tostadas': { fondo: 'galletita', texto: 'tinta', nombre: 'tostado galletita' },
};

/** La voz de DPI (portada, lista de precios, día de reparto): el verde del sobre propio. */
export const colorDPI: ColorBloque = { fondo: 'verde', texto: 'tinta', nombre: 'verde DPI' };

/** Color de página: 'dpi' para las páginas generales, o la categoría de la página. */
export type ColorPagina = 'dpi' | CategoriaSlug;
export const colorDePagina = (c: ColorPagina): ColorBloque => (c === 'dpi' ? colorDPI : colorCategoria[c]);

/** var(--token) */
export const v = (token: string) => `var(--${token})`;

/**
 * Color de cada envase dibujado (c = envase, t = lo impreso encima). Clave: slug de producto o sabor.
 * Estos colores (ketchup, mostaza, durazno…) solo viven dentro de las ilustraciones.
 */
const ENVASE: Record<string, { c: string; t: string }> = {
  mayonesa: { c: 'mayonesa', t: 'tinta' },
  ketchup: { c: 'env-ketchup', t: 'papel' },
  mostaza: { c: 'env-mostaza', t: 'tinta' },
  'salsa-golf': { c: 'env-golf', t: 'tinta' },
  azucar: { c: 'blanco', t: 'tinta' },
  edulcorante: { c: 'blanco', t: 'tinta' },
  mermeladas: { c: 'frutilla', t: 'papel' },
  'mermelada-surtida': { c: 'env-durazno', t: 'tinta' },
  frutilla: { c: 'frutilla', t: 'papel' },
  durazno: { c: 'env-durazno', t: 'tinta' },
  ciruela: { c: 'env-ciruela', t: 'papel' },
  'frutos rojos': { c: 'env-frutos-rojos', t: 'papel' },
  manteca: { c: 'manteca', t: 'tinta' },
  'queso-crema': { c: 'blanco', t: 'tinta' },
  galletitas: { c: 'galletita', t: 'tinta' },
  vainillas: { c: 'galletita', t: 'tinta' },
  tostadas: { c: 'galletita', t: 'tinta' },
};

export const colorEnvase = (clave: string) => {
  const e = ENVASE[clave] ?? { c: 'blanco', t: 'tinta' };
  return { c: v(e.c), t: v(e.t) };
};
