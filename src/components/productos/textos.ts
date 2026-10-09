// Redacción de las páginas de productos (/productos/, /productos/<categoria>/ y /lista/).
// Acá no hay datos del negocio: marcas, sabores, zonas y nombres salen de src/data/.
// Lo que sí vive acá es cómo se cuenta cada cosa: los títulos, la primera oración de cada página
// y "para qué y quién lo usa" de cada producto. Se puede editar libremente.
import { categorias, empresa, entregas, marcas, productosPorCategoria, type CategoriaSlug, type Producto } from '../../data';
import { descripcion, enumerar, zonasConReparto, zonasCortas } from '../../lib/textos';

const DPI = empresa.nombreComercial;
/** Nombre de la línea propia ("DPI"). */
export const marcaPropia = marcas.find((m) => m.propia)?.nombre ?? DPI;
export const esPropia = (p: Producto) => p.marca === marcaPropia;

/** "Capital Federal, Morón y Zona Norte (GBA)" */
export const zonasTexto = () => enumerar(zonasConReparto().map((z) => z.zona));
/** La zona con reparto todos los días hábiles (Capital). */
export const zonaDiaria = () => entregas.find((z) => z.dias === 'habiles') ?? entregas[0];

const NUMEROS = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
export const enLetras = (n: number) => NUMEROS[n] ?? String(n);

/**
 * Productos con su marca, agrupando los seguidos de la misma marca:
 * "mayonesa, ketchup, mostaza y salsa golf Natura" · "galletitas Abedul, vainillas Mauri y tostadas".
 * La línea propia se dice "de línea propia" en lugar de "DPI" (salvo `propiaComoMarca`).
 */
export function listaConMarca(prods: Producto[], { propiaComoMarca = false } = {}) {
  const grupos: { marca?: string; nombres: string[] }[] = [];
  for (const p of prods) {
    const ultimo = grupos[grupos.length - 1];
    const nombre = p.nombre.charAt(0).toLowerCase() + p.nombre.slice(1);
    if (ultimo && p.marca && ultimo.marca === p.marca) ultimo.nombres.push(nombre);
    else grupos.push({ marca: p.marca, nombres: [nombre] });
  }
  return enumerar(
    grupos.map((g) => {
      const nombres = enumerar(g.nombres);
      if (!g.marca) return nombres;
      if (g.marca === marcaPropia && !propiaComoMarca) return `${nombres} de línea propia`;
      return `${nombres} ${g.marca}`;
    }),
  );
}

/** Marcas de una categoría, sin repetir: "Abedul y línea propia DPI". */
export function marcasDe(slug: CategoriaSlug) {
  const nombres = [...new Set(productosPorCategoria(slug).map((p) => p.marca).filter((m): m is string => !!m))];
  return enumerar(nombres.map((m) => (m === marcaPropia ? `línea propia ${m}` : m)));
}

/** Cómo viene cada familia, para títulos y mensajes ("en sobre", "en potecito"). */
const FORMATO: Record<CategoriaSlug, string> = {
  aderezos: 'en sobre',
  endulzantes: 'en sobre',
  mermeladas: 'en potecito',
  lacteos: 'en porción individual',
  'galletitas-y-tostadas': 'en paquetito',
};

/** Lo que va en el mensaje de WhatsApp: "Quería consultar por aderezos en sobre." */
export const consultaCategoria = (slug: CategoriaSlug) => {
  const c = categorias.find((x) => x.slug === slug)!;
  return `${c.nombre.toLowerCase()} ${FORMATO[slug]}`;
};

export interface TextosCategoria {
  /** <title> */
  title: string;
  /** h1, con las palabras que busca la gente. */
  h1: string;
  /** Aclaración chica debajo del h1 (opcional). */
  h1Aclaracion?: string;
  /** Primera oración: qué es, qué vende, dónde y para quién. */
  oracion: string;
  description: string;
}

