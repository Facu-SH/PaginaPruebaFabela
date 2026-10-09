// Redacción compartida por las piezas de /clinicas/ y /comercios/ (nada de datos acá: solo cómo se dicen).
import type { Producto } from '../../data';
import { enumerar, mayuscula } from '../../lib/textos';

/**
 * Nombres con su marca, agrupando los que comparten marca:
 * [mayonesa, ketchup, mostaza] -> "Mayonesa, ketchup y mostaza Natura";
 * [edulcorante, azúcar] -> "Edulcorante DPI y azúcar Abedul".
 */
export function conMarcas(ps: Producto[]) {
  const grupos: { marca?: string; nombres: string[] }[] = [];
  for (const p of ps) {
    const g = grupos.find((x) => x.marca === p.marca);
    if (g) g.nombres.push(p.nombre.toLowerCase());
    else grupos.push({ marca: p.marca, nombres: [p.nombre.toLowerCase()] });
  }
  return mayuscula(enumerar(grupos.map((g) => `${enumerar(g.nombres)}${g.marca ? ` ${g.marca}` : ''}`)));
}
