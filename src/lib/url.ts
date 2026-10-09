// Arma rutas internas respetando el `base` de astro.config.mjs.
// url('/productos/') -> '/productos/' (o '/PaginaPruebaFabela/productos/' en una vista previa).
export function url(ruta = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpia = ruta.startsWith('/') ? ruta : `/${ruta}`;
  return `${base}${limpia}`;
}