/** Títulos y primera oración de cada categoría. */
export function textosCategoria(slug: CategoriaSlug): TextosCategoria {
  const prods = productosPorCategoria(slug);
  const zonas = zonasTexto();
  // Lo que se agrega al final de la meta description si entra (ver descripcion() en src/lib/textos.ts).
  const reparto = [` ${DPI} reparte a ${zonasCortas()}.`, ` ${DPI} reparte desde ${empresa.direccion.localidad}.`, ` ${DPI}, desde ${empresa.desde}.`];
  const lista = listaConMarca(prods);
  const sabores = (s: string) => enumerar(prods.find((p) => p.slug === s)?.variantes ?? []);

  switch (slug) {
    case 'aderezos':
      return {
        title: `Sobres de mayonesa, ketchup y mostaza individuales · ${DPI}`,
        h1: 'Sobres de mayonesa, ketchup y mostaza individuales',
        oracion: `${DPI} reparte ${lista} en sobres individuales para el pancho, la hamburguesa y la bandeja del almuerzo de kioscos, bares, puestos de comida y clínicas de ${zonas}.`,
        description: descripcion(`Sobres individuales de ${lista} para kioscos, bares y clínicas.`, reparto),
      };
    case 'endulzantes':
      return {
        title: `Azúcar y edulcorante en sobre para bares y oficinas · ${DPI}`,
        h1: 'Azúcar y edulcorante en sobre para bares y oficinas',
        oracion: `${DPI} vende ${lista} en sobres individuales para el café de bares, confiterías, oficinas y clínicas de ${zonas}.`,
        description: descripcion(`Sobres individuales de ${lista} para el café de bares, oficinas y clínicas.`, reparto),
      };
    case 'mermeladas': {
      const m = prods.find((p) => p.variantes);
      const n = m?.variantes?.length ?? 0;
      return {
        title: `Mermeladas en porción individual (potecitos) · ${DPI}`,
        h1: 'Mermeladas en porción individual',
        h1Aclaracion: `Potecitos de ${sabores(m?.slug ?? '')}`,
        oracion: `${DPI} distribuye mermelada${m?.marca ? ` ${m.marca}` : ''} en potecitos individuales de ${sabores(m?.slug ?? '')}, y una caja surtida que arma con los ${enLetras(n)} sabores, para el desayuno de clínicas, geriátricos, bares y confiterías de ${zonas}.`,
        description: descripcion(`Potecitos de mermelada${m?.marca ? ` ${m.marca}` : ''} (${sabores(m?.slug ?? '')}) y caja surtida para desayunos de clínicas y bares.`, reparto),
      };
    }
    case 'lacteos':
      return {
        title: `Manteca y queso crema en porción individual · ${DPI}`,
        h1: 'Manteca y queso crema en porción individual',
        oracion: `${DPI} reparte ${lista} en porciones individuales que viajan en frío, para el desayuno de clínicas, bares y confiterías de ${zonas}.`,
        description: descripcion(`Porciones individuales de ${lista}, que viajan en frío, para desayunos de clínicas, bares y confiterías.`, reparto),
      };
    case 'galletitas-y-tostadas': {
      // "galletitas Abedul (dulces, de sándwich y sin sal), vainillas Mauri y tostadas"
      const conVariantes = listaConMarca(
        prods.map((p) =>
          p.variantes ? { ...p, nombre: `${p.nombre}${p.marca ? ` ${p.marca}` : ''} (${enumerar(p.variantes)})`, marca: undefined } : p,
        ),
      );
      return {
        title: `Galletitas, vainillas y tostadas en paquetitos individuales · ${DPI}`,
        h1: 'Galletitas, vainillas y tostadas en paquetitos individuales',
        oracion: `${DPI} reparte ${conVariantes} en paquetitos individuales para el desayuno y la merienda de clínicas, geriátricos y bares de ${zonas}.`,
        description: descripcion(`Paquetitos individuales de ${conVariantes} para desayunos y meriendas de clínicas y bares.`, reparto),
      };
    }
  }
}

