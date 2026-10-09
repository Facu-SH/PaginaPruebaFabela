// Lee los colores de src/styles/tokens.css (la única fuente de los hex) para usarlos en TS:
// el <meta name="theme-color"> del layout y la tabla de contrastes de /sistema/.
import tokens from '../styles/tokens.css?raw';

/** { tinta: '#181613', papel: '#fbfaf6', mayonesa: '#f4e13b', 'env-ketchup': '#d3271c', … } */
export const paleta: Record<string, string> = Object.fromEntries(
  [...tokens.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\b/gi)].map((m) => [m[1], m[2].toLowerCase()]),
);

export const hex = (token: string) => {
  const v = paleta[token];
  if (!v) throw new Error(`No existe el color --${token} en tokens.css`);
  return v;
};

const luminancia = (h: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Contraste WCAG entre dos hex (1 a 21). */
export function contraste(a: string, b: string) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
