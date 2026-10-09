// Geometría del crimpado de los sobres para los dibujos SVG (ver components/EnvasesSprite.astro).
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
