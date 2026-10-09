// Bordes dentados (crimpado) para dibujar sobres en SVG.

const f = (n: number) => +n.toFixed(2);

/**
 * Contorno de un rectángulo con los cuatro bordes dentados, como el sobre de papel
 * de azúcar o edulcorante. `diente` es el ancho de cada diente y `alto` su profundidad.
 */
export function rectanguloDentado(x: number, y: number, w: number, h: number, diente = 5, alto = 2.4) {
  const puntos: [number, number][] = [];
  const tramo = (x1: number, y1: number, x2: number, y2: number, nx: number, ny: number) => {
    const largo = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.max(2, Math.round(largo / diente));
    for (let i = 0; i < n; i++) {
      const t0 = i / n;
      const tm = (i + 0.5) / n;
      puntos.push([x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0]);
      // El pico del diente sale hacia afuera (nx, ny).
      puntos.push([x1 + (x2 - x1) * tm + nx * alto, y1 + (y2 - y1) * tm + ny * alto]);
    }
  };
  tramo(x, y, x + w, y, 0, -1);
  tramo(x + w, y, x + w, y + h, 1, 0);
  tramo(x + w, y + h, x, y + h, 0, 1);
  tramo(x, y + h, x, y, -1, 0);
  return `M${puntos.map(([a, b]) => `${f(a)} ${f(b)}`).join('L')}Z`;
}

/** Línea dentada vertical (el corte de los extremos de un paquetito flow-pack). */
export function lineaDentadaVertical(y1: number, y2: number, x: number, diente = 4, alto = 2, haciaIzquierda = true) {
  const n = Math.max(2, Math.round((y2 - y1) / diente));
  const paso = (y2 - y1) / n;
  const s = haciaIzquierda ? -1 : 1;
  let d = `M${f(x)} ${f(y1)}`;
  for (let i = 0; i < n; i++) {
    d += `L${f(x + s * alto)} ${f(y1 + paso * (i + 0.5))}L${f(x)} ${f(y1 + paso * (i + 1))}`;
  }
  return d;
}

/** Línea dentada horizontal (el corte de los extremos de un sobre almohadilla). */
export function lineaDentada(x1: number, x2: number, y: number, diente = 4, alto = 2, haciaArriba = true) {
  const n = Math.max(2, Math.round((x2 - x1) / diente));
  const paso = (x2 - x1) / n;
  const s = haciaArriba ? -1 : 1;
  let d = `M${f(x1)} ${f(y)}`;
  for (let i = 0; i < n; i++) {
    d += `L${f(x1 + paso * (i + 0.5))} ${f(y + s * alto)}L${f(x1 + paso * (i + 1))} ${f(y)}`;
  }
  return d;
}
