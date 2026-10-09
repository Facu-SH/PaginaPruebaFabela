// Categorías, productos y marcas. Las marcas pueden cambiar: editá acá.
// Los marcados con (S) son supuestos provisorios: ver docs/pendientes.md.
// Campos opcionales para más adelante: gramaje, unidadesPorCaja, foto.
import type { Categoria, Marca, Producto } from './types';

export const categorias: Categoria[] = [
  {
    slug: 'aderezos',
    nombre: 'Aderezos',
    bajada: 'Mayonesa, ketchup, mostaza y salsa golf en sobre, para el pancho, la hamburguesa o la bandeja del almuerzo.',
    envase: 'sobre',
  },
  {
    slug: 'endulzantes',
    nombre: 'Azúcar y edulcorante',
    bajada: 'Sobres para acompañar el café, el té y el desayuno. El edulcorante es de línea propia DPI.',
    envase: 'sobre-papel',
  },
  {
    slug: 'mermeladas',
    nombre: 'Mermeladas',
    bajada: 'Potecitos de frutilla, durazno, ciruela y frutos rojos para desayunos y meriendas.',
    envase: 'pote',
  },
  {
    slug: 'lacteos',
    nombre: 'Manteca y queso crema',
    bajada: 'Porciones individuales que viajan en frío, para la tostada de la mañana.',
    envase: 'pote',
    frio: true,
  },
  {
    slug: 'galletitas-y-tostadas',
    nombre: 'Galletitas y tostadas',
    bajada: 'Paquetitos dulces, de sándwich y sin sal, vainillas y tostadas para el desayuno de clínicas.',
    envase: 'paquete',
  },
];

export const productos: Producto[] = [
  // Aderezos
  { slug: 'mayonesa', nombre: 'Mayonesa', categoria: 'aderezos', marca: 'Natura', masVendido: true, nota: 'El más vendido' },
  { slug: 'ketchup', nombre: 'Ketchup', categoria: 'aderezos', marca: 'Natura' },
  { slug: 'mostaza', nombre: 'Mostaza', categoria: 'aderezos', marca: 'Natura' },
  { slug: 'salsa-golf', nombre: 'Salsa golf', categoria: 'aderezos', marca: 'Natura' },

  // Endulzantes
  { slug: 'azucar', nombre: 'Azúcar', categoria: 'endulzantes', marca: 'Abedul' }, // (S) marca
  {
    slug: 'edulcorante',
    nombre: 'Edulcorante',
    categoria: 'endulzantes',
    marca: 'DPI', // (S) nombre comercial de la línea propia a definir
    masVendido: true,
    nota: 'Línea propia, con sobre de diseño DPI',
  },

  // Mermeladas
  {
    slug: 'mermeladas',
    nombre: 'Mermelada',
    categoria: 'mermeladas',
    marca: 'Abedul',
    variantes: ['frutilla', 'durazno', 'ciruela', 'frutos rojos'],
    masVendido: true,
  },
  {
    slug: 'mermelada-surtida',
    nombre: 'Mermelada surtida',
    categoria: 'mermeladas',
    marca: 'DPI',
    nota: 'Caja mixta que arma DPI con los cuatro sabores',
  },

  // Lácteos (frío)
  { slug: 'queso-crema', nombre: 'Queso crema', categoria: 'lacteos', marca: 'Abedul', nota: 'Viene creciendo' }, // (S) marca
  { slug: 'manteca', nombre: 'Manteca', categoria: 'lacteos', marca: 'Dánica', nota: 'Viene creciendo' }, // (S) marca

  // Galletitas y tostadas
  {
    slug: 'galletitas',
    nombre: 'Galletitas',
    categoria: 'galletitas-y-tostadas',
    marca: 'Abedul', // (S) marca
    variantes: ['dulces', 'de sándwich', 'sin sal'],
  },
  { slug: 'vainillas', nombre: 'Vainillas', categoria: 'galletitas-y-tostadas', marca: 'Mauri' },
  { slug: 'tostadas', nombre: 'Tostadas', categoria: 'galletitas-y-tostadas', nota: 'Las piden las clínicas' }, // (S) marca a confirmar
];

export const marcas: Marca[] = [
  { slug: 'natura', nombre: 'Natura' },
  { slug: 'abedul', nombre: 'Abedul' },
  { slug: 'danica', nombre: 'Dánica' },
  { slug: 'mauri', nombre: 'Mauri' },
  { slug: 'dpi', nombre: 'DPI', propia: true },
];

/** "Una porción para cada comida": el mix típico de una clínica. */
export const comidasClinica = [
  { comida: 'Desayuno', productos: ['azucar', 'edulcorante', 'mermeladas', 'manteca', 'queso-crema', 'tostadas'] },
  { comida: 'Almuerzo', productos: ['mayonesa', 'ketchup', 'mostaza', 'salsa-golf'] },
  { comida: 'Merienda', productos: ['azucar', 'edulcorante', 'mermeladas', 'galletitas', 'vainillas'] },
  { comida: 'Cena', productos: ['mayonesa', 'ketchup', 'mostaza', 'salsa-golf'] },
] as const;

/** Pedido típico de un comercio (kiosco, bar): qué lleva y para qué. */
export const pedidoTipicoComercio = [
  { producto: 'edulcorante', uso: 'el café' },
  { producto: 'mayonesa', uso: 'el pancho' },
  { producto: 'azucar', uso: 'a veces' },
  { producto: 'mermeladas', uso: 'a veces' },
] as const;

/** Públicos, para textos de pie y datos estructurados. */
export const publicos = ['clínicas', 'geriátricos', 'instituciones', 'bares', 'kioscos', 'almacenes', 'confiterías'] as const;

export const productosPorCategoria = (slug: Categoria['slug']) => productos.filter((p) => p.categoria === slug);
export const productoPorSlug = (slug: string) => productos.find((p) => p.slug === slug);
export const masVendidos = () => productos.filter((p) => p.masVendido);
