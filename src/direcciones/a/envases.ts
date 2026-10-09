// Cómo se dibuja cada envase en la dirección A. Solo presentación (formato y colores);
// los nombres, marcas y variantes salen de src/data/productos.ts.
// Formatos reales: sobre almohadilla (aderezos), sobre de papel dentado (azúcar y edulcorante),
// potecito con tapa pelable (mermeladas, manteca, queso crema) y paquetito flow-pack (galletitas).

export type Dibujo =
  | { tipo: 'almohadilla'; color: string; sello: string; salsa: string }
  | { tipo: 'papel'; impresion: 'azucar' | 'dpi' }
  | { tipo: 'pote'; cuerpo: string; tapa: string; impresion: string; opaco?: boolean }
  | { tipo: 'paquete'; fondo: string; banda: string; contenido: 'galletitas' | 'tostadas' | 'vainillas' };

/** Colores de producto. Se usan con mesura: solo en los envases. */
export const colorProducto = {
  mayonesa: '#F2D45C',
  ketchup: '#C3322A',
  mostaza: '#D39B1C',
  golf: '#EC8A5E',
  frutilla: '#C42A3C',
  durazno: '#EE9A45',
  ciruela: '#5A2747',
  frutosRojos: '#7C1F3B',
  manteca: '#F1DB8A',
  queso: '#F6F3EC',
} as const;

const dibujos: Record<string, Dibujo> = {
  mayonesa: { tipo: 'almohadilla', color: colorProducto.mayonesa, sello: '#E4C043', salsa: '#FFF4C2' },
  ketchup: { tipo: 'almohadilla', color: colorProducto.ketchup, sello: '#A92820', salsa: '#E2574B' },
  mostaza: { tipo: 'almohadilla', color: colorProducto.mostaza, sello: '#B9840F', salsa: '#F2C94C' },
  'salsa-golf': { tipo: 'almohadilla', color: colorProducto.golf, sello: '#D8744A', salsa: '#F8B996' },
  azucar: { tipo: 'papel', impresion: 'azucar' },
  edulcorante: { tipo: 'papel', impresion: 'dpi' },
  'mermeladas:frutilla': { tipo: 'pote', cuerpo: colorProducto.frutilla, tapa: '#E7E3DA', impresion: '#E86A78' },
  'mermeladas:durazno': { tipo: 'pote', cuerpo: colorProducto.durazno, tapa: '#E7E3DA', impresion: '#F6C27F' },
  'mermeladas:ciruela': { tipo: 'pote', cuerpo: colorProducto.ciruela, tapa: '#E7E3DA', impresion: '#9A6188' },
  'mermeladas:frutos rojos': { tipo: 'pote', cuerpo: colorProducto.frutosRojos, tapa: '#E7E3DA', impresion: '#B44D6C' },
  mermeladas: { tipo: 'pote', cuerpo: colorProducto.frutilla, tapa: '#E7E3DA', impresion: '#E86A78' },
  manteca: { tipo: 'pote', cuerpo: colorProducto.manteca, tapa: '#D9B75E', impresion: '#F4E3A6', opaco: true },
  'queso-crema': { tipo: 'pote', cuerpo: colorProducto.queso, tapa: '#BCD2E4', impresion: '#E6EFF6', opaco: true },
  galletitas: { tipo: 'paquete', fondo: '#F5E6C8', banda: '#D9822B', contenido: 'galletitas' },
  vainillas: { tipo: 'paquete', fondo: '#F7EDC6', banda: '#C29A2A', contenido: 'vainillas' },
  tostadas: { tipo: 'paquete', fondo: '#EFE5D3', banda: '#A85E2A', contenido: 'tostadas' },
};

/** Dibujo de un producto (o de una variante: "mermeladas:frutilla"). */
export function dibujoDe(clave: string): Dibujo | undefined {
  return dibujos[clave] ?? dibujos[clave.split(':')[0]];
}