/** Para qué y quién usa cada producto. `momento` es la frase grande del producto principal de la página. */
export interface Uso {
  quien: string;
  para: string;
}
export const usos: Record<string, { momento?: string; usos: Uso[] }> = {
  mayonesa: {
    momento: 'Del pancho a la bandeja del almuerzo.',
    usos: [
      { quien: 'Kioscos y puestos de comida', para: 'el sobre que se regala con el pancho' },
      { quien: 'Bares y rotiserías', para: 'la hamburguesa, el lomito y el pedido para llevar' },
      { quien: 'Clínicas', para: 'la bandeja del almuerzo y de la cena' },
    ],
  },
  ketchup: {
    usos: [
      { quien: 'Bares', para: 'las papas fritas y la hamburguesa' },
      { quien: 'Clínicas', para: 'el almuerzo, al lado de la mayonesa' },
    ],
  },
  mostaza: {
    usos: [
      { quien: 'Kioscos y puestos de comida', para: 'el pancho y el choripán' },
      { quien: 'Bares', para: 'el sándwich de bondiola o de jamón crudo' },
    ],
  },
  'salsa-golf': {
    usos: [
      { quien: 'Bares', para: 'el lomito y la ensalada' },
      { quien: 'Clínicas', para: 'la cena, con el pollo frío o la ensalada' },
    ],
  },
  edulcorante: {
    momento: 'El sobre que va en el platito del café.',
    usos: [
      { quien: 'Bares y confiterías', para: 'el café y el cortado, al lado del azúcar' },
      { quien: 'Kioscos', para: 'el café para llevar' },
      { quien: 'Oficinas', para: 'la cafetera de la oficina' },
      { quien: 'Clínicas', para: 'el desayuno y la merienda de las dietas sin azúcar' },
    ],
  },
  azucar: {
    usos: [
      { quien: 'Bares y confiterías', para: 'el café con leche y el cortado' },
      { quien: 'Oficinas', para: 'el café y el té de todos los días' },
      { quien: 'Clínicas', para: 'el té del desayuno y de la merienda' },
    ],
  },
  mermeladas: {
    momento: 'La tostada del desayuno, con su potecito.',
    usos: [
      { quien: 'Clínicas y geriátricos', para: 'la bandeja del desayuno y de la merienda' },
      { quien: 'Bares y confiterías', para: 'el desayuno con tostadas o medialunas' },
    ],
  },
  'mermelada-surtida': {
    usos: [
      { quien: 'Clínicas y geriátricos', para: 'que la bandeja no repita el mismo sabor toda la semana' },
      { quien: 'Confiterías', para: 'la canastita del desayuno, para que cada uno elija' },
    ],
  },
  'queso-crema': {
    momento: 'Para untar la tostada de la mañana.',
    usos: [
      { quien: 'Bares y confiterías', para: 'las tostadas del desayuno' },
      { quien: 'Clínicas', para: 'el desayuno y la merienda, con tostadas o galletitas' },
    ],
  },
  manteca: {
    usos: [
      { quien: 'Bares y confiterías', para: 'la tostada con mermelada' },
      { quien: 'Clínicas y geriátricos', para: 'la bandeja del desayuno' },
    ],
  },
  galletitas: {
    momento: 'La merienda, con el té o el café con leche.',
    usos: [
      { quien: 'Clínicas', para: 'la merienda; las sin sal, para las dietas con poco sodio' },
      { quien: 'Bares', para: 'la galletita que acompaña el café' },
    ],
  },
  vainillas: {
    usos: [
      { quien: 'Clínicas y geriátricos', para: 'la merienda con té o con leche' },
      { quien: 'Bares', para: 'el café con leche de la tarde' },
    ],
  },
  tostadas: {
    usos: [
      { quien: 'Clínicas', para: 'el desayuno, con manteca y mermelada' },
      { quien: 'Geriátricos', para: 'la merienda, con queso crema' },
    ],
  },
};
