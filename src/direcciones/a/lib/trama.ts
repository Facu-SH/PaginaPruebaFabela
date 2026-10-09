// Esfera tramada: así sale impresa la esfera del logo DPI en los sobres a una tinta.
// Genera los puntos de una trama hexagonal cuyo tamaño depende de la luz sobre una esfera.
// Se usa para el wordmark y para los sobres ilustrados.

export interface PuntoTrama {
  x: number;
  y: number;
  r: number;
}

/**
 * Puntos de trama dentro de un círculo de radio R centrado en (0, 0).
 * `paso` es la distancia entre puntos: más chico = trama más fina.
 */
export function tramaEsfera(R = 50, paso = 7): PuntoTrama[] {
  // Luz arriba a la izquierda, hacia quien mira.
  const luz = [-0.55, -0.62, 0.56];
  const n = Math.hypot(...luz);
  const [lx, ly, lz] = luz.map((v) => v / n);
  const puntos: PuntoTrama[] = [];
  const dy = (paso * Math.sqrt(3)) / 2;
  let fila = 0;
  for (let y = -R; y <= R + 0.01; y += dy, fila++) {
    const desfase = fila % 2 ? paso / 2 : 0;
    for (let x = -R - paso + desfase; x <= R + paso; x += paso) {
      const d2 = x * x + y * y;
      if (d2 > (R + paso * 0.5) ** 2) continue;
      const nz = Math.sqrt(1 - Math.min(d2 / (R * R), 1));
      const lambert = Math.max(0, (x / R) * lx + (y / R) * ly + nz * lz);
      const sombra = Math.min(1, (1 - lambert) * 1.08);
      // Área del punto proporcional a la sombra (como una trama de imprenta).
      const r = paso * 0.56 * Math.sqrt(Math.max(0.04, sombra));
      puntos.push({ x: +x.toFixed(2), y: +y.toFixed(2), r: +r.toFixed(2) });
    }
  }
  return puntos;
}
