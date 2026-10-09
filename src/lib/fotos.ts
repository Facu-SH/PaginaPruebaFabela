// Fotos de producto (src/assets/productos/) y de categoría (src/assets/categorias/).
// Se activan solas: alcanza con dejar el archivo con el nombre correcto y recompilar.
// Cómo tienen que ser: docs/diseno.md ("Dirección de fotografía") y docs/fotos/.
import type { ImageMetadata } from 'astro';
import { productoPorSlug } from '../data';

const indexar = (archivos: Record<string, { default: ImageMetadata }>) =>
  new Map(Object.entries(archivos).map(([ruta, m]) => [ruta.split('/').pop()!.replace(/\.\w+$/, '').toLowerCase(), m.default]));

const deProductos = indexar(import.meta.glob<{ default: ImageMetadata }>('/src/assets/productos/*.{jpg,jpeg,png,webp,avif}', { eager: true }));
const deCategorias = indexar(import.meta.glob<{ default: ImageMetadata }>('/src/assets/categorias/*.{jpg,jpeg,png,webp,avif}', { eager: true }));

/** Foto de un producto: src/assets/productos/<slug>.jpg (o el nombre de `foto` en src/data/productos.ts). */
export function fotoProducto(slug: string) {
  const nombre = (productoPorSlug(slug)?.foto ?? slug).replace(/^.*\//, '').replace(/\.\w+$/, '').toLowerCase();
  return deProductos.get(nombre);
}

/** Foto de grupo de una categoría: src/assets/categorias/<slug>.jpg (la usa la imagen para compartir). */
export const fotoCategoria = (slug: string) => deCategorias.get(slug.toLowerCase());
